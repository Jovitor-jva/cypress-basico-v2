/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal',
            'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Teste da caixa de texto com um texto mais longo, teste, teste, TESTE, Teste Txt()!&!*&!(!*¨@'

        cy.get('#firstName').type('Jv', { delay: 0 })
        cy.get('#lastName').type('Vitor', { delay: 0 })
        cy.get('#email').type('joao@gmail.com', { delay: 0 })
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        //or cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        const smallText = 'Teste'
        cy.get('#firstName').type('Jv', { delay: 0 })
        cy.get('#lastName').type('Vitor', { delay: 0 })
        cy.get('#email').type('joao@gmail,com', { delay: 0 })
        cy.get('#open-text-area').type(smallText)
        cy.contains('button', 'Enviar').click()
        //or cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })

    it('campo telefone continua vázio quando preenchido com um valor não numérico', function () {
        cy.get('#phone').type('abcdefghij').should('have.value', "")
    })
    it('Exibe uma mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido', function () {
        const smallText = 'Teste'
        cy.get('#firstName').type('Jv', { delay: 0 })
        cy.get('#lastName').type('Vitor', { delay: 0 })
        cy.get('#email').type('joao@gmail.com', { delay: 0 })
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(smallText)
        cy.contains('button', 'Enviar').click()
        //or cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')


    })
    it('preenche e limpa os campo: Nome, sobrenome, e-mail e telefone', function () {
        const smallText = 'Teste'

        cy.get('#firstName').type('Jv', { delay: 0 }).should('have.value', 'Jv')
            .clear().should('have.value', "")
        cy.get('#lastName').type('Vitor', { delay: 0 }).should('have.value', 'Vitor')
            .clear().should('have.value', "")
        cy.get('#email').type('joao@gmail.com', { delay: 0 }).should('have.value', 'joao@gmail.com')
            .clear().should('have.value', "")
        cy.get('#phone').type('986851841').should('have.value', '986851841').clear().should('have.value', "")
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type(smallText).should('have.value', smallText)
        cy.contains('button', 'Enviar').click()
        //or cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('exibe a mensagem de erro ao submeter o formulário sem o preenchimento dos campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        //or cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    it('Envia o formulário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')

    })
    it('Seleciona o produto (YouTube) pelo seu texto', function () {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
    it('Seleciona o produto mentoria pelo seu value', function () {
        const valueOfBar = 'mentoria'
        cy.get('#product').select('mentoria').should('have.value', valueOfBar)
    })
    it('Seleciona o produto mentoria pelo seu indice', function () {

        cy.get('#product').select(1).should('have.value', 'blog')
    })
    it('Marca o tipo de atendimento como "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]').check()
            .should('have.value', 'feedback')
    })
    it('Marca o tipo de atendimento', function () {
        cy.get('input[type="radio"]').should('have.length', 3).each(function ($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })

    })
    it('Marca ambos checkbox e depois desmarca o último', function () {
        cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
    })
    it('Selecionando um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]#file-upload').should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')

            })
    })
    it('Selecionando um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]#file-upload').should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
                //drag and drop é para arrastar o arquivo selecionado direto para o input de seleção de arquivo
            })
    })
    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload').should('not.have.value').selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            }
            )
    })
    it('acessa a página da política de privacidade e reomve o target para clicar no link', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    it('acessa a página de política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a').invoke('removeAttr', 'target')
        .click()
        cy.contains('Talking About Testing').should('be.visible')
    })


})

