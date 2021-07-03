describe ('Reivews', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  describe('More Reviews Btn', () => {
    it('should load 2 reviews at a time', () => {
      //Initially, the pag should have just 2 reviews
      cy.get('.reviews-tile').should('have.length', 2)
      //Click on More Reviews and 2 more should be displayed
      cy.contains('MORE REVIEWS').click();
      cy.get('.reviews-tile').should('have.length', 4)
    })
  })

  describe('Sort Dropdown', () => {
    it('should display relevant on load', () => {
      //Choose sort dropdown
      let sort = cy.get('#sortSelect');
      sort.should('have.value', 'relevant');
      //Select Helpful sort option
      sort.select('Helpful').should('have.value', 'helpful');

      //Find the no of helpful count for the first review and compare it with the second review
      cy.get('.reviews-tile-helpful-count').first()
        .invoke('text')
        .then(parseFloat)
        .then((num1) => {
          // console.log('NUM', num1)
          cy.get('.reviews-tile-helpful-count').last()
            .invoke('text')
            .then(parseFloat)
            .should('be.lte', num1)
        });
    });
  })

  describe('Add a review', () => {
    it('should open a new modal window', () => {
      //Open add review modal
      cy.get('.add-review button').click()
      cy.get('.add-review-modal-main').should('exist')

      //Open upload photo modal
      cy.get('.upload-photos-btn').click()
      cy.get('.upload-photos-modal-main').should('exist')

      //Close upload photo modal
      cy.get('.upload-photos-modal-main .heading button').click()
      cy.get('.upload-photos-modal-main').should('not.exist')
    });
  });

  describe('Search', () => {
    it('should search all reviews for the input text', () => {
      //Before searching
      cy.get('.reviews-tile').should('have.length', 2)
      cy.get('#reviews-search').type('sequi')
      //After searching
      cy.get('.reviews-tile').should('have.length', 1)
    })
  })

})

