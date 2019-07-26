import '../support/global-e2e';
describe('Hello Nx', () => {
  it('Visits the Kitchen Sink', function() {
    // const chance = new Chance();
    const email = chance.email();
    const pass = 'ValidPassword23';
    cy.visit('#/form/template1');
    //  cy.get('#text').type(email).should('have.value', 'my first');
    cy.get('#text').type(email);
    cy.get('#undefined').type(chance.paragraph());
  });
});
