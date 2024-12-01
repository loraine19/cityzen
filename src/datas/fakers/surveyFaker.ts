import { survey, pool, vote } from "../../types/survey";

export const surveyCategoryFaker: string[] = ["sport", "culture", "voyage", "sécurité", "extérieur", "hobbies", "santé", "social", "autre"];


export const votesFaker:vote [] = [
    {
        user_id: 6,
        target_id: 1,
        target: "Sondage",
        opinion: "",
        createdAt: "01/01/2024",
        updatedAt: "01/01/2024"
    },
    {
        user_id: 2,
        target_id: 1,
        target: "Sondage",
        opinion: "",
        createdAt: "01/01/2024",
        updatedAt: "01/01/2024"
    },
    {
        user_id: 4,
        target_id: 2,
        target: "Sondage",
        opinion: "",
        createdAt: "01/01/2024",
        updatedAt: "01/01/2024"
    },
    {
        user_id: 3,
        target_id: 4,
        target: "Sondage",
        opinion: "",
        createdAt: "01/01/2024",
        updatedAt: "01/01/2024"
    },
    {
        user_id: 1,
        target_id: 5,
        target: "Sondage",
        opinion: "",
        createdAt: "01/01/2024",
        updatedAt: "01/01/2024"
    },
    {
        user_id: 5,
        target_id: 1,
        target: "Cagnotte",
        opinion: "",
        createdAt: "01/01/2024",
        updatedAt: "01/01/2024"
    },
    {
        user_id: 1,
        target_id: 1,
        target: "Cagnotte",
        opinion: "",
        createdAt: "01/01/2024",
        updatedAt: "01/01/2024"
    },
    {
        user_id: 3,
        target_id: 2,
        target: "Cagnotte",
        opinion: "",
        createdAt: "01/01/2024",
        updatedAt: "01/01/2024"
    },
    {
        user_id: 1,
        target_id: 0,
        target: "Cagnotte",
        opinion: "Je Donne 10 Points",
        createdAt: "01/01/2024",
        updatedAt: "01/01/2024"
    },
    {
        user_id: 2,
        target_id: 0,
        target: "Cagnotte",
        opinion: "Je Donne 10 Points",
        createdAt: "01/01/2024",
        updatedAt: "01/01/2024"
    },
    {
        user_id: 0,
        target_id: 0,
        target: "Cagnotte",
        opinion: "Je Ne Souhaite Pas Donner de Points",
        createdAt: "01/01/2024",
        updatedAt: "01/01/2024"
    },
    {
        user_id: 3,
        target_id: 0,
        target: "Cagnotte",
        opinion: "Je Donne 10 Points",
        createdAt: "01/01/2024",
        updatedAt: "01/01/2024"
    },
    {
        user_id: 4,
        target_id: 0,
        target: "Cagnotte",
        opinion: "Je Donne 10 Points",
        createdAt: "01/01/2024",
        updatedAt: "01/01/2024"
    }

]

export const surveysFaker:survey [] = [
    {
        id: 0,
        user_id: 4,
        title: "Préférences de Quartier : Aidez-nous à Mieux Vous Connaître !",
        description: "Ce sondage est destiné à mieux comprendre les attentes et les besoins de nos voisins. Que vous soyez nouveau dans le quartier ou habitant de longue date, vos réponses nous aideront à créer des événements et des initiatives qui vous intéressent. Merci de prendre quelques minutes pour répondre !",
        image: "https://images.unsplash.com/photo-1732363905013-a99217ffbdfe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D",
        opinion: ["J'aimerais plus d'événements communautaires (repas de quartier, marchés, etc.)", "Je préfère des initiatives en lien avec l'environnement (espaces verts, recyclage).", "Je souhaiterais plus de services pour les familles (activités pour enfants, garderies, etc.).", "Je suis intéressé(e) par des activités sportives et de bien-être (cours de yoga, foot, etc.)."],
        category: "hobbies",
        createdAt: "11/24/2024",
        updatedAt: "11/24/2024"
    },
    {
        id: 1,
        user_id: 1,
        title: "Comment Améliorer Notre Quartier ? Partagez Votre Avis !",
        description: "Nous souhaitons savoir ce qui vous plaît et ce qui pourrait être amélioré dans notre quartier. Ce sondage est un moyen simple de recueillir vos suggestions, que ce soit pour la sécurité, les espaces publics ou les services. Votre opinion compte, alors n'hésitez pas à nous faire part de vos idées !",
        image: "https://images.unsplash.com/photo-1732466385485-b82de0e28ec5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D",
        opinion: ["Améliorer les espaces verts et les parcs publics.", "Augmenter les mesures de sécurité (éclairage, surveillance, etc.).", "Développer des infrastructures de transport (pistes cyclables, parkings, etc.).", "Offrir plus de services de proximité (commerces, espaces communautaires)."],
        category: "autre",
        createdAt: "11/16/2024",
        updatedAt: "11/16/2024"
    },
    {
        id: 2,
        user_id: 6,
        title: "Votre Avis Sur les Événements de Quartier",
        description: "Participez à notre sondage pour nous dire ce que vous pensez des événements organisés dans notre quartier. Quels types d'activités aimeriez-vous voir à l'avenir ? Ce sondage nous permettra de mieux adapter nos initiatives aux attentes de tous.",
        image: "https://plus.unsplash.com/premium_photo-1696839222568-e8e87deaadc8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQ2fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D",
        opinion: ["J'apprécie les événements organisés et j'aimerais qu'ils soient plus fréquents.", "Je trouve que les événements sont intéressants, mais il faudrait plus de variété.", "Je préfère des événements en extérieur (marchés, concerts, pique-niques).", "J'aimerais plus d'activités centrées sur l'entraide ou la solidarité (réunions, bénévolat)."],
        category: "social",
        createdAt: "11/01/2024",
        updatedAt: "11/01/2024"
    },
    {
        id: 3,
        user_id: 5,
        title: "Aidez-nous à Planifier le Prochain Repas de Quartier",
        description: "Nous préparons un grand repas de quartier et nous avons besoin de vos idées ! Aidez-nous à choisir le thème du repas, les plats à inclure et l'organisation. Votre participation à ce sondage nous permettra de faire de cet événement un véritable succès.",
        image: "https://images.unsplash.com/photo-1422433555807-2559a27433bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVhfGVufDB8fDB8fHww",
        opinion: ["Un repas à thème (ex : cuisine italienne, barbecue, etc.)", "Un buffet partagé où chaque voisin apporte un plat.", "Un événement avec des animations et des jeux pour les enfants.", "Je préfère un repas simple et convivial, sans trop de complexité."],
        category: "social",
        createdAt: "11/22/2024",
        updatedAt: "11/22/2024"
    },
    {
        id: 4,
        user_id: 4,
        title: "Enquête sur la Sécurité du Quartier : Votre Ressenti",
        description: "La sécurité est une priorité dans notre quartier. Ce sondage nous aidera à recueillir vos impressions et à identifier les points à améliorer pour rendre notre environnement plus sûr. Prenez un instant pour partager vos préoccupations ou suggestions.",
        image: "https://images.unsplash.com/photo-1732408079361-84fe202f11a5?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        opinion: ["Je me sens en sécurité dans le quartier, rien à redire.", "J'ai quelques préoccupations, mais rien de majeur (ex : zones mal éclairées).", "Je pense qu'il faudrait renforcer la présence de la police ou de la gendarmerie.", "Des solutions communautaires comme des groupes de voisins vigilants pourraient être utiles."],
        category: "sécurité",
        createdAt: "11/17/2024",
        updatedAt: "11/17/2024"
    }
];

export const poolsFaker:pool [] = [
    {
        id: 0,
        user_id_create: 1,
        user_id_receive: 9,
        title: "Un Sourire pour Tous : Cagnotte Communautaire",
        description: "Une opportunité de montrer que dans notre quartier, on se soutient toujours ! Cette cagnotte est destinée à financer une petite surprise pour l'anniversaire d'un voisin, ou à soutenir un projet de bien-être pour la communauté. Ensemble, faisons grandir notre esprit de solidarité et notre cohésion de voisinage.",  
        createdAt: "11/04/2024",
        updatedAt: "11/04/2024"
    },
    {
        id: 1,
        user_id_create: 2,
        user_id_receive: 5,
        title: "Solidarité de Quartier : Aidons Notre Voisin !",
        description: "Ensemble, nous pouvons faire une grande différence ! Cette cagnotte a pour but de soutenir un voisin qui traverse une période difficile. Que ce soit pour une aide financière, des courses ou des besoins spécifiques, chaque petit geste compte. Faisons preuve de solidarité et de bienveillance. Merci à tous pour votre participation !",
        createdAt: "11/19/2024",
        updatedAt: "11/19/2024"
    },
    {
        id: 2,
        user_id_create: 4,
        user_id_receive: 6,
        title: "Aide d'Urgence Voisinage : Soyons Unis !",
        description: "Un de nos voisins a besoin d'aide face à une situation d'urgence. Cette cagnotte est mise en place pour collecter des fonds rapidement et aider à traverser ce moment difficile. Que vous donniez beaucoup ou peu, chaque contribution est précieuse et montre la force de notre solidarité. Merci de participer !",
        createdAt: "11/21/2024",
        updatedAt: "11/21/2024"
    }
]