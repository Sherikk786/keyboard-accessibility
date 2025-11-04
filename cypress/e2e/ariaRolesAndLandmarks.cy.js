describe('Accessibility Test - ARIA Roles and Landmarks', () => {

  beforeEach(() => {
    cy.visit('cypress/fixtures/aria-roles.html', { failOnStatusCode: false });
    cy.injectAxe(); 
    cy.wait(500); 
  });

  it('should have correct ARIA landmark roles on the page', () => {
    cy.get('header').should('have.attr', 'role', 'banner');
    cy.wait(300);

    cy.get('nav').should('have.attr', 'role', 'navigation');
    cy.wait(300);

    cy.get('main').should('have.attr', 'role', 'main');
    cy.wait(300);

    cy.get('footer').should('have.attr', 'role', 'contentinfo');
    cy.wait(300);
  });

  it('should have a descriptive aria-label for navigation', () => {
    cy.get('nav').should('have.attr', 'aria-label').and('not.be.empty');
    cy.wait(300);
  });

  it('should include at least one alert role for announcements', () => {
    cy.get('[role="alert"]').should('exist');
    cy.wait(300);

    cy.get('[role="alert"]').should('contain.text', 'alert');
    cy.wait(300);
  });

  it('should pass automated axe-core accessibility checks', () => {
    cy.checkA11y(null, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa']
      }
    });
    cy.wait(500);
  });

});
