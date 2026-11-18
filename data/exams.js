/* Content for the "Tuyển sinh" (Vietnamese entrance-exam) and "DELF" paper styles. All original.
   Phonetics: [..] marks the underlined letters. */
BANK.push(

{id:"formation",lv:"B1",fr:"Formation des mots",vn:"Cấu tạo từ: từ gốc → danh từ, tính từ, trạng từ",items:[
 {t:"wf",q:"La ___ de ce roman en vietnamien a pris deux ans.",w:"TRADUIRE",a:["traduction"],e:"traduire → la traduction."},
 {t:"wf",q:"Il a répondu avec beaucoup de ___.",w:"GENTIL",a:["gentillesse"],e:"gentil → la gentillesse."},
 {t:"wf",q:"Le ___ du train est prévu à 18 heures.",w:"PARTIR",a:["départ"],e:"partir → le départ."},
 {t:"wf",q:"Elle parle ___ trois langues.",w:"COURANT",a:["couramment"],e:"-ant → -amment."},
 {t:"wf",q:"Merci pour vos ___ : elles m'ont beaucoup aidé.",w:"EXPLIQUER",a:["explications"],e:"expliquer → une explication (số nhiều vì vos)."},
 {t:"wf",q:"Le ___ de la population pose de nouveaux problèmes.",w:"VIEILLIR",a:["vieillissement"],e:"vieillir → le vieillissement."},
 {t:"wf",q:"Cet exercice est ___ : personne n'y arrive.",w:"POSSIBLE",a:["impossible"],e:"Tiền tố im- trước p, b, m: impossible."},
 {t:"wf",q:"Traversez la rue ___ !",w:"PRUDENT",a:["prudemment"],e:"-ent → -emment."},
 {t:"wf",q:"Les ___ ont applaudi le chanteur pendant dix minutes.",w:"SPECTACLE",a:["spectateurs"],e:"le spectacle → les spectateurs (người xem)."},
 {t:"wf",q:"Sa ___ m'a beaucoup surpris.",w:"RÉAGIR",a:["réaction"],e:"réagir → la réaction."},
 {t:"wf",q:"L'___ des transports publics est une priorité.",w:"AMÉLIORER",a:["amélioration"],e:"améliorer → l'amélioration."},
 {t:"wf",q:"C'est une décision très ___ pour notre avenir.",w:"IMPORTANCE",a:["importante"],e:"l'importance → important(e); décision giống cái."},
 {t:"wf",q:"Nous attendons votre ___ avant vendredi.",w:"RÉPONDRE",a:["réponse"],e:"répondre → la réponse."},
 {t:"wf",q:"Le ___ de cette région est magnifique.",w:"PAYS",a:["paysage"],e:"le pays → le paysage (phong cảnh)."},
 {t:"wf",q:"Il est ___ de fumer dans les gares.",w:"INTERDIRE",a:["interdit"],e:"interdire → interdit (bị cấm)."},
 {t:"wf",q:"Les enfants ont besoin de ___ pour se développer.",w:"LIBRE",a:["liberté"],e:"libre → la liberté."},
 {t:"wf",q:"Elle a montré beaucoup de ___ face au danger.",w:"COURAGEUX",a:["courage"],e:"courageux → le courage."},
 {t:"wf",q:"L'___ de la tour Eiffel a eu lieu en 1889.",w:"INAUGURER",a:["inauguration"],e:"inaugurer → l'inauguration."},
 {t:"wf",q:"Ce film est vraiment ___ : je ne me suis jamais ennuyé.",w:"INTÉRESSER",a:["intéressant"],e:"intéresser → intéressant (thú vị)."},
 {t:"wf",q:"Il faut faire preuve de ___ avec les jeunes enfants.",w:"PATIENT",a:["patience"],e:"patient → la patience."}
]}
);
/* Keyword transformation (s = starter shown to the student) and word order */
const EXAM_ITEMS={
 subj_conj:[{t:"kt",q:"Il pleut, mais nous sortons.",k:"BIEN QUE",s:"Bien qu'",a:["Bien qu'il pleuve, nous sortons."],e:"bien que + subjonctif."},
            {t:"kt",q:"Malgré sa fatigue, elle continue à travailler.",k:"BIEN QUE",s:"Bien qu'elle",a:["Bien qu'elle soit fatiguée, elle continue à travailler."],e:"malgré + danh từ → bien que + subjonctif."}],
 passif:[{t:"kt",q:"On a construit ce pont en 1990.",k:"ÉTÉ",s:"Ce pont",a:["Ce pont a été construit en 1990."],e:"Bị động ở passé composé."},
         {t:"ro",w:["été","maison","a","la","vendue","."],a:["La maison a été vendue."],e:"Bị động: sujet + a été + phân từ."}],
 discours:[{t:"kt",q:"« Tu viens ce soir ? » m'a demandé Paul.",k:"SI",s:"Paul m'a demandé",a:["Paul m'a demandé si je venais ce soir-là.","Paul m'a demandé si je venais ce soir."],e:"Câu hỏi có/không → si; lùi thì sang imparfait."}],
 conditionnel:[{t:"kt",q:"Je n'ai pas de voiture, donc je prends le bus.",k:"SI",s:"Si j'",a:["Si j'avais une voiture, je ne prendrais pas le bus."],e:"si + imparfait → conditionnel présent."},
               {t:"ro",w:["si","j'avais","voyagerais","je","temps","le",","],a:["Si j'avais le temps, je voyagerais.","Je voyagerais si j'avais le temps."],e:"si + imparfait, conditionnel."}],
 subjonctif:[{t:"kt",q:"Il est nécessaire que tu finisses ce travail.",k:"FAUT",s:"Il",a:["Il faut que tu finisses ce travail."],e:"il faut que + subjonctif."},
             {t:"ro",w:["faut","tu","que","il","partes","."],a:["Il faut que tu partes."],e:"il faut que + subjonctif."}],
 temps_exp:[{t:"kt",q:"Il a commencé à apprendre le français il y a deux ans.",k:"DEPUIS",s:"Il apprend",a:["Il apprend le français depuis deux ans."],e:"depuis + hiện tại."}],
 connecteurs:[{t:"kt",q:"Il est très riche ; pourtant, il n'est pas heureux.",k:"MALGRÉ",s:"Malgré",a:["Malgré sa richesse, il n'est pas heureux."],e:"malgré + danh từ."},
              {t:"kt",q:"J'ai perdu mes clés, c'est pourquoi je ne peux pas entrer.",k:"PARCE QUE",s:"Je ne peux pas entrer",a:["Je ne peux pas entrer parce que j'ai perdu mes clés."],e:"Kết quả → nguyên nhân với parce que."}],
 comparatif:[{t:"kt",q:"Elle chante mieux que moi.",k:"AUSSI",s:"Je",a:["Je ne chante pas aussi bien qu'elle."],e:"aussi + trạng từ + que; bien (không phải bon)."},
             {t:"ro",w:["plus","est","Paris","grande","que","Lyon","."],a:["Paris est plus grande que Lyon."],e:"plus + tính từ + que."}],
 cond_passe:[{t:"kt",q:"Je n'ai pas étudié, alors j'ai échoué.",k:"AVAIS",s:"Si",a:["Si j'avais étudié, je n'aurais pas échoué."],e:"si + plus-que-parfait → conditionnel passé."}],
 gerondif:[{t:"kt",q:"Je regarde la télé et je mange en même temps.",k:"EN",s:"Je regarde la télé",a:["Je regarde la télé en mangeant."],e:"Hai hành động đồng thời → gérondif."},
           {t:"kt",q:"Les étudiants qui ont un visa peuvent travailler.",k:"AYANT",s:"Les étudiants",a:["Les étudiants ayant un visa peuvent travailler."],e:"Phân từ hiện tại thay qui + động từ."},
           {t:"ro",w:["en","chantant","se douche","il","."],a:["Il se douche en chantant."],e:"Gérondif đứng sau động từ chính."}],
 relatifs:[{t:"kt",q:"C'est le livre. Je t'ai parlé de ce livre.",k:"DONT",s:"C'est le livre",a:["C'est le livre dont je t'ai parlé."],e:"parler de → dont."},
           {t:"ro",w:["le","que","film","j'ai","est","vu","génial","."],a:["Le film que j'ai vu est génial."],e:"Tân ngữ trực tiếp → que."}],
 negation:[{t:"kt",q:"Il ne mange jamais de viande et il ne mange jamais de poisson.",k:"NI",s:"Il",a:["Il ne mange ni viande ni poisson."],e:"ne… ni… ni, bỏ mạo từ."},
           {t:"ro",w:["ne","jamais","elle","café","boit","de","."],a:["Elle ne boit jamais de café."],e:"ne + động từ + jamais + de."}],
 adverbes:[{t:"ro",w:["souvent","au","nous","cinéma","allons","."],a:["Nous allons souvent au cinéma."],e:"Trạng từ đứng sau động từ."}],
 pronoms:[{t:"ro",w:["lui","je","ai","téléphoné","hier","."],a:["Je lui ai téléphoné hier.","Hier, je lui ai téléphoné."],e:"Đại từ đứng trước trợ động từ."}],
 questions:[{t:"ro",w:["tu","à","est-ce que","Paris","vas","?"],a:["Est-ce que tu vas à Paris ?"],e:"est-ce que + câu khẳng định."}],
 y_en:[{t:"ro",w:["y","nous","demain","allons","."],a:["Nous y allons demain.","Demain, nous y allons."],e:"y đứng trước động từ."},
       {t:"ro",w:["en","il","a","deux","."],a:["Il en a deux."],e:"en + số lượng ở cuối."}],
 pronominaux:[{t:"ro",w:["levée","s'est","elle","tôt","."],a:["Elle s'est levée tôt."],e:"Phản thân ở passé composé dùng être."}],
 periphrases:[{t:"ro",w:["vient","elle","rentrer","de","."],a:["Elle vient de rentrer."],e:"venir de + nguyên mẫu."}]
};
for(const [id,arr] of Object.entries(EXAM_ITEMS)){const t=BANK.find(x=>x.id===id);if(t)t.items.push(...arr);}

/* One-word gap passages: [[answer/variant]] */
const OW=[
 {topic:"prepositions",lv:"A2",title:"Le voyage de Lan",text:"L'été dernier, Lan est partie [[en]] France pour la première fois. Elle a pris l'avion [[à]] Hanoï et elle est arrivée [[à]] Paris le lendemain matin. Elle a logé [[chez]] une amie française pendant deux semaines. Chaque jour, elles visitaient un musée ou se promenaient [[dans]] un parc. Lan a aussi passé trois jours [[au]] bord de la mer, en Normandie."},
 {topic:"connecteurs",lv:"B1",title:"Apprendre une langue",text:"Apprendre une langue étrangère demande du temps [[et]] de la patience. Beaucoup d'étudiants abandonnent [[parce]] qu'ils ne voient pas de progrès rapides. [[Pourtant/Cependant/Toutefois]], quelques minutes de pratique chaque jour suffisent souvent. Il est utile d'écouter la radio [[pour]] habituer son oreille. Enfin, il ne faut pas avoir peur [[de]] faire des erreurs : c'est [[en]] se trompant qu'on apprend."},
 {topic:"relatifs",lv:"B1",title:"Mon quartier",text:"J'habite dans un quartier [[que]] j'adore. Il y a un petit marché [[où]] je fais mes courses le samedi. Le boulanger, [[qui]] est très sympathique, me donne toujours des conseils. Mes voisins ? Je [[les]] connais bien et je [[leur]] rends souvent visite. Le parc ? J'[[y]] vais presque tous les jours."},
 {topic:"articles",lv:"A2",title:"Au marché",text:"Le samedi, je vais [[au]] marché avec ma mère. Nous achetons [[des]] légumes, [[du]] fromage et un kilo [[de]] pommes. Ma mère ne prend jamais [[de]] viande, car elle est végétarienne. Moi, j'adore [[les]] fraises : j'en achète toujours une barquette."}
];

/* DELF-style reading papers: multiple choice only, 3 options, first option written is the correct one
   (options are shuffled at build time unless fixed:true). */
const DELF_SETS={
 A2:{minutes:30,exercises:[
  {title:"Cours de cuisine",doc:"Objet : Cours de cuisine\nBonjour à tous,\nLe centre culturel organise un cours de cuisine vietnamienne le samedi 15 mars, de 10 h à 13 h. Le cours est gratuit pour les membres du centre et coûte 12 euros pour les autres participants. Nous préparerons des nems et une soupe pho. Apportez un tablier !\nLe nombre de places est limité à 15 personnes : inscrivez-vous à l'accueil du centre avant le 10 mars.\nBonne journée,\nSophie, responsable des activités",qs:[
   {s:"Ce message annonce…",o:["un cours de cuisine","un repas au restaurant","un voyage au Việt Nam"]},
   {s:"Le cours a lieu…",o:["le matin","l'après-midi","le soir"]},
   {s:"Pour les membres du centre, le cours est…",o:["gratuit","à 12 euros","à 15 euros"]},
   {s:"Les participants doivent apporter…",o:["un tablier","des ingrédients","une soupe"]},
   {s:"Pour s'inscrire, il faut…",o:["aller à l'accueil avant le 10 mars","écrire à Sophie le 15 mars","téléphoner au restaurant"]}]},
  {title:"Bibliothèque : de nouveaux horaires",doc:"À partir du 1er avril, la bibliothèque municipale change ses horaires. Elle sera ouverte du mardi au samedi, de 9 h à 19 h, et le dimanche matin de 10 h à 12 h. Elle sera fermée le lundi.\nLes lecteurs pourront aussi rendre leurs livres le soir grâce à une nouvelle boîte installée devant l'entrée. Chaque personne peut emprunter six documents pour trois semaines. L'inscription reste gratuite pour les moins de 18 ans.",qs:[
   {s:"Ce texte informe sur…",o:["les nouveaux horaires d'une bibliothèque","l'ouverture d'une librairie","un concours de lecture"]},
   {s:"Le lundi, la bibliothèque est…",o:["fermée","ouverte le matin","ouverte jusqu'à 19 h"]},
   {s:"Le dimanche, on peut y aller…",o:["le matin","toute la journée","le soir"]},
   {s:"La nouvelle boîte permet de…",o:["rendre des livres le soir","acheter des livres","s'inscrire en ligne"]},
   {s:"On peut garder les documents…",o:["trois semaines","six jours","un mois"]},
   {s:"L'inscription est gratuite…",o:["pour les moins de 18 ans","pour tout le monde","seulement le dimanche"]}]}
 ]},
 B1:{minutes:45,exercises:[
  {title:"Les jardins partagés gagnent les villes",doc:"Dans de nombreuses villes françaises, des habitants transforment des terrains vides en jardins partagés. Le principe est simple : chacun cultive une petite parcelle ou participe à l'entretien d'un espace commun, et les récoltes sont partagées.\nÀ Lyon, une association de quartier gère ainsi une dizaine de jardins. Selon sa présidente, l'objectif n'est pas seulement de produire des légumes : « Le jardin crée du lien. Des voisins qui ne se parlaient jamais se retrouvent le week-end autour d'un potager. »\nLes mairies soutiennent souvent ces projets, car ils améliorent le cadre de vie et sensibilisent les enfants à l'environnement. Cependant, tout n'est pas toujours facile : trouver des bénévoles réguliers reste un défi, et certains jardins doivent fermer lorsque le terrain est vendu pour construire des logements.",qs:[
   {s:"Ce texte présente…",o:["une initiative d'habitants en ville","une nouvelle loi sur l'agriculture","un concours de jardinage"]},
   {s:"Dans un jardin partagé, les récoltes…",o:["sont partagées entre les participants","sont vendues au marché","appartiennent à la mairie"]},
   {s:"Pour la présidente de l'association, le jardin sert surtout à…",o:["créer des relations entre voisins","gagner de l'argent","remplacer les supermarchés"]},
   {s:"Les mairies soutiennent ces projets parce qu'ils…",o:["améliorent le cadre de vie","coûtent très peu cher","attirent les touristes"]},
   {s:"Quelle difficulté est mentionnée ?",o:["trouver des bénévoles réguliers","le manque d'eau","le prix des graines"]},
   {s:"Certains jardins ferment quand…",o:["le terrain est vendu","les enfants partent en vacances","la récolte est mauvaise"]}]},
  {title:"Forum : faut-il interdire les voitures en centre-ville ?",doc:"Karim : Je suis pour. Depuis que ma ville a fermé le centre aux voitures, on respire mieux et les rues sont plus agréables. Les commerçants avaient peur, mais aujourd'hui il y a plus de monde dans les magasins.\nÉlodie : Je comprends l'idée, mais pour les personnes âgées ou handicapées, c'est compliqué. Il faudrait au moins des navettes gratuites et des parkings à l'entrée de la ville.\nThomas : Je suis contre. J'habite à la campagne et il n'y a pas de bus le soir. Sans voiture, je ne peux plus aller au cinéma en ville.",qs:[
   {s:"Qui est totalement favorable à l'interdiction ?",o:["Karim","Élodie","Thomas"],fixed:true},
   {s:"Selon Karim, les commerçants…",o:["ont finalement plus de clients","ont fermé leurs magasins","sont toujours inquiets"]},
   {s:"Élodie pense qu'il faudrait…",o:["prévoir des solutions pour certaines personnes","autoriser de nouveau toutes les voitures","supprimer les bus"]},
   {s:"Pourquoi Thomas est-il contre ?",o:["Il n'a pas d'autre moyen de transport le soir","Il travaille dans un magasin du centre","Il n'aime pas le cinéma"]},
   {s:"Qui parle des personnes âgées ?",o:["Élodie","Karim","Thomas"],fixed:true}]}
 ]},
 B2:{minutes:60,exercises:[
  {title:"La semaine de quatre jours : un modèle d'avenir ?",doc:"Plusieurs entreprises européennes expérimentent depuis quelques années la semaine de quatre jours, sans baisse de salaire. Les premiers bilans, publiés par les entreprises elles-mêmes, sont souvent positifs : les salariés se disent moins stressés, l'absentéisme diminue et la productivité se maintient, voire progresse. Pour les défenseurs de ce modèle, il ne s'agit pas de travailler moins, mais de travailler mieux : réunions raccourcies, tâches inutiles supprimées, concentration accrue.\nLes critiques, pourtant, ne manquent pas. Certains économistes rappellent que ces expériences concernent surtout des entreprises de services, où l'organisation est plus souple. Dans un hôpital, une usine ou un commerce ouvert six jours sur sept, réduire le temps de présence suppose d'embaucher davantage, ce qui augmente les coûts. D'autres soulignent le risque d'une intensification du travail : faire en quatre jours ce que l'on faisait en cinq peut, à terme, épuiser les équipes.\nEntre enthousiasme et prudence, une chose semble acquise : la question du temps de travail, longtemps considérée comme réglée, revient au centre du débat public.",qs:[
   {s:"Selon le texte, les premiers bilans des expériences sont…",o:["généralement favorables","plutôt négatifs","encore inconnus"]},
   {s:"Ces bilans sont publiés par…",o:["les entreprises elles-mêmes","des syndicats","le gouvernement"]},
   {s:"Pour ses défenseurs, la semaine de quatre jours permet surtout de…",o:["mieux organiser le travail","gagner davantage d'argent","partir plus souvent en vacances"]},
   {s:"D'après certains économistes, ce modèle est plus difficile à appliquer…",o:["dans les secteurs qui exigent une présence continue","dans les entreprises de services","dans les petites entreprises"]},
   {s:"Quel risque est évoqué ?",o:["un épuisement des équipes","une hausse du chômage","la disparition des réunions"]},
   {s:"Dans sa conclusion, l'auteur constate que…",o:["le débat sur le temps de travail est relancé","ce modèle doit être imposé partout","l'expérience a échoué"]}]},
  {title:"Lire sur écran ou sur papier ?",doc:"Faut-il encore imprimer ses cours ? La question agite les universités depuis que les tablettes ont envahi les amphithéâtres. Plusieurs études menées auprès d'étudiants suggèrent que, pour des textes longs et complexes, la compréhension est légèrement meilleure sur papier. Les chercheurs avancent une explication : à l'écran, nous aurions tendance à lire plus vite, en survolant le texte, comme nous le faisons sur les réseaux sociaux.\nFaut-il pour autant renoncer au numérique ? Pas nécessairement. L'écran présente des avantages évidents : il permet de rechercher un mot en un instant, d'agrandir les caractères ou d'accéder gratuitement à des milliers d'ouvrages. Pour beaucoup d'enseignants, l'enjeu n'est donc pas de choisir un support contre l'autre, mais d'apprendre aux étudiants à adapter leur manière de lire : ralentir, prendre des notes, relire les passages difficiles, quel que soit le support.",qs:[
   {s:"Selon les études citées, sur papier, la compréhension des textes longs est…",o:["légèrement meilleure","nettement moins bonne","identique"]},
   {s:"Comment les chercheurs expliquent-ils ce résultat ?",o:["À l'écran, on lit plus vite et plus superficiellement.","Les écrans fatiguent les yeux.","Les étudiants préfèrent le papier."]},
   {s:"Quel avantage de l'écran est cité ?",o:["rechercher rapidement un mot","mieux mémoriser le texte","lire sans électricité"]},
   {s:"Pour beaucoup d'enseignants, l'essentiel est de…",o:["adapter sa manière de lire","interdire les tablettes","imprimer tous les cours"]},
   {s:"Le ton du second paragraphe est plutôt…",o:["nuancé","alarmiste","ironique"]}]},
  {title:"Trois avis sur les langues étrangères à l'école primaire",doc:"Mathilde, enseignante : « Plus un enfant commence tôt, plus il acquiert un accent naturel. Mais encore faut-il des enseignants formés : une heure par semaine avec un professeur qui ne maîtrise pas la langue, cela ne sert pas à grand-chose. »\nYann, parent d'élève : « Mon fils a déjà du mal en français et en mathématiques. Je préférerais qu'on renforce les bases avant d'ajouter une langue étrangère. »\nLeïla, chercheuse : « Les recherches montrent que l'apprentissage précoce développe la curiosité et la souplesse intellectuelle. L'important n'est pas la quantité d'heures, mais la régularité et le plaisir. »",pov:true,qs:[
   {s:"Qui insiste sur la formation des enseignants ?",o:["Mathilde","Yann","Leïla"],fixed:true},
   {s:"Qui préfère donner la priorité aux matières fondamentales ?",o:["Yann","Mathilde","Leïla"],fixed:true,order:[1,0,2]},
   {s:"Qui s'appuie sur des travaux scientifiques ?",o:["Leïla","Mathilde","Yann"],fixed:true,order:[1,2,0]},
   {s:"Qui pense que la régularité compte plus que le nombre d'heures ?",o:["Leïla","Mathilde","Yann"],fixed:true,order:[1,2,0]},
   {s:"Qui évoque l'avantage d'un accent naturel ?",o:["Mathilde","Yann","Leïla"],fixed:true}]}
 ]}
};
