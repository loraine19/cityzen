/// <reference types="cypress" />
describe('Sign-in process with correct credentials, redirects to the dashboard, and see events page and select sport events', () => {
    const baseUrl = 'http://localhost:5173';
    const signInUrl = `${baseUrl}/signin`;
    const email = 'test@mail.com';
    const password = 'passwordtest';

    it('Attempts to sign in with correct credentials', () => {
        cy.visit(signInUrl);
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();
        cy.get('[data-cy="dashboard-body"]').should('be.visible');
        cy.wait(4000);
        cy.get('[data-cy="event"]').click();
        cy.wait(3000);
        cy.get('[data-cy="tous"]').click();
        cy.wait(3000);
        cy.get('[data-cy="sport"]').click();
        cy.wait(3000);
        cy.get('[data-cy="chip-sport"]').should('be.visible')
        cy.log('The filter is valid');
        cy.wait(5000);
        // cy.get('[data-cy="arrow_circle_right"]').first().click();
        // cy.wait(3000);
        // cy.get('[data-cy="event-details-page"]').should('be.visible');
        // cy.wait(3000);
        // cy.get('[data-cy="btn-participate"]').should('exist').scrollIntoView();
        // cy.get('[data-cy="btn-participate"]').click();
        // cy.wait(2000);
        // cy.get('[data-cy="avatar-Testeur"]').should('be.visible');
        // cy.wait(2000);

    })
})
