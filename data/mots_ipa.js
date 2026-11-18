/* IPA (standard French) for the Mot du jour words. */
const MOTS_IPA={
"salaire":"sa.lɛʁ","travail":"tʁa.vaj","copain":"kɔ.pɛ̃","bureau":"by.ʁo","hôpital":"o.pi.tal","avocat":"a.vɔ.ka","chance":"ʃɑ̃s","budget":"byd.ʒɛ","tennis":"te.nis","silhouette":"si.lwɛt",
"poubelle":"pu.bɛl","guillotine":"ɡi.jɔ.tin","boulevard":"bul.vaʁ","rendez-vous":"ʁɑ̃.de.vu","quarantaine":"ka.ʁɑ̃.tɛn","école":"e.kɔl","vacances":"va.kɑ̃s","ordinateur":"ɔʁ.di.na.tœʁ","courriel":"ku.ʁjɛl","baguette":"ba.ɡɛt",
"chef":"ʃɛf","merci":"mɛʁ.si","famille":"fa.mij","dimanche":"di.mɑ̃ʃ","français":"fʁɑ̃.sɛ","café":"ka.fe","tabac":"ta.ba","ticket":"ti.kɛ","sport":"spɔʁ","bibliothèque":"bi.bli.jɔ.tɛk",
"essence":"e.sɑ̃s","ennui":"ɑ̃.nɥi","souvenir":"suv.niʁ","fromage":"fʁɔ.maʒ","pomme de terre":"pɔm.də.tɛʁ","métro":"me.tʁo","liberté":"li.bɛʁ.te","coup":"ku","restaurant":"ʁɛs.tɔ.ʁɑ̃","orange":"ɔ.ʁɑ̃ʒ",
"parlement":"paʁ.lə.mɑ̃","jour":"ʒuʁ","logiciel":"lɔ.ʒi.sjɛl","vin":"vɛ̃","week-end":"wi.kɛnd","croissant":"kʁwa.sɑ̃","bistrot":"bis.tʁo","sabotage":"sa.bɔ.taʒ","mannequin":"man.kɛ̃","août":"u (hoặc ut)","cadeau":"ka.do",
"chandail":"ʃɑ̃.daj","cravate":"kʁa.vat","bougie":"bu.ʒi","jean":"dʒin","limousine":"li.mu.zin","béchamel":"be.ʃa.mɛl","mayonnaise":"ma.jɔ.nɛz","praline":"pʁa.lin","macadam":"ma.ka.dam","nicotine":"ni.kɔ.tin",
"calepin":"kal.pɛ̃","mansarde":"mɑ̃.saʁd","pantalon":"pɑ̃.ta.lɔ̃","tulipe":"ty.lip","abricot":"a.bʁi.ko","algèbre":"al.ʒɛbʁ","chiffre":"ʃifʁ","hasard":"a.zaʁ","sirop":"si.ʁo","magasin":"ma.ɡa.zɛ̃",
"jupe":"ʒyp","matelas":"mat.la","sucre":"sykʁ","redingote":"ʁə.dɛ̃.ɡɔt","paquebot":"pak.bo","bifteck":"bif.tɛk","vasistas":"va.zis.tas","kermesse":"kɛʁ.mɛs","bizarre":"bi.zaʁ","banque":"bɑ̃k",
"caprice":"ka.pʁis","carnaval":"kaʁ.na.val","omnibus":"ɔm.ni.bys","taxi":"tak.si","parachute":"pa.ʁa.ʃyt","pique-nique":"pik.nik","aujourd'hui":"o.ʒuʁ.dɥi","lundi":"lœ̃.di","janvier":"ʒɑ̃.vje","juillet":"ʒɥi.jɛ",
"musique":"my.zik","panique":"pa.nik","salut":"sa.ly","fenêtre":"fə.nɛtʁ","boîte":"bwat","beurre":"bœʁ","chocolat":"ʃɔ.kɔ.la","tomate":"tɔ.mat","ananas":"a.na.nas","courage":"ku.ʁaʒ",
"déjà-vu":"de.ʒa.vy","cliché":"kli.ʃe","menu":"mə.ny","cahier":"ka.je","crayon":"kʁɛ.jɔ̃","pissenlit":"pi.sɑ̃.li","chef-d'œuvre":"ʃɛ.dœvʁ","jardin":"ʒaʁ.dɛ̃","guerre":"ɡɛʁ","bleu":"blø",
"foie":"fwa","tête":"tɛt","manger":"mɑ̃.ʒe","loisir":"lwa.ziʁ","baccalauréat":"ba.ka.lɔ.ʁe.a","lycée":"li.se","malade":"ma.lad","Noël":"nɔ.ɛl","fête":"fɛt","épice":"e.pis"
};
/* Small pronunciation tips for words that often trip learners up. */
const MOTS_TIP={
"ennui":"« en » đọc thành âm mũi /ɑ̃/, rồi « nui » lướt nhanh như « nuy ».","août":"Phần lớn người Pháp đọc /u/ (như « u »), một số đọc /ut/. Chữ a không đọc.","week-end":"Đọc theo kiểu Anh nhưng nhấn âm cuối: /wi.kɛnd/.","mannequin":"« man » ở đây không phải âm mũi: /man/, rồi « quin » là /kɛ̃/.","pomme de terre":"« de » thường nuốt nhẹ: /pɔm.də.tɛʁ/ hoặc /pɔmd.tɛʁ/.",
"chef-d'œuvre":"Chữ f không đọc: /ʃɛ.dœvʁ/.","jean":"Đọc kiểu Anh /dʒin/, khác hẳn tên riêng Jean /ʒɑ̃/.","ananas":"Chữ s cuối thường được đọc: /a.na.nas/.","vasistas":"Cả hai chữ s cuối âm tiết đều đọc: /va.zis.tas/.","omnibus":"s cuối được đọc: /ɔm.ni.bys/.",
"hasard":"h câm, không nối âm với từ trước: le hasard /lə.a.zaʁ/.","fenêtre":"« e » đầu là âm « ơ » nhẹ /ə/, có thể nuốt: /fnɛtʁ/.","aujourd'hui":"« hui » đọc /ɥi/, lướt nhanh, không tách thành « hu-i ».","juillet":"« jui » đọc /ʒɥi/, « llet » là /jɛ/.","bifteck":"ck cuối đọc /k/: /bif.tɛk/.",
"cahier":"Chữ h câm: /ka.je/.","crayon":"« ay » đọc /ɛj/: /kʁɛ.jɔ̃/.","menu":"« me » là âm « ơ » /ə/, không đọc « mê ».","Noël":"Dấu ë: o và e đọc tách rời /nɔ.ɛl/.","lundi":"« un » là âm mũi /œ̃/, nhiều người Pháp đọc thành /ɛ̃/."
};
MOTS.forEach(m=>{if(MOTS_IPA[m.w])m.ipa=MOTS_IPA[m.w];if(MOTS_TIP[m.w])m.ptip=MOTS_TIP[m.w];});
