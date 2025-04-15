Cypress.Commands.add('realizarLogin', () => {
    cy.get('#user-name').should('be.visible').type('standard_user', { delay: 0 });
    cy.get('#password').should('be.visible').type('secret_sauce', { delay: 0 });
    cy.get('#login-button').should('be.visible').click();
});

