var assert = require('assert');
var fetch = require('node-fetch');

describe('Unit test', function() {
  describe('spotify API', function() {
    it('Artists results', async function() {
      this.timeout(0)
      try {
        let request = await fetch('http://localhost:3000/api/search/artisttts?q=will+smith')
        let results = await request.json();
        assert.equal(true, results.artists.items.length > 0);
      }
      catch(error) {
        assert.equal(true, false);
      }
    });
    it('Artist page', function() {
      before(async function(done) {
        this.timeout(0)
        let request = await fetch('http://localhost:3000/api/search/artists?q=will+smith')
        let results = await request.json();

        browser.get('http://locahost::3000/artists/' + results.artists.items[0].id);
        setTimeout(done, 2000);
      });

      it('Artist has albums', function () {
        // test to write
        assert.equal(true, true);
      })

      it('Artist has top tracks', function () {
        // test to write
        assert.equal(true, true);
      })
    })
  });
});