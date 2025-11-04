describe('Accessibility Test - Dynamic Content (Popups & Alerts)', () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/dynamic-content.html', { failOnStatusCode: false });
    cy.wait(2000);
  });

  it('should open modal and display alert message', () => {
    cy.get('#openModal').click();
    cy.wait(2000); 

    cy.get('#myModal').should('have.class', 'active');
    cy.wait(2000); 

    cy.get('#alertBox').should('contain.text', 'Popup opened successfully!');
    cy.wait(2000); 
  });

  it('should trap focus inside modal', () => {
    cy.get('#openModal').click();
    cy.wait(2000); 

    cy.focused().should('have.id', 'closeModal');
    cy.wait(2000); 

    cy.realPress('Tab');
    cy.wait(2000); 

    cy.focused().should('have.id', 'closeModal');
    cy.wait(2000); 
  });

  it('should close modal with button and return focus', () => {
    cy.get('#openModal').click();
    cy.wait(2000); 

    cy.get('#closeModal').click();
    cy.wait(2000); 

    cy.get('#myModal').should('not.have.class', 'active');
    cy.wait(2000); 

    cy.focused().should('have.id', 'openModal');
    cy.wait(2000); 

    cy.get('#alertBox').should('contain.text', 'Popup closed.');
    cy.wait(2000); 
  });

  it('should close modal using Escape key', () => {
    cy.get('#openModal').click();
    cy.wait(2000);

    cy.realPress('Escape');
    cy.wait(2000); 

    cy.get('#myModal').should('not.have.class', 'active');
    cy.wait(2000); 

    cy.focused().should('have.id', 'openModal');
    cy.wait(2000); 
  });
});
