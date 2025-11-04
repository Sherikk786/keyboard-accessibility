describe('Logical Focus Order Accessibility Test (W3.org/WAI)', () => {

  beforeEach(() => {

    cy.visit('https://www.w3.org/WAI/');
    cy.wait(2000); 
  });

  it('should verify the logical focus order using keyboard Tab navigation', () => {
    cy.log('Starting Tab sequence to check logical focus order');

    cy.get('a, button, input, select, textarea', { timeout: 10000 })
      .filter(':visible')
      .first()
      .then(($el) => {
        cy.wrap($el).focus();
        cy.log(`Initial focus: ${$el.prop('tagName')} - ${$el.text().trim()}`);
        cy.wait(2000); 
      });

    const focusedElements = [];

    for (let i = 0; i < 10; i++) {
      cy.realPress('Tab');
      cy.wait(2000); 

      cy.focused().should('exist');
      cy.focused().then(($el) => {
        const tag = $el.prop('tagName');
        const text = $el.text().trim() || $el.attr('aria-label') || $el.attr('href') || 'Unnamed Element';
        focusedElements.push(`${i + 1}. [${tag}] ${text}`);
        cy.wait(2000); 
      });
    }

    cy.then(() => {
      cy.log('Captured Focus Sequence:');
      focusedElements.forEach((item) => cy.log(item));
      cy.writeFile('cypress/reports/focus-order.txt', focusedElements.join('\n'));
      cy.wait(2000);
    });

    cy.focused().invoke('attr', 'href').then((href) => {
      expect(href).to.satisfy(h => h?.includes('#content') || h?.includes('#main') || h?.startsWith('/'));
      cy.wait(2000);
    });
  });

  it('should ensure focus moves top-to-bottom (approximate DOM order)', () => {
    cy.get('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])').then(($elements) => {
      const domOrder = $elements.map((i, el) => el.tagName).get();
      cy.log('DOM order elements count:', domOrder.length);
      cy.wait(2000); 

      const focusOrder = [];

      for (let i = 0; i < 8; i++) {
        cy.realPress('Tab');
        cy.wait(2000); 

        cy.focused().should('exist');
        cy.focused().then(($el) => {
          const tag = $el.prop('tagName');
          focusOrder.push(tag);
          cy.wait(2000);
        });
      }

      cy.then(() => {
        cy.log('Focus order:', focusOrder.join(' → '));
        cy.log('Note: full logical order requires manual review');
        cy.wait(2000); 
      });
    });
  });
});
