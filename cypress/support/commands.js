Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    const smallText = 'Teste'
    cy.get('#firstName').type('Jv')
    cy.get('#lastName').type('Vitor')
    cy.get('#email').type('joao@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})