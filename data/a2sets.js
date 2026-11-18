/* DELF A2 practice pool (original). Compréhension des écrits: 4 exercises, 3-option MCQ, correct option first.
   A test takes one document of each kind. Production écrite: exercise 1 (tell / describe), exercise 2 (reply to a message). */
const A2_KINDS={orient:"Lire pour s'orienter",corresp:"Lire la correspondance",instr:"Lire des instructions",info:"Lire pour s'informer"};
const A2_POOL=[
/* ---------- s'orienter: affiches, programmes, annonces ---------- */
{k:"orient",title:"Fête du quartier Saint-Michel",doc:`FÊTE DU QUARTIER SAINT-MICHEL – samedi 14 juin
De 10 h à 13 h : marché des producteurs sur la place de l'église.
De 14 h à 17 h : jeux pour les enfants dans le jardin public (gratuit, à partir de 4 ans).
À 18 h : concert de l'école de musique devant la mairie.
À 20 h : grand repas partagé. Chaque famille apporte un plat ou un dessert. Les boissons sont offertes par la mairie.
En cas de pluie, le concert et le repas ont lieu dans la salle des fêtes, rue Victor-Hugo.`,
 qs:[{s:"Où se trouve le marché ?",o:["Sur la place de l'église","Dans le jardin public","Devant la mairie"]},{s:"Les jeux pour les enfants sont…",o:["gratuits","payants","réservés aux plus de dix ans"]},{s:"Pour le repas du soir, les familles doivent…",o:["apporter un plat","acheter un ticket","réserver à la mairie"]},{s:"Qui offre les boissons ?",o:["La mairie","L'école de musique","Les producteurs"]},{s:"S'il pleut, le concert a lieu…",o:["dans la salle des fêtes","le dimanche","dans l'église"]}]},
{k:"orient",title:"Piscine municipale : horaires d'été",doc:`PISCINE MUNICIPALE – HORAIRES DU 1er JUILLET AU 31 AOÛT
Lundi : fermée (nettoyage).
Du mardi au vendredi : de 10 h à 20 h.
Samedi et dimanche : de 9 h à 19 h.
Le mercredi matin, de 10 h à 12 h, le grand bassin est réservé aux cours de natation pour enfants.
Tarifs : adulte 4 €, enfant (moins de 12 ans) 2 €, carte de 10 entrées 30 €.
Le bonnet de bain est obligatoire. Vous pouvez en acheter un à l'accueil.`,
 qs:[{s:"Quel jour la piscine est-elle fermée ?",o:["Le lundi","Le mercredi","Le dimanche"]},{s:"Le samedi, la piscine ouvre à…",o:["9 h","10 h","12 h"]},{s:"Le mercredi matin, le grand bassin est pour…",o:["les cours des enfants","les adultes seulement","les nageurs professionnels"]},{s:"Combien coûte une entrée pour un enfant de 8 ans ?",o:["2 €","4 €","30 €"]},{s:"Si vous n'avez pas de bonnet de bain…",o:["vous pouvez en acheter un sur place","vous ne pouvez pas entrer","vous devez payer une amende"]}]},
{k:"orient",title:"Petites annonces de l'université",doc:`ANNONCE 1 – Étudiante cherche colocataire pour appartement près de la gare. Chambre meublée, 380 € par mois, charges comprises. Non-fumeur. Contact : Léa.
ANNONCE 2 – Je vends mon vélo de ville, bon état, 90 €. Idéal pour aller à la fac. Écrivez à Hugo.
ANNONCE 3 – Cours de guitare pour débutants, le jeudi soir, 15 € l'heure. Premier cours gratuit. Appelez Sami.
ANNONCE 4 – Perdu : carte d'étudiant au nom de Minh Tran, mardi, à la cafétéria. Merci de la déposer à l'accueil de la bibliothèque.`,
 qs:[{s:"Léa cherche…",o:["une personne pour partager son appartement","un appartement près de la gare","un travail à la gare"]},{s:"Dans l'annonce 1, le prix comprend…",o:["les charges","les repas","le parking"]},{s:"Hugo propose…",o:["un vélo","des cours","une chambre"]},{s:"Avec Sami, le premier cours…",o:["ne coûte rien","coûte quinze euros","a lieu le mardi"]},{s:"Si vous trouvez la carte de Minh Tran, vous devez…",o:["la laisser à l'accueil de la bibliothèque","l'apporter à la cafétéria","téléphoner à Minh"]}]},
{k:"orient",title:"Programme du cinéma Le Lumière",doc:`CINÉMA LE LUMIÈRE – Cette semaine
« Le Voyage de Lou » (film d'animation, 1 h 25) : mercredi et samedi à 14 h. Pour toute la famille.
« Nuit blanche à Lyon » (comédie, 1 h 40) : tous les soirs à 20 h 30.
« Les Oiseaux du Nord » (documentaire, 1 h 10) : dimanche à 11 h, suivi d'une rencontre avec la réalisatrice.
Tarif normal : 9 €. Tarif réduit (étudiants, moins de 18 ans) : 6 €. Le lundi, toutes les places sont à 5 €.`,
 qs:[{s:"Quel film est conseillé pour les enfants ?",o:["« Le Voyage de Lou »","« Nuit blanche à Lyon »","« Les Oiseaux du Nord »"]},{s:"« Nuit blanche à Lyon » passe…",o:["chaque soir","seulement le samedi","le dimanche matin"]},{s:"Que se passe-t-il après le documentaire ?",o:["Une rencontre avec la réalisatrice","Un deuxième film","Un concert"]},{s:"Un étudiant paie combien le mercredi ?",o:["6 €","9 €","5 €"]},{s:"Le lundi, le prix des places est…",o:["le même pour tout le monde","gratuit pour les étudiants","plus cher"]}]},
{k:"orient",title:"Information SNCF",doc:`INFORMATION VOYAGEURS – TRAVAUX
Du 3 au 7 mars, à cause de travaux sur la ligne, les trains entre Rennes et Saint-Malo sont remplacés par des bus.
Les bus partent du parking situé derrière la gare de Rennes, toutes les heures, de 6 h à 22 h.
Le trajet dure environ 1 h 15, soit 25 minutes de plus qu'en train.
Les billets de train restent valables dans les bus. Les vélos ne sont pas acceptés.
Plus d'informations sur l'application SNCF Connect ou au guichet de la gare.`,
 qs:[{s:"Pourquoi les trains sont-ils remplacés ?",o:["À cause de travaux","À cause d'une grève","À cause de la neige"]},{s:"Où prend-on le bus à Rennes ?",o:["Sur le parking derrière la gare","Devant la gare","Au centre-ville"]},{s:"Le voyage en bus est…",o:["plus long que le voyage en train","plus court que le voyage en train","aussi long que le voyage en train"]},{s:"Avec un billet de train, on peut…",o:["prendre le bus sans payer plus","se faire rembourser","prendre un taxi"]},{s:"Dans le bus, on ne peut pas…",o:["prendre son vélo","utiliser son téléphone","acheter un billet"]}]},
/* ---------- correspondance: e-mails, messages ---------- */
{k:"corresp",title:"Message de Camille",doc:`Salut Thu,
Comment ça va ? Moi, je suis enfin installée dans mon nouvel appartement à Nantes ! Il est petit mais très lumineux, et il y a un balcon avec une vue sur la Loire.
Samedi prochain, j'organise une petite fête pour fêter mon arrivée. Tu es libre ? Viens vers 19 h. Pas besoin d'apporter à manger, je prépare tout, mais si tu veux, tu peux venir avec ta guitare !
Pour venir, prends le tramway ligne 1 et descends à l'arrêt Commerce. J'habite juste à côté, au 5 rue Kervégan, troisième étage.
Réponds-moi avant jeudi, s'il te plaît.
Bisous,
Camille`,
 qs:[{s:"Camille écrit pour…",o:["inviter Thu à une fête","demander de l'aide pour déménager","annoncer son départ de Nantes"]},{s:"Comment est l'appartement de Camille ?",o:["Petit mais lumineux","Grand et sombre","Sans balcon"]},{s:"Que doit apporter Thu ?",o:["Rien à manger, mais sa guitare si elle veut","Un dessert","Des boissons"]},{s:"Pour aller chez Camille, il faut…",o:["prendre le tramway","prendre le bus ligne 1","marcher depuis la gare"]},{s:"Thu doit répondre…",o:["avant jeudi","samedi","après la fête"]}]},
{k:"corresp",title:"E-mail du club de randonnée",doc:`Objet : Sortie du dimanche 22 septembre
Bonjour à tous,
Notre prochaine randonnée aura lieu dimanche 22 septembre dans la forêt de Fontainebleau. Le rendez-vous est à 8 h 30 devant la gare de Melun. Nous marcherons environ 15 kilomètres, avec une pause pour le déjeuner vers midi.
Prévoyez de bonnes chaussures, un pique-nique et au moins un litre d'eau. Attention : il n'y a pas de magasin sur le parcours.
Le retour à la gare est prévu vers 17 h.
Merci de confirmer votre participation par e-mail avant mercredi, pour que nous puissions organiser les voitures.
À bientôt,
Nathalie, responsable du club`,
 qs:[{s:"Ce message présente…",o:["une sortie du club","une nouvelle règle du club","un nouveau responsable"]},{s:"Le rendez-vous est…",o:["devant une gare","dans la forêt","au club"]},{s:"Les participants doivent apporter…",o:["leur repas","de l'argent pour le restaurant","une tente"]},{s:"Pourquoi faut-il prendre de l'eau ?",o:["On ne peut rien acheter pendant la randonnée","L'eau de la forêt est sale","C'est une règle du club"]},{s:"Pourquoi faut-il confirmer avant mercredi ?",o:["Pour organiser les voitures","Pour réserver le restaurant","Pour payer l'inscription"]}]},
{k:"corresp",title:"Message d'un voisin",doc:`Bonjour Madame Nguyen,
Je suis Paul Lefèvre, votre voisin du deuxième étage. Je pars en vacances chez ma fille à Marseille du 2 au 16 août.
Est-ce que vous pourriez arroser mes plantes deux fois par semaine ? Je vais laisser ma clé chez la gardienne, Madame Rossi. Les plantes sont sur le balcon et dans la cuisine.
Si vous avez un problème, vous pouvez m'appeler au 06 45 12 78 30.
Pour vous remercier, je vous rapporterai du savon de Marseille !
Merci beaucoup et bon été,
Paul Lefèvre`,
 qs:[{s:"Pourquoi Paul écrit-il ?",o:["Pour demander un service","Pour inviter sa voisine","Pour se plaindre du bruit"]},{s:"Où Paul va-t-il en vacances ?",o:["Chez sa fille","Chez la gardienne","À la montagne"]},{s:"Que doit faire Madame Nguyen ?",o:["Arroser des plantes","Nourrir un chat","Récupérer le courrier"]},{s:"Où sera la clé ?",o:["Chez la gardienne","Sous le paillasson","Chez la fille de Paul"]},{s:"Comment Paul veut-il remercier sa voisine ?",o:["Avec un petit cadeau","Avec de l'argent","Avec un repas au restaurant"]}]},
{k:"corresp",title:"Réponse de l'école de langues",doc:`Objet : Votre demande d'inscription
Madame,
Nous vous remercions pour votre demande. Notre prochain cours de français niveau A2 commence le lundi 6 octobre. Les cours ont lieu le lundi et le jeudi, de 18 h 30 à 20 h, pendant douze semaines.
Avant de commencer, vous devez passer un petit test de niveau en ligne. Vous trouverez le lien en bas de ce message. Le test dure environ trente minutes.
Le prix du cours est de 280 €. Vous pouvez payer en deux fois.
N'oubliez pas d'apporter une photo d'identité le premier jour.
Cordialement,
Le secrétariat`,
 qs:[{s:"Ce message répond à…",o:["une demande d'inscription","une plainte","une offre d'emploi"]},{s:"Les cours ont lieu…",o:["deux soirs par semaine","tous les matins","le week-end"]},{s:"Avant le premier cours, il faut…",o:["faire un test en ligne","acheter un livre","rencontrer le professeur"]},{s:"Le paiement…",o:["peut se faire en deux fois","doit se faire en espèces","est gratuit pour les étudiants"]},{s:"Que faut-il apporter le premier jour ?",o:["Une photo","Un ordinateur","Un dictionnaire"]}]},
{k:"corresp",title:"Carte postale de Julien",doc:`Coucou la famille !
Me voici en Bretagne depuis cinq jours. Il fait un temps très changeant : un jour il pleut, le lendemain il fait grand soleil ! Hier, nous avons fait une promenade en bateau jusqu'à une petite île. C'était magnifique, mais j'ai eu un peu le mal de mer.
Ici, je mange des crêpes tous les jours et je commence à parler avec l'accent breton (je plaisante !).
Nous rentrons dimanche soir en train. Papa, tu peux venir nous chercher à la gare à 21 h ?
Je vous embrasse,
Julien`,
 qs:[{s:"Depuis combien de temps Julien est-il en Bretagne ?",o:["Cinq jours","Une semaine","Deux jours"]},{s:"Comment est le temps ?",o:["Il change souvent","Il fait toujours beau","Il pleut tous les jours"]},{s:"Pendant la promenade en bateau, Julien…",o:["n'était pas très bien","a pêché un poisson","a perdu son téléphone"]},{s:"Quand Julien parle de l'accent breton, il…",o:["fait une blague","se plaint","pose une question"]},{s:"Qu'est-ce que Julien demande à son père ?",o:["De venir le chercher à la gare","De lui envoyer de l'argent","De réserver un hôtel"]}]},
/* ---------- instructions: règlements, modes d'emploi, conseils ---------- */
{k:"instr",title:"Règlement de la bibliothèque",doc:`BIBLIOTHÈQUE MUNICIPALE – RÈGLES À RESPECTER
• L'inscription est gratuite pour les habitants de la ville. Apportez une pièce d'identité et un justificatif de domicile.
• Vous pouvez emprunter 5 livres et 2 DVD pour trois semaines.
• Pour garder un livre plus longtemps, prolongez-le sur notre site internet (une seule fois).
• En cas de retard, vous ne pouvez plus emprunter pendant une semaine.
• Les téléphones doivent être en mode silencieux. Les appels sont autorisés seulement dans le hall.
• Il est interdit de manger dans les salles de lecture. Les boissons en bouteille fermée sont acceptées.`,
 qs:[{s:"Pour s'inscrire, il faut apporter…",o:["une pièce d'identité","une photo","de l'argent"]},{s:"On peut emprunter des livres pour…",o:["trois semaines","une semaine","deux mois"]},{s:"Pour prolonger un livre, on peut…",o:["aller sur le site internet","téléphoner","envoyer une lettre"]},{s:"Si on rend un livre en retard…",o:["on ne peut pas emprunter pendant une semaine","on paie une amende","on doit acheter le livre"]},{s:"Dans les salles de lecture, on peut…",o:["boire de l'eau en bouteille fermée","manger un sandwich","téléphoner"]}]},
{k:"instr",title:"Mode d'emploi : machine à café",doc:`COMMENT UTILISER LA MACHINE À CAFÉ
1. Remplissez le réservoir avec de l'eau froide. Ne dépassez pas la ligne MAX.
2. Mettez une capsule dans la machine et fermez bien le couvercle.
3. Placez une tasse sous la sortie du café.
4. Appuyez sur le petit bouton pour un café court, sur le grand bouton pour un café long.
5. Après utilisation, retirez la capsule et jetez-la dans la poubelle jaune (recyclage).
Attention : n'ouvrez jamais la machine pendant que le café coule. Nettoyez le réservoir une fois par semaine.`,
 qs:[{s:"Dans le réservoir, il faut mettre…",o:["de l'eau froide","de l'eau chaude","du lait"]},{s:"Pour un café long, on appuie sur…",o:["le grand bouton","le petit bouton","les deux boutons"]},{s:"Où faut-il jeter la capsule ?",o:["Dans la poubelle jaune","Dans l'évier","Dans la poubelle verte"]},{s:"Qu'est-ce qui est interdit ?",o:["Ouvrir la machine pendant que le café coule","Faire deux cafés de suite","Utiliser une petite tasse"]},{s:"On nettoie le réservoir…",o:["chaque semaine","chaque jour","chaque mois"]}]},
{k:"instr",title:"Conseils pour la canicule",doc:`FORTE CHALEUR : LES BONS GESTES
• Buvez de l'eau régulièrement, même si vous n'avez pas soif.
• Évitez de sortir entre 12 h et 16 h, les heures les plus chaudes.
• Fermez les volets et les fenêtres pendant la journée. Ouvrez-les le soir et la nuit, quand il fait plus frais.
• Mouillez-vous le corps plusieurs fois par jour.
• Pensez aux personnes âgées de votre famille ou de votre immeuble : appelez-les ou rendez-leur visite.
• En cas de malaise, appelez le 15.`,
 qs:[{s:"Ce document donne des conseils pour…",o:["les jours de très forte chaleur","les jours de grand froid","les inondations"]},{s:"Il faut boire de l'eau…",o:["souvent, même sans soif","seulement le soir","seulement quand on a soif"]},{s:"Quand faut-il éviter de sortir ?",o:["Au milieu de la journée","Le matin","La nuit"]},{s:"Pendant la journée, les fenêtres doivent être…",o:["fermées","ouvertes","nettoyées"]},{s:"Le document demande aussi de…",o:["prendre des nouvelles des personnes âgées","aller à la piscine","acheter un ventilateur"]}]},
{k:"instr",title:"Consignes de l'auberge de jeunesse",doc:`BIENVENUE À L'AUBERGE DE JEUNESSE DU PORT
• L'accueil est ouvert de 7 h à 23 h. Après 23 h, utilisez le code de la porte donné à votre arrivée.
• Le petit-déjeuner est servi de 7 h 30 à 10 h dans la salle du rez-de-chaussée. Il est compris dans le prix.
• Les draps sont fournis. Les serviettes peuvent être louées à l'accueil (2 €).
• La cuisine commune est ouverte jusqu'à 22 h. Lavez et rangez votre vaisselle après utilisation.
• Merci de libérer votre lit avant 11 h le jour du départ. Vous pouvez laisser vos bagages à l'accueil gratuitement.`,
 qs:[{s:"Si vous rentrez à minuit, vous devez…",o:["utiliser le code de la porte","appeler l'accueil","sonner chez le directeur"]},{s:"Le petit-déjeuner…",o:["est inclus dans le prix","coûte deux euros","est servi dans les chambres"]},{s:"Que peut-on louer à l'accueil ?",o:["Une serviette","Des draps","Un vélo"]},{s:"Après avoir cuisiné, il faut…",o:["laver sa vaisselle","payer la cuisine","prévenir l'accueil"]},{s:"Le jour du départ, on peut…",o:["laisser ses bagages à l'accueil","garder son lit jusqu'au soir","prendre le petit-déjeuner jusqu'à midi"]}]},
{k:"instr",title:"Recette : salade niçoise",doc:`SALADE NIÇOISE (pour 4 personnes)
Ingrédients : 4 tomates, 2 œufs, 1 poivron vert, 1 oignon, 1 boîte de thon, des olives noires, de l'huile d'olive, du sel et du poivre.
1. Faites cuire les œufs dans l'eau bouillante pendant 10 minutes, puis laissez-les refroidir.
2. Coupez les tomates en morceaux, le poivron et l'oignon en fines tranches.
3. Mettez les légumes dans un grand plat. Ajoutez le thon et les olives.
4. Coupez les œufs en quatre et placez-les sur la salade.
5. Ajoutez l'huile d'olive, le sel et le poivre juste avant de servir. Servez bien frais.`,
 qs:[{s:"Cette recette est pour…",o:["quatre personnes","deux personnes","six personnes"]},{s:"Combien de temps faut-il cuire les œufs ?",o:["Dix minutes","Quatre minutes","Vingt minutes"]},{s:"Comment faut-il couper l'oignon ?",o:["En fines tranches","En gros morceaux","En quatre"]},{s:"Quand ajoute-t-on l'huile ?",o:["Juste avant de servir","Au début","Avec les œufs"]},{s:"Cette salade se mange…",o:["froide","chaude","tiède"]}]},
/* ---------- s'informer: articles courts ---------- */
{k:"info",title:"Des jardins sur les toits de Paris",doc:`Depuis quelques années, des jardins apparaissent sur les toits des immeubles parisiens. Écoles, hôtels, supermarchés : de nombreux bâtiments accueillent maintenant des légumes, des fleurs et même des ruches pour les abeilles.
Ces jardins ont plusieurs avantages. Ils rafraîchissent les immeubles en été et permettent de produire des fruits et des légumes en ville. Dans certaines écoles, les enfants apprennent à planter et à récolter pendant les cours de sciences.
Mais créer un jardin sur un toit n'est pas simple : il faut vérifier que le bâtiment est assez solide et prévoir un système pour l'eau. Malgré ces difficultés, la mairie de Paris veut continuer à encourager ces projets.`,
 qs:[{s:"De quoi parle cet article ?",o:["De jardins installés sur les toits","De nouveaux parcs publics","De la vente de légumes au marché"]},{s:"Sur certains toits, on trouve aussi…",o:["des ruches","des piscines","des terrains de sport"]},{s:"Quel avantage est cité ?",o:["Les immeubles sont plus frais en été","Les loyers sont moins chers","Il y a moins de bruit"]},{s:"Dans les écoles, les enfants…",o:["apprennent à cultiver des plantes","vendent des légumes","construisent des ruches"]},{s:"Que veut faire la mairie ?",o:["Continuer à soutenir ces projets","Interdire ces jardins","Vendre les toits"]}]},
{k:"info",title:"Le vélo, nouveau moyen de transport des Français",doc:`De plus en plus de Français utilisent le vélo pour aller au travail ou faire leurs courses. Dans les grandes villes, de nouvelles pistes cyclables ont été construites et les vélos électriques ont beaucoup de succès, surtout chez les personnes qui habitent loin de leur travail.
Pour encourager ce changement, certaines entreprises donnent une petite prime aux salariés qui viennent à vélo. Beaucoup de villes proposent aussi la location de vélos pour quelques euros par jour.
Cependant, tout le monde n'est pas convaincu. Certains trouvent la circulation dangereuse, et le manque de parkings pour vélos est un vrai problème dans les quartiers anciens.`,
 qs:[{s:"Selon l'article, les Français…",o:["utilisent plus le vélo qu'avant","utilisent moins le vélo qu'avant","n'aiment pas le vélo électrique"]},{s:"Les vélos électriques plaisent surtout…",o:["aux personnes qui habitent loin de leur travail","aux enfants","aux touristes"]},{s:"Certaines entreprises…",o:["donnent de l'argent aux salariés qui viennent à vélo","interdisent les vélos","vendent des vélos à leurs salariés"]},{s:"Dans beaucoup de villes, on peut…",o:["louer un vélo à petit prix","avoir un vélo gratuit","prendre des cours de vélo"]},{s:"Quel problème est mentionné ?",o:["Il manque des parkings pour vélos","Les vélos sont trop chers","Il n'y a pas de pistes cyclables"]}]},
{k:"info",title:"Une boîte à livres dans le village",doc:`À Saint-Aubin, petit village de Normandie, une vieille cabine téléphonique a trouvé une nouvelle vie. Depuis le mois de mai, elle est devenue une « boîte à livres ». Le principe est simple : chacun peut prendre un livre gratuitement et en déposer un autre à la place.
L'idée vient de Martine, une habitante à la retraite, ancienne professeure de français. « Je voulais que les gens se rencontrent et partagent leurs lectures », explique-t-elle.
Le succès est immédiat : romans, bandes dessinées, livres de cuisine… La boîte est souvent pleine. Le samedi matin, des habitants s'y retrouvent même pour discuter de leurs livres préférés.`,
 qs:[{s:"Qu'est devenue l'ancienne cabine téléphonique ?",o:["Un endroit pour échanger des livres","Une petite bibliothèque payante","Un café"]},{s:"Pour prendre un livre, il faut…",o:["en laisser un autre","payer un euro","s'inscrire à la mairie"]},{s:"Qui a eu cette idée ?",o:["Une habitante à la retraite","Le maire du village","Des élèves de l'école"]},{s:"Pourquoi Martine a-t-elle eu cette idée ?",o:["Pour que les gens se rencontrent","Pour vendre ses livres","Pour aider l'école"]},{s:"Le samedi matin, certains habitants…",o:["parlent de leurs livres","réparent la cabine","organisent un marché"]}]},
{k:"info",title:"Les jeunes et le petit-déjeuner",doc:`Selon une enquête récente, un adolescent français sur trois ne prend pas de petit-déjeuner avant d'aller au collège ou au lycée. Les raisons les plus fréquentes : le manque de temps et le manque de faim le matin.
Pourtant, les médecins rappellent que ce repas est important. Sans petit-déjeuner, beaucoup d'élèves ont du mal à se concentrer en classe et mangent ensuite des aliments trop sucrés pendant la récréation.
Pour changer les habitudes, certaines écoles proposent maintenant un petit-déjeuner gratuit une ou deux fois par semaine. Au menu : pain, fruits, produits laitiers. Les élèves apprécient, et les professeurs remarquent qu'ils sont plus attentifs ces jours-là.`,
 qs:[{s:"D'après l'enquête, combien d'adolescents ne prennent pas de petit-déjeuner ?",o:["Un sur trois","La moitié","Un sur dix"]},{s:"Quelle raison est donnée ?",o:["Ils n'ont pas le temps","Ils n'aiment pas le pain","Leurs parents ne veulent pas"]},{s:"Sans petit-déjeuner, beaucoup d'élèves…",o:["se concentrent mal","dorment mieux","font plus de sport"]},{s:"Certaines écoles offrent…",o:["un petit-déjeuner gratuit","des cours de cuisine","des goûters sucrés"]},{s:"Les jours de petit-déjeuner, les professeurs trouvent que les élèves…",o:["sont plus attentifs","sont plus fatigués","arrivent en retard"]}]},
{k:"info",title:"Le retour des vinyles",doc:`On pensait que les disques vinyles avaient disparu avec l'arrivée des CD, puis de la musique sur internet. Pourtant, depuis une dizaine d'années, leurs ventes augmentent à nouveau en France.
Qui les achète ? Bien sûr, des personnes âgées qui retrouvent la musique de leur jeunesse, mais aussi beaucoup de jeunes. Ils aiment le son « plus chaud » du vinyle et le plaisir de tenir un bel objet entre leurs mains.
Les disquaires, ces magasins spécialisés dans les disques, profitent de cette mode. Certains organisent même des concerts ou des soirées d'écoute. Un vinyle coûte cependant plus cher qu'un abonnement à une plateforme de musique : entre 20 et 35 euros.`,
 qs:[{s:"Selon l'article, les ventes de vinyles…",o:["augmentent de nouveau","diminuent","sont stables"]},{s:"Qui achète des vinyles ?",o:["Des personnes âgées et des jeunes","Seulement des personnes âgées","Seulement des musiciens"]},{s:"Pourquoi les jeunes aiment-ils les vinyles ?",o:["Pour le son et l'objet","Parce qu'ils sont bon marché","Parce qu'ils sont faciles à transporter"]},{s:"Certains disquaires organisent…",o:["des concerts","des cours de musique","des ventes de CD"]},{s:"Par rapport à un abonnement de musique, un vinyle est…",o:["plus cher","moins cher","gratuit"]}]}
];
const A2_REQ1=["Texte de 60 mots minimum","Raconter les faits dans l'ordre (d'abord, ensuite, enfin)","Utiliser le passé composé et l'imparfait","Donner vos impressions (j'ai aimé, c'était…)"];
const A2_REQ2=["Texte de 60 mots minimum","Formule d'appel et formule finale adaptées","Répondre à tous les points demandés","Utiliser tu ou vous correctement"];
[
 ["Vous avez passé un week-end à la campagne chez des amis. Vous écrivez un message sur votre blog pour raconter ce week-end : ce que vous avez fait, ce que vous avez aimé.",1],
 ["Vous êtes allé(e) à un concert ou à un festival. Vous racontez cette sortie à un(e) ami(e) français(e) : où, avec qui, comment c'était.",1],
 ["Vous avez déménagé dans une nouvelle ville. Vous écrivez à un(e) ami(e) pour décrire votre nouveau logement et votre quartier, et dire ce que vous en pensez.",1],
 ["Vous avez fêté votre anniversaire le week-end dernier. Sur un forum, vous racontez comment s'est passée cette journée.",1],
 ["Vous avez fait un voyage en train qui s'est mal passé (retard, problème…). Vous racontez ce voyage sur un forum de voyageurs.",1],
 ["Vous avez commencé un nouveau travail ou de nouveaux cours. Vous racontez votre première semaine à un(e) ami(e) : les personnes, les activités, vos impressions.",1],
 ["Vous avez visité un musée ou un monument. Vous écrivez un petit texte pour le site de votre école de langue pour raconter la visite et donner votre avis.",1],
 ["Vous avez participé à une fête traditionnelle dans votre pays. Vous la racontez à un(e) correspondant(e) français(e) : ce que les gens font, ce que vous avez fait.",1],
 ["Votre ami(e) Lucas vous invite à son mariage le 12 juillet, mais vous ne pouvez pas venir. Vous lui répondez : vous le/la remerciez, vous expliquez pourquoi vous ne pouvez pas venir et vous proposez de le/la voir à un autre moment.",2],
 ["Une collègue française vous propose d'aller au cinéma samedi. Vous acceptez. Vous lui répondez pour choisir le film, l'heure et le lieu de rendez-vous.",2],
 ["Vous avez vu une annonce pour une chambre à louer. Vous écrivez au propriétaire pour vous présenter et poser des questions (prix, date, quartier, règles).",2],
 ["Votre ami(e) français(e) va venir dans votre ville pour une semaine et vous demande des conseils. Vous lui répondez : où loger, quoi visiter, quoi manger.",2],
 ["Vous organisez un pique-nique avec la classe de français. Vous écrivez un message à tous les étudiants pour donner la date, le lieu, l'heure et dire ce que chacun doit apporter.",2],
 ["Votre voisin vous demande de garder son chat pendant ses vacances. Vous acceptez, mais vous lui posez quelques questions (nourriture, clés, horaires).",2],
 ["Vous avez acheté un vêtement sur internet, mais il ne vous va pas. Vous écrivez au service client pour expliquer le problème et demander un échange.",2],
 ["Une amie vous demande comment vous apprenez le français. Vous lui répondez en expliquant ce que vous faites chaque semaine et vous lui donnez deux conseils.",2]
].forEach(([p,e])=>WRITE.push({lv:"A2",p,min:60,max:80,genre:e===1?"récit":"message",req:e===1?A2_REQ1:A2_REQ2}));
