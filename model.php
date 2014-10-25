<?php
include 'socrata.php';
use \socrata\Socrata as Socrata;
$socrata = new Socrata("http://data.cityofnewyork.us");
$jsonData = $socrata->get("/resource/erm2-nwe9.json");

$borough = $_GET['borough'];
echo $borough;
$data = [];
		foreach($jsonData as $item){
			if(isset($item['borough']) && isset($item['resolution_action_updated_date']) && isset($item['location'])){
				$borough = $item['borough'];
				$date = $item['resolution_action_updated_date'];
				$data[$borough][$date]['longitude'] = $item['location']['longitude'];
				$data[$borough][$date]['latitude'] = $item['location']['latitude'];
				$data[$borough][$date]['complaint_type'] = $item['complaint_type'];
			}
		}
		ksort($data);
		$topTen = array_slice($data[$borough], 0, 20, true);
		$result = [];
		$j = 0;
		foreach($topTen as $item) {
			$result[$j]['longitude'] = $item['longitude'];
			$result[$j]['latitude'] = $item['latitude'];
			$result[$j]['complaint_type'] = $item['complaint_type'];
			$j++;
		}
		$jsonResult = json_encode($result, true);
   // print_r($jsonResult);
		return $jsonResult;
?>
