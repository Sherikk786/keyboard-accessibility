describe('Accessibility Test - Language Attribute', () => {

  beforeEach(() => {
    cy.visit('cypress/fixtures/language-attribute.html', { failOnStatusCode: false });
  });

  it('should have a lang attribute on the html element', () => {
    cy.get('html')
      .should('have.attr', 'lang')
      .and('not.be.empty');
  });

  it('should have the correct language set to English (en)', () => {
    cy.get('html').should('have.attr', 'lang', 'en');
  });

  it('should not have invalid language codes', () => {
    cy.get('html').invoke('attr', 'lang').then((langValue) => {

      const validLangCodes = ['en', 'en-US', 'en-GB', 'fr', 'es', 'de', 'ar', 'ur', 'hi'];
      expect(validLangCodes).to.include(langValue);
    });
  });

});
