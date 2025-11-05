// describe('Alt Text Meaningfulness Accessibility Test', () => {

//   beforeEach(() => {
   
//     cy.visit('https://www.w3.org/WAI/');
//   });

//   it('should verify that all images have non-empty and meaningful alt text', () => {
  
//     cy.get('img').each(($img, index) => {
//       const altText = $img.attr('alt');

//       cy.log(`Image ${index + 1}: src=${$img.attr('src')} | alt=${altText}`);

//       expect($img, `Image ${index + 1} should have an alt attribute`).to.have.attr('alt');
//       expect(altText, `Image ${index + 1} should have non-empty alt text`).to.not.be.empty;

//       const genericWords = ['image', 'photo', 'picture', 'pic', 'graphic'];
//       const lowerAlt = altText.trim().toLowerCase();
//       const isGeneric = genericWords.some(word => lowerAlt.includes(word));

//       if (isGeneric) {
//         cy.log(`Manual check needed: Alt text might be generic → "${altText}"`);
//       } else {
//         cy.log(`Alt text seems meaningful: "${altText}"`);
//       }
//     });
//   });

//   it('should flag missing or empty alt attributes for manual review', () => {
//     cy.get('img').each(($img, index) => {
//       const altText = $img.attr('alt');

//       if (!altText || altText.trim() === '') {
//   cy.log(`Image ${index + 1} missing or empty alt text (manual fix needed).`);
// }

//     });
//   });
// });
describe('Alt Text Meaningfulness Accessibility Test - strict', () => {
  beforeEach(() => {
    cy.visit('https://www.w3.org/WAI/');
  });

  it('flags images missing meaningful alt text (aggregated)', () => {
    const failures = [];

    cy.get('img', { timeout: 10000 }).then($imgs => {

      $imgs.each((index, img) => {
        const $img = Cypress.$(img);
        const src = $img.attr('src') || '[no-src]';
        const altAttr = $img.attr('alt'); // may be undefined
        const role = ($img.attr('role') || '').toLowerCase();
        const ariaHidden = ($img.attr('aria-hidden') || '').toLowerCase();


        const isDecorative = role === 'presentation' || ariaHidden === 'true' || altAttr === '';

        if (typeof altAttr === 'undefined') {

          failures.push(`Image ${index + 1}: src=${src} → MISSING alt attribute`);
        } else if (!isDecorative) {

          const altText = altAttr.trim();
          if (altText === '') {

            failures.push(`Image ${index + 1}: src=${src} → EMPTY alt (not marked decorative)`);
          } else {

            const genericWords = ['image', 'photo', 'picture', 'pic', 'graphic'];
            const lowerAlt = altText.toLowerCase();
            const isGeneric = genericWords.some(word => lowerAlt.includes(word));
            if (isGeneric) {
              failures.push(`Image ${index + 1}: src=${src} → GENERIC alt "${altText}" (consider making it meaningful)`);
            } else {

              cy.log(`Image ${index + 1} OK: src=${src} | alt="${altText}"`);
            }
          }
        } else {
          cy.log(`Image ${index + 1} decorative/allowed: src=${src} | alt="${altAttr}"`);
        }
      }); 


      if (failures.length > 0) {

        cy.log('Accessibility alt failures:\n' + failures.join('\n'));
        throw new Error('Alt text accessibility issues found:\n' + failures.join('\n'));
      } else {
        cy.log('All images have acceptable alt text (or are decorative).');
      }
    });
  });
});
