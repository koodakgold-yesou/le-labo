/* ---------- Extra question material (original) ---------- */
BANK.push({id:"questions",lv:"A2",fr:"Poser des questions",vn:"Đặt câu hỏi (est-ce que, đảo ngữ, từ để hỏi)",items:[
 {t:"qu",q:"Emma va à la salle de sport deux fois par semaine.",u:"deux fois par semaine",s:"Combien de fois",a:["Combien de fois par semaine Emma va-t-elle à la salle de sport ?","Combien de fois par semaine est-ce qu'Emma va à la salle de sport ?","Combien de fois Emma va-t-elle à la salle de sport ?","Combien de fois est-ce qu'Emma va à la salle de sport ?"],e:"Hỏi tần suất: combien de fois (par semaine)."},
 {t:"qu",q:"Ben prend son petit-déjeuner à 7 heures.",u:"à 7 heures",s:"À quelle heure",a:["À quelle heure Ben prend-il son petit-déjeuner ?","À quelle heure est-ce que Ben prend son petit-déjeuner ?"],e:"Hỏi giờ: à quelle heure. Đảo ngữ với danh từ: Ben prend-il…"},
 {t:"qu",q:"Mon père travaille dans un hôpital.",u:"dans un hôpital",s:"Où",a:["Où ton père travaille-t-il ?","Où est-ce que ton père travaille ?","Où travaille ton père ?","Où votre père travaille-t-il ?","Où est-ce que votre père travaille ?","Où travaille votre père ?"],e:"Hỏi nơi chốn: où. Nhớ đổi mon → ton/votre."},
 {t:"qu",q:"Lina apprend le français parce qu'elle aime les langues.",u:"parce qu'elle aime les langues",s:"Pourquoi",a:["Pourquoi Lina apprend-elle le français ?","Pourquoi est-ce que Lina apprend le français ?"],e:"Hỏi lý do: pourquoi → trả lời parce que."},
 {t:"qu",q:"Tom joue au football avec ses camarades.",u:"avec ses camarades",s:"Avec qui",a:["Avec qui Tom joue-t-il au football ?","Avec qui est-ce que Tom joue au football ?"],e:"Giới từ đứng đầu câu hỏi: avec qui (khác tiếng Anh 'Who… with?')."},
 {t:"qu",q:"Le film commence à 20 heures.",u:"à 20 heures",s:"À quelle heure",a:["À quelle heure le film commence-t-il ?","À quelle heure est-ce que le film commence ?","À quelle heure commence le film ?"],e:"Ba cách hỏi: đảo ngữ, est-ce que, hoặc đảo động từ lên trước danh từ."},
 {t:"qu",q:"Ils habitent à Lyon depuis trois ans.",u:"depuis trois ans",s:"Depuis combien de temps",a:["Depuis combien de temps habitent-ils à Lyon ?","Depuis combien de temps est-ce qu'ils habitent à Lyon ?"],e:"depuis + thì hiện tại (tiếng Anh dùng present perfect: 'have lived')."},
 {t:"qu",q:"Sophie a acheté une robe rouge.",u:"une robe rouge",s:"Qu'est-ce que",a:["Qu'est-ce que Sophie a acheté ?","Qu'a acheté Sophie ?"],e:"Hỏi vật (tân ngữ): qu'est-ce que."},
 {t:"qu",q:"Nous partons en vacances en juillet.",u:"en juillet",s:"Quand",a:["Quand partez-vous en vacances ?","Quand est-ce que vous partez en vacances ?"],e:"Hỏi thời gian: quand. Đổi nous → vous."},
 {t:"qu",q:"Marc va au travail en métro.",u:"en métro",s:"Comment",a:["Comment Marc va-t-il au travail ?","Comment est-ce que Marc va au travail ?"],e:"Hỏi phương tiện, cách thức: comment."},
 {t:"qcm",q:"___ coûte ce livre ? – 15 euros.",o:["Combien","Comment","Quel"],a:0,e:"Hỏi giá: combien."},
 {t:"qcm",q:"___ tu habites ? – À Hanoï.",o:["Où","Quand","Comment"],a:0,e:"Hỏi nơi chốn: où."},
 {t:"tr",q:"Tu parles anglais.",i:"Posez la question avec l'inversion.",a:["Parles-tu anglais ?"],e:"Đảo ngữ: động từ + gạch nối + đại từ."},
 {t:"tr",q:"Il aime le chocolat.",i:"Posez la question avec « est-ce que ».",a:["Est-ce qu'il aime le chocolat ?"],e:"est-ce que + câu khẳng định, không đảo ngữ."}
]});

/* Conjugation engine: [présent, futur stem, participe passé, auxiliaire] */
const VERBS={
 parler:["parle parles parle parlons parlez parlent","parler","parlé","a"],
 finir:["finis finis finit finissons finissez finissent","finir","fini","a"],
 manger:["mange manges mange mangeons mangez mangent","manger","mangé","a"],
 commencer:["commence commences commence commençons commencez commencent","commencer","commencé","a"],
 acheter:["achète achètes achète achetons achetez achètent","achèter","acheté","a"],
 appeler:["appelle appelles appelle appelons appelez appellent","appeller","appelé","a"],
 être:["suis es est sommes êtes sont","ser","été","a"],
 avoir:["ai as a avons avez ont","aur","eu","a"],
 aller:["vais vas va allons allez vont","ir","allé","e"],
 faire:["fais fais fait faisons faites font","fer","fait","a"],
 venir:["viens viens vient venons venez viennent","viendr","venu","e"],
 prendre:["prends prends prend prenons prenez prennent","prendr","pris","a"],
 pouvoir:["peux peux peut pouvons pouvez peuvent","pourr","pu","a"],
 vouloir:["veux veux veut voulons voulez veulent","voudr","voulu","a"],
 devoir:["dois dois doit devons devez doivent","devr","dû","a"],
 savoir:["sais sais sait savons savez savent","saur","su","a"],
 voir:["vois vois voit voyons voyez voient","verr","vu","a"],
 partir:["pars pars part partons partez partent","partir","parti","e"],
 dormir:["dors dors dort dormons dormez dorment","dormir","dormi","a"],
 lire:["lis lis lit lisons lisez lisent","lir","lu","a"],
 écrire:["écris écris écrit écrivons écrivez écrivent","écrir","écrit","a"],
 boire:["bois bois boit buvons buvez boivent","boir","bu","a"],
 mettre:["mets mets met mettons mettez mettent","mettr","mis","a"],
 dire:["dis dis dit disons dites disent","dir","dit","a"],
 connaître:["connais connais connaît connaissons connaissez connaissent","connaîtr","connu","a"],
 arriver:["arrive arrives arrive arrivons arrivez arrivent","arriver","arrivé","e"],
 rester:["reste restes reste restons restez restent","rester","resté","e"],
 recevoir:["reçois reçois reçoit recevons recevez reçoivent","recevr","reçu","a"]
};
const SUBJ_IRR={
 être:"sois sois soit soyons soyez soient", avoir:"aie aies ait ayons ayez aient",
 aller:"aille ailles aille allions alliez aillent", faire:"fasse fasses fasse fassions fassiez fassent",
 pouvoir:"puisse puisses puisse puissions puissiez puissent", savoir:"sache saches sache sachions sachiez sachent",
 vouloir:"veuille veuilles veuille voulions vouliez veuillent"
};
const PRON=["je","tu","il","nous","vous","ils"];
const TENSES={
 pres:{fr:"présent",lv:"A1"}, pc:{fr:"passé composé",lv:"A2"}, imp:{fr:"imparfait",lv:"A2"},
 fut:{fr:"futur simple",lv:"A2"}, cond:{fr:"conditionnel présent",lv:"B1"}, subj:{fr:"subjonctif présent",lv:"B1"}
};
const TOPIC_TENSES={present:["pres"],pc:["pc"],imp_pc:["imp","pc"],futur:["fut"],conditionnel:["cond"],subjonctif:["subj"],subj_conj:["subj"],cond_passe:["cond"]};
const LEVEL_TENSES={A1:["pres"],A2:["pres","pc","imp","fut"],B1:["imp","fut","cond","subj"],B2:["cond","subj","imp","fut"]};
function stemFix(st,e){if(e[0]==="i"){if(/ge$/.test(st))st=st.slice(0,-1);else if(/ç$/.test(st))st=st.slice(0,-1)+"c";}return st+e;}
/* returns, for each person, the list of accepted forms (without pronoun) */
function conjugate(inf,tense){
 const [pres,fut,pp,aux]=VERBS[inf];const P=pres.split(" ");
 const one=a=>a.map(x=>[x]);
 if(tense==="pres")return one(P);
 const impStem=inf==="être"?"ét":P[3].slice(0,-3);
 const IMP=["ais","ais","ait","ions","iez","aient"];
 if(tense==="imp")return one(IMP.map(e=>stemFix(impStem,e)));
 if(tense==="fut")return one(["ai","as","a","ons","ez","ont"].map(e=>fut+e));
 if(tense==="cond")return one(IMP.map(e=>fut+e));
 if(tense==="subj"){
  if(SUBJ_IRR[inf])return one(SUBJ_IRR[inf].split(" "));
  const st=P[5].slice(0,-3);
  return one([st+"e",st+"es",st+"e",stemFix(impStem,"ions"),stemFix(impStem,"iez"),st+"ent"]);
 }
 if(tense==="pc"){
  const A=aux==="e"?["suis","es","est","sommes","êtes","sont"]:["ai","as","a","avons","avez","ont"];
  return A.map((a,i)=>{
   if(aux!=="e")return [a+" "+pp];
   const m=i>=3?pp+"s":pp, f=i>=3?pp+"es":pp+"e";
   if(i===4)return [a+" "+m,a+" "+f,a+" "+pp,a+" "+pp+"e"];
   return (i===2||i===5)?[a+" "+m]:[a+" "+m,a+" "+f];
  });
 }
}
function conjRule(inf,tense){
 const [,fut,,aux]=VERBS[inf];
 return {pres:"Présent: động từ này cần học thuộc bảng chia.",
  pc:aux==="e"?"Động từ đi với être → phân từ hợp giống, số với chủ ngữ.":"Trợ động từ avoir (présent) + phân từ quá khứ.",
  imp:inf==="être"?"être là ngoại lệ: gốc ét- + -ais, -ais, -ait, -ions, -iez, -aient.":"Imparfait: lấy nous ở présent, bỏ -ons, thêm -ais, -ais, -ait, -ions, -iez, -aient.",
  fut:`Futur simple: gốc ${fut}- + -ai, -as, -a, -ons, -ez, -ont.`,
  cond:`Conditionnel: gốc futur (${fut}-) + đuôi imparfait -ais, -ait, -ions…`,
  subj:SUBJ_IRR[inf]?"Subjonctif bất quy tắc, cần học thuộc.":"Subjonctif: gốc = ils ở présent bỏ -ent; nous/vous giống imparfait."}[tense];
}
function elide(pron,form){return pron==="je"&&/^[aeiouéèêhy]/i.test(form)?"j'"+form:pron+" "+form;}

/* Cloze texts: [[answer(/variant)|hint]] */
const CLOZE=[
 {topic:"present",lv:"A1",title:"La journée de Ben",text:"Tous les jours de la semaine, Ben [[se lève|se lever]] à 6 h 30. Il [[prend|prendre]] une douche et il [[s'habille|s'habiller]]. Sa mère [[prépare|préparer]] le petit-déjeuner pour toute la famille. Ben [[mange|manger]] des tartines, mais il ne [[boit|boire]] pas de café. Il [[part|partir]] de la maison à 7 h 20 et il [[va|aller]] à l'école en bus. Les cours [[commencent|commencer]] à 8 heures. Ben [[aime|aimer]] les sciences, mais il ne [[comprend|comprendre]] pas toujours les maths. Après l'école, ses amis et lui [[font|faire]] du basket."},
 {topic:"pc",lv:"A2",title:"Un week-end à la mer",text:"Samedi dernier, nous [[sommes partis/sommes parties|partir]] à la mer avec des amis. Nous [[avons pris|prendre]] le train à 8 heures. En arrivant, j'[[ai acheté|acheter]] des glaces pour tout le monde. L'après-midi, mes amis [[ont nagé|nager]] et moi, j'[[ai lu|lire]] un livre sur la plage. Le soir, nous [[avons dîné|dîner]] dans un petit restaurant. Léa [[est rentrée|rentrer]] à l'hôtel tôt parce qu'elle était fatiguée. Dimanche, nous [[avons visité|visiter]] le port, puis nous [[sommes revenus/sommes revenues|revenir]] à Paris."},
 {topic:"imp_pc",lv:"A2",title:"Un souvenir d'enfance",text:"Quand j'[[étais|être]] petit, j'[[habitais|habiter]] à la campagne chez mes grands-parents. Tous les matins, mon grand-père [[allait|aller]] chercher du pain au village. Un jour, il [[faisait|faire]] très froid et il [[neigeait|neiger]]. Ce matin-là, mon grand-père [[est tombé|tomber]] dans la neige ! Heureusement, un voisin l'[[a aidé|aider]] à se relever. Après, nous [[avons ri|rire]] ensemble. Le soir, ma grand-mère nous [[a raconté|raconter]] une histoire au coin du feu."},
 {topic:"futur",lv:"A2",title:"Les projets de Camille",text:"L'année prochaine, Camille [[finira|finir]] ses études. Elle [[partira|partir]] au Canada pour travailler. Elle [[aura|avoir]] un petit appartement à Montréal et elle [[pourra|pouvoir]] améliorer son anglais. Ses parents [[viendront|venir]] la voir en été. Ensemble, ils [[feront|faire]] un grand voyage en voiture. Quand elle [[reviendra|revenir]] en France, elle [[sera|être]] sûrement plus indépendante."},
 {topic:"conditionnel",lv:"B1",title:"Si j'étais maire…",text:"Si j'étais maire de ma ville, je [[créerais|créer]] plus d'espaces verts. Les voitures ne [[pourraient|pouvoir]] plus entrer dans le centre. Les habitants [[iraient|aller]] au travail à vélo ou en tramway. Nous [[aurions|avoir]] aussi une grande bibliothèque ouverte le soir. Les jeunes y [[viendraient|venir]] pour étudier ensemble. Si la ville [[avait|avoir]] plus d'argent, elle [[construirait|construire]] une piscine publique. À mon avis, tout le monde [[serait|être]] plus heureux !"},
 {topic:"subjonctif",lv:"B1",title:"Conseils avant l'examen",text:"Avant le DELF, il faut que tu [[dormes|dormir]] bien. Il est important que tu [[prennes|prendre]] un bon petit-déjeuner. Je voudrais que tu [[sois|être]] calme et confiant. Ton professeur souhaite que vous [[arriviez|arriver]] en avance. Pendant l'épreuve, il vaut mieux que tu [[lises|lire]] toutes les consignes. Je suis sûr que tu [[réussiras|réussir]], parce que tu [[as|avoir]] beaucoup travaillé ! Il faut seulement que tu [[aies|avoir]] confiance en toi."},
 {topic:"passif",lv:"B2",title:"Un nouveau pont pour la ville",text:"Le nouveau pont de la ville [[a été inauguré|inaugurer, passé composé passif]] hier par le maire. Il [[a été construit|construire, passé composé passif]] en seulement deux ans. Chaque jour, il [[sera utilisé|utiliser, futur passif]] par des milliers de cyclistes. Les travaux [[ont été financés|financer, passé composé passif]] par la région. Selon les experts, la circulation en centre-ville [[sera réduite|réduire, futur passif]] de 20 %."}
];

/* Reading passages. k: tf = vrai/faux + justification, mc = choice, open = short answer */
const READ=[
 {lv:"A1",title:"Un message de Julie",text:"Salut Clara !\nSamedi, c'est mon anniversaire. J'organise une petite fête chez moi, 12 rue des Lilas, à partir de 19 heures. Il y a des pizzas et un gâteau au chocolat. Tu peux venir avec ton frère ? Apporte de la musique, s'il te plaît ! Mes parents ne sont pas là ce week-end : ils sont chez ma grand-mère, à Lyon.\nRéponds-moi avant jeudi.\nBisous, Julie",qs:[
  {k:"mc",s:"Julie écrit pour…",o:["inviter Clara à une fête","annuler une fête","demander de l'argent"],a:0},
  {k:"open",s:"À quelle heure commence la fête ?",a:["À 19 heures.","À partir de 19 heures.","19 heures"]},
  {k:"tf",s:"Les parents de Julie seront à la fête.",a:false,j:"Mes parents ne sont pas là ce week-end"},
  {k:"mc",s:"Clara doit apporter…",o:["de la musique","un gâteau","des pizzas"],a:0},
  {k:"open",s:"Avant quel jour Clara doit-elle répondre ?",a:["Avant jeudi.","Jeudi"]}
 ]},
 {lv:"A2",title:"La journée d'Anna",text:"Anna a dix ans et elle habite à Nantes avec ses parents et son petit frère. Les jours d'école, elle se lève à six heures et demie. Elle prend son petit-déjeuner en famille et quitte la maison à sept heures et quart. Son école n'est pas loin, alors elle y va à pied avec sa meilleure amie.\nLe matin, Anna a quatre cours. Sa matière préférée est l'anglais, parce qu'elle adore lire des histoires et apprendre de nouveaux mots. Elle déjeune à la cantine et rentre à la maison à seize heures trente. Après le goûter, elle fait ses devoirs. Le soir, elle aide parfois sa mère à préparer le dîner. Elle se couche vers neuf heures.",qs:[
  {k:"open",s:"Avec qui Anna habite-t-elle ?",a:["Avec ses parents et son petit frère."]},
  {k:"open",s:"Comment va-t-elle à l'école ?",a:["À pied.","Elle y va à pied.","Elle y va à pied avec sa meilleure amie."]},
  {k:"tf",s:"Anna déjeune à la maison.",a:false,j:"Elle déjeune à la cantine"},
  {k:"mc",s:"Pourquoi Anna aime-t-elle l'anglais ?",o:["Elle adore lire des histoires et apprendre des mots.","Son professeur est très gentil.","Elle a toujours de bonnes notes."],a:0},
  {k:"tf",s:"Anna aide sa mère tous les soirs.",a:false,j:"elle aide parfois sa mère"},
  {k:"open",s:"Que fait-elle après le goûter ?",a:["Elle fait ses devoirs.","Ses devoirs"]}
 ]},
 {lv:"B1",title:"Le télétravail : liberté ou piège ?",text:"Depuis quelques années, de plus en plus de salariés travaillent chez eux un ou deux jours par semaine. Dans l'entreprise de notre exemple, sept télétravailleurs sur dix se disent plus efficaces à la maison, car ils sont moins dérangés et ne perdent plus de temps dans les transports.\nCependant, le télétravail présente aussi des inconvénients. Beaucoup de salariés regrettent le manque de contact avec leurs collègues et ont du mal à séparer vie professionnelle et vie privée : certains continuent à lire leurs e-mails tard le soir.\nPour éviter ces problèmes, les spécialistes conseillent de garder des horaires fixes et d'aménager un espace réservé au travail. Les entreprises, de leur côté, organisent des journées au bureau pour maintenir l'esprit d'équipe.",qs:[
  {k:"mc",s:"Ce texte parle surtout…",o:["des avantages et des inconvénients du télétravail","d'une nouvelle loi sur le travail","des problèmes de transport"],a:0},
  {k:"tf",s:"La plupart des télétravailleurs se sentent plus efficaces à la maison.",a:true,j:"sept télétravailleurs sur dix se disent plus efficaces à la maison"},
  {k:"open",s:"Citez un inconvénient du télétravail.",a:["Le manque de contact avec les collègues.","Il est difficile de séparer vie professionnelle et vie privée."]},
  {k:"tf",s:"Les spécialistes conseillent de travailler tard le soir.",a:false,j:"garder des horaires fixes"},
  {k:"mc",s:"Pourquoi les entreprises organisent-elles des journées au bureau ?",o:["pour maintenir l'esprit d'équipe","pour réduire les coûts","pour contrôler les horaires"],a:0}
 ]},
 {lv:"B2",title:"Faut-il bannir le smartphone de l'école ?",text:"Faut-il interdire les smartphones dans les établissements scolaires ? La question divise. Pour les partisans de l'interdiction, le téléphone est avant tout une source de distraction : les notifications interrompent sans cesse la concentration des élèves, et le harcèlement en ligne se poursuit jusque dans la cour de récréation. Plusieurs établissements qui ont tenté l'expérience affirment d'ailleurs que les élèves discutent davantage entre eux pendant les pauses.\nLeurs adversaires estiment au contraire qu'interdire n'est pas éduquer. Selon eux, l'école devrait plutôt apprendre aux jeunes à utiliser ces outils de manière responsable, d'autant qu'ils peuvent servir à des fins pédagogiques : dictionnaires, applications de langues, recherches documentaires. Une interdiction totale risquerait, de surcroît, d'être difficile à faire respecter.\nEntre ces deux positions, une solution intermédiaire semble se dessiner : autoriser le téléphone uniquement en classe, à la demande de l'enseignant, et le ranger le reste du temps.",qs:[
  {k:"mc",s:"Quel est l'objectif principal de ce texte ?",o:["présenter un débat et ses différentes positions","défendre l'interdiction totale des téléphones","expliquer le fonctionnement d'un smartphone"],a:0},
  {k:"tf",s:"Selon les partisans de l'interdiction, le harcèlement en ligne s'arrête à la porte de l'école.",a:false,j:"le harcèlement en ligne se poursuit jusque dans la cour de récréation"},
  {k:"open",s:"Quel argument pédagogique les adversaires de l'interdiction avancent-ils ?",a:["Le téléphone peut servir à des fins pédagogiques : dictionnaires, applications de langues, recherches.","L'école devrait apprendre aux jeunes à utiliser ces outils de manière responsable."]},
  {k:"tf",s:"Une interdiction totale pourrait être difficile à appliquer.",a:true,j:"risquerait, de surcroît, d'être difficile à faire respecter"},
  {k:"mc",s:"« De surcroît » signifie :",o:["en plus","par conséquent","pourtant"],a:0},
  {k:"open",s:"Quelle solution intermédiaire est proposée ?",a:["Autoriser le téléphone seulement en classe, à la demande de l'enseignant."]}
 ]}
];

/* Writing prompts (DELF-style) */
const WRITE=[
 {lv:"A1",p:"Vous êtes en vacances. Écrivez une carte postale à un(e) ami(e) : dites où vous êtes, quel temps il fait et ce que vous faites.",min:40,max:50,req:["Formule d'appel et de fin (Salut… / Bisous…)","Le lieu et le temps qu'il fait","Au moins deux activités au présent"]},
 {lv:"A1",p:"Vous écrivez un e-mail à votre nouveau correspondant français pour vous présenter : nom, âge, ville, famille, goûts.",min:40,max:50,req:["Formule d'appel et de fin","Au moins une chose que vous aimez et une que vous n'aimez pas","Une question à votre correspondant"]},
 {lv:"A2",p:"Décrivez votre routine quotidienne pendant la semaine.",min:60,max:80,req:["Au moins 3 adverbes de fréquence (toujours, souvent, parfois, jamais…)","Une phrase négative","Une phrase avec « parce que »"]},
 {lv:"A2",p:"Écrivez un e-mail à un(e) ami(e) pour lui raconter votre dernier week-end.",min:60,max:80,req:["Passé composé pour les actions","Imparfait pour décrire (le temps, vos sentiments)","Une invitation ou une question à la fin"]},
 {lv:"B1",p:"Sur un forum, on demande : « Faut-il apprendre une langue étrangère dès l'école primaire ? » Donnez votre opinion de façon argumentée, avec des exemples.",min:160,max:180,req:["Une introduction qui présente le sujet","Au moins deux arguments avec exemples","Des connecteurs (d'abord, de plus, cependant, donc…)","Une conclusion"]},
 {lv:"B1",p:"Vous avez participé à un événement (concert, fête, voyage scolaire…). Écrivez un article pour le blog de votre école : racontez l'événement et donnez vos impressions.",min:160,max:180,req:["Un titre","Le récit au passé (passé composé / imparfait)","Vos sentiments et votre opinion","Une recommandation aux lecteurs"]},
 {lv:"B2",p:"La mairie a décidé de fermer la bibliothèque de votre quartier. Vous écrivez au maire pour protester et proposer des solutions.",min:250,max:300,req:["Format de lettre formelle (objet, formule d'appel, formule de politesse)","Au moins trois arguments structurés","Une ou deux propositions concrètes","Registre soutenu, subjonctif et conditionnel"]},
 {lv:"B2",p:"Essai argumenté : « Le télétravail est-il l'avenir du travail ? » Vous donnez votre point de vue de manière nuancée.",min:250,max:300,req:["Une introduction avec une problématique","Des arguments pour et contre, illustrés d'exemples","Des connecteurs logiques variés","Une conclusion qui prend position"]}
];
