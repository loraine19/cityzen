describe('Application Navigation', () => {
  const baseUrl = 'http://localhost:5173';
  const signInUrl = `${baseUrl}/signin`;
  const incorrectEmail = 'wrong@mail.com';
  const incorrectPassword = 'wrongpassword';
  const errorMessage = 'Erreur';

  it('Visits the home page', () => {
    cy.visit(baseUrl); // Adjust the port if necessary
  });

  it('Attempts to sign in with incorrect credentials', () => {
    cy.visit(signInUrl)

    // Fill in the sign-in form with incorrect credentials
    cy.get('input[name="email"]').type(incorrectEmail);
    cy.get('input[name="password"]').type(incorrectPassword);

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Verify that the sign-in failed
    cy.url().should('include', '/signin')
    cy.contains(errorMessage).should('be.visible')
  });
});