<?php

function NoSpamQuestion($mode = 'ask', $answer = 0)
{
	$array_pictures = array(); $j = 0;

	$array_pictures[$j]['num'] = $j;
	$array_pictures[$j]['question'] = "Ecrire TOKAMAK";
	$array_pictures[$j]['answer'] = "TOKAMAK";
	$j++;

	$array_pictures[$j]['num'] = $j;
	$array_pictures[$j]['question'] = "Le soleil est-il chaud ou froid ?";
	$array_pictures[$j]['answer'] = "chaud";
	$j++;

	$array_pictures[$j]['num'] = $j;
	$array_pictures[$j]['question'] = "Donner la solution complexe de x*x = -1";
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
  <p>Etudiant en <b>Math&eacutematiques </b> appliqu&eacutees</p>
	<div>
		<a href="contactEn.php"> 
			<img src="image/en.png" alt="english" width="50" height="50"> 
		</a>
	</div>
</div>


<div class="navbar">
  <a href="index.html" class="active">Accueil</a>
  	
  <a href="autres.html"> Autres cr&eacuteations </a>
  <a href="document/CV3.0pdf">Curiculum Vitae</a>
  <a href="contact.php" class="right">Contact</a>
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
        <i class="fa fa-envelope fa-fw w3-hover-text-black w3-xlarge w3-margin-right"></i> bureau 122, premier étage<br>
      </div>

      <p>Pour toute information compl&eacutementaire, je suis joignable par mail</p>

     <form id="contact" method="post" action="traitement_formulaire.php">
	<fieldset><legend>Vos coordonn&eacutees</legend>
		<p><label for="nom">Nom :</label><input type="text" id="nom" name="nom" /></p>
		<p><label for="email">Email :</label><input type="text" id="email" name="email" /></p>
	</fieldset>
 
	<fieldset><legend>Votre message :</legend>
		<p><label for="objet">Objet :</label><input type="text" id="objet" name="objet" /></p>
		<p><label for="message">Message :</label><textarea id="message" name="message" cols="30" rows="8"></textarea></p>
	</fieldset>


	<fieldset><legend>Antispam</legend>
		<p><label for="antispam_h"><?php echo $nospam['question']; ?></label><input type="text" name="antispam_h" id="antispam_h" /><input type="hidden" name="antispam_r" value=<?php echo $nospam['num']; ?> /></p>
	</fieldset>

	<div style="text-align:center;"><input type="submit" name="envoi" value="Envoyer" /></div>
    </form>

    </div>
  </div>
</div>