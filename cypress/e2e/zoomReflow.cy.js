describe('Accessibility Test - Zoom & Reflow', () => {

  beforeEach(() => {
    cy.visit('cypress/fixtures/zoom-reflow.html', { failOnStatusCode: false });
    cy.wait(2000); 
  });

  it('should display correctly on desktop viewport', () => {
    cy.viewport(1280, 720);
    cy.wait(2000);

    cy.get('header h1').should('be.visible');
    cy.wait(2000); 

    cy.get('.card').should('have.length.at.least', 1);
    cy.wait(2000); 
  });

  it('should reflow properly on tablet viewport', () => {
    cy.viewport(768, 1024);
    cy.wait(2000); 

    cy.get('.card').should('be.visible');
    cy.wait(2000);

    cy.window().then((win) => {
      const hasScroll = win.document.body.scrollWidth > win.innerWidth;
      expect(hasScroll, 'No horizontal scroll at tablet size').to.be.false;
    });
    cy.wait(2000); 
  });

  it('should reflow properly on mobile viewport', () => {
    cy.viewport(375, 667); 
    cy.wait(2000); 

    cy.get('.card').should('be.visible');
    cy.wait(2000); 

    cy.window().then((win) => {
      const hasScroll = win.document.body.scrollWidth > win.innerWidth;
      expect(hasScroll, 'No horizontal scroll at mobile size').to.be.false;
    });
    cy.wait(2000); 
  });

  it('should zoom in (simulate 200%) and verify no horizontal scroll', () => {
    cy.viewport(640, 360); 
    cy.wait(2000); 

    cy.window().then((win) => {
      const hasScroll = win.document.body.scrollWidth > win.innerWidth;
      expect(hasScroll, 'No horizontal scroll even at zoom').to.be.false;
    });
    cy.wait(2000); 
  });
});
