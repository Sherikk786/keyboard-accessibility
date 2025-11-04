describe('Accessibility Test - Skip to Main Content Links', () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/skip-to-main.html', { failOnStatusCode: false });
    cy.wait(2000); 
  });

  it('should have a visible skip link that appears on focus', () => {
    cy.get('.skip-link')
      .should('exist')
      .and('have.attr', 'href', '#main');
    cy.wait(2000); 

    cy.get('.skip-link').focus().should('be.visible');
    cy.wait(2000);
  });

  it('should move focus to #main when skip link is activated', () => {
    cy.get('.skip-link').focus();
    cy.wait(2000); 

    cy.realPress('Enter');
    cy.wait(2000); 

    cy.focused().should('have.id', 'main');
    cy.wait(2000); 
  });

  it('should allow navigation to continue from main content', () => {
    cy.get('.skip-link').focus();
    cy.wait(2000); 

    cy.realPress('Enter');
    cy.wait(2000); 

    cy.focused().should('have.id', 'main');
    cy.wait(2000); 

    cy.realPress('Tab');
    cy.wait(2000); 

    cy.focused().should('have.id', 'footerLink');
    cy.focused().should('contain.text', 'Footer information here');
    cy.wait(2000); 
  });
});
