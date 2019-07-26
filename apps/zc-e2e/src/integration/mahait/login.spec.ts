describe('test_name', function () {
    it('login', function () {

        cy.viewport(1366, 438)

        cy.visit('/#/zcbase/account/login')

        cy.get('#appUserName').type('admin');
        cy.get('#appPassword').type('123123');

        cy.get('#loginBtn').click()

    })

})
