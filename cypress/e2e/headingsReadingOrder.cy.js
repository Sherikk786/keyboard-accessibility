describe('Accessibility Test - Headings & Reading Order', () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/headings-reading.html', { failOnStatusCode: false });
    cy.wait(2000);
  });

  it('should have at least one H1 heading', () => {
    cy.get('h1').should('have.length.at.least', 1);
    cy.wait(2000); 
  });

  it('should ensure heading hierarchy (H1 → H2 → H3) is logical', () => {
    cy.get('h1, h2, h3, h4, h5, h6').then(($headings) => {
      const headingLevels = Array.from($headings, (el) =>
        parseInt(el.tagName.replace('H', ''), 10)
      );

      cy.log('Detected heading levels:', headingLevels.join(', '));
      cy.wait(2000); 

      for (let i = 1; i < headingLevels.length; i++) {
        const diff = headingLevels[i] - headingLevels[i - 1];
        expect(diff).to.be.lessThan(2, `Invalid heading jump detected between index ${i - 1} and ${i}`);
        cy.wait(2000);
      }
    });
  });

  it('should ensure headings are meaningful (non-empty text)', () => {
    cy.get('h1, h2, h3, h4, h5, h6').each(($el) => {
      const text = $el.text().trim();
      expect(text).to.not.equal('', `${$el.prop('tagName')} should not be empty`);
      cy.wait(2000); 
    });
  });
});
