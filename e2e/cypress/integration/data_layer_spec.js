describe('Data Layer tests', () => {
  it('Data Layer Loaded', () => {
    cy.visit('/catalog/ark:/21198/zz0027xkn4');
    cy.window().then((win)=>{
        assert.isDefined(win.dataLayer, 'window.dataLayer is defined');
        assert.equal(win.dataLayer[0].Title[0], 'Russian aviators meet the press after breaking the non-stop flight record, flying from Moscow to San Jacinto, 1937');
        assert.equal(win.dataLayer[0]['Item ARK'], 'ark:/21198/zz0027xkn4');
        assert.equal(win.dataLayer[0]['Type.genre'][0],'news photographs');
        assert.equal(win.dataLayer[0]['Type.genre'][1],'cellulose nitrate film');
    });
  });
});
