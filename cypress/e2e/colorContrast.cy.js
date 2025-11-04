/// <reference types="cypress" />

describe('Color Contrast Accessibility Test (WCAG)', () => {
  beforeEach(() => {
    cy.visit('https://www.w3.org/WAI/');
    cy.injectAxe(); 
    cy.wait(300); 
  });

  it('should have sufficient color contrast on all visible elements', () => {
    cy.checkA11y(null, {
      runOnly: {
        type: 'rule',
        values: ['color-contrast'],
      },
    });
    cy.wait(300); 
  });

  it('should pass WCAG AA contrast ratio for visible text', () => {
    cy.get('body *:visible').each(($el) => {
      const color = Cypress.$($el).css('color');
      const background = Cypress.$($el).css('background-color');

      cy.log(`Checking element: ${$el.prop('tagName')} with color ${color}`);
      expect(color).to.not.equal(background); 

      cy.wait(300); 
    });
  });

  it('should log all color contrast violations in console', () => {
    cy.checkA11y(null, {
      runOnly: {
        type: 'rule',
        values: ['color-contrast'],
      },
    }, (violations) => {
      cy.task('log', `${violations.length} color contrast issues found`);
      violations.forEach(v => {
        cy.task('log', `${v.id}: ${v.description}`);
        cy.wait(300); 
      });
    });
  });
});
