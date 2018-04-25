'use strict';

//https://dzone.com/articles/understanding-javascript-closures
//https://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
//https://developer.mozilla.org/fr/docs/Web/JavaScript/Closures
//https://stackoverflow.com/questions/21634558/looping-on-a-protractor-test-with-parameters?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
//https://stackoverflow.com/questions/27910331/using-protractor-with-loops?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

const _ = require('lodash');

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing


  const templates = [
    {id: 0, template: 'template_1.xml'},
    {id: 2, template: 'template_2.xml'},
    {id: 4, template: 'template_3.xml'},
    {id: 6, template: 'template_4.xml'}
  ];



function t_10(template) {

  describe('t_10', () => {
    it('test_10', done => {
      browser.sleep(1000)
      //Promise.resolve()
        .then(() => console.log('test_10', template))
        .then(done);
    });
  });


}

describe('My app', function() {

  beforeEach(function() {
    browser.ignoreSynchronization=true;
    //browser.get('');
  });


  var funcs = [];
  for (var i = 0; i < 3; i++) {      // let's create 3 functions
    funcs[i] = function() {          // and store them in funcs
      console.log("My value: " + i); // each should log its value.
    };
  }
  for (var j = 0; j < 3; j++) {
    funcs[j]();                      // and now let's run each one to see
  }

  //_.each(templates, template_e => {
  _.each(templates, (t, i) => {
  //for(var i=0; i<templates.length; i++) {
    
    var template_e = templates[i];
    console.log('t', template_e);

  //  ((template) => {

      describe(`describe ${template_e.id}`, () => {

        console.log('describe', template_e);

        it('test_0', () => {
          console.log('coucou');
          browser.sleep(1000)
          //Promise.resolve()
            .then(() => console.log('test_0', template_e))
            //.then(done);
        });

        it('test_1', done => {
          console.log('test_1');
          browser.sleep(1000)
          //Promise.resolve()
            .then(() => console.log('test_1', template_e))
            .then(() => done());
        });

        t_10(template_e);

      });

//   })(template_e)
  //};
  });
});
