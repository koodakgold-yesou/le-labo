/* ---------- Culture layer (original content; themes follow Civilisation progressive's outline) ---------- */
const THEMES={hist:"Lịch sử",arts:"Nghệ thuật & văn học",paris:"Paris",geo:"Địa lý & vùng miền",vie:"Đời sống & lễ hội",franco:"Pháp ngữ & Việt Nam"};

/* Grammar items set in a cultural context: merged into the existing topics */
const CULT_ITEMS={
 present:[
  {c:"vie",t:"gap",q:"En France, on ___ (manger) souvent du fromage après le plat principal.",a:["mange"],e:"on + động từ ngôi 3 số ít. Người Pháp ăn phô mai sau món chính, trước món tráng miệng."},
  {c:"paris",t:"qcm",q:"La tour Eiffel ___ à Paris, sur le Champ-de-Mars.",o:["se trouve","se trouvent","se trouver"],a:0,e:"Chủ ngữ số ít → se trouve."},
  {c:"franco",t:"gap",q:"Au Québec, les gens ___ (parler) français.",a:["parlent"],e:"Ở Québec (Canada), tiếng Pháp là ngôn ngữ chính thức duy nhất."}
 ],
 articles:[
  {c:"vie",t:"qcm",q:"Le matin, beaucoup de Français mangent ___ pain avec du beurre.",o:["du","le","un"],a:0,e:"Lượng không xác định → mạo từ bộ phận du."},
  {c:"vie",t:"qcm",q:"J'achète ___ baguette à la boulangerie tous les matins.",o:["une","du","des"],a:0,e:"baguette đếm được, giống cái → une."},
  {c:"vie",t:"err",q:"Le 2 février, pour la Chandeleur, on mange de la crêpes.",w:"de la crêpes",a:["des crêpes"],e:"crêpes số nhiều → des. Ngày Chandeleur (2/2) người Pháp ăn bánh crêpe."}
 ],
 prepositions:[
  {c:"geo",t:"qcm",q:"Le Mont-Saint-Michel se trouve ___ Normandie.",o:["en","au","à"],a:0,e:"Vùng giống cái → en Normandie."},
  {c:"franco",t:"qcm",q:"On parle aussi français ___ Sénégal.",o:["au","en","à"],a:0,e:"Sénégal giống đực → au. Tiếng Pháp là ngôn ngữ chính thức của Sénégal."},
  {c:"geo",t:"gap",q:"Strasbourg est une grande ville ___ Alsace, près de l'Allemagne.",a:["en","d'"],e:"en Alsace / d'Alsace. Strasbourg có trụ sở Nghị viện châu Âu."}
 ],
 pc:[
  {c:"hist",t:"gap",q:"Le 14 juillet 1789, le peuple de Paris ___ (prendre) la Bastille.",a:["a pris"],e:"prendre → pris. Sự kiện mở đầu Cách mạng Pháp."},
  {c:"arts",t:"gap",q:"Victor Hugo ___ (écrire) Les Misérables.",a:["a écrit"],e:"écrire → écrit. Tiểu thuyết xuất bản năm 1862."},
  {c:"hist",t:"qcm",q:"Napoléon ___ empereur en 1804.",o:["est devenu","a devenu","est devenue"],a:0,e:"devenir dùng être; Napoléon giống đực → devenu."},
  {c:"hist",t:"tr",q:"Les frères Lumière inventent le cinématographe en 1895.",i:"Mettez au passé composé.",a:["Les frères Lumière ont inventé le cinématographe en 1895."],e:"inventer → inventé, trợ động từ avoir."},
  {c:"hist",t:"err",q:"Marie Curie a reçue deux prix Nobel.",w:"a reçue",a:["a reçu"],e:"Với avoir, phân từ không hợp giống với chủ ngữ. Marie Curie đoạt Nobel Vật lý (1903) và Hoá học (1911)."}
 ],
 imp_pc:[
  {c:"arts",t:"qcm",q:"Quand Monet ___ à Giverny, il peignait souvent son jardin.",o:["habitait","a habité","habitera"],a:0,e:"Bối cảnh kéo dài → imparfait."},
  {c:"hist",t:"gap",q:"À la fin du XVIIe siècle, Louis XIV ___ (vivre) au château de Versailles.",a:["vivait","a vécu"],e:"Mô tả một tình trạng kéo dài → imparfait (thường gặp nhất)."},
  {c:"arts",t:"err",q:"L'été dernier, je visitais le Louvre et j'ai vu la Joconde.",w:"je visitais",a:["j'ai visité"],e:"Hành động cụ thể, một lần → passé composé."}
 ],
 futur:[
  {c:"vie",t:"gap",q:"Le 21 juin, pour la Fête de la musique, des musiciens ___ (jouer) dans toutes les rues.",a:["joueront","vont jouer"],e:"Futur simple. Fête de la musique có từ năm 1982."},
  {c:"geo",t:"gap",q:"Si tu vas en Bretagne, tu ___ (goûter) les crêpes et le cidre.",a:["goûteras"],e:"si + présent → futur. Bretagne nổi tiếng với crêpe và rượu táo (cidre)."}
 ],
 pronoms:[
  {c:"arts",t:"qcm",q:"La Joconde ? On ___ voit au musée du Louvre.",o:["la","lui","le"],a:0,e:"voir qqch → COD; Joconde giống cái → la."},
  {c:"arts",t:"tr",q:"Je lis Le Petit Prince.",i:"Remplacez le complément par un pronom.",a:["Je le lis."],e:"COD giống đực → le."}
 ],
 y_en:[
  {c:"paris",t:"qcm",q:"Tu es déjà allé au musée d'Orsay ? – Oui, j'___ suis allé l'année dernière.",o:["y","en","le"],a:0,e:"y thay nơi chốn. Bảo tàng Orsay vốn là một nhà ga."},
  {c:"vie",t:"qcm",q:"Les Français mangent beaucoup de fromage ? – Oui, ils ___ mangent beaucoup.",o:["en","y","le"],a:0,e:"de + danh từ → en."}
 ],
 comparatif:[
  {c:"geo",t:"qcm",q:"La Loire est le fleuve le ___ long de France.",o:["plus","moins","mieux"],a:0,e:"Superlatif. Loire dài khoảng 1 000 km, dài nhất nước Pháp."},
  {c:"geo",t:"gap",q:"Marseille est ___ ancienne que Paris : des Grecs l'ont fondée vers 600 avant J.-C.",a:["plus"],e:"plus + tính từ + que. Marseille là thành phố cổ nhất nước Pháp."},
  {c:"paris",t:"tr",q:"La tour Eiffel mesure 330 mètres. L'Arc de Triomphe mesure 50 mètres.",i:"Comparez avec « haut », en commençant par « La tour Eiffel ».",a:["La tour Eiffel est plus haute que l'Arc de Triomphe."],e:"tour giống cái → haute."}
 ],
 negation:[
  {c:"vie",t:"tr",q:"Beaucoup de magasins ouvrent le dimanche.",i:"Mettez à la forme négative.",a:["Beaucoup de magasins n'ouvrent pas le dimanche."],e:"ne + động từ + pas. Ở Pháp, nhiều cửa hàng đóng cửa ngày Chủ nhật."},
  {c:"hist",t:"qcm",q:"Avant 1944, les Françaises ___ voter.",o:["ne pouvaient pas","ne peuvent pas","ne pouvaient personne"],a:0,e:"Phụ nữ Pháp có quyền bầu cử từ năm 1944."}
 ],
 relatifs:[
  {c:"arts",t:"qcm",q:"Le Petit Prince est un livre ___ Antoine de Saint-Exupéry a écrit en 1943.",o:["qu'","qui","dont"],a:0,e:"Tân ngữ của écrire → que (qu')."},
  {c:"arts",t:"qcm",q:"Monet est le peintre ___ le tableau « Impression, soleil levant » a donné son nom à l'impressionnisme.",o:["dont","que","où"],a:0,e:"dont = của người đó (le tableau de Monet)."},
  {c:"paris",t:"gap",q:"Montmartre est le quartier ___ vivaient beaucoup d'artistes au début du XXe siècle.",a:["où"],e:"Nơi chốn → où."},
  {c:"hist",t:"tr",q:"Jeanne d'Arc est une héroïne. Les Français admirent cette héroïne.",i:"Reliez les deux phrases avec un pronom relatif.",a:["Jeanne d'Arc est une héroïne que les Français admirent."],e:"Tân ngữ trực tiếp → que."}
 ],
 conditionnel:[
  {c:"paris",t:"gap",q:"Si tu allais à Paris, tu ___ (pouvoir) visiter le musée d'Orsay, une ancienne gare.",a:["pourrais"],e:"si + imparfait → conditionnel présent."}
 ],
 subjonctif:[
  {c:"vie",t:"gap",q:"Il faut que tu ___ (goûter) la galette des rois en janvier !",a:["goûtes"],e:"il faut que + subjonctif. Bánh galette des rois ăn vào dịp lễ Hiển linh (tháng 1)."},
  {c:"paris",t:"qcm",q:"Je suis content que Notre-Dame ___ rouvert ses portes en 2024.",o:["ait","a","avait"],a:0,e:"Cảm xúc + que → subjonctif passé. Nhà thờ mở cửa lại tháng 12/2024 sau vụ cháy năm 2019."}
 ],
 pqp:[
  {c:"hist",t:"gap",q:"En 1958, quand la Ve République a commencé, la France ___ (déjà / connaître) quatre républiques.",a:["avait déjà connu"],e:"Xảy ra trước một mốc quá khứ → plus-que-parfait."},
  {c:"arts",t:"qcm",q:"Quand Hugo a publié Les Misérables en 1862, il ___ Notre-Dame de Paris trente ans plus tôt.",o:["avait écrit","a écrit","écrivait"],a:0,e:"Hành động trước một hành động quá khứ khác. Notre-Dame de Paris ra đời năm 1831."}
 ],
 connecteurs:[
  {c:"vie",t:"qcm",q:"La baguette est entrée au patrimoine de l'UNESCO en 2022 ___ son savoir-faire artisanal.",o:["grâce à","malgré","à cause de"],a:0,e:"grâce à = nhờ (tích cực)."},
  {c:"vie",t:"qcm",q:"Le repas gastronomique des Français est célèbre ; ___, il est inscrit au patrimoine de l'UNESCO depuis 2010.",o:["d'ailleurs","pourtant","bien que"],a:0,e:"d'ailleurs = hơn nữa, bổ sung lập luận."}
 ],
 discours:[
  {c:"hist",t:"tr",q:"De Gaulle a déclaré : « La France a perdu une bataille, mais elle n'a pas perdu la guerre. »",i:"Mettez au discours indirect.",a:["De Gaulle a déclaré que la France avait perdu une bataille, mais qu'elle n'avait pas perdu la guerre.","De Gaulle a déclaré que la France avait perdu une bataille, mais qu'elle n'avait pas perdu la guerre"],e:"Động từ dẫn ở quá khứ: passé composé → plus-que-parfait. Câu nói nổi tiếng năm 1940."}
 ],
 passif:[
  {c:"paris",t:"tr",q:"L'entreprise de Gustave Eiffel a construit la tour pour l'Exposition universelle de 1889.",i:"Mettez à la voix passive.",a:["La tour a été construite par l'entreprise de Gustave Eiffel pour l'Exposition universelle de 1889."],e:"a été + phân từ hợp với tour (giống cái)."},
  {c:"hist",t:"gap",q:"La Déclaration des droits de l'homme et du citoyen ___ (adopter) en 1789. (passé composé passif)",a:["a été adoptée"],e:"Phân từ hợp với Déclaration (giống cái)."},
  {c:"hist",t:"qcm",q:"La peine de mort ___ en France en 1981.",o:["a été abolie","a aboli","est abolie"],a:0,e:"Bị động ở passé composé."}
 ],
 gerondif:[
  {c:"arts",t:"gap",q:"Les impressionnistes peignaient souvent en ___ (travailler) en plein air.",a:["travaillant"],e:"Gérondif chỉ cách thức."}
 ],
 cond_passe:[
  {c:"hist",t:"qcm",q:"Si Napoléon avait gagné à Waterloo, l'histoire de l'Europe ___ différente.",o:["aurait été","serait","avait été"],a:0,e:"Giả định trái với quá khứ → conditionnel passé. Trận Waterloo năm 1815."}
 ],
 subj_conj:[
  {c:"hist",t:"qcm",q:"Bien que Jeanne d'Arc ___ morte en 1431, elle reste un symbole national.",o:["soit","est","était"],a:0,e:"bien que + subjonctif."}
 ],
 relatifs_comp:[
  {c:"hist",t:"qcm",q:"La Révolution est une période pendant ___ la France a profondément changé.",o:["laquelle","lequel","quoi"],a:0,e:"période giống cái → pendant laquelle."},
  {c:"paris",t:"gap",q:"Le Louvre, dans ___ se trouve la Joconde, est le musée le plus visité du monde.",a:["lequel"],e:"musée giống đực, sau giới từ dans → lequel."}
 ],
 questions:[
  {c:"hist",t:"qu",q:"La Révolution française a commencé en 1789.",u:"en 1789",s:"Quand",a:["Quand la Révolution française a-t-elle commencé ?","Quand est-ce que la Révolution française a commencé ?"],e:"Hỏi thời gian: quand."},
  {c:"arts",t:"qu",q:"Antoine de Saint-Exupéry a écrit Le Petit Prince.",u:"Antoine de Saint-Exupéry",s:"Qui",a:["Qui a écrit Le Petit Prince ?","Qui est-ce qui a écrit Le Petit Prince ?"],e:"Hỏi người làm chủ ngữ: qui, không đảo ngữ."},
  {c:"paris",t:"qu",q:"La Joconde se trouve au Louvre.",u:"au Louvre",s:"Où",a:["Où se trouve la Joconde ?","Où est-ce que la Joconde se trouve ?","Où la Joconde se trouve-t-elle ?"],e:"Hỏi nơi chốn: où."}
 ]
};
for(const [id,arr] of Object.entries(CULT_ITEMS)){const t=BANK.find(x=>x.id===id);if(t)t.items.push(...arr);}

/* "Le saviez-vous ?" knowledge questions */
const CULTURE=[
 {c:"hist",lv:"A2",q:"La fête nationale française est le…",o:["14 juillet","1er mai","11 novembre"],a:0,e:"Kỷ niệm ngày phá ngục Bastille, 14/7/1789."},
 {c:"hist",lv:"A2",q:"La devise de la République française est…",o:["Liberté, Égalité, Fraternité","Travail, Famille, Patrie","Paix et Prospérité"],a:0,e:"« Travail, Famille, Patrie » là khẩu hiệu của chế độ Vichy (1940–1944)."},
 {c:"hist",lv:"A2",q:"Qui s'est fait couronner empereur des Français en 1804 ?",o:["Napoléon Bonaparte","Louis XIV","Charles de Gaulle"],a:0,e:"Lễ đăng quang diễn ra ở nhà thờ Notre-Dame de Paris."},
 {c:"hist",lv:"A2",q:"Jeanne d'Arc est une héroïne de…",o:["la guerre de Cent Ans","la Révolution française","la Première Guerre mondiale"],a:0,e:"Bà bị thiêu sống ở Rouen năm 1431."},
 {c:"hist",lv:"B1",q:"En quelle année les Françaises ont-elles obtenu le droit de vote ?",o:["1944","1789","1968"],a:0,e:"Lần đầu đi bầu là năm 1945."},
 {c:"hist",lv:"B1",q:"Quel homme d'État a fondé la Ve République en 1958 ?",o:["Charles de Gaulle","François Mitterrand","Jacques Chirac"],a:0,e:"Hiến pháp năm 1958 vẫn còn hiệu lực đến nay."},
 {c:"hist",lv:"B1",q:"Mai 68 est connu surtout comme…",o:["un grand mouvement d'étudiants et de grèves","une guerre contre l'Allemagne","la fin de la monarchie"],a:0,e:"Phong trào sinh viên và tổng đình công tháng 5/1968."},
 {c:"hist",lv:"A2",q:"Le symbole féminin de la République française s'appelle…",o:["Marianne","Jeanne","Joséphine"],a:0,e:"Tượng bán thân Marianne có mặt ở mọi toà thị chính."},
 {c:"hist",lv:"A2",q:"« La Marseillaise », c'est…",o:["l'hymne national français","un plat typique de Marseille","un tableau de Delacroix"],a:0,e:"Do Rouget de Lisle sáng tác năm 1792."},
 {c:"arts",lv:"A2",q:"Qui a écrit « Les Misérables » ?",o:["Victor Hugo","Molière","Albert Camus"],a:0,e:"Xuất bản năm 1862, kể chuyện Jean Valjean."},
 {c:"arts",lv:"B1",q:"Le mot « impressionnisme » vient d'un tableau de…",o:["Claude Monet","Pablo Picasso","Eugène Delacroix"],a:0,e:"Bức « Impression, soleil levant » (1872)."},
 {c:"arts",lv:"A2",q:"Molière est surtout célèbre pour ses…",o:["comédies","romans policiers","chansons"],a:0,e:"Nhà viết kịch thế kỷ XVII; tiếng Pháp còn được gọi là « la langue de Molière »."},
 {c:"arts",lv:"A2",q:"Quelle chanteuse a rendu célèbre « La Vie en rose » ?",o:["Édith Piaf","Céline Dion","Dalida"],a:0,e:"Ca khúc ra đời năm 1947."},
 {c:"arts",lv:"A2",q:"Qui a sculpté « Le Penseur » ?",o:["Auguste Rodin","Claude Monet","Gustave Eiffel"],a:0,e:"Có thể xem ở bảo tàng Rodin, Paris."},
 {c:"arts",lv:"A2",q:"« Le Petit Prince » a été écrit par…",o:["Antoine de Saint-Exupéry","Jules Verne","Victor Hugo"],a:0,e:"Xuất bản năm 1943, là một trong những cuốn sách được dịch nhiều nhất thế giới."},
 {c:"arts",lv:"A2",q:"Les frères Lumière sont connus pour l'invention du…",o:["cinématographe","téléphone","métro"],a:0,e:"Buổi chiếu phim có bán vé đầu tiên năm 1895 ở Paris."},
 {c:"arts",lv:"B1",q:"Quel écrivain français a reçu le prix Nobel de littérature en 1957 ?",o:["Albert Camus","Victor Hugo","Marcel Proust"],a:0,e:"Tác giả « L'Étranger » (Người xa lạ)."},
 {c:"arts",lv:"B1",q:"Chez Proust, quel petit gâteau fait revenir les souvenirs d'enfance ?",o:["une madeleine","un croissant","une crêpe"],a:0,e:"Cụm từ « la madeleine de Proust » = thứ gợi lại kỷ niệm."},
 {c:"paris",lv:"A2",q:"Le musée d'Orsay est installé dans…",o:["une ancienne gare","un ancien château","une ancienne église"],a:0,e:"Nơi có bộ sưu tập tranh ấn tượng lớn nhất."},
 {c:"paris",lv:"A2",q:"La tour Eiffel a été construite pour…",o:["l'Exposition universelle de 1889","les Jeux olympiques de 1924","le couronnement de Napoléon"],a:0,e:"Ban đầu tháp chỉ định tồn tại 20 năm."},
 {c:"paris",lv:"A2",q:"Quel musée, où se trouve la Joconde, est le plus visité du monde ?",o:["le Louvre","le Centre Pompidou","le musée d'Orsay"],a:0,e:"La Joconde (Mona Lisa) của Léonard de Vinci."},
 {c:"paris",lv:"A2",q:"Quelle ville a accueilli les Jeux olympiques d'été en 2024 ?",o:["Paris","Lyon","Marseille"],a:0,e:"Paris từng đăng cai năm 1900 và 1924."},
 {c:"geo",lv:"A2",q:"On appelle souvent la France métropolitaine « l'Hexagone » à cause de…",o:["sa forme à six côtés","ses six grandes villes","ses six fleuves"],a:0,e:"Bản đồ nước Pháp gần giống hình lục giác."},
 {c:"geo",lv:"A2",q:"Quel est le plus long fleuve de France ?",o:["la Loire","la Seine","le Rhône"],a:0,e:"Thung lũng Loire nổi tiếng với các lâu đài."},
 {c:"geo",lv:"A2",q:"Dans quelle région se trouve le Mont-Saint-Michel ?",o:["la Normandie","la Provence","l'Alsace"],a:0,e:"Hòn đảo có tu viện, nằm sát ranh giới với Bretagne."},
 {c:"vie",lv:"A2",q:"Le 2 février, pour la Chandeleur, les Français mangent…",o:["des crêpes","la galette des rois","la bûche de Noël"],a:0,e:"Truyền thống: vừa lật crêpe vừa cầm đồng xu để cầu may."},
 {c:"vie",lv:"A2",q:"En janvier, pour l'Épiphanie, on partage…",o:["la galette des rois","la bûche de Noël","des crêpes"],a:0,e:"Ai được miếng có « fève » sẽ làm vua hoặc hoàng hậu."},
 {c:"vie",lv:"A2",q:"La Fête de la musique a lieu chaque année le…",o:["21 juin","14 juillet","1er janvier"],a:0,e:"Bắt đầu từ năm 1982, nay được tổ chức ở nhiều nước."},
 {c:"vie",lv:"B1",q:"Depuis 2022, qu'est-ce qui est inscrit au patrimoine culturel immatériel de l'UNESCO ?",o:["le savoir-faire et la culture de la baguette","la recette du croissant","le camembert"],a:0,e:"Năm 2010, « repas gastronomique des Français » cũng đã được ghi danh."},
 {c:"vie",lv:"A2",q:"Le Tour de France est une célèbre course…",o:["cycliste","automobile","à pied"],a:0,e:"Tổ chức lần đầu năm 1903, kết thúc truyền thống ở đại lộ Champs-Élysées."},
 {c:"franco",lv:"A2",q:"La Journée internationale de la Francophonie est célébrée le…",o:["20 mars","14 juillet","21 juin"],a:0,e:"Ngày Quốc tế Pháp ngữ."},
 {c:"franco",lv:"A2",q:"Dans quelle province du Canada le français est-il la seule langue officielle ?",o:["le Québec","l'Ontario","la Colombie-Britannique"],a:0,e:"Người Québec có nhiều từ riêng, ví dụ « magasiner » = đi mua sắm."},
 {c:"franco",lv:"A2",q:"Lequel de ces pays n'a PAS le français comme langue officielle ?",o:["le Portugal","la Belgique","la Suisse"],a:0,e:"Bỉ và Thụy Sĩ đều có tiếng Pháp là một trong các ngôn ngữ chính thức."},
 {c:"franco",lv:"A2",q:"Quel monument de Hanoï a été construit à l'époque française, sur le modèle de l'Opéra Garnier ?",o:["l'Opéra de Hanoï","le temple de la Littérature","la pagode au Pilier unique"],a:0,e:"Nhà hát Lớn Hà Nội khánh thành năm 1911."},
 {c:"franco",lv:"A2",q:"Le Việt Nam est-il membre de l'Organisation internationale de la Francophonie ?",o:["oui","non","il a seulement un statut d'observateur"],a:0,e:"Việt Nam là thành viên chính thức; Hà Nội đăng cai Hội nghị Thượng đỉnh Pháp ngữ năm 1997."}
];

/* Culture-themed texts */
CLOZE.push(
 {c:"hist",topic:"pc",lv:"A2",title:"La prise de la Bastille",text:"Le 14 juillet 1789, des milliers de Parisiens [[sont allés|aller]] devant la Bastille, une vieille prison. Ils [[ont attaqué|attaquer]] la forteresse et ils l'[[ont prise|prendre]] en quelques heures. Le gouverneur de la prison [[est mort|mourir]] pendant la journée. Cet événement [[est devenu|devenir]] le symbole de la Révolution. Ensuite, les révolutionnaires [[ont démoli|démolir]] la Bastille pierre par pierre. En 1880, la République [[a choisi|choisir]] le 14 juillet comme fête nationale."},
 {c:"arts",topic:"imp_pc",lv:"A2",title:"Monet à Giverny",text:"En 1883, Claude Monet [[s'est installé|s'installer]] à Giverny, un petit village de Normandie. Sa maison [[avait|avoir]] un grand jardin plein de fleurs. Chaque matin, le peintre [[se levait|se lever]] très tôt pour observer la lumière. Il [[aimait|aimer]] surtout son bassin aux nymphéas. Un jour, il [[a décidé|décider]] de construire un pont japonais au-dessus de l'eau. Pendant plus de vingt ans, il [[a peint|peindre]] ses célèbres Nymphéas. Aujourd'hui, des milliers de touristes [[visitent|visiter]] sa maison chaque année."},
 {c:"paris",topic:"passif",lv:"B2",title:"L'histoire de la tour Eiffel",text:"La tour Eiffel [[a été construite|construire, passé composé passif]] pour l'Exposition universelle de 1889. Au début, elle [[a été critiquée|critiquer, passé composé passif]] par de nombreux artistes, qui la trouvaient laide. Elle ne devait rester que vingt ans, mais elle [[a été sauvée|sauver, passé composé passif]] grâce à son utilité pour la radio. Aujourd'hui, elle [[est visitée|visiter, présent passif]] par des millions de touristes chaque année, et elle [[est repeinte|repeindre, présent passif]] environ tous les sept ans."}
);
READ.push(
 {c:"paris",lv:"A1",title:"Bienvenue à Paris",text:"Paris est la capitale de la France. La Seine traverse la ville. Au centre, il y a la cathédrale Notre-Dame, sur l'île de la Cité. Le musée du Louvre est très grand : on y voit la Joconde. La tour Eiffel mesure 330 mètres. Le soir, elle brille pendant cinq minutes toutes les heures.\nPour se déplacer, les Parisiens prennent le métro ou le vélo. Il y a aussi beaucoup de cafés avec des terrasses.",qs:[
  {k:"mc",s:"Quel fleuve traverse Paris ?",o:["la Seine","la Loire","le Rhône"],a:0},
  {k:"tf",s:"La Joconde est au musée du Louvre.",a:true,j:"Le musée du Louvre est très grand : on y voit la Joconde."},
  {k:"open",s:"Où se trouve Notre-Dame ?",a:["Sur l'île de la Cité.","Au centre, sur l'île de la Cité."]},
  {k:"tf",s:"Les Parisiens se déplacent seulement en voiture.",a:false,j:"les Parisiens prennent le métro ou le vélo"},
  {k:"open",s:"Combien mesure la tour Eiffel ?",a:["330 mètres.","Elle mesure 330 mètres."]}
 ]},
 {c:"hist",lv:"A2",title:"Le 14 juillet",text:"Le 14 juillet est la fête nationale française. Ce jour-là, les Français se souviennent de la prise de la Bastille, une prison de Paris, le 14 juillet 1789. C'est le début de la Révolution française.\nAujourd'hui, la journée commence par un grand défilé militaire sur l'avenue des Champs-Élysées, à Paris. Beaucoup de gens le regardent à la télévision. Dans toutes les villes, il y a des bals populaires : on danse dans la rue. Le soir, on admire les feux d'artifice. À Paris, le plus célèbre est tiré près de la tour Eiffel. C'est un jour férié : la plupart des Français ne travaillent pas.",qs:[
  {k:"mc",s:"Que fête-t-on le 14 juillet ?",o:["la prise de la Bastille en 1789","la fin de la Seconde Guerre mondiale","la naissance de Napoléon"],a:0},
  {k:"tf",s:"La Bastille était un château royal.",a:false,j:"une prison de Paris"},
  {k:"open",s:"Où a lieu le grand défilé militaire ?",a:["Sur l'avenue des Champs-Élysées, à Paris.","Sur les Champs-Élysées."]},
  {k:"tf",s:"Le 14 juillet, la plupart des Français travaillent.",a:false,j:"C'est un jour férié : la plupart des Français ne travaillent pas."},
  {k:"open",s:"Que fait-on le soir ?",a:["On admire les feux d'artifice.","Les feux d'artifice."]}
 ]},
 {c:"arts",lv:"B1",title:"Les impressionnistes, ces peintres qui ont choqué Paris",text:"En 1874, un groupe de jeunes peintres organise une exposition à Paris, en dehors du Salon officiel. Parmi eux : Claude Monet, Auguste Renoir, Edgar Degas ou encore Berthe Morisot. Un critique se moque d'un tableau de Monet intitulé « Impression, soleil levant » et appelle ces artistes les « impressionnistes ». Le nom, d'abord ironique, est resté.\nQu'est-ce qui choquait le public ? Ces peintres ne cherchaient pas à reproduire la réalité avec précision. Ils voulaient saisir une impression : la lumière qui change, le mouvement de l'eau, l'atmosphère d'une gare ou d'un café. Ils travaillaient souvent en plein air, avec des touches de couleur rapides et visibles.\nLongtemps critiqués, les impressionnistes comptent aujourd'hui parmi les peintres les plus admirés au monde. À Paris, le musée d'Orsay, installé dans une ancienne gare, possède l'une des plus grandes collections de leurs œuvres.",qs:[
  {k:"mc",s:"Ce texte présente surtout…",o:["l'histoire d'un mouvement artistique","la vie privée de Claude Monet","l'architecture des gares parisiennes"],a:0},
  {k:"tf",s:"Au début, le mot « impressionnistes » était un compliment.",a:false,j:"Le nom, d'abord ironique, est resté."},
  {k:"open",s:"Que voulaient représenter ces peintres ?",a:["Une impression : la lumière qui change, le mouvement de l'eau, l'atmosphère d'un lieu.","La lumière qui change."]},
  {k:"tf",s:"Les impressionnistes peignaient souvent à l'extérieur.",a:true,j:"Ils travaillaient souvent en plein air"},
  {k:"mc",s:"Où peut-on voir beaucoup d'œuvres impressionnistes à Paris ?",o:["au musée d'Orsay","au château de Versailles","à l'Opéra Garnier"],a:0}
 ]},
 {c:"franco",lv:"B2",title:"La francophonie, une langue en partage",text:"On associe spontanément le français à la France. Pourtant, la majorité de ceux qui le parlent aujourd'hui vivent ailleurs, notamment en Afrique, où la population francophone ne cesse d'augmenter. De Montréal à Dakar, de Bruxelles à Beyrouth, le français s'est enrichi d'accents, de mots et d'expressions qui reflètent la diversité de ses locuteurs : un Québécois « magasine » quand un Parisien « fait du shopping », et un Belge dit « septante » là où un Français dit « soixante-dix ».\nNée en 1970, l'Organisation internationale de la Francophonie réunit aujourd'hui des dizaines d'États et de gouvernements, parmi lesquels le Việt Nam. Elle ne se limite pas à la défense de la langue : elle promeut aussi l'éducation, la diversité culturelle et la démocratie.\nReste une question que se posent de nombreux linguistes : le centre de gravité de la langue française est-il en train de se déplacer de Paris vers l'Afrique ? Si les projections démographiques se confirment, l'avenir du français se jouera, en grande partie, hors d'Europe.",qs:[
  {k:"mc",s:"Selon le texte, où vit la majorité des francophones ?",o:["hors de France","en France","au Québec"],a:0},
  {k:"tf",s:"Le français est identique dans tous les pays francophones.",a:false,j:"le français s'est enrichi d'accents, de mots et d'expressions"},
  {k:"open",s:"Comment dit-on « soixante-dix » en Belgique ?",a:["Septante."]},
  {k:"tf",s:"L'OIF s'occupe uniquement de la langue française.",a:false,j:"Elle ne se limite pas à la défense de la langue"},
  {k:"mc",s:"Quelle est l'idée de la dernière partie ?",o:["l'avenir du français pourrait se jouer en Afrique","le français va bientôt disparaître","Paris restera toujours le centre de la langue"],a:0},
  {k:"open",s:"Quels domaines l'OIF promeut-elle, en plus de la langue ?",a:["L'éducation, la diversité culturelle et la démocratie."]}
 ]}
);
