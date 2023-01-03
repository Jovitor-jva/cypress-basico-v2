beforeEach(function () {
    cy.visit('./src/privacy.html')
})
it.only('acessa a página de política de privacidade removendo o target e então clicando no link', function () {
    cy.contains('Talking About Testing').should('be.visible')

})