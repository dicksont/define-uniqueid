###define-uniqueid

Define-uniqueid is a sequential, unique id generator that can be attached to arbitrary object prototypes.

[License](LICENSE)

## Usage

### CommonJS / Node
```javascript

var defineUniqueId = require('define-uniqueid').defineUniqueId;

defineUniqueId(Object);
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
  defineUniqueId(Object);
  ({}).uniqueId;
});

```

### Browser

```html
<script src="/bower_components/define-uniqueid/uniqid.js"></script>
<script>
defineUniqueId(HTMLElement);
var div = document.createElement('div');
div.uniqueId;
</script>
```
