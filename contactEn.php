<?php

function NoSpamQuestion($mode = 'ask', $answer = 0)
{
	$array_pictures = array(); $j = 0;

	$array_pictures[$j]['num'] = $j;
	$array_pictures[$j]['question'] = "Write TOKAMAK ";
	$array_pictures[$j]['answer'] = "TOKAMAK";
	$j++;

	$array_pictures[$j]['num'] = $j;
	$array_pictures[$j]['question'] = "Is the sun hot or cold ?";
	$array_pictures[$j]['answer'] = "hot";
	$j++;

	$array_pictures[$j]['num'] = $j;
	$array_pictures[$j]['question'] = "Give the complex solution of x*x = -1";
	$array_pictures[$j]['answer'] = "i";
	$j++;

	if ($mode != 'ans')
	{
		// on est en mode 'tirer au sort', on tire une image aleatoire
		$lambda = rand(0, count($array_pictures)-1);
		return $array_pictures[$lambda];
	}
	else
	{
		// on demande une vraie reponse
		foreach($array_pictures as $i => $array)
		{
			if ($i == $answer)
			{
				return $array;
				break;
			};
		};
	}; // Fin if ($mode != 'ans')
};
/*
	********************************************************************************************
	FIN DE LA CONFIGURATION
	********************************************************************************************
*/
	// on tire au sort une question
	$nospam = NoSpamQuestion();
?>

<!DOCTYPE html>
<html lang="en">
<head>
<title>Florian Miralles</title>
<link rel="stylesheet" href="style/style.css" />
<link rel="icon" type="image/x-icon" href="image/icon.png" />
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

</head>
<body>
<div class="header">
  <h1>Florian Miralles</h1>
  <p>Applied <b>Mathematics </b> student</p>
	<div>
		<a href="contact.php"> 
			<img src="image/fr.png" alt="fran�ais" width="50" height="50"> 
		</a>
	</div>
</div>


<div class="navbar">
  <a href="mySite.html" class="active">Home</a>	
<!--  <a href="projetUnivEn.html">Student projects</a> -->
  <a href="others.html"> Others creations </a> -->
  <a href="document/CV3.0.pdf">Curiculum Vitae</a>
  <a href="contactEn.php" class="right">Contact</a>
</div>
 
<div class="row" id="contact">
	<div class="">
    	<div class="w3-col m4 w3-container">
     	<img src="image/logoIMAG.jpg" style="width:50%">
	</div>
    	<div class="">
      <div class="w3-large w3-margin-bottom">
        <i class="fa fa-map-marker fa-fw w3-hover-text-black w3-xlarge w3-margin-right"></i> Montpellier, France<br>
        <i class="fa fa-phone fa-fw w3-hover-text-black w3-xlarge w3-margin-right"></i> Portable: +33 684754723<br>
        <i class="fa fa-envelope fa-fw w3-hover-text-black w3-xlarge w3-margin-right"></i> Email: florian.miralles.itec<br>
      </div>

      <p>For more information, join me by e-mail</p>

     <form id="contact" method="post" action="traitement_formulaireEn.php">
	<fieldset><legend>Your coordonnate</legend>
		<p><label for="nom">Name :</label><input type="text" id="nom" name="nom" /></p>
		<p><label for="email">Email :</label><input type="text" id="email" name="email" /></p>
	</fieldset>
 
	<fieldset><legend>Your message :</legend>
		<p><label for="objet">Object :</label><input type="text" id="objet" name="objet" /></p>
		<p><label for="message">Message :</label><textarea id="message" name="message" cols="30" rows="8"></textarea></p>
	</fieldset>

	<fieldset><legend>Antispam</legend>
		<p><label for="antispam_h"><?php echo $nospam['question']; ?></label><input type="text" name="antispam_h" id="antispam_h" /><input type="hidden" name="antispam_r" value=<?php echo $nospam['num']; ?> /></p>
	</fieldset>
 
	<div style="text-align:center;"><input type="submit" name="envoi" value="Send" /></div>
    </form>

    </div>
  </div>
</div>
