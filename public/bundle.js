/*
 * catberry-project: 0.0.0
 * Build Date: Fri May 22 2015 21:53:07 GMT+0600 (RTZ 5 (зима))
 */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var catberry = require('catberry'),
	templateEngine = require('catberry-jade'),
	// this config will be replaced by `./config/browser.json` when building
	// because of `browser` field in `package.json`
	config = require('./config/environment.json'),
	cat = catberry.create(config);

templateEngine.register(cat.locator);
cat.startWhenReady();


},{"./config/environment.json":6,"catberry":18,"catberry-jade":8}],2:[function(require,module,exports){
'use strict';

module.exports = Document;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of "document" component.
 * @constructor
 */
function Document() {

}

},{}],3:[function(require,module,exports){
'use strict';

module.exports = Head;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of "head" component.
 * @param {Object} $config Catberry application config.
 * @constructor
 */
function Head($config) {
	this._config = $config;
}

/**
 * Current config.
 * @type {Object}
 * @private
 */
Head.prototype._config = null;

/**
 * Gets data for template.
 * @returns {Object} Data object.
 */
Head.prototype.render = function () {
	return this._config;
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = HelloWorld;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of "hello-world" component.
 * @constructor
 */
function HelloWorld() {

}

/**
 * Gets data for template.
 * @returns {Promise<Object>} Promise for data.
 */
HelloWorld.prototype.render = function () {
	return this.$context.getStoreData();
};

},{}],5:[function(require,module,exports){
'use strict';

module.exports = Main;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of "Main" store.
 * @constructor
 */
function Main() {

}

/**
 * Loads data from somewhere.
 * @returns {Object} Data object.
 */
Main.prototype.load = function () {
	return {who: 'World'};
};

},{}],6:[function(require,module,exports){
module.exports={
	"title": "Catberry Project",
	"server": {
		"port": 3000
	}
}

},{}],7:[function(require,module,exports){
/*
 * catberry-jade
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
 *
 * catberry-jade's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry-jade that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = TemplateProvider;

/**
 * Creates new instance of Jade template provider.
 * @param {Jade} $jade Jade factory.
 * @constructor
 */
function TemplateProvider($jade) {
	this._jade = $jade;
	this._templates = {};
}

/**
 * Current Jade factory.
 * @type {Jade}
 * @private
 */
TemplateProvider.prototype._jade = null;

/**
 * Current set of registered templates.
 * @type {Object}
 * @private
 */
TemplateProvider.prototype._templates = null;

/**
 * Registers compiled (precompiled) Jade template.
 * http://jadejs.com/reference.html
 * @param {String} name Template name.
 * @param {String} compiled Compiled template source.
 */
TemplateProvider.prototype.registerCompiled = function (name, compiled) {
	// jshint evil:true
	var getTemplate = new Function('jade', 'return ' + compiled + ';');
	this._templates[name] = getTemplate(this._jade);
};

/**
 * Renders template with specified data.
 * @param {String} name Name of template.
 * @param {Object} data Data context for template.
 * @returns {*}
 */
TemplateProvider.prototype.render = function (name, data) {
	if (!this._templates.hasOwnProperty(name)) {
		return Promise.reject(new Error('No such template'));
	}

	var promise;
	try {
		promise = Promise.resolve(this._templates[name](data));
	} catch(e) {
		promise = Promise.reject(e);
	}
	return promise;
};
},{}],8:[function(require,module,exports){
/*
 * catberry-jade
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry-jade's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This license applies to all parts of catberry-jade that are not externally
 * maintained libraries.
 */

'use strict';

var Jade = require('jade'),
	TemplateProvider = require('./lib/TemplateProvider');

module.exports = {
	register: function (locator, config) {
		config = config || {};
		locator.registerInstance('jade', Jade);
		locator.register('templateProvider', TemplateProvider, config, true);
	},
	Jade: Jade,
	TemplateProvider: TemplateProvider
};
},{"./lib/TemplateProvider":7,"jade":9}],9:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jade=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return (Array.isArray(val) ? val.map(joinClasses) :
    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
    [val]).filter(nulls).join(' ');
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};


exports.style = function (val) {
  if (val && typeof val === 'object') {
    return Object.keys(val).map(function (style) {
      return style + ':' + val[style];
    }).join(';');
  } else {
    return val;
  }
};
/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if (key === 'style') {
    val = exports.style(val);
  }
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    if (JSON.stringify(val).indexOf('&') !== -1) {
      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                   'will be escaped to `&amp;`');
    };
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will eliminate the double quotes around dates in ' +
                   'ISO form after 2.0.0');
    }
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  var result = String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || require('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

},{"fs":2}],2:[function(require,module,exports){

},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"fs":33}],10:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = Catberry;

var util = require('util'),
	CatberryBase = require('../lib/base/CatberryBase');

util.inherits(Catberry, CatberryBase);

/**
 * Creates new instance of the browser version of Catberry.
 * @constructor
 * @extends CatberryBase
 */
function Catberry() {
	CatberryBase.call(this);
}

/**
 * Current request router.
 * @type {RequestRouter}
 * @private
 */
Catberry.prototype._router = null;

/**
 * Wraps current HTML document with Catberry event handlers.
 */
Catberry.prototype.wrapDocument = function () {
	this._router = this.locator.resolve('requestRouter');
};

/**
 * Starts Catberry application when DOM is ready.
 * @returns {Promise} Promise for nothing.
 */
Catberry.prototype.startWhenReady = function () {
	if (window.catberry) {
		return Promise.resolve();
	}
	var self = this;

	return new Promise(function (fulfill) {
		window.document.addEventListener('DOMContentLoaded', function () {
			self.wrapDocument();
			window.catberry = self;
			fulfill();
		});
	});
};
},{"../lib/base/CatberryBase":23,"util":39}],11:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';
module.exports = CookieWrapper;

var util = require('util'),
	CookieWrapperBase = require('../lib/base/CookieWrapperBase');

util.inherits(CookieWrapper, CookieWrapperBase);

/**
 * Creates new instance of the browser cookie wrapper.
 * @constructor
 */
function CookieWrapper($window) {
	CookieWrapperBase.call(this);
	this._window = $window;
}

/**
 * Current browser window.
 * @type {Window}
 * @private
 */
CookieWrapper.prototype._window = null;

/**
 * Gets current cookie string.
 * @returns {string} Cookie string.
 */
CookieWrapper.prototype.getCookieString = function () {
	return this._window.document.cookie ?
		this._window.document.cookie.toString() :
		'';
};

/**
 * Sets cookie to this wrapper.
 * @param {Object} cookieSetup Cookie setup object.
 * @param {string} cookieSetup.key Cookie key.
 * @param {string} cookieSetup.value Cookie value.
 * @param {number?} cookieSetup.maxAge Max cookie age in seconds.
 * @param {Date?} cookieSetup.expires Expire date.
 * @param {string?} cookieSetup.path URI path for cookie.
 * @param {string?} cookieSetup.domain Cookie domain.
 * @param {boolean?} cookieSetup.secure Is cookie secured.
 * @param {boolean?} cookieSetup.httpOnly Is cookie HTTP only.
 * @returns {string} Cookie setup string.
 */
CookieWrapper.prototype.set = function (cookieSetup) {
	var cookie = this._convertToCookieSetup(cookieSetup);
	this._window.document.cookie = cookie;
	return cookie;
};
},{"../lib/base/CookieWrapperBase":24,"util":39}],12:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = DocumentRenderer;

var util = require('util'),
	errorHelper = require('../lib/helpers/errorHelper'),
	moduleHelper = require('../lib/helpers/moduleHelper'),
	DocumentRendererBase = require('../lib/base/DocumentRendererBase');

util.inherits(DocumentRenderer, DocumentRendererBase);

var SPECIAL_IDS = {
		$$head: '$$head',
		$$document: '$$document'
	},
	ERROR_CREATE_WRONG_ARGUMENTS = 'Tag name should be a string ' +
		'and attributes should be an object',
	ERROR_CREATE_WRONG_NAME = 'Component for tag "%s" not found',
	ERROR_CREATE_WRONG_ID = 'The ID is not specified or already used',
	TAG_NAMES = {
		TITLE: 'TITLE',
		HTML: 'HTML',
		HEAD: 'HEAD',
		BASE: 'BASE',
		STYLE: 'STYLE',
		SCRIPT: 'SCRIPT',
		NOSCRIPT: 'NOSCRIPT',
		META: 'META',
		LINK: 'LINK'
	},
	NODE_TYPES = {
		ELEMENT_NODE: 1,
		TEXT_NODE: 3,
		PROCESSING_INSTRUCTION_NODE: 7,
		COMMENT_NODE: 8
	},
	// http://www.w3.org/TR/2015/WD-uievents-20150319/#event-types-list
	NON_BUBBLING_EVENTS = {
		abort: true,
		blur: true,
		error: true,
		focus: true,
		load: true,
		mouseenter: true,
		mouseleave: true,
		resize: true,
		unload: true
	};

/**
 * Creates new instance of the document renderer.
 * @param {ServiceLocator} $serviceLocator Locator to resolve dependencies.
 * @constructor
 * @extends DocumentRendererBase
 */
function DocumentRenderer($serviceLocator) {
	DocumentRendererBase.call(this, $serviceLocator);
	this._componentInstances = {};
	this._componentElements = {};
	this._componentBindings = {};
	this._currentChangedStores = {};
	this._window = $serviceLocator.resolve('window');
	this._config = $serviceLocator.resolve('config');
	this._storeDispatcher = $serviceLocator.resolve('storeDispatcher');

	var self = this;

	this._eventBus.on('storeChanged', function (storeName) {
		self._currentChangedStores[storeName] = true;
		if (self._isStateChanging) {
			return;
		}
		self._updateStoreComponents();
	});
}

/**
 * Current application config.
 * @type {Object}
 * @private
 */
DocumentRenderer.prototype._config = null;

/**
 * Current store dispatcher.
 * @type {StoreDispatcher}
 * @protected
 */
DocumentRenderer.prototype._storeDispatcher = null;

/**
 * Current set of component instances by unique keys.
 * @type {Object}
 * @private
 */
DocumentRenderer.prototype._componentInstances = null;

/**
 * Current set of component elements by unique keys.
 * @type {Object}
 * @private
 */
DocumentRenderer.prototype._componentElements = null;

/**
 * Current set of component bindings by unique keys.
 * @type {Object}
 * @private
 */
DocumentRenderer.prototype._componentBindings = null;

/**
 * Current routing context.
 * @type {Object}
 * @private
 */
DocumentRenderer.prototype._currentRoutingContext = null;

/**
 * Current set of changed stores.
 * @type {Object}
 * @private
 */
DocumentRenderer.prototype._currentChangedStores = null;

/**
 * Current promise for rendered page.
 * @type {Promise}
 * @private
 */
DocumentRenderer.prototype._renderedPromise = null;

/**
 * Current state of updating components.
 * @type {boolean}
 * @private
 */
DocumentRenderer.prototype._isUpdating = false;

/**
 * Current awaiting routing.
 * @type {{state: Object, routingContext: Object}}
 * @private
 */
DocumentRenderer.prototype._awaitingRouting = null;

/**
 * Sets the initial state of the application.
 * @param {Object} state New state of application.
 * @param {Object} routingContext Routing context.
 * @returns {Promise} Promise for nothing.
 */
DocumentRenderer.prototype.initWithState = function (state, routingContext) {
	var self = this;
	return self._getPromiseForReadyState()
		.then(function () {
			self._currentRoutingContext = routingContext;
			return self._storeDispatcher.setState(state, routingContext);
		})
		.then(function () {
			return self._initialWrap();
		});
};

/**
 * Renders new state of application.
 * @param {Object} state New state of application.
 * @param {Object} routingContext Routing context.
 * @returns {Promise} Promise for nothing.
 */
DocumentRenderer.prototype.render = function (state, routingContext) {
	this._awaitingRouting = {
		state: state,
		routingContext: routingContext
	};
	if (this._isStateChanging) {
		return this._renderedPromise;
	}

	// we should set this flag to avoid "storeChanged"
	// event handling for now
	this._isStateChanging = true;

	var self = this;
	self._renderedPromise = this._getPromiseForReadyState()
		.then(function () {
			// and then we update all components of these stores in a batch.
			return self._updateStoreComponents();
		})
		.catch(function (reason) {
			self._eventBus.emit('error', reason);
		})
		.then(function () {
			self._isStateChanging = false;
		});

	return this._renderedPromise;
};

/**
 * Renders component into HTML element.
 * @param {Element} element HTML element of component
 * @param {Object?} renderingContext Rendering context for group rendering.
 */
DocumentRenderer.prototype.renderComponent =
	function (element, renderingContext) {
		var self = this;
		return this._getPromiseForReadyState()
			.then(function () {
				renderingContext = renderingContext ||
					self._createRenderingContext([]);

				var componentName = moduleHelper.getOriginalComponentName(
						element.tagName
					),
					hadChildren = element.hasChildNodes(),
					component = renderingContext.components[componentName],
					id = self._getId(element),
					instance = self._componentInstances[id];

				if (!component || !id ||
					renderingContext.renderedIds.hasOwnProperty(id)) {
					return;
				}

				renderingContext.renderedIds[id] = true;

				if (!instance) {
					component.constructor.prototype.$context =
						self._getComponentContext(component, element);
					instance = self._serviceLocator.resolveInstance(
						component.constructor, renderingContext.config
					);
					instance.$context = component.constructor.prototype.$context;
					self._componentInstances[id] = instance;
				}

				var eventArgs = {
					name: componentName,
					context: instance.$context
				};

				self._componentElements[id] = element;

				var startTime = Date.now();
				self._eventBus.emit('componentRender', eventArgs);

				return self._unbindAll(element, renderingContext)
					.catch(function (reason) {
						self._eventBus.emit('error', reason);
					})
					.then(function () {
						if (instance.$context.element !== element) {
							instance.$context = self._getComponentContext(
								component, element
							);
						}
						var renderMethod = moduleHelper.getMethodToInvoke(
							instance, 'render'
						);
						return moduleHelper.getSafePromise(renderMethod);
					})
					.then(function (dataContext) {
						return component.template.render(dataContext);
					})
					.catch(function (reason) {
						return self._handleRenderError(
							element, component, reason
						);
					})
					.then(function (html) {
						if (element.tagName === TAG_NAMES.HEAD) {
							self._mergeHead(element, html);
						} else {
							element.innerHTML = html;
						}
						var promises = self._findComponents(
							element, renderingContext
						)
							.map(function (innerComponent) {
								return self.renderComponent(
									innerComponent, renderingContext
								);
							});
						return Promise.all(promises);
					})
					.then(function () {
						eventArgs.time = Date.now() - startTime;
						self._eventBus.emit('componentRendered', eventArgs);
						return self._bindComponent(element);
					})
					.then(function () {
						if (!hadChildren) {
							return;
						}
						self._collectRenderingGarbage(renderingContext);
					})
					.catch(function (reason) {
						self._eventBus.emit('error', reason);
					});
			});
	};

/**
 * Gets component instance by ID.
 * @param {String} id Component ID.
 * @returns {Object} Component instance.
 */
DocumentRenderer.prototype.getComponentById = function (id) {
	return this._componentInstances[id] || null;
};

/**
 * Checks that every instance of component has element on the page and
 * removes all references to components removed from DOM.
 * @returns {Promise} Promise for nothing.
 */
DocumentRenderer.prototype.collectGarbage = function () {
	var self = this;
	return this._getPromiseForReadyState().
		then(function () {
			var promises = [];
			Object.keys(self._componentElements)
				.forEach(function (id) {
					if (SPECIAL_IDS.hasOwnProperty(id)) {
						return;
					}
					var element = self._window.document.getElementById(id);
					if (element) {
						return;
					}

					var promise = self._unbindComponent(self._componentElements[id])
						.then(function () {
							delete self._componentElements[id];
							delete self._componentInstances[id];
							delete self._componentBindings[id];
						});
					promises.push(promise);
				});
			return Promise.all(promises);
		});
};

/**
 * Creates and renders component element.
 * @param {String} tagName Name of HTML tag.
 * @param {Object} attributes Element attributes.
 * @returns {Promise<Element>} Promise for HTML element with rendered component.
 */
DocumentRenderer.prototype.createComponent = function (tagName, attributes) {
	if (typeof(tagName) !== 'string' || !attributes ||
		typeof(attributes) !== 'object') {
		return Promise.reject(
			new Error(ERROR_CREATE_WRONG_ARGUMENTS)
		);
	}

	var self = this;
	return this._getPromiseForReadyState()
		.then(function () {
			var components = self._componentLoader.getComponentsByNames(),
				componentName = moduleHelper.getOriginalComponentName(tagName);

			if (moduleHelper.isHeadComponent(componentName) ||
				moduleHelper.isDocumentComponent(componentName) ||
				!components.hasOwnProperty(componentName)) {
				return Promise.reject(
					new Error(util.format(ERROR_CREATE_WRONG_NAME, tagName))
				);
			}

			var safeTagName = moduleHelper.getTagNameForComponentName(componentName);

			var id = attributes[moduleHelper.ATTRIBUTE_ID];
			if (!id || self._componentInstances.hasOwnProperty(id)) {
				return Promise.reject(new Error(ERROR_CREATE_WRONG_ID));
			}

			var element = self._window.document.createElement(safeTagName);
			Object.keys(attributes)
				.forEach(function (attributeName) {
					element.setAttribute(attributeName, attributes[attributeName]);
				});

			return self.renderComponent(element)
				.then(function () {
					return element;
				});
		});
};

/**
 * Clears all references to removed components during rendering process.
 * @param {Object} renderingContext Context of rendering.
 * @private
 */
DocumentRenderer.prototype._collectRenderingGarbage =
	function (renderingContext) {
		var self = this;
		Object.keys(renderingContext.unboundIds)
			.forEach(function (id) {
				// this component has been rendered again and we do not need to
				// remove it.
				if (renderingContext.renderedIds.hasOwnProperty(id)) {
					return;
				}

				delete self._componentElements[id];
				delete self._componentInstances[id];
				delete self._componentBindings[id];
			});
	};

/**
 * Unbinds all event handlers from specified component and all it's descendants.
 * @param {Element} element Component HTML element.
 * @param {Object} renderingContext Context of rendering.
 * @returns {Promise} Promise for nothing.
 * @private
 */
DocumentRenderer.prototype._unbindAll = function (element, renderingContext) {
	var self = this,
		id = this._getId(element),
		promises = [];

	if (element.hasChildNodes()) {
		self._findComponents(element, renderingContext)
			.forEach(function (innerElement) {
				var id = self._getId(innerElement);
				if (renderingContext.unboundIds.hasOwnProperty(id)) {
					return;
				}
				renderingContext.unboundIds[id] = true;
				promises.push(self._unbindComponent(innerElement));
			});
	}

	if (!renderingContext.unboundIds.hasOwnProperty(id)) {
		promises.push(this._unbindComponent(element));
		renderingContext.unboundIds[id] = true;
	}

	return Promise.all(promises);
};

/**
 * Unbinds all event handlers from specified component.
 * @param {Element} element Component HTML element.
 * @returns {Promise} Promise for nothing.
 * @private
 */
DocumentRenderer.prototype._unbindComponent = function (element) {
	var id = this._getId(element),
		self = this,
		instance = this._componentInstances[id];
	if (!instance) {
		return Promise.resolve();
	}
	if (this._componentBindings.hasOwnProperty(id)) {
		Object.keys(this._componentBindings[id])
			.forEach(function (eventName) {
				element.removeEventListener(
					eventName,
					self._componentBindings[id][eventName].handler,
					NON_BUBBLING_EVENTS.hasOwnProperty(eventName)
				);
			});
		delete this._componentBindings[id];
	}
	var unbindMethod = moduleHelper.getMethodToInvoke(instance, 'unbind');
	return moduleHelper.getSafePromise(unbindMethod)
		.then(function () {
			self._eventBus.emit('componentUnbound', {
				element: element,
				id: !SPECIAL_IDS.hasOwnProperty(id) ? id : null
			});
		})
		.catch(function (reason) {
			self._eventBus.emit('error', reason);
		});
};

/**
 * Binds all required event handlers to component.
 * @param {Element} element Component HTML element.
 * @returns {Promise} Promise for nothing.
 * @private
 */
DocumentRenderer.prototype._bindComponent = function (element) {
	var id = this._getId(element),
		self = this,
		instance = this._componentInstances[id];
	if (!instance) {
		return Promise.resolve();
	}

	var bindMethod = moduleHelper.getMethodToInvoke(instance, 'bind');
	return moduleHelper.getSafePromise(bindMethod)
		.then(function (bindings) {
			if (!bindings || typeof(bindings) !== 'object') {
				self._eventBus.emit('componentBound', {
					element: element,
					id: !SPECIAL_IDS.hasOwnProperty(id) ? id : null
				});
				return;
			}
			self._componentBindings[id] = {};
			Object.keys(bindings)
				.forEach(function (eventName) {
					eventName = eventName.toLowerCase();
					if (self._componentBindings[id].hasOwnProperty(eventName)) {
						return;
					}
					var selectorHandlers = {};
					Object.keys(bindings[eventName])
						.forEach(function (selector) {
							var handler = bindings[eventName][selector];
							if (typeof(handler) !== 'function') {
								return;
							}
							selectorHandlers[selector] = handler.bind(instance);
						});
					self._componentBindings[id][eventName] = {
						handler: self._createBindingHandler(
							element, selectorHandlers
						),
						selectorHandlers: selectorHandlers
					};
					element.addEventListener(
						eventName,
						self._componentBindings[id][eventName].handler,
						NON_BUBBLING_EVENTS.hasOwnProperty(eventName)
					);
				});
			self._eventBus.emit('componentBound', {
				element: element,
				id: id
			});
		});
};

/**
 * Creates universal event handler for delegated events.
 * @param {Element} componentRoot Root element of component.
 * @param {Object} selectorHandlers Map of event handlers by CSS selectors.
 * @returns {Function} Universal event handler for delegated events.
 * @private
 */
DocumentRenderer.prototype._createBindingHandler =
	function (componentRoot, selectorHandlers) {
		var selectors = Object.keys(selectorHandlers);
		return function (event) {
			var dispatchedEvent = createCustomEvent(event, function () {
					return element;
				}),
				element = event.target,
				targetMatches = getMatchesMethod(element),
				isHandled = selectors.some(function (selector) {
					if (targetMatches(selector)) {
						selectorHandlers[selector](dispatchedEvent);
						return true;
					}
					return false;
				});
			if (isHandled || !event.bubbles) {
				return;
			}

			while(element.parentElement && element !== componentRoot) {
				element = element.parentElement;
				targetMatches = getMatchesMethod(element);
				for (var i = 0; i < selectors.length; i++) {
					if (!targetMatches(selectors[i])) {
						continue;
					}
					isHandled = true;
					selectorHandlers[selectors[i]](dispatchedEvent);
					break;
				}

				if (isHandled) {
					break;
				}
			}
		};
	};

/**
 * Finds all descendant components of specified component element.
 * @param {Element} element Root component HTML element to begin search with.
 * @param {Object} renderingContext Context of rendering.
 * @private
 */
DocumentRenderer.prototype._findComponents =
	function (element, renderingContext) {
		var components = [];
		renderingContext.componentTags
			.forEach(function (tag) {
				var nodes = element.getElementsByTagName(tag);
				for(var i = 0; i < nodes.length; i++) {
					components.push(nodes[i]);
				}
			});
		return components;
	};

/**
 * Handles error while rendering.
 * @param {Element} element Component HTML element.
 * @param {Object} component Component instance.
 * @param {Error} error Error to handle.
 * @returns {Promise<String>} Promise for HTML string.
 * @private
 */
DocumentRenderer.prototype._handleRenderError =
	function (element, component, error) {
		this._eventBus.emit('error', error);

		// do not corrupt existed HEAD when error occurs
		if (element.tagName === TAG_NAMES.HEAD) {
			return Promise.resolve('');
		}

		if (!this._config.isRelease && error instanceof Error) {
			return Promise.resolve(errorHelper.prettyPrint(
				error, this._window.navigator.userAgent
			));
		} else if (component.errorTemplate) {
			return component.errorTemplate.render(error);
		}

		return Promise.resolve('');
	};

/**
 * Updates all components that depend on current set of changed stores.
 * @returns {Promise} Promise for nothing.
 * @private
 */
DocumentRenderer.prototype._updateStoreComponents = function () {
	if (this._isUpdating) {
		return Promise.resolve();
	}

	var self = this;

	// if document component is changed we should reload the page
	var documentStore = this._window.document.documentElement.getAttribute(
		moduleHelper.ATTRIBUTE_STORE
	);
	if (this._currentChangedStores.hasOwnProperty(documentStore)) {
		var newLocation = this._currentRoutingContext.location.toString();
		if (newLocation === this._window.location.toString()) {
			this._window.location.reload();
			return Promise.resolve();
		}
		this._window.location.assign(newLocation);
		return Promise.resolve();
	}

	// if we have awaiting routing we should apply state to the stores
	if (this._awaitingRouting) {
		var components = this._componentLoader.getComponentsByNames(),
			changedByState = this._storeDispatcher.setState(
				this._awaitingRouting.state,
				this._awaitingRouting.routingContext
			);

		changedByState.forEach(function (name) {
			self._currentChangedStores[name] = true;
		});

		// we should update contexts of the stores with the new routing context
		this._currentRoutingContext = this._awaitingRouting.routingContext;
		Object.keys(this._componentInstances)
			.forEach(function (id) {
				var instance = self._componentInstances[id];
				instance.$context = self._getComponentContext(
					components[instance.$context.name],
					instance.$context.element
				);
			});
		this._awaitingRouting = null;
	}

	var changedStores = Object.keys(this._currentChangedStores);
	if (changedStores.length === 0) {
		return Promise.resolve();
	}
	this._currentChangedStores = {};

	var renderingContext = this._createRenderingContext(changedStores),
		promises = renderingContext.roots.map(function (root) {
			return self.renderComponent(root, renderingContext);
		});

	this._isUpdating = true;
	return Promise.all(promises)
		.catch(function (reason) {
			self._eventBus.emit('error', reason);
		})
		.then(function () {
			self._isUpdating = false;
			self._eventBus.emit('documentUpdated', changedStores);
			return self._updateStoreComponents();
		});
};

/**
 * Merges new and existed head elements and change only difference.
 * @param {Element} head HEAD DOM element.
 * @param {string} htmlText HTML of new HEAD element content.
 * @private
 */
/*jshint maxcomplexity:false */
DocumentRenderer.prototype._mergeHead = function (head, htmlText) {
	if (!htmlText) {
		return;
	}
	var self = this,
		newHead = this._window.document.createElement('head');
	newHead.innerHTML = htmlText;

	var map = this._getHeadMap(head.childNodes),
		current, i, key, oldKey, oldItem,
		sameMetaElements = {};

	for (i = 0; i < newHead.childNodes.length; i++) {
		current = newHead.childNodes[i];

		if (!map.hasOwnProperty(current.nodeName)) {
			map[current.nodeName] = {};
		}

		switch (current.nodeName) {
			// these elements can be only replaced
			case TAG_NAMES.TITLE:
			case TAG_NAMES.BASE:
			case TAG_NAMES.NOSCRIPT:
				key = this._getNodeKey(current);
				oldItem = head.getElementsByTagName(current.nodeName)[0];
				if (oldItem) {
					oldKey = this._getNodeKey(oldItem);
					head.replaceChild(current, oldItem);
				} else {
					head.appendChild(current);
				}
				// when we do replace or append current is removed from newHead
				// therefore we need to decrement index
				i--;
				break;

			// these elements can not be deleted from head
			// therefore we just add new elements that differs from existed
			case TAG_NAMES.STYLE:
			case TAG_NAMES.LINK:
			case TAG_NAMES.SCRIPT:
				key = self._getNodeKey(current);
				if (!map[current.nodeName].hasOwnProperty(key)) {
					head.appendChild(current);
					i--;
				}
				break;
			// meta and other elements can be deleted
			// but we should not delete and append same elements
			default:
				key = self._getNodeKey(current);
				if (map[current.nodeName].hasOwnProperty(key)) {
					sameMetaElements[key] = true;
				} else {
					head.appendChild(current);
					i--;
				}
				break;
		}
	}

	if (map.hasOwnProperty(TAG_NAMES.META)) {
		// remove meta tags which a not in a new head state
		Object.keys(map[TAG_NAMES.META])
			.forEach(function (metaKey) {
				if (sameMetaElements.hasOwnProperty(metaKey)) {
					return;
				}

				head.removeChild(map[TAG_NAMES.META][metaKey]);
			});
	}
};

/**
 * Gets map of all HEAD's elements.
 * @param {NodeList} headChildren Head children DOM nodes.
 * @returns {Object} Map of HEAD elements.
 * @private
 */
DocumentRenderer.prototype._getHeadMap = function (headChildren) {
	// Create map of <meta>, <link>, <style> and <script> tags
	// by unique keys that contain attributes and content
	var map = {},
		i, current,
		self = this;

	for (i = 0; i < headChildren.length; i++) {
		current = headChildren[i];
		if (!map.hasOwnProperty(current.nodeName)) {
			map[current.nodeName] = {};
		}
		map[current.nodeName][self._getNodeKey(current)] = current;
	}
	return map;
};

/**
 * Gets unique element key using element's attributes and its content.
 * @param {Node} node HTML element.
 * @returns {string} Unique key for element.
 * @private
 */
DocumentRenderer.prototype._getNodeKey = function (node) {
	var current, i,
		attributes = [];

	if (node.nodeType !== NODE_TYPES.ELEMENT_NODE) {
		return node.nodeValue || '';
	}

	if (node.hasAttributes()) {
		for (i = 0; i < node.attributes.length; i++) {
			current = node.attributes[i];
			attributes.push(current.name + '=' + current.value);
		}
	}

	return attributes
			.sort()
			.join('|') + '>' + node.textContent;
};

/**
 * Does initial wrapping for every component on the page.
 * @private
 */
DocumentRenderer.prototype._initialWrap = function () {
	var self = this,
		current, i, id, instance,
		components = this._componentLoader.getComponentsByNames(),
		bindPromises = [];

	Object.keys(components)
		.forEach(function (componentName) {
			var tagName = moduleHelper
					.getTagNameForComponentName(componentName),
				elements,
				constructor = components[componentName].constructor;

			if (moduleHelper.isDocumentComponent(componentName)) {
				elements = [self._window.document.documentElement];
			} else if (moduleHelper.isHeadComponent(componentName)) {
				elements = [self._window.document.head];
			} else {
				elements = self._window.document.getElementsByTagName(tagName);
			}

			for (i = 0; i < elements.length; i++) {
				current = elements[i];
				id = self._getId(current);
				if (!id) {
					continue;
				}

				constructor.prototype.$context = self._getComponentContext(
					components[componentName], current
				);
				instance = self._serviceLocator.resolveInstance(
					constructor, self._config
				);
				instance.$context = constructor.prototype.$context;
				self._componentElements[id] = current;
				self._componentInstances[id] = instance;
				// initialize the store of the component
				self._storeDispatcher.getStore(
					current.getAttribute(moduleHelper.ATTRIBUTE_STORE)
				);
				self._eventBus.emit('componentRendered', {
					name: componentName,
					attributes: instance.$context.attributes,
					context: instance.$context
				});
				bindPromises.push(self._bindComponent(current));
			}
		});

	return Promise.all(bindPromises)
		.then(function () {
			self._eventBus.emit('documentRendered', self._currentRoutingContext);
		});
};

/**
 * Gets component context using basic context.
 * @param {Object} component Component details.
 * @param {Element} element DOM element of component.
 * @returns {Object} Component context.
 * @private
 */
DocumentRenderer.prototype._getComponentContext =
	function (component, element) {
		var self = this,
			storeName = element.getAttribute(moduleHelper.ATTRIBUTE_STORE),
			componentContext = Object.create(this._currentRoutingContext);

		// initialize the store of the component
		this._storeDispatcher.getStore(storeName);

		Object.defineProperties(componentContext, {
			element: {
				value: element,
				enumerable: true
			},
			name: {
				get: function () {
					return component.name;
				},
				enumerable: true
			},
			attributes: {
				get: function () {
					return attributesToObject(element.attributes);
				},
				enumerable: true
			},
			getComponentById: {
				value: function (id) {
					return self.getComponentById(id);
				}
			},
			createComponent: {
				value: function (tagName, attributes) {
					return self.createComponent(tagName, attributes);
				}
			},
			collectGarbage: {
				value: function () {
					return self.collectGarbage();
				}
			},
			getStoreData: {
				value: function () {
					var currentStoreName = componentContext.element
						.getAttribute(moduleHelper.ATTRIBUTE_STORE);
					return self._storeDispatcher
						.getStoreData(currentStoreName);
				}
			},
			sendAction: {
				value: function (name, args) {
					var currentStoreName = componentContext.element
						.getAttribute(moduleHelper.ATTRIBUTE_STORE);
					return self._storeDispatcher
						.sendAction(currentStoreName, name, args);
				}
			},
			sendBroadcastAction: {
				value: function (name, args) {
					return self._storeDispatcher
						.sendBroadcastAction(name, args);
				}
			}
		});

		return componentContext;
	};

/**
 * Finds all rendering roots on page for all changed stores.
 * @param {Array} changedStoreNames List of store names which has been changed.
 * @returns {Array<Element>} HTML elements that are rendering roots.
 * @private
 */
DocumentRenderer.prototype._findRenderingRoots = function (changedStoreNames) {
	var self = this,
		headStore = this._window.document.head.getAttribute(
			moduleHelper.ATTRIBUTE_STORE
		),
		components = this._componentLoader.getComponentsByNames(),
		componentsElements = {},
		storeNamesSet = {},
		rootsSet = {},
		roots = [];

	// we should find all components and then looking for roots
	changedStoreNames
		.forEach(function (storeName) {
			storeNamesSet[storeName] = true;
			componentsElements[storeName] = self._window.document
				.querySelectorAll(
					'[' +
					moduleHelper.ATTRIBUTE_ID +
					']' +
					'[' +
					moduleHelper.ATTRIBUTE_STORE +
					'="' +
					storeName +
					'"]'
				);
		});

	if (components.hasOwnProperty(moduleHelper.HEAD_COMPONENT_NAME) &&
		storeNamesSet.hasOwnProperty(headStore)) {
		rootsSet[this._getId(this._window.document.head)] = true;
		roots.push(this._window.document.head);
	}

	changedStoreNames
		.forEach(function (storeName) {
			var current, currentId,
				lastRoot, lastRootId,
				currentStore, currentComponentName;

			for (var i = 0; i < componentsElements[storeName].length; i++) {
				current = componentsElements[storeName][i];
				currentId = componentsElements[storeName][i]
					.getAttribute(moduleHelper.ATTRIBUTE_ID);
				lastRoot = current;
				lastRootId = currentId;
				currentComponentName = moduleHelper.getOriginalComponentName(
					current.tagName
				);

				while (current.parentElement) {
					current = current.parentElement;
					currentId = self._getId(current);
					currentStore = current.getAttribute(
						moduleHelper.ATTRIBUTE_STORE
					);

					// store did not change state
					if (!currentStore ||
						!storeNamesSet.hasOwnProperty(currentStore)) {
						continue;
					}

					//// is not an active component
					if (!components.hasOwnProperty(currentComponentName)) {
						continue;
					}

					lastRoot = current;
					lastRootId = currentId;
				}
				if (rootsSet.hasOwnProperty(lastRootId)) {
					continue;
				}
				rootsSet[lastRootId] = true;
				roots.push(lastRoot);
			}
		});

	return roots;
};

/**
 * Creates rendering context.
 * @param {Array?} changedStores Names of changed stores.
 * @returns {{
 *   config: Object,
 *   renderedIds: {},
 *   unboundIds: {},
 *   isHeadRendered: Boolean,
 *   bindMethods: Array,
 *   routingContext: Object,
 *   components: Object,
 *   componentTags: Array,
 *   roots: Array.<Element>
 * }}
 * @private
 */
DocumentRenderer.prototype._createRenderingContext = function (changedStores) {
	var components = this._componentLoader.getComponentsByNames(),
		componentTags = Object.keys(components)
			.map(function (name) {
				return moduleHelper.getTagNameForComponentName(name);
			});
	return {
		config: this._config,
		renderedIds: {},
		unboundIds: {},
		isHeadRendered: false,
		bindMethods: [],
		routingContext: this._currentRoutingContext,
		components: components,
		componentTags: componentTags,
		roots: changedStores ? this._findRenderingRoots(changedStores) : []
	};
};

/**
 * Gets ID of the element.
 * @param {Element} element HTML element of component.
 * @returns {string} ID.
 */
DocumentRenderer.prototype._getId = function (element) {
	if (element === this._window.document.documentElement) {
		return SPECIAL_IDS.$$document;
	}
	if (element === this._window.document.head) {
		return SPECIAL_IDS.$$head;
	}
	return element.getAttribute(moduleHelper.ATTRIBUTE_ID);
};

/**
 * Converts NamedNodeMap of Attr items to key-value object map.
 * @param {NamedNodeMap} attributes List of Element attributes.
 * @returns {Object} Map of attribute values by names.
 */
function attributesToObject(attributes) {
	var result = {};
	for (var i = 0; i < attributes.length; i++) {
		result[attributes[i].name] = attributes[i].value;
	}
	return result;
}

/**
 * Gets cross-browser "matches" method for the element.
 * @param {Element} element HTML element.
 * @returns {Function} "matches" method.
 */
function getMatchesMethod(element) {
	var method =  (element.matches ||
		element.webkitMatchesSelector ||
		element.mozMatchesSelector ||
		element.oMatchesSelector ||
		element.msMatchesSelector);

	return method.bind(element);
}

/**
 * Creates imitation of original Event object but with specified currentTarget.
 * @param {Event} event Original event object.
 * @param {Function} currentTargetGetter Getter for currentTarget.
 * @returns {Event} Wrapped event.
 */
function createCustomEvent(event, currentTargetGetter) {
	var catEvent = Object.create(event),
		keys = [],
		properties = {};
	for(var key in event) {
		keys.push(key);
	}
	keys.forEach(function (key) {
		if (typeof(event[key]) === 'function') {
			properties[key] = {
				get: function () {
					return event[key].bind(event);
				}
			};
			return;
		}

		properties[key] = {
			get: function () {
				return event[key];
			},
			set: function (value) {
				event[key] = value;
			}
		};
	});

	properties.currentTarget = {
		get: currentTargetGetter
	};
	Object.defineProperties(catEvent, properties);
	Object.seal(catEvent);
	Object.freeze(catEvent);
	return catEvent;
}
},{"../lib/base/DocumentRendererBase":25,"../lib/helpers/errorHelper":28,"../lib/helpers/moduleHelper":29,"util":39}],13:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = Logger;

var LEVELS = {
	TRACE: 'trace',
	INFO: 'info',
	WARN: 'warn',
	ERROR: 'error',
	FATAL: 'fatal'
};

/**
 * Creates browser logger.
 * @param {Object|string} levels Levels to log.
 * @supported Chrome, Firefox>=2.0, Internet Explorer>=8, Opera, Safari.
 * @constructor
 */
function Logger(levels) {
	if (typeof (levels) === 'object') {
		this._levels = levels;
	}

	if (typeof(levels) === 'string') {
		this._levels = {};
		Object.keys(LEVELS)
			.forEach(function (level) {
				this._levels[LEVELS[level]] =
					(levels.search(LEVELS[level]) !== -1);
			}, this);
	}

	this.trace = this.trace.bind(this);
	this.info = this.info.bind(this);
	this.warn = this.warn.bind(this);
	this.error = this.error.bind(this);
	this.fatal = this.fatal.bind(this);
}

/**
 * Current levels of logging.
 * @type {Object}
 * @private
 */
Logger.prototype._levels = {
	trace: true,
	info: true,
	warn: true,
	error: true,
	fatal: true
};

/**
 * Logs trace message.
 * @param {string} message Trace message.
 */
Logger.prototype.trace = function (message) {
	if (!this._levels.trace) {
		return;
	}

	if (console.log) {
		console.log(message);
	}
};

/**
 * Logs info message.
 * @param {string} message Information message.
 */
Logger.prototype.info = function (message) {
	if (!this._levels.info) {
		return;
	}

	if (console.info) {
		console.info(message);
	}
};

/**
 * Logs warn message.
 * @param {string} message Warning message.
 */
Logger.prototype.warn = function (message) {
	if (!this._levels.warn) {
		return;
	}

	if (console.warn) {
		console.warn(message);
	}
};
/**
 * Logs error message.
 * @param {string|Error} error Error object or message.
 */
Logger.prototype.error = function (error) {
	if (!this._levels.error) {
		return;
	}

	writeError(error);
};

/**
 * Logs error message.
 * @param {string|Error} error Error object or message.
 */
Logger.prototype.fatal = function (error) {
	if (!this._levels.fatal) {
		return;
	}
	writeError(error);
};

/**
 * Writes error to console.
 * @param {Error|string} error Error to write.
 */
function writeError(error) {
	try {
		if (!(error instanceof Error)) {
			error = typeof(error) === 'string' ? new Error(error) : new Error();
		}
		if (console.error) {
			console.error(error);
		}
	} catch (e) {
		writeError(e);
	}
}
},{}],14:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = RequestRouter;

var util = require('util'),
	URI = require('catberry-uri').URI;

var MOUSE_KEYS = {
		LEFT: 0,
		MIDDLE: 1
	},

	HREF_ATTRIBUTE_NAME = 'href',
	TARGET_ATTRIBUTE_NAME = 'target',
	A_TAG_NAME = 'A',
	BODY_TAG_NAME = 'BODY';

/**
 * Creates new instance of the browser request router.
 * @param {ServiceLocator} $serviceLocator Service locator to resolve services.
 * @constructor
 */
function RequestRouter($serviceLocator) {
	this._eventBus = $serviceLocator.resolve('eventBus');
	this._window = $serviceLocator.resolve('window');
	this._documentRenderer = $serviceLocator.resolve('documentRenderer');
	this._stateProvider = $serviceLocator.resolve('stateProvider');
	this._contextFactory = $serviceLocator.resolve('contextFactory');

	this._isHistorySupported = this._window.history &&
		this._window.history.pushState instanceof Function;
	var self = this;

	// add event handlers
	self._wrapDocument();

	// set initial state from current URI
	this._changeState(new URI(this._window.location.toString()))
		.catch(function (reason) {
			self._handleError(reason);
		});
}

/**
 * Current initialization flag.
 * @type {boolean}
 * @private
 */
RequestRouter.prototype._isStateInitialized = false;

/**
 * Current referrer.
 * @type {URI}
 * @private
 */
RequestRouter.prototype._referrer = '';

/**
 * Current location.
 * @type {URI}
 * @private
 */
RequestRouter.prototype._location = null;

/**
 * Current event bus.
 * @type {EventEmitter}
 * @private
 */
RequestRouter.prototype._eventBus = null;

/**
 * Current context factory.
 * @type {ContextFactory}
 * @private
 */
RequestRouter.prototype._contextFactory = null;

/**
 * Current state provider.
 * @type {StateProvider}
 * @private
 */
RequestRouter.prototype._stateProvider = null;

/**
 * Current document renderer.
 * @type {DocumentRenderer}
 * @private
 */
RequestRouter.prototype._documentRenderer = null;

/**
 * Current browser window.
 * @type {Window}
 * @private
 */
RequestRouter.prototype._window = null;

/**
 * True if current browser supports history API.
 * @type {boolean}
 * @private
 */
RequestRouter.prototype._isHistorySupported = false;

/**
 * Routes browser render request.
 * @returns {Promise} Promise for nothing.
 */
RequestRouter.prototype.route = function () {
	var self = this;
	// because now location was not change yet and
	// different browsers handle `popstate` differently
	// we need to do route in next iteration of event loop
	return Promise.resolve()
		.then(function () {
			var newLocation = new URI(self._window.location.toString()),
				newAuthority = newLocation.authority ?
					newLocation.authority.toString() : null,
				currentAuthority = self._location.authority ?
					self._location.authority.toString() : null;

			if (newLocation.scheme !== self._location.scheme ||
				newAuthority !== currentAuthority) {
				return;
			}

			// if only URI fragment is changed
			var newQuery = newLocation.query ?
					newLocation.query.toString() : null,
				currentQuery = self._location.query ?
					self._location.query.toString() : null;
			if (newLocation.path === self._location.path &&
				newQuery === currentQuery) {
				self._location = newLocation;
				return;
			}
			return self._changeState(newLocation);
		});
};

/**
 * Sets application state to specified URI.
 * @param {string} locationString URI to go.
 * @returns {Promise} Promise for nothing.
 */
RequestRouter.prototype.go = function (locationString) {
	var self = this;
	return Promise.resolve()
		.then(function () {
			var location = new URI(locationString);
			location = location.resolveRelative(self._location);
			locationString = location.toString();

			var currentAuthority = self._location.authority ?
					self._location.authority.toString() : null,
				newAuthority = location.authority ?
					location.authority.toString() : null;

			// we must check if this is an external link before map URI
			// to internal application state
			if (!self._isHistorySupported ||
				location.scheme !== self._location.scheme ||
				newAuthority !== currentAuthority) {
				self._window.location.assign(locationString);
				return;
			}

			var state = self._stateProvider.getStateByUri(location);
			if (!state) {
				self._window.location.assign(locationString);
				return;
			}

			self._window.history.pushState(state, '', locationString);
			return self.route();
		});
};

/**
 * Changes current application state with new location.
 * @param {URI} newLocation New location.
 * @returns {Promise} Promise for nothing.
 * @private
 */
RequestRouter.prototype._changeState = function (newLocation) {
	var self = this;
	return Promise.resolve()
		.then(function () {
			self._location = newLocation;
			var state = self._stateProvider.getStateByUri(newLocation),
				routingContext = self._contextFactory.create({
					referrer: self._referrer || self._window.document.referrer,
					location: self._location,
					userAgent: self._window.navigator.userAgent
				});

			if (!self._isStateInitialized) {
				self._isStateInitialized = true;
				return self._documentRenderer.initWithState(
					state, routingContext
				);
			}

			if (state === null) {
				window.location.reload();
				return;
			}

			return self._documentRenderer
				.render(state, routingContext);
		})
		.then(function () {
			self._referrer = self._location;
		});
};

/**
 * Wraps document with required events to route requests.
 * @private
 */
RequestRouter.prototype._wrapDocument = function () {
	var self = this;

	if (!this._isHistorySupported) {
		return;
	}

	this._window.addEventListener('popstate', function () {
		self.route().catch(self._handleError.bind(self));
	});

	this._window.document.body.addEventListener('click', function (event) {
		if (event.defaultPrevented) {
			return;
		}
		if (event.target.tagName === A_TAG_NAME) {
			self._linkClickHandler(event, event.target);
		} else {
			var link = closestLink(event.target);
			if (!link) {
				return;
			}
			self._linkClickHandler(event, link);
		}
	});
};

/**
 * Handles link click on the page.
 * @param {Event} event Event-related object.
 * @param {Element} element Link element.
 * @private
 */
RequestRouter.prototype._linkClickHandler = function (event, element) {
	var targetAttribute = element.getAttribute(TARGET_ATTRIBUTE_NAME);
	if (targetAttribute) {
		return;
	}

	// if middle mouse button was clicked
	if (event.button === MOUSE_KEYS.MIDDLE) {
		return;
	}

	var locationString = element.getAttribute(HREF_ATTRIBUTE_NAME);
	if (!locationString) {
		return;
	}
	if (locationString[0] === '#') {
		return;
	}

	event.preventDefault();
	this.go(locationString)
		.catch(this._handleError.bind(this));
};

/**
 * Handles all errors.
 * @param {Error} error Error to handle.
 * @private
 */
RequestRouter.prototype._handleError = function (error) {
	this._eventBus.emit('error', error);
};

/**
 * Finds the closest ascending "A" element node.
 * @param {Node} element DOM element.
 * @returns {Node|null} The closest "A" element or null.
 */
function closestLink(element) {
	while(element && element.nodeName !== A_TAG_NAME &&
		element.nodeName !== BODY_TAG_NAME) {
		element = element.parentNode;
	}
	return element && element.nodeName === A_TAG_NAME ? element : null;
}
},{"catberry-uri":45,"util":39}],15:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = ComponentLoader;

var moduleHelper = require('../../lib/helpers/moduleHelper'),
	util = require('util'),
	LoaderBase = require('../../lib/base/LoaderBase');

util.inherits(ComponentLoader, LoaderBase);

/**
 * Creates new instance of the component loader.
 * @param {ServiceLocator} $serviceLocator Locator to resolve dependencies.
 * @constructor
 * @extends LoaderBase
 */
function ComponentLoader($serviceLocator) {
	this._serviceLocator = $serviceLocator;
	this._eventBus = $serviceLocator.resolve('eventBus');
	this._templateProvider = $serviceLocator.resolve('templateProvider');
	LoaderBase.call(this, $serviceLocator.resolveAll('componentTransform'));
}

/**
 * Current event bus.
 * @type {EventEmitter}
 * @private
 */
ComponentLoader.prototype._eventBus = null;

/**
 * Current service locator.
 * @type {ServiceLocator}
 * @private
 */
ComponentLoader.prototype._serviceLocator = null;

/**
 * Current template provider.
 * @type {TemplateProvider}
 * @private
 */
ComponentLoader.prototype._templateProvider = null;

/**
 * Current map of loaded components by names.
 * @type {Object} Map of components by names.
 * @private
 */
ComponentLoader.prototype._loadedComponents = null;

/**
 * Loads components when it is in a browser.
 * @returns {Promise} Promise for nothing.
 */
ComponentLoader.prototype.load = function () {
	if (this._loadedComponents) {
		return Promise.resolve(this._loadedComponents);
	}

	this._loadedComponents = {};

	var self = this;
	return Promise.resolve()
		.then(function () {
			var components = self._serviceLocator.resolveAll('component'),
				componentPromises = [];

			// the list is a stack, we should reverse it
			components.forEach(function (component) {
				componentPromises.unshift(
					self._processComponent(component)
				);
			});
			return Promise.all(componentPromises);
		})
		.then(function (components) {
			components.forEach(function (component) {
				if (!component || typeof(component) !== 'object') {
					return;
				}
				self._loadedComponents[component.name] = component;
			});
			self._eventBus.emit('allComponentsLoaded', components);
			return self._loadedComponents;
		});
};

/**
 * Processes component and apply required operations.
 * @param {Object} componentDetails Loaded component details.
 * @returns {Object} Component object.
 * @private
 */
ComponentLoader.prototype._processComponent = function (componentDetails) {
	var self = this,
		component = Object.create(componentDetails);

	return this._applyTransforms(component)
		.then(function (transformed) {
			component = transformed;
			self._templateProvider.registerCompiled(
				component.name, component.templateSource
			);
			component.template = {
				render: function (dataContext) {
					return self._templateProvider.render(
						component.name, dataContext
					);
				}
			};
			if (typeof(component.errorTemplateSource) === 'string') {
				var errorTemplateName = moduleHelper.getNameForErrorTemplate(
					component.name
				);
				self._templateProvider.registerCompiled(
					errorTemplateName, component.errorTemplateSource
				);
				component.errorTemplate = {
					render: function (dataContext) {
						return self._templateProvider.render(
							errorTemplateName, dataContext
						);
					}
				};
			}
			self._eventBus.emit('componentLoaded', component);
			return component;
		})
		.catch(function (reason) {
			self._eventBus.emit('error', reason);
			return null;
		});
};

/**
 * Gets map of components by names.
 * @returns {Object} Map of components by names.
 */
ComponentLoader.prototype.getComponentsByNames = function () {
	return this._loadedComponents || {};
};
},{"../../lib/base/LoaderBase":26,"../../lib/helpers/moduleHelper":29,"util":39}],16:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = StoreLoader;

var moduleHelper = require('../../lib/helpers/moduleHelper'),
	util = require('util'),
	LoaderBase = require('../../lib/base/LoaderBase');

util.inherits(StoreLoader, LoaderBase);

/**
 * Creates instance of the store loader.
 * @param {ServiceLocator} $serviceLocator Locator to resolve stores.
 * @constructor
 * @extends LoaderBase
 */
function StoreLoader($serviceLocator) {
	this._serviceLocator = $serviceLocator;
	this._eventBus = $serviceLocator.resolve('eventBus');
	LoaderBase.call(this, $serviceLocator.resolveAll('storeTransform'));
}

/**
 * Current event bus.
 * @type {EventEmitter}
 * @private
 */
StoreLoader.prototype._eventBus = null;

/**
 * Current service locator.
 * @type {ServiceLocator}
 * @private
 */
StoreLoader.prototype._serviceLocator = null;

/**
 * Current set of loaded stores.
 * @type {Object}
 * @private
 */
StoreLoader.prototype._loadedStores = null;

/**
 * Loads all stores when it is in a browser.
 * @returns {Promise} Promise for nothing.
 */
StoreLoader.prototype.load = function () {
	if (this._loadedStores) {
		return Promise.resolve(this._loadedStores);
	}

	this._loadedStores = {};
	var self = this;

	return Promise.resolve()
		.then(function () {
			var stores = self._serviceLocator.resolveAll('store'),
				storePromises = [];

			// the list is a stack, we should reverse it
			stores.forEach(function (store) {
				storePromises.unshift(
					self._getStore(store)
				);
			});

			return Promise.all(storePromises);
		})
		.then(function (stores) {
			stores.forEach(function (store) {
				if (!store || typeof(store) !== 'object') {
					return;
				}
				self._loadedStores[store.name] = store;
			});
			self._eventBus.emit('allStoresLoaded', self._loadedStores);
			return Promise.resolve(self._loadedStores);
		});
};

/**
 * Gets the store from store details.
 * @param {Object} storeDetails Store details.
 * @returns {Promise<Object>} Promise for store.
 * @private
 */
StoreLoader.prototype._getStore = function (storeDetails) {
	var self = this;
	return this._applyTransforms(storeDetails)
		.then(function (transformed) {
			self._eventBus.emit('storeLoaded', transformed);
			return transformed;
		})
		.catch(function (reason) {
			self._eventBus.emit('error', reason);
			return null;
		});
};

/**
 * Gets stores map by names.
 * @returns {Object} Map of stores by names.
 */
StoreLoader.prototype.getStoresByNames = function () {
	return this._loadedStores || {};
};
},{"../../lib/base/LoaderBase":26,"../../lib/helpers/moduleHelper":29,"util":39}],17:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = ModuleApiProvider;

var util = require('util'),
	propertyHelper = require('../../lib/helpers/propertyHelper'),
	ModuleApiProviderBase = require('../../lib/base/ModuleApiProviderBase'),
	moduleHelper = require('../../lib/helpers/moduleHelper');

util.inherits(ModuleApiProvider, ModuleApiProviderBase);

/**
 * Creates new instance of the module API provider.
 * @param {ServiceLocator} $serviceLocator Service locator
 * to resolve dependencies.
 * @constructor
 * @extends ModuleApiProviderBase
 */
function ModuleApiProvider($serviceLocator) {
	ModuleApiProviderBase.call(this, $serviceLocator);
	propertyHelper.defineReadOnly(this, 'isBrowser', true);
	propertyHelper.defineReadOnly(this, 'isServer', false);
}

/**
 * Reloads the page for handling "not found" error.
 * @returns {Promise} Promise for nothing.
 */
ModuleApiProvider.prototype.notFound = function () {
	var window = this.locator.resolve('window');
	window.location.reload();
	return Promise.resolve();
};

/**
 * Redirects current page to specified URI.
 * @param {string} uriString URI to redirect.
 * @returns {Promise} Promise for nothing.
 */
ModuleApiProvider.prototype.redirect = function (uriString) {
	var requestRouter = this.locator.resolve('requestRouter');
	return requestRouter.go(uriString);
};

/**
 * Clears current location URI's fragment.
 * @returns {Promise} Promise for nothing.
 */
ModuleApiProvider.prototype.clearFragment = function () {
	var window = this.locator.resolve('window'),
		position = window.document.body.scrollTop;
	window.location.hash = '';
	window.document.body.scrollTop = position;
	return Promise.resolve();
};
},{"../../lib/base/ModuleApiProviderBase":27,"../../lib/helpers/moduleHelper":29,"../../lib/helpers/propertyHelper":30,"util":39}],18:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = require('./lib/Bootstrapper');

},{"./lib/Bootstrapper":62}],19:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = ContextFactory;

var URI = require('catberry-uri').URI,
	propertyHelper = require('./helpers/propertyHelper');

/**
 * Creates new instance of the context factory.
 * @param {ServiceLocator} $serviceLocator Locator to resolve dependencies.
 * @constructor
 */
function ContextFactory($serviceLocator) {
	this._serviceLocator = $serviceLocator;
}

/**
 * Current service locator.
 * @type {ServiceLocator}
 * @private
 */
ContextFactory.prototype._serviceLocator = null;

/**
 * Creates new context for modules.
 * @param {Object} additional Additional parameters.
 * @param {URI} additional.referrer Current referrer.
 * @param {URI} additional.location Current location.
 * @param {String} additional.userAgent Current user agent.
 */
ContextFactory.prototype.create = function (additional) {
	var apiProvider = this._serviceLocator.resolve('moduleApiProvider'),
		context = Object.create(apiProvider);
	Object.keys(additional)
		.forEach(function (key) {
			propertyHelper.defineReadOnly(context, key, additional[key]);
		});
	return context;
};
},{"./helpers/propertyHelper":30,"catberry-uri":45}],20:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = SerialWrapper;

var events = require('events');

var ERROR_NO_SUCH_METHOD = 'There is no such registered method';

/**
 * Creates new instance of the serial wrapper for promises.
 * @constructor
 */
function SerialWrapper() {
	this._emitter = new events.EventEmitter();
	this._emitter.setMaxListeners(0);
	this._toInvoke = {};
	this._inProgress = {};
}

/**
 * Current event emitter.
 * @type {EventEmitter}
 * @private
 */
SerialWrapper.prototype._emitter = null;

/**
 * Current set of named methods to invoke.
 * @type {Object}
 * @private
 */
SerialWrapper.prototype._toInvoke = null;

/**
 * Current set of flags if the method is in progress.
 * @type {Object}
 * @private
 */
SerialWrapper.prototype._inProgress = null;

/**
 * Adds method to the set.
 * @param {String} name Method name.
 * @param {Function} toInvoke Function that returns promise.
 */
SerialWrapper.prototype.add = function (name, toInvoke) {
	this._toInvoke[name] = toInvoke;
};

/**
 * Returns true if method with such name was registered to the set.
 * @param {String} name Name of method.
 * @returns {boolean} True if method name is registered.
 */
SerialWrapper.prototype.isRegistered = function (name) {
	return typeof(this._toInvoke[name]) === 'function';
};

/**
 * Invokes method without concurrency.
 * @param {String} name Method name.
 * @returns {Promise<Object>} Promise for result.
 */
SerialWrapper.prototype.invoke = function (name) {
	var self = this;

	if (!this.isRegistered(name)) {
		return Promise.reject(new Error(ERROR_NO_SUCH_METHOD));
	}

	if (this._inProgress[name]) {
		return new Promise (function (fulfill, reject) {
			self._emitter.once(name, fulfill);
			self._emitter.once(name + '--error', reject);
		});
	}

	this._inProgress[name] = true;
	this._toInvoke[name]()
		.then(function (result) {
			self._emitter.emit(name, result);
			self._inProgress[name] = null;
		})
		.catch(function (reason) {
			self._emitter.emit(name + '--error', reason);
			self._inProgress[name] = null;
		});

	return this.invoke(name);
};
},{"events":35}],21:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = StoreDispatcher;

var util = require('util'),
	SerialWrapper = require('./SerialWrapper'),
	moduleHelper = require('./helpers/moduleHelper');

var ERROR_STORE_NOT_FOUND = 'Store "%s" not found',
	ERROR_STATE = 'State should be set before any request',
	DEFAULT_LIFETIME = 60000;

/**
 * Creates new instance of store dispatcher.
 * @param {ServiceLocator} $serviceLocator Locator to resolve dependencies.
 * @param {StoreLoader} $storeLoader Store loader to load stores.
 * @param {EventEmitter} $eventBus Event bus to emit events.
 * @constructor
 */
function StoreDispatcher($serviceLocator, $storeLoader, $eventBus) {
	this._serviceLocator = $serviceLocator;
	this._storeLoader = $storeLoader;
	this._eventBus = $eventBus;
	this._storeInstances = {};
	this._lastData = {};
	this._dependencies = {};
	this._serialWrapper = new SerialWrapper();
}

/**
 * Current service locator.
 * @type {ServiceLocator}
 * @private
 */
StoreDispatcher.prototype._serviceLocator = null;

/**
 * Current event bus.
 * @type {EventEmitter}
 * @private
 */
StoreDispatcher.prototype._eventBus = null;

/**
 * Current store loader.
 * @type {StoreLoader}
 * @private
 */
StoreDispatcher.prototype._storeLoader = null;

/**
 * Current map of all store instances.
 * @type {null}
 * @private
 */
StoreDispatcher.prototype._storeInstances = null;

/**
 * Current map of last data for each store.
 * @type {Object}
 * @private
 */
StoreDispatcher.prototype._lastData = null;

/**
 * Current map of last state of store dispatcher.
 * @type {Object}
 * @private
 */
StoreDispatcher.prototype._lastState = null;

/**
 * Current serial wrapper.
 * @type {SerialWrapper}
 * @private
 */
StoreDispatcher.prototype._serialWrapper = null;

/**
 * Current basic context for all store contexts.
 * @type {Object}
 * @private
 */
StoreDispatcher.prototype._currentBasicContext = null;

/**
 * Current set of store dependency graph.
 * @type {Object}
 * @private
 */
StoreDispatcher.prototype._dependencies = null;

/**
 * Gets store data and creates store instance if required.
 * @param {String} storeName Name of store.
 * @returns {Object} Store's data.
 */
StoreDispatcher.prototype.getStoreData = function (storeName) {
	if (!this._lastState) {
		return Promise.reject(new Error(ERROR_STATE));
	}
	if (typeof(storeName) !== 'string') {
		return Promise.resolve(null);
	}
	if (this._lastData.hasOwnProperty(storeName)) {
		var existTime = Date.now() - this._lastData[storeName].createdAt;
		if (existTime <= this._lastData[storeName].lifetime) {
			return Promise.resolve(this._lastData[storeName].data);
		}
		delete this._lastData[storeName];
	}
	var self = this,
		lifetime = DEFAULT_LIFETIME;
	self._eventBus.emit('storeDataLoad', {name: storeName});
	var store = this.getStore(storeName);
	if (!store) {
		return Promise.reject(new Error(
				util.format(ERROR_STORE_NOT_FOUND, storeName))
		);
	}
	if (typeof(store.$lifetime) === 'number') {
		lifetime = store.$lifetime;
	}
	return self._serialWrapper.invoke(storeName)
		.then(function (data) {
			self._lastData[storeName] = {
				data: data,
				lifetime: lifetime,
				createdAt: Date.now()
			};
			self._eventBus.emit('storeDataLoaded', {
				name: storeName,
				data: data,
				lifetime: lifetime
			});
			return data;
		});
};

/**
 * Sends action to specified store and resolves promises in serial mode.
 * @param {String} storeName Name of the store.
 * @param {String} actionName Name of the action.
 * @param {Object} args Action arguments.
 * @returns {Promise<*>} Promise for action handling result.
 */
StoreDispatcher.prototype.sendAction = function (storeName, actionName, args) {
	if (!this._lastState) {
		return Promise.reject(new Error(ERROR_STATE));
	}
	var self = this,
		actionDetails = {
			storeName: storeName,
			actionName: actionName,
			args: args
		};
	this._eventBus.emit('actionSend', actionDetails);
	var store = this.getStore(storeName);
	if (!store) {
		return Promise.reject(new Error(
			util.format(ERROR_STORE_NOT_FOUND, storeName))
		);
	}
	var handleMethod = moduleHelper.getMethodToInvoke(
		store, 'handle', actionName
	);
	return moduleHelper.getSafePromise(function () {
		return handleMethod(args);
	})
		.then(function (result) {
			self._eventBus.emit('actionSent', actionDetails);
			return result;
		});
};

/**
 * Sends action to every store that has handle method for such action.
 * @param {String} actionName Name of the action.
 * @param {Object} arg Action arguments.
 * @returns {Promise<Array<*>>} Promise for the action handling result.
 */
StoreDispatcher.prototype.sendBroadcastAction = function (actionName, arg) {
	var promises = [],
		self = this,
		storesByNames = this._storeLoader.getStoresByNames(),
		methodName = moduleHelper.getCamelCaseName('handle', actionName);
	Object.keys(storesByNames)
		.forEach(function (storeName) {
			var store = storesByNames[storeName],
				protoMethod = store.constructor.prototype[methodName];
			if (typeof(protoMethod) !== 'function') {
				return;
			}
			var sendActionPromise = self.sendAction(
				store.name, actionName,  arg
			);
			promises.push(sendActionPromise);
		});
	return Promise.all(promises);
};

/**
 * Sets new state to store dispatcher and invokes "changed" method for all
 * stores which state have been changed.
 * @param {Object} parameters Map of new parameters.
 * @param {Object} basicContext Basic context for all stores.
 * @returns {Array<String>} Names of stores that have been changed.
 */
StoreDispatcher.prototype.setState = function (parameters, basicContext) {
	parameters = parameters || {};
	if (!this._lastState) {
		this._currentBasicContext = basicContext;
		this._lastState = parameters;
		return [];
	}

	// some store's parameters can be removed since last time
	var self = this,
		changed = {};

	Object.keys(this._lastState)
		.filter(function (storeName) {
			return !parameters.hasOwnProperty(storeName);
		})
		.forEach(function (name) {
			changed[name] = true;
		});

	Object.keys(parameters)
		.forEach(function (storeName) {
			// new parameters were set for store
			if (!self._lastState.hasOwnProperty(storeName)) {
				changed[storeName] = true;
				return;
			}

			// new and last parameters has different values
			var lastParameterNames =
					Object.keys(self._lastState[storeName]),
				currentParameterNames =
					Object.keys(parameters[storeName]);

			if (currentParameterNames.length !==
				lastParameterNames.length) {
				changed[storeName] = true;
				return;
			}

			currentParameterNames.every(function (parameterName) {
				if (parameters[storeName][parameterName] !==
					self._lastState[storeName][parameterName]) {
					changed[storeName] = true;
					return false;
				}
				return true;
			});
		});

	this._lastState = parameters;
	if (this._currentBasicContext !== basicContext) {
		this._currentBasicContext = basicContext;
		Object.keys(this._storeInstances)
			.forEach(function (storeName) {
				self._storeInstances[storeName].$context =
					self._getStoreContext(storeName);
			});
	}

	var changedStoreNames = {};
	Object.keys(changed)
		.forEach(function (storeName) {
			var store = self.getStore(storeName);
			if (!store) {
				return;
			}
			store.$context.changed()
				.forEach(function (name) {
					changedStoreNames[name] = true;
				});
		});

	this._eventBus.emit('stateChanged', {
		oldState: this._lastState,
		newState: parameters
	});
	return Object.keys(changedStoreNames);
};

/**
 * Gets context for store using component's context as a prototype.
 * @param {String} storeName Name of store.
 * @returns {Object} Store context.
 * @private
 */
StoreDispatcher.prototype._getStoreContext = function (storeName) {
	var self = this,
		storeContext = Object.create(this._currentBasicContext);
	storeContext.name = storeName;
	storeContext.state = this._lastState[storeName] || {};
	storeContext.changed = function () {
		var walked = {},
			current,
			toChange = [storeName];

		while (toChange.length > 0) {
			current = toChange.shift();
			if (walked.hasOwnProperty(current)) {
				continue;
			}
			walked[current] = true;
			if (self._dependencies.hasOwnProperty(current)) {
				toChange = toChange.concat(
					Object.keys(self._dependencies[current])
				);
			}
			delete self._lastData[current];
			self._eventBus.emit('storeChanged', current);
		}
		return Object.keys(walked);
	};
	storeContext.getStoreData = function (sourceStoreName) {
		if (sourceStoreName === storeName) {
			return Promise.resolve(null);
		}
		return self.getStoreData(sourceStoreName);
	};
	storeContext.setDependency = function (name) {
		if (!self._dependencies.hasOwnProperty(name)) {
			self._dependencies[name] = {};
		}
		self._dependencies[name][storeName] = true;
	};
	storeContext.unsetDependency = function (name) {
		if (!self._dependencies.hasOwnProperty(name)) {
			return;
		}
		delete self._dependencies[name][storeName];
	};
	storeContext.sendAction = function (storeName, name, args) {
		return self.sendAction(storeName, name, args);
	};
	storeContext.sendBroadcastAction = function (name, args) {
		return self.sendBroadcastAction(name, args);
	};

	return storeContext;
};

/**
 * Gets store instance and creates it if required.
 * @param {String} storeName Name of store.
 * @returns {Promise<Object>} Promise for store.
 */
StoreDispatcher.prototype.getStore = function (storeName) {
	if (!storeName) {
		return null;
	}
	var store = this._storeInstances[storeName];
	if (store) {
		return store;
	}
	var self = this;

	var stores = self._storeLoader.getStoresByNames(),
		config = self._serviceLocator.resolve('config');
	if (!stores.hasOwnProperty(storeName)) {
		return null;
	}

	var constructor = stores[storeName].constructor;
	constructor.prototype.$context = self._getStoreContext(storeName);
	self._storeInstances[storeName] = self._serviceLocator
		.resolveInstance(constructor, config);
	self._storeInstances[storeName].$context = constructor.prototype.$context;

	self._serialWrapper.add(storeName, function () {
		var loadMethod = moduleHelper.getMethodToInvoke(
			self._storeInstances[storeName], 'load'
		);
		return moduleHelper.getSafePromise(loadMethod);
	});
	return self._storeInstances[storeName];
};
},{"./SerialWrapper":20,"./helpers/moduleHelper":29,"util":39}],22:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = BootstrapperBase;

var util = require('util'),
	moduleHelper = require('../helpers/moduleHelper'),
	uhr = require('catberry-uhr'),
	Promise = require('promise'),
	StateProvider = require('../providers/StateProvider'),
	StoreLoader = require('../loaders/StoreLoader'),
	ComponentLoader = require('../loaders/ComponentLoader'),
	DocumentRenderer = require('../DocumentRenderer'),
	RequestRouter = require('../RequestRouter'),
	ModuleApiProviderBase = require('../base/ModuleApiProviderBase'),
	ContextFactory = require('../ContextFactory'),
	EventEmitter = require('events').EventEmitter;

var INFO_COMPONENT_LOADED = 'Component "%s" loaded',
	INFO_STORE_LOADED = 'Store "%s" loaded',
	INFO_ALL_STORES_LOADED = 'All stores loaded',
	INFO_ALL_COMPONENTS_LOADED = 'All components loaded',
	INFO_DOCUMENT_RENDERED = 'Document rendered for URI %s',
	TRACE_RENDER_COMPONENT = 'Component "%s%s" is being rendered...',
	TIMESTAMP_FORMAT = ' (%d ms)',
	TRACE_COMPONENT_RENDERED = 'Component "%s%s" rendered%s';

/**
 * Creates new instance of base Catberry bootstrapper.
 * @param {Function} catberryConstructor Constructor
 * of the Catberry's main module.
 * @constructor
 */
function BootstrapperBase(catberryConstructor) {
	this._catberryConstructor = catberryConstructor;
}

/**
 * Current constructor of the Catberry's main module.
 * @type {Function}
 * @private
 */
BootstrapperBase.prototype._catberryConstructor = null;

/**
 * Creates new full-configured instance of the Catberry application.
 * @param {Object?} configObject Configuration object.
 * @returns {Catberry} Catberry application instance.
 */
BootstrapperBase.prototype.create = function (configObject) {
	var currentConfig = configObject || {},
		catberry = new this._catberryConstructor();

	this.configure(currentConfig, catberry.locator);
	catberry.events = catberry.locator.resolveInstance(ModuleApiProviderBase);
	return catberry;
};

/**
 * Configures locator with all required type registrations.
 * @param {Object} configObject Configuration object.
 * @param {ServiceLocator} locator Service locator to configure.
 */
BootstrapperBase.prototype.configure = function (configObject, locator) {
	var eventBus = new EventEmitter();
	eventBus.setMaxListeners(0);
	locator.registerInstance('promise', Promise);
	locator.registerInstance('eventBus', eventBus);
	locator.registerInstance('config', configObject);
	locator.register('stateProvider', StateProvider, configObject, true);
	locator.register('contextFactory', ContextFactory, configObject, true);
	locator.register('storeLoader', StoreLoader, configObject, true);
	locator.register('componentLoader', ComponentLoader, configObject, true);
	locator.register('documentRenderer', DocumentRenderer, configObject, true);
	locator.register('requestRouter', RequestRouter, configObject, true);

	uhr.register(locator);
};

/**
 * Wraps event bus with log messages.
 * @param {EventEmitter} eventBus Event emitter that implements event bus.
 * @param {Logger} logger Logger to write messages.
 * @protected
 */
BootstrapperBase.prototype._wrapEventsWithLogger = function (eventBus, logger) {
	eventBus
		.on('componentLoaded', function (args) {
			logger.info(util.format(INFO_COMPONENT_LOADED, args.name));
		})
		.on('storeLoaded', function (args) {
			logger.info(util.format(INFO_STORE_LOADED, args.name));
		})
		.on('allStoresLoaded', function () {
			logger.info(INFO_ALL_STORES_LOADED);
		})
		.on('allComponentsLoaded', function () {
			logger.info(INFO_ALL_COMPONENTS_LOADED);
		})
		.on('componentRender', function (args) {
			var id = args.context.
					attributes[moduleHelper.ATTRIBUTE_ID];
			logger.trace(util.format(TRACE_RENDER_COMPONENT,
				moduleHelper.getTagNameForComponentName(args.name),
				id ? '#' + id : ''
			));
		})
		.on('componentRendered', function (args) {
			var id = args.context.
					attributes[moduleHelper.ATTRIBUTE_ID];
			logger.trace(util.format(
				TRACE_COMPONENT_RENDERED,
				moduleHelper.getTagNameForComponentName(args.name),
				id ? '#' + id : '',
				typeof(args.time) === 'number' ?
					util.format(TIMESTAMP_FORMAT, args.time) : ''
			));
		})
		.on('documentRendered', function (args) {
			logger.info(util.format(
				INFO_DOCUMENT_RENDERED, args.location.toString()
			));
		})
		.on('error', function (error) {
			logger.error(error);
		});
};
},{"../ContextFactory":19,"../DocumentRenderer":12,"../RequestRouter":14,"../base/ModuleApiProviderBase":27,"../helpers/moduleHelper":29,"../loaders/ComponentLoader":15,"../loaders/StoreLoader":16,"../providers/StateProvider":32,"catberry-uhr":43,"events":35,"promise":51,"util":39}],23:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = CatberryBase;

var ServiceLocator = require('catberry-locator');

/**
 * Creates new instance of the basic Catberry application module.
 * @constructor
 */
function CatberryBase() {
	this.locator = new ServiceLocator();
	this.locator.registerInstance('serviceLocator', this.locator);
	this.locator.registerInstance('catberry', this);
}

/**
 * Current version of catberry.
 */
CatberryBase.prototype.version = '5.1.1';

/**
 * Current object with events.
 * @type {ModuleApiProvider}
 */
CatberryBase.prototype.events = null;

/**
 * Current service locator.
 * @type {ServiceLocator}
 */
CatberryBase.prototype.locator = null;
},{"catberry-locator":41}],24:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = CookieWrapperBase;

var util = require('util');

/**
 * Creates new instance of the basic cookie wrapper.
 * @constructor
 */
function CookieWrapperBase() {
}

/**
 * Gets map of cookie values by name.
 * @returns {Object} Cookies map by names.
 */
CookieWrapperBase.prototype.getAll = function () {
	var string = this.getCookieString();
	return this._parseCookieString(string);
};

/**
 * Gets cookie value by name.
 * @param {string} name Cookie name.
 * @returns {string} Cookie value.
 */
CookieWrapperBase.prototype.get = function (name) {
	if (typeof(name) !== 'string') {
		return '';
	}

	return this.getAll()[name] || '';
};

/**
 * Parses cookie string into map of cookie key/value pairs.
 * @param {string} string Cookie string.
 * @returns {Object} Object with cookie values by keys.
 * @protected
 */
CookieWrapperBase.prototype._parseCookieString = function (string) {
	var cookie = {};

	if (typeof (string) !== 'string') {
		return cookie;
	}
	string
		.split(/; */)
		.forEach(function (cookiePair) {
			var equalsIndex = cookiePair.indexOf('=');
			if (equalsIndex < 0) {
				return;
			}

			var key = cookiePair.substr(0, equalsIndex).trim(),
				value = cookiePair.substr(
					equalsIndex + 1, cookiePair.length
				).trim();

			value = value.replace(/^"|"$/g, '');
			cookie[key] = value;
		});

	return cookie;
};

/**
 * Converts cookie setup object to cookie string.
 * @param {Object} cookieSetup Cookie setup object.
 * @param {string} cookieSetup.key Cookie key.
 * @param {string} cookieSetup.value Cookie value.
 * @param {number?} cookieSetup.maxAge Max cookie age in seconds.
 * @param {Date?} cookieSetup.expires Expire date.
 * @param {string?} cookieSetup.path URI path for cookie.
 * @param {string?} cookieSetup.domain Cookie domain.
 * @param {boolean?} cookieSetup.secure Is cookie secured.
 * @param {boolean?} cookieSetup.httpOnly Is cookie HTTP only.
 * @returns {string} Cookie string.
 * @protected
 */
CookieWrapperBase.prototype._convertToCookieSetup = function (cookieSetup) {
	if (typeof(cookieSetup.key) !== 'string' ||
		typeof(cookieSetup.value) !== 'string') {
		throw new Error('Wrong key or value');
	}

	var cookie = cookieSetup.key + '=' + cookieSetup.value;

	// http://tools.ietf.org/html/rfc6265#section-4.1.1
	if (typeof(cookieSetup.maxAge) === 'number') {
		cookie += '; Max-Age=' + cookieSetup.maxAge.toFixed();
		if (!cookieSetup.expires) {
			// by default expire date = current date + max-age in seconds
			cookieSetup.expires = new Date(Date.now() +
				cookieSetup.maxAge * 1000);
		}
	}
	if (cookieSetup.expires instanceof Date) {
		cookie += '; Expires=' + cookieSetup.expires.toUTCString();
	}
	if (typeof(cookieSetup.path) === 'string') {
		cookie += '; Path=' + cookieSetup.path;
	}
	if (typeof(cookieSetup.domain) === 'string') {
		cookie += '; Domain=' + cookieSetup.domain;
	}
	if (typeof(cookieSetup.secure) === 'boolean' &&
		cookieSetup.secure) {
		cookie += '; Secure';
	}
	if (typeof(cookieSetup.httpOnly) === 'boolean' &&
		cookieSetup.httpOnly) {
		cookie += '; HttpOnly';
	}

	return cookie;
};
},{"util":39}],25:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = DocumentRendererBase;

/**
 * Creates new instance of the basic document renderer.
 * @param {ServiceLocator} $serviceLocator Locator to resolve dependencies.
 * @constructor
 */
function DocumentRendererBase($serviceLocator) {
	var self = this;
	this._serviceLocator = $serviceLocator;
	this._contextFactory = $serviceLocator.resolve('contextFactory');
	this._componentLoader = $serviceLocator.resolve('componentLoader');
	this._eventBus = $serviceLocator.resolve('eventBus');

	var storeLoader = $serviceLocator.resolve('storeLoader');
	this._loading = Promise.all([
		this._componentLoader.load(),
		storeLoader.load()
	])
		.then(function () {
			self._loading = null;
			self._eventBus.emit('ready');
		})
		.catch(function (reason) {
			self._eventBus.emit('error', reason);
		});
}

/**
 * Current service locator.
 * @type {ServiceLocator}
 * @protected
 */
DocumentRendererBase.prototype._serviceLocator = null;

/**
 * Current component loader.
 * @type {ComponentLoader}
 * @protected
 */
DocumentRendererBase.prototype._componentLoader = null;

/**
 * Current module loading promise.
 * @type {Promise}
 * @protected
 */
DocumentRendererBase.prototype._loading = null;

/**
 * Current context factory.
 * @type {ContextFactory}
 * @protected
 */
DocumentRendererBase.prototype._contextFactory = null;

/**
 * Gets promise for ready state when it will be able handle requests.
 * @returns {Promise} Promise for nothing.
 * @protected
 */
DocumentRendererBase.prototype._getPromiseForReadyState = function () {
	return this._loading ?
		this._loading :
		Promise.resolve();
};
},{}],26:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = LoaderBase;

var moduleHelper = require('../helpers/moduleHelper');

/**
 * Create basic implementation of a module loader.
 * @param {Array} transforms Array of module transformations.
 * @constructor
 */
function LoaderBase(transforms) {
	this._transforms = transforms;
}

/**
 * Current list of component transforms.
 * @type {Array}
 * @private
 */
LoaderBase.prototype._transforms = null;

/**
 * Applies all transformations registered in Service Locator.
 * @param {Object} module Loaded module.
 * @param {number?} index Transformation index in a list.
 * @returns {Promise<Object>} Transformed module.
 * @protected
 */
LoaderBase.prototype._applyTransforms = function (module, index) {
	if (index === undefined) {
		// the list is a stack, we should reverse it
		index = this._transforms.length - 1;
	}

	if (index < 0) {
		return Promise.resolve(module);
	}

	var self = this,
		transformation = this._transforms[index];

	return Promise.resolve()
		.then(function () {
			return transformation.transform(module);
		})
		.then(function (transformedModule) {
			return self._applyTransforms(transformedModule, index - 1);
		});
};
},{"../helpers/moduleHelper":29}],27:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = ModuleApiProviderBase;

var ERROR_EVENT_NAME = 'Event name should be a string',
	ERROR_EVENT_HANDLER = 'Event handler should be a function';

/**
 * Creates new instance of the basic API provider.
 * @param {ServiceLocator} $serviceLocator Service locator
 * to resolve dependencies.
 * @constructor
 */
function ModuleApiProviderBase($serviceLocator) {
	this.locator = $serviceLocator;
	this.cookie = $serviceLocator.resolve('cookieWrapper');
	this._eventBus = $serviceLocator.resolve('eventBus');
}

/**
 * Current cookie provider.
 * @type {CookieWrapper}
 */
ModuleApiProviderBase.prototype.cookie = null;

/**
 * Current service locator.
 * @type {ServiceLocator}
 * @protected
 */
ModuleApiProviderBase.prototype.locator = null;

/**
 * Current event bus.
 * @type {EventEmitter}
 * @private
 */
ModuleApiProviderBase.prototype._eventBus = null;

/**
 * Subscribes on the specified event in Catberry.
 * @param {string} eventName Name of the event.
 * @param {Function} handler Event handler.
 * @returns {ModuleApiProviderBase} This object for chaining.
 */
ModuleApiProviderBase.prototype.on = function (eventName, handler) {
	checkEventNameAndHandler(eventName, handler);
	this._eventBus.on(eventName, handler);
	return this;
};

/**
 * Subscribes on the specified event in Catberry to handle once.
 * @param {string} eventName Name of the event.
 * @param {Function} handler Event handler.
 * @returns {ModuleApiProviderBase} This object for chaining.
 */
ModuleApiProviderBase.prototype.once = function (eventName, handler) {
	checkEventNameAndHandler(eventName, handler);
	this._eventBus.once(eventName, handler);
	return this;
};

/**
 * Removes the specified handler from the specified event.
 * @param {string} eventName Name of the event.
 * @param {Function} handler Event handler.
 * @returns {ModuleApiProviderBase} This object for chaining.
 */
ModuleApiProviderBase.prototype.removeListener = function (eventName, handler) {
	checkEventNameAndHandler(eventName, handler);
	this._eventBus.removeListener(eventName, handler);
	return this;
};

/**
 * Removes all handlers from the specified event in Catberry.
 * @param {string} eventName Name of the event.
 * @returns {ModuleApiProviderBase} This object for chaining.
 */
ModuleApiProviderBase.prototype.removeAllListeners = function (eventName) {
	checkEventNameAndHandler(eventName, dummy);
	this._eventBus.removeAllListeners(eventName);
	return this;
};

/**
 * Checks if event name is a string and handler is a function.
 * @param {*} eventName Name of the event to check.
 * @param {*} handler The event handler to check.
 */
function checkEventNameAndHandler(eventName, handler) {
	if (typeof (eventName) !== 'string') {
		throw new Error(ERROR_EVENT_NAME);
	}

	if (typeof (handler) !== 'function') {
		throw new Error(ERROR_EVENT_HANDLER);
	}
}

/**
 * Does nothing. It is used as a default callback.
 */
function dummy() {}

},{}],28:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

var util = require('util');

var TITLE = 'Catberry@5.1.1 (' +
		'<a href="https://github.com/catberry/catberry/issues" ' +
		'target="_blank">' +
		'report an issue' +
		'</a>' +
		')',
	AMP = /&/g,
	LT = /</g,
	GT = />/g,
	QUOT = /\"/g,
	SINGLE_QUOT = /\'/g,
	ERROR_MESSAGE_REGEXP = /^(?:[\w$]+): (?:.+)\r?\n/i,
	ERROR_MESSAGE_FORMAT = '<span ' +
		'style="color: red; font-size: 16pt; font-weight: bold;">' +
		'%s%s' +
		'</span>',
	NEW_LINE = /\r?\n/g;

module.exports = {
	/**
	 * Prints error with pretty formatting.
	 * @param {Error} error Error to print.
	 * @param {string} userAgent User agent information.
	 * @returns {string} HTML with all information about error.
	 */
	prettyPrint: function (error, userAgent) {
		if (!error || typeof(error) !== 'object') {
			return '';
		}
		var dateString = (new Date()).toUTCString() + ';<br/>',
			userAgentString = (userAgent ? (userAgent + ';<br/>') : ''),
			name = (typeof(error.name) === 'string' ? error.name + ': ' : ''),
			message = String(error.message || ''),
			stack = String(error.stack || '').replace(ERROR_MESSAGE_REGEXP, ''),
			fullMessage = util.format(
				ERROR_MESSAGE_FORMAT, escape(name), escape(message)
			);

		return '<div style="background-color: white; font-size: 12pt;">' +
			dateString +
			userAgentString +
			TITLE + '<br/><br/>' +
			fullMessage + '<br/><br/>' +
			escape(stack) +
			'</div>';
	}
};

/**
 * Escapes error text.
 * @param {string} value Error text.
 * @returns {string} escaped and formatted string.
 */
function escape(value) {
	return value
		.replace(AMP, '&amp;')
		.replace(LT, '&lt;')
		.replace(GT, '&gt;')
		.replace(QUOT, '&quot;')
		.replace(SINGLE_QUOT, '&#39;')
		.replace(NEW_LINE, '<br/>');
}
},{"util":39}],29:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

var helper = {
	COMPONENT_PREFIX: 'cat-',
	COMPONENT_PREFIX_REGEXP: /^cat-/,
	COMPONENT_ERROR_TEMPLATE_POSTFIX: '--error',
	DOCUMENT_COMPONENT_NAME: 'document',
	HEAD_COMPONENT_NAME: 'head',
	ATTRIBUTE_ID: 'id',
	ATTRIBUTE_STORE: 'cat-store',
	DEFAULT_LOGIC_FILENAME: 'index.js',

	/**
	 * Creates name for error template of component.
	 * @param {String} componentName name of component.
	 * @returns {string} Name of error template of the component.
	 */
	getNameForErrorTemplate: function (componentName) {
		if (typeof(componentName) !== 'string') {
			return '';
		}
		return componentName + helper.COMPONENT_ERROR_TEMPLATE_POSTFIX;
	},

	/**
	 * Determines if specified component name is the "document" component name.
	 * @param {string} componentName Name of the component.
	 * @returns {boolean} True if specified component is the "document" component.
	 */
	isDocumentComponent: function (componentName) {
		return componentName.toLowerCase() === helper.DOCUMENT_COMPONENT_NAME;
	},
	/**
	 * Determines if specified component name is the "head" component name.
	 * @param {string} componentName Name of the component.
	 * @returns {boolean} True if specified component is the "head" component.
	 */
	isHeadComponent: function (componentName) {
		return componentName.toLowerCase() === helper.HEAD_COMPONENT_NAME;
	},

	/**
	 * Gets the original component name without prefix.
	 * @param {String} fullComponentName Full component name (tag name).
	 * @returns {String} The original component name without prefix.
	 */
	getOriginalComponentName: function (fullComponentName) {
		if (typeof (fullComponentName) !== 'string') {
			return '';
		}
		fullComponentName = fullComponentName.toLowerCase();
		if (fullComponentName === helper.HEAD_COMPONENT_NAME) {
			return fullComponentName;
		}
		if (fullComponentName === helper.DOCUMENT_COMPONENT_NAME) {
			return fullComponentName;
		}
		return fullComponentName.replace(helper.COMPONENT_PREFIX_REGEXP, '');
	},

	/**
	 * Gets valid tag name for component.
	 * @param {String} componentName Name of the component.
	 * @returns {string} Name of the tag.
	 */
	getTagNameForComponentName: function (componentName) {
		if (typeof(componentName) !== 'string') {
			return '';
		}
		var upperComponentName = componentName.toUpperCase();
		if (componentName === helper.HEAD_COMPONENT_NAME) {
			return upperComponentName;
		}
		if (componentName === helper.DOCUMENT_COMPONENT_NAME) {
			return upperComponentName;
		}
		return helper.COMPONENT_PREFIX.toUpperCase() + upperComponentName;
	},

	/**
	 * Gets method of the module that can be invoked.
	 * @param {Object} module Module implementation.
	 * @param {string} prefix Method prefix (i.e. handle).
	 * @param {string?} name Name of the entity to invoke method for
	 * (will be converted to camel casing).
	 * @returns {Function} Method to invoke.
	 */
	getMethodToInvoke: function (module, prefix, name) {
		if (!module || typeof(module) !== 'object') {
			return defaultPromiseMethod;
		}
		var methodName = helper.getCamelCaseName(prefix, name);
		if (typeof(module[methodName]) === 'function') {
			return module[methodName].bind(module);
		}
		if (typeof(module[prefix]) === 'function') {
			return module[prefix].bind(module, name);
		}

		return defaultPromiseMethod;
	},

	/**
	 * Gets name in camel casing for everything.
	 * @param {string} prefix Prefix for the name.
	 * @param {string} name Name to convert.
	 */
	getCamelCaseName: function (prefix, name) {
		if (!name) {
			return '';
		}
		var parts = name.split(/[^a-z0-9]/i),
			camelCaseName = String(prefix || '');

		parts.forEach(function (part) {
			if (!part) {
				return;
			}

			// first character in method name must be in lowercase
			camelCaseName += camelCaseName ?
				part[0].toUpperCase() :
				part[0].toLowerCase();
			camelCaseName += part.substring(1);
		});

		return camelCaseName;
	},

	/**
	 * Gets safe promise resolved from action.
	 * @param {Function} action Action to wrap with safe promise.
	 * @returns {Promise}
	 */
	getSafePromise: function (action) {
		var promise;
		try {
			promise = Promise.resolve(action());
		} catch (e) {
			promise = Promise.reject(e);
		}

		return promise;
	}
};

module.exports = helper;

/**
 * Just returns resolved promise.
 * @returns {Promise} Promise for nothing.
 */
function defaultPromiseMethod() {
	return Promise.resolve();
}
},{}],30:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = {
	/**
	 * Defines read-only property.
	 * @param {Object} object Object to define property in.
	 * @param {string} name Name of the property.
	 * @param {*} value Property value.
	 */
	defineReadOnly: function (object, name, value) {
		Object.defineProperty(object, name, {
			enumerable: false,
			configurable: false,
			writable: false,
			value: value
		});
	}
};
},{}],31:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';
var util = require('util'),
	URI = require('catberry-uri').URI;

var URI_PATH_REPLACEMENT_REG_EXP_SOURCE = '([^\\/\\\\]*)',
	URI_QUERY_REPLACEMENT_REG_EXP_SOURCE = '([^&?=]*)';

var PATH_END_SLASH_REG_EXP = /(.+)\/($|\?|#)/,
	EXPRESSION_ESCAPE_REG_EXP = /[\-\[\]\{\}\(\)\*\+\?\.\\\^\$\|]/g,
	IDENTIFIER_REG_EXP_SOURCE = '[$A-Z_][\\dA-Z_$]*',
	STORE_LIST_REG_EXP_SOURCE = '(?:(?:\\\\[[ ]*' +
		'[^\\[\\],]+' +
		'([ ]*,[ ]*' +
		'[^\\[\\],]+' +
		')*[ ]*\\\\])|(?:\\\\[[ ]*\\\\]))?',
	PARAMETER_REG_EXP = new RegExp(
			':' +
			IDENTIFIER_REG_EXP_SOURCE +
			STORE_LIST_REG_EXP_SOURCE, 'gi'),
	SLASHED_BRACKETS_REG_EXP = /\\\[|\\\]/,
	STORE_LIST_SEPARATOR = ',';

module.exports = {
	/**
	 * Removes slash from the end of URI path.
	 * @param {string} uriPath URI path to process.
	 * @returns {string}
	 */
	removeEndSlash: function (uriPath) {
		if (!uriPath || typeof(uriPath) !== 'string') {
			return '';
		}
		if (uriPath === '/') {
			return uriPath;
		}
		return uriPath.replace(PATH_END_SLASH_REG_EXP, '$1$2');
	},
	/**
	 * Gets URI mapper from the route expression like
	 * /some/:id[store1, store2, store3]/details?filter=:filter[store3]
	 * @param {URI} routeUri Expression that defines route.
	 * @returns {{expression: RegExp, map: Function}}
	 * URI mapper object.
	 */
	compileRoute: function (routeUri) {
		if (!routeUri) {
			return null;
		}

		// escape regular expression characters
		var escaped = routeUri.path.replace(
			EXPRESSION_ESCAPE_REG_EXP, '\\$&'
		);

		// get all occurrences of routing parameters in URI path
		var regExpSource = '^' + escaped.replace(
					PARAMETER_REG_EXP,
					URI_PATH_REPLACEMENT_REG_EXP_SOURCE) + '$',
			expression = new RegExp(regExpSource, 'i'),
			queryMapper,
			pathMapper,
			pathParameterMatches = escaped.match(
				PARAMETER_REG_EXP
			),
			pathParameters = pathParameterMatches ?
				pathParameterMatches.map(getParameterDescriptor) : null;

		if (pathParameters) {
			pathMapper = createUriPathMapper(expression, pathParameters);
		}

		if (routeUri.query) {
			var queryParameters = {};
			Object.keys(routeUri.query.values)
				.forEach(function (name) {
					// arrays in routing definitions are not supported
					if (util.isArray(routeUri.query.values[name])) {
						return;
					}

					// escape regular expression characters
					var escaped = routeUri.query.values[name].replace(
						EXPRESSION_ESCAPE_REG_EXP, '\\$&'
					);

					// get all occurrences of routing parameters in URI path
					var regExpSource = '^' + escaped.replace(
							PARAMETER_REG_EXP,
							URI_QUERY_REPLACEMENT_REG_EXP_SOURCE) + '$';
					var queryParameterMatches = escaped.match(
							PARAMETER_REG_EXP
						);
					if (!queryParameterMatches ||
						queryParameterMatches.length === 0) {
						return;
					}

					var parameter = getParameterDescriptor(
						queryParameterMatches[queryParameterMatches.length - 1]
					);
					var expression = new RegExp(regExpSource, 'i');
					parameter.map = createUriQueryValueMapper(expression);
					queryParameters[name] = parameter;
				});
			queryMapper = createUriQueryMapper(queryParameters);
		}

		return {
			expression: expression,
			map: function (uri) {
				var state = {};
				if (pathMapper) {
					pathMapper(uri.path, state);
				}

				if (queryMapper && uri.query) {
					queryMapper(uri.query.values, state);
				}

				return state;
			}
		};
	}
};

/**
 * Creates new URI path-to-state object mapper.
 * @param {RegExp} expression Regular expression to match URI path.
 * @param {Array} parameters List of parameter descriptors.
 * @returns {Function} URI mapper function.
 */
function createUriPathMapper(expression, parameters) {
	return function (uriPath, state) {
		var matches = uriPath.match(expression);
		if (!matches || matches.length < 2) {
			return state;
		}

		// start with second match because first match is always
		// the whole URI path
		matches = matches.splice(1);

		parameters.forEach(function (parameter, index) {
			var value = matches[index];
			try {
				value = decodeURIComponent(value);
			} catch (e) {
				// nothing to do
			}
			parameter.storeNames.forEach(function (storeName) {
				if (!state[storeName]) {
					state[storeName] = {};
				}
				state[storeName][parameter.name] = value;
			});
		});
	};
}

/**
 * Creates new URI query-to-state object mapper.
 * @param {Object} parameters List of possible query parameter descriptors by
 * query parameter names.
 * @returns {Function} URI mapper function.
 */
function createUriQueryMapper(parameters) {
	return function (queryValues, state) {
		queryValues = queryValues || {};

		Object.keys(queryValues)
			.forEach(function (queryKey) {
				var parameter = parameters[queryKey];
				if (!parameter) {
					return;
				}

				var value = util.isArray(queryValues[queryKey]) ?
						queryValues[queryKey]
							.map(parameter.map)
							.filter(function (value) {
								return value !== null;
							}) :
						parameter.map(queryValues[queryKey]);

				if (value === null) {
					return;
				}
				parameter.storeNames.forEach(function (storeName) {
					if (!state[storeName]) {
						state[storeName] = {};
					}
					state[storeName][parameter.name] = value;
				});
			});
	};
}

/**
 * Maps query parameter value using the parameters expression.
 * @param {RegExp} expression Regular expression to get parameter value.
 * @returns {Function} URI query string parameter value mapper function.
 */
function createUriQueryValueMapper(expression) {
	return function (value) {
		value = value.toString();
		var matches = value.match(expression);
		if (!matches || matches.length === 0) {
			return null;
		}

		// the value is the second item, the first is a whole string
		var mappedValue = matches[matches.length - 1];
		try {
			mappedValue = decodeURIComponent(mappedValue);
		} catch (e) {
			// nothing to do
		}

		return mappedValue;
	};
}

/**
 * Gets description of parameters from its expression.
 * @param {string} parameter Parameter expression.
 * @returns {{name: string, storeNames: Array}} Parameter descriptor.
 */
function getParameterDescriptor(parameter) {
	var parts = parameter.split(SLASHED_BRACKETS_REG_EXP);

	return {
		name: parts[0]
			.trim()
			.substring(1),
		storeNames: (parts[1] ? parts[1] : '')
			.split(STORE_LIST_SEPARATOR)
			.map(function (storeName) {
				return storeName.trim();
			})
			.filter(function (storeName) {
				return storeName.length > 0;
			})
	};
}
},{"catberry-uri":45,"util":39}],32:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = StateProvider;

var routeHelper = require('./../helpers/routeHelper'),
	catberryUri = require('catberry-uri'),
	URI = catberryUri.URI;

/**
 * Create new instance of the state provider.
 * @param {ServiceLocator} $serviceLocator Service locator
 * to resolve URI mappers.
 * @constructor
 */
function StateProvider($serviceLocator) {
	this._uriMappers = getUriMappers($serviceLocator);
}

/**
 * Current list of URI mappers.
 * @type {Array}
 * @private
 */
StateProvider.prototype._uriMappers = null;

/**
 * Gets state by specified location URI.
 * @param {URI} location URI location.
 * @returns {Object} State object.
 */
StateProvider.prototype.getStateByUri = function (location) {
	if (this._uriMappers.length === 0) {
		return null;
	}

	location = location.clone();

	location.path = routeHelper.removeEndSlash(location.path);
	var state = getState(this._uriMappers, location);

	if (!state) {
		return null;
	}

	// make state object immutable
	Object.keys(state)
		.forEach(function (storeName) {
			Object.freeze(state[storeName]);
		});
	Object.freeze(state);

	return state;
};

/**
 * Gets list of URI mappers.
 * @param {ServiceLocator} serviceLocator Service locator to get route
 * definitions.
 * @returns {Array} List of URI mappers.
 */
function getUriMappers(serviceLocator) {
	var uriMappers = [];

	serviceLocator.resolveAll('routeDefinition')
		.forEach(function (route) {
			// just colon-parametrized string
			if (typeof(route) === 'string') {
				var routeUri = new URI(route);
				routeUri.path = routeHelper.removeEndSlash(routeUri.path);
				uriMappers.push(routeHelper.compileRoute(routeUri));
				return;
			}

			// extended colon-parametrized mapper
			if (typeof(route) === 'object' &&
				(typeof(route.expression) === 'string') &&
				(route.map instanceof Function)) {
				var mapperUri = new URI(route.expression);
				mapperUri.path = routeHelper.removeEndSlash(mapperUri.path);
				var mapper = routeHelper.compileRoute(mapperUri);
				uriMappers.push({
					expression: mapper.expression,
					map: function (uri) {
						var state = mapper.map(uri);
						return route.map(state);
					}
				});
				return;
			}

			// regular expression mapper
			if (typeof(route) === 'object' &&
				(route.expression instanceof RegExp) &&
				(route.map instanceof Function)) {
				uriMappers.push(route);
			}
		});
	return uriMappers;
}

/**
 * Gets state.
 * @param {Array} uriMappers.
 * @param {URI} location.
 * @returns {Object|null}
 */
function getState (uriMappers, location) {
	var state = null;

	uriMappers.some(function (mapper) {
		if (mapper.expression.test(location.path)) {
			state = mapper.map(location) || {};
			return true;
		}
		return false;
	});

	return state;
}
},{"./../helpers/routeHelper":31,"catberry-uri":45}],33:[function(require,module,exports){

},{}],34:[function(require,module,exports){
/*global define:false require:false */
module.exports = (function(){
	// Import Events
	var events = require('events')

	// Export Domain
	var domain = {}
	domain.createDomain = domain.create = function(){
		var d = new events.EventEmitter()

		function emitError(e) {
			d.emit('error', e)
		}

		d.add = function(emitter){
			emitter.on('error', emitError)
		}
		d.remove = function(emitter){
			emitter.removeListener('error', emitError)
		}
		d.bind = function(fn){
			return function(){
				var args = Array.prototype.slice.call(arguments)
				try {
					fn.apply(null, args)
				}
				catch (err){
					emitError(err)
				}
			}
		}
		d.intercept = function(fn){
			return function(err){
				if ( err ) {
					emitError(err)
				}
				else {
					var args = Array.prototype.slice.call(arguments, 1)
					try {
						fn.apply(null, args)
					}
					catch (err){
						emitError(err)
					}
				}
			}
		}
		d.run = function(fn){
			try {
				fn()
			}
			catch (err) {
				emitError(err)
			}
			return this
		};
		d.dispose = function(){
			this.removeAllListeners()
			return this
		};
		d.enter = d.exit = function(){
			return this
		}
		return d
	};
	return domain
}).call(this)
},{"events":35}],35:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],36:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],37:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],38:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],39:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./support/isBuffer":38,"_process":37,"inherits":36}],40:[function(require,module,exports){
/*
 * catberry-locator
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry-locator's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This license applies to all parts of catberry-locator that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = ConstructorTokenizer;

var STATES = {
	ILLEGAL: -1,
	NO: 0,
	IDENTIFIER: 1,
	FUNCTION: 2,
	PARENTHESES_OPEN: 3,
	PARENTHESES_CLOSE: 4,
	COMMA: 5,
	END: 6
};
ConstructorTokenizer.STATES = STATES;

var KEYWORDS = {
	FUNCTION: 'function'
};

var WHITESPACE_TEST = /^\s$/,
	IDENTIFIER_TEST = /^[\$\w]$/;

function ConstructorTokenizer(constructorSource) {
	this._source = String(constructorSource || '');
}

/**
 * Current source code of constructor.
 * @type {string}
 * @private
 */
ConstructorTokenizer.prototype._source = '';

/**
 * Current index in source code.
 * @type {number}
 * @private
 */
ConstructorTokenizer.prototype._currentIndex = 0;

/**
 * Current index in source code.
 * @type {number}
 * @private
 */
ConstructorTokenizer.prototype._currentEnd = 0;

/**
 * Current state.
 * @type {number}
 * @private
 */
ConstructorTokenizer.prototype._currentState = STATES.NO;

/**
 * Gets next token in source.
 * @returns {{state: (number), start: number, end: number}}
 */
ConstructorTokenizer.prototype.next = function () {
	if (this._currentState === STATES.ILLEGAL ||
		this._currentState === STATES.END) {
		return {
			state: this._currentState,
			start: this._currentIndex,
			end: this._currentIndex + 1
		};
	}

	var start = this._currentIndex,
		state = this._currentState;

	switch (this._currentState) {
		case STATES.PARENTHESES_OPEN:
			this.parenthesesOpenState();
			break;
		case STATES.PARENTHESES_CLOSE:
			this.parenthesesCloseState();
			break;
		case STATES.IDENTIFIER:
			this.identifierState();
			break;
		case STATES.COMMA:
			this.commaState();
			break;
		case STATES.FUNCTION:
			this.functionState();
			break;
		default:
			this.skipWhitespace();
			var expected = this._source.substr(
				this._currentIndex, KEYWORDS.FUNCTION.length
			);
			if (expected === KEYWORDS.FUNCTION) {
				this._currentState = STATES.FUNCTION;
				return this.next();
			}

			state = STATES.ILLEGAL;
	}

	return {
		state: state,
		start: start,
		end: this._currentEnd
	};
};

/**
 * Skips all whitespace characters.
 */
ConstructorTokenizer.prototype.skipWhitespace = function () {
	while (
		this._currentIndex < this._source.length &&
		WHITESPACE_TEST.test(this._source[this._currentIndex])) {
		this._currentIndex++;
	}
};

/**
 * Describes PARENTHESES_OPEN state of machine.
 */
ConstructorTokenizer.prototype.parenthesesOpenState = function () {
	this._currentIndex++;
	this._currentEnd = this._currentIndex;

	this.skipWhitespace();
	if (IDENTIFIER_TEST.test(this._source[this._currentIndex])) {
		this._currentState = STATES.IDENTIFIER;
	} else if (this._source[this._currentIndex] === ')') {
		this._currentState = STATES.PARENTHESES_CLOSE;
	} else {
		this._currentState = STATES.ILLEGAL;
	}
};

/**
 * Describes PARENTHESES_CLOSE state of machine.
 */
ConstructorTokenizer.prototype.parenthesesCloseState = function () {
	this._currentIndex++;
	this._currentEnd = this._currentIndex;
	this._currentState = STATES.END;
};

/**
 * Describes FUNCTION state of machine.
 */
ConstructorTokenizer.prototype.functionState = function () {
	this._currentIndex += KEYWORDS.FUNCTION.length;
	this._currentEnd = this._currentIndex;

	this.skipWhitespace();

	if (this._source[this._currentIndex] === '(') {
		this._currentState = STATES.PARENTHESES_OPEN;
	} else if (IDENTIFIER_TEST.test(this._source[this._currentIndex])) {
		this._currentState = STATES.IDENTIFIER;
	} else {
		this._currentState = STATES.ILLEGAL;
	}
};

/**
 * Describes IDENTIFIER state of machine.
 */
ConstructorTokenizer.prototype.identifierState = function () {
	while (
		this._currentIndex < this._source.length &&
		IDENTIFIER_TEST.test(this._source[this._currentIndex])) {
		this._currentIndex++;
	}

	this._currentEnd = this._currentIndex;

	this.skipWhitespace();
	if (this._source[this._currentIndex] === '(') {
		this._currentState = STATES.PARENTHESES_OPEN;
	} else if (this._source[this._currentIndex] === ')') {
		this._currentState = STATES.PARENTHESES_CLOSE;
	} else if (this._source[this._currentIndex] === ',') {
		this._currentState = STATES.COMMA;
	} else {
		this._currentState = STATES.ILLEGAL;
	}
};

/**
 * Describes COMMA state of machine.
 */
ConstructorTokenizer.prototype.commaState = function () {
	this._currentIndex++;
	this._currentEnd = this._currentIndex;

	this.skipWhitespace();
	if (IDENTIFIER_TEST.test(this._source[this._currentIndex])) {
		this._currentState = STATES.IDENTIFIER;
		return;
	}
	this._currentState = STATES.ILLEGAL;
};
},{}],41:[function(require,module,exports){
/*
 * catberry-locator
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry-locator's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This license applies to all parts of catberry-locator that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = ServiceLocator;

var util = require('util'),
	ConstructorTokenizer = require('./ConstructorTokenizer');

var DEPENDENCY_REGEXP = /^\$\w+/,
	ERROR_CONSTRUCTOR_SHOULD_BE_FUNCTION = 'Constructor should be a function',
	ERROR_TYPE_NOT_REGISTERED = 'Type "%s" not registered',
	ERROR_TYPE_SHOULD_BE_STRING = 'Type name "%s" should be a string';

/**
 * Creates new instance of service locator.
 * @constructor
 */
function ServiceLocator() {
	this._registrations = {};
}

/**
 * Current type registrations.
 * @type {Object}
 * @protected
 */
ServiceLocator.prototype._registrations = null;

/**
 * Registers new type in service locator.
 * @param {string} type Type name, which will be alias in other constructors.
 * @param {Function} constructor Constructor which
 * initializes instance of specified type.
 * @param {Object?} parameters Set of named parameters
 * which will be also injected.
 * @param {boolean?} isSingleton If true every resolve will return
 * the same instance.
 */
ServiceLocator.prototype.register =
	function (type, constructor, parameters, isSingleton) {
		throwIfNotFunction(constructor);
		throwIfNotString(type);

		initializeRegistration(type, this);
		var parameterNames = getParameterNames(constructor);

		this._registrations[type].unshift({
			constructor: constructor,
			parameters: parameters || {},
			parameterNames: parameterNames,
			isSingleton: Boolean(isSingleton),
			singleInstance: null
		});
	};

/**
 * Registers single instance for specified type.
 * @param {string} type Type name.
 * @param {Object} instance Instance to register.
 */
ServiceLocator.prototype.registerInstance = function (type, instance) {
	throwIfNotString(type);
	initializeRegistration(type, this);

	this._registrations[type].unshift({
		constructor: instance.constructor,
		parameters: {},
		parameterNames: [],
		isSingleton: true,
		singleInstance: instance
	});
};

/**
 * Resolves last registered implementation by type name
 * including all its dependencies recursively.
 * @param {string} type Type name.
 * @returns {Object} Instance of specified type.
 */
ServiceLocator.prototype.resolve = function (type) {
	throwIfNotString(type);
	throwIfNoType(this._registrations, type);
	var firstRegistration = this._registrations[type][0];
	return createInstance(firstRegistration, this);
};

/**
 * Resolves all registered implementations by type name
 * including all dependencies recursively.
 * @param {string} type Type name.
 * @returns {Array} Array of instances specified type.
 */
ServiceLocator.prototype.resolveAll = function (type) {
	throwIfNotString(type);
	try {
		throwIfNoType(this._registrations, type);
	} catch (e) {
		return [];
	}
	return this._registrations[type].map(function (registration) {
		return createInstance(registration, this);
	}, this);
};

/**
 * Resolves instance of specified constructor including dependencies.
 * @param {Function} constructor Constructor for instance creation.
 * @param {Object?} parameters Set of its parameters values.
 * @returns {Object} Instance of specified constructor.
 */
ServiceLocator.prototype.resolveInstance = function (constructor, parameters) {
	return createInstance({
		constructor: constructor,
		parameters: parameters || {},
		parameterNames: getParameterNames(constructor),
		isSingleton: false,
		singleInstance: null
	}, this);
};

/**
 * Unregisters all registrations of specified type.
 * @param {string} type Type name.
 */
ServiceLocator.prototype.unregister = function (type) {
	throwIfNotString(type);
	delete this._registrations[type];
};

/**
 * Initializes registration array for specified type.
 * @param {string} type Type name.
 * @param {ServiceLocator} context Context of execution.
 */
function initializeRegistration(type, context) {
	if (!context._registrations.hasOwnProperty(type)) {
		context._registrations[type] = [];
	}
}

/**
 * Throws error if specified registration is not found.
 * @param {Object} registrations Current registrations set.
 * @param {string} type Type to check.
 */
function throwIfNoType(registrations, type) {
	if (!registrations.hasOwnProperty(type) ||
		registrations[type].length === 0) {
		throw new Error(util.format(ERROR_TYPE_NOT_REGISTERED, type));
	}
}

/**
 * Throws error if specified constructor is not a function.
 * @param {Function} constructor Constructor to check.
 */
function throwIfNotFunction(constructor) {
	if (constructor instanceof Function) {
		return;
	}

	throw new Error(ERROR_CONSTRUCTOR_SHOULD_BE_FUNCTION);
}

/**
 * Throws error if specified type name is not a string.
 * @param {String} type Type name to check.
 */
function throwIfNotString(type) {
	if (typeof(type) === 'string') {
		return;
	}

	throw new Error(util.format(ERROR_TYPE_SHOULD_BE_STRING, type));
}

/**
 * Creates instance of type specified and parameters in registration.
 * @param {Object} registration Specified registration of type.
 * @param {ServiceLocator} context Context of execution.
 * @returns {Object} Instance of type specified in registration.
 */
function createInstance(registration, context) {
	if (registration.isSingleton && registration.singleInstance !== null) {
		return registration.singleInstance;
	}

	var instanceParameters = getParameters(registration, context),
		instance = Object.create(registration.constructor.prototype);
	registration.constructor.apply(instance, instanceParameters);

	if (registration.isSingleton) {
		registration.singleInstance = instance;
	}

	return instance;
}

/**
 * Gets constructor parameters specified in type constructor.
 * @param {Object} registration Type registration.
 * @param {ServiceLocator} context Context of execution.
 * @returns {Array} Array of resolved dependencies to inject.
 */
function getParameters(registration, context) {
	return registration.parameterNames.map(function (parameterName) {
		var dependencyName = getDependencyName(parameterName);
		return dependencyName === null ?
			registration.parameters[parameterName] :
			this.resolve(dependencyName);
	}, context);
}

/**
 * Gets name of dependency type.
 * @param {string} parameterName Name of constructor parameter.
 * @returns {string|null} Name of dependency type.
 */
function getDependencyName(parameterName) {
	if (!DEPENDENCY_REGEXP.test(parameterName)) {
		return null;
	}

	return parameterName.substr(1, parameterName.length - 1);
}

/**
 * Gets all parameter names used in constructor function.
 * @param {Function} constructor Constructor function.
 * @returns {Array<string>} Array of parameter names.
 */
function getParameterNames(constructor) {
	var source = constructor.toString(),
		tokenizer = new ConstructorTokenizer(source),
		result = [],
		token = {
			state: ConstructorTokenizer.STATES.NO,
			start: 0,
			end: 0
		},
		areParametersStarted = false;

	while (
		token.state !== ConstructorTokenizer.STATES.END &&
		token.state !== ConstructorTokenizer.STATES.ILLEGAL) {
		token = tokenizer.next();
		if (token.state === ConstructorTokenizer.STATES.PARENTHESES_OPEN) {
			areParametersStarted = true;
		}

		if (areParametersStarted &&
			token.state === ConstructorTokenizer.STATES.IDENTIFIER) {
			result.push(source.substring(token.start, token.end));
		}
	}
	return result;

}
},{"./ConstructorTokenizer":40,"util":39}],42:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = UHR;

var UHRBase = require('../lib/UHRBase'),
	Promise = require('promise'),
	URI = require('catberry-uri').URI,
	util = require('util');

// if browser still does not have promises then add it.
if (!('Promise' in window)) {
	window.Promise = Promise;
}

util.inherits(UHR, UHRBase);

var NON_SAFE_HEADERS = {
	cookie: true,
	'accept-charset': true
};

var ERROR_CONNECTION = 'Connection error',
	ERROR_TIMEOUT = 'Request timeout',
	ERROR_ABORTED = 'Request aborted';

/**
 * Creates new instance of client-side HTTP(S) request implementation.
 * @param {Window} $window Current window object.
 * @constructor
 */
function UHR($window) {
	UHRBase.call(this);
	this.window = $window;
}

/**
 * Current instance of window.
 * @type {Window}
 */
UHR.prototype.window = null;

/**
 * Does request with specified parameters using protocol implementation.
 * @param {Object} parameters Request parameters.
 * @param {String} parameters.method HTTP method.
 * @param {String} parameters.url URL for request.
 * @param {URI} parameters.uri URI object.
 * @param {Object} parameters.headers HTTP headers to send.
 * @param {String|Object} parameters.data Data to send.
 * @param {Number} parameters.timeout Request timeout.
 * @param {Boolean} parameters.unsafeHTTPS If true then requests to servers with
 * invalid HTTPS certificates are allowed.
 * @returns {Promise<Object>} Promise for result with status object and content.
 * @protected
 */
UHR.prototype._doRequest = function (parameters) {
	var self = this;

	Object.keys(parameters.headers)
		.forEach(function (name) {
			if (NON_SAFE_HEADERS.hasOwnProperty(name.toLowerCase())) {
				delete parameters.headers[name];
			}
		});

	return new Promise(function (fulfill, reject) {
		var requestError = null,
			xhr = new self.window.XMLHttpRequest();

		xhr.onabort = function () {
			requestError = new Error(ERROR_ABORTED);
			reject(requestError);
		};
		xhr.ontimeout = function () {
			requestError = new Error(ERROR_TIMEOUT);
			reject(requestError);
		};
		xhr.onerror = function () {
			requestError = new Error(xhr.statusText || ERROR_CONNECTION);
			reject(requestError);
		};
		xhr.onloadend = function () {
			if (requestError) {
				return;
			}
			var statusObject = getStatusObject(xhr),
				content = self.convertResponse(
					statusObject.headers,
					xhr.responseText
				);
			fulfill({status: statusObject, content: content});
		};

		var user = parameters.uri.authority.userInfo ?
				parameters.uri.authority.userInfo.user : null,
			password = parameters.uri.authority.userInfo ?
				parameters.uri.authority.userInfo.password : null;
		xhr.open(
			parameters.method, parameters.uri.toString(), true,
			user || undefined, password || undefined
		);
		xhr.timeout = parameters.timeout;

		Object.keys(parameters.headers)
			.forEach(function (headerName) {
				xhr.setRequestHeader(
					headerName, parameters.headers[headerName]
				);
			});

		xhr.send(parameters.data);
	});
};

/**
 * Gets state object for specified jQuery XHR object.
 * @param {Object?} xhr XHR object.
 * @returns {{code: number, text: string, headers: Object}} Status object.
 */
function getStatusObject(xhr) {
	var headers = {};

	if (!xhr) {
		return {
			code: 0,
			text: '',
			headers: headers
		};
	}

	xhr
		.getAllResponseHeaders()
		.split('\n')
		.forEach(function (header) {
			var delimiterIndex = header.indexOf(':');
			if (delimiterIndex <= 0) {
				return;
			}
			var headerName = header
				.substring(0, delimiterIndex)
				.trim()
				.toLowerCase();
			headers[headerName] = header
				.substring(delimiterIndex + 1)
				.trim();
		});

	return {
		code: xhr.status,
		text: xhr.statusText,
		headers: headers
	};
}
},{"../lib/UHRBase":44,"catberry-uri":45,"promise":51,"util":39}],43:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

var UHR = require('./lib/UHR');

module.exports = {
	/**
	 * Registers UHR in server-side service locator.
	 * @param {ServiceLocator} locator Catberry's service locator.
	 */
	register: function (locator) {
		var config = locator.resolve('config');
		locator.register('uhr', UHR, config, true);
	},
	UHR: UHR
};
},{"./lib/UHR":42}],44:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = UHRBase;

var catberryUri = require('catberry-uri'),
	Query = catberryUri.Query,
	URI = catberryUri.URI;

var ERROR_UNSUPPORTED_PROTOCOL = 'Protocol is unsupported',
	ERROR_PARAMETERS_SHOULD_BE_OBJECT = 'Request parameters should be object',
	ERROR_URL_IS_REQUIRED = 'URL is required parameter',
	ERROR_METHOD_IS_REQUIRED = 'Request method is required parameter',
	ERROR_HOST_IS_REQUIRED = 'Host in URL is required',
	ERROR_SCHEME_IS_REQUIRED = 'Scheme in URL is required',
	ERROR_TIMEOUT_SHOULD_BE_NUMBER = 'Timeout should be a number',
	DEFAULT_TIMEOUT = 30000,
	HTTP_PROTOCOL_REGEXP = /^(http)s?$/i;

var METHODS = {
	GET: 'GET',
	HEAD: 'HEAD',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
	OPTIONS: 'OPTIONS',
	TRACE: 'TRACE',
	CONNECT: 'CONNECT'
};

UHRBase.TYPES = {
	URL_ENCODED: 'application/x-www-form-urlencoded',
	JSON: 'application/json',
	PLAIN_TEXT: 'text/plain',
	HTML: 'text/html'
};

UHRBase.CHARSET = 'UTF-8';

UHRBase.DEFAULT_GENERAL_HEADERS = {
	Accept: UHRBase.TYPES.JSON + '; q=0.7, ' +
		UHRBase.TYPES.HTML + '; q=0.2, ' +
		UHRBase.TYPES.PLAIN_TEXT + '; q=0.1',
	'Accept-Charset': UHRBase.CHARSET + '; q=1'
};

UHRBase.CHARSET_PARAMETER = '; charset=' + UHRBase.CHARSET;
UHRBase.URL_ENCODED_ENTITY_CONTENT_TYPE = UHRBase.TYPES.URL_ENCODED +
	UHRBase.CHARSET_PARAMETER;

UHRBase.JSON_ENTITY_CONTENT_TYPE = UHRBase.TYPES.JSON +
	UHRBase.CHARSET_PARAMETER;

UHRBase.PLAIN_TEXT_ENTITY_CONTENT_TYPE = UHRBase.TYPES.PLAIN_TEXT +
	UHRBase.CHARSET_PARAMETER;

// This module were developed using HTTP/1.1v2 RFC 2616
// (http://www.w3.org/Protocols/rfc2616/)
/**
 * Creates new instance of Basic Universal HTTP(S) Request implementation.
 * @constructor
 */
function UHRBase() {

}

/**
 * Does GET request to HTTP server.
 * @param {string} url URL to request.
 * @param {Object?} options Request parameters.
 * @param {Object?} options.headers HTTP headers to send.
 * @param {String|Object?} options.data Data to send.
 * @param {Number?} options.timeout Request timeout.
 * @param {Boolean?} options.unsafeHTTPS If true then requests to servers with
 * invalid HTTPS certificates are allowed.
 * @returns {Promise<Object>} Promise for result with status object and content.
 */
UHRBase.prototype.get = function (url, options) {
	options = options || {};
	var parameters = Object.create(options);
	parameters.method = METHODS.GET;
	parameters.url = url;
	return this.request(parameters);
};

/**
 * Does POST request to HTTP server.
 * @param {string} url URL to request.
 * @param {Object?} options Request parameters.
 * @param {Object?} options.headers HTTP headers to send.
 * @param {String|Object?} options.data Data to send.
 * @param {Number?} options.timeout Request timeout.
 * @param {Boolean?} options.unsafeHTTPS If true then requests to servers with
 * invalid HTTPS certificates are allowed.
 * @returns {Promise<Object>} Promise for result with status object and content.
 */
UHRBase.prototype.post = function (url, options) {
	options = options || {};
	var parameters = Object.create(options);
	parameters.method = METHODS.POST;
	parameters.url = url;
	return this.request(parameters);
};

/**
 * Does PUT request to HTTP server.
 * @param {string} url URL to request.
 * @param {Object?} options Request parameters.
 * @param {Object?} options.headers HTTP headers to send.
 * @param {String|Object?} options.data Data to send.
 * @param {Number?} options.timeout Request timeout.
 * @param {Boolean?} options.unsafeHTTPS If true then requests to servers with
 * invalid HTTPS certificates are allowed.
 * @returns {Promise<Object>} Promise for result with status object and content.
 */
UHRBase.prototype.put = function (url, options) {
	options = options || {};
	var parameters = Object.create(options);
	parameters.method = METHODS.PUT;
	parameters.url = url;
	return this.request(parameters);
};

/**
 * Does PATCH request to HTTP server.
 * @param {string} url URL to request.
 * @param {Object?} options Request parameters.
 * @param {Object?} options.headers HTTP headers to send.
 * @param {String|Object?} options.data Data to send.
 * @param {Number?} options.timeout Request timeout.
 * @param {Boolean?} options.unsafeHTTPS If true then requests to servers with
 * invalid HTTPS certificates are allowed.
 * @returns {Promise<Object>} Promise for result with status object and content.
 */
UHRBase.prototype.patch = function (url, options) {
	options = options || {};
	var parameters = Object.create(options);
	parameters.method = METHODS.PATCH;
	parameters.url = url;
	return this.request(parameters);
};

/**
 * Does DELETE request to HTTP server.
 * @param {string} url URL to request.
 * @param {Object?} options Request parameters.
 * @param {Object?} options.headers HTTP headers to send.
 * @param {String|Object?} options.data Data to send.
 * @param {Number?} options.timeout Request timeout.
 * @param {Boolean?} options.unsafeHTTPS If true then requests to servers with
 * invalid HTTPS certificates are allowed.
 * @returns {Promise<Object>} Promise for result with status object and content.
 */
UHRBase.prototype.delete = function (url, options) {
	var parameters = Object.create(options);
	parameters.method = METHODS.DELETE;
	parameters.url = url;
	return this.request(parameters);
};

/**
 * Does request with specified parameters.
 * @param {Object} parameters Request parameters.
 * @param {String} parameters.method HTTP method.
 * @param {String} parameters.url URL for request.
 * @param {Object?} parameters.headers HTTP headers to send.
 * @param {String|Object?} parameters.data Data to send.
 * @param {Number?} parameters.timeout Request timeout.
 * @param {Boolean?} parameters.unsafeHTTPS If true then requests
 * to servers with invalid HTTPS certificates are allowed.
 * @returns {Promise<Object>} Promise for result with status object and content.
 */
UHRBase.prototype.request = function (parameters) {
	var self = this;
	return this._validateRequest(parameters)
		.then(function (validated) {
			return self._doRequest(validated);
		});
};

/**
 * Validates UHR parameters.
 * @param {Object} parameters Request parameters.
 * @param {String} parameters.method HTTP method.
 * @param {String} parameters.url URL for request.
 * @param {Object?} parameters.headers HTTP headers to send.
 * @param {String|Object?} parameters.data Data to send.
 * @param {Number?} parameters.timeout Request timeout.
 * @param {Boolean?} parameters.unsafeHTTPS If true then requests
 * to servers with invalid HTTPS certificates are allowed.
 * @returns {Promise} Promise for nothing.
 * @private
 */
/*jshint maxcomplexity:false */
UHRBase.prototype._validateRequest = function (parameters) {
	if (!parameters || typeof(parameters) !== 'object') {
		return Promise.reject(new Error(ERROR_PARAMETERS_SHOULD_BE_OBJECT));
	}

	var validated = Object.create(parameters);

	if (typeof(parameters.url) !== 'string') {
		return Promise.reject(new Error(ERROR_URL_IS_REQUIRED));
	}
	validated.uri = new URI(validated.url);
	if (!validated.uri.scheme) {
		return Promise.reject(new Error(ERROR_SCHEME_IS_REQUIRED));
	}
	if (!HTTP_PROTOCOL_REGEXP.test(validated.uri.scheme)) {
		return Promise.reject(new Error(ERROR_UNSUPPORTED_PROTOCOL));
	}
	if (!validated.uri.authority || !validated.uri.authority.host) {
		return Promise.reject(new Error(ERROR_HOST_IS_REQUIRED));
	}
	if (typeof(validated.method) !== 'string' ||
		!(validated.method in METHODS)) {
		return Promise.reject(new Error(ERROR_METHOD_IS_REQUIRED));
	}

	validated.timeout = validated.timeout || DEFAULT_TIMEOUT;
	if (typeof(validated.timeout) !== 'number') {
		return Promise.reject(new Error(ERROR_TIMEOUT_SHOULD_BE_NUMBER));
	}

	validated.headers = this._createHeaders(validated.headers);

	if (!this._isUpstreamRequest(parameters.method) &&
		validated.data && typeof(validated.data) === 'object') {

		var dataKeys = Object.keys(validated.data);

		if (dataKeys.length > 0 && !validated.uri.query) {
			validated.uri.query = new Query('');
		}

		dataKeys.forEach(function (key) {
			validated.uri.query.values[key] = validated.data[key];
		});
		validated.data = null;
	} else {
		var dataAndHeaders = this._getDataToSend(
			validated.headers, validated.data
		);
		validated.headers = dataAndHeaders.headers;
		validated.data = dataAndHeaders.data;
	}

	return Promise.resolve(validated);
};

/**
 * Gets data for sending via HTTP request using Content Type HTTP header.
 * @param {Object} headers HTTP headers.
 * @param {Object|string} data Data to send.
 * @returns {{headers: Object, data: Object|String}} Data and headers to send.
 * @private
 */
UHRBase.prototype._getDataToSend = function (headers, data) {
	var found = findContentType(headers),
		contentTypeHeader = found.name,
		contentType = found.type;

	if (!data || typeof(data) !== 'object') {
		data = data ? String(data) : '';
		if (!contentType) {
			headers[contentTypeHeader] = UHRBase.PLAIN_TEXT_ENTITY_CONTENT_TYPE;
		}
		return {
			headers: headers,
			data: data
		};
	}

	if (contentType === UHRBase.TYPES.JSON) {
		return {
			headers: headers,
			data: JSON.stringify(data)
		};
	}

	// otherwise object will be sent with
	// application/x-www-form-urlencoded
	headers[contentTypeHeader] = UHRBase.URL_ENCODED_ENTITY_CONTENT_TYPE;

	var query = new Query();
	query.values = data;
	return {
		headers: headers,
		data: query.toString()
			.replace('+', '%2B')
			.replace('%20', '+')
	};
};

/**
 * Creates HTTP headers for request using defaults and current parameters.
 * @param {Object} parameterHeaders HTTP headers of UHR.
 * @protected
 */
UHRBase.prototype._createHeaders = function (parameterHeaders) {
	if (!parameterHeaders || typeof(parameterHeaders) !== 'object') {
		parameterHeaders = {};
	}
	var headers = {};

	Object.keys(UHRBase.DEFAULT_GENERAL_HEADERS)
		.forEach(function (headerName) {
			headers[headerName] = UHRBase.DEFAULT_GENERAL_HEADERS[headerName];
		});

	Object.keys(parameterHeaders)
		.forEach(function (headerName) {
			if (parameterHeaders[headerName] === null ||
				parameterHeaders[headerName] === undefined) {
				delete headers[headerName];
				return;
			}
			headers[headerName] = parameterHeaders[headerName];
		});

	return headers;
};

/**
 * Does request with specified parameters using protocol implementation.
 * @param {Object} parameters Request parameters.
 * @param {String} parameters.method HTTP method.
 * @param {String} parameters.url URL for request.
 * @param {URI} parameters.uri URI object.
 * @param {Object} parameters.headers HTTP headers to send.
 * @param {String|Object} parameters.data Data to send.
 * @param {Number} parameters.timeout Request timeout.
 * @param {Boolean} parameters.unsafeHTTPS If true then requests to servers with
 * invalid HTTPS certificates are allowed.
 * @returns {Promise<Object>} Promise for result with status object and content.
 * @protected
 * @abstract
 */
UHRBase.prototype._doRequest = function (parameters) {
};

/**
 * Converts response data according content type.
 * @param {Object} headers HTTP headers.
 * @param {string} responseData Data from response.
 * @returns {string|Object} Converted data.
 */
UHRBase.prototype.convertResponse = function (headers, responseData) {
	if (typeof(responseData) !== 'string') {
		responseData = '';
	}
	var found = findContentType(headers),
		contentType = found.type || UHRBase.TYPES.PLAIN_TEXT;

	switch (contentType) {
		case UHRBase.TYPES.JSON:
			var json;
			try {
				json = JSON.parse(responseData);
			} catch (e) {
				// nothing to do
			}
			return json || {};
		case UHRBase.TYPES.URL_ENCODED:
			var object;
			try {
				var query = new Query(responseData.replace('+', '%20'));
				object = query.values;
			} catch (e) {
				// nothing to do
			}
			return object || {};
		default:
			return responseData;
	}
};

/**
 * Determines is current query needs to use upstream.
 * @param {String} method HTTP method.
 * @returns {Boolean} Is current HTTP method means upstream usage.
 * @protected
 */
UHRBase.prototype._isUpstreamRequest = function (method) {
	return (
		method === METHODS.POST ||
		method === METHODS.PUT ||
		method === METHODS.PATCH
		);
};

/**
 * Finds content type header in headers object.
 * @param {Object} headers HTTP headers.
 * @returns {{name: String, type: String}} Name of header and content type.
 */
function findContentType(headers) {
	var contentTypeString = '',
		contentTypeHeader = 'Content-Type';

	Object.keys(headers)
		.forEach(function (key) {
			if (key.toLowerCase() !== 'content-type') {
				return;
			}
			contentTypeHeader = key;
			contentTypeString = headers[key];
		});

	var typeAndParameters = contentTypeString.split(';'),
		contentType = typeAndParameters[0].toLowerCase();
	return {
		name: contentTypeHeader,
		type: contentType
	};
}
},{"catberry-uri":45}],45:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = {
	URI: require('./lib/URI'),
	Authority: require('./lib/Authority'),
	UserInfo: require('./lib/UserInfo'),
	Query: require('./lib/Query')
};
},{"./lib/Authority":46,"./lib/Query":47,"./lib/URI":48,"./lib/UserInfo":49}],46:[function(require,module,exports){
/*
 * catberry-uri
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry-uri's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry-uri that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = Authority;

var UserInfo = require('./UserInfo'),
	percentEncodingHelper = require('./percentEncodingHelper');

var PORT_REGEXP = /^\d+$/,
	ERROR_PORT = 'URI authority port must satisfy expression ' +
		PORT_REGEXP.toString();

/**
 * Creates new instance of URI authority component parser.
 * https://tools.ietf.org/html/rfc3986#section-3.2
 * @param {String?} authorityString URI authority component string.
 * @constructor
 */
function Authority(authorityString) {
	if (typeof(authorityString) === 'string' && authorityString.length > 0) {
		var firstAtIndex = authorityString.indexOf('@');
		if (firstAtIndex !== -1) {
			var userInfoString = authorityString.substring(0, firstAtIndex);
			this.userInfo = new UserInfo(userInfoString);
			authorityString = authorityString.substring(firstAtIndex + 1);
		}

		var lastColonIndex = authorityString.lastIndexOf(':');
		if (lastColonIndex !== -1) {
			var portString = authorityString.substring(lastColonIndex + 1);
			if (lastColonIndex === authorityString.length - 1) {
				this.port = '';
				authorityString = authorityString.substring(0, lastColonIndex);
			}else if (PORT_REGEXP.test(portString)) {
				this.port = portString;
				authorityString = authorityString.substring(0, lastColonIndex);
			}
		}

		this.host = percentEncodingHelper.decode(authorityString);
	}
}

/**
 * Current user information.
 * https://tools.ietf.org/html/rfc3986#section-3.2.1
 * @type {UserInfo}
 */
Authority.prototype.userInfo = null;

/**
 * Current host.
 * https://tools.ietf.org/html/rfc3986#section-3.2.2
 * @type {String}
 */
Authority.prototype.host = null;

/**
 * Current port.
 * https://tools.ietf.org/html/rfc3986#section-3.2.3
 * @type {String}
 */
Authority.prototype.port = null;

/**
 * Clones current authority.
 * @returns {Authority} New clone of current object.
 */
Authority.prototype.clone = function () {
	var authority = new Authority();
	if (this.userInfo) {
		authority.userInfo = this.userInfo.clone();
	}
	if (typeof(this.host) === 'string') {
		authority.host = this.host;
	}
	if (typeof(this.port) === 'string') {
		authority.port = this.port;
	}
	return authority;
};

/**
 * Recombine all authority components into authority string.
 * @returns {string} Authority component string.
 */
Authority.prototype.toString = function () {
	var result = '';
	if (this.userInfo) {
		result += this.userInfo.toString() + '@';
	}
	if (this.host !== undefined && this.host !== null) {
		var host = String(this.host);
		result += percentEncodingHelper.encodeHost(host);
	}
	if (this.port !== undefined && this.port !== null) {
		var port = String(this.port);
		if (port.length > 0 && !PORT_REGEXP.test(port)) {
			throw new Error(ERROR_PORT);
		}
		result += ':' + port;
	}
	return result;
};
},{"./UserInfo":49,"./percentEncodingHelper":50}],47:[function(require,module,exports){
/*
 * catberry-uri
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry-uri's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry-uri that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = Query;

var percentEncodingHelper = require('./percentEncodingHelper');

/**
 * Creates new instance of URI query component parser.
 * https://tools.ietf.org/html/rfc3986#section-3.4
 * @param {String?} queryString URI query component string.
 * @constructor
 */
function Query(queryString) {
	if (typeof(queryString) === 'string') {
		this.values = {};

		queryString
			.split('&')
			.forEach(function (pair) {
				var parts = pair.split('='),
					key = percentEncodingHelper.decode(parts[0]);
				if (!key) {
					return;
				}
				if (key in this.values &&
					!(this.values[key] instanceof Array)) {
					this.values[key] = [this.values[key]];
				}

				var value = typeof(parts[1]) === 'string' ?
					percentEncodingHelper.decode(parts[1]) : null;

				if (this.values[key] instanceof Array) {
					this.values[key].push(value);
				}else{
					this.values[key] = value;
				}
			}, this);
	}
}

/**
 * Current set of values of query.
 * @type {Object}
 */
Query.prototype.values = null;

/**
 * Clones current query to a new object.
 * @returns {Query} New clone of current object.
 */
Query.prototype.clone = function () {
	var query = new Query();
	if (this.values) {
		query.values = {};
		Object.keys(this.values)
			.forEach(function (key) {
				query.values[key] = this.values[key];
			}, this);
	}
	return query;
};

/**
 * Converts current set of query values to string.
 * @returns {string} Query component string.
 */
Query.prototype.toString = function () {
	if (!this.values) {
		return '';
	}

	var queryString = '';
	Object.keys(this.values)
		.forEach(function (key) {
			var values = this.values[key] instanceof Array ?
				this.values[key] : [this.values[key]];

			values.forEach(function (value) {
				queryString += '&' + percentEncodingHelper
					.encodeQuerySubComponent(key);
				if (value === undefined || value === null) {
					return;
				}
				value = String(value);
				queryString += '=' +
					percentEncodingHelper.encodeQuerySubComponent(value);
			});
		}, this);

	return queryString.replace(/^&/, '');
};
},{"./percentEncodingHelper":50}],48:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = URI;

var Authority = require('./Authority'),
	percentEncodingHelper = require('./percentEncodingHelper'),
	Query = require('./Query');

	// https://tools.ietf.org/html/rfc3986#appendix-B
var URI_PARSE_REGEXP = new RegExp(
		'^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?'
	),
	// https://tools.ietf.org/html/rfc3986#section-3.1
	SCHEME_REGEXP = /^[a-z]+[a-z\d\+\.-]*$/i,
	ERROR_SCHEME = 'URI scheme must satisfy expression ' +
		SCHEME_REGEXP.toString(),
	ERROR_BASE_SCHEME = 'Scheme component is required to be present ' +
		'in a base URI';

/**
 * Creates new instance of URI according to RFC 3986.
 * @param {String?} uriString URI string to parse components.
 * @constructor
 */
function URI(uriString) {
	if (typeof(uriString) !== 'string') {
		uriString = '';
	}

	// https://tools.ietf.org/html/rfc3986#appendix-B
	var matches = uriString.match(URI_PARSE_REGEXP);

	if (matches) {
		if (typeof(matches[2]) === 'string') {
			this.scheme = percentEncodingHelper.decode(matches[2]);
		}
		if (typeof(matches[4]) === 'string') {
			this.authority = new Authority(matches[4]);
		}
		if (typeof(matches[5]) === 'string') {
			this.path = percentEncodingHelper.decode(matches[5]);
		}
		if (typeof(matches[7]) === 'string') {
			this.query = new Query(matches[7]);
		}
		if (typeof(matches[9]) === 'string') {
			this.fragment = percentEncodingHelper.decode(matches[9]);
		}
	}
}

/**
 * Current URI scheme.
 * https://tools.ietf.org/html/rfc3986#section-3.1
 * @type {String}
 */
URI.prototype.scheme = null;

/**
 * Current URI authority.
 * https://tools.ietf.org/html/rfc3986#section-3.2
 * @type {Authority}
 */
URI.prototype.authority = null;

/**
 * Current URI path.
 * https://tools.ietf.org/html/rfc3986#section-3.3
 * @type {String}
 */
URI.prototype.path = null;

/**
 * Current URI query.
 * https://tools.ietf.org/html/rfc3986#section-3.4
 * @type {Query}
 */
URI.prototype.query = null;

/**
 * Current URI fragment.
 * https://tools.ietf.org/html/rfc3986#section-3.5
 * @type {String}
 */
URI.prototype.fragment = null;

/**
 * Converts a URI reference that might be relative to a given base URI
 * into the reference's target URI.
 * https://tools.ietf.org/html/rfc3986#section-5.2
 * @param {URI} baseUri Base URI.
 * @returns {URI} Resolved URI.
 */
URI.prototype.resolveRelative = function (baseUri) {
	if (!baseUri.scheme) {
		throw new Error(ERROR_BASE_SCHEME);
	}

	return transformReference(baseUri, this);
};

/**
 * Clones current URI to a new object.
 * @returns {URI} New clone of current object.
 */
URI.prototype.clone = function () {
	var uri = new URI();

	if (typeof(this.scheme) === 'string') {
		uri.scheme = this.scheme;
	}

	if (this.authority) {
		uri.authority = this.authority.clone();
	}

	if (typeof(this.path) === 'string') {
		uri.path = this.path;
	}

	if (this.query) {
		uri.query = this.query.clone();
	}

	if (typeof(this.fragment) === 'string') {
		uri.fragment = this.fragment;
	}

	return uri;
};

/**
 * Recomposes URI components to URI string,
 * https://tools.ietf.org/html/rfc3986#section-5.3
 * @returns {string} URI string.
 */
URI.prototype.toString = function () {
	var result = '';

	if (this.scheme !== undefined && this.scheme !== null) {
		var scheme = String(this.scheme);
		if (!SCHEME_REGEXP.test(scheme)) {
			throw new Error(ERROR_SCHEME);
		}
		result += scheme + ':';
	}

	if (this.authority) {
		result += '//' + this.authority.toString();
	}

	var path = this.path === undefined || this.path === null ?
		'' : String(this.path);
	result += percentEncodingHelper.encodePath(path);

	if (this.query) {
		result += '?' + this.query.toString();
	}

	if (this.fragment !== undefined && this.fragment !== null) {
		var fragment = String(this.fragment);
		result += '#' + percentEncodingHelper.encodeFragment(fragment);
	}

	return result;
};

/**
 * Transforms reference for relative resolution.
 * Whole algorithm has been taken from
 * https://tools.ietf.org/html/rfc3986#section-5.2.2
 * @param {URI} baseUri Base URI for resolution.
 * @param {URI} referenceUri Reference URI to resolve.
 * @returns {URI} Components of target URI.
 */
/*jshint maxdepth:false */
/*jshint maxcomplexity:false */
function transformReference(baseUri, referenceUri) {
	var targetUri = new URI('');

	if (referenceUri.scheme) {
		targetUri.scheme = referenceUri.scheme;
		targetUri.authority = referenceUri.authority ?
			referenceUri.authority.clone() : referenceUri.authority;
		targetUri.path = removeDotSegments(referenceUri.path);
		targetUri.query = referenceUri.query ?
			referenceUri.query.clone() : referenceUri.query;
	} else {
		if (referenceUri.authority) {
			targetUri.authority = referenceUri.authority ?
				referenceUri.authority.clone() : referenceUri.authority;
			targetUri.path = removeDotSegments(referenceUri.path);
			targetUri.query = referenceUri.query ?
				referenceUri.query.clone() : referenceUri.query;
		} else {
			if (referenceUri.path === '') {
				targetUri.path = baseUri.path;
				if (referenceUri.query) {
					targetUri.query = referenceUri.query.clone();
				} else {
					targetUri.query = baseUri.query ?
						baseUri.query.clone() : baseUri.query;
				}
			} else {
				if (referenceUri.path[0] === '/') {
					targetUri.path =
						removeDotSegments(referenceUri.path);
				} else {
					targetUri.path =
						merge(baseUri, referenceUri);
					targetUri.path =
						removeDotSegments(targetUri.path);
				}
				targetUri.query = referenceUri.query ?
					referenceUri.query.clone() : referenceUri.query;
			}
			targetUri.authority = baseUri.authority ?
				baseUri.authority.clone() : baseUri.authority;
		}
		targetUri.scheme = baseUri.scheme;
	}

	targetUri.fragment = referenceUri.fragment;
	return targetUri;
}

/**
 * Merges a relative-path reference with the path of the base URI.
 * https://tools.ietf.org/html/rfc3986#section-5.2.3
 * @param {URI} baseUri Components of base URI.
 * @param {URI} referenceUri Components of reference URI.
 * @returns {String} Merged path.
 */
function merge(baseUri, referenceUri) {
	if (baseUri.authority && baseUri.path === '') {
		return '/' + referenceUri.path;
	}

	var segmentsString = baseUri.path.indexOf('/') !== -1 ?
		baseUri.path.replace(/\/[^\/]+$/, '/') : '';

	return segmentsString + referenceUri.path;
}

/**
 * Removes dots segments from URI path.
 * https://tools.ietf.org/html/rfc3986#section-5.2.4
 * @param {String} uriPath URI path with possible dot segments.
 * @returns {String} URI path without dot segments.
 */
function removeDotSegments(uriPath) {
	if (!uriPath) {
		return '';
	}

	var inputBuffer = uriPath,
		newBuffer = '',
		nextSegment = '',
		outputBuffer = '';

	while (inputBuffer.length !== 0) {

		// If the input buffer begins with a prefix of "../" or "./",
		// then remove that prefix from the input buffer
		newBuffer = inputBuffer.replace(/^\.?\.\//, '');
		if (newBuffer !== inputBuffer) {
			inputBuffer = newBuffer;
			continue;
		}

		// if the input buffer begins with a prefix of "/./" or "/.",
		// where "." is a complete path segment, then replace that
		// prefix with "/" in the input buffer
		newBuffer = inputBuffer.replace(/^((\/\.\/)|(\/\.$))/, '/');
		if (newBuffer !== inputBuffer) {
			inputBuffer = newBuffer;
			continue;
		}

		// if the input buffer begins with a prefix of "/../" or "/..",
		// where ".." is a complete path segment, then replace that
		// prefix with "/" in the input buffer and remove the last
		// segment and its preceding "/" (if any) from the output
		// buffer
		newBuffer = inputBuffer.replace(/^((\/\.\.\/)|(\/\.\.$))/, '/');
		if (newBuffer !== inputBuffer) {
			outputBuffer = outputBuffer.replace(/\/[^\/]+$/, '');
			inputBuffer = newBuffer;
			continue;
		}

		// if the input buffer consists only of "." or "..", then remove
		// that from the input buffer
		if (inputBuffer === '.' || inputBuffer === '..') {
			break;
		}

		// move the first path segment in the input buffer to the end of
		// the output buffer, including the initial "/" character (if
		// any) and any subsequent characters up to, but not including,
		// the next "/" character or the end of the input buffer
		nextSegment = /^\/?[^\/]*(\/|$)/.exec(inputBuffer)[0];
		nextSegment = nextSegment.replace(/([^\/])(\/$)/, '$1');
		inputBuffer = inputBuffer.substring(nextSegment.length);
		outputBuffer += nextSegment;
	}

	return outputBuffer;
}
},{"./Authority":46,"./Query":47,"./percentEncodingHelper":50}],49:[function(require,module,exports){
/*
 * catberry-uri
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry-uri's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry-uri that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = UserInfo;

var percentEncodingHelper = require('./percentEncodingHelper');

/**
 * Creates new instance of user information component parser.
 * https://tools.ietf.org/html/rfc3986#section-3.2.1
 * @param {String?} userInfoString User information component string.
 * @constructor
 */
function UserInfo(userInfoString) {
	if (typeof(userInfoString) === 'string' && userInfoString.length > 0) {
		var parts = userInfoString.split(':');
		if (typeof(parts[0]) === 'string') {
			this.user = percentEncodingHelper.decode(parts[0]);
		}
		if (typeof(parts[1]) === 'string') {
			this.password = percentEncodingHelper.decode(parts[1]);
		}
	}
}

/**
 * Current user component.
 * @type {String}
 */
UserInfo.prototype.user = null;

/**
 * Current password.
 * @type {String}
 */
UserInfo.prototype.password = null;

/**
 * Clones current user information.
 * @returns {UserInfo} New clone of current object.
 */
UserInfo.prototype.clone = function () {
	var userInfo = new UserInfo();
	if (typeof(this.user) === 'string') {
		userInfo.user = this.user;
	}
	if (typeof(this.password) === 'string') {
		userInfo.password = this.password;
	}
	return userInfo;
};

/**
 * Recombines user information components to userInfo string.
 * @returns {String} User information component string.
 */
UserInfo.prototype.toString = function () {
	var result = '';
	if (this.user !== undefined && this.user !== null) {
		var user = String(this.user);
		result += percentEncodingHelper
			.encodeUserInfoSubComponent(user);
	}
	if (this.password !== undefined && this.password !== null) {
		var password = String(this.password);
		result += ':' + percentEncodingHelper
			.encodeUserInfoSubComponent(password);
	}

	return result;
};
},{"./percentEncodingHelper":50}],50:[function(require,module,exports){
/*
 * catberry-uri
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry-uri's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry-uri that are not externally
 * maintained libraries.
 */

'use strict';

// https://tools.ietf.org/html/rfc3986#section-2.1

module.exports = {
	/**
	 * Encodes authority user information sub-component according to RFC 3986.
	 * @param {String} string Component to encode.
	 * @returns {String} Encoded component.
	 */
	encodeUserInfoSubComponent: function (string) {
		return string.replace(
			// https://tools.ietf.org/html/rfc3986#section-3.2.1
			/[^\w\.~\-!\$&'\(\)\*\+,;=]/g, encodeURIComponent
		);
	},
	/**
	 * Encodes authority host component according to RFC 3986.
	 * @param {String} string Component to encode.
	 * @returns {String} Encoded component.
	 */
	encodeHost: function (string) {
		return string.replace(
			// https://tools.ietf.org/html/rfc3986#section-3.2.2
			/[^\w\.~\-!\$&'\(\)\*\+,;=:\[\]]/g, encodeURIComponent
		);

	},
	/**
	 * Encodes URI path component according to RFC 3986.
	 * @param {String} string Component to encode.
	 * @returns {String} Encoded component.
	 */
	encodePath: function (string) {
		return string.replace(
			// https://tools.ietf.org/html/rfc3986#section-3.3
			/[^\w\.~\-!\$&'\(\)\*\+,;=:@\/]/g, encodeURIComponent
		);
	},
	/**
	 * Encodes query sub-component according to RFC 3986.
	 * @param {String} string Component to encode.
	 * @returns {String} Encoded component.
	 */
	encodeQuerySubComponent: function (string) {
		return string.replace(
			// https://tools.ietf.org/html/rfc3986#section-3.4
			/[^\w\.~\-!\$'\(\)\*\+,;:@\/\?]/g, encodeURIComponent
		);
	},

	/**
	 * Encodes URI fragment component according to RFC 3986.
	 * @param {String} string Component to encode.
	 * @returns {String} Encoded component.
	 */
	encodeFragment: function (string) {
		return string.replace(
			// https://tools.ietf.org/html/rfc3986#section-3.5
			/[^\w\.~\-!\$&'\(\)\*\+,;=:@\/\?]/g, encodeURIComponent
		);
	},

	/**
	 * Decodes percent encoded component.
	 * @param {String} string Component to decode.
	 * @returns {String} Decoded component.
	 */
	decode: function (string) {
		return decodeURIComponent(string);
	}
};
},{}],51:[function(require,module,exports){
'use strict';

module.exports = require('./lib')

},{"./lib":56}],52:[function(require,module,exports){
'use strict';

var asap = require('asap/raw');

function noop() {}

// States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

// All `_` prefixed properties will be reduced to `_{random number}`
// at build time to obfuscate them and discourage their use.
// We don't use symbols or Object.defineProperty to fully hide them
// because the performance isn't good enough.


// to avoid using try/catch inside critical functions, we
// extract them to here.
var LAST_ERROR = null;
var IS_ERROR = {};
function getThen(obj) {
  try {
    return obj.then;
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

function tryCallOne(fn, a) {
  try {
    return fn(a);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}
function tryCallTwo(fn, a, b) {
  try {
    fn(a, b);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

module.exports = Promise;

function Promise(fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('not a function');
  }
  this._32 = 0;
  this._8 = null;
  this._89 = [];
  if (fn === noop) return;
  doResolve(fn, this);
}
Promise._83 = noop;

Promise.prototype.then = function(onFulfilled, onRejected) {
  if (this.constructor !== Promise) {
    return safeThen(this, onFulfilled, onRejected);
  }
  var res = new Promise(noop);
  handle(this, new Handler(onFulfilled, onRejected, res));
  return res;
};

function safeThen(self, onFulfilled, onRejected) {
  return new self.constructor(function (resolve, reject) {
    var res = new Promise(noop);
    res.then(resolve, reject);
    handle(self, new Handler(onFulfilled, onRejected, res));
  });
};
function handle(self, deferred) {
  while (self._32 === 3) {
    self = self._8;
  }
  if (self._32 === 0) {
    self._89.push(deferred);
    return;
  }
  asap(function() {
    var cb = self._32 === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      if (self._32 === 1) {
        resolve(deferred.promise, self._8);
      } else {
        reject(deferred.promise, self._8);
      }
      return;
    }
    var ret = tryCallOne(cb, self._8);
    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR);
    } else {
      resolve(deferred.promise, ret);
    }
  });
}
function resolve(self, newValue) {
  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  if (newValue === self) {
    return reject(
      self,
      new TypeError('A promise cannot be resolved with itself.')
    );
  }
  if (
    newValue &&
    (typeof newValue === 'object' || typeof newValue === 'function')
  ) {
    var then = getThen(newValue);
    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR);
    }
    if (
      then === self.then &&
      newValue instanceof Promise
    ) {
      self._32 = 3;
      self._8 = newValue;
      finale(self);
      return;
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), self);
      return;
    }
  }
  self._32 = 1;
  self._8 = newValue;
  finale(self);
}

function reject(self, newValue) {
  self._32 = 2;
  self._8 = newValue;
  finale(self);
}
function finale(self) {
  for (var i = 0; i < self._89.length; i++) {
    handle(self, self._89[i]);
  }
  self._89 = null;
}

function Handler(onFulfilled, onRejected, promise){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, promise) {
  var done = false;
  var res = tryCallTwo(fn, function (value) {
    if (done) return;
    done = true;
    resolve(promise, value);
  }, function (reason) {
    if (done) return;
    done = true;
    reject(promise, reason);
  })
  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
  }
}

},{"asap/raw":60}],53:[function(require,module,exports){
'use strict';

var Promise = require('./core.js');

module.exports = Promise;
Promise.prototype.done = function (onFulfilled, onRejected) {
  var self = arguments.length ? this.then.apply(this, arguments) : this;
  self.then(null, function (err) {
    setTimeout(function () {
      throw err;
    }, 0);
  });
};

},{"./core.js":52}],54:[function(require,module,exports){
'use strict';

//This file contains the ES6 extensions to the core Promises/A+ API

var Promise = require('./core.js');
var asap = require('asap/raw');

module.exports = Promise;

/* Static Functions */

var TRUE = valuePromise(true);
var FALSE = valuePromise(false);
var NULL = valuePromise(null);
var UNDEFINED = valuePromise(undefined);
var ZERO = valuePromise(0);
var EMPTYSTRING = valuePromise('');

function valuePromise(value) {
  var p = new Promise(Promise._83);
  p._32 = 1;
  p._8 = value;
  return p;
}
Promise.resolve = function (value) {
  if (value instanceof Promise) return value;

  if (value === null) return NULL;
  if (value === undefined) return UNDEFINED;
  if (value === true) return TRUE;
  if (value === false) return FALSE;
  if (value === 0) return ZERO;
  if (value === '') return EMPTYSTRING;

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then;
      if (typeof then === 'function') {
        return new Promise(then.bind(value));
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex);
      });
    }
  }
  return valuePromise(value);
};

Promise.all = function (arr) {
  var args = Array.prototype.slice.call(arr);

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([]);
    var remaining = args.length;
    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        if (val instanceof Promise && val.then === Promise.prototype.then) {
          while (val._32 === 3) {
            val = val._8;
          }
          if (val._32 === 1) return res(i, val._8);
          if (val._32 === 2) reject(val._8);
          val.then(function (val) {
            res(i, val);
          }, reject);
          return;
        } else {
          var then = val.then;
          if (typeof then === 'function') {
            var p = new Promise(then.bind(val));
            p.then(function (val) {
              res(i, val);
            }, reject);
            return;
          }
        }
      }
      args[i] = val;
      if (--remaining === 0) {
        resolve(args);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value);
  });
};

Promise.race = function (values) {
  return new Promise(function (resolve, reject) {
    values.forEach(function(value){
      Promise.resolve(value).then(resolve, reject);
    });
  });
};

/* Prototype Methods */

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};

},{"./core.js":52,"asap/raw":60}],55:[function(require,module,exports){
'use strict';

var Promise = require('./core.js');

module.exports = Promise;
Promise.prototype['finally'] = function (f) {
  return this.then(function (value) {
    return Promise.resolve(f()).then(function () {
      return value;
    });
  }, function (err) {
    return Promise.resolve(f()).then(function () {
      throw err;
    });
  });
};

},{"./core.js":52}],56:[function(require,module,exports){
'use strict';

module.exports = require('./core.js');
require('./done.js');
require('./finally.js');
require('./es6-extensions.js');
require('./node-extensions.js');

},{"./core.js":52,"./done.js":53,"./es6-extensions.js":54,"./finally.js":55,"./node-extensions.js":57}],57:[function(require,module,exports){
'use strict';

// This file contains then/promise specific extensions that are only useful
// for node.js interop

var Promise = require('./core.js');
var asap = require('asap');

module.exports = Promise;

/* Static Functions */

Promise.denodeify = function (fn, argumentCount) {
  argumentCount = argumentCount || Infinity;
  return function () {
    var self = this;
    var args = Array.prototype.slice.call(arguments);
    return new Promise(function (resolve, reject) {
      while (args.length && args.length > argumentCount) {
        args.pop();
      }
      args.push(function (err, res) {
        if (err) reject(err);
        else resolve(res);
      })
      var res = fn.apply(self, args);
      if (res &&
        (
          typeof res === 'object' ||
          typeof res === 'function'
        ) &&
        typeof res.then === 'function'
      ) {
        resolve(res);
      }
    })
  }
}
Promise.nodeify = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    var callback =
      typeof args[args.length - 1] === 'function' ? args.pop() : null;
    var ctx = this;
    try {
      return fn.apply(this, arguments).nodeify(callback, ctx);
    } catch (ex) {
      if (callback === null || typeof callback == 'undefined') {
        return new Promise(function (resolve, reject) {
          reject(ex);
        });
      } else {
        asap(function () {
          callback.call(ctx, ex);
        })
      }
    }
  }
}

Promise.prototype.nodeify = function (callback, ctx) {
  if (typeof callback != 'function') return this;

  this.then(function (value) {
    asap(function () {
      callback.call(ctx, null, value);
    });
  }, function (err) {
    asap(function () {
      callback.call(ctx, err);
    });
  });
}

},{"./core.js":52,"asap":58}],58:[function(require,module,exports){
"use strict";

// rawAsap provides everything we need except exception management.
var rawAsap = require("./raw");
// RawTasks are recycled to reduce GC churn.
var freeTasks = [];
// We queue errors to ensure they are thrown in right order (FIFO).
// Array-as-queue is good enough here, since we are just dealing with exceptions.
var pendingErrors = [];
var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

function throwFirstError() {
    if (pendingErrors.length) {
        throw pendingErrors.shift();
    }
}

/**
 * Calls a task as soon as possible after returning, in its own event, with priority
 * over other events like animation, reflow, and repaint. An error thrown from an
 * event will not interrupt, nor even substantially slow down the processing of
 * other events, but will be rather postponed to a lower priority event.
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */
module.exports = asap;
function asap(task) {
    var rawTask;
    if (freeTasks.length) {
        rawTask = freeTasks.pop();
    } else {
        rawTask = new RawTask();
    }
    rawTask.task = task;
    rawAsap(rawTask);
}

// We wrap tasks with recyclable task objects.  A task object implements
// `call`, just like a function.
function RawTask() {
    this.task = null;
}

// The sole purpose of wrapping the task is to catch the exception and recycle
// the task object after its single use.
RawTask.prototype.call = function () {
    try {
        this.task.call();
    } catch (error) {
        if (asap.onerror) {
            // This hook exists purely for testing purposes.
            // Its name will be periodically randomized to break any code that
            // depends on its existence.
            asap.onerror(error);
        } else {
            // In a web browser, exceptions are not fatal. However, to avoid
            // slowing down the queue of pending tasks, we rethrow the error in a
            // lower priority turn.
            pendingErrors.push(error);
            requestErrorThrow();
        }
    } finally {
        this.task = null;
        freeTasks[freeTasks.length] = this;
    }
};

},{"./raw":59}],59:[function(require,module,exports){
(function (global){
"use strict";

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.
var BrowserMutationObserver = global.MutationObserver || global.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],60:[function(require,module,exports){
(function (process){
"use strict";

var domain; // The domain module is executed on demand
var hasSetImmediate = typeof setImmediate === "function";

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including network IO events in Node.js.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Avoids a function call
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory excaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

rawAsap.requestFlush = requestFlush;
function requestFlush() {
    // Ensure flushing is not bound to any domain.
    // It is not sufficient to exit the domain, because domains exist on a stack.
    // To execute code outside of any domain, the following dance is necessary.
    var parentDomain = process.domain;
    if (parentDomain) {
        if (!domain) {
            // Lazy execute the domain module.
            // Only employed if the user elects to use domains.
            domain = require("domain");
        }
        domain.active = process.domain = null;
    }

    // `setImmediate` is slower that `process.nextTick`, but `process.nextTick`
    // cannot handle recursion.
    // `requestFlush` will only be called recursively from `asap.js`, to resume
    // flushing after an error is thrown into a domain.
    // Conveniently, `setImmediate` was introduced in the same version
    // `process.nextTick` started throwing recursion errors.
    if (flushing && hasSetImmediate) {
        setImmediate(flush);
    } else {
        process.nextTick(flush);
    }

    if (parentDomain) {
        domain.active = process.domain = parentDomain;
    }
}

}).call(this,require('_process'))

},{"_process":37,"domain":34}],61:[function(require,module,exports){
'use strict';

// This file contains definitions of rules how location URLs are translated
// to parameters for stores in Catberry application.
//
// Format:
// /some/:parameter[store1,store2,store3]
//
// More details here:
// https://github.com/catberry/catberry/blob/master/docs/index.md#routing

module.exports = [
	'/'
];

},{}],62:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

/**
 * This module is a template and it is used only with some string replaces
 * by BrowserBundleBuilder module. It does not work by itself.
 */

'use strict';

var stores = [

{name: 'Main', constructor: require('./catberry_stores\\Main.js')}
];

var components = [

{name: 'document', constructor: require('./catberry_components\\document\\Document.js'), properties: {"name":"document","template":"./document.jade","logic":"./Document.js"}, templateSource: 'function template(locals) {\nvar buf = [];\nvar jade_mixins = {};\nvar jade_interp;\n\nbuf.push("<!DOCTYPE html><html><head></head><body><cat-hello-world id=\\"unique\\" cat-store=\\"Main\\"></cat-hello-world></body></html>");;return buf.join("");\n}', errorTemplateSource: null},
{name: 'head', constructor: require('./catberry_components\\head\\Head.js'), properties: {"name":"head","template":"./head.jade","logic":"./Head.js"}, templateSource: 'function template(locals) {\nvar buf = [];\nvar jade_mixins = {};\nvar jade_interp;\n;var locals_for_with = (locals || {});(function (title) {\nbuf.push("<meta charset=\\"UTF-8\\"/><title>" + (jade.escape((jade_interp = title) == null ? \'\' : jade_interp)) + "</title><script src=\\"bundle.js\\"></script>");}.call(this,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));;return buf.join("");\n}', errorTemplateSource: null},
{name: 'hello-world', constructor: require('./catberry_components\\hello-world\\HelloWorld.js'), properties: {"name":"hello-world","template":"./hello.jade","errorTemplate":"./error.jade","logic":"./HelloWorld.js"}, templateSource: 'function template(locals) {\nvar buf = [];\nvar jade_mixins = {};\nvar jade_interp;\n;var locals_for_with = (locals || {});(function (who) {\nbuf.push("<h1>Hello, " + (jade.escape((jade_interp = who) == null ? \'\' : jade_interp)) + "!</h1>");}.call(this,"who" in locals_for_with?locals_for_with.who:typeof who!=="undefined"?who:undefined));;return buf.join("");\n}', errorTemplateSource: 'function template(locals) {\nvar buf = [];\nvar jade_mixins = {};\nvar jade_interp;\n\n;return buf.join("");\n}'}
];

var util = require('util'),
	routeDefinitions = require('./routes.js') || [],
	moduleHelper = require('./node_modules/catberry/lib/helpers/moduleHelper.js'),
	Catberry = require('./node_modules/catberry/browser/Catberry.js'),
	Logger = require('./node_modules/catberry/browser/Logger.js'),
	BootstrapperBase =
		require('./node_modules/catberry/lib/base/BootstrapperBase.js'),
	StoreDispatcher = require('./node_modules/catberry/lib/StoreDispatcher'),
	ModuleApiProvider =
		require('./node_modules/catberry/browser/providers/ModuleApiProvider'),
	CookieWrapper = require('./node_modules/catberry/browser/CookieWrapper');

var INFO_DOCUMENT_UPDATED = 'Document updated (%d store(s) changed)',
	INFO_COMPONENT_BOUND = 'Component "%s" is bound',
	INFO_COMPONENT_UNBOUND = 'Component "%s" is unbound';

util.inherits(Bootstrapper, BootstrapperBase);

/**
 * Creates new instance of the browser Catberry's bootstrapper.
 * @constructor
 * @extends BootstrapperBase
 */
function Bootstrapper() {
	BootstrapperBase.call(this, Catberry);
}

/**
 * Configures Catberry's service locator.
 * @param {Object} configObject Application config object.
 * @param {ServiceLocator} locator Service locator to configure.
 */
Bootstrapper.prototype.configure = function (configObject, locator) {
	BootstrapperBase.prototype.configure.call(this, configObject, locator);

	// if browser still does not have promises then add it.
	if (!('Promise' in window)) {
		window.Promise = locator.resolve('promise');
	}

	locator.register('storeDispatcher', StoreDispatcher, configObject, true);
	locator.register(
		'moduleApiProvider', ModuleApiProvider, configObject, true
	);
	locator.register('cookieWrapper', CookieWrapper, configObject, true);

	locator.registerInstance('window', window);

	var loggerConfig = configObject.logger || {},
		logger = new Logger(loggerConfig.levels);
	locator.registerInstance('logger', logger);
	window.onerror = function errorHandler(msg, uri, line) {
		logger.fatal(uri + ':' + line + ' ' + msg);
		return true;
	};
	var eventBus = locator.resolve('eventBus');
	this._wrapEventsWithLogger(eventBus, logger);

	routeDefinitions.forEach(function (routeDefinition) {
		locator.registerInstance('routeDefinition', routeDefinition);
	});

	stores.forEach(function (store) {
		locator.registerInstance('store', store);
	});

	components.forEach(function (component) {
		locator.registerInstance('component', component);
	});
};

/**
 * Wraps event bus with log messages.
 * @param {EventEmitter} eventBus Event emitter that implements event bus.
 * @param {Logger} logger Logger to write messages.
 * @protected
 */
Bootstrapper.prototype._wrapEventsWithLogger = function (eventBus, logger) {
	BootstrapperBase.prototype._wrapEventsWithLogger
		.call(this, eventBus, logger);
	eventBus
		.on('documentUpdated', function (args) {
			logger.info(util.format(INFO_DOCUMENT_UPDATED, args.length));
		})
		.on('componentBound', function (args) {
			logger.info(util.format(
				INFO_COMPONENT_BOUND,
				args.element.tagName + (args.id ? '#' + args.id : '')
			));
		})
		.on('componentUnbound', function (args) {
			logger.info(util.format(
				INFO_COMPONENT_UNBOUND,
				args.element.tagName + (args.id ? '#' + args.id : '')
			));
		});
};

module.exports = new Bootstrapper();
},{"./catberry_components\\document\\Document.js":2,"./catberry_components\\head\\Head.js":3,"./catberry_components\\hello-world\\HelloWorld.js":4,"./catberry_stores\\Main.js":5,"./node_modules/catberry/browser/Catberry.js":10,"./node_modules/catberry/browser/CookieWrapper":11,"./node_modules/catberry/browser/Logger.js":13,"./node_modules/catberry/browser/providers/ModuleApiProvider":17,"./node_modules/catberry/lib/StoreDispatcher":21,"./node_modules/catberry/lib/base/BootstrapperBase.js":22,"./node_modules/catberry/lib/helpers/moduleHelper.js":29,"./routes.js":61,"util":39}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYnJvd3Nlci5qcyIsImNhdGJlcnJ5X2NvbXBvbmVudHMvZG9jdW1lbnQvRG9jdW1lbnQuanMiLCJjYXRiZXJyeV9jb21wb25lbnRzL2hlYWQvSGVhZC5qcyIsImNhdGJlcnJ5X2NvbXBvbmVudHMvaGVsbG8td29ybGQvSGVsbG9Xb3JsZC5qcyIsImNhdGJlcnJ5X3N0b3Jlcy9NYWluLmpzIiwiY29uZmlnL2Vudmlyb25tZW50Lmpzb24iLCJub2RlX21vZHVsZXMvY2F0YmVycnktamFkZS9icm93c2VyL1RlbXBsYXRlUHJvdmlkZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnktamFkZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS1qYWRlL25vZGVfbW9kdWxlcy9qYWRlL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvYnJvd3Nlci9DYXRiZXJyeS5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9icm93c2VyL0Nvb2tpZVdyYXBwZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvYnJvd3Nlci9Eb2N1bWVudFJlbmRlcmVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2Jyb3dzZXIvTG9nZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2Jyb3dzZXIvUmVxdWVzdFJvdXRlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9icm93c2VyL2xvYWRlcnMvQ29tcG9uZW50TG9hZGVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2Jyb3dzZXIvbG9hZGVycy9TdG9yZUxvYWRlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9icm93c2VyL3Byb3ZpZGVycy9Nb2R1bGVBcGlQcm92aWRlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvQ29udGV4dEZhY3RvcnkuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL1NlcmlhbFdyYXBwZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL1N0b3JlRGlzcGF0Y2hlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvYmFzZS9Cb290c3RyYXBwZXJCYXNlLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9iYXNlL0NhdGJlcnJ5QmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvYmFzZS9Db29raWVXcmFwcGVyQmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvYmFzZS9Eb2N1bWVudFJlbmRlcmVyQmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvYmFzZS9Mb2FkZXJCYXNlLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9iYXNlL01vZHVsZUFwaVByb3ZpZGVyQmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvaGVscGVycy9lcnJvckhlbHBlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvaGVscGVycy9tb2R1bGVIZWxwZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL2hlbHBlcnMvcHJvcGVydHlIZWxwZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL2hlbHBlcnMvcm91dGVIZWxwZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL3Byb3ZpZGVycy9TdGF0ZVByb3ZpZGVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXJlc29sdmUvZW1wdHkuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2RvbWFpbi1icm93c2VyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3V0aWwvc3VwcG9ydC9pc0J1ZmZlckJyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3V0aWwvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvY2F0YmVycnktbG9jYXRvci9saWIvQ29uc3RydWN0b3JUb2tlbml6ZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2NhdGJlcnJ5LWxvY2F0b3IvbGliL1NlcnZpY2VMb2NhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9jYXRiZXJyeS11aHIvYnJvd3Nlci9VSFIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2NhdGJlcnJ5LXVoci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvY2F0YmVycnktdWhyL2xpYi9VSFJCYXNlLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9jYXRiZXJyeS11cmkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2NhdGJlcnJ5LXVyaS9saWIvQXV0aG9yaXR5LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9jYXRiZXJyeS11cmkvbGliL1F1ZXJ5LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9jYXRiZXJyeS11cmkvbGliL1VSSS5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvY2F0YmVycnktdXJpL2xpYi9Vc2VySW5mby5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvY2F0YmVycnktdXJpL2xpYi9wZXJjZW50RW5jb2RpbmdIZWxwZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL3Byb21pc2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL3Byb21pc2UvbGliL2NvcmUuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL3Byb21pc2UvbGliL2RvbmUuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL3Byb21pc2UvbGliL2VzNi1leHRlbnNpb25zLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9wcm9taXNlL2xpYi9maW5hbGx5LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9wcm9taXNlL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvcHJvbWlzZS9saWIvbm9kZS1leHRlbnNpb25zLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9wcm9taXNlL25vZGVfbW9kdWxlcy9hc2FwL2Jyb3dzZXItYXNhcC5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvcHJvbWlzZS9ub2RlX21vZHVsZXMvYXNhcC9icm93c2VyLXJhdy5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvcHJvbWlzZS9ub2RlX21vZHVsZXMvYXNhcC9yYXcuanMiLCJyb3V0ZXMuanMiLCJfX0Jyb3dzZXJCdW5kbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1WkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzFrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3YkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDNU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2F0YmVycnkgPSByZXF1aXJlKCdjYXRiZXJyeScpLFxuXHR0ZW1wbGF0ZUVuZ2luZSA9IHJlcXVpcmUoJ2NhdGJlcnJ5LWphZGUnKSxcblx0Ly8gdGhpcyBjb25maWcgd2lsbCBiZSByZXBsYWNlZCBieSBgLi9jb25maWcvYnJvd3Nlci5qc29uYCB3aGVuIGJ1aWxkaW5nXG5cdC8vIGJlY2F1c2Ugb2YgYGJyb3dzZXJgIGZpZWxkIGluIGBwYWNrYWdlLmpzb25gXG5cdGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnL2Vudmlyb25tZW50Lmpzb24nKSxcblx0Y2F0ID0gY2F0YmVycnkuY3JlYXRlKGNvbmZpZyk7XG5cbnRlbXBsYXRlRW5naW5lLnJlZ2lzdGVyKGNhdC5sb2NhdG9yKTtcbmNhdC5zdGFydFdoZW5SZWFkeSgpO1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gRG9jdW1lbnQ7XG5cbi8qXG4gKiBUaGlzIGlzIGEgQ2F0YmVycnkgQ2F0LWNvbXBvbmVudCBmaWxlLlxuICogTW9yZSBkZXRhaWxzIGNhbiBiZSBmb3VuZCBoZXJlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY2F0YmVycnkvY2F0YmVycnkvYmxvYi9tYXN0ZXIvZG9jcy9pbmRleC5tZCNjYXQtY29tcG9uZW50c1xuICovXG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgXCJkb2N1bWVudFwiIGNvbXBvbmVudC5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBEb2N1bWVudCgpIHtcblxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWQ7XG5cbi8qXG4gKiBUaGlzIGlzIGEgQ2F0YmVycnkgQ2F0LWNvbXBvbmVudCBmaWxlLlxuICogTW9yZSBkZXRhaWxzIGNhbiBiZSBmb3VuZCBoZXJlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY2F0YmVycnkvY2F0YmVycnkvYmxvYi9tYXN0ZXIvZG9jcy9pbmRleC5tZCNjYXQtY29tcG9uZW50c1xuICovXG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgXCJoZWFkXCIgY29tcG9uZW50LlxuICogQHBhcmFtIHtPYmplY3R9ICRjb25maWcgQ2F0YmVycnkgYXBwbGljYXRpb24gY29uZmlnLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEhlYWQoJGNvbmZpZykge1xuXHR0aGlzLl9jb25maWcgPSAkY29uZmlnO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgY29uZmlnLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbkhlYWQucHJvdG90eXBlLl9jb25maWcgPSBudWxsO1xuXG4vKipcbiAqIEdldHMgZGF0YSBmb3IgdGVtcGxhdGUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBEYXRhIG9iamVjdC5cbiAqL1xuSGVhZC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy5fY29uZmlnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBIZWxsb1dvcmxkO1xuXG4vKlxuICogVGhpcyBpcyBhIENhdGJlcnJ5IENhdC1jb21wb25lbnQgZmlsZS5cbiAqIE1vcmUgZGV0YWlscyBjYW4gYmUgZm91bmQgaGVyZVxuICogaHR0cHM6Ly9naXRodWIuY29tL2NhdGJlcnJ5L2NhdGJlcnJ5L2Jsb2IvbWFzdGVyL2RvY3MvaW5kZXgubWQjY2F0LWNvbXBvbmVudHNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIFwiaGVsbG8td29ybGRcIiBjb21wb25lbnQuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gSGVsbG9Xb3JsZCgpIHtcblxufVxuXG4vKipcbiAqIEdldHMgZGF0YSBmb3IgdGVtcGxhdGUuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBQcm9taXNlIGZvciBkYXRhLlxuICovXG5IZWxsb1dvcmxkLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLiRjb250ZXh0LmdldFN0b3JlRGF0YSgpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBNYWluO1xuXG4vKlxuICogVGhpcyBpcyBhIENhdGJlcnJ5IFN0b3JlIGZpbGUuXG4gKiBNb3JlIGRldGFpbHMgY2FuIGJlIGZvdW5kIGhlcmVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jYXRiZXJyeS9jYXRiZXJyeS9ibG9iL21hc3Rlci9kb2NzL2luZGV4Lm1kI3N0b3Jlc1xuICovXG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgXCJNYWluXCIgc3RvcmUuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTWFpbigpIHtcblxufVxuXG4vKipcbiAqIExvYWRzIGRhdGEgZnJvbSBzb21ld2hlcmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBEYXRhIG9iamVjdC5cbiAqL1xuTWFpbi5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHt3aG86ICdXb3JsZCd9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcblx0XCJ0aXRsZVwiOiBcIkNhdGJlcnJ5IFByb2plY3RcIixcblx0XCJzZXJ2ZXJcIjoge1xuXHRcdFwicG9ydFwiOiAzMDAwXG5cdH1cbn1cbiIsIi8qXG4gKiBjYXRiZXJyeS1qYWRlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnktamFkZSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnktamFkZSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRlbXBsYXRlUHJvdmlkZXI7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgSmFkZSB0ZW1wbGF0ZSBwcm92aWRlci5cbiAqIEBwYXJhbSB7SmFkZX0gJGphZGUgSmFkZSBmYWN0b3J5LlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFRlbXBsYXRlUHJvdmlkZXIoJGphZGUpIHtcblx0dGhpcy5famFkZSA9ICRqYWRlO1xuXHR0aGlzLl90ZW1wbGF0ZXMgPSB7fTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IEphZGUgZmFjdG9yeS5cbiAqIEB0eXBlIHtKYWRlfVxuICogQHByaXZhdGVcbiAqL1xuVGVtcGxhdGVQcm92aWRlci5wcm90b3R5cGUuX2phZGUgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc2V0IG9mIHJlZ2lzdGVyZWQgdGVtcGxhdGVzLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cblRlbXBsYXRlUHJvdmlkZXIucHJvdG90eXBlLl90ZW1wbGF0ZXMgPSBudWxsO1xuXG4vKipcbiAqIFJlZ2lzdGVycyBjb21waWxlZCAocHJlY29tcGlsZWQpIEphZGUgdGVtcGxhdGUuXG4gKiBodHRwOi8vamFkZWpzLmNvbS9yZWZlcmVuY2UuaHRtbFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGVtcGxhdGUgbmFtZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBjb21waWxlZCBDb21waWxlZCB0ZW1wbGF0ZSBzb3VyY2UuXG4gKi9cblRlbXBsYXRlUHJvdmlkZXIucHJvdG90eXBlLnJlZ2lzdGVyQ29tcGlsZWQgPSBmdW5jdGlvbiAobmFtZSwgY29tcGlsZWQpIHtcblx0Ly8ganNoaW50IGV2aWw6dHJ1ZVxuXHR2YXIgZ2V0VGVtcGxhdGUgPSBuZXcgRnVuY3Rpb24oJ2phZGUnLCAncmV0dXJuICcgKyBjb21waWxlZCArICc7Jyk7XG5cdHRoaXMuX3RlbXBsYXRlc1tuYW1lXSA9IGdldFRlbXBsYXRlKHRoaXMuX2phZGUpO1xufTtcblxuLyoqXG4gKiBSZW5kZXJzIHRlbXBsYXRlIHdpdGggc3BlY2lmaWVkIGRhdGEuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRlbXBsYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgRGF0YSBjb250ZXh0IGZvciB0ZW1wbGF0ZS5cbiAqIEByZXR1cm5zIHsqfVxuICovXG5UZW1wbGF0ZVByb3ZpZGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAobmFtZSwgZGF0YSkge1xuXHRpZiAoIXRoaXMuX3RlbXBsYXRlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ05vIHN1Y2ggdGVtcGxhdGUnKSk7XG5cdH1cblxuXHR2YXIgcHJvbWlzZTtcblx0dHJ5IHtcblx0XHRwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3RlbXBsYXRlc1tuYW1lXShkYXRhKSk7XG5cdH0gY2F0Y2goZSkge1xuXHRcdHByb21pc2UgPSBQcm9taXNlLnJlamVjdChlKTtcblx0fVxuXHRyZXR1cm4gcHJvbWlzZTtcbn07IiwiLypcbiAqIGNhdGJlcnJ5LWphZGVcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeS1qYWRlJ3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeS1qYWRlIHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBKYWRlID0gcmVxdWlyZSgnamFkZScpLFxuXHRUZW1wbGF0ZVByb3ZpZGVyID0gcmVxdWlyZSgnLi9saWIvVGVtcGxhdGVQcm92aWRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0cmVnaXN0ZXI6IGZ1bmN0aW9uIChsb2NhdG9yLCBjb25maWcpIHtcblx0XHRjb25maWcgPSBjb25maWcgfHwge307XG5cdFx0bG9jYXRvci5yZWdpc3Rlckluc3RhbmNlKCdqYWRlJywgSmFkZSk7XG5cdFx0bG9jYXRvci5yZWdpc3RlcigndGVtcGxhdGVQcm92aWRlcicsIFRlbXBsYXRlUHJvdmlkZXIsIGNvbmZpZywgdHJ1ZSk7XG5cdH0sXG5cdEphZGU6IEphZGUsXG5cdFRlbXBsYXRlUHJvdmlkZXI6IFRlbXBsYXRlUHJvdmlkZXJcbn07IiwiIWZ1bmN0aW9uKGUpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPWUoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sZSk7ZWxzZXt2YXIgZjtcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P2Y9d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Zj1nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJihmPXNlbGYpLGYuamFkZT1lKCl9fShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNZXJnZSB0d28gYXR0cmlidXRlIG9iamVjdHMgZ2l2aW5nIHByZWNlZGVuY2VcbiAqIHRvIHZhbHVlcyBpbiBvYmplY3QgYGJgLiBDbGFzc2VzIGFyZSBzcGVjaWFsLWNhc2VkXG4gKiBhbGxvd2luZyBmb3IgYXJyYXlzIGFuZCBtZXJnaW5nL2pvaW5pbmcgYXBwcm9wcmlhdGVseVxuICogcmVzdWx0aW5nIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcGFyYW0ge09iamVjdH0gYlxuICogQHJldHVybiB7T2JqZWN0fSBhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IG1lcmdlKGF0dHJzLCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG4gIHZhciBhYyA9IGFbJ2NsYXNzJ107XG4gIHZhciBiYyA9IGJbJ2NsYXNzJ107XG5cbiAgaWYgKGFjIHx8IGJjKSB7XG4gICAgYWMgPSBhYyB8fCBbXTtcbiAgICBiYyA9IGJjIHx8IFtdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhYykpIGFjID0gW2FjXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYmMpKSBiYyA9IFtiY107XG4gICAgYVsnY2xhc3MnXSA9IGFjLmNvbmNhdChiYykuZmlsdGVyKG51bGxzKTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSAhPSAnY2xhc3MnKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIEZpbHRlciBudWxsIGB2YWxgcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG51bGxzKHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsICE9PSAnJztcbn1cblxuLyoqXG4gKiBqb2luIGFycmF5IGFzIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5qb2luQ2xhc3NlcyA9IGpvaW5DbGFzc2VzO1xuZnVuY3Rpb24gam9pbkNsYXNzZXModmFsKSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsLm1hcChqb2luQ2xhc3NlcykgOlxuICAgICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpID8gT2JqZWN0LmtleXModmFsKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdmFsW2tleV07IH0pIDpcbiAgICBbdmFsXSkuZmlsdGVyKG51bGxzKS5qb2luKCcgJyk7XG59XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGNsYXNzZXNcbiAqIEBwYXJhbSB7QXJyYXkuPEJvb2xlYW4+fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xzID0gZnVuY3Rpb24gY2xzKGNsYXNzZXMsIGVzY2FwZWQpIHtcbiAgdmFyIGJ1ZiA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZXNjYXBlZCAmJiBlc2NhcGVkW2ldKSB7XG4gICAgICBidWYucHVzaChleHBvcnRzLmVzY2FwZShqb2luQ2xhc3NlcyhbY2xhc3Nlc1tpXV0pKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1Zi5wdXNoKGpvaW5DbGFzc2VzKGNsYXNzZXNbaV0pKTtcbiAgICB9XG4gIH1cbiAgdmFyIHRleHQgPSBqb2luQ2xhc3NlcyhidWYpO1xuICBpZiAodGV4dC5sZW5ndGgpIHtcbiAgICByZXR1cm4gJyBjbGFzcz1cIicgKyB0ZXh0ICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cblxuZXhwb3J0cy5zdHlsZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWwpLm1hcChmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICAgIHJldHVybiBzdHlsZSArICc6JyArIHZhbFtzdHlsZV07XG4gICAgfSkuam9pbignOycpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWw7XG4gIH1cbn07XG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBmdW5jdGlvbiBhdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgdmFsID0gZXhwb3J0cy5zdHlsZSh2YWwpO1xuICB9XG4gIGlmICgnYm9vbGVhbicgPT0gdHlwZW9mIHZhbCB8fCBudWxsID09IHZhbCkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHJldHVybiAnICcgKyAodGVyc2UgPyBrZXkgOiBrZXkgKyAnPVwiJyArIGtleSArICdcIicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9IGVsc2UgaWYgKDAgPT0ga2V5LmluZGV4T2YoJ2RhdGEnKSAmJiAnc3RyaW5nJyAhPSB0eXBlb2YgdmFsKSB7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KHZhbCkuaW5kZXhPZignJicpICE9PSAtMSkge1xuICAgICAgY29uc29sZS53YXJuKCdTaW5jZSBKYWRlIDIuMC4wLCBhbXBlcnNhbmRzIChgJmApIGluIGRhdGEgYXR0cmlidXRlcyAnICtcbiAgICAgICAgICAgICAgICAgICAnd2lsbCBiZSBlc2NhcGVkIHRvIGAmYW1wO2AnKTtcbiAgICB9O1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgZWxpbWluYXRlIHRoZSBkb3VibGUgcXVvdGVzIGFyb3VuZCBkYXRlcyBpbiAnICtcbiAgICAgICAgICAgICAgICAgICAnSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArIFwiPSdcIiArIEpTT04uc3RyaW5naWZ5KHZhbCkucmVwbGFjZSgvJy9nLCAnJmFwb3M7JykgKyBcIidcIjtcbiAgfSBlbHNlIGlmIChlc2NhcGVkKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgZXhwb3J0cy5lc2NhcGUodmFsKSArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZXMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBmdW5jdGlvbiBhdHRycyhvYmosIHRlcnNlKXtcbiAgdmFyIGJ1ZiA9IFtdO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcblxuICBpZiAoa2V5cy5sZW5ndGgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICAgICwgdmFsID0gb2JqW2tleV07XG5cbiAgICAgIGlmICgnY2xhc3MnID09IGtleSkge1xuICAgICAgICBpZiAodmFsID0gam9pbkNsYXNzZXModmFsKSkge1xuICAgICAgICAgIGJ1Zi5wdXNoKCcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1Zi5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmVzY2FwZSA9IGZ1bmN0aW9uIGVzY2FwZShodG1sKXtcbiAgdmFyIHJlc3VsdCA9IFN0cmluZyhodG1sKVxuICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXG4gICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xuICBpZiAocmVzdWx0ID09PSAnJyArIGh0bWwpIHJldHVybiBodG1sO1xuICBlbHNlIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJlLXRocm93IHRoZSBnaXZlbiBgZXJyYCBpbiBjb250ZXh0IHRvIHRoZVxuICogdGhlIGphZGUgaW4gYGZpbGVuYW1lYCBhdCB0aGUgZ2l2ZW4gYGxpbmVub2AuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZW5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBsaW5lbm9cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmV0aHJvdyA9IGZ1bmN0aW9uIHJldGhyb3coZXJyLCBmaWxlbmFtZSwgbGluZW5vLCBzdHIpe1xuICBpZiAoIShlcnIgaW5zdGFuY2VvZiBFcnJvcikpIHRocm93IGVycjtcbiAgaWYgKCh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnIHx8ICFmaWxlbmFtZSkgJiYgIXN0cikge1xuICAgIGVyci5tZXNzYWdlICs9ICcgb24gbGluZSAnICsgbGluZW5vO1xuICAgIHRocm93IGVycjtcbiAgfVxuICB0cnkge1xuICAgIHN0ciA9IHN0ciB8fCByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKVxuICB9IGNhdGNoIChleCkge1xuICAgIHJldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdKYWRlJykgKyAnOicgKyBsaW5lbm9cbiAgICArICdcXG4nICsgY29udGV4dCArICdcXG5cXG4nICsgZXJyLm1lc3NhZ2U7XG4gIHRocm93IGVycjtcbn07XG5cbn0se1wiZnNcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbn0se31dfSx7fSxbMV0pKDEpXG59KTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBDYXRiZXJyeTtcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyksXG5cdENhdGJlcnJ5QmFzZSA9IHJlcXVpcmUoJy4uL2xpYi9iYXNlL0NhdGJlcnJ5QmFzZScpO1xuXG51dGlsLmluaGVyaXRzKENhdGJlcnJ5LCBDYXRiZXJyeUJhc2UpO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBicm93c2VyIHZlcnNpb24gb2YgQ2F0YmVycnkuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIENhdGJlcnJ5QmFzZVxuICovXG5mdW5jdGlvbiBDYXRiZXJyeSgpIHtcblx0Q2F0YmVycnlCYXNlLmNhbGwodGhpcyk7XG59XG5cbi8qKlxuICogQ3VycmVudCByZXF1ZXN0IHJvdXRlci5cbiAqIEB0eXBlIHtSZXF1ZXN0Um91dGVyfVxuICogQHByaXZhdGVcbiAqL1xuQ2F0YmVycnkucHJvdG90eXBlLl9yb3V0ZXIgPSBudWxsO1xuXG4vKipcbiAqIFdyYXBzIGN1cnJlbnQgSFRNTCBkb2N1bWVudCB3aXRoIENhdGJlcnJ5IGV2ZW50IGhhbmRsZXJzLlxuICovXG5DYXRiZXJyeS5wcm90b3R5cGUud3JhcERvY3VtZW50ID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLl9yb3V0ZXIgPSB0aGlzLmxvY2F0b3IucmVzb2x2ZSgncmVxdWVzdFJvdXRlcicpO1xufTtcblxuLyoqXG4gKiBTdGFydHMgQ2F0YmVycnkgYXBwbGljYXRpb24gd2hlbiBET00gaXMgcmVhZHkuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqL1xuQ2F0YmVycnkucHJvdG90eXBlLnN0YXJ0V2hlblJlYWR5ID0gZnVuY3Rpb24gKCkge1xuXHRpZiAod2luZG93LmNhdGJlcnJ5KSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXHR9XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGZ1bGZpbGwpIHtcblx0XHR3aW5kb3cuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYud3JhcERvY3VtZW50KCk7XG5cdFx0XHR3aW5kb3cuY2F0YmVycnkgPSBzZWxmO1xuXHRcdFx0ZnVsZmlsbCgpO1xuXHRcdH0pO1xuXHR9KTtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IENvb2tpZVdyYXBwZXI7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuXHRDb29raWVXcmFwcGVyQmFzZSA9IHJlcXVpcmUoJy4uL2xpYi9iYXNlL0Nvb2tpZVdyYXBwZXJCYXNlJyk7XG5cbnV0aWwuaW5oZXJpdHMoQ29va2llV3JhcHBlciwgQ29va2llV3JhcHBlckJhc2UpO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBicm93c2VyIGNvb2tpZSB3cmFwcGVyLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENvb2tpZVdyYXBwZXIoJHdpbmRvdykge1xuXHRDb29raWVXcmFwcGVyQmFzZS5jYWxsKHRoaXMpO1xuXHR0aGlzLl93aW5kb3cgPSAkd2luZG93O1xufVxuXG4vKipcbiAqIEN1cnJlbnQgYnJvd3NlciB3aW5kb3cuXG4gKiBAdHlwZSB7V2luZG93fVxuICogQHByaXZhdGVcbiAqL1xuQ29va2llV3JhcHBlci5wcm90b3R5cGUuX3dpbmRvdyA9IG51bGw7XG5cbi8qKlxuICogR2V0cyBjdXJyZW50IGNvb2tpZSBzdHJpbmcuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDb29raWUgc3RyaW5nLlxuICovXG5Db29raWVXcmFwcGVyLnByb3RvdHlwZS5nZXRDb29raWVTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLl93aW5kb3cuZG9jdW1lbnQuY29va2llID9cblx0XHR0aGlzLl93aW5kb3cuZG9jdW1lbnQuY29va2llLnRvU3RyaW5nKCkgOlxuXHRcdCcnO1xufTtcblxuLyoqXG4gKiBTZXRzIGNvb2tpZSB0byB0aGlzIHdyYXBwZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gY29va2llU2V0dXAgQ29va2llIHNldHVwIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb29raWVTZXR1cC5rZXkgQ29va2llIGtleS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb29raWVTZXR1cC52YWx1ZSBDb29raWUgdmFsdWUuXG4gKiBAcGFyYW0ge251bWJlcj99IGNvb2tpZVNldHVwLm1heEFnZSBNYXggY29va2llIGFnZSBpbiBzZWNvbmRzLlxuICogQHBhcmFtIHtEYXRlP30gY29va2llU2V0dXAuZXhwaXJlcyBFeHBpcmUgZGF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nP30gY29va2llU2V0dXAucGF0aCBVUkkgcGF0aCBmb3IgY29va2llLlxuICogQHBhcmFtIHtzdHJpbmc/fSBjb29raWVTZXR1cC5kb21haW4gQ29va2llIGRvbWFpbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGNvb2tpZVNldHVwLnNlY3VyZSBJcyBjb29raWUgc2VjdXJlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGNvb2tpZVNldHVwLmh0dHBPbmx5IElzIGNvb2tpZSBIVFRQIG9ubHkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDb29raWUgc2V0dXAgc3RyaW5nLlxuICovXG5Db29raWVXcmFwcGVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoY29va2llU2V0dXApIHtcblx0dmFyIGNvb2tpZSA9IHRoaXMuX2NvbnZlcnRUb0Nvb2tpZVNldHVwKGNvb2tpZVNldHVwKTtcblx0dGhpcy5fd2luZG93LmRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZTtcblx0cmV0dXJuIGNvb2tpZTtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gRG9jdW1lbnRSZW5kZXJlcjtcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyksXG5cdGVycm9ySGVscGVyID0gcmVxdWlyZSgnLi4vbGliL2hlbHBlcnMvZXJyb3JIZWxwZXInKSxcblx0bW9kdWxlSGVscGVyID0gcmVxdWlyZSgnLi4vbGliL2hlbHBlcnMvbW9kdWxlSGVscGVyJyksXG5cdERvY3VtZW50UmVuZGVyZXJCYXNlID0gcmVxdWlyZSgnLi4vbGliL2Jhc2UvRG9jdW1lbnRSZW5kZXJlckJhc2UnKTtcblxudXRpbC5pbmhlcml0cyhEb2N1bWVudFJlbmRlcmVyLCBEb2N1bWVudFJlbmRlcmVyQmFzZSk7XG5cbnZhciBTUEVDSUFMX0lEUyA9IHtcblx0XHQkJGhlYWQ6ICckJGhlYWQnLFxuXHRcdCQkZG9jdW1lbnQ6ICckJGRvY3VtZW50J1xuXHR9LFxuXHRFUlJPUl9DUkVBVEVfV1JPTkdfQVJHVU1FTlRTID0gJ1RhZyBuYW1lIHNob3VsZCBiZSBhIHN0cmluZyAnICtcblx0XHQnYW5kIGF0dHJpYnV0ZXMgc2hvdWxkIGJlIGFuIG9iamVjdCcsXG5cdEVSUk9SX0NSRUFURV9XUk9OR19OQU1FID0gJ0NvbXBvbmVudCBmb3IgdGFnIFwiJXNcIiBub3QgZm91bmQnLFxuXHRFUlJPUl9DUkVBVEVfV1JPTkdfSUQgPSAnVGhlIElEIGlzIG5vdCBzcGVjaWZpZWQgb3IgYWxyZWFkeSB1c2VkJyxcblx0VEFHX05BTUVTID0ge1xuXHRcdFRJVExFOiAnVElUTEUnLFxuXHRcdEhUTUw6ICdIVE1MJyxcblx0XHRIRUFEOiAnSEVBRCcsXG5cdFx0QkFTRTogJ0JBU0UnLFxuXHRcdFNUWUxFOiAnU1RZTEUnLFxuXHRcdFNDUklQVDogJ1NDUklQVCcsXG5cdFx0Tk9TQ1JJUFQ6ICdOT1NDUklQVCcsXG5cdFx0TUVUQTogJ01FVEEnLFxuXHRcdExJTks6ICdMSU5LJ1xuXHR9LFxuXHROT0RFX1RZUEVTID0ge1xuXHRcdEVMRU1FTlRfTk9ERTogMSxcblx0XHRURVhUX05PREU6IDMsXG5cdFx0UFJPQ0VTU0lOR19JTlNUUlVDVElPTl9OT0RFOiA3LFxuXHRcdENPTU1FTlRfTk9ERTogOFxuXHR9LFxuXHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDE1L1dELXVpZXZlbnRzLTIwMTUwMzE5LyNldmVudC10eXBlcy1saXN0XG5cdE5PTl9CVUJCTElOR19FVkVOVFMgPSB7XG5cdFx0YWJvcnQ6IHRydWUsXG5cdFx0Ymx1cjogdHJ1ZSxcblx0XHRlcnJvcjogdHJ1ZSxcblx0XHRmb2N1czogdHJ1ZSxcblx0XHRsb2FkOiB0cnVlLFxuXHRcdG1vdXNlZW50ZXI6IHRydWUsXG5cdFx0bW91c2VsZWF2ZTogdHJ1ZSxcblx0XHRyZXNpemU6IHRydWUsXG5cdFx0dW5sb2FkOiB0cnVlXG5cdH07XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgdGhlIGRvY3VtZW50IHJlbmRlcmVyLlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gJHNlcnZpY2VMb2NhdG9yIExvY2F0b3IgdG8gcmVzb2x2ZSBkZXBlbmRlbmNpZXMuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIERvY3VtZW50UmVuZGVyZXJCYXNlXG4gKi9cbmZ1bmN0aW9uIERvY3VtZW50UmVuZGVyZXIoJHNlcnZpY2VMb2NhdG9yKSB7XG5cdERvY3VtZW50UmVuZGVyZXJCYXNlLmNhbGwodGhpcywgJHNlcnZpY2VMb2NhdG9yKTtcblx0dGhpcy5fY29tcG9uZW50SW5zdGFuY2VzID0ge307XG5cdHRoaXMuX2NvbXBvbmVudEVsZW1lbnRzID0ge307XG5cdHRoaXMuX2NvbXBvbmVudEJpbmRpbmdzID0ge307XG5cdHRoaXMuX2N1cnJlbnRDaGFuZ2VkU3RvcmVzID0ge307XG5cdHRoaXMuX3dpbmRvdyA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCd3aW5kb3cnKTtcblx0dGhpcy5fY29uZmlnID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ2NvbmZpZycpO1xuXHR0aGlzLl9zdG9yZURpc3BhdGNoZXIgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnc3RvcmVEaXNwYXRjaGVyJyk7XG5cblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHRoaXMuX2V2ZW50QnVzLm9uKCdzdG9yZUNoYW5nZWQnLCBmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0c2VsZi5fY3VycmVudENoYW5nZWRTdG9yZXNbc3RvcmVOYW1lXSA9IHRydWU7XG5cdFx0aWYgKHNlbGYuX2lzU3RhdGVDaGFuZ2luZykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRzZWxmLl91cGRhdGVTdG9yZUNvbXBvbmVudHMoKTtcblx0fSk7XG59XG5cbi8qKlxuICogQ3VycmVudCBhcHBsaWNhdGlvbiBjb25maWcuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2NvbmZpZyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzdG9yZSBkaXNwYXRjaGVyLlxuICogQHR5cGUge1N0b3JlRGlzcGF0Y2hlcn1cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX3N0b3JlRGlzcGF0Y2hlciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXQgb2YgY29tcG9uZW50IGluc3RhbmNlcyBieSB1bmlxdWUga2V5cy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fY29tcG9uZW50SW5zdGFuY2VzID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHNldCBvZiBjb21wb25lbnQgZWxlbWVudHMgYnkgdW5pcXVlIGtleXMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2NvbXBvbmVudEVsZW1lbnRzID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHNldCBvZiBjb21wb25lbnQgYmluZGluZ3MgYnkgdW5pcXVlIGtleXMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2NvbXBvbmVudEJpbmRpbmdzID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHJvdXRpbmcgY29udGV4dC5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fY3VycmVudFJvdXRpbmdDb250ZXh0ID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHNldCBvZiBjaGFuZ2VkIHN0b3Jlcy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fY3VycmVudENoYW5nZWRTdG9yZXMgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgcHJvbWlzZSBmb3IgcmVuZGVyZWQgcGFnZS5cbiAqIEB0eXBlIHtQcm9taXNlfVxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX3JlbmRlcmVkUHJvbWlzZSA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzdGF0ZSBvZiB1cGRhdGluZyBjb21wb25lbnRzLlxuICogQHR5cGUge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5faXNVcGRhdGluZyA9IGZhbHNlO1xuXG4vKipcbiAqIEN1cnJlbnQgYXdhaXRpbmcgcm91dGluZy5cbiAqIEB0eXBlIHt7c3RhdGU6IE9iamVjdCwgcm91dGluZ0NvbnRleHQ6IE9iamVjdH19XG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fYXdhaXRpbmdSb3V0aW5nID0gbnVsbDtcblxuLyoqXG4gKiBTZXRzIHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBhcHBsaWNhdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBOZXcgc3RhdGUgb2YgYXBwbGljYXRpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gcm91dGluZ0NvbnRleHQgUm91dGluZyBjb250ZXh0LlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLmluaXRXaXRoU3RhdGUgPSBmdW5jdGlvbiAoc3RhdGUsIHJvdXRpbmdDb250ZXh0KSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0cmV0dXJuIHNlbGYuX2dldFByb21pc2VGb3JSZWFkeVN0YXRlKClcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLl9jdXJyZW50Um91dGluZ0NvbnRleHQgPSByb3V0aW5nQ29udGV4dDtcblx0XHRcdHJldHVybiBzZWxmLl9zdG9yZURpc3BhdGNoZXIuc2V0U3RhdGUoc3RhdGUsIHJvdXRpbmdDb250ZXh0KTtcblx0XHR9KVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBzZWxmLl9pbml0aWFsV3JhcCgpO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBSZW5kZXJzIG5ldyBzdGF0ZSBvZiBhcHBsaWNhdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBOZXcgc3RhdGUgb2YgYXBwbGljYXRpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gcm91dGluZ0NvbnRleHQgUm91dGluZyBjb250ZXh0LlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChzdGF0ZSwgcm91dGluZ0NvbnRleHQpIHtcblx0dGhpcy5fYXdhaXRpbmdSb3V0aW5nID0ge1xuXHRcdHN0YXRlOiBzdGF0ZSxcblx0XHRyb3V0aW5nQ29udGV4dDogcm91dGluZ0NvbnRleHRcblx0fTtcblx0aWYgKHRoaXMuX2lzU3RhdGVDaGFuZ2luZykge1xuXHRcdHJldHVybiB0aGlzLl9yZW5kZXJlZFByb21pc2U7XG5cdH1cblxuXHQvLyB3ZSBzaG91bGQgc2V0IHRoaXMgZmxhZyB0byBhdm9pZCBcInN0b3JlQ2hhbmdlZFwiXG5cdC8vIGV2ZW50IGhhbmRsaW5nIGZvciBub3dcblx0dGhpcy5faXNTdGF0ZUNoYW5naW5nID0gdHJ1ZTtcblxuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdHNlbGYuX3JlbmRlcmVkUHJvbWlzZSA9IHRoaXMuX2dldFByb21pc2VGb3JSZWFkeVN0YXRlKClcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBhbmQgdGhlbiB3ZSB1cGRhdGUgYWxsIGNvbXBvbmVudHMgb2YgdGhlc2Ugc3RvcmVzIGluIGEgYmF0Y2guXG5cdFx0XHRyZXR1cm4gc2VsZi5fdXBkYXRlU3RvcmVDb21wb25lbnRzKCk7XG5cdFx0fSlcblx0XHQuY2F0Y2goZnVuY3Rpb24gKHJlYXNvbikge1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnZXJyb3InLCByZWFzb24pO1xuXHRcdH0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5faXNTdGF0ZUNoYW5naW5nID0gZmFsc2U7XG5cdFx0fSk7XG5cblx0cmV0dXJuIHRoaXMuX3JlbmRlcmVkUHJvbWlzZTtcbn07XG5cbi8qKlxuICogUmVuZGVycyBjb21wb25lbnQgaW50byBIVE1MIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgSFRNTCBlbGVtZW50IG9mIGNvbXBvbmVudFxuICogQHBhcmFtIHtPYmplY3Q/fSByZW5kZXJpbmdDb250ZXh0IFJlbmRlcmluZyBjb250ZXh0IGZvciBncm91cCByZW5kZXJpbmcuXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckNvbXBvbmVudCA9XG5cdGZ1bmN0aW9uIChlbGVtZW50LCByZW5kZXJpbmdDb250ZXh0KSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHJldHVybiB0aGlzLl9nZXRQcm9taXNlRm9yUmVhZHlTdGF0ZSgpXG5cdFx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJlbmRlcmluZ0NvbnRleHQgPSByZW5kZXJpbmdDb250ZXh0IHx8XG5cdFx0XHRcdFx0c2VsZi5fY3JlYXRlUmVuZGVyaW5nQ29udGV4dChbXSk7XG5cblx0XHRcdFx0dmFyIGNvbXBvbmVudE5hbWUgPSBtb2R1bGVIZWxwZXIuZ2V0T3JpZ2luYWxDb21wb25lbnROYW1lKFxuXHRcdFx0XHRcdFx0ZWxlbWVudC50YWdOYW1lXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRoYWRDaGlsZHJlbiA9IGVsZW1lbnQuaGFzQ2hpbGROb2RlcygpLFxuXHRcdFx0XHRcdGNvbXBvbmVudCA9IHJlbmRlcmluZ0NvbnRleHQuY29tcG9uZW50c1tjb21wb25lbnROYW1lXSxcblx0XHRcdFx0XHRpZCA9IHNlbGYuX2dldElkKGVsZW1lbnQpLFxuXHRcdFx0XHRcdGluc3RhbmNlID0gc2VsZi5fY29tcG9uZW50SW5zdGFuY2VzW2lkXTtcblxuXHRcdFx0XHRpZiAoIWNvbXBvbmVudCB8fCAhaWQgfHxcblx0XHRcdFx0XHRyZW5kZXJpbmdDb250ZXh0LnJlbmRlcmVkSWRzLmhhc093blByb3BlcnR5KGlkKSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlbmRlcmluZ0NvbnRleHQucmVuZGVyZWRJZHNbaWRdID0gdHJ1ZTtcblxuXHRcdFx0XHRpZiAoIWluc3RhbmNlKSB7XG5cdFx0XHRcdFx0Y29tcG9uZW50LmNvbnN0cnVjdG9yLnByb3RvdHlwZS4kY29udGV4dCA9XG5cdFx0XHRcdFx0XHRzZWxmLl9nZXRDb21wb25lbnRDb250ZXh0KGNvbXBvbmVudCwgZWxlbWVudCk7XG5cdFx0XHRcdFx0aW5zdGFuY2UgPSBzZWxmLl9zZXJ2aWNlTG9jYXRvci5yZXNvbHZlSW5zdGFuY2UoXG5cdFx0XHRcdFx0XHRjb21wb25lbnQuY29uc3RydWN0b3IsIHJlbmRlcmluZ0NvbnRleHQuY29uZmlnXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRpbnN0YW5jZS4kY29udGV4dCA9IGNvbXBvbmVudC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUuJGNvbnRleHQ7XG5cdFx0XHRcdFx0c2VsZi5fY29tcG9uZW50SW5zdGFuY2VzW2lkXSA9IGluc3RhbmNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGV2ZW50QXJncyA9IHtcblx0XHRcdFx0XHRuYW1lOiBjb21wb25lbnROYW1lLFxuXHRcdFx0XHRcdGNvbnRleHQ6IGluc3RhbmNlLiRjb250ZXh0XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0c2VsZi5fY29tcG9uZW50RWxlbWVudHNbaWRdID0gZWxlbWVudDtcblxuXHRcdFx0XHR2YXIgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcblx0XHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnY29tcG9uZW50UmVuZGVyJywgZXZlbnRBcmdzKTtcblxuXHRcdFx0XHRyZXR1cm4gc2VsZi5fdW5iaW5kQWxsKGVsZW1lbnQsIHJlbmRlcmluZ0NvbnRleHQpXG5cdFx0XHRcdFx0LmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcblx0XHRcdFx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2Vycm9yJywgcmVhc29uKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdGlmIChpbnN0YW5jZS4kY29udGV4dC5lbGVtZW50ICE9PSBlbGVtZW50KSB7XG5cdFx0XHRcdFx0XHRcdGluc3RhbmNlLiRjb250ZXh0ID0gc2VsZi5fZ2V0Q29tcG9uZW50Q29udGV4dChcblx0XHRcdFx0XHRcdFx0XHRjb21wb25lbnQsIGVsZW1lbnRcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHZhciByZW5kZXJNZXRob2QgPSBtb2R1bGVIZWxwZXIuZ2V0TWV0aG9kVG9JbnZva2UoXG5cdFx0XHRcdFx0XHRcdGluc3RhbmNlLCAncmVuZGVyJ1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHJldHVybiBtb2R1bGVIZWxwZXIuZ2V0U2FmZVByb21pc2UocmVuZGVyTWV0aG9kKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uIChkYXRhQ29udGV4dCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGNvbXBvbmVudC50ZW1wbGF0ZS5yZW5kZXIoZGF0YUNvbnRleHQpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZWxmLl9oYW5kbGVSZW5kZXJFcnJvcihcblx0XHRcdFx0XHRcdFx0ZWxlbWVudCwgY29tcG9uZW50LCByZWFzb25cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQudGhlbihmdW5jdGlvbiAoaHRtbCkge1xuXHRcdFx0XHRcdFx0aWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gVEFHX05BTUVTLkhFQUQpIHtcblx0XHRcdFx0XHRcdFx0c2VsZi5fbWVyZ2VIZWFkKGVsZW1lbnQsIGh0bWwpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSBodG1sO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dmFyIHByb21pc2VzID0gc2VsZi5fZmluZENvbXBvbmVudHMoXG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQsIHJlbmRlcmluZ0NvbnRleHRcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdFx0Lm1hcChmdW5jdGlvbiAoaW5uZXJDb21wb25lbnQpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gc2VsZi5yZW5kZXJDb21wb25lbnQoXG5cdFx0XHRcdFx0XHRcdFx0XHRpbm5lckNvbXBvbmVudCwgcmVuZGVyaW5nQ29udGV4dFxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdGV2ZW50QXJncy50aW1lID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcblx0XHRcdFx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2NvbXBvbmVudFJlbmRlcmVkJywgZXZlbnRBcmdzKTtcblx0XHRcdFx0XHRcdHJldHVybiBzZWxmLl9iaW5kQ29tcG9uZW50KGVsZW1lbnQpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0aWYgKCFoYWRDaGlsZHJlbikge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRzZWxmLl9jb2xsZWN0UmVuZGVyaW5nR2FyYmFnZShyZW5kZXJpbmdDb250ZXh0KTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5jYXRjaChmdW5jdGlvbiAocmVhc29uKSB7XG5cdFx0XHRcdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdlcnJvcicsIHJlYXNvbik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0fTtcblxuLyoqXG4gKiBHZXRzIGNvbXBvbmVudCBpbnN0YW5jZSBieSBJRC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBpZCBDb21wb25lbnQgSUQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBDb21wb25lbnQgaW5zdGFuY2UuXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLmdldENvbXBvbmVudEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcblx0cmV0dXJuIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlc1tpZF0gfHwgbnVsbDtcbn07XG5cbi8qKlxuICogQ2hlY2tzIHRoYXQgZXZlcnkgaW5zdGFuY2Ugb2YgY29tcG9uZW50IGhhcyBlbGVtZW50IG9uIHRoZSBwYWdlIGFuZFxuICogcmVtb3ZlcyBhbGwgcmVmZXJlbmNlcyB0byBjb21wb25lbnRzIHJlbW92ZWQgZnJvbSBET00uXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuY29sbGVjdEdhcmJhZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0cmV0dXJuIHRoaXMuX2dldFByb21pc2VGb3JSZWFkeVN0YXRlKCkuXG5cdFx0dGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblx0XHRcdE9iamVjdC5rZXlzKHNlbGYuX2NvbXBvbmVudEVsZW1lbnRzKVxuXHRcdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoaWQpIHtcblx0XHRcdFx0XHRpZiAoU1BFQ0lBTF9JRFMuaGFzT3duUHJvcGVydHkoaWQpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciBlbGVtZW50ID0gc2VsZi5fd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblx0XHRcdFx0XHRpZiAoZWxlbWVudCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBwcm9taXNlID0gc2VsZi5fdW5iaW5kQ29tcG9uZW50KHNlbGYuX2NvbXBvbmVudEVsZW1lbnRzW2lkXSlcblx0XHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIHNlbGYuX2NvbXBvbmVudEVsZW1lbnRzW2lkXTtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIHNlbGYuX2NvbXBvbmVudEluc3RhbmNlc1tpZF07XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBzZWxmLl9jb21wb25lbnRCaW5kaW5nc1tpZF07XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRwcm9taXNlcy5wdXNoKHByb21pc2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHJlbmRlcnMgY29tcG9uZW50IGVsZW1lbnQuXG4gKiBAcGFyYW0ge1N0cmluZ30gdGFnTmFtZSBOYW1lIG9mIEhUTUwgdGFnLlxuICogQHBhcmFtIHtPYmplY3R9IGF0dHJpYnV0ZXMgRWxlbWVudCBhdHRyaWJ1dGVzLlxuICogQHJldHVybnMge1Byb21pc2U8RWxlbWVudD59IFByb21pc2UgZm9yIEhUTUwgZWxlbWVudCB3aXRoIHJlbmRlcmVkIGNvbXBvbmVudC5cbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuY3JlYXRlQ29tcG9uZW50ID0gZnVuY3Rpb24gKHRhZ05hbWUsIGF0dHJpYnV0ZXMpIHtcblx0aWYgKHR5cGVvZih0YWdOYW1lKSAhPT0gJ3N0cmluZycgfHwgIWF0dHJpYnV0ZXMgfHxcblx0XHR0eXBlb2YoYXR0cmlidXRlcykgIT09ICdvYmplY3QnKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KFxuXHRcdFx0bmV3IEVycm9yKEVSUk9SX0NSRUFURV9XUk9OR19BUkdVTUVOVFMpXG5cdFx0KTtcblx0fVxuXG5cdHZhciBzZWxmID0gdGhpcztcblx0cmV0dXJuIHRoaXMuX2dldFByb21pc2VGb3JSZWFkeVN0YXRlKClcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgY29tcG9uZW50cyA9IHNlbGYuX2NvbXBvbmVudExvYWRlci5nZXRDb21wb25lbnRzQnlOYW1lcygpLFxuXHRcdFx0XHRjb21wb25lbnROYW1lID0gbW9kdWxlSGVscGVyLmdldE9yaWdpbmFsQ29tcG9uZW50TmFtZSh0YWdOYW1lKTtcblxuXHRcdFx0aWYgKG1vZHVsZUhlbHBlci5pc0hlYWRDb21wb25lbnQoY29tcG9uZW50TmFtZSkgfHxcblx0XHRcdFx0bW9kdWxlSGVscGVyLmlzRG9jdW1lbnRDb21wb25lbnQoY29tcG9uZW50TmFtZSkgfHxcblx0XHRcdFx0IWNvbXBvbmVudHMuaGFzT3duUHJvcGVydHkoY29tcG9uZW50TmFtZSkpIHtcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KFxuXHRcdFx0XHRcdG5ldyBFcnJvcih1dGlsLmZvcm1hdChFUlJPUl9DUkVBVEVfV1JPTkdfTkFNRSwgdGFnTmFtZSkpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBzYWZlVGFnTmFtZSA9IG1vZHVsZUhlbHBlci5nZXRUYWdOYW1lRm9yQ29tcG9uZW50TmFtZShjb21wb25lbnROYW1lKTtcblxuXHRcdFx0dmFyIGlkID0gYXR0cmlidXRlc1ttb2R1bGVIZWxwZXIuQVRUUklCVVRFX0lEXTtcblx0XHRcdGlmICghaWQgfHwgc2VsZi5fY29tcG9uZW50SW5zdGFuY2VzLmhhc093blByb3BlcnR5KGlkKSkge1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKEVSUk9SX0NSRUFURV9XUk9OR19JRCkpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZWxlbWVudCA9IHNlbGYuX3dpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KHNhZmVUYWdOYW1lKTtcblx0XHRcdE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpXG5cdFx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyaWJ1dGVOYW1lKSB7XG5cdFx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gc2VsZi5yZW5kZXJDb21wb25lbnQoZWxlbWVudClcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiBlbGVtZW50O1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogQ2xlYXJzIGFsbCByZWZlcmVuY2VzIHRvIHJlbW92ZWQgY29tcG9uZW50cyBkdXJpbmcgcmVuZGVyaW5nIHByb2Nlc3MuXG4gKiBAcGFyYW0ge09iamVjdH0gcmVuZGVyaW5nQ29udGV4dCBDb250ZXh0IG9mIHJlbmRlcmluZy5cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9jb2xsZWN0UmVuZGVyaW5nR2FyYmFnZSA9XG5cdGZ1bmN0aW9uIChyZW5kZXJpbmdDb250ZXh0KSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdE9iamVjdC5rZXlzKHJlbmRlcmluZ0NvbnRleHQudW5ib3VuZElkcylcblx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0XHQvLyB0aGlzIGNvbXBvbmVudCBoYXMgYmVlbiByZW5kZXJlZCBhZ2FpbiBhbmQgd2UgZG8gbm90IG5lZWQgdG9cblx0XHRcdFx0Ly8gcmVtb3ZlIGl0LlxuXHRcdFx0XHRpZiAocmVuZGVyaW5nQ29udGV4dC5yZW5kZXJlZElkcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWxldGUgc2VsZi5fY29tcG9uZW50RWxlbWVudHNbaWRdO1xuXHRcdFx0XHRkZWxldGUgc2VsZi5fY29tcG9uZW50SW5zdGFuY2VzW2lkXTtcblx0XHRcdFx0ZGVsZXRlIHNlbGYuX2NvbXBvbmVudEJpbmRpbmdzW2lkXTtcblx0XHRcdH0pO1xuXHR9O1xuXG4vKipcbiAqIFVuYmluZHMgYWxsIGV2ZW50IGhhbmRsZXJzIGZyb20gc3BlY2lmaWVkIGNvbXBvbmVudCBhbmQgYWxsIGl0J3MgZGVzY2VuZGFudHMuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgQ29tcG9uZW50IEhUTUwgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSByZW5kZXJpbmdDb250ZXh0IENvbnRleHQgb2YgcmVuZGVyaW5nLlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fdW5iaW5kQWxsID0gZnVuY3Rpb24gKGVsZW1lbnQsIHJlbmRlcmluZ0NvbnRleHQpIHtcblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdGlkID0gdGhpcy5fZ2V0SWQoZWxlbWVudCksXG5cdFx0cHJvbWlzZXMgPSBbXTtcblxuXHRpZiAoZWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpIHtcblx0XHRzZWxmLl9maW5kQ29tcG9uZW50cyhlbGVtZW50LCByZW5kZXJpbmdDb250ZXh0KVxuXHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGlubmVyRWxlbWVudCkge1xuXHRcdFx0XHR2YXIgaWQgPSBzZWxmLl9nZXRJZChpbm5lckVsZW1lbnQpO1xuXHRcdFx0XHRpZiAocmVuZGVyaW5nQ29udGV4dC51bmJvdW5kSWRzLmhhc093blByb3BlcnR5KGlkKSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZW5kZXJpbmdDb250ZXh0LnVuYm91bmRJZHNbaWRdID0gdHJ1ZTtcblx0XHRcdFx0cHJvbWlzZXMucHVzaChzZWxmLl91bmJpbmRDb21wb25lbnQoaW5uZXJFbGVtZW50KSk7XG5cdFx0XHR9KTtcblx0fVxuXG5cdGlmICghcmVuZGVyaW5nQ29udGV4dC51bmJvdW5kSWRzLmhhc093blByb3BlcnR5KGlkKSkge1xuXHRcdHByb21pc2VzLnB1c2godGhpcy5fdW5iaW5kQ29tcG9uZW50KGVsZW1lbnQpKTtcblx0XHRyZW5kZXJpbmdDb250ZXh0LnVuYm91bmRJZHNbaWRdID0gdHJ1ZTtcblx0fVxuXG5cdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuXG4vKipcbiAqIFVuYmluZHMgYWxsIGV2ZW50IGhhbmRsZXJzIGZyb20gc3BlY2lmaWVkIGNvbXBvbmVudC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBDb21wb25lbnQgSFRNTCBlbGVtZW50LlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fdW5iaW5kQ29tcG9uZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0dmFyIGlkID0gdGhpcy5fZ2V0SWQoZWxlbWVudCksXG5cdFx0c2VsZiA9IHRoaXMsXG5cdFx0aW5zdGFuY2UgPSB0aGlzLl9jb21wb25lbnRJbnN0YW5jZXNbaWRdO1xuXHRpZiAoIWluc3RhbmNlKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXHR9XG5cdGlmICh0aGlzLl9jb21wb25lbnRCaW5kaW5ncy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcblx0XHRPYmplY3Qua2V5cyh0aGlzLl9jb21wb25lbnRCaW5kaW5nc1tpZF0pXG5cdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG5cdFx0XHRcdGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcblx0XHRcdFx0XHRldmVudE5hbWUsXG5cdFx0XHRcdFx0c2VsZi5fY29tcG9uZW50QmluZGluZ3NbaWRdW2V2ZW50TmFtZV0uaGFuZGxlcixcblx0XHRcdFx0XHROT05fQlVCQkxJTkdfRVZFTlRTLmhhc093blByb3BlcnR5KGV2ZW50TmFtZSlcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdGRlbGV0ZSB0aGlzLl9jb21wb25lbnRCaW5kaW5nc1tpZF07XG5cdH1cblx0dmFyIHVuYmluZE1ldGhvZCA9IG1vZHVsZUhlbHBlci5nZXRNZXRob2RUb0ludm9rZShpbnN0YW5jZSwgJ3VuYmluZCcpO1xuXHRyZXR1cm4gbW9kdWxlSGVscGVyLmdldFNhZmVQcm9taXNlKHVuYmluZE1ldGhvZClcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdjb21wb25lbnRVbmJvdW5kJywge1xuXHRcdFx0XHRlbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0XHRpZDogIVNQRUNJQUxfSURTLmhhc093blByb3BlcnR5KGlkKSA/IGlkIDogbnVsbFxuXHRcdFx0fSk7XG5cdFx0fSlcblx0XHQuY2F0Y2goZnVuY3Rpb24gKHJlYXNvbikge1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnZXJyb3InLCByZWFzb24pO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBCaW5kcyBhbGwgcmVxdWlyZWQgZXZlbnQgaGFuZGxlcnMgdG8gY29tcG9uZW50LlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IENvbXBvbmVudCBIVE1MIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9iaW5kQ29tcG9uZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0dmFyIGlkID0gdGhpcy5fZ2V0SWQoZWxlbWVudCksXG5cdFx0c2VsZiA9IHRoaXMsXG5cdFx0aW5zdGFuY2UgPSB0aGlzLl9jb21wb25lbnRJbnN0YW5jZXNbaWRdO1xuXHRpZiAoIWluc3RhbmNlKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXHR9XG5cblx0dmFyIGJpbmRNZXRob2QgPSBtb2R1bGVIZWxwZXIuZ2V0TWV0aG9kVG9JbnZva2UoaW5zdGFuY2UsICdiaW5kJyk7XG5cdHJldHVybiBtb2R1bGVIZWxwZXIuZ2V0U2FmZVByb21pc2UoYmluZE1ldGhvZClcblx0XHQudGhlbihmdW5jdGlvbiAoYmluZGluZ3MpIHtcblx0XHRcdGlmICghYmluZGluZ3MgfHwgdHlwZW9mKGJpbmRpbmdzKSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnY29tcG9uZW50Qm91bmQnLCB7XG5cdFx0XHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdFx0XHRpZDogIVNQRUNJQUxfSURTLmhhc093blByb3BlcnR5KGlkKSA/IGlkIDogbnVsbFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0c2VsZi5fY29tcG9uZW50QmluZGluZ3NbaWRdID0ge307XG5cdFx0XHRPYmplY3Qua2V5cyhiaW5kaW5ncylcblx0XHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuXHRcdFx0XHRcdGV2ZW50TmFtZSA9IGV2ZW50TmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdGlmIChzZWxmLl9jb21wb25lbnRCaW5kaW5nc1tpZF0uaGFzT3duUHJvcGVydHkoZXZlbnROYW1lKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2YXIgc2VsZWN0b3JIYW5kbGVycyA9IHt9O1xuXHRcdFx0XHRcdE9iamVjdC5rZXlzKGJpbmRpbmdzW2V2ZW50TmFtZV0pXG5cdFx0XHRcdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoc2VsZWN0b3IpIHtcblx0XHRcdFx0XHRcdFx0dmFyIGhhbmRsZXIgPSBiaW5kaW5nc1tldmVudE5hbWVdW3NlbGVjdG9yXTtcblx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZihoYW5kbGVyKSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRzZWxlY3RvckhhbmRsZXJzW3NlbGVjdG9yXSA9IGhhbmRsZXIuYmluZChpbnN0YW5jZSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZWxmLl9jb21wb25lbnRCaW5kaW5nc1tpZF1bZXZlbnROYW1lXSA9IHtcblx0XHRcdFx0XHRcdGhhbmRsZXI6IHNlbGYuX2NyZWF0ZUJpbmRpbmdIYW5kbGVyKFxuXHRcdFx0XHRcdFx0XHRlbGVtZW50LCBzZWxlY3RvckhhbmRsZXJzXG5cdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0c2VsZWN0b3JIYW5kbGVyczogc2VsZWN0b3JIYW5kbGVyc1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0XHRcdFx0ZXZlbnROYW1lLFxuXHRcdFx0XHRcdFx0c2VsZi5fY29tcG9uZW50QmluZGluZ3NbaWRdW2V2ZW50TmFtZV0uaGFuZGxlcixcblx0XHRcdFx0XHRcdE5PTl9CVUJCTElOR19FVkVOVFMuaGFzT3duUHJvcGVydHkoZXZlbnROYW1lKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnY29tcG9uZW50Qm91bmQnLCB7XG5cdFx0XHRcdGVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRcdGlkOiBpZFxuXHRcdFx0fSk7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgdW5pdmVyc2FsIGV2ZW50IGhhbmRsZXIgZm9yIGRlbGVnYXRlZCBldmVudHMuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbXBvbmVudFJvb3QgUm9vdCBlbGVtZW50IG9mIGNvbXBvbmVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3RvckhhbmRsZXJzIE1hcCBvZiBldmVudCBoYW5kbGVycyBieSBDU1Mgc2VsZWN0b3JzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBVbml2ZXJzYWwgZXZlbnQgaGFuZGxlciBmb3IgZGVsZWdhdGVkIGV2ZW50cy5cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9jcmVhdGVCaW5kaW5nSGFuZGxlciA9XG5cdGZ1bmN0aW9uIChjb21wb25lbnRSb290LCBzZWxlY3RvckhhbmRsZXJzKSB7XG5cdFx0dmFyIHNlbGVjdG9ycyA9IE9iamVjdC5rZXlzKHNlbGVjdG9ySGFuZGxlcnMpO1xuXHRcdHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdHZhciBkaXNwYXRjaGVkRXZlbnQgPSBjcmVhdGVDdXN0b21FdmVudChldmVudCwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiBlbGVtZW50O1xuXHRcdFx0XHR9KSxcblx0XHRcdFx0ZWxlbWVudCA9IGV2ZW50LnRhcmdldCxcblx0XHRcdFx0dGFyZ2V0TWF0Y2hlcyA9IGdldE1hdGNoZXNNZXRob2QoZWxlbWVudCksXG5cdFx0XHRcdGlzSGFuZGxlZCA9IHNlbGVjdG9ycy5zb21lKGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuXHRcdFx0XHRcdGlmICh0YXJnZXRNYXRjaGVzKHNlbGVjdG9yKSkge1xuXHRcdFx0XHRcdFx0c2VsZWN0b3JIYW5kbGVyc1tzZWxlY3Rvcl0oZGlzcGF0Y2hlZEV2ZW50KTtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0aWYgKGlzSGFuZGxlZCB8fCAhZXZlbnQuYnViYmxlcykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHdoaWxlKGVsZW1lbnQucGFyZW50RWxlbWVudCAmJiBlbGVtZW50ICE9PSBjb21wb25lbnRSb290KSB7XG5cdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRcdHRhcmdldE1hdGNoZXMgPSBnZXRNYXRjaGVzTWV0aG9kKGVsZW1lbnQpO1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHNlbGVjdG9ycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmICghdGFyZ2V0TWF0Y2hlcyhzZWxlY3RvcnNbaV0pKSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aXNIYW5kbGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRzZWxlY3RvckhhbmRsZXJzW3NlbGVjdG9yc1tpXV0oZGlzcGF0Y2hlZEV2ZW50KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChpc0hhbmRsZWQpIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH07XG5cbi8qKlxuICogRmluZHMgYWxsIGRlc2NlbmRhbnQgY29tcG9uZW50cyBvZiBzcGVjaWZpZWQgY29tcG9uZW50IGVsZW1lbnQuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgUm9vdCBjb21wb25lbnQgSFRNTCBlbGVtZW50IHRvIGJlZ2luIHNlYXJjaCB3aXRoLlxuICogQHBhcmFtIHtPYmplY3R9IHJlbmRlcmluZ0NvbnRleHQgQ29udGV4dCBvZiByZW5kZXJpbmcuXG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fZmluZENvbXBvbmVudHMgPVxuXHRmdW5jdGlvbiAoZWxlbWVudCwgcmVuZGVyaW5nQ29udGV4dCkge1xuXHRcdHZhciBjb21wb25lbnRzID0gW107XG5cdFx0cmVuZGVyaW5nQ29udGV4dC5jb21wb25lbnRUYWdzXG5cdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAodGFnKSB7XG5cdFx0XHRcdHZhciBub2RlcyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKTtcblx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0Y29tcG9uZW50cy5wdXNoKG5vZGVzW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0cmV0dXJuIGNvbXBvbmVudHM7XG5cdH07XG5cbi8qKlxuICogSGFuZGxlcyBlcnJvciB3aGlsZSByZW5kZXJpbmcuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgQ29tcG9uZW50IEhUTUwgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb21wb25lbnQgQ29tcG9uZW50IGluc3RhbmNlLlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgRXJyb3IgdG8gaGFuZGxlLlxuICogQHJldHVybnMge1Byb21pc2U8U3RyaW5nPn0gUHJvbWlzZSBmb3IgSFRNTCBzdHJpbmcuXG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5faGFuZGxlUmVuZGVyRXJyb3IgPVxuXHRmdW5jdGlvbiAoZWxlbWVudCwgY29tcG9uZW50LCBlcnJvcikge1xuXHRcdHRoaXMuX2V2ZW50QnVzLmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuXG5cdFx0Ly8gZG8gbm90IGNvcnJ1cHQgZXhpc3RlZCBIRUFEIHdoZW4gZXJyb3Igb2NjdXJzXG5cdFx0aWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gVEFHX05BTUVTLkhFQUQpIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJycpO1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5fY29uZmlnLmlzUmVsZWFzZSAmJiBlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGVycm9ySGVscGVyLnByZXR0eVByaW50KFxuXHRcdFx0XHRlcnJvciwgdGhpcy5fd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnRcblx0XHRcdCkpO1xuXHRcdH0gZWxzZSBpZiAoY29tcG9uZW50LmVycm9yVGVtcGxhdGUpIHtcblx0XHRcdHJldHVybiBjb21wb25lbnQuZXJyb3JUZW1wbGF0ZS5yZW5kZXIoZXJyb3IpO1xuXHRcdH1cblxuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJycpO1xuXHR9O1xuXG4vKipcbiAqIFVwZGF0ZXMgYWxsIGNvbXBvbmVudHMgdGhhdCBkZXBlbmQgb24gY3VycmVudCBzZXQgb2YgY2hhbmdlZCBzdG9yZXMuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl91cGRhdGVTdG9yZUNvbXBvbmVudHMgPSBmdW5jdGlvbiAoKSB7XG5cdGlmICh0aGlzLl9pc1VwZGF0aW5nKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXHR9XG5cblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdC8vIGlmIGRvY3VtZW50IGNvbXBvbmVudCBpcyBjaGFuZ2VkIHdlIHNob3VsZCByZWxvYWQgdGhlIHBhZ2Vcblx0dmFyIGRvY3VtZW50U3RvcmUgPSB0aGlzLl93aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcblx0XHRtb2R1bGVIZWxwZXIuQVRUUklCVVRFX1NUT1JFXG5cdCk7XG5cdGlmICh0aGlzLl9jdXJyZW50Q2hhbmdlZFN0b3Jlcy5oYXNPd25Qcm9wZXJ0eShkb2N1bWVudFN0b3JlKSkge1xuXHRcdHZhciBuZXdMb2NhdGlvbiA9IHRoaXMuX2N1cnJlbnRSb3V0aW5nQ29udGV4dC5sb2NhdGlvbi50b1N0cmluZygpO1xuXHRcdGlmIChuZXdMb2NhdGlvbiA9PT0gdGhpcy5fd2luZG93LmxvY2F0aW9uLnRvU3RyaW5nKCkpIHtcblx0XHRcdHRoaXMuX3dpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblx0XHR9XG5cdFx0dGhpcy5fd2luZG93LmxvY2F0aW9uLmFzc2lnbihuZXdMb2NhdGlvbik7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXHR9XG5cblx0Ly8gaWYgd2UgaGF2ZSBhd2FpdGluZyByb3V0aW5nIHdlIHNob3VsZCBhcHBseSBzdGF0ZSB0byB0aGUgc3RvcmVzXG5cdGlmICh0aGlzLl9hd2FpdGluZ1JvdXRpbmcpIHtcblx0XHR2YXIgY29tcG9uZW50cyA9IHRoaXMuX2NvbXBvbmVudExvYWRlci5nZXRDb21wb25lbnRzQnlOYW1lcygpLFxuXHRcdFx0Y2hhbmdlZEJ5U3RhdGUgPSB0aGlzLl9zdG9yZURpc3BhdGNoZXIuc2V0U3RhdGUoXG5cdFx0XHRcdHRoaXMuX2F3YWl0aW5nUm91dGluZy5zdGF0ZSxcblx0XHRcdFx0dGhpcy5fYXdhaXRpbmdSb3V0aW5nLnJvdXRpbmdDb250ZXh0XG5cdFx0XHQpO1xuXG5cdFx0Y2hhbmdlZEJ5U3RhdGUuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdFx0c2VsZi5fY3VycmVudENoYW5nZWRTdG9yZXNbbmFtZV0gPSB0cnVlO1xuXHRcdH0pO1xuXG5cdFx0Ly8gd2Ugc2hvdWxkIHVwZGF0ZSBjb250ZXh0cyBvZiB0aGUgc3RvcmVzIHdpdGggdGhlIG5ldyByb3V0aW5nIGNvbnRleHRcblx0XHR0aGlzLl9jdXJyZW50Um91dGluZ0NvbnRleHQgPSB0aGlzLl9hd2FpdGluZ1JvdXRpbmcucm91dGluZ0NvbnRleHQ7XG5cdFx0T2JqZWN0LmtleXModGhpcy5fY29tcG9uZW50SW5zdGFuY2VzKVxuXHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRcdHZhciBpbnN0YW5jZSA9IHNlbGYuX2NvbXBvbmVudEluc3RhbmNlc1tpZF07XG5cdFx0XHRcdGluc3RhbmNlLiRjb250ZXh0ID0gc2VsZi5fZ2V0Q29tcG9uZW50Q29udGV4dChcblx0XHRcdFx0XHRjb21wb25lbnRzW2luc3RhbmNlLiRjb250ZXh0Lm5hbWVdLFxuXHRcdFx0XHRcdGluc3RhbmNlLiRjb250ZXh0LmVsZW1lbnRcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdHRoaXMuX2F3YWl0aW5nUm91dGluZyA9IG51bGw7XG5cdH1cblxuXHR2YXIgY2hhbmdlZFN0b3JlcyA9IE9iamVjdC5rZXlzKHRoaXMuX2N1cnJlbnRDaGFuZ2VkU3RvcmVzKTtcblx0aWYgKGNoYW5nZWRTdG9yZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXHR9XG5cdHRoaXMuX2N1cnJlbnRDaGFuZ2VkU3RvcmVzID0ge307XG5cblx0dmFyIHJlbmRlcmluZ0NvbnRleHQgPSB0aGlzLl9jcmVhdGVSZW5kZXJpbmdDb250ZXh0KGNoYW5nZWRTdG9yZXMpLFxuXHRcdHByb21pc2VzID0gcmVuZGVyaW5nQ29udGV4dC5yb290cy5tYXAoZnVuY3Rpb24gKHJvb3QpIHtcblx0XHRcdHJldHVybiBzZWxmLnJlbmRlckNvbXBvbmVudChyb290LCByZW5kZXJpbmdDb250ZXh0KTtcblx0XHR9KTtcblxuXHR0aGlzLl9pc1VwZGF0aW5nID0gdHJ1ZTtcblx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKVxuXHRcdC5jYXRjaChmdW5jdGlvbiAocmVhc29uKSB7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdlcnJvcicsIHJlYXNvbik7XG5cdFx0fSlcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLl9pc1VwZGF0aW5nID0gZmFsc2U7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdkb2N1bWVudFVwZGF0ZWQnLCBjaGFuZ2VkU3RvcmVzKTtcblx0XHRcdHJldHVybiBzZWxmLl91cGRhdGVTdG9yZUNvbXBvbmVudHMoKTtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogTWVyZ2VzIG5ldyBhbmQgZXhpc3RlZCBoZWFkIGVsZW1lbnRzIGFuZCBjaGFuZ2Ugb25seSBkaWZmZXJlbmNlLlxuICogQHBhcmFtIHtFbGVtZW50fSBoZWFkIEhFQUQgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gaHRtbFRleHQgSFRNTCBvZiBuZXcgSEVBRCBlbGVtZW50IGNvbnRlbnQuXG4gKiBAcHJpdmF0ZVxuICovXG4vKmpzaGludCBtYXhjb21wbGV4aXR5OmZhbHNlICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fbWVyZ2VIZWFkID0gZnVuY3Rpb24gKGhlYWQsIGh0bWxUZXh0KSB7XG5cdGlmICghaHRtbFRleHQpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdG5ld0hlYWQgPSB0aGlzLl93aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZCcpO1xuXHRuZXdIZWFkLmlubmVySFRNTCA9IGh0bWxUZXh0O1xuXG5cdHZhciBtYXAgPSB0aGlzLl9nZXRIZWFkTWFwKGhlYWQuY2hpbGROb2RlcyksXG5cdFx0Y3VycmVudCwgaSwga2V5LCBvbGRLZXksIG9sZEl0ZW0sXG5cdFx0c2FtZU1ldGFFbGVtZW50cyA9IHt9O1xuXG5cdGZvciAoaSA9IDA7IGkgPCBuZXdIZWFkLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcblx0XHRjdXJyZW50ID0gbmV3SGVhZC5jaGlsZE5vZGVzW2ldO1xuXG5cdFx0aWYgKCFtYXAuaGFzT3duUHJvcGVydHkoY3VycmVudC5ub2RlTmFtZSkpIHtcblx0XHRcdG1hcFtjdXJyZW50Lm5vZGVOYW1lXSA9IHt9O1xuXHRcdH1cblxuXHRcdHN3aXRjaCAoY3VycmVudC5ub2RlTmFtZSkge1xuXHRcdFx0Ly8gdGhlc2UgZWxlbWVudHMgY2FuIGJlIG9ubHkgcmVwbGFjZWRcblx0XHRcdGNhc2UgVEFHX05BTUVTLlRJVExFOlxuXHRcdFx0Y2FzZSBUQUdfTkFNRVMuQkFTRTpcblx0XHRcdGNhc2UgVEFHX05BTUVTLk5PU0NSSVBUOlxuXHRcdFx0XHRrZXkgPSB0aGlzLl9nZXROb2RlS2V5KGN1cnJlbnQpO1xuXHRcdFx0XHRvbGRJdGVtID0gaGVhZC5nZXRFbGVtZW50c0J5VGFnTmFtZShjdXJyZW50Lm5vZGVOYW1lKVswXTtcblx0XHRcdFx0aWYgKG9sZEl0ZW0pIHtcblx0XHRcdFx0XHRvbGRLZXkgPSB0aGlzLl9nZXROb2RlS2V5KG9sZEl0ZW0pO1xuXHRcdFx0XHRcdGhlYWQucmVwbGFjZUNoaWxkKGN1cnJlbnQsIG9sZEl0ZW0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoY3VycmVudCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gd2hlbiB3ZSBkbyByZXBsYWNlIG9yIGFwcGVuZCBjdXJyZW50IGlzIHJlbW92ZWQgZnJvbSBuZXdIZWFkXG5cdFx0XHRcdC8vIHRoZXJlZm9yZSB3ZSBuZWVkIHRvIGRlY3JlbWVudCBpbmRleFxuXHRcdFx0XHRpLS07XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHQvLyB0aGVzZSBlbGVtZW50cyBjYW4gbm90IGJlIGRlbGV0ZWQgZnJvbSBoZWFkXG5cdFx0XHQvLyB0aGVyZWZvcmUgd2UganVzdCBhZGQgbmV3IGVsZW1lbnRzIHRoYXQgZGlmZmVycyBmcm9tIGV4aXN0ZWRcblx0XHRcdGNhc2UgVEFHX05BTUVTLlNUWUxFOlxuXHRcdFx0Y2FzZSBUQUdfTkFNRVMuTElOSzpcblx0XHRcdGNhc2UgVEFHX05BTUVTLlNDUklQVDpcblx0XHRcdFx0a2V5ID0gc2VsZi5fZ2V0Tm9kZUtleShjdXJyZW50KTtcblx0XHRcdFx0aWYgKCFtYXBbY3VycmVudC5ub2RlTmFtZV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoY3VycmVudCk7XG5cdFx0XHRcdFx0aS0tO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Ly8gbWV0YSBhbmQgb3RoZXIgZWxlbWVudHMgY2FuIGJlIGRlbGV0ZWRcblx0XHRcdC8vIGJ1dCB3ZSBzaG91bGQgbm90IGRlbGV0ZSBhbmQgYXBwZW5kIHNhbWUgZWxlbWVudHNcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGtleSA9IHNlbGYuX2dldE5vZGVLZXkoY3VycmVudCk7XG5cdFx0XHRcdGlmIChtYXBbY3VycmVudC5ub2RlTmFtZV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdHNhbWVNZXRhRWxlbWVudHNba2V5XSA9IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChjdXJyZW50KTtcblx0XHRcdFx0XHRpLS07XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0aWYgKG1hcC5oYXNPd25Qcm9wZXJ0eShUQUdfTkFNRVMuTUVUQSkpIHtcblx0XHQvLyByZW1vdmUgbWV0YSB0YWdzIHdoaWNoIGEgbm90IGluIGEgbmV3IGhlYWQgc3RhdGVcblx0XHRPYmplY3Qua2V5cyhtYXBbVEFHX05BTUVTLk1FVEFdKVxuXHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKG1ldGFLZXkpIHtcblx0XHRcdFx0aWYgKHNhbWVNZXRhRWxlbWVudHMuaGFzT3duUHJvcGVydHkobWV0YUtleSkpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRoZWFkLnJlbW92ZUNoaWxkKG1hcFtUQUdfTkFNRVMuTUVUQV1bbWV0YUtleV0pO1xuXHRcdFx0fSk7XG5cdH1cbn07XG5cbi8qKlxuICogR2V0cyBtYXAgb2YgYWxsIEhFQUQncyBlbGVtZW50cy5cbiAqIEBwYXJhbSB7Tm9kZUxpc3R9IGhlYWRDaGlsZHJlbiBIZWFkIGNoaWxkcmVuIERPTSBub2Rlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IE1hcCBvZiBIRUFEIGVsZW1lbnRzLlxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2dldEhlYWRNYXAgPSBmdW5jdGlvbiAoaGVhZENoaWxkcmVuKSB7XG5cdC8vIENyZWF0ZSBtYXAgb2YgPG1ldGE+LCA8bGluaz4sIDxzdHlsZT4gYW5kIDxzY3JpcHQ+IHRhZ3Ncblx0Ly8gYnkgdW5pcXVlIGtleXMgdGhhdCBjb250YWluIGF0dHJpYnV0ZXMgYW5kIGNvbnRlbnRcblx0dmFyIG1hcCA9IHt9LFxuXHRcdGksIGN1cnJlbnQsXG5cdFx0c2VsZiA9IHRoaXM7XG5cblx0Zm9yIChpID0gMDsgaSA8IGhlYWRDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdGN1cnJlbnQgPSBoZWFkQ2hpbGRyZW5baV07XG5cdFx0aWYgKCFtYXAuaGFzT3duUHJvcGVydHkoY3VycmVudC5ub2RlTmFtZSkpIHtcblx0XHRcdG1hcFtjdXJyZW50Lm5vZGVOYW1lXSA9IHt9O1xuXHRcdH1cblx0XHRtYXBbY3VycmVudC5ub2RlTmFtZV1bc2VsZi5fZ2V0Tm9kZUtleShjdXJyZW50KV0gPSBjdXJyZW50O1xuXHR9XG5cdHJldHVybiBtYXA7XG59O1xuXG4vKipcbiAqIEdldHMgdW5pcXVlIGVsZW1lbnQga2V5IHVzaW5nIGVsZW1lbnQncyBhdHRyaWJ1dGVzIGFuZCBpdHMgY29udGVudC5cbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSBIVE1MIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBVbmlxdWUga2V5IGZvciBlbGVtZW50LlxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2dldE5vZGVLZXkgPSBmdW5jdGlvbiAobm9kZSkge1xuXHR2YXIgY3VycmVudCwgaSxcblx0XHRhdHRyaWJ1dGVzID0gW107XG5cblx0aWYgKG5vZGUubm9kZVR5cGUgIT09IE5PREVfVFlQRVMuRUxFTUVOVF9OT0RFKSB7XG5cdFx0cmV0dXJuIG5vZGUubm9kZVZhbHVlIHx8ICcnO1xuXHR9XG5cblx0aWYgKG5vZGUuaGFzQXR0cmlidXRlcygpKSB7XG5cdFx0Zm9yIChpID0gMDsgaSA8IG5vZGUuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y3VycmVudCA9IG5vZGUuYXR0cmlidXRlc1tpXTtcblx0XHRcdGF0dHJpYnV0ZXMucHVzaChjdXJyZW50Lm5hbWUgKyAnPScgKyBjdXJyZW50LnZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gYXR0cmlidXRlc1xuXHRcdFx0LnNvcnQoKVxuXHRcdFx0LmpvaW4oJ3wnKSArICc+JyArIG5vZGUudGV4dENvbnRlbnQ7XG59O1xuXG4vKipcbiAqIERvZXMgaW5pdGlhbCB3cmFwcGluZyBmb3IgZXZlcnkgY29tcG9uZW50IG9uIHRoZSBwYWdlLlxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2luaXRpYWxXcmFwID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0Y3VycmVudCwgaSwgaWQsIGluc3RhbmNlLFxuXHRcdGNvbXBvbmVudHMgPSB0aGlzLl9jb21wb25lbnRMb2FkZXIuZ2V0Q29tcG9uZW50c0J5TmFtZXMoKSxcblx0XHRiaW5kUHJvbWlzZXMgPSBbXTtcblxuXHRPYmplY3Qua2V5cyhjb21wb25lbnRzKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChjb21wb25lbnROYW1lKSB7XG5cdFx0XHR2YXIgdGFnTmFtZSA9IG1vZHVsZUhlbHBlclxuXHRcdFx0XHRcdC5nZXRUYWdOYW1lRm9yQ29tcG9uZW50TmFtZShjb21wb25lbnROYW1lKSxcblx0XHRcdFx0ZWxlbWVudHMsXG5cdFx0XHRcdGNvbnN0cnVjdG9yID0gY29tcG9uZW50c1tjb21wb25lbnROYW1lXS5jb25zdHJ1Y3RvcjtcblxuXHRcdFx0aWYgKG1vZHVsZUhlbHBlci5pc0RvY3VtZW50Q29tcG9uZW50KGNvbXBvbmVudE5hbWUpKSB7XG5cdFx0XHRcdGVsZW1lbnRzID0gW3NlbGYuX3dpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRdO1xuXHRcdFx0fSBlbHNlIGlmIChtb2R1bGVIZWxwZXIuaXNIZWFkQ29tcG9uZW50KGNvbXBvbmVudE5hbWUpKSB7XG5cdFx0XHRcdGVsZW1lbnRzID0gW3NlbGYuX3dpbmRvdy5kb2N1bWVudC5oZWFkXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnRzID0gc2VsZi5fd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y3VycmVudCA9IGVsZW1lbnRzW2ldO1xuXHRcdFx0XHRpZCA9IHNlbGYuX2dldElkKGN1cnJlbnQpO1xuXHRcdFx0XHRpZiAoIWlkKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUuJGNvbnRleHQgPSBzZWxmLl9nZXRDb21wb25lbnRDb250ZXh0KFxuXHRcdFx0XHRcdGNvbXBvbmVudHNbY29tcG9uZW50TmFtZV0sIGN1cnJlbnRcblx0XHRcdFx0KTtcblx0XHRcdFx0aW5zdGFuY2UgPSBzZWxmLl9zZXJ2aWNlTG9jYXRvci5yZXNvbHZlSW5zdGFuY2UoXG5cdFx0XHRcdFx0Y29uc3RydWN0b3IsIHNlbGYuX2NvbmZpZ1xuXHRcdFx0XHQpO1xuXHRcdFx0XHRpbnN0YW5jZS4kY29udGV4dCA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZS4kY29udGV4dDtcblx0XHRcdFx0c2VsZi5fY29tcG9uZW50RWxlbWVudHNbaWRdID0gY3VycmVudDtcblx0XHRcdFx0c2VsZi5fY29tcG9uZW50SW5zdGFuY2VzW2lkXSA9IGluc3RhbmNlO1xuXHRcdFx0XHQvLyBpbml0aWFsaXplIHRoZSBzdG9yZSBvZiB0aGUgY29tcG9uZW50XG5cdFx0XHRcdHNlbGYuX3N0b3JlRGlzcGF0Y2hlci5nZXRTdG9yZShcblx0XHRcdFx0XHRjdXJyZW50LmdldEF0dHJpYnV0ZShtb2R1bGVIZWxwZXIuQVRUUklCVVRFX1NUT1JFKVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdjb21wb25lbnRSZW5kZXJlZCcsIHtcblx0XHRcdFx0XHRuYW1lOiBjb21wb25lbnROYW1lLFxuXHRcdFx0XHRcdGF0dHJpYnV0ZXM6IGluc3RhbmNlLiRjb250ZXh0LmF0dHJpYnV0ZXMsXG5cdFx0XHRcdFx0Y29udGV4dDogaW5zdGFuY2UuJGNvbnRleHRcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGJpbmRQcm9taXNlcy5wdXNoKHNlbGYuX2JpbmRDb21wb25lbnQoY3VycmVudCkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdHJldHVybiBQcm9taXNlLmFsbChiaW5kUHJvbWlzZXMpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnZG9jdW1lbnRSZW5kZXJlZCcsIHNlbGYuX2N1cnJlbnRSb3V0aW5nQ29udGV4dCk7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIEdldHMgY29tcG9uZW50IGNvbnRleHQgdXNpbmcgYmFzaWMgY29udGV4dC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb21wb25lbnQgQ29tcG9uZW50IGRldGFpbHMuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgRE9NIGVsZW1lbnQgb2YgY29tcG9uZW50LlxuICogQHJldHVybnMge09iamVjdH0gQ29tcG9uZW50IGNvbnRleHQuXG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fZ2V0Q29tcG9uZW50Q29udGV4dCA9XG5cdGZ1bmN0aW9uIChjb21wb25lbnQsIGVsZW1lbnQpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRzdG9yZU5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShtb2R1bGVIZWxwZXIuQVRUUklCVVRFX1NUT1JFKSxcblx0XHRcdGNvbXBvbmVudENvbnRleHQgPSBPYmplY3QuY3JlYXRlKHRoaXMuX2N1cnJlbnRSb3V0aW5nQ29udGV4dCk7XG5cblx0XHQvLyBpbml0aWFsaXplIHRoZSBzdG9yZSBvZiB0aGUgY29tcG9uZW50XG5cdFx0dGhpcy5fc3RvcmVEaXNwYXRjaGVyLmdldFN0b3JlKHN0b3JlTmFtZSk7XG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjb21wb25lbnRDb250ZXh0LCB7XG5cdFx0XHRlbGVtZW50OiB7XG5cdFx0XHRcdHZhbHVlOiBlbGVtZW50LFxuXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0bmFtZToge1xuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gY29tcG9uZW50Lm5hbWU7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVudW1lcmFibGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiBhdHRyaWJ1dGVzVG9PYmplY3QoZWxlbWVudC5hdHRyaWJ1dGVzKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdGdldENvbXBvbmVudEJ5SWQ6IHtcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0XHRcdHJldHVybiBzZWxmLmdldENvbXBvbmVudEJ5SWQoaWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Y3JlYXRlQ29tcG9uZW50OiB7XG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAodGFnTmFtZSwgYXR0cmlidXRlcykge1xuXHRcdFx0XHRcdHJldHVybiBzZWxmLmNyZWF0ZUNvbXBvbmVudCh0YWdOYW1lLCBhdHRyaWJ1dGVzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGNvbGxlY3RHYXJiYWdlOiB7XG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHNlbGYuY29sbGVjdEdhcmJhZ2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGdldFN0b3JlRGF0YToge1xuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHZhciBjdXJyZW50U3RvcmVOYW1lID0gY29tcG9uZW50Q29udGV4dC5lbGVtZW50XG5cdFx0XHRcdFx0XHQuZ2V0QXR0cmlidXRlKG1vZHVsZUhlbHBlci5BVFRSSUJVVEVfU1RPUkUpO1xuXHRcdFx0XHRcdHJldHVybiBzZWxmLl9zdG9yZURpc3BhdGNoZXJcblx0XHRcdFx0XHRcdC5nZXRTdG9yZURhdGEoY3VycmVudFN0b3JlTmFtZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRzZW5kQWN0aW9uOiB7XG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAobmFtZSwgYXJncykge1xuXHRcdFx0XHRcdHZhciBjdXJyZW50U3RvcmVOYW1lID0gY29tcG9uZW50Q29udGV4dC5lbGVtZW50XG5cdFx0XHRcdFx0XHQuZ2V0QXR0cmlidXRlKG1vZHVsZUhlbHBlci5BVFRSSUJVVEVfU1RPUkUpO1xuXHRcdFx0XHRcdHJldHVybiBzZWxmLl9zdG9yZURpc3BhdGNoZXJcblx0XHRcdFx0XHRcdC5zZW5kQWN0aW9uKGN1cnJlbnRTdG9yZU5hbWUsIG5hbWUsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0c2VuZEJyb2FkY2FzdEFjdGlvbjoge1xuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKG5hbWUsIGFyZ3MpIHtcblx0XHRcdFx0XHRyZXR1cm4gc2VsZi5fc3RvcmVEaXNwYXRjaGVyXG5cdFx0XHRcdFx0XHQuc2VuZEJyb2FkY2FzdEFjdGlvbihuYW1lLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGNvbXBvbmVudENvbnRleHQ7XG5cdH07XG5cbi8qKlxuICogRmluZHMgYWxsIHJlbmRlcmluZyByb290cyBvbiBwYWdlIGZvciBhbGwgY2hhbmdlZCBzdG9yZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBjaGFuZ2VkU3RvcmVOYW1lcyBMaXN0IG9mIHN0b3JlIG5hbWVzIHdoaWNoIGhhcyBiZWVuIGNoYW5nZWQuXG4gKiBAcmV0dXJucyB7QXJyYXk8RWxlbWVudD59IEhUTUwgZWxlbWVudHMgdGhhdCBhcmUgcmVuZGVyaW5nIHJvb3RzLlxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2ZpbmRSZW5kZXJpbmdSb290cyA9IGZ1bmN0aW9uIChjaGFuZ2VkU3RvcmVOYW1lcykge1xuXHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0aGVhZFN0b3JlID0gdGhpcy5fd2luZG93LmRvY3VtZW50LmhlYWQuZ2V0QXR0cmlidXRlKFxuXHRcdFx0bW9kdWxlSGVscGVyLkFUVFJJQlVURV9TVE9SRVxuXHRcdCksXG5cdFx0Y29tcG9uZW50cyA9IHRoaXMuX2NvbXBvbmVudExvYWRlci5nZXRDb21wb25lbnRzQnlOYW1lcygpLFxuXHRcdGNvbXBvbmVudHNFbGVtZW50cyA9IHt9LFxuXHRcdHN0b3JlTmFtZXNTZXQgPSB7fSxcblx0XHRyb290c1NldCA9IHt9LFxuXHRcdHJvb3RzID0gW107XG5cblx0Ly8gd2Ugc2hvdWxkIGZpbmQgYWxsIGNvbXBvbmVudHMgYW5kIHRoZW4gbG9va2luZyBmb3Igcm9vdHNcblx0Y2hhbmdlZFN0b3JlTmFtZXNcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0XHRzdG9yZU5hbWVzU2V0W3N0b3JlTmFtZV0gPSB0cnVlO1xuXHRcdFx0Y29tcG9uZW50c0VsZW1lbnRzW3N0b3JlTmFtZV0gPSBzZWxmLl93aW5kb3cuZG9jdW1lbnRcblx0XHRcdFx0LnF1ZXJ5U2VsZWN0b3JBbGwoXG5cdFx0XHRcdFx0J1snICtcblx0XHRcdFx0XHRtb2R1bGVIZWxwZXIuQVRUUklCVVRFX0lEICtcblx0XHRcdFx0XHQnXScgK1xuXHRcdFx0XHRcdCdbJyArXG5cdFx0XHRcdFx0bW9kdWxlSGVscGVyLkFUVFJJQlVURV9TVE9SRSArXG5cdFx0XHRcdFx0Jz1cIicgK1xuXHRcdFx0XHRcdHN0b3JlTmFtZSArXG5cdFx0XHRcdFx0J1wiXSdcblx0XHRcdFx0KTtcblx0XHR9KTtcblxuXHRpZiAoY29tcG9uZW50cy5oYXNPd25Qcm9wZXJ0eShtb2R1bGVIZWxwZXIuSEVBRF9DT01QT05FTlRfTkFNRSkgJiZcblx0XHRzdG9yZU5hbWVzU2V0Lmhhc093blByb3BlcnR5KGhlYWRTdG9yZSkpIHtcblx0XHRyb290c1NldFt0aGlzLl9nZXRJZCh0aGlzLl93aW5kb3cuZG9jdW1lbnQuaGVhZCldID0gdHJ1ZTtcblx0XHRyb290cy5wdXNoKHRoaXMuX3dpbmRvdy5kb2N1bWVudC5oZWFkKTtcblx0fVxuXG5cdGNoYW5nZWRTdG9yZU5hbWVzXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuXHRcdFx0dmFyIGN1cnJlbnQsIGN1cnJlbnRJZCxcblx0XHRcdFx0bGFzdFJvb3QsIGxhc3RSb290SWQsXG5cdFx0XHRcdGN1cnJlbnRTdG9yZSwgY3VycmVudENvbXBvbmVudE5hbWU7XG5cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY29tcG9uZW50c0VsZW1lbnRzW3N0b3JlTmFtZV0ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y3VycmVudCA9IGNvbXBvbmVudHNFbGVtZW50c1tzdG9yZU5hbWVdW2ldO1xuXHRcdFx0XHRjdXJyZW50SWQgPSBjb21wb25lbnRzRWxlbWVudHNbc3RvcmVOYW1lXVtpXVxuXHRcdFx0XHRcdC5nZXRBdHRyaWJ1dGUobW9kdWxlSGVscGVyLkFUVFJJQlVURV9JRCk7XG5cdFx0XHRcdGxhc3RSb290ID0gY3VycmVudDtcblx0XHRcdFx0bGFzdFJvb3RJZCA9IGN1cnJlbnRJZDtcblx0XHRcdFx0Y3VycmVudENvbXBvbmVudE5hbWUgPSBtb2R1bGVIZWxwZXIuZ2V0T3JpZ2luYWxDb21wb25lbnROYW1lKFxuXHRcdFx0XHRcdGN1cnJlbnQudGFnTmFtZVxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdHdoaWxlIChjdXJyZW50LnBhcmVudEVsZW1lbnQpIHtcblx0XHRcdFx0XHRjdXJyZW50ID0gY3VycmVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0XHRcdGN1cnJlbnRJZCA9IHNlbGYuX2dldElkKGN1cnJlbnQpO1xuXHRcdFx0XHRcdGN1cnJlbnRTdG9yZSA9IGN1cnJlbnQuZ2V0QXR0cmlidXRlKFxuXHRcdFx0XHRcdFx0bW9kdWxlSGVscGVyLkFUVFJJQlVURV9TVE9SRVxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHQvLyBzdG9yZSBkaWQgbm90IGNoYW5nZSBzdGF0ZVxuXHRcdFx0XHRcdGlmICghY3VycmVudFN0b3JlIHx8XG5cdFx0XHRcdFx0XHQhc3RvcmVOYW1lc1NldC5oYXNPd25Qcm9wZXJ0eShjdXJyZW50U3RvcmUpKSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLy8vIGlzIG5vdCBhbiBhY3RpdmUgY29tcG9uZW50XG5cdFx0XHRcdFx0aWYgKCFjb21wb25lbnRzLmhhc093blByb3BlcnR5KGN1cnJlbnRDb21wb25lbnROYW1lKSkge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bGFzdFJvb3QgPSBjdXJyZW50O1xuXHRcdFx0XHRcdGxhc3RSb290SWQgPSBjdXJyZW50SWQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHJvb3RzU2V0Lmhhc093blByb3BlcnR5KGxhc3RSb290SWQpKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0cm9vdHNTZXRbbGFzdFJvb3RJZF0gPSB0cnVlO1xuXHRcdFx0XHRyb290cy5wdXNoKGxhc3RSb290KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRyZXR1cm4gcm9vdHM7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgcmVuZGVyaW5nIGNvbnRleHQuXG4gKiBAcGFyYW0ge0FycmF5P30gY2hhbmdlZFN0b3JlcyBOYW1lcyBvZiBjaGFuZ2VkIHN0b3Jlcy5cbiAqIEByZXR1cm5zIHt7XG4gKiAgIGNvbmZpZzogT2JqZWN0LFxuICogICByZW5kZXJlZElkczoge30sXG4gKiAgIHVuYm91bmRJZHM6IHt9LFxuICogICBpc0hlYWRSZW5kZXJlZDogQm9vbGVhbixcbiAqICAgYmluZE1ldGhvZHM6IEFycmF5LFxuICogICByb3V0aW5nQ29udGV4dDogT2JqZWN0LFxuICogICBjb21wb25lbnRzOiBPYmplY3QsXG4gKiAgIGNvbXBvbmVudFRhZ3M6IEFycmF5LFxuICogICByb290czogQXJyYXkuPEVsZW1lbnQ+XG4gKiB9fVxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2NyZWF0ZVJlbmRlcmluZ0NvbnRleHQgPSBmdW5jdGlvbiAoY2hhbmdlZFN0b3Jlcykge1xuXHR2YXIgY29tcG9uZW50cyA9IHRoaXMuX2NvbXBvbmVudExvYWRlci5nZXRDb21wb25lbnRzQnlOYW1lcygpLFxuXHRcdGNvbXBvbmVudFRhZ3MgPSBPYmplY3Qua2V5cyhjb21wb25lbnRzKVxuXHRcdFx0Lm1hcChmdW5jdGlvbiAobmFtZSkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlSGVscGVyLmdldFRhZ05hbWVGb3JDb21wb25lbnROYW1lKG5hbWUpO1xuXHRcdFx0fSk7XG5cdHJldHVybiB7XG5cdFx0Y29uZmlnOiB0aGlzLl9jb25maWcsXG5cdFx0cmVuZGVyZWRJZHM6IHt9LFxuXHRcdHVuYm91bmRJZHM6IHt9LFxuXHRcdGlzSGVhZFJlbmRlcmVkOiBmYWxzZSxcblx0XHRiaW5kTWV0aG9kczogW10sXG5cdFx0cm91dGluZ0NvbnRleHQ6IHRoaXMuX2N1cnJlbnRSb3V0aW5nQ29udGV4dCxcblx0XHRjb21wb25lbnRzOiBjb21wb25lbnRzLFxuXHRcdGNvbXBvbmVudFRhZ3M6IGNvbXBvbmVudFRhZ3MsXG5cdFx0cm9vdHM6IGNoYW5nZWRTdG9yZXMgPyB0aGlzLl9maW5kUmVuZGVyaW5nUm9vdHMoY2hhbmdlZFN0b3JlcykgOiBbXVxuXHR9O1xufTtcblxuLyoqXG4gKiBHZXRzIElEIG9mIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IEhUTUwgZWxlbWVudCBvZiBjb21wb25lbnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBJRC5cbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2dldElkID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0aWYgKGVsZW1lbnQgPT09IHRoaXMuX3dpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcblx0XHRyZXR1cm4gU1BFQ0lBTF9JRFMuJCRkb2N1bWVudDtcblx0fVxuXHRpZiAoZWxlbWVudCA9PT0gdGhpcy5fd2luZG93LmRvY3VtZW50LmhlYWQpIHtcblx0XHRyZXR1cm4gU1BFQ0lBTF9JRFMuJCRoZWFkO1xuXHR9XG5cdHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShtb2R1bGVIZWxwZXIuQVRUUklCVVRFX0lEKTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgTmFtZWROb2RlTWFwIG9mIEF0dHIgaXRlbXMgdG8ga2V5LXZhbHVlIG9iamVjdCBtYXAuXG4gKiBAcGFyYW0ge05hbWVkTm9kZU1hcH0gYXR0cmlidXRlcyBMaXN0IG9mIEVsZW1lbnQgYXR0cmlidXRlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IE1hcCBvZiBhdHRyaWJ1dGUgdmFsdWVzIGJ5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhdHRyaWJ1dGVzVG9PYmplY3QoYXR0cmlidXRlcykge1xuXHR2YXIgcmVzdWx0ID0ge307XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuXHRcdHJlc3VsdFthdHRyaWJ1dGVzW2ldLm5hbWVdID0gYXR0cmlidXRlc1tpXS52YWx1ZTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldHMgY3Jvc3MtYnJvd3NlciBcIm1hdGNoZXNcIiBtZXRob2QgZm9yIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IEhUTUwgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gXCJtYXRjaGVzXCIgbWV0aG9kLlxuICovXG5mdW5jdGlvbiBnZXRNYXRjaGVzTWV0aG9kKGVsZW1lbnQpIHtcblx0dmFyIG1ldGhvZCA9ICAoZWxlbWVudC5tYXRjaGVzIHx8XG5cdFx0ZWxlbWVudC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRlbGVtZW50Lm1vek1hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGVsZW1lbnQub01hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGVsZW1lbnQubXNNYXRjaGVzU2VsZWN0b3IpO1xuXG5cdHJldHVybiBtZXRob2QuYmluZChlbGVtZW50KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGltaXRhdGlvbiBvZiBvcmlnaW5hbCBFdmVudCBvYmplY3QgYnV0IHdpdGggc3BlY2lmaWVkIGN1cnJlbnRUYXJnZXQuXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCBPcmlnaW5hbCBldmVudCBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXJyZW50VGFyZ2V0R2V0dGVyIEdldHRlciBmb3IgY3VycmVudFRhcmdldC5cbiAqIEByZXR1cm5zIHtFdmVudH0gV3JhcHBlZCBldmVudC5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ3VzdG9tRXZlbnQoZXZlbnQsIGN1cnJlbnRUYXJnZXRHZXR0ZXIpIHtcblx0dmFyIGNhdEV2ZW50ID0gT2JqZWN0LmNyZWF0ZShldmVudCksXG5cdFx0a2V5cyA9IFtdLFxuXHRcdHByb3BlcnRpZXMgPSB7fTtcblx0Zm9yKHZhciBrZXkgaW4gZXZlbnQpIHtcblx0XHRrZXlzLnB1c2goa2V5KTtcblx0fVxuXHRrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGlmICh0eXBlb2YoZXZlbnRba2V5XSkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHByb3BlcnRpZXNba2V5XSA9IHtcblx0XHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGV2ZW50W2tleV0uYmluZChldmVudCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0cHJvcGVydGllc1trZXldID0ge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBldmVudFtrZXldO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdGV2ZW50W2tleV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9O1xuXHR9KTtcblxuXHRwcm9wZXJ0aWVzLmN1cnJlbnRUYXJnZXQgPSB7XG5cdFx0Z2V0OiBjdXJyZW50VGFyZ2V0R2V0dGVyXG5cdH07XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNhdEV2ZW50LCBwcm9wZXJ0aWVzKTtcblx0T2JqZWN0LnNlYWwoY2F0RXZlbnQpO1xuXHRPYmplY3QuZnJlZXplKGNhdEV2ZW50KTtcblx0cmV0dXJuIGNhdEV2ZW50O1xufSIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvZ2dlcjtcblxudmFyIExFVkVMUyA9IHtcblx0VFJBQ0U6ICd0cmFjZScsXG5cdElORk86ICdpbmZvJyxcblx0V0FSTjogJ3dhcm4nLFxuXHRFUlJPUjogJ2Vycm9yJyxcblx0RkFUQUw6ICdmYXRhbCdcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBicm93c2VyIGxvZ2dlci5cbiAqIEBwYXJhbSB7T2JqZWN0fHN0cmluZ30gbGV2ZWxzIExldmVscyB0byBsb2cuXG4gKiBAc3VwcG9ydGVkIENocm9tZSwgRmlyZWZveD49Mi4wLCBJbnRlcm5ldCBFeHBsb3Jlcj49OCwgT3BlcmEsIFNhZmFyaS5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBMb2dnZXIobGV2ZWxzKSB7XG5cdGlmICh0eXBlb2YgKGxldmVscykgPT09ICdvYmplY3QnKSB7XG5cdFx0dGhpcy5fbGV2ZWxzID0gbGV2ZWxzO1xuXHR9XG5cblx0aWYgKHR5cGVvZihsZXZlbHMpID09PSAnc3RyaW5nJykge1xuXHRcdHRoaXMuX2xldmVscyA9IHt9O1xuXHRcdE9iamVjdC5rZXlzKExFVkVMUylcblx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChsZXZlbCkge1xuXHRcdFx0XHR0aGlzLl9sZXZlbHNbTEVWRUxTW2xldmVsXV0gPVxuXHRcdFx0XHRcdChsZXZlbHMuc2VhcmNoKExFVkVMU1tsZXZlbF0pICE9PSAtMSk7XG5cdFx0XHR9LCB0aGlzKTtcblx0fVxuXG5cdHRoaXMudHJhY2UgPSB0aGlzLnRyYWNlLmJpbmQodGhpcyk7XG5cdHRoaXMuaW5mbyA9IHRoaXMuaW5mby5iaW5kKHRoaXMpO1xuXHR0aGlzLndhcm4gPSB0aGlzLndhcm4uYmluZCh0aGlzKTtcblx0dGhpcy5lcnJvciA9IHRoaXMuZXJyb3IuYmluZCh0aGlzKTtcblx0dGhpcy5mYXRhbCA9IHRoaXMuZmF0YWwuYmluZCh0aGlzKTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IGxldmVscyBvZiBsb2dnaW5nLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbkxvZ2dlci5wcm90b3R5cGUuX2xldmVscyA9IHtcblx0dHJhY2U6IHRydWUsXG5cdGluZm86IHRydWUsXG5cdHdhcm46IHRydWUsXG5cdGVycm9yOiB0cnVlLFxuXHRmYXRhbDogdHJ1ZVxufTtcblxuLyoqXG4gKiBMb2dzIHRyYWNlIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUcmFjZSBtZXNzYWdlLlxuICovXG5Mb2dnZXIucHJvdG90eXBlLnRyYWNlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcblx0aWYgKCF0aGlzLl9sZXZlbHMudHJhY2UpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAoY29uc29sZS5sb2cpIHtcblx0XHRjb25zb2xlLmxvZyhtZXNzYWdlKTtcblx0fVxufTtcblxuLyoqXG4gKiBMb2dzIGluZm8gbWVzc2FnZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIEluZm9ybWF0aW9uIG1lc3NhZ2UuXG4gKi9cbkxvZ2dlci5wcm90b3R5cGUuaW5mbyA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG5cdGlmICghdGhpcy5fbGV2ZWxzLmluZm8pIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAoY29uc29sZS5pbmZvKSB7XG5cdFx0Y29uc29sZS5pbmZvKG1lc3NhZ2UpO1xuXHR9XG59O1xuXG4vKipcbiAqIExvZ3Mgd2FybiBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgV2FybmluZyBtZXNzYWdlLlxuICovXG5Mb2dnZXIucHJvdG90eXBlLndhcm4gPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuXHRpZiAoIXRoaXMuX2xldmVscy53YXJuKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKGNvbnNvbGUud2Fybikge1xuXHRcdGNvbnNvbGUud2FybihtZXNzYWdlKTtcblx0fVxufTtcbi8qKlxuICogTG9ncyBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd8RXJyb3J9IGVycm9yIEVycm9yIG9iamVjdCBvciBtZXNzYWdlLlxuICovXG5Mb2dnZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG5cdGlmICghdGhpcy5fbGV2ZWxzLmVycm9yKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0d3JpdGVFcnJvcihlcnJvcik7XG59O1xuXG4vKipcbiAqIExvZ3MgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7c3RyaW5nfEVycm9yfSBlcnJvciBFcnJvciBvYmplY3Qgb3IgbWVzc2FnZS5cbiAqL1xuTG9nZ2VyLnByb3RvdHlwZS5mYXRhbCA9IGZ1bmN0aW9uIChlcnJvcikge1xuXHRpZiAoIXRoaXMuX2xldmVscy5mYXRhbCkge1xuXHRcdHJldHVybjtcblx0fVxuXHR3cml0ZUVycm9yKGVycm9yKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGVycm9yIHRvIGNvbnNvbGUuXG4gKiBAcGFyYW0ge0Vycm9yfHN0cmluZ30gZXJyb3IgRXJyb3IgdG8gd3JpdGUuXG4gKi9cbmZ1bmN0aW9uIHdyaXRlRXJyb3IoZXJyb3IpIHtcblx0dHJ5IHtcblx0XHRpZiAoIShlcnJvciBpbnN0YW5jZW9mIEVycm9yKSkge1xuXHRcdFx0ZXJyb3IgPSB0eXBlb2YoZXJyb3IpID09PSAnc3RyaW5nJyA/IG5ldyBFcnJvcihlcnJvcikgOiBuZXcgRXJyb3IoKTtcblx0XHR9XG5cdFx0aWYgKGNvbnNvbGUuZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fSBjYXRjaCAoZSkge1xuXHRcdHdyaXRlRXJyb3IoZSk7XG5cdH1cbn0iLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBSZXF1ZXN0Um91dGVyO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKSxcblx0VVJJID0gcmVxdWlyZSgnY2F0YmVycnktdXJpJykuVVJJO1xuXG52YXIgTU9VU0VfS0VZUyA9IHtcblx0XHRMRUZUOiAwLFxuXHRcdE1JRERMRTogMVxuXHR9LFxuXG5cdEhSRUZfQVRUUklCVVRFX05BTUUgPSAnaHJlZicsXG5cdFRBUkdFVF9BVFRSSUJVVEVfTkFNRSA9ICd0YXJnZXQnLFxuXHRBX1RBR19OQU1FID0gJ0EnLFxuXHRCT0RZX1RBR19OQU1FID0gJ0JPRFknO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBicm93c2VyIHJlcXVlc3Qgcm91dGVyLlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gJHNlcnZpY2VMb2NhdG9yIFNlcnZpY2UgbG9jYXRvciB0byByZXNvbHZlIHNlcnZpY2VzLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFJlcXVlc3RSb3V0ZXIoJHNlcnZpY2VMb2NhdG9yKSB7XG5cdHRoaXMuX2V2ZW50QnVzID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ2V2ZW50QnVzJyk7XG5cdHRoaXMuX3dpbmRvdyA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCd3aW5kb3cnKTtcblx0dGhpcy5fZG9jdW1lbnRSZW5kZXJlciA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdkb2N1bWVudFJlbmRlcmVyJyk7XG5cdHRoaXMuX3N0YXRlUHJvdmlkZXIgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnc3RhdGVQcm92aWRlcicpO1xuXHR0aGlzLl9jb250ZXh0RmFjdG9yeSA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdjb250ZXh0RmFjdG9yeScpO1xuXG5cdHRoaXMuX2lzSGlzdG9yeVN1cHBvcnRlZCA9IHRoaXMuX3dpbmRvdy5oaXN0b3J5ICYmXG5cdFx0dGhpcy5fd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlIGluc3RhbmNlb2YgRnVuY3Rpb247XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHQvLyBhZGQgZXZlbnQgaGFuZGxlcnNcblx0c2VsZi5fd3JhcERvY3VtZW50KCk7XG5cblx0Ly8gc2V0IGluaXRpYWwgc3RhdGUgZnJvbSBjdXJyZW50IFVSSVxuXHR0aGlzLl9jaGFuZ2VTdGF0ZShuZXcgVVJJKHRoaXMuX3dpbmRvdy5sb2NhdGlvbi50b1N0cmluZygpKSlcblx0XHQuY2F0Y2goZnVuY3Rpb24gKHJlYXNvbikge1xuXHRcdFx0c2VsZi5faGFuZGxlRXJyb3IocmVhc29uKTtcblx0XHR9KTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IGluaXRpYWxpemF0aW9uIGZsYWcuXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cblJlcXVlc3RSb3V0ZXIucHJvdG90eXBlLl9pc1N0YXRlSW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuLyoqXG4gKiBDdXJyZW50IHJlZmVycmVyLlxuICogQHR5cGUge1VSSX1cbiAqIEBwcml2YXRlXG4gKi9cblJlcXVlc3RSb3V0ZXIucHJvdG90eXBlLl9yZWZlcnJlciA9ICcnO1xuXG4vKipcbiAqIEN1cnJlbnQgbG9jYXRpb24uXG4gKiBAdHlwZSB7VVJJfVxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuX2xvY2F0aW9uID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IGV2ZW50IGJ1cy5cbiAqIEB0eXBlIHtFdmVudEVtaXR0ZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5fZXZlbnRCdXMgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgY29udGV4dCBmYWN0b3J5LlxuICogQHR5cGUge0NvbnRleHRGYWN0b3J5fVxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuX2NvbnRleHRGYWN0b3J5ID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHN0YXRlIHByb3ZpZGVyLlxuICogQHR5cGUge1N0YXRlUHJvdmlkZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5fc3RhdGVQcm92aWRlciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBkb2N1bWVudCByZW5kZXJlci5cbiAqIEB0eXBlIHtEb2N1bWVudFJlbmRlcmVyfVxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuX2RvY3VtZW50UmVuZGVyZXIgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgYnJvd3NlciB3aW5kb3cuXG4gKiBAdHlwZSB7V2luZG93fVxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuX3dpbmRvdyA9IG51bGw7XG5cbi8qKlxuICogVHJ1ZSBpZiBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgaGlzdG9yeSBBUEkuXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cblJlcXVlc3RSb3V0ZXIucHJvdG90eXBlLl9pc0hpc3RvcnlTdXBwb3J0ZWQgPSBmYWxzZTtcblxuLyoqXG4gKiBSb3V0ZXMgYnJvd3NlciByZW5kZXIgcmVxdWVzdC5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5yb3V0ZSA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHQvLyBiZWNhdXNlIG5vdyBsb2NhdGlvbiB3YXMgbm90IGNoYW5nZSB5ZXQgYW5kXG5cdC8vIGRpZmZlcmVudCBicm93c2VycyBoYW5kbGUgYHBvcHN0YXRlYCBkaWZmZXJlbnRseVxuXHQvLyB3ZSBuZWVkIHRvIGRvIHJvdXRlIGluIG5leHQgaXRlcmF0aW9uIG9mIGV2ZW50IGxvb3Bcblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIG5ld0xvY2F0aW9uID0gbmV3IFVSSShzZWxmLl93aW5kb3cubG9jYXRpb24udG9TdHJpbmcoKSksXG5cdFx0XHRcdG5ld0F1dGhvcml0eSA9IG5ld0xvY2F0aW9uLmF1dGhvcml0eSA/XG5cdFx0XHRcdFx0bmV3TG9jYXRpb24uYXV0aG9yaXR5LnRvU3RyaW5nKCkgOiBudWxsLFxuXHRcdFx0XHRjdXJyZW50QXV0aG9yaXR5ID0gc2VsZi5fbG9jYXRpb24uYXV0aG9yaXR5ID9cblx0XHRcdFx0XHRzZWxmLl9sb2NhdGlvbi5hdXRob3JpdHkudG9TdHJpbmcoKSA6IG51bGw7XG5cblx0XHRcdGlmIChuZXdMb2NhdGlvbi5zY2hlbWUgIT09IHNlbGYuX2xvY2F0aW9uLnNjaGVtZSB8fFxuXHRcdFx0XHRuZXdBdXRob3JpdHkgIT09IGN1cnJlbnRBdXRob3JpdHkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBpZiBvbmx5IFVSSSBmcmFnbWVudCBpcyBjaGFuZ2VkXG5cdFx0XHR2YXIgbmV3UXVlcnkgPSBuZXdMb2NhdGlvbi5xdWVyeSA/XG5cdFx0XHRcdFx0bmV3TG9jYXRpb24ucXVlcnkudG9TdHJpbmcoKSA6IG51bGwsXG5cdFx0XHRcdGN1cnJlbnRRdWVyeSA9IHNlbGYuX2xvY2F0aW9uLnF1ZXJ5ID9cblx0XHRcdFx0XHRzZWxmLl9sb2NhdGlvbi5xdWVyeS50b1N0cmluZygpIDogbnVsbDtcblx0XHRcdGlmIChuZXdMb2NhdGlvbi5wYXRoID09PSBzZWxmLl9sb2NhdGlvbi5wYXRoICYmXG5cdFx0XHRcdG5ld1F1ZXJ5ID09PSBjdXJyZW50UXVlcnkpIHtcblx0XHRcdFx0c2VsZi5fbG9jYXRpb24gPSBuZXdMb2NhdGlvbjtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHNlbGYuX2NoYW5nZVN0YXRlKG5ld0xvY2F0aW9uKTtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogU2V0cyBhcHBsaWNhdGlvbiBzdGF0ZSB0byBzcGVjaWZpZWQgVVJJLlxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uU3RyaW5nIFVSSSB0byBnby5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5nbyA9IGZ1bmN0aW9uIChsb2NhdGlvblN0cmluZykge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBsb2NhdGlvbiA9IG5ldyBVUkkobG9jYXRpb25TdHJpbmcpO1xuXHRcdFx0bG9jYXRpb24gPSBsb2NhdGlvbi5yZXNvbHZlUmVsYXRpdmUoc2VsZi5fbG9jYXRpb24pO1xuXHRcdFx0bG9jYXRpb25TdHJpbmcgPSBsb2NhdGlvbi50b1N0cmluZygpO1xuXG5cdFx0XHR2YXIgY3VycmVudEF1dGhvcml0eSA9IHNlbGYuX2xvY2F0aW9uLmF1dGhvcml0eSA/XG5cdFx0XHRcdFx0c2VsZi5fbG9jYXRpb24uYXV0aG9yaXR5LnRvU3RyaW5nKCkgOiBudWxsLFxuXHRcdFx0XHRuZXdBdXRob3JpdHkgPSBsb2NhdGlvbi5hdXRob3JpdHkgP1xuXHRcdFx0XHRcdGxvY2F0aW9uLmF1dGhvcml0eS50b1N0cmluZygpIDogbnVsbDtcblxuXHRcdFx0Ly8gd2UgbXVzdCBjaGVjayBpZiB0aGlzIGlzIGFuIGV4dGVybmFsIGxpbmsgYmVmb3JlIG1hcCBVUklcblx0XHRcdC8vIHRvIGludGVybmFsIGFwcGxpY2F0aW9uIHN0YXRlXG5cdFx0XHRpZiAoIXNlbGYuX2lzSGlzdG9yeVN1cHBvcnRlZCB8fFxuXHRcdFx0XHRsb2NhdGlvbi5zY2hlbWUgIT09IHNlbGYuX2xvY2F0aW9uLnNjaGVtZSB8fFxuXHRcdFx0XHRuZXdBdXRob3JpdHkgIT09IGN1cnJlbnRBdXRob3JpdHkpIHtcblx0XHRcdFx0c2VsZi5fd2luZG93LmxvY2F0aW9uLmFzc2lnbihsb2NhdGlvblN0cmluZyk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHN0YXRlID0gc2VsZi5fc3RhdGVQcm92aWRlci5nZXRTdGF0ZUJ5VXJpKGxvY2F0aW9uKTtcblx0XHRcdGlmICghc3RhdGUpIHtcblx0XHRcdFx0c2VsZi5fd2luZG93LmxvY2F0aW9uLmFzc2lnbihsb2NhdGlvblN0cmluZyk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0c2VsZi5fd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHN0YXRlLCAnJywgbG9jYXRpb25TdHJpbmcpO1xuXHRcdFx0cmV0dXJuIHNlbGYucm91dGUoKTtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogQ2hhbmdlcyBjdXJyZW50IGFwcGxpY2F0aW9uIHN0YXRlIHdpdGggbmV3IGxvY2F0aW9uLlxuICogQHBhcmFtIHtVUkl9IG5ld0xvY2F0aW9uIE5ldyBsb2NhdGlvbi5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuX2NoYW5nZVN0YXRlID0gZnVuY3Rpb24gKG5ld0xvY2F0aW9uKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5fbG9jYXRpb24gPSBuZXdMb2NhdGlvbjtcblx0XHRcdHZhciBzdGF0ZSA9IHNlbGYuX3N0YXRlUHJvdmlkZXIuZ2V0U3RhdGVCeVVyaShuZXdMb2NhdGlvbiksXG5cdFx0XHRcdHJvdXRpbmdDb250ZXh0ID0gc2VsZi5fY29udGV4dEZhY3RvcnkuY3JlYXRlKHtcblx0XHRcdFx0XHRyZWZlcnJlcjogc2VsZi5fcmVmZXJyZXIgfHwgc2VsZi5fd2luZG93LmRvY3VtZW50LnJlZmVycmVyLFxuXHRcdFx0XHRcdGxvY2F0aW9uOiBzZWxmLl9sb2NhdGlvbixcblx0XHRcdFx0XHR1c2VyQWdlbnQ6IHNlbGYuX3dpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoIXNlbGYuX2lzU3RhdGVJbml0aWFsaXplZCkge1xuXHRcdFx0XHRzZWxmLl9pc1N0YXRlSW5pdGlhbGl6ZWQgPSB0cnVlO1xuXHRcdFx0XHRyZXR1cm4gc2VsZi5fZG9jdW1lbnRSZW5kZXJlci5pbml0V2l0aFN0YXRlKFxuXHRcdFx0XHRcdHN0YXRlLCByb3V0aW5nQ29udGV4dFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoc3RhdGUgPT09IG51bGwpIHtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBzZWxmLl9kb2N1bWVudFJlbmRlcmVyXG5cdFx0XHRcdC5yZW5kZXIoc3RhdGUsIHJvdXRpbmdDb250ZXh0KTtcblx0XHR9KVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuX3JlZmVycmVyID0gc2VsZi5fbG9jYXRpb247XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIFdyYXBzIGRvY3VtZW50IHdpdGggcmVxdWlyZWQgZXZlbnRzIHRvIHJvdXRlIHJlcXVlc3RzLlxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuX3dyYXBEb2N1bWVudCA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdGlmICghdGhpcy5faXNIaXN0b3J5U3VwcG9ydGVkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dGhpcy5fd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgZnVuY3Rpb24gKCkge1xuXHRcdHNlbGYucm91dGUoKS5jYXRjaChzZWxmLl9oYW5kbGVFcnJvci5iaW5kKHNlbGYpKTtcblx0fSk7XG5cblx0dGhpcy5fd2luZG93LmRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAoZXZlbnQudGFyZ2V0LnRhZ05hbWUgPT09IEFfVEFHX05BTUUpIHtcblx0XHRcdHNlbGYuX2xpbmtDbGlja0hhbmRsZXIoZXZlbnQsIGV2ZW50LnRhcmdldCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBsaW5rID0gY2xvc2VzdExpbmsoZXZlbnQudGFyZ2V0KTtcblx0XHRcdGlmICghbGluaykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRzZWxmLl9saW5rQ2xpY2tIYW5kbGVyKGV2ZW50LCBsaW5rKTtcblx0XHR9XG5cdH0pO1xufTtcblxuLyoqXG4gKiBIYW5kbGVzIGxpbmsgY2xpY2sgb24gdGhlIHBhZ2UuXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCBFdmVudC1yZWxhdGVkIG9iamVjdC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBMaW5rIGVsZW1lbnQuXG4gKiBAcHJpdmF0ZVxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5fbGlua0NsaWNrSGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCwgZWxlbWVudCkge1xuXHR2YXIgdGFyZ2V0QXR0cmlidXRlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoVEFSR0VUX0FUVFJJQlVURV9OQU1FKTtcblx0aWYgKHRhcmdldEF0dHJpYnV0ZSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIGlmIG1pZGRsZSBtb3VzZSBidXR0b24gd2FzIGNsaWNrZWRcblx0aWYgKGV2ZW50LmJ1dHRvbiA9PT0gTU9VU0VfS0VZUy5NSURETEUpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHR2YXIgbG9jYXRpb25TdHJpbmcgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShIUkVGX0FUVFJJQlVURV9OQU1FKTtcblx0aWYgKCFsb2NhdGlvblN0cmluZykge1xuXHRcdHJldHVybjtcblx0fVxuXHRpZiAobG9jYXRpb25TdHJpbmdbMF0gPT09ICcjJykge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdHRoaXMuZ28obG9jYXRpb25TdHJpbmcpXG5cdFx0LmNhdGNoKHRoaXMuX2hhbmRsZUVycm9yLmJpbmQodGhpcykpO1xufTtcblxuLyoqXG4gKiBIYW5kbGVzIGFsbCBlcnJvcnMuXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBFcnJvciB0byBoYW5kbGUuXG4gKiBAcHJpdmF0ZVxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5faGFuZGxlRXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcblx0dGhpcy5fZXZlbnRCdXMuZW1pdCgnZXJyb3InLCBlcnJvcik7XG59O1xuXG4vKipcbiAqIEZpbmRzIHRoZSBjbG9zZXN0IGFzY2VuZGluZyBcIkFcIiBlbGVtZW50IG5vZGUuXG4gKiBAcGFyYW0ge05vZGV9IGVsZW1lbnQgRE9NIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7Tm9kZXxudWxsfSBUaGUgY2xvc2VzdCBcIkFcIiBlbGVtZW50IG9yIG51bGwuXG4gKi9cbmZ1bmN0aW9uIGNsb3Nlc3RMaW5rKGVsZW1lbnQpIHtcblx0d2hpbGUoZWxlbWVudCAmJiBlbGVtZW50Lm5vZGVOYW1lICE9PSBBX1RBR19OQU1FICYmXG5cdFx0ZWxlbWVudC5ub2RlTmFtZSAhPT0gQk9EWV9UQUdfTkFNRSkge1xuXHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG5cdH1cblx0cmV0dXJuIGVsZW1lbnQgJiYgZWxlbWVudC5ub2RlTmFtZSA9PT0gQV9UQUdfTkFNRSA/IGVsZW1lbnQgOiBudWxsO1xufSIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudExvYWRlcjtcblxudmFyIG1vZHVsZUhlbHBlciA9IHJlcXVpcmUoJy4uLy4uL2xpYi9oZWxwZXJzL21vZHVsZUhlbHBlcicpLFxuXHR1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuXHRMb2FkZXJCYXNlID0gcmVxdWlyZSgnLi4vLi4vbGliL2Jhc2UvTG9hZGVyQmFzZScpO1xuXG51dGlsLmluaGVyaXRzKENvbXBvbmVudExvYWRlciwgTG9hZGVyQmFzZSk7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgdGhlIGNvbXBvbmVudCBsb2FkZXIuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSAkc2VydmljZUxvY2F0b3IgTG9jYXRvciB0byByZXNvbHZlIGRlcGVuZGVuY2llcy5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgTG9hZGVyQmFzZVxuICovXG5mdW5jdGlvbiBDb21wb25lbnRMb2FkZXIoJHNlcnZpY2VMb2NhdG9yKSB7XG5cdHRoaXMuX3NlcnZpY2VMb2NhdG9yID0gJHNlcnZpY2VMb2NhdG9yO1xuXHR0aGlzLl9ldmVudEJ1cyA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdldmVudEJ1cycpO1xuXHR0aGlzLl90ZW1wbGF0ZVByb3ZpZGVyID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ3RlbXBsYXRlUHJvdmlkZXInKTtcblx0TG9hZGVyQmFzZS5jYWxsKHRoaXMsICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlQWxsKCdjb21wb25lbnRUcmFuc2Zvcm0nKSk7XG59XG5cbi8qKlxuICogQ3VycmVudCBldmVudCBidXMuXG4gKiBAdHlwZSB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuQ29tcG9uZW50TG9hZGVyLnByb3RvdHlwZS5fZXZlbnRCdXMgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc2VydmljZSBsb2NhdG9yLlxuICogQHR5cGUge1NlcnZpY2VMb2NhdG9yfVxuICogQHByaXZhdGVcbiAqL1xuQ29tcG9uZW50TG9hZGVyLnByb3RvdHlwZS5fc2VydmljZUxvY2F0b3IgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgdGVtcGxhdGUgcHJvdmlkZXIuXG4gKiBAdHlwZSB7VGVtcGxhdGVQcm92aWRlcn1cbiAqIEBwcml2YXRlXG4gKi9cbkNvbXBvbmVudExvYWRlci5wcm90b3R5cGUuX3RlbXBsYXRlUHJvdmlkZXIgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgbWFwIG9mIGxvYWRlZCBjb21wb25lbnRzIGJ5IG5hbWVzLlxuICogQHR5cGUge09iamVjdH0gTWFwIG9mIGNvbXBvbmVudHMgYnkgbmFtZXMuXG4gKiBAcHJpdmF0ZVxuICovXG5Db21wb25lbnRMb2FkZXIucHJvdG90eXBlLl9sb2FkZWRDb21wb25lbnRzID0gbnVsbDtcblxuLyoqXG4gKiBMb2FkcyBjb21wb25lbnRzIHdoZW4gaXQgaXMgaW4gYSBicm93c2VyLlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKi9cbkNvbXBvbmVudExvYWRlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHRoaXMuX2xvYWRlZENvbXBvbmVudHMpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2xvYWRlZENvbXBvbmVudHMpO1xuXHR9XG5cblx0dGhpcy5fbG9hZGVkQ29tcG9uZW50cyA9IHt9O1xuXG5cdHZhciBzZWxmID0gdGhpcztcblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGNvbXBvbmVudHMgPSBzZWxmLl9zZXJ2aWNlTG9jYXRvci5yZXNvbHZlQWxsKCdjb21wb25lbnQnKSxcblx0XHRcdFx0Y29tcG9uZW50UHJvbWlzZXMgPSBbXTtcblxuXHRcdFx0Ly8gdGhlIGxpc3QgaXMgYSBzdGFjaywgd2Ugc2hvdWxkIHJldmVyc2UgaXRcblx0XHRcdGNvbXBvbmVudHMuZm9yRWFjaChmdW5jdGlvbiAoY29tcG9uZW50KSB7XG5cdFx0XHRcdGNvbXBvbmVudFByb21pc2VzLnVuc2hpZnQoXG5cdFx0XHRcdFx0c2VsZi5fcHJvY2Vzc0NvbXBvbmVudChjb21wb25lbnQpXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBQcm9taXNlLmFsbChjb21wb25lbnRQcm9taXNlcyk7XG5cdFx0fSlcblx0XHQudGhlbihmdW5jdGlvbiAoY29tcG9uZW50cykge1xuXHRcdFx0Y29tcG9uZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChjb21wb25lbnQpIHtcblx0XHRcdFx0aWYgKCFjb21wb25lbnQgfHwgdHlwZW9mKGNvbXBvbmVudCkgIT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHNlbGYuX2xvYWRlZENvbXBvbmVudHNbY29tcG9uZW50Lm5hbWVdID0gY29tcG9uZW50O1xuXHRcdFx0fSk7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdhbGxDb21wb25lbnRzTG9hZGVkJywgY29tcG9uZW50cyk7XG5cdFx0XHRyZXR1cm4gc2VsZi5fbG9hZGVkQ29tcG9uZW50cztcblx0XHR9KTtcbn07XG5cbi8qKlxuICogUHJvY2Vzc2VzIGNvbXBvbmVudCBhbmQgYXBwbHkgcmVxdWlyZWQgb3BlcmF0aW9ucy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb21wb25lbnREZXRhaWxzIExvYWRlZCBjb21wb25lbnQgZGV0YWlscy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IENvbXBvbmVudCBvYmplY3QuXG4gKiBAcHJpdmF0ZVxuICovXG5Db21wb25lbnRMb2FkZXIucHJvdG90eXBlLl9wcm9jZXNzQ29tcG9uZW50ID0gZnVuY3Rpb24gKGNvbXBvbmVudERldGFpbHMpIHtcblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdGNvbXBvbmVudCA9IE9iamVjdC5jcmVhdGUoY29tcG9uZW50RGV0YWlscyk7XG5cblx0cmV0dXJuIHRoaXMuX2FwcGx5VHJhbnNmb3Jtcyhjb21wb25lbnQpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKHRyYW5zZm9ybWVkKSB7XG5cdFx0XHRjb21wb25lbnQgPSB0cmFuc2Zvcm1lZDtcblx0XHRcdHNlbGYuX3RlbXBsYXRlUHJvdmlkZXIucmVnaXN0ZXJDb21waWxlZChcblx0XHRcdFx0Y29tcG9uZW50Lm5hbWUsIGNvbXBvbmVudC50ZW1wbGF0ZVNvdXJjZVxuXHRcdFx0KTtcblx0XHRcdGNvbXBvbmVudC50ZW1wbGF0ZSA9IHtcblx0XHRcdFx0cmVuZGVyOiBmdW5jdGlvbiAoZGF0YUNvbnRleHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gc2VsZi5fdGVtcGxhdGVQcm92aWRlci5yZW5kZXIoXG5cdFx0XHRcdFx0XHRjb21wb25lbnQubmFtZSwgZGF0YUNvbnRleHRcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0aWYgKHR5cGVvZihjb21wb25lbnQuZXJyb3JUZW1wbGF0ZVNvdXJjZSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHZhciBlcnJvclRlbXBsYXRlTmFtZSA9IG1vZHVsZUhlbHBlci5nZXROYW1lRm9yRXJyb3JUZW1wbGF0ZShcblx0XHRcdFx0XHRjb21wb25lbnQubmFtZVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRzZWxmLl90ZW1wbGF0ZVByb3ZpZGVyLnJlZ2lzdGVyQ29tcGlsZWQoXG5cdFx0XHRcdFx0ZXJyb3JUZW1wbGF0ZU5hbWUsIGNvbXBvbmVudC5lcnJvclRlbXBsYXRlU291cmNlXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGNvbXBvbmVudC5lcnJvclRlbXBsYXRlID0ge1xuXHRcdFx0XHRcdHJlbmRlcjogZnVuY3Rpb24gKGRhdGFDb250ZXh0KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VsZi5fdGVtcGxhdGVQcm92aWRlci5yZW5kZXIoXG5cdFx0XHRcdFx0XHRcdGVycm9yVGVtcGxhdGVOYW1lLCBkYXRhQ29udGV4dFxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdjb21wb25lbnRMb2FkZWQnLCBjb21wb25lbnQpO1xuXHRcdFx0cmV0dXJuIGNvbXBvbmVudDtcblx0XHR9KVxuXHRcdC5jYXRjaChmdW5jdGlvbiAocmVhc29uKSB7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdlcnJvcicsIHJlYXNvbik7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogR2V0cyBtYXAgb2YgY29tcG9uZW50cyBieSBuYW1lcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IE1hcCBvZiBjb21wb25lbnRzIGJ5IG5hbWVzLlxuICovXG5Db21wb25lbnRMb2FkZXIucHJvdG90eXBlLmdldENvbXBvbmVudHNCeU5hbWVzID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy5fbG9hZGVkQ29tcG9uZW50cyB8fCB7fTtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gU3RvcmVMb2FkZXI7XG5cbnZhciBtb2R1bGVIZWxwZXIgPSByZXF1aXJlKCcuLi8uLi9saWIvaGVscGVycy9tb2R1bGVIZWxwZXInKSxcblx0dXRpbCA9IHJlcXVpcmUoJ3V0aWwnKSxcblx0TG9hZGVyQmFzZSA9IHJlcXVpcmUoJy4uLy4uL2xpYi9iYXNlL0xvYWRlckJhc2UnKTtcblxudXRpbC5pbmhlcml0cyhTdG9yZUxvYWRlciwgTG9hZGVyQmFzZSk7XG5cbi8qKlxuICogQ3JlYXRlcyBpbnN0YW5jZSBvZiB0aGUgc3RvcmUgbG9hZGVyLlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gJHNlcnZpY2VMb2NhdG9yIExvY2F0b3IgdG8gcmVzb2x2ZSBzdG9yZXMuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIExvYWRlckJhc2VcbiAqL1xuZnVuY3Rpb24gU3RvcmVMb2FkZXIoJHNlcnZpY2VMb2NhdG9yKSB7XG5cdHRoaXMuX3NlcnZpY2VMb2NhdG9yID0gJHNlcnZpY2VMb2NhdG9yO1xuXHR0aGlzLl9ldmVudEJ1cyA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdldmVudEJ1cycpO1xuXHRMb2FkZXJCYXNlLmNhbGwodGhpcywgJHNlcnZpY2VMb2NhdG9yLnJlc29sdmVBbGwoJ3N0b3JlVHJhbnNmb3JtJykpO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgZXZlbnQgYnVzLlxuICogQHR5cGUge0V2ZW50RW1pdHRlcn1cbiAqIEBwcml2YXRlXG4gKi9cblN0b3JlTG9hZGVyLnByb3RvdHlwZS5fZXZlbnRCdXMgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc2VydmljZSBsb2NhdG9yLlxuICogQHR5cGUge1NlcnZpY2VMb2NhdG9yfVxuICogQHByaXZhdGVcbiAqL1xuU3RvcmVMb2FkZXIucHJvdG90eXBlLl9zZXJ2aWNlTG9jYXRvciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXQgb2YgbG9hZGVkIHN0b3Jlcy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZUxvYWRlci5wcm90b3R5cGUuX2xvYWRlZFN0b3JlcyA9IG51bGw7XG5cbi8qKlxuICogTG9hZHMgYWxsIHN0b3JlcyB3aGVuIGl0IGlzIGluIGEgYnJvd3Nlci5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICovXG5TdG9yZUxvYWRlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHRoaXMuX2xvYWRlZFN0b3Jlcykge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fbG9hZGVkU3RvcmVzKTtcblx0fVxuXG5cdHRoaXMuX2xvYWRlZFN0b3JlcyA9IHt9O1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHN0b3JlcyA9IHNlbGYuX3NlcnZpY2VMb2NhdG9yLnJlc29sdmVBbGwoJ3N0b3JlJyksXG5cdFx0XHRcdHN0b3JlUHJvbWlzZXMgPSBbXTtcblxuXHRcdFx0Ly8gdGhlIGxpc3QgaXMgYSBzdGFjaywgd2Ugc2hvdWxkIHJldmVyc2UgaXRcblx0XHRcdHN0b3Jlcy5mb3JFYWNoKGZ1bmN0aW9uIChzdG9yZSkge1xuXHRcdFx0XHRzdG9yZVByb21pc2VzLnVuc2hpZnQoXG5cdFx0XHRcdFx0c2VsZi5fZ2V0U3RvcmUoc3RvcmUpXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKHN0b3JlUHJvbWlzZXMpO1xuXHRcdH0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKHN0b3Jlcykge1xuXHRcdFx0c3RvcmVzLmZvckVhY2goZnVuY3Rpb24gKHN0b3JlKSB7XG5cdFx0XHRcdGlmICghc3RvcmUgfHwgdHlwZW9mKHN0b3JlKSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0c2VsZi5fbG9hZGVkU3RvcmVzW3N0b3JlLm5hbWVdID0gc3RvcmU7XG5cdFx0XHR9KTtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2FsbFN0b3Jlc0xvYWRlZCcsIHNlbGYuX2xvYWRlZFN0b3Jlcyk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHNlbGYuX2xvYWRlZFN0b3Jlcyk7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHN0b3JlIGZyb20gc3RvcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdG9yZURldGFpbHMgU3RvcmUgZGV0YWlscy5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFByb21pc2UgZm9yIHN0b3JlLlxuICogQHByaXZhdGVcbiAqL1xuU3RvcmVMb2FkZXIucHJvdG90eXBlLl9nZXRTdG9yZSA9IGZ1bmN0aW9uIChzdG9yZURldGFpbHMpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRyZXR1cm4gdGhpcy5fYXBwbHlUcmFuc2Zvcm1zKHN0b3JlRGV0YWlscylcblx0XHQudGhlbihmdW5jdGlvbiAodHJhbnNmb3JtZWQpIHtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ3N0b3JlTG9hZGVkJywgdHJhbnNmb3JtZWQpO1xuXHRcdFx0cmV0dXJuIHRyYW5zZm9ybWVkO1xuXHRcdH0pXG5cdFx0LmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2Vycm9yJywgcmVhc29uKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBHZXRzIHN0b3JlcyBtYXAgYnkgbmFtZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBNYXAgb2Ygc3RvcmVzIGJ5IG5hbWVzLlxuICovXG5TdG9yZUxvYWRlci5wcm90b3R5cGUuZ2V0U3RvcmVzQnlOYW1lcyA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHRoaXMuX2xvYWRlZFN0b3JlcyB8fCB7fTtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gTW9kdWxlQXBpUHJvdmlkZXI7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuXHRwcm9wZXJ0eUhlbHBlciA9IHJlcXVpcmUoJy4uLy4uL2xpYi9oZWxwZXJzL3Byb3BlcnR5SGVscGVyJyksXG5cdE1vZHVsZUFwaVByb3ZpZGVyQmFzZSA9IHJlcXVpcmUoJy4uLy4uL2xpYi9iYXNlL01vZHVsZUFwaVByb3ZpZGVyQmFzZScpLFxuXHRtb2R1bGVIZWxwZXIgPSByZXF1aXJlKCcuLi8uLi9saWIvaGVscGVycy9tb2R1bGVIZWxwZXInKTtcblxudXRpbC5pbmhlcml0cyhNb2R1bGVBcGlQcm92aWRlciwgTW9kdWxlQXBpUHJvdmlkZXJCYXNlKTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiB0aGUgbW9kdWxlIEFQSSBwcm92aWRlci5cbiAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9ICRzZXJ2aWNlTG9jYXRvciBTZXJ2aWNlIGxvY2F0b3JcbiAqIHRvIHJlc29sdmUgZGVwZW5kZW5jaWVzLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBNb2R1bGVBcGlQcm92aWRlckJhc2VcbiAqL1xuZnVuY3Rpb24gTW9kdWxlQXBpUHJvdmlkZXIoJHNlcnZpY2VMb2NhdG9yKSB7XG5cdE1vZHVsZUFwaVByb3ZpZGVyQmFzZS5jYWxsKHRoaXMsICRzZXJ2aWNlTG9jYXRvcik7XG5cdHByb3BlcnR5SGVscGVyLmRlZmluZVJlYWRPbmx5KHRoaXMsICdpc0Jyb3dzZXInLCB0cnVlKTtcblx0cHJvcGVydHlIZWxwZXIuZGVmaW5lUmVhZE9ubHkodGhpcywgJ2lzU2VydmVyJywgZmFsc2UpO1xufVxuXG4vKipcbiAqIFJlbG9hZHMgdGhlIHBhZ2UgZm9yIGhhbmRsaW5nIFwibm90IGZvdW5kXCIgZXJyb3IuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqL1xuTW9kdWxlQXBpUHJvdmlkZXIucHJvdG90eXBlLm5vdEZvdW5kID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgd2luZG93ID0gdGhpcy5sb2NhdG9yLnJlc29sdmUoJ3dpbmRvdycpO1xuXHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbn07XG5cbi8qKlxuICogUmVkaXJlY3RzIGN1cnJlbnQgcGFnZSB0byBzcGVjaWZpZWQgVVJJLlxuICogQHBhcmFtIHtzdHJpbmd9IHVyaVN0cmluZyBVUkkgdG8gcmVkaXJlY3QuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqL1xuTW9kdWxlQXBpUHJvdmlkZXIucHJvdG90eXBlLnJlZGlyZWN0ID0gZnVuY3Rpb24gKHVyaVN0cmluZykge1xuXHR2YXIgcmVxdWVzdFJvdXRlciA9IHRoaXMubG9jYXRvci5yZXNvbHZlKCdyZXF1ZXN0Um91dGVyJyk7XG5cdHJldHVybiByZXF1ZXN0Um91dGVyLmdvKHVyaVN0cmluZyk7XG59O1xuXG4vKipcbiAqIENsZWFycyBjdXJyZW50IGxvY2F0aW9uIFVSSSdzIGZyYWdtZW50LlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKi9cbk1vZHVsZUFwaVByb3ZpZGVyLnByb3RvdHlwZS5jbGVhckZyYWdtZW50ID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgd2luZG93ID0gdGhpcy5sb2NhdG9yLnJlc29sdmUoJ3dpbmRvdycpLFxuXHRcdHBvc2l0aW9uID0gd2luZG93LmRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuXHR3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcnO1xuXHR3aW5kb3cuZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSBwb3NpdGlvbjtcblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9Cb290c3RyYXBwZXInKTtcbiIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRleHRGYWN0b3J5O1xuXG52YXIgVVJJID0gcmVxdWlyZSgnY2F0YmVycnktdXJpJykuVVJJLFxuXHRwcm9wZXJ0eUhlbHBlciA9IHJlcXVpcmUoJy4vaGVscGVycy9wcm9wZXJ0eUhlbHBlcicpO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBjb250ZXh0IGZhY3RvcnkuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSAkc2VydmljZUxvY2F0b3IgTG9jYXRvciB0byByZXNvbHZlIGRlcGVuZGVuY2llcy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDb250ZXh0RmFjdG9yeSgkc2VydmljZUxvY2F0b3IpIHtcblx0dGhpcy5fc2VydmljZUxvY2F0b3IgPSAkc2VydmljZUxvY2F0b3I7XG59XG5cbi8qKlxuICogQ3VycmVudCBzZXJ2aWNlIGxvY2F0b3IuXG4gKiBAdHlwZSB7U2VydmljZUxvY2F0b3J9XG4gKiBAcHJpdmF0ZVxuICovXG5Db250ZXh0RmFjdG9yeS5wcm90b3R5cGUuX3NlcnZpY2VMb2NhdG9yID0gbnVsbDtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBjb250ZXh0IGZvciBtb2R1bGVzLlxuICogQHBhcmFtIHtPYmplY3R9IGFkZGl0aW9uYWwgQWRkaXRpb25hbCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtVUkl9IGFkZGl0aW9uYWwucmVmZXJyZXIgQ3VycmVudCByZWZlcnJlci5cbiAqIEBwYXJhbSB7VVJJfSBhZGRpdGlvbmFsLmxvY2F0aW9uIEN1cnJlbnQgbG9jYXRpb24uXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkaXRpb25hbC51c2VyQWdlbnQgQ3VycmVudCB1c2VyIGFnZW50LlxuICovXG5Db250ZXh0RmFjdG9yeS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGFkZGl0aW9uYWwpIHtcblx0dmFyIGFwaVByb3ZpZGVyID0gdGhpcy5fc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnbW9kdWxlQXBpUHJvdmlkZXInKSxcblx0XHRjb250ZXh0ID0gT2JqZWN0LmNyZWF0ZShhcGlQcm92aWRlcik7XG5cdE9iamVjdC5rZXlzKGFkZGl0aW9uYWwpXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0cHJvcGVydHlIZWxwZXIuZGVmaW5lUmVhZE9ubHkoY29udGV4dCwga2V5LCBhZGRpdGlvbmFsW2tleV0pO1xuXHRcdH0pO1xuXHRyZXR1cm4gY29udGV4dDtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gU2VyaWFsV3JhcHBlcjtcblxudmFyIGV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuXG52YXIgRVJST1JfTk9fU1VDSF9NRVRIT0QgPSAnVGhlcmUgaXMgbm8gc3VjaCByZWdpc3RlcmVkIG1ldGhvZCc7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgdGhlIHNlcmlhbCB3cmFwcGVyIGZvciBwcm9taXNlcy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBTZXJpYWxXcmFwcGVyKCkge1xuXHR0aGlzLl9lbWl0dGVyID0gbmV3IGV2ZW50cy5FdmVudEVtaXR0ZXIoKTtcblx0dGhpcy5fZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoMCk7XG5cdHRoaXMuX3RvSW52b2tlID0ge307XG5cdHRoaXMuX2luUHJvZ3Jlc3MgPSB7fTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IGV2ZW50IGVtaXR0ZXIuXG4gKiBAdHlwZSB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuU2VyaWFsV3JhcHBlci5wcm90b3R5cGUuX2VtaXR0ZXIgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc2V0IG9mIG5hbWVkIG1ldGhvZHMgdG8gaW52b2tlLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cblNlcmlhbFdyYXBwZXIucHJvdG90eXBlLl90b0ludm9rZSA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXQgb2YgZmxhZ3MgaWYgdGhlIG1ldGhvZCBpcyBpbiBwcm9ncmVzcy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5TZXJpYWxXcmFwcGVyLnByb3RvdHlwZS5faW5Qcm9ncmVzcyA9IG51bGw7XG5cbi8qKlxuICogQWRkcyBtZXRob2QgdG8gdGhlIHNldC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE1ldGhvZCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdG9JbnZva2UgRnVuY3Rpb24gdGhhdCByZXR1cm5zIHByb21pc2UuXG4gKi9cblNlcmlhbFdyYXBwZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChuYW1lLCB0b0ludm9rZSkge1xuXHR0aGlzLl90b0ludm9rZVtuYW1lXSA9IHRvSW52b2tlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgbWV0aG9kIHdpdGggc3VjaCBuYW1lIHdhcyByZWdpc3RlcmVkIHRvIHRoZSBzZXQuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIG1ldGhvZC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIG1ldGhvZCBuYW1lIGlzIHJlZ2lzdGVyZWQuXG4gKi9cblNlcmlhbFdyYXBwZXIucHJvdG90eXBlLmlzUmVnaXN0ZXJlZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdHJldHVybiB0eXBlb2YodGhpcy5fdG9JbnZva2VbbmFtZV0pID09PSAnZnVuY3Rpb24nO1xufTtcblxuLyoqXG4gKiBJbnZva2VzIG1ldGhvZCB3aXRob3V0IGNvbmN1cnJlbmN5LlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTWV0aG9kIG5hbWUuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBQcm9taXNlIGZvciByZXN1bHQuXG4gKi9cblNlcmlhbFdyYXBwZXIucHJvdG90eXBlLmludm9rZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRpZiAoIXRoaXMuaXNSZWdpc3RlcmVkKG5hbWUpKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihFUlJPUl9OT19TVUNIX01FVEhPRCkpO1xuXHR9XG5cblx0aWYgKHRoaXMuX2luUHJvZ3Jlc3NbbmFtZV0pIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UgKGZ1bmN0aW9uIChmdWxmaWxsLCByZWplY3QpIHtcblx0XHRcdHNlbGYuX2VtaXR0ZXIub25jZShuYW1lLCBmdWxmaWxsKTtcblx0XHRcdHNlbGYuX2VtaXR0ZXIub25jZShuYW1lICsgJy0tZXJyb3InLCByZWplY3QpO1xuXHRcdH0pO1xuXHR9XG5cblx0dGhpcy5faW5Qcm9ncmVzc1tuYW1lXSA9IHRydWU7XG5cdHRoaXMuX3RvSW52b2tlW25hbWVdKClcblx0XHQudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRzZWxmLl9lbWl0dGVyLmVtaXQobmFtZSwgcmVzdWx0KTtcblx0XHRcdHNlbGYuX2luUHJvZ3Jlc3NbbmFtZV0gPSBudWxsO1xuXHRcdH0pXG5cdFx0LmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcblx0XHRcdHNlbGYuX2VtaXR0ZXIuZW1pdChuYW1lICsgJy0tZXJyb3InLCByZWFzb24pO1xuXHRcdFx0c2VsZi5faW5Qcm9ncmVzc1tuYW1lXSA9IG51bGw7XG5cdFx0fSk7XG5cblx0cmV0dXJuIHRoaXMuaW52b2tlKG5hbWUpO1xufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBTdG9yZURpc3BhdGNoZXI7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuXHRTZXJpYWxXcmFwcGVyID0gcmVxdWlyZSgnLi9TZXJpYWxXcmFwcGVyJyksXG5cdG1vZHVsZUhlbHBlciA9IHJlcXVpcmUoJy4vaGVscGVycy9tb2R1bGVIZWxwZXInKTtcblxudmFyIEVSUk9SX1NUT1JFX05PVF9GT1VORCA9ICdTdG9yZSBcIiVzXCIgbm90IGZvdW5kJyxcblx0RVJST1JfU1RBVEUgPSAnU3RhdGUgc2hvdWxkIGJlIHNldCBiZWZvcmUgYW55IHJlcXVlc3QnLFxuXHRERUZBVUxUX0xJRkVUSU1FID0gNjAwMDA7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2Ygc3RvcmUgZGlzcGF0Y2hlci5cbiAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9ICRzZXJ2aWNlTG9jYXRvciBMb2NhdG9yIHRvIHJlc29sdmUgZGVwZW5kZW5jaWVzLlxuICogQHBhcmFtIHtTdG9yZUxvYWRlcn0gJHN0b3JlTG9hZGVyIFN0b3JlIGxvYWRlciB0byBsb2FkIHN0b3Jlcy5cbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSAkZXZlbnRCdXMgRXZlbnQgYnVzIHRvIGVtaXQgZXZlbnRzLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFN0b3JlRGlzcGF0Y2hlcigkc2VydmljZUxvY2F0b3IsICRzdG9yZUxvYWRlciwgJGV2ZW50QnVzKSB7XG5cdHRoaXMuX3NlcnZpY2VMb2NhdG9yID0gJHNlcnZpY2VMb2NhdG9yO1xuXHR0aGlzLl9zdG9yZUxvYWRlciA9ICRzdG9yZUxvYWRlcjtcblx0dGhpcy5fZXZlbnRCdXMgPSAkZXZlbnRCdXM7XG5cdHRoaXMuX3N0b3JlSW5zdGFuY2VzID0ge307XG5cdHRoaXMuX2xhc3REYXRhID0ge307XG5cdHRoaXMuX2RlcGVuZGVuY2llcyA9IHt9O1xuXHR0aGlzLl9zZXJpYWxXcmFwcGVyID0gbmV3IFNlcmlhbFdyYXBwZXIoKTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IHNlcnZpY2UgbG9jYXRvci5cbiAqIEB0eXBlIHtTZXJ2aWNlTG9jYXRvcn1cbiAqIEBwcml2YXRlXG4gKi9cblN0b3JlRGlzcGF0Y2hlci5wcm90b3R5cGUuX3NlcnZpY2VMb2NhdG9yID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IGV2ZW50IGJ1cy5cbiAqIEB0eXBlIHtFdmVudEVtaXR0ZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLl9ldmVudEJ1cyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzdG9yZSBsb2FkZXIuXG4gKiBAdHlwZSB7U3RvcmVMb2FkZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLl9zdG9yZUxvYWRlciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBtYXAgb2YgYWxsIHN0b3JlIGluc3RhbmNlcy5cbiAqIEB0eXBlIHtudWxsfVxuICogQHByaXZhdGVcbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5fc3RvcmVJbnN0YW5jZXMgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgbWFwIG9mIGxhc3QgZGF0YSBmb3IgZWFjaCBzdG9yZS5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLl9sYXN0RGF0YSA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBtYXAgb2YgbGFzdCBzdGF0ZSBvZiBzdG9yZSBkaXNwYXRjaGVyLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cblN0b3JlRGlzcGF0Y2hlci5wcm90b3R5cGUuX2xhc3RTdGF0ZSA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXJpYWwgd3JhcHBlci5cbiAqIEB0eXBlIHtTZXJpYWxXcmFwcGVyfVxuICogQHByaXZhdGVcbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5fc2VyaWFsV3JhcHBlciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBiYXNpYyBjb250ZXh0IGZvciBhbGwgc3RvcmUgY29udGV4dHMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5fY3VycmVudEJhc2ljQ29udGV4dCA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXQgb2Ygc3RvcmUgZGVwZW5kZW5jeSBncmFwaC5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLl9kZXBlbmRlbmNpZXMgPSBudWxsO1xuXG4vKipcbiAqIEdldHMgc3RvcmUgZGF0YSBhbmQgY3JlYXRlcyBzdG9yZSBpbnN0YW5jZSBpZiByZXF1aXJlZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzdG9yZU5hbWUgTmFtZSBvZiBzdG9yZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFN0b3JlJ3MgZGF0YS5cbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5nZXRTdG9yZURhdGEgPSBmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdGlmICghdGhpcy5fbGFzdFN0YXRlKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihFUlJPUl9TVEFURSkpO1xuXHR9XG5cdGlmICh0eXBlb2Yoc3RvcmVOYW1lKSAhPT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuXHR9XG5cdGlmICh0aGlzLl9sYXN0RGF0YS5oYXNPd25Qcm9wZXJ0eShzdG9yZU5hbWUpKSB7XG5cdFx0dmFyIGV4aXN0VGltZSA9IERhdGUubm93KCkgLSB0aGlzLl9sYXN0RGF0YVtzdG9yZU5hbWVdLmNyZWF0ZWRBdDtcblx0XHRpZiAoZXhpc3RUaW1lIDw9IHRoaXMuX2xhc3REYXRhW3N0b3JlTmFtZV0ubGlmZXRpbWUpIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fbGFzdERhdGFbc3RvcmVOYW1lXS5kYXRhKTtcblx0XHR9XG5cdFx0ZGVsZXRlIHRoaXMuX2xhc3REYXRhW3N0b3JlTmFtZV07XG5cdH1cblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdGxpZmV0aW1lID0gREVGQVVMVF9MSUZFVElNRTtcblx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnc3RvcmVEYXRhTG9hZCcsIHtuYW1lOiBzdG9yZU5hbWV9KTtcblx0dmFyIHN0b3JlID0gdGhpcy5nZXRTdG9yZShzdG9yZU5hbWUpO1xuXHRpZiAoIXN0b3JlKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcblx0XHRcdFx0dXRpbC5mb3JtYXQoRVJST1JfU1RPUkVfTk9UX0ZPVU5ELCBzdG9yZU5hbWUpKVxuXHRcdCk7XG5cdH1cblx0aWYgKHR5cGVvZihzdG9yZS4kbGlmZXRpbWUpID09PSAnbnVtYmVyJykge1xuXHRcdGxpZmV0aW1lID0gc3RvcmUuJGxpZmV0aW1lO1xuXHR9XG5cdHJldHVybiBzZWxmLl9zZXJpYWxXcmFwcGVyLmludm9rZShzdG9yZU5hbWUpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdHNlbGYuX2xhc3REYXRhW3N0b3JlTmFtZV0gPSB7XG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdGxpZmV0aW1lOiBsaWZldGltZSxcblx0XHRcdFx0Y3JlYXRlZEF0OiBEYXRlLm5vdygpXG5cdFx0XHR9O1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnc3RvcmVEYXRhTG9hZGVkJywge1xuXHRcdFx0XHRuYW1lOiBzdG9yZU5hbWUsXG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdGxpZmV0aW1lOiBsaWZldGltZVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogU2VuZHMgYWN0aW9uIHRvIHNwZWNpZmllZCBzdG9yZSBhbmQgcmVzb2x2ZXMgcHJvbWlzZXMgaW4gc2VyaWFsIG1vZGUuXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RvcmVOYW1lIE5hbWUgb2YgdGhlIHN0b3JlLlxuICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvbk5hbWUgTmFtZSBvZiB0aGUgYWN0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IGFyZ3MgQWN0aW9uIGFyZ3VtZW50cy5cbiAqIEByZXR1cm5zIHtQcm9taXNlPCo+fSBQcm9taXNlIGZvciBhY3Rpb24gaGFuZGxpbmcgcmVzdWx0LlxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLnNlbmRBY3Rpb24gPSBmdW5jdGlvbiAoc3RvcmVOYW1lLCBhY3Rpb25OYW1lLCBhcmdzKSB7XG5cdGlmICghdGhpcy5fbGFzdFN0YXRlKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihFUlJPUl9TVEFURSkpO1xuXHR9XG5cdHZhciBzZWxmID0gdGhpcyxcblx0XHRhY3Rpb25EZXRhaWxzID0ge1xuXHRcdFx0c3RvcmVOYW1lOiBzdG9yZU5hbWUsXG5cdFx0XHRhY3Rpb25OYW1lOiBhY3Rpb25OYW1lLFxuXHRcdFx0YXJnczogYXJnc1xuXHRcdH07XG5cdHRoaXMuX2V2ZW50QnVzLmVtaXQoJ2FjdGlvblNlbmQnLCBhY3Rpb25EZXRhaWxzKTtcblx0dmFyIHN0b3JlID0gdGhpcy5nZXRTdG9yZShzdG9yZU5hbWUpO1xuXHRpZiAoIXN0b3JlKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcblx0XHRcdHV0aWwuZm9ybWF0KEVSUk9SX1NUT1JFX05PVF9GT1VORCwgc3RvcmVOYW1lKSlcblx0XHQpO1xuXHR9XG5cdHZhciBoYW5kbGVNZXRob2QgPSBtb2R1bGVIZWxwZXIuZ2V0TWV0aG9kVG9JbnZva2UoXG5cdFx0c3RvcmUsICdoYW5kbGUnLCBhY3Rpb25OYW1lXG5cdCk7XG5cdHJldHVybiBtb2R1bGVIZWxwZXIuZ2V0U2FmZVByb21pc2UoZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBoYW5kbGVNZXRob2QoYXJncyk7XG5cdH0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnYWN0aW9uU2VudCcsIGFjdGlvbkRldGFpbHMpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogU2VuZHMgYWN0aW9uIHRvIGV2ZXJ5IHN0b3JlIHRoYXQgaGFzIGhhbmRsZSBtZXRob2QgZm9yIHN1Y2ggYWN0aW9uLlxuICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvbk5hbWUgTmFtZSBvZiB0aGUgYWN0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IGFyZyBBY3Rpb24gYXJndW1lbnRzLlxuICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8Kj4+fSBQcm9taXNlIGZvciB0aGUgYWN0aW9uIGhhbmRsaW5nIHJlc3VsdC5cbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5zZW5kQnJvYWRjYXN0QWN0aW9uID0gZnVuY3Rpb24gKGFjdGlvbk5hbWUsIGFyZykge1xuXHR2YXIgcHJvbWlzZXMgPSBbXSxcblx0XHRzZWxmID0gdGhpcyxcblx0XHRzdG9yZXNCeU5hbWVzID0gdGhpcy5fc3RvcmVMb2FkZXIuZ2V0U3RvcmVzQnlOYW1lcygpLFxuXHRcdG1ldGhvZE5hbWUgPSBtb2R1bGVIZWxwZXIuZ2V0Q2FtZWxDYXNlTmFtZSgnaGFuZGxlJywgYWN0aW9uTmFtZSk7XG5cdE9iamVjdC5rZXlzKHN0b3Jlc0J5TmFtZXMpXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuXHRcdFx0dmFyIHN0b3JlID0gc3RvcmVzQnlOYW1lc1tzdG9yZU5hbWVdLFxuXHRcdFx0XHRwcm90b01ldGhvZCA9IHN0b3JlLmNvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2ROYW1lXTtcblx0XHRcdGlmICh0eXBlb2YocHJvdG9NZXRob2QpICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHZhciBzZW5kQWN0aW9uUHJvbWlzZSA9IHNlbGYuc2VuZEFjdGlvbihcblx0XHRcdFx0c3RvcmUubmFtZSwgYWN0aW9uTmFtZSwgIGFyZ1xuXHRcdFx0KTtcblx0XHRcdHByb21pc2VzLnB1c2goc2VuZEFjdGlvblByb21pc2UpO1xuXHRcdH0pO1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuLyoqXG4gKiBTZXRzIG5ldyBzdGF0ZSB0byBzdG9yZSBkaXNwYXRjaGVyIGFuZCBpbnZva2VzIFwiY2hhbmdlZFwiIG1ldGhvZCBmb3IgYWxsXG4gKiBzdG9yZXMgd2hpY2ggc3RhdGUgaGF2ZSBiZWVuIGNoYW5nZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVycyBNYXAgb2YgbmV3IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge09iamVjdH0gYmFzaWNDb250ZXh0IEJhc2ljIGNvbnRleHQgZm9yIGFsbCBzdG9yZXMuXG4gKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gTmFtZXMgb2Ygc3RvcmVzIHRoYXQgaGF2ZSBiZWVuIGNoYW5nZWQuXG4gKi9cblN0b3JlRGlzcGF0Y2hlci5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbiAocGFyYW1ldGVycywgYmFzaWNDb250ZXh0KSB7XG5cdHBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzIHx8IHt9O1xuXHRpZiAoIXRoaXMuX2xhc3RTdGF0ZSkge1xuXHRcdHRoaXMuX2N1cnJlbnRCYXNpY0NvbnRleHQgPSBiYXNpY0NvbnRleHQ7XG5cdFx0dGhpcy5fbGFzdFN0YXRlID0gcGFyYW1ldGVycztcblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHQvLyBzb21lIHN0b3JlJ3MgcGFyYW1ldGVycyBjYW4gYmUgcmVtb3ZlZCBzaW5jZSBsYXN0IHRpbWVcblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdGNoYW5nZWQgPSB7fTtcblxuXHRPYmplY3Qua2V5cyh0aGlzLl9sYXN0U3RhdGUpXG5cdFx0LmZpbHRlcihmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0XHRyZXR1cm4gIXBhcmFtZXRlcnMuaGFzT3duUHJvcGVydHkoc3RvcmVOYW1lKTtcblx0XHR9KVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0XHRjaGFuZ2VkW25hbWVdID0gdHJ1ZTtcblx0XHR9KTtcblxuXHRPYmplY3Qua2V5cyhwYXJhbWV0ZXJzKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcblx0XHRcdC8vIG5ldyBwYXJhbWV0ZXJzIHdlcmUgc2V0IGZvciBzdG9yZVxuXHRcdFx0aWYgKCFzZWxmLl9sYXN0U3RhdGUuaGFzT3duUHJvcGVydHkoc3RvcmVOYW1lKSkge1xuXHRcdFx0XHRjaGFuZ2VkW3N0b3JlTmFtZV0gPSB0cnVlO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIG5ldyBhbmQgbGFzdCBwYXJhbWV0ZXJzIGhhcyBkaWZmZXJlbnQgdmFsdWVzXG5cdFx0XHR2YXIgbGFzdFBhcmFtZXRlck5hbWVzID1cblx0XHRcdFx0XHRPYmplY3Qua2V5cyhzZWxmLl9sYXN0U3RhdGVbc3RvcmVOYW1lXSksXG5cdFx0XHRcdGN1cnJlbnRQYXJhbWV0ZXJOYW1lcyA9XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMocGFyYW1ldGVyc1tzdG9yZU5hbWVdKTtcblxuXHRcdFx0aWYgKGN1cnJlbnRQYXJhbWV0ZXJOYW1lcy5sZW5ndGggIT09XG5cdFx0XHRcdGxhc3RQYXJhbWV0ZXJOYW1lcy5sZW5ndGgpIHtcblx0XHRcdFx0Y2hhbmdlZFtzdG9yZU5hbWVdID0gdHJ1ZTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjdXJyZW50UGFyYW1ldGVyTmFtZXMuZXZlcnkoZnVuY3Rpb24gKHBhcmFtZXRlck5hbWUpIHtcblx0XHRcdFx0aWYgKHBhcmFtZXRlcnNbc3RvcmVOYW1lXVtwYXJhbWV0ZXJOYW1lXSAhPT1cblx0XHRcdFx0XHRzZWxmLl9sYXN0U3RhdGVbc3RvcmVOYW1lXVtwYXJhbWV0ZXJOYW1lXSkge1xuXHRcdFx0XHRcdGNoYW5nZWRbc3RvcmVOYW1lXSA9IHRydWU7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0dGhpcy5fbGFzdFN0YXRlID0gcGFyYW1ldGVycztcblx0aWYgKHRoaXMuX2N1cnJlbnRCYXNpY0NvbnRleHQgIT09IGJhc2ljQ29udGV4dCkge1xuXHRcdHRoaXMuX2N1cnJlbnRCYXNpY0NvbnRleHQgPSBiYXNpY0NvbnRleHQ7XG5cdFx0T2JqZWN0LmtleXModGhpcy5fc3RvcmVJbnN0YW5jZXMpXG5cdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0XHRcdHNlbGYuX3N0b3JlSW5zdGFuY2VzW3N0b3JlTmFtZV0uJGNvbnRleHQgPVxuXHRcdFx0XHRcdHNlbGYuX2dldFN0b3JlQ29udGV4dChzdG9yZU5hbWUpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHR2YXIgY2hhbmdlZFN0b3JlTmFtZXMgPSB7fTtcblx0T2JqZWN0LmtleXMoY2hhbmdlZClcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0XHR2YXIgc3RvcmUgPSBzZWxmLmdldFN0b3JlKHN0b3JlTmFtZSk7XG5cdFx0XHRpZiAoIXN0b3JlKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHN0b3JlLiRjb250ZXh0LmNoYW5nZWQoKVxuXHRcdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdFx0XHRcdGNoYW5nZWRTdG9yZU5hbWVzW25hbWVdID0gdHJ1ZTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0dGhpcy5fZXZlbnRCdXMuZW1pdCgnc3RhdGVDaGFuZ2VkJywge1xuXHRcdG9sZFN0YXRlOiB0aGlzLl9sYXN0U3RhdGUsXG5cdFx0bmV3U3RhdGU6IHBhcmFtZXRlcnNcblx0fSk7XG5cdHJldHVybiBPYmplY3Qua2V5cyhjaGFuZ2VkU3RvcmVOYW1lcyk7XG59O1xuXG4vKipcbiAqIEdldHMgY29udGV4dCBmb3Igc3RvcmUgdXNpbmcgY29tcG9uZW50J3MgY29udGV4dCBhcyBhIHByb3RvdHlwZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzdG9yZU5hbWUgTmFtZSBvZiBzdG9yZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFN0b3JlIGNvbnRleHQuXG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLl9nZXRTdG9yZUNvbnRleHQgPSBmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdHZhciBzZWxmID0gdGhpcyxcblx0XHRzdG9yZUNvbnRleHQgPSBPYmplY3QuY3JlYXRlKHRoaXMuX2N1cnJlbnRCYXNpY0NvbnRleHQpO1xuXHRzdG9yZUNvbnRleHQubmFtZSA9IHN0b3JlTmFtZTtcblx0c3RvcmVDb250ZXh0LnN0YXRlID0gdGhpcy5fbGFzdFN0YXRlW3N0b3JlTmFtZV0gfHwge307XG5cdHN0b3JlQ29udGV4dC5jaGFuZ2VkID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciB3YWxrZWQgPSB7fSxcblx0XHRcdGN1cnJlbnQsXG5cdFx0XHR0b0NoYW5nZSA9IFtzdG9yZU5hbWVdO1xuXG5cdFx0d2hpbGUgKHRvQ2hhbmdlLmxlbmd0aCA+IDApIHtcblx0XHRcdGN1cnJlbnQgPSB0b0NoYW5nZS5zaGlmdCgpO1xuXHRcdFx0aWYgKHdhbGtlZC5oYXNPd25Qcm9wZXJ0eShjdXJyZW50KSkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblx0XHRcdHdhbGtlZFtjdXJyZW50XSA9IHRydWU7XG5cdFx0XHRpZiAoc2VsZi5fZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KGN1cnJlbnQpKSB7XG5cdFx0XHRcdHRvQ2hhbmdlID0gdG9DaGFuZ2UuY29uY2F0KFxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKHNlbGYuX2RlcGVuZGVuY2llc1tjdXJyZW50XSlcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdGRlbGV0ZSBzZWxmLl9sYXN0RGF0YVtjdXJyZW50XTtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ3N0b3JlQ2hhbmdlZCcsIGN1cnJlbnQpO1xuXHRcdH1cblx0XHRyZXR1cm4gT2JqZWN0LmtleXMod2Fsa2VkKTtcblx0fTtcblx0c3RvcmVDb250ZXh0LmdldFN0b3JlRGF0YSA9IGZ1bmN0aW9uIChzb3VyY2VTdG9yZU5hbWUpIHtcblx0XHRpZiAoc291cmNlU3RvcmVOYW1lID09PSBzdG9yZU5hbWUpIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG5cdFx0fVxuXHRcdHJldHVybiBzZWxmLmdldFN0b3JlRGF0YShzb3VyY2VTdG9yZU5hbWUpO1xuXHR9O1xuXHRzdG9yZUNvbnRleHQuc2V0RGVwZW5kZW5jeSA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0aWYgKCFzZWxmLl9kZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcblx0XHRcdHNlbGYuX2RlcGVuZGVuY2llc1tuYW1lXSA9IHt9O1xuXHRcdH1cblx0XHRzZWxmLl9kZXBlbmRlbmNpZXNbbmFtZV1bc3RvcmVOYW1lXSA9IHRydWU7XG5cdH07XG5cdHN0b3JlQ29udGV4dC51bnNldERlcGVuZGVuY3kgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdGlmICghc2VsZi5fZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGRlbGV0ZSBzZWxmLl9kZXBlbmRlbmNpZXNbbmFtZV1bc3RvcmVOYW1lXTtcblx0fTtcblx0c3RvcmVDb250ZXh0LnNlbmRBY3Rpb24gPSBmdW5jdGlvbiAoc3RvcmVOYW1lLCBuYW1lLCBhcmdzKSB7XG5cdFx0cmV0dXJuIHNlbGYuc2VuZEFjdGlvbihzdG9yZU5hbWUsIG5hbWUsIGFyZ3MpO1xuXHR9O1xuXHRzdG9yZUNvbnRleHQuc2VuZEJyb2FkY2FzdEFjdGlvbiA9IGZ1bmN0aW9uIChuYW1lLCBhcmdzKSB7XG5cdFx0cmV0dXJuIHNlbGYuc2VuZEJyb2FkY2FzdEFjdGlvbihuYW1lLCBhcmdzKTtcblx0fTtcblxuXHRyZXR1cm4gc3RvcmVDb250ZXh0O1xufTtcblxuLyoqXG4gKiBHZXRzIHN0b3JlIGluc3RhbmNlIGFuZCBjcmVhdGVzIGl0IGlmIHJlcXVpcmVkLlxuICogQHBhcmFtIHtTdHJpbmd9IHN0b3JlTmFtZSBOYW1lIG9mIHN0b3JlLlxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gUHJvbWlzZSBmb3Igc3RvcmUuXG4gKi9cblN0b3JlRGlzcGF0Y2hlci5wcm90b3R5cGUuZ2V0U3RvcmUgPSBmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdGlmICghc3RvcmVOYW1lKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0dmFyIHN0b3JlID0gdGhpcy5fc3RvcmVJbnN0YW5jZXNbc3RvcmVOYW1lXTtcblx0aWYgKHN0b3JlKSB7XG5cdFx0cmV0dXJuIHN0b3JlO1xuXHR9XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHR2YXIgc3RvcmVzID0gc2VsZi5fc3RvcmVMb2FkZXIuZ2V0U3RvcmVzQnlOYW1lcygpLFxuXHRcdGNvbmZpZyA9IHNlbGYuX3NlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ2NvbmZpZycpO1xuXHRpZiAoIXN0b3Jlcy5oYXNPd25Qcm9wZXJ0eShzdG9yZU5hbWUpKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHR2YXIgY29uc3RydWN0b3IgPSBzdG9yZXNbc3RvcmVOYW1lXS5jb25zdHJ1Y3Rvcjtcblx0Y29uc3RydWN0b3IucHJvdG90eXBlLiRjb250ZXh0ID0gc2VsZi5fZ2V0U3RvcmVDb250ZXh0KHN0b3JlTmFtZSk7XG5cdHNlbGYuX3N0b3JlSW5zdGFuY2VzW3N0b3JlTmFtZV0gPSBzZWxmLl9zZXJ2aWNlTG9jYXRvclxuXHRcdC5yZXNvbHZlSW5zdGFuY2UoY29uc3RydWN0b3IsIGNvbmZpZyk7XG5cdHNlbGYuX3N0b3JlSW5zdGFuY2VzW3N0b3JlTmFtZV0uJGNvbnRleHQgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuJGNvbnRleHQ7XG5cblx0c2VsZi5fc2VyaWFsV3JhcHBlci5hZGQoc3RvcmVOYW1lLCBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGxvYWRNZXRob2QgPSBtb2R1bGVIZWxwZXIuZ2V0TWV0aG9kVG9JbnZva2UoXG5cdFx0XHRzZWxmLl9zdG9yZUluc3RhbmNlc1tzdG9yZU5hbWVdLCAnbG9hZCdcblx0XHQpO1xuXHRcdHJldHVybiBtb2R1bGVIZWxwZXIuZ2V0U2FmZVByb21pc2UobG9hZE1ldGhvZCk7XG5cdH0pO1xuXHRyZXR1cm4gc2VsZi5fc3RvcmVJbnN0YW5jZXNbc3RvcmVOYW1lXTtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gQm9vdHN0cmFwcGVyQmFzZTtcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyksXG5cdG1vZHVsZUhlbHBlciA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbW9kdWxlSGVscGVyJyksXG5cdHVociA9IHJlcXVpcmUoJ2NhdGJlcnJ5LXVocicpLFxuXHRQcm9taXNlID0gcmVxdWlyZSgncHJvbWlzZScpLFxuXHRTdGF0ZVByb3ZpZGVyID0gcmVxdWlyZSgnLi4vcHJvdmlkZXJzL1N0YXRlUHJvdmlkZXInKSxcblx0U3RvcmVMb2FkZXIgPSByZXF1aXJlKCcuLi9sb2FkZXJzL1N0b3JlTG9hZGVyJyksXG5cdENvbXBvbmVudExvYWRlciA9IHJlcXVpcmUoJy4uL2xvYWRlcnMvQ29tcG9uZW50TG9hZGVyJyksXG5cdERvY3VtZW50UmVuZGVyZXIgPSByZXF1aXJlKCcuLi9Eb2N1bWVudFJlbmRlcmVyJyksXG5cdFJlcXVlc3RSb3V0ZXIgPSByZXF1aXJlKCcuLi9SZXF1ZXN0Um91dGVyJyksXG5cdE1vZHVsZUFwaVByb3ZpZGVyQmFzZSA9IHJlcXVpcmUoJy4uL2Jhc2UvTW9kdWxlQXBpUHJvdmlkZXJCYXNlJyksXG5cdENvbnRleHRGYWN0b3J5ID0gcmVxdWlyZSgnLi4vQ29udGV4dEZhY3RvcnknKSxcblx0RXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xuXG52YXIgSU5GT19DT01QT05FTlRfTE9BREVEID0gJ0NvbXBvbmVudCBcIiVzXCIgbG9hZGVkJyxcblx0SU5GT19TVE9SRV9MT0FERUQgPSAnU3RvcmUgXCIlc1wiIGxvYWRlZCcsXG5cdElORk9fQUxMX1NUT1JFU19MT0FERUQgPSAnQWxsIHN0b3JlcyBsb2FkZWQnLFxuXHRJTkZPX0FMTF9DT01QT05FTlRTX0xPQURFRCA9ICdBbGwgY29tcG9uZW50cyBsb2FkZWQnLFxuXHRJTkZPX0RPQ1VNRU5UX1JFTkRFUkVEID0gJ0RvY3VtZW50IHJlbmRlcmVkIGZvciBVUkkgJXMnLFxuXHRUUkFDRV9SRU5ERVJfQ09NUE9ORU5UID0gJ0NvbXBvbmVudCBcIiVzJXNcIiBpcyBiZWluZyByZW5kZXJlZC4uLicsXG5cdFRJTUVTVEFNUF9GT1JNQVQgPSAnICglZCBtcyknLFxuXHRUUkFDRV9DT01QT05FTlRfUkVOREVSRUQgPSAnQ29tcG9uZW50IFwiJXMlc1wiIHJlbmRlcmVkJXMnO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIGJhc2UgQ2F0YmVycnkgYm9vdHN0cmFwcGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2F0YmVycnlDb25zdHJ1Y3RvciBDb25zdHJ1Y3RvclxuICogb2YgdGhlIENhdGJlcnJ5J3MgbWFpbiBtb2R1bGUuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQm9vdHN0cmFwcGVyQmFzZShjYXRiZXJyeUNvbnN0cnVjdG9yKSB7XG5cdHRoaXMuX2NhdGJlcnJ5Q29uc3RydWN0b3IgPSBjYXRiZXJyeUNvbnN0cnVjdG9yO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgY29uc3RydWN0b3Igb2YgdGhlIENhdGJlcnJ5J3MgbWFpbiBtb2R1bGUuXG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKiBAcHJpdmF0ZVxuICovXG5Cb290c3RyYXBwZXJCYXNlLnByb3RvdHlwZS5fY2F0YmVycnlDb25zdHJ1Y3RvciA9IG51bGw7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgZnVsbC1jb25maWd1cmVkIGluc3RhbmNlIG9mIHRoZSBDYXRiZXJyeSBhcHBsaWNhdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0P30gY29uZmlnT2JqZWN0IENvbmZpZ3VyYXRpb24gb2JqZWN0LlxuICogQHJldHVybnMge0NhdGJlcnJ5fSBDYXRiZXJyeSBhcHBsaWNhdGlvbiBpbnN0YW5jZS5cbiAqL1xuQm9vdHN0cmFwcGVyQmFzZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZ09iamVjdCkge1xuXHR2YXIgY3VycmVudENvbmZpZyA9IGNvbmZpZ09iamVjdCB8fCB7fSxcblx0XHRjYXRiZXJyeSA9IG5ldyB0aGlzLl9jYXRiZXJyeUNvbnN0cnVjdG9yKCk7XG5cblx0dGhpcy5jb25maWd1cmUoY3VycmVudENvbmZpZywgY2F0YmVycnkubG9jYXRvcik7XG5cdGNhdGJlcnJ5LmV2ZW50cyA9IGNhdGJlcnJ5LmxvY2F0b3IucmVzb2x2ZUluc3RhbmNlKE1vZHVsZUFwaVByb3ZpZGVyQmFzZSk7XG5cdHJldHVybiBjYXRiZXJyeTtcbn07XG5cbi8qKlxuICogQ29uZmlndXJlcyBsb2NhdG9yIHdpdGggYWxsIHJlcXVpcmVkIHR5cGUgcmVnaXN0cmF0aW9ucy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdPYmplY3QgQ29uZmlndXJhdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSBsb2NhdG9yIFNlcnZpY2UgbG9jYXRvciB0byBjb25maWd1cmUuXG4gKi9cbkJvb3RzdHJhcHBlckJhc2UucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChjb25maWdPYmplY3QsIGxvY2F0b3IpIHtcblx0dmFyIGV2ZW50QnVzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXHRldmVudEJ1cy5zZXRNYXhMaXN0ZW5lcnMoMCk7XG5cdGxvY2F0b3IucmVnaXN0ZXJJbnN0YW5jZSgncHJvbWlzZScsIFByb21pc2UpO1xuXHRsb2NhdG9yLnJlZ2lzdGVySW5zdGFuY2UoJ2V2ZW50QnVzJywgZXZlbnRCdXMpO1xuXHRsb2NhdG9yLnJlZ2lzdGVySW5zdGFuY2UoJ2NvbmZpZycsIGNvbmZpZ09iamVjdCk7XG5cdGxvY2F0b3IucmVnaXN0ZXIoJ3N0YXRlUHJvdmlkZXInLCBTdGF0ZVByb3ZpZGVyLCBjb25maWdPYmplY3QsIHRydWUpO1xuXHRsb2NhdG9yLnJlZ2lzdGVyKCdjb250ZXh0RmFjdG9yeScsIENvbnRleHRGYWN0b3J5LCBjb25maWdPYmplY3QsIHRydWUpO1xuXHRsb2NhdG9yLnJlZ2lzdGVyKCdzdG9yZUxvYWRlcicsIFN0b3JlTG9hZGVyLCBjb25maWdPYmplY3QsIHRydWUpO1xuXHRsb2NhdG9yLnJlZ2lzdGVyKCdjb21wb25lbnRMb2FkZXInLCBDb21wb25lbnRMb2FkZXIsIGNvbmZpZ09iamVjdCwgdHJ1ZSk7XG5cdGxvY2F0b3IucmVnaXN0ZXIoJ2RvY3VtZW50UmVuZGVyZXInLCBEb2N1bWVudFJlbmRlcmVyLCBjb25maWdPYmplY3QsIHRydWUpO1xuXHRsb2NhdG9yLnJlZ2lzdGVyKCdyZXF1ZXN0Um91dGVyJywgUmVxdWVzdFJvdXRlciwgY29uZmlnT2JqZWN0LCB0cnVlKTtcblxuXHR1aHIucmVnaXN0ZXIobG9jYXRvcik7XG59O1xuXG4vKipcbiAqIFdyYXBzIGV2ZW50IGJ1cyB3aXRoIGxvZyBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBldmVudEJ1cyBFdmVudCBlbWl0dGVyIHRoYXQgaW1wbGVtZW50cyBldmVudCBidXMuXG4gKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyIExvZ2dlciB0byB3cml0ZSBtZXNzYWdlcy5cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuQm9vdHN0cmFwcGVyQmFzZS5wcm90b3R5cGUuX3dyYXBFdmVudHNXaXRoTG9nZ2VyID0gZnVuY3Rpb24gKGV2ZW50QnVzLCBsb2dnZXIpIHtcblx0ZXZlbnRCdXNcblx0XHQub24oJ2NvbXBvbmVudExvYWRlZCcsIGZ1bmN0aW9uIChhcmdzKSB7XG5cdFx0XHRsb2dnZXIuaW5mbyh1dGlsLmZvcm1hdChJTkZPX0NPTVBPTkVOVF9MT0FERUQsIGFyZ3MubmFtZSkpO1xuXHRcdH0pXG5cdFx0Lm9uKCdzdG9yZUxvYWRlZCcsIGZ1bmN0aW9uIChhcmdzKSB7XG5cdFx0XHRsb2dnZXIuaW5mbyh1dGlsLmZvcm1hdChJTkZPX1NUT1JFX0xPQURFRCwgYXJncy5uYW1lKSk7XG5cdFx0fSlcblx0XHQub24oJ2FsbFN0b3Jlc0xvYWRlZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGxvZ2dlci5pbmZvKElORk9fQUxMX1NUT1JFU19MT0FERUQpO1xuXHRcdH0pXG5cdFx0Lm9uKCdhbGxDb21wb25lbnRzTG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0bG9nZ2VyLmluZm8oSU5GT19BTExfQ09NUE9ORU5UU19MT0FERUQpO1xuXHRcdH0pXG5cdFx0Lm9uKCdjb21wb25lbnRSZW5kZXInLCBmdW5jdGlvbiAoYXJncykge1xuXHRcdFx0dmFyIGlkID0gYXJncy5jb250ZXh0LlxuXHRcdFx0XHRcdGF0dHJpYnV0ZXNbbW9kdWxlSGVscGVyLkFUVFJJQlVURV9JRF07XG5cdFx0XHRsb2dnZXIudHJhY2UodXRpbC5mb3JtYXQoVFJBQ0VfUkVOREVSX0NPTVBPTkVOVCxcblx0XHRcdFx0bW9kdWxlSGVscGVyLmdldFRhZ05hbWVGb3JDb21wb25lbnROYW1lKGFyZ3MubmFtZSksXG5cdFx0XHRcdGlkID8gJyMnICsgaWQgOiAnJ1xuXHRcdFx0KSk7XG5cdFx0fSlcblx0XHQub24oJ2NvbXBvbmVudFJlbmRlcmVkJywgZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRcdHZhciBpZCA9IGFyZ3MuY29udGV4dC5cblx0XHRcdFx0XHRhdHRyaWJ1dGVzW21vZHVsZUhlbHBlci5BVFRSSUJVVEVfSURdO1xuXHRcdFx0bG9nZ2VyLnRyYWNlKHV0aWwuZm9ybWF0KFxuXHRcdFx0XHRUUkFDRV9DT01QT05FTlRfUkVOREVSRUQsXG5cdFx0XHRcdG1vZHVsZUhlbHBlci5nZXRUYWdOYW1lRm9yQ29tcG9uZW50TmFtZShhcmdzLm5hbWUpLFxuXHRcdFx0XHRpZCA/ICcjJyArIGlkIDogJycsXG5cdFx0XHRcdHR5cGVvZihhcmdzLnRpbWUpID09PSAnbnVtYmVyJyA/XG5cdFx0XHRcdFx0dXRpbC5mb3JtYXQoVElNRVNUQU1QX0ZPUk1BVCwgYXJncy50aW1lKSA6ICcnXG5cdFx0XHQpKTtcblx0XHR9KVxuXHRcdC5vbignZG9jdW1lbnRSZW5kZXJlZCcsIGZ1bmN0aW9uIChhcmdzKSB7XG5cdFx0XHRsb2dnZXIuaW5mbyh1dGlsLmZvcm1hdChcblx0XHRcdFx0SU5GT19ET0NVTUVOVF9SRU5ERVJFRCwgYXJncy5sb2NhdGlvbi50b1N0cmluZygpXG5cdFx0XHQpKTtcblx0XHR9KVxuXHRcdC5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyb3IpIHtcblx0XHRcdGxvZ2dlci5lcnJvcihlcnJvcik7XG5cdFx0fSk7XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhdGJlcnJ5QmFzZTtcblxudmFyIFNlcnZpY2VMb2NhdG9yID0gcmVxdWlyZSgnY2F0YmVycnktbG9jYXRvcicpO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBiYXNpYyBDYXRiZXJyeSBhcHBsaWNhdGlvbiBtb2R1bGUuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2F0YmVycnlCYXNlKCkge1xuXHR0aGlzLmxvY2F0b3IgPSBuZXcgU2VydmljZUxvY2F0b3IoKTtcblx0dGhpcy5sb2NhdG9yLnJlZ2lzdGVySW5zdGFuY2UoJ3NlcnZpY2VMb2NhdG9yJywgdGhpcy5sb2NhdG9yKTtcblx0dGhpcy5sb2NhdG9yLnJlZ2lzdGVySW5zdGFuY2UoJ2NhdGJlcnJ5JywgdGhpcyk7XG59XG5cbi8qKlxuICogQ3VycmVudCB2ZXJzaW9uIG9mIGNhdGJlcnJ5LlxuICovXG5DYXRiZXJyeUJhc2UucHJvdG90eXBlLnZlcnNpb24gPSAnNS4xLjEnO1xuXG4vKipcbiAqIEN1cnJlbnQgb2JqZWN0IHdpdGggZXZlbnRzLlxuICogQHR5cGUge01vZHVsZUFwaVByb3ZpZGVyfVxuICovXG5DYXRiZXJyeUJhc2UucHJvdG90eXBlLmV2ZW50cyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXJ2aWNlIGxvY2F0b3IuXG4gKiBAdHlwZSB7U2VydmljZUxvY2F0b3J9XG4gKi9cbkNhdGJlcnJ5QmFzZS5wcm90b3R5cGUubG9jYXRvciA9IG51bGw7IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29va2llV3JhcHBlckJhc2U7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBiYXNpYyBjb29raWUgd3JhcHBlci5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDb29raWVXcmFwcGVyQmFzZSgpIHtcbn1cblxuLyoqXG4gKiBHZXRzIG1hcCBvZiBjb29raWUgdmFsdWVzIGJ5IG5hbWUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBDb29raWVzIG1hcCBieSBuYW1lcy5cbiAqL1xuQ29va2llV3JhcHBlckJhc2UucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHN0cmluZyA9IHRoaXMuZ2V0Q29va2llU3RyaW5nKCk7XG5cdHJldHVybiB0aGlzLl9wYXJzZUNvb2tpZVN0cmluZyhzdHJpbmcpO1xufTtcblxuLyoqXG4gKiBHZXRzIGNvb2tpZSB2YWx1ZSBieSBuYW1lLlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgQ29va2llIG5hbWUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDb29raWUgdmFsdWUuXG4gKi9cbkNvb2tpZVdyYXBwZXJCYXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRpZiAodHlwZW9mKG5hbWUpICE9PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiAnJztcblx0fVxuXG5cdHJldHVybiB0aGlzLmdldEFsbCgpW25hbWVdIHx8ICcnO1xufTtcblxuLyoqXG4gKiBQYXJzZXMgY29va2llIHN0cmluZyBpbnRvIG1hcCBvZiBjb29raWUga2V5L3ZhbHVlIHBhaXJzLlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBDb29raWUgc3RyaW5nLlxuICogQHJldHVybnMge09iamVjdH0gT2JqZWN0IHdpdGggY29va2llIHZhbHVlcyBieSBrZXlzLlxuICogQHByb3RlY3RlZFxuICovXG5Db29raWVXcmFwcGVyQmFzZS5wcm90b3R5cGUuX3BhcnNlQ29va2llU3RyaW5nID0gZnVuY3Rpb24gKHN0cmluZykge1xuXHR2YXIgY29va2llID0ge307XG5cblx0aWYgKHR5cGVvZiAoc3RyaW5nKSAhPT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gY29va2llO1xuXHR9XG5cdHN0cmluZ1xuXHRcdC5zcGxpdCgvOyAqLylcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAoY29va2llUGFpcikge1xuXHRcdFx0dmFyIGVxdWFsc0luZGV4ID0gY29va2llUGFpci5pbmRleE9mKCc9Jyk7XG5cdFx0XHRpZiAoZXF1YWxzSW5kZXggPCAwKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGtleSA9IGNvb2tpZVBhaXIuc3Vic3RyKDAsIGVxdWFsc0luZGV4KS50cmltKCksXG5cdFx0XHRcdHZhbHVlID0gY29va2llUGFpci5zdWJzdHIoXG5cdFx0XHRcdFx0ZXF1YWxzSW5kZXggKyAxLCBjb29raWVQYWlyLmxlbmd0aFxuXHRcdFx0XHQpLnRyaW0oKTtcblxuXHRcdFx0dmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9eXCJ8XCIkL2csICcnKTtcblx0XHRcdGNvb2tpZVtrZXldID0gdmFsdWU7XG5cdFx0fSk7XG5cblx0cmV0dXJuIGNvb2tpZTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgY29va2llIHNldHVwIG9iamVjdCB0byBjb29raWUgc3RyaW5nLlxuICogQHBhcmFtIHtPYmplY3R9IGNvb2tpZVNldHVwIENvb2tpZSBzZXR1cCBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gY29va2llU2V0dXAua2V5IENvb2tpZSBrZXkuXG4gKiBAcGFyYW0ge3N0cmluZ30gY29va2llU2V0dXAudmFsdWUgQ29va2llIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXI/fSBjb29raWVTZXR1cC5tYXhBZ2UgTWF4IGNvb2tpZSBhZ2UgaW4gc2Vjb25kcy5cbiAqIEBwYXJhbSB7RGF0ZT99IGNvb2tpZVNldHVwLmV4cGlyZXMgRXhwaXJlIGRhdGUuXG4gKiBAcGFyYW0ge3N0cmluZz99IGNvb2tpZVNldHVwLnBhdGggVVJJIHBhdGggZm9yIGNvb2tpZS5cbiAqIEBwYXJhbSB7c3RyaW5nP30gY29va2llU2V0dXAuZG9tYWluIENvb2tpZSBkb21haW4uXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBjb29raWVTZXR1cC5zZWN1cmUgSXMgY29va2llIHNlY3VyZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBjb29raWVTZXR1cC5odHRwT25seSBJcyBjb29raWUgSFRUUCBvbmx5LlxuICogQHJldHVybnMge3N0cmluZ30gQ29va2llIHN0cmluZy5cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuQ29va2llV3JhcHBlckJhc2UucHJvdG90eXBlLl9jb252ZXJ0VG9Db29raWVTZXR1cCA9IGZ1bmN0aW9uIChjb29raWVTZXR1cCkge1xuXHRpZiAodHlwZW9mKGNvb2tpZVNldHVwLmtleSkgIT09ICdzdHJpbmcnIHx8XG5cdFx0dHlwZW9mKGNvb2tpZVNldHVwLnZhbHVlKSAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIGtleSBvciB2YWx1ZScpO1xuXHR9XG5cblx0dmFyIGNvb2tpZSA9IGNvb2tpZVNldHVwLmtleSArICc9JyArIGNvb2tpZVNldHVwLnZhbHVlO1xuXG5cdC8vIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzYyNjUjc2VjdGlvbi00LjEuMVxuXHRpZiAodHlwZW9mKGNvb2tpZVNldHVwLm1heEFnZSkgPT09ICdudW1iZXInKSB7XG5cdFx0Y29va2llICs9ICc7IE1heC1BZ2U9JyArIGNvb2tpZVNldHVwLm1heEFnZS50b0ZpeGVkKCk7XG5cdFx0aWYgKCFjb29raWVTZXR1cC5leHBpcmVzKSB7XG5cdFx0XHQvLyBieSBkZWZhdWx0IGV4cGlyZSBkYXRlID0gY3VycmVudCBkYXRlICsgbWF4LWFnZSBpbiBzZWNvbmRzXG5cdFx0XHRjb29raWVTZXR1cC5leHBpcmVzID0gbmV3IERhdGUoRGF0ZS5ub3coKSArXG5cdFx0XHRcdGNvb2tpZVNldHVwLm1heEFnZSAqIDEwMDApO1xuXHRcdH1cblx0fVxuXHRpZiAoY29va2llU2V0dXAuZXhwaXJlcyBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRjb29raWUgKz0gJzsgRXhwaXJlcz0nICsgY29va2llU2V0dXAuZXhwaXJlcy50b1VUQ1N0cmluZygpO1xuXHR9XG5cdGlmICh0eXBlb2YoY29va2llU2V0dXAucGF0aCkgPT09ICdzdHJpbmcnKSB7XG5cdFx0Y29va2llICs9ICc7IFBhdGg9JyArIGNvb2tpZVNldHVwLnBhdGg7XG5cdH1cblx0aWYgKHR5cGVvZihjb29raWVTZXR1cC5kb21haW4pID09PSAnc3RyaW5nJykge1xuXHRcdGNvb2tpZSArPSAnOyBEb21haW49JyArIGNvb2tpZVNldHVwLmRvbWFpbjtcblx0fVxuXHRpZiAodHlwZW9mKGNvb2tpZVNldHVwLnNlY3VyZSkgPT09ICdib29sZWFuJyAmJlxuXHRcdGNvb2tpZVNldHVwLnNlY3VyZSkge1xuXHRcdGNvb2tpZSArPSAnOyBTZWN1cmUnO1xuXHR9XG5cdGlmICh0eXBlb2YoY29va2llU2V0dXAuaHR0cE9ubHkpID09PSAnYm9vbGVhbicgJiZcblx0XHRjb29raWVTZXR1cC5odHRwT25seSkge1xuXHRcdGNvb2tpZSArPSAnOyBIdHRwT25seSc7XG5cdH1cblxuXHRyZXR1cm4gY29va2llO1xufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBEb2N1bWVudFJlbmRlcmVyQmFzZTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiB0aGUgYmFzaWMgZG9jdW1lbnQgcmVuZGVyZXIuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSAkc2VydmljZUxvY2F0b3IgTG9jYXRvciB0byByZXNvbHZlIGRlcGVuZGVuY2llcy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBEb2N1bWVudFJlbmRlcmVyQmFzZSgkc2VydmljZUxvY2F0b3IpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHR0aGlzLl9zZXJ2aWNlTG9jYXRvciA9ICRzZXJ2aWNlTG9jYXRvcjtcblx0dGhpcy5fY29udGV4dEZhY3RvcnkgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnY29udGV4dEZhY3RvcnknKTtcblx0dGhpcy5fY29tcG9uZW50TG9hZGVyID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ2NvbXBvbmVudExvYWRlcicpO1xuXHR0aGlzLl9ldmVudEJ1cyA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdldmVudEJ1cycpO1xuXG5cdHZhciBzdG9yZUxvYWRlciA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdzdG9yZUxvYWRlcicpO1xuXHR0aGlzLl9sb2FkaW5nID0gUHJvbWlzZS5hbGwoW1xuXHRcdHRoaXMuX2NvbXBvbmVudExvYWRlci5sb2FkKCksXG5cdFx0c3RvcmVMb2FkZXIubG9hZCgpXG5cdF0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5fbG9hZGluZyA9IG51bGw7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdyZWFkeScpO1xuXHRcdH0pXG5cdFx0LmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2Vycm9yJywgcmVhc29uKTtcblx0XHR9KTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IHNlcnZpY2UgbG9jYXRvci5cbiAqIEB0eXBlIHtTZXJ2aWNlTG9jYXRvcn1cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuRG9jdW1lbnRSZW5kZXJlckJhc2UucHJvdG90eXBlLl9zZXJ2aWNlTG9jYXRvciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBjb21wb25lbnQgbG9hZGVyLlxuICogQHR5cGUge0NvbXBvbmVudExvYWRlcn1cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuRG9jdW1lbnRSZW5kZXJlckJhc2UucHJvdG90eXBlLl9jb21wb25lbnRMb2FkZXIgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgbW9kdWxlIGxvYWRpbmcgcHJvbWlzZS5cbiAqIEB0eXBlIHtQcm9taXNlfVxuICogQHByb3RlY3RlZFxuICovXG5Eb2N1bWVudFJlbmRlcmVyQmFzZS5wcm90b3R5cGUuX2xvYWRpbmcgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgY29udGV4dCBmYWN0b3J5LlxuICogQHR5cGUge0NvbnRleHRGYWN0b3J5fVxuICogQHByb3RlY3RlZFxuICovXG5Eb2N1bWVudFJlbmRlcmVyQmFzZS5wcm90b3R5cGUuX2NvbnRleHRGYWN0b3J5ID0gbnVsbDtcblxuLyoqXG4gKiBHZXRzIHByb21pc2UgZm9yIHJlYWR5IHN0YXRlIHdoZW4gaXQgd2lsbCBiZSBhYmxlIGhhbmRsZSByZXF1ZXN0cy5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICogQHByb3RlY3RlZFxuICovXG5Eb2N1bWVudFJlbmRlcmVyQmFzZS5wcm90b3R5cGUuX2dldFByb21pc2VGb3JSZWFkeVN0YXRlID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy5fbG9hZGluZyA/XG5cdFx0dGhpcy5fbG9hZGluZyA6XG5cdFx0UHJvbWlzZS5yZXNvbHZlKCk7XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlckJhc2U7XG5cbnZhciBtb2R1bGVIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXJzL21vZHVsZUhlbHBlcicpO1xuXG4vKipcbiAqIENyZWF0ZSBiYXNpYyBpbXBsZW1lbnRhdGlvbiBvZiBhIG1vZHVsZSBsb2FkZXIuXG4gKiBAcGFyYW0ge0FycmF5fSB0cmFuc2Zvcm1zIEFycmF5IG9mIG1vZHVsZSB0cmFuc2Zvcm1hdGlvbnMuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTG9hZGVyQmFzZSh0cmFuc2Zvcm1zKSB7XG5cdHRoaXMuX3RyYW5zZm9ybXMgPSB0cmFuc2Zvcm1zO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgbGlzdCBvZiBjb21wb25lbnQgdHJhbnNmb3Jtcy5cbiAqIEB0eXBlIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbkxvYWRlckJhc2UucHJvdG90eXBlLl90cmFuc2Zvcm1zID0gbnVsbDtcblxuLyoqXG4gKiBBcHBsaWVzIGFsbCB0cmFuc2Zvcm1hdGlvbnMgcmVnaXN0ZXJlZCBpbiBTZXJ2aWNlIExvY2F0b3IuXG4gKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIExvYWRlZCBtb2R1bGUuXG4gKiBAcGFyYW0ge251bWJlcj99IGluZGV4IFRyYW5zZm9ybWF0aW9uIGluZGV4IGluIGEgbGlzdC5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFRyYW5zZm9ybWVkIG1vZHVsZS5cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuTG9hZGVyQmFzZS5wcm90b3R5cGUuX2FwcGx5VHJhbnNmb3JtcyA9IGZ1bmN0aW9uIChtb2R1bGUsIGluZGV4KSB7XG5cdGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0Ly8gdGhlIGxpc3QgaXMgYSBzdGFjaywgd2Ugc2hvdWxkIHJldmVyc2UgaXRcblx0XHRpbmRleCA9IHRoaXMuX3RyYW5zZm9ybXMubGVuZ3RoIC0gMTtcblx0fVxuXG5cdGlmIChpbmRleCA8IDApIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG1vZHVsZSk7XG5cdH1cblxuXHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0dHJhbnNmb3JtYXRpb24gPSB0aGlzLl90cmFuc2Zvcm1zW2luZGV4XTtcblxuXHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdHJhbnNmb3JtYXRpb24udHJhbnNmb3JtKG1vZHVsZSk7XG5cdFx0fSlcblx0XHQudGhlbihmdW5jdGlvbiAodHJhbnNmb3JtZWRNb2R1bGUpIHtcblx0XHRcdHJldHVybiBzZWxmLl9hcHBseVRyYW5zZm9ybXModHJhbnNmb3JtZWRNb2R1bGUsIGluZGV4IC0gMSk7XG5cdFx0fSk7XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZHVsZUFwaVByb3ZpZGVyQmFzZTtcblxudmFyIEVSUk9SX0VWRU5UX05BTUUgPSAnRXZlbnQgbmFtZSBzaG91bGQgYmUgYSBzdHJpbmcnLFxuXHRFUlJPUl9FVkVOVF9IQU5ETEVSID0gJ0V2ZW50IGhhbmRsZXIgc2hvdWxkIGJlIGEgZnVuY3Rpb24nO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBiYXNpYyBBUEkgcHJvdmlkZXIuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSAkc2VydmljZUxvY2F0b3IgU2VydmljZSBsb2NhdG9yXG4gKiB0byByZXNvbHZlIGRlcGVuZGVuY2llcy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBNb2R1bGVBcGlQcm92aWRlckJhc2UoJHNlcnZpY2VMb2NhdG9yKSB7XG5cdHRoaXMubG9jYXRvciA9ICRzZXJ2aWNlTG9jYXRvcjtcblx0dGhpcy5jb29raWUgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnY29va2llV3JhcHBlcicpO1xuXHR0aGlzLl9ldmVudEJ1cyA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdldmVudEJ1cycpO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgY29va2llIHByb3ZpZGVyLlxuICogQHR5cGUge0Nvb2tpZVdyYXBwZXJ9XG4gKi9cbk1vZHVsZUFwaVByb3ZpZGVyQmFzZS5wcm90b3R5cGUuY29va2llID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHNlcnZpY2UgbG9jYXRvci5cbiAqIEB0eXBlIHtTZXJ2aWNlTG9jYXRvcn1cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuTW9kdWxlQXBpUHJvdmlkZXJCYXNlLnByb3RvdHlwZS5sb2NhdG9yID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IGV2ZW50IGJ1cy5cbiAqIEB0eXBlIHtFdmVudEVtaXR0ZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5Nb2R1bGVBcGlQcm92aWRlckJhc2UucHJvdG90eXBlLl9ldmVudEJ1cyA9IG51bGw7XG5cbi8qKlxuICogU3Vic2NyaWJlcyBvbiB0aGUgc3BlY2lmaWVkIGV2ZW50IGluIENhdGJlcnJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBOYW1lIG9mIHRoZSBldmVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIgRXZlbnQgaGFuZGxlci5cbiAqIEByZXR1cm5zIHtNb2R1bGVBcGlQcm92aWRlckJhc2V9IFRoaXMgb2JqZWN0IGZvciBjaGFpbmluZy5cbiAqL1xuTW9kdWxlQXBpUHJvdmlkZXJCYXNlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcblx0Y2hlY2tFdmVudE5hbWVBbmRIYW5kbGVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG5cdHRoaXMuX2V2ZW50QnVzLm9uKGV2ZW50TmFtZSwgaGFuZGxlcik7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdWJzY3JpYmVzIG9uIHRoZSBzcGVjaWZpZWQgZXZlbnQgaW4gQ2F0YmVycnkgdG8gaGFuZGxlIG9uY2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIE5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlciBFdmVudCBoYW5kbGVyLlxuICogQHJldHVybnMge01vZHVsZUFwaVByb3ZpZGVyQmFzZX0gVGhpcyBvYmplY3QgZm9yIGNoYWluaW5nLlxuICovXG5Nb2R1bGVBcGlQcm92aWRlckJhc2UucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG5cdGNoZWNrRXZlbnROYW1lQW5kSGFuZGxlcihldmVudE5hbWUsIGhhbmRsZXIpO1xuXHR0aGlzLl9ldmVudEJ1cy5vbmNlKGV2ZW50TmFtZSwgaGFuZGxlcik7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgaGFuZGxlciBmcm9tIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIE5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlciBFdmVudCBoYW5kbGVyLlxuICogQHJldHVybnMge01vZHVsZUFwaVByb3ZpZGVyQmFzZX0gVGhpcyBvYmplY3QgZm9yIGNoYWluaW5nLlxuICovXG5Nb2R1bGVBcGlQcm92aWRlckJhc2UucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuXHRjaGVja0V2ZW50TmFtZUFuZEhhbmRsZXIoZXZlbnROYW1lLCBoYW5kbGVyKTtcblx0dGhpcy5fZXZlbnRCdXMucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGhhbmRsZXJzIGZyb20gdGhlIHNwZWNpZmllZCBldmVudCBpbiBDYXRiZXJyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgTmFtZSBvZiB0aGUgZXZlbnQuXG4gKiBAcmV0dXJucyB7TW9kdWxlQXBpUHJvdmlkZXJCYXNlfSBUaGlzIG9iamVjdCBmb3IgY2hhaW5pbmcuXG4gKi9cbk1vZHVsZUFwaVByb3ZpZGVyQmFzZS5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuXHRjaGVja0V2ZW50TmFtZUFuZEhhbmRsZXIoZXZlbnROYW1lLCBkdW1teSk7XG5cdHRoaXMuX2V2ZW50QnVzLnJlbW92ZUFsbExpc3RlbmVycyhldmVudE5hbWUpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGV2ZW50IG5hbWUgaXMgYSBzdHJpbmcgYW5kIGhhbmRsZXIgaXMgYSBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gZXZlbnROYW1lIE5hbWUgb2YgdGhlIGV2ZW50IHRvIGNoZWNrLlxuICogQHBhcmFtIHsqfSBoYW5kbGVyIFRoZSBldmVudCBoYW5kbGVyIHRvIGNoZWNrLlxuICovXG5mdW5jdGlvbiBjaGVja0V2ZW50TmFtZUFuZEhhbmRsZXIoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG5cdGlmICh0eXBlb2YgKGV2ZW50TmFtZSkgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKEVSUk9SX0VWRU5UX05BTUUpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiAoaGFuZGxlcikgIT09ICdmdW5jdGlvbicpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoRVJST1JfRVZFTlRfSEFORExFUik7XG5cdH1cbn1cblxuLyoqXG4gKiBEb2VzIG5vdGhpbmcuIEl0IGlzIHVzZWQgYXMgYSBkZWZhdWx0IGNhbGxiYWNrLlxuICovXG5mdW5jdGlvbiBkdW1teSgpIHt9XG4iLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbnZhciBUSVRMRSA9ICdDYXRiZXJyeUA1LjEuMSAoJyArXG5cdFx0JzxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vY2F0YmVycnkvY2F0YmVycnkvaXNzdWVzXCIgJyArXG5cdFx0J3RhcmdldD1cIl9ibGFua1wiPicgK1xuXHRcdCdyZXBvcnQgYW4gaXNzdWUnICtcblx0XHQnPC9hPicgK1xuXHRcdCcpJyxcblx0QU1QID0gLyYvZyxcblx0TFQgPSAvPC9nLFxuXHRHVCA9IC8+L2csXG5cdFFVT1QgPSAvXFxcIi9nLFxuXHRTSU5HTEVfUVVPVCA9IC9cXCcvZyxcblx0RVJST1JfTUVTU0FHRV9SRUdFWFAgPSAvXig/OltcXHckXSspOiAoPzouKylcXHI/XFxuL2ksXG5cdEVSUk9SX01FU1NBR0VfRk9STUFUID0gJzxzcGFuICcgK1xuXHRcdCdzdHlsZT1cImNvbG9yOiByZWQ7IGZvbnQtc2l6ZTogMTZwdDsgZm9udC13ZWlnaHQ6IGJvbGQ7XCI+JyArXG5cdFx0JyVzJXMnICtcblx0XHQnPC9zcGFuPicsXG5cdE5FV19MSU5FID0gL1xccj9cXG4vZztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdC8qKlxuXHQgKiBQcmludHMgZXJyb3Igd2l0aCBwcmV0dHkgZm9ybWF0dGluZy5cblx0ICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgRXJyb3IgdG8gcHJpbnQuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyQWdlbnQgVXNlciBhZ2VudCBpbmZvcm1hdGlvbi5cblx0ICogQHJldHVybnMge3N0cmluZ30gSFRNTCB3aXRoIGFsbCBpbmZvcm1hdGlvbiBhYm91dCBlcnJvci5cblx0ICovXG5cdHByZXR0eVByaW50OiBmdW5jdGlvbiAoZXJyb3IsIHVzZXJBZ2VudCkge1xuXHRcdGlmICghZXJyb3IgfHwgdHlwZW9mKGVycm9yKSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cdFx0dmFyIGRhdGVTdHJpbmcgPSAobmV3IERhdGUoKSkudG9VVENTdHJpbmcoKSArICc7PGJyLz4nLFxuXHRcdFx0dXNlckFnZW50U3RyaW5nID0gKHVzZXJBZ2VudCA/ICh1c2VyQWdlbnQgKyAnOzxici8+JykgOiAnJyksXG5cdFx0XHRuYW1lID0gKHR5cGVvZihlcnJvci5uYW1lKSA9PT0gJ3N0cmluZycgPyBlcnJvci5uYW1lICsgJzogJyA6ICcnKSxcblx0XHRcdG1lc3NhZ2UgPSBTdHJpbmcoZXJyb3IubWVzc2FnZSB8fCAnJyksXG5cdFx0XHRzdGFjayA9IFN0cmluZyhlcnJvci5zdGFjayB8fCAnJykucmVwbGFjZShFUlJPUl9NRVNTQUdFX1JFR0VYUCwgJycpLFxuXHRcdFx0ZnVsbE1lc3NhZ2UgPSB1dGlsLmZvcm1hdChcblx0XHRcdFx0RVJST1JfTUVTU0FHRV9GT1JNQVQsIGVzY2FwZShuYW1lKSwgZXNjYXBlKG1lc3NhZ2UpXG5cdFx0XHQpO1xuXG5cdFx0cmV0dXJuICc8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7IGZvbnQtc2l6ZTogMTJwdDtcIj4nICtcblx0XHRcdGRhdGVTdHJpbmcgK1xuXHRcdFx0dXNlckFnZW50U3RyaW5nICtcblx0XHRcdFRJVExFICsgJzxici8+PGJyLz4nICtcblx0XHRcdGZ1bGxNZXNzYWdlICsgJzxici8+PGJyLz4nICtcblx0XHRcdGVzY2FwZShzdGFjaykgK1xuXHRcdFx0JzwvZGl2Pic7XG5cdH1cbn07XG5cbi8qKlxuICogRXNjYXBlcyBlcnJvciB0ZXh0LlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIEVycm9yIHRleHQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBlc2NhcGVkIGFuZCBmb3JtYXR0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBlc2NhcGUodmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlXG5cdFx0LnJlcGxhY2UoQU1QLCAnJmFtcDsnKVxuXHRcdC5yZXBsYWNlKExULCAnJmx0OycpXG5cdFx0LnJlcGxhY2UoR1QsICcmZ3Q7Jylcblx0XHQucmVwbGFjZShRVU9ULCAnJnF1b3Q7Jylcblx0XHQucmVwbGFjZShTSU5HTEVfUVVPVCwgJyYjMzk7Jylcblx0XHQucmVwbGFjZShORVdfTElORSwgJzxici8+Jyk7XG59IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBoZWxwZXIgPSB7XG5cdENPTVBPTkVOVF9QUkVGSVg6ICdjYXQtJyxcblx0Q09NUE9ORU5UX1BSRUZJWF9SRUdFWFA6IC9eY2F0LS8sXG5cdENPTVBPTkVOVF9FUlJPUl9URU1QTEFURV9QT1NURklYOiAnLS1lcnJvcicsXG5cdERPQ1VNRU5UX0NPTVBPTkVOVF9OQU1FOiAnZG9jdW1lbnQnLFxuXHRIRUFEX0NPTVBPTkVOVF9OQU1FOiAnaGVhZCcsXG5cdEFUVFJJQlVURV9JRDogJ2lkJyxcblx0QVRUUklCVVRFX1NUT1JFOiAnY2F0LXN0b3JlJyxcblx0REVGQVVMVF9MT0dJQ19GSUxFTkFNRTogJ2luZGV4LmpzJyxcblxuXHQvKipcblx0ICogQ3JlYXRlcyBuYW1lIGZvciBlcnJvciB0ZW1wbGF0ZSBvZiBjb21wb25lbnQuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBjb21wb25lbnROYW1lIG5hbWUgb2YgY29tcG9uZW50LlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfSBOYW1lIG9mIGVycm9yIHRlbXBsYXRlIG9mIHRoZSBjb21wb25lbnQuXG5cdCAqL1xuXHRnZXROYW1lRm9yRXJyb3JUZW1wbGF0ZTogZnVuY3Rpb24gKGNvbXBvbmVudE5hbWUpIHtcblx0XHRpZiAodHlwZW9mKGNvbXBvbmVudE5hbWUpICE9PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblx0XHRyZXR1cm4gY29tcG9uZW50TmFtZSArIGhlbHBlci5DT01QT05FTlRfRVJST1JfVEVNUExBVEVfUE9TVEZJWDtcblx0fSxcblxuXHQvKipcblx0ICogRGV0ZXJtaW5lcyBpZiBzcGVjaWZpZWQgY29tcG9uZW50IG5hbWUgaXMgdGhlIFwiZG9jdW1lbnRcIiBjb21wb25lbnQgbmFtZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50LlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBzcGVjaWZpZWQgY29tcG9uZW50IGlzIHRoZSBcImRvY3VtZW50XCIgY29tcG9uZW50LlxuXHQgKi9cblx0aXNEb2N1bWVudENvbXBvbmVudDogZnVuY3Rpb24gKGNvbXBvbmVudE5hbWUpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50TmFtZS50b0xvd2VyQ2FzZSgpID09PSBoZWxwZXIuRE9DVU1FTlRfQ09NUE9ORU5UX05BTUU7XG5cdH0sXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIGlmIHNwZWNpZmllZCBjb21wb25lbnQgbmFtZSBpcyB0aGUgXCJoZWFkXCIgY29tcG9uZW50IG5hbWUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudC5cblx0ICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgc3BlY2lmaWVkIGNvbXBvbmVudCBpcyB0aGUgXCJoZWFkXCIgY29tcG9uZW50LlxuXHQgKi9cblx0aXNIZWFkQ29tcG9uZW50OiBmdW5jdGlvbiAoY29tcG9uZW50TmFtZSkge1xuXHRcdHJldHVybiBjb21wb25lbnROYW1lLnRvTG93ZXJDYXNlKCkgPT09IGhlbHBlci5IRUFEX0NPTVBPTkVOVF9OQU1FO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBvcmlnaW5hbCBjb21wb25lbnQgbmFtZSB3aXRob3V0IHByZWZpeC5cblx0ICogQHBhcmFtIHtTdHJpbmd9IGZ1bGxDb21wb25lbnROYW1lIEZ1bGwgY29tcG9uZW50IG5hbWUgKHRhZyBuYW1lKS5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIG9yaWdpbmFsIGNvbXBvbmVudCBuYW1lIHdpdGhvdXQgcHJlZml4LlxuXHQgKi9cblx0Z2V0T3JpZ2luYWxDb21wb25lbnROYW1lOiBmdW5jdGlvbiAoZnVsbENvbXBvbmVudE5hbWUpIHtcblx0XHRpZiAodHlwZW9mIChmdWxsQ29tcG9uZW50TmFtZSkgIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHRcdGZ1bGxDb21wb25lbnROYW1lID0gZnVsbENvbXBvbmVudE5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRpZiAoZnVsbENvbXBvbmVudE5hbWUgPT09IGhlbHBlci5IRUFEX0NPTVBPTkVOVF9OQU1FKSB7XG5cdFx0XHRyZXR1cm4gZnVsbENvbXBvbmVudE5hbWU7XG5cdFx0fVxuXHRcdGlmIChmdWxsQ29tcG9uZW50TmFtZSA9PT0gaGVscGVyLkRPQ1VNRU5UX0NPTVBPTkVOVF9OQU1FKSB7XG5cdFx0XHRyZXR1cm4gZnVsbENvbXBvbmVudE5hbWU7XG5cdFx0fVxuXHRcdHJldHVybiBmdWxsQ29tcG9uZW50TmFtZS5yZXBsYWNlKGhlbHBlci5DT01QT05FTlRfUFJFRklYX1JFR0VYUCwgJycpO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXRzIHZhbGlkIHRhZyBuYW1lIGZvciBjb21wb25lbnQuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudC5cblx0ICogQHJldHVybnMge3N0cmluZ30gTmFtZSBvZiB0aGUgdGFnLlxuXHQgKi9cblx0Z2V0VGFnTmFtZUZvckNvbXBvbmVudE5hbWU6IGZ1bmN0aW9uIChjb21wb25lbnROYW1lKSB7XG5cdFx0aWYgKHR5cGVvZihjb21wb25lbnROYW1lKSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cdFx0dmFyIHVwcGVyQ29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUudG9VcHBlckNhc2UoKTtcblx0XHRpZiAoY29tcG9uZW50TmFtZSA9PT0gaGVscGVyLkhFQURfQ09NUE9ORU5UX05BTUUpIHtcblx0XHRcdHJldHVybiB1cHBlckNvbXBvbmVudE5hbWU7XG5cdFx0fVxuXHRcdGlmIChjb21wb25lbnROYW1lID09PSBoZWxwZXIuRE9DVU1FTlRfQ09NUE9ORU5UX05BTUUpIHtcblx0XHRcdHJldHVybiB1cHBlckNvbXBvbmVudE5hbWU7XG5cdFx0fVxuXHRcdHJldHVybiBoZWxwZXIuQ09NUE9ORU5UX1BSRUZJWC50b1VwcGVyQ2FzZSgpICsgdXBwZXJDb21wb25lbnROYW1lO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXRzIG1ldGhvZCBvZiB0aGUgbW9kdWxlIHRoYXQgY2FuIGJlIGludm9rZWQuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBtb2R1bGUgTW9kdWxlIGltcGxlbWVudGF0aW9uLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IE1ldGhvZCBwcmVmaXggKGkuZS4gaGFuZGxlKS5cblx0ICogQHBhcmFtIHtzdHJpbmc/fSBuYW1lIE5hbWUgb2YgdGhlIGVudGl0eSB0byBpbnZva2UgbWV0aG9kIGZvclxuXHQgKiAod2lsbCBiZSBjb252ZXJ0ZWQgdG8gY2FtZWwgY2FzaW5nKS5cblx0ICogQHJldHVybnMge0Z1bmN0aW9ufSBNZXRob2QgdG8gaW52b2tlLlxuXHQgKi9cblx0Z2V0TWV0aG9kVG9JbnZva2U6IGZ1bmN0aW9uIChtb2R1bGUsIHByZWZpeCwgbmFtZSkge1xuXHRcdGlmICghbW9kdWxlIHx8IHR5cGVvZihtb2R1bGUpICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRQcm9taXNlTWV0aG9kO1xuXHRcdH1cblx0XHR2YXIgbWV0aG9kTmFtZSA9IGhlbHBlci5nZXRDYW1lbENhc2VOYW1lKHByZWZpeCwgbmFtZSk7XG5cdFx0aWYgKHR5cGVvZihtb2R1bGVbbWV0aG9kTmFtZV0pID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRyZXR1cm4gbW9kdWxlW21ldGhvZE5hbWVdLmJpbmQobW9kdWxlKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZihtb2R1bGVbcHJlZml4XSkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHJldHVybiBtb2R1bGVbcHJlZml4XS5iaW5kKG1vZHVsZSwgbmFtZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRlZmF1bHRQcm9taXNlTWV0aG9kO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXRzIG5hbWUgaW4gY2FtZWwgY2FzaW5nIGZvciBldmVyeXRoaW5nLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IFByZWZpeCBmb3IgdGhlIG5hbWUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE5hbWUgdG8gY29udmVydC5cblx0ICovXG5cdGdldENhbWVsQ2FzZU5hbWU6IGZ1bmN0aW9uIChwcmVmaXgsIG5hbWUpIHtcblx0XHRpZiAoIW5hbWUpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cdFx0dmFyIHBhcnRzID0gbmFtZS5zcGxpdCgvW15hLXowLTldL2kpLFxuXHRcdFx0Y2FtZWxDYXNlTmFtZSA9IFN0cmluZyhwcmVmaXggfHwgJycpO1xuXG5cdFx0cGFydHMuZm9yRWFjaChmdW5jdGlvbiAocGFydCkge1xuXHRcdFx0aWYgKCFwYXJ0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZmlyc3QgY2hhcmFjdGVyIGluIG1ldGhvZCBuYW1lIG11c3QgYmUgaW4gbG93ZXJjYXNlXG5cdFx0XHRjYW1lbENhc2VOYW1lICs9IGNhbWVsQ2FzZU5hbWUgP1xuXHRcdFx0XHRwYXJ0WzBdLnRvVXBwZXJDYXNlKCkgOlxuXHRcdFx0XHRwYXJ0WzBdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRjYW1lbENhc2VOYW1lICs9IHBhcnQuc3Vic3RyaW5nKDEpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGNhbWVsQ2FzZU5hbWU7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldHMgc2FmZSBwcm9taXNlIHJlc29sdmVkIGZyb20gYWN0aW9uLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhY3Rpb24gQWN0aW9uIHRvIHdyYXAgd2l0aCBzYWZlIHByb21pc2UuXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfVxuXHQgKi9cblx0Z2V0U2FmZVByb21pc2U6IGZ1bmN0aW9uIChhY3Rpb24pIHtcblx0XHR2YXIgcHJvbWlzZTtcblx0XHR0cnkge1xuXHRcdFx0cHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShhY3Rpb24oKSk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cHJvbWlzZSA9IFByb21pc2UucmVqZWN0KGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBwcm9taXNlO1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhlbHBlcjtcblxuLyoqXG4gKiBKdXN0IHJldHVybnMgcmVzb2x2ZWQgcHJvbWlzZS5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICovXG5mdW5jdGlvbiBkZWZhdWx0UHJvbWlzZU1ldGhvZCgpIHtcblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xufSIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0LyoqXG5cdCAqIERlZmluZXMgcmVhZC1vbmx5IHByb3BlcnR5LlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IE9iamVjdCB0byBkZWZpbmUgcHJvcGVydHkgaW4uXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIHByb3BlcnR5LlxuXHQgKiBAcGFyYW0geyp9IHZhbHVlIFByb3BlcnR5IHZhbHVlLlxuXHQgKi9cblx0ZGVmaW5lUmVhZE9ubHk6IGZ1bmN0aW9uIChvYmplY3QsIG5hbWUsIHZhbHVlKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwge1xuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuXHRcdFx0d3JpdGFibGU6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0fSk7XG5cdH1cbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKSxcblx0VVJJID0gcmVxdWlyZSgnY2F0YmVycnktdXJpJykuVVJJO1xuXG52YXIgVVJJX1BBVEhfUkVQTEFDRU1FTlRfUkVHX0VYUF9TT1VSQ0UgPSAnKFteXFxcXC9cXFxcXFxcXF0qKScsXG5cdFVSSV9RVUVSWV9SRVBMQUNFTUVOVF9SRUdfRVhQX1NPVVJDRSA9ICcoW14mPz1dKiknO1xuXG52YXIgUEFUSF9FTkRfU0xBU0hfUkVHX0VYUCA9IC8oLispXFwvKCR8XFw/fCMpLyxcblx0RVhQUkVTU0lPTl9FU0NBUEVfUkVHX0VYUCA9IC9bXFwtXFxbXFxdXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZyxcblx0SURFTlRJRklFUl9SRUdfRVhQX1NPVVJDRSA9ICdbJEEtWl9dW1xcXFxkQS1aXyRdKicsXG5cdFNUT1JFX0xJU1RfUkVHX0VYUF9TT1VSQ0UgPSAnKD86KD86XFxcXFxcXFxbWyBdKicgK1xuXHRcdCdbXlxcXFxbXFxcXF0sXSsnICtcblx0XHQnKFsgXSosWyBdKicgK1xuXHRcdCdbXlxcXFxbXFxcXF0sXSsnICtcblx0XHQnKSpbIF0qXFxcXFxcXFxdKXwoPzpcXFxcXFxcXFtbIF0qXFxcXFxcXFxdKSk/Jyxcblx0UEFSQU1FVEVSX1JFR19FWFAgPSBuZXcgUmVnRXhwKFxuXHRcdFx0JzonICtcblx0XHRcdElERU5USUZJRVJfUkVHX0VYUF9TT1VSQ0UgK1xuXHRcdFx0U1RPUkVfTElTVF9SRUdfRVhQX1NPVVJDRSwgJ2dpJyksXG5cdFNMQVNIRURfQlJBQ0tFVFNfUkVHX0VYUCA9IC9cXFxcXFxbfFxcXFxcXF0vLFxuXHRTVE9SRV9MSVNUX1NFUEFSQVRPUiA9ICcsJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdC8qKlxuXHQgKiBSZW1vdmVzIHNsYXNoIGZyb20gdGhlIGVuZCBvZiBVUkkgcGF0aC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHVyaVBhdGggVVJJIHBhdGggdG8gcHJvY2Vzcy5cblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHJlbW92ZUVuZFNsYXNoOiBmdW5jdGlvbiAodXJpUGF0aCkge1xuXHRcdGlmICghdXJpUGF0aCB8fCB0eXBlb2YodXJpUGF0aCkgIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHRcdGlmICh1cmlQYXRoID09PSAnLycpIHtcblx0XHRcdHJldHVybiB1cmlQYXRoO1xuXHRcdH1cblx0XHRyZXR1cm4gdXJpUGF0aC5yZXBsYWNlKFBBVEhfRU5EX1NMQVNIX1JFR19FWFAsICckMSQyJyk7XG5cdH0sXG5cdC8qKlxuXHQgKiBHZXRzIFVSSSBtYXBwZXIgZnJvbSB0aGUgcm91dGUgZXhwcmVzc2lvbiBsaWtlXG5cdCAqIC9zb21lLzppZFtzdG9yZTEsIHN0b3JlMiwgc3RvcmUzXS9kZXRhaWxzP2ZpbHRlcj06ZmlsdGVyW3N0b3JlM11cblx0ICogQHBhcmFtIHtVUkl9IHJvdXRlVXJpIEV4cHJlc3Npb24gdGhhdCBkZWZpbmVzIHJvdXRlLlxuXHQgKiBAcmV0dXJucyB7e2V4cHJlc3Npb246IFJlZ0V4cCwgbWFwOiBGdW5jdGlvbn19XG5cdCAqIFVSSSBtYXBwZXIgb2JqZWN0LlxuXHQgKi9cblx0Y29tcGlsZVJvdXRlOiBmdW5jdGlvbiAocm91dGVVcmkpIHtcblx0XHRpZiAoIXJvdXRlVXJpKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHQvLyBlc2NhcGUgcmVndWxhciBleHByZXNzaW9uIGNoYXJhY3RlcnNcblx0XHR2YXIgZXNjYXBlZCA9IHJvdXRlVXJpLnBhdGgucmVwbGFjZShcblx0XHRcdEVYUFJFU1NJT05fRVNDQVBFX1JFR19FWFAsICdcXFxcJCYnXG5cdFx0KTtcblxuXHRcdC8vIGdldCBhbGwgb2NjdXJyZW5jZXMgb2Ygcm91dGluZyBwYXJhbWV0ZXJzIGluIFVSSSBwYXRoXG5cdFx0dmFyIHJlZ0V4cFNvdXJjZSA9ICdeJyArIGVzY2FwZWQucmVwbGFjZShcblx0XHRcdFx0XHRQQVJBTUVURVJfUkVHX0VYUCxcblx0XHRcdFx0XHRVUklfUEFUSF9SRVBMQUNFTUVOVF9SRUdfRVhQX1NPVVJDRSkgKyAnJCcsXG5cdFx0XHRleHByZXNzaW9uID0gbmV3IFJlZ0V4cChyZWdFeHBTb3VyY2UsICdpJyksXG5cdFx0XHRxdWVyeU1hcHBlcixcblx0XHRcdHBhdGhNYXBwZXIsXG5cdFx0XHRwYXRoUGFyYW1ldGVyTWF0Y2hlcyA9IGVzY2FwZWQubWF0Y2goXG5cdFx0XHRcdFBBUkFNRVRFUl9SRUdfRVhQXG5cdFx0XHQpLFxuXHRcdFx0cGF0aFBhcmFtZXRlcnMgPSBwYXRoUGFyYW1ldGVyTWF0Y2hlcyA/XG5cdFx0XHRcdHBhdGhQYXJhbWV0ZXJNYXRjaGVzLm1hcChnZXRQYXJhbWV0ZXJEZXNjcmlwdG9yKSA6IG51bGw7XG5cblx0XHRpZiAocGF0aFBhcmFtZXRlcnMpIHtcblx0XHRcdHBhdGhNYXBwZXIgPSBjcmVhdGVVcmlQYXRoTWFwcGVyKGV4cHJlc3Npb24sIHBhdGhQYXJhbWV0ZXJzKTtcblx0XHR9XG5cblx0XHRpZiAocm91dGVVcmkucXVlcnkpIHtcblx0XHRcdHZhciBxdWVyeVBhcmFtZXRlcnMgPSB7fTtcblx0XHRcdE9iamVjdC5rZXlzKHJvdXRlVXJpLnF1ZXJ5LnZhbHVlcylcblx0XHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRcdFx0XHQvLyBhcnJheXMgaW4gcm91dGluZyBkZWZpbml0aW9ucyBhcmUgbm90IHN1cHBvcnRlZFxuXHRcdFx0XHRcdGlmICh1dGlsLmlzQXJyYXkocm91dGVVcmkucXVlcnkudmFsdWVzW25hbWVdKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIGVzY2FwZSByZWd1bGFyIGV4cHJlc3Npb24gY2hhcmFjdGVyc1xuXHRcdFx0XHRcdHZhciBlc2NhcGVkID0gcm91dGVVcmkucXVlcnkudmFsdWVzW25hbWVdLnJlcGxhY2UoXG5cdFx0XHRcdFx0XHRFWFBSRVNTSU9OX0VTQ0FQRV9SRUdfRVhQLCAnXFxcXCQmJ1xuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHQvLyBnZXQgYWxsIG9jY3VycmVuY2VzIG9mIHJvdXRpbmcgcGFyYW1ldGVycyBpbiBVUkkgcGF0aFxuXHRcdFx0XHRcdHZhciByZWdFeHBTb3VyY2UgPSAnXicgKyBlc2NhcGVkLnJlcGxhY2UoXG5cdFx0XHRcdFx0XHRcdFBBUkFNRVRFUl9SRUdfRVhQLFxuXHRcdFx0XHRcdFx0XHRVUklfUVVFUllfUkVQTEFDRU1FTlRfUkVHX0VYUF9TT1VSQ0UpICsgJyQnO1xuXHRcdFx0XHRcdHZhciBxdWVyeVBhcmFtZXRlck1hdGNoZXMgPSBlc2NhcGVkLm1hdGNoKFxuXHRcdFx0XHRcdFx0XHRQQVJBTUVURVJfUkVHX0VYUFxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRpZiAoIXF1ZXJ5UGFyYW1ldGVyTWF0Y2hlcyB8fFxuXHRcdFx0XHRcdFx0cXVlcnlQYXJhbWV0ZXJNYXRjaGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBwYXJhbWV0ZXIgPSBnZXRQYXJhbWV0ZXJEZXNjcmlwdG9yKFxuXHRcdFx0XHRcdFx0cXVlcnlQYXJhbWV0ZXJNYXRjaGVzW3F1ZXJ5UGFyYW1ldGVyTWF0Y2hlcy5sZW5ndGggLSAxXVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0dmFyIGV4cHJlc3Npb24gPSBuZXcgUmVnRXhwKHJlZ0V4cFNvdXJjZSwgJ2knKTtcblx0XHRcdFx0XHRwYXJhbWV0ZXIubWFwID0gY3JlYXRlVXJpUXVlcnlWYWx1ZU1hcHBlcihleHByZXNzaW9uKTtcblx0XHRcdFx0XHRxdWVyeVBhcmFtZXRlcnNbbmFtZV0gPSBwYXJhbWV0ZXI7XG5cdFx0XHRcdH0pO1xuXHRcdFx0cXVlcnlNYXBwZXIgPSBjcmVhdGVVcmlRdWVyeU1hcHBlcihxdWVyeVBhcmFtZXRlcnMpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0bWFwOiBmdW5jdGlvbiAodXJpKSB7XG5cdFx0XHRcdHZhciBzdGF0ZSA9IHt9O1xuXHRcdFx0XHRpZiAocGF0aE1hcHBlcikge1xuXHRcdFx0XHRcdHBhdGhNYXBwZXIodXJpLnBhdGgsIHN0YXRlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChxdWVyeU1hcHBlciAmJiB1cmkucXVlcnkpIHtcblx0XHRcdFx0XHRxdWVyeU1hcHBlcih1cmkucXVlcnkudmFsdWVzLCBzdGF0ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBVUkkgcGF0aC10by1zdGF0ZSBvYmplY3QgbWFwcGVyLlxuICogQHBhcmFtIHtSZWdFeHB9IGV4cHJlc3Npb24gUmVndWxhciBleHByZXNzaW9uIHRvIG1hdGNoIFVSSSBwYXRoLlxuICogQHBhcmFtIHtBcnJheX0gcGFyYW1ldGVycyBMaXN0IG9mIHBhcmFtZXRlciBkZXNjcmlwdG9ycy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVVJJIG1hcHBlciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlVXJpUGF0aE1hcHBlcihleHByZXNzaW9uLCBwYXJhbWV0ZXJzKSB7XG5cdHJldHVybiBmdW5jdGlvbiAodXJpUGF0aCwgc3RhdGUpIHtcblx0XHR2YXIgbWF0Y2hlcyA9IHVyaVBhdGgubWF0Y2goZXhwcmVzc2lvbik7XG5cdFx0aWYgKCFtYXRjaGVzIHx8IG1hdGNoZXMubGVuZ3RoIDwgMikge1xuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH1cblxuXHRcdC8vIHN0YXJ0IHdpdGggc2Vjb25kIG1hdGNoIGJlY2F1c2UgZmlyc3QgbWF0Y2ggaXMgYWx3YXlzXG5cdFx0Ly8gdGhlIHdob2xlIFVSSSBwYXRoXG5cdFx0bWF0Y2hlcyA9IG1hdGNoZXMuc3BsaWNlKDEpO1xuXG5cdFx0cGFyYW1ldGVycy5mb3JFYWNoKGZ1bmN0aW9uIChwYXJhbWV0ZXIsIGluZGV4KSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBtYXRjaGVzW2luZGV4XTtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Ly8gbm90aGluZyB0byBkb1xuXHRcdFx0fVxuXHRcdFx0cGFyYW1ldGVyLnN0b3JlTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0XHRcdGlmICghc3RhdGVbc3RvcmVOYW1lXSkge1xuXHRcdFx0XHRcdHN0YXRlW3N0b3JlTmFtZV0gPSB7fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzdGF0ZVtzdG9yZU5hbWVdW3BhcmFtZXRlci5uYW1lXSA9IHZhbHVlO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgVVJJIHF1ZXJ5LXRvLXN0YXRlIG9iamVjdCBtYXBwZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVycyBMaXN0IG9mIHBvc3NpYmxlIHF1ZXJ5IHBhcmFtZXRlciBkZXNjcmlwdG9ycyBieVxuICogcXVlcnkgcGFyYW1ldGVyIG5hbWVzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBVUkkgbWFwcGVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVVcmlRdWVyeU1hcHBlcihwYXJhbWV0ZXJzKSB7XG5cdHJldHVybiBmdW5jdGlvbiAocXVlcnlWYWx1ZXMsIHN0YXRlKSB7XG5cdFx0cXVlcnlWYWx1ZXMgPSBxdWVyeVZhbHVlcyB8fCB7fTtcblxuXHRcdE9iamVjdC5rZXlzKHF1ZXJ5VmFsdWVzKVxuXHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKHF1ZXJ5S2V5KSB7XG5cdFx0XHRcdHZhciBwYXJhbWV0ZXIgPSBwYXJhbWV0ZXJzW3F1ZXJ5S2V5XTtcblx0XHRcdFx0aWYgKCFwYXJhbWV0ZXIpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgdmFsdWUgPSB1dGlsLmlzQXJyYXkocXVlcnlWYWx1ZXNbcXVlcnlLZXldKSA/XG5cdFx0XHRcdFx0XHRxdWVyeVZhbHVlc1txdWVyeUtleV1cblx0XHRcdFx0XHRcdFx0Lm1hcChwYXJhbWV0ZXIubWFwKVxuXHRcdFx0XHRcdFx0XHQuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB2YWx1ZSAhPT0gbnVsbDtcblx0XHRcdFx0XHRcdFx0fSkgOlxuXHRcdFx0XHRcdFx0cGFyYW1ldGVyLm1hcChxdWVyeVZhbHVlc1txdWVyeUtleV0pO1xuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRwYXJhbWV0ZXIuc3RvcmVOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcblx0XHRcdFx0XHRpZiAoIXN0YXRlW3N0b3JlTmFtZV0pIHtcblx0XHRcdFx0XHRcdHN0YXRlW3N0b3JlTmFtZV0gPSB7fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0c3RhdGVbc3RvcmVOYW1lXVtwYXJhbWV0ZXIubmFtZV0gPSB2YWx1ZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0fTtcbn1cblxuLyoqXG4gKiBNYXBzIHF1ZXJ5IHBhcmFtZXRlciB2YWx1ZSB1c2luZyB0aGUgcGFyYW1ldGVycyBleHByZXNzaW9uLlxuICogQHBhcmFtIHtSZWdFeHB9IGV4cHJlc3Npb24gUmVndWxhciBleHByZXNzaW9uIHRvIGdldCBwYXJhbWV0ZXIgdmFsdWUuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFVSSSBxdWVyeSBzdHJpbmcgcGFyYW1ldGVyIHZhbHVlIG1hcHBlciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlVXJpUXVlcnlWYWx1ZU1hcHBlcihleHByZXNzaW9uKSB7XG5cdHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHR2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XG5cdFx0dmFyIG1hdGNoZXMgPSB2YWx1ZS5tYXRjaChleHByZXNzaW9uKTtcblx0XHRpZiAoIW1hdGNoZXMgfHwgbWF0Y2hlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdC8vIHRoZSB2YWx1ZSBpcyB0aGUgc2Vjb25kIGl0ZW0sIHRoZSBmaXJzdCBpcyBhIHdob2xlIHN0cmluZ1xuXHRcdHZhciBtYXBwZWRWYWx1ZSA9IG1hdGNoZXNbbWF0Y2hlcy5sZW5ndGggLSAxXTtcblx0XHR0cnkge1xuXHRcdFx0bWFwcGVkVmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQobWFwcGVkVmFsdWUpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC8vIG5vdGhpbmcgdG8gZG9cblx0XHR9XG5cblx0XHRyZXR1cm4gbWFwcGVkVmFsdWU7XG5cdH07XG59XG5cbi8qKlxuICogR2V0cyBkZXNjcmlwdGlvbiBvZiBwYXJhbWV0ZXJzIGZyb20gaXRzIGV4cHJlc3Npb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1ldGVyIFBhcmFtZXRlciBleHByZXNzaW9uLlxuICogQHJldHVybnMge3tuYW1lOiBzdHJpbmcsIHN0b3JlTmFtZXM6IEFycmF5fX0gUGFyYW1ldGVyIGRlc2NyaXB0b3IuXG4gKi9cbmZ1bmN0aW9uIGdldFBhcmFtZXRlckRlc2NyaXB0b3IocGFyYW1ldGVyKSB7XG5cdHZhciBwYXJ0cyA9IHBhcmFtZXRlci5zcGxpdChTTEFTSEVEX0JSQUNLRVRTX1JFR19FWFApO1xuXG5cdHJldHVybiB7XG5cdFx0bmFtZTogcGFydHNbMF1cblx0XHRcdC50cmltKClcblx0XHRcdC5zdWJzdHJpbmcoMSksXG5cdFx0c3RvcmVOYW1lczogKHBhcnRzWzFdID8gcGFydHNbMV0gOiAnJylcblx0XHRcdC5zcGxpdChTVE9SRV9MSVNUX1NFUEFSQVRPUilcblx0XHRcdC5tYXAoZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuXHRcdFx0XHRyZXR1cm4gc3RvcmVOYW1lLnRyaW0oKTtcblx0XHRcdH0pXG5cdFx0XHQuZmlsdGVyKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcblx0XHRcdFx0cmV0dXJuIHN0b3JlTmFtZS5sZW5ndGggPiAwO1xuXHRcdFx0fSlcblx0fTtcbn0iLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZVByb3ZpZGVyO1xuXG52YXIgcm91dGVIZWxwZXIgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcm91dGVIZWxwZXInKSxcblx0Y2F0YmVycnlVcmkgPSByZXF1aXJlKCdjYXRiZXJyeS11cmknKSxcblx0VVJJID0gY2F0YmVycnlVcmkuVVJJO1xuXG4vKipcbiAqIENyZWF0ZSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHN0YXRlIHByb3ZpZGVyLlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gJHNlcnZpY2VMb2NhdG9yIFNlcnZpY2UgbG9jYXRvclxuICogdG8gcmVzb2x2ZSBVUkkgbWFwcGVycy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBTdGF0ZVByb3ZpZGVyKCRzZXJ2aWNlTG9jYXRvcikge1xuXHR0aGlzLl91cmlNYXBwZXJzID0gZ2V0VXJpTWFwcGVycygkc2VydmljZUxvY2F0b3IpO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgbGlzdCBvZiBVUkkgbWFwcGVycy5cbiAqIEB0eXBlIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cblN0YXRlUHJvdmlkZXIucHJvdG90eXBlLl91cmlNYXBwZXJzID0gbnVsbDtcblxuLyoqXG4gKiBHZXRzIHN0YXRlIGJ5IHNwZWNpZmllZCBsb2NhdGlvbiBVUkkuXG4gKiBAcGFyYW0ge1VSSX0gbG9jYXRpb24gVVJJIGxvY2F0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gU3RhdGUgb2JqZWN0LlxuICovXG5TdGF0ZVByb3ZpZGVyLnByb3RvdHlwZS5nZXRTdGF0ZUJ5VXJpID0gZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG5cdGlmICh0aGlzLl91cmlNYXBwZXJzLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0bG9jYXRpb24gPSBsb2NhdGlvbi5jbG9uZSgpO1xuXG5cdGxvY2F0aW9uLnBhdGggPSByb3V0ZUhlbHBlci5yZW1vdmVFbmRTbGFzaChsb2NhdGlvbi5wYXRoKTtcblx0dmFyIHN0YXRlID0gZ2V0U3RhdGUodGhpcy5fdXJpTWFwcGVycywgbG9jYXRpb24pO1xuXG5cdGlmICghc3RhdGUpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8vIG1ha2Ugc3RhdGUgb2JqZWN0IGltbXV0YWJsZVxuXHRPYmplY3Qua2V5cyhzdGF0ZSlcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0XHRPYmplY3QuZnJlZXplKHN0YXRlW3N0b3JlTmFtZV0pO1xuXHRcdH0pO1xuXHRPYmplY3QuZnJlZXplKHN0YXRlKTtcblxuXHRyZXR1cm4gc3RhdGU7XG59O1xuXG4vKipcbiAqIEdldHMgbGlzdCBvZiBVUkkgbWFwcGVycy5cbiAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9IHNlcnZpY2VMb2NhdG9yIFNlcnZpY2UgbG9jYXRvciB0byBnZXQgcm91dGVcbiAqIGRlZmluaXRpb25zLlxuICogQHJldHVybnMge0FycmF5fSBMaXN0IG9mIFVSSSBtYXBwZXJzLlxuICovXG5mdW5jdGlvbiBnZXRVcmlNYXBwZXJzKHNlcnZpY2VMb2NhdG9yKSB7XG5cdHZhciB1cmlNYXBwZXJzID0gW107XG5cblx0c2VydmljZUxvY2F0b3IucmVzb2x2ZUFsbCgncm91dGVEZWZpbml0aW9uJylcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAocm91dGUpIHtcblx0XHRcdC8vIGp1c3QgY29sb24tcGFyYW1ldHJpemVkIHN0cmluZ1xuXHRcdFx0aWYgKHR5cGVvZihyb3V0ZSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHZhciByb3V0ZVVyaSA9IG5ldyBVUkkocm91dGUpO1xuXHRcdFx0XHRyb3V0ZVVyaS5wYXRoID0gcm91dGVIZWxwZXIucmVtb3ZlRW5kU2xhc2gocm91dGVVcmkucGF0aCk7XG5cdFx0XHRcdHVyaU1hcHBlcnMucHVzaChyb3V0ZUhlbHBlci5jb21waWxlUm91dGUocm91dGVVcmkpKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBleHRlbmRlZCBjb2xvbi1wYXJhbWV0cml6ZWQgbWFwcGVyXG5cdFx0XHRpZiAodHlwZW9mKHJvdXRlKSA9PT0gJ29iamVjdCcgJiZcblx0XHRcdFx0KHR5cGVvZihyb3V0ZS5leHByZXNzaW9uKSA9PT0gJ3N0cmluZycpICYmXG5cdFx0XHRcdChyb3V0ZS5tYXAgaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcblx0XHRcdFx0dmFyIG1hcHBlclVyaSA9IG5ldyBVUkkocm91dGUuZXhwcmVzc2lvbik7XG5cdFx0XHRcdG1hcHBlclVyaS5wYXRoID0gcm91dGVIZWxwZXIucmVtb3ZlRW5kU2xhc2gobWFwcGVyVXJpLnBhdGgpO1xuXHRcdFx0XHR2YXIgbWFwcGVyID0gcm91dGVIZWxwZXIuY29tcGlsZVJvdXRlKG1hcHBlclVyaSk7XG5cdFx0XHRcdHVyaU1hcHBlcnMucHVzaCh7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbjogbWFwcGVyLmV4cHJlc3Npb24sXG5cdFx0XHRcdFx0bWFwOiBmdW5jdGlvbiAodXJpKSB7XG5cdFx0XHRcdFx0XHR2YXIgc3RhdGUgPSBtYXBwZXIubWFwKHVyaSk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcm91dGUubWFwKHN0YXRlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIHJlZ3VsYXIgZXhwcmVzc2lvbiBtYXBwZXJcblx0XHRcdGlmICh0eXBlb2Yocm91dGUpID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0XHQocm91dGUuZXhwcmVzc2lvbiBpbnN0YW5jZW9mIFJlZ0V4cCkgJiZcblx0XHRcdFx0KHJvdXRlLm1hcCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xuXHRcdFx0XHR1cmlNYXBwZXJzLnB1c2gocm91dGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRyZXR1cm4gdXJpTWFwcGVycztcbn1cblxuLyoqXG4gKiBHZXRzIHN0YXRlLlxuICogQHBhcmFtIHtBcnJheX0gdXJpTWFwcGVycy5cbiAqIEBwYXJhbSB7VVJJfSBsb2NhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R8bnVsbH1cbiAqL1xuZnVuY3Rpb24gZ2V0U3RhdGUgKHVyaU1hcHBlcnMsIGxvY2F0aW9uKSB7XG5cdHZhciBzdGF0ZSA9IG51bGw7XG5cblx0dXJpTWFwcGVycy5zb21lKGZ1bmN0aW9uIChtYXBwZXIpIHtcblx0XHRpZiAobWFwcGVyLmV4cHJlc3Npb24udGVzdChsb2NhdGlvbi5wYXRoKSkge1xuXHRcdFx0c3RhdGUgPSBtYXBwZXIubWFwKGxvY2F0aW9uKSB8fCB7fTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0pO1xuXG5cdHJldHVybiBzdGF0ZTtcbn0iLG51bGwsIi8qZ2xvYmFsIGRlZmluZTpmYWxzZSByZXF1aXJlOmZhbHNlICovXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpe1xuXHQvLyBJbXBvcnQgRXZlbnRzXG5cdHZhciBldmVudHMgPSByZXF1aXJlKCdldmVudHMnKVxuXG5cdC8vIEV4cG9ydCBEb21haW5cblx0dmFyIGRvbWFpbiA9IHt9XG5cdGRvbWFpbi5jcmVhdGVEb21haW4gPSBkb21haW4uY3JlYXRlID0gZnVuY3Rpb24oKXtcblx0XHR2YXIgZCA9IG5ldyBldmVudHMuRXZlbnRFbWl0dGVyKClcblxuXHRcdGZ1bmN0aW9uIGVtaXRFcnJvcihlKSB7XG5cdFx0XHRkLmVtaXQoJ2Vycm9yJywgZSlcblx0XHR9XG5cblx0XHRkLmFkZCA9IGZ1bmN0aW9uKGVtaXR0ZXIpe1xuXHRcdFx0ZW1pdHRlci5vbignZXJyb3InLCBlbWl0RXJyb3IpXG5cdFx0fVxuXHRcdGQucmVtb3ZlID0gZnVuY3Rpb24oZW1pdHRlcil7XG5cdFx0XHRlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGVtaXRFcnJvcilcblx0XHR9XG5cdFx0ZC5iaW5kID0gZnVuY3Rpb24oZm4pe1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGZuLmFwcGx5KG51bGwsIGFyZ3MpXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2ggKGVycil7XG5cdFx0XHRcdFx0ZW1pdEVycm9yKGVycilcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRkLmludGVyY2VwdCA9IGZ1bmN0aW9uKGZuKXtcblx0XHRcdHJldHVybiBmdW5jdGlvbihlcnIpe1xuXHRcdFx0XHRpZiAoIGVyciApIHtcblx0XHRcdFx0XHRlbWl0RXJyb3IoZXJyKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRmbi5hcHBseShudWxsLCBhcmdzKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYXRjaCAoZXJyKXtcblx0XHRcdFx0XHRcdGVtaXRFcnJvcihlcnIpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGQucnVuID0gZnVuY3Rpb24oZm4pe1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Zm4oKVxuXHRcdFx0fVxuXHRcdFx0Y2F0Y2ggKGVycikge1xuXHRcdFx0XHRlbWl0RXJyb3IoZXJyKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9O1xuXHRcdGQuZGlzcG9zZSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH07XG5cdFx0ZC5lbnRlciA9IGQuZXhpdCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4gZFxuXHR9O1xuXHRyZXR1cm4gZG9tYWluXG59KS5jYWxsKHRoaXMpIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH1cbiAgICAgIHRocm93IFR5cGVFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4nKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgYXJncyA9IG5ldyBBcnJheShsZW4gLSAxKTtcbiAgICAgICAgZm9yIChpID0gMTsgaSA8IGxlbjsgaSsrKVxuICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gLSAxKTtcbiAgICBmb3IgKGkgPSAxOyBpIDwgbGVuOyBpKyspXG4gICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIHZhciBtO1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghZW1pdHRlci5fZXZlbnRzIHx8ICFlbWl0dGVyLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gMDtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbihlbWl0dGVyLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IDE7XG4gIGVsc2VcbiAgICByZXQgPSBlbWl0dGVyLl9ldmVudHNbdHlwZV0ubGVuZ3RoO1xuICByZXR1cm4gcmV0O1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICB9XG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCdWZmZXIoYXJnKSB7XG4gIHJldHVybiBhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCdcbiAgICAmJiB0eXBlb2YgYXJnLmNvcHkgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLmZpbGwgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLnJlYWRVSW50OCA9PT0gJ2Z1bmN0aW9uJztcbn0iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIGZvcm1hdFJlZ0V4cCA9IC8lW3NkaiVdL2c7XG5leHBvcnRzLmZvcm1hdCA9IGZ1bmN0aW9uKGYpIHtcbiAgaWYgKCFpc1N0cmluZyhmKSkge1xuICAgIHZhciBvYmplY3RzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iamVjdHMucHVzaChpbnNwZWN0KGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0cy5qb2luKCcgJyk7XG4gIH1cblxuICB2YXIgaSA9IDE7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG4gIHZhciBzdHIgPSBTdHJpbmcoZikucmVwbGFjZShmb3JtYXRSZWdFeHAsIGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoeCA9PT0gJyUlJykgcmV0dXJuICclJztcbiAgICBpZiAoaSA+PSBsZW4pIHJldHVybiB4O1xuICAgIHN3aXRjaCAoeCkge1xuICAgICAgY2FzZSAnJXMnOiByZXR1cm4gU3RyaW5nKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclZCc6IHJldHVybiBOdW1iZXIoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVqJzpcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYXJnc1tpKytdKTtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfSk7XG4gIGZvciAodmFyIHggPSBhcmdzW2ldOyBpIDwgbGVuOyB4ID0gYXJnc1srK2ldKSB7XG4gICAgaWYgKGlzTnVsbCh4KSB8fCAhaXNPYmplY3QoeCkpIHtcbiAgICAgIHN0ciArPSAnICcgKyB4O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgKz0gJyAnICsgaW5zcGVjdCh4KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn07XG5cblxuLy8gTWFyayB0aGF0IGEgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbi8vIFJldHVybnMgYSBtb2RpZmllZCBmdW5jdGlvbiB3aGljaCB3YXJucyBvbmNlIGJ5IGRlZmF1bHQuXG4vLyBJZiAtLW5vLWRlcHJlY2F0aW9uIGlzIHNldCwgdGhlbiBpdCBpcyBhIG5vLW9wLlxuZXhwb3J0cy5kZXByZWNhdGUgPSBmdW5jdGlvbihmbiwgbXNnKSB7XG4gIC8vIEFsbG93IGZvciBkZXByZWNhdGluZyB0aGluZ3MgaW4gdGhlIHByb2Nlc3Mgb2Ygc3RhcnRpbmcgdXAuXG4gIGlmIChpc1VuZGVmaW5lZChnbG9iYWwucHJvY2VzcykpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZXhwb3J0cy5kZXByZWNhdGUoZm4sIG1zZykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKHByb2Nlc3Mubm9EZXByZWNhdGlvbiA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZGVwcmVjYXRlZCgpIHtcbiAgICBpZiAoIXdhcm5lZCkge1xuICAgICAgaWYgKHByb2Nlc3MudGhyb3dEZXByZWNhdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy50cmFjZURlcHJlY2F0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGRlcHJlY2F0ZWQ7XG59O1xuXG5cbnZhciBkZWJ1Z3MgPSB7fTtcbnZhciBkZWJ1Z0Vudmlyb247XG5leHBvcnRzLmRlYnVnbG9nID0gZnVuY3Rpb24oc2V0KSB7XG4gIGlmIChpc1VuZGVmaW5lZChkZWJ1Z0Vudmlyb24pKVxuICAgIGRlYnVnRW52aXJvbiA9IHByb2Nlc3MuZW52Lk5PREVfREVCVUcgfHwgJyc7XG4gIHNldCA9IHNldC50b1VwcGVyQ2FzZSgpO1xuICBpZiAoIWRlYnVnc1tzZXRdKSB7XG4gICAgaWYgKG5ldyBSZWdFeHAoJ1xcXFxiJyArIHNldCArICdcXFxcYicsICdpJykudGVzdChkZWJ1Z0Vudmlyb24pKSB7XG4gICAgICB2YXIgcGlkID0gcHJvY2Vzcy5waWQ7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbXNnID0gZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignJXMgJWQ6ICVzJywgc2V0LCBwaWQsIG1zZyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge307XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWJ1Z3Nbc2V0XTtcbn07XG5cblxuLyoqXG4gKiBFY2hvcyB0aGUgdmFsdWUgb2YgYSB2YWx1ZS4gVHJ5cyB0byBwcmludCB0aGUgdmFsdWUgb3V0XG4gKiBpbiB0aGUgYmVzdCB3YXkgcG9zc2libGUgZ2l2ZW4gdGhlIGRpZmZlcmVudCB0eXBlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcHJpbnQgb3V0LlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgT3B0aW9uYWwgb3B0aW9ucyBvYmplY3QgdGhhdCBhbHRlcnMgdGhlIG91dHB1dC5cbiAqL1xuLyogbGVnYWN5OiBvYmosIHNob3dIaWRkZW4sIGRlcHRoLCBjb2xvcnMqL1xuZnVuY3Rpb24gaW5zcGVjdChvYmosIG9wdHMpIHtcbiAgLy8gZGVmYXVsdCBvcHRpb25zXG4gIHZhciBjdHggPSB7XG4gICAgc2VlbjogW10sXG4gICAgc3R5bGl6ZTogc3R5bGl6ZU5vQ29sb3JcbiAgfTtcbiAgLy8gbGVnYWN5Li4uXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIGN0eC5kZXB0aCA9IGFyZ3VtZW50c1syXTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gNCkgY3R4LmNvbG9ycyA9IGFyZ3VtZW50c1szXTtcbiAgaWYgKGlzQm9vbGVhbihvcHRzKSkge1xuICAgIC8vIGxlZ2FjeS4uLlxuICAgIGN0eC5zaG93SGlkZGVuID0gb3B0cztcbiAgfSBlbHNlIGlmIChvcHRzKSB7XG4gICAgLy8gZ290IGFuIFwib3B0aW9uc1wiIG9iamVjdFxuICAgIGV4cG9ydHMuX2V4dGVuZChjdHgsIG9wdHMpO1xuICB9XG4gIC8vIHNldCBkZWZhdWx0IG9wdGlvbnNcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5zaG93SGlkZGVuKSkgY3R4LnNob3dIaWRkZW4gPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5kZXB0aCkpIGN0eC5kZXB0aCA9IDI7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY29sb3JzKSkgY3R4LmNvbG9ycyA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmN1c3RvbUluc3BlY3QpKSBjdHguY3VzdG9tSW5zcGVjdCA9IHRydWU7XG4gIGlmIChjdHguY29sb3JzKSBjdHguc3R5bGl6ZSA9IHN0eWxpemVXaXRoQ29sb3I7XG4gIHJldHVybiBmb3JtYXRWYWx1ZShjdHgsIG9iaiwgY3R4LmRlcHRoKTtcbn1cbmV4cG9ydHMuaW5zcGVjdCA9IGluc3BlY3Q7XG5cblxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlI2dyYXBoaWNzXG5pbnNwZWN0LmNvbG9ycyA9IHtcbiAgJ2JvbGQnIDogWzEsIDIyXSxcbiAgJ2l0YWxpYycgOiBbMywgMjNdLFxuICAndW5kZXJsaW5lJyA6IFs0LCAyNF0sXG4gICdpbnZlcnNlJyA6IFs3LCAyN10sXG4gICd3aGl0ZScgOiBbMzcsIDM5XSxcbiAgJ2dyZXknIDogWzkwLCAzOV0sXG4gICdibGFjaycgOiBbMzAsIDM5XSxcbiAgJ2JsdWUnIDogWzM0LCAzOV0sXG4gICdjeWFuJyA6IFszNiwgMzldLFxuICAnZ3JlZW4nIDogWzMyLCAzOV0sXG4gICdtYWdlbnRhJyA6IFszNSwgMzldLFxuICAncmVkJyA6IFszMSwgMzldLFxuICAneWVsbG93JyA6IFszMywgMzldXG59O1xuXG4vLyBEb24ndCB1c2UgJ2JsdWUnIG5vdCB2aXNpYmxlIG9uIGNtZC5leGVcbmluc3BlY3Quc3R5bGVzID0ge1xuICAnc3BlY2lhbCc6ICdjeWFuJyxcbiAgJ251bWJlcic6ICd5ZWxsb3cnLFxuICAnYm9vbGVhbic6ICd5ZWxsb3cnLFxuICAndW5kZWZpbmVkJzogJ2dyZXknLFxuICAnbnVsbCc6ICdib2xkJyxcbiAgJ3N0cmluZyc6ICdncmVlbicsXG4gICdkYXRlJzogJ21hZ2VudGEnLFxuICAvLyBcIm5hbWVcIjogaW50ZW50aW9uYWxseSBub3Qgc3R5bGluZ1xuICAncmVnZXhwJzogJ3JlZCdcbn07XG5cblxuZnVuY3Rpb24gc3R5bGl6ZVdpdGhDb2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICB2YXIgc3R5bGUgPSBpbnNwZWN0LnN0eWxlc1tzdHlsZVR5cGVdO1xuXG4gIGlmIChzdHlsZSkge1xuICAgIHJldHVybiAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzBdICsgJ20nICsgc3RyICtcbiAgICAgICAgICAgJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVsxXSArICdtJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5cblxuZnVuY3Rpb24gc3R5bGl6ZU5vQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgcmV0dXJuIHN0cjtcbn1cblxuXG5mdW5jdGlvbiBhcnJheVRvSGFzaChhcnJheSkge1xuICB2YXIgaGFzaCA9IHt9O1xuXG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24odmFsLCBpZHgpIHtcbiAgICBoYXNoW3ZhbF0gPSB0cnVlO1xuICB9KTtcblxuICByZXR1cm4gaGFzaDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRWYWx1ZShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMpIHtcbiAgLy8gUHJvdmlkZSBhIGhvb2sgZm9yIHVzZXItc3BlY2lmaWVkIGluc3BlY3QgZnVuY3Rpb25zLlxuICAvLyBDaGVjayB0aGF0IHZhbHVlIGlzIGFuIG9iamVjdCB3aXRoIGFuIGluc3BlY3QgZnVuY3Rpb24gb24gaXRcbiAgaWYgKGN0eC5jdXN0b21JbnNwZWN0ICYmXG4gICAgICB2YWx1ZSAmJlxuICAgICAgaXNGdW5jdGlvbih2YWx1ZS5pbnNwZWN0KSAmJlxuICAgICAgLy8gRmlsdGVyIG91dCB0aGUgdXRpbCBtb2R1bGUsIGl0J3MgaW5zcGVjdCBmdW5jdGlvbiBpcyBzcGVjaWFsXG4gICAgICB2YWx1ZS5pbnNwZWN0ICE9PSBleHBvcnRzLmluc3BlY3QgJiZcbiAgICAgIC8vIEFsc28gZmlsdGVyIG91dCBhbnkgcHJvdG90eXBlIG9iamVjdHMgdXNpbmcgdGhlIGNpcmN1bGFyIGNoZWNrLlxuICAgICAgISh2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPT09IHZhbHVlKSkge1xuICAgIHZhciByZXQgPSB2YWx1ZS5pbnNwZWN0KHJlY3Vyc2VUaW1lcywgY3R4KTtcbiAgICBpZiAoIWlzU3RyaW5nKHJldCkpIHtcbiAgICAgIHJldCA9IGZvcm1hdFZhbHVlKGN0eCwgcmV0LCByZWN1cnNlVGltZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLy8gUHJpbWl0aXZlIHR5cGVzIGNhbm5vdCBoYXZlIHByb3BlcnRpZXNcbiAgdmFyIHByaW1pdGl2ZSA9IGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKTtcbiAgaWYgKHByaW1pdGl2ZSkge1xuICAgIHJldHVybiBwcmltaXRpdmU7XG4gIH1cblxuICAvLyBMb29rIHVwIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuICB2YXIgdmlzaWJsZUtleXMgPSBhcnJheVRvSGFzaChrZXlzKTtcblxuICBpZiAoY3R4LnNob3dIaWRkZW4pIHtcbiAgICBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsdWUpO1xuICB9XG5cbiAgLy8gSUUgZG9lc24ndCBtYWtlIGVycm9yIGZpZWxkcyBub24tZW51bWVyYWJsZVxuICAvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvZHd3NTJzYnQodj12cy45NCkuYXNweFxuICBpZiAoaXNFcnJvcih2YWx1ZSlcbiAgICAgICYmIChrZXlzLmluZGV4T2YoJ21lc3NhZ2UnKSA+PSAwIHx8IGtleXMuaW5kZXhPZignZGVzY3JpcHRpb24nKSA+PSAwKSkge1xuICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICAvLyBTb21lIHR5cGUgb2Ygb2JqZWN0IHdpdGhvdXQgcHJvcGVydGllcyBjYW4gYmUgc2hvcnRjdXR0ZWQuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgdmFyIG5hbWUgPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW0Z1bmN0aW9uJyArIG5hbWUgKyAnXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfVxuICAgIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdkYXRlJyk7XG4gICAgfVxuICAgIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYmFzZSA9ICcnLCBhcnJheSA9IGZhbHNlLCBicmFjZXMgPSBbJ3snLCAnfSddO1xuXG4gIC8vIE1ha2UgQXJyYXkgc2F5IHRoYXQgdGhleSBhcmUgQXJyYXlcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgYXJyYXkgPSB0cnVlO1xuICAgIGJyYWNlcyA9IFsnWycsICddJ107XG4gIH1cblxuICAvLyBNYWtlIGZ1bmN0aW9ucyBzYXkgdGhhdCB0aGV5IGFyZSBmdW5jdGlvbnNcbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgdmFyIG4gPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICBiYXNlID0gJyBbRnVuY3Rpb24nICsgbiArICddJztcbiAgfVxuXG4gIC8vIE1ha2UgUmVnRXhwcyBzYXkgdGhhdCB0aGV5IGFyZSBSZWdFeHBzXG4gIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZGF0ZXMgd2l0aCBwcm9wZXJ0aWVzIGZpcnN0IHNheSB0aGUgZGF0ZVxuICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBEYXRlLnByb3RvdHlwZS50b1VUQ1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZXJyb3Igd2l0aCBtZXNzYWdlIGZpcnN0IHNheSB0aGUgZXJyb3JcbiAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCAmJiAoIWFycmF5IHx8IHZhbHVlLmxlbmd0aCA9PSAwKSkge1xuICAgIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgYnJhY2VzWzFdO1xuICB9XG5cbiAgaWYgKHJlY3Vyc2VUaW1lcyA8IDApIHtcbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tPYmplY3RdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cblxuICBjdHguc2Vlbi5wdXNoKHZhbHVlKTtcblxuICB2YXIgb3V0cHV0O1xuICBpZiAoYXJyYXkpIHtcbiAgICBvdXRwdXQgPSBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKTtcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQgPSBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGN0eC5zZWVuLnBvcCgpO1xuXG4gIHJldHVybiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ3VuZGVmaW5lZCcsICd1bmRlZmluZWQnKTtcbiAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgIHZhciBzaW1wbGUgPSAnXFwnJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKS5yZXBsYWNlKC9eXCJ8XCIkL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSArICdcXCcnO1xuICAgIHJldHVybiBjdHguc3R5bGl6ZShzaW1wbGUsICdzdHJpbmcnKTtcbiAgfVxuICBpZiAoaXNOdW1iZXIodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnbnVtYmVyJyk7XG4gIGlmIChpc0Jvb2xlYW4odmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnYm9vbGVhbicpO1xuICAvLyBGb3Igc29tZSByZWFzb24gdHlwZW9mIG51bGwgaXMgXCJvYmplY3RcIiwgc28gc3BlY2lhbCBjYXNlIGhlcmUuXG4gIGlmIChpc051bGwodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnbnVsbCcsICdudWxsJyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0RXJyb3IodmFsdWUpIHtcbiAgcmV0dXJuICdbJyArIEVycm9yLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSArICddJztcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkodmFsdWUsIFN0cmluZyhpKSkpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAgU3RyaW5nKGkpLCB0cnVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5wdXNoKCcnKTtcbiAgICB9XG4gIH1cbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgIGlmICgha2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBrZXksIHRydWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0O1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpIHtcbiAgdmFyIG5hbWUsIHN0ciwgZGVzYztcbiAgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodmFsdWUsIGtleSkgfHwgeyB2YWx1ZTogdmFsdWVba2V5XSB9O1xuICBpZiAoZGVzYy5nZXQpIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyL1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmICghaGFzT3duUHJvcGVydHkodmlzaWJsZUtleXMsIGtleSkpIHtcbiAgICBuYW1lID0gJ1snICsga2V5ICsgJ10nO1xuICB9XG4gIGlmICghc3RyKSB7XG4gICAgaWYgKGN0eC5zZWVuLmluZGV4T2YoZGVzYy52YWx1ZSkgPCAwKSB7XG4gICAgICBpZiAoaXNOdWxsKHJlY3Vyc2VUaW1lcykpIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgcmVjdXJzZVRpbWVzIC0gMSk7XG4gICAgICB9XG4gICAgICBpZiAoc3RyLmluZGV4T2YoJ1xcbicpID4gLTEpIHtcbiAgICAgICAgaWYgKGFycmF5KSB7XG4gICAgICAgICAgc3RyID0gc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpLnN1YnN0cigyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHIgPSAnXFxuJyArIHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tDaXJjdWxhcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoaXNVbmRlZmluZWQobmFtZSkpIHtcbiAgICBpZiAoYXJyYXkgJiYga2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbmFtZSA9IEpTT04uc3RyaW5naWZ5KCcnICsga2V5KTtcbiAgICBpZiAobmFtZS5tYXRjaCgvXlwiKFthLXpBLVpfXVthLXpBLVpfMC05XSopXCIkLykpIHtcbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cigxLCBuYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICduYW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oXlwifFwiJCkvZywgXCInXCIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICdzdHJpbmcnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmFtZSArICc6ICcgKyBzdHI7XG59XG5cblxuZnVuY3Rpb24gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpIHtcbiAgdmFyIG51bUxpbmVzRXN0ID0gMDtcbiAgdmFyIGxlbmd0aCA9IG91dHB1dC5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3VyKSB7XG4gICAgbnVtTGluZXNFc3QrKztcbiAgICBpZiAoY3VyLmluZGV4T2YoJ1xcbicpID49IDApIG51bUxpbmVzRXN0Kys7XG4gICAgcmV0dXJuIHByZXYgKyBjdXIucmVwbGFjZSgvXFx1MDAxYlxcW1xcZFxcZD9tL2csICcnKS5sZW5ndGggKyAxO1xuICB9LCAwKTtcblxuICBpZiAobGVuZ3RoID4gNjApIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICtcbiAgICAgICAgICAgKGJhc2UgPT09ICcnID8gJycgOiBiYXNlICsgJ1xcbiAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIG91dHB1dC5qb2luKCcsXFxuICAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIGJyYWNlc1sxXTtcbiAgfVxuXG4gIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgJyAnICsgb3V0cHV0LmpvaW4oJywgJykgKyAnICcgKyBicmFjZXNbMV07XG59XG5cblxuLy8gTk9URTogVGhlc2UgdHlwZSBjaGVja2luZyBmdW5jdGlvbnMgaW50ZW50aW9uYWxseSBkb24ndCB1c2UgYGluc3RhbmNlb2ZgXG4vLyBiZWNhdXNlIGl0IGlzIGZyYWdpbGUgYW5kIGNhbiBiZSBlYXNpbHkgZmFrZWQgd2l0aCBgT2JqZWN0LmNyZWF0ZSgpYC5cbmZ1bmN0aW9uIGlzQXJyYXkoYXIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXIpO1xufVxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuZnVuY3Rpb24gaXNCb29sZWFuKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG5cbmZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xuXG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGxPclVuZGVmaW5lZCA9IGlzTnVsbE9yVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuXG5mdW5jdGlvbiBpc1N0cmluZyhhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuXG5mdW5jdGlvbiBpc1N5bWJvbChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnO1xufVxuZXhwb3J0cy5pc1N5bWJvbCA9IGlzU3ltYm9sO1xuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gaXNPYmplY3QocmUpICYmIG9iamVjdFRvU3RyaW5nKHJlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5leHBvcnRzLmlzUmVnRXhwID0gaXNSZWdFeHA7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0RhdGUoZCkge1xuICByZXR1cm4gaXNPYmplY3QoZCkgJiYgb2JqZWN0VG9TdHJpbmcoZCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbmV4cG9ydHMuaXNEYXRlID0gaXNEYXRlO1xuXG5mdW5jdGlvbiBpc0Vycm9yKGUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGUpICYmXG4gICAgICAob2JqZWN0VG9TdHJpbmcoZSkgPT09ICdbb2JqZWN0IEVycm9yXScgfHwgZSBpbnN0YW5jZW9mIEVycm9yKTtcbn1cbmV4cG9ydHMuaXNFcnJvciA9IGlzRXJyb3I7XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcblxuZnVuY3Rpb24gaXNQcmltaXRpdmUoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGwgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3ltYm9sJyB8fCAgLy8gRVM2IHN5bWJvbFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG5cbmV4cG9ydHMuaXNCdWZmZXIgPSByZXF1aXJlKCcuL3N1cHBvcnQvaXNCdWZmZXInKTtcblxuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuXG5cbmZ1bmN0aW9uIHBhZChuKSB7XG4gIHJldHVybiBuIDwgMTAgPyAnMCcgKyBuLnRvU3RyaW5nKDEwKSA6IG4udG9TdHJpbmcoMTApO1xufVxuXG5cbnZhciBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJyxcbiAgICAgICAgICAgICAgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5cbi8vIDI2IEZlYiAxNjoxOTozNFxuZnVuY3Rpb24gdGltZXN0YW1wKCkge1xuICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gIHZhciB0aW1lID0gW3BhZChkLmdldEhvdXJzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRNaW51dGVzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRTZWNvbmRzKCkpXS5qb2luKCc6Jyk7XG4gIHJldHVybiBbZC5nZXREYXRlKCksIG1vbnRoc1tkLmdldE1vbnRoKCldLCB0aW1lXS5qb2luKCcgJyk7XG59XG5cblxuLy8gbG9nIGlzIGp1c3QgYSB0aGluIHdyYXBwZXIgdG8gY29uc29sZS5sb2cgdGhhdCBwcmVwZW5kcyBhIHRpbWVzdGFtcFxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJyVzIC0gJXMnLCB0aW1lc3RhbXAoKSwgZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKSk7XG59O1xuXG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyLlxuICpcbiAqIFRoZSBGdW5jdGlvbi5wcm90b3R5cGUuaW5oZXJpdHMgZnJvbSBsYW5nLmpzIHJld3JpdHRlbiBhcyBhIHN0YW5kYWxvbmVcbiAqIGZ1bmN0aW9uIChub3Qgb24gRnVuY3Rpb24ucHJvdG90eXBlKS4gTk9URTogSWYgdGhpcyBmaWxlIGlzIHRvIGJlIGxvYWRlZFxuICogZHVyaW5nIGJvb3RzdHJhcHBpbmcgdGhpcyBmdW5jdGlvbiBuZWVkcyB0byBiZSByZXdyaXR0ZW4gdXNpbmcgc29tZSBuYXRpdmVcbiAqIGZ1bmN0aW9ucyBhcyBwcm90b3R5cGUgc2V0dXAgdXNpbmcgbm9ybWFsIEphdmFTY3JpcHQgZG9lcyBub3Qgd29yayBhc1xuICogZXhwZWN0ZWQgZHVyaW5nIGJvb3RzdHJhcHBpbmcgKHNlZSBtaXJyb3IuanMgaW4gcjExNDkwMykuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB3aGljaCBuZWVkcyB0byBpbmhlcml0IHRoZVxuICogICAgIHByb3RvdHlwZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBpbmhlcml0IHByb3RvdHlwZSBmcm9tLlxuICovXG5leHBvcnRzLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuZXhwb3J0cy5fZXh0ZW5kID0gZnVuY3Rpb24ob3JpZ2luLCBhZGQpIHtcbiAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgYWRkIGlzbid0IGFuIG9iamVjdFxuICBpZiAoIWFkZCB8fCAhaXNPYmplY3QoYWRkKSkgcmV0dXJuIG9yaWdpbjtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFkZCk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICBvcmlnaW5ba2V5c1tpXV0gPSBhZGRba2V5c1tpXV07XG4gIH1cbiAgcmV0dXJuIG9yaWdpbjtcbn07XG5cbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG4iLCIvKlxuICogY2F0YmVycnktbG9jYXRvclxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5LWxvY2F0b3IncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5LWxvY2F0b3IgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBDb25zdHJ1Y3RvclRva2VuaXplcjtcblxudmFyIFNUQVRFUyA9IHtcblx0SUxMRUdBTDogLTEsXG5cdE5POiAwLFxuXHRJREVOVElGSUVSOiAxLFxuXHRGVU5DVElPTjogMixcblx0UEFSRU5USEVTRVNfT1BFTjogMyxcblx0UEFSRU5USEVTRVNfQ0xPU0U6IDQsXG5cdENPTU1BOiA1LFxuXHRFTkQ6IDZcbn07XG5Db25zdHJ1Y3RvclRva2VuaXplci5TVEFURVMgPSBTVEFURVM7XG5cbnZhciBLRVlXT1JEUyA9IHtcblx0RlVOQ1RJT046ICdmdW5jdGlvbidcbn07XG5cbnZhciBXSElURVNQQUNFX1RFU1QgPSAvXlxccyQvLFxuXHRJREVOVElGSUVSX1RFU1QgPSAvXltcXCRcXHddJC87XG5cbmZ1bmN0aW9uIENvbnN0cnVjdG9yVG9rZW5pemVyKGNvbnN0cnVjdG9yU291cmNlKSB7XG5cdHRoaXMuX3NvdXJjZSA9IFN0cmluZyhjb25zdHJ1Y3RvclNvdXJjZSB8fCAnJyk7XG59XG5cbi8qKlxuICogQ3VycmVudCBzb3VyY2UgY29kZSBvZiBjb25zdHJ1Y3Rvci5cbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5Db25zdHJ1Y3RvclRva2VuaXplci5wcm90b3R5cGUuX3NvdXJjZSA9ICcnO1xuXG4vKipcbiAqIEN1cnJlbnQgaW5kZXggaW4gc291cmNlIGNvZGUuXG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQHByaXZhdGVcbiAqL1xuQ29uc3RydWN0b3JUb2tlbml6ZXIucHJvdG90eXBlLl9jdXJyZW50SW5kZXggPSAwO1xuXG4vKipcbiAqIEN1cnJlbnQgaW5kZXggaW4gc291cmNlIGNvZGUuXG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQHByaXZhdGVcbiAqL1xuQ29uc3RydWN0b3JUb2tlbml6ZXIucHJvdG90eXBlLl9jdXJyZW50RW5kID0gMDtcblxuLyoqXG4gKiBDdXJyZW50IHN0YXRlLlxuICogQHR5cGUge251bWJlcn1cbiAqIEBwcml2YXRlXG4gKi9cbkNvbnN0cnVjdG9yVG9rZW5pemVyLnByb3RvdHlwZS5fY3VycmVudFN0YXRlID0gU1RBVEVTLk5PO1xuXG4vKipcbiAqIEdldHMgbmV4dCB0b2tlbiBpbiBzb3VyY2UuXG4gKiBAcmV0dXJucyB7e3N0YXRlOiAobnVtYmVyKSwgc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXJ9fVxuICovXG5Db25zdHJ1Y3RvclRva2VuaXplci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHRoaXMuX2N1cnJlbnRTdGF0ZSA9PT0gU1RBVEVTLklMTEVHQUwgfHxcblx0XHR0aGlzLl9jdXJyZW50U3RhdGUgPT09IFNUQVRFUy5FTkQpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c3RhdGU6IHRoaXMuX2N1cnJlbnRTdGF0ZSxcblx0XHRcdHN0YXJ0OiB0aGlzLl9jdXJyZW50SW5kZXgsXG5cdFx0XHRlbmQ6IHRoaXMuX2N1cnJlbnRJbmRleCArIDFcblx0XHR9O1xuXHR9XG5cblx0dmFyIHN0YXJ0ID0gdGhpcy5fY3VycmVudEluZGV4LFxuXHRcdHN0YXRlID0gdGhpcy5fY3VycmVudFN0YXRlO1xuXG5cdHN3aXRjaCAodGhpcy5fY3VycmVudFN0YXRlKSB7XG5cdFx0Y2FzZSBTVEFURVMuUEFSRU5USEVTRVNfT1BFTjpcblx0XHRcdHRoaXMucGFyZW50aGVzZXNPcGVuU3RhdGUoKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgU1RBVEVTLlBBUkVOVEhFU0VTX0NMT1NFOlxuXHRcdFx0dGhpcy5wYXJlbnRoZXNlc0Nsb3NlU3RhdGUoKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgU1RBVEVTLklERU5USUZJRVI6XG5cdFx0XHR0aGlzLmlkZW50aWZpZXJTdGF0ZSgpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBTVEFURVMuQ09NTUE6XG5cdFx0XHR0aGlzLmNvbW1hU3RhdGUoKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgU1RBVEVTLkZVTkNUSU9OOlxuXHRcdFx0dGhpcy5mdW5jdGlvblN0YXRlKCk7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhpcy5za2lwV2hpdGVzcGFjZSgpO1xuXHRcdFx0dmFyIGV4cGVjdGVkID0gdGhpcy5fc291cmNlLnN1YnN0cihcblx0XHRcdFx0dGhpcy5fY3VycmVudEluZGV4LCBLRVlXT1JEUy5GVU5DVElPTi5sZW5ndGhcblx0XHRcdCk7XG5cdFx0XHRpZiAoZXhwZWN0ZWQgPT09IEtFWVdPUkRTLkZVTkNUSU9OKSB7XG5cdFx0XHRcdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5GVU5DVElPTjtcblx0XHRcdFx0cmV0dXJuIHRoaXMubmV4dCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdGF0ZSA9IFNUQVRFUy5JTExFR0FMO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRzdGF0ZTogc3RhdGUsXG5cdFx0c3RhcnQ6IHN0YXJ0LFxuXHRcdGVuZDogdGhpcy5fY3VycmVudEVuZFxuXHR9O1xufTtcblxuLyoqXG4gKiBTa2lwcyBhbGwgd2hpdGVzcGFjZSBjaGFyYWN0ZXJzLlxuICovXG5Db25zdHJ1Y3RvclRva2VuaXplci5wcm90b3R5cGUuc2tpcFdoaXRlc3BhY2UgPSBmdW5jdGlvbiAoKSB7XG5cdHdoaWxlIChcblx0XHR0aGlzLl9jdXJyZW50SW5kZXggPCB0aGlzLl9zb3VyY2UubGVuZ3RoICYmXG5cdFx0V0hJVEVTUEFDRV9URVNULnRlc3QodGhpcy5fc291cmNlW3RoaXMuX2N1cnJlbnRJbmRleF0pKSB7XG5cdFx0dGhpcy5fY3VycmVudEluZGV4Kys7XG5cdH1cbn07XG5cbi8qKlxuICogRGVzY3JpYmVzIFBBUkVOVEhFU0VTX09QRU4gc3RhdGUgb2YgbWFjaGluZS5cbiAqL1xuQ29uc3RydWN0b3JUb2tlbml6ZXIucHJvdG90eXBlLnBhcmVudGhlc2VzT3BlblN0YXRlID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLl9jdXJyZW50SW5kZXgrKztcblx0dGhpcy5fY3VycmVudEVuZCA9IHRoaXMuX2N1cnJlbnRJbmRleDtcblxuXHR0aGlzLnNraXBXaGl0ZXNwYWNlKCk7XG5cdGlmIChJREVOVElGSUVSX1RFU1QudGVzdCh0aGlzLl9zb3VyY2VbdGhpcy5fY3VycmVudEluZGV4XSkpIHtcblx0XHR0aGlzLl9jdXJyZW50U3RhdGUgPSBTVEFURVMuSURFTlRJRklFUjtcblx0fSBlbHNlIGlmICh0aGlzLl9zb3VyY2VbdGhpcy5fY3VycmVudEluZGV4XSA9PT0gJyknKSB7XG5cdFx0dGhpcy5fY3VycmVudFN0YXRlID0gU1RBVEVTLlBBUkVOVEhFU0VTX0NMT1NFO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5JTExFR0FMO1xuXHR9XG59O1xuXG4vKipcbiAqIERlc2NyaWJlcyBQQVJFTlRIRVNFU19DTE9TRSBzdGF0ZSBvZiBtYWNoaW5lLlxuICovXG5Db25zdHJ1Y3RvclRva2VuaXplci5wcm90b3R5cGUucGFyZW50aGVzZXNDbG9zZVN0YXRlID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLl9jdXJyZW50SW5kZXgrKztcblx0dGhpcy5fY3VycmVudEVuZCA9IHRoaXMuX2N1cnJlbnRJbmRleDtcblx0dGhpcy5fY3VycmVudFN0YXRlID0gU1RBVEVTLkVORDtcbn07XG5cbi8qKlxuICogRGVzY3JpYmVzIEZVTkNUSU9OIHN0YXRlIG9mIG1hY2hpbmUuXG4gKi9cbkNvbnN0cnVjdG9yVG9rZW5pemVyLnByb3RvdHlwZS5mdW5jdGlvblN0YXRlID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLl9jdXJyZW50SW5kZXggKz0gS0VZV09SRFMuRlVOQ1RJT04ubGVuZ3RoO1xuXHR0aGlzLl9jdXJyZW50RW5kID0gdGhpcy5fY3VycmVudEluZGV4O1xuXG5cdHRoaXMuc2tpcFdoaXRlc3BhY2UoKTtcblxuXHRpZiAodGhpcy5fc291cmNlW3RoaXMuX2N1cnJlbnRJbmRleF0gPT09ICcoJykge1xuXHRcdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5QQVJFTlRIRVNFU19PUEVOO1xuXHR9IGVsc2UgaWYgKElERU5USUZJRVJfVEVTVC50ZXN0KHRoaXMuX3NvdXJjZVt0aGlzLl9jdXJyZW50SW5kZXhdKSkge1xuXHRcdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5JREVOVElGSUVSO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5JTExFR0FMO1xuXHR9XG59O1xuXG4vKipcbiAqIERlc2NyaWJlcyBJREVOVElGSUVSIHN0YXRlIG9mIG1hY2hpbmUuXG4gKi9cbkNvbnN0cnVjdG9yVG9rZW5pemVyLnByb3RvdHlwZS5pZGVudGlmaWVyU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdHdoaWxlIChcblx0XHR0aGlzLl9jdXJyZW50SW5kZXggPCB0aGlzLl9zb3VyY2UubGVuZ3RoICYmXG5cdFx0SURFTlRJRklFUl9URVNULnRlc3QodGhpcy5fc291cmNlW3RoaXMuX2N1cnJlbnRJbmRleF0pKSB7XG5cdFx0dGhpcy5fY3VycmVudEluZGV4Kys7XG5cdH1cblxuXHR0aGlzLl9jdXJyZW50RW5kID0gdGhpcy5fY3VycmVudEluZGV4O1xuXG5cdHRoaXMuc2tpcFdoaXRlc3BhY2UoKTtcblx0aWYgKHRoaXMuX3NvdXJjZVt0aGlzLl9jdXJyZW50SW5kZXhdID09PSAnKCcpIHtcblx0XHR0aGlzLl9jdXJyZW50U3RhdGUgPSBTVEFURVMuUEFSRU5USEVTRVNfT1BFTjtcblx0fSBlbHNlIGlmICh0aGlzLl9zb3VyY2VbdGhpcy5fY3VycmVudEluZGV4XSA9PT0gJyknKSB7XG5cdFx0dGhpcy5fY3VycmVudFN0YXRlID0gU1RBVEVTLlBBUkVOVEhFU0VTX0NMT1NFO1xuXHR9IGVsc2UgaWYgKHRoaXMuX3NvdXJjZVt0aGlzLl9jdXJyZW50SW5kZXhdID09PSAnLCcpIHtcblx0XHR0aGlzLl9jdXJyZW50U3RhdGUgPSBTVEFURVMuQ09NTUE7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5fY3VycmVudFN0YXRlID0gU1RBVEVTLklMTEVHQUw7XG5cdH1cbn07XG5cbi8qKlxuICogRGVzY3JpYmVzIENPTU1BIHN0YXRlIG9mIG1hY2hpbmUuXG4gKi9cbkNvbnN0cnVjdG9yVG9rZW5pemVyLnByb3RvdHlwZS5jb21tYVN0YXRlID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLl9jdXJyZW50SW5kZXgrKztcblx0dGhpcy5fY3VycmVudEVuZCA9IHRoaXMuX2N1cnJlbnRJbmRleDtcblxuXHR0aGlzLnNraXBXaGl0ZXNwYWNlKCk7XG5cdGlmIChJREVOVElGSUVSX1RFU1QudGVzdCh0aGlzLl9zb3VyY2VbdGhpcy5fY3VycmVudEluZGV4XSkpIHtcblx0XHR0aGlzLl9jdXJyZW50U3RhdGUgPSBTVEFURVMuSURFTlRJRklFUjtcblx0XHRyZXR1cm47XG5cdH1cblx0dGhpcy5fY3VycmVudFN0YXRlID0gU1RBVEVTLklMTEVHQUw7XG59OyIsIi8qXG4gKiBjYXRiZXJyeS1sb2NhdG9yXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnktbG9jYXRvcidzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnktbG9jYXRvciB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZpY2VMb2NhdG9yO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKSxcblx0Q29uc3RydWN0b3JUb2tlbml6ZXIgPSByZXF1aXJlKCcuL0NvbnN0cnVjdG9yVG9rZW5pemVyJyk7XG5cbnZhciBERVBFTkRFTkNZX1JFR0VYUCA9IC9eXFwkXFx3Ky8sXG5cdEVSUk9SX0NPTlNUUlVDVE9SX1NIT1VMRF9CRV9GVU5DVElPTiA9ICdDb25zdHJ1Y3RvciBzaG91bGQgYmUgYSBmdW5jdGlvbicsXG5cdEVSUk9SX1RZUEVfTk9UX1JFR0lTVEVSRUQgPSAnVHlwZSBcIiVzXCIgbm90IHJlZ2lzdGVyZWQnLFxuXHRFUlJPUl9UWVBFX1NIT1VMRF9CRV9TVFJJTkcgPSAnVHlwZSBuYW1lIFwiJXNcIiBzaG91bGQgYmUgYSBzdHJpbmcnO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHNlcnZpY2UgbG9jYXRvci5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBTZXJ2aWNlTG9jYXRvcigpIHtcblx0dGhpcy5fcmVnaXN0cmF0aW9ucyA9IHt9O1xufVxuXG4vKipcbiAqIEN1cnJlbnQgdHlwZSByZWdpc3RyYXRpb25zLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuU2VydmljZUxvY2F0b3IucHJvdG90eXBlLl9yZWdpc3RyYXRpb25zID0gbnVsbDtcblxuLyoqXG4gKiBSZWdpc3RlcnMgbmV3IHR5cGUgaW4gc2VydmljZSBsb2NhdG9yLlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVHlwZSBuYW1lLCB3aGljaCB3aWxsIGJlIGFsaWFzIGluIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbnN0cnVjdG9yIENvbnN0cnVjdG9yIHdoaWNoXG4gKiBpbml0aWFsaXplcyBpbnN0YW5jZSBvZiBzcGVjaWZpZWQgdHlwZS5cbiAqIEBwYXJhbSB7T2JqZWN0P30gcGFyYW1ldGVycyBTZXQgb2YgbmFtZWQgcGFyYW1ldGVyc1xuICogd2hpY2ggd2lsbCBiZSBhbHNvIGluamVjdGVkLlxuICogQHBhcmFtIHtib29sZWFuP30gaXNTaW5nbGV0b24gSWYgdHJ1ZSBldmVyeSByZXNvbHZlIHdpbGwgcmV0dXJuXG4gKiB0aGUgc2FtZSBpbnN0YW5jZS5cbiAqL1xuU2VydmljZUxvY2F0b3IucHJvdG90eXBlLnJlZ2lzdGVyID1cblx0ZnVuY3Rpb24gKHR5cGUsIGNvbnN0cnVjdG9yLCBwYXJhbWV0ZXJzLCBpc1NpbmdsZXRvbikge1xuXHRcdHRocm93SWZOb3RGdW5jdGlvbihjb25zdHJ1Y3Rvcik7XG5cdFx0dGhyb3dJZk5vdFN0cmluZyh0eXBlKTtcblxuXHRcdGluaXRpYWxpemVSZWdpc3RyYXRpb24odHlwZSwgdGhpcyk7XG5cdFx0dmFyIHBhcmFtZXRlck5hbWVzID0gZ2V0UGFyYW1ldGVyTmFtZXMoY29uc3RydWN0b3IpO1xuXG5cdFx0dGhpcy5fcmVnaXN0cmF0aW9uc1t0eXBlXS51bnNoaWZ0KHtcblx0XHRcdGNvbnN0cnVjdG9yOiBjb25zdHJ1Y3Rvcixcblx0XHRcdHBhcmFtZXRlcnM6IHBhcmFtZXRlcnMgfHwge30sXG5cdFx0XHRwYXJhbWV0ZXJOYW1lczogcGFyYW1ldGVyTmFtZXMsXG5cdFx0XHRpc1NpbmdsZXRvbjogQm9vbGVhbihpc1NpbmdsZXRvbiksXG5cdFx0XHRzaW5nbGVJbnN0YW5jZTogbnVsbFxuXHRcdH0pO1xuXHR9O1xuXG4vKipcbiAqIFJlZ2lzdGVycyBzaW5nbGUgaW5zdGFuY2UgZm9yIHNwZWNpZmllZCB0eXBlLlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVHlwZSBuYW1lLlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIEluc3RhbmNlIHRvIHJlZ2lzdGVyLlxuICovXG5TZXJ2aWNlTG9jYXRvci5wcm90b3R5cGUucmVnaXN0ZXJJbnN0YW5jZSA9IGZ1bmN0aW9uICh0eXBlLCBpbnN0YW5jZSkge1xuXHR0aHJvd0lmTm90U3RyaW5nKHR5cGUpO1xuXHRpbml0aWFsaXplUmVnaXN0cmF0aW9uKHR5cGUsIHRoaXMpO1xuXG5cdHRoaXMuX3JlZ2lzdHJhdGlvbnNbdHlwZV0udW5zaGlmdCh7XG5cdFx0Y29uc3RydWN0b3I6IGluc3RhbmNlLmNvbnN0cnVjdG9yLFxuXHRcdHBhcmFtZXRlcnM6IHt9LFxuXHRcdHBhcmFtZXRlck5hbWVzOiBbXSxcblx0XHRpc1NpbmdsZXRvbjogdHJ1ZSxcblx0XHRzaW5nbGVJbnN0YW5jZTogaW5zdGFuY2Vcblx0fSk7XG59O1xuXG4vKipcbiAqIFJlc29sdmVzIGxhc3QgcmVnaXN0ZXJlZCBpbXBsZW1lbnRhdGlvbiBieSB0eXBlIG5hbWVcbiAqIGluY2x1ZGluZyBhbGwgaXRzIGRlcGVuZGVuY2llcyByZWN1cnNpdmVseS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFR5cGUgbmFtZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IEluc3RhbmNlIG9mIHNwZWNpZmllZCB0eXBlLlxuICovXG5TZXJ2aWNlTG9jYXRvci5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG5cdHRocm93SWZOb3RTdHJpbmcodHlwZSk7XG5cdHRocm93SWZOb1R5cGUodGhpcy5fcmVnaXN0cmF0aW9ucywgdHlwZSk7XG5cdHZhciBmaXJzdFJlZ2lzdHJhdGlvbiA9IHRoaXMuX3JlZ2lzdHJhdGlvbnNbdHlwZV1bMF07XG5cdHJldHVybiBjcmVhdGVJbnN0YW5jZShmaXJzdFJlZ2lzdHJhdGlvbiwgdGhpcyk7XG59O1xuXG4vKipcbiAqIFJlc29sdmVzIGFsbCByZWdpc3RlcmVkIGltcGxlbWVudGF0aW9ucyBieSB0eXBlIG5hbWVcbiAqIGluY2x1ZGluZyBhbGwgZGVwZW5kZW5jaWVzIHJlY3Vyc2l2ZWx5LlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVHlwZSBuYW1lLlxuICogQHJldHVybnMge0FycmF5fSBBcnJheSBvZiBpbnN0YW5jZXMgc3BlY2lmaWVkIHR5cGUuXG4gKi9cblNlcnZpY2VMb2NhdG9yLnByb3RvdHlwZS5yZXNvbHZlQWxsID0gZnVuY3Rpb24gKHR5cGUpIHtcblx0dGhyb3dJZk5vdFN0cmluZyh0eXBlKTtcblx0dHJ5IHtcblx0XHR0aHJvd0lmTm9UeXBlKHRoaXMuX3JlZ2lzdHJhdGlvbnMsIHR5cGUpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cdHJldHVybiB0aGlzLl9yZWdpc3RyYXRpb25zW3R5cGVdLm1hcChmdW5jdGlvbiAocmVnaXN0cmF0aW9uKSB7XG5cdFx0cmV0dXJuIGNyZWF0ZUluc3RhbmNlKHJlZ2lzdHJhdGlvbiwgdGhpcyk7XG5cdH0sIHRoaXMpO1xufTtcblxuLyoqXG4gKiBSZXNvbHZlcyBpbnN0YW5jZSBvZiBzcGVjaWZpZWQgY29uc3RydWN0b3IgaW5jbHVkaW5nIGRlcGVuZGVuY2llcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbnN0cnVjdG9yIENvbnN0cnVjdG9yIGZvciBpbnN0YW5jZSBjcmVhdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0P30gcGFyYW1ldGVycyBTZXQgb2YgaXRzIHBhcmFtZXRlcnMgdmFsdWVzLlxuICogQHJldHVybnMge09iamVjdH0gSW5zdGFuY2Ugb2Ygc3BlY2lmaWVkIGNvbnN0cnVjdG9yLlxuICovXG5TZXJ2aWNlTG9jYXRvci5wcm90b3R5cGUucmVzb2x2ZUluc3RhbmNlID0gZnVuY3Rpb24gKGNvbnN0cnVjdG9yLCBwYXJhbWV0ZXJzKSB7XG5cdHJldHVybiBjcmVhdGVJbnN0YW5jZSh7XG5cdFx0Y29uc3RydWN0b3I6IGNvbnN0cnVjdG9yLFxuXHRcdHBhcmFtZXRlcnM6IHBhcmFtZXRlcnMgfHwge30sXG5cdFx0cGFyYW1ldGVyTmFtZXM6IGdldFBhcmFtZXRlck5hbWVzKGNvbnN0cnVjdG9yKSxcblx0XHRpc1NpbmdsZXRvbjogZmFsc2UsXG5cdFx0c2luZ2xlSW5zdGFuY2U6IG51bGxcblx0fSwgdGhpcyk7XG59O1xuXG4vKipcbiAqIFVucmVnaXN0ZXJzIGFsbCByZWdpc3RyYXRpb25zIG9mIHNwZWNpZmllZCB0eXBlLlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVHlwZSBuYW1lLlxuICovXG5TZXJ2aWNlTG9jYXRvci5wcm90b3R5cGUudW5yZWdpc3RlciA9IGZ1bmN0aW9uICh0eXBlKSB7XG5cdHRocm93SWZOb3RTdHJpbmcodHlwZSk7XG5cdGRlbGV0ZSB0aGlzLl9yZWdpc3RyYXRpb25zW3R5cGVdO1xufTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyByZWdpc3RyYXRpb24gYXJyYXkgZm9yIHNwZWNpZmllZCB0eXBlLlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVHlwZSBuYW1lLlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gY29udGV4dCBDb250ZXh0IG9mIGV4ZWN1dGlvbi5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVJlZ2lzdHJhdGlvbih0eXBlLCBjb250ZXh0KSB7XG5cdGlmICghY29udGV4dC5fcmVnaXN0cmF0aW9ucy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuXHRcdGNvbnRleHQuX3JlZ2lzdHJhdGlvbnNbdHlwZV0gPSBbXTtcblx0fVxufVxuXG4vKipcbiAqIFRocm93cyBlcnJvciBpZiBzcGVjaWZpZWQgcmVnaXN0cmF0aW9uIGlzIG5vdCBmb3VuZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSByZWdpc3RyYXRpb25zIEN1cnJlbnQgcmVnaXN0cmF0aW9ucyBzZXQuXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUeXBlIHRvIGNoZWNrLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmTm9UeXBlKHJlZ2lzdHJhdGlvbnMsIHR5cGUpIHtcblx0aWYgKCFyZWdpc3RyYXRpb25zLmhhc093blByb3BlcnR5KHR5cGUpIHx8XG5cdFx0cmVnaXN0cmF0aW9uc1t0eXBlXS5sZW5ndGggPT09IDApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IodXRpbC5mb3JtYXQoRVJST1JfVFlQRV9OT1RfUkVHSVNURVJFRCwgdHlwZSkpO1xuXHR9XG59XG5cbi8qKlxuICogVGhyb3dzIGVycm9yIGlmIHNwZWNpZmllZCBjb25zdHJ1Y3RvciBpcyBub3QgYSBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbnN0cnVjdG9yIENvbnN0cnVjdG9yIHRvIGNoZWNrLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmTm90RnVuY3Rpb24oY29uc3RydWN0b3IpIHtcblx0aWYgKGNvbnN0cnVjdG9yIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHR0aHJvdyBuZXcgRXJyb3IoRVJST1JfQ09OU1RSVUNUT1JfU0hPVUxEX0JFX0ZVTkNUSU9OKTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgZXJyb3IgaWYgc3BlY2lmaWVkIHR5cGUgbmFtZSBpcyBub3QgYSBzdHJpbmcuXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUeXBlIG5hbWUgdG8gY2hlY2suXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZOb3RTdHJpbmcodHlwZSkge1xuXHRpZiAodHlwZW9mKHR5cGUpID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHRocm93IG5ldyBFcnJvcih1dGlsLmZvcm1hdChFUlJPUl9UWVBFX1NIT1VMRF9CRV9TVFJJTkcsIHR5cGUpKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGluc3RhbmNlIG9mIHR5cGUgc3BlY2lmaWVkIGFuZCBwYXJhbWV0ZXJzIGluIHJlZ2lzdHJhdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSByZWdpc3RyYXRpb24gU3BlY2lmaWVkIHJlZ2lzdHJhdGlvbiBvZiB0eXBlLlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gY29udGV4dCBDb250ZXh0IG9mIGV4ZWN1dGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IEluc3RhbmNlIG9mIHR5cGUgc3BlY2lmaWVkIGluIHJlZ2lzdHJhdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UocmVnaXN0cmF0aW9uLCBjb250ZXh0KSB7XG5cdGlmIChyZWdpc3RyYXRpb24uaXNTaW5nbGV0b24gJiYgcmVnaXN0cmF0aW9uLnNpbmdsZUluc3RhbmNlICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuIHJlZ2lzdHJhdGlvbi5zaW5nbGVJbnN0YW5jZTtcblx0fVxuXG5cdHZhciBpbnN0YW5jZVBhcmFtZXRlcnMgPSBnZXRQYXJhbWV0ZXJzKHJlZ2lzdHJhdGlvbiwgY29udGV4dCksXG5cdFx0aW5zdGFuY2UgPSBPYmplY3QuY3JlYXRlKHJlZ2lzdHJhdGlvbi5jb25zdHJ1Y3Rvci5wcm90b3R5cGUpO1xuXHRyZWdpc3RyYXRpb24uY29uc3RydWN0b3IuYXBwbHkoaW5zdGFuY2UsIGluc3RhbmNlUGFyYW1ldGVycyk7XG5cblx0aWYgKHJlZ2lzdHJhdGlvbi5pc1NpbmdsZXRvbikge1xuXHRcdHJlZ2lzdHJhdGlvbi5zaW5nbGVJbnN0YW5jZSA9IGluc3RhbmNlO1xuXHR9XG5cblx0cmV0dXJuIGluc3RhbmNlO1xufVxuXG4vKipcbiAqIEdldHMgY29uc3RydWN0b3IgcGFyYW1ldGVycyBzcGVjaWZpZWQgaW4gdHlwZSBjb25zdHJ1Y3Rvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSByZWdpc3RyYXRpb24gVHlwZSByZWdpc3RyYXRpb24uXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSBjb250ZXh0IENvbnRleHQgb2YgZXhlY3V0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBBcnJheSBvZiByZXNvbHZlZCBkZXBlbmRlbmNpZXMgdG8gaW5qZWN0LlxuICovXG5mdW5jdGlvbiBnZXRQYXJhbWV0ZXJzKHJlZ2lzdHJhdGlvbiwgY29udGV4dCkge1xuXHRyZXR1cm4gcmVnaXN0cmF0aW9uLnBhcmFtZXRlck5hbWVzLm1hcChmdW5jdGlvbiAocGFyYW1ldGVyTmFtZSkge1xuXHRcdHZhciBkZXBlbmRlbmN5TmFtZSA9IGdldERlcGVuZGVuY3lOYW1lKHBhcmFtZXRlck5hbWUpO1xuXHRcdHJldHVybiBkZXBlbmRlbmN5TmFtZSA9PT0gbnVsbCA/XG5cdFx0XHRyZWdpc3RyYXRpb24ucGFyYW1ldGVyc1twYXJhbWV0ZXJOYW1lXSA6XG5cdFx0XHR0aGlzLnJlc29sdmUoZGVwZW5kZW5jeU5hbWUpO1xuXHR9LCBjb250ZXh0KTtcbn1cblxuLyoqXG4gKiBHZXRzIG5hbWUgb2YgZGVwZW5kZW5jeSB0eXBlLlxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtZXRlck5hbWUgTmFtZSBvZiBjb25zdHJ1Y3RvciBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IE5hbWUgb2YgZGVwZW5kZW5jeSB0eXBlLlxuICovXG5mdW5jdGlvbiBnZXREZXBlbmRlbmN5TmFtZShwYXJhbWV0ZXJOYW1lKSB7XG5cdGlmICghREVQRU5ERU5DWV9SRUdFWFAudGVzdChwYXJhbWV0ZXJOYW1lKSkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0cmV0dXJuIHBhcmFtZXRlck5hbWUuc3Vic3RyKDEsIHBhcmFtZXRlck5hbWUubGVuZ3RoIC0gMSk7XG59XG5cbi8qKlxuICogR2V0cyBhbGwgcGFyYW1ldGVyIG5hbWVzIHVzZWQgaW4gY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25zdHJ1Y3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheTxzdHJpbmc+fSBBcnJheSBvZiBwYXJhbWV0ZXIgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGdldFBhcmFtZXRlck5hbWVzKGNvbnN0cnVjdG9yKSB7XG5cdHZhciBzb3VyY2UgPSBjb25zdHJ1Y3Rvci50b1N0cmluZygpLFxuXHRcdHRva2VuaXplciA9IG5ldyBDb25zdHJ1Y3RvclRva2VuaXplcihzb3VyY2UpLFxuXHRcdHJlc3VsdCA9IFtdLFxuXHRcdHRva2VuID0ge1xuXHRcdFx0c3RhdGU6IENvbnN0cnVjdG9yVG9rZW5pemVyLlNUQVRFUy5OTyxcblx0XHRcdHN0YXJ0OiAwLFxuXHRcdFx0ZW5kOiAwXG5cdFx0fSxcblx0XHRhcmVQYXJhbWV0ZXJzU3RhcnRlZCA9IGZhbHNlO1xuXG5cdHdoaWxlIChcblx0XHR0b2tlbi5zdGF0ZSAhPT0gQ29uc3RydWN0b3JUb2tlbml6ZXIuU1RBVEVTLkVORCAmJlxuXHRcdHRva2VuLnN0YXRlICE9PSBDb25zdHJ1Y3RvclRva2VuaXplci5TVEFURVMuSUxMRUdBTCkge1xuXHRcdHRva2VuID0gdG9rZW5pemVyLm5leHQoKTtcblx0XHRpZiAodG9rZW4uc3RhdGUgPT09IENvbnN0cnVjdG9yVG9rZW5pemVyLlNUQVRFUy5QQVJFTlRIRVNFU19PUEVOKSB7XG5cdFx0XHRhcmVQYXJhbWV0ZXJzU3RhcnRlZCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKGFyZVBhcmFtZXRlcnNTdGFydGVkICYmXG5cdFx0XHR0b2tlbi5zdGF0ZSA9PT0gQ29uc3RydWN0b3JUb2tlbml6ZXIuU1RBVEVTLklERU5USUZJRVIpIHtcblx0XHRcdHJlc3VsdC5wdXNoKHNvdXJjZS5zdWJzdHJpbmcodG9rZW4uc3RhcnQsIHRva2VuLmVuZCkpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xuXG59IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gVUhSO1xuXG52YXIgVUhSQmFzZSA9IHJlcXVpcmUoJy4uL2xpYi9VSFJCYXNlJyksXG5cdFByb21pc2UgPSByZXF1aXJlKCdwcm9taXNlJyksXG5cdFVSSSA9IHJlcXVpcmUoJ2NhdGJlcnJ5LXVyaScpLlVSSSxcblx0dXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcblxuLy8gaWYgYnJvd3NlciBzdGlsbCBkb2VzIG5vdCBoYXZlIHByb21pc2VzIHRoZW4gYWRkIGl0LlxuaWYgKCEoJ1Byb21pc2UnIGluIHdpbmRvdykpIHtcblx0d2luZG93LlByb21pc2UgPSBQcm9taXNlO1xufVxuXG51dGlsLmluaGVyaXRzKFVIUiwgVUhSQmFzZSk7XG5cbnZhciBOT05fU0FGRV9IRUFERVJTID0ge1xuXHRjb29raWU6IHRydWUsXG5cdCdhY2NlcHQtY2hhcnNldCc6IHRydWVcbn07XG5cbnZhciBFUlJPUl9DT05ORUNUSU9OID0gJ0Nvbm5lY3Rpb24gZXJyb3InLFxuXHRFUlJPUl9USU1FT1VUID0gJ1JlcXVlc3QgdGltZW91dCcsXG5cdEVSUk9SX0FCT1JURUQgPSAnUmVxdWVzdCBhYm9ydGVkJztcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiBjbGllbnQtc2lkZSBIVFRQKFMpIHJlcXVlc3QgaW1wbGVtZW50YXRpb24uXG4gKiBAcGFyYW0ge1dpbmRvd30gJHdpbmRvdyBDdXJyZW50IHdpbmRvdyBvYmplY3QuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVUhSKCR3aW5kb3cpIHtcblx0VUhSQmFzZS5jYWxsKHRoaXMpO1xuXHR0aGlzLndpbmRvdyA9ICR3aW5kb3c7XG59XG5cbi8qKlxuICogQ3VycmVudCBpbnN0YW5jZSBvZiB3aW5kb3cuXG4gKiBAdHlwZSB7V2luZG93fVxuICovXG5VSFIucHJvdG90eXBlLndpbmRvdyA9IG51bGw7XG5cbi8qKlxuICogRG9lcyByZXF1ZXN0IHdpdGggc3BlY2lmaWVkIHBhcmFtZXRlcnMgdXNpbmcgcHJvdG9jb2wgaW1wbGVtZW50YXRpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVycyBSZXF1ZXN0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFyYW1ldGVycy5tZXRob2QgSFRUUCBtZXRob2QuXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFyYW1ldGVycy51cmwgVVJMIGZvciByZXF1ZXN0LlxuICogQHBhcmFtIHtVUkl9IHBhcmFtZXRlcnMudXJpIFVSSSBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVycy5oZWFkZXJzIEhUVFAgaGVhZGVycyB0byBzZW5kLlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBwYXJhbWV0ZXJzLmRhdGEgRGF0YSB0byBzZW5kLlxuICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtZXRlcnMudGltZW91dCBSZXF1ZXN0IHRpbWVvdXQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHBhcmFtZXRlcnMudW5zYWZlSFRUUFMgSWYgdHJ1ZSB0aGVuIHJlcXVlc3RzIHRvIHNlcnZlcnMgd2l0aFxuICogaW52YWxpZCBIVFRQUyBjZXJ0aWZpY2F0ZXMgYXJlIGFsbG93ZWQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBQcm9taXNlIGZvciByZXN1bHQgd2l0aCBzdGF0dXMgb2JqZWN0IGFuZCBjb250ZW50LlxuICogQHByb3RlY3RlZFxuICovXG5VSFIucHJvdG90eXBlLl9kb1JlcXVlc3QgPSBmdW5jdGlvbiAocGFyYW1ldGVycykge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0T2JqZWN0LmtleXMocGFyYW1ldGVycy5oZWFkZXJzKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0XHRpZiAoTk9OX1NBRkVfSEVBREVSUy5oYXNPd25Qcm9wZXJ0eShuYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG5cdFx0XHRcdGRlbGV0ZSBwYXJhbWV0ZXJzLmhlYWRlcnNbbmFtZV07XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChmdWxmaWxsLCByZWplY3QpIHtcblx0XHR2YXIgcmVxdWVzdEVycm9yID0gbnVsbCxcblx0XHRcdHhociA9IG5ldyBzZWxmLndpbmRvdy5YTUxIdHRwUmVxdWVzdCgpO1xuXG5cdFx0eGhyLm9uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXF1ZXN0RXJyb3IgPSBuZXcgRXJyb3IoRVJST1JfQUJPUlRFRCk7XG5cdFx0XHRyZWplY3QocmVxdWVzdEVycm9yKTtcblx0XHR9O1xuXHRcdHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXF1ZXN0RXJyb3IgPSBuZXcgRXJyb3IoRVJST1JfVElNRU9VVCk7XG5cdFx0XHRyZWplY3QocmVxdWVzdEVycm9yKTtcblx0XHR9O1xuXHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVxdWVzdEVycm9yID0gbmV3IEVycm9yKHhoci5zdGF0dXNUZXh0IHx8IEVSUk9SX0NPTk5FQ1RJT04pO1xuXHRcdFx0cmVqZWN0KHJlcXVlc3RFcnJvcik7XG5cdFx0fTtcblx0XHR4aHIub25sb2FkZW5kID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHJlcXVlc3RFcnJvcikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgc3RhdHVzT2JqZWN0ID0gZ2V0U3RhdHVzT2JqZWN0KHhociksXG5cdFx0XHRcdGNvbnRlbnQgPSBzZWxmLmNvbnZlcnRSZXNwb25zZShcblx0XHRcdFx0XHRzdGF0dXNPYmplY3QuaGVhZGVycyxcblx0XHRcdFx0XHR4aHIucmVzcG9uc2VUZXh0XG5cdFx0XHRcdCk7XG5cdFx0XHRmdWxmaWxsKHtzdGF0dXM6IHN0YXR1c09iamVjdCwgY29udGVudDogY29udGVudH0pO1xuXHRcdH07XG5cblx0XHR2YXIgdXNlciA9IHBhcmFtZXRlcnMudXJpLmF1dGhvcml0eS51c2VySW5mbyA/XG5cdFx0XHRcdHBhcmFtZXRlcnMudXJpLmF1dGhvcml0eS51c2VySW5mby51c2VyIDogbnVsbCxcblx0XHRcdHBhc3N3b3JkID0gcGFyYW1ldGVycy51cmkuYXV0aG9yaXR5LnVzZXJJbmZvID9cblx0XHRcdFx0cGFyYW1ldGVycy51cmkuYXV0aG9yaXR5LnVzZXJJbmZvLnBhc3N3b3JkIDogbnVsbDtcblx0XHR4aHIub3Blbihcblx0XHRcdHBhcmFtZXRlcnMubWV0aG9kLCBwYXJhbWV0ZXJzLnVyaS50b1N0cmluZygpLCB0cnVlLFxuXHRcdFx0dXNlciB8fCB1bmRlZmluZWQsIHBhc3N3b3JkIHx8IHVuZGVmaW5lZFxuXHRcdCk7XG5cdFx0eGhyLnRpbWVvdXQgPSBwYXJhbWV0ZXJzLnRpbWVvdXQ7XG5cblx0XHRPYmplY3Qua2V5cyhwYXJhbWV0ZXJzLmhlYWRlcnMpXG5cdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoaGVhZGVyTmFtZSkge1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihcblx0XHRcdFx0XHRoZWFkZXJOYW1lLCBwYXJhbWV0ZXJzLmhlYWRlcnNbaGVhZGVyTmFtZV1cblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXG5cdFx0eGhyLnNlbmQocGFyYW1ldGVycy5kYXRhKTtcblx0fSk7XG59O1xuXG4vKipcbiAqIEdldHMgc3RhdGUgb2JqZWN0IGZvciBzcGVjaWZpZWQgalF1ZXJ5IFhIUiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdD99IHhociBYSFIgb2JqZWN0LlxuICogQHJldHVybnMge3tjb2RlOiBudW1iZXIsIHRleHQ6IHN0cmluZywgaGVhZGVyczogT2JqZWN0fX0gU3RhdHVzIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZ2V0U3RhdHVzT2JqZWN0KHhocikge1xuXHR2YXIgaGVhZGVycyA9IHt9O1xuXG5cdGlmICgheGhyKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNvZGU6IDAsXG5cdFx0XHR0ZXh0OiAnJyxcblx0XHRcdGhlYWRlcnM6IGhlYWRlcnNcblx0XHR9O1xuXHR9XG5cblx0eGhyXG5cdFx0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG5cdFx0LnNwbGl0KCdcXG4nKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChoZWFkZXIpIHtcblx0XHRcdHZhciBkZWxpbWl0ZXJJbmRleCA9IGhlYWRlci5pbmRleE9mKCc6Jyk7XG5cdFx0XHRpZiAoZGVsaW1pdGVySW5kZXggPD0gMCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgaGVhZGVyTmFtZSA9IGhlYWRlclxuXHRcdFx0XHQuc3Vic3RyaW5nKDAsIGRlbGltaXRlckluZGV4KVxuXHRcdFx0XHQudHJpbSgpXG5cdFx0XHRcdC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0aGVhZGVyc1toZWFkZXJOYW1lXSA9IGhlYWRlclxuXHRcdFx0XHQuc3Vic3RyaW5nKGRlbGltaXRlckluZGV4ICsgMSlcblx0XHRcdFx0LnRyaW0oKTtcblx0XHR9KTtcblxuXHRyZXR1cm4ge1xuXHRcdGNvZGU6IHhoci5zdGF0dXMsXG5cdFx0dGV4dDogeGhyLnN0YXR1c1RleHQsXG5cdFx0aGVhZGVyczogaGVhZGVyc1xuXHR9O1xufSIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgVUhSID0gcmVxdWlyZSgnLi9saWIvVUhSJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHQvKipcblx0ICogUmVnaXN0ZXJzIFVIUiBpbiBzZXJ2ZXItc2lkZSBzZXJ2aWNlIGxvY2F0b3IuXG5cdCAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9IGxvY2F0b3IgQ2F0YmVycnkncyBzZXJ2aWNlIGxvY2F0b3IuXG5cdCAqL1xuXHRyZWdpc3RlcjogZnVuY3Rpb24gKGxvY2F0b3IpIHtcblx0XHR2YXIgY29uZmlnID0gbG9jYXRvci5yZXNvbHZlKCdjb25maWcnKTtcblx0XHRsb2NhdG9yLnJlZ2lzdGVyKCd1aHInLCBVSFIsIGNvbmZpZywgdHJ1ZSk7XG5cdH0sXG5cdFVIUjogVUhSXG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVIUkJhc2U7XG5cbnZhciBjYXRiZXJyeVVyaSA9IHJlcXVpcmUoJ2NhdGJlcnJ5LXVyaScpLFxuXHRRdWVyeSA9IGNhdGJlcnJ5VXJpLlF1ZXJ5LFxuXHRVUkkgPSBjYXRiZXJyeVVyaS5VUkk7XG5cbnZhciBFUlJPUl9VTlNVUFBPUlRFRF9QUk9UT0NPTCA9ICdQcm90b2NvbCBpcyB1bnN1cHBvcnRlZCcsXG5cdEVSUk9SX1BBUkFNRVRFUlNfU0hPVUxEX0JFX09CSkVDVCA9ICdSZXF1ZXN0IHBhcmFtZXRlcnMgc2hvdWxkIGJlIG9iamVjdCcsXG5cdEVSUk9SX1VSTF9JU19SRVFVSVJFRCA9ICdVUkwgaXMgcmVxdWlyZWQgcGFyYW1ldGVyJyxcblx0RVJST1JfTUVUSE9EX0lTX1JFUVVJUkVEID0gJ1JlcXVlc3QgbWV0aG9kIGlzIHJlcXVpcmVkIHBhcmFtZXRlcicsXG5cdEVSUk9SX0hPU1RfSVNfUkVRVUlSRUQgPSAnSG9zdCBpbiBVUkwgaXMgcmVxdWlyZWQnLFxuXHRFUlJPUl9TQ0hFTUVfSVNfUkVRVUlSRUQgPSAnU2NoZW1lIGluIFVSTCBpcyByZXF1aXJlZCcsXG5cdEVSUk9SX1RJTUVPVVRfU0hPVUxEX0JFX05VTUJFUiA9ICdUaW1lb3V0IHNob3VsZCBiZSBhIG51bWJlcicsXG5cdERFRkFVTFRfVElNRU9VVCA9IDMwMDAwLFxuXHRIVFRQX1BST1RPQ09MX1JFR0VYUCA9IC9eKGh0dHApcz8kL2k7XG5cbnZhciBNRVRIT0RTID0ge1xuXHRHRVQ6ICdHRVQnLFxuXHRIRUFEOiAnSEVBRCcsXG5cdFBPU1Q6ICdQT1NUJyxcblx0UFVUOiAnUFVUJyxcblx0UEFUQ0g6ICdQQVRDSCcsXG5cdERFTEVURTogJ0RFTEVURScsXG5cdE9QVElPTlM6ICdPUFRJT05TJyxcblx0VFJBQ0U6ICdUUkFDRScsXG5cdENPTk5FQ1Q6ICdDT05ORUNUJ1xufTtcblxuVUhSQmFzZS5UWVBFUyA9IHtcblx0VVJMX0VOQ09ERUQ6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuXHRKU09OOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFBMQUlOX1RFWFQ6ICd0ZXh0L3BsYWluJyxcblx0SFRNTDogJ3RleHQvaHRtbCdcbn07XG5cblVIUkJhc2UuQ0hBUlNFVCA9ICdVVEYtOCc7XG5cblVIUkJhc2UuREVGQVVMVF9HRU5FUkFMX0hFQURFUlMgPSB7XG5cdEFjY2VwdDogVUhSQmFzZS5UWVBFUy5KU09OICsgJzsgcT0wLjcsICcgK1xuXHRcdFVIUkJhc2UuVFlQRVMuSFRNTCArICc7IHE9MC4yLCAnICtcblx0XHRVSFJCYXNlLlRZUEVTLlBMQUlOX1RFWFQgKyAnOyBxPTAuMScsXG5cdCdBY2NlcHQtQ2hhcnNldCc6IFVIUkJhc2UuQ0hBUlNFVCArICc7IHE9MSdcbn07XG5cblVIUkJhc2UuQ0hBUlNFVF9QQVJBTUVURVIgPSAnOyBjaGFyc2V0PScgKyBVSFJCYXNlLkNIQVJTRVQ7XG5VSFJCYXNlLlVSTF9FTkNPREVEX0VOVElUWV9DT05URU5UX1RZUEUgPSBVSFJCYXNlLlRZUEVTLlVSTF9FTkNPREVEICtcblx0VUhSQmFzZS5DSEFSU0VUX1BBUkFNRVRFUjtcblxuVUhSQmFzZS5KU09OX0VOVElUWV9DT05URU5UX1RZUEUgPSBVSFJCYXNlLlRZUEVTLkpTT04gK1xuXHRVSFJCYXNlLkNIQVJTRVRfUEFSQU1FVEVSO1xuXG5VSFJCYXNlLlBMQUlOX1RFWFRfRU5USVRZX0NPTlRFTlRfVFlQRSA9IFVIUkJhc2UuVFlQRVMuUExBSU5fVEVYVCArXG5cdFVIUkJhc2UuQ0hBUlNFVF9QQVJBTUVURVI7XG5cbi8vIFRoaXMgbW9kdWxlIHdlcmUgZGV2ZWxvcGVkIHVzaW5nIEhUVFAvMS4xdjIgUkZDIDI2MTZcbi8vIChodHRwOi8vd3d3LnczLm9yZy9Qcm90b2NvbHMvcmZjMjYxNi8pXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIEJhc2ljIFVuaXZlcnNhbCBIVFRQKFMpIFJlcXVlc3QgaW1wbGVtZW50YXRpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVUhSQmFzZSgpIHtcblxufVxuXG4vKipcbiAqIERvZXMgR0VUIHJlcXVlc3QgdG8gSFRUUCBzZXJ2ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFVSTCB0byByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3Q/fSBvcHRpb25zIFJlcXVlc3QgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7T2JqZWN0P30gb3B0aW9ucy5oZWFkZXJzIEhUVFAgaGVhZGVycyB0byBzZW5kLlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0P30gb3B0aW9ucy5kYXRhIERhdGEgdG8gc2VuZC5cbiAqIEBwYXJhbSB7TnVtYmVyP30gb3B0aW9ucy50aW1lb3V0IFJlcXVlc3QgdGltZW91dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbj99IG9wdGlvbnMudW5zYWZlSFRUUFMgSWYgdHJ1ZSB0aGVuIHJlcXVlc3RzIHRvIHNlcnZlcnMgd2l0aFxuICogaW52YWxpZCBIVFRQUyBjZXJ0aWZpY2F0ZXMgYXJlIGFsbG93ZWQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBQcm9taXNlIGZvciByZXN1bHQgd2l0aCBzdGF0dXMgb2JqZWN0IGFuZCBjb250ZW50LlxuICovXG5VSFJCYXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHR2YXIgcGFyYW1ldGVycyA9IE9iamVjdC5jcmVhdGUob3B0aW9ucyk7XG5cdHBhcmFtZXRlcnMubWV0aG9kID0gTUVUSE9EUy5HRVQ7XG5cdHBhcmFtZXRlcnMudXJsID0gdXJsO1xuXHRyZXR1cm4gdGhpcy5yZXF1ZXN0KHBhcmFtZXRlcnMpO1xufTtcblxuLyoqXG4gKiBEb2VzIFBPU1QgcmVxdWVzdCB0byBIVFRQIHNlcnZlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVVJMIHRvIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdD99IG9wdGlvbnMgUmVxdWVzdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtPYmplY3Q/fSBvcHRpb25zLmhlYWRlcnMgSFRUUCBoZWFkZXJzIHRvIHNlbmQuXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3Q/fSBvcHRpb25zLmRhdGEgRGF0YSB0byBzZW5kLlxuICogQHBhcmFtIHtOdW1iZXI/fSBvcHRpb25zLnRpbWVvdXQgUmVxdWVzdCB0aW1lb3V0LlxuICogQHBhcmFtIHtCb29sZWFuP30gb3B0aW9ucy51bnNhZmVIVFRQUyBJZiB0cnVlIHRoZW4gcmVxdWVzdHMgdG8gc2VydmVycyB3aXRoXG4gKiBpbnZhbGlkIEhUVFBTIGNlcnRpZmljYXRlcyBhcmUgYWxsb3dlZC5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFByb21pc2UgZm9yIHJlc3VsdCB3aXRoIHN0YXR1cyBvYmplY3QgYW5kIGNvbnRlbnQuXG4gKi9cblVIUkJhc2UucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHR2YXIgcGFyYW1ldGVycyA9IE9iamVjdC5jcmVhdGUob3B0aW9ucyk7XG5cdHBhcmFtZXRlcnMubWV0aG9kID0gTUVUSE9EUy5QT1NUO1xuXHRwYXJhbWV0ZXJzLnVybCA9IHVybDtcblx0cmV0dXJuIHRoaXMucmVxdWVzdChwYXJhbWV0ZXJzKTtcbn07XG5cbi8qKlxuICogRG9lcyBQVVQgcmVxdWVzdCB0byBIVFRQIHNlcnZlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVVJMIHRvIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdD99IG9wdGlvbnMgUmVxdWVzdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtPYmplY3Q/fSBvcHRpb25zLmhlYWRlcnMgSFRUUCBoZWFkZXJzIHRvIHNlbmQuXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3Q/fSBvcHRpb25zLmRhdGEgRGF0YSB0byBzZW5kLlxuICogQHBhcmFtIHtOdW1iZXI/fSBvcHRpb25zLnRpbWVvdXQgUmVxdWVzdCB0aW1lb3V0LlxuICogQHBhcmFtIHtCb29sZWFuP30gb3B0aW9ucy51bnNhZmVIVFRQUyBJZiB0cnVlIHRoZW4gcmVxdWVzdHMgdG8gc2VydmVycyB3aXRoXG4gKiBpbnZhbGlkIEhUVFBTIGNlcnRpZmljYXRlcyBhcmUgYWxsb3dlZC5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFByb21pc2UgZm9yIHJlc3VsdCB3aXRoIHN0YXR1cyBvYmplY3QgYW5kIGNvbnRlbnQuXG4gKi9cblVIUkJhc2UucHJvdG90eXBlLnB1dCA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdHZhciBwYXJhbWV0ZXJzID0gT2JqZWN0LmNyZWF0ZShvcHRpb25zKTtcblx0cGFyYW1ldGVycy5tZXRob2QgPSBNRVRIT0RTLlBVVDtcblx0cGFyYW1ldGVycy51cmwgPSB1cmw7XG5cdHJldHVybiB0aGlzLnJlcXVlc3QocGFyYW1ldGVycyk7XG59O1xuXG4vKipcbiAqIERvZXMgUEFUQ0ggcmVxdWVzdCB0byBIVFRQIHNlcnZlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVVJMIHRvIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdD99IG9wdGlvbnMgUmVxdWVzdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtPYmplY3Q/fSBvcHRpb25zLmhlYWRlcnMgSFRUUCBoZWFkZXJzIHRvIHNlbmQuXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3Q/fSBvcHRpb25zLmRhdGEgRGF0YSB0byBzZW5kLlxuICogQHBhcmFtIHtOdW1iZXI/fSBvcHRpb25zLnRpbWVvdXQgUmVxdWVzdCB0aW1lb3V0LlxuICogQHBhcmFtIHtCb29sZWFuP30gb3B0aW9ucy51bnNhZmVIVFRQUyBJZiB0cnVlIHRoZW4gcmVxdWVzdHMgdG8gc2VydmVycyB3aXRoXG4gKiBpbnZhbGlkIEhUVFBTIGNlcnRpZmljYXRlcyBhcmUgYWxsb3dlZC5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFByb21pc2UgZm9yIHJlc3VsdCB3aXRoIHN0YXR1cyBvYmplY3QgYW5kIGNvbnRlbnQuXG4gKi9cblVIUkJhc2UucHJvdG90eXBlLnBhdGNoID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0dmFyIHBhcmFtZXRlcnMgPSBPYmplY3QuY3JlYXRlKG9wdGlvbnMpO1xuXHRwYXJhbWV0ZXJzLm1ldGhvZCA9IE1FVEhPRFMuUEFUQ0g7XG5cdHBhcmFtZXRlcnMudXJsID0gdXJsO1xuXHRyZXR1cm4gdGhpcy5yZXF1ZXN0KHBhcmFtZXRlcnMpO1xufTtcblxuLyoqXG4gKiBEb2VzIERFTEVURSByZXF1ZXN0IHRvIEhUVFAgc2VydmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBVUkwgdG8gcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0P30gb3B0aW9ucyBSZXF1ZXN0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge09iamVjdD99IG9wdGlvbnMuaGVhZGVycyBIVFRQIGhlYWRlcnMgdG8gc2VuZC5cbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdD99IG9wdGlvbnMuZGF0YSBEYXRhIHRvIHNlbmQuXG4gKiBAcGFyYW0ge051bWJlcj99IG9wdGlvbnMudGltZW91dCBSZXF1ZXN0IHRpbWVvdXQuXG4gKiBAcGFyYW0ge0Jvb2xlYW4/fSBvcHRpb25zLnVuc2FmZUhUVFBTIElmIHRydWUgdGhlbiByZXF1ZXN0cyB0byBzZXJ2ZXJzIHdpdGhcbiAqIGludmFsaWQgSFRUUFMgY2VydGlmaWNhdGVzIGFyZSBhbGxvd2VkLlxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gUHJvbWlzZSBmb3IgcmVzdWx0IHdpdGggc3RhdHVzIG9iamVjdCBhbmQgY29udGVudC5cbiAqL1xuVUhSQmFzZS5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuXHR2YXIgcGFyYW1ldGVycyA9IE9iamVjdC5jcmVhdGUob3B0aW9ucyk7XG5cdHBhcmFtZXRlcnMubWV0aG9kID0gTUVUSE9EUy5ERUxFVEU7XG5cdHBhcmFtZXRlcnMudXJsID0gdXJsO1xuXHRyZXR1cm4gdGhpcy5yZXF1ZXN0KHBhcmFtZXRlcnMpO1xufTtcblxuLyoqXG4gKiBEb2VzIHJlcXVlc3Qgd2l0aCBzcGVjaWZpZWQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJzIFJlcXVlc3QgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbWV0ZXJzLm1ldGhvZCBIVFRQIG1ldGhvZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbWV0ZXJzLnVybCBVUkwgZm9yIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdD99IHBhcmFtZXRlcnMuaGVhZGVycyBIVFRQIGhlYWRlcnMgdG8gc2VuZC5cbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdD99IHBhcmFtZXRlcnMuZGF0YSBEYXRhIHRvIHNlbmQuXG4gKiBAcGFyYW0ge051bWJlcj99IHBhcmFtZXRlcnMudGltZW91dCBSZXF1ZXN0IHRpbWVvdXQuXG4gKiBAcGFyYW0ge0Jvb2xlYW4/fSBwYXJhbWV0ZXJzLnVuc2FmZUhUVFBTIElmIHRydWUgdGhlbiByZXF1ZXN0c1xuICogdG8gc2VydmVycyB3aXRoIGludmFsaWQgSFRUUFMgY2VydGlmaWNhdGVzIGFyZSBhbGxvd2VkLlxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gUHJvbWlzZSBmb3IgcmVzdWx0IHdpdGggc3RhdHVzIG9iamVjdCBhbmQgY29udGVudC5cbiAqL1xuVUhSQmFzZS5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIChwYXJhbWV0ZXJzKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0cmV0dXJuIHRoaXMuX3ZhbGlkYXRlUmVxdWVzdChwYXJhbWV0ZXJzKVxuXHRcdC50aGVuKGZ1bmN0aW9uICh2YWxpZGF0ZWQpIHtcblx0XHRcdHJldHVybiBzZWxmLl9kb1JlcXVlc3QodmFsaWRhdGVkKTtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogVmFsaWRhdGVzIFVIUiBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtPYmplY3R9IHBhcmFtZXRlcnMgUmVxdWVzdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtZXRlcnMubWV0aG9kIEhUVFAgbWV0aG9kLlxuICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtZXRlcnMudXJsIFVSTCBmb3IgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0P30gcGFyYW1ldGVycy5oZWFkZXJzIEhUVFAgaGVhZGVycyB0byBzZW5kLlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0P30gcGFyYW1ldGVycy5kYXRhIERhdGEgdG8gc2VuZC5cbiAqIEBwYXJhbSB7TnVtYmVyP30gcGFyYW1ldGVycy50aW1lb3V0IFJlcXVlc3QgdGltZW91dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbj99IHBhcmFtZXRlcnMudW5zYWZlSFRUUFMgSWYgdHJ1ZSB0aGVuIHJlcXVlc3RzXG4gKiB0byBzZXJ2ZXJzIHdpdGggaW52YWxpZCBIVFRQUyBjZXJ0aWZpY2F0ZXMgYXJlIGFsbG93ZWQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqIEBwcml2YXRlXG4gKi9cbi8qanNoaW50IG1heGNvbXBsZXhpdHk6ZmFsc2UgKi9cblVIUkJhc2UucHJvdG90eXBlLl92YWxpZGF0ZVJlcXVlc3QgPSBmdW5jdGlvbiAocGFyYW1ldGVycykge1xuXHRpZiAoIXBhcmFtZXRlcnMgfHwgdHlwZW9mKHBhcmFtZXRlcnMpICE9PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoRVJST1JfUEFSQU1FVEVSU19TSE9VTERfQkVfT0JKRUNUKSk7XG5cdH1cblxuXHR2YXIgdmFsaWRhdGVkID0gT2JqZWN0LmNyZWF0ZShwYXJhbWV0ZXJzKTtcblxuXHRpZiAodHlwZW9mKHBhcmFtZXRlcnMudXJsKSAhPT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKEVSUk9SX1VSTF9JU19SRVFVSVJFRCkpO1xuXHR9XG5cdHZhbGlkYXRlZC51cmkgPSBuZXcgVVJJKHZhbGlkYXRlZC51cmwpO1xuXHRpZiAoIXZhbGlkYXRlZC51cmkuc2NoZW1lKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihFUlJPUl9TQ0hFTUVfSVNfUkVRVUlSRUQpKTtcblx0fVxuXHRpZiAoIUhUVFBfUFJPVE9DT0xfUkVHRVhQLnRlc3QodmFsaWRhdGVkLnVyaS5zY2hlbWUpKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihFUlJPUl9VTlNVUFBPUlRFRF9QUk9UT0NPTCkpO1xuXHR9XG5cdGlmICghdmFsaWRhdGVkLnVyaS5hdXRob3JpdHkgfHwgIXZhbGlkYXRlZC51cmkuYXV0aG9yaXR5Lmhvc3QpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKEVSUk9SX0hPU1RfSVNfUkVRVUlSRUQpKTtcblx0fVxuXHRpZiAodHlwZW9mKHZhbGlkYXRlZC5tZXRob2QpICE9PSAnc3RyaW5nJyB8fFxuXHRcdCEodmFsaWRhdGVkLm1ldGhvZCBpbiBNRVRIT0RTKSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoRVJST1JfTUVUSE9EX0lTX1JFUVVJUkVEKSk7XG5cdH1cblxuXHR2YWxpZGF0ZWQudGltZW91dCA9IHZhbGlkYXRlZC50aW1lb3V0IHx8IERFRkFVTFRfVElNRU9VVDtcblx0aWYgKHR5cGVvZih2YWxpZGF0ZWQudGltZW91dCkgIT09ICdudW1iZXInKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihFUlJPUl9USU1FT1VUX1NIT1VMRF9CRV9OVU1CRVIpKTtcblx0fVxuXG5cdHZhbGlkYXRlZC5oZWFkZXJzID0gdGhpcy5fY3JlYXRlSGVhZGVycyh2YWxpZGF0ZWQuaGVhZGVycyk7XG5cblx0aWYgKCF0aGlzLl9pc1Vwc3RyZWFtUmVxdWVzdChwYXJhbWV0ZXJzLm1ldGhvZCkgJiZcblx0XHR2YWxpZGF0ZWQuZGF0YSAmJiB0eXBlb2YodmFsaWRhdGVkLmRhdGEpID09PSAnb2JqZWN0Jykge1xuXG5cdFx0dmFyIGRhdGFLZXlzID0gT2JqZWN0LmtleXModmFsaWRhdGVkLmRhdGEpO1xuXG5cdFx0aWYgKGRhdGFLZXlzLmxlbmd0aCA+IDAgJiYgIXZhbGlkYXRlZC51cmkucXVlcnkpIHtcblx0XHRcdHZhbGlkYXRlZC51cmkucXVlcnkgPSBuZXcgUXVlcnkoJycpO1xuXHRcdH1cblxuXHRcdGRhdGFLZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0dmFsaWRhdGVkLnVyaS5xdWVyeS52YWx1ZXNba2V5XSA9IHZhbGlkYXRlZC5kYXRhW2tleV07XG5cdFx0fSk7XG5cdFx0dmFsaWRhdGVkLmRhdGEgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBkYXRhQW5kSGVhZGVycyA9IHRoaXMuX2dldERhdGFUb1NlbmQoXG5cdFx0XHR2YWxpZGF0ZWQuaGVhZGVycywgdmFsaWRhdGVkLmRhdGFcblx0XHQpO1xuXHRcdHZhbGlkYXRlZC5oZWFkZXJzID0gZGF0YUFuZEhlYWRlcnMuaGVhZGVycztcblx0XHR2YWxpZGF0ZWQuZGF0YSA9IGRhdGFBbmRIZWFkZXJzLmRhdGE7XG5cdH1cblxuXHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbGlkYXRlZCk7XG59O1xuXG4vKipcbiAqIEdldHMgZGF0YSBmb3Igc2VuZGluZyB2aWEgSFRUUCByZXF1ZXN0IHVzaW5nIENvbnRlbnQgVHlwZSBIVFRQIGhlYWRlci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBoZWFkZXJzIEhUVFAgaGVhZGVycy5cbiAqIEBwYXJhbSB7T2JqZWN0fHN0cmluZ30gZGF0YSBEYXRhIHRvIHNlbmQuXG4gKiBAcmV0dXJucyB7e2hlYWRlcnM6IE9iamVjdCwgZGF0YTogT2JqZWN0fFN0cmluZ319IERhdGEgYW5kIGhlYWRlcnMgdG8gc2VuZC5cbiAqIEBwcml2YXRlXG4gKi9cblVIUkJhc2UucHJvdG90eXBlLl9nZXREYXRhVG9TZW5kID0gZnVuY3Rpb24gKGhlYWRlcnMsIGRhdGEpIHtcblx0dmFyIGZvdW5kID0gZmluZENvbnRlbnRUeXBlKGhlYWRlcnMpLFxuXHRcdGNvbnRlbnRUeXBlSGVhZGVyID0gZm91bmQubmFtZSxcblx0XHRjb250ZW50VHlwZSA9IGZvdW5kLnR5cGU7XG5cblx0aWYgKCFkYXRhIHx8IHR5cGVvZihkYXRhKSAhPT0gJ29iamVjdCcpIHtcblx0XHRkYXRhID0gZGF0YSA/IFN0cmluZyhkYXRhKSA6ICcnO1xuXHRcdGlmICghY29udGVudFR5cGUpIHtcblx0XHRcdGhlYWRlcnNbY29udGVudFR5cGVIZWFkZXJdID0gVUhSQmFzZS5QTEFJTl9URVhUX0VOVElUWV9DT05URU5UX1RZUEU7XG5cdFx0fVxuXHRcdHJldHVybiB7XG5cdFx0XHRoZWFkZXJzOiBoZWFkZXJzLFxuXHRcdFx0ZGF0YTogZGF0YVxuXHRcdH07XG5cdH1cblxuXHRpZiAoY29udGVudFR5cGUgPT09IFVIUkJhc2UuVFlQRVMuSlNPTikge1xuXHRcdHJldHVybiB7XG5cdFx0XHRoZWFkZXJzOiBoZWFkZXJzLFxuXHRcdFx0ZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcblx0XHR9O1xuXHR9XG5cblx0Ly8gb3RoZXJ3aXNlIG9iamVjdCB3aWxsIGJlIHNlbnQgd2l0aFxuXHQvLyBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcblx0aGVhZGVyc1tjb250ZW50VHlwZUhlYWRlcl0gPSBVSFJCYXNlLlVSTF9FTkNPREVEX0VOVElUWV9DT05URU5UX1RZUEU7XG5cblx0dmFyIHF1ZXJ5ID0gbmV3IFF1ZXJ5KCk7XG5cdHF1ZXJ5LnZhbHVlcyA9IGRhdGE7XG5cdHJldHVybiB7XG5cdFx0aGVhZGVyczogaGVhZGVycyxcblx0XHRkYXRhOiBxdWVyeS50b1N0cmluZygpXG5cdFx0XHQucmVwbGFjZSgnKycsICclMkInKVxuXHRcdFx0LnJlcGxhY2UoJyUyMCcsICcrJylcblx0fTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBIVFRQIGhlYWRlcnMgZm9yIHJlcXVlc3QgdXNpbmcgZGVmYXVsdHMgYW5kIGN1cnJlbnQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJIZWFkZXJzIEhUVFAgaGVhZGVycyBvZiBVSFIuXG4gKiBAcHJvdGVjdGVkXG4gKi9cblVIUkJhc2UucHJvdG90eXBlLl9jcmVhdGVIZWFkZXJzID0gZnVuY3Rpb24gKHBhcmFtZXRlckhlYWRlcnMpIHtcblx0aWYgKCFwYXJhbWV0ZXJIZWFkZXJzIHx8IHR5cGVvZihwYXJhbWV0ZXJIZWFkZXJzKSAhPT0gJ29iamVjdCcpIHtcblx0XHRwYXJhbWV0ZXJIZWFkZXJzID0ge307XG5cdH1cblx0dmFyIGhlYWRlcnMgPSB7fTtcblxuXHRPYmplY3Qua2V5cyhVSFJCYXNlLkRFRkFVTFRfR0VORVJBTF9IRUFERVJTKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChoZWFkZXJOYW1lKSB7XG5cdFx0XHRoZWFkZXJzW2hlYWRlck5hbWVdID0gVUhSQmFzZS5ERUZBVUxUX0dFTkVSQUxfSEVBREVSU1toZWFkZXJOYW1lXTtcblx0XHR9KTtcblxuXHRPYmplY3Qua2V5cyhwYXJhbWV0ZXJIZWFkZXJzKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChoZWFkZXJOYW1lKSB7XG5cdFx0XHRpZiAocGFyYW1ldGVySGVhZGVyc1toZWFkZXJOYW1lXSA9PT0gbnVsbCB8fFxuXHRcdFx0XHRwYXJhbWV0ZXJIZWFkZXJzW2hlYWRlck5hbWVdID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0ZGVsZXRlIGhlYWRlcnNbaGVhZGVyTmFtZV07XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGhlYWRlcnNbaGVhZGVyTmFtZV0gPSBwYXJhbWV0ZXJIZWFkZXJzW2hlYWRlck5hbWVdO1xuXHRcdH0pO1xuXG5cdHJldHVybiBoZWFkZXJzO1xufTtcblxuLyoqXG4gKiBEb2VzIHJlcXVlc3Qgd2l0aCBzcGVjaWZpZWQgcGFyYW1ldGVycyB1c2luZyBwcm90b2NvbCBpbXBsZW1lbnRhdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJzIFJlcXVlc3QgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbWV0ZXJzLm1ldGhvZCBIVFRQIG1ldGhvZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbWV0ZXJzLnVybCBVUkwgZm9yIHJlcXVlc3QuXG4gKiBAcGFyYW0ge1VSSX0gcGFyYW1ldGVycy51cmkgVVJJIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJzLmhlYWRlcnMgSFRUUCBoZWFkZXJzIHRvIHNlbmQuXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHBhcmFtZXRlcnMuZGF0YSBEYXRhIHRvIHNlbmQuXG4gKiBAcGFyYW0ge051bWJlcn0gcGFyYW1ldGVycy50aW1lb3V0IFJlcXVlc3QgdGltZW91dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gcGFyYW1ldGVycy51bnNhZmVIVFRQUyBJZiB0cnVlIHRoZW4gcmVxdWVzdHMgdG8gc2VydmVycyB3aXRoXG4gKiBpbnZhbGlkIEhUVFBTIGNlcnRpZmljYXRlcyBhcmUgYWxsb3dlZC5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFByb21pc2UgZm9yIHJlc3VsdCB3aXRoIHN0YXR1cyBvYmplY3QgYW5kIGNvbnRlbnQuXG4gKiBAcHJvdGVjdGVkXG4gKiBAYWJzdHJhY3RcbiAqL1xuVUhSQmFzZS5wcm90b3R5cGUuX2RvUmVxdWVzdCA9IGZ1bmN0aW9uIChwYXJhbWV0ZXJzKSB7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHJlc3BvbnNlIGRhdGEgYWNjb3JkaW5nIGNvbnRlbnQgdHlwZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBoZWFkZXJzIEhUVFAgaGVhZGVycy5cbiAqIEBwYXJhbSB7c3RyaW5nfSByZXNwb25zZURhdGEgRGF0YSBmcm9tIHJlc3BvbnNlLlxuICogQHJldHVybnMge3N0cmluZ3xPYmplY3R9IENvbnZlcnRlZCBkYXRhLlxuICovXG5VSFJCYXNlLnByb3RvdHlwZS5jb252ZXJ0UmVzcG9uc2UgPSBmdW5jdGlvbiAoaGVhZGVycywgcmVzcG9uc2VEYXRhKSB7XG5cdGlmICh0eXBlb2YocmVzcG9uc2VEYXRhKSAhPT0gJ3N0cmluZycpIHtcblx0XHRyZXNwb25zZURhdGEgPSAnJztcblx0fVxuXHR2YXIgZm91bmQgPSBmaW5kQ29udGVudFR5cGUoaGVhZGVycyksXG5cdFx0Y29udGVudFR5cGUgPSBmb3VuZC50eXBlIHx8IFVIUkJhc2UuVFlQRVMuUExBSU5fVEVYVDtcblxuXHRzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG5cdFx0Y2FzZSBVSFJCYXNlLlRZUEVTLkpTT046XG5cdFx0XHR2YXIganNvbjtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGpzb24gPSBKU09OLnBhcnNlKHJlc3BvbnNlRGF0YSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdC8vIG5vdGhpbmcgdG8gZG9cblx0XHRcdH1cblx0XHRcdHJldHVybiBqc29uIHx8IHt9O1xuXHRcdGNhc2UgVUhSQmFzZS5UWVBFUy5VUkxfRU5DT0RFRDpcblx0XHRcdHZhciBvYmplY3Q7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2YXIgcXVlcnkgPSBuZXcgUXVlcnkocmVzcG9uc2VEYXRhLnJlcGxhY2UoJysnLCAnJTIwJykpO1xuXHRcdFx0XHRvYmplY3QgPSBxdWVyeS52YWx1ZXM7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdC8vIG5vdGhpbmcgdG8gZG9cblx0XHRcdH1cblx0XHRcdHJldHVybiBvYmplY3QgfHwge307XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiByZXNwb25zZURhdGE7XG5cdH1cbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpcyBjdXJyZW50IHF1ZXJ5IG5lZWRzIHRvIHVzZSB1cHN0cmVhbS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgSFRUUCBtZXRob2QuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gSXMgY3VycmVudCBIVFRQIG1ldGhvZCBtZWFucyB1cHN0cmVhbSB1c2FnZS5cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuVUhSQmFzZS5wcm90b3R5cGUuX2lzVXBzdHJlYW1SZXF1ZXN0ID0gZnVuY3Rpb24gKG1ldGhvZCkge1xuXHRyZXR1cm4gKFxuXHRcdG1ldGhvZCA9PT0gTUVUSE9EUy5QT1NUIHx8XG5cdFx0bWV0aG9kID09PSBNRVRIT0RTLlBVVCB8fFxuXHRcdG1ldGhvZCA9PT0gTUVUSE9EUy5QQVRDSFxuXHRcdCk7XG59O1xuXG4vKipcbiAqIEZpbmRzIGNvbnRlbnQgdHlwZSBoZWFkZXIgaW4gaGVhZGVycyBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gaGVhZGVycyBIVFRQIGhlYWRlcnMuXG4gKiBAcmV0dXJucyB7e25hbWU6IFN0cmluZywgdHlwZTogU3RyaW5nfX0gTmFtZSBvZiBoZWFkZXIgYW5kIGNvbnRlbnQgdHlwZS5cbiAqL1xuZnVuY3Rpb24gZmluZENvbnRlbnRUeXBlKGhlYWRlcnMpIHtcblx0dmFyIGNvbnRlbnRUeXBlU3RyaW5nID0gJycsXG5cdFx0Y29udGVudFR5cGVIZWFkZXIgPSAnQ29udGVudC1UeXBlJztcblxuXHRPYmplY3Qua2V5cyhoZWFkZXJzKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdGlmIChrZXkudG9Mb3dlckNhc2UoKSAhPT0gJ2NvbnRlbnQtdHlwZScpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Y29udGVudFR5cGVIZWFkZXIgPSBrZXk7XG5cdFx0XHRjb250ZW50VHlwZVN0cmluZyA9IGhlYWRlcnNba2V5XTtcblx0XHR9KTtcblxuXHR2YXIgdHlwZUFuZFBhcmFtZXRlcnMgPSBjb250ZW50VHlwZVN0cmluZy5zcGxpdCgnOycpLFxuXHRcdGNvbnRlbnRUeXBlID0gdHlwZUFuZFBhcmFtZXRlcnNbMF0udG9Mb3dlckNhc2UoKTtcblx0cmV0dXJuIHtcblx0XHRuYW1lOiBjb250ZW50VHlwZUhlYWRlcixcblx0XHR0eXBlOiBjb250ZW50VHlwZVxuXHR9O1xufSIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0VVJJOiByZXF1aXJlKCcuL2xpYi9VUkknKSxcblx0QXV0aG9yaXR5OiByZXF1aXJlKCcuL2xpYi9BdXRob3JpdHknKSxcblx0VXNlckluZm86IHJlcXVpcmUoJy4vbGliL1VzZXJJbmZvJyksXG5cdFF1ZXJ5OiByZXF1aXJlKCcuL2xpYi9RdWVyeScpXG59OyIsIi8qXG4gKiBjYXRiZXJyeS11cmlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeS11cmkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5LXVyaSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF1dGhvcml0eTtcblxudmFyIFVzZXJJbmZvID0gcmVxdWlyZSgnLi9Vc2VySW5mbycpLFxuXHRwZXJjZW50RW5jb2RpbmdIZWxwZXIgPSByZXF1aXJlKCcuL3BlcmNlbnRFbmNvZGluZ0hlbHBlcicpO1xuXG52YXIgUE9SVF9SRUdFWFAgPSAvXlxcZCskLyxcblx0RVJST1JfUE9SVCA9ICdVUkkgYXV0aG9yaXR5IHBvcnQgbXVzdCBzYXRpc2Z5IGV4cHJlc3Npb24gJyArXG5cdFx0UE9SVF9SRUdFWFAudG9TdHJpbmcoKTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiBVUkkgYXV0aG9yaXR5IGNvbXBvbmVudCBwYXJzZXIuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuMlxuICogQHBhcmFtIHtTdHJpbmc/fSBhdXRob3JpdHlTdHJpbmcgVVJJIGF1dGhvcml0eSBjb21wb25lbnQgc3RyaW5nLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEF1dGhvcml0eShhdXRob3JpdHlTdHJpbmcpIHtcblx0aWYgKHR5cGVvZihhdXRob3JpdHlTdHJpbmcpID09PSAnc3RyaW5nJyAmJiBhdXRob3JpdHlTdHJpbmcubGVuZ3RoID4gMCkge1xuXHRcdHZhciBmaXJzdEF0SW5kZXggPSBhdXRob3JpdHlTdHJpbmcuaW5kZXhPZignQCcpO1xuXHRcdGlmIChmaXJzdEF0SW5kZXggIT09IC0xKSB7XG5cdFx0XHR2YXIgdXNlckluZm9TdHJpbmcgPSBhdXRob3JpdHlTdHJpbmcuc3Vic3RyaW5nKDAsIGZpcnN0QXRJbmRleCk7XG5cdFx0XHR0aGlzLnVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHVzZXJJbmZvU3RyaW5nKTtcblx0XHRcdGF1dGhvcml0eVN0cmluZyA9IGF1dGhvcml0eVN0cmluZy5zdWJzdHJpbmcoZmlyc3RBdEluZGV4ICsgMSk7XG5cdFx0fVxuXG5cdFx0dmFyIGxhc3RDb2xvbkluZGV4ID0gYXV0aG9yaXR5U3RyaW5nLmxhc3RJbmRleE9mKCc6Jyk7XG5cdFx0aWYgKGxhc3RDb2xvbkluZGV4ICE9PSAtMSkge1xuXHRcdFx0dmFyIHBvcnRTdHJpbmcgPSBhdXRob3JpdHlTdHJpbmcuc3Vic3RyaW5nKGxhc3RDb2xvbkluZGV4ICsgMSk7XG5cdFx0XHRpZiAobGFzdENvbG9uSW5kZXggPT09IGF1dGhvcml0eVN0cmluZy5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdHRoaXMucG9ydCA9ICcnO1xuXHRcdFx0XHRhdXRob3JpdHlTdHJpbmcgPSBhdXRob3JpdHlTdHJpbmcuc3Vic3RyaW5nKDAsIGxhc3RDb2xvbkluZGV4KTtcblx0XHRcdH1lbHNlIGlmIChQT1JUX1JFR0VYUC50ZXN0KHBvcnRTdHJpbmcpKSB7XG5cdFx0XHRcdHRoaXMucG9ydCA9IHBvcnRTdHJpbmc7XG5cdFx0XHRcdGF1dGhvcml0eVN0cmluZyA9IGF1dGhvcml0eVN0cmluZy5zdWJzdHJpbmcoMCwgbGFzdENvbG9uSW5kZXgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuaG9zdCA9IHBlcmNlbnRFbmNvZGluZ0hlbHBlci5kZWNvZGUoYXV0aG9yaXR5U3RyaW5nKTtcblx0fVxufVxuXG4vKipcbiAqIEN1cnJlbnQgdXNlciBpbmZvcm1hdGlvbi5cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy4yLjFcbiAqIEB0eXBlIHtVc2VySW5mb31cbiAqL1xuQXV0aG9yaXR5LnByb3RvdHlwZS51c2VySW5mbyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBob3N0LlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjIuMlxuICogQHR5cGUge1N0cmluZ31cbiAqL1xuQXV0aG9yaXR5LnByb3RvdHlwZS5ob3N0ID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHBvcnQuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuMi4zXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5BdXRob3JpdHkucHJvdG90eXBlLnBvcnQgPSBudWxsO1xuXG4vKipcbiAqIENsb25lcyBjdXJyZW50IGF1dGhvcml0eS5cbiAqIEByZXR1cm5zIHtBdXRob3JpdHl9IE5ldyBjbG9uZSBvZiBjdXJyZW50IG9iamVjdC5cbiAqL1xuQXV0aG9yaXR5LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIGF1dGhvcml0eSA9IG5ldyBBdXRob3JpdHkoKTtcblx0aWYgKHRoaXMudXNlckluZm8pIHtcblx0XHRhdXRob3JpdHkudXNlckluZm8gPSB0aGlzLnVzZXJJbmZvLmNsb25lKCk7XG5cdH1cblx0aWYgKHR5cGVvZih0aGlzLmhvc3QpID09PSAnc3RyaW5nJykge1xuXHRcdGF1dGhvcml0eS5ob3N0ID0gdGhpcy5ob3N0O1xuXHR9XG5cdGlmICh0eXBlb2YodGhpcy5wb3J0KSA9PT0gJ3N0cmluZycpIHtcblx0XHRhdXRob3JpdHkucG9ydCA9IHRoaXMucG9ydDtcblx0fVxuXHRyZXR1cm4gYXV0aG9yaXR5O1xufTtcblxuLyoqXG4gKiBSZWNvbWJpbmUgYWxsIGF1dGhvcml0eSBjb21wb25lbnRzIGludG8gYXV0aG9yaXR5IHN0cmluZy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEF1dGhvcml0eSBjb21wb25lbnQgc3RyaW5nLlxuICovXG5BdXRob3JpdHkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgcmVzdWx0ID0gJyc7XG5cdGlmICh0aGlzLnVzZXJJbmZvKSB7XG5cdFx0cmVzdWx0ICs9IHRoaXMudXNlckluZm8udG9TdHJpbmcoKSArICdAJztcblx0fVxuXHRpZiAodGhpcy5ob3N0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5ob3N0ICE9PSBudWxsKSB7XG5cdFx0dmFyIGhvc3QgPSBTdHJpbmcodGhpcy5ob3N0KTtcblx0XHRyZXN1bHQgKz0gcGVyY2VudEVuY29kaW5nSGVscGVyLmVuY29kZUhvc3QoaG9zdCk7XG5cdH1cblx0aWYgKHRoaXMucG9ydCAhPT0gdW5kZWZpbmVkICYmIHRoaXMucG9ydCAhPT0gbnVsbCkge1xuXHRcdHZhciBwb3J0ID0gU3RyaW5nKHRoaXMucG9ydCk7XG5cdFx0aWYgKHBvcnQubGVuZ3RoID4gMCAmJiAhUE9SVF9SRUdFWFAudGVzdChwb3J0KSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKEVSUk9SX1BPUlQpO1xuXHRcdH1cblx0XHRyZXN1bHQgKz0gJzonICsgcG9ydDtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvKlxuICogY2F0YmVycnktdXJpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnktdXJpJ3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeS11cmkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBRdWVyeTtcblxudmFyIHBlcmNlbnRFbmNvZGluZ0hlbHBlciA9IHJlcXVpcmUoJy4vcGVyY2VudEVuY29kaW5nSGVscGVyJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgVVJJIHF1ZXJ5IGNvbXBvbmVudCBwYXJzZXIuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuNFxuICogQHBhcmFtIHtTdHJpbmc/fSBxdWVyeVN0cmluZyBVUkkgcXVlcnkgY29tcG9uZW50IHN0cmluZy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBRdWVyeShxdWVyeVN0cmluZykge1xuXHRpZiAodHlwZW9mKHF1ZXJ5U3RyaW5nKSA9PT0gJ3N0cmluZycpIHtcblx0XHR0aGlzLnZhbHVlcyA9IHt9O1xuXG5cdFx0cXVlcnlTdHJpbmdcblx0XHRcdC5zcGxpdCgnJicpXG5cdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAocGFpcikge1xuXHRcdFx0XHR2YXIgcGFydHMgPSBwYWlyLnNwbGl0KCc9JyksXG5cdFx0XHRcdFx0a2V5ID0gcGVyY2VudEVuY29kaW5nSGVscGVyLmRlY29kZShwYXJ0c1swXSk7XG5cdFx0XHRcdGlmICgha2V5KSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChrZXkgaW4gdGhpcy52YWx1ZXMgJiZcblx0XHRcdFx0XHQhKHRoaXMudmFsdWVzW2tleV0gaW5zdGFuY2VvZiBBcnJheSkpIHtcblx0XHRcdFx0XHR0aGlzLnZhbHVlc1trZXldID0gW3RoaXMudmFsdWVzW2tleV1dO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHZhbHVlID0gdHlwZW9mKHBhcnRzWzFdKSA9PT0gJ3N0cmluZycgP1xuXHRcdFx0XHRcdHBlcmNlbnRFbmNvZGluZ0hlbHBlci5kZWNvZGUocGFydHNbMV0pIDogbnVsbDtcblxuXHRcdFx0XHRpZiAodGhpcy52YWx1ZXNba2V5XSBpbnN0YW5jZW9mIEFycmF5KSB7XG5cdFx0XHRcdFx0dGhpcy52YWx1ZXNba2V5XS5wdXNoKHZhbHVlKTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0dGhpcy52YWx1ZXNba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCB0aGlzKTtcblx0fVxufVxuXG4vKipcbiAqIEN1cnJlbnQgc2V0IG9mIHZhbHVlcyBvZiBxdWVyeS5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cblF1ZXJ5LnByb3RvdHlwZS52YWx1ZXMgPSBudWxsO1xuXG4vKipcbiAqIENsb25lcyBjdXJyZW50IHF1ZXJ5IHRvIGEgbmV3IG9iamVjdC5cbiAqIEByZXR1cm5zIHtRdWVyeX0gTmV3IGNsb25lIG9mIGN1cnJlbnQgb2JqZWN0LlxuICovXG5RdWVyeS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBxdWVyeSA9IG5ldyBRdWVyeSgpO1xuXHRpZiAodGhpcy52YWx1ZXMpIHtcblx0XHRxdWVyeS52YWx1ZXMgPSB7fTtcblx0XHRPYmplY3Qua2V5cyh0aGlzLnZhbHVlcylcblx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0cXVlcnkudmFsdWVzW2tleV0gPSB0aGlzLnZhbHVlc1trZXldO1xuXHRcdFx0fSwgdGhpcyk7XG5cdH1cblx0cmV0dXJuIHF1ZXJ5O1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBjdXJyZW50IHNldCBvZiBxdWVyeSB2YWx1ZXMgdG8gc3RyaW5nLlxuICogQHJldHVybnMge3N0cmluZ30gUXVlcnkgY29tcG9uZW50IHN0cmluZy5cbiAqL1xuUXVlcnkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuXHRpZiAoIXRoaXMudmFsdWVzKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0dmFyIHF1ZXJ5U3RyaW5nID0gJyc7XG5cdE9iamVjdC5rZXlzKHRoaXMudmFsdWVzKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHZhciB2YWx1ZXMgPSB0aGlzLnZhbHVlc1trZXldIGluc3RhbmNlb2YgQXJyYXkgP1xuXHRcdFx0XHR0aGlzLnZhbHVlc1trZXldIDogW3RoaXMudmFsdWVzW2tleV1dO1xuXG5cdFx0XHR2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdFx0cXVlcnlTdHJpbmcgKz0gJyYnICsgcGVyY2VudEVuY29kaW5nSGVscGVyXG5cdFx0XHRcdFx0LmVuY29kZVF1ZXJ5U3ViQ29tcG9uZW50KGtleSk7XG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhbHVlID0gU3RyaW5nKHZhbHVlKTtcblx0XHRcdFx0cXVlcnlTdHJpbmcgKz0gJz0nICtcblx0XHRcdFx0XHRwZXJjZW50RW5jb2RpbmdIZWxwZXIuZW5jb2RlUXVlcnlTdWJDb21wb25lbnQodmFsdWUpO1xuXHRcdFx0fSk7XG5cdFx0fSwgdGhpcyk7XG5cblx0cmV0dXJuIHF1ZXJ5U3RyaW5nLnJlcGxhY2UoL14mLywgJycpO1xufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBVUkk7XG5cbnZhciBBdXRob3JpdHkgPSByZXF1aXJlKCcuL0F1dGhvcml0eScpLFxuXHRwZXJjZW50RW5jb2RpbmdIZWxwZXIgPSByZXF1aXJlKCcuL3BlcmNlbnRFbmNvZGluZ0hlbHBlcicpLFxuXHRRdWVyeSA9IHJlcXVpcmUoJy4vUXVlcnknKTtcblxuXHQvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNhcHBlbmRpeC1CXG52YXIgVVJJX1BBUlNFX1JFR0VYUCA9IG5ldyBSZWdFeHAoXG5cdFx0J14oKFteOi8/I10rKTopPygvLyhbXi8/I10qKSk/KFtePyNdKikoXFxcXD8oW14jXSopKT8oIyguKikpPydcblx0KSxcblx0Ly8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjFcblx0U0NIRU1FX1JFR0VYUCA9IC9eW2Etel0rW2EtelxcZFxcK1xcLi1dKiQvaSxcblx0RVJST1JfU0NIRU1FID0gJ1VSSSBzY2hlbWUgbXVzdCBzYXRpc2Z5IGV4cHJlc3Npb24gJyArXG5cdFx0U0NIRU1FX1JFR0VYUC50b1N0cmluZygpLFxuXHRFUlJPUl9CQVNFX1NDSEVNRSA9ICdTY2hlbWUgY29tcG9uZW50IGlzIHJlcXVpcmVkIHRvIGJlIHByZXNlbnQgJyArXG5cdFx0J2luIGEgYmFzZSBVUkknO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIFVSSSBhY2NvcmRpbmcgdG8gUkZDIDM5ODYuXG4gKiBAcGFyYW0ge1N0cmluZz99IHVyaVN0cmluZyBVUkkgc3RyaW5nIHRvIHBhcnNlIGNvbXBvbmVudHMuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVVJJKHVyaVN0cmluZykge1xuXHRpZiAodHlwZW9mKHVyaVN0cmluZykgIT09ICdzdHJpbmcnKSB7XG5cdFx0dXJpU3RyaW5nID0gJyc7XG5cdH1cblxuXHQvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNhcHBlbmRpeC1CXG5cdHZhciBtYXRjaGVzID0gdXJpU3RyaW5nLm1hdGNoKFVSSV9QQVJTRV9SRUdFWFApO1xuXG5cdGlmIChtYXRjaGVzKSB7XG5cdFx0aWYgKHR5cGVvZihtYXRjaGVzWzJdKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdHRoaXMuc2NoZW1lID0gcGVyY2VudEVuY29kaW5nSGVscGVyLmRlY29kZShtYXRjaGVzWzJdKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZihtYXRjaGVzWzRdKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdHRoaXMuYXV0aG9yaXR5ID0gbmV3IEF1dGhvcml0eShtYXRjaGVzWzRdKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZihtYXRjaGVzWzVdKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdHRoaXMucGF0aCA9IHBlcmNlbnRFbmNvZGluZ0hlbHBlci5kZWNvZGUobWF0Y2hlc1s1XSk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YobWF0Y2hlc1s3XSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHR0aGlzLnF1ZXJ5ID0gbmV3IFF1ZXJ5KG1hdGNoZXNbN10pO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mKG1hdGNoZXNbOV0pID09PSAnc3RyaW5nJykge1xuXHRcdFx0dGhpcy5mcmFnbWVudCA9IHBlcmNlbnRFbmNvZGluZ0hlbHBlci5kZWNvZGUobWF0Y2hlc1s5XSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogQ3VycmVudCBVUkkgc2NoZW1lLlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjFcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cblVSSS5wcm90b3R5cGUuc2NoZW1lID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IFVSSSBhdXRob3JpdHkuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuMlxuICogQHR5cGUge0F1dGhvcml0eX1cbiAqL1xuVVJJLnByb3RvdHlwZS5hdXRob3JpdHkgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgVVJJIHBhdGguXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuM1xuICogQHR5cGUge1N0cmluZ31cbiAqL1xuVVJJLnByb3RvdHlwZS5wYXRoID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IFVSSSBxdWVyeS5cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy40XG4gKiBAdHlwZSB7UXVlcnl9XG4gKi9cblVSSS5wcm90b3R5cGUucXVlcnkgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgVVJJIGZyYWdtZW50LlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjVcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cblVSSS5wcm90b3R5cGUuZnJhZ21lbnQgPSBudWxsO1xuXG4vKipcbiAqIENvbnZlcnRzIGEgVVJJIHJlZmVyZW5jZSB0aGF0IG1pZ2h0IGJlIHJlbGF0aXZlIHRvIGEgZ2l2ZW4gYmFzZSBVUklcbiAqIGludG8gdGhlIHJlZmVyZW5jZSdzIHRhcmdldCBVUkkuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTUuMlxuICogQHBhcmFtIHtVUkl9IGJhc2VVcmkgQmFzZSBVUkkuXG4gKiBAcmV0dXJucyB7VVJJfSBSZXNvbHZlZCBVUkkuXG4gKi9cblVSSS5wcm90b3R5cGUucmVzb2x2ZVJlbGF0aXZlID0gZnVuY3Rpb24gKGJhc2VVcmkpIHtcblx0aWYgKCFiYXNlVXJpLnNjaGVtZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihFUlJPUl9CQVNFX1NDSEVNRSk7XG5cdH1cblxuXHRyZXR1cm4gdHJhbnNmb3JtUmVmZXJlbmNlKGJhc2VVcmksIHRoaXMpO1xufTtcblxuLyoqXG4gKiBDbG9uZXMgY3VycmVudCBVUkkgdG8gYSBuZXcgb2JqZWN0LlxuICogQHJldHVybnMge1VSSX0gTmV3IGNsb25lIG9mIGN1cnJlbnQgb2JqZWN0LlxuICovXG5VUkkucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgdXJpID0gbmV3IFVSSSgpO1xuXG5cdGlmICh0eXBlb2YodGhpcy5zY2hlbWUpID09PSAnc3RyaW5nJykge1xuXHRcdHVyaS5zY2hlbWUgPSB0aGlzLnNjaGVtZTtcblx0fVxuXG5cdGlmICh0aGlzLmF1dGhvcml0eSkge1xuXHRcdHVyaS5hdXRob3JpdHkgPSB0aGlzLmF1dGhvcml0eS5jbG9uZSgpO1xuXHR9XG5cblx0aWYgKHR5cGVvZih0aGlzLnBhdGgpID09PSAnc3RyaW5nJykge1xuXHRcdHVyaS5wYXRoID0gdGhpcy5wYXRoO1xuXHR9XG5cblx0aWYgKHRoaXMucXVlcnkpIHtcblx0XHR1cmkucXVlcnkgPSB0aGlzLnF1ZXJ5LmNsb25lKCk7XG5cdH1cblxuXHRpZiAodHlwZW9mKHRoaXMuZnJhZ21lbnQpID09PSAnc3RyaW5nJykge1xuXHRcdHVyaS5mcmFnbWVudCA9IHRoaXMuZnJhZ21lbnQ7XG5cdH1cblxuXHRyZXR1cm4gdXJpO1xufTtcblxuLyoqXG4gKiBSZWNvbXBvc2VzIFVSSSBjb21wb25lbnRzIHRvIFVSSSBzdHJpbmcsXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTUuM1xuICogQHJldHVybnMge3N0cmluZ30gVVJJIHN0cmluZy5cbiAqL1xuVVJJLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHJlc3VsdCA9ICcnO1xuXG5cdGlmICh0aGlzLnNjaGVtZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc2NoZW1lICE9PSBudWxsKSB7XG5cdFx0dmFyIHNjaGVtZSA9IFN0cmluZyh0aGlzLnNjaGVtZSk7XG5cdFx0aWYgKCFTQ0hFTUVfUkVHRVhQLnRlc3Qoc2NoZW1lKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKEVSUk9SX1NDSEVNRSk7XG5cdFx0fVxuXHRcdHJlc3VsdCArPSBzY2hlbWUgKyAnOic7XG5cdH1cblxuXHRpZiAodGhpcy5hdXRob3JpdHkpIHtcblx0XHRyZXN1bHQgKz0gJy8vJyArIHRoaXMuYXV0aG9yaXR5LnRvU3RyaW5nKCk7XG5cdH1cblxuXHR2YXIgcGF0aCA9IHRoaXMucGF0aCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMucGF0aCA9PT0gbnVsbCA/XG5cdFx0JycgOiBTdHJpbmcodGhpcy5wYXRoKTtcblx0cmVzdWx0ICs9IHBlcmNlbnRFbmNvZGluZ0hlbHBlci5lbmNvZGVQYXRoKHBhdGgpO1xuXG5cdGlmICh0aGlzLnF1ZXJ5KSB7XG5cdFx0cmVzdWx0ICs9ICc/JyArIHRoaXMucXVlcnkudG9TdHJpbmcoKTtcblx0fVxuXG5cdGlmICh0aGlzLmZyYWdtZW50ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5mcmFnbWVudCAhPT0gbnVsbCkge1xuXHRcdHZhciBmcmFnbWVudCA9IFN0cmluZyh0aGlzLmZyYWdtZW50KTtcblx0XHRyZXN1bHQgKz0gJyMnICsgcGVyY2VudEVuY29kaW5nSGVscGVyLmVuY29kZUZyYWdtZW50KGZyYWdtZW50KTtcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgcmVmZXJlbmNlIGZvciByZWxhdGl2ZSByZXNvbHV0aW9uLlxuICogV2hvbGUgYWxnb3JpdGhtIGhhcyBiZWVuIHRha2VuIGZyb21cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tNS4yLjJcbiAqIEBwYXJhbSB7VVJJfSBiYXNlVXJpIEJhc2UgVVJJIGZvciByZXNvbHV0aW9uLlxuICogQHBhcmFtIHtVUkl9IHJlZmVyZW5jZVVyaSBSZWZlcmVuY2UgVVJJIHRvIHJlc29sdmUuXG4gKiBAcmV0dXJucyB7VVJJfSBDb21wb25lbnRzIG9mIHRhcmdldCBVUkkuXG4gKi9cbi8qanNoaW50IG1heGRlcHRoOmZhbHNlICovXG4vKmpzaGludCBtYXhjb21wbGV4aXR5OmZhbHNlICovXG5mdW5jdGlvbiB0cmFuc2Zvcm1SZWZlcmVuY2UoYmFzZVVyaSwgcmVmZXJlbmNlVXJpKSB7XG5cdHZhciB0YXJnZXRVcmkgPSBuZXcgVVJJKCcnKTtcblxuXHRpZiAocmVmZXJlbmNlVXJpLnNjaGVtZSkge1xuXHRcdHRhcmdldFVyaS5zY2hlbWUgPSByZWZlcmVuY2VVcmkuc2NoZW1lO1xuXHRcdHRhcmdldFVyaS5hdXRob3JpdHkgPSByZWZlcmVuY2VVcmkuYXV0aG9yaXR5ID9cblx0XHRcdHJlZmVyZW5jZVVyaS5hdXRob3JpdHkuY2xvbmUoKSA6IHJlZmVyZW5jZVVyaS5hdXRob3JpdHk7XG5cdFx0dGFyZ2V0VXJpLnBhdGggPSByZW1vdmVEb3RTZWdtZW50cyhyZWZlcmVuY2VVcmkucGF0aCk7XG5cdFx0dGFyZ2V0VXJpLnF1ZXJ5ID0gcmVmZXJlbmNlVXJpLnF1ZXJ5ID9cblx0XHRcdHJlZmVyZW5jZVVyaS5xdWVyeS5jbG9uZSgpIDogcmVmZXJlbmNlVXJpLnF1ZXJ5O1xuXHR9IGVsc2Uge1xuXHRcdGlmIChyZWZlcmVuY2VVcmkuYXV0aG9yaXR5KSB7XG5cdFx0XHR0YXJnZXRVcmkuYXV0aG9yaXR5ID0gcmVmZXJlbmNlVXJpLmF1dGhvcml0eSA/XG5cdFx0XHRcdHJlZmVyZW5jZVVyaS5hdXRob3JpdHkuY2xvbmUoKSA6IHJlZmVyZW5jZVVyaS5hdXRob3JpdHk7XG5cdFx0XHR0YXJnZXRVcmkucGF0aCA9IHJlbW92ZURvdFNlZ21lbnRzKHJlZmVyZW5jZVVyaS5wYXRoKTtcblx0XHRcdHRhcmdldFVyaS5xdWVyeSA9IHJlZmVyZW5jZVVyaS5xdWVyeSA/XG5cdFx0XHRcdHJlZmVyZW5jZVVyaS5xdWVyeS5jbG9uZSgpIDogcmVmZXJlbmNlVXJpLnF1ZXJ5O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAocmVmZXJlbmNlVXJpLnBhdGggPT09ICcnKSB7XG5cdFx0XHRcdHRhcmdldFVyaS5wYXRoID0gYmFzZVVyaS5wYXRoO1xuXHRcdFx0XHRpZiAocmVmZXJlbmNlVXJpLnF1ZXJ5KSB7XG5cdFx0XHRcdFx0dGFyZ2V0VXJpLnF1ZXJ5ID0gcmVmZXJlbmNlVXJpLnF1ZXJ5LmNsb25lKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGFyZ2V0VXJpLnF1ZXJ5ID0gYmFzZVVyaS5xdWVyeSA/XG5cdFx0XHRcdFx0XHRiYXNlVXJpLnF1ZXJ5LmNsb25lKCkgOiBiYXNlVXJpLnF1ZXJ5O1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAocmVmZXJlbmNlVXJpLnBhdGhbMF0gPT09ICcvJykge1xuXHRcdFx0XHRcdHRhcmdldFVyaS5wYXRoID1cblx0XHRcdFx0XHRcdHJlbW92ZURvdFNlZ21lbnRzKHJlZmVyZW5jZVVyaS5wYXRoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0YXJnZXRVcmkucGF0aCA9XG5cdFx0XHRcdFx0XHRtZXJnZShiYXNlVXJpLCByZWZlcmVuY2VVcmkpO1xuXHRcdFx0XHRcdHRhcmdldFVyaS5wYXRoID1cblx0XHRcdFx0XHRcdHJlbW92ZURvdFNlZ21lbnRzKHRhcmdldFVyaS5wYXRoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0YXJnZXRVcmkucXVlcnkgPSByZWZlcmVuY2VVcmkucXVlcnkgP1xuXHRcdFx0XHRcdHJlZmVyZW5jZVVyaS5xdWVyeS5jbG9uZSgpIDogcmVmZXJlbmNlVXJpLnF1ZXJ5O1xuXHRcdFx0fVxuXHRcdFx0dGFyZ2V0VXJpLmF1dGhvcml0eSA9IGJhc2VVcmkuYXV0aG9yaXR5ID9cblx0XHRcdFx0YmFzZVVyaS5hdXRob3JpdHkuY2xvbmUoKSA6IGJhc2VVcmkuYXV0aG9yaXR5O1xuXHRcdH1cblx0XHR0YXJnZXRVcmkuc2NoZW1lID0gYmFzZVVyaS5zY2hlbWU7XG5cdH1cblxuXHR0YXJnZXRVcmkuZnJhZ21lbnQgPSByZWZlcmVuY2VVcmkuZnJhZ21lbnQ7XG5cdHJldHVybiB0YXJnZXRVcmk7XG59XG5cbi8qKlxuICogTWVyZ2VzIGEgcmVsYXRpdmUtcGF0aCByZWZlcmVuY2Ugd2l0aCB0aGUgcGF0aCBvZiB0aGUgYmFzZSBVUkkuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTUuMi4zXG4gKiBAcGFyYW0ge1VSSX0gYmFzZVVyaSBDb21wb25lbnRzIG9mIGJhc2UgVVJJLlxuICogQHBhcmFtIHtVUkl9IHJlZmVyZW5jZVVyaSBDb21wb25lbnRzIG9mIHJlZmVyZW5jZSBVUkkuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBNZXJnZWQgcGF0aC5cbiAqL1xuZnVuY3Rpb24gbWVyZ2UoYmFzZVVyaSwgcmVmZXJlbmNlVXJpKSB7XG5cdGlmIChiYXNlVXJpLmF1dGhvcml0eSAmJiBiYXNlVXJpLnBhdGggPT09ICcnKSB7XG5cdFx0cmV0dXJuICcvJyArIHJlZmVyZW5jZVVyaS5wYXRoO1xuXHR9XG5cblx0dmFyIHNlZ21lbnRzU3RyaW5nID0gYmFzZVVyaS5wYXRoLmluZGV4T2YoJy8nKSAhPT0gLTEgP1xuXHRcdGJhc2VVcmkucGF0aC5yZXBsYWNlKC9cXC9bXlxcL10rJC8sICcvJykgOiAnJztcblxuXHRyZXR1cm4gc2VnbWVudHNTdHJpbmcgKyByZWZlcmVuY2VVcmkucGF0aDtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGRvdHMgc2VnbWVudHMgZnJvbSBVUkkgcGF0aC5cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tNS4yLjRcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmlQYXRoIFVSSSBwYXRoIHdpdGggcG9zc2libGUgZG90IHNlZ21lbnRzLlxuICogQHJldHVybnMge1N0cmluZ30gVVJJIHBhdGggd2l0aG91dCBkb3Qgc2VnbWVudHMuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZURvdFNlZ21lbnRzKHVyaVBhdGgpIHtcblx0aWYgKCF1cmlQYXRoKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0dmFyIGlucHV0QnVmZmVyID0gdXJpUGF0aCxcblx0XHRuZXdCdWZmZXIgPSAnJyxcblx0XHRuZXh0U2VnbWVudCA9ICcnLFxuXHRcdG91dHB1dEJ1ZmZlciA9ICcnO1xuXG5cdHdoaWxlIChpbnB1dEJ1ZmZlci5sZW5ndGggIT09IDApIHtcblxuXHRcdC8vIElmIHRoZSBpbnB1dCBidWZmZXIgYmVnaW5zIHdpdGggYSBwcmVmaXggb2YgXCIuLi9cIiBvciBcIi4vXCIsXG5cdFx0Ly8gdGhlbiByZW1vdmUgdGhhdCBwcmVmaXggZnJvbSB0aGUgaW5wdXQgYnVmZmVyXG5cdFx0bmV3QnVmZmVyID0gaW5wdXRCdWZmZXIucmVwbGFjZSgvXlxcLj9cXC5cXC8vLCAnJyk7XG5cdFx0aWYgKG5ld0J1ZmZlciAhPT0gaW5wdXRCdWZmZXIpIHtcblx0XHRcdGlucHV0QnVmZmVyID0gbmV3QnVmZmVyO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Ly8gaWYgdGhlIGlucHV0IGJ1ZmZlciBiZWdpbnMgd2l0aCBhIHByZWZpeCBvZiBcIi8uL1wiIG9yIFwiLy5cIixcblx0XHQvLyB3aGVyZSBcIi5cIiBpcyBhIGNvbXBsZXRlIHBhdGggc2VnbWVudCwgdGhlbiByZXBsYWNlIHRoYXRcblx0XHQvLyBwcmVmaXggd2l0aCBcIi9cIiBpbiB0aGUgaW5wdXQgYnVmZmVyXG5cdFx0bmV3QnVmZmVyID0gaW5wdXRCdWZmZXIucmVwbGFjZSgvXigoXFwvXFwuXFwvKXwoXFwvXFwuJCkpLywgJy8nKTtcblx0XHRpZiAobmV3QnVmZmVyICE9PSBpbnB1dEJ1ZmZlcikge1xuXHRcdFx0aW5wdXRCdWZmZXIgPSBuZXdCdWZmZXI7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHQvLyBpZiB0aGUgaW5wdXQgYnVmZmVyIGJlZ2lucyB3aXRoIGEgcHJlZml4IG9mIFwiLy4uL1wiIG9yIFwiLy4uXCIsXG5cdFx0Ly8gd2hlcmUgXCIuLlwiIGlzIGEgY29tcGxldGUgcGF0aCBzZWdtZW50LCB0aGVuIHJlcGxhY2UgdGhhdFxuXHRcdC8vIHByZWZpeCB3aXRoIFwiL1wiIGluIHRoZSBpbnB1dCBidWZmZXIgYW5kIHJlbW92ZSB0aGUgbGFzdFxuXHRcdC8vIHNlZ21lbnQgYW5kIGl0cyBwcmVjZWRpbmcgXCIvXCIgKGlmIGFueSkgZnJvbSB0aGUgb3V0cHV0XG5cdFx0Ly8gYnVmZmVyXG5cdFx0bmV3QnVmZmVyID0gaW5wdXRCdWZmZXIucmVwbGFjZSgvXigoXFwvXFwuXFwuXFwvKXwoXFwvXFwuXFwuJCkpLywgJy8nKTtcblx0XHRpZiAobmV3QnVmZmVyICE9PSBpbnB1dEJ1ZmZlcikge1xuXHRcdFx0b3V0cHV0QnVmZmVyID0gb3V0cHV0QnVmZmVyLnJlcGxhY2UoL1xcL1teXFwvXSskLywgJycpO1xuXHRcdFx0aW5wdXRCdWZmZXIgPSBuZXdCdWZmZXI7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHQvLyBpZiB0aGUgaW5wdXQgYnVmZmVyIGNvbnNpc3RzIG9ubHkgb2YgXCIuXCIgb3IgXCIuLlwiLCB0aGVuIHJlbW92ZVxuXHRcdC8vIHRoYXQgZnJvbSB0aGUgaW5wdXQgYnVmZmVyXG5cdFx0aWYgKGlucHV0QnVmZmVyID09PSAnLicgfHwgaW5wdXRCdWZmZXIgPT09ICcuLicpIHtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdC8vIG1vdmUgdGhlIGZpcnN0IHBhdGggc2VnbWVudCBpbiB0aGUgaW5wdXQgYnVmZmVyIHRvIHRoZSBlbmQgb2Zcblx0XHQvLyB0aGUgb3V0cHV0IGJ1ZmZlciwgaW5jbHVkaW5nIHRoZSBpbml0aWFsIFwiL1wiIGNoYXJhY3RlciAoaWZcblx0XHQvLyBhbnkpIGFuZCBhbnkgc3Vic2VxdWVudCBjaGFyYWN0ZXJzIHVwIHRvLCBidXQgbm90IGluY2x1ZGluZyxcblx0XHQvLyB0aGUgbmV4dCBcIi9cIiBjaGFyYWN0ZXIgb3IgdGhlIGVuZCBvZiB0aGUgaW5wdXQgYnVmZmVyXG5cdFx0bmV4dFNlZ21lbnQgPSAvXlxcLz9bXlxcL10qKFxcL3wkKS8uZXhlYyhpbnB1dEJ1ZmZlcilbMF07XG5cdFx0bmV4dFNlZ21lbnQgPSBuZXh0U2VnbWVudC5yZXBsYWNlKC8oW15cXC9dKShcXC8kKS8sICckMScpO1xuXHRcdGlucHV0QnVmZmVyID0gaW5wdXRCdWZmZXIuc3Vic3RyaW5nKG5leHRTZWdtZW50Lmxlbmd0aCk7XG5cdFx0b3V0cHV0QnVmZmVyICs9IG5leHRTZWdtZW50O1xuXHR9XG5cblx0cmV0dXJuIG91dHB1dEJ1ZmZlcjtcbn0iLCIvKlxuICogY2F0YmVycnktdXJpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnktdXJpJ3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeS11cmkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBVc2VySW5mbztcblxudmFyIHBlcmNlbnRFbmNvZGluZ0hlbHBlciA9IHJlcXVpcmUoJy4vcGVyY2VudEVuY29kaW5nSGVscGVyJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgdXNlciBpbmZvcm1hdGlvbiBjb21wb25lbnQgcGFyc2VyLlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjIuMVxuICogQHBhcmFtIHtTdHJpbmc/fSB1c2VySW5mb1N0cmluZyBVc2VyIGluZm9ybWF0aW9uIGNvbXBvbmVudCBzdHJpbmcuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVXNlckluZm8odXNlckluZm9TdHJpbmcpIHtcblx0aWYgKHR5cGVvZih1c2VySW5mb1N0cmluZykgPT09ICdzdHJpbmcnICYmIHVzZXJJbmZvU3RyaW5nLmxlbmd0aCA+IDApIHtcblx0XHR2YXIgcGFydHMgPSB1c2VySW5mb1N0cmluZy5zcGxpdCgnOicpO1xuXHRcdGlmICh0eXBlb2YocGFydHNbMF0pID09PSAnc3RyaW5nJykge1xuXHRcdFx0dGhpcy51c2VyID0gcGVyY2VudEVuY29kaW5nSGVscGVyLmRlY29kZShwYXJ0c1swXSk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YocGFydHNbMV0pID09PSAnc3RyaW5nJykge1xuXHRcdFx0dGhpcy5wYXNzd29yZCA9IHBlcmNlbnRFbmNvZGluZ0hlbHBlci5kZWNvZGUocGFydHNbMV0pO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEN1cnJlbnQgdXNlciBjb21wb25lbnQuXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5Vc2VySW5mby5wcm90b3R5cGUudXNlciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBwYXNzd29yZC5cbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cblVzZXJJbmZvLnByb3RvdHlwZS5wYXNzd29yZCA9IG51bGw7XG5cbi8qKlxuICogQ2xvbmVzIGN1cnJlbnQgdXNlciBpbmZvcm1hdGlvbi5cbiAqIEByZXR1cm5zIHtVc2VySW5mb30gTmV3IGNsb25lIG9mIGN1cnJlbnQgb2JqZWN0LlxuICovXG5Vc2VySW5mby5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciB1c2VySW5mbyA9IG5ldyBVc2VySW5mbygpO1xuXHRpZiAodHlwZW9mKHRoaXMudXNlcikgPT09ICdzdHJpbmcnKSB7XG5cdFx0dXNlckluZm8udXNlciA9IHRoaXMudXNlcjtcblx0fVxuXHRpZiAodHlwZW9mKHRoaXMucGFzc3dvcmQpID09PSAnc3RyaW5nJykge1xuXHRcdHVzZXJJbmZvLnBhc3N3b3JkID0gdGhpcy5wYXNzd29yZDtcblx0fVxuXHRyZXR1cm4gdXNlckluZm87XG59O1xuXG4vKipcbiAqIFJlY29tYmluZXMgdXNlciBpbmZvcm1hdGlvbiBjb21wb25lbnRzIHRvIHVzZXJJbmZvIHN0cmluZy5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFVzZXIgaW5mb3JtYXRpb24gY29tcG9uZW50IHN0cmluZy5cbiAqL1xuVXNlckluZm8ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgcmVzdWx0ID0gJyc7XG5cdGlmICh0aGlzLnVzZXIgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnVzZXIgIT09IG51bGwpIHtcblx0XHR2YXIgdXNlciA9IFN0cmluZyh0aGlzLnVzZXIpO1xuXHRcdHJlc3VsdCArPSBwZXJjZW50RW5jb2RpbmdIZWxwZXJcblx0XHRcdC5lbmNvZGVVc2VySW5mb1N1YkNvbXBvbmVudCh1c2VyKTtcblx0fVxuXHRpZiAodGhpcy5wYXNzd29yZCAhPT0gdW5kZWZpbmVkICYmIHRoaXMucGFzc3dvcmQgIT09IG51bGwpIHtcblx0XHR2YXIgcGFzc3dvcmQgPSBTdHJpbmcodGhpcy5wYXNzd29yZCk7XG5cdFx0cmVzdWx0ICs9ICc6JyArIHBlcmNlbnRFbmNvZGluZ0hlbHBlclxuXHRcdFx0LmVuY29kZVVzZXJJbmZvU3ViQ29tcG9uZW50KHBhc3N3b3JkKTtcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8qXG4gKiBjYXRiZXJyeS11cmlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeS11cmkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5LXVyaSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTIuMVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0LyoqXG5cdCAqIEVuY29kZXMgYXV0aG9yaXR5IHVzZXIgaW5mb3JtYXRpb24gc3ViLWNvbXBvbmVudCBhY2NvcmRpbmcgdG8gUkZDIDM5ODYuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgQ29tcG9uZW50IHRvIGVuY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gRW5jb2RlZCBjb21wb25lbnQuXG5cdCAqL1xuXHRlbmNvZGVVc2VySW5mb1N1YkNvbXBvbmVudDogZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZShcblx0XHRcdC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy4yLjFcblx0XHRcdC9bXlxcd1xcLn5cXC0hXFwkJidcXChcXClcXCpcXCssOz1dL2csIGVuY29kZVVSSUNvbXBvbmVudFxuXHRcdCk7XG5cdH0sXG5cdC8qKlxuXHQgKiBFbmNvZGVzIGF1dGhvcml0eSBob3N0IGNvbXBvbmVudCBhY2NvcmRpbmcgdG8gUkZDIDM5ODYuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgQ29tcG9uZW50IHRvIGVuY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gRW5jb2RlZCBjb21wb25lbnQuXG5cdCAqL1xuXHRlbmNvZGVIb3N0OiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKFxuXHRcdFx0Ly8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjIuMlxuXHRcdFx0L1teXFx3XFwuflxcLSFcXCQmJ1xcKFxcKVxcKlxcKyw7PTpcXFtcXF1dL2csIGVuY29kZVVSSUNvbXBvbmVudFxuXHRcdCk7XG5cblx0fSxcblx0LyoqXG5cdCAqIEVuY29kZXMgVVJJIHBhdGggY29tcG9uZW50IGFjY29yZGluZyB0byBSRkMgMzk4Ni5cblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBDb21wb25lbnQgdG8gZW5jb2RlLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBFbmNvZGVkIGNvbXBvbmVudC5cblx0ICovXG5cdGVuY29kZVBhdGg6IGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoXG5cdFx0XHQvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuM1xuXHRcdFx0L1teXFx3XFwuflxcLSFcXCQmJ1xcKFxcKVxcKlxcKyw7PTpAXFwvXS9nLCBlbmNvZGVVUklDb21wb25lbnRcblx0XHQpO1xuXHR9LFxuXHQvKipcblx0ICogRW5jb2RlcyBxdWVyeSBzdWItY29tcG9uZW50IGFjY29yZGluZyB0byBSRkMgMzk4Ni5cblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBDb21wb25lbnQgdG8gZW5jb2RlLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBFbmNvZGVkIGNvbXBvbmVudC5cblx0ICovXG5cdGVuY29kZVF1ZXJ5U3ViQ29tcG9uZW50OiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKFxuXHRcdFx0Ly8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjRcblx0XHRcdC9bXlxcd1xcLn5cXC0hXFwkJ1xcKFxcKVxcKlxcKyw7OkBcXC9cXD9dL2csIGVuY29kZVVSSUNvbXBvbmVudFxuXHRcdCk7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEVuY29kZXMgVVJJIGZyYWdtZW50IGNvbXBvbmVudCBhY2NvcmRpbmcgdG8gUkZDIDM5ODYuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgQ29tcG9uZW50IHRvIGVuY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gRW5jb2RlZCBjb21wb25lbnQuXG5cdCAqL1xuXHRlbmNvZGVGcmFnbWVudDogZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZShcblx0XHRcdC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy41XG5cdFx0XHQvW15cXHdcXC5+XFwtIVxcJCYnXFwoXFwpXFwqXFwrLDs9OkBcXC9cXD9dL2csIGVuY29kZVVSSUNvbXBvbmVudFxuXHRcdCk7XG5cdH0sXG5cblx0LyoqXG5cdCAqIERlY29kZXMgcGVyY2VudCBlbmNvZGVkIGNvbXBvbmVudC5cblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBDb21wb25lbnQgdG8gZGVjb2RlLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBEZWNvZGVkIGNvbXBvbmVudC5cblx0ICovXG5cdGRlY29kZTogZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyaW5nKTtcblx0fVxufTsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWInKVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNhcCA9IHJlcXVpcmUoJ2FzYXAvcmF3Jyk7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4vLyBTdGF0ZXM6XG4vL1xuLy8gMCAtIHBlbmRpbmdcbi8vIDEgLSBmdWxmaWxsZWQgd2l0aCBfdmFsdWVcbi8vIDIgLSByZWplY3RlZCB3aXRoIF92YWx1ZVxuLy8gMyAtIGFkb3B0ZWQgdGhlIHN0YXRlIG9mIGFub3RoZXIgcHJvbWlzZSwgX3ZhbHVlXG4vL1xuLy8gb25jZSB0aGUgc3RhdGUgaXMgbm8gbG9uZ2VyIHBlbmRpbmcgKDApIGl0IGlzIGltbXV0YWJsZVxuXG4vLyBBbGwgYF9gIHByZWZpeGVkIHByb3BlcnRpZXMgd2lsbCBiZSByZWR1Y2VkIHRvIGBfe3JhbmRvbSBudW1iZXJ9YFxuLy8gYXQgYnVpbGQgdGltZSB0byBvYmZ1c2NhdGUgdGhlbSBhbmQgZGlzY291cmFnZSB0aGVpciB1c2UuXG4vLyBXZSBkb24ndCB1c2Ugc3ltYm9scyBvciBPYmplY3QuZGVmaW5lUHJvcGVydHkgdG8gZnVsbHkgaGlkZSB0aGVtXG4vLyBiZWNhdXNlIHRoZSBwZXJmb3JtYW5jZSBpc24ndCBnb29kIGVub3VnaC5cblxuXG4vLyB0byBhdm9pZCB1c2luZyB0cnkvY2F0Y2ggaW5zaWRlIGNyaXRpY2FsIGZ1bmN0aW9ucywgd2Vcbi8vIGV4dHJhY3QgdGhlbSB0byBoZXJlLlxudmFyIExBU1RfRVJST1IgPSBudWxsO1xudmFyIElTX0VSUk9SID0ge307XG5mdW5jdGlvbiBnZXRUaGVuKG9iaikge1xuICB0cnkge1xuICAgIHJldHVybiBvYmoudGhlbjtcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICBMQVNUX0VSUk9SID0gZXg7XG4gICAgcmV0dXJuIElTX0VSUk9SO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRyeUNhbGxPbmUoZm4sIGEpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZm4oYSk7XG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgTEFTVF9FUlJPUiA9IGV4O1xuICAgIHJldHVybiBJU19FUlJPUjtcbiAgfVxufVxuZnVuY3Rpb24gdHJ5Q2FsbFR3byhmbiwgYSwgYikge1xuICB0cnkge1xuICAgIGZuKGEsIGIpO1xuICB9IGNhdGNoIChleCkge1xuICAgIExBU1RfRVJST1IgPSBleDtcbiAgICByZXR1cm4gSVNfRVJST1I7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlO1xuXG5mdW5jdGlvbiBQcm9taXNlKGZuKSB7XG4gIGlmICh0eXBlb2YgdGhpcyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlcyBtdXN0IGJlIGNvbnN0cnVjdGVkIHZpYSBuZXcnKTtcbiAgfVxuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbm90IGEgZnVuY3Rpb24nKTtcbiAgfVxuICB0aGlzLl8zMiA9IDA7XG4gIHRoaXMuXzggPSBudWxsO1xuICB0aGlzLl84OSA9IFtdO1xuICBpZiAoZm4gPT09IG5vb3ApIHJldHVybjtcbiAgZG9SZXNvbHZlKGZuLCB0aGlzKTtcbn1cblByb21pc2UuXzgzID0gbm9vcDtcblxuUHJvbWlzZS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gIGlmICh0aGlzLmNvbnN0cnVjdG9yICE9PSBQcm9taXNlKSB7XG4gICAgcmV0dXJuIHNhZmVUaGVuKHRoaXMsIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKTtcbiAgfVxuICB2YXIgcmVzID0gbmV3IFByb21pc2Uobm9vcCk7XG4gIGhhbmRsZSh0aGlzLCBuZXcgSGFuZGxlcihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgcmVzKSk7XG4gIHJldHVybiByZXM7XG59O1xuXG5mdW5jdGlvbiBzYWZlVGhlbihzZWxmLCBvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICByZXR1cm4gbmV3IHNlbGYuY29uc3RydWN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXMgPSBuZXcgUHJvbWlzZShub29wKTtcbiAgICByZXMudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgIGhhbmRsZShzZWxmLCBuZXcgSGFuZGxlcihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgcmVzKSk7XG4gIH0pO1xufTtcbmZ1bmN0aW9uIGhhbmRsZShzZWxmLCBkZWZlcnJlZCkge1xuICB3aGlsZSAoc2VsZi5fMzIgPT09IDMpIHtcbiAgICBzZWxmID0gc2VsZi5fODtcbiAgfVxuICBpZiAoc2VsZi5fMzIgPT09IDApIHtcbiAgICBzZWxmLl84OS5wdXNoKGRlZmVycmVkKTtcbiAgICByZXR1cm47XG4gIH1cbiAgYXNhcChmdW5jdGlvbigpIHtcbiAgICB2YXIgY2IgPSBzZWxmLl8zMiA9PT0gMSA/IGRlZmVycmVkLm9uRnVsZmlsbGVkIDogZGVmZXJyZWQub25SZWplY3RlZDtcbiAgICBpZiAoY2IgPT09IG51bGwpIHtcbiAgICAgIGlmIChzZWxmLl8zMiA9PT0gMSkge1xuICAgICAgICByZXNvbHZlKGRlZmVycmVkLnByb21pc2UsIHNlbGYuXzgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KGRlZmVycmVkLnByb21pc2UsIHNlbGYuXzgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcmV0ID0gdHJ5Q2FsbE9uZShjYiwgc2VsZi5fOCk7XG4gICAgaWYgKHJldCA9PT0gSVNfRVJST1IpIHtcbiAgICAgIHJlamVjdChkZWZlcnJlZC5wcm9taXNlLCBMQVNUX0VSUk9SKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzb2x2ZShkZWZlcnJlZC5wcm9taXNlLCByZXQpO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiByZXNvbHZlKHNlbGYsIG5ld1ZhbHVlKSB7XG4gIC8vIFByb21pc2UgUmVzb2x1dGlvbiBQcm9jZWR1cmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9wcm9taXNlcy1hcGx1cy9wcm9taXNlcy1zcGVjI3RoZS1wcm9taXNlLXJlc29sdXRpb24tcHJvY2VkdXJlXG4gIGlmIChuZXdWYWx1ZSA9PT0gc2VsZikge1xuICAgIHJldHVybiByZWplY3QoXG4gICAgICBzZWxmLFxuICAgICAgbmV3IFR5cGVFcnJvcignQSBwcm9taXNlIGNhbm5vdCBiZSByZXNvbHZlZCB3aXRoIGl0c2VsZi4nKVxuICAgICk7XG4gIH1cbiAgaWYgKFxuICAgIG5ld1ZhbHVlICYmXG4gICAgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG5ld1ZhbHVlID09PSAnZnVuY3Rpb24nKVxuICApIHtcbiAgICB2YXIgdGhlbiA9IGdldFRoZW4obmV3VmFsdWUpO1xuICAgIGlmICh0aGVuID09PSBJU19FUlJPUikge1xuICAgICAgcmV0dXJuIHJlamVjdChzZWxmLCBMQVNUX0VSUk9SKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhlbiA9PT0gc2VsZi50aGVuICYmXG4gICAgICBuZXdWYWx1ZSBpbnN0YW5jZW9mIFByb21pc2VcbiAgICApIHtcbiAgICAgIHNlbGYuXzMyID0gMztcbiAgICAgIHNlbGYuXzggPSBuZXdWYWx1ZTtcbiAgICAgIGZpbmFsZShzZWxmKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBkb1Jlc29sdmUodGhlbi5iaW5kKG5ld1ZhbHVlKSwgc2VsZik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIHNlbGYuXzMyID0gMTtcbiAgc2VsZi5fOCA9IG5ld1ZhbHVlO1xuICBmaW5hbGUoc2VsZik7XG59XG5cbmZ1bmN0aW9uIHJlamVjdChzZWxmLCBuZXdWYWx1ZSkge1xuICBzZWxmLl8zMiA9IDI7XG4gIHNlbGYuXzggPSBuZXdWYWx1ZTtcbiAgZmluYWxlKHNlbGYpO1xufVxuZnVuY3Rpb24gZmluYWxlKHNlbGYpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxmLl84OS5sZW5ndGg7IGkrKykge1xuICAgIGhhbmRsZShzZWxmLCBzZWxmLl84OVtpXSk7XG4gIH1cbiAgc2VsZi5fODkgPSBudWxsO1xufVxuXG5mdW5jdGlvbiBIYW5kbGVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBwcm9taXNlKXtcbiAgdGhpcy5vbkZ1bGZpbGxlZCA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogbnVsbDtcbiAgdGhpcy5vblJlamVjdGVkID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT09ICdmdW5jdGlvbicgPyBvblJlamVjdGVkIDogbnVsbDtcbiAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbn1cblxuLyoqXG4gKiBUYWtlIGEgcG90ZW50aWFsbHkgbWlzYmVoYXZpbmcgcmVzb2x2ZXIgZnVuY3Rpb24gYW5kIG1ha2Ugc3VyZVxuICogb25GdWxmaWxsZWQgYW5kIG9uUmVqZWN0ZWQgYXJlIG9ubHkgY2FsbGVkIG9uY2UuXG4gKlxuICogTWFrZXMgbm8gZ3VhcmFudGVlcyBhYm91dCBhc3luY2hyb255LlxuICovXG5mdW5jdGlvbiBkb1Jlc29sdmUoZm4sIHByb21pc2UpIHtcbiAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgdmFyIHJlcyA9IHRyeUNhbGxUd28oZm4sIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgZG9uZSA9IHRydWU7XG4gICAgcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgIGRvbmUgPSB0cnVlO1xuICAgIHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICB9KVxuICBpZiAoIWRvbmUgJiYgcmVzID09PSBJU19FUlJPUikge1xuICAgIGRvbmUgPSB0cnVlO1xuICAgIHJlamVjdChwcm9taXNlLCBMQVNUX0VSUk9SKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUHJvbWlzZSA9IHJlcXVpcmUoJy4vY29yZS5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb21pc2U7XG5Qcm9taXNlLnByb3RvdHlwZS5kb25lID0gZnVuY3Rpb24gKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gIHZhciBzZWxmID0gYXJndW1lbnRzLmxlbmd0aCA/IHRoaXMudGhlbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDogdGhpcztcbiAgc2VsZi50aGVuKG51bGwsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9LCAwKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vL1RoaXMgZmlsZSBjb250YWlucyB0aGUgRVM2IGV4dGVuc2lvbnMgdG8gdGhlIGNvcmUgUHJvbWlzZXMvQSsgQVBJXG5cbnZhciBQcm9taXNlID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7XG52YXIgYXNhcCA9IHJlcXVpcmUoJ2FzYXAvcmF3Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvbWlzZTtcblxuLyogU3RhdGljIEZ1bmN0aW9ucyAqL1xuXG52YXIgVFJVRSA9IHZhbHVlUHJvbWlzZSh0cnVlKTtcbnZhciBGQUxTRSA9IHZhbHVlUHJvbWlzZShmYWxzZSk7XG52YXIgTlVMTCA9IHZhbHVlUHJvbWlzZShudWxsKTtcbnZhciBVTkRFRklORUQgPSB2YWx1ZVByb21pc2UodW5kZWZpbmVkKTtcbnZhciBaRVJPID0gdmFsdWVQcm9taXNlKDApO1xudmFyIEVNUFRZU1RSSU5HID0gdmFsdWVQcm9taXNlKCcnKTtcblxuZnVuY3Rpb24gdmFsdWVQcm9taXNlKHZhbHVlKSB7XG4gIHZhciBwID0gbmV3IFByb21pc2UoUHJvbWlzZS5fODMpO1xuICBwLl8zMiA9IDE7XG4gIHAuXzggPSB2YWx1ZTtcbiAgcmV0dXJuIHA7XG59XG5Qcm9taXNlLnJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkgcmV0dXJuIHZhbHVlO1xuXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuIE5VTEw7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gVU5ERUZJTkVEO1xuICBpZiAodmFsdWUgPT09IHRydWUpIHJldHVybiBUUlVFO1xuICBpZiAodmFsdWUgPT09IGZhbHNlKSByZXR1cm4gRkFMU0U7XG4gIGlmICh2YWx1ZSA9PT0gMCkgcmV0dXJuIFpFUk87XG4gIGlmICh2YWx1ZSA9PT0gJycpIHJldHVybiBFTVBUWVNUUklORztcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIHRoZW4gPSB2YWx1ZS50aGVuO1xuICAgICAgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSh0aGVuLmJpbmQodmFsdWUpKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgcmVqZWN0KGV4KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWVQcm9taXNlKHZhbHVlKTtcbn07XG5cblByb21pc2UuYWxsID0gZnVuY3Rpb24gKGFycikge1xuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHJldHVybiByZXNvbHZlKFtdKTtcbiAgICB2YXIgcmVtYWluaW5nID0gYXJncy5sZW5ndGg7XG4gICAgZnVuY3Rpb24gcmVzKGksIHZhbCkge1xuICAgICAgaWYgKHZhbCAmJiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIFByb21pc2UgJiYgdmFsLnRoZW4gPT09IFByb21pc2UucHJvdG90eXBlLnRoZW4pIHtcbiAgICAgICAgICB3aGlsZSAodmFsLl8zMiA9PT0gMykge1xuICAgICAgICAgICAgdmFsID0gdmFsLl84O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodmFsLl8zMiA9PT0gMSkgcmV0dXJuIHJlcyhpLCB2YWwuXzgpO1xuICAgICAgICAgIGlmICh2YWwuXzMyID09PSAyKSByZWplY3QodmFsLl84KTtcbiAgICAgICAgICB2YWwudGhlbihmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICByZXMoaSwgdmFsKTtcbiAgICAgICAgICB9LCByZWplY3QpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgdGhlbiA9IHZhbC50aGVuO1xuICAgICAgICAgIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFyIHAgPSBuZXcgUHJvbWlzZSh0aGVuLmJpbmQodmFsKSk7XG4gICAgICAgICAgICBwLnRoZW4oZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgICByZXMoaSwgdmFsKTtcbiAgICAgICAgICAgIH0sIHJlamVjdCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhcmdzW2ldID0gdmFsO1xuICAgICAgaWYgKC0tcmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgIHJlc29sdmUoYXJncyk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzKGksIGFyZ3NbaV0pO1xuICAgIH1cbiAgfSk7XG59O1xuXG5Qcm9taXNlLnJlamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHJlamVjdCh2YWx1ZSk7XG4gIH0pO1xufTtcblxuUHJvbWlzZS5yYWNlID0gZnVuY3Rpb24gKHZhbHVlcykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbi8qIFByb3RvdHlwZSBNZXRob2RzICovXG5cblByb21pc2UucHJvdG90eXBlWydjYXRjaCddID0gZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGVkKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBQcm9taXNlID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvbWlzZTtcblByb21pc2UucHJvdG90eXBlWydmaW5hbGx5J10gPSBmdW5jdGlvbiAoZikge1xuICByZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZigpKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KTtcbiAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZigpKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9KTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29yZS5qcycpO1xucmVxdWlyZSgnLi9kb25lLmpzJyk7XG5yZXF1aXJlKCcuL2ZpbmFsbHkuanMnKTtcbnJlcXVpcmUoJy4vZXM2LWV4dGVuc2lvbnMuanMnKTtcbnJlcXVpcmUoJy4vbm9kZS1leHRlbnNpb25zLmpzJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIFRoaXMgZmlsZSBjb250YWlucyB0aGVuL3Byb21pc2Ugc3BlY2lmaWMgZXh0ZW5zaW9ucyB0aGF0IGFyZSBvbmx5IHVzZWZ1bFxuLy8gZm9yIG5vZGUuanMgaW50ZXJvcFxuXG52YXIgUHJvbWlzZSA9IHJlcXVpcmUoJy4vY29yZS5qcycpO1xudmFyIGFzYXAgPSByZXF1aXJlKCdhc2FwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvbWlzZTtcblxuLyogU3RhdGljIEZ1bmN0aW9ucyAqL1xuXG5Qcm9taXNlLmRlbm9kZWlmeSA9IGZ1bmN0aW9uIChmbiwgYXJndW1lbnRDb3VudCkge1xuICBhcmd1bWVudENvdW50ID0gYXJndW1lbnRDb3VudCB8fCBJbmZpbml0eTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB3aGlsZSAoYXJncy5sZW5ndGggJiYgYXJncy5sZW5ndGggPiBhcmd1bWVudENvdW50KSB7XG4gICAgICAgIGFyZ3MucG9wKCk7XG4gICAgICB9XG4gICAgICBhcmdzLnB1c2goZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgIGlmIChlcnIpIHJlamVjdChlcnIpO1xuICAgICAgICBlbHNlIHJlc29sdmUocmVzKTtcbiAgICAgIH0pXG4gICAgICB2YXIgcmVzID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICBpZiAocmVzICYmXG4gICAgICAgIChcbiAgICAgICAgICB0eXBlb2YgcmVzID09PSAnb2JqZWN0JyB8fFxuICAgICAgICAgIHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbidcbiAgICAgICAgKSAmJlxuICAgICAgICB0eXBlb2YgcmVzLnRoZW4gPT09ICdmdW5jdGlvbidcbiAgICAgICkge1xuICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuUHJvbWlzZS5ub2RlaWZ5ID0gZnVuY3Rpb24gKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIHZhciBjYWxsYmFjayA9XG4gICAgICB0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdID09PSAnZnVuY3Rpb24nID8gYXJncy5wb3AoKSA6IG51bGw7XG4gICAgdmFyIGN0eCA9IHRoaXM7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpLm5vZGVpZnkoY2FsbGJhY2ssIGN0eCk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIGlmIChjYWxsYmFjayA9PT0gbnVsbCB8fCB0eXBlb2YgY2FsbGJhY2sgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICByZWplY3QoZXgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFzYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY3R4LCBleCk7XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblByb21pc2UucHJvdG90eXBlLm5vZGVpZnkgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGN0eCkge1xuICBpZiAodHlwZW9mIGNhbGxiYWNrICE9ICdmdW5jdGlvbicpIHJldHVybiB0aGlzO1xuXG4gIHRoaXMudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBhc2FwKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbGxiYWNrLmNhbGwoY3R4LCBudWxsLCB2YWx1ZSk7XG4gICAgfSk7XG4gIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBhc2FwKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbGxiYWNrLmNhbGwoY3R4LCBlcnIpO1xuICAgIH0pO1xuICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyByYXdBc2FwIHByb3ZpZGVzIGV2ZXJ5dGhpbmcgd2UgbmVlZCBleGNlcHQgZXhjZXB0aW9uIG1hbmFnZW1lbnQuXG52YXIgcmF3QXNhcCA9IHJlcXVpcmUoXCIuL3Jhd1wiKTtcbi8vIFJhd1Rhc2tzIGFyZSByZWN5Y2xlZCB0byByZWR1Y2UgR0MgY2h1cm4uXG52YXIgZnJlZVRhc2tzID0gW107XG4vLyBXZSBxdWV1ZSBlcnJvcnMgdG8gZW5zdXJlIHRoZXkgYXJlIHRocm93biBpbiByaWdodCBvcmRlciAoRklGTykuXG4vLyBBcnJheS1hcy1xdWV1ZSBpcyBnb29kIGVub3VnaCBoZXJlLCBzaW5jZSB3ZSBhcmUganVzdCBkZWFsaW5nIHdpdGggZXhjZXB0aW9ucy5cbnZhciBwZW5kaW5nRXJyb3JzID0gW107XG52YXIgcmVxdWVzdEVycm9yVGhyb3cgPSByYXdBc2FwLm1ha2VSZXF1ZXN0Q2FsbEZyb21UaW1lcih0aHJvd0ZpcnN0RXJyb3IpO1xuXG5mdW5jdGlvbiB0aHJvd0ZpcnN0RXJyb3IoKSB7XG4gICAgaWYgKHBlbmRpbmdFcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IHBlbmRpbmdFcnJvcnMuc2hpZnQoKTtcbiAgICB9XG59XG5cbi8qKlxuICogQ2FsbHMgYSB0YXNrIGFzIHNvb24gYXMgcG9zc2libGUgYWZ0ZXIgcmV0dXJuaW5nLCBpbiBpdHMgb3duIGV2ZW50LCB3aXRoIHByaW9yaXR5XG4gKiBvdmVyIG90aGVyIGV2ZW50cyBsaWtlIGFuaW1hdGlvbiwgcmVmbG93LCBhbmQgcmVwYWludC4gQW4gZXJyb3IgdGhyb3duIGZyb20gYW5cbiAqIGV2ZW50IHdpbGwgbm90IGludGVycnVwdCwgbm9yIGV2ZW4gc3Vic3RhbnRpYWxseSBzbG93IGRvd24gdGhlIHByb2Nlc3Npbmcgb2ZcbiAqIG90aGVyIGV2ZW50cywgYnV0IHdpbGwgYmUgcmF0aGVyIHBvc3Rwb25lZCB0byBhIGxvd2VyIHByaW9yaXR5IGV2ZW50LlxuICogQHBhcmFtIHt7Y2FsbH19IHRhc2sgQSBjYWxsYWJsZSBvYmplY3QsIHR5cGljYWxseSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgbm9cbiAqIGFyZ3VtZW50cy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBhc2FwO1xuZnVuY3Rpb24gYXNhcCh0YXNrKSB7XG4gICAgdmFyIHJhd1Rhc2s7XG4gICAgaWYgKGZyZWVUYXNrcy5sZW5ndGgpIHtcbiAgICAgICAgcmF3VGFzayA9IGZyZWVUYXNrcy5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByYXdUYXNrID0gbmV3IFJhd1Rhc2soKTtcbiAgICB9XG4gICAgcmF3VGFzay50YXNrID0gdGFzaztcbiAgICByYXdBc2FwKHJhd1Rhc2spO1xufVxuXG4vLyBXZSB3cmFwIHRhc2tzIHdpdGggcmVjeWNsYWJsZSB0YXNrIG9iamVjdHMuICBBIHRhc2sgb2JqZWN0IGltcGxlbWVudHNcbi8vIGBjYWxsYCwganVzdCBsaWtlIGEgZnVuY3Rpb24uXG5mdW5jdGlvbiBSYXdUYXNrKCkge1xuICAgIHRoaXMudGFzayA9IG51bGw7XG59XG5cbi8vIFRoZSBzb2xlIHB1cnBvc2Ugb2Ygd3JhcHBpbmcgdGhlIHRhc2sgaXMgdG8gY2F0Y2ggdGhlIGV4Y2VwdGlvbiBhbmQgcmVjeWNsZVxuLy8gdGhlIHRhc2sgb2JqZWN0IGFmdGVyIGl0cyBzaW5nbGUgdXNlLlxuUmF3VGFzay5wcm90b3R5cGUuY2FsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICB0aGlzLnRhc2suY2FsbCgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChhc2FwLm9uZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaG9vayBleGlzdHMgcHVyZWx5IGZvciB0ZXN0aW5nIHB1cnBvc2VzLlxuICAgICAgICAgICAgLy8gSXRzIG5hbWUgd2lsbCBiZSBwZXJpb2RpY2FsbHkgcmFuZG9taXplZCB0byBicmVhayBhbnkgY29kZSB0aGF0XG4gICAgICAgICAgICAvLyBkZXBlbmRzIG9uIGl0cyBleGlzdGVuY2UuXG4gICAgICAgICAgICBhc2FwLm9uZXJyb3IoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSW4gYSB3ZWIgYnJvd3NlciwgZXhjZXB0aW9ucyBhcmUgbm90IGZhdGFsLiBIb3dldmVyLCB0byBhdm9pZFxuICAgICAgICAgICAgLy8gc2xvd2luZyBkb3duIHRoZSBxdWV1ZSBvZiBwZW5kaW5nIHRhc2tzLCB3ZSByZXRocm93IHRoZSBlcnJvciBpbiBhXG4gICAgICAgICAgICAvLyBsb3dlciBwcmlvcml0eSB0dXJuLlxuICAgICAgICAgICAgcGVuZGluZ0Vycm9ycy5wdXNoKGVycm9yKTtcbiAgICAgICAgICAgIHJlcXVlc3RFcnJvclRocm93KCk7XG4gICAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgICB0aGlzLnRhc2sgPSBudWxsO1xuICAgICAgICBmcmVlVGFza3NbZnJlZVRhc2tzLmxlbmd0aF0gPSB0aGlzO1xuICAgIH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gVXNlIHRoZSBmYXN0ZXN0IG1lYW5zIHBvc3NpYmxlIHRvIGV4ZWN1dGUgYSB0YXNrIGluIGl0cyBvd24gdHVybiwgd2l0aFxuLy8gcHJpb3JpdHkgb3ZlciBvdGhlciBldmVudHMgaW5jbHVkaW5nIElPLCBhbmltYXRpb24sIHJlZmxvdywgYW5kIHJlZHJhd1xuLy8gZXZlbnRzIGluIGJyb3dzZXJzLlxuLy9cbi8vIEFuIGV4Y2VwdGlvbiB0aHJvd24gYnkgYSB0YXNrIHdpbGwgcGVybWFuZW50bHkgaW50ZXJydXB0IHRoZSBwcm9jZXNzaW5nIG9mXG4vLyBzdWJzZXF1ZW50IHRhc2tzLiBUaGUgaGlnaGVyIGxldmVsIGBhc2FwYCBmdW5jdGlvbiBlbnN1cmVzIHRoYXQgaWYgYW5cbi8vIGV4Y2VwdGlvbiBpcyB0aHJvd24gYnkgYSB0YXNrLCB0aGF0IHRoZSB0YXNrIHF1ZXVlIHdpbGwgY29udGludWUgZmx1c2hpbmcgYXNcbi8vIHNvb24gYXMgcG9zc2libGUsIGJ1dCBpZiB5b3UgdXNlIGByYXdBc2FwYCBkaXJlY3RseSwgeW91IGFyZSByZXNwb25zaWJsZSB0b1xuLy8gZWl0aGVyIGVuc3VyZSB0aGF0IG5vIGV4Y2VwdGlvbnMgYXJlIHRocm93biBmcm9tIHlvdXIgdGFzaywgb3IgdG8gbWFudWFsbHlcbi8vIGNhbGwgYHJhd0FzYXAucmVxdWVzdEZsdXNoYCBpZiBhbiBleGNlcHRpb24gaXMgdGhyb3duLlxubW9kdWxlLmV4cG9ydHMgPSByYXdBc2FwO1xuZnVuY3Rpb24gcmF3QXNhcCh0YXNrKSB7XG4gICAgaWYgKCFxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcmVxdWVzdEZsdXNoKCk7XG4gICAgICAgIGZsdXNoaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gRXF1aXZhbGVudCB0byBwdXNoLCBidXQgYXZvaWRzIGEgZnVuY3Rpb24gY2FsbC5cbiAgICBxdWV1ZVtxdWV1ZS5sZW5ndGhdID0gdGFzaztcbn1cblxudmFyIHF1ZXVlID0gW107XG4vLyBPbmNlIGEgZmx1c2ggaGFzIGJlZW4gcmVxdWVzdGVkLCBubyBmdXJ0aGVyIGNhbGxzIHRvIGByZXF1ZXN0Rmx1c2hgIGFyZVxuLy8gbmVjZXNzYXJ5IHVudGlsIHRoZSBuZXh0IGBmbHVzaGAgY29tcGxldGVzLlxudmFyIGZsdXNoaW5nID0gZmFsc2U7XG4vLyBgcmVxdWVzdEZsdXNoYCBpcyBhbiBpbXBsZW1lbnRhdGlvbi1zcGVjaWZpYyBtZXRob2QgdGhhdCBhdHRlbXB0cyB0byBraWNrXG4vLyBvZmYgYSBgZmx1c2hgIGV2ZW50IGFzIHF1aWNrbHkgYXMgcG9zc2libGUuIGBmbHVzaGAgd2lsbCBhdHRlbXB0IHRvIGV4aGF1c3Rcbi8vIHRoZSBldmVudCBxdWV1ZSBiZWZvcmUgeWllbGRpbmcgdG8gdGhlIGJyb3dzZXIncyBvd24gZXZlbnQgbG9vcC5cbnZhciByZXF1ZXN0Rmx1c2g7XG4vLyBUaGUgcG9zaXRpb24gb2YgdGhlIG5leHQgdGFzayB0byBleGVjdXRlIGluIHRoZSB0YXNrIHF1ZXVlLiBUaGlzIGlzXG4vLyBwcmVzZXJ2ZWQgYmV0d2VlbiBjYWxscyB0byBgZmx1c2hgIHNvIHRoYXQgaXQgY2FuIGJlIHJlc3VtZWQgaWZcbi8vIGEgdGFzayB0aHJvd3MgYW4gZXhjZXB0aW9uLlxudmFyIGluZGV4ID0gMDtcbi8vIElmIGEgdGFzayBzY2hlZHVsZXMgYWRkaXRpb25hbCB0YXNrcyByZWN1cnNpdmVseSwgdGhlIHRhc2sgcXVldWUgY2FuIGdyb3dcbi8vIHVuYm91bmRlZC4gVG8gcHJldmVudCBtZW1vcnkgZXhoYXVzdGlvbiwgdGhlIHRhc2sgcXVldWUgd2lsbCBwZXJpb2RpY2FsbHlcbi8vIHRydW5jYXRlIGFscmVhZHktY29tcGxldGVkIHRhc2tzLlxudmFyIGNhcGFjaXR5ID0gMTAyNDtcblxuLy8gVGhlIGZsdXNoIGZ1bmN0aW9uIHByb2Nlc3NlcyBhbGwgdGFza3MgdGhhdCBoYXZlIGJlZW4gc2NoZWR1bGVkIHdpdGhcbi8vIGByYXdBc2FwYCB1bmxlc3MgYW5kIHVudGlsIG9uZSBvZiB0aG9zZSB0YXNrcyB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuLy8gSWYgYSB0YXNrIHRocm93cyBhbiBleGNlcHRpb24sIGBmbHVzaGAgZW5zdXJlcyB0aGF0IGl0cyBzdGF0ZSB3aWxsIHJlbWFpblxuLy8gY29uc2lzdGVudCBhbmQgd2lsbCByZXN1bWUgd2hlcmUgaXQgbGVmdCBvZmYgd2hlbiBjYWxsZWQgYWdhaW4uXG4vLyBIb3dldmVyLCBgZmx1c2hgIGRvZXMgbm90IG1ha2UgYW55IGFycmFuZ2VtZW50cyB0byBiZSBjYWxsZWQgYWdhaW4gaWYgYW5cbi8vIGV4Y2VwdGlvbiBpcyB0aHJvd24uXG5mdW5jdGlvbiBmbHVzaCgpIHtcbiAgICB3aGlsZSAoaW5kZXggPCBxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgICAgICAvLyBBZHZhbmNlIHRoZSBpbmRleCBiZWZvcmUgY2FsbGluZyB0aGUgdGFzay4gVGhpcyBlbnN1cmVzIHRoYXQgd2Ugd2lsbFxuICAgICAgICAvLyBiZWdpbiBmbHVzaGluZyBvbiB0aGUgbmV4dCB0YXNrIHRoZSB0YXNrIHRocm93cyBhbiBlcnJvci5cbiAgICAgICAgaW5kZXggPSBpbmRleCArIDE7XG4gICAgICAgIHF1ZXVlW2N1cnJlbnRJbmRleF0uY2FsbCgpO1xuICAgICAgICAvLyBQcmV2ZW50IGxlYWtpbmcgbWVtb3J5IGZvciBsb25nIGNoYWlucyBvZiByZWN1cnNpdmUgY2FsbHMgdG8gYGFzYXBgLlxuICAgICAgICAvLyBJZiB3ZSBjYWxsIGBhc2FwYCB3aXRoaW4gdGFza3Mgc2NoZWR1bGVkIGJ5IGBhc2FwYCwgdGhlIHF1ZXVlIHdpbGxcbiAgICAgICAgLy8gZ3JvdywgYnV0IHRvIGF2b2lkIGFuIE8obikgd2FsayBmb3IgZXZlcnkgdGFzayB3ZSBleGVjdXRlLCB3ZSBkb24ndFxuICAgICAgICAvLyBzaGlmdCB0YXNrcyBvZmYgdGhlIHF1ZXVlIGFmdGVyIHRoZXkgaGF2ZSBiZWVuIGV4ZWN1dGVkLlxuICAgICAgICAvLyBJbnN0ZWFkLCB3ZSBwZXJpb2RpY2FsbHkgc2hpZnQgMTAyNCB0YXNrcyBvZmYgdGhlIHF1ZXVlLlxuICAgICAgICBpZiAoaW5kZXggPiBjYXBhY2l0eSkge1xuICAgICAgICAgICAgLy8gTWFudWFsbHkgc2hpZnQgYWxsIHZhbHVlcyBzdGFydGluZyBhdCB0aGUgaW5kZXggYmFjayB0byB0aGVcbiAgICAgICAgICAgIC8vIGJlZ2lubmluZyBvZiB0aGUgcXVldWUuXG4gICAgICAgICAgICBmb3IgKHZhciBzY2FuID0gMCwgbmV3TGVuZ3RoID0gcXVldWUubGVuZ3RoIC0gaW5kZXg7IHNjYW4gPCBuZXdMZW5ndGg7IHNjYW4rKykge1xuICAgICAgICAgICAgICAgIHF1ZXVlW3NjYW5dID0gcXVldWVbc2NhbiArIGluZGV4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXVlLmxlbmd0aCAtPSBpbmRleDtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5sZW5ndGggPSAwO1xuICAgIGluZGV4ID0gMDtcbiAgICBmbHVzaGluZyA9IGZhbHNlO1xufVxuXG4vLyBgcmVxdWVzdEZsdXNoYCBpcyBpbXBsZW1lbnRlZCB1c2luZyBhIHN0cmF0ZWd5IGJhc2VkIG9uIGRhdGEgY29sbGVjdGVkIGZyb21cbi8vIGV2ZXJ5IGF2YWlsYWJsZSBTYXVjZUxhYnMgU2VsZW5pdW0gd2ViIGRyaXZlciB3b3JrZXIgYXQgdGltZSBvZiB3cml0aW5nLlxuLy8gaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vc3ByZWFkc2hlZXRzL2QvMW1HLTVVWUd1cDVxeEdkRU1Xa2hQNkJXQ3owNTNOVWIyRTFRb1VUVTE2dUEvZWRpdCNnaWQ9NzgzNzI0NTkzXG5cbi8vIFNhZmFyaSA2IGFuZCA2LjEgZm9yIGRlc2t0b3AsIGlQYWQsIGFuZCBpUGhvbmUgYXJlIHRoZSBvbmx5IGJyb3dzZXJzIHRoYXRcbi8vIGhhdmUgV2ViS2l0TXV0YXRpb25PYnNlcnZlciBidXQgbm90IHVuLXByZWZpeGVkIE11dGF0aW9uT2JzZXJ2ZXIuXG4vLyBNdXN0IHVzZSBgZ2xvYmFsYCBpbnN0ZWFkIG9mIGB3aW5kb3dgIHRvIHdvcmsgaW4gYm90aCBmcmFtZXMgYW5kIHdlYlxuLy8gd29ya2Vycy4gYGdsb2JhbGAgaXMgYSBwcm92aXNpb24gb2YgQnJvd3NlcmlmeSwgTXIsIE1ycywgb3IgTW9wLlxudmFyIEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG5cbi8vIE11dGF0aW9uT2JzZXJ2ZXJzIGFyZSBkZXNpcmFibGUgYmVjYXVzZSB0aGV5IGhhdmUgaGlnaCBwcmlvcml0eSBhbmQgd29ya1xuLy8gcmVsaWFibHkgZXZlcnl3aGVyZSB0aGV5IGFyZSBpbXBsZW1lbnRlZC5cbi8vIFRoZXkgYXJlIGltcGxlbWVudGVkIGluIGFsbCBtb2Rlcm4gYnJvd3NlcnMuXG4vL1xuLy8gLSBBbmRyb2lkIDQtNC4zXG4vLyAtIENocm9tZSAyNi0zNFxuLy8gLSBGaXJlZm94IDE0LTI5XG4vLyAtIEludGVybmV0IEV4cGxvcmVyIDExXG4vLyAtIGlQYWQgU2FmYXJpIDYtNy4xXG4vLyAtIGlQaG9uZSBTYWZhcmkgNy03LjFcbi8vIC0gU2FmYXJpIDYtN1xuaWYgKHR5cGVvZiBCcm93c2VyTXV0YXRpb25PYnNlcnZlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmVxdWVzdEZsdXNoID0gbWFrZVJlcXVlc3RDYWxsRnJvbU11dGF0aW9uT2JzZXJ2ZXIoZmx1c2gpO1xuXG4vLyBNZXNzYWdlQ2hhbm5lbHMgYXJlIGRlc2lyYWJsZSBiZWNhdXNlIHRoZXkgZ2l2ZSBkaXJlY3QgYWNjZXNzIHRvIHRoZSBIVE1MXG4vLyB0YXNrIHF1ZXVlLCBhcmUgaW1wbGVtZW50ZWQgaW4gSW50ZXJuZXQgRXhwbG9yZXIgMTAsIFNhZmFyaSA1LjAtMSwgYW5kIE9wZXJhXG4vLyAxMS0xMiwgYW5kIGluIHdlYiB3b3JrZXJzIGluIG1hbnkgZW5naW5lcy5cbi8vIEFsdGhvdWdoIG1lc3NhZ2UgY2hhbm5lbHMgeWllbGQgdG8gYW55IHF1ZXVlZCByZW5kZXJpbmcgYW5kIElPIHRhc2tzLCB0aGV5XG4vLyB3b3VsZCBiZSBiZXR0ZXIgdGhhbiBpbXBvc2luZyB0aGUgNG1zIGRlbGF5IG9mIHRpbWVycy5cbi8vIEhvd2V2ZXIsIHRoZXkgZG8gbm90IHdvcmsgcmVsaWFibHkgaW4gSW50ZXJuZXQgRXhwbG9yZXIgb3IgU2FmYXJpLlxuXG4vLyBJbnRlcm5ldCBFeHBsb3JlciAxMCBpcyB0aGUgb25seSBicm93c2VyIHRoYXQgaGFzIHNldEltbWVkaWF0ZSBidXQgZG9lc1xuLy8gbm90IGhhdmUgTXV0YXRpb25PYnNlcnZlcnMuXG4vLyBBbHRob3VnaCBzZXRJbW1lZGlhdGUgeWllbGRzIHRvIHRoZSBicm93c2VyJ3MgcmVuZGVyZXIsIGl0IHdvdWxkIGJlXG4vLyBwcmVmZXJyYWJsZSB0byBmYWxsaW5nIGJhY2sgdG8gc2V0VGltZW91dCBzaW5jZSBpdCBkb2VzIG5vdCBoYXZlXG4vLyB0aGUgbWluaW11bSA0bXMgcGVuYWx0eS5cbi8vIFVuZm9ydHVuYXRlbHkgdGhlcmUgYXBwZWFycyB0byBiZSBhIGJ1ZyBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMCBNb2JpbGUgKGFuZFxuLy8gRGVza3RvcCB0byBhIGxlc3NlciBleHRlbnQpIHRoYXQgcmVuZGVycyBib3RoIHNldEltbWVkaWF0ZSBhbmRcbi8vIE1lc3NhZ2VDaGFubmVsIHVzZWxlc3MgZm9yIHRoZSBwdXJwb3NlcyBvZiBBU0FQLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2tyaXNrb3dhbC9xL2lzc3Vlcy8zOTZcblxuLy8gVGltZXJzIGFyZSBpbXBsZW1lbnRlZCB1bml2ZXJzYWxseS5cbi8vIFdlIGZhbGwgYmFjayB0byB0aW1lcnMgaW4gd29ya2VycyBpbiBtb3N0IGVuZ2luZXMsIGFuZCBpbiBmb3JlZ3JvdW5kXG4vLyBjb250ZXh0cyBpbiB0aGUgZm9sbG93aW5nIGJyb3dzZXJzLlxuLy8gSG93ZXZlciwgbm90ZSB0aGF0IGV2ZW4gdGhpcyBzaW1wbGUgY2FzZSByZXF1aXJlcyBudWFuY2VzIHRvIG9wZXJhdGUgaW4gYVxuLy8gYnJvYWQgc3BlY3RydW0gb2YgYnJvd3NlcnMuXG4vL1xuLy8gLSBGaXJlZm94IDMtMTNcbi8vIC0gSW50ZXJuZXQgRXhwbG9yZXIgNi05XG4vLyAtIGlQYWQgU2FmYXJpIDQuM1xuLy8gLSBMeW54IDIuOC43XG59IGVsc2Uge1xuICAgIHJlcXVlc3RGbHVzaCA9IG1ha2VSZXF1ZXN0Q2FsbEZyb21UaW1lcihmbHVzaCk7XG59XG5cbi8vIGByZXF1ZXN0Rmx1c2hgIHJlcXVlc3RzIHRoYXQgdGhlIGhpZ2ggcHJpb3JpdHkgZXZlbnQgcXVldWUgYmUgZmx1c2hlZCBhc1xuLy8gc29vbiBhcyBwb3NzaWJsZS5cbi8vIFRoaXMgaXMgdXNlZnVsIHRvIHByZXZlbnQgYW4gZXJyb3IgdGhyb3duIGluIGEgdGFzayBmcm9tIHN0YWxsaW5nIHRoZSBldmVudFxuLy8gcXVldWUgaWYgdGhlIGV4Y2VwdGlvbiBoYW5kbGVkIGJ5IE5vZGUuanPigJlzXG4vLyBgcHJvY2Vzcy5vbihcInVuY2F1Z2h0RXhjZXB0aW9uXCIpYCBvciBieSBhIGRvbWFpbi5cbnJhd0FzYXAucmVxdWVzdEZsdXNoID0gcmVxdWVzdEZsdXNoO1xuXG4vLyBUbyByZXF1ZXN0IGEgaGlnaCBwcmlvcml0eSBldmVudCwgd2UgaW5kdWNlIGEgbXV0YXRpb24gb2JzZXJ2ZXIgYnkgdG9nZ2xpbmdcbi8vIHRoZSB0ZXh0IG9mIGEgdGV4dCBub2RlIGJldHdlZW4gXCIxXCIgYW5kIFwiLTFcIi5cbmZ1bmN0aW9uIG1ha2VSZXF1ZXN0Q2FsbEZyb21NdXRhdGlvbk9ic2VydmVyKGNhbGxiYWNrKSB7XG4gICAgdmFyIHRvZ2dsZSA9IDE7XG4gICAgdmFyIG9ic2VydmVyID0gbmV3IEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKGNhbGxiYWNrKTtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpO1xuICAgIG9ic2VydmVyLm9ic2VydmUobm9kZSwge2NoYXJhY3RlckRhdGE6IHRydWV9KTtcbiAgICByZXR1cm4gZnVuY3Rpb24gcmVxdWVzdENhbGwoKSB7XG4gICAgICAgIHRvZ2dsZSA9IC10b2dnbGU7XG4gICAgICAgIG5vZGUuZGF0YSA9IHRvZ2dsZTtcbiAgICB9O1xufVxuXG4vLyBUaGUgbWVzc2FnZSBjaGFubmVsIHRlY2huaXF1ZSB3YXMgZGlzY292ZXJlZCBieSBNYWx0ZSBVYmwgYW5kIHdhcyB0aGVcbi8vIG9yaWdpbmFsIGZvdW5kYXRpb24gZm9yIHRoaXMgbGlicmFyeS5cbi8vIGh0dHA6Ly93d3cubm9uYmxvY2tpbmcuaW8vMjAxMS8wNi93aW5kb3duZXh0dGljay5odG1sXG5cbi8vIFNhZmFyaSA2LjAuNSAoYXQgbGVhc3QpIGludGVybWl0dGVudGx5IGZhaWxzIHRvIGNyZWF0ZSBtZXNzYWdlIHBvcnRzIG9uIGFcbi8vIHBhZ2UncyBmaXJzdCBsb2FkLiBUaGFua2Z1bGx5LCB0aGlzIHZlcnNpb24gb2YgU2FmYXJpIHN1cHBvcnRzXG4vLyBNdXRhdGlvbk9ic2VydmVycywgc28gd2UgZG9uJ3QgbmVlZCB0byBmYWxsIGJhY2sgaW4gdGhhdCBjYXNlLlxuXG4vLyBmdW5jdGlvbiBtYWtlUmVxdWVzdENhbGxGcm9tTWVzc2FnZUNoYW5uZWwoY2FsbGJhY2spIHtcbi8vICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuLy8gICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gY2FsbGJhY2s7XG4vLyAgICAgcmV0dXJuIGZ1bmN0aW9uIHJlcXVlc3RDYWxsKCkge1xuLy8gICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKDApO1xuLy8gICAgIH07XG4vLyB9XG5cbi8vIEZvciByZWFzb25zIGV4cGxhaW5lZCBhYm92ZSwgd2UgYXJlIGFsc28gdW5hYmxlIHRvIHVzZSBgc2V0SW1tZWRpYXRlYFxuLy8gdW5kZXIgYW55IGNpcmN1bXN0YW5jZXMuXG4vLyBFdmVuIGlmIHdlIHdlcmUsIHRoZXJlIGlzIGFub3RoZXIgYnVnIGluIEludGVybmV0IEV4cGxvcmVyIDEwLlxuLy8gSXQgaXMgbm90IHN1ZmZpY2llbnQgdG8gYXNzaWduIGBzZXRJbW1lZGlhdGVgIHRvIGByZXF1ZXN0Rmx1c2hgIGJlY2F1c2Vcbi8vIGBzZXRJbW1lZGlhdGVgIG11c3QgYmUgY2FsbGVkICpieSBuYW1lKiBhbmQgdGhlcmVmb3JlIG11c3QgYmUgd3JhcHBlZCBpbiBhXG4vLyBjbG9zdXJlLlxuLy8gTmV2ZXIgZm9yZ2V0LlxuXG4vLyBmdW5jdGlvbiBtYWtlUmVxdWVzdENhbGxGcm9tU2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4vLyAgICAgcmV0dXJuIGZ1bmN0aW9uIHJlcXVlc3RDYWxsKCkge1xuLy8gICAgICAgICBzZXRJbW1lZGlhdGUoY2FsbGJhY2spO1xuLy8gICAgIH07XG4vLyB9XG5cbi8vIFNhZmFyaSA2LjAgaGFzIGEgcHJvYmxlbSB3aGVyZSB0aW1lcnMgd2lsbCBnZXQgbG9zdCB3aGlsZSB0aGUgdXNlciBpc1xuLy8gc2Nyb2xsaW5nLiBUaGlzIHByb2JsZW0gZG9lcyBub3QgaW1wYWN0IEFTQVAgYmVjYXVzZSBTYWZhcmkgNi4wIHN1cHBvcnRzXG4vLyBtdXRhdGlvbiBvYnNlcnZlcnMsIHNvIHRoYXQgaW1wbGVtZW50YXRpb24gaXMgdXNlZCBpbnN0ZWFkLlxuLy8gSG93ZXZlciwgaWYgd2UgZXZlciBlbGVjdCB0byB1c2UgdGltZXJzIGluIFNhZmFyaSwgdGhlIHByZXZhbGVudCB3b3JrLWFyb3VuZFxuLy8gaXMgdG8gYWRkIGEgc2Nyb2xsIGV2ZW50IGxpc3RlbmVyIHRoYXQgY2FsbHMgZm9yIGEgZmx1c2guXG5cbi8vIGBzZXRUaW1lb3V0YCBkb2VzIG5vdCBjYWxsIHRoZSBwYXNzZWQgY2FsbGJhY2sgaWYgdGhlIGRlbGF5IGlzIGxlc3MgdGhhblxuLy8gYXBwcm94aW1hdGVseSA3IGluIHdlYiB3b3JrZXJzIGluIEZpcmVmb3ggOCB0aHJvdWdoIDE4LCBhbmQgc29tZXRpbWVzIG5vdFxuLy8gZXZlbiB0aGVuLlxuXG5mdW5jdGlvbiBtYWtlUmVxdWVzdENhbGxGcm9tVGltZXIoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gcmVxdWVzdENhbGwoKSB7XG4gICAgICAgIC8vIFdlIGRpc3BhdGNoIGEgdGltZW91dCB3aXRoIGEgc3BlY2lmaWVkIGRlbGF5IG9mIDAgZm9yIGVuZ2luZXMgdGhhdFxuICAgICAgICAvLyBjYW4gcmVsaWFibHkgYWNjb21tb2RhdGUgdGhhdCByZXF1ZXN0LiBUaGlzIHdpbGwgdXN1YWxseSBiZSBzbmFwcGVkXG4gICAgICAgIC8vIHRvIGEgNCBtaWxpc2Vjb25kIGRlbGF5LCBidXQgb25jZSB3ZSdyZSBmbHVzaGluZywgdGhlcmUncyBubyBkZWxheVxuICAgICAgICAvLyBiZXR3ZWVuIGV2ZW50cy5cbiAgICAgICAgdmFyIHRpbWVvdXRIYW5kbGUgPSBzZXRUaW1lb3V0KGhhbmRsZVRpbWVyLCAwKTtcbiAgICAgICAgLy8gSG93ZXZlciwgc2luY2UgdGhpcyB0aW1lciBnZXRzIGZyZXF1ZW50bHkgZHJvcHBlZCBpbiBGaXJlZm94XG4gICAgICAgIC8vIHdvcmtlcnMsIHdlIGVubGlzdCBhbiBpbnRlcnZhbCBoYW5kbGUgdGhhdCB3aWxsIHRyeSB0byBmaXJlXG4gICAgICAgIC8vIGFuIGV2ZW50IDIwIHRpbWVzIHBlciBzZWNvbmQgdW50aWwgaXQgc3VjY2VlZHMuXG4gICAgICAgIHZhciBpbnRlcnZhbEhhbmRsZSA9IHNldEludGVydmFsKGhhbmRsZVRpbWVyLCA1MCk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlVGltZXIoKSB7XG4gICAgICAgICAgICAvLyBXaGljaGV2ZXIgdGltZXIgc3VjY2VlZHMgd2lsbCBjYW5jZWwgYm90aCB0aW1lcnMgYW5kXG4gICAgICAgICAgICAvLyBleGVjdXRlIHRoZSBjYWxsYmFjay5cbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SGFuZGxlKTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxIYW5kbGUpO1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbi8vIFRoaXMgaXMgZm9yIGBhc2FwLmpzYCBvbmx5LlxuLy8gSXRzIG5hbWUgd2lsbCBiZSBwZXJpb2RpY2FsbHkgcmFuZG9taXplZCB0byBicmVhayBhbnkgY29kZSB0aGF0IGRlcGVuZHMgb25cbi8vIGl0cyBleGlzdGVuY2UuXG5yYXdBc2FwLm1ha2VSZXF1ZXN0Q2FsbEZyb21UaW1lciA9IG1ha2VSZXF1ZXN0Q2FsbEZyb21UaW1lcjtcblxuLy8gQVNBUCB3YXMgb3JpZ2luYWxseSBhIG5leHRUaWNrIHNoaW0gaW5jbHVkZWQgaW4gUS4gVGhpcyB3YXMgZmFjdG9yZWQgb3V0XG4vLyBpbnRvIHRoaXMgQVNBUCBwYWNrYWdlLiBJdCB3YXMgbGF0ZXIgYWRhcHRlZCB0byBSU1ZQIHdoaWNoIG1hZGUgZnVydGhlclxuLy8gYW1lbmRtZW50cy4gVGhlc2UgZGVjaXNpb25zLCBwYXJ0aWN1bGFybHkgdG8gbWFyZ2luYWxpemUgTWVzc2FnZUNoYW5uZWwgYW5kXG4vLyB0byBjYXB0dXJlIHRoZSBNdXRhdGlvbk9ic2VydmVyIGltcGxlbWVudGF0aW9uIGluIGEgY2xvc3VyZSwgd2VyZSBpbnRlZ3JhdGVkXG4vLyBiYWNrIGludG8gQVNBUCBwcm9wZXIuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGlsZGVpby9yc3ZwLmpzL2Jsb2IvY2RkZjcyMzI1NDZhOWNmODU4NTI0Yjc1Y2RlNmY5ZWRmNzI2MjBhNy9saWIvcnN2cC9hc2FwLmpzXG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGRvbWFpbjsgLy8gVGhlIGRvbWFpbiBtb2R1bGUgaXMgZXhlY3V0ZWQgb24gZGVtYW5kXG52YXIgaGFzU2V0SW1tZWRpYXRlID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiO1xuXG4vLyBVc2UgdGhlIGZhc3Rlc3QgbWVhbnMgcG9zc2libGUgdG8gZXhlY3V0ZSBhIHRhc2sgaW4gaXRzIG93biB0dXJuLCB3aXRoXG4vLyBwcmlvcml0eSBvdmVyIG90aGVyIGV2ZW50cyBpbmNsdWRpbmcgbmV0d29yayBJTyBldmVudHMgaW4gTm9kZS5qcy5cbi8vXG4vLyBBbiBleGNlcHRpb24gdGhyb3duIGJ5IGEgdGFzayB3aWxsIHBlcm1hbmVudGx5IGludGVycnVwdCB0aGUgcHJvY2Vzc2luZyBvZlxuLy8gc3Vic2VxdWVudCB0YXNrcy4gVGhlIGhpZ2hlciBsZXZlbCBgYXNhcGAgZnVuY3Rpb24gZW5zdXJlcyB0aGF0IGlmIGFuXG4vLyBleGNlcHRpb24gaXMgdGhyb3duIGJ5IGEgdGFzaywgdGhhdCB0aGUgdGFzayBxdWV1ZSB3aWxsIGNvbnRpbnVlIGZsdXNoaW5nIGFzXG4vLyBzb29uIGFzIHBvc3NpYmxlLCBidXQgaWYgeW91IHVzZSBgcmF3QXNhcGAgZGlyZWN0bHksIHlvdSBhcmUgcmVzcG9uc2libGUgdG9cbi8vIGVpdGhlciBlbnN1cmUgdGhhdCBubyBleGNlcHRpb25zIGFyZSB0aHJvd24gZnJvbSB5b3VyIHRhc2ssIG9yIHRvIG1hbnVhbGx5XG4vLyBjYWxsIGByYXdBc2FwLnJlcXVlc3RGbHVzaGAgaWYgYW4gZXhjZXB0aW9uIGlzIHRocm93bi5cbm1vZHVsZS5leHBvcnRzID0gcmF3QXNhcDtcbmZ1bmN0aW9uIHJhd0FzYXAodGFzaykge1xuICAgIGlmICghcXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHJlcXVlc3RGbHVzaCgpO1xuICAgICAgICBmbHVzaGluZyA9IHRydWU7XG4gICAgfVxuICAgIC8vIEF2b2lkcyBhIGZ1bmN0aW9uIGNhbGxcbiAgICBxdWV1ZVtxdWV1ZS5sZW5ndGhdID0gdGFzaztcbn1cblxudmFyIHF1ZXVlID0gW107XG4vLyBPbmNlIGEgZmx1c2ggaGFzIGJlZW4gcmVxdWVzdGVkLCBubyBmdXJ0aGVyIGNhbGxzIHRvIGByZXF1ZXN0Rmx1c2hgIGFyZVxuLy8gbmVjZXNzYXJ5IHVudGlsIHRoZSBuZXh0IGBmbHVzaGAgY29tcGxldGVzLlxudmFyIGZsdXNoaW5nID0gZmFsc2U7XG4vLyBUaGUgcG9zaXRpb24gb2YgdGhlIG5leHQgdGFzayB0byBleGVjdXRlIGluIHRoZSB0YXNrIHF1ZXVlLiBUaGlzIGlzXG4vLyBwcmVzZXJ2ZWQgYmV0d2VlbiBjYWxscyB0byBgZmx1c2hgIHNvIHRoYXQgaXQgY2FuIGJlIHJlc3VtZWQgaWZcbi8vIGEgdGFzayB0aHJvd3MgYW4gZXhjZXB0aW9uLlxudmFyIGluZGV4ID0gMDtcbi8vIElmIGEgdGFzayBzY2hlZHVsZXMgYWRkaXRpb25hbCB0YXNrcyByZWN1cnNpdmVseSwgdGhlIHRhc2sgcXVldWUgY2FuIGdyb3dcbi8vIHVuYm91bmRlZC4gVG8gcHJldmVudCBtZW1vcnkgZXhjYXVzdGlvbiwgdGhlIHRhc2sgcXVldWUgd2lsbCBwZXJpb2RpY2FsbHlcbi8vIHRydW5jYXRlIGFscmVhZHktY29tcGxldGVkIHRhc2tzLlxudmFyIGNhcGFjaXR5ID0gMTAyNDtcblxuLy8gVGhlIGZsdXNoIGZ1bmN0aW9uIHByb2Nlc3NlcyBhbGwgdGFza3MgdGhhdCBoYXZlIGJlZW4gc2NoZWR1bGVkIHdpdGhcbi8vIGByYXdBc2FwYCB1bmxlc3MgYW5kIHVudGlsIG9uZSBvZiB0aG9zZSB0YXNrcyB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuLy8gSWYgYSB0YXNrIHRocm93cyBhbiBleGNlcHRpb24sIGBmbHVzaGAgZW5zdXJlcyB0aGF0IGl0cyBzdGF0ZSB3aWxsIHJlbWFpblxuLy8gY29uc2lzdGVudCBhbmQgd2lsbCByZXN1bWUgd2hlcmUgaXQgbGVmdCBvZmYgd2hlbiBjYWxsZWQgYWdhaW4uXG4vLyBIb3dldmVyLCBgZmx1c2hgIGRvZXMgbm90IG1ha2UgYW55IGFycmFuZ2VtZW50cyB0byBiZSBjYWxsZWQgYWdhaW4gaWYgYW5cbi8vIGV4Y2VwdGlvbiBpcyB0aHJvd24uXG5mdW5jdGlvbiBmbHVzaCgpIHtcbiAgICB3aGlsZSAoaW5kZXggPCBxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgICAgICAvLyBBZHZhbmNlIHRoZSBpbmRleCBiZWZvcmUgY2FsbGluZyB0aGUgdGFzay4gVGhpcyBlbnN1cmVzIHRoYXQgd2Ugd2lsbFxuICAgICAgICAvLyBiZWdpbiBmbHVzaGluZyBvbiB0aGUgbmV4dCB0YXNrIHRoZSB0YXNrIHRocm93cyBhbiBlcnJvci5cbiAgICAgICAgaW5kZXggPSBpbmRleCArIDE7XG4gICAgICAgIHF1ZXVlW2N1cnJlbnRJbmRleF0uY2FsbCgpO1xuICAgICAgICAvLyBQcmV2ZW50IGxlYWtpbmcgbWVtb3J5IGZvciBsb25nIGNoYWlucyBvZiByZWN1cnNpdmUgY2FsbHMgdG8gYGFzYXBgLlxuICAgICAgICAvLyBJZiB3ZSBjYWxsIGBhc2FwYCB3aXRoaW4gdGFza3Mgc2NoZWR1bGVkIGJ5IGBhc2FwYCwgdGhlIHF1ZXVlIHdpbGxcbiAgICAgICAgLy8gZ3JvdywgYnV0IHRvIGF2b2lkIGFuIE8obikgd2FsayBmb3IgZXZlcnkgdGFzayB3ZSBleGVjdXRlLCB3ZSBkb24ndFxuICAgICAgICAvLyBzaGlmdCB0YXNrcyBvZmYgdGhlIHF1ZXVlIGFmdGVyIHRoZXkgaGF2ZSBiZWVuIGV4ZWN1dGVkLlxuICAgICAgICAvLyBJbnN0ZWFkLCB3ZSBwZXJpb2RpY2FsbHkgc2hpZnQgMTAyNCB0YXNrcyBvZmYgdGhlIHF1ZXVlLlxuICAgICAgICBpZiAoaW5kZXggPiBjYXBhY2l0eSkge1xuICAgICAgICAgICAgLy8gTWFudWFsbHkgc2hpZnQgYWxsIHZhbHVlcyBzdGFydGluZyBhdCB0aGUgaW5kZXggYmFjayB0byB0aGVcbiAgICAgICAgICAgIC8vIGJlZ2lubmluZyBvZiB0aGUgcXVldWUuXG4gICAgICAgICAgICBmb3IgKHZhciBzY2FuID0gMCwgbmV3TGVuZ3RoID0gcXVldWUubGVuZ3RoIC0gaW5kZXg7IHNjYW4gPCBuZXdMZW5ndGg7IHNjYW4rKykge1xuICAgICAgICAgICAgICAgIHF1ZXVlW3NjYW5dID0gcXVldWVbc2NhbiArIGluZGV4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXVlLmxlbmd0aCAtPSBpbmRleDtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5sZW5ndGggPSAwO1xuICAgIGluZGV4ID0gMDtcbiAgICBmbHVzaGluZyA9IGZhbHNlO1xufVxuXG5yYXdBc2FwLnJlcXVlc3RGbHVzaCA9IHJlcXVlc3RGbHVzaDtcbmZ1bmN0aW9uIHJlcXVlc3RGbHVzaCgpIHtcbiAgICAvLyBFbnN1cmUgZmx1c2hpbmcgaXMgbm90IGJvdW5kIHRvIGFueSBkb21haW4uXG4gICAgLy8gSXQgaXMgbm90IHN1ZmZpY2llbnQgdG8gZXhpdCB0aGUgZG9tYWluLCBiZWNhdXNlIGRvbWFpbnMgZXhpc3Qgb24gYSBzdGFjay5cbiAgICAvLyBUbyBleGVjdXRlIGNvZGUgb3V0c2lkZSBvZiBhbnkgZG9tYWluLCB0aGUgZm9sbG93aW5nIGRhbmNlIGlzIG5lY2Vzc2FyeS5cbiAgICB2YXIgcGFyZW50RG9tYWluID0gcHJvY2Vzcy5kb21haW47XG4gICAgaWYgKHBhcmVudERvbWFpbikge1xuICAgICAgICBpZiAoIWRvbWFpbikge1xuICAgICAgICAgICAgLy8gTGF6eSBleGVjdXRlIHRoZSBkb21haW4gbW9kdWxlLlxuICAgICAgICAgICAgLy8gT25seSBlbXBsb3llZCBpZiB0aGUgdXNlciBlbGVjdHMgdG8gdXNlIGRvbWFpbnMuXG4gICAgICAgICAgICBkb21haW4gPSByZXF1aXJlKFwiZG9tYWluXCIpO1xuICAgICAgICB9XG4gICAgICAgIGRvbWFpbi5hY3RpdmUgPSBwcm9jZXNzLmRvbWFpbiA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gYHNldEltbWVkaWF0ZWAgaXMgc2xvd2VyIHRoYXQgYHByb2Nlc3MubmV4dFRpY2tgLCBidXQgYHByb2Nlc3MubmV4dFRpY2tgXG4gICAgLy8gY2Fubm90IGhhbmRsZSByZWN1cnNpb24uXG4gICAgLy8gYHJlcXVlc3RGbHVzaGAgd2lsbCBvbmx5IGJlIGNhbGxlZCByZWN1cnNpdmVseSBmcm9tIGBhc2FwLmpzYCwgdG8gcmVzdW1lXG4gICAgLy8gZmx1c2hpbmcgYWZ0ZXIgYW4gZXJyb3IgaXMgdGhyb3duIGludG8gYSBkb21haW4uXG4gICAgLy8gQ29udmVuaWVudGx5LCBgc2V0SW1tZWRpYXRlYCB3YXMgaW50cm9kdWNlZCBpbiB0aGUgc2FtZSB2ZXJzaW9uXG4gICAgLy8gYHByb2Nlc3MubmV4dFRpY2tgIHN0YXJ0ZWQgdGhyb3dpbmcgcmVjdXJzaW9uIGVycm9ycy5cbiAgICBpZiAoZmx1c2hpbmcgJiYgaGFzU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHNldEltbWVkaWF0ZShmbHVzaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmVudERvbWFpbikge1xuICAgICAgICBkb21haW4uYWN0aXZlID0gcHJvY2Vzcy5kb21haW4gPSBwYXJlbnREb21haW47XG4gICAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBUaGlzIGZpbGUgY29udGFpbnMgZGVmaW5pdGlvbnMgb2YgcnVsZXMgaG93IGxvY2F0aW9uIFVSTHMgYXJlIHRyYW5zbGF0ZWRcbi8vIHRvIHBhcmFtZXRlcnMgZm9yIHN0b3JlcyBpbiBDYXRiZXJyeSBhcHBsaWNhdGlvbi5cbi8vXG4vLyBGb3JtYXQ6XG4vLyAvc29tZS86cGFyYW1ldGVyW3N0b3JlMSxzdG9yZTIsc3RvcmUzXVxuLy9cbi8vIE1vcmUgZGV0YWlscyBoZXJlOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2NhdGJlcnJ5L2NhdGJlcnJ5L2Jsb2IvbWFzdGVyL2RvY3MvaW5kZXgubWQjcm91dGluZ1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtcblx0Jy8nXG5dO1xuIiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4vKipcbiAqIFRoaXMgbW9kdWxlIGlzIGEgdGVtcGxhdGUgYW5kIGl0IGlzIHVzZWQgb25seSB3aXRoIHNvbWUgc3RyaW5nIHJlcGxhY2VzXG4gKiBieSBCcm93c2VyQnVuZGxlQnVpbGRlciBtb2R1bGUuIEl0IGRvZXMgbm90IHdvcmsgYnkgaXRzZWxmLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHN0b3JlcyA9IFtcblxue25hbWU6ICdNYWluJywgY29uc3RydWN0b3I6IHJlcXVpcmUoJy4vY2F0YmVycnlfc3RvcmVzXFxcXE1haW4uanMnKX1cbl07XG5cbnZhciBjb21wb25lbnRzID0gW1xuXG57bmFtZTogJ2RvY3VtZW50JywgY29uc3RydWN0b3I6IHJlcXVpcmUoJy4vY2F0YmVycnlfY29tcG9uZW50c1xcXFxkb2N1bWVudFxcXFxEb2N1bWVudC5qcycpLCBwcm9wZXJ0aWVzOiB7XCJuYW1lXCI6XCJkb2N1bWVudFwiLFwidGVtcGxhdGVcIjpcIi4vZG9jdW1lbnQuamFkZVwiLFwibG9naWNcIjpcIi4vRG9jdW1lbnQuanNcIn0sIHRlbXBsYXRlU291cmNlOiAnZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XFxudmFyIGJ1ZiA9IFtdO1xcbnZhciBqYWRlX21peGlucyA9IHt9O1xcbnZhciBqYWRlX2ludGVycDtcXG5cXG5idWYucHVzaChcIjwhRE9DVFlQRSBodG1sPjxodG1sPjxoZWFkPjwvaGVhZD48Ym9keT48Y2F0LWhlbGxvLXdvcmxkIGlkPVxcXFxcInVuaXF1ZVxcXFxcIiBjYXQtc3RvcmU9XFxcXFwiTWFpblxcXFxcIj48L2NhdC1oZWxsby13b3JsZD48L2JvZHk+PC9odG1sPlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xcbn0nLCBlcnJvclRlbXBsYXRlU291cmNlOiBudWxsfSxcbntuYW1lOiAnaGVhZCcsIGNvbnN0cnVjdG9yOiByZXF1aXJlKCcuL2NhdGJlcnJ5X2NvbXBvbmVudHNcXFxcaGVhZFxcXFxIZWFkLmpzJyksIHByb3BlcnRpZXM6IHtcIm5hbWVcIjpcImhlYWRcIixcInRlbXBsYXRlXCI6XCIuL2hlYWQuamFkZVwiLFwibG9naWNcIjpcIi4vSGVhZC5qc1wifSwgdGVtcGxhdGVTb3VyY2U6ICdmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcXG52YXIgYnVmID0gW107XFxudmFyIGphZGVfbWl4aW5zID0ge307XFxudmFyIGphZGVfaW50ZXJwO1xcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uICh0aXRsZSkge1xcbmJ1Zi5wdXNoKFwiPG1ldGEgY2hhcnNldD1cXFxcXCJVVEYtOFxcXFxcIi8+PHRpdGxlPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHRpdGxlKSA9PSBudWxsID8gXFwnXFwnIDogamFkZV9pbnRlcnApKSArIFwiPC90aXRsZT48c2NyaXB0IHNyYz1cXFxcXCJidW5kbGUuanNcXFxcXCI+PC9zY3JpcHQ+XCIpO30uY2FsbCh0aGlzLFwidGl0bGVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnRpdGxlOnR5cGVvZiB0aXRsZSE9PVwidW5kZWZpbmVkXCI/dGl0bGU6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcXG59JywgZXJyb3JUZW1wbGF0ZVNvdXJjZTogbnVsbH0sXG57bmFtZTogJ2hlbGxvLXdvcmxkJywgY29uc3RydWN0b3I6IHJlcXVpcmUoJy4vY2F0YmVycnlfY29tcG9uZW50c1xcXFxoZWxsby13b3JsZFxcXFxIZWxsb1dvcmxkLmpzJyksIHByb3BlcnRpZXM6IHtcIm5hbWVcIjpcImhlbGxvLXdvcmxkXCIsXCJ0ZW1wbGF0ZVwiOlwiLi9oZWxsby5qYWRlXCIsXCJlcnJvclRlbXBsYXRlXCI6XCIuL2Vycm9yLmphZGVcIixcImxvZ2ljXCI6XCIuL0hlbGxvV29ybGQuanNcIn0sIHRlbXBsYXRlU291cmNlOiAnZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XFxudmFyIGJ1ZiA9IFtdO1xcbnZhciBqYWRlX21peGlucyA9IHt9O1xcbnZhciBqYWRlX2ludGVycDtcXG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAod2hvKSB7XFxuYnVmLnB1c2goXCI8aDE+SGVsbG8sIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHdobykgPT0gbnVsbCA/IFxcJ1xcJyA6IGphZGVfaW50ZXJwKSkgKyBcIiE8L2gxPlwiKTt9LmNhbGwodGhpcyxcIndob1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgud2hvOnR5cGVvZiB3aG8hPT1cInVuZGVmaW5lZFwiP3dobzp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xcbn0nLCBlcnJvclRlbXBsYXRlU291cmNlOiAnZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XFxudmFyIGJ1ZiA9IFtdO1xcbnZhciBqYWRlX21peGlucyA9IHt9O1xcbnZhciBqYWRlX2ludGVycDtcXG5cXG47cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xcbn0nfVxuXTtcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyksXG5cdHJvdXRlRGVmaW5pdGlvbnMgPSByZXF1aXJlKCcuL3JvdXRlcy5qcycpIHx8IFtdLFxuXHRtb2R1bGVIZWxwZXIgPSByZXF1aXJlKCcuL25vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvaGVscGVycy9tb2R1bGVIZWxwZXIuanMnKSxcblx0Q2F0YmVycnkgPSByZXF1aXJlKCcuL25vZGVfbW9kdWxlcy9jYXRiZXJyeS9icm93c2VyL0NhdGJlcnJ5LmpzJyksXG5cdExvZ2dlciA9IHJlcXVpcmUoJy4vbm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2Jyb3dzZXIvTG9nZ2VyLmpzJyksXG5cdEJvb3RzdHJhcHBlckJhc2UgPVxuXHRcdHJlcXVpcmUoJy4vbm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9iYXNlL0Jvb3RzdHJhcHBlckJhc2UuanMnKSxcblx0U3RvcmVEaXNwYXRjaGVyID0gcmVxdWlyZSgnLi9ub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL1N0b3JlRGlzcGF0Y2hlcicpLFxuXHRNb2R1bGVBcGlQcm92aWRlciA9XG5cdFx0cmVxdWlyZSgnLi9ub2RlX21vZHVsZXMvY2F0YmVycnkvYnJvd3Nlci9wcm92aWRlcnMvTW9kdWxlQXBpUHJvdmlkZXInKSxcblx0Q29va2llV3JhcHBlciA9IHJlcXVpcmUoJy4vbm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2Jyb3dzZXIvQ29va2llV3JhcHBlcicpO1xuXG52YXIgSU5GT19ET0NVTUVOVF9VUERBVEVEID0gJ0RvY3VtZW50IHVwZGF0ZWQgKCVkIHN0b3JlKHMpIGNoYW5nZWQpJyxcblx0SU5GT19DT01QT05FTlRfQk9VTkQgPSAnQ29tcG9uZW50IFwiJXNcIiBpcyBib3VuZCcsXG5cdElORk9fQ09NUE9ORU5UX1VOQk9VTkQgPSAnQ29tcG9uZW50IFwiJXNcIiBpcyB1bmJvdW5kJztcblxudXRpbC5pbmhlcml0cyhCb290c3RyYXBwZXIsIEJvb3RzdHJhcHBlckJhc2UpO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBicm93c2VyIENhdGJlcnJ5J3MgYm9vdHN0cmFwcGVyLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBCb290c3RyYXBwZXJCYXNlXG4gKi9cbmZ1bmN0aW9uIEJvb3RzdHJhcHBlcigpIHtcblx0Qm9vdHN0cmFwcGVyQmFzZS5jYWxsKHRoaXMsIENhdGJlcnJ5KTtcbn1cblxuLyoqXG4gKiBDb25maWd1cmVzIENhdGJlcnJ5J3Mgc2VydmljZSBsb2NhdG9yLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ09iamVjdCBBcHBsaWNhdGlvbiBjb25maWcgb2JqZWN0LlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gbG9jYXRvciBTZXJ2aWNlIGxvY2F0b3IgdG8gY29uZmlndXJlLlxuICovXG5Cb290c3RyYXBwZXIucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChjb25maWdPYmplY3QsIGxvY2F0b3IpIHtcblx0Qm9vdHN0cmFwcGVyQmFzZS5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgY29uZmlnT2JqZWN0LCBsb2NhdG9yKTtcblxuXHQvLyBpZiBicm93c2VyIHN0aWxsIGRvZXMgbm90IGhhdmUgcHJvbWlzZXMgdGhlbiBhZGQgaXQuXG5cdGlmICghKCdQcm9taXNlJyBpbiB3aW5kb3cpKSB7XG5cdFx0d2luZG93LlByb21pc2UgPSBsb2NhdG9yLnJlc29sdmUoJ3Byb21pc2UnKTtcblx0fVxuXG5cdGxvY2F0b3IucmVnaXN0ZXIoJ3N0b3JlRGlzcGF0Y2hlcicsIFN0b3JlRGlzcGF0Y2hlciwgY29uZmlnT2JqZWN0LCB0cnVlKTtcblx0bG9jYXRvci5yZWdpc3Rlcihcblx0XHQnbW9kdWxlQXBpUHJvdmlkZXInLCBNb2R1bGVBcGlQcm92aWRlciwgY29uZmlnT2JqZWN0LCB0cnVlXG5cdCk7XG5cdGxvY2F0b3IucmVnaXN0ZXIoJ2Nvb2tpZVdyYXBwZXInLCBDb29raWVXcmFwcGVyLCBjb25maWdPYmplY3QsIHRydWUpO1xuXG5cdGxvY2F0b3IucmVnaXN0ZXJJbnN0YW5jZSgnd2luZG93Jywgd2luZG93KTtcblxuXHR2YXIgbG9nZ2VyQ29uZmlnID0gY29uZmlnT2JqZWN0LmxvZ2dlciB8fCB7fSxcblx0XHRsb2dnZXIgPSBuZXcgTG9nZ2VyKGxvZ2dlckNvbmZpZy5sZXZlbHMpO1xuXHRsb2NhdG9yLnJlZ2lzdGVySW5zdGFuY2UoJ2xvZ2dlcicsIGxvZ2dlcik7XG5cdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24gZXJyb3JIYW5kbGVyKG1zZywgdXJpLCBsaW5lKSB7XG5cdFx0bG9nZ2VyLmZhdGFsKHVyaSArICc6JyArIGxpbmUgKyAnICcgKyBtc2cpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXHR2YXIgZXZlbnRCdXMgPSBsb2NhdG9yLnJlc29sdmUoJ2V2ZW50QnVzJyk7XG5cdHRoaXMuX3dyYXBFdmVudHNXaXRoTG9nZ2VyKGV2ZW50QnVzLCBsb2dnZXIpO1xuXG5cdHJvdXRlRGVmaW5pdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAocm91dGVEZWZpbml0aW9uKSB7XG5cdFx0bG9jYXRvci5yZWdpc3Rlckluc3RhbmNlKCdyb3V0ZURlZmluaXRpb24nLCByb3V0ZURlZmluaXRpb24pO1xuXHR9KTtcblxuXHRzdG9yZXMuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmUpIHtcblx0XHRsb2NhdG9yLnJlZ2lzdGVySW5zdGFuY2UoJ3N0b3JlJywgc3RvcmUpO1xuXHR9KTtcblxuXHRjb21wb25lbnRzLmZvckVhY2goZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuXHRcdGxvY2F0b3IucmVnaXN0ZXJJbnN0YW5jZSgnY29tcG9uZW50JywgY29tcG9uZW50KTtcblx0fSk7XG59O1xuXG4vKipcbiAqIFdyYXBzIGV2ZW50IGJ1cyB3aXRoIGxvZyBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBldmVudEJ1cyBFdmVudCBlbWl0dGVyIHRoYXQgaW1wbGVtZW50cyBldmVudCBidXMuXG4gKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyIExvZ2dlciB0byB3cml0ZSBtZXNzYWdlcy5cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuQm9vdHN0cmFwcGVyLnByb3RvdHlwZS5fd3JhcEV2ZW50c1dpdGhMb2dnZXIgPSBmdW5jdGlvbiAoZXZlbnRCdXMsIGxvZ2dlcikge1xuXHRCb290c3RyYXBwZXJCYXNlLnByb3RvdHlwZS5fd3JhcEV2ZW50c1dpdGhMb2dnZXJcblx0XHQuY2FsbCh0aGlzLCBldmVudEJ1cywgbG9nZ2VyKTtcblx0ZXZlbnRCdXNcblx0XHQub24oJ2RvY3VtZW50VXBkYXRlZCcsIGZ1bmN0aW9uIChhcmdzKSB7XG5cdFx0XHRsb2dnZXIuaW5mbyh1dGlsLmZvcm1hdChJTkZPX0RPQ1VNRU5UX1VQREFURUQsIGFyZ3MubGVuZ3RoKSk7XG5cdFx0fSlcblx0XHQub24oJ2NvbXBvbmVudEJvdW5kJywgZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRcdGxvZ2dlci5pbmZvKHV0aWwuZm9ybWF0KFxuXHRcdFx0XHRJTkZPX0NPTVBPTkVOVF9CT1VORCxcblx0XHRcdFx0YXJncy5lbGVtZW50LnRhZ05hbWUgKyAoYXJncy5pZCA/ICcjJyArIGFyZ3MuaWQgOiAnJylcblx0XHRcdCkpO1xuXHRcdH0pXG5cdFx0Lm9uKCdjb21wb25lbnRVbmJvdW5kJywgZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRcdGxvZ2dlci5pbmZvKHV0aWwuZm9ybWF0KFxuXHRcdFx0XHRJTkZPX0NPTVBPTkVOVF9VTkJPVU5ELFxuXHRcdFx0XHRhcmdzLmVsZW1lbnQudGFnTmFtZSArIChhcmdzLmlkID8gJyMnICsgYXJncy5pZCA6ICcnKVxuXHRcdFx0KSk7XG5cdFx0fSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBCb290c3RyYXBwZXIoKTsiXX0=
