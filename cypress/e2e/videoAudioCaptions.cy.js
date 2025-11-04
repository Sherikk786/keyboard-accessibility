describe('Accessibility Test - Video & Audio Captions', () => {

  beforeEach(() => {
    cy.visit('cypress/fixtures/video-audio-captions.html', { failOnStatusCode: false });
    cy.wait(2000); 
  });

  it('should have a video element with a <track kind="captions"> tag', () => {
    cy.get('video').should('exist');
    cy.wait(2000); 

    cy.get('video track[kind="captions"]').should('have.attr', 'src');
    cy.wait(2000); 
  });

  it('should verify video has at least one source file', () => {
    cy.get('video source').should('have.length.at.least', 1);
    cy.wait(2000); 
  });

  it('should check audio element presence', () => {
    cy.get('audio').should('exist');
    cy.wait(2000);
  });

  it('should verify audio has a transcript or captions', () => {
    cy.document().then((doc) => {
      const hasTranscript = doc.querySelector('#transcript') !== null;
      const hasAudioTrack = doc.querySelector('audio track[kind="captions"]') !== null;
      expect(hasTranscript || hasAudioTrack, 'Audio must have captions or transcript').to.be.true;
    });
    cy.wait(2000);
  });

  it('should confirm captions or transcript visibility for manual verification', () => {
    cy.get('#transcript').should('be.visible');
    cy.wait(2000);
  });
});
