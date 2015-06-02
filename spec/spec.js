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
var defineUniqueId;

function test() {
  var a = {};
  var b = {};

  after(function(done) {
      delete a.uniqueId;
      delete b.uniqueId;
      delete Object.prototype.uniqueId;

      done();
  });

  it('should add a uniqueId property to Object', function() {
    assert.equal(a.uniqueId, null);
    defineUniqueId(Object, { static: true, redefine: true });
    assert.notEqual(a.uniqueId, null);
    assert.equal(a.uniqueId, a.uniqueId);
  });

  describe('.uniqueId', function() {


    it('should be consistent', function() {
      var id = a.uniqueId;
      assert.notEqual(id, null);
      assert.equal(a.uniqueId, id);
    });

    it('should be unique', function() {
      assert.notEqual(a.uniqueId, null);
      assert.notEqual(a.uniqueId, b.uniqueId);
    });
  });
}

describe('defineUniqueId [CommonJS]', function(){
  defineUniqueId = require('../uniqid.js');
  test();
});

describe('defineUniqueId [AMD]', function(done) {
  before(function(done) {
    requirejs.config({
      baseUrl: __dirname,
      paths: {
        'define-uniqueid': '../uniqid'
      }
    });

    requirejs(['define-uniqueid'], function(uniqueFx) {
      defineUniqueId = uniqueFx;
      done();
    });
  });

  test();
});
