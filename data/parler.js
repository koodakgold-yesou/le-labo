/* Parler: free-speaking prompts in the DELF oral format (original prompts).
   A2: entretien dirigé, monologue suivi, exercice en interaction. B1: monologue + point de vue. B2 uses B2_ORAL documents. */
const PARLER_FREE={
 A2:{
  entretien:{t:"Entretien dirigé",time:"khoảng 1 phút 30",prep:0,vn:"Giới thiệu bản thân, không chuẩn bị",
   items:["Présentez-vous : votre nom, votre âge, votre ville, votre famille.","Parlez de votre journée habituelle : le matin, l'après-midi, le soir.","Quels sont vos loisirs ? Que faites-vous le week-end ?","Parlez de vos études ou de votre travail."]},
  monologue:{t:"Monologue suivi",time:"khoảng 2 phút",prep:600,vn:"Nói liên tục về một chủ đề quen thuộc",
   items:["Votre quartier : décrivez-le. Qu'est-ce que vous aimez et qu'est-ce que vous n'aimez pas ? Pourquoi ?","Votre plat préféré : qu'est-ce que c'est ? Qui le prépare ? Quand le mangez-vous ?","Un voyage : racontez votre dernier voyage. Où êtes-vous allé(e) ? Avec qui ? Qu'avez-vous fait ?","Votre téléphone : comment l'utilisez-vous chaque jour ? Pourriez-vous vivre sans téléphone ?","Une fête dans votre pays : décrivez-la. Que fait-on ce jour-là ?","Votre meilleur souvenir d'école : racontez.","Le sport : quel sport aimez-vous ? Où et avec qui le pratiquez-vous ?","Votre logement idéal : décrivez-le et expliquez pourquoi.","Le week-end dernier : racontez ce que vous avez fait.","Une personne importante pour vous : décrivez-la et expliquez pourquoi elle compte."]},
  interaction:{t:"Exercice en interaction",time:"3 đến 4 phút",prep:600,vn:"Đóng vai giải quyết tình huống đời sống",
   items:["Vous êtes en France. Vous voulez louer un vélo pour une semaine. Vous posez des questions au loueur (prix, horaires, casque, caution). Claude joue le loueur.","Vous voulez vous inscrire à un cours de cuisine française. Vous téléphonez pour demander les jours, le prix et le niveau. Claude joue la personne de l'école.","Vous êtes à la pharmacie : vous avez mal à la gorge depuis deux jours. Vous expliquez votre problème et demandez un conseil. Claude joue le pharmacien.","Vous organisez une soirée d'anniversaire avec un ami français. Vous choisissez ensemble le lieu, la date et le repas. Claude joue votre ami.","Vous avez acheté un pantalon trop petit. Vous retournez au magasin pour l'échanger. Claude joue le vendeur.","Vous cherchez une chambre chez l'habitant pour un mois d'études. Vous posez des questions au propriétaire (prix, règles, transports). Claude joue le propriétaire."]}
 },
 B1:{
  monologue:{t:"Monologue suivi",time:"2 đến 3 phút",prep:0,vn:"Kể, mô tả, giải thích lý do",
   items:["Racontez une expérience qui vous a fait changer d'avis sur quelque chose.","Parlez d'un projet important pour vous dans les cinq prochaines années.","Préférez-vous vivre en ville ou à la campagne ? Expliquez avec des exemples.","Décrivez une habitude que vous aimeriez changer et expliquez comment vous allez faire."]},
  pointdevue:{t:"Expression d'un point de vue",time:"5 đến 7 phút",prep:600,vn:"Nêu và bảo vệ ý kiến về một vấn đề",
   items:["Faut-il interdire les voitures dans le centre des grandes villes ? Donnez votre opinion et justifiez-la.","Les jeunes passent-ils trop de temps sur les réseaux sociaux ? Donnez votre avis avec des exemples.","Apprendre une langue étrangère à l'école primaire : bonne ou mauvaise idée ?","Le télétravail est-il une bonne solution pour tout le monde ?"]}
 }
};
