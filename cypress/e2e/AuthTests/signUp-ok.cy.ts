
/// <reference types="cypress" />

describe('SignUp process with mail activation', () => {
  const baseUrl = Cypress.config('baseUrl') as string;
  const signUp = `${baseUrl}/signup`;
  const email = 'testeur_cityzen@imagindev.com';
  const password = 'passwordtest';
  const mailUrl = 'http://localhost:1085'
  const waitedMailSubject = "Activation de votre compte City'Zen";
  const authBackUrl = `http://localhost:3000/api/auth`;
  let activationLink = '';

  it('Delete test user before test', () => {
    cy.request('DELETE', `${authBackUrl}/tester`).then((response) => {
      expect([200, 404]).to.include(response.status)
    })
  })

  it('Attempts to sign up with new credentials', () => {
    cy.visit(signUp)
    cy.get('[data-cy="email-input"]').type(email);
    cy.wait(1000);
    cy.get('[data-cy="password-input"]').type(password);
    cy.wait(1000);
    cy.get('[data-cy="password-confirm-input"]').type(password);
    cy.wait(1000);
    cy.get('[data-cy="terms-checkbox"]').check();
    cy.wait(1000);
    cy.get('[data-cy="submit-button"]').click();
    cy.wait(2500);
    cy.get('[data-cy="notif-text"]').contains('lien envoyé par email').should('be.visible');
  })

  it('Check the email and get the activation link', () => {
    cy.visit(mailUrl);
    cy.get('input[name="_user"]').type(email);
    cy.wait(1000);
    cy.get('input[name="_pass"]').type(password);
    cy.wait(1000);
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.url().should('include', '_task=mail&_mbox=INBOX');
    cy.contains(waitedMailSubject).click();
    cy.wait(2000);
    cy.get('iframe[name="messagecontframe"]').then(($iframe) => {
      cy.wrap($iframe).its('0.contentDocument.body').should('not.be.empty').then(cy.wrap).within(() => {
        cy.get('a#v1activation-link', { timeout: 8000 }).should('be.visible').then(($link) => {
          activationLink = $link.attr('href') as string;
        });
      });
    });
    cy.get('a.logout').click();
    cy.wait(2000);
  })

  it('Visits the activation link, completes the sign-up process', () => {
    cy.origin(baseUrl, { args: { activationLink } }, ({ activationLink }) => {
      cy.visit(activationLink);
    })
    cy.origin(baseUrl, { args: { email, password } }, ({ email, password }) => {
      cy.url().should('include', '/signin');
      cy.contains('vous pouvez maintenant vous connecter').should('be.visible');
      cy.wait(1000);
      cy.get('input[name="email"]').type(email);
      cy.wait(1000);
      cy.get('input[name="password"]').type(password);
      cy.wait(1000);
      cy.get('button[type="submit"]').click()
      cy.wait(8000);
      cy.url().should('include', '/profile/create')
    });
  })

})
