<?php
/*
	********************************************************************************************
	CONFIGURATION
	********************************************************************************************
*/
$email_expediteur = 'florian.miralles.itec@gmail.com';
$nom_expediteur = 'Florian Miralles';
 
// destinataire
$destinataire = 'florian.miralles.itec@gmail.com';
 
// copie 
$copie = 'oui'; // 'oui' ou 'non'
 
// Messages de confirmation du mail
$message_envoye = "Votre message nous est bien parvenu !";
$message_non_envoye = "L'envoi du mail a échoué, veuillez réessayer SVP.";
 
// Messages d'erreur du formulaire
$message_erreur_formulaire = "Vous devez d'abord <a href=\"contact.html\">envoyer le formulaire</a>.";
$message_formulaire_invalide = "Vérifiez que tous les champs soient bien remplis et que l'email soit sans erreur.";

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
	 * cette fonction sert à nettoyer et enregistrer un texte
	 */
	function Rec($text)
	{
		$text = htmlspecialchars(trim($text), ENT_QUOTES);
		if (1 === get_magic_quotes_gpc())
		{
			$text = stripslashes($text);
		}
 
		$text = nl2br($text);
		return $text;
	};
 
	/*
	 * Cette fonction sert à vérifier la syntaxe d'un email
	 */
	function IsEmail($email)
	{
		$value = preg_match('/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9_](?:[a-zA-Z0-9_\-](?!\.)){0,61}[a-zA-Z0-9_-]?\.)+[a-zA-Z0-9_](?:[a-zA-Z0-9_\-](?!$)){0,61}[a-zA-Z0-9_]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/', $email);
		return (($value === 0) || ($value === false)) ? false : true;
	}

 
/*
	********************************************************************************************
	FIN DE LA CONFIGURATION
	********************************************************************************************
*/
 
// on teste si le formulaire a été soumis
if (!isset($_POST['envoi']))	
{
  // formulaire non envoyé
	echo '<p>'.$message_erreur_formulaire.'</p>'."\n";

}
else
{ 	// formulaire envoyé, on récupère tous les champs.
	$nom     = (isset($_POST['nom']))     ? Rec($_POST['nom'])     : '';
	$email   = (isset($_POST['email']))   ? Rec($_POST['email'])   : '';
	$objet   = (isset($_POST['objet']))   ? Rec($_POST['objet'])   : '';
	$message = (isset($_POST['message'])) ? Rec($_POST['message']) : '';
    $antispam_h = (isset($_POST['antispam_h'])) ? Rec($_POST['antispam_h']) : '';
	$antispam_r = (isset($_POST['antispam_r'])) ? Rec($_POST['antispam_r']) : ''; 
  
  // On demande la vraie réponse
	$verif_nospam = NoSpamQuestion('ans', $antispam_r);

	if (strtolower($antispam_h) != strtolower($verif_nospam['answer']))
	{
		// le formulaire s'arrête ici
		echo '<p>Vous n\'avez pas répondu correctement à la question Antispam ...</p>';
	}
	else
	{ echo '<p>Vous avez répondu correctement à la question Antispam ...</p>'; 
    // On va vérifier les variables et l'email ...
	$email = (IsEmail($email)) ? $email : ''; // soit l'email est vide si erroné, soit il vaut l'email entré
 
	if (($nom != '') && ($email != '') && ($objet != '') && ($message != ''))
	{
		// les 4 variables sont remplies, on génère puis envoie le mail
		$headers  = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'From:'.$nom_expediteur.' <'.$email_expediteur.'>' . "\r\n" .
				'Reply-To:'.$email. "\r\n" .
				'Content-Type: text/plain; charset="utf-8"; DelSp="Yes"; format=flowed '."\r\n" .
				'Content-Disposition: inline'. "\r\n" .
				'Content-Transfer-Encoding: 7bit'." \r\n" .
				'X-Mailer:PHP/'.phpversion();
 
		// envoyer une copie au visiteur ?
		if ($copie == 'oui')
		{
			$cible = $destinataire.';'.$email;
		}
		else
		{
			$cible = $destinataire;
		};
 
		// Remplacement de certains caractères spéciaux
		$caracteres_speciaux     = array('&#039;', '&#8217;', '&quot;', '<br>', '<br />', '&lt;', '&gt;', '&amp;', '…',   '&rsquo;', '&lsquo;');
		$caracteres_remplacement = array("'",      "'",        '"',      '',    '',       '<',    '>',    '&',     '...', '>>',      '<<'     );
 
		$objet = html_entity_decode($objet);
		$objet = str_replace($caracteres_speciaux, $caracteres_remplacement, $objet);
 
		$message = html_entity_decode($message);
		$message = str_replace($caracteres_speciaux, $caracteres_remplacement, $message);
 
		// Envoi du mail
		$cible = str_replace(',', ';', $cible); // antibug : j'ai vu plein de forums où ce script était mis, les gens ne font pas attention à ce détail parfois
		$num_emails = 0;
		$tmp = explode(';', $cible);
		foreach($tmp as $email_destinataire)
		{
			if (mail($email_destinataire, $objet, $message, $headers))
				$num_emails++;
		}
 
		if ((($copie == 'oui') && ($num_emails == 2)) || (($copie == 'non') && ($num_emails == 1)))
		{
			echo '<p>'.$message_envoye.'</p>';
		}
		else
		{
			echo '<p>'.$message_non_envoye.'</p>';
		};
	}
	else
	{
		// une des 3 variables (ou plus) est vide ...
		echo '<p>'.$message_formulaire_invalide.' <a href="contact.php">Retour au formulaire</a></p>'."\n";
	};
    }
	
}; // fin du if (!isset($_POST['envoi']))
?>