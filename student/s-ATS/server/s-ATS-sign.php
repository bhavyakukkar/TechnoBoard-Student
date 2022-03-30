<!DOCTYPE html>
<html>
<?php
		
		function currentSession($session_hash) {

            $meta_file_name = "./meta".$session_hash.".json";
			$meta_json = file_get_contents($meta_file_name);
			$meta_array = json_decode($meta_json, true);
			
			return $meta_array['SessionHash'];
        }

		function addStudentSignature($session_hash, $reg_no) {
			
			$session_file_name = "session".$session_hash.".json";
			$existing_json = file_get_contents($session_file_name);
			$existing_array = json_decode($existing_json, true);

			$existing_length = count($existing_array);
			$id = $existing_length;
			
			if(!studentAlreadyResponded($existing_array, $reg_no)) {
				
				$updated_array = $existing_array;
				$updated_array[$id] = Array (
					"ID" => strval($id + 1),
					"RegNo" => strval($reg_no)
				);
				$updated_json = json_encode($updated_array);
				
				if (file_put_contents($session_file_name, $updated_json))
					echo "Success";
				else
					echo "Failed to write to file";
			}
			else {
				echo "Already signed";
			}
		}

		function studentUniqueHash($student_regno, $session_hash) {
			$hash = hash("md5", $student_regno."Technoboard194021119402241940261".$session_hash);
			
			return $hash;
		}

		function studentAlreadyResponded($existing_array, $reg_no) {
			for($i = 0; $i < count($existing_array); $i++) {
				if ($existing_array[$i]["RegNo"] == $reg_no)
					return true;
			}
			return false;
		}

		if(!empty($_GET['r']) and !empty($_GET['h']) and !empty($_GET['s'])) {
			$reg_no = $_GET['r'];
			$received_hash = $_GET['h'];
			$session_hash = $_GET['s'];
			
			if(isCurrentSession($session_hash) && studentUniqueHash($reg_no, $session_hash) == $received_hash) {
				addStudentSignature($session_hash, $reg_no);
			}
			else {
				echo "Wrong Session or Wrong Hash";
			}
		}
?>
<head>
	<style>
		table, th, td {
			border: 1px solid black;
		}
	</style>
</head>

<body>
</body>

</html>