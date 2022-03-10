// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"items.json":[function(require,module,exports) {
module.exports = [{
  "id": 1,
  "name": "Red Printed T-Shirt",
  "price": 5000,
  "imageSource": "redprintedt-shirt.7a293bd6.jpg",
  "quantity": 1
}, {
  "id": 2,
  "name": "HRX Black Running Shoes",
  "price": 8000,
  "imageSource": "blackrunningshoes.86b0dcc1.jpg"
}, {
  "id": 3,
  "name": "Grey Joggers",
  "price": 3500,
  "imageSource": "greyjoggers.0857186a.jpg"
}];
},{}],"format.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatter = void 0;
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
exports.formatter = formatter;
},{}],"addGlobalEventListener.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGlobalEventListener = addGlobalEventListener;

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, function (e) {
    if (e.target.matches(selector)) {
      callback(e);
    }
  });
}
},{}],"shoppingCart.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToCart = addToCart;
exports.setupShoppingCart = setupShoppingCart;

var _items = _interopRequireDefault(require("./items.json"));

var _format = require("./format");

var _addGlobalEventListener = require("./addGlobalEventListener");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cartTemplate = document.querySelector('#cart-item-template');
var shoppingCart = [];
var cartItemContainer = document.querySelector('[data-cart-container]');
var cartTotal = document.querySelector('[data-cart-total]');
var SESSION_STORAGE_KEY = 'SHOPPING_CART-cart';

function setupShoppingCart() {
  (0, _addGlobalEventListener.addGlobalEventListener)('click', '[data-remove-cart-button]', function (e) {
    var id = parseInt(e.target.closest('[data-item]').dataset.itemId);
    removeFromCart(id);
  });
  shoppingCart = loadCart();
  renderShoppingCart();
}

function saveCart() {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shoppingCart));
}

function loadCart() {
  var cart = sessionStorage.getItem(SESSION_STORAGE_KEY);
  return JSON.parse(cart) || [];
}

function addToCart(id) {
  var existingItem = shoppingCart.find(function (entry) {
    return entry.id === id;
  });
  console.log(existingItem);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    shoppingCart.push({
      id: id,
      quantity: 1
    });
  }

  renderShoppingCart();
  saveCart();
}

function removeFromCart(id) {
  var existingItem = shoppingCart.find(function (entry) {
    return entry.id === id;
  });
  if (existingItem == null) return;
  shoppingCart = shoppingCart.filter(function (entry) {
    return entry.id !== id;
  });
  renderShoppingCart();
  saveCart();
}

function renderShoppingCart() {
  cartItemContainer.innerHTML = '';
  var totalCents = shoppingCart.reduce(function (sum, entry) {
    var item = _items.default.find(function (i) {
      return entry.id === i.id;
    });

    return sum + item.price * entry.quantity;
  }, 0);
  cartTotal.innerText = _format.formatter.format(totalCents / 100);
  shoppingCart.forEach(function (entry) {
    var item = _items.default.find(function (i) {
      return entry.id === i.id;
    });

    var cartItem = cartTemplate.content.cloneNode(true);
    var container = cartItem.querySelector('[data-item]');
    container.dataset.itemId = item.id;
    var name = cartItem.querySelector('[data-name]');
    name.innerText = item.name;

    if (entry.quantity > 1) {
      var quantity = cartItem.querySelector('[data-quantity]');
      console.log(quantity);
      quantity.innerText = "".concat(entry.quantity);
    }

    var price = cartItem.querySelector('[data-price]');
    console.log(price);
    price.innerText = _format.formatter.format(item.price * entry.quantity / 100);
    var image = cartItem.querySelector('[data-image]');
    image.src = item.imageSource;
    cartItemContainer.appendChild(cartItem);
  });
}
},{"./items.json":"items.json","./format":"format.js","./addGlobalEventListener":"addGlobalEventListener.js"}],"store.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderStore = renderStore;

var _items = _interopRequireDefault(require("./items.json"));

var _format = require("./format");

var _addGlobalEventListener = require("./addGlobalEventListener");

var _shoppingCart = require("./shoppingCart");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storeContainer = document.querySelector('[data-store-container]');
var storeTemplate = document.querySelector('#store-template');

function renderStore() {
  if (storeContainer == null) return;
  (0, _addGlobalEventListener.addGlobalEventListener)('click', '[data-add-to-cart-button]', function (e) {
    var id = e.target.closest('[data-store-product]').dataset.itemId;
    (0, _shoppingCart.addToCart)(parseInt(id));
  });

  _items.default.forEach(setupStore);
}

function setupStore(item) {
  var storeItem = storeTemplate.content.cloneNode(true);
  var container = storeItem.querySelector('[data-store-product]');
  container.dataset.itemId = item.id;
  var name = storeItem.querySelector('[data-store-name]');
  name.innerText = item.name;
  var image = storeItem.querySelector('[data-store-image]');
  image.src = item.imageSource;
  var price = storeItem.querySelector('[data-store-price]');
  price.innerText = _format.formatter.format(item.price / 100);
  storeContainer.appendChild(storeItem);
}
},{"./items.json":"items.json","./format":"format.js","./addGlobalEventListener":"addGlobalEventListener.js","./shoppingCart":"shoppingCart.js"}],"navbar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navBar = navBar;
var toggleButton = document.querySelector('.toggle-button');
var navbarLinks = document.querySelector('.navbar-links');

function navBar() {
  toggleButton.addEventListener('click', function () {
    console.log('click');
    navbarLinks.classList.toggle('active');
  });
}
},{}],"script.js":[function(require,module,exports) {
"use strict";

var _store = require("./store");

var _shoppingCart = require("./shoppingCart");

var _navbar = require("./navbar");

(0, _navbar.navBar)();
(0, _store.renderStore)();
(0, _shoppingCart.setupShoppingCart)();
},{"./store":"store.js","./shoppingCart":"shoppingCart.js","./navbar":"navbar.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53534" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map