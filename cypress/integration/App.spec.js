describe('Home', () => {
  it('it dislayis "Hello conFusión 2020"', () => {4
    cy.visit('http://192.168.0.185:19006/')
      .get('#test_id')
      .contains('Hello conFusión 2020')
  })
})