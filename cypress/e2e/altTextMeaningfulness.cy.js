describe('Alt Text Meaningfulness Accessibility Test', () => {

  beforeEach(() => {
   
    cy.visit('/');
  });

  it('should verify that all images have non-empty and meaningful alt text', () => {
  
    cy.get('img').each(($img, index) => {
      const altText = $img.attr('alt');

      cy.log(`Image ${index + 1}: src=${$img.attr('src')} | alt=${altText}`);

      expect($img, `Image ${index + 1} should have an alt attribute`).to.have.attr('alt');
      expect(altText, `Image ${index + 1} should have non-empty alt text`).to.not.be.empty;

      const genericWords = ['image', 'photo', 'picture', 'pic', 'graphic'];
      const lowerAlt = altText.trim().toLowerCase();
      const isGeneric = genericWords.some(word => lowerAlt.includes(word));

      if (isGeneric) {
        cy.log(`Manual check needed: Alt text might be generic → "${altText}"`);
      } else {
        cy.log(`Alt text seems meaningful: "${altText}"`);
      }
    });
  });

  it('should flag missing or empty alt attributes for manual review', () => {
    cy.get('img').each(($img, index) => {
      const altText = $img.attr('alt');

      if (!altText || altText.trim() === '') {
  cy.log(`Image ${index + 1} missing or empty alt text (manual fix needed).`);
}

    });
  });
});
