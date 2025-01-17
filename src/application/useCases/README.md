Objectif:

Ce dossier contient la logique métier de votre application. Un use case représente une action que l'utilisateur peut effectuer (e.g., obtenir un utilisateur, créer un produit).

Structure:

GetUserUseCase.ts:
Définit la logique pour récupérer un utilisateur.
Utilise le UserRepository pour accéder aux données.
Autres use cases:
Définissent les autres actions possibles.
Exemple de code (GetUserUseCase.ts):

TypeScript

import { UserRepository } from '../domain/repositories/UserRepository';
import { User } from '../domain/entities/User';

export class GetUserUseCase {
constructor(private userRepository: UserRepository) {}

async execute(userId: string): Promise<User> {
return await this.userRepository.getUserById(userId);
}
}
Utilisation:

Les use cases sont appelés par les ViewModels pour exécuter des actions en réponse aux interactions de l'utilisateur.
