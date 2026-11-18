/* Reading documents from openly licensed sources.
   B2: "En bref" articles from Vie publique (DILA), reused under Licence Ouverte 2.0.
       Conditions: cite Vie publique and the date, do not modify the content. The text below is unmodified
       (list items shown as lines starting with "–"; related-article boxes from the page are not part of the article body).
   B1: texts adapted from Vikidia articles (CC BY-SA 3.0). The adapted texts and their questions are
       shared under the same licence, CC BY-SA 3.0.
   Questions are written by Le Labo; the correct option is listed first (shuffled at display). */
B2_THEMES.international={fr:"International et francophonie",vn:"Quốc tế, Pháp ngữ"};
const VP_LIC=`<a href="https://www.etalab.gouv.fr/licence-ouverte-open-licence/" target="_blank" rel="noopener">Licence Ouverte 2.0</a>`;
const vpSrc=(title,url,date)=>`Source : Vie publique, « <a href="${url}" target="_blank" rel="noopener">${title}</a> », publié le ${date}. ${VP_LIC}. Texte reproduit sans modification.`;
const VK_LIC=`<a href="https://creativecommons.org/licenses/by-sa/3.0/deed.fr" target="_blank" rel="noopener">CC BY-SA 3.0</a>`;
const vkSrc=arts=>`Texte adapté et simplifié par Le Labo d'après ${arts.map(([t,u])=>`« <a href="${u}" target="_blank" rel="noopener">${t}</a> »`).join(", ")} (Vikidia, auteurs de Vikidia), ${VK_LIC}. Ce texte et ses questions sont diffusés sous la même licence.`;

const VP_B2=[
{th:"environnement",title:"La sobriété, un enjeu de politique publique",
 src:vpSrc("La sobriété, un enjeu de politique publique","https://www.vie-publique.fr/en-bref/305268-la-sobriete-un-levier-pour-la-transition-ecologique","12 novembre 2026"),
 doc:`La sobriété qui consiste à modérer la production et la consommation de biens et de services mobilisant des ressources constitue un levier essentiel pour atteindre les objectifs environnementaux estime le Haut-Commissariat à la stratégie et au plan.
Le Haut-Commissariat à la stratégie et au plan a publié, le 6 novembre 2026, un rapport intitulé "Sobriété. Des gestes individuels aux choix collectifs".
La sobriété, un levier incontournable pour la transition écologique
D'après le rapport du Haut-Commissariat, la sobriété permettrait de :
– réduire les émissions de gaz à effet de serre (GES) d'environ 10 à 30% ;
– diminuer d'environ un cinquième la consommation d'énergie, de matériaux primaires et d'eau.
Concernant la réduction des émissions de GES, la sobriété joue un rôle déterminant pendant la phase de transition car les émissions sont cumulatives.Toutefois, la sobriété ne se limite pas au secteur de l'énergie et elle concerne tous les secteurs, et toutes les formes de consommation qui impliquent de puiser dans les ressources.
Pour éviter la surexploitation des matières premières, la sobriété doit prendre en compte les interactions entre secteurs. La sobriété alimentaire, par exemple, vise une évolution des régimes alimentaires vers des pratiques ayant moins d'impact sur les ressources en eau, les émissions de GES, la biodiversité.
Selon les rapporteurs, la sobriété contribue également à :
– renforcer notre souveraineté, en réduisant les dépendances aux importations ;
– améliorer la santé publique, notamment en favorisant les mobilités actives, une alimentation plus équilibrée et une moindre exposition aux pollutions.
Intégrer la sobriété dans toutes les politiques publiques
Alors que la sobriété repose souvent sur des petits gestes individuels, le Haut-Commissariat estime que les politiques publiques de sobriété doivent viser des transformations plus structurelles et collectives.
Les pouvoirs publics disposent de nombreux leviers d’action pour modifier les environnements des acteurs, et rendre les pratiques de sobriété plus faciles, accessibles et désirables, notamment :
– recourir aux instruments de marché (fiscalité, marchés de quotas) pour orienter les comportements vers la sobriété (en prévoyant des mécanismes de compensation pour les ménages les plus vulnérables ou les plus contraints) ;
– aménager l'espace et transformer infrastructures pour créer les conditions de pratiques plus sobres, par exemple, s'agissant des mobilités, en développant des réseaux cyclables sécurisés, des points de rencontre pour le covoiturage ;
– promouvoir des récits positifs et désirables de la sobriété centrés sur l'amélioration de la qualité de vie (temps, santé, lien social, bien-être...), se substituant au récit dominant, où la sobriété est perçue comme un effort, voire une privation.`,
 qs:[
  {s:"Ce document présente principalement…",o:["un rapport public sur la sobriété","une loi récemment votée par le Parlement","une enquête sur les habitudes des consommateurs"]},
  {s:"Selon le rapport, la sobriété permettrait de réduire les émissions de gaz à effet de serre…",o:["d'environ 10 à 30 %","de moitié","d'environ un cinquième"]},
  {s:"Pourquoi la sobriété joue-t-elle un rôle déterminant pendant la phase de transition ?",o:["Parce que les émissions s'accumulent dans le temps.","Parce que le prix de l'énergie va baisser.","Parce que les importations vont augmenter."]},
  {s:"D'après le texte, la sobriété…",o:["concerne tous les secteurs qui puisent dans les ressources","se limite au secteur de l'énergie","concerne surtout l'alimentation"]},
  {s:"En dehors de l'environnement, les rapporteurs attribuent à la sobriété des effets positifs sur…",o:["la souveraineté et la santé publique","le tourisme et la culture","l'emploi dans l'industrie"]},
  {s:"Pour le Haut-Commissariat, les politiques publiques de sobriété doivent surtout…",o:["viser des transformations structurelles et collectives","encourager uniquement les petits gestes individuels","laisser le marché s'organiser seul"]},
  {s:"Pourquoi le texte évoque-t-il des « mécanismes de compensation » ?",o:["Pour protéger les ménages les plus vulnérables ou les plus contraints.","Pour aider les entreprises à exporter.","Pour financer de nouvelles routes."]},
  {s:"Quel récit le rapport souhaite-t-il remplacer ?",o:["Celui d'une sobriété vécue comme un effort, voire une privation.","Celui d'une écologie jugée trop technique.","Celui d'une consommation présentée comme un plaisir."]}]},
{th:"numerique",title:"IA générative : quelles vulnérabilités individuelles et collectives ?",
 src:vpSrc("IA générative : quelles vulnérabilités individuelles et collectives ?","https://www.vie-publique.fr/en-bref/305342-ia-generative-quels-risques-individuels-et-collectifs","17 novembre 2026"),
 doc:`La Commission "IA générative et vulnérabilités" qui a été missionnée par les pouvoirs publics afin d'éclairer le débat sur les effets de l'IA générative a remis son rapport le 10 novembre 2026. La Commission identifie trois niveaux de risques, tant individuels que collectifs.
Composée de neuf experts pluridisciplinaires issus de la santé, de la recherche publique, de l'enseignement supérieur, la Commission avait été mandatée par le Conseil de l'intelligence artificielle et du numérique (CIANum) en février 2026 à la demande de la ministre déléguée chargée de l'intelligence artificielle et du numérique. Dans son rapport remis le 10 novembre 2026, la Commission identifie trois niveaux de risques.
Entre risques individuels et collectifs
La Commission identifie trois échelles de risques :
– à un niveau individuel, l’altération des capacités cognitives (particulièrement chez les mineurs), l’effacement de la frontière entre l’humain et la machine par l’hyperpersonnalisation de l’IA, la perte d’autonomie et le recul de l’esprit critique ;
– à un niveau collectif, un risque de perte de cohésion sociale et de fragilisation de l’exercice démocratique notamment en raison de biais inhérents à l’IA, d’un espace informationnel dominé par les IA et d’une érosion de la confiance entre l’État et les citoyens induite par la profusion de l’information et les risques de manipulation… ;
– une mutation du modèle économique de l'IA vers une monétisation des vulnérabilités individuelles et collectives avec un passage d'une économie de l'attention telle qu'elle est développée à ce jour par les réseaux sociaux à une économie de la cognition centrée autour des "émotions des utilisateurs" et de leurs profils psychologiques.
Quelles recommandations ?
Certaines recommandations formulées par la Commission sont qualifiées de prioritaires :
– interdire les IA qui exploitent les vulnérabilités des utilisateurs ;
– imposer une évaluation pré-commercialisation et post-commercialisation des IA destinées au grand public ;
– exiger des IA qu’elles proposent un niveau élevé de sécurité, de sûreté et de protection des droits fondamentaux ;
– préparer, au niveau de l’État, une parade aux crises informationnelles liées à l’IA générative ;
– mettre en place une politique d’éducation à l’IA permettant à chacun de mieux en maîtriser les usages et les risques.
La seconde série de recommandations cible plus spécifiquement les risques sur les mineurs : lutte contre les contenus à caractère sexuel et pédocriminels, contrôle préalable à une mise sur le marché de jouets intégrant un système d'IA générative, programme d’éducation à l’IA dès l'école primaire…
Concernant les risques de fragilisation de la cohésion sociale et du modèle démocratique, la Commission préconise une détection plus précoce des manipulations de l’information, l’instauration d’un code de bonne conduite en période électorale et une meilleure représentativité des langues et des cultures minoritaires.
Enfin, les auteurs du rapport demandent un encadrement plus sévère des acteurs de l'IA, en particulier une plus grande transparence dans l’exploitation des données personnelles à des fins commerciales. Les auteurs du rapport préconisent ainsi de soumettre toute exploitation commerciale des profils aux garanties de l’article 9 du Règlement général sur la protection des données (RGPD).`,
 qs:[
  {s:"Qui a rédigé le rapport présenté dans ce texte ?",o:["Une commission de neuf experts de plusieurs disciplines","La ministre chargée du numérique","Un groupe d'entreprises de l'IA"]},
  {s:"Combien d'échelles de risques la Commission identifie-t-elle ?",o:["Trois","Deux","Cinq"]},
  {s:"Parmi les risques individuels, le texte mentionne…",o:["le recul de l'esprit critique","la perte d'emploi","l'augmentation des prix"]},
  {s:"Au niveau collectif, l'un des risques cités est…",o:["la fragilisation de l'exercice démocratique","la disparition des réseaux sociaux","la baisse de la consommation"]},
  {s:"Selon la Commission, le modèle économique de l'IA pourrait évoluer…",o:["d'une économie de l'attention vers une économie de la cognition","d'une économie numérique vers une économie industrielle","d'un modèle payant vers un modèle gratuit"]},
  {s:"Laquelle de ces mesures fait partie des recommandations prioritaires ?",o:["Interdire les IA qui exploitent les vulnérabilités des utilisateurs","Interdire l'usage de l'IA à l'école","Créer une IA publique gratuite"]},
  {s:"Pour protéger les mineurs, la Commission propose notamment…",o:["une éducation à l'IA dès l'école primaire","l'interdiction des téléphones avant 15 ans","un contrôle parental obligatoire sur tous les écrans"]},
  {s:"Concernant les données personnelles, les auteurs demandent…",o:["plus de transparence dans leur exploitation commerciale","l'interdiction de toute collecte","leur vente encadrée par l'État"]}]},
{th:"international",title:"Sommet 2026 de la Francophonie à Phnom Penh : quel bilan ?",
 src:vpSrc("Sommet 2026 de la Francophonie à Phnom Penh : quel bilan ?","https://www.vie-publique.fr/en-bref/305345-quel-bilan-pour-le-sommet-2026-de-la-francophonie","17 novembre 2026"),
 doc:`Du 15 au 16 novembre 2026, le vingtième sommet de la Francophonie s'est tenu à Phnom Penh, au Cambodge. Quel bilan en tirer ?
Tous les deux ans, le sommet de la Francophonie réunit les 92 États et gouvernements de l'Organisation internationale de la Francophonie (OIF). L'OIF comprend 53 membres, 5 membres associés et 34 observateurs.
Par un communiqué de presse du 16 novembre 2026, l'OIF a dressé un bilan du 20e sommet de la Francophonie qui se déroulait au Cambodge. Une déclaration a également été adoptée.
Le prochain sommet de la Francophonie aura lieu en 2028 à Ottawa, au Canada.
Report de l'élection du secrétaire général de l'OIF
Lors de ce sommet, l'élection du secrétaire général de la Francophonie devait avoir lieu. Ce poste est occupé depuis 2019 par la rwandaise Louise Mushikiwabo qui avait été élue à la tête de l'OIF en octobre 2018.
Faute de consensus sur le candidat notamment entre la République démocratique du Congo et le Rwanda, un compromis a été conclu entre la présidence cambodgienne et les chefs d'État et de gouvernement. Ce compromis prévoit de tenir une élection en 2027 et donc de prolonger d'un an l'actuel mandat de la secrétaire générale Louise Mushikiwabo.
Pour rappel, le secrétaire général, élu par consensus par les chefs d'État et de gouvernement pour une durée de quatre ans, a pour rôle de :
– diriger l'OIF ;
– la représenter au niveau international ;
– conduire son action politique.
L'IA parmi les nouvelles priorités de la Francophonie
L'un des principaux enjeux du sommet de la Francophonie est de maintenir l'influence de la Francophonie dans le monde. En effet, le français constitue la quatrième langue mondiale, parlée par plus de 396 millions de personnes après l'anglais, le mandarin et l'espagnol.
Le sommet de la Francophonie de Phnom Penh, dont le thème était de "réinvestir dans la paix pour une prospérité partagée et une stabilité durable", a constitué le passage de témoin, la France qui avait organisé le 19e sommet à Villers-Cotterêts en 2024 a cédé sa place au Cambodge.
Le maintien de la paix et le respect de l'État de droit demeurent des sujets prioritaires dans l'action de l'OIF.
Les États et les gouvernements présents au sommet ont mis l'accent sur l'émergence grandissante de l'intelligence artificielle (IA) tout en soulignant l'importance de "garder l'humain au centre" de l'IA et de promouvoir une IA éthique et responsable.
En ce sens, la Francophonie doit conserver un rôle majeur dans les négociations et les sommets internationaux tels que le prochain sommet de l'intelligence artificielle qui se tiendra à Genève en 2027.`,
 qs:[
  {s:"Où s'est tenu le vingtième sommet de la Francophonie ?",o:["À Phnom Penh, au Cambodge","À Villers-Cotterêts, en France","À Ottawa, au Canada"]},
  {s:"À quelle fréquence le sommet de la Francophonie est-il organisé ?",o:["Tous les deux ans","Chaque année","Tous les quatre ans"]},
  {s:"Qu'est-il arrivé à l'élection du secrétaire général de l'OIF ?",o:["Elle a été reportée faute de consensus.","Elle a eu lieu comme prévu.","Elle a été définitivement supprimée."]},
  {s:"Quelle est la conséquence du compromis trouvé ?",o:["Le mandat de Louise Mushikiwabo est prolongé d'un an.","Le Cambodge prend la direction de l'OIF.","Un nouveau secrétaire général a été nommé provisoirement."]},
  {s:"Pour quelle durée le secrétaire général est-il normalement élu ?",o:["Quatre ans","Deux ans","Un an"]},
  {s:"Selon le texte, le français est…",o:["la quatrième langue la plus parlée au monde","la deuxième langue la plus parlée au monde","la langue la plus parlée en Asie"]},
  {s:"À propos de l'intelligence artificielle, les États ont insisté sur la nécessité de…",o:["garder l'humain au centre","remplacer les traducteurs humains","développer une IA uniquement francophone"]},
  {s:"Que se passera-t-il à Genève en 2027 ?",o:["Un sommet consacré à l'intelligence artificielle","Le prochain sommet de la Francophonie","L'élection du secrétaire général de l'OIF"]}]}
];
VP_B2.forEach(a=>DELF_B2_POOL.push({...a,kind:"art"}));

const B1_OPEN=[
{title:"Le recyclage : donner une deuxième vie aux déchets",
 src:vkSrc([["Recyclage des déchets","https://fr.vikidia.org/wiki/Recyclage_des_d%C3%A9chets"],["Recyclage","https://fr.vikidia.org/wiki/Recyclage"],["Aluminium","https://fr.vikidia.org/wiki/Aluminium"],["Plastique","https://fr.vikidia.org/wiki/Plastique"]]),
 doc:`Recycler, c'est transformer des déchets pour pouvoir les utiliser à nouveau. Grâce au recyclage, un objet qui a déjà servi peut avoir une deuxième, et parfois une troisième vie. On a alors moins besoin de fabriquer des objets neufs, et donc moins besoin de matériaux.
Le recyclage se fait en trois étapes : d'abord, on récupère les déchets ; ensuite, on les transforme ; enfin, les nouveaux produits sont mis en vente dans les magasins.
Tout commence à la maison avec le tri sélectif. On sépare le verre, le carton, le papier, le plastique, le textile et les déchets organiques, c'est-à-dire les restes d'origine végétale ou animale. Il existe des conteneurs spéciaux pour le verre, pour le papier et le carton, ou encore pour les vêtements. Les autres déchets sont envoyés dans un centre où ils sont triés une deuxième fois, puis transformés.
Tous les matériaux ne se recyclent pas de la même façon. L'aluminium, par exemple, est recyclable à 100 % sans perdre ses qualités : il faut le jeter dans le conteneur jaune. Pour le plastique, c'est plus compliqué : certains plastiques peuvent être recyclés, mais pas tous, et aujourd'hui moins de 10 % des déchets plastiques sont réellement recyclés.`,
 qs:[
  {s:"Selon le texte, recycler signifie…",o:["transformer des déchets pour les réutiliser","jeter moins de déchets à la poubelle","fabriquer des objets plus solides"]},
  {s:"Quel avantage du recyclage est mentionné ?",o:["On a besoin de moins de matériaux.","Les objets coûtent moins cher.","Les déchets disparaissent complètement."]},
  {s:"Quelle est la dernière étape du recyclage ?",o:["La mise en vente des produits dans les magasins","La récupération des déchets","Le tri à la maison"]},
  {s:"Que deviennent les déchets qui ne vont pas dans un conteneur spécial ?",o:["Ils sont triés de nouveau dans un centre.","Ils sont brûlés directement.","Ils restent dans les maisons."]},
  {s:"Que dit le texte sur l'aluminium ?",o:["Il peut être recyclé entièrement sans perdre ses qualités.","Il ne peut pas être recyclé.","Il doit être jeté avec le verre."]},
  {s:"Concernant le plastique, le texte explique que…",o:["seule une petite partie est vraiment recyclée","tous les plastiques sont recyclables","il est plus facile à recycler que l'aluminium"]}]},
{title:"La Fête de la musique",
 src:vkSrc([["Fête de la musique","https://fr.vikidia.org/wiki/F%C3%AAte_de_la_musique"]]),
 doc:`Chaque année, le 21 juin, des musiciens jouent dans les rues, sur les places et dans les parcs : c'est la Fête de la musique. Aujourd'hui, elle est célébrée dans environ 110 pays.
L'idée est née en 1976. Un musicien américain, Joel Cohen, qui travaillait alors pour la radio France Musique, a proposé d'organiser de grandes fêtes de la musique le 21 juin et le 21 décembre. Au fil des années, l'événement a connu un succès de plus en plus grand et il est devenu une véritable fête populaire.
Pourquoi le 21 juin ? Parce que cette date correspond le plus souvent au solstice d'été, c'est-à-dire à l'un des jours les plus longs de l'année. On peut donc jouer et écouter de la musique dehors jusqu'à tard le soir.
Le nom de la fête est aussi un jeu de mots : « Fête de la musique » se prononce comme « Faites de la musique ! ». Ce slogan invite tout le monde à participer. La fête encourage en particulier les musiciens amateurs à se produire gratuitement dans les rues, à côté des artistes professionnels.`,
 qs:[
  {s:"Quand a lieu la Fête de la musique ?",o:["Le 21 juin","Le 21 décembre","Le 14 juillet"]},
  {s:"Qui a eu l'idée de cette fête ?",o:["Un musicien américain qui travaillait pour une radio française","Un ministre français de la Culture","Un groupe d'étudiants parisiens"]},
  {s:"Au départ, la fête était prévue…",o:["deux fois par an","une fois tous les deux ans","seulement à Paris"]},
  {s:"Pourquoi a-t-on choisi le 21 juin ?",o:["C'est souvent l'un des jours les plus longs de l'année.","C'est l'anniversaire de Joel Cohen.","C'est le premier jour des vacances scolaires."]},
  {s:"Le slogan « Faites de la musique ! »…",o:["invite chacun à jouer de la musique","annonce un concours de musique","est le nom d'une radio"]},
  {s:"Selon le texte, la fête encourage surtout…",o:["les musiciens amateurs à jouer bénévolement","les artistes célèbres à vendre leurs disques","les mairies à construire des salles de concert"]}]},
{title:"Le Tour de France, une course légendaire",
 src:vkSrc([["Tour de France","https://fr.vikidia.org/wiki/Tour_de_France"],["Cyclisme","https://fr.vikidia.org/wiki/Cyclisme"],["Vélo","https://fr.vikidia.org/wiki/V%C3%A9lo"],["Albert Londres","https://fr.vikidia.org/wiki/Albert_Londres"],["Bordeaux","https://fr.vikidia.org/wiki/Bordeaux"]]),
 doc:`Créé en 1903, le Tour de France est la course cycliste la plus célèbre du monde. Il a lieu chaque année au mois de juillet, en France mais aussi parfois dans les pays voisins. Les coureurs sont des professionnels : en 2020, ils étaient 176 au départ.
Le Tour fait partie des « grands tours », comme le Tour d'Italie et le Tour d'Espagne, qui durent vingt et un jours. Les coureurs parcourent la France étape par étape. L'arrivée la plus prestigieuse est celle des Champs-Élysées, à Paris, mais certaines villes, comme Bordeaux, sont aussi des étapes très connues.
Le vélo était déjà très populaire à la fin du XIXe siècle : de nombreuses courses existaient avant le Tour, comme Paris-Roubaix, créée en 1896. Les passionnés appellent d'ailleurs le vélo « la Petite Reine ».
La course n'a pas toujours été vue d'un bon œil. Le journaliste Albert Londres a dénoncé les efforts physiques extrêmes demandés aux cyclistes. Il parlait même de « Tour de souffrance ». Malgré ces critiques, le Tour est resté une grande fête populaire, et des champions comme le Français Jacques Anquetil ou le Belge Eddy Merckx sont devenus des légendes.`,
 qs:[
  {s:"Depuis quand le Tour de France existe-t-il ?",o:["Depuis 1903","Depuis 1896","Depuis 1920"]},
  {s:"Le Tour de France se déroule…",o:["chaque année en juillet","tous les deux ans en été","chaque année en septembre"]},
  {s:"Combien de temps durent les « grands tours » ?",o:["Vingt et un jours","Une semaine","Deux jours"]},
  {s:"Quelle est l'arrivée la plus prestigieuse ?",o:["Les Champs-Élysées, à Paris","Bordeaux","Roubaix"]},
  {s:"Qu'est-ce que « la Petite Reine » ?",o:["Un surnom du vélo","Le nom d'une course","Le trophée du vainqueur"]},
  {s:"Pourquoi Albert Londres a-t-il critiqué le Tour ?",o:["Il trouvait les efforts demandés aux coureurs trop durs.","Il trouvait la course trop courte.","Il n'aimait pas les coureurs étrangers."]}]},
{title:"Le baccalauréat en France",
 src:vkSrc([["Baccalauréat en France","https://fr.vikidia.org/wiki/Baccalaur%C3%A9at_en_France"],["Baccalauréat","https://fr.vikidia.org/wiki/Baccalaur%C3%A9at"],["Lycée en France","https://fr.vikidia.org/wiki/Lyc%C3%A9e_en_France"],["Classe de terminale française","https://fr.vikidia.org/wiki/Classe_de_terminale_fran%C3%A7aise"]]),
 doc:`En France, le baccalauréat est le diplôme qui marque la fin des études secondaires. Dans la langue de tous les jours, on dit simplement « le bac ». Les élèves qui l'obtiennent s'appellent des « bacheliers ».
Les élèves passent les épreuves au lycée, en classe de première et surtout en terminale, la dernière année du lycée. En général, on entre en terminale vers l'âge de dix-huit ans, mais ce n'est pas toujours le cas : certains élèves ont redoublé une classe, d'autres en ont sauté une.
Il existe trois types de baccalauréat : le bac général, le bac technologique et le bac professionnel. Les élèves qui choisissent le lycée professionnel peuvent aussi préparer un autre diplôme, le CAP.
Le bac est important, car il donne le droit de s'inscrire dans l'enseignement supérieur, notamment à l'université, que les étudiants appellent souvent « la fac ».
Attention : le mot ne veut pas dire la même chose partout. Au Canada, par exemple, un « baccalauréat » n'est pas un diplôme de fin de lycée, mais un diplôme universitaire.`,
 qs:[
  {s:"Le baccalauréat est un diplôme qui…",o:["termine les études secondaires","termine les études universitaires","permet d'entrer au collège"]},
  {s:"Comment appelle-t-on les personnes qui ont obtenu le bac ?",o:["Des bacheliers","Des lycéens","Des étudiants"]},
  {s:"Pendant quelle(s) année(s) passe-t-on les épreuves ?",o:["En première et en terminale","Seulement en seconde","Après le lycée"]},
  {s:"Pourquoi certains élèves n'ont-ils pas dix-huit ans en terminale ?",o:["Parce qu'ils ont redoublé ou sauté une classe","Parce que le bac n'a pas de limite d'âge","Parce qu'ils viennent d'un autre pays"]},
  {s:"À quoi sert le baccalauréat ?",o:["À pouvoir s'inscrire dans l'enseignement supérieur","À obtenir directement un emploi dans l'État","À entrer au lycée professionnel"]},
  {s:"Que nous apprend le texte sur le Canada ?",o:["Le mot « baccalauréat » y désigne un diplôme universitaire.","Le baccalauréat français n'y est pas reconnu.","Les élèves y passent le bac plus jeunes."]}]}
];
