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

(function() {
  var id = 1;

  function generateId() {
    return id++;
  }

  function defineUniqueId(ctor, opts) {
    opts = opts || {};

    opts.static = opts.static || false;
    opts.redefine = opts.redefine || false;
    opts.enumerable = opts.enumerable || false;

    if (typeof(opts.format) != 'undefined' && typeof(opts.format) != 'function') {
      throw new Error('"format" property in option parameter is not a function');
    }

    if (ctor.prototype.hasOwnProperty('uniqueId') && !opts.redefine) {
      throw new Error('Object prototype already has uniqueId property defined.');
    }

    Object.defineProperty(ctor.prototype, 'uniqueId', {
      get: function() {
        Object.defineProperty(this, 'uniqueId', {
          value: (opts.format)? opts.format(generateId()) : generateId(),
          writable: false,
          enumerable: opts.enumerable,
          configurable: opts.static
        })

        return this.uniqueId;
      },
      enumerable: opts.enumerable,
      configurable: opts.static
    });


    function undefine() {
      delete ctor.prototype['uniqueId'];
    }

    return undefine;
  }

  if (typeof define === 'function' && define.amd) { // Require.js & AMD
    define('define-uniqueid', [], function() {
      return defineUniqueId;
    });
  } else if (typeof module !== 'undefined' && module && module.exports) { // Node.js & CommonJS
    module.exports = defineUniqueId;
  } else { // Browser
    window.defineUniqueId = defineUniqueId;
  }

})()
