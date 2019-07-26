import '../../support/global-e2e';
describe('test_name', function () {
   it('registration', function () {
      cy.visit('/#/zcbase/account/registration')
      cy.wait(10000)
      cy.get('#field-individual.national_intnl > .ui-dropdown > .ui-dropdown-trigger').click();
      cy.get('[aria-label="National"] > .ng-tns-c14-1').click();

      



   })



})
