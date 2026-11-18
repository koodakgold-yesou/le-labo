/* Topics needed by the Grammaire progressive roadmap that the original bank lacked (original items). */
BANK.push(
{id:"adjectifs",lv:"A1",fr:"L'adjectif : accord et place",vn:"Tính từ: hợp giống số và vị trí",items:[
 {t:"qcm",q:"Ma sœur est très ___.",o:["sportive","sportif","sportifs"],a:0,e:"Tính từ hợp giống với danh từ: sportif → sportive."},
 {t:"gap",q:"Ce sont des fleurs ___ (blanc).",a:["blanches"],e:"blanc → blanche → blanches (giống cái, số nhiều)."},
 {t:"qcm",q:"J'ai acheté une ___ voiture.",o:["belle","bel","beau"],a:0,e:"beau → belle ở giống cái."},
 {t:"qcm",q:"C'est un ___ ami.",o:["vieil","vieux","vieille"],a:0,e:"vieux → vieil trước danh từ giống đực bắt đầu bằng nguyên âm."},
 {t:"err",q:"Elle porte une robe vert.",w:"vert",a:["verte"],e:"robe giống cái → verte."},
 {t:"tr",q:"Il est grand et sérieux.",i:"Mettez au féminin (Elle…).",a:["Elle est grande et sérieuse."],e:"grand → grande; sérieux → sérieuse."}
]},
{id:"possessifs",lv:"A1",fr:"Possessifs et démonstratifs",vn:"Sở hữu (mon, ma…) và chỉ định (ce, cet…)",items:[
 {t:"qcm",q:"C'est ___ amie Sophie.",o:["mon","ma","mes"],a:0,e:"Trước danh từ giống cái bắt đầu bằng nguyên âm dùng mon (mon amie)."},
 {t:"qcm",q:"Les enfants rangent ___ chambre.",o:["leur","leurs","ses"],a:0,e:"leur + danh từ số ít."},
 {t:"qcm",q:"___ hôtel est très confortable.",o:["Cet","Ce","Cette"],a:0,e:"Trước danh từ giống đực bắt đầu bằng nguyên âm hoặc h câm: cet."},
 {t:"gap",q:"___ livre est à toi ? – Non, il est à Paul.",a:["Ce"],e:"ce + danh từ giống đực bắt đầu bằng phụ âm."},
 {t:"tr",q:"C'est le stylo de Marie.",i:"Remplacez par un pronom possessif : « C'est… »",a:["C'est le sien."],e:"le sien: giống theo vật (stylo, giống đực), không theo người."},
 {t:"err",q:"Pierre adore sa vélo.",w:"sa vélo",a:["son vélo"],e:"Sở hữu hợp với vật (vélo giống đực), không theo người sở hữu. Khác tiếng Anh his/her."}
]},
{id:"nombres",lv:"A1",fr:"Nombres, dates et heures",vn:"Số đếm, ngày tháng, giờ",items:[
 {t:"qcm",q:"Comment écrit-on 80 en France ?",o:["quatre-vingts","huitante","quatre-vingt"],a:0,e:"80 = quatre-vingts (có s). Một số vùng Thụy Sĩ nói huitante."},
 {t:"qcm",q:"Il est 14 h 30. On peut aussi dire :",o:["deux heures et demie de l'après-midi","deux heures et quart","trois heures moins le quart"],a:0,e:"30 phút = et demie."},
 {t:"gap",q:"Aujourd'hui, nous sommes ___ 3 mars.",a:["le"],e:"Ngày tháng: le + số."},
 {t:"qcm",q:"Le ___ janvier, c'est le Nouvel An.",o:["premier","un","première"],a:0,e:"Ngày mùng 1 dùng số thứ tự: le premier."},
 {t:"gap",q:"Mon anniversaire est ___ juillet.",a:["en"],e:"en + tháng; nhưng au printemps."},
 {t:"err",q:"Je suis né en le 5 mai.",w:"en le",a:["le"],e:"Ngày cụ thể: le 5 mai, không có en."}
]},
{id:"temps_exp",lv:"A2",fr:"Expressions de temps",vn:"depuis, pendant, il y a, en, dans",items:[
 {t:"qcm",q:"J'apprends le français ___ deux ans.",o:["depuis","pendant","il y a"],a:0,e:"depuis + hiện tại: việc vẫn đang tiếp diễn. Tiếng Anh dùng 'have been learning'."},
 {t:"qcm",q:"J'ai vécu à Lyon ___ trois ans, puis je suis parti.",o:["pendant","depuis","dans"],a:0,e:"pendant: khoảng thời gian đã kết thúc."},
 {t:"qcm",q:"Je suis arrivé en France ___ six mois.",o:["il y a","depuis","pendant"],a:0,e:"il y a + thời gian = cách đây (ago)."},
 {t:"gap",q:"J'ai lu ce livre ___ deux jours seulement : il est passionnant !",a:["en"],e:"en + thời gian cần để làm xong."},
 {t:"qcm",q:"Le train part ___ dix minutes.",o:["dans","il y a","depuis"],a:0,e:"dans + thời gian = sau (tương lai)."},
 {t:"err",q:"Je travaille ici pendant 2020.",w:"pendant",a:["depuis"],e:"Mốc bắt đầu, việc vẫn tiếp diễn → depuis."}
]},
{id:"quantite",lv:"A2",fr:"L'expression de la quantité",vn:"beaucoup de, un kilo de, trop de…",items:[
 {t:"qcm",q:"Je voudrais un kilo ___ pommes.",o:["de","des","du"],a:0,e:"Lượng xác định + de."},
 {t:"qcm",q:"Il y a beaucoup ___ monde ici.",o:["de","du","des"],a:0,e:"beaucoup de + danh từ (không mạo từ)."},
 {t:"gap",q:"Elle boit trop ___ café.",a:["de"],e:"trop de + danh từ."},
 {t:"qcm",q:"Ajoute ___ sel, juste une petite quantité.",o:["un peu de","beaucoup","plusieurs"],a:0,e:"un peu de = một chút."},
 {t:"err",q:"J'ai acheté une bouteille du vin.",w:"du vin",a:["de vin"],e:"une bouteille de + danh từ."},
 {t:"tr",q:"Il y a des œufs.",i:"Mettez à la forme négative.",a:["Il n'y a pas d'œufs."],e:"Phủ định: des → de (d')."}
]},
{id:"toniques",lv:"A2",fr:"Les pronoms toniques",vn:"moi, toi, lui, elle, nous, vous, eux",items:[
 {t:"qcm",q:"___, je préfère le thé.",o:["Moi","Je","Me"],a:0,e:"Đại từ nhấn mạnh đứng đầu câu: Moi, je…"},
 {t:"qcm",q:"Ce soir, tu dînes chez ___ ? (chez nous)",o:["nous","nos","notre"],a:0,e:"Sau giới từ dùng đại từ nhấn mạnh."},
 {t:"gap",q:"Ce cadeau est pour ___ ? – Oui, c'est pour toi !",a:["moi"],e:"pour + moi."},
 {t:"qcm",q:"Qui a fait ça ? – C'est ___.",o:["lui","il","le"],a:0,e:"C'est + đại từ nhấn mạnh."},
 {t:"err",q:"Elle est plus grande que je.",w:"que je",a:["que moi"],e:"Sau que trong so sánh dùng moi (tiếng Anh: than me)."},
 {t:"tr",q:"Je pense à mes parents.",i:"Remplacez le complément par un pronom.",a:["Je pense à eux."],e:"penser à + người → à eux (không dùng leur)."}
]},
{id:"pronominaux",lv:"A2",fr:"Les verbes pronominaux",vn:"Động từ phản thân và tương hỗ",items:[
 {t:"gap",q:"Le matin, je ___ (se réveiller) à 7 heures.",a:["me réveille"],e:"je me réveille."},
 {t:"gap",q:"Hier soir, nous ___ (s'amuser) beaucoup. (passé composé)",a:["nous sommes amusés","nous sommes amusées","nous sommes bien amusés"],e:"Động từ phản thân dùng être ở passé composé."},
 {t:"qcm",q:"Paul et Léa ___ tous les jours.",o:["se téléphonent","se téléphone","téléphonent se"],a:0,e:"Tương hỗ: họ gọi cho nhau."},
 {t:"qcm",q:"Comment est-ce que tu ___ ?",o:["t'appelles","appelles","te appelles"],a:0,e:"te + nguyên âm → t'."},
 {t:"err",q:"Je me lave les mains et je brosse les dents.",w:"je brosse",a:["je me brosse"],e:"se brosser les dents là động từ phản thân."},
 {t:"tr",q:"Elle se maquille.",i:"Mettez au passé composé.",a:["Elle s'est maquillée."],e:"être + phân từ hợp với elle."}
]},
{id:"imperatif",lv:"A2",fr:"L'impératif",vn:"Câu mệnh lệnh",items:[
 {t:"tr",q:"Tu fermes la porte.",i:"Mettez à l'impératif.",a:["Ferme la porte."],e:"Động từ -er: bỏ s ở ngôi tu."},
 {t:"tr",q:"Vous ne parlez pas.",i:"Mettez à l'impératif.",a:["Ne parlez pas."],e:"Phủ định: ne + động từ + pas."},
 {t:"qcm",q:"___ sages, les enfants !",o:["Soyez","Êtes","Soyons"],a:0,e:"être → sois, soyons, soyez."},
 {t:"tr",q:"Tu me donnes le sel.",i:"Mettez à l'impératif.",a:["Donne-moi le sel."],e:"Khẳng định: đại từ đứng sau, me → moi."},
 {t:"gap",q:"N'___ pas peur ! (avoir, tu)",a:["aie"],e:"avoir → aie, ayons, ayez."},
 {t:"qcm",q:"Les livres ? ___ !",o:["Prends-les","Les prends","Prends-leur"],a:0,e:"Khẳng định: động từ + gạch nối + đại từ."}
]},
{id:"indefinis",lv:"B1",fr:"Les indéfinis",vn:"chaque, chacun, quelques, aucun, rien…",items:[
 {t:"qcm",q:"Il n'y a ___ dans le frigo : il faut faire les courses.",o:["rien","personne","aucun"],a:0,e:"rien = không có gì (vật)."},
 {t:"qcm",q:"___ élève doit rendre son devoir.",o:["Chaque","Chacun","Tous"],a:0,e:"chaque + danh từ số ít."},
 {t:"gap",q:"J'ai vu ___ films cette semaine, mais pas beaucoup. (một vài)",a:["quelques"],e:"quelques + danh từ số nhiều."},
 {t:"qcm",q:"Les invités sont arrivés ; ___ a apporté un cadeau.",o:["chacun","chaque","quelque"],a:0,e:"chacun đứng một mình, thay cho danh từ."},
 {t:"tr",q:"Tous les étudiants ont réussi.",i:"Mettez à la forme négative avec « aucun ».",a:["Aucun étudiant n'a réussi."],e:"aucun + danh từ số ít + ne."},
 {t:"err",q:"Tous les jour, je prends le métro.",w:"Tous les jour",a:["Tous les jours"],e:"tous les + danh từ số nhiều."}
]},
{id:"adverbes",lv:"B1",fr:"L'adverbe",vn:"Trạng từ -ment, bien/bon, vị trí trạng từ",items:[
 {t:"gap",q:"Il parle ___ (lent).",a:["lentement"],e:"lent → lente → lentement."},
 {t:"gap",q:"Elle répond ___ (patient).",a:["patiemment"],e:"-ent → -emment."},
 {t:"gap",q:"Il conduit ___ (prudent).",a:["prudemment"],e:"-ent → -emment."},
 {t:"qcm",q:"Tu as ___ compris ?",o:["bien","bon","meilleur"],a:0,e:"Bổ nghĩa cho động từ → bien."},
 {t:"err",q:"Elle chante très bon.",w:"bon",a:["bien"],e:"Bổ nghĩa cho động từ cần trạng từ: bien."},
 {t:"gap",q:"Il n'a ___ mangé de sushis. (không bao giờ)",a:["jamais"],e:"ne… jamais; ở passé composé đứng giữa avoir và phân từ."}
]},
{id:"periphrases",lv:"B1",fr:"Infinitif et périphrases verbales",vn:"venir de, être en train de, être sur le point de, avant de…",items:[
 {t:"qcm",q:"Dépêche-toi, le train est ___ partir !",o:["sur le point de","en train de","venir de"],a:0,e:"être sur le point de = sắp sửa."},
 {t:"gap",q:"Ne le dérange pas, il est en train de ___ (travailler).",a:["travailler"],e:"être en train de + nguyên mẫu = đang."},
 {t:"tr",q:"Elle a terminé ses devoirs il y a deux minutes.",i:"Utilisez « venir de ».",a:["Elle vient de terminer ses devoirs."],e:"venir de + nguyên mẫu = vừa mới."},
 {t:"qcm",q:"Après ___ dîné, nous sommes sortis.",o:["avoir","être","avoir eu"],a:0,e:"après + nguyên mẫu quá khứ (avoir dîné)."},
 {t:"gap",q:"Avant de ___ (sortir), éteins la lumière.",a:["sortir"],e:"avant de + nguyên mẫu."},
 {t:"err",q:"Je vais en train de lire.",w:"vais en train de",a:["suis en train de"],e:"être en train de, không dùng aller."}
]},
{id:"passe_simple",lv:"B2",fr:"Le passé simple",vn:"Thì quá khứ đơn trong văn viết",items:[
 {t:"qcm",q:"Victor Hugo ___ en 1802.",o:["naquit","naissa","naît"],a:0,e:"naître → il naquit. Thì dùng trong văn kể, sách sử."},
 {t:"qcm",q:"Ils ___ la ville au petit matin.",o:["quittèrent","quittirent","quitèrent"],a:0,e:"-er → -èrent ở ils."},
 {t:"gap",q:"Le roi ___ (être) très surpris. (passé simple)",a:["fut"],e:"être → il fut."},
 {t:"gap",q:"Elle ___ (avoir) une idée géniale. (passé simple)",a:["eut"],e:"avoir → elle eut."},
 {t:"tr",q:"Napoléon est devenu empereur en 1804.",i:"Mettez au passé simple.",a:["Napoléon devint empereur en 1804."],e:"devenir → il devint."},
 {t:"qcm",q:"Où rencontre-t-on surtout le passé simple ?",o:["dans les romans et les récits historiques","dans les conversations entre amis","dans les SMS"],a:0,e:"Hầu như chỉ gặp trong văn viết."}
]}
);
