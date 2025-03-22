describe('Sign-in process with incorrect credentials', () => {
  const baseUrl = 'http://localhost:5173';
  const signInUrl = `${baseUrl}/signin`;
  const incorrectEmail = 'wrong@mail.com';
  const incorrectPassword = 'wrongpassword';
  const errorMessage = 'Erreur';

  it('Attempts to sign in with incorrect credentials', () => {
    cy.visit(signInUrl)
    cy.get('input[name="email"]').type(incorrectEmail);
    cy.get('input[name="password"]').type(incorrectPassword);
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/signin')
    cy.contains(errorMessage).should('be.visible')
  });
});