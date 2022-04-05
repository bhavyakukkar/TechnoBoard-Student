<!DOCTYPE html>
<html>
<head>
	<style>
		#publish {
			display: none;
		}
	</style>
</head>
<body>
<?php

	$data_directory = "../../database/";

	function loginTeacher($teacher_id) {
		$teacher_hash = hash('md5', "Technoboard".$teacher_id."194021119402241940261");
		$teacher_directory_name = "t-".$teacher_hash;

		return $teacher_directory_name."/";
	}

	function loginClass($teacher_key, $class_id) {
		$class_directory_name = "c-".$class_id;

		return $teacher_key.$class_directory_name."/";
	}

	function findPortal($class_key) {
		global $data_directory;

		$portal_path = $data_directory.$class_key."portal.json";
		$portal_json = file_get_contents($portal_path);
		$portal = json_decode($portal_json, true);

		return $portal;
	}

	if( !empty($_GET['t']) and !empty($_GET['c']) ) {
		$teacher_id = $_GET['t'];
		$class_id = $_GET['c'];

		$portal = findPortal(
			loginClass(
				loginTeacher($teacher_id),
				$class_id
			)
		);

		if($portal['publish'] == "true")
			print '<div id="publish">True</div>';
		else
			print '<div id="publish">False</div>';
	}
?>
</body>
</html>