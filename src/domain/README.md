Objectif:

Ce dossier définit le cœur de votre application : les concepts métier, les entités et les règles de votre domaine. Il est indépendant de toute technologie spécifique (base de données, framework, etc.).

Structure:

User.ts:
Définit l'entité User avec ses propriétés et méthodes.
Représente un utilisateur dans votre domaine métier.
Autres entités:
Définissent les autres entités de votre domaine (e.g., Product, Order).
Exemple de code (User.ts):

TypeScript

export class User {
id: string;
name: string;
email: string;

constructor(data: Partial<User>) {
Object.assign(this, data);
}
}
Utilisation:

Les entités définies dans ce dossier sont utilisées dans tous les autres niveaux de l'application.
Elles servent de modèle pour les données manipulées par les use cases et les repositories.
