/// <reference types="cypress" />

describe('Testes automatizados no site sauce demo', function () {
    beforeEach(function () {
        cy.visit("https://www.saucedemo.com/", { timeout: 60000 }); 
        cy.get('#user-name', { timeout: 30000 }).should('be.visible');
    });

    it('realiza login com sucesso', function () {
        cy.realizarLogin();  
        cy.url().should('include', '/inventory.html');
        cy.get('.inventory_list').should('be.visible');
    });

    it('exibe mensagem de erro ao inserir credenciais inválidas', function () {
        cy.get('#user-name').type('usuario_invalido', { delay: 0 });
        cy.get('#password').type('senha_errada', { delay: 0 });
        cy.get('#login-button').click();
        cy.get('[data-test="error"]').should('be.visible')
            .and('contain', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('verifica a existência do carrinho de compras', function () {
        cy.realizarLogin(); 
        cy.get('.shopping_cart_container').should('be.visible');
    });

    it('adiciona produtos ao carrinho e verifica a contagem', function () {
        cy.realizarLogin();  
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('#add-to-cart-sauce-labs-bike-light').click();
        cy.get('.shopping_cart_badge').should('have.text', '2');
    });

    it('remove produtos do carrinho e verifica a contagem', function () {
        cy.realizarLogin();  
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('#add-to-cart-sauce-labs-bike-light').click();
        cy.get('.shopping_cart_badge').should('have.text', '2');
        cy.get('#remove-sauce-labs-backpack').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');
        cy.get('#remove-sauce-labs-bike-light').click();
        cy.get('.shopping_cart_badge').should('not.exist');
    });
    it('Contar a quantidade de produtos e verificar a sua descrição, preço e nome dos produtos', function () {
        cy.realizarLogin();  
        cy.get('.inventory_item').then((itens) => {
            expect(itens.length).to.eq(6);
            for (let i = 0; i < itens.length; i++) {
                expect(itens[i].querySelector('.inventory_item_desc')).to.be.visible;
                expect(itens[i].querySelector('.inventory_item_name')).to.be.visible;
                expect(itens[i].querySelector('.inventory_item_price')).to.be.visible;
            }
        });
    });
    it('realiza logout com sucesso', function () {
        cy.realizarLogin();  
        cy.get('#react-burger-menu-btn').click();
        cy.get('#logout_sidebar_link').click();
        cy.url().should('contain', 'https://www.saucedemo.com/');
        cy.get('#login-button').should('be.visible'); 
    });
});
