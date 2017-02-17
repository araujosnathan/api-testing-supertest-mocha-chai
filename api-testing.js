var assert = require('chai').assert,
  expect = require('chai').expect,
  request = require('supertest');

var url_api = "http://localhost:3000/api";

var new_serie_without_name = {
  'year': '2011',
  'season': '7',
  'genre': 'Drama'
};

var new_serie_without_year = {
  'name': 'Game of Thrones',
  'season': '7',
  'genre': 'Drama'
};

var new_serie_without_season = {
  'name': 'Game of Thrones',
  'year': '2017',
  'genre': 'Drama'
};

var new_serie_without_genre = {
  'name': 'Game of Thrones',
  'year': '2017',
  'season': '5'
};

var new_serie = {
  'name': 'New Serie',
  'year': 'New Year',
  'season': 'New Season',
  'genre': 'New Genre'
};

id_serie = '58a724c90e2df95b750cc697';


describe('API Testing  - POST', function(){
    it('It is not possible create serie without name' ,
      function(done){
        request(url_api)
          .post('/series/')
          .send(new_serie_without_name)
          .end(function(error, response){
            assert.equal(response.status, 400);
            assert.equal(response.body.message, 'Missing required property: name/year/season or genre', 'Checking message required');
            done();
          });
      })

    it('It is not possible create serie without year' ,
      function(done){
        request(url_api)
          .post('/series/')
          .send(new_serie_without_year)
          .end(function(error, response){
              assert.equal(response.status, 400);
              assert.equal(response.body.message, 'Missing required property: name/year/season or genre', 'Checking message required');
              done();
            });
        })

    it('It is not possible create serie without season' ,
      function(done){
        request(url_api)
          .post('/series/')
          .send(new_serie_without_season)
          .end(function(error, response){
              assert.equal(response.status, 400);
              assert.equal(response.body.message, 'Missing required property: name/year/season or genre', 'Checking message required');
              done();
          });
      })

    it('It is not possible create serie without genre' ,
      function(done){
        request(url_api)
          .post('/series/')
          .send(new_serie_without_genre)
          .end(function(error, response){
              assert.equal(response.status, 400);
              assert.equal(response.body.message, 'Missing required property: name/year/season or genre', 'Checking message required');
              done();
          });
      })

    it('It is possible create serie' ,
      function(done){
        request(url_api)
          .post('/series')
          .send(new_serie)
          .end(function(error, response){
              assert.equal(response.status, 201);
              assert.equal(response.body.name, new_serie.name, 'Checking name');
              assert.equal(response.body.year, new_serie.year, 'Checking year');
              assert.equal(response.body.season, new_serie.season, 'Checking season');
              assert.equal(response.body.genre, new_serie.genre, 'Checking genre');
              done();
          });
      });

});

describe('API Testing  - GET', function(){
  it('Should to return a serie',
  function(done){
    request(url_api)
    .get('/series/' + id_serie)
    .end(function(error, response){
      assert.equal(response.status, 200);
      assert.equal(response.body.name, new_serie.name, 'Checking name');
      assert.equal(response.body.year, new_serie.year, 'Checking year');
      assert.equal(response.body.season, new_serie.season, 'Checking season');
      assert.equal(response.body.genre, new_serie.genre, 'Checking genre');
      done();
    });
  })

  it('Should to return HttpStatus 404 - NOT FOUND',
  function(done){
    request(url_api)
    .get('/series/notExist')
    .end(function(error, response){
      assert.equal(response.status, 404);
      assert.equal(response.body.message, 'Not Found', "Cheking not found request");
      done();
    });
  });
});

describe('API Testing - PUT', function(){
  it('Should update a serie',
  function(done){
    request(url_api)
    .put('/series/' + id_serie)
    .send(new_serie)
    .end(function(error, response){
      assert.equal(response.status, 204)
      done();
    });
  })

  it('Should to return HttpStatus 404 - NOT FOUND',
  function(done){
    request(url_api)
    .put('/series/notExist')
    .end(function(error, response){
      assert.equal(response.status, 404);
      assert.equal(response.body.message, 'Not Found', "Cheking not found request");
      done();
    });
  });
});

describe('API Testing - DELETE', function(){
  it('Should delete a serie',
    function(done){
      request(url_api)
      .delete('/series/' + id_serie)
      .end(function(error, response){
        assert.equal(response.status, 204);
        done();
      });
    })

    it('Should to return HttpStatus 404 - NOT FOUND',
    function(done){
      request(url_api)
      .put('/series/notExist')
      .end(function(error, response){
        assert.equal(response.status, 404);
        assert.equal(response.body.message, 'Not Found', "Cheking not found request");
        done();
      });
    });
});
