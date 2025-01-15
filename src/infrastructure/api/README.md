README.md (dossier infrastructure/api)
Objectif:

Ce dossier contient les modules responsables de l'interaction avec les API externes. Il définit les clients HTTP et les méthodes pour effectuer des requêtes vers ces API.

Structure:

UserApi.ts:
Défini les méthodes pour interagir avec l'API des utilisateurs (créer, lire, mettre à jour, supprimer).
Utilise un client HTTP pour effectuer les requêtes.
Gère les erreurs potentielles (réponses 4xx, 5xx, etc.).
GlobalUserApi.ts:
(Si applicable) Défini des méthodes spécifiques pour interagir avec une API globale liée aux utilisateurs (par exemple, une API d'authentification).
Exemple de code (UserApi.ts):

TypeScript

import axios from 'axios';

export class UserApi {
async getUserById(userId: string): Promise<User> {
const response = await axios.get(`/users/${userId}`);
return response.data;
}

// ... autres méthodes
}
Utilisation:

Les classes de ce dossier sont utilisées par les repositories pour effectuer les requêtes nécessaires à la récupération ou à la modification des données.
Les useCases utilisent les repositories pour interagir avec les données.
Remarques:

Éviter la duplication de code: Regrouper les méthodes communes dans une classe de base ou utiliser des mixins.
Gérer les erreurs: Implémenter une gestion robuste des erreurs pour prévenir les plantages de l'application.
Tester: Écrire des tests unitaires pour vérifier le bon fonctionnement des méthodes.
