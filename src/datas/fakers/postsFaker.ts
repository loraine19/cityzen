import { post } from "../../types/type"
const postsFaker: post[] = [
  {
    id: 1,
    user_id: 1,
    title: "Mon premier post",
    description: "Voici mon tout premier post sur ce site !",
    category: "blob",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Post-It.jpg",
    created_at: "2023-11-21T16:27:07Z",
    share: ["email"],
    users: []
  },
  {
    id: 2,
    user_id: 2,
    title: "Un article intéressant",
    description: "J'ai trouvé un article très intéressant sur le sujet X.",
    category: "animaux",
    image: "https://create.microsoft.com/_next/image?url=https%3A%2F%2Fdsgrcdnblobprod5u3.azureedge.net%2Fimages%2Fimage-creator-T03_cat.webp&w=1920&q=90",
    created_at: "2023-11-21T16:27:07Z",
    share: ["phone"],
    users: []
  },
  {
    id: 3,
    user_id: 3,
    title: "Partager une recette",
    description: "Voici ma recette de gâteau au chocolat préférée.",
    category: "autres",
    image: "image3.jpg",
    created_at: "2023-11-21T16:27:07Z",
    share: ["email"],
    users: []
  },
  {
    id: 4,
    user_id: 8,
    title: "Un voyage inoubliable",
    description: "J'ai passé de merveilleuses vacances en Italie.",
    category: "perdu-trouvé",
    image: "",
    created_at: "2023-11-21T16:27:07Z",
    share: ["phone"],
    users: [],

  },
  {
    id: 5,
    user_id: 2,
    title: "Un tutoriel utile",
    description: "Voici un tutoriel pour apprendre à utiliser X.",
    category: "autre",
    image: "image5.png",
    created_at: "2023-11-21T16:27:07Z",
    share: ["email"],
    users: []
  },
  {
    id: 6,
    user_id: 4,
    title: "Un livre passionnant",
    description: "J'ai récemment lu un livre fantastique.",
    category: "perdu-trouvé",
    image: "",
    created_at: "2023-11-21T16:27:07Z",
    share: ["phone"],
    users: []
  },
  {
    id: 7,
    user_id: 3,
    title: "Un film à voir absolument",
    description: "Ce film est un véritable chef-d'œuvre.",
    category: "à vendre",
    image: "image7.jpg",
    created_at: "2024-09-21T16:27:07Z",
    share: ["phone"],
    users: []
  },
  {
    id: 8,
    user_id: 6,
    title: "Une expérience incroyable",
    description: "J'ai vécu une expérience inoubliable.",
    category: "animax",
    image: "image8.png",
    created_at: "2023-01-20T16:27:07Z",
    share: ["phone"],
    users: []
  },
  {
    id: 9,
    user_id: 6,
    title: "Un conseil utile",
    description: "Voici un conseil pour vous aider dans votre quotidien.",
    category: "blob",
    image: "image9.jpg",
    created_at: "2024-11-21T16:27:07Z",
    share: ["email"],
    users: []
  },
  {
    id: 10,
    user_id: 3,
    title: "Une question à poser",
    description: "J'ai une question à poser à la communauté.",
    category: "animaux",
    image: "image10.png",
    created_at: "2023-12-21T16:27:07Z",
    share: ["phone"],
    users: []
  },
    {
      id: 11,
      user_id: 1,
      title: "Un petite test",
      description: "J'ai une question à poser à la communauté.",
      category: "animaux",
      image: "image10.png",
      created_at: "2023-12-21T16:27:07Z",
      share :["phone"],
      users: []
    }
]



export default postsFaker



