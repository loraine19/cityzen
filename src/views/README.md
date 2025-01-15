Objectif:

Ce dossier contient la logique spécifique à l'interface utilisateur.
Il prépare les données pour l'affichage et gère les interactions de l'utilisateur.

Structure:

GetUserViewModel.ts:
Prépare les données de l'utilisateur pour l'affichage (formatage, calculs, etc.).
Gère les états locaux du composant (chargement, erreurs).
Autres ViewModels:
Préparent les données pour les autres vues.
Exemple de code (GetUserViewModel.ts):

TypeScript

import { User } from '../domain/entities/User';

export interface UserViewModel {
id: string;
name: string;
// ... autres propriétés formatées
}

export const mapUserToViewModel = (user: User): UserViewModel => ({
// ... mapping des propriétés
});
Utilisation:

Les ViewModels sont utilisés dans vos composants de présentation (React, Vue, Angular, etc.).
Résumé
