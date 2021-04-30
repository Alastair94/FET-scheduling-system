<?php
	include 'PHP/validUser.php';
	include 'PHP/writeToXML.php';
	$semester = $_SESSION['user']['semester'];
	$userID = $_SESSION['user']['username'];
	$pathToMyDir = "/opt/lampp/htdocs/fet/uploads/".$userID."/";
	$semFile = $semester.".fet";
	$pathToMyDir .= $semester."/";

	$fetcmd = "export DISPLAY=:0.0;"."cd ".$pathToMyDir.";echo mate | sudo -S fet-cl --inputfile=".$semFile." --outputdir=".$semester." 2>&1";
	$output = null;
	$return = null;
	exec($fetcmd, $output, $return);

	print_r($output);
	print_r($fetcmd);
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
	<title>Generate Time Table</title>
	<link rel="stylesheet" type="text/css" href="Style/formStyle.css">
</head>

<body>
	<div id="wrapper">
		<header>
			<h1 class="mainheader">FET Time Tables</h1><!--end mainheader-->
		</header>
		<div id="mainForm">
			<fieldset style="display:flex">
				<legend><?php echo ucfirst($semester);?></legend>
				<?php include 'html/nav.html'?>
			<article id="box">
				<?php
					$pathToTables = 'uploads/'.$userID.'/'.$semester.'/'.$semester.'/timetables'.'/'.$semester.'/'.$semester;
					echo "
					<ul>
						<li><a href=\"$pathToTables"."_index.html\" target=\"_BLANK\">All tables available</a><il>
						<li><a href=\"$pathToTables"."_activities_days_horizontal.html\" target=\"_BLANK\">Activities organized by days</a><il>
						<li><a href=\"$pathToTables"."_rooms_days_horizontal.html\" target=\"_BLANK\">Rooms organized by days</a><il>
						<li><a href=\"$pathToTables"."_subjects_days_horizontal.html\" target=\"_BLANK\">Subjects organized by days</a><il>
						<li><a href=\"$pathToTables"."_teachers_days_vertical.html\" target=\"_BLANK\">Teachers organized by days</a><il>
						<li><a href=\"$pathToTables"."_years_days_horizontal.html\" target=\"_BLANK\">Years organized by days</a><il>
					";
				?>
			</article>
		</div>
		<?php include 'html/footer.html'?>
	</div>
</body>
</html>
