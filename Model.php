<?php
namespace Model;
include 'socrata.php';
use \socrata\Socrata as Socrata;
class Model {
	
	private $jsonData;
	
	public function __construct($temp) {
		$socrata = new Socrata("http://data.cityofnewyork.us");
		$this->jsonData = $socrata->get("/resource/erm2-nwe9.json");
		$this->topTen($temp);
	}
	public function topTen($borough){
		$data = [];
		foreach($this->jsonData as $item){
			if(isset($item['borough']) && isset($item['resolution_action_updated_date']) && isset($item['location'])){
				$borough = $item['borough'];
				$date = $item['resolution_action_updated_date'];
				$data[$borough][$date]['longitude'] = $item['location']['longitude'];
				$data[$borough][$date]['latitude'] = $item['location']['latitude'];
				$data[$borough][$date]['complaint_type'] = $item['complaint_type'];
			}
		}
		ksort($data);
		$topTen = array_slice($data[$borough], 0, 10, true);
		$result = [];
		$j = 0;
		foreach($topTen as $item) {
			$result[$j]['longitude'] = $item['longitude'];
			$result[$j]['latitude'] = $item['latitude'];
			$result[$j]['complaint_type'] = $item['complaint_type'];
			$j++;
		}
		$jsonResult = json_encode($result, true);
		return $jsonResult;
	}
	public function issueFrequncy($borough){
		$data = [];
		foreach($this->jsonData as $item){
			if(isset($item['borough'])){
				$borough = $item['borough'];
				$date = $item['resolution_action_updated_date'];
				$data[$borough][$date]['longitude'] = $item['location']['longitude'];
				$data[$borough][$date]['latitude'] = $item['location']['latitude'];
				$data[$borough][$date]['complaint_type'] = $item['complaint_type'];
			}
		}
		ksort($data);
		$topTen = array_slice($data[$borough], 0, 10, true);
		$result = [];
		$j = 0;
		foreach($topTen as $item) {
			$result[$j]['longitude'] = $item['longitude'];
			$result[$j]['latitude'] = $item['latitude'];
			$result[$j]['complaint_type'] = $item['complaint_type'];
			$j++;
		}
		$jsonResult = json_encode($result, true);
		return $jsonResult;
	}
}

?>
