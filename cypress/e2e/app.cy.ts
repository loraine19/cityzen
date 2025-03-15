describe('Navigation dans l\'application', () => {
  it('Visite la page d\'accueil', () => {
    cy.visit('http://localhost:5173/'); // Adaptez le port si nécessaire
  });

  it('Effectue une connexion', () => {
    cy.visit('http://localhost:5173/signin'); // Adaptez l'URL si nécessaire

    // Remplir le formulaire de connexion
    cy.get('input[name="email"]').type('test@mail.com');
    cy.get('input[name="password"]').type('passwordtest');

    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();

    // Vérifier que la connexion a réussi
    cy.url().should('include', '/'); // Adaptez l'URL de redirection si nécessaire
    cy.contains('Bienvenue').should('be.visible'); // Adaptez le texte de vérification si nécessaire
  });
});