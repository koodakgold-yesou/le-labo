/* DELF B2 practice material organised by the seven recurring B2 themes.
   All texts, questions and prompts are original. Articles: correct option first
   (the page shuffles). Opinion sets: names in fixed order, `who` = index of the answer. */
const B2_THEMES={
 travail:{fr:"Le travail",vn:"Công việc"},
 education:{fr:"L'éducation",vn:"Giáo dục"},
 numerique:{fr:"Le numérique",vn:"Công nghệ số"},
 environnement:{fr:"L'environnement",vn:"Môi trường"},
 famille:{fr:"Famille et générations",vn:"Gia đình, thế hệ"},
 sante:{fr:"La santé",vn:"Sức khoẻ"},
 consommation:{fr:"Consommation et économie",vn:"Tiêu dùng, kinh tế"}
};

const B2_ARTICLES=[
{th:"travail",title:"Droit à la déconnexion : une protection encore fragile",
 doc:`Courriels à 22 heures, messages le week-end, appels pendant les congés : pour de nombreux salariés, la frontière entre vie professionnelle et vie privée s'est peu à peu effacée. Le smartphone, présenté au départ comme un outil de liberté, est devenu pour certains une laisse invisible.
En France, la loi reconnaît depuis 2017 un « droit à la déconnexion » : les entreprises d'au moins cinquante salariés doivent négocier avec les représentants du personnel les modalités qui permettent à chacun de ne pas répondre en dehors de ses heures de travail. Sur le papier, le principe fait l'unanimité. Dans les faits, son application reste très inégale. Beaucoup d'accords se contentent de recommandations générales, sans véritable contrôle, et rares sont les salariés qui osent ignorer un message de leur supérieur.
Car le problème est moins technique que culturel. Dans certaines équipes, répondre rapidement, même tard le soir, est perçu comme une preuve d'engagement. Celui qui se déconnecte craint de passer pour moins motivé que ses collègues. Les cadres sont les premiers concernés : ils bénéficient souvent d'une grande autonomie, mais celle-ci s'accompagne d'une disponibilité permanente.
Quelques entreprises ont choisi des solutions plus radicales : serveurs de messagerie coupés le soir, messages reçus pendant les vacances automatiquement supprimés, ou encore formation des managers à l'exemplarité. Les résultats semblent encourageants, mais ces initiatives demeurent minoritaires.
Pour les spécialistes de la santé au travail, l'enjeu dépasse le confort individuel. L'hyperconnexion favorise la fatigue chronique et les troubles du sommeil, et peut conduire à l'épuisement professionnel. Protéger le temps de repos ne serait donc pas un luxe, mais une condition de la performance durable.`,
 qs:[
  {s:"Selon l'auteur, pour certains salariés, le smartphone est devenu…",o:["une source de contrainte permanente","un outil de liberté totale","un objet inutile au travail"]},
  {s:"Que prévoit la loi de 2017 ?",o:["Une négociation sur les conditions de la déconnexion","L'interdiction des courriels après 18 heures","Une amende pour les salariés hyperconnectés"]},
  {s:"D'après le texte, l'application du droit à la déconnexion est…",o:["inégale selon les entreprises","stricte et contrôlée","totalement inexistante"]},
  {s:"Pourquoi certains salariés n'osent-ils pas se déconnecter ?",o:["Ils craignent de paraître moins engagés.","Leur contrat le leur interdit.","Ils n'ont pas d'horaires fixes."]},
  {s:"Les mesures radicales de certaines entreprises sont présentées comme…",o:["prometteuses mais encore rares","inefficaces et coûteuses","obligatoires depuis peu"]},
  {s:"Dans sa conclusion, l'auteur considère que la déconnexion…",o:["sert aussi l'efficacité à long terme","est un privilège réservé aux cadres","nuit à la productivité"]}
 ]},
{th:"education",title:"Évaluer sans noter : la fin des notes à l'école ?",
 doc:`Dans un nombre croissant d'écoles primaires, les traditionnelles notes sur vingt laissent place à des grilles de compétences : « acquis », « en cours d'acquisition », « non acquis ». Pour leurs défenseurs, ces nouvelles formes d'évaluation ont un objectif simple : faire de l'erreur une étape de l'apprentissage plutôt qu'une sanction.
Les arguments ne manquent pas. Une note isolée, disent-ils, renseigne mal sur ce que l'enfant sait réellement faire : un 11 peut cacher une excellente compréhension et de nombreuses fautes d'inattention. Surtout, la note installe très tôt une logique de classement. Les élèves en difficulté finissent par se convaincre qu'ils sont « nuls », tandis que les meilleurs travaillent parfois davantage pour la note que pour le plaisir de comprendre.
Les opposants, eux, dénoncent un flou qui pénaliserait d'abord les familles les moins familières du système scolaire. Une note, rappellent-ils, se comprend immédiatement ; une grille de quinze compétences, beaucoup moins. Certains parents avouent ne plus savoir si leur enfant progresse ou non. D'autres craignent que la disparition des notes ne prépare mal les élèves au collège, où l'évaluation chiffrée revient brutalement.
Entre ces deux positions, de nombreux enseignants cherchent une voie médiane. Ils conservent des notes pour certains contrôles, mais les accompagnent de commentaires précis et de moments de correction collective. D'autres associent les élèves à leur propre évaluation, en leur demandant de repérer eux-mêmes leurs progrès.
Au fond, la question n'est peut-être pas de choisir entre notes et compétences, mais de savoir à quoi sert l'évaluation : trier les élèves ou les aider à apprendre.`,
 qs:[
  {s:"Quel est l'objectif principal des nouvelles formes d'évaluation ?",o:["Faire de l'erreur une partie de l'apprentissage","Rendre les contrôles plus difficiles","Classer plus précisément les élèves"]},
  {s:"Selon les défenseurs de la réforme, une note isolée…",o:["donne une image incomplète des acquis","est toujours injuste","motive tous les élèves"]},
  {s:"Quel effet de la note sur les élèves en difficulté est évoqué ?",o:["Ils perdent confiance en eux.","Ils travaillent davantage.","Ils changent d'école."]},
  {s:"Pour les opposants, les grilles de compétences désavantagent surtout…",o:["les familles qui connaissent mal l'école","les enseignants expérimentés","les meilleurs élèves"]},
  {s:"Que font certains enseignants pour trouver un compromis ?",o:["Ils ajoutent des commentaires détaillés aux notes.","Ils suppriment tous les contrôles.","Ils laissent les parents noter les devoirs."]},
  {s:"Dans la dernière phrase, l'auteur invite à…",o:["réfléchir au but de l'évaluation","rétablir les notes partout","attendre une décision du ministère"]}
 ]},
{th:"numerique",title:"Intelligence artificielle à l'université : tricher ou apprendre autrement ?",
 doc:`Il suffit désormais de quelques secondes pour obtenir d'un agent conversationnel un résumé de cours, une dissertation ou la correction d'un exercice de mathématiques. Depuis l'arrivée de ces outils dans le grand public, les universités sont confrontées à une question délicate : faut-il les interdire ou apprendre à les utiliser ?
Les premières réactions ont été défensives. Certains établissements ont interdit leur usage lors des examens, d'autres ont multiplié les logiciels censés détecter les textes produits par une machine. Mais ces détecteurs se sont révélés peu fiables : ils accusent parfois à tort des étudiants qui ont rédigé seuls leur devoir, en particulier ceux qui écrivent dans une langue étrangère.
Peu à peu, une autre approche s'impose. Plutôt que de lutter contre une technologie que les étudiants utiliseront de toute façon dans leur vie professionnelle, de nombreux enseignants préfèrent transformer leurs exercices. Les devoirs à la maison laissent place à des présentations orales, à des travaux réalisés en classe ou à des analyses où l'étudiant doit critiquer une réponse produite par l'IA. L'objectif n'est plus seulement de vérifier un résultat, mais d'évaluer un raisonnement.
Cette évolution ne règle pas tout. Les étudiants les plus à l'aise avec ces outils en tirent un avantage considérable, tandis que d'autres les utilisent sans esprit critique, au risque de reproduire des erreurs ou des informations inventées. Les enseignants, de leur côté, reconnaissent manquer de formation.
L'intelligence artificielle ne fera donc pas disparaître l'apprentissage, mais elle oblige l'université à redéfinir ce qu'elle attend de ses étudiants : moins mémoriser, davantage comprendre, vérifier et argumenter.`,
 qs:[
  {s:"Quelle question les universités se posent-elles ?",o:["Faut-il interdire l'IA ou en encadrer l'usage ?","Faut-il remplacer les enseignants par l'IA ?","Faut-il supprimer les examens écrits ?"]},
  {s:"Que reproche-t-on aux logiciels de détection ?",o:["Ils se trompent régulièrement.","Ils sont trop chers.","Ils sont interdits par la loi."]},
  {s:"Quels étudiants sont particulièrement touchés par ces erreurs ?",o:["Ceux qui écrivent dans une langue étrangère","Ceux qui étudient les mathématiques","Ceux qui n'ont pas d'ordinateur"]},
  {s:"Pourquoi de nombreux enseignants renoncent-ils à lutter contre l'IA ?",o:["Les étudiants s'en serviront plus tard dans leur métier.","L'IA corrige mieux qu'eux.","L'université le leur interdit."]},
  {s:"Quel risque est mentionné ?",o:["Un usage sans esprit critique","La disparition des bibliothèques","Une baisse du nombre d'étudiants"]},
  {s:"Selon la conclusion, l'IA pousse l'université à…",o:["revoir ses attentes envers les étudiants","abandonner l'enseignement oral","favoriser la mémorisation"]}
 ]},
{th:"environnement",title:"La nuit disparaît, et la biodiversité avec elle",
 doc:`Lampadaires, vitrines allumées toute la nuit, panneaux publicitaires lumineux : dans les grandes villes, il ne fait presque plus jamais vraiment nuit. Longtemps considérée comme un simple désagrément pour les astronomes, la pollution lumineuse est aujourd'hui reconnue comme une menace sérieuse pour le vivant.
Les premières victimes sont les animaux nocturnes. De nombreux insectes, attirés par les lampes, tournent autour jusqu'à l'épuisement, au lieu de se nourrir ou de se reproduire. Or ces insectes jouent un rôle essentiel dans la pollinisation et servent de nourriture aux oiseaux et aux chauves-souris. Certaines espèces d'oiseaux migrateurs, qui s'orientent grâce aux étoiles, sont désorientées par les halos lumineux des villes. Même les arbres sont touchés : éclairés en permanence, certains gardent leurs feuilles plus longtemps à l'automne.
L'être humain n'est pas épargné. L'exposition à la lumière artificielle le soir perturbe la production de mélatonine, l'hormone qui régule le sommeil. Les médecins y voient l'une des causes possibles de l'augmentation des troubles du sommeil.
Bonne nouvelle : contrairement à d'autres formes de pollution, celle-ci peut être réduite rapidement et à faible coût. De nombreuses communes ont déjà choisi d'éteindre l'éclairage public au milieu de la nuit, ou de le remplacer par des lampes orientées vers le sol et moins puissantes. Ces mesures permettent en outre de réaliser d'importantes économies d'énergie.
Les réticences existent pourtant. Certains habitants associent l'obscurité à l'insécurité, même si les études sur ce lien restent contradictoires. Convaincre la population demeure donc la première étape : rendre la nuit à la nature suppose d'abord de changer notre regard sur elle.`,
 qs:[
  {s:"Au départ, la pollution lumineuse était surtout perçue comme…",o:["une gêne pour les astronomes","un danger pour la santé","un problème pour les agriculteurs"]},
  {s:"Pourquoi les insectes sont-ils menacés par l'éclairage ?",o:["Ils s'épuisent autour des lampes.","Ils ne trouvent plus de plantes.","La lumière les rend agressifs."]},
  {s:"Quel est l'effet de la lumière sur certains oiseaux migrateurs ?",o:["Elle perturbe leur orientation.","Elle les empêche de dormir le jour.","Elle les attire vers les forêts."]},
  {s:"Selon le texte, chez l'être humain, la lumière artificielle le soir…",o:["peut nuire au sommeil","améliore la concentration","n'a aucun effet connu"]},
  {s:"Quel avantage de la lutte contre cette pollution est souligné ?",o:["Elle est rapide et peu coûteuse.","Elle crée de nombreux emplois.","Elle ne demande aucun changement."]},
  {s:"Quel obstacle l'auteur mentionne-t-il à la fin ?",o:["Le sentiment d'insécurité de certains habitants","Le prix des nouvelles lampes","L'opposition des scientifiques"]}
 ]},
{th:"famille",title:"Grands-parents : les piliers discrets de la famille",
 doc:`Ils vont chercher les enfants à la sortie de l'école, les gardent pendant les vacances, dépannent quand la crèche est fermée : en France comme dans de nombreux pays, les grands-parents occupent une place considérable dans l'organisation des familles. Sans eux, beaucoup de parents auraient bien du mal à concilier vie professionnelle et vie familiale.
Ce rôle a profondément évolué. Les grands-parents d'aujourd'hui sont souvent plus jeunes, en meilleure santé et plus actifs que ceux des générations précédentes. Beaucoup exercent encore une activité professionnelle, voyagent ou s'engagent dans des associations. Ils ne correspondent plus guère à l'image du grand-père au coin du feu, mais ils restent très présents, parfois au prix d'une certaine fatigue.
Cette proximité est généralement vécue comme une richesse. Les enfants trouvent auprès de leurs grands-parents une autorité plus souple, une écoute différente, et la transmission d'une histoire familiale que les parents, pressés par le quotidien, n'ont pas toujours le temps de raconter. De leur côté, les aînés disent se sentir utiles et rester ainsi en lien avec le monde des jeunes.
La relation n'est cependant pas toujours sans tensions. Les désaccords sur l'éducation (l'alimentation, les écrans, l'heure du coucher) sont fréquents, et certains parents reprochent à leurs propres parents de ne pas respecter leurs règles. À l'inverse, des grands-parents se plaignent d'être considérés comme une solution de garde gratuite et toujours disponible.
Pour les sociologues, ces frictions sont le signe d'une relation vivante plutôt que d'une crise. Elles invitent surtout chaque génération à exprimer clairement ses attentes, afin que l'aide ne se transforme pas en obligation.`,
 qs:[
  {s:"Selon le texte, l'aide des grands-parents permet surtout aux parents de…",o:["concilier travail et vie de famille","faire des économies sur l'école","partir plus souvent en voyage"]},
  {s:"Comment les grands-parents d'aujourd'hui sont-ils décrits ?",o:["Plus jeunes et plus actifs qu'autrefois","Plus isolés qu'autrefois","Moins attachés à leurs petits-enfants"]},
  {s:"Qu'apportent les grands-parents aux enfants, d'après l'auteur ?",o:["Une autre forme d'écoute et la mémoire familiale","Une discipline plus stricte","Une aide financière régulière"]},
  {s:"Quelle source de conflit est mentionnée ?",o:["Des règles éducatives différentes","Le partage de l'héritage","Le choix de l'école"]},
  {s:"De quoi certains grands-parents se plaignent-ils ?",o:["D'être sollicités comme une garde permanente","De ne pas voir assez leurs petits-enfants","D'être exclus des décisions financières"]},
  {s:"Pour les sociologues, ces tensions…",o:["montrent que la relation est vivante","annoncent une rupture entre générations","sont propres à la France"]}
 ]},
{th:"sante",title:"Bien manger, une question de moyens ?",
 doc:`Cinq fruits et légumes par jour, moins de sucre, moins de sel, davantage de produits frais : les recommandations nutritionnelles sont connues de presque tout le monde. Pourtant, toutes les catégories sociales ne les appliquent pas de la même manière. Les enquêtes montrent régulièrement que l'obésité et les maladies liées à l'alimentation touchent davantage les ménages modestes.
L'explication la plus souvent avancée est le prix. À calorie égale, les produits transformés, riches en graisses et en sucres, coûtent souvent moins cher que les fruits, les légumes ou le poisson. Pour une famille dont le budget est serré, remplir le réfrigérateur passe avant l'équilibre des repas.
Mais l'argent n'explique pas tout. Le manque de temps joue aussi un rôle : cuisiner des produits frais demande de l'organisation, et les plats tout prêts séduisent les parents qui rentrent tard du travail. Certains quartiers, par ailleurs, comptent plus de restaurants rapides que de marchés ou de commerces de fruits et légumes. Enfin, les habitudes alimentaires se transmettent dans la famille et sont difficiles à modifier.
Face à ce constat, les campagnes d'information montrent leurs limites : savoir ce qu'il faudrait manger ne suffit pas à changer son assiette. Les spécialistes plaident donc pour des mesures plus concrètes. La restauration scolaire, par exemple, permet d'offrir chaque jour à tous les enfants un repas équilibré, quel que soit le revenu de leurs parents. D'autres proposent de taxer davantage les boissons sucrées ou de rendre les fruits et légumes plus accessibles grâce à des aides ciblées.
Bien manger ne relèverait donc pas uniquement de la responsabilité individuelle. C'est aussi un enjeu d'égalité, qui concerne les pouvoirs publics autant que les familles.`,
 qs:[
  {s:"Selon les enquêtes, les maladies liées à l'alimentation…",o:["touchent davantage les ménages modestes","concernent surtout les personnes âgées","diminuent dans toutes les catégories sociales"]},
  {s:"Pourquoi les produits transformés sont-ils souvent choisis ?",o:["Ils sont moins chers à calorie égale.","Ils sont recommandés par les médecins.","Ils se conservent moins longtemps."]},
  {s:"Quel autre facteur que l'argent est cité ?",o:["Le manque de temps pour cuisiner","Le goût des enfants pour les légumes","Le prix de l'électricité"]},
  {s:"D'après le texte, les campagnes d'information…",o:["ne suffisent pas à modifier les comportements","ont fait disparaître l'obésité","sont devenues trop rares"]},
  {s:"Quel est l'intérêt de la restauration scolaire selon les spécialistes ?",o:["Garantir un repas équilibré à tous les enfants","Réduire le temps passé à l'école","Remplacer les repas du soir"]},
  {s:"Quelle est la position de l'auteur dans la conclusion ?",o:["L'alimentation est aussi une question collective.","Chacun est seul responsable de son assiette.","L'État ne doit pas intervenir."]}
 ]},
{th:"consommation",title:"La seconde main : effet de mode ou vrai changement ?",
 doc:`Il y a encore quinze ans, acheter des vêtements d'occasion était souvent associé au manque d'argent. Aujourd'hui, la seconde main est devenue tendance. Applications de revente entre particuliers, friperies branchées, rayons dédiés dans les grandes enseignes : le marché connaît une croissance spectaculaire, portée en particulier par les jeunes.
Les motivations sont multiples. L'argument économique reste important : on peut s'habiller pour un prix bien inférieur à celui du neuf, et même gagner un peu d'argent en revendant ce que l'on ne porte plus. Mais beaucoup d'acheteurs mettent aussi en avant des raisons écologiques. L'industrie textile consomme énormément d'eau et d'énergie, et prolonger la vie d'un vêtement permet de limiter ces dégâts. D'autres, enfin, apprécient de porter des pièces originales, loin de l'uniformité des grandes chaînes.
Ce succès suscite pourtant des interrogations. Certains observateurs remarquent que la revente facile peut encourager… à acheter davantage. Puisqu'on pourra revendre un pull après l'avoir porté deux fois, pourquoi hésiter à l'acheter ? La seconde main deviendrait alors un simple complément de la consommation de masse, et non une alternative. Par ailleurs, l'envoi de millions de colis entre particuliers a lui aussi un coût environnemental.
Les grandes marques l'ont bien compris : nombre d'entre elles proposent désormais de reprendre les anciens vêtements de leurs clients, souvent en échange d'un bon d'achat… valable sur des articles neufs.
La seconde main n'est donc ni une solution miracle ni une simple mode. Son impact dépendra surtout de l'usage qu'en feront les consommateurs : acheter d'occasion pour acheter moins, ou pour acheter toujours plus.`,
 qs:[
  {s:"Autrefois, acheter d'occasion était souvent lié…",o:["à des difficultés financières","à une conscience écologique","à un effet de mode"]},
  {s:"Quelle motivation écologique est mentionnée ?",o:["Prolonger la vie des vêtements","Acheter uniquement des produits locaux","Éviter les tissus synthétiques"]},
  {s:"Quel paradoxe certains observateurs soulignent-ils ?",o:["La revente peut pousser à consommer davantage.","L'occasion coûte plus cher que le neuf.","Les jeunes refusent la seconde main."]},
  {s:"Quel autre inconvénient est évoqué ?",o:["L'impact des envois de colis","La mauvaise qualité des vêtements","Le manque de choix"]},
  {s:"Comment l'auteur présente-t-il les offres de reprise des grandes marques ?",o:["Avec une certaine ironie","Avec enthousiasme","Avec indifférence"]},
  {s:"Selon la conclusion, l'impact de la seconde main dépend…",o:["du comportement des consommateurs","des décisions des grandes marques","de l'évolution des prix"]}
 ]}
];

const B2_POV=[
{th:"travail",title:"Le télétravail à 100 % : liberté ou isolement ?",names:["Inès","Patrick","Sonia"],
 doc:`Inès, développeuse : « Depuis que je travaille entièrement de chez moi, j'ai retrouvé les deux heures par jour que je perdais dans les transports. Je suis plus concentrée, et mon employeur n'a jamais eu à se plaindre de mes résultats. Revenir au bureau tous les jours me semblerait absurde. »
Patrick, directeur des ressources humaines : « Le télétravail a des avantages, mais à temps complet il fragilise le collectif. Les nouveaux salariés, surtout, apprennent en observant leurs collègues. Je défends un modèle hybride, avec deux ou trois jours de présence par semaine. »
Sonia, psychologue du travail : « Je reçois de plus en plus de personnes qui souffrent d'isolement. Le problème n'est pas tant le lieu de travail que l'absence de limites : quand le bureau est installé dans la cuisine, on ne s'arrête jamais vraiment. »`,
 qs:[{s:"Qui met en avant le temps gagné ?",who:0},{s:"Qui s'inquiète pour l'intégration des débutants ?",who:1},{s:"Qui propose un partage entre domicile et bureau ?",who:1},{s:"Qui évoque la difficulté de séparer travail et vie privée ?",who:2},{s:"Qui s'appuie sur ce qu'il ou elle observe chez d'autres personnes ?",who:2}]},
{th:"education",title:"Les devoirs à la maison : utiles ou injustes ?",names:["Claire","Mehdi","Hélène"],
 doc:`Claire, professeure de collège : « Les devoirs prolongent ce qui a été fait en classe. Sans entraînement régulier, les notions s'oublient très vite. Je donne des exercices courts, que chaque élève peut faire seul en vingt minutes. »
Mehdi, père de trois enfants : « Le soir, je rentre tard et je ne peux pas aider mes enfants. D'autres élèves ont des parents disponibles ou prennent des cours particuliers. Les devoirs renforcent les inégalités : tout le travail devrait se faire à l'école. »
Hélène, chercheuse en sciences de l'éducation : « Les études ne montrent pas d'effet clair des devoirs à l'école primaire. Au collège, c'est différent, à condition qu'ils soient bien conçus. Le vrai sujet, c'est la qualité des exercices, pas leur quantité. »`,
 qs:[{s:"Qui souligne l'importance de la répétition ?",who:0},{s:"Qui pense que les devoirs avantagent certaines familles ?",who:1},{s:"Qui distingue selon l'âge des élèves ?",who:2},{s:"Qui souhaite que tout le travail scolaire ait lieu en classe ?",who:1},{s:"Qui accorde plus d'importance à la conception des exercices qu'à leur nombre ?",who:2}]},
{th:"numerique",title:"Interdire les réseaux sociaux avant 15 ans ?",names:["Laurent","Jade","Antoine"],
 doc:`Laurent, pédiatre : « Je vois chaque semaine des adolescents épuisés, anxieux, qui comparent sans cesse leur vie à celle des autres. Une interdiction avant quinze ans enverrait un signal clair aux familles, même si elle sera difficile à contrôler. »
Jade, 17 ans, lycéenne : « Interdire, c'est inutile : tout le monde trouvera un moyen de contourner la règle. Ce qu'il faudrait, c'est nous apprendre à repérer les fausses informations et à gérer notre temps d'écran. À l'école, personne ne nous en parle. »
Antoine, juriste spécialisé dans le numérique : « Le débat se concentre sur les utilisateurs, alors que ce sont les plateformes qui conçoivent leurs applications pour capter l'attention. C'est à elles qu'il faut imposer des obligations, sous peine de lourdes sanctions. »`,
 qs:[{s:"Qui fonde son avis sur ce qu'il observe dans son métier ?",who:0},{s:"Qui doute de l'utilité d'une interdiction ?",who:1},{s:"Qui réclame une éducation aux médias ?",who:1},{s:"Qui veut responsabiliser les entreprises ?",who:2},{s:"Qui reconnaît les limites pratiques de la mesure qu'il soutient ?",who:0}]},
{th:"environnement",title:"Des centres-villes sans voitures ?",names:["Martine","Rachid","Élodie"],
 doc:`Martine, commerçante : « Depuis que la rue principale est devenue piétonne, j'ai perdu une partie de ma clientèle, surtout les gens qui viennent des villages voisins. Sans parking à proximité, ils préfèrent aller au centre commercial. »
Rachid, médecin : « La pollution de l'air provoque chaque année de nombreux décès prématurés. Réduire la circulation, c'est d'abord une question de santé publique : les intérêts économiques ne peuvent pas passer avant. »
Élodie, urbaniste : « Interdire ne suffit pas, il faut proposer des alternatives. Des transports en commun fréquents, des pistes cyclables sûres et des parkings relais à l'entrée de la ville rendent la transition acceptable pour tous. »`,
 qs:[{s:"Qui parle des conséquences économiques de la mesure ?",who:0},{s:"Qui place la santé avant tout ?",who:1},{s:"Qui insiste sur les solutions de remplacement ?",who:2},{s:"Qui évoque les habitants des communes alentour ?",who:0},{s:"Qui pense qu'une interdiction seule est insuffisante ?",who:2}]},
{th:"famille",title:"Rester chez ses parents après 25 ans",names:["Nadia","Gérard","Sylvie"],
 doc:`Nadia, 26 ans : « Je vis encore chez mes parents parce que les loyers sont trop élevés. Ce n'est pas un choix de confort : je participe aux dépenses de la maison et je mets de l'argent de côté pour acheter un appartement plus tard. »
Gérard, 61 ans, père de famille : « J'aime avoir mon fils à la maison, mais à son âge, j'étais déjà marié et je travaillais depuis longtemps. Je crains qu'il ne repousse sans cesse le moment de prendre ses responsabilités. »
Sylvie, sociologue : « Ce phénomène ne traduit pas une paresse des jeunes. Les études sont plus longues, les premiers emplois plus précaires. Et la cohabitation se passe souvent bien, car les relations entre parents et enfants sont moins autoritaires qu'autrefois. »`,
 qs:[{s:"Qui explique sa situation par le coût du logement ?",who:0},{s:"Qui compare avec sa propre jeunesse ?",who:1},{s:"Qui refuse l'idée que les jeunes manquent d'efforts ?",who:2},{s:"Qui affirme contribuer financièrement ?",who:0},{s:"Qui évoque l'évolution des rapports familiaux ?",who:2}]},
{th:"sante",title:"La cigarette électronique pour arrêter de fumer ?",names:["Bruno","Dr Chen","Manon"],
 doc:`Bruno, ancien fumeur : « J'ai fumé un paquet par jour pendant vingt ans. Grâce à la cigarette électronique, j'ai arrêté le tabac en trois mois. Pour moi, c'est un outil de sevrage efficace, bien moins nocif que la cigarette classique. »
Dr Chen, pneumologue : « Elle peut aider certains fumeurs, mais nous manquons de recul sur ses effets à long terme. Je ne la conseille que comme une étape transitoire, accompagnée d'un suivi médical. »
Manon, professeure de lycée : « Ce qui m'inquiète, ce sont les adolescents qui n'ont jamais fumé et qui commencent directement avec des cigarettes électroniques parfumées. Les arômes sucrés devraient être interdits. »`,
 qs:[{s:"Qui témoigne de son expérience personnelle ?",who:0},{s:"Qui souligne le manque de données sur la durée ?",who:1},{s:"Qui s'inquiète pour les jeunes non-fumeurs ?",who:2},{s:"Qui recommande un accompagnement par un professionnel ?",who:1},{s:"Qui demande l'interdiction de certains produits ?",who:2}]},
{th:"consommation",title:"Faut-il limiter le nombre de touristes ?",names:["Giulia","Marc","Aïcha"],
 doc:`Giulia, habitante d'une ville historique : « Chaque été, les rues de mon quartier sont envahies. Les logements sont transformés en locations pour touristes et les familles s'en vont. Je soutiens les quotas : une ville n'est pas un parc d'attractions. »
Marc, guide touristique : « Le tourisme fait vivre des milliers de personnes. Plutôt que de limiter les visiteurs, mieux vaut les répartir dans le temps et dans l'espace, en faisant découvrir des lieux moins connus. »
Aïcha, voyageuse : « Je fais plus attention qu'avant : je pars hors saison, je prends le train quand c'est possible et je reste plus longtemps au même endroit. Les touristes aussi peuvent changer leurs habitudes. »`,
 qs:[{s:"Qui décrit les effets du tourisme sur le logement ?",who:0},{s:"Qui rappelle l'importance économique du tourisme ?",who:1},{s:"Qui propose de mieux répartir les visiteurs ?",who:1},{s:"Qui évoque des changements dans sa propre façon de voyager ?",who:2},{s:"Qui est favorable à un nombre maximal de visiteurs ?",who:0}]}
];

/* Production écrite B2 (250 mots minimum in the official exam; 250–300 here as a target). */
const B2_REQ={
 lettre:["Lettre formelle : lieu et date, objet, formule d'appel, formule de politesse","Présenter la situation et votre rôle (en tant que…)","Au moins deux arguments développés, avec des exemples précis","Une ou deux propositions concrètes","Registre soutenu ; connecteurs de concession et de conséquence"],
 forum:["Prise de position claire dès l'introduction","Concession puis réfutation (Certes… néanmoins…)","Au moins deux arguments développés avec des exemples","Conclusion qui reformule votre opinion","Connecteurs logiques variés"],
 article:["Titre accrocheur et courte introduction","Présentation du phénomène","Arguments pour et contre, puis votre point de vue argumenté","Conclusion ouverte","Registre neutre ou soutenu"]
};
const B2_WRITE=[
 ["travail","lettre","Votre entreprise a décidé de supprimer le télétravail et d'imposer cinq jours de présence par semaine. En tant que représentant(e) du personnel, vous écrivez au directeur général pour contester cette décision et proposer une autre organisation."],
 ["travail","forum","Sur un forum consacré à l'emploi, un internaute affirme : « Aujourd'hui, les jeunes ne veulent plus faire d'efforts au travail. » Vous réagissez en donnant votre opinion, arguments et exemples à l'appui."],
 ["education","lettre","Le lycée de votre enfant envisage de supprimer les voyages scolaires pour des raisons budgétaires. En tant que parent d'élève, vous écrivez au proviseur pour défendre ces voyages et proposer des solutions de financement."],
 ["education","article","Vous écrivez un article pour le journal de votre université sur la question suivante : « Les cours en ligne peuvent-ils remplacer les cours en présentiel ? »"],
 ["numerique","forum","Sur un forum de parents, on débat de la question : « Faut-il interdire le téléphone portable aux enfants avant 13 ans ? » Vous donnez votre point de vue de façon argumentée."],
 ["numerique","lettre","Votre mairie veut remplacer les guichets de plusieurs services publics par des démarches uniquement en ligne. Vous écrivez au maire pour exprimer votre inquiétude, notamment pour les personnes âgées, et proposer des solutions."],
 ["environnement","lettre","Un grand centre commercial doit être construit sur des terres agricoles près de chez vous. Vous écrivez au maire pour vous opposer à ce projet, en expliquant ses conséquences sur l'environnement, et vous proposez d'autres solutions pour dynamiser la commune."],
 ["environnement","article","Pour un magazine en ligne, vous rédigez un article sur la question : « Les gestes individuels suffisent-ils à protéger la planète ? »"],
 ["famille","forum","Sur un forum de société, un internaute écrit : « Les grands-parents n'ont pas à garder leurs petits-enfants gratuitement. » Vous réagissez en donnant votre opinion."],
 ["famille","article","Vous écrivez un article pour un magazine sur la question : « Les écrans éloignent-ils les générations les unes des autres ? »"],
 ["sante","lettre","La salle de sport municipale de votre ville va fermer faute de moyens. Vous écrivez au maire pour défendre ce lieu, en insistant sur son rôle pour la santé des habitants, et vous proposez des solutions pour le maintenir ouvert."],
 ["sante","forum","Sur un forum consacré à la santé, on débat de la question : « Faut-il taxer davantage les produits trop sucrés ? » Vous donnez votre avis de manière argumentée."],
 ["consommation","lettre","Vous avez acheté un lave-linge qui est tombé en panne un mois après la fin de la garantie, et le magasin refuse de le réparer gratuitement. Vous écrivez au service client de l'enseigne pour vous plaindre et demander une solution."],
 ["consommation","article","Pour le journal de votre ville, vous écrivez un article sur la question : « Le tourisme de masse : faut-il limiter le nombre de visiteurs ? »"]
].map(([th,genre,p])=>({lv:"B2",th,genre,p,min:250,max:300,req:B2_REQ[genre]}));

/* Production orale B2: short trigger document, problématique, ideas for and against,
   vocabulary with English equivalents (4th field = faux-ami warning). */
const B2_ORAL=[
{th:"travail",title:"La semaine de quatre jours séduit les jeunes diplômés",
 doc:"Lors des entretiens d'embauche, une question revient de plus en plus souvent : l'entreprise propose-t-elle la semaine de quatre jours ? Pour de nombreux jeunes diplômés, ce critère compte désormais autant que le salaire. Ils y voient la possibilité de mieux équilibrer travail, loisirs et vie familiale. Certaines entreprises l'ont compris et en font un argument pour attirer les talents. D'autres restent prudentes : concentrer le temps de travail sur quatre jours peut allonger les journées et augmenter la fatigue. Dans les secteurs où une présence continue est indispensable, comme la santé ou le commerce, la mise en place s'annonce plus compliquée.",
 prob:"La semaine de quatre jours est-elle une organisation du travail souhaitable pour tous ?",
 pour:["meilleur équilibre entre vie professionnelle et vie privée","moins de stress et d'absentéisme","argument pour attirer et fidéliser les salariés"],
 contre:["journées plus longues, fatigue accrue","difficile dans les secteurs à présence continue (santé, commerce)","risque d'intensification du travail"],
 lex:[["l'embauche (nf)","hiring","việc tuyển dụng"],["l'équilibre (nm)","balance","sự cân bằng"],["attirer les talents","to attract talent","thu hút nhân tài"],["fidéliser","to retain (staff, customers)","giữ chân"],["le stage","internship","kỳ thực tập","Faux ami: stage ≠ sân khấu (la scène)."]]},
{th:"travail",title:"Le grand retour au bureau",
 doc:"Après plusieurs années de télétravail massif, de grandes entreprises demandent à leurs salariés de revenir davantage au bureau. Les directions invoquent la créativité, la cohésion des équipes et la transmission des savoir-faire, plus difficiles à distance. Du côté des salariés, la décision passe mal : beaucoup ont réorganisé leur vie autour du travail à domicile, parfois en déménageant loin des grandes villes. Certains n'hésitent plus à démissionner pour rejoindre une entreprise plus souple. Entre exigence de présence et désir d'autonomie, les employeurs cherchent un difficile compromis.",
 prob:"Le travail au bureau reste-t-il indispensable à l'heure du numérique ?",
 pour:["cohésion d'équipe et créativité","formation des nouveaux salariés par l'observation","séparation claire entre vie privée et travail"],
 contre:["temps et argent perdus dans les transports","autonomie et concentration accrues à domicile","risque de départ des salariés"],
 lex:[["démissionner","to resign","xin nghỉ việc"],["la cohésion","cohesion","sự gắn kết"],["le savoir-faire","know-how","tay nghề, bí quyết"],["déménager","to move house","chuyển nhà"],["la direction","management","ban lãnh đạo","Trong doanh nghiệp, la direction = ban lãnh đạo, không chỉ là « hướng »."]]},
{th:"education",title:"Le portable interdit au collège : une mesure efficace ?",
 doc:"Dans plusieurs pays, l'utilisation du téléphone portable est désormais interdite pendant toute la journée au collège, y compris pendant les récréations. Les établissements concernés constatent souvent un climat plus calme : les élèves discutent et jouent davantage ensemble, et les cas de harcèlement en ligne pendant la journée diminuent. Mais la mesure n'est pas toujours facile à appliquer. Certains parents veulent pouvoir joindre leur enfant à tout moment, et des enseignants regrettent de ne plus pouvoir utiliser le téléphone comme outil pédagogique. Pour d'autres, interdire ne remplace pas l'éducation à un usage raisonnable des écrans.",
 prob:"Faut-il interdire totalement le téléphone portable à l'école ?",
 pour:["climat scolaire plus serein, meilleure concentration","plus d'échanges réels entre élèves","moins de harcèlement pendant la journée"],
 contre:["besoin des parents de joindre leur enfant","outil pédagogique utile (recherches, applications)","l'interdiction n'apprend pas à bien utiliser les écrans"],
 lex:[["le harcèlement","harassment, bullying","quấy rối, bắt nạt"],["la récréation","break, recess","giờ ra chơi"],["joindre qqn","to reach sb","liên lạc được với ai"],["un établissement scolaire","a school","trường học"],["le collège","middle school","trường trung học cơ sở","Faux ami: collège ≠ college (đại học)."]]},
{th:"education",title:"Apprendre un métier plutôt que faire de longues études",
 doc:"Longtemps considérée comme une voie de second choix, la formation professionnelle attire de plus en plus de jeunes. L'apprentissage, qui alterne cours et travail en entreprise, permet de toucher un salaire tout en se formant et d'acquérir une expérience concrète, très appréciée des employeurs. Certains diplômés de l'université se reconvertissent même vers des métiers manuels, à la recherche de sens et de résultats visibles. Pourtant, les préjugés ont la vie dure : beaucoup de familles continuent de considérer les études longues comme la seule garantie de réussite sociale.",
 prob:"Les études longues sont-elles encore la meilleure garantie de réussite ?",
 pour:["les diplômes élevés ouvrent davantage de portes et de meilleurs salaires","culture générale et esprit critique","choisir un métier trop tôt peut enfermer"],
 contre:["expérience concrète et insertion rapide grâce à l'apprentissage","salaire pendant la formation","métiers manuels qui ont du sens et recrutent"],
 lex:[["l'apprentissage (nm)","apprenticeship","học nghề (vừa học vừa làm)"],["se reconvertir","to retrain, change career","chuyển nghề"],["les préjugés","prejudices","định kiến"],["toucher un salaire","to earn a salary","nhận lương"],["la formation","training","sự đào tạo","Faux ami: formation = đào tạo, không phải « sự hình thành »."]]},
{th:"numerique",title:"L'intelligence artificielle au service des médecins",
 doc:"Dans plusieurs hôpitaux, des logiciels d'intelligence artificielle aident désormais les médecins à analyser des radiographies ou à repérer certains cancers à un stade précoce. Ces outils, capables d'examiner des milliers d'images en quelques minutes, permettraient de gagner un temps précieux et de réduire certaines erreurs. Mais leur utilisation soulève des questions : qui est responsable en cas d'erreur de diagnostic ? Comment protéger les données de santé des patients ? Et les médecins ne risquent-ils pas de faire trop confiance à la machine ? Pour les professionnels, l'IA doit rester un assistant, jamais un remplaçant.",
 prob:"Peut-on confier à l'intelligence artificielle une part des décisions médicales ?",
 pour:["diagnostic plus rapide et plus précoce","analyse de très grandes quantités de données","moins d'erreurs liées à la fatigue"],
 contre:["responsabilité floue en cas d'erreur","protection des données personnelles","risque de déshumaniser la relation médecin-patient"],
 lex:[["une radiographie","an X-ray","phim X-quang"],["à un stade précoce","at an early stage","ở giai đoạn sớm"],["les données (nf pl)","data","dữ liệu"],["soulever une question","to raise a question","đặt ra vấn đề"],["un logiciel","software","phần mềm"]]},
{th:"numerique",title:"Tous dépendants des notifications ?",
 doc:"Vibrations, sons, petites pastilles rouges : nos téléphones nous sollicitent des dizaines de fois par jour. Selon plusieurs chercheurs, ces notifications sont conçues pour capter notre attention le plus longtemps possible, car le temps passé sur les applications rapporte de l'argent aux plateformes. Résultat : il devient difficile de se concentrer sur une tâche sans être interrompu. Face à ce constat, certains utilisateurs désactivent les alertes, d'autres s'imposent des « détox numériques ». Mais peut-on vraiment reprendre le contrôle quand les applications sont pensées pour nous retenir ?",
 prob:"Sommes-nous encore maîtres de notre usage du téléphone ?",
 pour:["paramètres pour désactiver les alertes et limiter le temps d'écran","éducation et discipline personnelle","détox numérique ponctuelle"],
 contre:["applications conçues pour créer une dépendance","pression sociale d'être toujours joignable","modèle économique fondé sur l'attention"],
 lex:[["être accro à","to be hooked on","nghiện"],["désactiver","to turn off","tắt"],["capter l'attention","to capture attention","thu hút sự chú ý"],["une tâche","a task","việc cần làm"],["éventuellement","possibly","có thể, nếu cần","Faux ami: éventuellement ≠ eventually (= finalement)."]]},
{th:"environnement",title:"Le vrac, une solution contre les déchets ?",
 doc:"Pâtes, riz, lessive, huile : dans les magasins de vrac, les clients apportent leurs propres contenants et achètent la quantité exacte dont ils ont besoin. Cette façon de consommer permet de réduire fortement les emballages, en particulier le plastique, et de limiter le gaspillage. Elle reste toutefois minoritaire. Les produits en vrac sont parfois plus chers, les magasins spécialisés sont rares en dehors des grandes villes, et il faut s'organiser pour penser à ses bocaux. Certains supermarchés ont ouvert des rayons dédiés, mais plusieurs les ont déjà réduits faute de clients.",
 prob:"Le vrac peut-il devenir une solution de masse contre les déchets ?",
 pour:["beaucoup moins d'emballages plastiques","quantité adaptée, moins de gaspillage","prise de conscience croissante des consommateurs"],
 contre:["prix parfois plus élevés","offre limitée hors des grandes villes","contraintes d'organisation au quotidien"],
 lex:[["en vrac","in bulk, loose","bán theo cân, không bao bì"],["un emballage","packaging","bao bì"],["le gaspillage","waste","sự lãng phí"],["un bocal","a jar","lọ thuỷ tinh"],["un rayon","a shelf, an aisle","quầy hàng trong siêu thị","Faux ami: rayon ≠ ray (tia sáng là « rayon » chỉ trong vật lý)."]]},
{th:"environnement",title:"Le retour du loup divise les campagnes",
 doc:"Disparu de France dans les années 1930, le loup est revenu naturellement depuis l'Italie au début des années 1990. Pour les défenseurs de la nature, c'est une bonne nouvelle : en régulant les populations de cerfs et de sangliers, il contribue à l'équilibre des écosystèmes. Pour de nombreux éleveurs, en revanche, c'est un cauchemar : chaque année, des milliers de moutons sont tués malgré les clôtures et les chiens de protection. L'État indemnise les pertes et autorise un nombre limité de tirs, une solution qui ne satisfait ni les éleveurs ni les associations écologistes.",
 prob:"Peut-on concilier protection des espèces sauvages et activités humaines ?",
 pour:["rôle du prédateur dans l'équilibre des écosystèmes","biodiversité, patrimoine naturel","solutions de cohabitation : chiens, clôtures, indemnisation"],
 contre:["pertes importantes pour les éleveurs","découragement du monde agricole","coût élevé des mesures de protection"],
 lex:[["un éleveur","a livestock farmer","người chăn nuôi"],["indemniser","to compensate","bồi thường"],["une clôture","a fence","hàng rào"],["réguler","to regulate","điều tiết"],["un sanglier","a wild boar","lợn rừng"]]},
{th:"famille",title:"Partage des tâches : une égalité encore lointaine",
 doc:"Même lorsque les deux parents travaillent à temps plein, ce sont encore majoritairement les femmes qui assurent la plus grande partie des tâches domestiques et du suivi des enfants : rendez-vous médicaux, devoirs, organisation des repas. Les jeunes générations se disent pourtant très attachées à l'égalité. Mais entre les déclarations et la réalité, l'écart reste important, notamment après la naissance du premier enfant. Certains pays ont allongé le congé de paternité pour inciter les pères à s'impliquer davantage dès les premiers mois.",
 prob:"L'égalité entre les femmes et les hommes dans le couple est-elle une réalité aujourd'hui ?",
 pour:["évolution des mentalités chez les jeunes","congé de paternité plus long","pères plus présents qu'autrefois"],
 contre:["« charge mentale » toujours portée par les femmes","écart qui se creuse après le premier enfant","stéréotypes transmis dès l'enfance"],
 lex:[["les tâches ménagères","household chores","việc nhà"],["le congé de paternité","paternity leave","nghỉ phép dành cho bố"],["s'impliquer","to get involved","tham gia tích cực"],["la charge mentale","mental load","gánh nặng tinh thần"],["assurer qqch","to take care of sth","đảm nhận","Lưu ý: assurer les tâches = đảm nhận, khác to assure sb (= rassurer)."]]},
{th:"famille",title:"Vivre à plusieurs générations sous le même toit",
 doc:"Face à la hausse des loyers et au vieillissement de la population, la cohabitation entre générations connaît un regain d'intérêt. Certaines familles accueillent un grand-parent âgé plutôt que de le placer en maison de retraite. Ailleurs, des associations mettent en relation des étudiants qui cherchent un logement bon marché et des personnes âgées qui vivent seules : en échange d'une chambre, l'étudiant assure une présence et rend quelques services. Ces formules permettent de lutter contre l'isolement, mais elles demandent de respecter l'intimité et le rythme de chacun.",
 prob:"La cohabitation entre générations est-elle une bonne réponse à l'isolement et au manque de logements ?",
 pour:["lutte contre l'isolement des personnes âgées","logement moins cher pour les jeunes","solidarité et échange de savoirs"],
 contre:["manque d'intimité, modes de vie différents","charge lourde pour les aidants familiaux","ne remplace pas des soins professionnels"],
 lex:[["la cohabitation","living together","sự sống chung"],["une maison de retraite","a retirement home","viện dưỡng lão"],["le vieillissement","ageing","sự già hoá"],["l'isolement (nm)","isolation, loneliness","sự cô lập"],["le loyer","rent","tiền thuê nhà"]]},
{th:"sante",title:"Le sport sur ordonnance",
 doc:"Et si le médecin prescrivait de la marche ou de la natation plutôt que des médicaments ? Dans plusieurs pays, dont la France, les médecins peuvent prescrire une activité physique adaptée aux patients atteints de certaines maladies chroniques, comme le diabète. Les bienfaits du sport sur la santé physique et mentale sont largement démontrés. Mais le dispositif reste peu utilisé : les séances ne sont pas toujours remboursées, l'offre manque dans certaines régions et beaucoup de patients ont du mal à rester motivés sur la durée.",
 prob:"L'activité physique peut-elle remplacer une partie des traitements médicaux ?",
 pour:["bienfaits physiques et psychologiques démontrés","moins de médicaments, économies pour la santé publique","prévention des rechutes"],
 contre:["séances rarement remboursées, donc inégalités","offre insuffisante selon les régions","difficulté à rester motivé"],
 lex:[["prescrire","to prescribe","kê đơn"],["une ordonnance","a prescription","đơn thuốc"],["une maladie chronique","a chronic disease","bệnh mãn tính"],["rembourser","to reimburse","hoàn tiền"],["un médicament","a medicine","thuốc"]]},
{th:"sante",title:"La santé mentale des étudiants, une urgence silencieuse",
 doc:"Stress des examens, solitude, difficultés financières : depuis quelques années, de nombreux étudiants déclarent souffrir d'anxiété. Les services de santé des universités sont souvent débordés, et les délais pour obtenir un rendez-vous avec un psychologue peuvent atteindre plusieurs semaines. Des initiatives se développent pourtant : consultations gratuites, lignes d'écoute, formation d'étudiants pour repérer les camarades en difficulté. Mais pour beaucoup, parler de sa santé mentale reste difficile, par peur d'être jugé.",
 prob:"Les universités en font-elles assez pour la santé mentale de leurs étudiants ?",
 pour:["consultations gratuites et lignes d'écoute","sensibilisation et formation des étudiants","sujet moins tabou qu'avant"],
 contre:["services débordés, délais trop longs","précarité financière peu prise en compte","peur du jugement qui freine la demande d'aide"],
 lex:[["débordé","overwhelmed","quá tải"],["un délai","a waiting time, a deadline","thời gian chờ, thời hạn","Faux ami một phần: délai ≠ delay (= le retard)."],["repérer","to spot","nhận ra, phát hiện"],["la précarité","financial insecurity","sự bấp bênh"],["une ligne d'écoute","a helpline","đường dây hỗ trợ"]]},
{th:"consommation",title:"Vers la fin de l'argent liquide ?",
 doc:"Carte bancaire, paiement sans contact, téléphone : dans de nombreux pays, les pièces et les billets sont de moins en moins utilisés. Les commerçants y trouvent un gain de temps et de sécurité, et les autorités y voient un moyen de lutter contre la fraude. Mais la disparition progressive de l'argent liquide inquiète une partie de la population. Les personnes âgées ou peu à l'aise avec le numérique risquent d'être exclues, et chaque paiement électronique laisse une trace, ce qui pose la question de la protection de la vie privée. Certains pays imposent donc aux commerçants d'accepter encore les espèces.",
 prob:"Une société sans argent liquide est-elle souhaitable ?",
 pour:["paiements rapides et sécurisés","lutte contre la fraude et le travail non déclaré","moins de risques de vol"],
 contre:["exclusion des personnes âgées ou fragiles","traçabilité, atteinte à la vie privée","dépendance aux banques et aux pannes techniques"],
 lex:[["l'argent liquide, les espèces","cash","tiền mặt"],["le paiement sans contact","contactless payment","thanh toán không chạm"],["la fraude","fraud","gian lận"],["la vie privée","privacy","đời tư"],["la monnaie","currency; change","tiền tệ; tiền thối lại","Faux ami: money = l'argent, không phải la monnaie."]]},
{th:"consommation",title:"Réparer plutôt que jeter",
 doc:"Téléphones, machines à laver, ordinateurs : trop d'appareils finissent à la poubelle après quelques années, souvent parce que leur réparation coûte presque aussi cher qu'un produit neuf. Pour inverser la tendance, plusieurs pays ont créé des aides financières à la réparation et obligent les fabricants à indiquer si leurs produits sont facilement réparables. Les « cafés de la réparation », où des bénévoles aident les habitants à remettre en état leurs objets, se multiplient également. Reste à convaincre des consommateurs habitués à suivre les nouveautés.",
 prob:"Peut-on vraiment sortir de la culture du jetable ?",
 pour:["économies et réduction des déchets","aides publiques et information sur la réparabilité","lien social grâce aux cafés de la réparation"],
 contre:["réparation parfois plus chère que le neuf","pièces détachées introuvables","attrait de la nouveauté entretenu par la publicité"],
 lex:[["réparer","to repair","sửa chữa"],["jetable","disposable","dùng một lần"],["un fabricant","a manufacturer","nhà sản xuất","Faux ami: fabric (vải) = le tissu."],["les pièces détachées","spare parts","phụ tùng"],["un bénévole","a volunteer","tình nguyện viên"]]}
];

/* Pool for DELF B2 reading: the original set (tagged) + the themed sets. */
const DELF_B2_POOL=(()=>{
  const base=DELF_SETS.B2.exercises;
  const tags=[["travail","art"],["education","art"],["education","pov"]];
  const pool=base.map((ex,i)=>({...ex,th:(tags[i]||["travail"])[0],kind:ex.pov?"pov":"art"}));
  B2_ARTICLES.forEach(a=>pool.push({...a,kind:"art"}));
  B2_POV.forEach(p=>{
    pool.push({th:p.th,title:p.title,doc:p.doc,pov:true,kind:"pov",qs:p.qs.map(q=>{
      const o=[p.names[q.who],...p.names.filter((_,i)=>i!==q.who)];
      return {s:q.s,o,fixed:true,order:p.names.map(n=>o.indexOf(n))};
    })});
  });
  return pool;
})();
B2_WRITE.forEach(w=>WRITE.push(w));
