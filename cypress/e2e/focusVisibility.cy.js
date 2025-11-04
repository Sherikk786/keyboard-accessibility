describe('Focus Visibility - Local Demo', () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/focus-demo.html');
    cy.wait(2000); 
  });

  it('should move focus and show visible outline after pressing Tab', () => {
  
    cy.get('#first-btn').focus(); 
    cy.wait(2000); 


    cy.focused().should('have.prop', 'tagName', 'BUTTON');
    cy.wait(2000); 

    cy.focused().should('have.id', 'first-btn');
    cy.wait(2000); 

   
    cy.realPress('Tab');
    cy.wait(2000); 

  
    cy.focused().should('have.id', 'second-btn').and(($el) => {
      const tagName = $el.prop('tagName');
      expect(tagName).to.be.oneOf(['BUTTON', 'INPUT', 'A'], 'a focusable element');

      const outline = $el.css('outline-style');
      expect(outline).to.not.equal('none');
    });
    cy.wait(2000); 


    cy.focused().then(($el) => {
      cy.log('Focused element:', $el.attr('id'));
    });
    cy.wait(2000); 
  });
});
