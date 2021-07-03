import React from 'react';
<reference types="cypress" />

describe('Overview Testing', () => {

  beforeEach(() => {
    cy.visit('/')
  });

  it('image gallery enters into expanded view on click of main image and goes back to default view on click of minimize icon', () => {

    // should enter into expnaded view on click of the main image
    let image = cy.get('.image-main-default');
    image.click();
    cy.get('.image-main-expanded').should('exist');
    cy.get('.image-main-default').should('not.exist');

    // click on minimize arrows should return DOM to default size main image
    cy.get('.minimize-image').click();
    cy.get('.image-main-expanded').should('not.exist');
    cy.get('.image-main-default').should('exist');

    // also enters expanded view with maximize icon on click
    let maximize = cy.get('.maximize-image');
    maximize.click();
    cy.get('.image-main-expanded').should('exist');
    cy.get('.image-main-default').should('not.exist');
  });

  it('should change current style when different style thumbnail clicked', () => {
    // by default the first style in list should be the current selected style
    let firstStyle = cy.get('.style-thumbnail').first();
    firstStyle.should('have.class', 'current-style-selection')
    // let mainImage = cy.get('.')
    // styles[1].click();
    if (cy.get('.style-thumbnail').length > 1) {
      let nextStyle = firstStyle.next();
      nextStyle.should('have.class', 'non-current-style');
      nextStyle.click();
      nextStyle.should('have.class', 'current-style-selection');
    }
  });

  // it('should change current style image when image thumbnail clicked', () => {

  //   if (cy.get('.image-thumbnail').length > 1) {
  //     let firstThumbnail = cy.get('.image-thumbnail').first();
  //     firstThumbnail.should('have.class', 'current-image-selection');
  //   }

  //   // only check if more than one image thumbnail present
  //   if (cy.get('.image-thumbnail').length > 1) {
  //     let nextThumbnail = firstThumbnail.next();
  //     nextThumbnail.should('have.class', 'non-current-image');
  //     nextThumbnail.click();
  //     nextThumbnail.should('have.class', 'current-image-selection');
  //   }
  // });


});