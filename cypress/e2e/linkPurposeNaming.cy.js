/// <reference types="cypress" />

describe('Accessibility Test - Link Purpose & Naming', () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/link-purpose.html');
    cy.wait(2000);
  });

  it('should ensure link text is descriptive and not empty', () => {
    const genericTexts = [
      'click here',
      'learn more',
      'read more',
      'more',
      'details',
      'next',
      'go',
      'continue'
    ];

    cy.get('a').each(($link) => {
      const text = $link.text().trim();


      expect(
        text.length,
        `Link text should not be empty: ${$link.prop('outerHTML')}`
      ).to.be.greaterThan(0);


      const isGeneric = genericTexts.some((g) =>
        text.toLowerCase().includes(g)
      );

      if (Cypress.env('strictLinkCheck')) {

        expect(
          isGeneric,
          `Link "${text}" should be more descriptive`
        ).to.be.false;
      } else {

        if (isGeneric) {
          cy.log(`Possibly non-descriptive link: "${text}"`);
        }
      }

      cy.wait(2000); 
    });
  });
});
