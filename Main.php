
<?php
include 'socrata.php';
use \socrata\Socrata as Socrata;
$socrata = new Socrata("http://data.cityofnewyork.us");
$response = $socrata->get("/resource/erm2-nwe9.json");
//print_r($response[0]['location']['longitude']);

?>
<html>
</html>

