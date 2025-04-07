describe('Sign-in process with correct credentials, redirects to the dashboard, and sees the itinerary from an event in the calendar', () => {
    const baseUrl = 'http://localhost:5173';
    const signInUrl = `${baseUrl}/signin`;
    const email = 'test@mail.com';
    const password = 'passwordtest';
    let agendaLink = '';
    const googleUrl = 'https://www.google.com/calendar/render?action=TEMPLATE&text=';

    it('Attempts to sign in with correct credentials', () => {
        cy.visit(signInUrl);
        cy.get('input[name="email"]').type(email);
        cy.wait(1000);
        cy.get('input[name="password"]').type(password);
        cy.wait(1000);
        cy.get('button[type="submit"]').click();
        cy.get('[data-cy="dashboard-body"]').should('be.visible');
        cy.wait(2000);
        cy.get('[data-cy="event-handler"]').first().click();
        cy.wait(2000);
        cy.get('[data-cy="person"]').click();
        cy.wait(2000);
        cy.get('[data-cy="calendar_add_on"]', { timeout: 4000 }).should('be.visible').then(($link) => {
            agendaLink = $link.attr('href') || '';
            cy.log(agendaLink);
            cy.wait(2000);
            expect(agendaLink).to.include(googleUrl);
        });


    })
})
