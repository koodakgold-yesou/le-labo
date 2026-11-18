const BANK = [
{id:"present",lv:"A1",fr:"Le présent",vn:"Thì hiện tại",items:[
 {t:"gap",q:"Nous ___ (finir) nos devoirs avant le dîner.",a:["finissons"],e:"Động từ nhóm 2 (-ir): nous + -issons."},
 {t:"gap",q:"Ils ___ (prendre) le bus tous les matins.",a:["prennent"],e:"prendre bất quy tắc: ils prennent (gấp đôi n)."},
 {t:"gap",q:"Tu ___ (aller) au travail à pied ?",a:["vas"],e:"aller: je vais, tu vas, il va…"},
 {t:"gap",q:"Vous ___ (faire) du sport le week-end ?",a:["faites"],e:"faire bất quy tắc: vous faites (không có *faisez)."},
 {t:"gap",q:"Les enfants ___ (dormir) encore.",a:["dorment"],e:"dormir: ils dorment (bỏ m ở số ít: je dors)."},
 {t:"qcm",q:"Elle ___ ses enfants à l'école.",o:["emmène","emmènes","emmènent"],a:0,e:"Chủ ngữ elle → đuôi -e."},
 {t:"qcm",q:"Je ___ venir demain, j'ai du temps.",o:["peux","peut","pouvons"],a:0,e:"pouvoir: je peux, il peut."},
 {t:"err",q:"Nous mangons au restaurant ce soir.",w:"mangons",a:["mangeons"],e:"Động từ -ger giữ chữ e trước -ons để đọc /ʒ/."},
 {t:"tr",q:"Je me lève à 7 heures.",i:"Réécrivez la phrase avec « nous ».",a:["Nous nous levons à 7 heures."],e:"Động từ phản thân: nous nous levons."}
]},
{id:"articles",lv:"A1",fr:"Les articles",vn:"Mạo từ xác định, không xác định, bộ phận",items:[
 {t:"qcm",q:"Je voudrais ___ eau, s'il vous plaît.",o:["de l'","la","du"],a:0,e:"Lượng không đếm được → mạo từ bộ phận; trước nguyên âm: de l'."},
 {t:"qcm",q:"J'adore ___ chocolat.",o:["le","du","un"],a:0,e:"Sau aimer, adorer, détester dùng mạo từ xác định (nói chung)."},
 {t:"qcm",q:"Il n'y a pas ___ lait dans le frigo.",o:["de","du","le"],a:0,e:"Câu phủ định: du/de la/des → de."},
 {t:"qcm",q:"Il fait ___ sport tous les jours.",o:["du","de la","le"],a:0,e:"faire du sport (sport giống đực)."},
 {t:"gap",q:"Elle a ___ chat et deux chiens.",a:["un"],e:"Danh từ đếm được, chưa xác định → un/une."},
 {t:"gap",q:"Nous allons à ___ plage cet après-midi.",a:["la"],e:"plage giống cái → à la plage."},
 {t:"gap",q:"Ce soir, je vais ___ cinéma.",a:["au"],e:"à + le = au."},
 {t:"err",q:"Je ne mange pas des légumes.",w:"des",a:["de"],e:"Phủ định: des → de."}
]},
{id:"prepositions",lv:"A1",fr:"Prépositions de lieu",vn:"Giới từ với thành phố, quốc gia, nơi chốn",items:[
 {t:"qcm",q:"J'habite ___ France.",o:["en","au","à"],a:0,e:"Nước giống cái → en."},
 {t:"qcm",q:"Il travaille ___ Canada.",o:["au","en","à"],a:0,e:"Nước giống đực bắt đầu bằng phụ âm → au."},
 {t:"qcm",q:"Elle vit ___ États-Unis.",o:["aux","en","au"],a:0,e:"Nước số nhiều → aux."},
 {t:"qcm",q:"Elle revient ___ Italie demain.",o:["d'","de l'","du"],a:0,e:"venir de + nước giống cái → d'Italie (không có mạo từ)."},
 {t:"qcm",q:"Le livre est ___ la table.",o:["sur","à","en"],a:0,e:"sur = trên (on)."},
 {t:"gap",q:"Je suis né ___ Hanoï.",a:["à"],e:"Thành phố → à."},
 {t:"gap",q:"Cet après-midi, je vais ___ médecin.",a:["chez le"],e:"Đến chỗ một người → chez (chez le médecin)."},
 {t:"err",q:"Mon frère étudie en Portugal.",w:"en",a:["au"],e:"Portugal giống đực, bắt đầu bằng phụ âm → au Portugal."}
]},
{id:"pc",lv:"A2",fr:"Le passé composé",vn:"Quá khứ kép (avoir / être, hợp giống số)",items:[
 {t:"gap",q:"Hier, nous ___ (aller) au musée.",a:["sommes allés","sommes allées"],e:"aller dùng être → phân từ hợp với chủ ngữ. Khác present perfect tiếng Anh: dùng được với mốc 'hier'."},
 {t:"gap",q:"La semaine dernière, elle ___ (finir) son projet.",a:["a fini"],e:"finir → fini, trợ động từ avoir."},
 {t:"gap",q:"Samedi, ils ___ (voir) un bon film.",a:["ont vu"],e:"voir → vu."},
 {t:"qcm",q:"Marie ___ à Paris en 2020.",o:["est née","a né","est né"],a:0,e:"naître dùng être; Marie giống cái → née."},
 {t:"qcm",q:"Nous ___ nos valises dans la voiture.",o:["avons mis","sommes mis","avons mettu"],a:0,e:"mettre → mis, trợ động từ avoir."},
 {t:"qcm",q:"Tu ___ ton ami hier ?",o:["as appelé","es appelé","as appeler"],a:0,e:"appeler dùng avoir; phân từ: appelé."},
 {t:"err",q:"Elle est restée à la maison, puis elle a sorti avec ses amies.",w:"a sorti",a:["est sortie"],e:"sortir (đi ra ngoài, không có tân ngữ) dùng être."},
 {t:"tr",q:"Je prends le train.",i:"Mettez au passé composé.",a:["J'ai pris le train."],e:"prendre → pris."},
 {t:"tr",q:"Elles se promènent dans le parc.",i:"Mettez au passé composé.",a:["Elles se sont promenées dans le parc."],e:"Động từ phản thân dùng être, hợp giống số."}
]},
{id:"imp_pc",lv:"A2",fr:"Imparfait ou passé composé",vn:"Phân biệt imparfait và passé composé",items:[
 {t:"qcm",q:"Quand j'étais petit, je ___ souvent chez mes grands-parents.",o:["allais","suis allé","irai"],a:0,e:"Thói quen trong quá khứ → imparfait."},
 {t:"qcm",q:"Je regardais la télé quand le téléphone ___.",o:["a sonné","sonnait","sonne"],a:0,e:"Hành động xen vào → passé composé; hành động nền → imparfait."},
 {t:"qcm",q:"Elle ___ 20 ans quand elle a rencontré son mari.",o:["avait","a eu","aura"],a:0,e:"Tuổi, mô tả hoàn cảnh → imparfait."},
 {t:"gap",q:"Il ___ (faire) beau, alors nous sommes sortis.",a:["faisait"],e:"Mô tả thời tiết, bối cảnh → imparfait."},
 {t:"gap",q:"Hier soir, j'___ (dîner) au restaurant avec Paul.",a:["ai dîné"],e:"Sự việc cụ thể, đã xong → passé composé."},
 {t:"gap",q:"Pendant les vacances, nous ___ (se lever) tard tous les jours.",a:["nous levions"],e:"Lặp lại thường xuyên (tous les jours) → imparfait."},
 {t:"err",q:"Hier, j'étais fatigué, alors je me couchais tôt.",w:"me couchais",a:["me suis couché","me suis couchée"],e:"Hành động cụ thể, hoàn tất → passé composé."},
 {t:"tr",q:"Il pleut. Je reste à la maison.",i:"Mettez au passé (imparfait + passé composé).",a:["Il pleuvait. Je suis resté à la maison.","Il pleuvait, je suis resté à la maison.","Il pleuvait. Je suis restée à la maison.","Il pleuvait, je suis restée à la maison."],e:"Bối cảnh (mưa) → imparfait; hành động → passé composé."}
]},
{id:"futur",lv:"A2",fr:"Futur proche et futur simple",vn:"Tương lai gần và tương lai đơn",items:[
 {t:"gap",q:"Demain, nous ___ (partir) à 8 heures.",a:["partirons","allons partir"],e:"Futur simple: partir + -ons."},
 {t:"gap",q:"Quand tu ___ (être) grand, tu comprendras.",a:["seras"],e:"Sau quand chỉ tương lai dùng futur. Khác tiếng Anh ('when you are' dùng hiện tại)."},
 {t:"gap",q:"L'année prochaine, j'___ (avoir) mon diplôme.",a:["aurai"],e:"avoir → gốc aur-."},
 {t:"gap",q:"En juillet, ils ___ (venir) nous voir.",a:["viendront"],e:"venir → gốc viendr-."},
 {t:"gap",q:"Vous ___ (pouvoir) m'aider la semaine prochaine ?",a:["pourrez"],e:"pouvoir → gốc pourr-."},
 {t:"qcm",q:"Attention, tu ___ tomber !",o:["vas","iras","allais"],a:0,e:"Việc sắp xảy ra ngay → futur proche (aller + nguyên mẫu)."},
 {t:"qcm",q:"S'il fait beau demain, nous ___ à la plage.",o:["irons","irions","sommes allés"],a:0,e:"si + présent → futur."},
 {t:"err",q:"Je vous téléphonerai quand j'arrive à Lyon.",w:"arrive",a:["arriverai"],e:"quand + tương lai → futur simple."},
 {t:"tr",q:"Je vais visiter Rome.",i:"Mettez au futur simple.",a:["Je visiterai Rome."],e:"visiter → visiterai."}
]},
{id:"pronoms",lv:"A2",fr:"Pronoms COD et COI",vn:"Đại từ tân ngữ trực tiếp / gián tiếp",items:[
 {t:"qcm",q:"Tu connais Sophie ? – Oui, je ___ connais bien.",o:["la","lui","le"],a:0,e:"connaître qqn → COD; Sophie giống cái → la. Khác tiếng Anh: đại từ đứng TRƯỚC động từ."},
 {t:"qcm",q:"Tu as parlé à tes parents ? – Oui, je ___ ai parlé hier.",o:["leur","les","lui"],a:0,e:"parler à qqn → COI; số nhiều → leur."},
 {t:"qcm",q:"Ce livre ? Je ___ acheté hier.",o:["l'ai","lui ai","le ai"],a:0,e:"COD le + ai → l'ai."},
 {t:"qcm",q:"Tes clés ? Je ne ___ trouve pas.",o:["les","leur","lui"],a:0,e:"trouver qqch → COD số nhiều → les."},
 {t:"tr",q:"Je téléphone à ma mère.",i:"Remplacez le complément par un pronom.",a:["Je lui téléphone."],e:"téléphoner à qqn → lui."},
 {t:"tr",q:"Nous regardons les photos.",i:"Remplacez le complément par un pronom.",a:["Nous les regardons."],e:"regarder qqch → COD → les."},
 {t:"tr",q:"Tu as vu Paul ?",i:"Répondez « Oui » avec un pronom.",a:["Oui, je l'ai vu."],e:"le + ai → l'ai; phân từ hợp với COD đứng trước (Paul → vu)."},
 {t:"err",q:"Ma sœur ? Je la donne un cadeau pour son anniversaire.",w:"la",a:["lui"],e:"donner qqch À qqn → COI → lui."}
]},
{id:"y_en",lv:"A2",fr:"Les pronoms y et en",vn:"Đại từ y và en",items:[
 {t:"qcm",q:"Tu vas à la piscine ? – Oui, j'___ vais demain.",o:["y","en","le"],a:0,e:"y thay cho nơi chốn (à la piscine)."},
 {t:"qcm",q:"Tu veux du thé ? – Oui, j'___ veux bien.",o:["en","y","le"],a:0,e:"en thay cho du/de la/des + danh từ."},
 {t:"qcm",q:"Combien de frères as-tu ? – J'___ ai deux.",o:["en","y","les"],a:0,e:"en đi với số lượng: j'en ai deux."},
 {t:"gap",q:"Tu t'intéresses à la politique ? – Oui, je m'___ intéresse.",a:["y"],e:"s'intéresser à + vật → y."},
 {t:"gap",q:"Il parle souvent de son travail ? – Oui, il ___ parle tout le temps.",a:["en"],e:"parler de + vật → en."},
 {t:"tr",q:"Je pense à mes vacances.",i:"Remplacez le complément par « y » ou « en ».",a:["J'y pense."],e:"penser à + vật → y."},
 {t:"tr",q:"Elle revient de Lyon.",i:"Remplacez le complément par « y » ou « en ».",a:["Elle en revient."],e:"revenir de + nơi chốn → en."},
 {t:"err",q:"Tu as des enfants ? – Oui, j'y ai trois.",w:"y",a:["en"],e:"Số lượng → en: j'en ai trois."}
]},
{id:"comparatif",lv:"A2",fr:"Comparatif et superlatif",vn:"So sánh hơn, kém, bằng, nhất",items:[
 {t:"qcm",q:"Paris est ___ grande que Lyon.",o:["plus","plus de","la plus"],a:0,e:"plus + tính từ + que."},
 {t:"qcm",q:"Ce gâteau est ___ que l'autre.",o:["meilleur","plus bon","mieux"],a:0,e:"bon (tính từ) → meilleur."},
 {t:"qcm",q:"Elle chante ___ que moi.",o:["mieux","meilleur","plus bien"],a:0,e:"bien (trạng từ) → mieux."},
 {t:"qcm",q:"Je préfère le livre : le film est ___ intéressant.",o:["moins","plus","aussi"],a:0,e:"moins = kém hơn."},
 {t:"gap",q:"Le Mont Blanc est la montagne la ___ haute de France.",a:["plus"],e:"Superlatif: la plus + tính từ."},
 {t:"gap",q:"Il a autant ___ livres que sa sœur.",a:["de"],e:"autant de + danh từ + que."},
 {t:"err",q:"C'est le plus bon restaurant de la ville.",w:"plus bon",a:["meilleur"],e:"Không nói *plus bon → meilleur."},
 {t:"tr",q:"Marc a 20 ans. Julie a 25 ans.",i:"Faites une phrase comparative avec « jeune » qui commence par « Marc ».",a:["Marc est plus jeune que Julie."],e:"plus + tính từ + que."}
]},
{id:"negation",lv:"A2",fr:"La négation",vn:"Câu phủ định (ne… pas / plus / jamais / rien / personne)",items:[
 {t:"tr",q:"Je fume.",i:"Mettez à la forme négative avec « ne… plus ».",a:["Je ne fume plus."],e:"ne… plus = không… nữa. Tiếng Pháp không dùng trợ động từ như 'do'."},
 {t:"tr",q:"J'ai vu quelqu'un.",i:"Mettez à la forme négative.",a:["Je n'ai vu personne."],e:"personne đứng SAU phân từ."},
 {t:"tr",q:"Il a mangé quelque chose.",i:"Mettez à la forme négative.",a:["Il n'a rien mangé."],e:"rien đứng TRƯỚC phân từ."},
 {t:"qcm",q:"Elle n'est ___ allée en Chine.",o:["jamais","personne","aucun"],a:0,e:"ne… jamais = chưa bao giờ."},
 {t:"qcm",q:"La salle est vide : il n'y a ___.",o:["personne","rien de","jamais"],a:0,e:"il n'y a personne = không có ai."},
 {t:"gap",q:"Nous n'avons ___ de pain. Il faut en acheter.",a:["plus","pas"],e:"ne… plus / ne… pas + de + danh từ."},
 {t:"err",q:"Je n'ai pas aucune idée.",w:"pas aucune",a:["aucune"],e:"Không dùng pas cùng aucun(e): je n'ai aucune idée."}
]},
{id:"relatifs",lv:"B1",fr:"Pronoms relatifs simples",vn:"Đại từ quan hệ qui, que, où, dont",items:[
 {t:"qcm",q:"Le livre ___ je lis est passionnant.",o:["que","qui","dont"],a:0,e:"que = tân ngữ của động từ lire."},
 {t:"qcm",q:"La ville ___ je suis né est petite.",o:["où","que","dont"],a:0,e:"Nơi chốn → où."},
 {t:"qcm",q:"C'est l'homme ___ j'ai parlé hier.",o:["dont","que","où"],a:0,e:"parler de qqn → dont."},
 {t:"qcm",q:"J'ai une amie ___ habite à Marseille.",o:["qui","que","dont"],a:0,e:"qui = chủ ngữ của habite."},
 {t:"gap",q:"Voici le film ___ tout le monde parle.",a:["dont"],e:"parler de → dont."},
 {t:"gap",q:"Je me souviens du jour ___ nous nous sommes rencontrés.",a:["où"],e:"où cũng dùng cho thời gian (tiếng Anh dùng 'when')."},
 {t:"err",q:"C'est le restaurant que je t'ai parlé.",w:"que",a:["dont"],e:"parler de qqch → dont."},
 {t:"tr",q:"J'ai un ami. Cet ami parle cinq langues.",i:"Reliez les deux phrases avec un pronom relatif.",a:["J'ai un ami qui parle cinq langues."],e:"Chủ ngữ → qui."},
 {t:"tr",q:"C'est une actrice. J'admire beaucoup cette actrice.",i:"Reliez les deux phrases avec un pronom relatif.",a:["C'est une actrice que j'admire beaucoup."],e:"Tân ngữ trực tiếp → que."}
]},
{id:"conditionnel",lv:"B1",fr:"Conditionnel et hypothèse",vn:"Câu điều kiện, conditionnel présent",items:[
 {t:"gap",q:"Si j'avais de l'argent, j'___ (acheter) une maison.",a:["achèterais"],e:"si + imparfait → conditionnel présent."},
 {t:"gap",q:"Je ___ (vouloir) un café, s'il vous plaît.",a:["voudrais"],e:"Conditionnel lịch sự: je voudrais."},
 {t:"gap",q:"Tu ___ (devoir) te reposer un peu.",a:["devrais"],e:"Lời khuyên → devoir ở conditionnel."},
 {t:"gap",q:"Vous ___ (pouvoir) fermer la fenêtre, s'il vous plaît ?",a:["pourriez"],e:"Yêu cầu lịch sự → pourriez."},
 {t:"qcm",q:"Si tu étudiais plus, tu ___ ton examen.",o:["réussirais","réussiras","réussissais"],a:0,e:"si + imparfait → conditionnel."},
 {t:"qcm",q:"S'il pleut demain, nous ___ à la maison.",o:["resterons","resterions","restions"],a:0,e:"si + présent → futur."},
 {t:"qcm",q:"À ta place, je ___ ce travail.",o:["prendrais","prendrai","prenais"],a:0,e:"Khuyên (à ta place) → conditionnel."},
 {t:"err",q:"Si j'aurais le temps, je voyagerais plus.",w:"aurais",a:["avais"],e:"Không dùng conditionnel ngay sau si: si j'avais."},
 {t:"tr",q:"Je n'ai pas de voiture, donc je ne vais pas au travail en voiture.",i:"Faites une hypothèse avec « si ».",a:["Si j'avais une voiture, j'irais au travail en voiture."],e:"si + imparfait, conditionnel présent."}
]},
{id:"subjonctif",lv:"B1",fr:"Le subjonctif présent",vn:"Thức giả định (subjonctif) cơ bản",items:[
 {t:"gap",q:"Il faut que tu ___ (finir) ce travail ce soir.",a:["finisses"],e:"il faut que + subjonctif. Tiếng Anh gần như không có cấu trúc tương đương."},
 {t:"gap",q:"Je veux que vous ___ (venir) à ma fête.",a:["veniez"],e:"vouloir que + subjonctif."},
 {t:"gap",q:"Il est important que nous ___ (être) à l'heure.",a:["soyons"],e:"être → que nous soyons."},
 {t:"gap",q:"Ma mère aimerait que je ___ (faire) médecine.",a:["fasse"],e:"faire → que je fasse."},
 {t:"qcm",q:"Je suis content que tu ___ là.",o:["sois","es","seras"],a:0,e:"Cảm xúc + que → subjonctif."},
 {t:"qcm",q:"Je pense qu'il ___ raison.",o:["a","ait","avoir"],a:0,e:"penser que (khẳng định) → indicatif."},
 {t:"err",q:"Il faut que nous partons maintenant.",w:"partons",a:["partions"],e:"Subjonctif của partir: que nous partions."},
 {t:"tr",q:"Tu dois apprendre tes leçons.",i:"Réécrivez la phrase en commençant par « Il faut que… ».",a:["Il faut que tu apprennes tes leçons."],e:"apprendre → que tu apprennes."}
]},
{id:"pqp",lv:"B1",fr:"Le plus-que-parfait",vn:"Quá khứ hoàn thành",items:[
 {t:"gap",q:"Quand je suis arrivé à la gare, le train ___ (partir).",a:["était parti","était déjà parti"],e:"Hành động xảy ra trước một hành động quá khứ khác. Giống 'had left' trong tiếng Anh."},
 {t:"gap",q:"Elle m'a dit qu'elle ___ (perdre) ses clés.",a:["avait perdu"],e:"avoir ở imparfait + phân từ."},
 {t:"gap",q:"Ils ___ (déjà / manger) quand nous sommes arrivés.",a:["avaient déjà mangé"],e:"déjà đứng giữa trợ động từ và phân từ."},
 {t:"qcm",q:"Il était fatigué parce qu'il ___ toute la nuit.",o:["avait travaillé","travaillera","travaille"],a:0,e:"Nguyên nhân xảy ra trước → plus-que-parfait."},
 {t:"qcm",q:"Nous avons visité la ville qu'ils nous ___ conseillée.",o:["avaient","ont","auront"],a:0,e:"Lời khuyên có trước chuyến thăm → plus-que-parfait."},
 {t:"err",q:"Quand nous sommes arrivés, le film avait déjà commencer.",w:"commencer",a:["commencé"],e:"Sau trợ động từ dùng phân từ (commencé), không dùng nguyên mẫu."},
 {t:"tr",q:"J'ai lu ce livre.",i:"Commencez par « Je lui ai dit que… ».",a:["Je lui ai dit que j'avais lu ce livre."],e:"Passé composé → plus-que-parfait khi lùi thì."}
]},
{id:"connecteurs",lv:"B1",fr:"Les connecteurs logiques",vn:"Từ nối: nguyên nhân, kết quả, đối lập",items:[
 {t:"qcm",q:"Il est resté chez lui ___ il était malade.",o:["parce qu'","pourtant","donc"],a:0,e:"parce que = vì (nguyên nhân)."},
 {t:"qcm",q:"Il pleuvait, ___ nous avons annulé le pique-nique.",o:["c'est pourquoi","bien que","puisque"],a:0,e:"c'est pourquoi = vì vậy (kết quả)."},
 {t:"qcm",q:"___ la pluie, le match a eu lieu.",o:["Malgré","Bien que","Grâce à"],a:0,e:"malgré + danh từ = mặc dù."},
 {t:"qcm",q:"___ son aide, j'ai réussi mon examen.",o:["Grâce à","À cause de","Malgré"],a:0,e:"grâce à = nhờ (tích cực); à cause de = tại (tiêu cực)."},
 {t:"qcm",q:"Elle est très riche ; ___, elle n'est pas heureuse.",o:["pourtant","donc","car"],a:0,e:"pourtant = tuy vậy (đối lập)."},
 {t:"qcm",q:"___ tu es là, aide-moi à porter ces cartons !",o:["Puisque","Pourtant","Malgré"],a:0,e:"puisque = vì (lý do đã rõ)."},
 {t:"gap",q:"Le vol a été annulé à ___ de la neige.",a:["cause"],e:"à cause de + danh từ (nguyên nhân tiêu cực)."},
 {t:"err",q:"Malgré qu'il soit fatigué, il continue à travailler.",w:"Malgré qu'",a:["Bien qu'"],e:"Dùng bien que + subjonctif; malgré chỉ đi với danh từ."}
]},
{id:"discours",lv:"B1",fr:"Le discours indirect",vn:"Câu gián tiếp",items:[
 {t:"tr",q:"Il dit : « Je suis fatigué. »",i:"Mettez au discours indirect.",a:["Il dit qu'il est fatigué."],e:"Động từ dẫn ở hiện tại → giữ nguyên thì."},
 {t:"tr",q:"Elle m'a demandé : « Tu viens ce soir ? »",i:"Mettez au discours indirect.",a:["Elle m'a demandé si je venais ce soir-là.","Elle m'a demandé si je venais ce soir."],e:"Câu hỏi có/không → si; lùi thì présent → imparfait."},
 {t:"tr",q:"Il m'a dit : « Ferme la porte ! »",i:"Mettez au discours indirect.",a:["Il m'a dit de fermer la porte."],e:"Mệnh lệnh → de + nguyên mẫu."},
 {t:"qcm",q:"Il m'a demandé ___ je faisais.",o:["ce que","qu'est-ce que","que"],a:0,e:"qu'est-ce que → ce que trong câu gián tiếp."},
 {t:"qcm",q:"Paul a dit qu'il ___ le lendemain.",o:["partirait","partira","part"],a:0,e:"Động từ dẫn ở quá khứ: futur → conditionnel."},
 {t:"qcm",q:"Il m'a demandé ___ j'habitais.",o:["où","que","ce que"],a:0,e:"Từ để hỏi (où) giữ nguyên."},
 {t:"gap",q:"Le professeur nous a dit ___ faire attention.",a:["de"],e:"dire à qqn de + nguyên mẫu."},
 {t:"err",q:"Elle m'a demandé qu'est-ce que je voulais.",w:"qu'est-ce que",a:["ce que"],e:"Câu gián tiếp: ce que, không dùng qu'est-ce que."}
]},
{id:"faux_amis",lv:"B1",fr:"Faux amis français–anglais",vn:"Từ giống tiếng Anh nhưng khác nghĩa",items:[
 {t:"qcm",q:"« Actuellement » signifie :",o:["hiện nay (currently)","thực ra (actually)","cuối cùng (eventually)"],a:0,e:"actually = en fait; currently = actuellement."},
 {t:"qcm",q:"« Une librairie », c'est :",o:["hiệu sách (bookstore)","thư viện (library)","phòng thí nghiệm"],a:0,e:"library = bibliothèque."},
 {t:"qcm",q:"« Éventuellement » signifie :",o:["có thể, nếu cần (possibly)","cuối cùng (eventually)","ngay lập tức"],a:0,e:"eventually = finalement."},
 {t:"qcm",q:"« Sensible » signifie :",o:["nhạy cảm (sensitive)","hợp lý (sensible)","dễ thấy"],a:0,e:"sensible (EN) = raisonnable."},
 {t:"qcm",q:"« Rester » signifie :",o:["ở lại (stay)","nghỉ ngơi (rest)","trả lại"],a:0,e:"to rest = se reposer."},
 {t:"qcm",q:"« Attendre » signifie :",o:["chờ (wait)","tham dự (attend)","chú ý"],a:0,e:"to attend = assister à."},
 {t:"gap",q:"« I'm attending the meeting » → J'___ à la réunion.",a:["assiste"],e:"assister à = tham dự (không phải giúp đỡ)."},
 {t:"err",q:"J'ai emprunté ce livre à la librairie municipale, c'est gratuit.",w:"librairie",a:["bibliothèque"],e:"Mượn sách miễn phí → bibliothèque (thư viện)."}
]},
{id:"passif",lv:"B2",fr:"La voix passive",vn:"Câu bị động",items:[
 {t:"tr",q:"Le maire inaugurera le pont.",i:"Mettez à la voix passive.",a:["Le pont sera inauguré par le maire."],e:"Futur → sera + phân từ."},
 {t:"tr",q:"Un journaliste a interviewé le ministre.",i:"Mettez à la voix passive.",a:["Le ministre a été interviewé par un journaliste."],e:"Passé composé → a été + phân từ."},
 {t:"tr",q:"On a volé mon vélo.",i:"Mettez à la voix passive.",a:["Mon vélo a été volé."],e:"Chủ ngữ « on » → bỏ tác nhân."},
 {t:"gap",q:"Cette maison ___ (construire) en 1850. (passé composé passif)",a:["a été construite"],e:"Phân từ hợp với chủ ngữ giống cái."},
 {t:"gap",q:"Ce roman ___ (traduire) en vingt langues. (passé composé passif)",a:["a été traduit"],e:"traduire → traduit."},
 {t:"qcm",q:"Les résultats ___ demain.",o:["seront publiés","seront publié","auront publiés"],a:0,e:"Phân từ hợp số nhiều."},
 {t:"qcm",q:"Le voleur ___ par la police hier soir.",o:["a été arrêté","est arrêté","avait arrêté"],a:0,e:"Hành động quá khứ cụ thể → a été arrêté."},
 {t:"err",q:"Les lettres ont été envoyé hier.",w:"envoyé",a:["envoyées"],e:"Bị động: phân từ hợp giống, số với chủ ngữ."}
]},
{id:"gerondif",lv:"B2",fr:"Gérondif et participe présent",vn:"Gérondif và phân từ hiện tại",items:[
 {t:"tr",q:"Il écoute de la musique quand il travaille.",i:"Utilisez le gérondif.",a:["Il écoute de la musique en travaillant."],e:"Hai hành động đồng thời, cùng chủ ngữ → en + -ant."},
 {t:"gap",q:"C'est en ___ (lire) beaucoup qu'on améliore son vocabulaire.",a:["lisant"],e:"Gérondif chỉ cách thức: en lisant."},
 {t:"gap",q:"Je l'ai rencontré en ___ (faire) les courses.",a:["faisant"],e:"faire → faisant."},
 {t:"gap",q:"Nous avons trouvé un appartement en ___ (chercher) sur Internet.",a:["cherchant"],e:"Chỉ phương tiện → gérondif."},
 {t:"qcm",q:"___ malade, elle n'est pas venue au cours.",o:["Étant","En étant","Ayant"],a:0,e:"Participe présent chỉ nguyên nhân: étant."},
 {t:"qcm",q:"Les étudiants ___ un visa doivent s'inscrire avant mai.",o:["ayant","en ayant","ayants"],a:0,e:"Participe présent thay mệnh đề qui (= qui ont); không biến đổi."},
 {t:"qcm",q:"Il s'est blessé ___ du ski.",o:["en faisant","faisant","en fait"],a:0,e:"Hoàn cảnh xảy ra → gérondif."},
 {t:"err",q:"Elle est tombée en courrant.",w:"courrant",a:["courant"],e:"courir → courant (một chữ r)."}
]},
{id:"cond_passe",lv:"B2",fr:"Conditionnel passé et hypothèse passée",vn:"Conditionnel quá khứ, giả định trái quá khứ",items:[
 {t:"gap",q:"Si j'avais su, je ___ (venir) plus tôt.",a:["serais venu","serais venue"],e:"si + plus-que-parfait → conditionnel passé."},
 {t:"gap",q:"Si tu m'avais appelé, je t'___ (aider).",a:["aurais aidé"],e:"avoir ở conditionnel + phân từ."},
 {t:"qcm",q:"Si nous étions partis plus tôt, nous ___ le train.",o:["aurions pris","prendrions","avions pris"],a:0,e:"Giả định trái với quá khứ."},
 {t:"qcm",q:"D'après la presse, l'incendie ___ par un court-circuit.",o:["aurait été causé","serait causé","avait été causer"],a:0,e:"Conditionnel passé: thông tin chưa được xác nhận (văn báo chí)."},
 {t:"qcm",q:"J'___ aimé voir ce film, mais je n'avais pas le temps.",o:["aurais","avais","aurai"],a:0,e:"Tiếc nuối → conditionnel passé."},
 {t:"err",q:"Si j'aurais étudié, j'aurais réussi.",w:"aurais étudié",a:["avais étudié"],e:"Sau si dùng plus-que-parfait."},
 {t:"tr",q:"Je n'ai pas pris de parapluie, alors j'ai été mouillé.",i:"Faites une hypothèse sur le passé avec « si ».",a:["Si j'avais pris un parapluie, je n'aurais pas été mouillé.","Si j'avais pris un parapluie, je n'aurais pas été mouillée."],e:"si + plus-que-parfait, conditionnel passé."}
]},
{id:"subj_conj",lv:"B2",fr:"Subjonctif ou indicatif",vn:"Subjonctif sau liên từ; phân biệt với indicatif",items:[
 {t:"qcm",q:"Je te prête mon livre à condition que tu me le ___ demain.",o:["rendes","rends","rendras"],a:0,e:"à condition que + subjonctif."},
 {t:"qcm",q:"Il est parti avant que nous ___ arrivés.",o:["soyons","sommes","étions"],a:0,e:"avant que + subjonctif."},
 {t:"qcm",q:"Bien qu'il ___ tard, il continue de travailler.",o:["soit","est","sera"],a:0,e:"bien que + subjonctif."},
 {t:"qcm",q:"Je suis sûr qu'elle ___ la vérité.",o:["dit","dise","dirait"],a:0,e:"être sûr que → indicatif (chắc chắn)."},
 {t:"qcm",q:"Bien qu'elle ___ beaucoup travaillé, elle n'a pas réussi.",o:["ait","a","avait"],a:0,e:"Subjonctif passé: ait + phân từ."},
 {t:"gap",q:"Je parle lentement pour que tu me ___ (comprendre).",a:["comprennes"],e:"pour que + subjonctif."},
 {t:"gap",q:"Je resterai ici jusqu'à ce que tu ___ (revenir).",a:["reviennes"],e:"jusqu'à ce que + subjonctif."},
 {t:"err",q:"Je doute qu'il viendra à la réunion.",w:"viendra",a:["vienne"],e:"douter que + subjonctif."},
 {t:"tr",q:"Il pleut, mais nous sortons.",i:"Réécrivez la phrase avec « bien que ».",a:["Bien qu'il pleuve, nous sortons.","Nous sortons bien qu'il pleuve."],e:"pleuvoir → qu'il pleuve."}
]},
{id:"relatifs_comp",lv:"B2",fr:"Pronoms relatifs composés",vn:"lequel, auquel, duquel…",items:[
 {t:"qcm",q:"Voici le projet ___ je travaille depuis un an.",o:["sur lequel","lequel","dont"],a:0,e:"travailler sur qqch → sur lequel."},
 {t:"qcm",q:"C'est une question à ___ je n'ai pas de réponse.",o:["laquelle","qui","quoi"],a:0,e:"question giống cái, sau giới từ → laquelle."},
 {t:"qcm",q:"Ce sont des problèmes ___ je pense souvent.",o:["auxquels","desquels","lesquels"],a:0,e:"penser à + vật, số nhiều giống đực → auxquels."},
 {t:"qcm",q:"Le parc près ___ j'habite est magnifique.",o:["duquel","dont","lequel"],a:0,e:"Giới từ ghép près de + lequel → duquel (không dùng dont)."},
 {t:"gap",q:"Le collègue avec ___ je partage mon bureau est très sympa.",a:["qui","lequel"],e:"Chỉ người sau giới từ: avec qui (hoặc lequel)."},
 {t:"gap",q:"L'entreprise pour ___ elle travaille est internationale.",a:["laquelle"],e:"entreprise giống cái → pour laquelle."},
 {t:"err",q:"La raison pour quoi il est parti reste un mystère.",w:"pour quoi",a:["pour laquelle"],e:"raison giống cái → pour laquelle."},
 {t:"tr",q:"C'est un sujet. Je m'intéresse beaucoup à ce sujet.",i:"Reliez les deux phrases avec un pronom relatif composé.",a:["C'est un sujet auquel je m'intéresse beaucoup."],e:"s'intéresser à + sujet (giống đực) → auquel."}
]}
];

