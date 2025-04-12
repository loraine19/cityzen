/// <reference types="cypress" />
describe('Sign-in process with correct credentials, redirects to the dashboard, and see events page and select sport events', () => {
    const baseUrl = 'http://localhost:5173';
    const signInUrl = `${baseUrl}/signin`;
    const email = 'test@mail.com';
    const password = 'passwordtest';

    it('Attempts to sign in with correct credentials', () => {
        cy.visit(signInUrl);
        cy.get('input[name="email"]').type(email);
        cy.wait(1000);
        cy.get('input[name="password"]').type(password);
        cy.wait(1000);
        cy.get('button[type="submit"]').click();
        cy.get('[data-cy="dashboard-body"]').should('be.visible');
        cy.wait(2000);
        cy.get('[data-cy="partner_exchange"]').click();
        cy.wait(1000);
        cy.get('[data-cy="input-search"]').clear();
        cy.get('[data-cy="input-search"]').type('loraine');
        cy.wait(1000);
        cy.get('[data-cy="btn-search"]').click();
        cy.wait(1000);
        cy.get('[data-cy="big-avatar-Loraine"]').should('be.visible');
        cy.get('[data-cy="arrow_circle_right"]').first().click();
        cy.get('[data-cy="body-details-service"]').should('be.visible');

    })
})
