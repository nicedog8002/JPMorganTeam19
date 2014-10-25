<?php
include 'socrata.php';
use \socrata\Socrata as Socrata;
		$socrata = new Socrata("http://data.cityofnewyork.us");
		$jsonData = $socrata->get("/resource/erm2-nwe9.json");
		$borough = $_GET['borough'];
		$data = [];
		foreach($jsonData as $item){
			if(isset($item['borough']) && isset($item['complaint_type'])){
				$borough = $item['borough'];
				$issueType = $item['complaint_type'];
				if(!isset($data[$borough][$issueType]['frequency'])){
					$data[$borough][$issueType]['frequency'] = 1;
					$data[$borough][$issueType]['issueName'] = $issueType;
				} else{
					$data[$borough][$issueType]['issueName'] = $issueType;
					$data[$borough][$issueType]['frequency']++;
				}
			}
		}
		$jsonResult = json_encode($data[$borough], true);
		
		file_put_contents("file.json", $jsonResult);
		return $jsonResult;

?>
