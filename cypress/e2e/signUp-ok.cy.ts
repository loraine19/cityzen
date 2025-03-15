describe('SignUp process with mail activation', () => {
  const baseUrl = 'http://localhost:5173';
  const signUp = `${baseUrl}/signup`;
  const email = 'collectif_tester@imagindev.com';
  const password = 'passwordtest';
  const mailUrl = 'http://localhost:8085'
  const waitedMailSubject = 'Activation de votre compte Collectif';
  const authBackUrl = `http://localhost:3000/api/auth`;
  let activationLink = '';

  it('Delete test user before test', () => {
    cy.request('DELETE', `${authBackUrl}/tester`).then((response) => {
      expect([200, 404]).to.include(response.status)
    })
  })

  it('Attempts to sign up with new credentials', () => {
    cy.visit(signUp)

    // Fill in the sign-up form with incorrect credentials
    cy.get('[data-cy="email-input"]').type(email);
    cy.get('[data-cy="password-input"]').type(password);
    cy.get('[data-cy="password-confirm-input"]').type(password);
    cy.get('[data-cy="terms-checkbox"]').check();
    cy.get('[data-cy="submit-button"]').click()
    cy.get('[data-cy="notif-text"]').contains('lien envoyé par email').should('be.visible');
  })

  it('Check the email and get the activation link', () => {
    cy.visit(mailUrl);
    cy.get('input[name="_user"]').type(email);
    cy.get('input[name="_pass"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '_task=mail&_mbox=INBOX');
    cy.contains(waitedMailSubject).click();
    cy.wait(8000);
    cy.get('iframe[name="messagecontframe"]').then(($iframe) => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body).find('a#v1activation-link', { timeout: 8000 }).should('be.visible').then(($link) => {
        activationLink = $link.attr('href');
      })
    });
    cy.get('a.logout').click();

  })


  it('Visits the activation link, completes the sign-up process', () => {
    cy.origin('http://localhost:5173', { args: { activationLink } }, ({ activationLink }) => {
      cy.visit(activationLink);
    });

    cy.origin('http://localhost:5173', { args: { email, password } }, ({ email, password }) => {
      cy.url().should('include', '/signin');
      cy.contains('vous pouvez maintenant vous connecter').should('be.visible');

      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);

      // Submit the form
      cy.get('button[type="submit"]').click()

      // Verify that the sign-in completed
      cy.url().should('include', '/profile/create')
    });
  })

})
