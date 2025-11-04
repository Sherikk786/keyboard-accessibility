describe('Accessibility Test - Forms & Labels', () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/form-labels.html', { failOnStatusCode: false });
    cy.wait(2000); 
  });

  it('should have labels correctly associated with inputs via "for" attribute', () => {
    cy.get('label[for]').each(($label) => {
      const forAttr = $label.attr('for');
      cy.wait(2000);
      cy.get(`#${forAttr}`).should('exist');
      cy.wait(2000);
    });
  });

  it('should verify aria-labelledby associations', () => {
    cy.get('[aria-labelledby]').each(($input) => {
      const labelledBy = $input.attr('aria-labelledby');
      cy.wait(2000); 
      cy.get(`#${labelledBy}`).should('exist');
      cy.wait(2000); 
    });
  });

  it('should verify aria-describedby associations', () => {
    cy.get('[aria-describedby]').each(($input) => {
      const describedBy = $input.attr('aria-describedby');
      cy.wait(2000);
      cy.get(`#${describedBy}`).should('exist');
      cy.wait(2000); 
    });
  });

  it('should ensure each input has a visible label or aria-label', () => {
    cy.get('input').each(($input) => {
      const id = $input.attr('id');
      cy.wait(2000); 
      cy.get(`label[for="${id}"]`).should('exist');
      cy.wait(2000); 
    });
  });
});
