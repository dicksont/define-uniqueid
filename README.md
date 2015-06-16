[![Build Status](https://travis-ci.org/dicksont/define-uniqueid.svg?branch=master)](https://travis-ci.org/dicksont/define-uniqueid) [![npm version](https://badge.fury.io/js/define-uniqueid.svg)](http://badge.fury.io/js/define-uniqueid) [![Bower version](https://badge.fury.io/bo/define-uniqueid.svg)](http://badge.fury.io/bo/define-uniqueid)

Define-uniqueid is a sequential, unique id generator that can be attached to arbitrary object prototypes. We would like to think that the following are its advantages over the alternatives:
- **Portability** - It works across all the different JavaScript module formats.
- **Efficiency** - *uniqueId*'s are generated lazily, on-demand. This saves CPU cycles and memory space.
- **Customizability** - You can add *uniqueId* to more specialized prototypes other than Object. You can customize the *uniqueId* by passing in your own formatting function, in the *defineUniqueId* call.


[License](LICENSE)

## Usage

### DOM / Chrome / Safari / Firefox / Opera

```html
<script src="/bower_components/define-uniqueid/uniqid.js"></script>
<script>
var undefineFx = defineUniqueId(HTMLElement);
var div = document.createElement('div');
div.uniqueId;
</script>
```

### CommonJS / Node
```javascript

var defineUniqueId = require('define-uniqueid');
var undefineFx = defineUniqueId(Object);
({}).uniqueId;

```

### AMD / Require.js

```javascript
requirejs.config({
  baseUrl: '.',
  paths: {
    'define-uniqueid': './uniqid'
  }
});

requirejs(['define-uniqueid'], function(defineUniqueId) {
  var undefineFx = defineUniqueId(Object);
  ({}).uniqueId;
});


```

## Options
An object containing options can be passed in the defineUniqueId call.

```javascript
defineUniqueId(Object, {
  configurable: true,
  enumerable: true,
  redefine: true,
  format: function(id) { return 'obj-' + id; }
})
```

### opts.format
Customize the *uniqueId* by passing in your own formatting function.

```javascript
defineUniqueId(Object, { format: function(id) { return 'obj-' + id; })
```

### opts.configurable

Default: *false*

*False* means that the uniqueId property cannot be redefined. *True* means that the property can be redefined in both the object and the prototype object.


### opts.enumerable

Default: *false*

*True* means that the uniqueId property can be enumerated.


### opts.redefine

Default: *false*

By default, an error is thrown when the Object prototype already has a *defineUniqueId* property. Set this to *true*, to suppress these errors and
to allow this property to be redefined.

## Browser Support

This library has been tested with good success on a variety of browsers including :

- Google Nexus 7 : Android 4.1
- Samsung Galaxy S3 : Android 4.1
- Chrome 36.0 : Windows 8.1
- Firefox 30.0 : Windows 8.1
- Safari 7.0 : OS X Mavericks

Internet Explorer is a confirmed exception. Let me know if your particular browser has issues.
