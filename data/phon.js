/* Phonétique: French sound inventory, spelling→sound table, reading rules, minimal pairs (original). */
const PHON_SOUNDS=[
 /* oral vowels */
 {g:"v",ipa:"i",sp:["i","î","y"],ex:["lit","stylo","île"],vn:"Như « i » tiếng Việt, môi kéo căng.",en:"Gần « see » nhưng ngắn, không lướt."},
 {g:"v",ipa:"e",sp:["é","-er","-ez","et"],ex:["été","parler","nez"],vn:"Như « ê ». Môi hơi kéo, miệng khép.",en:"Không lướt thành « ei » như « day »."},
 {g:"v",ipa:"ɛ",sp:["è","ê","ai","ei","-et"],ex:["mère","fête","lait"],vn:"Như « e » tiếng Việt, miệng mở hơn « ê ».",en:"Gần « bed »."},
 {g:"v",ipa:"a",sp:["a","à","â"],ex:["papa","là","pâte"],vn:"Như « a ».",en:"Gần « father » nhưng ngắn."},
 {g:"v",ipa:"ɔ",sp:["o (trước phụ âm)"],ex:["porte","bol","école"],vn:"Như « o » tiếng Việt, miệng mở.",en:"Gần « thought » (Anh-Anh)."},
 {g:"v",ipa:"o",sp:["ô","au","eau","o (cuối từ)"],ex:["beau","auto","vélo"],vn:"Như « ô », môi tròn, không đổi khẩu hình.",en:"Không lướt thành « ou » như « go »."},
 {g:"v",ipa:"u",sp:["ou","où","oû"],ex:["vous","rouge","goût"],vn:"Như « u » tiếng Việt.",en:"Gần « food »."},
 {g:"v",ipa:"y",sp:["u","û"],ex:["tu","rue","sûr"],vn:"Không có trong tiếng Việt: giữ lưỡi như « i », rồi chu tròn môi như « u ».",en:"Không có trong tiếng Anh; đừng đọc « tu » thành « too »."},
 {g:"v",ipa:"ø",sp:["eu","œu (âm tiết mở)"],ex:["deux","peu","bleu"],vn:"Như « ơ » nhưng chu tròn môi, miệng khép.",en:"Không có trong tiếng Anh."},
 {g:"v",ipa:"œ",sp:["eu","œu (+ phụ âm)"],ex:["peur","sœur","fleur"],vn:"Như « ơ » tròn môi, miệng mở hơn /ø/.",en:"Gần « bird » nhưng tròn môi."},
 {g:"v",ipa:"ə",sp:["e (cuối âm tiết)"],ex:["le","petit","demain"],vn:"« ơ » nhẹ và ngắn; thường bị nuốt khi nói nhanh.",en:"Gần nguyên âm yếu trong « about »."},
 /* nasal vowels */
 {g:"n",ipa:"ɑ̃",sp:["an","am","en","em"],ex:["enfant","chambre","temps"],vn:"Gần « ăng » nhưng không đóng âm « ng »: hơi thoát qua mũi.",en:"Không đọc chữ n như « can »."},
 {g:"n",ipa:"ɔ̃",sp:["on","om"],ex:["bon","nom","maison"],vn:"Gần « ông » nhưng không đóng « ng », môi tròn.",en:"Không đọc « on » như tiếng Anh."},
 {g:"n",ipa:"ɛ̃",sp:["in","im","ain","ein","yn","un*"],ex:["vin","pain","plein"],vn:"Gần « eng » mở miệng, hơi qua mũi.",en:"Không đọc « in » như tiếng Anh."},
 {g:"n",ipa:"œ̃",sp:["un","um"],ex:["un","parfum","lundi"],vn:"Như /ɛ̃/ nhưng tròn môi. Nhiều người Paris đọc giống hệt /ɛ̃/.",en:"Không có trong tiếng Anh."},
 /* semi-vowels */
 {g:"s",ipa:"j",sp:["i + nguyên âm","y","ill","-il"],ex:["pied","fille","travail"],vn:"Như « i » lướt: pied ≈ « piê ».",en:"Như « y » trong « yes »."},
 {g:"s",ipa:"w",sp:["ou + nguyên âm","oi"],ex:["oui","moi","toi"],vn:"Như « oa » trong « hoa »: moi ≈ « moa ».",en:"Như « w » trong « we »."},
 {g:"s",ipa:"ɥ",sp:["u + nguyên âm"],ex:["lui","nuit","huit"],vn:"Như « uy » lướt: huit ≈ « uyt ».",en:"Không có trong tiếng Anh."},
 /* consonants */
 {g:"c",ipa:"p",sp:["p"],ex:["papa","pomme"],vn:"Như « p » không bật hơi.",en:"Khác « pin »: không bật hơi."},
 {g:"c",ipa:"b",sp:["b"],ex:["bon","robe"],vn:"Như « b ».",en:"Như tiếng Anh."},
 {g:"c",ipa:"t",sp:["t","th"],ex:["table","thé"],vn:"Như « t » tiếng Việt (không phải « th »).",en:"Không bật hơi như « top »; « th » đọc là t."},
 {g:"c",ipa:"d",sp:["d"],ex:["dans","rideau"],vn:"Như « đ ».",en:"Như tiếng Anh."},
 {g:"c",ipa:"k",sp:["c (+a,o,u)","qu","k"],ex:["café","qui","kilo"],vn:"Như « c / k » tiếng Việt, không bật hơi.",en:"Không bật hơi như « cat »."},
 {g:"c",ipa:"g",sp:["g (+a,o,u)","gu (+e,i)"],ex:["gare","guide"],vn:"« g » cứng, tắc (khác « g » xát của tiếng Việt).",en:"Như « go »."},
 {g:"c",ipa:"f",sp:["f","ph"],ex:["photo","café"],vn:"Như « ph ».",en:"Như tiếng Anh."},
 {g:"c",ipa:"v",sp:["v","w (ít)"],ex:["vous","wagon"],vn:"Như « v ».",en:"Như tiếng Anh."},
 {g:"c",ipa:"s",sp:["s","ss","c (+e,i)","ç","-tion"],ex:["sac","ça","nation"],vn:"Như « x » tiếng Việt.",en:"« -tion » đọc [sjɔ̃], không phải « shun »."},
 {g:"c",ipa:"z",sp:["z","s (giữa 2 nguyên âm)"],ex:["zéro","rose","maison"],vn:"Như « d / gi » giọng Hà Nội.",en:"Như « zoo »."},
 {g:"c",ipa:"ʃ",sp:["ch","sh"],ex:["chat","chercher"],vn:"Như « s » uốn lưỡi, môi chu.",en:"Như « sh »; « ch » không đọc như « church »."},
 {g:"c",ipa:"ʒ",sp:["j","g (+e,i)","ge (+a,o)"],ex:["jour","rouge","mangeons"],vn:"Như /ʃ/ nhưng rung dây thanh.",en:"Như « s » trong « measure »; « j » không đọc như « jam »."},
 {g:"c",ipa:"m",sp:["m"],ex:["maman","pomme"],vn:"Như « m ».",en:"Như tiếng Anh."},
 {g:"c",ipa:"n",sp:["n"],ex:["non","année"],vn:"Như « n ».",en:"Như tiếng Anh."},
 {g:"c",ipa:"ɲ",sp:["gn"],ex:["montagne","Espagne"],vn:"Như « nh » tiếng Việt: montagne ≈ « mông-ta-nhơ ».",en:"Gần « ny » trong « canyon »."},
 {g:"c",ipa:"l",sp:["l","ll"],ex:["lune","belle"],vn:"Như « l », kể cả ở cuối từ.",en:"Không phải « l » tối như « ball »."},
 {g:"c",ipa:"ʁ",sp:["r","rr"],ex:["rouge","Paris","merci"],vn:"Xát ở cuống họng, gần « g » xát trong « ga » nhưng lùi sâu hơn.",en:"Khác hẳn « r » tiếng Anh: không cong lưỡi."}
];
const PHON_GROUPS={v:"Nguyên âm miệng",n:"Nguyên âm mũi",s:"Bán nguyên âm",c:"Phụ âm"};

/* Spelling → sound: the "ghép âm" table for French */
const PHON_SPELL=[
 ["ou","u","vous, bonjour, où"],["oi","wa","moi, voiture, trois"],["au / eau","o","auto, beau, gâteau"],["ai / ei","ɛ","lait, neige, maison"],
 ["eu / œu","ø / œ","deux, sœur, fleur"],["é / -er / -ez","e","été, aller, chez"],["è / ê","ɛ","père, tête, forêt"],["u","y","tu, rue, musique"],
 ["an / en / am / em","ɑ̃","manger, enfant, ensemble"],["on / om","ɔ̃","bonjour, nombre, mon"],["in / ain / ein / im","ɛ̃","vin, main, peinture"],["un / um","œ̃ (≈ ɛ̃)","un, brun, parfum"],
 ["ien","jɛ̃","bien, rien, italien"],["oin","wɛ̃","loin, coin, besoin"],["ill / -il","j","fille, travail, soleil"],["gn","ɲ","montagne, champagne"],
 ["ch","ʃ","chat, chocolat, riche"],["ph","f","photo, pharmacie"],["qu","k","qui, quand, quatre"],["th","t","thé, théâtre"],
 ["c + a, o, u","k","café, comme, cuisine"],["c + e, i / ç","s","ce, ici, garçon"],["g + a, o, u","g","gare, gomme, aigu"],["g + e, i","ʒ","âge, girafe, manger"],
 ["gu + e, i","g","guerre, guide"],["s giữa 2 nguyên âm","z","rose, maison, poison"],["-tion","sjɔ̃","nation, attention"],["h","(câm)","homme, hôtel, thé"]
];

const PHON_RULES=[
 {t:"Chữ cuối thường câm",p:["Phụ âm cuối từ thường không đọc: petit, grand, trop, vous, ils parlent (-ent câm ở động từ).","Mẹo CaReFuL: c, r, f, l ở cuối từ thường được đọc: avec, bonjour, neuf, avril. Ngoại lệ: -er của động từ (parler) đọc là [e].","Chữ e cuối từ không đọc nhưng làm phụ âm trước nó được đọc: petit [pəti] / petite [pətit]."],ex:"grand [gʁɑ̃] · grande [gʁɑ̃d]"},
 {t:"Liaison (nối âm)",p:["Phụ âm cuối vốn câm được đọc khi từ sau bắt đầu bằng nguyên âm hoặc h câm: les‿amis [lezami].","Bắt buộc: mạo từ / tính từ sở hữu + danh từ (les‿enfants), đại từ + động từ (nous‿avons), sau từ một âm tiết (très‿important, en‿avance).","Cấm: sau « et » (et / un), trước h bật (les / héros), sau danh từ số ít.","s, x → [z]; d → [t]: un grand‿homme [œ̃gʁɑ̃tɔm]."],ex:"vous‿êtes [vuzɛt] · deux‿ans [døzɑ̃]"},
 {t:"Enchaînement (nối phụ âm)",p:["Phụ âm cuối vốn được đọc sẽ nối sang nguyên âm của từ sau: elle‿a [ɛla], avec‿elle [avɛkɛl].","Tiếng Pháp nghe như một chuỗi liền theo nhóm ý, không ngắt từng từ: đây là lý do người mới học thấy khó nghe."],ex:"une‿amie [ynami]"},
 {t:"E câm (e muet)",p:["Chữ e không dấu thường bị nuốt trong văn nói: samedi [samdi], je ne sais pas [ʒənsɛpa] → [ʃɛpa] (rất thân mật).","Giữ e khi bỏ đi sẽ có ba phụ âm liền nhau: vendredi [vɑ̃dʁədi]."],ex:"petit [pti] (nói nhanh)"},
 {t:"Trọng âm và ngữ điệu",p:["Trọng âm rơi vào âm tiết CUỐI của nhóm ý (không phải của từng từ như tiếng Anh): Je voudrais un ca-FÉ.","Câu hỏi có/không: lên giọng ở cuối (Tu viens ?). Câu khẳng định và câu hỏi có từ để hỏi thường xuống giọng.","Tiếng Pháp không có thanh điệu như tiếng Việt: đừng « hỏi / ngã » theo thói quen."],ex:"C'est une bonne i-DÉE."},
 {t:"H câm và h bật",p:["Chữ h không bao giờ đọc thành âm.","H câm: vẫn nối và lược âm như nguyên âm: l'homme, les‿hôtels.","H bật (h aspiré): không nối, không lược: le héros, les / haricots. Từ điển đánh dấu * hoặc ' trước từ."],ex:"l'hôtel · le haricot"}
];

/* Minimal pairs: [ipa1, ipa2, [[word1, word2], ...], tip] */
const PHON_PAIRS=[
 ["y","u",[["tu","tout"],["rue","roue"],["dessus","dessous"],["vu","vous"],["pur","pour"]],"/y/ chu môi nhưng lưỡi ở vị trí « i »; /u/ là « u » tiếng Việt."],
 ["e","ɛ",[["été","était"],["fée","fait"],["thé","taie"],["parlé","parlait"]],"Khác nhau giữa passé composé (j'ai parlé) và imparfait (je parlais)."],
 ["ə","e",[["le","les"],["de","des"],["ce","ses"],["je","j'ai"]],"Phân biệt số ít / số nhiều: le livre / les livres."],
 ["ɑ̃","ɔ̃",[["blanc","blond"],["temps","ton"],["sans","son"],["lent","long"]],"/ɔ̃/ tròn môi hơn, lưỡi lùi sau."],
 ["ɛ̃","ɑ̃",[["vin","vent"],["pain","paon"],["main","ment"],["lin","lent"]],"/ɛ̃/ miệng dẹt, /ɑ̃/ miệng mở tròn hơn."],
 ["s","z",[["poisson","poison"],["dessert","désert"],["basse","base"],["ils sont","ils ont"]],"« ils sont » (họ là) khác « ils‿ont » (họ có)."],
 ["ʃ","ʒ",[["chou","joue"],["cache","cage"],["bouche","bouge"],["chant","gens"]],"/ʒ/ có rung dây thanh: đặt tay lên cổ để cảm nhận."],
 ["ø","e",[["deux","des"],["ceux","ces"],["feu","fée"],["jeu","j'ai"]],"/ø/ tròn môi, /e/ môi kéo dẹt."]
];
