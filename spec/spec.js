/*
 * Copyright (c) 2015 Dickson Tam
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 */

var assert = require('assert');
var requirejs = require('requirejs');

var TEST;

function addTests() {
  it('should add a uniqueId property to target prototype', function() {
    var a = TEST.targetGenerator();

    assert.equal(a.uniqueId, null);
    TEST.defineUniqueId(TEST.targetGenerator().constructor, { static: true, redefine: true });
    assert.notEqual(a.uniqueId, null);
    assert.equal(a.uniqueId, a.uniqueId);
  });

  describe('.uniqueId', function() {


    it('should be consistent', function() {
      var a = TEST.targetGenerator();
      var id = a.uniqueId;
      assert.notEqual(id, null);
      assert.equal(a.uniqueId, id);
    });

    it('should be unique', function() {
      var a = TEST.targetGenerator();
      var b = TEST.targetGenerator();

      assert.notEqual(a.uniqueId, null);
      assert.notEqual(a.uniqueId, b.uniqueId);
    });
  });

  after(function(done) {
    delete TEST.targetGenerator().constructor.prototype.uniqueId;

    done();
  });
}

describe('defineUniqueId [CommonJS]', function(){
  TEST = {
    defineUniqueId: require('../uniqid.js'),
    targetGenerator: function() { return {} }
  };

  addTests();
});

describe('defineUniqueId [AMD]', function(done) {
  before(function(done) {
    requirejs.config({
      baseUrl: __dirname,
      paths: {
        'define-uniqueid': '../uniqid'
      }
    });

    requirejs(['define-uniqueid'], function(defineUniqueId) {
      TEST = {
        defineUniqueId: defineUniqueId,
        targetGenerator: function() { return {} }
      };

      done();
    });
  });

  addTests();
});


describe('defineUniqueId [DOM]', function() {


  before(function(done) {
    var jsdom = require('jsdom');
    var fs = require('fs');
    var path = require('path');

    var uniqid = fs.readFileSync(path.resolve(__dirname,'../uniqid.js'), 'utf8');

    jsdom.env({
      html: '',
      src: [uniqid],
      loaded: function(errors, window) {
        if (errors != null)
          throw new Error('Failed to create jsDOM');

        TEST = {
          defineUniqueId: window.defineUniqueId,
          targetGenerator: function() { return window.document.createElement('div') }
        };
        done();
      }
    });

  });

  addTests();
});
