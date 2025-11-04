describe('Accessibility Test - Page Titles & Landmarks', () => {

  beforeEach(() => {
    cy.visit('cypress/fixtures/page-titles-landmarks.html', { failOnStatusCode: false });
    cy.wait(2000); 
  });

  it('should have a meaningful and correct page title', () => {
    cy.title().should('contain', 'About Us');
    cy.wait(2000);
  });

  it('should contain a <main> element with role="main"', () => {
    cy.get('main[role="main"]').should('exist');
    cy.wait(2000); 
  });

  it('should contain a <nav> element with role="navigation"', () => {
    cy.get('nav[role="navigation"]').should('exist');
    cy.wait(2000); 
  });

  it('should contain a <footer> element with role="contentinfo"', () => {
    cy.get('footer[role="contentinfo"]').should('exist');
    cy.wait(2000); 
  });

  it('should have only one <main> landmark per page', () => {
    cy.get('main[role="main"]').should('have.length', 1);
    cy.wait(2000); 
  });

  it('should verify landmark regions are in logical order', () => {
    cy.document().then((doc) => {
      const elements = Array.from(doc.querySelectorAll('nav, main, footer')).map(el => el.tagName.toLowerCase());
      expect(elements).to.deep.equal(['nav', 'main', 'footer'], 'Landmarks should appear in order: nav → main → footer');
      cy.wait(2000); 
    });
  });
});
