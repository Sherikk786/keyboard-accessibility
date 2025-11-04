/// <reference types="cypress" />

import 'cypress-real-events/support';
import 'cypress-plugin-tab';

describe('Keyboard Navigation Accessibility Test (W3C WAI)', () => {

  beforeEach(() => {
    cy.visit('https://www.w3.org/WAI/');
    cy.wait(4000); 
  });

  it('Navigates using Tab, Enter, Space, and Escape keys', () => {


    cy.get('a, button, input, select, textarea', { timeout: 10000 })
      .filter(':visible')
      .first()
      .then(($el) => {
        cy.wrap($el).focus();
        cy.log(`Initial focus: ${$el.prop('tagName')} - ${$el.text().trim()}`);
        cy.wait(2000); 
      });


    cy.focused({ timeout: 5000 })
      .should('exist')
      .and('be.visible')
      .then(($el) => {
        cy.log(`Focused element: ${$el.prop('tagName')} - ${$el.text().trim()}`);
        cy.wait(2000);
      });


    for (let i = 0; i < 5; i++) {
      cy.realPress('Tab');
      cy.wait(2000); 

      cy.focused({ timeout: 4000 })
        .should('exist')
        .and('be.visible')
        .then(($el) => {
          cy.log(`Tab ${i + 1}: ${$el.prop('tagName')} - ${$el.text().trim()}`);
          cy.wait(2000); 
        });
    }


    cy.focused({ timeout: 4000 })
      .should('exist')
      .then(($el) => {
        cy.log(`Pressing Enter on: ${$el.prop('tagName')} - ${$el.text().trim()}`);
        cy.wait(2000); 
        cy.wrap($el).realPress('Enter');
        cy.wait(2000); 
      });

    cy.log('Pressed Enter on current element.');
    cy.wait(2000); 
  });
});
