/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./cypress/support/commands.js":
/*!*************************************!*\
  !*** ./cypress/support/commands.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


__webpack_require__(/*! @percy/cypress */ "./node_modules/@percy/cypress/index.js");
__webpack_require__(/*! cypress-iframe */ "./node_modules/cypress-iframe/dist/index.js");

/***/ }),

/***/ "./node_modules/@chromatic-com/cypress/dist/support.js":
/*!*************************************************************!*\
  !*** ./node_modules/@chromatic-com/cypress/dist/support.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var rrwebSnapshot = __webpack_require__(/*! @chromaui/rrweb-snapshot */ "./node_modules/@chromaui/rrweb-snapshot/dist/rrweb-snapshot.umd.cjs");

var m=Object.defineProperty;var a=(e,t)=>m(e,"name",{value:t,configurable:!0});var n=a((e,t)=>new Promise(r=>{!t&&Cypress.env("disableAutoSnapshot")&&r(null);let o=rrwebSnapshot.snapshot(e,{recordCanvas:!0}),d=a(async p=>{let c=await(await fetch(p)).blob();return new Promise((h,f)=>{let i=new FileReader;i.onloadend=()=>h(i.result),i.onerror=f,i.readAsDataURL(c);})},"toDataURL"),l=a(async p=>{await Promise.all(p.childNodes.map(async s=>{if(s.tagName==="img"&&s.attributes.src?.startsWith("blob:")){let c=await d(s.attributes.src);s.attributes.src=c;}s.childNodes?.length&&await l(s);}));},"replaceBlobUrls");l(o).then(()=>{r({snapshot:o});});}),"takeSnapshot");Cypress.Commands.add("takeSnapshot",e=>{Cypress.config("isTextTerminal")&&cy.document().then(t=>{cy.wrap(n(t,!0)).then(r=>{cy.get("@manualSnapshots").then(o=>[...o,{...r,name:e}]).as("manualSnapshots");});});});var y=a(e=>({...e("diffThreshold")&&{diffThreshold:e("diffThreshold")},...e("delay")&&{delay:e("delay")},...e("diffIncludeAntiAliasing")&&{diffIncludeAntiAliasing:e("diffIncludeAntiAliasing")},...e("diffThreshold")&&{diffThreshold:e("diffThreshold")},...e("forcedColors")&&{forcedColors:e("forcedColors")},...e("pauseAnimationAtEnd")&&{pauseAnimationAtEnd:e("pauseAnimationAtEnd")},...e("prefersReducedMotion")&&{prefersReducedMotion:e("prefersReducedMotion")},...e("cropToViewport")&&{cropToViewport:e("cropToViewport")},...e("ignoreSelectors")&&{ignoreSelectors:e("ignoreSelectors")}}),"buildChromaticParams");beforeEach(()=>{Cypress.config("isTextTerminal")&&(cy.wrap([]).as("manualSnapshots"),cy.task("prepareArchives",{action:"setup-network-listener",payload:{allowedDomains:Cypress.env("assetDomains")}}));});afterEach(()=>{Cypress.config("isTextTerminal")&&cy.document().then(e=>{cy.wrap(n(e)).then(t=>{cy.get("@manualSnapshots").then((r=[])=>{cy.url().then(o=>{cy.task("prepareArchives",{action:"save-archives",payload:{testTitlePath:[Cypress.spec.relativeToCommonRoot,...Cypress.currentTest.titlePath],domSnapshots:[...r,...t?[t]:[]],chromaticStorybookParams:y(Cypress.env),pageUrl:o,viewport:{height:Cypress.config("viewportHeight"),width:Cypress.config("viewportWidth")},outputDir:Cypress.config("downloadsFolder")}});});});});});});
//# sourceMappingURL=out.js.map
//# sourceMappingURL=support.js.map

/***/ }),

/***/ "./node_modules/@percy/cypress/createRegion.js":
/*!*****************************************************!*\
  !*** ./node_modules/@percy/cypress/createRegion.js ***!
  \*****************************************************/
/***/ ((module) => {

const createRegion = function({
  boundingBox = null,
  elementXpath = null,
  elementCSS = null,
  padding = null,
  algorithm = 'ignore',
  diffSensitivity = null,
  imageIgnoreThreshold = null,
  carouselsEnabled = null,
  bannersEnabled = null,
  adsEnabled = null,
  diffIgnoreThreshold = null
} = {}) {
  const elementSelector = {};
  if (boundingBox) elementSelector.boundingBox = boundingBox;
  if (elementXpath) elementSelector.elementXpath = elementXpath;
  if (elementCSS) elementSelector.elementCSS = elementCSS;

  const region = {
    algorithm,
    elementSelector
  };

  if (padding) {
    region.padding = padding;
  }

  const configuration = {};
  if (['standard', 'intelliignore'].includes(algorithm)) {
    if (diffSensitivity) configuration.diffSensitivity = diffSensitivity;
    if (imageIgnoreThreshold) configuration.imageIgnoreThreshold = imageIgnoreThreshold;
    if (carouselsEnabled) configuration.carouselsEnabled = carouselsEnabled;
    if (bannersEnabled) configuration.bannersEnabled = bannersEnabled;
    if (adsEnabled) configuration.adsEnabled = adsEnabled;
  }

  if (Object.keys(configuration).length > 0) {
    region.configuration = configuration;
  }

  const assertion = {};
  if (diffIgnoreThreshold) {
    assertion.diffIgnoreThreshold = diffIgnoreThreshold;
  }

  if (Object.keys(assertion).length > 0) {
    region.assertion = assertion;
  }

  return region;
};

module.exports = { createRegion };


/***/ }),

/***/ "./node_modules/@percy/cypress/index.js":
/*!**********************************************!*\
  !*** ./node_modules/@percy/cypress/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const utils = __webpack_require__(/*! @percy/sdk-utils */ "./node_modules/@percy/sdk-utils/dist/bundle.js");
const { createRegion } = __webpack_require__(/*! ./createRegion */ "./node_modules/@percy/cypress/createRegion.js");

// Collect client and environment information
const sdkPkg = __webpack_require__(/*! ./package.json */ "./node_modules/@percy/cypress/package.json");
const CLIENT_INFO = `${sdkPkg.name}/${sdkPkg.version}`;
const ENV_INFO = `cypress/${Cypress.version}`;
// asset discovery should timeout before this
// 1.5 times the 30 second nav timeout
const CY_TIMEOUT = 30 * 1000 * 1.5;

// Maybe set the CLI API address from the environment
utils.percy.address = Cypress.env('PERCY_SERVER_ADDRESS');

// Use Cypress's http:request backend task
utils.request.fetch = async function fetch(url, options) {
  options = { url, retryOnNetworkFailure: false, ...options };
  return Cypress.backend('http:request', options);
};

// Create Cypress log messages
function cylog(message, meta) {
  Cypress.log({
    name: 'percySnapshot',
    displayName: 'percy',
    consoleProps: () => meta,
    message
  });
}

// Take a DOM snapshot and post it to the snapshot endpoint
Cypress.Commands.add('percySnapshot', (name, options = {}) => {
  let log = utils.logger('cypress');

  // if name is not passed
  if (typeof name === 'object') {
    options = name;
    name = undefined;
  }
  // Default name to test title
  name = name || cy.state('runnable').fullTitle();

  const meta = {
    snapshot: {
      name: name,
      testCase: options.testCase
    }
  };

  const withLog = async (func, context, _throw = true) => {
    try {
      return await func();
    } catch (error) {
      log.error(`Got error while ${context}`, meta);
      log.error(error, meta);
      log.error(error.stack, meta);
      if (_throw) throw error;
      return error;
    }
  };

  const withRetry = async (func) => {
    let num = 1;
    const maxNum = 3;
    const sleepTime = 1000;
    let error;

    while (num <= maxNum) {
      try {
        return await func();
      } catch (e) {
        error = e;
        log.error(`Retrying... (${num}/${maxNum})`);
        await new Promise((res) => setTimeout(res, sleepTime));
      }
      num += 1;
    }
    throw error;
  };

  return cy.then({ timeout: CY_TIMEOUT }, async () => {
    if (Cypress.config('isInteractive') &&
        !Cypress.config('enablePercyInteractiveMode')) {
      return cylog('Disabled in interactive mode', {
        details: 'use "cypress run" instead of "cypress open"',
        name
      });
    }

    // Check if Percy is enabled
    if (!await utils.isPercyEnabled()) {
      return cylog('Not running', { name });
    }

    await withLog(async () => {
      // Inject @percy/dom
      if (!window.PercyDOM) {
        // eslint-disable-next-line no-eval
        eval(await utils.fetchPercyDOM());
      }
    }, 'injecting @percy/dom');

    // Serialize and capture the DOM
    return cy.document({ log: false }).then({ timeout: CY_TIMEOUT }, async (dom) => {
      /* istanbul ignore next: no instrumenting injected code */
      let domSnapshot = await withLog(() => {
        return window.PercyDOM.serialize({ ...options, dom });
      }, 'taking dom snapshot');

      // Capture cookies
      return cy.getCookies({ log: false }).then(async (cookies) => {
        if (cookies && cookies.length > 0) {
          domSnapshot.cookies = cookies;
        }

        const throwConfig = Cypress.config('percyThrowErrorOnFailure');
        const _throw = throwConfig === undefined ? false : throwConfig;

        // Post the DOM snapshot to Percy
        let response = await withRetry(async () => await withLog(async () => {
          return await utils.postSnapshot({
            ...options,
            environmentInfo: ENV_INFO,
            clientInfo: CLIENT_INFO,
            domSnapshot,
            url: dom.URL,
            name
          });
        }, 'posting dom snapshot', _throw));

        // Log the snapshot name on success
        cylog(name, meta);

        return response;
      });
    });
  });
});

module.exports = { createRegion };


/***/ }),

/***/ "./node_modules/@percy/sdk-utils/dist/bundle.js":
/*!******************************************************!*\
  !*** ./node_modules/@percy/sdk-utils/dist/bundle.js ***!
  \******************************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function() {
  (function (exports) {
    'use strict';

    const process = (typeof globalThis !== "undefined" && globalThis.process) || {};
    process.env = process.env || {};
    process.env.__PERCY_BROWSERIFIED__ = true;

    // helper to create a version object from a string
    function toVersion(str) {
      str || (str = '0.0.0');
      return str.split(/\.|-/).reduce((version, part, i) => {
        let v = parseInt(part, 10);
        version[i] = isNaN(v) ? part : v;
        return version;
      }, {
        get major() {
          return this[0] || 0;
        },
        get minor() {
          return this[1] || 0;
        },
        get patch() {
          return this[2] || 0;
        },
        get prerelease() {
          return this[3];
        },
        get build() {
          return this[4];
        },
        toString() {
          return str;
        }
      });
    }

    // private version cache
    let version = toVersion();
    let type;

    // contains local percy info
    const info = {
      // get or set the CLI API address via the environment
      get address() {
        return process.env.PERCY_SERVER_ADDRESS || 'http://localhost:5338';
      },
      set address(addr) {
        return process.env.PERCY_SERVER_ADDRESS = addr;
      },
      // version information
      get version() {
        return version;
      },
      set version(v) {
        return version = toVersion(v);
      },
      get type() {
        return type;
      },
      set type(t) {
        return type = t;
      }
    };

    // Helper to send a request to the local CLI API
    async function request(path, options = {}) {
      let url = path.startsWith('http') ? path : `${info.address}${path}`;
      let response = await request.fetch(url, options);

      // maybe parse response body as json
      if (typeof response.body === 'string' && response.headers['content-type'] === 'application/json') {
        try {
          response.body = JSON.parse(response.body);
        } catch (e) {}
      }

      // throw an error if status is not ok
      if (!(response.status >= 200 && response.status < 300)) {
        throw Object.assign(new Error(), {
          message: response.body.error || /* istanbul ignore next: in tests, there's always an error message */
          `${response.status} ${response.statusText}`,
          response
        });
      }
      return response;
    }
    request.post = function post(url, json) {
      return request(url, {
        method: 'POST',
        body: JSON.stringify(json),
        timeout: 600000
      });
    };

    // environment specific implementation
    if (process.env.__PERCY_BROWSERIFIED__) {
      // use window.fetch in browsers
      const winFetch = window.fetch;
      request.fetch = async function fetch(url, options) {
        let response = await winFetch(url, options);
        return {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          body: await response.text()
        };
      };
    } else {
      // use http.request in node
      request.fetch = async function fetch(url, options) {
        let {
          protocol
        } = new URL(url);
        // rollup throws error for -> await ({})
        let {
          default: http
        } = protocol === 'https:' ? await ({}) : await ({});
        const requestOptions = {
          ...options
        };
        try {
          const {
            proxyAgentFor
          } = await ({});
          const agent = proxyAgentFor(url);
          if (agent) {
            requestOptions.agent = agent;
          }
        } catch (error) {
          // Failed to load proxy module or create proxy agent (e.g., missing proxy.js, invalid proxy config)
          // Continue without proxy support - requests will go directly without proxy
          /* istanbul ignore next */
          logger('sdk-utils:request').debug(`Proxy agent unavailable: ${error.message}`);
        }
        return new Promise((resolve, reject) => {
          http.request(url, requestOptions).on('response', response => {
            let body = '';
            response.on('data', chunk => body += chunk.toString());
            response.on('end', () => resolve({
              status: response.statusCode,
              statusText: response.statusMessage,
              headers: response.headers,
              body
            }));
          }).on('error', reject).end(options.body);
        });
      };
    }

    // Used when determining if a message should be logged
    const LOG_LEVELS = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3
    };

    // Create a small logger util using the specified namespace
    function logger(namespace) {
      return Object.keys(LOG_LEVELS).reduce((ns, lvl) => Object.assign(ns, {
        [lvl]: (...a) => logger.log(namespace, lvl, ...a)
      }), {});
    }
    Object.assign(logger, {
      // Set and/or return the local loglevel
      loglevel: (lvl = logger.loglevel.lvl) => {
        return logger.loglevel.lvl = lvl || process.env.PERCY_LOGLEVEL || 'info';
      },
      // Track and send/write logs for the specified namespace and log level
      // remote should only be false in case of sensitive/self call for errors
      log: (ns, lvl, msg, meta, remote = true) => {
        let err = typeof msg !== 'string' && (lvl === 'error' || lvl === 'debug');

        // check if the specific level is within the local loglevel range
        if (LOG_LEVELS[lvl] != null && LOG_LEVELS[lvl] >= LOG_LEVELS[logger.loglevel()]) {
          let debug = logger.loglevel() === 'debug';
          let label = debug ? `percy:${ns}` : 'percy';

          // colorize the label when possible for consistency with the CLI logger
          if (!process.env.__PERCY_BROWSERIFIED__) label = `\u001b[95m${label}\u001b[39m`;
          msg = `[${label}] ${err && debug && msg.stack || msg}`;
          if (process.env.__PERCY_BROWSERIFIED__) {
            // use console[warn|error|log] in browsers
            console[['warn', 'error'].includes(lvl) ? lvl : 'log'](msg);
          } else {
            // use process[stdout|stderr].write in node
            process[lvl === 'info' ? 'stdout' : 'stderr'].write(msg + '\n');
          }
          if (remote && (lvl === 'error' || debug)) {
            return request.post('/percy/log', {
              level: lvl,
              message: msg,
              meta
            }).catch(_ => {
              logger.log(ns, 'error', 'Could not send logs to cli', meta, false);
            });
          }
        }
      }
    });

    // Check if Percy is enabled using the healthcheck endpoint
    async function isPercyEnabled() {
      if (info.enabled == null) {
        let log = logger('utils');
        let error;
        try {
          let response = await request('/percy/healthcheck');
          info.version = response.headers['x-percy-core-version'];
          info.config = response.body.config;
          info.build = response.body.build;
          info.enabled = true;
          info.type = response.body.type;
          info.widths = response.body.widths;
        } catch (e) {
          info.enabled = false;
          error = e;
        }
        if (info.enabled && info.version.major !== 1) {
          log.info('Unsupported Percy CLI version, disabling snapshots');
          log.debug(`Found version: ${info.version}`);
          info.enabled = false;
        } else if (!info.enabled) {
          log.info('Percy is not running, disabling snapshots');
          log.debug(error);
        }
      }
      return info.enabled;
    }

    const RETRY_ERROR_CODES = ['ECONNRESET', 'ETIMEDOUT'];
    async function waitForPercyIdle() {
      try {
        return !!(await request('/percy/idle'));
      } catch (e) {
        return RETRY_ERROR_CODES.includes(e.code) && waitForPercyIdle();
      }
    }

    // Fetch and cache the @percy/dom script
    async function fetchPercyDOM() {
      if (info.domScript == null) {
        let response = await request('/percy/dom.js');
        info.domScript = response.body;
      }
      return info.domScript;
    }

    // Post snapshot data to the CLI snapshot endpoint. If the endpoint responds with a build error,
    // indicate that Percy has been disabled.
    async function postSnapshot(options, params) {
      let query = params ? `?${new URLSearchParams(params)}` : '';
      return await request.post(`/percy/snapshot${query}`, options).catch(err => {
        var _err$response;
        if ((_err$response = err.response) !== null && _err$response !== void 0 && (_err$response = _err$response.body) !== null && _err$response !== void 0 && (_err$response = _err$response.build) !== null && _err$response !== void 0 && _err$response.error) {
          info.enabled = false;
        } else {
          throw err;
        }
      });
    }

    // Post snapshot data to the CLI snapshot endpoint. If the endpoint responds with a build error,
    // indicate that Percy has been disabled.
    async function postComparison(options, params) {
      let query = params ? `?${new URLSearchParams(params)}` : '';
      return await request.post(`/percy/comparison${query}`, options).catch(err => {
        var _err$response;
        if ((_err$response = err.response) !== null && _err$response !== void 0 && (_err$response = _err$response.body) !== null && _err$response !== void 0 && (_err$response = _err$response.build) !== null && _err$response !== void 0 && _err$response.error) {
          info.enabled = false;
        } else {
          throw err;
        }
      });
    }

    // Post failed event data to the CLI event endpoint.
    async function postBuildEvents(options) {
      return await request.post('/percy/events', options).catch(err => {
        throw err;
      });
    }

    // Posts to the local Percy server one or more snapshots to flush. Given no arguments, all snapshots
    // will be flushed. Does nothing when Percy is not enabled.
    async function flushSnapshots(options) {
      if (info.enabled) {
        // accept one or more snapshot names
        options && (options = [].concat(options).map(o => typeof o === 'string' ? {
          name: o
        } : o));
        await request.post('/percy/flush', options);
      }
    }

    // Post screenshot data to the CLI automateScreenshot endpoint. If the endpoint responds with a build error,
    // indicate that Percy has been disabled.
    async function captureAutomateScreenshot(options, params) {
      let query = params ? `?${new URLSearchParams(params)}` : '';
      return await request.post(`/percy/automateScreenshot${query}`, options).catch(err => {
        var _err$response;
        if ((_err$response = err.response) !== null && _err$response !== void 0 && (_err$response = _err$response.body) !== null && _err$response !== void 0 && (_err$response = _err$response.build) !== null && _err$response !== void 0 && _err$response.error) {
          info.enabled = false;
        } else {
          throw err;
        }
      });
    }

    var index = /*#__PURE__*/Object.freeze({
      __proto__: null,
      logger: logger,
      percy: info,
      request: request,
      isPercyEnabled: isPercyEnabled,
      waitForPercyIdle: waitForPercyIdle,
      fetchPercyDOM: fetchPercyDOM,
      postSnapshot: postSnapshot,
      postComparison: postComparison,
      flushSnapshots: flushSnapshots,
      captureAutomateScreenshot: captureAutomateScreenshot,
      postBuildEvents: postBuildEvents,
      'default': index
    });

    exports.captureAutomateScreenshot = captureAutomateScreenshot;
    exports["default"] = index;
    exports.fetchPercyDOM = fetchPercyDOM;
    exports.flushSnapshots = flushSnapshots;
    exports.isPercyEnabled = isPercyEnabled;
    exports.logger = logger;
    exports.percy = info;
    exports.postBuildEvents = postBuildEvents;
    exports.postComparison = postComparison;
    exports.postSnapshot = postSnapshot;
    exports.request = request;
    exports.waitForPercyIdle = waitForPercyIdle;

    Object.defineProperty(exports, '__esModule', { value: true });

  })(this.PercySDKUtils = this.PercySDKUtils || {});
}).call(window);

if (true) {
  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (() => window.PercySDKUtils).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}


/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



const base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
const ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
const customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

const K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    const arr = new Uint8Array(1)
    const proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  const buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  const valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  const b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  const length = byteLength(string, encoding) | 0
  let buf = createBuffer(length)

  const actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0
  const buf = createBuffer(length)
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    const copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  let buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    const len = checked(obj.length) | 0
    const buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  let x = a.length
  let y = b.length

  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  let i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  const buffer = Buffer.allocUnsafe(length)
  let pos = 0
  for (i = 0; i < list.length; ++i) {
    let buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)
        buf.copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  const len = string.length
  const mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  let loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  const i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  const len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  const len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  const len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  const length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  let str = ''
  const max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  let x = thisEnd - thisStart
  let y = end - start
  const len = Math.min(x, y)

  const thisCopy = this.slice(thisStart, thisEnd)
  const targetCopy = target.slice(start, end)

  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  let indexSize = 1
  let arrLength = arr.length
  let valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  let i
  if (dir) {
    let foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      let found = true
      for (let j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  const remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  const strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  let i
  for (i = 0; i < length; ++i) {
    const parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  const remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  const res = []

  let i = start
  while (i < end) {
    const firstByte = buf[i]
    let codePoint = null
    let bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  const len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  let res = ''
  let i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  const len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  let out = ''
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  const bytes = buf.slice(start, end)
  let res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  const len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  const newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  let val = this[offset + --byteLength]
  let mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const lo = first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24

  const hi = this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24

  return BigInt(lo) + (BigInt(hi) << BigInt(32))
})

Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const hi = first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  const lo = this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last

  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
})

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let i = byteLength
  let mul = 1
  let val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow

  return (BigInt(val) << BigInt(32)) +
    BigInt(first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24)
})

Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  return (BigInt(val) << BigInt(32)) +
    BigInt(this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last)
})

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let mul = 1
  let i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let i = byteLength - 1
  let mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function wrtBigUInt64LE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  return offset
}

function wrtBigUInt64BE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset + 7] = lo
  lo = lo >> 8
  buf[offset + 6] = lo
  lo = lo >> 8
  buf[offset + 5] = lo
  lo = lo >> 8
  buf[offset + 4] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset + 3] = hi
  hi = hi >> 8
  buf[offset + 2] = hi
  hi = hi >> 8
  buf[offset + 1] = hi
  hi = hi >> 8
  buf[offset] = hi
  return offset + 8
}

Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = 0
  let mul = 1
  let sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = byteLength - 1
  let mul = 1
  let sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  const len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  let i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    const bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    const len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// CUSTOM ERRORS
// =============

// Simplified versions from Node, changed for Buffer-only usage
const errors = {}
function E (sym, getMessage, Base) {
  errors[sym] = class NodeError extends Base {
    constructor () {
      super()

      Object.defineProperty(this, 'message', {
        value: getMessage.apply(this, arguments),
        writable: true,
        configurable: true
      })

      // Add the error code to the name to include it in the stack trace.
      this.name = `${this.name} [${sym}]`
      // Access the stack to generate the error message including the error code
      // from the name.
      this.stack // eslint-disable-line no-unused-expressions
      // Reset the name to the actual name.
      delete this.name
    }

    get code () {
      return sym
    }

    set code (value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      })
    }

    toString () {
      return `${this.name} [${sym}]: ${this.message}`
    }
  }
}

E('ERR_BUFFER_OUT_OF_BOUNDS',
  function (name) {
    if (name) {
      return `${name} is outside of buffer bounds`
    }

    return 'Attempt to access memory outside buffer bounds'
  }, RangeError)
E('ERR_INVALID_ARG_TYPE',
  function (name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
  }, TypeError)
E('ERR_OUT_OF_RANGE',
  function (str, range, input) {
    let msg = `The value of "${str}" is out of range.`
    let received = input
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input))
    } else if (typeof input === 'bigint') {
      received = String(input)
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received)
      }
      received += 'n'
    }
    msg += ` It must be ${range}. Received ${received}`
    return msg
  }, RangeError)

function addNumericalSeparator (val) {
  let res = ''
  let i = val.length
  const start = val[0] === '-' ? 1 : 0
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`
  }
  return `${val.slice(0, i)}${res}`
}

// CHECK FUNCTIONS
// ===============

function checkBounds (buf, offset, byteLength) {
  validateNumber(offset, 'offset')
  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    boundsError(offset, buf.length - (byteLength + 1))
  }
}

function checkIntBI (value, min, max, buf, offset, byteLength) {
  if (value > max || value < min) {
    const n = typeof min === 'bigint' ? 'n' : ''
    let range
    if (byteLength > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`
      } else {
        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                `${(byteLength + 1) * 8 - 1}${n}`
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`
    }
    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
  }
  checkBounds(buf, offset, byteLength)
}

function validateNumber (value, name) {
  if (typeof value !== 'number') {
    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
  }
}

function boundsError (value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type)
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
  }

  if (length < 0) {
    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
  }

  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                    `>= ${type ? 1 : 0} and <= ${length}`,
                                    value)
}

// HELPER FUNCTIONS
// ================

const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  let codePoint
  const length = string.length
  let leadSurrogate = null
  const bytes = []

  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  let c, hi, lo
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  let i
  for (i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = (function () {
  const alphabet = '0123456789abcdef'
  const table = new Array(256)
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

// Return not function with Error if BigInt not supported
function defineBigIntMethod (fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}

function BufferBigIntNotDefined () {
  throw new Error('BigInt not supported')
}


/***/ }),

/***/ "./node_modules/cypress-iframe/dist/index.js":
/*!***************************************************!*\
  !*** ./node_modules/cypress-iframe/dist/index.js ***!
  \***************************************************/
/***/ (function() {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var DEFAULT_OPTS = {
    log: true,
    timeout: 30000,
};
var DEFAULT_IFRAME_SELECTOR = 'iframe';
function sleep(timeout) {
    return new Promise(function (resolve) { return setTimeout(resolve, timeout); });
}
function timeout(cb, timeout) {
    return new Promise(function (resolve) {
        var done = false;
        var finish = function () { return done || resolve(); };
        cb().then(finish);
        sleep(timeout).then(finish);
    });
}
var frameLoaded = function (selector, opts) {
    if (selector === undefined) {
        selector = DEFAULT_IFRAME_SELECTOR;
    }
    else if (typeof selector === 'object') {
        opts = selector;
        selector = DEFAULT_IFRAME_SELECTOR;
    }
    var fullOpts = __assign(__assign({}, DEFAULT_OPTS), opts);
    var log = fullOpts.log ? Cypress.log({
        name: 'frame loaded',
        displayName: 'frame loaded',
        message: [selector],
    }).snapshot() : null;
    return cy.get(selector, { log: false }).then({ timeout: fullOpts.timeout }, function ($frame) { return __awaiter(_this, void 0, void 0, function () {
        var contentWindow, hasNavigated, loadLog;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    (_a = log) === null || _a === void 0 ? void 0 : _a.set('$el', $frame);
                    if ($frame.length !== 1) {
                        throw new Error("cypress-iframe commands can only be applied to exactly one iframe at a time.  Instead found " + $frame.length);
                    }
                    contentWindow = $frame.prop('contentWindow');
                    hasNavigated = fullOpts.url
                        ? function () {
                            var _a;
                            return typeof fullOpts.url === 'string'
                                ? contentWindow.location.toString().includes(fullOpts.url)
                                : (_a = fullOpts.url) === null || _a === void 0 ? void 0 : _a.test(contentWindow.location.toString());
                        }
                        : function () { return contentWindow.location.toString() !== 'about:blank'; };
                    _c.label = 1;
                case 1:
                    if (!!hasNavigated()) return [3, 3];
                    return [4, sleep(100)];
                case 2:
                    _c.sent();
                    return [3, 1];
                case 3:
                    if (contentWindow.document.readyState === 'complete') {
                        return [2, $frame];
                    }
                    loadLog = Cypress.log({
                        name: 'Frame Load',
                        message: [contentWindow.location.toString()],
                        event: true,
                    }).snapshot();
                    return [4, new Promise(function (resolve) {
                            Cypress.$(contentWindow).on('load', resolve);
                        })];
                case 4:
                    _c.sent();
                    loadLog.end();
                    (_b = log) === null || _b === void 0 ? void 0 : _b.finish();
                    return [2, $frame];
            }
        });
    }); });
};
Cypress.Commands.add('frameLoaded', frameLoaded);
var iframe = function (selector, opts) {
    if (selector === undefined) {
        selector = DEFAULT_IFRAME_SELECTOR;
    }
    else if (typeof selector === 'object') {
        opts = selector;
        selector = DEFAULT_IFRAME_SELECTOR;
    }
    var fullOpts = __assign(__assign({}, DEFAULT_OPTS), opts);
    var log = fullOpts.log ? Cypress.log({
        name: 'iframe',
        displayName: 'iframe',
        message: [selector],
    }).snapshot() : null;
    return cy.frameLoaded(selector, __assign(__assign({}, fullOpts), { log: false })).then(function ($frame) {
        var _a;
        (_a = log) === null || _a === void 0 ? void 0 : _a.set('$el', $frame).end();
        var contentWindow = $frame.prop('contentWindow');
        return Cypress.$(contentWindow.document.body);
    });
};
Cypress.Commands.add('iframe', iframe);
var enter = function (selector, opts) {
    if (selector === undefined) {
        selector = DEFAULT_IFRAME_SELECTOR;
    }
    else if (typeof selector === 'object') {
        opts = selector;
        selector = DEFAULT_IFRAME_SELECTOR;
    }
    var fullOpts = __assign(__assign({}, DEFAULT_OPTS), opts);
    var log = fullOpts.log ? Cypress.log({
        name: 'enter',
        displayName: 'enter',
        message: [selector],
    }).snapshot() : null;
    return cy.iframe(selector, __assign(__assign({}, fullOpts), { log: false })).then(function ($body) {
        var _a;
        (_a = log) === null || _a === void 0 ? void 0 : _a.set('$el', $body).end();
        return function () { return cy.wrap($body, { log: false }); };
    });
};
Cypress.Commands.add('enter', enter);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
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
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/@chromaui/rrweb-snapshot/dist/rrweb-snapshot.umd.cjs":
/*!***************************************************************************!*\
  !*** ./node_modules/@chromaui/rrweb-snapshot/dist/rrweb-snapshot.umd.cjs ***!
  \***************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");
(function (g, f) {
    if (true) {
      module.exports = f();
    } else {}
  }(this, () => {
var exports = {};
var module = { exports };
"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __defProp2 = Object.defineProperty;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value);
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
var NodeType = /* @__PURE__ */ ((NodeType2) => {
  NodeType2[NodeType2["Document"] = 0] = "Document";
  NodeType2[NodeType2["DocumentType"] = 1] = "DocumentType";
  NodeType2[NodeType2["Element"] = 2] = "Element";
  NodeType2[NodeType2["Text"] = 3] = "Text";
  NodeType2[NodeType2["CDATA"] = 4] = "CDATA";
  NodeType2[NodeType2["Comment"] = 5] = "Comment";
  return NodeType2;
})(NodeType || {});
const testableAccessors = {
  Node: ["childNodes", "parentNode", "parentElement", "textContent"],
  ShadowRoot: ["host", "styleSheets"],
  Element: ["shadowRoot", "querySelector", "querySelectorAll"],
  MutationObserver: []
};
const testableMethods = {
  Node: ["contains", "getRootNode"],
  ShadowRoot: ["getSelection"],
  Element: [],
  MutationObserver: ["constructor"]
};
const untaintedBasePrototype = {};
const isAngularZonePresent = () => {
  return !!globalThis.Zone;
};
function getUntaintedPrototype(key) {
  if (untaintedBasePrototype[key])
    return untaintedBasePrototype[key];
  const defaultObj = globalThis[key];
  const defaultPrototype = defaultObj.prototype;
  const accessorNames = key in testableAccessors ? testableAccessors[key] : void 0;
  const isUntaintedAccessors = Boolean(
    accessorNames && // @ts-expect-error 2345
    accessorNames.every(
      (accessor) => {
        var _a, _b;
        return Boolean(
          (_b = (_a = Object.getOwnPropertyDescriptor(defaultPrototype, accessor)) == null ? void 0 : _a.get) == null ? void 0 : _b.toString().includes("[native code]")
        );
      }
    )
  );
  const methodNames = key in testableMethods ? testableMethods[key] : void 0;
  const isUntaintedMethods = Boolean(
    methodNames && methodNames.every(
      // @ts-expect-error 2345
      (method) => {
        var _a;
        return typeof defaultPrototype[method] === "function" && ((_a = defaultPrototype[method]) == null ? void 0 : _a.toString().includes("[native code]"));
      }
    )
  );
  if (isUntaintedAccessors && isUntaintedMethods && !isAngularZonePresent()) {
    untaintedBasePrototype[key] = defaultObj.prototype;
    return defaultObj.prototype;
  }
  try {
    const iframeEl = document.createElement("iframe");
    document.body.appendChild(iframeEl);
    const win = iframeEl.contentWindow;
    if (!win) return defaultObj.prototype;
    const untaintedObject = win[key].prototype;
    document.body.removeChild(iframeEl);
    if (!untaintedObject) return defaultPrototype;
    return untaintedBasePrototype[key] = untaintedObject;
  } catch (e) {
    return defaultPrototype;
  }
}
const untaintedAccessorCache = {};
function getUntaintedAccessor(key, instance, accessor) {
  var _a;
  const cacheKey = `${key}.${String(accessor)}`;
  if (untaintedAccessorCache[cacheKey])
    return untaintedAccessorCache[cacheKey].call(
      instance
    );
  const untaintedPrototype = getUntaintedPrototype(key);
  const untaintedAccessor = (_a = Object.getOwnPropertyDescriptor(
    untaintedPrototype,
    accessor
  )) == null ? void 0 : _a.get;
  if (!untaintedAccessor) return instance[accessor];
  untaintedAccessorCache[cacheKey] = untaintedAccessor;
  return untaintedAccessor.call(instance);
}
const untaintedMethodCache = {};
function getUntaintedMethod(key, instance, method) {
  const cacheKey = `${key}.${String(method)}`;
  if (untaintedMethodCache[cacheKey])
    return untaintedMethodCache[cacheKey].bind(
      instance
    );
  const untaintedPrototype = getUntaintedPrototype(key);
  const untaintedMethod = untaintedPrototype[method];
  if (typeof untaintedMethod !== "function") return instance[method];
  untaintedMethodCache[cacheKey] = untaintedMethod;
  return untaintedMethod.bind(instance);
}
function childNodes(n) {
  return getUntaintedAccessor("Node", n, "childNodes");
}
function parentNode(n) {
  return getUntaintedAccessor("Node", n, "parentNode");
}
function parentElement(n) {
  return getUntaintedAccessor("Node", n, "parentElement");
}
function textContent(n) {
  return getUntaintedAccessor("Node", n, "textContent");
}
function contains(n, other) {
  return getUntaintedMethod("Node", n, "contains")(other);
}
function getRootNode(n) {
  return getUntaintedMethod("Node", n, "getRootNode")();
}
function host(n) {
  if (!n || !("host" in n)) return null;
  return getUntaintedAccessor("ShadowRoot", n, "host");
}
function styleSheets(n) {
  return n.styleSheets;
}
function shadowRoot(n) {
  if (!n || !("shadowRoot" in n)) return null;
  return getUntaintedAccessor("Element", n, "shadowRoot");
}
function querySelector(n, selectors) {
  return getUntaintedAccessor("Element", n, "querySelector")(selectors);
}
function querySelectorAll(n, selectors) {
  return getUntaintedAccessor("Element", n, "querySelectorAll")(selectors);
}
function mutationObserverCtor() {
  return getUntaintedPrototype("MutationObserver").constructor;
}
function patch(source, name, replacement) {
  try {
    if (!(name in source)) {
      return () => {
      };
    }
    const original = source[name];
    const wrapped = replacement(original);
    if (typeof wrapped === "function") {
      wrapped.prototype = wrapped.prototype || {};
      Object.defineProperties(wrapped, {
        __rrweb_original__: {
          enumerable: false,
          value: original
        }
      });
    }
    source[name] = wrapped;
    return () => {
      source[name] = original;
    };
  } catch (e) {
    return () => {
    };
  }
}
const index = {
  childNodes,
  parentNode,
  parentElement,
  textContent,
  contains,
  getRootNode,
  host,
  styleSheets,
  shadowRoot,
  querySelector,
  querySelectorAll,
  mutationObserver: mutationObserverCtor,
  patch
};
function isElement(n) {
  return n.nodeType === n.ELEMENT_NODE;
}
function isShadowRoot(n) {
  const hostEl = (
    // anchor and textarea elements also have a `host` property
    // but only shadow roots have a `mode` property
    n && "host" in n && "mode" in n && index.host(n) || null
  );
  return Boolean(
    hostEl && "shadowRoot" in hostEl && index.shadowRoot(hostEl) === n
  );
}
function isNativeShadowDom(shadowRoot2) {
  return Object.prototype.toString.call(shadowRoot2) === "[object ShadowRoot]";
}
function fixBrowserCompatibilityIssuesInCSS(cssText) {
  if (cssText.includes(" background-clip: text;") && !cssText.includes(" -webkit-background-clip: text;")) {
    cssText = cssText.replace(
      /\sbackground-clip:\s*text;/g,
      " -webkit-background-clip: text; background-clip: text;"
    );
  }
  return cssText;
}
function escapeImportStatement(rule2) {
  const { cssText } = rule2;
  if (cssText.split('"').length < 3) return cssText;
  const statement = ["@import", `url(${JSON.stringify(rule2.href)})`];
  if (rule2.layerName === "") {
    statement.push(`layer`);
  } else if (rule2.layerName) {
    statement.push(`layer(${rule2.layerName})`);
  }
  if (rule2.supportsText) {
    statement.push(`supports(${rule2.supportsText})`);
  }
  if (rule2.media.length) {
    statement.push(rule2.media.mediaText);
  }
  return statement.join(" ") + ";";
}
function stringifyStylesheet(s) {
  try {
    const rules = s.rules || s.cssRules;
    if (!rules) {
      return null;
    }
    let sheetHref = s.href;
    if (!sheetHref && s.ownerNode && s.ownerNode.ownerDocument) {
      sheetHref = s.ownerNode.ownerDocument.location.href;
    }
    const stringifiedRules = Array.from(
      rules,
      (rule2) => stringifyRule(rule2, sheetHref)
    ).join("");
    return fixBrowserCompatibilityIssuesInCSS(stringifiedRules);
  } catch (error) {
    return null;
  }
}
function stringifyRule(rule2, sheetHref) {
  if (isCSSImportRule(rule2)) {
    let importStringified;
    try {
      importStringified = // for same-origin stylesheets,
      // we can access the imported stylesheet rules directly
      stringifyStylesheet(rule2.styleSheet) || // work around browser issues with the raw string `@import url(...)` statement
      escapeImportStatement(rule2);
    } catch (error) {
      importStringified = rule2.cssText;
    }
    if (rule2.styleSheet.href) {
      return absolutifyURLs(importStringified, rule2.styleSheet.href);
    }
    return importStringified;
  } else {
    let ruleStringified = rule2.cssText;
    if (isCSSStyleRule(rule2) && rule2.selectorText.includes(":")) {
      ruleStringified = fixSafariColons(ruleStringified);
    }
    if (sheetHref) {
      return absolutifyURLs(ruleStringified, sheetHref);
    }
    return ruleStringified;
  }
}
function fixSafariColons(cssStringified) {
  const regex = /(\[(?:[\w-]+)[^\\])(:(?:[\w-]+)\])/gm;
  return cssStringified.replace(regex, "$1\\$2");
}
function isCSSImportRule(rule2) {
  return "styleSheet" in rule2;
}
function isCSSStyleRule(rule2) {
  return "selectorText" in rule2;
}
class Mirror {
  constructor() {
    __publicField(this, "idNodeMap", /* @__PURE__ */ new Map());
    __publicField(this, "nodeMetaMap", /* @__PURE__ */ new WeakMap());
  }
  getId(n) {
    var _a;
    if (!n) return -1;
    const id = (_a = this.getMeta(n)) == null ? void 0 : _a.id;
    return id != null ? id : -1;
  }
  getNode(id) {
    return this.idNodeMap.get(id) || null;
  }
  getIds() {
    return Array.from(this.idNodeMap.keys());
  }
  getMeta(n) {
    return this.nodeMetaMap.get(n) || null;
  }
  // removes the node from idNodeMap
  // doesn't remove the node from nodeMetaMap
  removeNodeFromMap(n) {
    const id = this.getId(n);
    this.idNodeMap.delete(id);
    if (n.childNodes) {
      n.childNodes.forEach(
        (childNode) => this.removeNodeFromMap(childNode)
      );
    }
  }
  has(id) {
    return this.idNodeMap.has(id);
  }
  hasNode(node2) {
    return this.nodeMetaMap.has(node2);
  }
  add(n, meta) {
    const id = meta.id;
    this.idNodeMap.set(id, n);
    this.nodeMetaMap.set(n, meta);
  }
  replace(id, n) {
    const oldNode = this.getNode(id);
    if (oldNode) {
      const meta = this.nodeMetaMap.get(oldNode);
      if (meta) this.nodeMetaMap.set(n, meta);
    }
    this.idNodeMap.set(id, n);
  }
  reset() {
    this.idNodeMap = /* @__PURE__ */ new Map();
    this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
  }
}
function createMirror() {
  return new Mirror();
}
function maskInputValue({
  element,
  maskInputOptions,
  tagName,
  type,
  value,
  maskInputFn
}) {
  let text = value || "";
  const actualType = type && toLowerCase(type);
  if (maskInputOptions[tagName.toLowerCase()] || actualType && maskInputOptions[actualType]) {
    if (maskInputFn) {
      text = maskInputFn(text, element);
    } else {
      text = "*".repeat(text.length);
    }
  }
  return text;
}
function toLowerCase(str) {
  return str.toLowerCase();
}
const ORIGINAL_ATTRIBUTE_NAME = "__rrweb_original__";
function is2DCanvasBlank(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return true;
  const chunkSize = 50;
  for (let x2 = 0; x2 < canvas.width; x2 += chunkSize) {
    for (let y = 0; y < canvas.height; y += chunkSize) {
      const getImageData = ctx.getImageData;
      const originalGetImageData = ORIGINAL_ATTRIBUTE_NAME in getImageData ? getImageData[ORIGINAL_ATTRIBUTE_NAME] : getImageData;
      const pixelBuffer = new Uint32Array(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        originalGetImageData.call(
          ctx,
          x2,
          y,
          Math.min(chunkSize, canvas.width - x2),
          Math.min(chunkSize, canvas.height - y)
        ).data.buffer
      );
      if (pixelBuffer.some((pixel) => pixel !== 0)) return false;
    }
  }
  return true;
}
function isNodeMetaEqual(a, b) {
  if (!a || !b || a.type !== b.type) return false;
  if (a.type === NodeType.Document)
    return a.compatMode === b.compatMode;
  else if (a.type === NodeType.DocumentType)
    return a.name === b.name && a.publicId === b.publicId && a.systemId === b.systemId;
  else if (a.type === NodeType.Comment || a.type === NodeType.Text || a.type === NodeType.CDATA)
    return a.textContent === b.textContent;
  else if (a.type === NodeType.Element)
    return a.tagName === b.tagName && JSON.stringify(a.attributes) === JSON.stringify(b.attributes) && a.isSVG === b.isSVG && a.needBlock === b.needBlock;
  return false;
}
function getInputType(element) {
  const type = element.type;
  return element.hasAttribute("data-rr-is-password") ? "password" : type ? (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    toLowerCase(type)
  ) : null;
}
function extractFileExtension(path, baseURL) {
  var _a;
  let url;
  try {
    url = new URL(path, baseURL != null ? baseURL : window.location.href);
  } catch (err) {
    return null;
  }
  const regex = /\.([0-9a-z]+)(?:$)/i;
  const match = url.pathname.match(regex);
  return (_a = match == null ? void 0 : match[1]) != null ? _a : null;
}
function extractOrigin(url) {
  let origin = "";
  if (url.indexOf("//") > -1) {
    origin = url.split("/").slice(0, 3).join("/");
  } else {
    origin = url.split("/")[0];
  }
  origin = origin.split("?")[0];
  return origin;
}
const URL_IN_CSS_REF = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm;
const URL_PROTOCOL_MATCH = /^(?:[a-z+]+:)?\/\//i;
const URL_WWW_MATCH = /^www\..*/i;
const DATA_URI = /^(data:)([^,]*),(.*)/i;
function absolutifyURLs(cssText, href) {
  return (cssText || "").replace(
    URL_IN_CSS_REF,
    (origin, quote1, path1, quote2, path2, path3) => {
      const filePath = path1 || path2 || path3;
      const maybeQuote = quote1 || quote2 || "";
      if (!filePath) {
        return origin;
      }
      if (URL_PROTOCOL_MATCH.test(filePath) || URL_WWW_MATCH.test(filePath)) {
        return `url(${maybeQuote}${filePath}${maybeQuote})`;
      }
      if (DATA_URI.test(filePath)) {
        return `url(${maybeQuote}${filePath}${maybeQuote})`;
      }
      if (filePath[0] === "/") {
        return `url(${maybeQuote}${extractOrigin(href) + filePath}${maybeQuote})`;
      }
      const stack = href.split("/");
      const parts = filePath.split("/");
      stack.pop();
      for (const part of parts) {
        if (part === ".") {
          continue;
        } else if (part === "..") {
          stack.pop();
        } else {
          stack.push(part);
        }
      }
      return `url(${maybeQuote}${stack.join("/")}${maybeQuote})`;
    }
  );
}
function normalizeCssString(cssText, _testNoPxNorm = false) {
  if (_testNoPxNorm) {
    return cssText.replace(/(\/\*[^*]*\*\/)|[\s;]/g, "");
  } else {
    return cssText.replace(/(\/\*[^*]*\*\/)|[\s;]/g, "").replace(/0px/g, "0");
  }
}
function splitCssText(cssText, style, _testNoPxNorm = false) {
  const childNodes2 = Array.from(style.childNodes);
  const splits = [];
  let iterCount = 0;
  if (childNodes2.length > 1 && cssText && typeof cssText === "string") {
    let cssTextNorm = normalizeCssString(cssText, _testNoPxNorm);
    const normFactor = cssTextNorm.length / cssText.length;
    for (let i = 1; i < childNodes2.length; i++) {
      if (childNodes2[i].textContent && typeof childNodes2[i].textContent === "string") {
        const textContentNorm = normalizeCssString(
          childNodes2[i].textContent,
          _testNoPxNorm
        );
        const jLimit = 100;
        let j = 3;
        for (; j < textContentNorm.length; j++) {
          if (
            // keep consuming css identifiers (to get a decent chunk more quickly)
            textContentNorm[j].match(/[a-zA-Z0-9]/) || // substring needs to be unique to this section
            textContentNorm.indexOf(textContentNorm.substring(0, j), 1) !== -1
          ) {
            continue;
          }
          break;
        }
        for (; j < textContentNorm.length; j++) {
          let startSubstring = textContentNorm.substring(0, j);
          let cssNormSplits = cssTextNorm.split(startSubstring);
          let splitNorm = -1;
          if (cssNormSplits.length === 2) {
            splitNorm = cssNormSplits[0].length;
          } else if (cssNormSplits.length > 2 && cssNormSplits[0] === "" && childNodes2[i - 1].textContent !== "") {
            splitNorm = cssTextNorm.indexOf(startSubstring, 1);
          } else if (cssNormSplits.length === 1) {
            startSubstring = startSubstring.substring(
              0,
              startSubstring.length - 1
            );
            cssNormSplits = cssTextNorm.split(startSubstring);
            if (cssNormSplits.length <= 1) {
              splits.push(cssText);
              return splits;
            }
            j = jLimit + 1;
          } else if (j === textContentNorm.length - 1) {
            splitNorm = cssTextNorm.indexOf(startSubstring);
          }
          if (cssNormSplits.length >= 2 && j > jLimit) {
            const prevTextContent = childNodes2[i - 1].textContent;
            if (prevTextContent && typeof prevTextContent === "string") {
              const prevMinLength = normalizeCssString(prevTextContent).length;
              splitNorm = cssTextNorm.indexOf(startSubstring, prevMinLength);
            }
            if (splitNorm === -1) {
              splitNorm = cssNormSplits[0].length;
            }
          }
          if (splitNorm !== -1) {
            let k = Math.floor(splitNorm / normFactor);
            for (; k > 0 && k < cssText.length; ) {
              iterCount += 1;
              if (iterCount > 50 * childNodes2.length) {
                splits.push(cssText);
                return splits;
              }
              const normPart = normalizeCssString(
                cssText.substring(0, k),
                _testNoPxNorm
              );
              if (normPart.length === splitNorm) {
                splits.push(cssText.substring(0, k));
                cssText = cssText.substring(k);
                cssTextNorm = cssTextNorm.substring(splitNorm);
                break;
              } else if (normPart.length < splitNorm) {
                k += Math.max(
                  1,
                  Math.floor((splitNorm - normPart.length) / normFactor)
                );
              } else {
                k -= Math.max(
                  1,
                  Math.floor((normPart.length - splitNorm) * normFactor)
                );
              }
            }
            break;
          }
        }
      }
    }
  }
  splits.push(cssText);
  return splits;
}
function markCssSplits(cssText, style) {
  return splitCssText(cssText, style).join("/* rr_split */");
}
let _id = 1;
const tagNameRegex = new RegExp("[^a-z0-9-_:]");
const IGNORED_NODE = -2;
function genId() {
  return _id++;
}
function getValidTagName(element) {
  if (element instanceof HTMLFormElement) {
    return "form";
  }
  const processedTagName = toLowerCase(element.tagName);
  if (tagNameRegex.test(processedTagName)) {
    return "div";
  }
  return processedTagName;
}
let canvasService;
let canvasCtx;
const SRCSET_NOT_SPACES = /^[^ \t\n\r\u000c]+/;
const SRCSET_COMMAS_OR_SPACES = /^[, \t\n\r\u000c]+/;
function getAbsoluteSrcsetString(doc, attributeValue) {
  if (attributeValue.trim() === "") {
    return attributeValue;
  }
  let pos = 0;
  function collectCharacters(regEx) {
    let chars;
    const match = regEx.exec(attributeValue.substring(pos));
    if (match) {
      chars = match[0];
      pos += chars.length;
      return chars;
    }
    return "";
  }
  const output = [];
  while (true) {
    collectCharacters(SRCSET_COMMAS_OR_SPACES);
    if (pos >= attributeValue.length) {
      break;
    }
    let url = collectCharacters(SRCSET_NOT_SPACES);
    if (url.slice(-1) === ",") {
      url = absoluteToDoc(doc, url.substring(0, url.length - 1));
      output.push(url);
    } else {
      let descriptorsStr = "";
      url = absoluteToDoc(doc, url);
      let inParens = false;
      while (true) {
        const c = attributeValue.charAt(pos);
        if (c === "") {
          output.push((url + descriptorsStr).trim());
          break;
        } else if (!inParens) {
          if (c === ",") {
            pos += 1;
            output.push((url + descriptorsStr).trim());
            break;
          } else if (c === "(") {
            inParens = true;
          }
        } else {
          if (c === ")") {
            inParens = false;
          }
        }
        descriptorsStr += c;
        pos += 1;
      }
    }
  }
  return output.join(", ");
}
const cachedDocument = /* @__PURE__ */ new WeakMap();
function absoluteToDoc(doc, attributeValue) {
  if (!attributeValue || attributeValue.trim() === "") {
    return attributeValue;
  }
  return getHref(doc, attributeValue);
}
function isSVGElement(el) {
  return Boolean(el.tagName === "svg" || el.ownerSVGElement);
}
function getHref(doc, customHref) {
  let a = cachedDocument.get(doc);
  if (!a) {
    a = doc.createElement("a");
    cachedDocument.set(doc, a);
  }
  if (!customHref) {
    customHref = "";
  } else if (customHref.startsWith("blob:") || customHref.startsWith("data:")) {
    return customHref;
  }
  a.setAttribute("href", customHref);
  return a.href;
}
function transformAttribute(doc, tagName, name, value) {
  if (!value) {
    return value;
  }
  if (name === "src" || name === "href" && !(tagName === "use" && value[0] === "#")) {
    return absoluteToDoc(doc, value);
  } else if (name === "xlink:href" && value[0] !== "#") {
    return absoluteToDoc(doc, value);
  } else if (name === "background" && (tagName === "table" || tagName === "td" || tagName === "th")) {
    return absoluteToDoc(doc, value);
  } else if (name === "srcset") {
    return getAbsoluteSrcsetString(doc, value);
  } else if (name === "style") {
    return absolutifyURLs(value, getHref(doc));
  } else if (tagName === "object" && name === "data") {
    return absoluteToDoc(doc, value);
  }
  return value;
}
function ignoreAttribute(tagName, name, _value) {
  return (tagName === "video" || tagName === "audio") && name === "autoplay";
}
function _isBlockedElement(element, blockClass, blockSelector) {
  try {
    if (typeof blockClass === "string") {
      if (element.classList.contains(blockClass)) {
        return true;
      }
    } else {
      for (let eIndex = element.classList.length; eIndex--; ) {
        const className = element.classList[eIndex];
        if (blockClass.test(className)) {
          return true;
        }
      }
    }
    if (blockSelector) {
      return element.matches(blockSelector);
    }
  } catch (e) {
  }
  return false;
}
function classMatchesRegex(node2, regex, checkAncestors) {
  if (!node2) return false;
  if (node2.nodeType !== node2.ELEMENT_NODE) {
    if (!checkAncestors) return false;
    return classMatchesRegex(index.parentNode(node2), regex, checkAncestors);
  }
  for (let eIndex = node2.classList.length; eIndex--; ) {
    const className = node2.classList[eIndex];
    if (regex.test(className)) {
      return true;
    }
  }
  if (!checkAncestors) return false;
  return classMatchesRegex(index.parentNode(node2), regex, checkAncestors);
}
function needMaskingText(node2, maskTextClass, maskTextSelector, checkAncestors) {
  let el;
  if (isElement(node2)) {
    el = node2;
    if (!index.childNodes(el).length) {
      return false;
    }
  } else if (index.parentElement(node2) === null) {
    return false;
  } else {
    el = index.parentElement(node2);
  }
  try {
    if (typeof maskTextClass === "string") {
      if (checkAncestors) {
        if (el.closest(`.${maskTextClass}`)) return true;
      } else {
        if (el.classList.contains(maskTextClass)) return true;
      }
    } else {
      if (classMatchesRegex(el, maskTextClass, checkAncestors)) return true;
    }
    if (maskTextSelector) {
      if (checkAncestors) {
        if (el.closest(maskTextSelector)) return true;
      } else {
        if (el.matches(maskTextSelector)) return true;
      }
    }
  } catch (e) {
  }
  return false;
}
function onceIframeLoaded(iframeEl, listener, iframeLoadTimeout) {
  const win = iframeEl.contentWindow;
  if (!win) {
    return;
  }
  let fired = false;
  let readyState;
  try {
    readyState = win.document.readyState;
  } catch (error) {
    return;
  }
  if (readyState !== "complete") {
    const timer = setTimeout(() => {
      if (!fired) {
        listener();
        fired = true;
      }
    }, iframeLoadTimeout);
    iframeEl.addEventListener("load", () => {
      clearTimeout(timer);
      fired = true;
      listener();
    });
    return;
  }
  const blankUrl = "about:blank";
  if (win.location.href !== blankUrl || iframeEl.src === blankUrl || iframeEl.src === "") {
    setTimeout(listener, 0);
    return iframeEl.addEventListener("load", listener);
  }
  iframeEl.addEventListener("load", listener);
}
function onceStylesheetLoaded(link, listener, styleSheetLoadTimeout) {
  let fired = false;
  let styleSheetLoaded;
  try {
    styleSheetLoaded = link.sheet;
  } catch (error) {
    return;
  }
  if (styleSheetLoaded) return;
  const timer = setTimeout(() => {
    if (!fired) {
      listener();
      fired = true;
    }
  }, styleSheetLoadTimeout);
  link.addEventListener("load", () => {
    clearTimeout(timer);
    fired = true;
    listener();
  });
}
function serializeNode(n, options) {
  const {
    doc,
    mirror,
    blockClass,
    blockSelector,
    needsMask,
    inlineStylesheet,
    maskInputOptions = {},
    maskTextFn,
    maskInputFn,
    dataURLOptions = {},
    inlineImages,
    recordCanvas,
    keepIframeSrcFn,
    newlyAddedElement = false,
    cssCaptured = false
  } = options;
  const rootId = getRootId(doc, mirror);
  switch (n.nodeType) {
    case n.DOCUMENT_NODE:
      if (n.compatMode !== "CSS1Compat") {
        return {
          type: NodeType.Document,
          childNodes: [],
          compatMode: n.compatMode
          // probably "BackCompat"
        };
      } else {
        return {
          type: NodeType.Document,
          childNodes: []
        };
      }
    case n.DOCUMENT_TYPE_NODE:
      return {
        type: NodeType.DocumentType,
        name: n.name,
        publicId: n.publicId,
        systemId: n.systemId,
        rootId
      };
    case n.ELEMENT_NODE:
      return serializeElementNode(n, {
        doc,
        blockClass,
        blockSelector,
        inlineStylesheet,
        maskInputOptions,
        maskInputFn,
        dataURLOptions,
        inlineImages,
        recordCanvas,
        keepIframeSrcFn,
        newlyAddedElement,
        rootId
      });
    case n.TEXT_NODE:
      return serializeTextNode(n, {
        doc,
        needsMask,
        maskTextFn,
        rootId,
        cssCaptured
      });
    case n.CDATA_SECTION_NODE:
      return {
        type: NodeType.CDATA,
        textContent: "",
        rootId
      };
    case n.COMMENT_NODE:
      return {
        type: NodeType.Comment,
        textContent: index.textContent(n) || "",
        rootId
      };
    default:
      return false;
  }
}
function getRootId(doc, mirror) {
  if (!mirror.hasNode(doc)) return void 0;
  const docId = mirror.getId(doc);
  return docId === 1 ? void 0 : docId;
}
function serializeTextNode(n, options) {
  const { needsMask, maskTextFn, rootId, cssCaptured } = options;
  const parent = index.parentNode(n);
  const parentTagName = parent && parent.tagName;
  let textContent2 = "";
  const isStyle = parentTagName === "STYLE" ? true : void 0;
  const isScript = parentTagName === "SCRIPT" ? true : void 0;
  if (isScript) {
    textContent2 = "SCRIPT_PLACEHOLDER";
  } else if (!cssCaptured) {
    textContent2 = index.textContent(n);
    if (isStyle && textContent2) {
      textContent2 = absolutifyURLs(textContent2, getHref(options.doc));
    }
  }
  if (!isStyle && !isScript && textContent2 && needsMask) {
    textContent2 = maskTextFn ? maskTextFn(textContent2, index.parentElement(n)) : textContent2.replace(/[\S]/g, "*");
  }
  return {
    type: NodeType.Text,
    textContent: textContent2 || "",
    rootId
  };
}
function serializeElementNode(n, options) {
  const {
    doc,
    blockClass,
    blockSelector,
    inlineStylesheet,
    maskInputOptions = {},
    maskInputFn,
    dataURLOptions = {},
    inlineImages,
    recordCanvas,
    keepIframeSrcFn,
    newlyAddedElement = false,
    rootId
  } = options;
  const needBlock = _isBlockedElement(n, blockClass, blockSelector);
  const tagName = getValidTagName(n);
  let attributes = {};
  const len = n.attributes.length;
  for (let i = 0; i < len; i++) {
    const attr = n.attributes[i];
    if (!ignoreAttribute(tagName, attr.name, attr.value)) {
      attributes[attr.name] = transformAttribute(
        doc,
        tagName,
        toLowerCase(attr.name),
        attr.value
      );
    }
  }
  if (tagName === "link" && inlineStylesheet) {
    const stylesheet = Array.from(doc.styleSheets).find((s) => {
      return s.href === n.href;
    });
    let cssText = null;
    if (stylesheet) {
      cssText = stringifyStylesheet(stylesheet);
    }
    if (cssText) {
      delete attributes.rel;
      delete attributes.href;
      attributes._cssText = cssText;
    }
  }
  if (tagName === "style" && n.sheet) {
    let cssText = stringifyStylesheet(
      n.sheet
    );
    if (cssText) {
      if (n.childNodes.length > 1) {
        cssText = markCssSplits(cssText, n);
      }
      attributes._cssText = cssText;
    }
  }
  if (tagName === "input" || tagName === "textarea" || tagName === "select") {
    const value = n.value;
    const checked = n.checked;
    if (attributes.type !== "radio" && attributes.type !== "checkbox" && attributes.type !== "submit" && attributes.type !== "button" && value) {
      attributes.value = maskInputValue({
        element: n,
        type: getInputType(n),
        tagName,
        value,
        maskInputOptions,
        maskInputFn
      });
    } else if (checked) {
      attributes.checked = checked;
    }
  }
  if (tagName === "option") {
    if (n.selected && !maskInputOptions["select"]) {
      attributes.selected = true;
    } else {
      delete attributes.selected;
    }
  }
  if (tagName === "dialog" && n.open) {
    attributes.rr_open_mode = n.matches("dialog:modal") ? "modal" : "non-modal";
  }
  if (tagName === "canvas" && recordCanvas) {
    if (n.__context === "2d") {
      if (!is2DCanvasBlank(n)) {
        attributes.rr_dataURL = n.toDataURL(
          dataURLOptions.type,
          dataURLOptions.quality
        );
      }
    } else if (!("__context" in n)) {
      const canvasDataURL = n.toDataURL(
        dataURLOptions.type,
        dataURLOptions.quality
      );
      const blankCanvas = doc.createElement("canvas");
      blankCanvas.width = n.width;
      blankCanvas.height = n.height;
      const blankCanvasDataURL = blankCanvas.toDataURL(
        dataURLOptions.type,
        dataURLOptions.quality
      );
      if (canvasDataURL !== blankCanvasDataURL) {
        attributes.rr_dataURL = canvasDataURL;
      }
    }
  }
  if (tagName === "img" && inlineImages) {
    if (!canvasService) {
      canvasService = doc.createElement("canvas");
      canvasCtx = canvasService.getContext("2d");
    }
    const image = n;
    const imageSrc = image.currentSrc || image.getAttribute("src") || "<unknown-src>";
    const priorCrossOrigin = image.crossOrigin;
    const recordInlineImage = () => {
      image.removeEventListener("load", recordInlineImage);
      try {
        canvasService.width = image.naturalWidth;
        canvasService.height = image.naturalHeight;
        canvasCtx.drawImage(image, 0, 0);
        attributes.rr_dataURL = canvasService.toDataURL(
          dataURLOptions.type,
          dataURLOptions.quality
        );
      } catch (err) {
        if (image.crossOrigin !== "anonymous") {
          image.crossOrigin = "anonymous";
          if (image.complete && image.naturalWidth !== 0)
            recordInlineImage();
          else image.addEventListener("load", recordInlineImage);
          return;
        } else {
          console.warn(
            `Cannot inline img src=${imageSrc}! Error: ${err}`
          );
        }
      }
      if (image.crossOrigin === "anonymous") {
        priorCrossOrigin ? attributes.crossOrigin = priorCrossOrigin : image.removeAttribute("crossorigin");
      }
    };
    if (image.complete && image.naturalWidth !== 0) recordInlineImage();
    else image.addEventListener("load", recordInlineImage);
  }
  if (tagName === "audio" || tagName === "video") {
    const mediaAttributes = attributes;
    mediaAttributes.rr_mediaState = n.paused ? "paused" : "played";
    mediaAttributes.rr_mediaCurrentTime = n.currentTime;
    mediaAttributes.rr_mediaPlaybackRate = n.playbackRate;
    mediaAttributes.rr_mediaMuted = n.muted;
    mediaAttributes.rr_mediaLoop = n.loop;
    mediaAttributes.rr_mediaVolume = n.volume;
  }
  if (!newlyAddedElement) {
    if (n.scrollLeft) {
      attributes.rr_scrollLeft = n.scrollLeft;
    }
    if (n.scrollTop) {
      attributes.rr_scrollTop = n.scrollTop;
    }
  }
  if (needBlock) {
    const { width, height } = n.getBoundingClientRect();
    attributes = {
      class: attributes.class,
      rr_width: `${width}px`,
      rr_height: `${height}px`
    };
  }
  if (tagName === "iframe" && !keepIframeSrcFn(attributes.src)) {
    if (!n.contentDocument) {
      attributes.rr_src = attributes.src;
    }
    delete attributes.src;
  }
  let isCustomElement;
  try {
    if (customElements.get(tagName)) isCustomElement = true;
  } catch (e) {
  }
  return {
    type: NodeType.Element,
    tagName,
    attributes,
    childNodes: [],
    isSVG: isSVGElement(n) || void 0,
    needBlock,
    rootId,
    isCustom: isCustomElement
  };
}
function lowerIfExists(maybeAttr) {
  if (maybeAttr === void 0 || maybeAttr === null) {
    return "";
  } else {
    return maybeAttr.toLowerCase();
  }
}
function slimDOMExcluded(sn, slimDOMOptions) {
  if (slimDOMOptions.comment && sn.type === NodeType.Comment) {
    return true;
  } else if (sn.type === NodeType.Element) {
    if (slimDOMOptions.script && // script tag
    (sn.tagName === "script" || // (module)preload link
    sn.tagName === "link" && (sn.attributes.rel === "preload" && sn.attributes.as === "script" || sn.attributes.rel === "modulepreload") || // prefetch link
    sn.tagName === "link" && sn.attributes.rel === "prefetch" && typeof sn.attributes.href === "string" && extractFileExtension(sn.attributes.href) === "js")) {
      return true;
    } else if (slimDOMOptions.headFavicon && (sn.tagName === "link" && sn.attributes.rel === "shortcut icon" || sn.tagName === "meta" && (lowerIfExists(sn.attributes.name).match(
      /^msapplication-tile(image|color)$/
    ) || lowerIfExists(sn.attributes.name) === "application-name" || lowerIfExists(sn.attributes.rel) === "icon" || lowerIfExists(sn.attributes.rel) === "apple-touch-icon" || lowerIfExists(sn.attributes.rel) === "shortcut icon"))) {
      return true;
    } else if (sn.tagName === "meta") {
      if (slimDOMOptions.headMetaDescKeywords && lowerIfExists(sn.attributes.name).match(/^description|keywords$/)) {
        return true;
      } else if (slimDOMOptions.headMetaSocial && (lowerIfExists(sn.attributes.property).match(/^(og|twitter|fb):/) || // og = opengraph (facebook)
      lowerIfExists(sn.attributes.name).match(/^(og|twitter):/) || lowerIfExists(sn.attributes.name) === "pinterest")) {
        return true;
      } else if (slimDOMOptions.headMetaRobots && (lowerIfExists(sn.attributes.name) === "robots" || lowerIfExists(sn.attributes.name) === "googlebot" || lowerIfExists(sn.attributes.name) === "bingbot")) {
        return true;
      } else if (slimDOMOptions.headMetaHttpEquiv && sn.attributes["http-equiv"] !== void 0) {
        return true;
      } else if (slimDOMOptions.headMetaAuthorship && (lowerIfExists(sn.attributes.name) === "author" || lowerIfExists(sn.attributes.name) === "generator" || lowerIfExists(sn.attributes.name) === "framework" || lowerIfExists(sn.attributes.name) === "publisher" || lowerIfExists(sn.attributes.name) === "progid" || lowerIfExists(sn.attributes.property).match(/^article:/) || lowerIfExists(sn.attributes.property).match(/^product:/))) {
        return true;
      } else if (slimDOMOptions.headMetaVerification && (lowerIfExists(sn.attributes.name) === "google-site-verification" || lowerIfExists(sn.attributes.name) === "yandex-verification" || lowerIfExists(sn.attributes.name) === "csrf-token" || lowerIfExists(sn.attributes.name) === "p:domain_verify" || lowerIfExists(sn.attributes.name) === "verify-v1" || lowerIfExists(sn.attributes.name) === "verification" || lowerIfExists(sn.attributes.name) === "shopify-checkout-api-token")) {
        return true;
      }
    }
  }
  return false;
}
function serializeNodeWithId(n, options) {
  const {
    doc,
    mirror,
    blockClass,
    blockSelector,
    maskTextClass,
    maskTextSelector,
    skipChild = false,
    inlineStylesheet = true,
    maskInputOptions = {},
    maskTextFn,
    maskInputFn,
    slimDOMOptions,
    dataURLOptions = {},
    inlineImages = false,
    recordCanvas = false,
    onSerialize,
    onIframeLoad,
    iframeLoadTimeout = 5e3,
    onStylesheetLoad,
    stylesheetLoadTimeout = 5e3,
    keepIframeSrcFn = () => false,
    newlyAddedElement = false,
    cssCaptured = false
  } = options;
  let { needsMask } = options;
  let { preserveWhiteSpace = true } = options;
  if (!needsMask) {
    const checkAncestors = needsMask === void 0;
    needsMask = needMaskingText(
      n,
      maskTextClass,
      maskTextSelector,
      checkAncestors
    );
  }
  const _serializedNode = serializeNode(n, {
    doc,
    mirror,
    blockClass,
    blockSelector,
    needsMask,
    inlineStylesheet,
    maskInputOptions,
    maskTextFn,
    maskInputFn,
    dataURLOptions,
    inlineImages,
    recordCanvas,
    keepIframeSrcFn,
    newlyAddedElement,
    cssCaptured
  });
  if (!_serializedNode) {
    console.warn(n, "not serialized");
    return null;
  }
  let id;
  if (mirror.hasNode(n)) {
    id = mirror.getId(n);
  } else if (slimDOMExcluded(_serializedNode, slimDOMOptions) || !preserveWhiteSpace && _serializedNode.type === NodeType.Text && !_serializedNode.textContent.replace(/^\s+|\s+$/gm, "").length) {
    id = IGNORED_NODE;
  } else {
    id = genId();
  }
  const serializedNode = Object.assign(_serializedNode, { id });
  mirror.add(n, serializedNode);
  if (id === IGNORED_NODE) {
    return null;
  }
  if (onSerialize) {
    onSerialize(n);
  }
  let recordChild = !skipChild;
  if (serializedNode.type === NodeType.Element) {
    recordChild = recordChild && !serializedNode.needBlock;
    delete serializedNode.needBlock;
    const shadowRootEl = index.shadowRoot(n);
    if (shadowRootEl && isNativeShadowDom(shadowRootEl)) {
      serializedNode.isShadowHost = true;
      if (shadowRootEl.adoptedStyleSheets.length > 0) {
        serializedNode.chromaticAdoptedStylesheets = shadowRootEl.adoptedStyleSheets.map(
          (stylesheet) => stringifyStylesheet(stylesheet)
        );
      }
    }
  }
  if ((serializedNode.type === NodeType.Document || serializedNode.type === NodeType.Element) && recordChild) {
    if (slimDOMOptions.headWhitespace && serializedNode.type === NodeType.Element && serializedNode.tagName === "head") {
      preserveWhiteSpace = false;
    }
    const bypassOptions = {
      doc,
      mirror,
      blockClass,
      blockSelector,
      needsMask,
      maskTextClass,
      maskTextSelector,
      skipChild,
      inlineStylesheet,
      maskInputOptions,
      maskTextFn,
      maskInputFn,
      slimDOMOptions,
      dataURLOptions,
      inlineImages,
      recordCanvas,
      preserveWhiteSpace,
      onSerialize,
      onIframeLoad,
      iframeLoadTimeout,
      onStylesheetLoad,
      stylesheetLoadTimeout,
      keepIframeSrcFn,
      cssCaptured: false
    };
    if (serializedNode.type === NodeType.Element && serializedNode.tagName === "textarea" && serializedNode.attributes.value !== void 0) ;
    else {
      if (serializedNode.type === NodeType.Element && serializedNode.attributes._cssText !== void 0 && typeof serializedNode.attributes._cssText === "string") {
        bypassOptions.cssCaptured = true;
      }
      for (const childN of Array.from(index.childNodes(n))) {
        const serializedChildNode = serializeNodeWithId(childN, bypassOptions);
        if (serializedChildNode) {
          serializedNode.childNodes.push(serializedChildNode);
        }
      }
    }
    let shadowRootEl = null;
    if (isElement(n) && (shadowRootEl = index.shadowRoot(n))) {
      for (const childN of Array.from(index.childNodes(shadowRootEl))) {
        const serializedChildNode = serializeNodeWithId(childN, bypassOptions);
        if (serializedChildNode) {
          isNativeShadowDom(shadowRootEl) && (serializedChildNode.isShadow = true);
          serializedNode.childNodes.push(serializedChildNode);
        }
      }
    }
  }
  const parent = index.parentNode(n);
  if (parent && isShadowRoot(parent) && isNativeShadowDom(parent)) {
    serializedNode.isShadow = true;
  }
  if (serializedNode.type === NodeType.Element && serializedNode.tagName === "iframe") {
    onceIframeLoaded(
      n,
      () => {
        const iframeDoc = n.contentDocument;
        if (iframeDoc && onIframeLoad) {
          const serializedIframeNode = serializeNodeWithId(iframeDoc, {
            doc: iframeDoc,
            mirror,
            blockClass,
            blockSelector,
            needsMask,
            maskTextClass,
            maskTextSelector,
            skipChild: false,
            inlineStylesheet,
            maskInputOptions,
            maskTextFn,
            maskInputFn,
            slimDOMOptions,
            dataURLOptions,
            inlineImages,
            recordCanvas,
            preserveWhiteSpace,
            onSerialize,
            onIframeLoad,
            iframeLoadTimeout,
            onStylesheetLoad,
            stylesheetLoadTimeout,
            keepIframeSrcFn
          });
          if (serializedIframeNode) {
            onIframeLoad(
              n,
              serializedIframeNode
            );
          }
        }
      },
      iframeLoadTimeout
    );
  }
  if (serializedNode.type === NodeType.Element && serializedNode.tagName === "link" && typeof serializedNode.attributes.rel === "string" && (serializedNode.attributes.rel === "stylesheet" || serializedNode.attributes.rel === "preload" && typeof serializedNode.attributes.href === "string" && extractFileExtension(serializedNode.attributes.href) === "css")) {
    onceStylesheetLoaded(
      n,
      () => {
        if (onStylesheetLoad) {
          const serializedLinkNode = serializeNodeWithId(n, {
            doc,
            mirror,
            blockClass,
            blockSelector,
            needsMask,
            maskTextClass,
            maskTextSelector,
            skipChild: false,
            inlineStylesheet,
            maskInputOptions,
            maskTextFn,
            maskInputFn,
            slimDOMOptions,
            dataURLOptions,
            inlineImages,
            recordCanvas,
            preserveWhiteSpace,
            onSerialize,
            onIframeLoad,
            iframeLoadTimeout,
            onStylesheetLoad,
            stylesheetLoadTimeout,
            keepIframeSrcFn
          });
          if (serializedLinkNode) {
            onStylesheetLoad(
              n,
              serializedLinkNode
            );
          }
        }
      },
      stylesheetLoadTimeout
    );
  }
  return serializedNode;
}
function snapshot(n, options) {
  const {
    mirror = new Mirror(),
    blockClass = "rr-block",
    blockSelector = null,
    maskTextClass = "rr-mask",
    maskTextSelector = null,
    inlineStylesheet = true,
    inlineImages = false,
    recordCanvas = false,
    maskAllInputs = false,
    maskTextFn,
    maskInputFn,
    slimDOM = false,
    dataURLOptions,
    preserveWhiteSpace,
    onSerialize,
    onIframeLoad,
    iframeLoadTimeout,
    onStylesheetLoad,
    stylesheetLoadTimeout,
    keepIframeSrcFn = () => false
  } = options || {};
  const maskInputOptions = maskAllInputs === true ? {
    color: true,
    date: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true,
    textarea: true,
    select: true,
    password: true
  } : maskAllInputs === false ? {
    password: true
  } : maskAllInputs;
  const slimDOMOptions = slimDOM === true || slimDOM === "all" ? (
    // if true: set of sensible options that should not throw away any information
    {
      script: true,
      comment: true,
      headFavicon: true,
      headWhitespace: true,
      headMetaDescKeywords: slimDOM === "all",
      // destructive
      headMetaSocial: true,
      headMetaRobots: true,
      headMetaHttpEquiv: true,
      headMetaAuthorship: true,
      headMetaVerification: true
    }
  ) : slimDOM === false ? {} : slimDOM;
  return serializeNodeWithId(n, {
    doc: n,
    mirror,
    blockClass,
    blockSelector,
    maskTextClass,
    maskTextSelector,
    skipChild: false,
    inlineStylesheet,
    maskInputOptions,
    maskTextFn,
    maskInputFn,
    slimDOMOptions,
    dataURLOptions,
    inlineImages,
    recordCanvas,
    preserveWhiteSpace,
    onSerialize,
    onIframeLoad,
    iframeLoadTimeout,
    onStylesheetLoad,
    stylesheetLoadTimeout,
    keepIframeSrcFn,
    newlyAddedElement: false
  });
}
function visitSnapshot(node2, onVisit) {
  function walk(current) {
    onVisit(current);
    if (current.type === NodeType.Document || current.type === NodeType.Element) {
      current.childNodes.forEach(walk);
    }
  }
  walk(node2);
}
function cleanupSnapshot() {
  _id = 1;
}
const MEDIA_SELECTOR = /(max|min)-device-(width|height)/;
const MEDIA_SELECTOR_GLOBAL = new RegExp(MEDIA_SELECTOR.source, "g");
const mediaSelectorPlugin = {
  postcssPlugin: "postcss-custom-selectors",
  prepare() {
    return {
      postcssPlugin: "postcss-custom-selectors",
      AtRule: function(atrule) {
        if (atrule.params.match(MEDIA_SELECTOR_GLOBAL)) {
          atrule.params = atrule.params.replace(MEDIA_SELECTOR_GLOBAL, "$1-$2");
        }
      }
    };
  }
};
const pseudoClassPlugin = {
  postcssPlugin: "postcss-hover-classes",
  prepare: function() {
    const fixed = [];
    return {
      Rule: function(rule2) {
        if (fixed.indexOf(rule2) !== -1) {
          return;
        }
        fixed.push(rule2);
        rule2.selectors.forEach(function(selector) {
          if (selector.includes(":hover")) {
            rule2.selector += ",\n" + selector.replace(/:hover/g, ".\\:hover");
          }
        });
      }
    };
  }
};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var picocolors_browser = { exports: {} };
var x = String;
var create = function() {
  return { isColorSupported: false, reset: x, bold: x, dim: x, italic: x, underline: x, inverse: x, hidden: x, strikethrough: x, black: x, red: x, green: x, yellow: x, blue: x, magenta: x, cyan: x, white: x, gray: x, bgBlack: x, bgRed: x, bgGreen: x, bgYellow: x, bgBlue: x, bgMagenta: x, bgCyan: x, bgWhite: x };
};
picocolors_browser.exports = create();
picocolors_browser.exports.createColors = create;
var picocolors_browserExports = picocolors_browser.exports;
const __viteBrowserExternal = {};
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
let pico = picocolors_browserExports;
let terminalHighlight$1 = require$$2;
let CssSyntaxError$3 = class CssSyntaxError extends Error {
  constructor(message, line, column, source, file, plugin2) {
    super(message);
    this.name = "CssSyntaxError";
    this.reason = message;
    if (file) {
      this.file = file;
    }
    if (source) {
      this.source = source;
    }
    if (plugin2) {
      this.plugin = plugin2;
    }
    if (typeof line !== "undefined" && typeof column !== "undefined") {
      if (typeof line === "number") {
        this.line = line;
        this.column = column;
      } else {
        this.line = line.line;
        this.column = line.column;
        this.endLine = column.line;
        this.endColumn = column.column;
      }
    }
    this.setMessage();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CssSyntaxError);
    }
  }
  setMessage() {
    this.message = this.plugin ? this.plugin + ": " : "";
    this.message += this.file ? this.file : "<css input>";
    if (typeof this.line !== "undefined") {
      this.message += ":" + this.line + ":" + this.column;
    }
    this.message += ": " + this.reason;
  }
  showSourceCode(color) {
    if (!this.source) return "";
    let css = this.source;
    if (color == null) color = pico.isColorSupported;
    if (terminalHighlight$1) {
      if (color) css = terminalHighlight$1(css);
    }
    let lines = css.split(/\r?\n/);
    let start = Math.max(this.line - 3, 0);
    let end = Math.min(this.line + 2, lines.length);
    let maxWidth = String(end).length;
    let mark, aside;
    if (color) {
      let { bold, gray, red } = pico.createColors(true);
      mark = (text) => bold(red(text));
      aside = (text) => gray(text);
    } else {
      mark = aside = (str) => str;
    }
    return lines.slice(start, end).map((line, index2) => {
      let number = start + 1 + index2;
      let gutter = " " + (" " + number).slice(-maxWidth) + " | ";
      if (number === this.line) {
        let spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, this.column - 1).replace(/[^\t]/g, " ");
        return mark(">") + aside(gutter) + line + "\n " + spacing + mark("^");
      }
      return " " + aside(gutter) + line;
    }).join("\n");
  }
  toString() {
    let code = this.showSourceCode();
    if (code) {
      code = "\n\n" + code + "\n";
    }
    return this.name + ": " + this.message + code;
  }
};
var cssSyntaxError = CssSyntaxError$3;
CssSyntaxError$3.default = CssSyntaxError$3;
var symbols = {};
symbols.isClean = Symbol("isClean");
symbols.my = Symbol("my");
const DEFAULT_RAW = {
  after: "\n",
  beforeClose: "\n",
  beforeComment: "\n",
  beforeDecl: "\n",
  beforeOpen: " ",
  beforeRule: "\n",
  colon: ": ",
  commentLeft: " ",
  commentRight: " ",
  emptyBody: "",
  indent: "    ",
  semicolon: false
};
function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
let Stringifier$2 = class Stringifier {
  constructor(builder) {
    this.builder = builder;
  }
  atrule(node2, semicolon) {
    let name = "@" + node2.name;
    let params = node2.params ? this.rawValue(node2, "params") : "";
    if (typeof node2.raws.afterName !== "undefined") {
      name += node2.raws.afterName;
    } else if (params) {
      name += " ";
    }
    if (node2.nodes) {
      this.block(node2, name + params);
    } else {
      let end = (node2.raws.between || "") + (semicolon ? ";" : "");
      this.builder(name + params + end, node2);
    }
  }
  beforeAfter(node2, detect) {
    let value;
    if (node2.type === "decl") {
      value = this.raw(node2, null, "beforeDecl");
    } else if (node2.type === "comment") {
      value = this.raw(node2, null, "beforeComment");
    } else if (detect === "before") {
      value = this.raw(node2, null, "beforeRule");
    } else {
      value = this.raw(node2, null, "beforeClose");
    }
    let buf = node2.parent;
    let depth = 0;
    while (buf && buf.type !== "root") {
      depth += 1;
      buf = buf.parent;
    }
    if (value.includes("\n")) {
      let indent = this.raw(node2, null, "indent");
      if (indent.length) {
        for (let step = 0; step < depth; step++) value += indent;
      }
    }
    return value;
  }
  block(node2, start) {
    let between = this.raw(node2, "between", "beforeOpen");
    this.builder(start + between + "{", node2, "start");
    let after;
    if (node2.nodes && node2.nodes.length) {
      this.body(node2);
      after = this.raw(node2, "after");
    } else {
      after = this.raw(node2, "after", "emptyBody");
    }
    if (after) this.builder(after);
    this.builder("}", node2, "end");
  }
  body(node2) {
    let last = node2.nodes.length - 1;
    while (last > 0) {
      if (node2.nodes[last].type !== "comment") break;
      last -= 1;
    }
    let semicolon = this.raw(node2, "semicolon");
    for (let i = 0; i < node2.nodes.length; i++) {
      let child = node2.nodes[i];
      let before = this.raw(child, "before");
      if (before) this.builder(before);
      this.stringify(child, last !== i || semicolon);
    }
  }
  comment(node2) {
    let left = this.raw(node2, "left", "commentLeft");
    let right = this.raw(node2, "right", "commentRight");
    this.builder("/*" + left + node2.text + right + "*/", node2);
  }
  decl(node2, semicolon) {
    let between = this.raw(node2, "between", "colon");
    let string = node2.prop + between + this.rawValue(node2, "value");
    if (node2.important) {
      string += node2.raws.important || " !important";
    }
    if (semicolon) string += ";";
    this.builder(string, node2);
  }
  document(node2) {
    this.body(node2);
  }
  raw(node2, own, detect) {
    let value;
    if (!detect) detect = own;
    if (own) {
      value = node2.raws[own];
      if (typeof value !== "undefined") return value;
    }
    let parent = node2.parent;
    if (detect === "before") {
      if (!parent || parent.type === "root" && parent.first === node2) {
        return "";
      }
      if (parent && parent.type === "document") {
        return "";
      }
    }
    if (!parent) return DEFAULT_RAW[detect];
    let root2 = node2.root();
    if (!root2.rawCache) root2.rawCache = {};
    if (typeof root2.rawCache[detect] !== "undefined") {
      return root2.rawCache[detect];
    }
    if (detect === "before" || detect === "after") {
      return this.beforeAfter(node2, detect);
    } else {
      let method = "raw" + capitalize(detect);
      if (this[method]) {
        value = this[method](root2, node2);
      } else {
        root2.walk((i) => {
          value = i.raws[own];
          if (typeof value !== "undefined") return false;
        });
      }
    }
    if (typeof value === "undefined") value = DEFAULT_RAW[detect];
    root2.rawCache[detect] = value;
    return value;
  }
  rawBeforeClose(root2) {
    let value;
    root2.walk((i) => {
      if (i.nodes && i.nodes.length > 0) {
        if (typeof i.raws.after !== "undefined") {
          value = i.raws.after;
          if (value.includes("\n")) {
            value = value.replace(/[^\n]+$/, "");
          }
          return false;
        }
      }
    });
    if (value) value = value.replace(/\S/g, "");
    return value;
  }
  rawBeforeComment(root2, node2) {
    let value;
    root2.walkComments((i) => {
      if (typeof i.raws.before !== "undefined") {
        value = i.raws.before;
        if (value.includes("\n")) {
          value = value.replace(/[^\n]+$/, "");
        }
        return false;
      }
    });
    if (typeof value === "undefined") {
      value = this.raw(node2, null, "beforeDecl");
    } else if (value) {
      value = value.replace(/\S/g, "");
    }
    return value;
  }
  rawBeforeDecl(root2, node2) {
    let value;
    root2.walkDecls((i) => {
      if (typeof i.raws.before !== "undefined") {
        value = i.raws.before;
        if (value.includes("\n")) {
          value = value.replace(/[^\n]+$/, "");
        }
        return false;
      }
    });
    if (typeof value === "undefined") {
      value = this.raw(node2, null, "beforeRule");
    } else if (value) {
      value = value.replace(/\S/g, "");
    }
    return value;
  }
  rawBeforeOpen(root2) {
    let value;
    root2.walk((i) => {
      if (i.type !== "decl") {
        value = i.raws.between;
        if (typeof value !== "undefined") return false;
      }
    });
    return value;
  }
  rawBeforeRule(root2) {
    let value;
    root2.walk((i) => {
      if (i.nodes && (i.parent !== root2 || root2.first !== i)) {
        if (typeof i.raws.before !== "undefined") {
          value = i.raws.before;
          if (value.includes("\n")) {
            value = value.replace(/[^\n]+$/, "");
          }
          return false;
        }
      }
    });
    if (value) value = value.replace(/\S/g, "");
    return value;
  }
  rawColon(root2) {
    let value;
    root2.walkDecls((i) => {
      if (typeof i.raws.between !== "undefined") {
        value = i.raws.between.replace(/[^\s:]/g, "");
        return false;
      }
    });
    return value;
  }
  rawEmptyBody(root2) {
    let value;
    root2.walk((i) => {
      if (i.nodes && i.nodes.length === 0) {
        value = i.raws.after;
        if (typeof value !== "undefined") return false;
      }
    });
    return value;
  }
  rawIndent(root2) {
    if (root2.raws.indent) return root2.raws.indent;
    let value;
    root2.walk((i) => {
      let p = i.parent;
      if (p && p !== root2 && p.parent && p.parent === root2) {
        if (typeof i.raws.before !== "undefined") {
          let parts = i.raws.before.split("\n");
          value = parts[parts.length - 1];
          value = value.replace(/\S/g, "");
          return false;
        }
      }
    });
    return value;
  }
  rawSemicolon(root2) {
    let value;
    root2.walk((i) => {
      if (i.nodes && i.nodes.length && i.last.type === "decl") {
        value = i.raws.semicolon;
        if (typeof value !== "undefined") return false;
      }
    });
    return value;
  }
  rawValue(node2, prop) {
    let value = node2[prop];
    let raw = node2.raws[prop];
    if (raw && raw.value === value) {
      return raw.raw;
    }
    return value;
  }
  root(node2) {
    this.body(node2);
    if (node2.raws.after) this.builder(node2.raws.after);
  }
  rule(node2) {
    this.block(node2, this.rawValue(node2, "selector"));
    if (node2.raws.ownSemicolon) {
      this.builder(node2.raws.ownSemicolon, node2, "end");
    }
  }
  stringify(node2, semicolon) {
    if (!this[node2.type]) {
      throw new Error(
        "Unknown AST node type " + node2.type + ". Maybe you need to change PostCSS stringifier."
      );
    }
    this[node2.type](node2, semicolon);
  }
};
var stringifier = Stringifier$2;
Stringifier$2.default = Stringifier$2;
let Stringifier$1 = stringifier;
function stringify$4(node2, builder) {
  let str = new Stringifier$1(builder);
  str.stringify(node2);
}
var stringify_1 = stringify$4;
stringify$4.default = stringify$4;
let { isClean: isClean$2, my: my$2 } = symbols;
let CssSyntaxError$2 = cssSyntaxError;
let Stringifier2 = stringifier;
let stringify$3 = stringify_1;
function cloneNode(obj, parent) {
  let cloned = new obj.constructor();
  for (let i in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, i)) {
      continue;
    }
    if (i === "proxyCache") continue;
    let value = obj[i];
    let type = typeof value;
    if (i === "parent" && type === "object") {
      if (parent) cloned[i] = parent;
    } else if (i === "source") {
      cloned[i] = value;
    } else if (Array.isArray(value)) {
      cloned[i] = value.map((j) => cloneNode(j, cloned));
    } else {
      if (type === "object" && value !== null) value = cloneNode(value);
      cloned[i] = value;
    }
  }
  return cloned;
}
let Node$4 = class Node {
  constructor(defaults = {}) {
    this.raws = {};
    this[isClean$2] = false;
    this[my$2] = true;
    for (let name in defaults) {
      if (name === "nodes") {
        this.nodes = [];
        for (let node2 of defaults[name]) {
          if (typeof node2.clone === "function") {
            this.append(node2.clone());
          } else {
            this.append(node2);
          }
        }
      } else {
        this[name] = defaults[name];
      }
    }
  }
  addToError(error) {
    error.postcssNode = this;
    if (error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
      let s = this.source;
      error.stack = error.stack.replace(
        /\n\s{4}at /,
        `$&${s.input.from}:${s.start.line}:${s.start.column}$&`
      );
    }
    return error;
  }
  after(add) {
    this.parent.insertAfter(this, add);
    return this;
  }
  assign(overrides = {}) {
    for (let name in overrides) {
      this[name] = overrides[name];
    }
    return this;
  }
  before(add) {
    this.parent.insertBefore(this, add);
    return this;
  }
  cleanRaws(keepBetween) {
    delete this.raws.before;
    delete this.raws.after;
    if (!keepBetween) delete this.raws.between;
  }
  clone(overrides = {}) {
    let cloned = cloneNode(this);
    for (let name in overrides) {
      cloned[name] = overrides[name];
    }
    return cloned;
  }
  cloneAfter(overrides = {}) {
    let cloned = this.clone(overrides);
    this.parent.insertAfter(this, cloned);
    return cloned;
  }
  cloneBefore(overrides = {}) {
    let cloned = this.clone(overrides);
    this.parent.insertBefore(this, cloned);
    return cloned;
  }
  error(message, opts = {}) {
    if (this.source) {
      let { end, start } = this.rangeBy(opts);
      return this.source.input.error(
        message,
        { column: start.column, line: start.line },
        { column: end.column, line: end.line },
        opts
      );
    }
    return new CssSyntaxError$2(message);
  }
  getProxyProcessor() {
    return {
      get(node2, prop) {
        if (prop === "proxyOf") {
          return node2;
        } else if (prop === "root") {
          return () => node2.root().toProxy();
        } else {
          return node2[prop];
        }
      },
      set(node2, prop, value) {
        if (node2[prop] === value) return true;
        node2[prop] = value;
        if (prop === "prop" || prop === "value" || prop === "name" || prop === "params" || prop === "important" || /* c8 ignore next */
        prop === "text") {
          node2.markDirty();
        }
        return true;
      }
    };
  }
  markDirty() {
    if (this[isClean$2]) {
      this[isClean$2] = false;
      let next = this;
      while (next = next.parent) {
        next[isClean$2] = false;
      }
    }
  }
  next() {
    if (!this.parent) return void 0;
    let index2 = this.parent.index(this);
    return this.parent.nodes[index2 + 1];
  }
  positionBy(opts, stringRepresentation) {
    let pos = this.source.start;
    if (opts.index) {
      pos = this.positionInside(opts.index, stringRepresentation);
    } else if (opts.word) {
      stringRepresentation = this.toString();
      let index2 = stringRepresentation.indexOf(opts.word);
      if (index2 !== -1) pos = this.positionInside(index2, stringRepresentation);
    }
    return pos;
  }
  positionInside(index2, stringRepresentation) {
    let string = stringRepresentation || this.toString();
    let column = this.source.start.column;
    let line = this.source.start.line;
    for (let i = 0; i < index2; i++) {
      if (string[i] === "\n") {
        column = 1;
        line += 1;
      } else {
        column += 1;
      }
    }
    return { column, line };
  }
  prev() {
    if (!this.parent) return void 0;
    let index2 = this.parent.index(this);
    return this.parent.nodes[index2 - 1];
  }
  rangeBy(opts) {
    let start = {
      column: this.source.start.column,
      line: this.source.start.line
    };
    let end = this.source.end ? {
      column: this.source.end.column + 1,
      line: this.source.end.line
    } : {
      column: start.column + 1,
      line: start.line
    };
    if (opts.word) {
      let stringRepresentation = this.toString();
      let index2 = stringRepresentation.indexOf(opts.word);
      if (index2 !== -1) {
        start = this.positionInside(index2, stringRepresentation);
        end = this.positionInside(index2 + opts.word.length, stringRepresentation);
      }
    } else {
      if (opts.start) {
        start = {
          column: opts.start.column,
          line: opts.start.line
        };
      } else if (opts.index) {
        start = this.positionInside(opts.index);
      }
      if (opts.end) {
        end = {
          column: opts.end.column,
          line: opts.end.line
        };
      } else if (typeof opts.endIndex === "number") {
        end = this.positionInside(opts.endIndex);
      } else if (opts.index) {
        end = this.positionInside(opts.index + 1);
      }
    }
    if (end.line < start.line || end.line === start.line && end.column <= start.column) {
      end = { column: start.column + 1, line: start.line };
    }
    return { end, start };
  }
  raw(prop, defaultType) {
    let str = new Stringifier2();
    return str.raw(this, prop, defaultType);
  }
  remove() {
    if (this.parent) {
      this.parent.removeChild(this);
    }
    this.parent = void 0;
    return this;
  }
  replaceWith(...nodes) {
    if (this.parent) {
      let bookmark = this;
      let foundSelf = false;
      for (let node2 of nodes) {
        if (node2 === this) {
          foundSelf = true;
        } else if (foundSelf) {
          this.parent.insertAfter(bookmark, node2);
          bookmark = node2;
        } else {
          this.parent.insertBefore(bookmark, node2);
        }
      }
      if (!foundSelf) {
        this.remove();
      }
    }
    return this;
  }
  root() {
    let result2 = this;
    while (result2.parent && result2.parent.type !== "document") {
      result2 = result2.parent;
    }
    return result2;
  }
  toJSON(_, inputs) {
    let fixed = {};
    let emitInputs = inputs == null;
    inputs = inputs || /* @__PURE__ */ new Map();
    let inputsNextIndex = 0;
    for (let name in this) {
      if (!Object.prototype.hasOwnProperty.call(this, name)) {
        continue;
      }
      if (name === "parent" || name === "proxyCache") continue;
      let value = this[name];
      if (Array.isArray(value)) {
        fixed[name] = value.map((i) => {
          if (typeof i === "object" && i.toJSON) {
            return i.toJSON(null, inputs);
          } else {
            return i;
          }
        });
      } else if (typeof value === "object" && value.toJSON) {
        fixed[name] = value.toJSON(null, inputs);
      } else if (name === "source") {
        let inputId = inputs.get(value.input);
        if (inputId == null) {
          inputId = inputsNextIndex;
          inputs.set(value.input, inputsNextIndex);
          inputsNextIndex++;
        }
        fixed[name] = {
          end: value.end,
          inputId,
          start: value.start
        };
      } else {
        fixed[name] = value;
      }
    }
    if (emitInputs) {
      fixed.inputs = [...inputs.keys()].map((input2) => input2.toJSON());
    }
    return fixed;
  }
  toProxy() {
    if (!this.proxyCache) {
      this.proxyCache = new Proxy(this, this.getProxyProcessor());
    }
    return this.proxyCache;
  }
  toString(stringifier2 = stringify$3) {
    if (stringifier2.stringify) stringifier2 = stringifier2.stringify;
    let result2 = "";
    stringifier2(this, (i) => {
      result2 += i;
    });
    return result2;
  }
  warn(result2, text, opts) {
    let data = { node: this };
    for (let i in opts) data[i] = opts[i];
    return result2.warn(text, data);
  }
  get proxyOf() {
    return this;
  }
};
var node = Node$4;
Node$4.default = Node$4;
let Node$3 = node;
let Declaration$4 = class Declaration extends Node$3 {
  constructor(defaults) {
    if (defaults && typeof defaults.value !== "undefined" && typeof defaults.value !== "string") {
      defaults = __spreadProps(__spreadValues({}, defaults), { value: String(defaults.value) });
    }
    super(defaults);
    this.type = "decl";
  }
  get variable() {
    return this.prop.startsWith("--") || this.prop[0] === "$";
  }
};
var declaration = Declaration$4;
Declaration$4.default = Declaration$4;
let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let customAlphabet = (alphabet, defaultSize = 21) => {
  return (size = defaultSize) => {
    let id = "";
    let i = size;
    while (i--) {
      id += alphabet[Math.random() * alphabet.length | 0];
    }
    return id;
  };
};
let nanoid$1 = (size = 21) => {
  let id = "";
  let i = size;
  while (i--) {
    id += urlAlphabet[Math.random() * 64 | 0];
  }
  return id;
};
var nonSecure = { nanoid: nanoid$1, customAlphabet };
let { SourceMapConsumer: SourceMapConsumer$2, SourceMapGenerator: SourceMapGenerator$2 } = require$$2;
let { existsSync, readFileSync } = require$$2;
let { dirname: dirname$1, join } = require$$2;
function fromBase64(str) {
  if (Buffer) {
    return Buffer.from(str, "base64").toString();
  } else {
    return window.atob(str);
  }
}
let PreviousMap$2 = class PreviousMap {
  constructor(css, opts) {
    if (opts.map === false) return;
    this.loadAnnotation(css);
    this.inline = this.startWith(this.annotation, "data:");
    let prev = opts.map ? opts.map.prev : void 0;
    let text = this.loadMap(opts.from, prev);
    if (!this.mapFile && opts.from) {
      this.mapFile = opts.from;
    }
    if (this.mapFile) this.root = dirname$1(this.mapFile);
    if (text) this.text = text;
  }
  consumer() {
    if (!this.consumerCache) {
      this.consumerCache = new SourceMapConsumer$2(this.text);
    }
    return this.consumerCache;
  }
  decodeInline(text) {
    let baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
    let baseUri = /^data:application\/json;base64,/;
    let charsetUri = /^data:application\/json;charset=utf-?8,/;
    let uri = /^data:application\/json,/;
    if (charsetUri.test(text) || uri.test(text)) {
      return decodeURIComponent(text.substr(RegExp.lastMatch.length));
    }
    if (baseCharsetUri.test(text) || baseUri.test(text)) {
      return fromBase64(text.substr(RegExp.lastMatch.length));
    }
    let encoding = text.match(/data:application\/json;([^,]+),/)[1];
    throw new Error("Unsupported source map encoding " + encoding);
  }
  getAnnotationURL(sourceMapString) {
    return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
  }
  isMap(map) {
    if (typeof map !== "object") return false;
    return typeof map.mappings === "string" || typeof map._mappings === "string" || Array.isArray(map.sections);
  }
  loadAnnotation(css) {
    let comments = css.match(/\/\*\s*# sourceMappingURL=/gm);
    if (!comments) return;
    let start = css.lastIndexOf(comments.pop());
    let end = css.indexOf("*/", start);
    if (start > -1 && end > -1) {
      this.annotation = this.getAnnotationURL(css.substring(start, end));
    }
  }
  loadFile(path) {
    this.root = dirname$1(path);
    if (existsSync(path)) {
      this.mapFile = path;
      return readFileSync(path, "utf-8").toString().trim();
    }
  }
  loadMap(file, prev) {
    if (prev === false) return false;
    if (prev) {
      if (typeof prev === "string") {
        return prev;
      } else if (typeof prev === "function") {
        let prevPath = prev(file);
        if (prevPath) {
          let map = this.loadFile(prevPath);
          if (!map) {
            throw new Error(
              "Unable to load previous source map: " + prevPath.toString()
            );
          }
          return map;
        }
      } else if (prev instanceof SourceMapConsumer$2) {
        return SourceMapGenerator$2.fromSourceMap(prev).toString();
      } else if (prev instanceof SourceMapGenerator$2) {
        return prev.toString();
      } else if (this.isMap(prev)) {
        return JSON.stringify(prev);
      } else {
        throw new Error(
          "Unsupported previous source map format: " + prev.toString()
        );
      }
    } else if (this.inline) {
      return this.decodeInline(this.annotation);
    } else if (this.annotation) {
      let map = this.annotation;
      if (file) map = join(dirname$1(file), map);
      return this.loadFile(map);
    }
  }
  startWith(string, start) {
    if (!string) return false;
    return string.substr(0, start.length) === start;
  }
  withContent() {
    return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
  }
};
var previousMap = PreviousMap$2;
PreviousMap$2.default = PreviousMap$2;
let { SourceMapConsumer: SourceMapConsumer$1, SourceMapGenerator: SourceMapGenerator$1 } = require$$2;
let { fileURLToPath, pathToFileURL: pathToFileURL$1 } = require$$2;
let { isAbsolute, resolve: resolve$1 } = require$$2;
let { nanoid } = nonSecure;
let terminalHighlight = require$$2;
let CssSyntaxError$1 = cssSyntaxError;
let PreviousMap$1 = previousMap;
let fromOffsetCache = Symbol("fromOffsetCache");
let sourceMapAvailable$1 = Boolean(SourceMapConsumer$1 && SourceMapGenerator$1);
let pathAvailable$1 = Boolean(resolve$1 && isAbsolute);
let Input$4 = class Input {
  constructor(css, opts = {}) {
    if (css === null || typeof css === "undefined" || typeof css === "object" && !css.toString) {
      throw new Error(`PostCSS received ${css} instead of CSS string`);
    }
    this.css = css.toString();
    if (this.css[0] === "\uFEFF" || this.css[0] === "\uFFFE") {
      this.hasBOM = true;
      this.css = this.css.slice(1);
    } else {
      this.hasBOM = false;
    }
    if (opts.from) {
      if (!pathAvailable$1 || /^\w+:\/\//.test(opts.from) || isAbsolute(opts.from)) {
        this.file = opts.from;
      } else {
        this.file = resolve$1(opts.from);
      }
    }
    if (pathAvailable$1 && sourceMapAvailable$1) {
      let map = new PreviousMap$1(this.css, opts);
      if (map.text) {
        this.map = map;
        let file = map.consumer().file;
        if (!this.file && file) this.file = this.mapResolve(file);
      }
    }
    if (!this.file) {
      this.id = "<input css " + nanoid(6) + ">";
    }
    if (this.map) this.map.file = this.from;
  }
  error(message, line, column, opts = {}) {
    let result2, endLine, endColumn;
    if (line && typeof line === "object") {
      let start = line;
      let end = column;
      if (typeof start.offset === "number") {
        let pos = this.fromOffset(start.offset);
        line = pos.line;
        column = pos.col;
      } else {
        line = start.line;
        column = start.column;
      }
      if (typeof end.offset === "number") {
        let pos = this.fromOffset(end.offset);
        endLine = pos.line;
        endColumn = pos.col;
      } else {
        endLine = end.line;
        endColumn = end.column;
      }
    } else if (!column) {
      let pos = this.fromOffset(line);
      line = pos.line;
      column = pos.col;
    }
    let origin = this.origin(line, column, endLine, endColumn);
    if (origin) {
      result2 = new CssSyntaxError$1(
        message,
        origin.endLine === void 0 ? origin.line : { column: origin.column, line: origin.line },
        origin.endLine === void 0 ? origin.column : { column: origin.endColumn, line: origin.endLine },
        origin.source,
        origin.file,
        opts.plugin
      );
    } else {
      result2 = new CssSyntaxError$1(
        message,
        endLine === void 0 ? line : { column, line },
        endLine === void 0 ? column : { column: endColumn, line: endLine },
        this.css,
        this.file,
        opts.plugin
      );
    }
    result2.input = { column, endColumn, endLine, line, source: this.css };
    if (this.file) {
      if (pathToFileURL$1) {
        result2.input.url = pathToFileURL$1(this.file).toString();
      }
      result2.input.file = this.file;
    }
    return result2;
  }
  fromOffset(offset) {
    let lastLine, lineToIndex;
    if (!this[fromOffsetCache]) {
      let lines = this.css.split("\n");
      lineToIndex = new Array(lines.length);
      let prevIndex = 0;
      for (let i = 0, l = lines.length; i < l; i++) {
        lineToIndex[i] = prevIndex;
        prevIndex += lines[i].length + 1;
      }
      this[fromOffsetCache] = lineToIndex;
    } else {
      lineToIndex = this[fromOffsetCache];
    }
    lastLine = lineToIndex[lineToIndex.length - 1];
    let min = 0;
    if (offset >= lastLine) {
      min = lineToIndex.length - 1;
    } else {
      let max = lineToIndex.length - 2;
      let mid;
      while (min < max) {
        mid = min + (max - min >> 1);
        if (offset < lineToIndex[mid]) {
          max = mid - 1;
        } else if (offset >= lineToIndex[mid + 1]) {
          min = mid + 1;
        } else {
          min = mid;
          break;
        }
      }
    }
    return {
      col: offset - lineToIndex[min] + 1,
      line: min + 1
    };
  }
  mapResolve(file) {
    if (/^\w+:\/\//.test(file)) {
      return file;
    }
    return resolve$1(this.map.consumer().sourceRoot || this.map.root || ".", file);
  }
  origin(line, column, endLine, endColumn) {
    if (!this.map) return false;
    let consumer = this.map.consumer();
    let from = consumer.originalPositionFor({ column, line });
    if (!from.source) return false;
    let to;
    if (typeof endLine === "number") {
      to = consumer.originalPositionFor({ column: endColumn, line: endLine });
    }
    let fromUrl;
    if (isAbsolute(from.source)) {
      fromUrl = pathToFileURL$1(from.source);
    } else {
      fromUrl = new URL(
        from.source,
        this.map.consumer().sourceRoot || pathToFileURL$1(this.map.mapFile)
      );
    }
    let result2 = {
      column: from.column,
      endColumn: to && to.column,
      endLine: to && to.line,
      line: from.line,
      url: fromUrl.toString()
    };
    if (fromUrl.protocol === "file:") {
      if (fileURLToPath) {
        result2.file = fileURLToPath(fromUrl);
      } else {
        throw new Error(`file: protocol is not available in this PostCSS build`);
      }
    }
    let source = consumer.sourceContentFor(from.source);
    if (source) result2.source = source;
    return result2;
  }
  toJSON() {
    let json = {};
    for (let name of ["hasBOM", "css", "file", "id"]) {
      if (this[name] != null) {
        json[name] = this[name];
      }
    }
    if (this.map) {
      json.map = __spreadValues({}, this.map);
      if (json.map.consumerCache) {
        json.map.consumerCache = void 0;
      }
    }
    return json;
  }
  get from() {
    return this.file || this.id;
  }
};
var input = Input$4;
Input$4.default = Input$4;
if (terminalHighlight && terminalHighlight.registerInput) {
  terminalHighlight.registerInput(Input$4);
}
let { SourceMapConsumer, SourceMapGenerator } = require$$2;
let { dirname, relative, resolve, sep } = require$$2;
let { pathToFileURL } = require$$2;
let Input$3 = input;
let sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
let pathAvailable = Boolean(dirname && resolve && relative && sep);
let MapGenerator$2 = class MapGenerator {
  constructor(stringify2, root2, opts, cssString) {
    this.stringify = stringify2;
    this.mapOpts = opts.map || {};
    this.root = root2;
    this.opts = opts;
    this.css = cssString;
    this.originalCSS = cssString;
    this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute;
    this.memoizedFileURLs = /* @__PURE__ */ new Map();
    this.memoizedPaths = /* @__PURE__ */ new Map();
    this.memoizedURLs = /* @__PURE__ */ new Map();
  }
  addAnnotation() {
    let content;
    if (this.isInline()) {
      content = "data:application/json;base64," + this.toBase64(this.map.toString());
    } else if (typeof this.mapOpts.annotation === "string") {
      content = this.mapOpts.annotation;
    } else if (typeof this.mapOpts.annotation === "function") {
      content = this.mapOpts.annotation(this.opts.to, this.root);
    } else {
      content = this.outputFile() + ".map";
    }
    let eol = "\n";
    if (this.css.includes("\r\n")) eol = "\r\n";
    this.css += eol + "/*# sourceMappingURL=" + content + " */";
  }
  applyPrevMaps() {
    for (let prev of this.previous()) {
      let from = this.toUrl(this.path(prev.file));
      let root2 = prev.root || dirname(prev.file);
      let map;
      if (this.mapOpts.sourcesContent === false) {
        map = new SourceMapConsumer(prev.text);
        if (map.sourcesContent) {
          map.sourcesContent = null;
        }
      } else {
        map = prev.consumer();
      }
      this.map.applySourceMap(map, from, this.toUrl(this.path(root2)));
    }
  }
  clearAnnotation() {
    if (this.mapOpts.annotation === false) return;
    if (this.root) {
      let node2;
      for (let i = this.root.nodes.length - 1; i >= 0; i--) {
        node2 = this.root.nodes[i];
        if (node2.type !== "comment") continue;
        if (node2.text.indexOf("# sourceMappingURL=") === 0) {
          this.root.removeChild(i);
        }
      }
    } else if (this.css) {
      this.css = this.css.replace(/\n*?\/\*#[\S\s]*?\*\/$/gm, "");
    }
  }
  generate() {
    this.clearAnnotation();
    if (pathAvailable && sourceMapAvailable && this.isMap()) {
      return this.generateMap();
    } else {
      let result2 = "";
      this.stringify(this.root, (i) => {
        result2 += i;
      });
      return [result2];
    }
  }
  generateMap() {
    if (this.root) {
      this.generateString();
    } else if (this.previous().length === 1) {
      let prev = this.previous()[0].consumer();
      prev.file = this.outputFile();
      this.map = SourceMapGenerator.fromSourceMap(prev, {
        ignoreInvalidMapping: true
      });
    } else {
      this.map = new SourceMapGenerator({
        file: this.outputFile(),
        ignoreInvalidMapping: true
      });
      this.map.addMapping({
        generated: { column: 0, line: 1 },
        original: { column: 0, line: 1 },
        source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
      });
    }
    if (this.isSourcesContent()) this.setSourcesContent();
    if (this.root && this.previous().length > 0) this.applyPrevMaps();
    if (this.isAnnotation()) this.addAnnotation();
    if (this.isInline()) {
      return [this.css];
    } else {
      return [this.css, this.map];
    }
  }
  generateString() {
    this.css = "";
    this.map = new SourceMapGenerator({
      file: this.outputFile(),
      ignoreInvalidMapping: true
    });
    let line = 1;
    let column = 1;
    let noSource = "<no source>";
    let mapping = {
      generated: { column: 0, line: 0 },
      original: { column: 0, line: 0 },
      source: ""
    };
    let lines, last;
    this.stringify(this.root, (str, node2, type) => {
      this.css += str;
      if (node2 && type !== "end") {
        mapping.generated.line = line;
        mapping.generated.column = column - 1;
        if (node2.source && node2.source.start) {
          mapping.source = this.sourcePath(node2);
          mapping.original.line = node2.source.start.line;
          mapping.original.column = node2.source.start.column - 1;
          this.map.addMapping(mapping);
        } else {
          mapping.source = noSource;
          mapping.original.line = 1;
          mapping.original.column = 0;
          this.map.addMapping(mapping);
        }
      }
      lines = str.match(/\n/g);
      if (lines) {
        line += lines.length;
        last = str.lastIndexOf("\n");
        column = str.length - last;
      } else {
        column += str.length;
      }
      if (node2 && type !== "start") {
        let p = node2.parent || { raws: {} };
        let childless = node2.type === "decl" || node2.type === "atrule" && !node2.nodes;
        if (!childless || node2 !== p.last || p.raws.semicolon) {
          if (node2.source && node2.source.end) {
            mapping.source = this.sourcePath(node2);
            mapping.original.line = node2.source.end.line;
            mapping.original.column = node2.source.end.column - 1;
            mapping.generated.line = line;
            mapping.generated.column = column - 2;
            this.map.addMapping(mapping);
          } else {
            mapping.source = noSource;
            mapping.original.line = 1;
            mapping.original.column = 0;
            mapping.generated.line = line;
            mapping.generated.column = column - 1;
            this.map.addMapping(mapping);
          }
        }
      }
    });
  }
  isAnnotation() {
    if (this.isInline()) {
      return true;
    }
    if (typeof this.mapOpts.annotation !== "undefined") {
      return this.mapOpts.annotation;
    }
    if (this.previous().length) {
      return this.previous().some((i) => i.annotation);
    }
    return true;
  }
  isInline() {
    if (typeof this.mapOpts.inline !== "undefined") {
      return this.mapOpts.inline;
    }
    let annotation = this.mapOpts.annotation;
    if (typeof annotation !== "undefined" && annotation !== true) {
      return false;
    }
    if (this.previous().length) {
      return this.previous().some((i) => i.inline);
    }
    return true;
  }
  isMap() {
    if (typeof this.opts.map !== "undefined") {
      return !!this.opts.map;
    }
    return this.previous().length > 0;
  }
  isSourcesContent() {
    if (typeof this.mapOpts.sourcesContent !== "undefined") {
      return this.mapOpts.sourcesContent;
    }
    if (this.previous().length) {
      return this.previous().some((i) => i.withContent());
    }
    return true;
  }
  outputFile() {
    if (this.opts.to) {
      return this.path(this.opts.to);
    } else if (this.opts.from) {
      return this.path(this.opts.from);
    } else {
      return "to.css";
    }
  }
  path(file) {
    if (this.mapOpts.absolute) return file;
    if (file.charCodeAt(0) === 60) return file;
    if (/^\w+:\/\//.test(file)) return file;
    let cached = this.memoizedPaths.get(file);
    if (cached) return cached;
    let from = this.opts.to ? dirname(this.opts.to) : ".";
    if (typeof this.mapOpts.annotation === "string") {
      from = dirname(resolve(from, this.mapOpts.annotation));
    }
    let path = relative(from, file);
    this.memoizedPaths.set(file, path);
    return path;
  }
  previous() {
    if (!this.previousMaps) {
      this.previousMaps = [];
      if (this.root) {
        this.root.walk((node2) => {
          if (node2.source && node2.source.input.map) {
            let map = node2.source.input.map;
            if (!this.previousMaps.includes(map)) {
              this.previousMaps.push(map);
            }
          }
        });
      } else {
        let input2 = new Input$3(this.originalCSS, this.opts);
        if (input2.map) this.previousMaps.push(input2.map);
      }
    }
    return this.previousMaps;
  }
  setSourcesContent() {
    let already = {};
    if (this.root) {
      this.root.walk((node2) => {
        if (node2.source) {
          let from = node2.source.input.from;
          if (from && !already[from]) {
            already[from] = true;
            let fromUrl = this.usesFileUrls ? this.toFileUrl(from) : this.toUrl(this.path(from));
            this.map.setSourceContent(fromUrl, node2.source.input.css);
          }
        }
      });
    } else if (this.css) {
      let from = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
      this.map.setSourceContent(from, this.css);
    }
  }
  sourcePath(node2) {
    if (this.mapOpts.from) {
      return this.toUrl(this.mapOpts.from);
    } else if (this.usesFileUrls) {
      return this.toFileUrl(node2.source.input.from);
    } else {
      return this.toUrl(this.path(node2.source.input.from));
    }
  }
  toBase64(str) {
    if (Buffer) {
      return Buffer.from(str).toString("base64");
    } else {
      return window.btoa(unescape(encodeURIComponent(str)));
    }
  }
  toFileUrl(path) {
    let cached = this.memoizedFileURLs.get(path);
    if (cached) return cached;
    if (pathToFileURL) {
      let fileURL = pathToFileURL(path).toString();
      this.memoizedFileURLs.set(path, fileURL);
      return fileURL;
    } else {
      throw new Error(
        "`map.absolute` option is not available in this PostCSS build"
      );
    }
  }
  toUrl(path) {
    let cached = this.memoizedURLs.get(path);
    if (cached) return cached;
    if (sep === "\\") {
      path = path.replace(/\\/g, "/");
    }
    let url = encodeURI(path).replace(/[#?]/g, encodeURIComponent);
    this.memoizedURLs.set(path, url);
    return url;
  }
};
var mapGenerator = MapGenerator$2;
let Node$2 = node;
let Comment$4 = class Comment extends Node$2 {
  constructor(defaults) {
    super(defaults);
    this.type = "comment";
  }
};
var comment = Comment$4;
Comment$4.default = Comment$4;
let { isClean: isClean$1, my: my$1 } = symbols;
let Declaration$3 = declaration;
let Comment$3 = comment;
let Node$1 = node;
let parse$4;
let Rule$4;
let AtRule$4;
let Root$6;
function cleanSource(nodes) {
  return nodes.map((i) => {
    if (i.nodes) i.nodes = cleanSource(i.nodes);
    delete i.source;
    return i;
  });
}
function markDirtyUp(node2) {
  node2[isClean$1] = false;
  if (node2.proxyOf.nodes) {
    for (let i of node2.proxyOf.nodes) {
      markDirtyUp(i);
    }
  }
}
let Container$7 = class Container extends Node$1 {
  append(...children) {
    for (let child of children) {
      let nodes = this.normalize(child, this.last);
      for (let node2 of nodes) this.proxyOf.nodes.push(node2);
    }
    this.markDirty();
    return this;
  }
  cleanRaws(keepBetween) {
    super.cleanRaws(keepBetween);
    if (this.nodes) {
      for (let node2 of this.nodes) node2.cleanRaws(keepBetween);
    }
  }
  each(callback) {
    if (!this.proxyOf.nodes) return void 0;
    let iterator = this.getIterator();
    let index2, result2;
    while (this.indexes[iterator] < this.proxyOf.nodes.length) {
      index2 = this.indexes[iterator];
      result2 = callback(this.proxyOf.nodes[index2], index2);
      if (result2 === false) break;
      this.indexes[iterator] += 1;
    }
    delete this.indexes[iterator];
    return result2;
  }
  every(condition) {
    return this.nodes.every(condition);
  }
  getIterator() {
    if (!this.lastEach) this.lastEach = 0;
    if (!this.indexes) this.indexes = {};
    this.lastEach += 1;
    let iterator = this.lastEach;
    this.indexes[iterator] = 0;
    return iterator;
  }
  getProxyProcessor() {
    return {
      get(node2, prop) {
        if (prop === "proxyOf") {
          return node2;
        } else if (!node2[prop]) {
          return node2[prop];
        } else if (prop === "each" || typeof prop === "string" && prop.startsWith("walk")) {
          return (...args) => {
            return node2[prop](
              ...args.map((i) => {
                if (typeof i === "function") {
                  return (child, index2) => i(child.toProxy(), index2);
                } else {
                  return i;
                }
              })
            );
          };
        } else if (prop === "every" || prop === "some") {
          return (cb) => {
            return node2[prop](
              (child, ...other) => cb(child.toProxy(), ...other)
            );
          };
        } else if (prop === "root") {
          return () => node2.root().toProxy();
        } else if (prop === "nodes") {
          return node2.nodes.map((i) => i.toProxy());
        } else if (prop === "first" || prop === "last") {
          return node2[prop].toProxy();
        } else {
          return node2[prop];
        }
      },
      set(node2, prop, value) {
        if (node2[prop] === value) return true;
        node2[prop] = value;
        if (prop === "name" || prop === "params" || prop === "selector") {
          node2.markDirty();
        }
        return true;
      }
    };
  }
  index(child) {
    if (typeof child === "number") return child;
    if (child.proxyOf) child = child.proxyOf;
    return this.proxyOf.nodes.indexOf(child);
  }
  insertAfter(exist, add) {
    let existIndex = this.index(exist);
    let nodes = this.normalize(add, this.proxyOf.nodes[existIndex]).reverse();
    existIndex = this.index(exist);
    for (let node2 of nodes) this.proxyOf.nodes.splice(existIndex + 1, 0, node2);
    let index2;
    for (let id in this.indexes) {
      index2 = this.indexes[id];
      if (existIndex < index2) {
        this.indexes[id] = index2 + nodes.length;
      }
    }
    this.markDirty();
    return this;
  }
  insertBefore(exist, add) {
    let existIndex = this.index(exist);
    let type = existIndex === 0 ? "prepend" : false;
    let nodes = this.normalize(add, this.proxyOf.nodes[existIndex], type).reverse();
    existIndex = this.index(exist);
    for (let node2 of nodes) this.proxyOf.nodes.splice(existIndex, 0, node2);
    let index2;
    for (let id in this.indexes) {
      index2 = this.indexes[id];
      if (existIndex <= index2) {
        this.indexes[id] = index2 + nodes.length;
      }
    }
    this.markDirty();
    return this;
  }
  normalize(nodes, sample) {
    if (typeof nodes === "string") {
      nodes = cleanSource(parse$4(nodes).nodes);
    } else if (typeof nodes === "undefined") {
      nodes = [];
    } else if (Array.isArray(nodes)) {
      nodes = nodes.slice(0);
      for (let i of nodes) {
        if (i.parent) i.parent.removeChild(i, "ignore");
      }
    } else if (nodes.type === "root" && this.type !== "document") {
      nodes = nodes.nodes.slice(0);
      for (let i of nodes) {
        if (i.parent) i.parent.removeChild(i, "ignore");
      }
    } else if (nodes.type) {
      nodes = [nodes];
    } else if (nodes.prop) {
      if (typeof nodes.value === "undefined") {
        throw new Error("Value field is missed in node creation");
      } else if (typeof nodes.value !== "string") {
        nodes.value = String(nodes.value);
      }
      nodes = [new Declaration$3(nodes)];
    } else if (nodes.selector) {
      nodes = [new Rule$4(nodes)];
    } else if (nodes.name) {
      nodes = [new AtRule$4(nodes)];
    } else if (nodes.text) {
      nodes = [new Comment$3(nodes)];
    } else {
      throw new Error("Unknown node type in node creation");
    }
    let processed = nodes.map((i) => {
      if (!i[my$1]) Container.rebuild(i);
      i = i.proxyOf;
      if (i.parent) i.parent.removeChild(i);
      if (i[isClean$1]) markDirtyUp(i);
      if (typeof i.raws.before === "undefined") {
        if (sample && typeof sample.raws.before !== "undefined") {
          i.raws.before = sample.raws.before.replace(/\S/g, "");
        }
      }
      i.parent = this.proxyOf;
      return i;
    });
    return processed;
  }
  prepend(...children) {
    children = children.reverse();
    for (let child of children) {
      let nodes = this.normalize(child, this.first, "prepend").reverse();
      for (let node2 of nodes) this.proxyOf.nodes.unshift(node2);
      for (let id in this.indexes) {
        this.indexes[id] = this.indexes[id] + nodes.length;
      }
    }
    this.markDirty();
    return this;
  }
  push(child) {
    child.parent = this;
    this.proxyOf.nodes.push(child);
    return this;
  }
  removeAll() {
    for (let node2 of this.proxyOf.nodes) node2.parent = void 0;
    this.proxyOf.nodes = [];
    this.markDirty();
    return this;
  }
  removeChild(child) {
    child = this.index(child);
    this.proxyOf.nodes[child].parent = void 0;
    this.proxyOf.nodes.splice(child, 1);
    let index2;
    for (let id in this.indexes) {
      index2 = this.indexes[id];
      if (index2 >= child) {
        this.indexes[id] = index2 - 1;
      }
    }
    this.markDirty();
    return this;
  }
  replaceValues(pattern, opts, callback) {
    if (!callback) {
      callback = opts;
      opts = {};
    }
    this.walkDecls((decl) => {
      if (opts.props && !opts.props.includes(decl.prop)) return;
      if (opts.fast && !decl.value.includes(opts.fast)) return;
      decl.value = decl.value.replace(pattern, callback);
    });
    this.markDirty();
    return this;
  }
  some(condition) {
    return this.nodes.some(condition);
  }
  walk(callback) {
    return this.each((child, i) => {
      let result2;
      try {
        result2 = callback(child, i);
      } catch (e) {
        throw child.addToError(e);
      }
      if (result2 !== false && child.walk) {
        result2 = child.walk(callback);
      }
      return result2;
    });
  }
  walkAtRules(name, callback) {
    if (!callback) {
      callback = name;
      return this.walk((child, i) => {
        if (child.type === "atrule") {
          return callback(child, i);
        }
      });
    }
    if (name instanceof RegExp) {
      return this.walk((child, i) => {
        if (child.type === "atrule" && name.test(child.name)) {
          return callback(child, i);
        }
      });
    }
    return this.walk((child, i) => {
      if (child.type === "atrule" && child.name === name) {
        return callback(child, i);
      }
    });
  }
  walkComments(callback) {
    return this.walk((child, i) => {
      if (child.type === "comment") {
        return callback(child, i);
      }
    });
  }
  walkDecls(prop, callback) {
    if (!callback) {
      callback = prop;
      return this.walk((child, i) => {
        if (child.type === "decl") {
          return callback(child, i);
        }
      });
    }
    if (prop instanceof RegExp) {
      return this.walk((child, i) => {
        if (child.type === "decl" && prop.test(child.prop)) {
          return callback(child, i);
        }
      });
    }
    return this.walk((child, i) => {
      if (child.type === "decl" && child.prop === prop) {
        return callback(child, i);
      }
    });
  }
  walkRules(selector, callback) {
    if (!callback) {
      callback = selector;
      return this.walk((child, i) => {
        if (child.type === "rule") {
          return callback(child, i);
        }
      });
    }
    if (selector instanceof RegExp) {
      return this.walk((child, i) => {
        if (child.type === "rule" && selector.test(child.selector)) {
          return callback(child, i);
        }
      });
    }
    return this.walk((child, i) => {
      if (child.type === "rule" && child.selector === selector) {
        return callback(child, i);
      }
    });
  }
  get first() {
    if (!this.proxyOf.nodes) return void 0;
    return this.proxyOf.nodes[0];
  }
  get last() {
    if (!this.proxyOf.nodes) return void 0;
    return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
  }
};
Container$7.registerParse = (dependant) => {
  parse$4 = dependant;
};
Container$7.registerRule = (dependant) => {
  Rule$4 = dependant;
};
Container$7.registerAtRule = (dependant) => {
  AtRule$4 = dependant;
};
Container$7.registerRoot = (dependant) => {
  Root$6 = dependant;
};
var container = Container$7;
Container$7.default = Container$7;
Container$7.rebuild = (node2) => {
  if (node2.type === "atrule") {
    Object.setPrototypeOf(node2, AtRule$4.prototype);
  } else if (node2.type === "rule") {
    Object.setPrototypeOf(node2, Rule$4.prototype);
  } else if (node2.type === "decl") {
    Object.setPrototypeOf(node2, Declaration$3.prototype);
  } else if (node2.type === "comment") {
    Object.setPrototypeOf(node2, Comment$3.prototype);
  } else if (node2.type === "root") {
    Object.setPrototypeOf(node2, Root$6.prototype);
  }
  node2[my$1] = true;
  if (node2.nodes) {
    node2.nodes.forEach((child) => {
      Container$7.rebuild(child);
    });
  }
};
let Container$6 = container;
let LazyResult$4;
let Processor$3;
let Document$3 = class Document extends Container$6 {
  constructor(defaults) {
    super(__spreadValues({ type: "document" }, defaults));
    if (!this.nodes) {
      this.nodes = [];
    }
  }
  toResult(opts = {}) {
    let lazy = new LazyResult$4(new Processor$3(), this, opts);
    return lazy.stringify();
  }
};
Document$3.registerLazyResult = (dependant) => {
  LazyResult$4 = dependant;
};
Document$3.registerProcessor = (dependant) => {
  Processor$3 = dependant;
};
var document$1 = Document$3;
Document$3.default = Document$3;
let printed = {};
var warnOnce$2 = function warnOnce(message) {
  if (printed[message]) return;
  printed[message] = true;
  if (typeof console !== "undefined" && console.warn) {
    console.warn(message);
  }
};
let Warning$2 = class Warning {
  constructor(text, opts = {}) {
    this.type = "warning";
    this.text = text;
    if (opts.node && opts.node.source) {
      let range = opts.node.rangeBy(opts);
      this.line = range.start.line;
      this.column = range.start.column;
      this.endLine = range.end.line;
      this.endColumn = range.end.column;
    }
    for (let opt in opts) this[opt] = opts[opt];
  }
  toString() {
    if (this.node) {
      return this.node.error(this.text, {
        index: this.index,
        plugin: this.plugin,
        word: this.word
      }).message;
    }
    if (this.plugin) {
      return this.plugin + ": " + this.text;
    }
    return this.text;
  }
};
var warning = Warning$2;
Warning$2.default = Warning$2;
let Warning$1 = warning;
let Result$3 = class Result {
  constructor(processor2, root2, opts) {
    this.processor = processor2;
    this.messages = [];
    this.root = root2;
    this.opts = opts;
    this.css = void 0;
    this.map = void 0;
  }
  toString() {
    return this.css;
  }
  warn(text, opts = {}) {
    if (!opts.plugin) {
      if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
        opts.plugin = this.lastPlugin.postcssPlugin;
      }
    }
    let warning2 = new Warning$1(text, opts);
    this.messages.push(warning2);
    return warning2;
  }
  warnings() {
    return this.messages.filter((i) => i.type === "warning");
  }
  get content() {
    return this.css;
  }
};
var result = Result$3;
Result$3.default = Result$3;
const SINGLE_QUOTE = "'".charCodeAt(0);
const DOUBLE_QUOTE = '"'.charCodeAt(0);
const BACKSLASH = "\\".charCodeAt(0);
const SLASH = "/".charCodeAt(0);
const NEWLINE = "\n".charCodeAt(0);
const SPACE = " ".charCodeAt(0);
const FEED = "\f".charCodeAt(0);
const TAB = "	".charCodeAt(0);
const CR = "\r".charCodeAt(0);
const OPEN_SQUARE = "[".charCodeAt(0);
const CLOSE_SQUARE = "]".charCodeAt(0);
const OPEN_PARENTHESES = "(".charCodeAt(0);
const CLOSE_PARENTHESES = ")".charCodeAt(0);
const OPEN_CURLY = "{".charCodeAt(0);
const CLOSE_CURLY = "}".charCodeAt(0);
const SEMICOLON = ";".charCodeAt(0);
const ASTERISK = "*".charCodeAt(0);
const COLON = ":".charCodeAt(0);
const AT = "@".charCodeAt(0);
const RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g;
const RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g;
const RE_BAD_BRACKET = /.[\r\n"'(/\\]/;
const RE_HEX_ESCAPE = /[\da-f]/i;
var tokenize = function tokenizer(input2, options = {}) {
  let css = input2.css.valueOf();
  let ignore = options.ignoreErrors;
  let code, next, quote, content, escape;
  let escaped, escapePos, prev, n, currentToken;
  let length = css.length;
  let pos = 0;
  let buffer = [];
  let returned = [];
  function position() {
    return pos;
  }
  function unclosed(what) {
    throw input2.error("Unclosed " + what, pos);
  }
  function endOfFile() {
    return returned.length === 0 && pos >= length;
  }
  function nextToken(opts) {
    if (returned.length) return returned.pop();
    if (pos >= length) return;
    let ignoreUnclosed = opts ? opts.ignoreUnclosed : false;
    code = css.charCodeAt(pos);
    switch (code) {
      case NEWLINE:
      case SPACE:
      case TAB:
      case CR:
      case FEED: {
        next = pos;
        do {
          next += 1;
          code = css.charCodeAt(next);
        } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);
        currentToken = ["space", css.slice(pos, next)];
        pos = next - 1;
        break;
      }
      case OPEN_SQUARE:
      case CLOSE_SQUARE:
      case OPEN_CURLY:
      case CLOSE_CURLY:
      case COLON:
      case SEMICOLON:
      case CLOSE_PARENTHESES: {
        let controlChar = String.fromCharCode(code);
        currentToken = [controlChar, controlChar, pos];
        break;
      }
      case OPEN_PARENTHESES: {
        prev = buffer.length ? buffer.pop()[1] : "";
        n = css.charCodeAt(pos + 1);
        if (prev === "url" && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
          next = pos;
          do {
            escaped = false;
            next = css.indexOf(")", next + 1);
            if (next === -1) {
              if (ignore || ignoreUnclosed) {
                next = pos;
                break;
              } else {
                unclosed("bracket");
              }
            }
            escapePos = next;
            while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
              escapePos -= 1;
              escaped = !escaped;
            }
          } while (escaped);
          currentToken = ["brackets", css.slice(pos, next + 1), pos, next];
          pos = next;
        } else {
          next = css.indexOf(")", pos + 1);
          content = css.slice(pos, next + 1);
          if (next === -1 || RE_BAD_BRACKET.test(content)) {
            currentToken = ["(", "(", pos];
          } else {
            currentToken = ["brackets", content, pos, next];
            pos = next;
          }
        }
        break;
      }
      case SINGLE_QUOTE:
      case DOUBLE_QUOTE: {
        quote = code === SINGLE_QUOTE ? "'" : '"';
        next = pos;
        do {
          escaped = false;
          next = css.indexOf(quote, next + 1);
          if (next === -1) {
            if (ignore || ignoreUnclosed) {
              next = pos + 1;
              break;
            } else {
              unclosed("string");
            }
          }
          escapePos = next;
          while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
            escapePos -= 1;
            escaped = !escaped;
          }
        } while (escaped);
        currentToken = ["string", css.slice(pos, next + 1), pos, next];
        pos = next;
        break;
      }
      case AT: {
        RE_AT_END.lastIndex = pos + 1;
        RE_AT_END.test(css);
        if (RE_AT_END.lastIndex === 0) {
          next = css.length - 1;
        } else {
          next = RE_AT_END.lastIndex - 2;
        }
        currentToken = ["at-word", css.slice(pos, next + 1), pos, next];
        pos = next;
        break;
      }
      case BACKSLASH: {
        next = pos;
        escape = true;
        while (css.charCodeAt(next + 1) === BACKSLASH) {
          next += 1;
          escape = !escape;
        }
        code = css.charCodeAt(next + 1);
        if (escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
          next += 1;
          if (RE_HEX_ESCAPE.test(css.charAt(next))) {
            while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
              next += 1;
            }
            if (css.charCodeAt(next + 1) === SPACE) {
              next += 1;
            }
          }
        }
        currentToken = ["word", css.slice(pos, next + 1), pos, next];
        pos = next;
        break;
      }
      default: {
        if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
          next = css.indexOf("*/", pos + 2) + 1;
          if (next === 0) {
            if (ignore || ignoreUnclosed) {
              next = css.length;
            } else {
              unclosed("comment");
            }
          }
          currentToken = ["comment", css.slice(pos, next + 1), pos, next];
          pos = next;
        } else {
          RE_WORD_END.lastIndex = pos + 1;
          RE_WORD_END.test(css);
          if (RE_WORD_END.lastIndex === 0) {
            next = css.length - 1;
          } else {
            next = RE_WORD_END.lastIndex - 2;
          }
          currentToken = ["word", css.slice(pos, next + 1), pos, next];
          buffer.push(currentToken);
          pos = next;
        }
        break;
      }
    }
    pos++;
    return currentToken;
  }
  function back(token) {
    returned.push(token);
  }
  return {
    back,
    endOfFile,
    nextToken,
    position
  };
};
let Container$5 = container;
let AtRule$3 = class AtRule extends Container$5 {
  constructor(defaults) {
    super(defaults);
    this.type = "atrule";
  }
  append(...children) {
    if (!this.proxyOf.nodes) this.nodes = [];
    return super.append(...children);
  }
  prepend(...children) {
    if (!this.proxyOf.nodes) this.nodes = [];
    return super.prepend(...children);
  }
};
var atRule = AtRule$3;
AtRule$3.default = AtRule$3;
Container$5.registerAtRule(AtRule$3);
let Container$4 = container;
let LazyResult$3;
let Processor$2;
let Root$5 = class Root extends Container$4 {
  constructor(defaults) {
    super(defaults);
    this.type = "root";
    if (!this.nodes) this.nodes = [];
  }
  normalize(child, sample, type) {
    let nodes = super.normalize(child);
    if (sample) {
      if (type === "prepend") {
        if (this.nodes.length > 1) {
          sample.raws.before = this.nodes[1].raws.before;
        } else {
          delete sample.raws.before;
        }
      } else if (this.first !== sample) {
        for (let node2 of nodes) {
          node2.raws.before = sample.raws.before;
        }
      }
    }
    return nodes;
  }
  removeChild(child, ignore) {
    let index2 = this.index(child);
    if (!ignore && index2 === 0 && this.nodes.length > 1) {
      this.nodes[1].raws.before = this.nodes[index2].raws.before;
    }
    return super.removeChild(child);
  }
  toResult(opts = {}) {
    let lazy = new LazyResult$3(new Processor$2(), this, opts);
    return lazy.stringify();
  }
};
Root$5.registerLazyResult = (dependant) => {
  LazyResult$3 = dependant;
};
Root$5.registerProcessor = (dependant) => {
  Processor$2 = dependant;
};
var root = Root$5;
Root$5.default = Root$5;
Container$4.registerRoot(Root$5);
let list$2 = {
  comma(string) {
    return list$2.split(string, [","], true);
  },
  space(string) {
    let spaces = [" ", "\n", "	"];
    return list$2.split(string, spaces);
  },
  split(string, separators, last) {
    let array = [];
    let current = "";
    let split = false;
    let func = 0;
    let inQuote = false;
    let prevQuote = "";
    let escape = false;
    for (let letter of string) {
      if (escape) {
        escape = false;
      } else if (letter === "\\") {
        escape = true;
      } else if (inQuote) {
        if (letter === prevQuote) {
          inQuote = false;
        }
      } else if (letter === '"' || letter === "'") {
        inQuote = true;
        prevQuote = letter;
      } else if (letter === "(") {
        func += 1;
      } else if (letter === ")") {
        if (func > 0) func -= 1;
      } else if (func === 0) {
        if (separators.includes(letter)) split = true;
      }
      if (split) {
        if (current !== "") array.push(current.trim());
        current = "";
        split = false;
      } else {
        current += letter;
      }
    }
    if (last || current !== "") array.push(current.trim());
    return array;
  }
};
var list_1 = list$2;
list$2.default = list$2;
let Container$3 = container;
let list$1 = list_1;
let Rule$3 = class Rule extends Container$3 {
  constructor(defaults) {
    super(defaults);
    this.type = "rule";
    if (!this.nodes) this.nodes = [];
  }
  get selectors() {
    return list$1.comma(this.selector);
  }
  set selectors(values) {
    let match = this.selector ? this.selector.match(/,\s*/) : null;
    let sep2 = match ? match[0] : "," + this.raw("between", "beforeOpen");
    this.selector = values.join(sep2);
  }
};
var rule = Rule$3;
Rule$3.default = Rule$3;
Container$3.registerRule(Rule$3);
let Declaration$2 = declaration;
let tokenizer2 = tokenize;
let Comment$2 = comment;
let AtRule$2 = atRule;
let Root$4 = root;
let Rule$2 = rule;
const SAFE_COMMENT_NEIGHBOR = {
  empty: true,
  space: true
};
function findLastWithPosition(tokens) {
  for (let i = tokens.length - 1; i >= 0; i--) {
    let token = tokens[i];
    let pos = token[3] || token[2];
    if (pos) return pos;
  }
}
let Parser$1 = class Parser {
  constructor(input2) {
    this.input = input2;
    this.root = new Root$4();
    this.current = this.root;
    this.spaces = "";
    this.semicolon = false;
    this.createTokenizer();
    this.root.source = { input: input2, start: { column: 1, line: 1, offset: 0 } };
  }
  atrule(token) {
    let node2 = new AtRule$2();
    node2.name = token[1].slice(1);
    if (node2.name === "") {
      this.unnamedAtrule(node2, token);
    }
    this.init(node2, token[2]);
    let type;
    let prev;
    let shift;
    let last = false;
    let open = false;
    let params = [];
    let brackets = [];
    while (!this.tokenizer.endOfFile()) {
      token = this.tokenizer.nextToken();
      type = token[0];
      if (type === "(" || type === "[") {
        brackets.push(type === "(" ? ")" : "]");
      } else if (type === "{" && brackets.length > 0) {
        brackets.push("}");
      } else if (type === brackets[brackets.length - 1]) {
        brackets.pop();
      }
      if (brackets.length === 0) {
        if (type === ";") {
          node2.source.end = this.getPosition(token[2]);
          node2.source.end.offset++;
          this.semicolon = true;
          break;
        } else if (type === "{") {
          open = true;
          break;
        } else if (type === "}") {
          if (params.length > 0) {
            shift = params.length - 1;
            prev = params[shift];
            while (prev && prev[0] === "space") {
              prev = params[--shift];
            }
            if (prev) {
              node2.source.end = this.getPosition(prev[3] || prev[2]);
              node2.source.end.offset++;
            }
          }
          this.end(token);
          break;
        } else {
          params.push(token);
        }
      } else {
        params.push(token);
      }
      if (this.tokenizer.endOfFile()) {
        last = true;
        break;
      }
    }
    node2.raws.between = this.spacesAndCommentsFromEnd(params);
    if (params.length) {
      node2.raws.afterName = this.spacesAndCommentsFromStart(params);
      this.raw(node2, "params", params);
      if (last) {
        token = params[params.length - 1];
        node2.source.end = this.getPosition(token[3] || token[2]);
        node2.source.end.offset++;
        this.spaces = node2.raws.between;
        node2.raws.between = "";
      }
    } else {
      node2.raws.afterName = "";
      node2.params = "";
    }
    if (open) {
      node2.nodes = [];
      this.current = node2;
    }
  }
  checkMissedSemicolon(tokens) {
    let colon = this.colon(tokens);
    if (colon === false) return;
    let founded = 0;
    let token;
    for (let j = colon - 1; j >= 0; j--) {
      token = tokens[j];
      if (token[0] !== "space") {
        founded += 1;
        if (founded === 2) break;
      }
    }
    throw this.input.error(
      "Missed semicolon",
      token[0] === "word" ? token[3] + 1 : token[2]
    );
  }
  colon(tokens) {
    let brackets = 0;
    let token, type, prev;
    for (let [i, element] of tokens.entries()) {
      token = element;
      type = token[0];
      if (type === "(") {
        brackets += 1;
      }
      if (type === ")") {
        brackets -= 1;
      }
      if (brackets === 0 && type === ":") {
        if (!prev) {
          this.doubleColon(token);
        } else if (prev[0] === "word" && prev[1] === "progid") {
          continue;
        } else {
          return i;
        }
      }
      prev = token;
    }
    return false;
  }
  comment(token) {
    let node2 = new Comment$2();
    this.init(node2, token[2]);
    node2.source.end = this.getPosition(token[3] || token[2]);
    node2.source.end.offset++;
    let text = token[1].slice(2, -2);
    if (/^\s*$/.test(text)) {
      node2.text = "";
      node2.raws.left = text;
      node2.raws.right = "";
    } else {
      let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
      node2.text = match[2];
      node2.raws.left = match[1];
      node2.raws.right = match[3];
    }
  }
  createTokenizer() {
    this.tokenizer = tokenizer2(this.input);
  }
  decl(tokens, customProperty) {
    let node2 = new Declaration$2();
    this.init(node2, tokens[0][2]);
    let last = tokens[tokens.length - 1];
    if (last[0] === ";") {
      this.semicolon = true;
      tokens.pop();
    }
    node2.source.end = this.getPosition(
      last[3] || last[2] || findLastWithPosition(tokens)
    );
    node2.source.end.offset++;
    while (tokens[0][0] !== "word") {
      if (tokens.length === 1) this.unknownWord(tokens);
      node2.raws.before += tokens.shift()[1];
    }
    node2.source.start = this.getPosition(tokens[0][2]);
    node2.prop = "";
    while (tokens.length) {
      let type = tokens[0][0];
      if (type === ":" || type === "space" || type === "comment") {
        break;
      }
      node2.prop += tokens.shift()[1];
    }
    node2.raws.between = "";
    let token;
    while (tokens.length) {
      token = tokens.shift();
      if (token[0] === ":") {
        node2.raws.between += token[1];
        break;
      } else {
        if (token[0] === "word" && /\w/.test(token[1])) {
          this.unknownWord([token]);
        }
        node2.raws.between += token[1];
      }
    }
    if (node2.prop[0] === "_" || node2.prop[0] === "*") {
      node2.raws.before += node2.prop[0];
      node2.prop = node2.prop.slice(1);
    }
    let firstSpaces = [];
    let next;
    while (tokens.length) {
      next = tokens[0][0];
      if (next !== "space" && next !== "comment") break;
      firstSpaces.push(tokens.shift());
    }
    this.precheckMissedSemicolon(tokens);
    for (let i = tokens.length - 1; i >= 0; i--) {
      token = tokens[i];
      if (token[1].toLowerCase() === "!important") {
        node2.important = true;
        let string = this.stringFrom(tokens, i);
        string = this.spacesFromEnd(tokens) + string;
        if (string !== " !important") node2.raws.important = string;
        break;
      } else if (token[1].toLowerCase() === "important") {
        let cache = tokens.slice(0);
        let str = "";
        for (let j = i; j > 0; j--) {
          let type = cache[j][0];
          if (str.trim().indexOf("!") === 0 && type !== "space") {
            break;
          }
          str = cache.pop()[1] + str;
        }
        if (str.trim().indexOf("!") === 0) {
          node2.important = true;
          node2.raws.important = str;
          tokens = cache;
        }
      }
      if (token[0] !== "space" && token[0] !== "comment") {
        break;
      }
    }
    let hasWord = tokens.some((i) => i[0] !== "space" && i[0] !== "comment");
    if (hasWord) {
      node2.raws.between += firstSpaces.map((i) => i[1]).join("");
      firstSpaces = [];
    }
    this.raw(node2, "value", firstSpaces.concat(tokens), customProperty);
    if (node2.value.includes(":") && !customProperty) {
      this.checkMissedSemicolon(tokens);
    }
  }
  doubleColon(token) {
    throw this.input.error(
      "Double colon",
      { offset: token[2] },
      { offset: token[2] + token[1].length }
    );
  }
  emptyRule(token) {
    let node2 = new Rule$2();
    this.init(node2, token[2]);
    node2.selector = "";
    node2.raws.between = "";
    this.current = node2;
  }
  end(token) {
    if (this.current.nodes && this.current.nodes.length) {
      this.current.raws.semicolon = this.semicolon;
    }
    this.semicolon = false;
    this.current.raws.after = (this.current.raws.after || "") + this.spaces;
    this.spaces = "";
    if (this.current.parent) {
      this.current.source.end = this.getPosition(token[2]);
      this.current.source.end.offset++;
      this.current = this.current.parent;
    } else {
      this.unexpectedClose(token);
    }
  }
  endFile() {
    if (this.current.parent) this.unclosedBlock();
    if (this.current.nodes && this.current.nodes.length) {
      this.current.raws.semicolon = this.semicolon;
    }
    this.current.raws.after = (this.current.raws.after || "") + this.spaces;
    this.root.source.end = this.getPosition(this.tokenizer.position());
  }
  freeSemicolon(token) {
    this.spaces += token[1];
    if (this.current.nodes) {
      let prev = this.current.nodes[this.current.nodes.length - 1];
      if (prev && prev.type === "rule" && !prev.raws.ownSemicolon) {
        prev.raws.ownSemicolon = this.spaces;
        this.spaces = "";
      }
    }
  }
  // Helpers
  getPosition(offset) {
    let pos = this.input.fromOffset(offset);
    return {
      column: pos.col,
      line: pos.line,
      offset
    };
  }
  init(node2, offset) {
    this.current.push(node2);
    node2.source = {
      input: this.input,
      start: this.getPosition(offset)
    };
    node2.raws.before = this.spaces;
    this.spaces = "";
    if (node2.type !== "comment") this.semicolon = false;
  }
  other(start) {
    let end = false;
    let type = null;
    let colon = false;
    let bracket = null;
    let brackets = [];
    let customProperty = start[1].startsWith("--");
    let tokens = [];
    let token = start;
    while (token) {
      type = token[0];
      tokens.push(token);
      if (type === "(" || type === "[") {
        if (!bracket) bracket = token;
        brackets.push(type === "(" ? ")" : "]");
      } else if (customProperty && colon && type === "{") {
        if (!bracket) bracket = token;
        brackets.push("}");
      } else if (brackets.length === 0) {
        if (type === ";") {
          if (colon) {
            this.decl(tokens, customProperty);
            return;
          } else {
            break;
          }
        } else if (type === "{") {
          this.rule(tokens);
          return;
        } else if (type === "}") {
          this.tokenizer.back(tokens.pop());
          end = true;
          break;
        } else if (type === ":") {
          colon = true;
        }
      } else if (type === brackets[brackets.length - 1]) {
        brackets.pop();
        if (brackets.length === 0) bracket = null;
      }
      token = this.tokenizer.nextToken();
    }
    if (this.tokenizer.endOfFile()) end = true;
    if (brackets.length > 0) this.unclosedBracket(bracket);
    if (end && colon) {
      if (!customProperty) {
        while (tokens.length) {
          token = tokens[tokens.length - 1][0];
          if (token !== "space" && token !== "comment") break;
          this.tokenizer.back(tokens.pop());
        }
      }
      this.decl(tokens, customProperty);
    } else {
      this.unknownWord(tokens);
    }
  }
  parse() {
    let token;
    while (!this.tokenizer.endOfFile()) {
      token = this.tokenizer.nextToken();
      switch (token[0]) {
        case "space":
          this.spaces += token[1];
          break;
        case ";":
          this.freeSemicolon(token);
          break;
        case "}":
          this.end(token);
          break;
        case "comment":
          this.comment(token);
          break;
        case "at-word":
          this.atrule(token);
          break;
        case "{":
          this.emptyRule(token);
          break;
        default:
          this.other(token);
          break;
      }
    }
    this.endFile();
  }
  precheckMissedSemicolon() {
  }
  raw(node2, prop, tokens, customProperty) {
    let token, type;
    let length = tokens.length;
    let value = "";
    let clean = true;
    let next, prev;
    for (let i = 0; i < length; i += 1) {
      token = tokens[i];
      type = token[0];
      if (type === "space" && i === length - 1 && !customProperty) {
        clean = false;
      } else if (type === "comment") {
        prev = tokens[i - 1] ? tokens[i - 1][0] : "empty";
        next = tokens[i + 1] ? tokens[i + 1][0] : "empty";
        if (!SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next]) {
          if (value.slice(-1) === ",") {
            clean = false;
          } else {
            value += token[1];
          }
        } else {
          clean = false;
        }
      } else {
        value += token[1];
      }
    }
    if (!clean) {
      let raw = tokens.reduce((all, i) => all + i[1], "");
      node2.raws[prop] = { raw, value };
    }
    node2[prop] = value;
  }
  rule(tokens) {
    tokens.pop();
    let node2 = new Rule$2();
    this.init(node2, tokens[0][2]);
    node2.raws.between = this.spacesAndCommentsFromEnd(tokens);
    this.raw(node2, "selector", tokens);
    this.current = node2;
  }
  spacesAndCommentsFromEnd(tokens) {
    let lastTokenType;
    let spaces = "";
    while (tokens.length) {
      lastTokenType = tokens[tokens.length - 1][0];
      if (lastTokenType !== "space" && lastTokenType !== "comment") break;
      spaces = tokens.pop()[1] + spaces;
    }
    return spaces;
  }
  // Errors
  spacesAndCommentsFromStart(tokens) {
    let next;
    let spaces = "";
    while (tokens.length) {
      next = tokens[0][0];
      if (next !== "space" && next !== "comment") break;
      spaces += tokens.shift()[1];
    }
    return spaces;
  }
  spacesFromEnd(tokens) {
    let lastTokenType;
    let spaces = "";
    while (tokens.length) {
      lastTokenType = tokens[tokens.length - 1][0];
      if (lastTokenType !== "space") break;
      spaces = tokens.pop()[1] + spaces;
    }
    return spaces;
  }
  stringFrom(tokens, from) {
    let result2 = "";
    for (let i = from; i < tokens.length; i++) {
      result2 += tokens[i][1];
    }
    tokens.splice(from, tokens.length - from);
    return result2;
  }
  unclosedBlock() {
    let pos = this.current.source.start;
    throw this.input.error("Unclosed block", pos.line, pos.column);
  }
  unclosedBracket(bracket) {
    throw this.input.error(
      "Unclosed bracket",
      { offset: bracket[2] },
      { offset: bracket[2] + 1 }
    );
  }
  unexpectedClose(token) {
    throw this.input.error(
      "Unexpected }",
      { offset: token[2] },
      { offset: token[2] + 1 }
    );
  }
  unknownWord(tokens) {
    throw this.input.error(
      "Unknown word",
      { offset: tokens[0][2] },
      { offset: tokens[0][2] + tokens[0][1].length }
    );
  }
  unnamedAtrule(node2, token) {
    throw this.input.error(
      "At-rule without name",
      { offset: token[2] },
      { offset: token[2] + token[1].length }
    );
  }
};
var parser = Parser$1;
let Container$2 = container;
let Parser2 = parser;
let Input$2 = input;
function parse$3(css, opts) {
  let input2 = new Input$2(css, opts);
  let parser2 = new Parser2(input2);
  try {
    parser2.parse();
  } catch (e) {
    if (true) {
      if (e.name === "CssSyntaxError" && opts && opts.from) {
        if (/\.scss$/i.test(opts.from)) {
          e.message += "\nYou tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser";
        } else if (/\.sass/i.test(opts.from)) {
          e.message += "\nYou tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser";
        } else if (/\.less$/i.test(opts.from)) {
          e.message += "\nYou tried to parse Less with the standard CSS parser; try again with the postcss-less parser";
        }
      }
    }
    throw e;
  }
  return parser2.root;
}
var parse_1 = parse$3;
parse$3.default = parse$3;
Container$2.registerParse(parse$3);
let { isClean, my } = symbols;
let MapGenerator$1 = mapGenerator;
let stringify$2 = stringify_1;
let Container$1 = container;
let Document$2 = document$1;
let warnOnce$1 = warnOnce$2;
let Result$2 = result;
let parse$2 = parse_1;
let Root$3 = root;
const TYPE_TO_CLASS_NAME = {
  atrule: "AtRule",
  comment: "Comment",
  decl: "Declaration",
  document: "Document",
  root: "Root",
  rule: "Rule"
};
const PLUGIN_PROPS = {
  AtRule: true,
  AtRuleExit: true,
  Comment: true,
  CommentExit: true,
  Declaration: true,
  DeclarationExit: true,
  Document: true,
  DocumentExit: true,
  Once: true,
  OnceExit: true,
  postcssPlugin: true,
  prepare: true,
  Root: true,
  RootExit: true,
  Rule: true,
  RuleExit: true
};
const NOT_VISITORS = {
  Once: true,
  postcssPlugin: true,
  prepare: true
};
const CHILDREN = 0;
function isPromise(obj) {
  return typeof obj === "object" && typeof obj.then === "function";
}
function getEvents(node2) {
  let key = false;
  let type = TYPE_TO_CLASS_NAME[node2.type];
  if (node2.type === "decl") {
    key = node2.prop.toLowerCase();
  } else if (node2.type === "atrule") {
    key = node2.name.toLowerCase();
  }
  if (key && node2.append) {
    return [
      type,
      type + "-" + key,
      CHILDREN,
      type + "Exit",
      type + "Exit-" + key
    ];
  } else if (key) {
    return [type, type + "-" + key, type + "Exit", type + "Exit-" + key];
  } else if (node2.append) {
    return [type, CHILDREN, type + "Exit"];
  } else {
    return [type, type + "Exit"];
  }
}
function toStack(node2) {
  let events;
  if (node2.type === "document") {
    events = ["Document", CHILDREN, "DocumentExit"];
  } else if (node2.type === "root") {
    events = ["Root", CHILDREN, "RootExit"];
  } else {
    events = getEvents(node2);
  }
  return {
    eventIndex: 0,
    events,
    iterator: 0,
    node: node2,
    visitorIndex: 0,
    visitors: []
  };
}
function cleanMarks(node2) {
  node2[isClean] = false;
  if (node2.nodes) node2.nodes.forEach((i) => cleanMarks(i));
  return node2;
}
let postcss$2 = {};
let LazyResult$2 = class LazyResult {
  constructor(processor2, css, opts) {
    this.stringified = false;
    this.processed = false;
    let root2;
    if (typeof css === "object" && css !== null && (css.type === "root" || css.type === "document")) {
      root2 = cleanMarks(css);
    } else if (css instanceof LazyResult || css instanceof Result$2) {
      root2 = cleanMarks(css.root);
      if (css.map) {
        if (typeof opts.map === "undefined") opts.map = {};
        if (!opts.map.inline) opts.map.inline = false;
        opts.map.prev = css.map;
      }
    } else {
      let parser2 = parse$2;
      if (opts.syntax) parser2 = opts.syntax.parse;
      if (opts.parser) parser2 = opts.parser;
      if (parser2.parse) parser2 = parser2.parse;
      try {
        root2 = parser2(css, opts);
      } catch (error) {
        this.processed = true;
        this.error = error;
      }
      if (root2 && !root2[my]) {
        Container$1.rebuild(root2);
      }
    }
    this.result = new Result$2(processor2, root2, opts);
    this.helpers = __spreadProps(__spreadValues({}, postcss$2), { postcss: postcss$2, result: this.result });
    this.plugins = this.processor.plugins.map((plugin2) => {
      if (typeof plugin2 === "object" && plugin2.prepare) {
        return __spreadValues(__spreadValues({}, plugin2), plugin2.prepare(this.result));
      } else {
        return plugin2;
      }
    });
  }
  async() {
    if (this.error) return Promise.reject(this.error);
    if (this.processed) return Promise.resolve(this.result);
    if (!this.processing) {
      this.processing = this.runAsync();
    }
    return this.processing;
  }
  catch(onRejected) {
    return this.async().catch(onRejected);
  }
  finally(onFinally) {
    return this.async().then(onFinally, onFinally);
  }
  getAsyncError() {
    throw new Error("Use process(css).then(cb) to work with async plugins");
  }
  handleError(error, node2) {
    let plugin2 = this.result.lastPlugin;
    try {
      if (node2) node2.addToError(error);
      this.error = error;
      if (error.name === "CssSyntaxError" && !error.plugin) {
        error.plugin = plugin2.postcssPlugin;
        error.setMessage();
      } else if (plugin2.postcssVersion) {
        if (true) {
          let pluginName = plugin2.postcssPlugin;
          let pluginVer = plugin2.postcssVersion;
          let runtimeVer = this.result.processor.version;
          let a = pluginVer.split(".");
          let b = runtimeVer.split(".");
          if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) {
            console.error(
              "Unknown error from PostCSS plugin. Your current PostCSS version is " + runtimeVer + ", but " + pluginName + " uses " + pluginVer + ". Perhaps this is the source of the error below."
            );
          }
        }
      }
    } catch (err) {
      if (console && console.error) console.error(err);
    }
    return error;
  }
  prepareVisitors() {
    this.listeners = {};
    let add = (plugin2, type, cb) => {
      if (!this.listeners[type]) this.listeners[type] = [];
      this.listeners[type].push([plugin2, cb]);
    };
    for (let plugin2 of this.plugins) {
      if (typeof plugin2 === "object") {
        for (let event in plugin2) {
          if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) {
            throw new Error(
              `Unknown event ${event} in ${plugin2.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
            );
          }
          if (!NOT_VISITORS[event]) {
            if (typeof plugin2[event] === "object") {
              for (let filter in plugin2[event]) {
                if (filter === "*") {
                  add(plugin2, event, plugin2[event][filter]);
                } else {
                  add(
                    plugin2,
                    event + "-" + filter.toLowerCase(),
                    plugin2[event][filter]
                  );
                }
              }
            } else if (typeof plugin2[event] === "function") {
              add(plugin2, event, plugin2[event]);
            }
          }
        }
      }
    }
    this.hasListener = Object.keys(this.listeners).length > 0;
  }
  async runAsync() {
    this.plugin = 0;
    for (let i = 0; i < this.plugins.length; i++) {
      let plugin2 = this.plugins[i];
      let promise = this.runOnRoot(plugin2);
      if (isPromise(promise)) {
        try {
          await promise;
        } catch (error) {
          throw this.handleError(error);
        }
      }
    }
    this.prepareVisitors();
    if (this.hasListener) {
      let root2 = this.result.root;
      while (!root2[isClean]) {
        root2[isClean] = true;
        let stack = [toStack(root2)];
        while (stack.length > 0) {
          let promise = this.visitTick(stack);
          if (isPromise(promise)) {
            try {
              await promise;
            } catch (e) {
              let node2 = stack[stack.length - 1].node;
              throw this.handleError(e, node2);
            }
          }
        }
      }
      if (this.listeners.OnceExit) {
        for (let [plugin2, visitor] of this.listeners.OnceExit) {
          this.result.lastPlugin = plugin2;
          try {
            if (root2.type === "document") {
              let roots = root2.nodes.map(
                (subRoot) => visitor(subRoot, this.helpers)
              );
              await Promise.all(roots);
            } else {
              await visitor(root2, this.helpers);
            }
          } catch (e) {
            throw this.handleError(e);
          }
        }
      }
    }
    this.processed = true;
    return this.stringify();
  }
  runOnRoot(plugin2) {
    this.result.lastPlugin = plugin2;
    try {
      if (typeof plugin2 === "object" && plugin2.Once) {
        if (this.result.root.type === "document") {
          let roots = this.result.root.nodes.map(
            (root2) => plugin2.Once(root2, this.helpers)
          );
          if (isPromise(roots[0])) {
            return Promise.all(roots);
          }
          return roots;
        }
        return plugin2.Once(this.result.root, this.helpers);
      } else if (typeof plugin2 === "function") {
        return plugin2(this.result.root, this.result);
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }
  stringify() {
    if (this.error) throw this.error;
    if (this.stringified) return this.result;
    this.stringified = true;
    this.sync();
    let opts = this.result.opts;
    let str = stringify$2;
    if (opts.syntax) str = opts.syntax.stringify;
    if (opts.stringifier) str = opts.stringifier;
    if (str.stringify) str = str.stringify;
    let map = new MapGenerator$1(str, this.result.root, this.result.opts);
    let data = map.generate();
    this.result.css = data[0];
    this.result.map = data[1];
    return this.result;
  }
  sync() {
    if (this.error) throw this.error;
    if (this.processed) return this.result;
    this.processed = true;
    if (this.processing) {
      throw this.getAsyncError();
    }
    for (let plugin2 of this.plugins) {
      let promise = this.runOnRoot(plugin2);
      if (isPromise(promise)) {
        throw this.getAsyncError();
      }
    }
    this.prepareVisitors();
    if (this.hasListener) {
      let root2 = this.result.root;
      while (!root2[isClean]) {
        root2[isClean] = true;
        this.walkSync(root2);
      }
      if (this.listeners.OnceExit) {
        if (root2.type === "document") {
          for (let subRoot of root2.nodes) {
            this.visitSync(this.listeners.OnceExit, subRoot);
          }
        } else {
          this.visitSync(this.listeners.OnceExit, root2);
        }
      }
    }
    return this.result;
  }
  then(onFulfilled, onRejected) {
    if (true) {
      if (!("from" in this.opts)) {
        warnOnce$1(
          "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
        );
      }
    }
    return this.async().then(onFulfilled, onRejected);
  }
  toString() {
    return this.css;
  }
  visitSync(visitors, node2) {
    for (let [plugin2, visitor] of visitors) {
      this.result.lastPlugin = plugin2;
      let promise;
      try {
        promise = visitor(node2, this.helpers);
      } catch (e) {
        throw this.handleError(e, node2.proxyOf);
      }
      if (node2.type !== "root" && node2.type !== "document" && !node2.parent) {
        return true;
      }
      if (isPromise(promise)) {
        throw this.getAsyncError();
      }
    }
  }
  visitTick(stack) {
    let visit2 = stack[stack.length - 1];
    let { node: node2, visitors } = visit2;
    if (node2.type !== "root" && node2.type !== "document" && !node2.parent) {
      stack.pop();
      return;
    }
    if (visitors.length > 0 && visit2.visitorIndex < visitors.length) {
      let [plugin2, visitor] = visitors[visit2.visitorIndex];
      visit2.visitorIndex += 1;
      if (visit2.visitorIndex === visitors.length) {
        visit2.visitors = [];
        visit2.visitorIndex = 0;
      }
      this.result.lastPlugin = plugin2;
      try {
        return visitor(node2.toProxy(), this.helpers);
      } catch (e) {
        throw this.handleError(e, node2);
      }
    }
    if (visit2.iterator !== 0) {
      let iterator = visit2.iterator;
      let child;
      while (child = node2.nodes[node2.indexes[iterator]]) {
        node2.indexes[iterator] += 1;
        if (!child[isClean]) {
          child[isClean] = true;
          stack.push(toStack(child));
          return;
        }
      }
      visit2.iterator = 0;
      delete node2.indexes[iterator];
    }
    let events = visit2.events;
    while (visit2.eventIndex < events.length) {
      let event = events[visit2.eventIndex];
      visit2.eventIndex += 1;
      if (event === CHILDREN) {
        if (node2.nodes && node2.nodes.length) {
          node2[isClean] = true;
          visit2.iterator = node2.getIterator();
        }
        return;
      } else if (this.listeners[event]) {
        visit2.visitors = this.listeners[event];
        return;
      }
    }
    stack.pop();
  }
  walkSync(node2) {
    node2[isClean] = true;
    let events = getEvents(node2);
    for (let event of events) {
      if (event === CHILDREN) {
        if (node2.nodes) {
          node2.each((child) => {
            if (!child[isClean]) this.walkSync(child);
          });
        }
      } else {
        let visitors = this.listeners[event];
        if (visitors) {
          if (this.visitSync(visitors, node2.toProxy())) return;
        }
      }
    }
  }
  warnings() {
    return this.sync().warnings();
  }
  get content() {
    return this.stringify().content;
  }
  get css() {
    return this.stringify().css;
  }
  get map() {
    return this.stringify().map;
  }
  get messages() {
    return this.sync().messages;
  }
  get opts() {
    return this.result.opts;
  }
  get processor() {
    return this.result.processor;
  }
  get root() {
    return this.sync().root;
  }
  get [Symbol.toStringTag]() {
    return "LazyResult";
  }
};
LazyResult$2.registerPostcss = (dependant) => {
  postcss$2 = dependant;
};
var lazyResult = LazyResult$2;
LazyResult$2.default = LazyResult$2;
Root$3.registerLazyResult(LazyResult$2);
Document$2.registerLazyResult(LazyResult$2);
let MapGenerator2 = mapGenerator;
let stringify$1 = stringify_1;
let warnOnce2 = warnOnce$2;
let parse$1 = parse_1;
const Result$1 = result;
let NoWorkResult$1 = class NoWorkResult {
  constructor(processor2, css, opts) {
    css = css.toString();
    this.stringified = false;
    this._processor = processor2;
    this._css = css;
    this._opts = opts;
    this._map = void 0;
    let root2;
    let str = stringify$1;
    this.result = new Result$1(this._processor, root2, this._opts);
    this.result.css = css;
    let self = this;
    Object.defineProperty(this.result, "root", {
      get() {
        return self.root;
      }
    });
    let map = new MapGenerator2(str, root2, this._opts, css);
    if (map.isMap()) {
      let [generatedCSS, generatedMap] = map.generate();
      if (generatedCSS) {
        this.result.css = generatedCSS;
      }
      if (generatedMap) {
        this.result.map = generatedMap;
      }
    } else {
      map.clearAnnotation();
      this.result.css = map.css;
    }
  }
  async() {
    if (this.error) return Promise.reject(this.error);
    return Promise.resolve(this.result);
  }
  catch(onRejected) {
    return this.async().catch(onRejected);
  }
  finally(onFinally) {
    return this.async().then(onFinally, onFinally);
  }
  sync() {
    if (this.error) throw this.error;
    return this.result;
  }
  then(onFulfilled, onRejected) {
    if (true) {
      if (!("from" in this._opts)) {
        warnOnce2(
          "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
        );
      }
    }
    return this.async().then(onFulfilled, onRejected);
  }
  toString() {
    return this._css;
  }
  warnings() {
    return [];
  }
  get content() {
    return this.result.css;
  }
  get css() {
    return this.result.css;
  }
  get map() {
    return this.result.map;
  }
  get messages() {
    return [];
  }
  get opts() {
    return this.result.opts;
  }
  get processor() {
    return this.result.processor;
  }
  get root() {
    if (this._root) {
      return this._root;
    }
    let root2;
    let parser2 = parse$1;
    try {
      root2 = parser2(this._css, this._opts);
    } catch (error) {
      this.error = error;
    }
    if (this.error) {
      throw this.error;
    } else {
      this._root = root2;
      return root2;
    }
  }
  get [Symbol.toStringTag]() {
    return "NoWorkResult";
  }
};
var noWorkResult = NoWorkResult$1;
NoWorkResult$1.default = NoWorkResult$1;
let NoWorkResult2 = noWorkResult;
let LazyResult$1 = lazyResult;
let Document$1 = document$1;
let Root$2 = root;
let Processor$1 = class Processor {
  constructor(plugins = []) {
    this.version = "8.4.38";
    this.plugins = this.normalize(plugins);
  }
  normalize(plugins) {
    let normalized = [];
    for (let i of plugins) {
      if (i.postcss === true) {
        i = i();
      } else if (i.postcss) {
        i = i.postcss;
      }
      if (typeof i === "object" && Array.isArray(i.plugins)) {
        normalized = normalized.concat(i.plugins);
      } else if (typeof i === "object" && i.postcssPlugin) {
        normalized.push(i);
      } else if (typeof i === "function") {
        normalized.push(i);
      } else if (typeof i === "object" && (i.parse || i.stringify)) {
        if (true) {
          throw new Error(
            "PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation."
          );
        }
      } else {
        throw new Error(i + " is not a PostCSS plugin");
      }
    }
    return normalized;
  }
  process(css, opts = {}) {
    if (!this.plugins.length && !opts.parser && !opts.stringifier && !opts.syntax) {
      return new NoWorkResult2(this, css, opts);
    } else {
      return new LazyResult$1(this, css, opts);
    }
  }
  use(plugin2) {
    this.plugins = this.plugins.concat(this.normalize([plugin2]));
    return this;
  }
};
var processor = Processor$1;
Processor$1.default = Processor$1;
Root$2.registerProcessor(Processor$1);
Document$1.registerProcessor(Processor$1);
let Declaration$1 = declaration;
let PreviousMap2 = previousMap;
let Comment$1 = comment;
let AtRule$1 = atRule;
let Input$1 = input;
let Root$1 = root;
let Rule$1 = rule;
function fromJSON$1(json, inputs) {
  if (Array.isArray(json)) return json.map((n) => fromJSON$1(n));
  let _a = json, { inputs: ownInputs } = _a, defaults = __objRest(_a, ["inputs"]);
  if (ownInputs) {
    inputs = [];
    for (let input2 of ownInputs) {
      let inputHydrated = __spreadProps(__spreadValues({}, input2), { __proto__: Input$1.prototype });
      if (inputHydrated.map) {
        inputHydrated.map = __spreadProps(__spreadValues({}, inputHydrated.map), {
          __proto__: PreviousMap2.prototype
        });
      }
      inputs.push(inputHydrated);
    }
  }
  if (defaults.nodes) {
    defaults.nodes = json.nodes.map((n) => fromJSON$1(n, inputs));
  }
  if (defaults.source) {
    let _b = defaults.source, { inputId } = _b, source = __objRest(_b, ["inputId"]);
    defaults.source = source;
    if (inputId != null) {
      defaults.source.input = inputs[inputId];
    }
  }
  if (defaults.type === "root") {
    return new Root$1(defaults);
  } else if (defaults.type === "decl") {
    return new Declaration$1(defaults);
  } else if (defaults.type === "rule") {
    return new Rule$1(defaults);
  } else if (defaults.type === "comment") {
    return new Comment$1(defaults);
  } else if (defaults.type === "atrule") {
    return new AtRule$1(defaults);
  } else {
    throw new Error("Unknown node type: " + json.type);
  }
}
var fromJSON_1 = fromJSON$1;
fromJSON$1.default = fromJSON$1;
let CssSyntaxError2 = cssSyntaxError;
let Declaration2 = declaration;
let LazyResult2 = lazyResult;
let Container2 = container;
let Processor2 = processor;
let stringify = stringify_1;
let fromJSON = fromJSON_1;
let Document2 = document$1;
let Warning2 = warning;
let Comment2 = comment;
let AtRule2 = atRule;
let Result2 = result;
let Input2 = input;
let parse = parse_1;
let list = list_1;
let Rule2 = rule;
let Root2 = root;
let Node2 = node;
function postcss(...plugins) {
  if (plugins.length === 1 && Array.isArray(plugins[0])) {
    plugins = plugins[0];
  }
  return new Processor2(plugins);
}
postcss.plugin = function plugin(name, initializer) {
  let warningPrinted = false;
  function creator(...args) {
    if (console && console.warn && !warningPrinted) {
      warningPrinted = true;
      console.warn(
        name + ": postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration"
      );
      if (process.env.LANG && process.env.LANG.startsWith("cn")) {
        console.warn(
          name + ": \u91CC\u9762 postcss.plugin \u88AB\u5F03\u7528. \u8FC1\u79FB\u6307\u5357:\nhttps://www.w3ctech.com/topic/2226"
        );
      }
    }
    let transformer = initializer(...args);
    transformer.postcssPlugin = name;
    transformer.postcssVersion = new Processor2().version;
    return transformer;
  }
  let cache;
  Object.defineProperty(creator, "postcss", {
    get() {
      if (!cache) cache = creator();
      return cache;
    }
  });
  creator.process = function(css, processOpts, pluginOpts) {
    return postcss([creator(pluginOpts)]).process(css, processOpts);
  };
  return creator;
};
postcss.stringify = stringify;
postcss.parse = parse;
postcss.fromJSON = fromJSON;
postcss.list = list;
postcss.comment = (defaults) => new Comment2(defaults);
postcss.atRule = (defaults) => new AtRule2(defaults);
postcss.decl = (defaults) => new Declaration2(defaults);
postcss.rule = (defaults) => new Rule2(defaults);
postcss.root = (defaults) => new Root2(defaults);
postcss.document = (defaults) => new Document2(defaults);
postcss.CssSyntaxError = CssSyntaxError2;
postcss.Declaration = Declaration2;
postcss.Container = Container2;
postcss.Processor = Processor2;
postcss.Document = Document2;
postcss.Comment = Comment2;
postcss.Warning = Warning2;
postcss.AtRule = AtRule2;
postcss.Result = Result2;
postcss.Input = Input2;
postcss.Rule = Rule2;
postcss.Root = Root2;
postcss.Node = Node2;
LazyResult2.registerPostcss(postcss);
var postcss_1 = postcss;
postcss.default = postcss;
const postcss$1 = /* @__PURE__ */ getDefaultExportFromCjs(postcss_1);
postcss$1.stringify;
postcss$1.fromJSON;
postcss$1.plugin;
postcss$1.parse;
postcss$1.list;
postcss$1.document;
postcss$1.comment;
postcss$1.atRule;
postcss$1.rule;
postcss$1.decl;
postcss$1.root;
postcss$1.CssSyntaxError;
postcss$1.Declaration;
postcss$1.Container;
postcss$1.Processor;
postcss$1.Document;
postcss$1.Comment;
postcss$1.Warning;
postcss$1.AtRule;
postcss$1.Result;
postcss$1.Input;
postcss$1.Rule;
postcss$1.Root;
postcss$1.Node;
const tagMap = {
  script: "noscript",
  // camel case svg element tag names
  altglyph: "altGlyph",
  altglyphdef: "altGlyphDef",
  altglyphitem: "altGlyphItem",
  animatecolor: "animateColor",
  animatemotion: "animateMotion",
  animatetransform: "animateTransform",
  clippath: "clipPath",
  feblend: "feBlend",
  fecolormatrix: "feColorMatrix",
  fecomponenttransfer: "feComponentTransfer",
  fecomposite: "feComposite",
  feconvolvematrix: "feConvolveMatrix",
  fediffuselighting: "feDiffuseLighting",
  fedisplacementmap: "feDisplacementMap",
  fedistantlight: "feDistantLight",
  fedropshadow: "feDropShadow",
  feflood: "feFlood",
  fefunca: "feFuncA",
  fefuncb: "feFuncB",
  fefuncg: "feFuncG",
  fefuncr: "feFuncR",
  fegaussianblur: "feGaussianBlur",
  feimage: "feImage",
  femerge: "feMerge",
  femergenode: "feMergeNode",
  femorphology: "feMorphology",
  feoffset: "feOffset",
  fepointlight: "fePointLight",
  fespecularlighting: "feSpecularLighting",
  fespotlight: "feSpotLight",
  fetile: "feTile",
  feturbulence: "feTurbulence",
  foreignobject: "foreignObject",
  glyphref: "glyphRef",
  lineargradient: "linearGradient",
  radialgradient: "radialGradient"
};
function getTagName(n) {
  let tagName = tagMap[n.tagName] ? tagMap[n.tagName] : n.tagName;
  if (tagName === "link" && n.attributes._cssText) {
    tagName = "style";
  }
  return tagName;
}
function adaptCssForReplay(cssText, cache) {
  const cachedStyle = cache == null ? void 0 : cache.stylesWithHoverClass.get(cssText);
  if (cachedStyle) return cachedStyle;
  let result2 = cssText;
  try {
    const ast = postcss$1([
      mediaSelectorPlugin,
      pseudoClassPlugin
    ]).process(cssText);
    result2 = ast.css;
  } catch (error) {
    console.warn("Failed to adapt css for replay", error);
  }
  cache == null ? void 0 : cache.stylesWithHoverClass.set(cssText, result2);
  return result2;
}
function createCache() {
  const stylesWithHoverClass = /* @__PURE__ */ new Map();
  return {
    stylesWithHoverClass
  };
}
function applyCssSplits(n, cssText, hackCss, cache) {
  const childTextNodes = [];
  for (const scn of n.childNodes) {
    if (scn.type === NodeType.Text) {
      childTextNodes.push(scn);
    }
  }
  const cssTextSplits = cssText.split("/* rr_split */");
  while (cssTextSplits.length > 1 && cssTextSplits.length > childTextNodes.length) {
    cssTextSplits.splice(-2, 2, cssTextSplits.slice(-2).join(""));
  }
  let adaptedCss = "";
  if (hackCss) {
    adaptedCss = adaptCssForReplay(cssTextSplits.join(""), cache);
  }
  let startIndex = 0;
  for (let i = 0; i < childTextNodes.length; i++) {
    if (i === cssTextSplits.length) {
      break;
    }
    const childTextNode = childTextNodes[i];
    if (!hackCss) {
      childTextNode.textContent = cssTextSplits[i];
    } else if (i < cssTextSplits.length - 1) {
      let endIndex = startIndex;
      let endSearch = cssTextSplits[i + 1].length;
      endSearch = Math.min(endSearch, 30);
      let found = false;
      for (; endSearch > 2; endSearch--) {
        const searchBit = cssTextSplits[i + 1].substring(0, endSearch);
        const searchIndex = adaptedCss.substring(startIndex).indexOf(searchBit);
        found = searchIndex !== -1;
        if (found) {
          endIndex += searchIndex;
          break;
        }
      }
      if (!found) {
        endIndex += cssTextSplits[i].length;
      }
      childTextNode.textContent = adaptedCss.substring(startIndex, endIndex);
      startIndex = endIndex;
    } else {
      childTextNode.textContent = adaptedCss.substring(startIndex);
    }
  }
}
function buildStyleNode(n, styleEl, cssText, options) {
  const { doc, hackCss, cache } = options;
  if (n.childNodes.length) {
    applyCssSplits(n, cssText, hackCss, cache);
  } else {
    if (hackCss) {
      cssText = adaptCssForReplay(cssText, cache);
    }
    styleEl.appendChild(doc.createTextNode(cssText));
  }
}
function buildNode(n, options) {
  var _a, _b;
  const { doc, hackCss, cache } = options;
  switch (n.type) {
    case NodeType.Document:
      return doc.implementation.createDocument(null, "", null);
    case NodeType.DocumentType:
      return doc.implementation.createDocumentType(
        n.name || "html",
        n.publicId,
        n.systemId
      );
    case NodeType.Element: {
      const tagName = getTagName(n);
      let node2;
      if (n.isSVG) {
        node2 = doc.createElementNS("http://www.w3.org/2000/svg", tagName);
      } else {
        if (
          // If the tag name is a custom element name
          n.isCustom && // If the browser supports custom elements
          ((_a = doc.defaultView) == null ? void 0 : _a.customElements) && // If the custom element hasn't been defined yet
          !doc.defaultView.customElements.get(n.tagName)
        )
          doc.defaultView.customElements.define(
            n.tagName,
            class extends doc.defaultView.HTMLElement {
            }
          );
        node2 = doc.createElement(tagName);
      }
      const specialAttributes = {};
      for (const name in n.attributes) {
        if (!Object.prototype.hasOwnProperty.call(n.attributes, name)) {
          continue;
        }
        let value = n.attributes[name];
        if (tagName === "option" && name === "selected" && value === false) {
          continue;
        }
        if (value === null) {
          continue;
        }
        if (value === true) value = "";
        if (name.startsWith("rr_")) {
          specialAttributes[name] = value;
          continue;
        }
        if (typeof value !== "string") ;
        else if (tagName === "style" && name === "_cssText") {
          buildStyleNode(n, node2, value, options);
          continue;
        } else if (tagName === "textarea" && name === "value") {
          node2.appendChild(doc.createTextNode(value));
          n.childNodes = [];
          continue;
        }
        try {
          if (n.isSVG && name === "xlink:href") {
            node2.setAttributeNS(
              "http://www.w3.org/1999/xlink",
              name,
              value.toString()
            );
          } else if (name === "onload" || name === "onclick" || name.substring(0, 7) === "onmouse") {
            node2.setAttribute("_" + name, value.toString());
          } else if (tagName === "meta" && n.attributes["http-equiv"] === "Content-Security-Policy" && name === "content") {
            node2.setAttribute("csp-content", value.toString());
            continue;
          } else if (tagName === "link" && (n.attributes.rel === "preload" && n.attributes.as === "script" || n.attributes.rel === "modulepreload")) {
          } else if (tagName === "link" && n.attributes.rel === "prefetch" && typeof n.attributes.href === "string" && extractFileExtension(n.attributes.href) === "js") {
          } else if (tagName === "img" && n.attributes.srcset && n.attributes.rr_dataURL) {
            node2.setAttribute(
              "rrweb-original-srcset",
              n.attributes.srcset
            );
          } else {
            node2.setAttribute(name, value.toString());
          }
        } catch (error) {
        }
      }
      for (const name in specialAttributes) {
        const value = specialAttributes[name];
        if (tagName === "canvas" && name === "rr_dataURL") {
          const image = doc.createElement("img");
          image.onload = () => {
            const ctx = node2.getContext("2d");
            if (ctx) {
              ctx.drawImage(image, 0, 0, image.width, image.height);
            }
          };
          image.src = value.toString();
          if (node2.RRNodeType)
            node2.rr_dataURL = value.toString();
        } else if (tagName === "img" && name === "rr_dataURL") {
          const image = node2;
          if (!image.currentSrc.startsWith("data:")) {
            image.setAttribute(
              "rrweb-original-src",
              n.attributes.src
            );
            image.src = value.toString();
          }
        }
        if (name === "rr_width") {
          node2.style.setProperty("width", value.toString());
        } else if (name === "rr_height") {
          node2.style.setProperty("height", value.toString());
        } else if (name === "rr_mediaCurrentTime" && typeof value === "number") {
          node2.currentTime = value;
        } else if (name === "rr_mediaState") {
          switch (value) {
            case "played":
              node2.play().catch((e) => console.warn("media playback error", e));
              break;
            case "paused":
              node2.pause();
              break;
          }
        } else if (name === "rr_mediaPlaybackRate" && typeof value === "number") {
          node2.playbackRate = value;
        } else if (name === "rr_mediaMuted" && typeof value === "boolean") {
          node2.muted = value;
        } else if (name === "rr_mediaLoop" && typeof value === "boolean") {
          node2.loop = value;
        } else if (name === "rr_mediaVolume" && typeof value === "number") {
          node2.volume = value;
        } else if (name === "rr_open_mode") {
          node2.setAttribute(
            "rr_open_mode",
            value
          );
        }
      }
      if (n.isShadowHost) {
        if (!node2.shadowRoot) {
          node2.attachShadow({ mode: "open" });
          (_b = n.chromaticAdoptedStylesheets) == null ? void 0 : _b.forEach(
            (chromaticAdoptedStylesheet) => {
              var _a2;
              const styleSheet = new CSSStyleSheet();
              styleSheet.replaceSync(chromaticAdoptedStylesheet);
              (_a2 = node2.shadowRoot) == null ? void 0 : _a2.adoptedStyleSheets.push(styleSheet);
            }
          );
        } else {
          while (node2.shadowRoot.firstChild) {
            node2.shadowRoot.removeChild(node2.shadowRoot.firstChild);
          }
        }
      }
      return node2;
    }
    case NodeType.Text:
      if (n.isStyle && hackCss) {
        return doc.createTextNode(adaptCssForReplay(n.textContent, cache));
      }
      return doc.createTextNode(n.textContent);
    case NodeType.CDATA:
      return doc.createCDATASection(n.textContent);
    case NodeType.Comment:
      return doc.createComment(n.textContent);
    default:
      return null;
  }
}
function buildNodeWithSN(n, options) {
  const {
    doc,
    mirror,
    skipChild = false,
    hackCss = true,
    afterAppend,
    cache
  } = options;
  if (mirror.has(n.id)) {
    const nodeInMirror = mirror.getNode(n.id);
    const meta = mirror.getMeta(nodeInMirror);
    if (isNodeMetaEqual(meta, n)) return mirror.getNode(n.id);
  }
  let node2 = buildNode(n, { doc, hackCss, cache });
  if (!node2) {
    return null;
  }
  if (n.rootId && mirror.getNode(n.rootId) !== doc) {
    mirror.replace(n.rootId, doc);
  }
  if (n.type === NodeType.Document) {
    doc.close();
    doc.open();
    if (n.compatMode === "BackCompat" && n.childNodes && n.childNodes[0].type !== NodeType.DocumentType) {
      if (n.childNodes[0].type === NodeType.Element && "xmlns" in n.childNodes[0].attributes && n.childNodes[0].attributes.xmlns === "http://www.w3.org/1999/xhtml") {
        doc.write(
          '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "">'
        );
      } else {
        doc.write(
          '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "">'
        );
      }
    }
    node2 = doc;
  }
  mirror.add(node2, n);
  if ((n.type === NodeType.Document || n.type === NodeType.Element) && !skipChild) {
    for (const childN of n.childNodes) {
      const childNode = buildNodeWithSN(childN, {
        doc,
        mirror,
        skipChild: false,
        hackCss,
        afterAppend,
        cache
      });
      if (!childNode) {
        console.warn("Failed to rebuild", childN);
        continue;
      }
      if (childN.isShadow && isElement(node2) && node2.shadowRoot) {
        node2.shadowRoot.appendChild(childNode);
      } else if (n.type === NodeType.Document && childN.type == NodeType.Element) {
        const htmlElement = childNode;
        let body = null;
        htmlElement.childNodes.forEach((child) => {
          if (child.nodeName === "BODY") body = child;
        });
        if (body) {
          htmlElement.removeChild(body);
          node2.appendChild(childNode);
          htmlElement.appendChild(body);
        } else {
          node2.appendChild(childNode);
        }
      } else {
        node2.appendChild(childNode);
      }
      if (afterAppend) {
        afterAppend(childNode, childN.id);
      }
    }
  }
  return node2;
}
function visit(mirror, onVisit) {
  function walk(node2) {
    onVisit(node2);
  }
  for (const id of mirror.getIds()) {
    if (mirror.has(id)) {
      walk(mirror.getNode(id));
    }
  }
}
function handleScroll(node2, mirror) {
  const n = mirror.getMeta(node2);
  if ((n == null ? void 0 : n.type) !== NodeType.Element) {
    return;
  }
  const el = node2;
  for (const name in n.attributes) {
    if (!(Object.prototype.hasOwnProperty.call(n.attributes, name) && name.startsWith("rr_"))) {
      continue;
    }
    const value = n.attributes[name];
    if (name === "rr_scrollLeft") {
      el.scrollLeft = value;
    }
    if (name === "rr_scrollTop") {
      el.scrollTop = value;
    }
  }
}
function rebuild(n, options) {
  const {
    doc,
    onVisit,
    hackCss = true,
    afterAppend,
    cache,
    mirror = new Mirror()
  } = options;
  const node2 = buildNodeWithSN(n, {
    doc,
    mirror,
    skipChild: false,
    hackCss,
    afterAppend,
    cache
  });
  visit(mirror, (visitedNode) => {
    if (onVisit) {
      onVisit(visitedNode);
    }
    handleScroll(visitedNode, mirror);
  });
  return node2;
}
exports.IGNORED_NODE = IGNORED_NODE;
exports.Mirror = Mirror;
exports.absolutifyURLs = absolutifyURLs;
exports.adaptCssForReplay = adaptCssForReplay;
exports.buildNodeWithSN = buildNodeWithSN;
exports.classMatchesRegex = classMatchesRegex;
exports.cleanupSnapshot = cleanupSnapshot;
exports.createCache = createCache;
exports.createMirror = createMirror;
exports.escapeImportStatement = escapeImportStatement;
exports.extractFileExtension = extractFileExtension;
exports.fixSafariColons = fixSafariColons;
exports.genId = genId;
exports.getInputType = getInputType;
exports.ignoreAttribute = ignoreAttribute;
exports.is2DCanvasBlank = is2DCanvasBlank;
exports.isCSSImportRule = isCSSImportRule;
exports.isCSSStyleRule = isCSSStyleRule;
exports.isElement = isElement;
exports.isNativeShadowDom = isNativeShadowDom;
exports.isNodeMetaEqual = isNodeMetaEqual;
exports.isShadowRoot = isShadowRoot;
exports.markCssSplits = markCssSplits;
exports.maskInputValue = maskInputValue;
exports.needMaskingText = needMaskingText;
exports.normalizeCssString = normalizeCssString;
exports.rebuild = rebuild;
exports.serializeNodeWithId = serializeNodeWithId;
exports.snapshot = snapshot;
exports.splitCssText = splitCssText;
exports.stringifyRule = stringifyRule;
exports.stringifyStylesheet = stringifyStylesheet;
exports.toLowerCase = toLowerCase;
exports.transformAttribute = transformAttribute;
exports.visitSnapshot = visitSnapshot;
if (typeof module.exports == "object" && typeof exports == "object") {
  var __cp = (to, from, except, desc) => {
    if ((from && typeof from === "object") || typeof from === "function") {
      for (let key of Object.getOwnPropertyNames(from)) {
        if (!Object.prototype.hasOwnProperty.call(to, key) && key !== except)
        Object.defineProperty(to, key, {
          get: () => from[key],
          enumerable: !(desc = Object.getOwnPropertyDescriptor(from, key)) || desc.enumerable,
        });
      }
    }
    return to;
  };
  module.exports = __cp(module.exports, exports);
}
return module.exports;
}))
//# sourceMappingURL=rrweb-snapshot.umd.cjs.map


/***/ }),

/***/ "./node_modules/@percy/cypress/package.json":
/*!**************************************************!*\
  !*** ./node_modules/@percy/cypress/package.json ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"@percy/cypress","description":"Cypress client library for visual testing with Percy","version":"3.1.7","license":"MIT","author":"Perceptual Inc.","repository":"https://github.com/percy/percy-cypress","keywords":["cypress","percy","visual testing"],"publishConfig":{"access":"public","tag":"latest"},"main":"index.js","types":"types/index.d.ts","files":["index.js","createRegion.js","types/index.d.ts"],"scripts":{"lint":"eslint --ignore-path .gitignore .","test":"percy exec --testing -- cypress run","coverage":"nyc report --check-coverage","test:coverage":"yarn test && yarn coverage","test:types":"tsd"},"dependencies":{"@percy/sdk-utils":"1.31.4"},"peerDependencies":{"cypress":">=3"},"devDependencies":{"@cypress/code-coverage":"^3.14.7","@percy/cli":"1.31.4","babel-loader":"^10.0.0","babel-plugin-istanbul":"^7.0.1","cypress":"^15.6.0","eslint":"^7.22.0","eslint-config-standard":"^16.0.2","eslint-plugin-cypress":"^2.11.2","eslint-plugin-import":"^2.22.0","eslint-plugin-node":"^11.1.0","eslint-plugin-promise":"^5.1.0","eslint-plugin-standard":"^5.0.0","nyc":"^17.1.0","tsd":"^0.33.0","webpack":"^5.102.1"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************************!*\
  !*** ./cypress/support/e2e.js ***!
  \********************************/


__webpack_require__(/*! ./commands */ "./cypress/support/commands.js");
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

// cypress/support/e2e.js
__webpack_require__(/*! @chromatic-com/cypress/support */ "./node_modules/@chromatic-com/cypress/dist/support.js");

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSx3Q0FBd0MsU0FBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxpQkFBaUI7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsRUFBRTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixlQUFlO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLHlCQUF5QixRQUFRO0FBQ2pDO0FBQ0Esc0JBQXNCLGVBQWU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsWUFBWTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLFNBQVM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHNCQUFzQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtB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LFNBQVMsVUFBVTs7QUFFbkI7QUFDQTs7Ozs7Ozs7Ozs7QUNwRkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixzQkFBc0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEMsb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFdBQVcsRUFBRSxTQUFTLEVBQUUsV0FBVztBQUN6RDtBQUNBO0FBQ0Esc0JBQXNCLFdBQVcsRUFBRSxTQUFTLEVBQUUsV0FBVztBQUN6RDtBQUNBO0FBQ0Esc0JBQXNCLFdBQVcsRUFBRSwrQkFBK0IsRUFBRSxXQUFXO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hELElBQUk7QUFDSixnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHdCQUF3QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsNEJBQTRCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsNEJBQTRCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiw2QkFBNkI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixrREFBa0QsVUFBVTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFD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NEJBQTRCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSwwREFBMEQsSUFBSTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osMkNBQTJDLGFBQWE7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx3QkFBd0IsaUJBQWlCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxrQkFBa0I7QUFDOUI7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTiw0REFBNEQ7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixjQUFjO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix3QkFBd0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsTUFBTTtBQUNkLGFBQWEsTUFBTTtBQUNuQixNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sK0JBQStCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsc0JBQXNCO0FBQ3RCLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsT0FBTztBQUMzQyx1Q0FBdUMsUUFBUTtBQUMvQztBQUNBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLFFBQVE7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsd0JBQXdCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9CQUFvQjtBQUM1Qix3QkFBd0I7QUFDeEIsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsb0JBQW9CO0FBQzlCO0FBQ0E7QUFDQSxVQUFVLG9CQUFvQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixRQUFRO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFFBQVE7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGtCQUFrQjtBQUMxQixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5QkFBeUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxJQUFJO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLHdCQUF3QjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsSUFBSTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUixZQUFZLElBQUk7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixvQkFBb0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0EseURBQXlELGFBQWEsOEJBQThCO0FBQ3BHO0FBQ0EsMkRBQTJEO0FBQzNEO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsT0FBTyxhQUFhLE9BQU87QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZUFBZTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxzQkFBc0I7QUFDaEM7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxzQkFBc0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxZQUFZO0FBQ1osWUFBWTtBQUNaLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixjQUFjO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixxQkFBcUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNsOUtBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7OztBQ05BQSxtQkFBQTtBQWhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUdBO0FBQ0FBLG1CQUFPLENBQUMsNkZBQWdDLENBQUM7O0FBR3pDO0FBQ0E7O0FBRUFDLE9BQU8sQ0FBQ0MsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQUNDLEdBQUcsRUFBRUMsUUFBUSxLQUFLO0VBQ2xEO0VBQ0E7RUFDQSxPQUFPLEtBQUs7QUFDZCxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Vyc3VzLWUyZS8uL2N5cHJlc3Mvc3VwcG9ydC9jb21tYW5kcy5qcyIsIndlYnBhY2s6Ly91cnN1cy1lMmUvLi9ub2RlX21vZHVsZXMvQGNocm9tYXRpYy1jb20vY3lwcmVzcy9kaXN0L3N1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vdXJzdXMtZTJlLy4vbm9kZV9tb2R1bGVzL0BwZXJjeS9jeXByZXNzL2NyZWF0ZVJlZ2lvbi5qcyIsIndlYnBhY2s6Ly91cnN1cy1lMmUvLi9ub2RlX21vZHVsZXMvQHBlcmN5L2N5cHJlc3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdXJzdXMtZTJlLy4vbm9kZV9tb2R1bGVzL0BwZXJjeS9zZGstdXRpbHMvZGlzdC9idW5kbGUuanMiLCJ3ZWJwYWNrOi8vdXJzdXMtZTJlLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly91cnN1cy1lMmUvLi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovL3Vyc3VzLWUyZS8uL25vZGVfbW9kdWxlcy9jeXByZXNzLWlmcmFtZS9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL3Vyc3VzLWUyZS8uL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovL3Vyc3VzLWUyZS8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vdXJzdXMtZTJlLy4vbm9kZV9tb2R1bGVzL0BjaHJvbWF1aS9ycndlYi1zbmFwc2hvdC9kaXN0L3Jyd2ViLXNuYXBzaG90LnVtZC5janMiLCJ3ZWJwYWNrOi8vdXJzdXMtZTJlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Vyc3VzLWUyZS8uL2N5cHJlc3Mvc3VwcG9ydC9lMmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vIFRoaXMgZXhhbXBsZSBjb21tYW5kcy5qcyBzaG93cyB5b3UgaG93IHRvXG4vLyBjcmVhdGUgdmFyaW91cyBjdXN0b20gY29tbWFuZHMgYW5kIG92ZXJ3cml0ZVxuLy8gZXhpc3RpbmcgY29tbWFuZHMuXG4vL1xuLy8gRm9yIG1vcmUgY29tcHJlaGVuc2l2ZSBleGFtcGxlcyBvZiBjdXN0b21cbi8vIGNvbW1hbmRzIHBsZWFzZSByZWFkIG1vcmUgaGVyZTpcbi8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9jdXN0b20tY29tbWFuZHNcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbmltcG9ydCAnQHBlcmN5L2N5cHJlc3MnO1xuaW1wb3J0ICdjeXByZXNzLWlmcmFtZSc7XG5cblxuLy8gLS0gVGhpcyBpcyBhIHBhcmVudCBjb21tYW5kIC0tXG4vLyBDeXByZXNzLkNvbW1hbmRzLmFkZChcImxvZ2luXCIsIChlbWFpbCwgcGFzc3dvcmQpID0+IHsgLi4uIH0pXG4vL1xuLy9cbi8vIC0tIFRoaXMgaXMgYSBjaGlsZCBjb21tYW5kIC0tXG4vLyBDeXByZXNzLkNvbW1hbmRzLmFkZChcImRyYWdcIiwgeyBwcmV2U3ViamVjdDogJ2VsZW1lbnQnfSwgKHN1YmplY3QsIG9wdGlvbnMpID0+IHsgLi4uIH0pXG4vL1xuLy9cbi8vIC0tIFRoaXMgaXMgYSBkdWFsIGNvbW1hbmQgLS1cbi8vIEN5cHJlc3MuQ29tbWFuZHMuYWRkKFwiZGlzbWlzc1wiLCB7IHByZXZTdWJqZWN0OiAnb3B0aW9uYWwnfSwgKHN1YmplY3QsIG9wdGlvbnMpID0+IHsgLi4uIH0pXG4vL1xuLy9cbi8vIC0tIFRoaXMgd2lsbCBvdmVyd3JpdGUgYW4gZXhpc3RpbmcgY29tbWFuZCAtLVxuLy8gQ3lwcmVzcy5Db21tYW5kcy5vdmVyd3JpdGUoXCJ2aXNpdFwiLCAob3JpZ2luYWxGbiwgdXJsLCBvcHRpb25zKSA9PiB7IC4uLiB9KVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcnJ3ZWJTbmFwc2hvdCA9IHJlcXVpcmUoJ0BjaHJvbWF1aS9ycndlYi1zbmFwc2hvdCcpO1xuXG52YXIgbT1PYmplY3QuZGVmaW5lUHJvcGVydHk7dmFyIGE9KGUsdCk9Pm0oZSxcIm5hbWVcIix7dmFsdWU6dCxjb25maWd1cmFibGU6ITB9KTt2YXIgbj1hKChlLHQpPT5uZXcgUHJvbWlzZShyPT57IXQmJkN5cHJlc3MuZW52KFwiZGlzYWJsZUF1dG9TbmFwc2hvdFwiKSYmcihudWxsKTtsZXQgbz1ycndlYlNuYXBzaG90LnNuYXBzaG90KGUse3JlY29yZENhbnZhczohMH0pLGQ9YShhc3luYyBwPT57bGV0IGM9YXdhaXQoYXdhaXQgZmV0Y2gocCkpLmJsb2IoKTtyZXR1cm4gbmV3IFByb21pc2UoKGgsZik9PntsZXQgaT1uZXcgRmlsZVJlYWRlcjtpLm9ubG9hZGVuZD0oKT0+aChpLnJlc3VsdCksaS5vbmVycm9yPWYsaS5yZWFkQXNEYXRhVVJMKGMpO30pfSxcInRvRGF0YVVSTFwiKSxsPWEoYXN5bmMgcD0+e2F3YWl0IFByb21pc2UuYWxsKHAuY2hpbGROb2Rlcy5tYXAoYXN5bmMgcz0+e2lmKHMudGFnTmFtZT09PVwiaW1nXCImJnMuYXR0cmlidXRlcy5zcmM/LnN0YXJ0c1dpdGgoXCJibG9iOlwiKSl7bGV0IGM9YXdhaXQgZChzLmF0dHJpYnV0ZXMuc3JjKTtzLmF0dHJpYnV0ZXMuc3JjPWM7fXMuY2hpbGROb2Rlcz8ubGVuZ3RoJiZhd2FpdCBsKHMpO30pKTt9LFwicmVwbGFjZUJsb2JVcmxzXCIpO2wobykudGhlbigoKT0+e3Ioe3NuYXBzaG90Om99KTt9KTt9KSxcInRha2VTbmFwc2hvdFwiKTtDeXByZXNzLkNvbW1hbmRzLmFkZChcInRha2VTbmFwc2hvdFwiLGU9PntDeXByZXNzLmNvbmZpZyhcImlzVGV4dFRlcm1pbmFsXCIpJiZjeS5kb2N1bWVudCgpLnRoZW4odD0+e2N5LndyYXAobih0LCEwKSkudGhlbihyPT57Y3kuZ2V0KFwiQG1hbnVhbFNuYXBzaG90c1wiKS50aGVuKG89PlsuLi5vLHsuLi5yLG5hbWU6ZX1dKS5hcyhcIm1hbnVhbFNuYXBzaG90c1wiKTt9KTt9KTt9KTt2YXIgeT1hKGU9Pih7Li4uZShcImRpZmZUaHJlc2hvbGRcIikmJntkaWZmVGhyZXNob2xkOmUoXCJkaWZmVGhyZXNob2xkXCIpfSwuLi5lKFwiZGVsYXlcIikmJntkZWxheTplKFwiZGVsYXlcIil9LC4uLmUoXCJkaWZmSW5jbHVkZUFudGlBbGlhc2luZ1wiKSYme2RpZmZJbmNsdWRlQW50aUFsaWFzaW5nOmUoXCJkaWZmSW5jbHVkZUFudGlBbGlhc2luZ1wiKX0sLi4uZShcImRpZmZUaHJlc2hvbGRcIikmJntkaWZmVGhyZXNob2xkOmUoXCJkaWZmVGhyZXNob2xkXCIpfSwuLi5lKFwiZm9yY2VkQ29sb3JzXCIpJiZ7Zm9yY2VkQ29sb3JzOmUoXCJmb3JjZWRDb2xvcnNcIil9LC4uLmUoXCJwYXVzZUFuaW1hdGlvbkF0RW5kXCIpJiZ7cGF1c2VBbmltYXRpb25BdEVuZDplKFwicGF1c2VBbmltYXRpb25BdEVuZFwiKX0sLi4uZShcInByZWZlcnNSZWR1Y2VkTW90aW9uXCIpJiZ7cHJlZmVyc1JlZHVjZWRNb3Rpb246ZShcInByZWZlcnNSZWR1Y2VkTW90aW9uXCIpfSwuLi5lKFwiY3JvcFRvVmlld3BvcnRcIikmJntjcm9wVG9WaWV3cG9ydDplKFwiY3JvcFRvVmlld3BvcnRcIil9LC4uLmUoXCJpZ25vcmVTZWxlY3RvcnNcIikmJntpZ25vcmVTZWxlY3RvcnM6ZShcImlnbm9yZVNlbGVjdG9yc1wiKX19KSxcImJ1aWxkQ2hyb21hdGljUGFyYW1zXCIpO2JlZm9yZUVhY2goKCk9PntDeXByZXNzLmNvbmZpZyhcImlzVGV4dFRlcm1pbmFsXCIpJiYoY3kud3JhcChbXSkuYXMoXCJtYW51YWxTbmFwc2hvdHNcIiksY3kudGFzayhcInByZXBhcmVBcmNoaXZlc1wiLHthY3Rpb246XCJzZXR1cC1uZXR3b3JrLWxpc3RlbmVyXCIscGF5bG9hZDp7YWxsb3dlZERvbWFpbnM6Q3lwcmVzcy5lbnYoXCJhc3NldERvbWFpbnNcIil9fSkpO30pO2FmdGVyRWFjaCgoKT0+e0N5cHJlc3MuY29uZmlnKFwiaXNUZXh0VGVybWluYWxcIikmJmN5LmRvY3VtZW50KCkudGhlbihlPT57Y3kud3JhcChuKGUpKS50aGVuKHQ9PntjeS5nZXQoXCJAbWFudWFsU25hcHNob3RzXCIpLnRoZW4oKHI9W10pPT57Y3kudXJsKCkudGhlbihvPT57Y3kudGFzayhcInByZXBhcmVBcmNoaXZlc1wiLHthY3Rpb246XCJzYXZlLWFyY2hpdmVzXCIscGF5bG9hZDp7dGVzdFRpdGxlUGF0aDpbQ3lwcmVzcy5zcGVjLnJlbGF0aXZlVG9Db21tb25Sb290LC4uLkN5cHJlc3MuY3VycmVudFRlc3QudGl0bGVQYXRoXSxkb21TbmFwc2hvdHM6Wy4uLnIsLi4udD9bdF06W11dLGNocm9tYXRpY1N0b3J5Ym9va1BhcmFtczp5KEN5cHJlc3MuZW52KSxwYWdlVXJsOm8sdmlld3BvcnQ6e2hlaWdodDpDeXByZXNzLmNvbmZpZyhcInZpZXdwb3J0SGVpZ2h0XCIpLHdpZHRoOkN5cHJlc3MuY29uZmlnKFwidmlld3BvcnRXaWR0aFwiKX0sb3V0cHV0RGlyOkN5cHJlc3MuY29uZmlnKFwiZG93bmxvYWRzRm9sZGVyXCIpfX0pO30pO30pO30pO30pO30pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b3V0LmpzLm1hcFxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3VwcG9ydC5qcy5tYXAiLCJjb25zdCBjcmVhdGVSZWdpb24gPSBmdW5jdGlvbih7XG4gIGJvdW5kaW5nQm94ID0gbnVsbCxcbiAgZWxlbWVudFhwYXRoID0gbnVsbCxcbiAgZWxlbWVudENTUyA9IG51bGwsXG4gIHBhZGRpbmcgPSBudWxsLFxuICBhbGdvcml0aG0gPSAnaWdub3JlJyxcbiAgZGlmZlNlbnNpdGl2aXR5ID0gbnVsbCxcbiAgaW1hZ2VJZ25vcmVUaHJlc2hvbGQgPSBudWxsLFxuICBjYXJvdXNlbHNFbmFibGVkID0gbnVsbCxcbiAgYmFubmVyc0VuYWJsZWQgPSBudWxsLFxuICBhZHNFbmFibGVkID0gbnVsbCxcbiAgZGlmZklnbm9yZVRocmVzaG9sZCA9IG51bGxcbn0gPSB7fSkge1xuICBjb25zdCBlbGVtZW50U2VsZWN0b3IgPSB7fTtcbiAgaWYgKGJvdW5kaW5nQm94KSBlbGVtZW50U2VsZWN0b3IuYm91bmRpbmdCb3ggPSBib3VuZGluZ0JveDtcbiAgaWYgKGVsZW1lbnRYcGF0aCkgZWxlbWVudFNlbGVjdG9yLmVsZW1lbnRYcGF0aCA9IGVsZW1lbnRYcGF0aDtcbiAgaWYgKGVsZW1lbnRDU1MpIGVsZW1lbnRTZWxlY3Rvci5lbGVtZW50Q1NTID0gZWxlbWVudENTUztcblxuICBjb25zdCByZWdpb24gPSB7XG4gICAgYWxnb3JpdGhtLFxuICAgIGVsZW1lbnRTZWxlY3RvclxuICB9O1xuXG4gIGlmIChwYWRkaW5nKSB7XG4gICAgcmVnaW9uLnBhZGRpbmcgPSBwYWRkaW5nO1xuICB9XG5cbiAgY29uc3QgY29uZmlndXJhdGlvbiA9IHt9O1xuICBpZiAoWydzdGFuZGFyZCcsICdpbnRlbGxpaWdub3JlJ10uaW5jbHVkZXMoYWxnb3JpdGhtKSkge1xuICAgIGlmIChkaWZmU2Vuc2l0aXZpdHkpIGNvbmZpZ3VyYXRpb24uZGlmZlNlbnNpdGl2aXR5ID0gZGlmZlNlbnNpdGl2aXR5O1xuICAgIGlmIChpbWFnZUlnbm9yZVRocmVzaG9sZCkgY29uZmlndXJhdGlvbi5pbWFnZUlnbm9yZVRocmVzaG9sZCA9IGltYWdlSWdub3JlVGhyZXNob2xkO1xuICAgIGlmIChjYXJvdXNlbHNFbmFibGVkKSBjb25maWd1cmF0aW9uLmNhcm91c2Vsc0VuYWJsZWQgPSBjYXJvdXNlbHNFbmFibGVkO1xuICAgIGlmIChiYW5uZXJzRW5hYmxlZCkgY29uZmlndXJhdGlvbi5iYW5uZXJzRW5hYmxlZCA9IGJhbm5lcnNFbmFibGVkO1xuICAgIGlmIChhZHNFbmFibGVkKSBjb25maWd1cmF0aW9uLmFkc0VuYWJsZWQgPSBhZHNFbmFibGVkO1xuICB9XG5cbiAgaWYgKE9iamVjdC5rZXlzKGNvbmZpZ3VyYXRpb24pLmxlbmd0aCA+IDApIHtcbiAgICByZWdpb24uY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb247XG4gIH1cblxuICBjb25zdCBhc3NlcnRpb24gPSB7fTtcbiAgaWYgKGRpZmZJZ25vcmVUaHJlc2hvbGQpIHtcbiAgICBhc3NlcnRpb24uZGlmZklnbm9yZVRocmVzaG9sZCA9IGRpZmZJZ25vcmVUaHJlc2hvbGQ7XG4gIH1cblxuICBpZiAoT2JqZWN0LmtleXMoYXNzZXJ0aW9uKS5sZW5ndGggPiAwKSB7XG4gICAgcmVnaW9uLmFzc2VydGlvbiA9IGFzc2VydGlvbjtcbiAgfVxuXG4gIHJldHVybiByZWdpb247XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgY3JlYXRlUmVnaW9uIH07XG4iLCJjb25zdCB1dGlscyA9IHJlcXVpcmUoJ0BwZXJjeS9zZGstdXRpbHMnKTtcbmNvbnN0IHsgY3JlYXRlUmVnaW9uIH0gPSByZXF1aXJlKCcuL2NyZWF0ZVJlZ2lvbicpO1xuXG4vLyBDb2xsZWN0IGNsaWVudCBhbmQgZW52aXJvbm1lbnQgaW5mb3JtYXRpb25cbmNvbnN0IHNka1BrZyA9IHJlcXVpcmUoJy4vcGFja2FnZS5qc29uJyk7XG5jb25zdCBDTElFTlRfSU5GTyA9IGAke3Nka1BrZy5uYW1lfS8ke3Nka1BrZy52ZXJzaW9ufWA7XG5jb25zdCBFTlZfSU5GTyA9IGBjeXByZXNzLyR7Q3lwcmVzcy52ZXJzaW9ufWA7XG4vLyBhc3NldCBkaXNjb3Zlcnkgc2hvdWxkIHRpbWVvdXQgYmVmb3JlIHRoaXNcbi8vIDEuNSB0aW1lcyB0aGUgMzAgc2Vjb25kIG5hdiB0aW1lb3V0XG5jb25zdCBDWV9USU1FT1VUID0gMzAgKiAxMDAwICogMS41O1xuXG4vLyBNYXliZSBzZXQgdGhlIENMSSBBUEkgYWRkcmVzcyBmcm9tIHRoZSBlbnZpcm9ubWVudFxudXRpbHMucGVyY3kuYWRkcmVzcyA9IEN5cHJlc3MuZW52KCdQRVJDWV9TRVJWRVJfQUREUkVTUycpO1xuXG4vLyBVc2UgQ3lwcmVzcydzIGh0dHA6cmVxdWVzdCBiYWNrZW5kIHRhc2tcbnV0aWxzLnJlcXVlc3QuZmV0Y2ggPSBhc3luYyBmdW5jdGlvbiBmZXRjaCh1cmwsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IHsgdXJsLCByZXRyeU9uTmV0d29ya0ZhaWx1cmU6IGZhbHNlLCAuLi5vcHRpb25zIH07XG4gIHJldHVybiBDeXByZXNzLmJhY2tlbmQoJ2h0dHA6cmVxdWVzdCcsIG9wdGlvbnMpO1xufTtcblxuLy8gQ3JlYXRlIEN5cHJlc3MgbG9nIG1lc3NhZ2VzXG5mdW5jdGlvbiBjeWxvZyhtZXNzYWdlLCBtZXRhKSB7XG4gIEN5cHJlc3MubG9nKHtcbiAgICBuYW1lOiAncGVyY3lTbmFwc2hvdCcsXG4gICAgZGlzcGxheU5hbWU6ICdwZXJjeScsXG4gICAgY29uc29sZVByb3BzOiAoKSA9PiBtZXRhLFxuICAgIG1lc3NhZ2VcbiAgfSk7XG59XG5cbi8vIFRha2UgYSBET00gc25hcHNob3QgYW5kIHBvc3QgaXQgdG8gdGhlIHNuYXBzaG90IGVuZHBvaW50XG5DeXByZXNzLkNvbW1hbmRzLmFkZCgncGVyY3lTbmFwc2hvdCcsIChuYW1lLCBvcHRpb25zID0ge30pID0+IHtcbiAgbGV0IGxvZyA9IHV0aWxzLmxvZ2dlcignY3lwcmVzcycpO1xuXG4gIC8vIGlmIG5hbWUgaXMgbm90IHBhc3NlZFxuICBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgb3B0aW9ucyA9IG5hbWU7XG4gICAgbmFtZSA9IHVuZGVmaW5lZDtcbiAgfVxuICAvLyBEZWZhdWx0IG5hbWUgdG8gdGVzdCB0aXRsZVxuICBuYW1lID0gbmFtZSB8fCBjeS5zdGF0ZSgncnVubmFibGUnKS5mdWxsVGl0bGUoKTtcblxuICBjb25zdCBtZXRhID0ge1xuICAgIHNuYXBzaG90OiB7XG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgdGVzdENhc2U6IG9wdGlvbnMudGVzdENhc2VcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgd2l0aExvZyA9IGFzeW5jIChmdW5jLCBjb250ZXh0LCBfdGhyb3cgPSB0cnVlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCBmdW5jKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihgR290IGVycm9yIHdoaWxlICR7Y29udGV4dH1gLCBtZXRhKTtcbiAgICAgIGxvZy5lcnJvcihlcnJvciwgbWV0YSk7XG4gICAgICBsb2cuZXJyb3IoZXJyb3Iuc3RhY2ssIG1ldGEpO1xuICAgICAgaWYgKF90aHJvdykgdGhyb3cgZXJyb3I7XG4gICAgICByZXR1cm4gZXJyb3I7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHdpdGhSZXRyeSA9IGFzeW5jIChmdW5jKSA9PiB7XG4gICAgbGV0IG51bSA9IDE7XG4gICAgY29uc3QgbWF4TnVtID0gMztcbiAgICBjb25zdCBzbGVlcFRpbWUgPSAxMDAwO1xuICAgIGxldCBlcnJvcjtcblxuICAgIHdoaWxlIChudW0gPD0gbWF4TnVtKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgZnVuYygpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBlcnJvciA9IGU7XG4gICAgICAgIGxvZy5lcnJvcihgUmV0cnlpbmcuLi4gKCR7bnVtfS8ke21heE51bX0pYCk7XG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXMpID0+IHNldFRpbWVvdXQocmVzLCBzbGVlcFRpbWUpKTtcbiAgICAgIH1cbiAgICAgIG51bSArPSAxO1xuICAgIH1cbiAgICB0aHJvdyBlcnJvcjtcbiAgfTtcblxuICByZXR1cm4gY3kudGhlbih7IHRpbWVvdXQ6IENZX1RJTUVPVVQgfSwgYXN5bmMgKCkgPT4ge1xuICAgIGlmIChDeXByZXNzLmNvbmZpZygnaXNJbnRlcmFjdGl2ZScpICYmXG4gICAgICAgICFDeXByZXNzLmNvbmZpZygnZW5hYmxlUGVyY3lJbnRlcmFjdGl2ZU1vZGUnKSkge1xuICAgICAgcmV0dXJuIGN5bG9nKCdEaXNhYmxlZCBpbiBpbnRlcmFjdGl2ZSBtb2RlJywge1xuICAgICAgICBkZXRhaWxzOiAndXNlIFwiY3lwcmVzcyBydW5cIiBpbnN0ZWFkIG9mIFwiY3lwcmVzcyBvcGVuXCInLFxuICAgICAgICBuYW1lXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiBQZXJjeSBpcyBlbmFibGVkXG4gICAgaWYgKCFhd2FpdCB1dGlscy5pc1BlcmN5RW5hYmxlZCgpKSB7XG4gICAgICByZXR1cm4gY3lsb2coJ05vdCBydW5uaW5nJywgeyBuYW1lIH0pO1xuICAgIH1cblxuICAgIGF3YWl0IHdpdGhMb2coYXN5bmMgKCkgPT4ge1xuICAgICAgLy8gSW5qZWN0IEBwZXJjeS9kb21cbiAgICAgIGlmICghd2luZG93LlBlcmN5RE9NKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1ldmFsXG4gICAgICAgIGV2YWwoYXdhaXQgdXRpbHMuZmV0Y2hQZXJjeURPTSgpKTtcbiAgICAgIH1cbiAgICB9LCAnaW5qZWN0aW5nIEBwZXJjeS9kb20nKTtcblxuICAgIC8vIFNlcmlhbGl6ZSBhbmQgY2FwdHVyZSB0aGUgRE9NXG4gICAgcmV0dXJuIGN5LmRvY3VtZW50KHsgbG9nOiBmYWxzZSB9KS50aGVuKHsgdGltZW91dDogQ1lfVElNRU9VVCB9LCBhc3luYyAoZG9tKSA9PiB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogbm8gaW5zdHJ1bWVudGluZyBpbmplY3RlZCBjb2RlICovXG4gICAgICBsZXQgZG9tU25hcHNob3QgPSBhd2FpdCB3aXRoTG9nKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5QZXJjeURPTS5zZXJpYWxpemUoeyAuLi5vcHRpb25zLCBkb20gfSk7XG4gICAgICB9LCAndGFraW5nIGRvbSBzbmFwc2hvdCcpO1xuXG4gICAgICAvLyBDYXB0dXJlIGNvb2tpZXNcbiAgICAgIHJldHVybiBjeS5nZXRDb29raWVzKHsgbG9nOiBmYWxzZSB9KS50aGVuKGFzeW5jIChjb29raWVzKSA9PiB7XG4gICAgICAgIGlmIChjb29raWVzICYmIGNvb2tpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGRvbVNuYXBzaG90LmNvb2tpZXMgPSBjb29raWVzO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGhyb3dDb25maWcgPSBDeXByZXNzLmNvbmZpZygncGVyY3lUaHJvd0Vycm9yT25GYWlsdXJlJyk7XG4gICAgICAgIGNvbnN0IF90aHJvdyA9IHRocm93Q29uZmlnID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IHRocm93Q29uZmlnO1xuXG4gICAgICAgIC8vIFBvc3QgdGhlIERPTSBzbmFwc2hvdCB0byBQZXJjeVxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCB3aXRoUmV0cnkoYXN5bmMgKCkgPT4gYXdhaXQgd2l0aExvZyhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHV0aWxzLnBvc3RTbmFwc2hvdCh7XG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgZW52aXJvbm1lbnRJbmZvOiBFTlZfSU5GTyxcbiAgICAgICAgICAgIGNsaWVudEluZm86IENMSUVOVF9JTkZPLFxuICAgICAgICAgICAgZG9tU25hcHNob3QsXG4gICAgICAgICAgICB1cmw6IGRvbS5VUkwsXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sICdwb3N0aW5nIGRvbSBzbmFwc2hvdCcsIF90aHJvdykpO1xuXG4gICAgICAgIC8vIExvZyB0aGUgc25hcHNob3QgbmFtZSBvbiBzdWNjZXNzXG4gICAgICAgIGN5bG9nKG5hbWUsIG1ldGEpO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgY3JlYXRlUmVnaW9uIH07XG4iLCIoZnVuY3Rpb24oKSB7XG4gIChmdW5jdGlvbiAoZXhwb3J0cykge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGNvbnN0IHByb2Nlc3MgPSAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsVGhpcy5wcm9jZXNzKSB8fCB7fTtcbiAgICBwcm9jZXNzLmVudiA9IHByb2Nlc3MuZW52IHx8IHt9O1xuICAgIHByb2Nlc3MuZW52Ll9fUEVSQ1lfQlJPV1NFUklGSUVEX18gPSB0cnVlO1xuXG4gICAgLy8gaGVscGVyIHRvIGNyZWF0ZSBhIHZlcnNpb24gb2JqZWN0IGZyb20gYSBzdHJpbmdcbiAgICBmdW5jdGlvbiB0b1ZlcnNpb24oc3RyKSB7XG4gICAgICBzdHIgfHwgKHN0ciA9ICcwLjAuMCcpO1xuICAgICAgcmV0dXJuIHN0ci5zcGxpdCgvXFwufC0vKS5yZWR1Y2UoKHZlcnNpb24sIHBhcnQsIGkpID0+IHtcbiAgICAgICAgbGV0IHYgPSBwYXJzZUludChwYXJ0LCAxMCk7XG4gICAgICAgIHZlcnNpb25baV0gPSBpc05hTih2KSA/IHBhcnQgOiB2O1xuICAgICAgICByZXR1cm4gdmVyc2lvbjtcbiAgICAgIH0sIHtcbiAgICAgICAgZ2V0IG1ham9yKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzWzBdIHx8IDA7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBtaW5vcigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1sxXSB8fCAwO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgcGF0Y2goKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNbMl0gfHwgMDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IHByZXJlbGVhc2UoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNbM107XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBidWlsZCgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1s0XTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9TdHJpbmcoKSB7XG4gICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZSB2ZXJzaW9uIGNhY2hlXG4gICAgbGV0IHZlcnNpb24gPSB0b1ZlcnNpb24oKTtcbiAgICBsZXQgdHlwZTtcblxuICAgIC8vIGNvbnRhaW5zIGxvY2FsIHBlcmN5IGluZm9cbiAgICBjb25zdCBpbmZvID0ge1xuICAgICAgLy8gZ2V0IG9yIHNldCB0aGUgQ0xJIEFQSSBhZGRyZXNzIHZpYSB0aGUgZW52aXJvbm1lbnRcbiAgICAgIGdldCBhZGRyZXNzKCkge1xuICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnYuUEVSQ1lfU0VSVkVSX0FERFJFU1MgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6NTMzOCc7XG4gICAgICB9LFxuICAgICAgc2V0IGFkZHJlc3MoYWRkcikge1xuICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnYuUEVSQ1lfU0VSVkVSX0FERFJFU1MgPSBhZGRyO1xuICAgICAgfSxcbiAgICAgIC8vIHZlcnNpb24gaW5mb3JtYXRpb25cbiAgICAgIGdldCB2ZXJzaW9uKCkge1xuICAgICAgICByZXR1cm4gdmVyc2lvbjtcbiAgICAgIH0sXG4gICAgICBzZXQgdmVyc2lvbih2KSB7XG4gICAgICAgIHJldHVybiB2ZXJzaW9uID0gdG9WZXJzaW9uKHYpO1xuICAgICAgfSxcbiAgICAgIGdldCB0eXBlKCkge1xuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgIH0sXG4gICAgICBzZXQgdHlwZSh0KSB7XG4gICAgICAgIHJldHVybiB0eXBlID0gdDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gSGVscGVyIHRvIHNlbmQgYSByZXF1ZXN0IHRvIHRoZSBsb2NhbCBDTEkgQVBJXG4gICAgYXN5bmMgZnVuY3Rpb24gcmVxdWVzdChwYXRoLCBvcHRpb25zID0ge30pIHtcbiAgICAgIGxldCB1cmwgPSBwYXRoLnN0YXJ0c1dpdGgoJ2h0dHAnKSA/IHBhdGggOiBgJHtpbmZvLmFkZHJlc3N9JHtwYXRofWA7XG4gICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0LmZldGNoKHVybCwgb3B0aW9ucyk7XG5cbiAgICAgIC8vIG1heWJlIHBhcnNlIHJlc3BvbnNlIGJvZHkgYXMganNvblxuICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5ib2R5ID09PSAnc3RyaW5nJyAmJiByZXNwb25zZS5oZWFkZXJzWydjb250ZW50LXR5cGUnXSA9PT0gJ2FwcGxpY2F0aW9uL2pzb24nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVzcG9uc2UuYm9keSA9IEpTT04ucGFyc2UocmVzcG9uc2UuYm9keSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB9XG5cbiAgICAgIC8vIHRocm93IGFuIGVycm9yIGlmIHN0YXR1cyBpcyBub3Qgb2tcbiAgICAgIGlmICghKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSkge1xuICAgICAgICB0aHJvdyBPYmplY3QuYXNzaWduKG5ldyBFcnJvcigpLCB7XG4gICAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5lcnJvciB8fCAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogaW4gdGVzdHMsIHRoZXJlJ3MgYWx3YXlzIGFuIGVycm9yIG1lc3NhZ2UgKi9cbiAgICAgICAgICBgJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gLFxuICAgICAgICAgIHJlc3BvbnNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbiAgICByZXF1ZXN0LnBvc3QgPSBmdW5jdGlvbiBwb3N0KHVybCwganNvbikge1xuICAgICAgcmV0dXJuIHJlcXVlc3QodXJsLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShqc29uKSxcbiAgICAgICAgdGltZW91dDogNjAwMDAwXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gZW52aXJvbm1lbnQgc3BlY2lmaWMgaW1wbGVtZW50YXRpb25cbiAgICBpZiAocHJvY2Vzcy5lbnYuX19QRVJDWV9CUk9XU0VSSUZJRURfXykge1xuICAgICAgLy8gdXNlIHdpbmRvdy5mZXRjaCBpbiBicm93c2Vyc1xuICAgICAgY29uc3Qgd2luRmV0Y2ggPSB3aW5kb3cuZmV0Y2g7XG4gICAgICByZXF1ZXN0LmZldGNoID0gYXN5bmMgZnVuY3Rpb24gZmV0Y2godXJsLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IHdpbkZldGNoKHVybCwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogcmVzcG9uc2Uuc3RhdHVzVGV4dCxcbiAgICAgICAgICBoZWFkZXJzOiBPYmplY3QuZnJvbUVudHJpZXMocmVzcG9uc2UuaGVhZGVycy5lbnRyaWVzKCkpLFxuICAgICAgICAgIGJvZHk6IGF3YWl0IHJlc3BvbnNlLnRleHQoKVxuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdXNlIGh0dHAucmVxdWVzdCBpbiBub2RlXG4gICAgICByZXF1ZXN0LmZldGNoID0gYXN5bmMgZnVuY3Rpb24gZmV0Y2godXJsLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCB7XG4gICAgICAgICAgcHJvdG9jb2xcbiAgICAgICAgfSA9IG5ldyBVUkwodXJsKTtcbiAgICAgICAgLy8gcm9sbHVwIHRocm93cyBlcnJvciBmb3IgLT4gYXdhaXQgKHt9KVxuICAgICAgICBsZXQge1xuICAgICAgICAgIGRlZmF1bHQ6IGh0dHBcbiAgICAgICAgfSA9IHByb3RvY29sID09PSAnaHR0cHM6JyA/IGF3YWl0ICh7fSkgOiBhd2FpdCAoe30pO1xuICAgICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgICAgICAuLi5vcHRpb25zXG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgcHJveHlBZ2VudEZvclxuICAgICAgICAgIH0gPSBhd2FpdCAoe30pO1xuICAgICAgICAgIGNvbnN0IGFnZW50ID0gcHJveHlBZ2VudEZvcih1cmwpO1xuICAgICAgICAgIGlmIChhZ2VudCkge1xuICAgICAgICAgICAgcmVxdWVzdE9wdGlvbnMuYWdlbnQgPSBhZ2VudDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgLy8gRmFpbGVkIHRvIGxvYWQgcHJveHkgbW9kdWxlIG9yIGNyZWF0ZSBwcm94eSBhZ2VudCAoZS5nLiwgbWlzc2luZyBwcm94eS5qcywgaW52YWxpZCBwcm94eSBjb25maWcpXG4gICAgICAgICAgLy8gQ29udGludWUgd2l0aG91dCBwcm94eSBzdXBwb3J0IC0gcmVxdWVzdHMgd2lsbCBnbyBkaXJlY3RseSB3aXRob3V0IHByb3h5XG4gICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICBsb2dnZXIoJ3Nkay11dGlsczpyZXF1ZXN0JykuZGVidWcoYFByb3h5IGFnZW50IHVuYXZhaWxhYmxlOiAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBodHRwLnJlcXVlc3QodXJsLCByZXF1ZXN0T3B0aW9ucykub24oJ3Jlc3BvbnNlJywgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSAnJztcbiAgICAgICAgICAgIHJlc3BvbnNlLm9uKCdkYXRhJywgY2h1bmsgPT4gYm9keSArPSBjaHVuay50b1N0cmluZygpKTtcbiAgICAgICAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCAoKSA9PiByZXNvbHZlKHtcbiAgICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNDb2RlLFxuICAgICAgICAgICAgICBzdGF0dXNUZXh0OiByZXNwb25zZS5zdGF0dXNNZXNzYWdlLFxuICAgICAgICAgICAgICBoZWFkZXJzOiByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgICAgICBib2R5XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfSkub24oJ2Vycm9yJywgcmVqZWN0KS5lbmQob3B0aW9ucy5ib2R5KTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIFVzZWQgd2hlbiBkZXRlcm1pbmluZyBpZiBhIG1lc3NhZ2Ugc2hvdWxkIGJlIGxvZ2dlZFxuICAgIGNvbnN0IExPR19MRVZFTFMgPSB7XG4gICAgICBkZWJ1ZzogMCxcbiAgICAgIGluZm86IDEsXG4gICAgICB3YXJuOiAyLFxuICAgICAgZXJyb3I6IDNcbiAgICB9O1xuXG4gICAgLy8gQ3JlYXRlIGEgc21hbGwgbG9nZ2VyIHV0aWwgdXNpbmcgdGhlIHNwZWNpZmllZCBuYW1lc3BhY2VcbiAgICBmdW5jdGlvbiBsb2dnZXIobmFtZXNwYWNlKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoTE9HX0xFVkVMUykucmVkdWNlKChucywgbHZsKSA9PiBPYmplY3QuYXNzaWduKG5zLCB7XG4gICAgICAgIFtsdmxdOiAoLi4uYSkgPT4gbG9nZ2VyLmxvZyhuYW1lc3BhY2UsIGx2bCwgLi4uYSlcbiAgICAgIH0pLCB7fSk7XG4gICAgfVxuICAgIE9iamVjdC5hc3NpZ24obG9nZ2VyLCB7XG4gICAgICAvLyBTZXQgYW5kL29yIHJldHVybiB0aGUgbG9jYWwgbG9nbGV2ZWxcbiAgICAgIGxvZ2xldmVsOiAobHZsID0gbG9nZ2VyLmxvZ2xldmVsLmx2bCkgPT4ge1xuICAgICAgICByZXR1cm4gbG9nZ2VyLmxvZ2xldmVsLmx2bCA9IGx2bCB8fCBwcm9jZXNzLmVudi5QRVJDWV9MT0dMRVZFTCB8fCAnaW5mbyc7XG4gICAgICB9LFxuICAgICAgLy8gVHJhY2sgYW5kIHNlbmQvd3JpdGUgbG9ncyBmb3IgdGhlIHNwZWNpZmllZCBuYW1lc3BhY2UgYW5kIGxvZyBsZXZlbFxuICAgICAgLy8gcmVtb3RlIHNob3VsZCBvbmx5IGJlIGZhbHNlIGluIGNhc2Ugb2Ygc2Vuc2l0aXZlL3NlbGYgY2FsbCBmb3IgZXJyb3JzXG4gICAgICBsb2c6IChucywgbHZsLCBtc2csIG1ldGEsIHJlbW90ZSA9IHRydWUpID0+IHtcbiAgICAgICAgbGV0IGVyciA9IHR5cGVvZiBtc2cgIT09ICdzdHJpbmcnICYmIChsdmwgPT09ICdlcnJvcicgfHwgbHZsID09PSAnZGVidWcnKTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgc3BlY2lmaWMgbGV2ZWwgaXMgd2l0aGluIHRoZSBsb2NhbCBsb2dsZXZlbCByYW5nZVxuICAgICAgICBpZiAoTE9HX0xFVkVMU1tsdmxdICE9IG51bGwgJiYgTE9HX0xFVkVMU1tsdmxdID49IExPR19MRVZFTFNbbG9nZ2VyLmxvZ2xldmVsKCldKSB7XG4gICAgICAgICAgbGV0IGRlYnVnID0gbG9nZ2VyLmxvZ2xldmVsKCkgPT09ICdkZWJ1Zyc7XG4gICAgICAgICAgbGV0IGxhYmVsID0gZGVidWcgPyBgcGVyY3k6JHtuc31gIDogJ3BlcmN5JztcblxuICAgICAgICAgIC8vIGNvbG9yaXplIHRoZSBsYWJlbCB3aGVuIHBvc3NpYmxlIGZvciBjb25zaXN0ZW5jeSB3aXRoIHRoZSBDTEkgbG9nZ2VyXG4gICAgICAgICAgaWYgKCFwcm9jZXNzLmVudi5fX1BFUkNZX0JST1dTRVJJRklFRF9fKSBsYWJlbCA9IGBcXHUwMDFiWzk1bSR7bGFiZWx9XFx1MDAxYlszOW1gO1xuICAgICAgICAgIG1zZyA9IGBbJHtsYWJlbH1dICR7ZXJyICYmIGRlYnVnICYmIG1zZy5zdGFjayB8fCBtc2d9YDtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuX19QRVJDWV9CUk9XU0VSSUZJRURfXykge1xuICAgICAgICAgICAgLy8gdXNlIGNvbnNvbGVbd2FybnxlcnJvcnxsb2ddIGluIGJyb3dzZXJzXG4gICAgICAgICAgICBjb25zb2xlW1snd2FybicsICdlcnJvciddLmluY2x1ZGVzKGx2bCkgPyBsdmwgOiAnbG9nJ10obXNnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdXNlIHByb2Nlc3Nbc3Rkb3V0fHN0ZGVycl0ud3JpdGUgaW4gbm9kZVxuICAgICAgICAgICAgcHJvY2Vzc1tsdmwgPT09ICdpbmZvJyA/ICdzdGRvdXQnIDogJ3N0ZGVyciddLndyaXRlKG1zZyArICdcXG4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlbW90ZSAmJiAobHZsID09PSAnZXJyb3InIHx8IGRlYnVnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3QucG9zdCgnL3BlcmN5L2xvZycsIHtcbiAgICAgICAgICAgICAgbGV2ZWw6IGx2bCxcbiAgICAgICAgICAgICAgbWVzc2FnZTogbXNnLFxuICAgICAgICAgICAgICBtZXRhXG4gICAgICAgICAgICB9KS5jYXRjaChfID0+IHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhucywgJ2Vycm9yJywgJ0NvdWxkIG5vdCBzZW5kIGxvZ3MgdG8gY2xpJywgbWV0YSwgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBDaGVjayBpZiBQZXJjeSBpcyBlbmFibGVkIHVzaW5nIHRoZSBoZWFsdGhjaGVjayBlbmRwb2ludFxuICAgIGFzeW5jIGZ1bmN0aW9uIGlzUGVyY3lFbmFibGVkKCkge1xuICAgICAgaWYgKGluZm8uZW5hYmxlZCA9PSBudWxsKSB7XG4gICAgICAgIGxldCBsb2cgPSBsb2dnZXIoJ3V0aWxzJyk7XG4gICAgICAgIGxldCBlcnJvcjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0KCcvcGVyY3kvaGVhbHRoY2hlY2snKTtcbiAgICAgICAgICBpbmZvLnZlcnNpb24gPSByZXNwb25zZS5oZWFkZXJzWyd4LXBlcmN5LWNvcmUtdmVyc2lvbiddO1xuICAgICAgICAgIGluZm8uY29uZmlnID0gcmVzcG9uc2UuYm9keS5jb25maWc7XG4gICAgICAgICAgaW5mby5idWlsZCA9IHJlc3BvbnNlLmJvZHkuYnVpbGQ7XG4gICAgICAgICAgaW5mby5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICBpbmZvLnR5cGUgPSByZXNwb25zZS5ib2R5LnR5cGU7XG4gICAgICAgICAgaW5mby53aWR0aHMgPSByZXNwb25zZS5ib2R5LndpZHRocztcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGluZm8uZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgIGVycm9yID0gZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5mby5lbmFibGVkICYmIGluZm8udmVyc2lvbi5tYWpvciAhPT0gMSkge1xuICAgICAgICAgIGxvZy5pbmZvKCdVbnN1cHBvcnRlZCBQZXJjeSBDTEkgdmVyc2lvbiwgZGlzYWJsaW5nIHNuYXBzaG90cycpO1xuICAgICAgICAgIGxvZy5kZWJ1ZyhgRm91bmQgdmVyc2lvbjogJHtpbmZvLnZlcnNpb259YCk7XG4gICAgICAgICAgaW5mby5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoIWluZm8uZW5hYmxlZCkge1xuICAgICAgICAgIGxvZy5pbmZvKCdQZXJjeSBpcyBub3QgcnVubmluZywgZGlzYWJsaW5nIHNuYXBzaG90cycpO1xuICAgICAgICAgIGxvZy5kZWJ1ZyhlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBpbmZvLmVuYWJsZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgUkVUUllfRVJST1JfQ09ERVMgPSBbJ0VDT05OUkVTRVQnLCAnRVRJTUVET1VUJ107XG4gICAgYXN5bmMgZnVuY3Rpb24gd2FpdEZvclBlcmN5SWRsZSgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiAhIShhd2FpdCByZXF1ZXN0KCcvcGVyY3kvaWRsZScpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIFJFVFJZX0VSUk9SX0NPREVTLmluY2x1ZGVzKGUuY29kZSkgJiYgd2FpdEZvclBlcmN5SWRsZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZldGNoIGFuZCBjYWNoZSB0aGUgQHBlcmN5L2RvbSBzY3JpcHRcbiAgICBhc3luYyBmdW5jdGlvbiBmZXRjaFBlcmN5RE9NKCkge1xuICAgICAgaWYgKGluZm8uZG9tU2NyaXB0ID09IG51bGwpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdCgnL3BlcmN5L2RvbS5qcycpO1xuICAgICAgICBpbmZvLmRvbVNjcmlwdCA9IHJlc3BvbnNlLmJvZHk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5mby5kb21TY3JpcHQ7XG4gICAgfVxuXG4gICAgLy8gUG9zdCBzbmFwc2hvdCBkYXRhIHRvIHRoZSBDTEkgc25hcHNob3QgZW5kcG9pbnQuIElmIHRoZSBlbmRwb2ludCByZXNwb25kcyB3aXRoIGEgYnVpbGQgZXJyb3IsXG4gICAgLy8gaW5kaWNhdGUgdGhhdCBQZXJjeSBoYXMgYmVlbiBkaXNhYmxlZC5cbiAgICBhc3luYyBmdW5jdGlvbiBwb3N0U25hcHNob3Qob3B0aW9ucywgcGFyYW1zKSB7XG4gICAgICBsZXQgcXVlcnkgPSBwYXJhbXMgPyBgPyR7bmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbXMpfWAgOiAnJztcbiAgICAgIHJldHVybiBhd2FpdCByZXF1ZXN0LnBvc3QoYC9wZXJjeS9zbmFwc2hvdCR7cXVlcnl9YCwgb3B0aW9ucykuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgdmFyIF9lcnIkcmVzcG9uc2U7XG4gICAgICAgIGlmICgoX2VyciRyZXNwb25zZSA9IGVyci5yZXNwb25zZSkgIT09IG51bGwgJiYgX2VyciRyZXNwb25zZSAhPT0gdm9pZCAwICYmIChfZXJyJHJlc3BvbnNlID0gX2VyciRyZXNwb25zZS5ib2R5KSAhPT0gbnVsbCAmJiBfZXJyJHJlc3BvbnNlICE9PSB2b2lkIDAgJiYgKF9lcnIkcmVzcG9uc2UgPSBfZXJyJHJlc3BvbnNlLmJ1aWxkKSAhPT0gbnVsbCAmJiBfZXJyJHJlc3BvbnNlICE9PSB2b2lkIDAgJiYgX2VyciRyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgIGluZm8uZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUG9zdCBzbmFwc2hvdCBkYXRhIHRvIHRoZSBDTEkgc25hcHNob3QgZW5kcG9pbnQuIElmIHRoZSBlbmRwb2ludCByZXNwb25kcyB3aXRoIGEgYnVpbGQgZXJyb3IsXG4gICAgLy8gaW5kaWNhdGUgdGhhdCBQZXJjeSBoYXMgYmVlbiBkaXNhYmxlZC5cbiAgICBhc3luYyBmdW5jdGlvbiBwb3N0Q29tcGFyaXNvbihvcHRpb25zLCBwYXJhbXMpIHtcbiAgICAgIGxldCBxdWVyeSA9IHBhcmFtcyA/IGA/JHtuZXcgVVJMU2VhcmNoUGFyYW1zKHBhcmFtcyl9YCA6ICcnO1xuICAgICAgcmV0dXJuIGF3YWl0IHJlcXVlc3QucG9zdChgL3BlcmN5L2NvbXBhcmlzb24ke3F1ZXJ5fWAsIG9wdGlvbnMpLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIHZhciBfZXJyJHJlc3BvbnNlO1xuICAgICAgICBpZiAoKF9lcnIkcmVzcG9uc2UgPSBlcnIucmVzcG9uc2UpICE9PSBudWxsICYmIF9lcnIkcmVzcG9uc2UgIT09IHZvaWQgMCAmJiAoX2VyciRyZXNwb25zZSA9IF9lcnIkcmVzcG9uc2UuYm9keSkgIT09IG51bGwgJiYgX2VyciRyZXNwb25zZSAhPT0gdm9pZCAwICYmIChfZXJyJHJlc3BvbnNlID0gX2VyciRyZXNwb25zZS5idWlsZCkgIT09IG51bGwgJiYgX2VyciRyZXNwb25zZSAhPT0gdm9pZCAwICYmIF9lcnIkcmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICBpbmZvLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFBvc3QgZmFpbGVkIGV2ZW50IGRhdGEgdG8gdGhlIENMSSBldmVudCBlbmRwb2ludC5cbiAgICBhc3luYyBmdW5jdGlvbiBwb3N0QnVpbGRFdmVudHMob3B0aW9ucykge1xuICAgICAgcmV0dXJuIGF3YWl0IHJlcXVlc3QucG9zdCgnL3BlcmN5L2V2ZW50cycsIG9wdGlvbnMpLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFBvc3RzIHRvIHRoZSBsb2NhbCBQZXJjeSBzZXJ2ZXIgb25lIG9yIG1vcmUgc25hcHNob3RzIHRvIGZsdXNoLiBHaXZlbiBubyBhcmd1bWVudHMsIGFsbCBzbmFwc2hvdHNcbiAgICAvLyB3aWxsIGJlIGZsdXNoZWQuIERvZXMgbm90aGluZyB3aGVuIFBlcmN5IGlzIG5vdCBlbmFibGVkLlxuICAgIGFzeW5jIGZ1bmN0aW9uIGZsdXNoU25hcHNob3RzKG9wdGlvbnMpIHtcbiAgICAgIGlmIChpbmZvLmVuYWJsZWQpIHtcbiAgICAgICAgLy8gYWNjZXB0IG9uZSBvciBtb3JlIHNuYXBzaG90IG5hbWVzXG4gICAgICAgIG9wdGlvbnMgJiYgKG9wdGlvbnMgPSBbXS5jb25jYXQob3B0aW9ucykubWFwKG8gPT4gdHlwZW9mIG8gPT09ICdzdHJpbmcnID8ge1xuICAgICAgICAgIG5hbWU6IG9cbiAgICAgICAgfSA6IG8pKTtcbiAgICAgICAgYXdhaXQgcmVxdWVzdC5wb3N0KCcvcGVyY3kvZmx1c2gnLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQb3N0IHNjcmVlbnNob3QgZGF0YSB0byB0aGUgQ0xJIGF1dG9tYXRlU2NyZWVuc2hvdCBlbmRwb2ludC4gSWYgdGhlIGVuZHBvaW50IHJlc3BvbmRzIHdpdGggYSBidWlsZCBlcnJvcixcbiAgICAvLyBpbmRpY2F0ZSB0aGF0IFBlcmN5IGhhcyBiZWVuIGRpc2FibGVkLlxuICAgIGFzeW5jIGZ1bmN0aW9uIGNhcHR1cmVBdXRvbWF0ZVNjcmVlbnNob3Qob3B0aW9ucywgcGFyYW1zKSB7XG4gICAgICBsZXQgcXVlcnkgPSBwYXJhbXMgPyBgPyR7bmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbXMpfWAgOiAnJztcbiAgICAgIHJldHVybiBhd2FpdCByZXF1ZXN0LnBvc3QoYC9wZXJjeS9hdXRvbWF0ZVNjcmVlbnNob3Qke3F1ZXJ5fWAsIG9wdGlvbnMpLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIHZhciBfZXJyJHJlc3BvbnNlO1xuICAgICAgICBpZiAoKF9lcnIkcmVzcG9uc2UgPSBlcnIucmVzcG9uc2UpICE9PSBudWxsICYmIF9lcnIkcmVzcG9uc2UgIT09IHZvaWQgMCAmJiAoX2VyciRyZXNwb25zZSA9IF9lcnIkcmVzcG9uc2UuYm9keSkgIT09IG51bGwgJiYgX2VyciRyZXNwb25zZSAhPT0gdm9pZCAwICYmIChfZXJyJHJlc3BvbnNlID0gX2VyciRyZXNwb25zZS5idWlsZCkgIT09IG51bGwgJiYgX2VyciRyZXNwb25zZSAhPT0gdm9pZCAwICYmIF9lcnIkcmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICBpbmZvLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBpbmRleCA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAgIGxvZ2dlcjogbG9nZ2VyLFxuICAgICAgcGVyY3k6IGluZm8sXG4gICAgICByZXF1ZXN0OiByZXF1ZXN0LFxuICAgICAgaXNQZXJjeUVuYWJsZWQ6IGlzUGVyY3lFbmFibGVkLFxuICAgICAgd2FpdEZvclBlcmN5SWRsZTogd2FpdEZvclBlcmN5SWRsZSxcbiAgICAgIGZldGNoUGVyY3lET006IGZldGNoUGVyY3lET00sXG4gICAgICBwb3N0U25hcHNob3Q6IHBvc3RTbmFwc2hvdCxcbiAgICAgIHBvc3RDb21wYXJpc29uOiBwb3N0Q29tcGFyaXNvbixcbiAgICAgIGZsdXNoU25hcHNob3RzOiBmbHVzaFNuYXBzaG90cyxcbiAgICAgIGNhcHR1cmVBdXRvbWF0ZVNjcmVlbnNob3Q6IGNhcHR1cmVBdXRvbWF0ZVNjcmVlbnNob3QsXG4gICAgICBwb3N0QnVpbGRFdmVudHM6IHBvc3RCdWlsZEV2ZW50cyxcbiAgICAgICdkZWZhdWx0JzogaW5kZXhcbiAgICB9KTtcblxuICAgIGV4cG9ydHMuY2FwdHVyZUF1dG9tYXRlU2NyZWVuc2hvdCA9IGNhcHR1cmVBdXRvbWF0ZVNjcmVlbnNob3Q7XG4gICAgZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBpbmRleDtcbiAgICBleHBvcnRzLmZldGNoUGVyY3lET00gPSBmZXRjaFBlcmN5RE9NO1xuICAgIGV4cG9ydHMuZmx1c2hTbmFwc2hvdHMgPSBmbHVzaFNuYXBzaG90cztcbiAgICBleHBvcnRzLmlzUGVyY3lFbmFibGVkID0gaXNQZXJjeUVuYWJsZWQ7XG4gICAgZXhwb3J0cy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgZXhwb3J0cy5wZXJjeSA9IGluZm87XG4gICAgZXhwb3J0cy5wb3N0QnVpbGRFdmVudHMgPSBwb3N0QnVpbGRFdmVudHM7XG4gICAgZXhwb3J0cy5wb3N0Q29tcGFyaXNvbiA9IHBvc3RDb21wYXJpc29uO1xuICAgIGV4cG9ydHMucG9zdFNuYXBzaG90ID0gcG9zdFNuYXBzaG90O1xuICAgIGV4cG9ydHMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgZXhwb3J0cy53YWl0Rm9yUGVyY3lJZGxlID0gd2FpdEZvclBlcmN5SWRsZTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbiAgfSkodGhpcy5QZXJjeVNES1V0aWxzID0gdGhpcy5QZXJjeVNES1V0aWxzIHx8IHt9KTtcbn0pLmNhbGwod2luZG93KTtcblxuaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShcIkBwZXJjeS9zZGstdXRpbHNcIiwgW10sICgpID0+IHdpbmRvdy5QZXJjeVNES1V0aWxzKTtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy5QZXJjeVNES1V0aWxzO1xufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxuLy8gU3VwcG9ydCBkZWNvZGluZyBVUkwtc2FmZSBiYXNlNjQgc3RyaW5ncywgYXMgTm9kZS5qcyBkb2VzLlxuLy8gU2VlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CYXNlNjQjVVJMX2FwcGxpY2F0aW9uc1xucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gZ2V0TGVucyAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG5cbiAgaWYgKGxlbiAlIDQgPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0JylcbiAgfVxuXG4gIC8vIFRyaW0gb2ZmIGV4dHJhIGJ5dGVzIGFmdGVyIHBsYWNlaG9sZGVyIGJ5dGVzIGFyZSBmb3VuZFxuICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9iZWF0Z2FtbWl0L2Jhc2U2NC1qcy9pc3N1ZXMvNDJcbiAgdmFyIHZhbGlkTGVuID0gYjY0LmluZGV4T2YoJz0nKVxuICBpZiAodmFsaWRMZW4gPT09IC0xKSB2YWxpZExlbiA9IGxlblxuXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSB2YWxpZExlbiA9PT0gbGVuXG4gICAgPyAwXG4gICAgOiA0IC0gKHZhbGlkTGVuICUgNClcblxuICByZXR1cm4gW3ZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW5dXG59XG5cbi8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIF9ieXRlTGVuZ3RoIChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pIHtcbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG5cbiAgdmFyIGFyciA9IG5ldyBBcnIoX2J5dGVMZW5ndGgoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSlcblxuICB2YXIgY3VyQnl0ZSA9IDBcblxuICAvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG4gIHZhciBsZW4gPSBwbGFjZUhvbGRlcnNMZW4gPiAwXG4gICAgPyB2YWxpZExlbiAtIDRcbiAgICA6IHZhbGlkTGVuXG5cbiAgdmFyIGlcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgMTIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA8PCA2KSB8XG4gICAgICByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMikge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPj4gNClcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDEpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCA0KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPj4gMilcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG4gIHJldHVybiBsb29rdXBbbnVtID4+IDE4ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gMTIgJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gJiAweDNGXVxufVxuXG5mdW5jdGlvbiBlbmNvZGVDaHVuayAodWludDgsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHRtcFxuICB2YXIgb3V0cHV0ID0gW11cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDMpIHtcbiAgICB0bXAgPVxuICAgICAgKCh1aW50OFtpXSA8PCAxNikgJiAweEZGMDAwMCkgK1xuICAgICAgKCh1aW50OFtpICsgMV0gPDwgOCkgJiAweEZGMDApICtcbiAgICAgICh1aW50OFtpICsgMl0gJiAweEZGKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgcGFydHMgPSBbXVxuICB2YXIgbWF4Q2h1bmtMZW5ndGggPSAxNjM4MyAvLyBtdXN0IGJlIG11bHRpcGxlIG9mIDNcblxuICAvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG4gIGZvciAodmFyIGkgPSAwLCBsZW4yID0gbGVuIC0gZXh0cmFCeXRlczsgaSA8IGxlbjI7IGkgKz0gbWF4Q2h1bmtMZW5ndGgpIHtcbiAgICBwYXJ0cy5wdXNoKGVuY29kZUNodW5rKHVpbnQ4LCBpLCAoaSArIG1heENodW5rTGVuZ3RoKSA+IGxlbjIgPyBsZW4yIDogKGkgKyBtYXhDaHVua0xlbmd0aCkpKVxuICB9XG5cbiAgLy8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuICBpZiAoZXh0cmFCeXRlcyA9PT0gMSkge1xuICAgIHRtcCA9IHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgNCkgJiAweDNGXSArXG4gICAgICAnPT0nXG4gICAgKVxuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDEwXSArXG4gICAgICBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl0gK1xuICAgICAgJz0nXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oJycpXG59XG4iLCIvKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxuY29uc3QgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxuY29uc3QgY3VzdG9tSW5zcGVjdFN5bWJvbCA9XG4gICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2xbJ2ZvciddID09PSAnZnVuY3Rpb24nKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGRvdC1ub3RhdGlvblxuICAgID8gU3ltYm9sWydmb3InXSgnbm9kZWpzLnV0aWwuaW5zcGVjdC5jdXN0b20nKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGRvdC1ub3RhdGlvblxuICAgIDogbnVsbFxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gU2xvd0J1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5cbmNvbnN0IEtfTUFYX0xFTkdUSCA9IDB4N2ZmZmZmZmZcbmV4cG9ydHMua01heExlbmd0aCA9IEtfTUFYX0xFTkdUSFxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBQcmludCB3YXJuaW5nIGFuZCByZWNvbW1lbmQgdXNpbmcgYGJ1ZmZlcmAgdjQueCB3aGljaCBoYXMgYW4gT2JqZWN0XG4gKiAgICAgICAgICAgICAgIGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBXZSByZXBvcnQgdGhhdCB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBpZiB0aGUgYXJlIG5vdCBzdWJjbGFzc2FibGVcbiAqIHVzaW5nIF9fcHJvdG9fXy4gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWBcbiAqIChTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOCkuIElFIDEwIGxhY2tzIHN1cHBvcnRcbiAqIGZvciBfX3Byb3RvX18gYW5kIGhhcyBhIGJ1Z2d5IHR5cGVkIGFycmF5IGltcGxlbWVudGF0aW9uLlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IHR5cGVkQXJyYXlTdXBwb3J0KClcblxuaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICBjb25zb2xlLmVycm9yKFxuICAgICdUaGlzIGJyb3dzZXIgbGFja3MgdHlwZWQgYXJyYXkgKFVpbnQ4QXJyYXkpIHN1cHBvcnQgd2hpY2ggaXMgcmVxdWlyZWQgYnkgJyArXG4gICAgJ2BidWZmZXJgIHY1LnguIFVzZSBgYnVmZmVyYCB2NC54IGlmIHlvdSByZXF1aXJlIG9sZCBicm93c2VyIHN1cHBvcnQuJ1xuICApXG59XG5cbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgLy8gQ2FuIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkP1xuICB0cnkge1xuICAgIGNvbnN0IGFyciA9IG5ldyBVaW50OEFycmF5KDEpXG4gICAgY29uc3QgcHJvdG8gPSB7IGZvbzogZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfSB9XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHByb3RvLCBVaW50OEFycmF5LnByb3RvdHlwZSlcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoYXJyLCBwcm90bylcbiAgICByZXR1cm4gYXJyLmZvbygpID09PSA0MlxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlci5wcm90b3R5cGUsICdwYXJlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKHRoaXMpKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgcmV0dXJuIHRoaXMuYnVmZmVyXG4gIH1cbn0pXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdWZmZXIucHJvdG90eXBlLCAnb2Zmc2V0Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0aGlzKSkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIHJldHVybiB0aGlzLmJ5dGVPZmZzZXRcbiAgfVxufSlcblxuZnVuY3Rpb24gY3JlYXRlQnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKGxlbmd0aCA+IEtfTUFYX0xFTkdUSCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgXCInICsgbGVuZ3RoICsgJ1wiIGlzIGludmFsaWQgZm9yIG9wdGlvbiBcInNpemVcIicpXG4gIH1cbiAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2VcbiAgY29uc3QgYnVmID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YoYnVmLCBCdWZmZXIucHJvdG90eXBlKVxuICByZXR1cm4gYnVmXG59XG5cbi8qKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBoYXZlIHRoZWlyXG4gKiBwcm90b3R5cGUgY2hhbmdlZCB0byBgQnVmZmVyLnByb3RvdHlwZWAuIEZ1cnRoZXJtb3JlLCBgQnVmZmVyYCBpcyBhIHN1YmNsYXNzIG9mXG4gKiBgVWludDhBcnJheWAsIHNvIHRoZSByZXR1cm5lZCBpbnN0YW5jZXMgd2lsbCBoYXZlIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBtZXRob2RzXG4gKiBhbmQgdGhlIGBVaW50OEFycmF5YCBtZXRob2RzLiBTcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdFxuICogcmV0dXJucyBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBUaGUgYFVpbnQ4QXJyYXlgIHByb3RvdHlwZSByZW1haW5zIHVubW9kaWZpZWQuXG4gKi9cblxuZnVuY3Rpb24gQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICAvLyBDb21tb24gY2FzZS5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZ09yT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgJ1RoZSBcInN0cmluZ1wiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBzdHJpbmcuIFJlY2VpdmVkIHR5cGUgbnVtYmVyJ1xuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gYWxsb2NVbnNhZmUoYXJnKVxuICB9XG4gIHJldHVybiBmcm9tKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyIC8vIG5vdCB1c2VkIGJ5IHRoaXMgaW1wbGVtZW50YXRpb25cblxuZnVuY3Rpb24gZnJvbSAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmcm9tU3RyaW5nKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0KVxuICB9XG5cbiAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5Vmlldyh2YWx1ZSlcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCAnICtcbiAgICAgICdvciBBcnJheS1saWtlIE9iamVjdC4gUmVjZWl2ZWQgdHlwZSAnICsgKHR5cGVvZiB2YWx1ZSlcbiAgICApXG4gIH1cblxuICBpZiAoaXNJbnN0YW5jZSh2YWx1ZSwgQXJyYXlCdWZmZXIpIHx8XG4gICAgICAodmFsdWUgJiYgaXNJbnN0YW5jZSh2YWx1ZS5idWZmZXIsIEFycmF5QnVmZmVyKSkpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgKGlzSW5zdGFuY2UodmFsdWUsIFNoYXJlZEFycmF5QnVmZmVyKSB8fFxuICAgICAgKHZhbHVlICYmIGlzSW5zdGFuY2UodmFsdWUuYnVmZmVyLCBTaGFyZWRBcnJheUJ1ZmZlcikpKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUaGUgXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIG9mIHR5cGUgbnVtYmVyLiBSZWNlaXZlZCB0eXBlIG51bWJlcidcbiAgICApXG4gIH1cblxuICBjb25zdCB2YWx1ZU9mID0gdmFsdWUudmFsdWVPZiAmJiB2YWx1ZS52YWx1ZU9mKClcbiAgaWYgKHZhbHVlT2YgIT0gbnVsbCAmJiB2YWx1ZU9mICE9PSB2YWx1ZSkge1xuICAgIHJldHVybiBCdWZmZXIuZnJvbSh2YWx1ZU9mLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBjb25zdCBiID0gZnJvbU9iamVjdCh2YWx1ZSlcbiAgaWYgKGIpIHJldHVybiBiXG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1ByaW1pdGl2ZSAhPSBudWxsICYmXG4gICAgICB0eXBlb2YgdmFsdWVbU3ltYm9sLnRvUHJpbWl0aXZlXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBCdWZmZXIuZnJvbSh2YWx1ZVtTeW1ib2wudG9QcmltaXRpdmVdKCdzdHJpbmcnKSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAnVGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgb25lIG9mIHR5cGUgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgJyArXG4gICAgJ29yIEFycmF5LWxpa2UgT2JqZWN0LiBSZWNlaXZlZCB0eXBlICcgKyAodHlwZW9mIHZhbHVlKVxuICApXG59XG5cbi8qKlxuICogRnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gQnVmZmVyKGFyZywgZW5jb2RpbmcpIGJ1dCB0aHJvd3MgYSBUeXBlRXJyb3JcbiAqIGlmIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQnVmZmVyLmZyb20oc3RyWywgZW5jb2RpbmddKVxuICogQnVmZmVyLmZyb20oYXJyYXkpXG4gKiBCdWZmZXIuZnJvbShidWZmZXIpXG4gKiBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlclssIGJ5dGVPZmZzZXRbLCBsZW5ndGhdXSlcbiAqKi9cbkJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGZyb20odmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuLy8gTm90ZTogQ2hhbmdlIHByb3RvdHlwZSAqYWZ0ZXIqIEJ1ZmZlci5mcm9tIGlzIGRlZmluZWQgdG8gd29ya2Fyb3VuZCBDaHJvbWUgYnVnOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvcHVsbC8xNDhcbk9iamVjdC5zZXRQcm90b3R5cGVPZihCdWZmZXIucHJvdG90eXBlLCBVaW50OEFycmF5LnByb3RvdHlwZSlcbk9iamVjdC5zZXRQcm90b3R5cGVPZihCdWZmZXIsIFVpbnQ4QXJyYXkpXG5cbmZ1bmN0aW9uIGFzc2VydFNpemUgKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBudW1iZXInKVxuICB9IGVsc2UgaWYgKHNpemUgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBcIicgKyBzaXplICsgJ1wiIGlzIGludmFsaWQgZm9yIG9wdGlvbiBcInNpemVcIicpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb2MgKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiBjcmVhdGVCdWZmZXIoc2l6ZSlcbiAgfVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSBwYXkgYXR0ZW50aW9uIHRvIGVuY29kaW5nIGlmIGl0J3MgYSBzdHJpbmcuIFRoaXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsbHkgc2VuZGluZyBpbiBhIG51bWJlciB0aGF0IHdvdWxkXG4gICAgLy8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBzdGFydCBvZmZzZXQuXG4gICAgcmV0dXJuIHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZydcbiAgICAgID8gY3JlYXRlQnVmZmVyKHNpemUpLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgICA6IGNyZWF0ZUJ1ZmZlcihzaXplKS5maWxsKGZpbGwpXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIGFsbG9jKHNpemVbLCBmaWxsWywgZW5jb2RpbmddXSlcbiAqKi9cbkJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICByZXR1cm4gYWxsb2Moc2l6ZSwgZmlsbCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGFsbG9jVW5zYWZlIChzaXplKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplIDwgMCA/IDAgOiBjaGVja2VkKHNpemUpIHwgMClcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgfVxuXG4gIGNvbnN0IGxlbmd0aCA9IGJ5dGVMZW5ndGgoc3RyaW5nLCBlbmNvZGluZykgfCAwXG4gIGxldCBidWYgPSBjcmVhdGVCdWZmZXIobGVuZ3RoKVxuXG4gIGNvbnN0IGFjdHVhbCA9IGJ1Zi53cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuXG4gIGlmIChhY3R1YWwgIT09IGxlbmd0aCkge1xuICAgIC8vIFdyaXRpbmcgYSBoZXggc3RyaW5nLCBmb3IgZXhhbXBsZSwgdGhhdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgd2lsbFxuICAgIC8vIGNhdXNlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IGludmFsaWQgY2hhcmFjdGVyIHRvIGJlIGlnbm9yZWQuIChlLmcuXG4gICAgLy8gJ2FieHhjZCcgd2lsbCBiZSB0cmVhdGVkIGFzICdhYicpXG4gICAgYnVmID0gYnVmLnNsaWNlKDAsIGFjdHVhbClcbiAgfVxuXG4gIHJldHVybiBidWZcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAoYXJyYXkpIHtcbiAgY29uc3QgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIDwgMCA/IDAgOiBjaGVja2VkKGFycmF5Lmxlbmd0aCkgfCAwXG4gIGNvbnN0IGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW5ndGgpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICBidWZbaV0gPSBhcnJheVtpXSAmIDI1NVxuICB9XG4gIHJldHVybiBidWZcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5VmlldyAoYXJyYXlWaWV3KSB7XG4gIGlmIChpc0luc3RhbmNlKGFycmF5VmlldywgVWludDhBcnJheSkpIHtcbiAgICBjb25zdCBjb3B5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlWaWV3KVxuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIoY29weS5idWZmZXIsIGNvcHkuYnl0ZU9mZnNldCwgY29weS5ieXRlTGVuZ3RoKVxuICB9XG4gIHJldHVybiBmcm9tQXJyYXlMaWtlKGFycmF5Vmlldylcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5QnVmZmVyIChhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcIm9mZnNldFwiIGlzIG91dHNpZGUgb2YgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQgKyAobGVuZ3RoIHx8IDApKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wibGVuZ3RoXCIgaXMgb3V0c2lkZSBvZiBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGxldCBidWZcbiAgaWYgKGJ5dGVPZmZzZXQgPT09IHVuZGVmaW5lZCAmJiBsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGFycmF5KVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYnVmID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgYnVmID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihidWYsIEJ1ZmZlci5wcm90b3R5cGUpXG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tT2JqZWN0IChvYmopIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB7XG4gICAgY29uc3QgbGVuID0gY2hlY2tlZChvYmoubGVuZ3RoKSB8IDBcbiAgICBjb25zdCBidWYgPSBjcmVhdGVCdWZmZXIobGVuKVxuXG4gICAgaWYgKGJ1Zi5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBidWZcbiAgICB9XG5cbiAgICBvYmouY29weShidWYsIDAsIDAsIGxlbilcbiAgICByZXR1cm4gYnVmXG4gIH1cblxuICBpZiAob2JqLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHR5cGVvZiBvYmoubGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBudW1iZXJJc05hTihvYmoubGVuZ3RoKSkge1xuICAgICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcigwKVxuICAgIH1cbiAgICByZXR1cm4gZnJvbUFycmF5TGlrZShvYmopXG4gIH1cblxuICBpZiAob2JqLnR5cGUgPT09ICdCdWZmZXInICYmIEFycmF5LmlzQXJyYXkob2JqLmRhdGEpKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUxpa2Uob2JqLmRhdGEpXG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tlZCAobGVuZ3RoKSB7XG4gIC8vIE5vdGU6IGNhbm5vdCB1c2UgYGxlbmd0aCA8IEtfTUFYX0xFTkdUSGAgaGVyZSBiZWNhdXNlIHRoYXQgZmFpbHMgd2hlblxuICAvLyBsZW5ndGggaXMgTmFOICh3aGljaCBpcyBvdGhlcndpc2UgY29lcmNlZCB0byB6ZXJvLilcbiAgaWYgKGxlbmd0aCA+PSBLX01BWF9MRU5HVEgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byBhbGxvY2F0ZSBCdWZmZXIgbGFyZ2VyIHRoYW4gbWF4aW11bSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnc2l6ZTogMHgnICsgS19NQVhfTEVOR1RILnRvU3RyaW5nKDE2KSArICcgYnl0ZXMnKVxuICB9XG4gIHJldHVybiBsZW5ndGggfCAwXG59XG5cbmZ1bmN0aW9uIFNsb3dCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAoK2xlbmd0aCAhPSBsZW5ndGgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcbiAgICBsZW5ndGggPSAwXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlci5hbGxvYygrbGVuZ3RoKVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlciAoYikge1xuICByZXR1cm4gYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyID09PSB0cnVlICYmXG4gICAgYiAhPT0gQnVmZmVyLnByb3RvdHlwZSAvLyBzbyBCdWZmZXIuaXNCdWZmZXIoQnVmZmVyLnByb3RvdHlwZSkgd2lsbCBiZSBmYWxzZVxufVxuXG5CdWZmZXIuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKGEsIGIpIHtcbiAgaWYgKGlzSW5zdGFuY2UoYSwgVWludDhBcnJheSkpIGEgPSBCdWZmZXIuZnJvbShhLCBhLm9mZnNldCwgYS5ieXRlTGVuZ3RoKVxuICBpZiAoaXNJbnN0YW5jZShiLCBVaW50OEFycmF5KSkgYiA9IEJ1ZmZlci5mcm9tKGIsIGIub2Zmc2V0LCBiLmJ5dGVMZW5ndGgpXG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBcImJ1ZjFcIiwgXCJidWYyXCIgYXJndW1lbnRzIG11c3QgYmUgb25lIG9mIHR5cGUgQnVmZmVyIG9yIFVpbnQ4QXJyYXknXG4gICAgKVxuICB9XG5cbiAgaWYgKGEgPT09IGIpIHJldHVybiAwXG5cbiAgbGV0IHggPSBhLmxlbmd0aFxuICBsZXQgeSA9IGIubGVuZ3RoXG5cbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV1cbiAgICAgIHkgPSBiW2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiBpc0VuY29kaW5nIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdsYXRpbjEnOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCAobGlzdCwgbGVuZ3RoKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShsaXN0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gIH1cblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gQnVmZmVyLmFsbG9jKDApXG4gIH1cblxuICBsZXQgaVxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShsZW5ndGgpXG4gIGxldCBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgbGV0IGJ1ZiA9IGxpc3RbaV1cbiAgICBpZiAoaXNJbnN0YW5jZShidWYsIFVpbnQ4QXJyYXkpKSB7XG4gICAgICBpZiAocG9zICsgYnVmLmxlbmd0aCA+IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgYnVmID0gQnVmZmVyLmZyb20oYnVmKVxuICAgICAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgICAgIGJ1ZmZlcixcbiAgICAgICAgICBidWYsXG4gICAgICAgICAgcG9zXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgfVxuICAgIHBvcyArPSBidWYubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoXG4gIH1cbiAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhzdHJpbmcpIHx8IGlzSW5zdGFuY2Uoc3RyaW5nLCBBcnJheUJ1ZmZlcikpIHtcbiAgICByZXR1cm4gc3RyaW5nLmJ5dGVMZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBcInN0cmluZ1wiIGFyZ3VtZW50IG11c3QgYmUgb25lIG9mIHR5cGUgc3RyaW5nLCBCdWZmZXIsIG9yIEFycmF5QnVmZmVyLiAnICtcbiAgICAgICdSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2Ygc3RyaW5nXG4gICAgKVxuICB9XG5cbiAgY29uc3QgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBjb25zdCBtdXN0TWF0Y2ggPSAoYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdID09PSB0cnVlKVxuICBpZiAoIW11c3RNYXRjaCAmJiBsZW4gPT09IDApIHJldHVybiAwXG5cbiAgLy8gVXNlIGEgZm9yIGxvb3AgdG8gYXZvaWQgcmVjdXJzaW9uXG4gIGxldCBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxlblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHtcbiAgICAgICAgICByZXR1cm4gbXVzdE1hdGNoID8gLTEgOiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICB9XG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcblxuZnVuY3Rpb24gc2xvd1RvU3RyaW5nIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICBsZXQgbG93ZXJlZENhc2UgPSBmYWxzZVxuXG4gIC8vIE5vIG5lZWQgdG8gdmVyaWZ5IHRoYXQgXCJ0aGlzLmxlbmd0aCA8PSBNQVhfVUlOVDMyXCIgc2luY2UgaXQncyBhIHJlYWQtb25seVxuICAvLyBwcm9wZXJ0eSBvZiBhIHR5cGVkIGFycmF5LlxuXG4gIC8vIFRoaXMgYmVoYXZlcyBuZWl0aGVyIGxpa2UgU3RyaW5nIG5vciBVaW50OEFycmF5IGluIHRoYXQgd2Ugc2V0IHN0YXJ0L2VuZFxuICAvLyB0byB0aGVpciB1cHBlci9sb3dlciBib3VuZHMgaWYgdGhlIHZhbHVlIHBhc3NlZCBpcyBvdXQgb2YgcmFuZ2UuXG4gIC8vIHVuZGVmaW5lZCBpcyBoYW5kbGVkIHNwZWNpYWxseSBhcyBwZXIgRUNNQS0yNjIgNnRoIEVkaXRpb24sXG4gIC8vIFNlY3Rpb24gMTMuMy4zLjcgUnVudGltZSBTZW1hbnRpY3M6IEtleWVkQmluZGluZ0luaXRpYWxpemF0aW9uLlxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCB8fCBzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICAvLyBSZXR1cm4gZWFybHkgaWYgc3RhcnQgPiB0aGlzLmxlbmd0aC4gRG9uZSBoZXJlIHRvIHByZXZlbnQgcG90ZW50aWFsIHVpbnQzMlxuICAvLyBjb2VyY2lvbiBmYWlsIGJlbG93LlxuICBpZiAoc3RhcnQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkIHx8IGVuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChlbmQgPD0gMCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgLy8gRm9yY2UgY29lcmNpb24gdG8gdWludDMyLiBUaGlzIHdpbGwgYWxzbyBjb2VyY2UgZmFsc2V5L05hTiB2YWx1ZXMgdG8gMC5cbiAgZW5kID4+Pj0gMFxuICBzdGFydCA+Pj49IDBcblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHV0ZjE2bGVTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoZW5jb2RpbmcgKyAnJykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuLy8gVGhpcyBwcm9wZXJ0eSBpcyB1c2VkIGJ5IGBCdWZmZXIuaXNCdWZmZXJgIChhbmQgdGhlIGBpcy1idWZmZXJgIG5wbSBwYWNrYWdlKVxuLy8gdG8gZGV0ZWN0IGEgQnVmZmVyIGluc3RhbmNlLiBJdCdzIG5vdCBwb3NzaWJsZSB0byB1c2UgYGluc3RhbmNlb2YgQnVmZmVyYFxuLy8gcmVsaWFibHkgaW4gYSBicm93c2VyaWZ5IGNvbnRleHQgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBtdWx0aXBsZSBkaWZmZXJlbnRcbi8vIGNvcGllcyBvZiB0aGUgJ2J1ZmZlcicgcGFja2FnZSBpbiB1c2UuIFRoaXMgbWV0aG9kIHdvcmtzIGV2ZW4gZm9yIEJ1ZmZlclxuLy8gaW5zdGFuY2VzIHRoYXQgd2VyZSBjcmVhdGVkIGZyb20gYW5vdGhlciBjb3B5IG9mIHRoZSBgYnVmZmVyYCBwYWNrYWdlLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9pc3N1ZXMvMTU0XG5CdWZmZXIucHJvdG90eXBlLl9pc0J1ZmZlciA9IHRydWVcblxuZnVuY3Rpb24gc3dhcCAoYiwgbiwgbSkge1xuICBjb25zdCBpID0gYltuXVxuICBiW25dID0gYlttXVxuICBiW21dID0gaVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAxNiA9IGZ1bmN0aW9uIHN3YXAxNiAoKSB7XG4gIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA0ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAzMi1iaXRzJylcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgMilcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXA2NCA9IGZ1bmN0aW9uIHN3YXA2NCAoKSB7XG4gIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA4ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA2NC1iaXRzJylcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSA4KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgNylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgNilcbiAgICBzd2FwKHRoaXMsIGkgKyAyLCBpICsgNSlcbiAgICBzd2FwKHRoaXMsIGkgKyAzLCBpICsgNClcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICBjb25zdCBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB1dGY4U2xpY2UodGhpcywgMCwgbGVuZ3RoKVxuICByZXR1cm4gc2xvd1RvU3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0xvY2FsZVN0cmluZyA9IEJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmdcblxuQnVmZmVyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICBpZiAodGhpcyA9PT0gYikgcmV0dXJuIHRydWVcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpID09PSAwXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICBsZXQgc3RyID0gJydcbiAgY29uc3QgbWF4ID0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFU1xuICBzdHIgPSB0aGlzLnRvU3RyaW5nKCdoZXgnLCAwLCBtYXgpLnJlcGxhY2UoLyguezJ9KS9nLCAnJDEgJykudHJpbSgpXG4gIGlmICh0aGlzLmxlbmd0aCA+IG1heCkgc3RyICs9ICcgLi4uICdcbiAgcmV0dXJuICc8QnVmZmVyICcgKyBzdHIgKyAnPidcbn1cbmlmIChjdXN0b21JbnNwZWN0U3ltYm9sKSB7XG4gIEJ1ZmZlci5wcm90b3R5cGVbY3VzdG9tSW5zcGVjdFN5bWJvbF0gPSBCdWZmZXIucHJvdG90eXBlLmluc3BlY3Rcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAodGFyZ2V0LCBzdGFydCwgZW5kLCB0aGlzU3RhcnQsIHRoaXNFbmQpIHtcbiAgaWYgKGlzSW5zdGFuY2UodGFyZ2V0LCBVaW50OEFycmF5KSkge1xuICAgIHRhcmdldCA9IEJ1ZmZlci5mcm9tKHRhcmdldCwgdGFyZ2V0Lm9mZnNldCwgdGFyZ2V0LmJ5dGVMZW5ndGgpXG4gIH1cbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGFyZ2V0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwidGFyZ2V0XCIgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBCdWZmZXIgb3IgVWludDhBcnJheS4gJyArXG4gICAgICAnUmVjZWl2ZWQgdHlwZSAnICsgKHR5cGVvZiB0YXJnZXQpXG4gICAgKVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmQgPSB0YXJnZXQgPyB0YXJnZXQubGVuZ3RoIDogMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNTdGFydCA9IDBcbiAgfVxuICBpZiAodGhpc0VuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc0VuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoc3RhcnQgPCAwIHx8IGVuZCA+IHRhcmdldC5sZW5ndGggfHwgdGhpc1N0YXJ0IDwgMCB8fCB0aGlzRW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCAmJiBzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCkge1xuICAgIHJldHVybiAtMVxuICB9XG4gIGlmIChzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgc3RhcnQgPj4+PSAwXG4gIGVuZCA+Pj49IDBcbiAgdGhpc1N0YXJ0ID4+Pj0gMFxuICB0aGlzRW5kID4+Pj0gMFxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQpIHJldHVybiAwXG5cbiAgbGV0IHggPSB0aGlzRW5kIC0gdGhpc1N0YXJ0XG4gIGxldCB5ID0gZW5kIC0gc3RhcnRcbiAgY29uc3QgbGVuID0gTWF0aC5taW4oeCwgeSlcblxuICBjb25zdCB0aGlzQ29weSA9IHRoaXMuc2xpY2UodGhpc1N0YXJ0LCB0aGlzRW5kKVxuICBjb25zdCB0YXJnZXRDb3B5ID0gdGFyZ2V0LnNsaWNlKHN0YXJ0LCBlbmQpXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIGlmICh0aGlzQ29weVtpXSAhPT0gdGFyZ2V0Q29weVtpXSkge1xuICAgICAgeCA9IHRoaXNDb3B5W2ldXG4gICAgICB5ID0gdGFyZ2V0Q29weVtpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbi8vIEZpbmRzIGVpdGhlciB0aGUgZmlyc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0ID49IGBieXRlT2Zmc2V0YCxcbi8vIE9SIHRoZSBsYXN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA8PSBgYnl0ZU9mZnNldGAuXG4vL1xuLy8gQXJndW1lbnRzOlxuLy8gLSBidWZmZXIgLSBhIEJ1ZmZlciB0byBzZWFyY2hcbi8vIC0gdmFsIC0gYSBzdHJpbmcsIEJ1ZmZlciwgb3IgbnVtYmVyXG4vLyAtIGJ5dGVPZmZzZXQgLSBhbiBpbmRleCBpbnRvIGBidWZmZXJgOyB3aWxsIGJlIGNsYW1wZWQgdG8gYW4gaW50MzJcbi8vIC0gZW5jb2RpbmcgLSBhbiBvcHRpb25hbCBlbmNvZGluZywgcmVsZXZhbnQgaXMgdmFsIGlzIGEgc3RyaW5nXG4vLyAtIGRpciAtIHRydWUgZm9yIGluZGV4T2YsIGZhbHNlIGZvciBsYXN0SW5kZXhPZlxuZnVuY3Rpb24gYmlkaXJlY3Rpb25hbEluZGV4T2YgKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIC8vIEVtcHR5IGJ1ZmZlciBtZWFucyBubyBtYXRjaFxuICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMCkgcmV0dXJuIC0xXG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXRcbiAgaWYgKHR5cGVvZiBieXRlT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gYnl0ZU9mZnNldFxuICAgIGJ5dGVPZmZzZXQgPSAwXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA+IDB4N2ZmZmZmZmYpIHtcbiAgICBieXRlT2Zmc2V0ID0gMHg3ZmZmZmZmZlxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAtMHg4MDAwMDAwMCkge1xuICAgIGJ5dGVPZmZzZXQgPSAtMHg4MDAwMDAwMFxuICB9XG4gIGJ5dGVPZmZzZXQgPSArYnl0ZU9mZnNldCAvLyBDb2VyY2UgdG8gTnVtYmVyLlxuICBpZiAobnVtYmVySXNOYU4oYnl0ZU9mZnNldCkpIHtcbiAgICAvLyBieXRlT2Zmc2V0OiBpdCBpdCdzIHVuZGVmaW5lZCwgbnVsbCwgTmFOLCBcImZvb1wiLCBldGMsIHNlYXJjaCB3aG9sZSBidWZmZXJcbiAgICBieXRlT2Zmc2V0ID0gZGlyID8gMCA6IChidWZmZXIubGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0OiBuZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggKyBieXRlT2Zmc2V0XG4gIGlmIChieXRlT2Zmc2V0ID49IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICBpZiAoZGlyKSByZXR1cm4gLTFcbiAgICBlbHNlIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoIC0gMVxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAwKSB7XG4gICAgaWYgKGRpcikgYnl0ZU9mZnNldCA9IDBcbiAgICBlbHNlIHJldHVybiAtMVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIHZhbFxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICB9XG5cbiAgLy8gRmluYWxseSwgc2VhcmNoIGVpdGhlciBpbmRleE9mIChpZiBkaXIgaXMgdHJ1ZSkgb3IgbGFzdEluZGV4T2ZcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWwpKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlOiBsb29raW5nIGZvciBlbXB0eSBzdHJpbmcvYnVmZmVyIGFsd2F5cyBmYWlsc1xuICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDB4RkYgLy8gU2VhcmNoIGZvciBhIGJ5dGUgdmFsdWUgWzAtMjU1XVxuICAgIGlmICh0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGRpcikge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCBbdmFsXSwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlcicpXG59XG5cbmZ1bmN0aW9uIGFycmF5SW5kZXhPZiAoYXJyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgbGV0IGluZGV4U2l6ZSA9IDFcbiAgbGV0IGFyckxlbmd0aCA9IGFyci5sZW5ndGhcbiAgbGV0IHZhbExlbmd0aCA9IHZhbC5sZW5ndGhcblxuICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKGVuY29kaW5nID09PSAndWNzMicgfHwgZW5jb2RpbmcgPT09ICd1Y3MtMicgfHxcbiAgICAgICAgZW5jb2RpbmcgPT09ICd1dGYxNmxlJyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi0xNmxlJykge1xuICAgICAgaWYgKGFyci5sZW5ndGggPCAyIHx8IHZhbC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfVxuICAgICAgaW5kZXhTaXplID0gMlxuICAgICAgYXJyTGVuZ3RoIC89IDJcbiAgICAgIHZhbExlbmd0aCAvPSAyXG4gICAgICBieXRlT2Zmc2V0IC89IDJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChidWYsIGkpIHtcbiAgICBpZiAoaW5kZXhTaXplID09PSAxKSB7XG4gICAgICByZXR1cm4gYnVmW2ldXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBidWYucmVhZFVJbnQxNkJFKGkgKiBpbmRleFNpemUpXG4gICAgfVxuICB9XG5cbiAgbGV0IGlcbiAgaWYgKGRpcikge1xuICAgIGxldCBmb3VuZEluZGV4ID0gLTFcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChyZWFkKGFyciwgaSkgPT09IHJlYWQodmFsLCBmb3VuZEluZGV4ID09PSAtMSA/IDAgOiBpIC0gZm91bmRJbmRleCkpIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSBmb3VuZEluZGV4ID0gaVxuICAgICAgICBpZiAoaSAtIGZvdW5kSW5kZXggKyAxID09PSB2YWxMZW5ndGgpIHJldHVybiBmb3VuZEluZGV4ICogaW5kZXhTaXplXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIGkgLT0gaSAtIGZvdW5kSW5kZXhcbiAgICAgICAgZm91bmRJbmRleCA9IC0xXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChieXRlT2Zmc2V0ICsgdmFsTGVuZ3RoID4gYXJyTGVuZ3RoKSBieXRlT2Zmc2V0ID0gYXJyTGVuZ3RoIC0gdmFsTGVuZ3RoXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGxldCBmb3VuZCA9IHRydWVcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdmFsTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHJlYWQoYXJyLCBpICsgaikgIT09IHJlYWQodmFsLCBqKSkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gdGhpcy5pbmRleE9mKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpICE9PSAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCB0cnVlKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBoZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgY29uc3QgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGxldCBpXG4gIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBpZiAobnVtYmVySXNOYU4ocGFyc2VkKSkgcmV0dXJuIGlcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBwYXJzZWRcbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiB1dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBhc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGJhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiB1Y3MyV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gd3JpdGUgKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcpXG4gIGlmIChvZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgb2Zmc2V0WywgbGVuZ3RoXVssIGVuY29kaW5nXSlcbiAgfSBlbHNlIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGxlbmd0aCA9IGxlbmd0aCA+Pj4gMFxuICAgICAgaWYgKGVuY29kaW5nID09PSB1bmRlZmluZWQpIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgfSBlbHNlIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0J1ZmZlci53cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXRbLCBsZW5ndGhdKSBpcyBubyBsb25nZXIgc3VwcG9ydGVkJ1xuICAgIClcbiAgfVxuXG4gIGNvbnN0IHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCB8fCBsZW5ndGggPiByZW1haW5pbmcpIGxlbmd0aCA9IHJlbWFpbmluZ1xuXG4gIGlmICgoc3RyaW5nLmxlbmd0aCA+IDAgJiYgKGxlbmd0aCA8IDAgfHwgb2Zmc2V0IDwgMCkpIHx8IG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gd3JpdGUgb3V0c2lkZSBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgbGV0IGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgLy8gV2FybmluZzogbWF4TGVuZ3RoIG5vdCB0YWtlbiBpbnRvIGFjY291bnQgaW4gYmFzZTY0V3JpdGVcbiAgICAgICAgcmV0dXJuIGJhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1Y3MyV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG5mdW5jdGlvbiBiYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuICBjb25zdCByZXMgPSBbXVxuXG4gIGxldCBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICBjb25zdCBmaXJzdEJ5dGUgPSBidWZbaV1cbiAgICBsZXQgY29kZVBvaW50ID0gbnVsbFxuICAgIGxldCBieXRlc1BlclNlcXVlbmNlID0gKGZpcnN0Qnl0ZSA+IDB4RUYpXG4gICAgICA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpXG4gICAgICAgICAgPyAzXG4gICAgICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRilcbiAgICAgICAgICAgICAgPyAyXG4gICAgICAgICAgICAgIDogMVxuXG4gICAgaWYgKGkgKyBieXRlc1BlclNlcXVlbmNlIDw9IGVuZCkge1xuICAgICAgbGV0IHNlY29uZEJ5dGUsIHRoaXJkQnl0ZSwgZm91cnRoQnl0ZSwgdGVtcENvZGVQb2ludFxuXG4gICAgICBzd2l0Y2ggKGJ5dGVzUGVyU2VxdWVuY2UpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGlmIChmaXJzdEJ5dGUgPCAweDgwKSB7XG4gICAgICAgICAgICBjb2RlUG9pbnQgPSBmaXJzdEJ5dGVcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHgxRikgPDwgMHg2IHwgKHNlY29uZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4QyB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKHRoaXJkQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0ZGICYmICh0ZW1wQ29kZVBvaW50IDwgMHhEODAwIHx8IHRlbXBDb2RlUG9pbnQgPiAweERGRkYpKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGZvdXJ0aEJ5dGUgPSBidWZbaSArIDNdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwICYmIChmb3VydGhCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweDEyIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweEMgfCAodGhpcmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKGZvdXJ0aEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweEZGRkYgJiYgdGVtcENvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvZGVQb2ludCA9PT0gbnVsbCkge1xuICAgICAgLy8gd2UgZGlkIG5vdCBnZW5lcmF0ZSBhIHZhbGlkIGNvZGVQb2ludCBzbyBpbnNlcnQgYVxuICAgICAgLy8gcmVwbGFjZW1lbnQgY2hhciAoVStGRkZEKSBhbmQgYWR2YW5jZSBvbmx5IDEgYnl0ZVxuICAgICAgY29kZVBvaW50ID0gMHhGRkZEXG4gICAgICBieXRlc1BlclNlcXVlbmNlID0gMVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50ID4gMHhGRkZGKSB7XG4gICAgICAvLyBlbmNvZGUgdG8gdXRmMTYgKHN1cnJvZ2F0ZSBwYWlyIGRhbmNlKVxuICAgICAgY29kZVBvaW50IC09IDB4MTAwMDBcbiAgICAgIHJlcy5wdXNoKGNvZGVQb2ludCA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMClcbiAgICAgIGNvZGVQb2ludCA9IDB4REMwMCB8IGNvZGVQb2ludCAmIDB4M0ZGXG4gICAgfVxuXG4gICAgcmVzLnB1c2goY29kZVBvaW50KVxuICAgIGkgKz0gYnl0ZXNQZXJTZXF1ZW5jZVxuICB9XG5cbiAgcmV0dXJuIGRlY29kZUNvZGVQb2ludHNBcnJheShyZXMpXG59XG5cbi8vIEJhc2VkIG9uIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIyNzQ3MjcyLzY4MDc0MiwgdGhlIGJyb3dzZXIgd2l0aFxuLy8gdGhlIGxvd2VzdCBsaW1pdCBpcyBDaHJvbWUsIHdpdGggMHgxMDAwMCBhcmdzLlxuLy8gV2UgZ28gMSBtYWduaXR1ZGUgbGVzcywgZm9yIHNhZmV0eVxuY29uc3QgTUFYX0FSR1VNRU5UU19MRU5HVEggPSAweDEwMDBcblxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50c0FycmF5IChjb2RlUG9pbnRzKSB7XG4gIGNvbnN0IGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgbGV0IHJlcyA9ICcnXG4gIGxldCBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBsZXQgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGxhdGluMVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgbGV0IHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgY29uc3QgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIGxldCBvdXQgPSAnJ1xuICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIG91dCArPSBoZXhTbGljZUxvb2t1cFRhYmxlW2J1ZltpXV1cbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGNvbnN0IGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIGxldCByZXMgPSAnJ1xuICAvLyBJZiBieXRlcy5sZW5ndGggaXMgb2RkLCB0aGUgbGFzdCA4IGJpdHMgbXVzdCBiZSBpZ25vcmVkIChzYW1lIGFzIG5vZGUuanMpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoIC0gMTsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyAoYnl0ZXNbaSArIDFdICogMjU2KSlcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCkge1xuICBjb25zdCBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IH5+c3RhcnRcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB+fmVuZFxuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCArPSBsZW5cbiAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgfSBlbHNlIGlmIChzdGFydCA+IGxlbikge1xuICAgIHN0YXJ0ID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5cbiAgICBpZiAoZW5kIDwgMCkgZW5kID0gMFxuICB9IGVsc2UgaWYgKGVuZCA+IGxlbikge1xuICAgIGVuZCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIGNvbnN0IG5ld0J1ZiA9IHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZClcbiAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2VcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKG5ld0J1ZiwgQnVmZmVyLnByb3RvdHlwZSlcblxuICByZXR1cm4gbmV3QnVmXG59XG5cbi8qXG4gKiBOZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IGJ1ZmZlciBpc24ndCB0cnlpbmcgdG8gd3JpdGUgb3V0IG9mIGJvdW5kcy5cbiAqL1xuZnVuY3Rpb24gY2hlY2tPZmZzZXQgKG9mZnNldCwgZXh0LCBsZW5ndGgpIHtcbiAgaWYgKChvZmZzZXQgJSAxKSAhPT0gMCB8fCBvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb2Zmc2V0IGlzIG5vdCB1aW50JylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50TEUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludExFID0gZnVuY3Rpb24gcmVhZFVJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICBsZXQgdmFsID0gdGhpc1tvZmZzZXRdXG4gIGxldCBtdWwgPSAxXG4gIGxldCBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnRCRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50QkUgPSBmdW5jdGlvbiByZWFkVUludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcbiAgfVxuXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF1cbiAgbGV0IG11bCA9IDFcbiAgd2hpbGUgKGJ5dGVMZW5ndGggPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50OCA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIHJlYWRVSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50MTZMRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQxNkJFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCA4KSB8IHRoaXNbb2Zmc2V0ICsgMV1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludDMyTEUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiByZWFkVUludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICgodGhpc1tvZmZzZXRdKSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikpICtcbiAgICAgICh0aGlzW29mZnNldCArIDNdICogMHgxMDAwMDAwKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50MzJCRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSAqIDB4MTAwMDAwMCkgK1xuICAgICgodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICB0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRCaWdVSW50NjRMRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiByZWFkQmlnVUludDY0TEUgKG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgdmFsaWRhdGVOdW1iZXIob2Zmc2V0LCAnb2Zmc2V0JylcbiAgY29uc3QgZmlyc3QgPSB0aGlzW29mZnNldF1cbiAgY29uc3QgbGFzdCA9IHRoaXNbb2Zmc2V0ICsgN11cbiAgaWYgKGZpcnN0ID09PSB1bmRlZmluZWQgfHwgbGFzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYm91bmRzRXJyb3Iob2Zmc2V0LCB0aGlzLmxlbmd0aCAtIDgpXG4gIH1cblxuICBjb25zdCBsbyA9IGZpcnN0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjRcblxuICBjb25zdCBoaSA9IHRoaXNbKytvZmZzZXRdICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICBsYXN0ICogMiAqKiAyNFxuXG4gIHJldHVybiBCaWdJbnQobG8pICsgKEJpZ0ludChoaSkgPDwgQmlnSW50KDMyKSlcbn0pXG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ1VJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdVSW50NjRCRSAob2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBjb25zdCBmaXJzdCA9IHRoaXNbb2Zmc2V0XVxuICBjb25zdCBsYXN0ID0gdGhpc1tvZmZzZXQgKyA3XVxuICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCB8fCBsYXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICBib3VuZHNFcnJvcihvZmZzZXQsIHRoaXMubGVuZ3RoIC0gOClcbiAgfVxuXG4gIGNvbnN0IGhpID0gZmlyc3QgKiAyICoqIDI0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XVxuXG4gIGNvbnN0IGxvID0gdGhpc1srK29mZnNldF0gKiAyICoqIDI0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICBsYXN0XG5cbiAgcmV0dXJuIChCaWdJbnQoaGkpIDw8IEJpZ0ludCgzMikpICsgQmlnSW50KGxvKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50TEUgPSBmdW5jdGlvbiByZWFkSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgbGV0IHZhbCA9IHRoaXNbb2Zmc2V0XVxuICBsZXQgbXVsID0gMVxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIGxldCBpID0gYnl0ZUxlbmd0aFxuICBsZXQgbXVsID0gMVxuICBsZXQgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWldXG4gIHdoaWxlIChpID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0taV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gcmVhZEludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKSByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiByZWFkSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgY29uc3QgdmFsID0gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gcmVhZEludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIGNvbnN0IHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCAyNCkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRCaWdJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdJbnQ2NExFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgdmFsID0gdGhpc1tvZmZzZXQgKyA0XSArXG4gICAgdGhpc1tvZmZzZXQgKyA1XSAqIDIgKiogOCArXG4gICAgdGhpc1tvZmZzZXQgKyA2XSAqIDIgKiogMTYgK1xuICAgIChsYXN0IDw8IDI0KSAvLyBPdmVyZmxvd1xuXG4gIHJldHVybiAoQmlnSW50KHZhbCkgPDwgQmlnSW50KDMyKSkgK1xuICAgIEJpZ0ludChmaXJzdCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDI0KVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkQmlnSW50NjRCRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiByZWFkQmlnSW50NjRCRSAob2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBjb25zdCBmaXJzdCA9IHRoaXNbb2Zmc2V0XVxuICBjb25zdCBsYXN0ID0gdGhpc1tvZmZzZXQgKyA3XVxuICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCB8fCBsYXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICBib3VuZHNFcnJvcihvZmZzZXQsIHRoaXMubGVuZ3RoIC0gOClcbiAgfVxuXG4gIGNvbnN0IHZhbCA9IChmaXJzdCA8PCAyNCkgKyAvLyBPdmVyZmxvd1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIHRoaXNbKytvZmZzZXRdXG5cbiAgcmV0dXJuIChCaWdJbnQodmFsKSA8PCBCaWdJbnQoMzIpKSArXG4gICAgQmlnSW50KHRoaXNbKytvZmZzZXRdICogMiAqKiAyNCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgbGFzdClcbn0pXG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gcmVhZEZsb2F0QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gcmVhZERvdWJsZUxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDUyLCA4KVxufVxuXG5mdW5jdGlvbiBjaGVja0ludCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpXG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludExFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjb25zdCBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIGxldCBtdWwgPSAxXG4gIGxldCBpID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50QkUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlVUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgbGV0IGkgPSBieXRlTGVuZ3RoIC0gMVxuICBsZXQgbXVsID0gMVxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnQ4ID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uIHdyaXRlVUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDE2TEUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnQxNkJFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MzJMRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDMyQkUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gd3J0QmlnVUludDY0TEUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbWluLCBtYXgpIHtcbiAgY2hlY2tJbnRCSSh2YWx1ZSwgbWluLCBtYXgsIGJ1Ziwgb2Zmc2V0LCA3KVxuXG4gIGxldCBsbyA9IE51bWJlcih2YWx1ZSAmIEJpZ0ludCgweGZmZmZmZmZmKSlcbiAgYnVmW29mZnNldCsrXSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGxvXG4gIGxldCBoaSA9IE51bWJlcih2YWx1ZSA+PiBCaWdJbnQoMzIpICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0KytdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0KytdID0gaGlcbiAgcmV0dXJuIG9mZnNldFxufVxuXG5mdW5jdGlvbiB3cnRCaWdVSW50NjRCRSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBtaW4sIG1heCkge1xuICBjaGVja0ludEJJKHZhbHVlLCBtaW4sIG1heCwgYnVmLCBvZmZzZXQsIDcpXG5cbiAgbGV0IGxvID0gTnVtYmVyKHZhbHVlICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0ICsgN10gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCArIDZdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQgKyA1XSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0ICsgNF0gPSBsb1xuICBsZXQgaGkgPSBOdW1iZXIodmFsdWUgPj4gQmlnSW50KDMyKSAmIEJpZ0ludCgweGZmZmZmZmZmKSlcbiAgYnVmW29mZnNldCArIDNdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQgKyAyXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0ICsgMV0gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldF0gPSBoaVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlQmlnVUludDY0TEUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gd3JpdGVCaWdVSW50NjRMRSAodmFsdWUsIG9mZnNldCA9IDApIHtcbiAgcmV0dXJuIHdydEJpZ1VJbnQ2NExFKHRoaXMsIHZhbHVlLCBvZmZzZXQsIEJpZ0ludCgwKSwgQmlnSW50KCcweGZmZmZmZmZmZmZmZmZmZmYnKSlcbn0pXG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdVSW50NjRCRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiB3cml0ZUJpZ1VJbnQ2NEJFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0QkUodGhpcywgdmFsdWUsIG9mZnNldCwgQmlnSW50KDApLCBCaWdJbnQoJzB4ZmZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludExFID0gZnVuY3Rpb24gd3JpdGVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjb25zdCBsaW1pdCA9IE1hdGgucG93KDIsICg4ICogYnl0ZUxlbmd0aCkgLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICBsZXQgaSA9IDBcbiAgbGV0IG11bCA9IDFcbiAgbGV0IHN1YiA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpIC0gMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludEJFID0gZnVuY3Rpb24gd3JpdGVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjb25zdCBsaW1pdCA9IE1hdGgucG93KDIsICg4ICogYnl0ZUxlbmd0aCkgLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICBsZXQgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIGxldCBtdWwgPSAxXG4gIGxldCBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpICsgMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiB3cml0ZUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweDdmLCAtMHg4MClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlQmlnSW50NjRMRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiB3cml0ZUJpZ0ludDY0TEUgKHZhbHVlLCBvZmZzZXQgPSAwKSB7XG4gIHJldHVybiB3cnRCaWdVSW50NjRMRSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAtQmlnSW50KCcweDgwMDAwMDAwMDAwMDAwMDAnKSwgQmlnSW50KCcweDdmZmZmZmZmZmZmZmZmZmYnKSlcbn0pXG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnSW50NjRCRSAodmFsdWUsIG9mZnNldCA9IDApIHtcbiAgcmV0dXJuIHdydEJpZ1VJbnQ2NEJFKHRoaXMsIHZhbHVlLCBvZmZzZXQsIC1CaWdJbnQoJzB4ODAwMDAwMDAwMDAwMDAwMCcpLCBCaWdJbnQoJzB4N2ZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAob2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gd3JpdGVGbG9hdEJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGFyZ2V0KSkgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgc2hvdWxkIGJlIGEgQnVmZmVyJylcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldFN0YXJ0ID49IHRhcmdldC5sZW5ndGgpIHRhcmdldFN0YXJ0ID0gdGFyZ2V0Lmxlbmd0aFxuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDBcbiAgaWYgKGVuZCA+IDAgJiYgZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gMFxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmICh0YXJnZXRTdGFydCA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChlbmQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCA8IGVuZCAtIHN0YXJ0KSB7XG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0ICsgc3RhcnRcbiAgfVxuXG4gIGNvbnN0IGxlbiA9IGVuZCAtIHN0YXJ0XG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCAmJiB0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuY29weVdpdGhpbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIFVzZSBidWlsdC1pbiB3aGVuIGF2YWlsYWJsZSwgbWlzc2luZyBmcm9tIElFMTFcbiAgICB0aGlzLmNvcHlXaXRoaW4odGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpXG4gIH0gZWxzZSB7XG4gICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICB0YXJnZXQsXG4gICAgICB0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpLFxuICAgICAgdGFyZ2V0U3RhcnRcbiAgICApXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIFVzYWdlOlxuLy8gICAgYnVmZmVyLmZpbGwobnVtYmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChidWZmZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKHN0cmluZ1ssIG9mZnNldFssIGVuZF1dWywgZW5jb2RpbmddKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsLCBzdGFydCwgZW5kLCBlbmNvZGluZykge1xuICAvLyBIYW5kbGUgc3RyaW5nIGNhc2VzOlxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBzdGFydFxuICAgICAgc3RhcnQgPSAwXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5kXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH1cbiAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycgJiYgIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgIH1cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29uc3QgY29kZSA9IHZhbC5jaGFyQ29kZUF0KDApXG4gICAgICBpZiAoKGVuY29kaW5nID09PSAndXRmOCcgJiYgY29kZSA8IDEyOCkgfHxcbiAgICAgICAgICBlbmNvZGluZyA9PT0gJ2xhdGluMScpIHtcbiAgICAgICAgLy8gRmFzdCBwYXRoOiBJZiBgdmFsYCBmaXRzIGludG8gYSBzaW5nbGUgYnl0ZSwgdXNlIHRoYXQgbnVtZXJpYyB2YWx1ZS5cbiAgICAgICAgdmFsID0gY29kZVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDI1NVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdib29sZWFuJykge1xuICAgIHZhbCA9IE51bWJlcih2YWwpXG4gIH1cblxuICAvLyBJbnZhbGlkIHJhbmdlcyBhcmUgbm90IHNldCB0byBhIGRlZmF1bHQsIHNvIGNhbiByYW5nZSBjaGVjayBlYXJseS5cbiAgaWYgKHN0YXJ0IDwgMCB8fCB0aGlzLmxlbmd0aCA8IHN0YXJ0IHx8IHRoaXMubGVuZ3RoIDwgZW5kKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ091dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHN0YXJ0ID0gc3RhcnQgPj4+IDBcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyB0aGlzLmxlbmd0aCA6IGVuZCA+Pj4gMFxuXG4gIGlmICghdmFsKSB2YWwgPSAwXG5cbiAgbGV0IGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IHZhbFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBieXRlcyA9IEJ1ZmZlci5pc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICAgIGNvbnN0IGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGlmIChsZW4gPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSB2YWx1ZSBcIicgKyB2YWwgK1xuICAgICAgICAnXCIgaXMgaW52YWxpZCBmb3IgYXJndW1lbnQgXCJ2YWx1ZVwiJylcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGVuZCAtIHN0YXJ0OyArK2kpIHtcbiAgICAgIHRoaXNbaSArIHN0YXJ0XSA9IGJ5dGVzW2kgJSBsZW5dXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gQ1VTVE9NIEVSUk9SU1xuLy8gPT09PT09PT09PT09PVxuXG4vLyBTaW1wbGlmaWVkIHZlcnNpb25zIGZyb20gTm9kZSwgY2hhbmdlZCBmb3IgQnVmZmVyLW9ubHkgdXNhZ2VcbmNvbnN0IGVycm9ycyA9IHt9XG5mdW5jdGlvbiBFIChzeW0sIGdldE1lc3NhZ2UsIEJhc2UpIHtcbiAgZXJyb3JzW3N5bV0gPSBjbGFzcyBOb2RlRXJyb3IgZXh0ZW5kcyBCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICBzdXBlcigpXG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbWVzc2FnZScsIHtcbiAgICAgICAgdmFsdWU6IGdldE1lc3NhZ2UuYXBwbHkodGhpcywgYXJndW1lbnRzKSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfSlcblxuICAgICAgLy8gQWRkIHRoZSBlcnJvciBjb2RlIHRvIHRoZSBuYW1lIHRvIGluY2x1ZGUgaXQgaW4gdGhlIHN0YWNrIHRyYWNlLlxuICAgICAgdGhpcy5uYW1lID0gYCR7dGhpcy5uYW1lfSBbJHtzeW19XWBcbiAgICAgIC8vIEFjY2VzcyB0aGUgc3RhY2sgdG8gZ2VuZXJhdGUgdGhlIGVycm9yIG1lc3NhZ2UgaW5jbHVkaW5nIHRoZSBlcnJvciBjb2RlXG4gICAgICAvLyBmcm9tIHRoZSBuYW1lLlxuICAgICAgdGhpcy5zdGFjayAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuICAgICAgLy8gUmVzZXQgdGhlIG5hbWUgdG8gdGhlIGFjdHVhbCBuYW1lLlxuICAgICAgZGVsZXRlIHRoaXMubmFtZVxuICAgIH1cblxuICAgIGdldCBjb2RlICgpIHtcbiAgICAgIHJldHVybiBzeW1cbiAgICB9XG5cbiAgICBzZXQgY29kZSAodmFsdWUpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY29kZScsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdG9TdHJpbmcgKCkge1xuICAgICAgcmV0dXJuIGAke3RoaXMubmFtZX0gWyR7c3ltfV06ICR7dGhpcy5tZXNzYWdlfWBcbiAgICB9XG4gIH1cbn1cblxuRSgnRVJSX0JVRkZFUl9PVVRfT0ZfQk9VTkRTJyxcbiAgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAobmFtZSkge1xuICAgICAgcmV0dXJuIGAke25hbWV9IGlzIG91dHNpZGUgb2YgYnVmZmVyIGJvdW5kc2BcbiAgICB9XG5cbiAgICByZXR1cm4gJ0F0dGVtcHQgdG8gYWNjZXNzIG1lbW9yeSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnXG4gIH0sIFJhbmdlRXJyb3IpXG5FKCdFUlJfSU5WQUxJRF9BUkdfVFlQRScsXG4gIGZ1bmN0aW9uIChuYW1lLCBhY3R1YWwpIHtcbiAgICByZXR1cm4gYFRoZSBcIiR7bmFtZX1cIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgbnVtYmVyLiBSZWNlaXZlZCB0eXBlICR7dHlwZW9mIGFjdHVhbH1gXG4gIH0sIFR5cGVFcnJvcilcbkUoJ0VSUl9PVVRfT0ZfUkFOR0UnLFxuICBmdW5jdGlvbiAoc3RyLCByYW5nZSwgaW5wdXQpIHtcbiAgICBsZXQgbXNnID0gYFRoZSB2YWx1ZSBvZiBcIiR7c3RyfVwiIGlzIG91dCBvZiByYW5nZS5gXG4gICAgbGV0IHJlY2VpdmVkID0gaW5wdXRcbiAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihpbnB1dCkgJiYgTWF0aC5hYnMoaW5wdXQpID4gMiAqKiAzMikge1xuICAgICAgcmVjZWl2ZWQgPSBhZGROdW1lcmljYWxTZXBhcmF0b3IoU3RyaW5nKGlucHV0KSlcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ2JpZ2ludCcpIHtcbiAgICAgIHJlY2VpdmVkID0gU3RyaW5nKGlucHV0KVxuICAgICAgaWYgKGlucHV0ID4gQmlnSW50KDIpICoqIEJpZ0ludCgzMikgfHwgaW5wdXQgPCAtKEJpZ0ludCgyKSAqKiBCaWdJbnQoMzIpKSkge1xuICAgICAgICByZWNlaXZlZCA9IGFkZE51bWVyaWNhbFNlcGFyYXRvcihyZWNlaXZlZClcbiAgICAgIH1cbiAgICAgIHJlY2VpdmVkICs9ICduJ1xuICAgIH1cbiAgICBtc2cgKz0gYCBJdCBtdXN0IGJlICR7cmFuZ2V9LiBSZWNlaXZlZCAke3JlY2VpdmVkfWBcbiAgICByZXR1cm4gbXNnXG4gIH0sIFJhbmdlRXJyb3IpXG5cbmZ1bmN0aW9uIGFkZE51bWVyaWNhbFNlcGFyYXRvciAodmFsKSB7XG4gIGxldCByZXMgPSAnJ1xuICBsZXQgaSA9IHZhbC5sZW5ndGhcbiAgY29uc3Qgc3RhcnQgPSB2YWxbMF0gPT09ICctJyA/IDEgOiAwXG4gIGZvciAoOyBpID49IHN0YXJ0ICsgNDsgaSAtPSAzKSB7XG4gICAgcmVzID0gYF8ke3ZhbC5zbGljZShpIC0gMywgaSl9JHtyZXN9YFxuICB9XG4gIHJldHVybiBgJHt2YWwuc2xpY2UoMCwgaSl9JHtyZXN9YFxufVxuXG4vLyBDSEVDSyBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBjaGVja0JvdW5kcyAoYnVmLCBvZmZzZXQsIGJ5dGVMZW5ndGgpIHtcbiAgdmFsaWRhdGVOdW1iZXIob2Zmc2V0LCAnb2Zmc2V0JylcbiAgaWYgKGJ1ZltvZmZzZXRdID09PSB1bmRlZmluZWQgfHwgYnVmW29mZnNldCArIGJ5dGVMZW5ndGhdID09PSB1bmRlZmluZWQpIHtcbiAgICBib3VuZHNFcnJvcihvZmZzZXQsIGJ1Zi5sZW5ndGggLSAoYnl0ZUxlbmd0aCArIDEpKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50QkkgKHZhbHVlLCBtaW4sIG1heCwgYnVmLCBvZmZzZXQsIGJ5dGVMZW5ndGgpIHtcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB7XG4gICAgY29uc3QgbiA9IHR5cGVvZiBtaW4gPT09ICdiaWdpbnQnID8gJ24nIDogJydcbiAgICBsZXQgcmFuZ2VcbiAgICBpZiAoYnl0ZUxlbmd0aCA+IDMpIHtcbiAgICAgIGlmIChtaW4gPT09IDAgfHwgbWluID09PSBCaWdJbnQoMCkpIHtcbiAgICAgICAgcmFuZ2UgPSBgPj0gMCR7bn0gYW5kIDwgMiR7bn0gKiogJHsoYnl0ZUxlbmd0aCArIDEpICogOH0ke259YFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmFuZ2UgPSBgPj0gLSgyJHtufSAqKiAkeyhieXRlTGVuZ3RoICsgMSkgKiA4IC0gMX0ke259KSBhbmQgPCAyICoqIGAgK1xuICAgICAgICAgICAgICAgIGAkeyhieXRlTGVuZ3RoICsgMSkgKiA4IC0gMX0ke259YFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByYW5nZSA9IGA+PSAke21pbn0ke259IGFuZCA8PSAke21heH0ke259YFxuICAgIH1cbiAgICB0aHJvdyBuZXcgZXJyb3JzLkVSUl9PVVRfT0ZfUkFOR0UoJ3ZhbHVlJywgcmFuZ2UsIHZhbHVlKVxuICB9XG4gIGNoZWNrQm91bmRzKGJ1Ziwgb2Zmc2V0LCBieXRlTGVuZ3RoKVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZU51bWJlciAodmFsdWUsIG5hbWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkVSUl9JTlZBTElEX0FSR19UWVBFKG5hbWUsICdudW1iZXInLCB2YWx1ZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBib3VuZHNFcnJvciAodmFsdWUsIGxlbmd0aCwgdHlwZSkge1xuICBpZiAoTWF0aC5mbG9vcih2YWx1ZSkgIT09IHZhbHVlKSB7XG4gICAgdmFsaWRhdGVOdW1iZXIodmFsdWUsIHR5cGUpXG4gICAgdGhyb3cgbmV3IGVycm9ycy5FUlJfT1VUX09GX1JBTkdFKHR5cGUgfHwgJ29mZnNldCcsICdhbiBpbnRlZ2VyJywgdmFsdWUpXG4gIH1cblxuICBpZiAobGVuZ3RoIDwgMCkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX0JVRkZFUl9PVVRfT0ZfQk9VTkRTKClcbiAgfVxuXG4gIHRocm93IG5ldyBlcnJvcnMuRVJSX09VVF9PRl9SQU5HRSh0eXBlIHx8ICdvZmZzZXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYD49ICR7dHlwZSA/IDEgOiAwfSBhbmQgPD0gJHtsZW5ndGh9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlKVxufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbmNvbnN0IElOVkFMSURfQkFTRTY0X1JFID0gL1teKy8wLTlBLVphLXotX10vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgdGFrZXMgZXF1YWwgc2lnbnMgYXMgZW5kIG9mIHRoZSBCYXNlNjQgZW5jb2RpbmdcbiAgc3RyID0gc3RyLnNwbGl0KCc9JylbMF1cbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0ci50cmltKCkucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cmluZywgdW5pdHMpIHtcbiAgdW5pdHMgPSB1bml0cyB8fCBJbmZpbml0eVxuICBsZXQgY29kZVBvaW50XG4gIGNvbnN0IGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgbGV0IGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIGNvbnN0IGJ5dGVzID0gW11cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29kZVBvaW50ID0gc3RyaW5nLmNoYXJDb2RlQXQoaSlcblxuICAgIC8vIGlzIHN1cnJvZ2F0ZSBjb21wb25lbnRcbiAgICBpZiAoY29kZVBvaW50ID4gMHhEN0ZGICYmIGNvZGVQb2ludCA8IDB4RTAwMCkge1xuICAgICAgLy8gbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICghbGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgICAvLyBubyBsZWFkIHlldFxuICAgICAgICBpZiAoY29kZVBvaW50ID4gMHhEQkZGKSB7XG4gICAgICAgICAgLy8gdW5leHBlY3RlZCB0cmFpbFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoaSArIDEgPT09IGxlbmd0aCkge1xuICAgICAgICAgIC8vIHVucGFpcmVkIGxlYWRcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWQgbGVhZFxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gMiBsZWFkcyBpbiBhIHJvd1xuICAgICAgaWYgKGNvZGVQb2ludCA8IDB4REMwMCkge1xuICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZCBzdXJyb2dhdGUgcGFpclxuICAgICAgY29kZVBvaW50ID0gKGxlYWRTdXJyb2dhdGUgLSAweEQ4MDAgPDwgMTAgfCBjb2RlUG9pbnQgLSAweERDMDApICsgMHgxMDAwMFxuICAgIH0gZWxzZSBpZiAobGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgLy8gdmFsaWQgYm1wIGNoYXIsIGJ1dCBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgfVxuXG4gICAgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcblxuICAgIC8vIGVuY29kZSB1dGY4XG4gICAgaWYgKGNvZGVQb2ludCA8IDB4ODApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMSkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChjb2RlUG9pbnQpXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDgwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2IHwgMHhDMCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyB8IDB4RTAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDQpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDEyIHwgMHhGMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb2RlIHBvaW50JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnl0ZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgY29uc3QgYnl0ZUFycmF5ID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyLCB1bml0cykge1xuICBsZXQgYywgaGksIGxvXG4gIGNvbnN0IGJ5dGVBcnJheSA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgbGV0IGlcbiAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKSBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbi8vIEFycmF5QnVmZmVyIG9yIFVpbnQ4QXJyYXkgb2JqZWN0cyBmcm9tIG90aGVyIGNvbnRleHRzIChpLmUuIGlmcmFtZXMpIGRvIG5vdCBwYXNzXG4vLyB0aGUgYGluc3RhbmNlb2ZgIGNoZWNrIGJ1dCB0aGV5IHNob3VsZCBiZSB0cmVhdGVkIGFzIG9mIHRoYXQgdHlwZS5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvaXNzdWVzLzE2NlxuZnVuY3Rpb24gaXNJbnN0YW5jZSAob2JqLCB0eXBlKSB7XG4gIHJldHVybiBvYmogaW5zdGFuY2VvZiB0eXBlIHx8XG4gICAgKG9iaiAhPSBudWxsICYmIG9iai5jb25zdHJ1Y3RvciAhPSBudWxsICYmIG9iai5jb25zdHJ1Y3Rvci5uYW1lICE9IG51bGwgJiZcbiAgICAgIG9iai5jb25zdHJ1Y3Rvci5uYW1lID09PSB0eXBlLm5hbWUpXG59XG5mdW5jdGlvbiBudW1iZXJJc05hTiAob2JqKSB7XG4gIC8vIEZvciBJRTExIHN1cHBvcnRcbiAgcmV0dXJuIG9iaiAhPT0gb2JqIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG59XG5cbi8vIENyZWF0ZSBsb29rdXAgdGFibGUgZm9yIGB0b1N0cmluZygnaGV4JylgXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2lzc3Vlcy8yMTlcbmNvbnN0IGhleFNsaWNlTG9va3VwVGFibGUgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBhbHBoYWJldCA9ICcwMTIzNDU2Nzg5YWJjZGVmJ1xuICBjb25zdCB0YWJsZSA9IG5ldyBBcnJheSgyNTYpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgIGNvbnN0IGkxNiA9IGkgKiAxNlxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTY7ICsraikge1xuICAgICAgdGFibGVbaTE2ICsgal0gPSBhbHBoYWJldFtpXSArIGFscGhhYmV0W2pdXG4gICAgfVxuICB9XG4gIHJldHVybiB0YWJsZVxufSkoKVxuXG4vLyBSZXR1cm4gbm90IGZ1bmN0aW9uIHdpdGggRXJyb3IgaWYgQmlnSW50IG5vdCBzdXBwb3J0ZWRcbmZ1bmN0aW9uIGRlZmluZUJpZ0ludE1ldGhvZCAoZm4pIHtcbiAgcmV0dXJuIHR5cGVvZiBCaWdJbnQgPT09ICd1bmRlZmluZWQnID8gQnVmZmVyQmlnSW50Tm90RGVmaW5lZCA6IGZuXG59XG5cbmZ1bmN0aW9uIEJ1ZmZlckJpZ0ludE5vdERlZmluZWQgKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ0JpZ0ludCBub3Qgc3VwcG9ydGVkJylcbn1cbiIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xudmFyIF90aGlzID0gdGhpcztcbnZhciBERUZBVUxUX09QVFMgPSB7XG4gICAgbG9nOiB0cnVlLFxuICAgIHRpbWVvdXQ6IDMwMDAwLFxufTtcbnZhciBERUZBVUxUX0lGUkFNRV9TRUxFQ1RPUiA9ICdpZnJhbWUnO1xuZnVuY3Rpb24gc2xlZXAodGltZW91dCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gc2V0VGltZW91dChyZXNvbHZlLCB0aW1lb3V0KTsgfSk7XG59XG5mdW5jdGlvbiB0aW1lb3V0KGNiLCB0aW1lb3V0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgICAgIHZhciBmaW5pc2ggPSBmdW5jdGlvbiAoKSB7IHJldHVybiBkb25lIHx8IHJlc29sdmUoKTsgfTtcbiAgICAgICAgY2IoKS50aGVuKGZpbmlzaCk7XG4gICAgICAgIHNsZWVwKHRpbWVvdXQpLnRoZW4oZmluaXNoKTtcbiAgICB9KTtcbn1cbnZhciBmcmFtZUxvYWRlZCA9IGZ1bmN0aW9uIChzZWxlY3Rvciwgb3B0cykge1xuICAgIGlmIChzZWxlY3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHNlbGVjdG9yID0gREVGQVVMVF9JRlJBTUVfU0VMRUNUT1I7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgb3B0cyA9IHNlbGVjdG9yO1xuICAgICAgICBzZWxlY3RvciA9IERFRkFVTFRfSUZSQU1FX1NFTEVDVE9SO1xuICAgIH1cbiAgICB2YXIgZnVsbE9wdHMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgREVGQVVMVF9PUFRTKSwgb3B0cyk7XG4gICAgdmFyIGxvZyA9IGZ1bGxPcHRzLmxvZyA/IEN5cHJlc3MubG9nKHtcbiAgICAgICAgbmFtZTogJ2ZyYW1lIGxvYWRlZCcsXG4gICAgICAgIGRpc3BsYXlOYW1lOiAnZnJhbWUgbG9hZGVkJyxcbiAgICAgICAgbWVzc2FnZTogW3NlbGVjdG9yXSxcbiAgICB9KS5zbmFwc2hvdCgpIDogbnVsbDtcbiAgICByZXR1cm4gY3kuZ2V0KHNlbGVjdG9yLCB7IGxvZzogZmFsc2UgfSkudGhlbih7IHRpbWVvdXQ6IGZ1bGxPcHRzLnRpbWVvdXQgfSwgZnVuY3Rpb24gKCRmcmFtZSkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29udGVudFdpbmRvdywgaGFzTmF2aWdhdGVkLCBsb2FkTG9nO1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9jKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAoX2EgPSBsb2cpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXQoJyRlbCcsICRmcmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkZnJhbWUubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjeXByZXNzLWlmcmFtZSBjb21tYW5kcyBjYW4gb25seSBiZSBhcHBsaWVkIHRvIGV4YWN0bHkgb25lIGlmcmFtZSBhdCBhIHRpbWUuICBJbnN0ZWFkIGZvdW5kIFwiICsgJGZyYW1lLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29udGVudFdpbmRvdyA9ICRmcmFtZS5wcm9wKCdjb250ZW50V2luZG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIGhhc05hdmlnYXRlZCA9IGZ1bGxPcHRzLnVybFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgZnVsbE9wdHMudXJsID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGNvbnRlbnRXaW5kb3cubG9jYXRpb24udG9TdHJpbmcoKS5pbmNsdWRlcyhmdWxsT3B0cy51cmwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKF9hID0gZnVsbE9wdHMudXJsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudGVzdChjb250ZW50V2luZG93LmxvY2F0aW9uLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb250ZW50V2luZG93LmxvY2F0aW9uLnRvU3RyaW5nKCkgIT09ICdhYm91dDpibGFuayc7IH07XG4gICAgICAgICAgICAgICAgICAgIF9jLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIGlmICghIWhhc05hdmlnYXRlZCgpKSByZXR1cm4gWzMsIDNdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHNsZWVwKDEwMCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgX2Muc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDFdO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRXaW5kb3cuZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCAkZnJhbWVdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxvYWRMb2cgPSBDeXByZXNzLmxvZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnRnJhbWUgTG9hZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBbY29udGVudFdpbmRvdy5sb2NhdGlvbi50b1N0cmluZygpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9KS5zbmFwc2hvdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ3lwcmVzcy4kKGNvbnRlbnRXaW5kb3cpLm9uKCdsb2FkJywgcmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICBfYy5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRMb2cuZW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIChfYiA9IGxvZykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmZpbmlzaCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIsICRmcmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pOyB9KTtcbn07XG5DeXByZXNzLkNvbW1hbmRzLmFkZCgnZnJhbWVMb2FkZWQnLCBmcmFtZUxvYWRlZCk7XG52YXIgaWZyYW1lID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBvcHRzKSB7XG4gICAgaWYgKHNlbGVjdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc2VsZWN0b3IgPSBERUZBVUxUX0lGUkFNRV9TRUxFQ1RPUjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnb2JqZWN0Jykge1xuICAgICAgICBvcHRzID0gc2VsZWN0b3I7XG4gICAgICAgIHNlbGVjdG9yID0gREVGQVVMVF9JRlJBTUVfU0VMRUNUT1I7XG4gICAgfVxuICAgIHZhciBmdWxsT3B0cyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBERUZBVUxUX09QVFMpLCBvcHRzKTtcbiAgICB2YXIgbG9nID0gZnVsbE9wdHMubG9nID8gQ3lwcmVzcy5sb2coe1xuICAgICAgICBuYW1lOiAnaWZyYW1lJyxcbiAgICAgICAgZGlzcGxheU5hbWU6ICdpZnJhbWUnLFxuICAgICAgICBtZXNzYWdlOiBbc2VsZWN0b3JdLFxuICAgIH0pLnNuYXBzaG90KCkgOiBudWxsO1xuICAgIHJldHVybiBjeS5mcmFtZUxvYWRlZChzZWxlY3RvciwgX19hc3NpZ24oX19hc3NpZ24oe30sIGZ1bGxPcHRzKSwgeyBsb2c6IGZhbHNlIH0pKS50aGVuKGZ1bmN0aW9uICgkZnJhbWUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAoX2EgPSBsb2cpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXQoJyRlbCcsICRmcmFtZSkuZW5kKCk7XG4gICAgICAgIHZhciBjb250ZW50V2luZG93ID0gJGZyYW1lLnByb3AoJ2NvbnRlbnRXaW5kb3cnKTtcbiAgICAgICAgcmV0dXJuIEN5cHJlc3MuJChjb250ZW50V2luZG93LmRvY3VtZW50LmJvZHkpO1xuICAgIH0pO1xufTtcbkN5cHJlc3MuQ29tbWFuZHMuYWRkKCdpZnJhbWUnLCBpZnJhbWUpO1xudmFyIGVudGVyID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBvcHRzKSB7XG4gICAgaWYgKHNlbGVjdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc2VsZWN0b3IgPSBERUZBVUxUX0lGUkFNRV9TRUxFQ1RPUjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnb2JqZWN0Jykge1xuICAgICAgICBvcHRzID0gc2VsZWN0b3I7XG4gICAgICAgIHNlbGVjdG9yID0gREVGQVVMVF9JRlJBTUVfU0VMRUNUT1I7XG4gICAgfVxuICAgIHZhciBmdWxsT3B0cyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBERUZBVUxUX09QVFMpLCBvcHRzKTtcbiAgICB2YXIgbG9nID0gZnVsbE9wdHMubG9nID8gQ3lwcmVzcy5sb2coe1xuICAgICAgICBuYW1lOiAnZW50ZXInLFxuICAgICAgICBkaXNwbGF5TmFtZTogJ2VudGVyJyxcbiAgICAgICAgbWVzc2FnZTogW3NlbGVjdG9yXSxcbiAgICB9KS5zbmFwc2hvdCgpIDogbnVsbDtcbiAgICByZXR1cm4gY3kuaWZyYW1lKHNlbGVjdG9yLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZnVsbE9wdHMpLCB7IGxvZzogZmFsc2UgfSkpLnRoZW4oZnVuY3Rpb24gKCRib2R5KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gbG9nKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0KCckZWwnLCAkYm9keSkuZW5kKCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBjeS53cmFwKCRib2R5LCB7IGxvZzogZmFsc2UgfSk7IH07XG4gICAgfSk7XG59O1xuQ3lwcmVzcy5Db21tYW5kcy5hZGQoJ2VudGVyJywgZW50ZXIpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLyohIGllZWU3NTQuIEJTRC0zLUNsYXVzZSBMaWNlbnNlLiBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmcvb3BlbnNvdXJjZT4gKi9cbmV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gKGUgKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gKG0gKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAoKHZhbHVlICogYykgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIoZnVuY3Rpb24gKGcsIGYpIHtcbiAgICBpZiAoXCJvYmplY3RcIiA9PSB0eXBlb2YgZXhwb3J0cyAmJiBcIm9iamVjdFwiID09IHR5cGVvZiBtb2R1bGUpIHtcbiAgICAgIG1vZHVsZS5leHBvcnRzID0gZigpO1xuICAgIH0gZWxzZSBpZiAoXCJmdW5jdGlvblwiID09IHR5cGVvZiBkZWZpbmUgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgZGVmaW5lKFwicnJ3ZWJTbmFwc2hvdFwiLCBbXSwgZik7XG4gICAgfSBlbHNlIGlmIChcIm9iamVjdFwiID09IHR5cGVvZiBleHBvcnRzKSB7XG4gICAgICBleHBvcnRzW1wicnJ3ZWJTbmFwc2hvdFwiXSA9IGYoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ1tcInJyd2ViU25hcHNob3RcIl0gPSBmKCk7XG4gICAgfVxuICB9KHRoaXMsICgpID0+IHtcbnZhciBleHBvcnRzID0ge307XG52YXIgbW9kdWxlID0geyBleHBvcnRzIH07XG5cInVzZSBzdHJpY3RcIjtcbnZhciBfX2RlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgX19kZWZQcm9wcyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzO1xudmFyIF9fZ2V0T3duUHJvcERlc2NzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7XG52YXIgX19nZXRPd25Qcm9wU3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgX19oYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBfX3Byb3BJc0VudW0gPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xudmFyIF9fZGVmTm9ybWFsUHJvcCA9IChvYmosIGtleSwgdmFsdWUpID0+IGtleSBpbiBvYmogPyBfX2RlZlByb3Aob2JqLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSwgdmFsdWUgfSkgOiBvYmpba2V5XSA9IHZhbHVlO1xudmFyIF9fc3ByZWFkVmFsdWVzID0gKGEsIGIpID0+IHtcbiAgZm9yICh2YXIgcHJvcCBpbiBiIHx8IChiID0ge30pKVxuICAgIGlmIChfX2hhc093blByb3AuY2FsbChiLCBwcm9wKSlcbiAgICAgIF9fZGVmTm9ybWFsUHJvcChhLCBwcm9wLCBiW3Byb3BdKTtcbiAgaWYgKF9fZ2V0T3duUHJvcFN5bWJvbHMpXG4gICAgZm9yICh2YXIgcHJvcCBvZiBfX2dldE93blByb3BTeW1ib2xzKGIpKSB7XG4gICAgICBpZiAoX19wcm9wSXNFbnVtLmNhbGwoYiwgcHJvcCkpXG4gICAgICAgIF9fZGVmTm9ybWFsUHJvcChhLCBwcm9wLCBiW3Byb3BdKTtcbiAgICB9XG4gIHJldHVybiBhO1xufTtcbnZhciBfX3NwcmVhZFByb3BzID0gKGEsIGIpID0+IF9fZGVmUHJvcHMoYSwgX19nZXRPd25Qcm9wRGVzY3MoYikpO1xudmFyIF9fb2JqUmVzdCA9IChzb3VyY2UsIGV4Y2x1ZGUpID0+IHtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICBmb3IgKHZhciBwcm9wIGluIHNvdXJjZSlcbiAgICBpZiAoX19oYXNPd25Qcm9wLmNhbGwoc291cmNlLCBwcm9wKSAmJiBleGNsdWRlLmluZGV4T2YocHJvcCkgPCAwKVxuICAgICAgdGFyZ2V0W3Byb3BdID0gc291cmNlW3Byb3BdO1xuICBpZiAoc291cmNlICE9IG51bGwgJiYgX19nZXRPd25Qcm9wU3ltYm9scylcbiAgICBmb3IgKHZhciBwcm9wIG9mIF9fZ2V0T3duUHJvcFN5bWJvbHMoc291cmNlKSkge1xuICAgICAgaWYgKGV4Y2x1ZGUuaW5kZXhPZihwcm9wKSA8IDAgJiYgX19wcm9wSXNFbnVtLmNhbGwoc291cmNlLCBwcm9wKSlcbiAgICAgICAgdGFyZ2V0W3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgIH1cbiAgcmV0dXJuIHRhcmdldDtcbn07XG52YXIgX19kZWZQcm9wMiA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfX2RlZk5vcm1hbFByb3AyID0gKG9iaiwga2V5LCB2YWx1ZSkgPT4ga2V5IGluIG9iaiA/IF9fZGVmUHJvcDIob2JqLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSwgdmFsdWUgfSkgOiBvYmpba2V5XSA9IHZhbHVlO1xudmFyIF9fcHVibGljRmllbGQgPSAob2JqLCBrZXksIHZhbHVlKSA9PiBfX2RlZk5vcm1hbFByb3AyKG9iaiwgdHlwZW9mIGtleSAhPT0gXCJzeW1ib2xcIiA/IGtleSArIFwiXCIgOiBrZXksIHZhbHVlKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6IFwiTW9kdWxlXCIgfSk7XG52YXIgTm9kZVR5cGUgPSAvKiBAX19QVVJFX18gKi8gKChOb2RlVHlwZTIpID0+IHtcbiAgTm9kZVR5cGUyW05vZGVUeXBlMltcIkRvY3VtZW50XCJdID0gMF0gPSBcIkRvY3VtZW50XCI7XG4gIE5vZGVUeXBlMltOb2RlVHlwZTJbXCJEb2N1bWVudFR5cGVcIl0gPSAxXSA9IFwiRG9jdW1lbnRUeXBlXCI7XG4gIE5vZGVUeXBlMltOb2RlVHlwZTJbXCJFbGVtZW50XCJdID0gMl0gPSBcIkVsZW1lbnRcIjtcbiAgTm9kZVR5cGUyW05vZGVUeXBlMltcIlRleHRcIl0gPSAzXSA9IFwiVGV4dFwiO1xuICBOb2RlVHlwZTJbTm9kZVR5cGUyW1wiQ0RBVEFcIl0gPSA0XSA9IFwiQ0RBVEFcIjtcbiAgTm9kZVR5cGUyW05vZGVUeXBlMltcIkNvbW1lbnRcIl0gPSA1XSA9IFwiQ29tbWVudFwiO1xuICByZXR1cm4gTm9kZVR5cGUyO1xufSkoTm9kZVR5cGUgfHwge30pO1xuY29uc3QgdGVzdGFibGVBY2Nlc3NvcnMgPSB7XG4gIE5vZGU6IFtcImNoaWxkTm9kZXNcIiwgXCJwYXJlbnROb2RlXCIsIFwicGFyZW50RWxlbWVudFwiLCBcInRleHRDb250ZW50XCJdLFxuICBTaGFkb3dSb290OiBbXCJob3N0XCIsIFwic3R5bGVTaGVldHNcIl0sXG4gIEVsZW1lbnQ6IFtcInNoYWRvd1Jvb3RcIiwgXCJxdWVyeVNlbGVjdG9yXCIsIFwicXVlcnlTZWxlY3RvckFsbFwiXSxcbiAgTXV0YXRpb25PYnNlcnZlcjogW11cbn07XG5jb25zdCB0ZXN0YWJsZU1ldGhvZHMgPSB7XG4gIE5vZGU6IFtcImNvbnRhaW5zXCIsIFwiZ2V0Um9vdE5vZGVcIl0sXG4gIFNoYWRvd1Jvb3Q6IFtcImdldFNlbGVjdGlvblwiXSxcbiAgRWxlbWVudDogW10sXG4gIE11dGF0aW9uT2JzZXJ2ZXI6IFtcImNvbnN0cnVjdG9yXCJdXG59O1xuY29uc3QgdW50YWludGVkQmFzZVByb3RvdHlwZSA9IHt9O1xuY29uc3QgaXNBbmd1bGFyWm9uZVByZXNlbnQgPSAoKSA9PiB7XG4gIHJldHVybiAhIWdsb2JhbFRoaXMuWm9uZTtcbn07XG5mdW5jdGlvbiBnZXRVbnRhaW50ZWRQcm90b3R5cGUoa2V5KSB7XG4gIGlmICh1bnRhaW50ZWRCYXNlUHJvdG90eXBlW2tleV0pXG4gICAgcmV0dXJuIHVudGFpbnRlZEJhc2VQcm90b3R5cGVba2V5XTtcbiAgY29uc3QgZGVmYXVsdE9iaiA9IGdsb2JhbFRoaXNba2V5XTtcbiAgY29uc3QgZGVmYXVsdFByb3RvdHlwZSA9IGRlZmF1bHRPYmoucHJvdG90eXBlO1xuICBjb25zdCBhY2Nlc3Nvck5hbWVzID0ga2V5IGluIHRlc3RhYmxlQWNjZXNzb3JzID8gdGVzdGFibGVBY2Nlc3NvcnNba2V5XSA6IHZvaWQgMDtcbiAgY29uc3QgaXNVbnRhaW50ZWRBY2Nlc3NvcnMgPSBCb29sZWFuKFxuICAgIGFjY2Vzc29yTmFtZXMgJiYgLy8gQHRzLWV4cGVjdC1lcnJvciAyMzQ1XG4gICAgYWNjZXNzb3JOYW1lcy5ldmVyeShcbiAgICAgIChhY2Nlc3NvcikgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICByZXR1cm4gQm9vbGVhbihcbiAgICAgICAgICAoX2IgPSAoX2EgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGRlZmF1bHRQcm90b3R5cGUsIGFjY2Vzc29yKSkgPT0gbnVsbCA/IHZvaWQgMCA6IF9hLmdldCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9iLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJbbmF0aXZlIGNvZGVdXCIpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgKVxuICApO1xuICBjb25zdCBtZXRob2ROYW1lcyA9IGtleSBpbiB0ZXN0YWJsZU1ldGhvZHMgPyB0ZXN0YWJsZU1ldGhvZHNba2V5XSA6IHZvaWQgMDtcbiAgY29uc3QgaXNVbnRhaW50ZWRNZXRob2RzID0gQm9vbGVhbihcbiAgICBtZXRob2ROYW1lcyAmJiBtZXRob2ROYW1lcy5ldmVyeShcbiAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgMjM0NVxuICAgICAgKG1ldGhvZCkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZGVmYXVsdFByb3RvdHlwZVttZXRob2RdID09PSBcImZ1bmN0aW9uXCIgJiYgKChfYSA9IGRlZmF1bHRQcm90b3R5cGVbbWV0aG9kXSkgPT0gbnVsbCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJbbmF0aXZlIGNvZGVdXCIpKTtcbiAgICAgIH1cbiAgICApXG4gICk7XG4gIGlmIChpc1VudGFpbnRlZEFjY2Vzc29ycyAmJiBpc1VudGFpbnRlZE1ldGhvZHMgJiYgIWlzQW5ndWxhclpvbmVQcmVzZW50KCkpIHtcbiAgICB1bnRhaW50ZWRCYXNlUHJvdG90eXBlW2tleV0gPSBkZWZhdWx0T2JqLnByb3RvdHlwZTtcbiAgICByZXR1cm4gZGVmYXVsdE9iai5wcm90b3R5cGU7XG4gIH1cbiAgdHJ5IHtcbiAgICBjb25zdCBpZnJhbWVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWVFbCk7XG4gICAgY29uc3Qgd2luID0gaWZyYW1lRWwuY29udGVudFdpbmRvdztcbiAgICBpZiAoIXdpbikgcmV0dXJuIGRlZmF1bHRPYmoucHJvdG90eXBlO1xuICAgIGNvbnN0IHVudGFpbnRlZE9iamVjdCA9IHdpbltrZXldLnByb3RvdHlwZTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGlmcmFtZUVsKTtcbiAgICBpZiAoIXVudGFpbnRlZE9iamVjdCkgcmV0dXJuIGRlZmF1bHRQcm90b3R5cGU7XG4gICAgcmV0dXJuIHVudGFpbnRlZEJhc2VQcm90b3R5cGVba2V5XSA9IHVudGFpbnRlZE9iamVjdDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBkZWZhdWx0UHJvdG90eXBlO1xuICB9XG59XG5jb25zdCB1bnRhaW50ZWRBY2Nlc3NvckNhY2hlID0ge307XG5mdW5jdGlvbiBnZXRVbnRhaW50ZWRBY2Nlc3NvcihrZXksIGluc3RhbmNlLCBhY2Nlc3Nvcikge1xuICB2YXIgX2E7XG4gIGNvbnN0IGNhY2hlS2V5ID0gYCR7a2V5fS4ke1N0cmluZyhhY2Nlc3Nvcil9YDtcbiAgaWYgKHVudGFpbnRlZEFjY2Vzc29yQ2FjaGVbY2FjaGVLZXldKVxuICAgIHJldHVybiB1bnRhaW50ZWRBY2Nlc3NvckNhY2hlW2NhY2hlS2V5XS5jYWxsKFxuICAgICAgaW5zdGFuY2VcbiAgICApO1xuICBjb25zdCB1bnRhaW50ZWRQcm90b3R5cGUgPSBnZXRVbnRhaW50ZWRQcm90b3R5cGUoa2V5KTtcbiAgY29uc3QgdW50YWludGVkQWNjZXNzb3IgPSAoX2EgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFxuICAgIHVudGFpbnRlZFByb3RvdHlwZSxcbiAgICBhY2Nlc3NvclxuICApKSA9PSBudWxsID8gdm9pZCAwIDogX2EuZ2V0O1xuICBpZiAoIXVudGFpbnRlZEFjY2Vzc29yKSByZXR1cm4gaW5zdGFuY2VbYWNjZXNzb3JdO1xuICB1bnRhaW50ZWRBY2Nlc3NvckNhY2hlW2NhY2hlS2V5XSA9IHVudGFpbnRlZEFjY2Vzc29yO1xuICByZXR1cm4gdW50YWludGVkQWNjZXNzb3IuY2FsbChpbnN0YW5jZSk7XG59XG5jb25zdCB1bnRhaW50ZWRNZXRob2RDYWNoZSA9IHt9O1xuZnVuY3Rpb24gZ2V0VW50YWludGVkTWV0aG9kKGtleSwgaW5zdGFuY2UsIG1ldGhvZCkge1xuICBjb25zdCBjYWNoZUtleSA9IGAke2tleX0uJHtTdHJpbmcobWV0aG9kKX1gO1xuICBpZiAodW50YWludGVkTWV0aG9kQ2FjaGVbY2FjaGVLZXldKVxuICAgIHJldHVybiB1bnRhaW50ZWRNZXRob2RDYWNoZVtjYWNoZUtleV0uYmluZChcbiAgICAgIGluc3RhbmNlXG4gICAgKTtcbiAgY29uc3QgdW50YWludGVkUHJvdG90eXBlID0gZ2V0VW50YWludGVkUHJvdG90eXBlKGtleSk7XG4gIGNvbnN0IHVudGFpbnRlZE1ldGhvZCA9IHVudGFpbnRlZFByb3RvdHlwZVttZXRob2RdO1xuICBpZiAodHlwZW9mIHVudGFpbnRlZE1ldGhvZCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gaW5zdGFuY2VbbWV0aG9kXTtcbiAgdW50YWludGVkTWV0aG9kQ2FjaGVbY2FjaGVLZXldID0gdW50YWludGVkTWV0aG9kO1xuICByZXR1cm4gdW50YWludGVkTWV0aG9kLmJpbmQoaW5zdGFuY2UpO1xufVxuZnVuY3Rpb24gY2hpbGROb2RlcyhuKSB7XG4gIHJldHVybiBnZXRVbnRhaW50ZWRBY2Nlc3NvcihcIk5vZGVcIiwgbiwgXCJjaGlsZE5vZGVzXCIpO1xufVxuZnVuY3Rpb24gcGFyZW50Tm9kZShuKSB7XG4gIHJldHVybiBnZXRVbnRhaW50ZWRBY2Nlc3NvcihcIk5vZGVcIiwgbiwgXCJwYXJlbnROb2RlXCIpO1xufVxuZnVuY3Rpb24gcGFyZW50RWxlbWVudChuKSB7XG4gIHJldHVybiBnZXRVbnRhaW50ZWRBY2Nlc3NvcihcIk5vZGVcIiwgbiwgXCJwYXJlbnRFbGVtZW50XCIpO1xufVxuZnVuY3Rpb24gdGV4dENvbnRlbnQobikge1xuICByZXR1cm4gZ2V0VW50YWludGVkQWNjZXNzb3IoXCJOb2RlXCIsIG4sIFwidGV4dENvbnRlbnRcIik7XG59XG5mdW5jdGlvbiBjb250YWlucyhuLCBvdGhlcikge1xuICByZXR1cm4gZ2V0VW50YWludGVkTWV0aG9kKFwiTm9kZVwiLCBuLCBcImNvbnRhaW5zXCIpKG90aGVyKTtcbn1cbmZ1bmN0aW9uIGdldFJvb3ROb2RlKG4pIHtcbiAgcmV0dXJuIGdldFVudGFpbnRlZE1ldGhvZChcIk5vZGVcIiwgbiwgXCJnZXRSb290Tm9kZVwiKSgpO1xufVxuZnVuY3Rpb24gaG9zdChuKSB7XG4gIGlmICghbiB8fCAhKFwiaG9zdFwiIGluIG4pKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIGdldFVudGFpbnRlZEFjY2Vzc29yKFwiU2hhZG93Um9vdFwiLCBuLCBcImhvc3RcIik7XG59XG5mdW5jdGlvbiBzdHlsZVNoZWV0cyhuKSB7XG4gIHJldHVybiBuLnN0eWxlU2hlZXRzO1xufVxuZnVuY3Rpb24gc2hhZG93Um9vdChuKSB7XG4gIGlmICghbiB8fCAhKFwic2hhZG93Um9vdFwiIGluIG4pKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIGdldFVudGFpbnRlZEFjY2Vzc29yKFwiRWxlbWVudFwiLCBuLCBcInNoYWRvd1Jvb3RcIik7XG59XG5mdW5jdGlvbiBxdWVyeVNlbGVjdG9yKG4sIHNlbGVjdG9ycykge1xuICByZXR1cm4gZ2V0VW50YWludGVkQWNjZXNzb3IoXCJFbGVtZW50XCIsIG4sIFwicXVlcnlTZWxlY3RvclwiKShzZWxlY3RvcnMpO1xufVxuZnVuY3Rpb24gcXVlcnlTZWxlY3RvckFsbChuLCBzZWxlY3RvcnMpIHtcbiAgcmV0dXJuIGdldFVudGFpbnRlZEFjY2Vzc29yKFwiRWxlbWVudFwiLCBuLCBcInF1ZXJ5U2VsZWN0b3JBbGxcIikoc2VsZWN0b3JzKTtcbn1cbmZ1bmN0aW9uIG11dGF0aW9uT2JzZXJ2ZXJDdG9yKCkge1xuICByZXR1cm4gZ2V0VW50YWludGVkUHJvdG90eXBlKFwiTXV0YXRpb25PYnNlcnZlclwiKS5jb25zdHJ1Y3Rvcjtcbn1cbmZ1bmN0aW9uIHBhdGNoKHNvdXJjZSwgbmFtZSwgcmVwbGFjZW1lbnQpIHtcbiAgdHJ5IHtcbiAgICBpZiAoIShuYW1lIGluIHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zdCBvcmlnaW5hbCA9IHNvdXJjZVtuYW1lXTtcbiAgICBjb25zdCB3cmFwcGVkID0gcmVwbGFjZW1lbnQob3JpZ2luYWwpO1xuICAgIGlmICh0eXBlb2Ygd3JhcHBlZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB3cmFwcGVkLnByb3RvdHlwZSA9IHdyYXBwZWQucHJvdG90eXBlIHx8IHt9O1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMod3JhcHBlZCwge1xuICAgICAgICBfX3Jyd2ViX29yaWdpbmFsX186IHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICB2YWx1ZTogb3JpZ2luYWxcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHNvdXJjZVtuYW1lXSA9IHdyYXBwZWQ7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHNvdXJjZVtuYW1lXSA9IG9yaWdpbmFsO1xuICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgIH07XG4gIH1cbn1cbmNvbnN0IGluZGV4ID0ge1xuICBjaGlsZE5vZGVzLFxuICBwYXJlbnROb2RlLFxuICBwYXJlbnRFbGVtZW50LFxuICB0ZXh0Q29udGVudCxcbiAgY29udGFpbnMsXG4gIGdldFJvb3ROb2RlLFxuICBob3N0LFxuICBzdHlsZVNoZWV0cyxcbiAgc2hhZG93Um9vdCxcbiAgcXVlcnlTZWxlY3RvcixcbiAgcXVlcnlTZWxlY3RvckFsbCxcbiAgbXV0YXRpb25PYnNlcnZlcjogbXV0YXRpb25PYnNlcnZlckN0b3IsXG4gIHBhdGNoXG59O1xuZnVuY3Rpb24gaXNFbGVtZW50KG4pIHtcbiAgcmV0dXJuIG4ubm9kZVR5cGUgPT09IG4uRUxFTUVOVF9OT0RFO1xufVxuZnVuY3Rpb24gaXNTaGFkb3dSb290KG4pIHtcbiAgY29uc3QgaG9zdEVsID0gKFxuICAgIC8vIGFuY2hvciBhbmQgdGV4dGFyZWEgZWxlbWVudHMgYWxzbyBoYXZlIGEgYGhvc3RgIHByb3BlcnR5XG4gICAgLy8gYnV0IG9ubHkgc2hhZG93IHJvb3RzIGhhdmUgYSBgbW9kZWAgcHJvcGVydHlcbiAgICBuICYmIFwiaG9zdFwiIGluIG4gJiYgXCJtb2RlXCIgaW4gbiAmJiBpbmRleC5ob3N0KG4pIHx8IG51bGxcbiAgKTtcbiAgcmV0dXJuIEJvb2xlYW4oXG4gICAgaG9zdEVsICYmIFwic2hhZG93Um9vdFwiIGluIGhvc3RFbCAmJiBpbmRleC5zaGFkb3dSb290KGhvc3RFbCkgPT09IG5cbiAgKTtcbn1cbmZ1bmN0aW9uIGlzTmF0aXZlU2hhZG93RG9tKHNoYWRvd1Jvb3QyKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc2hhZG93Um9vdDIpID09PSBcIltvYmplY3QgU2hhZG93Um9vdF1cIjtcbn1cbmZ1bmN0aW9uIGZpeEJyb3dzZXJDb21wYXRpYmlsaXR5SXNzdWVzSW5DU1MoY3NzVGV4dCkge1xuICBpZiAoY3NzVGV4dC5pbmNsdWRlcyhcIiBiYWNrZ3JvdW5kLWNsaXA6IHRleHQ7XCIpICYmICFjc3NUZXh0LmluY2x1ZGVzKFwiIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOiB0ZXh0O1wiKSkge1xuICAgIGNzc1RleHQgPSBjc3NUZXh0LnJlcGxhY2UoXG4gICAgICAvXFxzYmFja2dyb3VuZC1jbGlwOlxccyp0ZXh0Oy9nLFxuICAgICAgXCIgLXdlYmtpdC1iYWNrZ3JvdW5kLWNsaXA6IHRleHQ7IGJhY2tncm91bmQtY2xpcDogdGV4dDtcIlxuICAgICk7XG4gIH1cbiAgcmV0dXJuIGNzc1RleHQ7XG59XG5mdW5jdGlvbiBlc2NhcGVJbXBvcnRTdGF0ZW1lbnQocnVsZTIpIHtcbiAgY29uc3QgeyBjc3NUZXh0IH0gPSBydWxlMjtcbiAgaWYgKGNzc1RleHQuc3BsaXQoJ1wiJykubGVuZ3RoIDwgMykgcmV0dXJuIGNzc1RleHQ7XG4gIGNvbnN0IHN0YXRlbWVudCA9IFtcIkBpbXBvcnRcIiwgYHVybCgke0pTT04uc3RyaW5naWZ5KHJ1bGUyLmhyZWYpfSlgXTtcbiAgaWYgKHJ1bGUyLmxheWVyTmFtZSA9PT0gXCJcIikge1xuICAgIHN0YXRlbWVudC5wdXNoKGBsYXllcmApO1xuICB9IGVsc2UgaWYgKHJ1bGUyLmxheWVyTmFtZSkge1xuICAgIHN0YXRlbWVudC5wdXNoKGBsYXllcigke3J1bGUyLmxheWVyTmFtZX0pYCk7XG4gIH1cbiAgaWYgKHJ1bGUyLnN1cHBvcnRzVGV4dCkge1xuICAgIHN0YXRlbWVudC5wdXNoKGBzdXBwb3J0cygke3J1bGUyLnN1cHBvcnRzVGV4dH0pYCk7XG4gIH1cbiAgaWYgKHJ1bGUyLm1lZGlhLmxlbmd0aCkge1xuICAgIHN0YXRlbWVudC5wdXNoKHJ1bGUyLm1lZGlhLm1lZGlhVGV4dCk7XG4gIH1cbiAgcmV0dXJuIHN0YXRlbWVudC5qb2luKFwiIFwiKSArIFwiO1wiO1xufVxuZnVuY3Rpb24gc3RyaW5naWZ5U3R5bGVzaGVldChzKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcnVsZXMgPSBzLnJ1bGVzIHx8IHMuY3NzUnVsZXM7XG4gICAgaWYgKCFydWxlcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGxldCBzaGVldEhyZWYgPSBzLmhyZWY7XG4gICAgaWYgKCFzaGVldEhyZWYgJiYgcy5vd25lck5vZGUgJiYgcy5vd25lck5vZGUub3duZXJEb2N1bWVudCkge1xuICAgICAgc2hlZXRIcmVmID0gcy5vd25lck5vZGUub3duZXJEb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xuICAgIH1cbiAgICBjb25zdCBzdHJpbmdpZmllZFJ1bGVzID0gQXJyYXkuZnJvbShcbiAgICAgIHJ1bGVzLFxuICAgICAgKHJ1bGUyKSA9PiBzdHJpbmdpZnlSdWxlKHJ1bGUyLCBzaGVldEhyZWYpXG4gICAgKS5qb2luKFwiXCIpO1xuICAgIHJldHVybiBmaXhCcm93c2VyQ29tcGF0aWJpbGl0eUlzc3Vlc0luQ1NTKHN0cmluZ2lmaWVkUnVsZXMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5mdW5jdGlvbiBzdHJpbmdpZnlSdWxlKHJ1bGUyLCBzaGVldEhyZWYpIHtcbiAgaWYgKGlzQ1NTSW1wb3J0UnVsZShydWxlMikpIHtcbiAgICBsZXQgaW1wb3J0U3RyaW5naWZpZWQ7XG4gICAgdHJ5IHtcbiAgICAgIGltcG9ydFN0cmluZ2lmaWVkID0gLy8gZm9yIHNhbWUtb3JpZ2luIHN0eWxlc2hlZXRzLFxuICAgICAgLy8gd2UgY2FuIGFjY2VzcyB0aGUgaW1wb3J0ZWQgc3R5bGVzaGVldCBydWxlcyBkaXJlY3RseVxuICAgICAgc3RyaW5naWZ5U3R5bGVzaGVldChydWxlMi5zdHlsZVNoZWV0KSB8fCAvLyB3b3JrIGFyb3VuZCBicm93c2VyIGlzc3VlcyB3aXRoIHRoZSByYXcgc3RyaW5nIGBAaW1wb3J0IHVybCguLi4pYCBzdGF0ZW1lbnRcbiAgICAgIGVzY2FwZUltcG9ydFN0YXRlbWVudChydWxlMik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGltcG9ydFN0cmluZ2lmaWVkID0gcnVsZTIuY3NzVGV4dDtcbiAgICB9XG4gICAgaWYgKHJ1bGUyLnN0eWxlU2hlZXQuaHJlZikge1xuICAgICAgcmV0dXJuIGFic29sdXRpZnlVUkxzKGltcG9ydFN0cmluZ2lmaWVkLCBydWxlMi5zdHlsZVNoZWV0LmhyZWYpO1xuICAgIH1cbiAgICByZXR1cm4gaW1wb3J0U3RyaW5naWZpZWQ7XG4gIH0gZWxzZSB7XG4gICAgbGV0IHJ1bGVTdHJpbmdpZmllZCA9IHJ1bGUyLmNzc1RleHQ7XG4gICAgaWYgKGlzQ1NTU3R5bGVSdWxlKHJ1bGUyKSAmJiBydWxlMi5zZWxlY3RvclRleHQuaW5jbHVkZXMoXCI6XCIpKSB7XG4gICAgICBydWxlU3RyaW5naWZpZWQgPSBmaXhTYWZhcmlDb2xvbnMocnVsZVN0cmluZ2lmaWVkKTtcbiAgICB9XG4gICAgaWYgKHNoZWV0SHJlZikge1xuICAgICAgcmV0dXJuIGFic29sdXRpZnlVUkxzKHJ1bGVTdHJpbmdpZmllZCwgc2hlZXRIcmVmKTtcbiAgICB9XG4gICAgcmV0dXJuIHJ1bGVTdHJpbmdpZmllZDtcbiAgfVxufVxuZnVuY3Rpb24gZml4U2FmYXJpQ29sb25zKGNzc1N0cmluZ2lmaWVkKSB7XG4gIGNvbnN0IHJlZ2V4ID0gLyhcXFsoPzpbXFx3LV0rKVteXFxcXF0pKDooPzpbXFx3LV0rKVxcXSkvZ207XG4gIHJldHVybiBjc3NTdHJpbmdpZmllZC5yZXBsYWNlKHJlZ2V4LCBcIiQxXFxcXCQyXCIpO1xufVxuZnVuY3Rpb24gaXNDU1NJbXBvcnRSdWxlKHJ1bGUyKSB7XG4gIHJldHVybiBcInN0eWxlU2hlZXRcIiBpbiBydWxlMjtcbn1cbmZ1bmN0aW9uIGlzQ1NTU3R5bGVSdWxlKHJ1bGUyKSB7XG4gIHJldHVybiBcInNlbGVjdG9yVGV4dFwiIGluIHJ1bGUyO1xufVxuY2xhc3MgTWlycm9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgX19wdWJsaWNGaWVsZCh0aGlzLCBcImlkTm9kZU1hcFwiLCAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpKTtcbiAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsIFwibm9kZU1ldGFNYXBcIiwgLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKCkpO1xuICB9XG4gIGdldElkKG4pIHtcbiAgICB2YXIgX2E7XG4gICAgaWYgKCFuKSByZXR1cm4gLTE7XG4gICAgY29uc3QgaWQgPSAoX2EgPSB0aGlzLmdldE1ldGEobikpID09IG51bGwgPyB2b2lkIDAgOiBfYS5pZDtcbiAgICByZXR1cm4gaWQgIT0gbnVsbCA/IGlkIDogLTE7XG4gIH1cbiAgZ2V0Tm9kZShpZCkge1xuICAgIHJldHVybiB0aGlzLmlkTm9kZU1hcC5nZXQoaWQpIHx8IG51bGw7XG4gIH1cbiAgZ2V0SWRzKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuaWROb2RlTWFwLmtleXMoKSk7XG4gIH1cbiAgZ2V0TWV0YShuKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZU1ldGFNYXAuZ2V0KG4pIHx8IG51bGw7XG4gIH1cbiAgLy8gcmVtb3ZlcyB0aGUgbm9kZSBmcm9tIGlkTm9kZU1hcFxuICAvLyBkb2Vzbid0IHJlbW92ZSB0aGUgbm9kZSBmcm9tIG5vZGVNZXRhTWFwXG4gIHJlbW92ZU5vZGVGcm9tTWFwKG4pIHtcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0SWQobik7XG4gICAgdGhpcy5pZE5vZGVNYXAuZGVsZXRlKGlkKTtcbiAgICBpZiAobi5jaGlsZE5vZGVzKSB7XG4gICAgICBuLmNoaWxkTm9kZXMuZm9yRWFjaChcbiAgICAgICAgKGNoaWxkTm9kZSkgPT4gdGhpcy5yZW1vdmVOb2RlRnJvbU1hcChjaGlsZE5vZGUpXG4gICAgICApO1xuICAgIH1cbiAgfVxuICBoYXMoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5pZE5vZGVNYXAuaGFzKGlkKTtcbiAgfVxuICBoYXNOb2RlKG5vZGUyKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZU1ldGFNYXAuaGFzKG5vZGUyKTtcbiAgfVxuICBhZGQobiwgbWV0YSkge1xuICAgIGNvbnN0IGlkID0gbWV0YS5pZDtcbiAgICB0aGlzLmlkTm9kZU1hcC5zZXQoaWQsIG4pO1xuICAgIHRoaXMubm9kZU1ldGFNYXAuc2V0KG4sIG1ldGEpO1xuICB9XG4gIHJlcGxhY2UoaWQsIG4pIHtcbiAgICBjb25zdCBvbGROb2RlID0gdGhpcy5nZXROb2RlKGlkKTtcbiAgICBpZiAob2xkTm9kZSkge1xuICAgICAgY29uc3QgbWV0YSA9IHRoaXMubm9kZU1ldGFNYXAuZ2V0KG9sZE5vZGUpO1xuICAgICAgaWYgKG1ldGEpIHRoaXMubm9kZU1ldGFNYXAuc2V0KG4sIG1ldGEpO1xuICAgIH1cbiAgICB0aGlzLmlkTm9kZU1hcC5zZXQoaWQsIG4pO1xuICB9XG4gIHJlc2V0KCkge1xuICAgIHRoaXMuaWROb2RlTWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbiAgICB0aGlzLm5vZGVNZXRhTWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZU1pcnJvcigpIHtcbiAgcmV0dXJuIG5ldyBNaXJyb3IoKTtcbn1cbmZ1bmN0aW9uIG1hc2tJbnB1dFZhbHVlKHtcbiAgZWxlbWVudCxcbiAgbWFza0lucHV0T3B0aW9ucyxcbiAgdGFnTmFtZSxcbiAgdHlwZSxcbiAgdmFsdWUsXG4gIG1hc2tJbnB1dEZuXG59KSB7XG4gIGxldCB0ZXh0ID0gdmFsdWUgfHwgXCJcIjtcbiAgY29uc3QgYWN0dWFsVHlwZSA9IHR5cGUgJiYgdG9Mb3dlckNhc2UodHlwZSk7XG4gIGlmIChtYXNrSW5wdXRPcHRpb25zW3RhZ05hbWUudG9Mb3dlckNhc2UoKV0gfHwgYWN0dWFsVHlwZSAmJiBtYXNrSW5wdXRPcHRpb25zW2FjdHVhbFR5cGVdKSB7XG4gICAgaWYgKG1hc2tJbnB1dEZuKSB7XG4gICAgICB0ZXh0ID0gbWFza0lucHV0Rm4odGV4dCwgZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRleHQgPSBcIipcIi5yZXBlYXQodGV4dC5sZW5ndGgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGV4dDtcbn1cbmZ1bmN0aW9uIHRvTG93ZXJDYXNlKHN0cikge1xuICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCk7XG59XG5jb25zdCBPUklHSU5BTF9BVFRSSUJVVEVfTkFNRSA9IFwiX19ycndlYl9vcmlnaW5hbF9fXCI7XG5mdW5jdGlvbiBpczJEQ2FudmFzQmxhbmsoY2FudmFzKSB7XG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gIGlmICghY3R4KSByZXR1cm4gdHJ1ZTtcbiAgY29uc3QgY2h1bmtTaXplID0gNTA7XG4gIGZvciAobGV0IHgyID0gMDsgeDIgPCBjYW52YXMud2lkdGg7IHgyICs9IGNodW5rU2l6ZSkge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgY2FudmFzLmhlaWdodDsgeSArPSBjaHVua1NpemUpIHtcbiAgICAgIGNvbnN0IGdldEltYWdlRGF0YSA9IGN0eC5nZXRJbWFnZURhdGE7XG4gICAgICBjb25zdCBvcmlnaW5hbEdldEltYWdlRGF0YSA9IE9SSUdJTkFMX0FUVFJJQlVURV9OQU1FIGluIGdldEltYWdlRGF0YSA/IGdldEltYWdlRGF0YVtPUklHSU5BTF9BVFRSSUJVVEVfTkFNRV0gOiBnZXRJbWFnZURhdGE7XG4gICAgICBjb25zdCBwaXhlbEJ1ZmZlciA9IG5ldyBVaW50MzJBcnJheShcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXJndW1lbnQsIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtbWVtYmVyLWFjY2Vzc1xuICAgICAgICBvcmlnaW5hbEdldEltYWdlRGF0YS5jYWxsKFxuICAgICAgICAgIGN0eCxcbiAgICAgICAgICB4MixcbiAgICAgICAgICB5LFxuICAgICAgICAgIE1hdGgubWluKGNodW5rU2l6ZSwgY2FudmFzLndpZHRoIC0geDIpLFxuICAgICAgICAgIE1hdGgubWluKGNodW5rU2l6ZSwgY2FudmFzLmhlaWdodCAtIHkpXG4gICAgICAgICkuZGF0YS5idWZmZXJcbiAgICAgICk7XG4gICAgICBpZiAocGl4ZWxCdWZmZXIuc29tZSgocGl4ZWwpID0+IHBpeGVsICE9PSAwKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGlzTm9kZU1ldGFFcXVhbChhLCBiKSB7XG4gIGlmICghYSB8fCAhYiB8fCBhLnR5cGUgIT09IGIudHlwZSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoYS50eXBlID09PSBOb2RlVHlwZS5Eb2N1bWVudClcbiAgICByZXR1cm4gYS5jb21wYXRNb2RlID09PSBiLmNvbXBhdE1vZGU7XG4gIGVsc2UgaWYgKGEudHlwZSA9PT0gTm9kZVR5cGUuRG9jdW1lbnRUeXBlKVxuICAgIHJldHVybiBhLm5hbWUgPT09IGIubmFtZSAmJiBhLnB1YmxpY0lkID09PSBiLnB1YmxpY0lkICYmIGEuc3lzdGVtSWQgPT09IGIuc3lzdGVtSWQ7XG4gIGVsc2UgaWYgKGEudHlwZSA9PT0gTm9kZVR5cGUuQ29tbWVudCB8fCBhLnR5cGUgPT09IE5vZGVUeXBlLlRleHQgfHwgYS50eXBlID09PSBOb2RlVHlwZS5DREFUQSlcbiAgICByZXR1cm4gYS50ZXh0Q29udGVudCA9PT0gYi50ZXh0Q29udGVudDtcbiAgZWxzZSBpZiAoYS50eXBlID09PSBOb2RlVHlwZS5FbGVtZW50KVxuICAgIHJldHVybiBhLnRhZ05hbWUgPT09IGIudGFnTmFtZSAmJiBKU09OLnN0cmluZ2lmeShhLmF0dHJpYnV0ZXMpID09PSBKU09OLnN0cmluZ2lmeShiLmF0dHJpYnV0ZXMpICYmIGEuaXNTVkcgPT09IGIuaXNTVkcgJiYgYS5uZWVkQmxvY2sgPT09IGIubmVlZEJsb2NrO1xuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBnZXRJbnB1dFR5cGUoZWxlbWVudCkge1xuICBjb25zdCB0eXBlID0gZWxlbWVudC50eXBlO1xuICByZXR1cm4gZWxlbWVudC5oYXNBdHRyaWJ1dGUoXCJkYXRhLXJyLWlzLXBhc3N3b3JkXCIpID8gXCJwYXNzd29yZFwiIDogdHlwZSA/IChcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVubmVjZXNzYXJ5LXR5cGUtYXNzZXJ0aW9uXG4gICAgdG9Mb3dlckNhc2UodHlwZSlcbiAgKSA6IG51bGw7XG59XG5mdW5jdGlvbiBleHRyYWN0RmlsZUV4dGVuc2lvbihwYXRoLCBiYXNlVVJMKSB7XG4gIHZhciBfYTtcbiAgbGV0IHVybDtcbiAgdHJ5IHtcbiAgICB1cmwgPSBuZXcgVVJMKHBhdGgsIGJhc2VVUkwgIT0gbnVsbCA/IGJhc2VVUkwgOiB3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IHJlZ2V4ID0gL1xcLihbMC05YS16XSspKD86JCkvaTtcbiAgY29uc3QgbWF0Y2ggPSB1cmwucGF0aG5hbWUubWF0Y2gocmVnZXgpO1xuICByZXR1cm4gKF9hID0gbWF0Y2ggPT0gbnVsbCA/IHZvaWQgMCA6IG1hdGNoWzFdKSAhPSBudWxsID8gX2EgOiBudWxsO1xufVxuZnVuY3Rpb24gZXh0cmFjdE9yaWdpbih1cmwpIHtcbiAgbGV0IG9yaWdpbiA9IFwiXCI7XG4gIGlmICh1cmwuaW5kZXhPZihcIi8vXCIpID4gLTEpIHtcbiAgICBvcmlnaW4gPSB1cmwuc3BsaXQoXCIvXCIpLnNsaWNlKDAsIDMpLmpvaW4oXCIvXCIpO1xuICB9IGVsc2Uge1xuICAgIG9yaWdpbiA9IHVybC5zcGxpdChcIi9cIilbMF07XG4gIH1cbiAgb3JpZ2luID0gb3JpZ2luLnNwbGl0KFwiP1wiKVswXTtcbiAgcmV0dXJuIG9yaWdpbjtcbn1cbmNvbnN0IFVSTF9JTl9DU1NfUkVGID0gL3VybFxcKCg/OignKShbXiddKiknfChcIikoLio/KVwifChbXildKikpXFwpL2dtO1xuY29uc3QgVVJMX1BST1RPQ09MX01BVENIID0gL14oPzpbYS16K10rOik/XFwvXFwvL2k7XG5jb25zdCBVUkxfV1dXX01BVENIID0gL153d3dcXC4uKi9pO1xuY29uc3QgREFUQV9VUkkgPSAvXihkYXRhOikoW14sXSopLCguKikvaTtcbmZ1bmN0aW9uIGFic29sdXRpZnlVUkxzKGNzc1RleHQsIGhyZWYpIHtcbiAgcmV0dXJuIChjc3NUZXh0IHx8IFwiXCIpLnJlcGxhY2UoXG4gICAgVVJMX0lOX0NTU19SRUYsXG4gICAgKG9yaWdpbiwgcXVvdGUxLCBwYXRoMSwgcXVvdGUyLCBwYXRoMiwgcGF0aDMpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aDEgfHwgcGF0aDIgfHwgcGF0aDM7XG4gICAgICBjb25zdCBtYXliZVF1b3RlID0gcXVvdGUxIHx8IHF1b3RlMiB8fCBcIlwiO1xuICAgICAgaWYgKCFmaWxlUGF0aCkge1xuICAgICAgICByZXR1cm4gb3JpZ2luO1xuICAgICAgfVxuICAgICAgaWYgKFVSTF9QUk9UT0NPTF9NQVRDSC50ZXN0KGZpbGVQYXRoKSB8fCBVUkxfV1dXX01BVENILnRlc3QoZmlsZVBhdGgpKSB7XG4gICAgICAgIHJldHVybiBgdXJsKCR7bWF5YmVRdW90ZX0ke2ZpbGVQYXRofSR7bWF5YmVRdW90ZX0pYDtcbiAgICAgIH1cbiAgICAgIGlmIChEQVRBX1VSSS50ZXN0KGZpbGVQYXRoKSkge1xuICAgICAgICByZXR1cm4gYHVybCgke21heWJlUXVvdGV9JHtmaWxlUGF0aH0ke21heWJlUXVvdGV9KWA7XG4gICAgICB9XG4gICAgICBpZiAoZmlsZVBhdGhbMF0gPT09IFwiL1wiKSB7XG4gICAgICAgIHJldHVybiBgdXJsKCR7bWF5YmVRdW90ZX0ke2V4dHJhY3RPcmlnaW4oaHJlZikgKyBmaWxlUGF0aH0ke21heWJlUXVvdGV9KWA7XG4gICAgICB9XG4gICAgICBjb25zdCBzdGFjayA9IGhyZWYuc3BsaXQoXCIvXCIpO1xuICAgICAgY29uc3QgcGFydHMgPSBmaWxlUGF0aC5zcGxpdChcIi9cIik7XG4gICAgICBzdGFjay5wb3AoKTtcbiAgICAgIGZvciAoY29uc3QgcGFydCBvZiBwYXJ0cykge1xuICAgICAgICBpZiAocGFydCA9PT0gXCIuXCIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBlbHNlIGlmIChwYXJ0ID09PSBcIi4uXCIpIHtcbiAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdGFjay5wdXNoKHBhcnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYHVybCgke21heWJlUXVvdGV9JHtzdGFjay5qb2luKFwiL1wiKX0ke21heWJlUXVvdGV9KWA7XG4gICAgfVxuICApO1xufVxuZnVuY3Rpb24gbm9ybWFsaXplQ3NzU3RyaW5nKGNzc1RleHQsIF90ZXN0Tm9QeE5vcm0gPSBmYWxzZSkge1xuICBpZiAoX3Rlc3ROb1B4Tm9ybSkge1xuICAgIHJldHVybiBjc3NUZXh0LnJlcGxhY2UoLyhcXC9cXCpbXipdKlxcKlxcLyl8W1xccztdL2csIFwiXCIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjc3NUZXh0LnJlcGxhY2UoLyhcXC9cXCpbXipdKlxcKlxcLyl8W1xccztdL2csIFwiXCIpLnJlcGxhY2UoLzBweC9nLCBcIjBcIik7XG4gIH1cbn1cbmZ1bmN0aW9uIHNwbGl0Q3NzVGV4dChjc3NUZXh0LCBzdHlsZSwgX3Rlc3ROb1B4Tm9ybSA9IGZhbHNlKSB7XG4gIGNvbnN0IGNoaWxkTm9kZXMyID0gQXJyYXkuZnJvbShzdHlsZS5jaGlsZE5vZGVzKTtcbiAgY29uc3Qgc3BsaXRzID0gW107XG4gIGxldCBpdGVyQ291bnQgPSAwO1xuICBpZiAoY2hpbGROb2RlczIubGVuZ3RoID4gMSAmJiBjc3NUZXh0ICYmIHR5cGVvZiBjc3NUZXh0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgbGV0IGNzc1RleHROb3JtID0gbm9ybWFsaXplQ3NzU3RyaW5nKGNzc1RleHQsIF90ZXN0Tm9QeE5vcm0pO1xuICAgIGNvbnN0IG5vcm1GYWN0b3IgPSBjc3NUZXh0Tm9ybS5sZW5ndGggLyBjc3NUZXh0Lmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGNoaWxkTm9kZXMyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY2hpbGROb2RlczJbaV0udGV4dENvbnRlbnQgJiYgdHlwZW9mIGNoaWxkTm9kZXMyW2ldLnRleHRDb250ZW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNvbnN0IHRleHRDb250ZW50Tm9ybSA9IG5vcm1hbGl6ZUNzc1N0cmluZyhcbiAgICAgICAgICBjaGlsZE5vZGVzMltpXS50ZXh0Q29udGVudCxcbiAgICAgICAgICBfdGVzdE5vUHhOb3JtXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGpMaW1pdCA9IDEwMDtcbiAgICAgICAgbGV0IGogPSAzO1xuICAgICAgICBmb3IgKDsgaiA8IHRleHRDb250ZW50Tm9ybS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIC8vIGtlZXAgY29uc3VtaW5nIGNzcyBpZGVudGlmaWVycyAodG8gZ2V0IGEgZGVjZW50IGNodW5rIG1vcmUgcXVpY2tseSlcbiAgICAgICAgICAgIHRleHRDb250ZW50Tm9ybVtqXS5tYXRjaCgvW2EtekEtWjAtOV0vKSB8fCAvLyBzdWJzdHJpbmcgbmVlZHMgdG8gYmUgdW5pcXVlIHRvIHRoaXMgc2VjdGlvblxuICAgICAgICAgICAgdGV4dENvbnRlbnROb3JtLmluZGV4T2YodGV4dENvbnRlbnROb3JtLnN1YnN0cmluZygwLCBqKSwgMSkgIT09IC0xXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICg7IGogPCB0ZXh0Q29udGVudE5vcm0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBsZXQgc3RhcnRTdWJzdHJpbmcgPSB0ZXh0Q29udGVudE5vcm0uc3Vic3RyaW5nKDAsIGopO1xuICAgICAgICAgIGxldCBjc3NOb3JtU3BsaXRzID0gY3NzVGV4dE5vcm0uc3BsaXQoc3RhcnRTdWJzdHJpbmcpO1xuICAgICAgICAgIGxldCBzcGxpdE5vcm0gPSAtMTtcbiAgICAgICAgICBpZiAoY3NzTm9ybVNwbGl0cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHNwbGl0Tm9ybSA9IGNzc05vcm1TcGxpdHNbMF0ubGVuZ3RoO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3NzTm9ybVNwbGl0cy5sZW5ndGggPiAyICYmIGNzc05vcm1TcGxpdHNbMF0gPT09IFwiXCIgJiYgY2hpbGROb2RlczJbaSAtIDFdLnRleHRDb250ZW50ICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBzcGxpdE5vcm0gPSBjc3NUZXh0Tm9ybS5pbmRleE9mKHN0YXJ0U3Vic3RyaW5nLCAxKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNzc05vcm1TcGxpdHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBzdGFydFN1YnN0cmluZyA9IHN0YXJ0U3Vic3RyaW5nLnN1YnN0cmluZyhcbiAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgc3RhcnRTdWJzdHJpbmcubGVuZ3RoIC0gMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNzc05vcm1TcGxpdHMgPSBjc3NUZXh0Tm9ybS5zcGxpdChzdGFydFN1YnN0cmluZyk7XG4gICAgICAgICAgICBpZiAoY3NzTm9ybVNwbGl0cy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgICBzcGxpdHMucHVzaChjc3NUZXh0KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHNwbGl0cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGogPSBqTGltaXQgKyAxO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaiA9PT0gdGV4dENvbnRlbnROb3JtLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHNwbGl0Tm9ybSA9IGNzc1RleHROb3JtLmluZGV4T2Yoc3RhcnRTdWJzdHJpbmcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY3NzTm9ybVNwbGl0cy5sZW5ndGggPj0gMiAmJiBqID4gakxpbWl0KSB7XG4gICAgICAgICAgICBjb25zdCBwcmV2VGV4dENvbnRlbnQgPSBjaGlsZE5vZGVzMltpIC0gMV0udGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBpZiAocHJldlRleHRDb250ZW50ICYmIHR5cGVvZiBwcmV2VGV4dENvbnRlbnQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgY29uc3QgcHJldk1pbkxlbmd0aCA9IG5vcm1hbGl6ZUNzc1N0cmluZyhwcmV2VGV4dENvbnRlbnQpLmxlbmd0aDtcbiAgICAgICAgICAgICAgc3BsaXROb3JtID0gY3NzVGV4dE5vcm0uaW5kZXhPZihzdGFydFN1YnN0cmluZywgcHJldk1pbkxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3BsaXROb3JtID09PSAtMSkge1xuICAgICAgICAgICAgICBzcGxpdE5vcm0gPSBjc3NOb3JtU3BsaXRzWzBdLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNwbGl0Tm9ybSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBrID0gTWF0aC5mbG9vcihzcGxpdE5vcm0gLyBub3JtRmFjdG9yKTtcbiAgICAgICAgICAgIGZvciAoOyBrID4gMCAmJiBrIDwgY3NzVGV4dC5sZW5ndGg7ICkge1xuICAgICAgICAgICAgICBpdGVyQ291bnQgKz0gMTtcbiAgICAgICAgICAgICAgaWYgKGl0ZXJDb3VudCA+IDUwICogY2hpbGROb2RlczIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc3BsaXRzLnB1c2goY3NzVGV4dCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwbGl0cztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBub3JtUGFydCA9IG5vcm1hbGl6ZUNzc1N0cmluZyhcbiAgICAgICAgICAgICAgICBjc3NUZXh0LnN1YnN0cmluZygwLCBrKSxcbiAgICAgICAgICAgICAgICBfdGVzdE5vUHhOb3JtXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmIChub3JtUGFydC5sZW5ndGggPT09IHNwbGl0Tm9ybSkge1xuICAgICAgICAgICAgICAgIHNwbGl0cy5wdXNoKGNzc1RleHQuc3Vic3RyaW5nKDAsIGspKTtcbiAgICAgICAgICAgICAgICBjc3NUZXh0ID0gY3NzVGV4dC5zdWJzdHJpbmcoayk7XG4gICAgICAgICAgICAgICAgY3NzVGV4dE5vcm0gPSBjc3NUZXh0Tm9ybS5zdWJzdHJpbmcoc3BsaXROb3JtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChub3JtUGFydC5sZW5ndGggPCBzcGxpdE5vcm0pIHtcbiAgICAgICAgICAgICAgICBrICs9IE1hdGgubWF4KFxuICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoKHNwbGl0Tm9ybSAtIG5vcm1QYXJ0Lmxlbmd0aCkgLyBub3JtRmFjdG9yKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgayAtPSBNYXRoLm1heChcbiAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKChub3JtUGFydC5sZW5ndGggLSBzcGxpdE5vcm0pICogbm9ybUZhY3RvcilcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc3BsaXRzLnB1c2goY3NzVGV4dCk7XG4gIHJldHVybiBzcGxpdHM7XG59XG5mdW5jdGlvbiBtYXJrQ3NzU3BsaXRzKGNzc1RleHQsIHN0eWxlKSB7XG4gIHJldHVybiBzcGxpdENzc1RleHQoY3NzVGV4dCwgc3R5bGUpLmpvaW4oXCIvKiBycl9zcGxpdCAqL1wiKTtcbn1cbmxldCBfaWQgPSAxO1xuY29uc3QgdGFnTmFtZVJlZ2V4ID0gbmV3IFJlZ0V4cChcIlteYS16MC05LV86XVwiKTtcbmNvbnN0IElHTk9SRURfTk9ERSA9IC0yO1xuZnVuY3Rpb24gZ2VuSWQoKSB7XG4gIHJldHVybiBfaWQrKztcbn1cbmZ1bmN0aW9uIGdldFZhbGlkVGFnTmFtZShlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEZvcm1FbGVtZW50KSB7XG4gICAgcmV0dXJuIFwiZm9ybVwiO1xuICB9XG4gIGNvbnN0IHByb2Nlc3NlZFRhZ05hbWUgPSB0b0xvd2VyQ2FzZShlbGVtZW50LnRhZ05hbWUpO1xuICBpZiAodGFnTmFtZVJlZ2V4LnRlc3QocHJvY2Vzc2VkVGFnTmFtZSkpIHtcbiAgICByZXR1cm4gXCJkaXZcIjtcbiAgfVxuICByZXR1cm4gcHJvY2Vzc2VkVGFnTmFtZTtcbn1cbmxldCBjYW52YXNTZXJ2aWNlO1xubGV0IGNhbnZhc0N0eDtcbmNvbnN0IFNSQ1NFVF9OT1RfU1BBQ0VTID0gL15bXiBcXHRcXG5cXHJcXHUwMDBjXSsvO1xuY29uc3QgU1JDU0VUX0NPTU1BU19PUl9TUEFDRVMgPSAvXlssIFxcdFxcblxcclxcdTAwMGNdKy87XG5mdW5jdGlvbiBnZXRBYnNvbHV0ZVNyY3NldFN0cmluZyhkb2MsIGF0dHJpYnV0ZVZhbHVlKSB7XG4gIGlmIChhdHRyaWJ1dGVWYWx1ZS50cmltKCkgPT09IFwiXCIpIHtcbiAgICByZXR1cm4gYXR0cmlidXRlVmFsdWU7XG4gIH1cbiAgbGV0IHBvcyA9IDA7XG4gIGZ1bmN0aW9uIGNvbGxlY3RDaGFyYWN0ZXJzKHJlZ0V4KSB7XG4gICAgbGV0IGNoYXJzO1xuICAgIGNvbnN0IG1hdGNoID0gcmVnRXguZXhlYyhhdHRyaWJ1dGVWYWx1ZS5zdWJzdHJpbmcocG9zKSk7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICBjaGFycyA9IG1hdGNoWzBdO1xuICAgICAgcG9zICs9IGNoYXJzLmxlbmd0aDtcbiAgICAgIHJldHVybiBjaGFycztcbiAgICB9XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbiAgY29uc3Qgb3V0cHV0ID0gW107XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgY29sbGVjdENoYXJhY3RlcnMoU1JDU0VUX0NPTU1BU19PUl9TUEFDRVMpO1xuICAgIGlmIChwb3MgPj0gYXR0cmlidXRlVmFsdWUubGVuZ3RoKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgbGV0IHVybCA9IGNvbGxlY3RDaGFyYWN0ZXJzKFNSQ1NFVF9OT1RfU1BBQ0VTKTtcbiAgICBpZiAodXJsLnNsaWNlKC0xKSA9PT0gXCIsXCIpIHtcbiAgICAgIHVybCA9IGFic29sdXRlVG9Eb2MoZG9jLCB1cmwuc3Vic3RyaW5nKDAsIHVybC5sZW5ndGggLSAxKSk7XG4gICAgICBvdXRwdXQucHVzaCh1cmwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZGVzY3JpcHRvcnNTdHIgPSBcIlwiO1xuICAgICAgdXJsID0gYWJzb2x1dGVUb0RvYyhkb2MsIHVybCk7XG4gICAgICBsZXQgaW5QYXJlbnMgPSBmYWxzZTtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGNvbnN0IGMgPSBhdHRyaWJ1dGVWYWx1ZS5jaGFyQXQocG9zKTtcbiAgICAgICAgaWYgKGMgPT09IFwiXCIpIHtcbiAgICAgICAgICBvdXRwdXQucHVzaCgodXJsICsgZGVzY3JpcHRvcnNTdHIpLnRyaW0oKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSBpZiAoIWluUGFyZW5zKSB7XG4gICAgICAgICAgaWYgKGMgPT09IFwiLFwiKSB7XG4gICAgICAgICAgICBwb3MgKz0gMTtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKCh1cmwgKyBkZXNjcmlwdG9yc1N0cikudHJpbSgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gXCIoXCIpIHtcbiAgICAgICAgICAgIGluUGFyZW5zID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGMgPT09IFwiKVwiKSB7XG4gICAgICAgICAgICBpblBhcmVucyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkZXNjcmlwdG9yc1N0ciArPSBjO1xuICAgICAgICBwb3MgKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKFwiLCBcIik7XG59XG5jb25zdCBjYWNoZWREb2N1bWVudCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpO1xuZnVuY3Rpb24gYWJzb2x1dGVUb0RvYyhkb2MsIGF0dHJpYnV0ZVZhbHVlKSB7XG4gIGlmICghYXR0cmlidXRlVmFsdWUgfHwgYXR0cmlidXRlVmFsdWUudHJpbSgpID09PSBcIlwiKSB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZVZhbHVlO1xuICB9XG4gIHJldHVybiBnZXRIcmVmKGRvYywgYXR0cmlidXRlVmFsdWUpO1xufVxuZnVuY3Rpb24gaXNTVkdFbGVtZW50KGVsKSB7XG4gIHJldHVybiBCb29sZWFuKGVsLnRhZ05hbWUgPT09IFwic3ZnXCIgfHwgZWwub3duZXJTVkdFbGVtZW50KTtcbn1cbmZ1bmN0aW9uIGdldEhyZWYoZG9jLCBjdXN0b21IcmVmKSB7XG4gIGxldCBhID0gY2FjaGVkRG9jdW1lbnQuZ2V0KGRvYyk7XG4gIGlmICghYSkge1xuICAgIGEgPSBkb2MuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgY2FjaGVkRG9jdW1lbnQuc2V0KGRvYywgYSk7XG4gIH1cbiAgaWYgKCFjdXN0b21IcmVmKSB7XG4gICAgY3VzdG9tSHJlZiA9IFwiXCI7XG4gIH0gZWxzZSBpZiAoY3VzdG9tSHJlZi5zdGFydHNXaXRoKFwiYmxvYjpcIikgfHwgY3VzdG9tSHJlZi5zdGFydHNXaXRoKFwiZGF0YTpcIikpIHtcbiAgICByZXR1cm4gY3VzdG9tSHJlZjtcbiAgfVxuICBhLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgY3VzdG9tSHJlZik7XG4gIHJldHVybiBhLmhyZWY7XG59XG5mdW5jdGlvbiB0cmFuc2Zvcm1BdHRyaWJ1dGUoZG9jLCB0YWdOYW1lLCBuYW1lLCB2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChuYW1lID09PSBcInNyY1wiIHx8IG5hbWUgPT09IFwiaHJlZlwiICYmICEodGFnTmFtZSA9PT0gXCJ1c2VcIiAmJiB2YWx1ZVswXSA9PT0gXCIjXCIpKSB7XG4gICAgcmV0dXJuIGFic29sdXRlVG9Eb2MoZG9jLCB2YWx1ZSk7XG4gIH0gZWxzZSBpZiAobmFtZSA9PT0gXCJ4bGluazpocmVmXCIgJiYgdmFsdWVbMF0gIT09IFwiI1wiKSB7XG4gICAgcmV0dXJuIGFic29sdXRlVG9Eb2MoZG9jLCB2YWx1ZSk7XG4gIH0gZWxzZSBpZiAobmFtZSA9PT0gXCJiYWNrZ3JvdW5kXCIgJiYgKHRhZ05hbWUgPT09IFwidGFibGVcIiB8fCB0YWdOYW1lID09PSBcInRkXCIgfHwgdGFnTmFtZSA9PT0gXCJ0aFwiKSkge1xuICAgIHJldHVybiBhYnNvbHV0ZVRvRG9jKGRvYywgdmFsdWUpO1xuICB9IGVsc2UgaWYgKG5hbWUgPT09IFwic3Jjc2V0XCIpIHtcbiAgICByZXR1cm4gZ2V0QWJzb2x1dGVTcmNzZXRTdHJpbmcoZG9jLCB2YWx1ZSk7XG4gIH0gZWxzZSBpZiAobmFtZSA9PT0gXCJzdHlsZVwiKSB7XG4gICAgcmV0dXJuIGFic29sdXRpZnlVUkxzKHZhbHVlLCBnZXRIcmVmKGRvYykpO1xuICB9IGVsc2UgaWYgKHRhZ05hbWUgPT09IFwib2JqZWN0XCIgJiYgbmFtZSA9PT0gXCJkYXRhXCIpIHtcbiAgICByZXR1cm4gYWJzb2x1dGVUb0RvYyhkb2MsIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5mdW5jdGlvbiBpZ25vcmVBdHRyaWJ1dGUodGFnTmFtZSwgbmFtZSwgX3ZhbHVlKSB7XG4gIHJldHVybiAodGFnTmFtZSA9PT0gXCJ2aWRlb1wiIHx8IHRhZ05hbWUgPT09IFwiYXVkaW9cIikgJiYgbmFtZSA9PT0gXCJhdXRvcGxheVwiO1xufVxuZnVuY3Rpb24gX2lzQmxvY2tlZEVsZW1lbnQoZWxlbWVudCwgYmxvY2tDbGFzcywgYmxvY2tTZWxlY3Rvcikge1xuICB0cnkge1xuICAgIGlmICh0eXBlb2YgYmxvY2tDbGFzcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGJsb2NrQ2xhc3MpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBlSW5kZXggPSBlbGVtZW50LmNsYXNzTGlzdC5sZW5ndGg7IGVJbmRleC0tOyApIHtcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc0xpc3RbZUluZGV4XTtcbiAgICAgICAgaWYgKGJsb2NrQ2xhc3MudGVzdChjbGFzc05hbWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGJsb2NrU2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBlbGVtZW50Lm1hdGNoZXMoYmxvY2tTZWxlY3Rvcik7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gY2xhc3NNYXRjaGVzUmVnZXgobm9kZTIsIHJlZ2V4LCBjaGVja0FuY2VzdG9ycykge1xuICBpZiAoIW5vZGUyKSByZXR1cm4gZmFsc2U7XG4gIGlmIChub2RlMi5ub2RlVHlwZSAhPT0gbm9kZTIuRUxFTUVOVF9OT0RFKSB7XG4gICAgaWYgKCFjaGVja0FuY2VzdG9ycykgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBjbGFzc01hdGNoZXNSZWdleChpbmRleC5wYXJlbnROb2RlKG5vZGUyKSwgcmVnZXgsIGNoZWNrQW5jZXN0b3JzKTtcbiAgfVxuICBmb3IgKGxldCBlSW5kZXggPSBub2RlMi5jbGFzc0xpc3QubGVuZ3RoOyBlSW5kZXgtLTsgKSB7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gbm9kZTIuY2xhc3NMaXN0W2VJbmRleF07XG4gICAgaWYgKHJlZ2V4LnRlc3QoY2xhc3NOYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIGlmICghY2hlY2tBbmNlc3RvcnMpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGNsYXNzTWF0Y2hlc1JlZ2V4KGluZGV4LnBhcmVudE5vZGUobm9kZTIpLCByZWdleCwgY2hlY2tBbmNlc3RvcnMpO1xufVxuZnVuY3Rpb24gbmVlZE1hc2tpbmdUZXh0KG5vZGUyLCBtYXNrVGV4dENsYXNzLCBtYXNrVGV4dFNlbGVjdG9yLCBjaGVja0FuY2VzdG9ycykge1xuICBsZXQgZWw7XG4gIGlmIChpc0VsZW1lbnQobm9kZTIpKSB7XG4gICAgZWwgPSBub2RlMjtcbiAgICBpZiAoIWluZGV4LmNoaWxkTm9kZXMoZWwpLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpbmRleC5wYXJlbnRFbGVtZW50KG5vZGUyKSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBlbCA9IGluZGV4LnBhcmVudEVsZW1lbnQobm9kZTIpO1xuICB9XG4gIHRyeSB7XG4gICAgaWYgKHR5cGVvZiBtYXNrVGV4dENsYXNzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBpZiAoY2hlY2tBbmNlc3RvcnMpIHtcbiAgICAgICAgaWYgKGVsLmNsb3Nlc3QoYC4ke21hc2tUZXh0Q2xhc3N9YCkpIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyhtYXNrVGV4dENsYXNzKSkgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjbGFzc01hdGNoZXNSZWdleChlbCwgbWFza1RleHRDbGFzcywgY2hlY2tBbmNlc3RvcnMpKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG1hc2tUZXh0U2VsZWN0b3IpIHtcbiAgICAgIGlmIChjaGVja0FuY2VzdG9ycykge1xuICAgICAgICBpZiAoZWwuY2xvc2VzdChtYXNrVGV4dFNlbGVjdG9yKSkgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZWwubWF0Y2hlcyhtYXNrVGV4dFNlbGVjdG9yKSkgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gb25jZUlmcmFtZUxvYWRlZChpZnJhbWVFbCwgbGlzdGVuZXIsIGlmcmFtZUxvYWRUaW1lb3V0KSB7XG4gIGNvbnN0IHdpbiA9IGlmcmFtZUVsLmNvbnRlbnRXaW5kb3c7XG4gIGlmICghd2luKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBmaXJlZCA9IGZhbHNlO1xuICBsZXQgcmVhZHlTdGF0ZTtcbiAgdHJ5IHtcbiAgICByZWFkeVN0YXRlID0gd2luLmRvY3VtZW50LnJlYWR5U3RhdGU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChyZWFkeVN0YXRlICE9PSBcImNvbXBsZXRlXCIpIHtcbiAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKCFmaXJlZCkge1xuICAgICAgICBsaXN0ZW5lcigpO1xuICAgICAgICBmaXJlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSwgaWZyYW1lTG9hZFRpbWVvdXQpO1xuICAgIGlmcmFtZUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lcigpO1xuICAgIH0pO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBibGFua1VybCA9IFwiYWJvdXQ6YmxhbmtcIjtcbiAgaWYgKHdpbi5sb2NhdGlvbi5ocmVmICE9PSBibGFua1VybCB8fCBpZnJhbWVFbC5zcmMgPT09IGJsYW5rVXJsIHx8IGlmcmFtZUVsLnNyYyA9PT0gXCJcIikge1xuICAgIHNldFRpbWVvdXQobGlzdGVuZXIsIDApO1xuICAgIHJldHVybiBpZnJhbWVFbC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBsaXN0ZW5lcik7XG4gIH1cbiAgaWZyYW1lRWwuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbGlzdGVuZXIpO1xufVxuZnVuY3Rpb24gb25jZVN0eWxlc2hlZXRMb2FkZWQobGluaywgbGlzdGVuZXIsIHN0eWxlU2hlZXRMb2FkVGltZW91dCkge1xuICBsZXQgZmlyZWQgPSBmYWxzZTtcbiAgbGV0IHN0eWxlU2hlZXRMb2FkZWQ7XG4gIHRyeSB7XG4gICAgc3R5bGVTaGVldExvYWRlZCA9IGxpbmsuc2hlZXQ7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChzdHlsZVNoZWV0TG9hZGVkKSByZXR1cm47XG4gIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgbGlzdGVuZXIoKTtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICB9XG4gIH0sIHN0eWxlU2hlZXRMb2FkVGltZW91dCk7XG4gIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgZmlyZWQgPSB0cnVlO1xuICAgIGxpc3RlbmVyKCk7XG4gIH0pO1xufVxuZnVuY3Rpb24gc2VyaWFsaXplTm9kZShuLCBvcHRpb25zKSB7XG4gIGNvbnN0IHtcbiAgICBkb2MsXG4gICAgbWlycm9yLFxuICAgIGJsb2NrQ2xhc3MsXG4gICAgYmxvY2tTZWxlY3RvcixcbiAgICBuZWVkc01hc2ssXG4gICAgaW5saW5lU3R5bGVzaGVldCxcbiAgICBtYXNrSW5wdXRPcHRpb25zID0ge30sXG4gICAgbWFza1RleHRGbixcbiAgICBtYXNrSW5wdXRGbixcbiAgICBkYXRhVVJMT3B0aW9ucyA9IHt9LFxuICAgIGlubGluZUltYWdlcyxcbiAgICByZWNvcmRDYW52YXMsXG4gICAga2VlcElmcmFtZVNyY0ZuLFxuICAgIG5ld2x5QWRkZWRFbGVtZW50ID0gZmFsc2UsXG4gICAgY3NzQ2FwdHVyZWQgPSBmYWxzZVxuICB9ID0gb3B0aW9ucztcbiAgY29uc3Qgcm9vdElkID0gZ2V0Um9vdElkKGRvYywgbWlycm9yKTtcbiAgc3dpdGNoIChuLm5vZGVUeXBlKSB7XG4gICAgY2FzZSBuLkRPQ1VNRU5UX05PREU6XG4gICAgICBpZiAobi5jb21wYXRNb2RlICE9PSBcIkNTUzFDb21wYXRcIikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHR5cGU6IE5vZGVUeXBlLkRvY3VtZW50LFxuICAgICAgICAgIGNoaWxkTm9kZXM6IFtdLFxuICAgICAgICAgIGNvbXBhdE1vZGU6IG4uY29tcGF0TW9kZVxuICAgICAgICAgIC8vIHByb2JhYmx5IFwiQmFja0NvbXBhdFwiXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHR5cGU6IE5vZGVUeXBlLkRvY3VtZW50LFxuICAgICAgICAgIGNoaWxkTm9kZXM6IFtdXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgY2FzZSBuLkRPQ1VNRU5UX1RZUEVfTk9ERTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IE5vZGVUeXBlLkRvY3VtZW50VHlwZSxcbiAgICAgICAgbmFtZTogbi5uYW1lLFxuICAgICAgICBwdWJsaWNJZDogbi5wdWJsaWNJZCxcbiAgICAgICAgc3lzdGVtSWQ6IG4uc3lzdGVtSWQsXG4gICAgICAgIHJvb3RJZFxuICAgICAgfTtcbiAgICBjYXNlIG4uRUxFTUVOVF9OT0RFOlxuICAgICAgcmV0dXJuIHNlcmlhbGl6ZUVsZW1lbnROb2RlKG4sIHtcbiAgICAgICAgZG9jLFxuICAgICAgICBibG9ja0NsYXNzLFxuICAgICAgICBibG9ja1NlbGVjdG9yLFxuICAgICAgICBpbmxpbmVTdHlsZXNoZWV0LFxuICAgICAgICBtYXNrSW5wdXRPcHRpb25zLFxuICAgICAgICBtYXNrSW5wdXRGbixcbiAgICAgICAgZGF0YVVSTE9wdGlvbnMsXG4gICAgICAgIGlubGluZUltYWdlcyxcbiAgICAgICAgcmVjb3JkQ2FudmFzLFxuICAgICAgICBrZWVwSWZyYW1lU3JjRm4sXG4gICAgICAgIG5ld2x5QWRkZWRFbGVtZW50LFxuICAgICAgICByb290SWRcbiAgICAgIH0pO1xuICAgIGNhc2Ugbi5URVhUX05PREU6XG4gICAgICByZXR1cm4gc2VyaWFsaXplVGV4dE5vZGUobiwge1xuICAgICAgICBkb2MsXG4gICAgICAgIG5lZWRzTWFzayxcbiAgICAgICAgbWFza1RleHRGbixcbiAgICAgICAgcm9vdElkLFxuICAgICAgICBjc3NDYXB0dXJlZFxuICAgICAgfSk7XG4gICAgY2FzZSBuLkNEQVRBX1NFQ1RJT05fTk9ERTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IE5vZGVUeXBlLkNEQVRBLFxuICAgICAgICB0ZXh0Q29udGVudDogXCJcIixcbiAgICAgICAgcm9vdElkXG4gICAgICB9O1xuICAgIGNhc2Ugbi5DT01NRU5UX05PREU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBOb2RlVHlwZS5Db21tZW50LFxuICAgICAgICB0ZXh0Q29udGVudDogaW5kZXgudGV4dENvbnRlbnQobikgfHwgXCJcIixcbiAgICAgICAgcm9vdElkXG4gICAgICB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFJvb3RJZChkb2MsIG1pcnJvcikge1xuICBpZiAoIW1pcnJvci5oYXNOb2RlKGRvYykpIHJldHVybiB2b2lkIDA7XG4gIGNvbnN0IGRvY0lkID0gbWlycm9yLmdldElkKGRvYyk7XG4gIHJldHVybiBkb2NJZCA9PT0gMSA/IHZvaWQgMCA6IGRvY0lkO1xufVxuZnVuY3Rpb24gc2VyaWFsaXplVGV4dE5vZGUobiwgb3B0aW9ucykge1xuICBjb25zdCB7IG5lZWRzTWFzaywgbWFza1RleHRGbiwgcm9vdElkLCBjc3NDYXB0dXJlZCB9ID0gb3B0aW9ucztcbiAgY29uc3QgcGFyZW50ID0gaW5kZXgucGFyZW50Tm9kZShuKTtcbiAgY29uc3QgcGFyZW50VGFnTmFtZSA9IHBhcmVudCAmJiBwYXJlbnQudGFnTmFtZTtcbiAgbGV0IHRleHRDb250ZW50MiA9IFwiXCI7XG4gIGNvbnN0IGlzU3R5bGUgPSBwYXJlbnRUYWdOYW1lID09PSBcIlNUWUxFXCIgPyB0cnVlIDogdm9pZCAwO1xuICBjb25zdCBpc1NjcmlwdCA9IHBhcmVudFRhZ05hbWUgPT09IFwiU0NSSVBUXCIgPyB0cnVlIDogdm9pZCAwO1xuICBpZiAoaXNTY3JpcHQpIHtcbiAgICB0ZXh0Q29udGVudDIgPSBcIlNDUklQVF9QTEFDRUhPTERFUlwiO1xuICB9IGVsc2UgaWYgKCFjc3NDYXB0dXJlZCkge1xuICAgIHRleHRDb250ZW50MiA9IGluZGV4LnRleHRDb250ZW50KG4pO1xuICAgIGlmIChpc1N0eWxlICYmIHRleHRDb250ZW50Mikge1xuICAgICAgdGV4dENvbnRlbnQyID0gYWJzb2x1dGlmeVVSTHModGV4dENvbnRlbnQyLCBnZXRIcmVmKG9wdGlvbnMuZG9jKSk7XG4gICAgfVxuICB9XG4gIGlmICghaXNTdHlsZSAmJiAhaXNTY3JpcHQgJiYgdGV4dENvbnRlbnQyICYmIG5lZWRzTWFzaykge1xuICAgIHRleHRDb250ZW50MiA9IG1hc2tUZXh0Rm4gPyBtYXNrVGV4dEZuKHRleHRDb250ZW50MiwgaW5kZXgucGFyZW50RWxlbWVudChuKSkgOiB0ZXh0Q29udGVudDIucmVwbGFjZSgvW1xcU10vZywgXCIqXCIpO1xuICB9XG4gIHJldHVybiB7XG4gICAgdHlwZTogTm9kZVR5cGUuVGV4dCxcbiAgICB0ZXh0Q29udGVudDogdGV4dENvbnRlbnQyIHx8IFwiXCIsXG4gICAgcm9vdElkXG4gIH07XG59XG5mdW5jdGlvbiBzZXJpYWxpemVFbGVtZW50Tm9kZShuLCBvcHRpb25zKSB7XG4gIGNvbnN0IHtcbiAgICBkb2MsXG4gICAgYmxvY2tDbGFzcyxcbiAgICBibG9ja1NlbGVjdG9yLFxuICAgIGlubGluZVN0eWxlc2hlZXQsXG4gICAgbWFza0lucHV0T3B0aW9ucyA9IHt9LFxuICAgIG1hc2tJbnB1dEZuLFxuICAgIGRhdGFVUkxPcHRpb25zID0ge30sXG4gICAgaW5saW5lSW1hZ2VzLFxuICAgIHJlY29yZENhbnZhcyxcbiAgICBrZWVwSWZyYW1lU3JjRm4sXG4gICAgbmV3bHlBZGRlZEVsZW1lbnQgPSBmYWxzZSxcbiAgICByb290SWRcbiAgfSA9IG9wdGlvbnM7XG4gIGNvbnN0IG5lZWRCbG9jayA9IF9pc0Jsb2NrZWRFbGVtZW50KG4sIGJsb2NrQ2xhc3MsIGJsb2NrU2VsZWN0b3IpO1xuICBjb25zdCB0YWdOYW1lID0gZ2V0VmFsaWRUYWdOYW1lKG4pO1xuICBsZXQgYXR0cmlidXRlcyA9IHt9O1xuICBjb25zdCBsZW4gPSBuLmF0dHJpYnV0ZXMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgYXR0ciA9IG4uYXR0cmlidXRlc1tpXTtcbiAgICBpZiAoIWlnbm9yZUF0dHJpYnV0ZSh0YWdOYW1lLCBhdHRyLm5hbWUsIGF0dHIudmFsdWUpKSB7XG4gICAgICBhdHRyaWJ1dGVzW2F0dHIubmFtZV0gPSB0cmFuc2Zvcm1BdHRyaWJ1dGUoXG4gICAgICAgIGRvYyxcbiAgICAgICAgdGFnTmFtZSxcbiAgICAgICAgdG9Mb3dlckNhc2UoYXR0ci5uYW1lKSxcbiAgICAgICAgYXR0ci52YWx1ZVxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgaWYgKHRhZ05hbWUgPT09IFwibGlua1wiICYmIGlubGluZVN0eWxlc2hlZXQpIHtcbiAgICBjb25zdCBzdHlsZXNoZWV0ID0gQXJyYXkuZnJvbShkb2Muc3R5bGVTaGVldHMpLmZpbmQoKHMpID0+IHtcbiAgICAgIHJldHVybiBzLmhyZWYgPT09IG4uaHJlZjtcbiAgICB9KTtcbiAgICBsZXQgY3NzVGV4dCA9IG51bGw7XG4gICAgaWYgKHN0eWxlc2hlZXQpIHtcbiAgICAgIGNzc1RleHQgPSBzdHJpbmdpZnlTdHlsZXNoZWV0KHN0eWxlc2hlZXQpO1xuICAgIH1cbiAgICBpZiAoY3NzVGV4dCkge1xuICAgICAgZGVsZXRlIGF0dHJpYnV0ZXMucmVsO1xuICAgICAgZGVsZXRlIGF0dHJpYnV0ZXMuaHJlZjtcbiAgICAgIGF0dHJpYnV0ZXMuX2Nzc1RleHQgPSBjc3NUZXh0O1xuICAgIH1cbiAgfVxuICBpZiAodGFnTmFtZSA9PT0gXCJzdHlsZVwiICYmIG4uc2hlZXQpIHtcbiAgICBsZXQgY3NzVGV4dCA9IHN0cmluZ2lmeVN0eWxlc2hlZXQoXG4gICAgICBuLnNoZWV0XG4gICAgKTtcbiAgICBpZiAoY3NzVGV4dCkge1xuICAgICAgaWYgKG4uY2hpbGROb2Rlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGNzc1RleHQgPSBtYXJrQ3NzU3BsaXRzKGNzc1RleHQsIG4pO1xuICAgICAgfVxuICAgICAgYXR0cmlidXRlcy5fY3NzVGV4dCA9IGNzc1RleHQ7XG4gICAgfVxuICB9XG4gIGlmICh0YWdOYW1lID09PSBcImlucHV0XCIgfHwgdGFnTmFtZSA9PT0gXCJ0ZXh0YXJlYVwiIHx8IHRhZ05hbWUgPT09IFwic2VsZWN0XCIpIHtcbiAgICBjb25zdCB2YWx1ZSA9IG4udmFsdWU7XG4gICAgY29uc3QgY2hlY2tlZCA9IG4uY2hlY2tlZDtcbiAgICBpZiAoYXR0cmlidXRlcy50eXBlICE9PSBcInJhZGlvXCIgJiYgYXR0cmlidXRlcy50eXBlICE9PSBcImNoZWNrYm94XCIgJiYgYXR0cmlidXRlcy50eXBlICE9PSBcInN1Ym1pdFwiICYmIGF0dHJpYnV0ZXMudHlwZSAhPT0gXCJidXR0b25cIiAmJiB2YWx1ZSkge1xuICAgICAgYXR0cmlidXRlcy52YWx1ZSA9IG1hc2tJbnB1dFZhbHVlKHtcbiAgICAgICAgZWxlbWVudDogbixcbiAgICAgICAgdHlwZTogZ2V0SW5wdXRUeXBlKG4pLFxuICAgICAgICB0YWdOYW1lLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgbWFza0lucHV0T3B0aW9ucyxcbiAgICAgICAgbWFza0lucHV0Rm5cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tlZCkge1xuICAgICAgYXR0cmlidXRlcy5jaGVja2VkID0gY2hlY2tlZDtcbiAgICB9XG4gIH1cbiAgaWYgKHRhZ05hbWUgPT09IFwib3B0aW9uXCIpIHtcbiAgICBpZiAobi5zZWxlY3RlZCAmJiAhbWFza0lucHV0T3B0aW9uc1tcInNlbGVjdFwiXSkge1xuICAgICAgYXR0cmlidXRlcy5zZWxlY3RlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBhdHRyaWJ1dGVzLnNlbGVjdGVkO1xuICAgIH1cbiAgfVxuICBpZiAodGFnTmFtZSA9PT0gXCJkaWFsb2dcIiAmJiBuLm9wZW4pIHtcbiAgICBhdHRyaWJ1dGVzLnJyX29wZW5fbW9kZSA9IG4ubWF0Y2hlcyhcImRpYWxvZzptb2RhbFwiKSA/IFwibW9kYWxcIiA6IFwibm9uLW1vZGFsXCI7XG4gIH1cbiAgaWYgKHRhZ05hbWUgPT09IFwiY2FudmFzXCIgJiYgcmVjb3JkQ2FudmFzKSB7XG4gICAgaWYgKG4uX19jb250ZXh0ID09PSBcIjJkXCIpIHtcbiAgICAgIGlmICghaXMyRENhbnZhc0JsYW5rKG4pKSB7XG4gICAgICAgIGF0dHJpYnV0ZXMucnJfZGF0YVVSTCA9IG4udG9EYXRhVVJMKFxuICAgICAgICAgIGRhdGFVUkxPcHRpb25zLnR5cGUsXG4gICAgICAgICAgZGF0YVVSTE9wdGlvbnMucXVhbGl0eVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIShcIl9fY29udGV4dFwiIGluIG4pKSB7XG4gICAgICBjb25zdCBjYW52YXNEYXRhVVJMID0gbi50b0RhdGFVUkwoXG4gICAgICAgIGRhdGFVUkxPcHRpb25zLnR5cGUsXG4gICAgICAgIGRhdGFVUkxPcHRpb25zLnF1YWxpdHlcbiAgICAgICk7XG4gICAgICBjb25zdCBibGFua0NhbnZhcyA9IGRvYy5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgYmxhbmtDYW52YXMud2lkdGggPSBuLndpZHRoO1xuICAgICAgYmxhbmtDYW52YXMuaGVpZ2h0ID0gbi5oZWlnaHQ7XG4gICAgICBjb25zdCBibGFua0NhbnZhc0RhdGFVUkwgPSBibGFua0NhbnZhcy50b0RhdGFVUkwoXG4gICAgICAgIGRhdGFVUkxPcHRpb25zLnR5cGUsXG4gICAgICAgIGRhdGFVUkxPcHRpb25zLnF1YWxpdHlcbiAgICAgICk7XG4gICAgICBpZiAoY2FudmFzRGF0YVVSTCAhPT0gYmxhbmtDYW52YXNEYXRhVVJMKSB7XG4gICAgICAgIGF0dHJpYnV0ZXMucnJfZGF0YVVSTCA9IGNhbnZhc0RhdGFVUkw7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmICh0YWdOYW1lID09PSBcImltZ1wiICYmIGlubGluZUltYWdlcykge1xuICAgIGlmICghY2FudmFzU2VydmljZSkge1xuICAgICAgY2FudmFzU2VydmljZSA9IGRvYy5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgY2FudmFzQ3R4ID0gY2FudmFzU2VydmljZS5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgfVxuICAgIGNvbnN0IGltYWdlID0gbjtcbiAgICBjb25zdCBpbWFnZVNyYyA9IGltYWdlLmN1cnJlbnRTcmMgfHwgaW1hZ2UuZ2V0QXR0cmlidXRlKFwic3JjXCIpIHx8IFwiPHVua25vd24tc3JjPlwiO1xuICAgIGNvbnN0IHByaW9yQ3Jvc3NPcmlnaW4gPSBpbWFnZS5jcm9zc09yaWdpbjtcbiAgICBjb25zdCByZWNvcmRJbmxpbmVJbWFnZSA9ICgpID0+IHtcbiAgICAgIGltYWdlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHJlY29yZElubGluZUltYWdlKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNhbnZhc1NlcnZpY2Uud2lkdGggPSBpbWFnZS5uYXR1cmFsV2lkdGg7XG4gICAgICAgIGNhbnZhc1NlcnZpY2UuaGVpZ2h0ID0gaW1hZ2UubmF0dXJhbEhlaWdodDtcbiAgICAgICAgY2FudmFzQ3R4LmRyYXdJbWFnZShpbWFnZSwgMCwgMCk7XG4gICAgICAgIGF0dHJpYnV0ZXMucnJfZGF0YVVSTCA9IGNhbnZhc1NlcnZpY2UudG9EYXRhVVJMKFxuICAgICAgICAgIGRhdGFVUkxPcHRpb25zLnR5cGUsXG4gICAgICAgICAgZGF0YVVSTE9wdGlvbnMucXVhbGl0eVxuICAgICAgICApO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGlmIChpbWFnZS5jcm9zc09yaWdpbiAhPT0gXCJhbm9ueW1vdXNcIikge1xuICAgICAgICAgIGltYWdlLmNyb3NzT3JpZ2luID0gXCJhbm9ueW1vdXNcIjtcbiAgICAgICAgICBpZiAoaW1hZ2UuY29tcGxldGUgJiYgaW1hZ2UubmF0dXJhbFdpZHRoICE9PSAwKVxuICAgICAgICAgICAgcmVjb3JkSW5saW5lSW1hZ2UoKTtcbiAgICAgICAgICBlbHNlIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHJlY29yZElubGluZUltYWdlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgYENhbm5vdCBpbmxpbmUgaW1nIHNyYz0ke2ltYWdlU3JjfSEgRXJyb3I6ICR7ZXJyfWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaW1hZ2UuY3Jvc3NPcmlnaW4gPT09IFwiYW5vbnltb3VzXCIpIHtcbiAgICAgICAgcHJpb3JDcm9zc09yaWdpbiA/IGF0dHJpYnV0ZXMuY3Jvc3NPcmlnaW4gPSBwcmlvckNyb3NzT3JpZ2luIDogaW1hZ2UucmVtb3ZlQXR0cmlidXRlKFwiY3Jvc3NvcmlnaW5cIik7XG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAoaW1hZ2UuY29tcGxldGUgJiYgaW1hZ2UubmF0dXJhbFdpZHRoICE9PSAwKSByZWNvcmRJbmxpbmVJbWFnZSgpO1xuICAgIGVsc2UgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgcmVjb3JkSW5saW5lSW1hZ2UpO1xuICB9XG4gIGlmICh0YWdOYW1lID09PSBcImF1ZGlvXCIgfHwgdGFnTmFtZSA9PT0gXCJ2aWRlb1wiKSB7XG4gICAgY29uc3QgbWVkaWFBdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcbiAgICBtZWRpYUF0dHJpYnV0ZXMucnJfbWVkaWFTdGF0ZSA9IG4ucGF1c2VkID8gXCJwYXVzZWRcIiA6IFwicGxheWVkXCI7XG4gICAgbWVkaWFBdHRyaWJ1dGVzLnJyX21lZGlhQ3VycmVudFRpbWUgPSBuLmN1cnJlbnRUaW1lO1xuICAgIG1lZGlhQXR0cmlidXRlcy5ycl9tZWRpYVBsYXliYWNrUmF0ZSA9IG4ucGxheWJhY2tSYXRlO1xuICAgIG1lZGlhQXR0cmlidXRlcy5ycl9tZWRpYU11dGVkID0gbi5tdXRlZDtcbiAgICBtZWRpYUF0dHJpYnV0ZXMucnJfbWVkaWFMb29wID0gbi5sb29wO1xuICAgIG1lZGlhQXR0cmlidXRlcy5ycl9tZWRpYVZvbHVtZSA9IG4udm9sdW1lO1xuICB9XG4gIGlmICghbmV3bHlBZGRlZEVsZW1lbnQpIHtcbiAgICBpZiAobi5zY3JvbGxMZWZ0KSB7XG4gICAgICBhdHRyaWJ1dGVzLnJyX3Njcm9sbExlZnQgPSBuLnNjcm9sbExlZnQ7XG4gICAgfVxuICAgIGlmIChuLnNjcm9sbFRvcCkge1xuICAgICAgYXR0cmlidXRlcy5ycl9zY3JvbGxUb3AgPSBuLnNjcm9sbFRvcDtcbiAgICB9XG4gIH1cbiAgaWYgKG5lZWRCbG9jaykge1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBhdHRyaWJ1dGVzID0ge1xuICAgICAgY2xhc3M6IGF0dHJpYnV0ZXMuY2xhc3MsXG4gICAgICBycl93aWR0aDogYCR7d2lkdGh9cHhgLFxuICAgICAgcnJfaGVpZ2h0OiBgJHtoZWlnaHR9cHhgXG4gICAgfTtcbiAgfVxuICBpZiAodGFnTmFtZSA9PT0gXCJpZnJhbWVcIiAmJiAha2VlcElmcmFtZVNyY0ZuKGF0dHJpYnV0ZXMuc3JjKSkge1xuICAgIGlmICghbi5jb250ZW50RG9jdW1lbnQpIHtcbiAgICAgIGF0dHJpYnV0ZXMucnJfc3JjID0gYXR0cmlidXRlcy5zcmM7XG4gICAgfVxuICAgIGRlbGV0ZSBhdHRyaWJ1dGVzLnNyYztcbiAgfVxuICBsZXQgaXNDdXN0b21FbGVtZW50O1xuICB0cnkge1xuICAgIGlmIChjdXN0b21FbGVtZW50cy5nZXQodGFnTmFtZSkpIGlzQ3VzdG9tRWxlbWVudCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgfVxuICByZXR1cm4ge1xuICAgIHR5cGU6IE5vZGVUeXBlLkVsZW1lbnQsXG4gICAgdGFnTmFtZSxcbiAgICBhdHRyaWJ1dGVzLFxuICAgIGNoaWxkTm9kZXM6IFtdLFxuICAgIGlzU1ZHOiBpc1NWR0VsZW1lbnQobikgfHwgdm9pZCAwLFxuICAgIG5lZWRCbG9jayxcbiAgICByb290SWQsXG4gICAgaXNDdXN0b206IGlzQ3VzdG9tRWxlbWVudFxuICB9O1xufVxuZnVuY3Rpb24gbG93ZXJJZkV4aXN0cyhtYXliZUF0dHIpIHtcbiAgaWYgKG1heWJlQXR0ciA9PT0gdm9pZCAwIHx8IG1heWJlQXR0ciA9PT0gbnVsbCkge1xuICAgIHJldHVybiBcIlwiO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBtYXliZUF0dHIudG9Mb3dlckNhc2UoKTtcbiAgfVxufVxuZnVuY3Rpb24gc2xpbURPTUV4Y2x1ZGVkKHNuLCBzbGltRE9NT3B0aW9ucykge1xuICBpZiAoc2xpbURPTU9wdGlvbnMuY29tbWVudCAmJiBzbi50eXBlID09PSBOb2RlVHlwZS5Db21tZW50KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoc24udHlwZSA9PT0gTm9kZVR5cGUuRWxlbWVudCkge1xuICAgIGlmIChzbGltRE9NT3B0aW9ucy5zY3JpcHQgJiYgLy8gc2NyaXB0IHRhZ1xuICAgIChzbi50YWdOYW1lID09PSBcInNjcmlwdFwiIHx8IC8vIChtb2R1bGUpcHJlbG9hZCBsaW5rXG4gICAgc24udGFnTmFtZSA9PT0gXCJsaW5rXCIgJiYgKHNuLmF0dHJpYnV0ZXMucmVsID09PSBcInByZWxvYWRcIiAmJiBzbi5hdHRyaWJ1dGVzLmFzID09PSBcInNjcmlwdFwiIHx8IHNuLmF0dHJpYnV0ZXMucmVsID09PSBcIm1vZHVsZXByZWxvYWRcIikgfHwgLy8gcHJlZmV0Y2ggbGlua1xuICAgIHNuLnRhZ05hbWUgPT09IFwibGlua1wiICYmIHNuLmF0dHJpYnV0ZXMucmVsID09PSBcInByZWZldGNoXCIgJiYgdHlwZW9mIHNuLmF0dHJpYnV0ZXMuaHJlZiA9PT0gXCJzdHJpbmdcIiAmJiBleHRyYWN0RmlsZUV4dGVuc2lvbihzbi5hdHRyaWJ1dGVzLmhyZWYpID09PSBcImpzXCIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHNsaW1ET01PcHRpb25zLmhlYWRGYXZpY29uICYmIChzbi50YWdOYW1lID09PSBcImxpbmtcIiAmJiBzbi5hdHRyaWJ1dGVzLnJlbCA9PT0gXCJzaG9ydGN1dCBpY29uXCIgfHwgc24udGFnTmFtZSA9PT0gXCJtZXRhXCIgJiYgKGxvd2VySWZFeGlzdHMoc24uYXR0cmlidXRlcy5uYW1lKS5tYXRjaChcbiAgICAgIC9ebXNhcHBsaWNhdGlvbi10aWxlKGltYWdlfGNvbG9yKSQvXG4gICAgKSB8fCBsb3dlcklmRXhpc3RzKHNuLmF0dHJpYnV0ZXMubmFtZSkgPT09IFwiYXBwbGljYXRpb24tbmFtZVwiIHx8IGxvd2VySWZFeGlzdHMoc24uYXR0cmlidXRlcy5yZWwpID09PSBcImljb25cIiB8fCBsb3dlcklmRXhpc3RzKHNuLmF0dHJpYnV0ZXMucmVsKSA9PT0gXCJhcHBsZS10b3VjaC1pY29uXCIgfHwgbG93ZXJJZkV4aXN0cyhzbi5hdHRyaWJ1dGVzLnJlbCkgPT09IFwic2hvcnRjdXQgaWNvblwiKSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoc24udGFnTmFtZSA9PT0gXCJtZXRhXCIpIHtcbiAgICAgIGlmIChzbGltRE9NT3B0aW9ucy5oZWFkTWV0YURlc2NLZXl3b3JkcyAmJiBsb3dlcklmRXhpc3RzKHNuLmF0dHJpYnV0ZXMubmFtZSkubWF0Y2goL15kZXNjcmlwdGlvbnxrZXl3b3JkcyQvKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoc2xpbURPTU9wdGlvbnMuaGVhZE1ldGFTb2NpYWwgJiYgKGxvd2VySWZFeGlzdHMoc24uYXR0cmlidXRlcy5wcm9wZXJ0eSkubWF0Y2goL14ob2d8dHdpdHRlcnxmYik6LykgfHwgLy8gb2cgPSBvcGVuZ3JhcGggKGZhY2Vib29rKVxuICAgICAgbG93ZXJJZkV4aXN0cyhzbi5hdHRyaWJ1dGVzLm5hbWUpLm1hdGNoKC9eKG9nfHR3aXR0ZXIpOi8pIHx8IGxvd2VySWZFeGlzdHMoc24uYXR0cmlidXRlcy5uYW1lKSA9PT0gXCJwaW50ZXJlc3RcIikpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHNsaW1ET01PcHRpb25zLmhlYWRNZXRhUm9ib3RzICYmIChsb3dlcklmRXhpc3RzKHNuLmF0dHJpYnV0ZXMubmFtZSkgPT09IFwicm9ib3RzXCIgfHwgbG93ZXJJZkV4aXN0cyhzbi5hdHRyaWJ1dGVzLm5hbWUpID09PSBcImdvb2dsZWJvdFwiIHx8IGxvd2VySWZFeGlzdHMoc24uYXR0cmlidXRlcy5uYW1lKSA9PT0gXCJiaW5nYm90XCIpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChzbGltRE9NT3B0aW9ucy5oZWFkTWV0YUh0dHBFcXVpdiAmJiBzbi5hdHRyaWJ1dGVzW1wiaHR0cC1lcXVpdlwiXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChzbGltRE9NT3B0aW9ucy5oZWFkTWV0YUF1dGhvcnNoaXAgJiYgKGxvd2VySWZFeGlzdHMoc24uYXR0cmlidXRlcy5uYW1lKSA9PT0gXCJhdXRob3JcIiB8fCBsb3dlcklmRXhpc3RzKHNuLmF0dHJpYnV0ZXMubmFtZSkgPT09IFwiZ2VuZXJhdG9yXCIgfHwgbG93ZXJJZkV4aXN0cyhzbi5hdHRyaWJ1dGVzLm5hbWUpID09PSBcImZyYW1ld29ya1wiIHx8IGxvd2VySWZFeGlzdHMoc24uYXR0cmlidXRlcy5uYW1lKSA9PT0gXCJwdWJsaXNoZXJcIiB8fCBsb3dlcklmRXhpc3RzKHNuLmF0dHJpYnV0ZXMubmFtZSkgPT09IFwicHJvZ2lkXCIgfHwgbG93ZXJJZkV4aXN0cyhzbi5hdHRyaWJ1dGVzLnByb3BlcnR5KS5tYXRjaCgvXmFydGljbGU6LykgfHwgbG93ZXJJZkV4aXN0cyhzbi5hdHRyaWJ1dGVzLnByb3BlcnR5KS5tYXRjaCgvXnByb2R1Y3Q6LykpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChzbGltRE9NT3B0aW9ucy5oZWFkTWV0YVZlcmlmaWNhdGlvbiAmJiAobG93ZXJJZkV4aXN0cyhzbi5hdHRyaWJ1dGVzLm5hbWUpID09PSBcImdvb2dsZS1zaXRlLXZlcmlmaWNhdGlvblwiIHx8IGxvd2VySWZFeGlzdHMoc24uYXR0cmlidXRlcy5uYW1lKSA9PT0gXCJ5YW5kZXgtdmVyaWZpY2F0aW9uXCIgfHwgbG93ZXJJZkV4aXN0cyhzbi5hdHRyaWJ1dGVzLm5hbWUpID09PSBcImNzcmYtdG9rZW5cIiB8fCBsb3dlcklmRXhpc3RzKHNuLmF0dHJpYnV0ZXMubmFtZSkgPT09IFwicDpkb21haW5fdmVyaWZ5XCIgfHwgbG93ZXJJZkV4aXN0cyhzbi5hdHRyaWJ1dGVzLm5hbWUpID09PSBcInZlcmlmeS12MVwiIHx8IGxvd2VySWZFeGlzdHMoc24uYXR0cmlidXRlcy5uYW1lKSA9PT0gXCJ2ZXJpZmljYXRpb25cIiB8fCBsb3dlcklmRXhpc3RzKHNuLmF0dHJpYnV0ZXMubmFtZSkgPT09IFwic2hvcGlmeS1jaGVja291dC1hcGktdG9rZW5cIikpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIHNlcmlhbGl6ZU5vZGVXaXRoSWQobiwgb3B0aW9ucykge1xuICBjb25zdCB7XG4gICAgZG9jLFxuICAgIG1pcnJvcixcbiAgICBibG9ja0NsYXNzLFxuICAgIGJsb2NrU2VsZWN0b3IsXG4gICAgbWFza1RleHRDbGFzcyxcbiAgICBtYXNrVGV4dFNlbGVjdG9yLFxuICAgIHNraXBDaGlsZCA9IGZhbHNlLFxuICAgIGlubGluZVN0eWxlc2hlZXQgPSB0cnVlLFxuICAgIG1hc2tJbnB1dE9wdGlvbnMgPSB7fSxcbiAgICBtYXNrVGV4dEZuLFxuICAgIG1hc2tJbnB1dEZuLFxuICAgIHNsaW1ET01PcHRpb25zLFxuICAgIGRhdGFVUkxPcHRpb25zID0ge30sXG4gICAgaW5saW5lSW1hZ2VzID0gZmFsc2UsXG4gICAgcmVjb3JkQ2FudmFzID0gZmFsc2UsXG4gICAgb25TZXJpYWxpemUsXG4gICAgb25JZnJhbWVMb2FkLFxuICAgIGlmcmFtZUxvYWRUaW1lb3V0ID0gNWUzLFxuICAgIG9uU3R5bGVzaGVldExvYWQsXG4gICAgc3R5bGVzaGVldExvYWRUaW1lb3V0ID0gNWUzLFxuICAgIGtlZXBJZnJhbWVTcmNGbiA9ICgpID0+IGZhbHNlLFxuICAgIG5ld2x5QWRkZWRFbGVtZW50ID0gZmFsc2UsXG4gICAgY3NzQ2FwdHVyZWQgPSBmYWxzZVxuICB9ID0gb3B0aW9ucztcbiAgbGV0IHsgbmVlZHNNYXNrIH0gPSBvcHRpb25zO1xuICBsZXQgeyBwcmVzZXJ2ZVdoaXRlU3BhY2UgPSB0cnVlIH0gPSBvcHRpb25zO1xuICBpZiAoIW5lZWRzTWFzaykge1xuICAgIGNvbnN0IGNoZWNrQW5jZXN0b3JzID0gbmVlZHNNYXNrID09PSB2b2lkIDA7XG4gICAgbmVlZHNNYXNrID0gbmVlZE1hc2tpbmdUZXh0KFxuICAgICAgbixcbiAgICAgIG1hc2tUZXh0Q2xhc3MsXG4gICAgICBtYXNrVGV4dFNlbGVjdG9yLFxuICAgICAgY2hlY2tBbmNlc3RvcnNcbiAgICApO1xuICB9XG4gIGNvbnN0IF9zZXJpYWxpemVkTm9kZSA9IHNlcmlhbGl6ZU5vZGUobiwge1xuICAgIGRvYyxcbiAgICBtaXJyb3IsXG4gICAgYmxvY2tDbGFzcyxcbiAgICBibG9ja1NlbGVjdG9yLFxuICAgIG5lZWRzTWFzayxcbiAgICBpbmxpbmVTdHlsZXNoZWV0LFxuICAgIG1hc2tJbnB1dE9wdGlvbnMsXG4gICAgbWFza1RleHRGbixcbiAgICBtYXNrSW5wdXRGbixcbiAgICBkYXRhVVJMT3B0aW9ucyxcbiAgICBpbmxpbmVJbWFnZXMsXG4gICAgcmVjb3JkQ2FudmFzLFxuICAgIGtlZXBJZnJhbWVTcmNGbixcbiAgICBuZXdseUFkZGVkRWxlbWVudCxcbiAgICBjc3NDYXB0dXJlZFxuICB9KTtcbiAgaWYgKCFfc2VyaWFsaXplZE5vZGUpIHtcbiAgICBjb25zb2xlLndhcm4obiwgXCJub3Qgc2VyaWFsaXplZFwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBsZXQgaWQ7XG4gIGlmIChtaXJyb3IuaGFzTm9kZShuKSkge1xuICAgIGlkID0gbWlycm9yLmdldElkKG4pO1xuICB9IGVsc2UgaWYgKHNsaW1ET01FeGNsdWRlZChfc2VyaWFsaXplZE5vZGUsIHNsaW1ET01PcHRpb25zKSB8fCAhcHJlc2VydmVXaGl0ZVNwYWNlICYmIF9zZXJpYWxpemVkTm9kZS50eXBlID09PSBOb2RlVHlwZS5UZXh0ICYmICFfc2VyaWFsaXplZE5vZGUudGV4dENvbnRlbnQucmVwbGFjZSgvXlxccyt8XFxzKyQvZ20sIFwiXCIpLmxlbmd0aCkge1xuICAgIGlkID0gSUdOT1JFRF9OT0RFO1xuICB9IGVsc2Uge1xuICAgIGlkID0gZ2VuSWQoKTtcbiAgfVxuICBjb25zdCBzZXJpYWxpemVkTm9kZSA9IE9iamVjdC5hc3NpZ24oX3NlcmlhbGl6ZWROb2RlLCB7IGlkIH0pO1xuICBtaXJyb3IuYWRkKG4sIHNlcmlhbGl6ZWROb2RlKTtcbiAgaWYgKGlkID09PSBJR05PUkVEX05PREUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAob25TZXJpYWxpemUpIHtcbiAgICBvblNlcmlhbGl6ZShuKTtcbiAgfVxuICBsZXQgcmVjb3JkQ2hpbGQgPSAhc2tpcENoaWxkO1xuICBpZiAoc2VyaWFsaXplZE5vZGUudHlwZSA9PT0gTm9kZVR5cGUuRWxlbWVudCkge1xuICAgIHJlY29yZENoaWxkID0gcmVjb3JkQ2hpbGQgJiYgIXNlcmlhbGl6ZWROb2RlLm5lZWRCbG9jaztcbiAgICBkZWxldGUgc2VyaWFsaXplZE5vZGUubmVlZEJsb2NrO1xuICAgIGNvbnN0IHNoYWRvd1Jvb3RFbCA9IGluZGV4LnNoYWRvd1Jvb3Qobik7XG4gICAgaWYgKHNoYWRvd1Jvb3RFbCAmJiBpc05hdGl2ZVNoYWRvd0RvbShzaGFkb3dSb290RWwpKSB7XG4gICAgICBzZXJpYWxpemVkTm9kZS5pc1NoYWRvd0hvc3QgPSB0cnVlO1xuICAgICAgaWYgKHNoYWRvd1Jvb3RFbC5hZG9wdGVkU3R5bGVTaGVldHMubGVuZ3RoID4gMCkge1xuICAgICAgICBzZXJpYWxpemVkTm9kZS5jaHJvbWF0aWNBZG9wdGVkU3R5bGVzaGVldHMgPSBzaGFkb3dSb290RWwuYWRvcHRlZFN0eWxlU2hlZXRzLm1hcChcbiAgICAgICAgICAoc3R5bGVzaGVldCkgPT4gc3RyaW5naWZ5U3R5bGVzaGVldChzdHlsZXNoZWV0KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoKHNlcmlhbGl6ZWROb2RlLnR5cGUgPT09IE5vZGVUeXBlLkRvY3VtZW50IHx8IHNlcmlhbGl6ZWROb2RlLnR5cGUgPT09IE5vZGVUeXBlLkVsZW1lbnQpICYmIHJlY29yZENoaWxkKSB7XG4gICAgaWYgKHNsaW1ET01PcHRpb25zLmhlYWRXaGl0ZXNwYWNlICYmIHNlcmlhbGl6ZWROb2RlLnR5cGUgPT09IE5vZGVUeXBlLkVsZW1lbnQgJiYgc2VyaWFsaXplZE5vZGUudGFnTmFtZSA9PT0gXCJoZWFkXCIpIHtcbiAgICAgIHByZXNlcnZlV2hpdGVTcGFjZSA9IGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBieXBhc3NPcHRpb25zID0ge1xuICAgICAgZG9jLFxuICAgICAgbWlycm9yLFxuICAgICAgYmxvY2tDbGFzcyxcbiAgICAgIGJsb2NrU2VsZWN0b3IsXG4gICAgICBuZWVkc01hc2ssXG4gICAgICBtYXNrVGV4dENsYXNzLFxuICAgICAgbWFza1RleHRTZWxlY3RvcixcbiAgICAgIHNraXBDaGlsZCxcbiAgICAgIGlubGluZVN0eWxlc2hlZXQsXG4gICAgICBtYXNrSW5wdXRPcHRpb25zLFxuICAgICAgbWFza1RleHRGbixcbiAgICAgIG1hc2tJbnB1dEZuLFxuICAgICAgc2xpbURPTU9wdGlvbnMsXG4gICAgICBkYXRhVVJMT3B0aW9ucyxcbiAgICAgIGlubGluZUltYWdlcyxcbiAgICAgIHJlY29yZENhbnZhcyxcbiAgICAgIHByZXNlcnZlV2hpdGVTcGFjZSxcbiAgICAgIG9uU2VyaWFsaXplLFxuICAgICAgb25JZnJhbWVMb2FkLFxuICAgICAgaWZyYW1lTG9hZFRpbWVvdXQsXG4gICAgICBvblN0eWxlc2hlZXRMb2FkLFxuICAgICAgc3R5bGVzaGVldExvYWRUaW1lb3V0LFxuICAgICAga2VlcElmcmFtZVNyY0ZuLFxuICAgICAgY3NzQ2FwdHVyZWQ6IGZhbHNlXG4gICAgfTtcbiAgICBpZiAoc2VyaWFsaXplZE5vZGUudHlwZSA9PT0gTm9kZVR5cGUuRWxlbWVudCAmJiBzZXJpYWxpemVkTm9kZS50YWdOYW1lID09PSBcInRleHRhcmVhXCIgJiYgc2VyaWFsaXplZE5vZGUuYXR0cmlidXRlcy52YWx1ZSAhPT0gdm9pZCAwKSA7XG4gICAgZWxzZSB7XG4gICAgICBpZiAoc2VyaWFsaXplZE5vZGUudHlwZSA9PT0gTm9kZVR5cGUuRWxlbWVudCAmJiBzZXJpYWxpemVkTm9kZS5hdHRyaWJ1dGVzLl9jc3NUZXh0ICE9PSB2b2lkIDAgJiYgdHlwZW9mIHNlcmlhbGl6ZWROb2RlLmF0dHJpYnV0ZXMuX2Nzc1RleHQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgYnlwYXNzT3B0aW9ucy5jc3NDYXB0dXJlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGNoaWxkTiBvZiBBcnJheS5mcm9tKGluZGV4LmNoaWxkTm9kZXMobikpKSB7XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRDaGlsZE5vZGUgPSBzZXJpYWxpemVOb2RlV2l0aElkKGNoaWxkTiwgYnlwYXNzT3B0aW9ucyk7XG4gICAgICAgIGlmIChzZXJpYWxpemVkQ2hpbGROb2RlKSB7XG4gICAgICAgICAgc2VyaWFsaXplZE5vZGUuY2hpbGROb2Rlcy5wdXNoKHNlcmlhbGl6ZWRDaGlsZE5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBzaGFkb3dSb290RWwgPSBudWxsO1xuICAgIGlmIChpc0VsZW1lbnQobikgJiYgKHNoYWRvd1Jvb3RFbCA9IGluZGV4LnNoYWRvd1Jvb3QobikpKSB7XG4gICAgICBmb3IgKGNvbnN0IGNoaWxkTiBvZiBBcnJheS5mcm9tKGluZGV4LmNoaWxkTm9kZXMoc2hhZG93Um9vdEVsKSkpIHtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZENoaWxkTm9kZSA9IHNlcmlhbGl6ZU5vZGVXaXRoSWQoY2hpbGROLCBieXBhc3NPcHRpb25zKTtcbiAgICAgICAgaWYgKHNlcmlhbGl6ZWRDaGlsZE5vZGUpIHtcbiAgICAgICAgICBpc05hdGl2ZVNoYWRvd0RvbShzaGFkb3dSb290RWwpICYmIChzZXJpYWxpemVkQ2hpbGROb2RlLmlzU2hhZG93ID0gdHJ1ZSk7XG4gICAgICAgICAgc2VyaWFsaXplZE5vZGUuY2hpbGROb2Rlcy5wdXNoKHNlcmlhbGl6ZWRDaGlsZE5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNvbnN0IHBhcmVudCA9IGluZGV4LnBhcmVudE5vZGUobik7XG4gIGlmIChwYXJlbnQgJiYgaXNTaGFkb3dSb290KHBhcmVudCkgJiYgaXNOYXRpdmVTaGFkb3dEb20ocGFyZW50KSkge1xuICAgIHNlcmlhbGl6ZWROb2RlLmlzU2hhZG93ID0gdHJ1ZTtcbiAgfVxuICBpZiAoc2VyaWFsaXplZE5vZGUudHlwZSA9PT0gTm9kZVR5cGUuRWxlbWVudCAmJiBzZXJpYWxpemVkTm9kZS50YWdOYW1lID09PSBcImlmcmFtZVwiKSB7XG4gICAgb25jZUlmcmFtZUxvYWRlZChcbiAgICAgIG4sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlmcmFtZURvYyA9IG4uY29udGVudERvY3VtZW50O1xuICAgICAgICBpZiAoaWZyYW1lRG9jICYmIG9uSWZyYW1lTG9hZCkge1xuICAgICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRJZnJhbWVOb2RlID0gc2VyaWFsaXplTm9kZVdpdGhJZChpZnJhbWVEb2MsIHtcbiAgICAgICAgICAgIGRvYzogaWZyYW1lRG9jLFxuICAgICAgICAgICAgbWlycm9yLFxuICAgICAgICAgICAgYmxvY2tDbGFzcyxcbiAgICAgICAgICAgIGJsb2NrU2VsZWN0b3IsXG4gICAgICAgICAgICBuZWVkc01hc2ssXG4gICAgICAgICAgICBtYXNrVGV4dENsYXNzLFxuICAgICAgICAgICAgbWFza1RleHRTZWxlY3RvcixcbiAgICAgICAgICAgIHNraXBDaGlsZDogZmFsc2UsXG4gICAgICAgICAgICBpbmxpbmVTdHlsZXNoZWV0LFxuICAgICAgICAgICAgbWFza0lucHV0T3B0aW9ucyxcbiAgICAgICAgICAgIG1hc2tUZXh0Rm4sXG4gICAgICAgICAgICBtYXNrSW5wdXRGbixcbiAgICAgICAgICAgIHNsaW1ET01PcHRpb25zLFxuICAgICAgICAgICAgZGF0YVVSTE9wdGlvbnMsXG4gICAgICAgICAgICBpbmxpbmVJbWFnZXMsXG4gICAgICAgICAgICByZWNvcmRDYW52YXMsXG4gICAgICAgICAgICBwcmVzZXJ2ZVdoaXRlU3BhY2UsXG4gICAgICAgICAgICBvblNlcmlhbGl6ZSxcbiAgICAgICAgICAgIG9uSWZyYW1lTG9hZCxcbiAgICAgICAgICAgIGlmcmFtZUxvYWRUaW1lb3V0LFxuICAgICAgICAgICAgb25TdHlsZXNoZWV0TG9hZCxcbiAgICAgICAgICAgIHN0eWxlc2hlZXRMb2FkVGltZW91dCxcbiAgICAgICAgICAgIGtlZXBJZnJhbWVTcmNGblxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChzZXJpYWxpemVkSWZyYW1lTm9kZSkge1xuICAgICAgICAgICAgb25JZnJhbWVMb2FkKFxuICAgICAgICAgICAgICBuLFxuICAgICAgICAgICAgICBzZXJpYWxpemVkSWZyYW1lTm9kZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpZnJhbWVMb2FkVGltZW91dFxuICAgICk7XG4gIH1cbiAgaWYgKHNlcmlhbGl6ZWROb2RlLnR5cGUgPT09IE5vZGVUeXBlLkVsZW1lbnQgJiYgc2VyaWFsaXplZE5vZGUudGFnTmFtZSA9PT0gXCJsaW5rXCIgJiYgdHlwZW9mIHNlcmlhbGl6ZWROb2RlLmF0dHJpYnV0ZXMucmVsID09PSBcInN0cmluZ1wiICYmIChzZXJpYWxpemVkTm9kZS5hdHRyaWJ1dGVzLnJlbCA9PT0gXCJzdHlsZXNoZWV0XCIgfHwgc2VyaWFsaXplZE5vZGUuYXR0cmlidXRlcy5yZWwgPT09IFwicHJlbG9hZFwiICYmIHR5cGVvZiBzZXJpYWxpemVkTm9kZS5hdHRyaWJ1dGVzLmhyZWYgPT09IFwic3RyaW5nXCIgJiYgZXh0cmFjdEZpbGVFeHRlbnNpb24oc2VyaWFsaXplZE5vZGUuYXR0cmlidXRlcy5ocmVmKSA9PT0gXCJjc3NcIikpIHtcbiAgICBvbmNlU3R5bGVzaGVldExvYWRlZChcbiAgICAgIG4sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGlmIChvblN0eWxlc2hlZXRMb2FkKSB7XG4gICAgICAgICAgY29uc3Qgc2VyaWFsaXplZExpbmtOb2RlID0gc2VyaWFsaXplTm9kZVdpdGhJZChuLCB7XG4gICAgICAgICAgICBkb2MsXG4gICAgICAgICAgICBtaXJyb3IsXG4gICAgICAgICAgICBibG9ja0NsYXNzLFxuICAgICAgICAgICAgYmxvY2tTZWxlY3RvcixcbiAgICAgICAgICAgIG5lZWRzTWFzayxcbiAgICAgICAgICAgIG1hc2tUZXh0Q2xhc3MsXG4gICAgICAgICAgICBtYXNrVGV4dFNlbGVjdG9yLFxuICAgICAgICAgICAgc2tpcENoaWxkOiBmYWxzZSxcbiAgICAgICAgICAgIGlubGluZVN0eWxlc2hlZXQsXG4gICAgICAgICAgICBtYXNrSW5wdXRPcHRpb25zLFxuICAgICAgICAgICAgbWFza1RleHRGbixcbiAgICAgICAgICAgIG1hc2tJbnB1dEZuLFxuICAgICAgICAgICAgc2xpbURPTU9wdGlvbnMsXG4gICAgICAgICAgICBkYXRhVVJMT3B0aW9ucyxcbiAgICAgICAgICAgIGlubGluZUltYWdlcyxcbiAgICAgICAgICAgIHJlY29yZENhbnZhcyxcbiAgICAgICAgICAgIHByZXNlcnZlV2hpdGVTcGFjZSxcbiAgICAgICAgICAgIG9uU2VyaWFsaXplLFxuICAgICAgICAgICAgb25JZnJhbWVMb2FkLFxuICAgICAgICAgICAgaWZyYW1lTG9hZFRpbWVvdXQsXG4gICAgICAgICAgICBvblN0eWxlc2hlZXRMb2FkLFxuICAgICAgICAgICAgc3R5bGVzaGVldExvYWRUaW1lb3V0LFxuICAgICAgICAgICAga2VlcElmcmFtZVNyY0ZuXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHNlcmlhbGl6ZWRMaW5rTm9kZSkge1xuICAgICAgICAgICAgb25TdHlsZXNoZWV0TG9hZChcbiAgICAgICAgICAgICAgbixcbiAgICAgICAgICAgICAgc2VyaWFsaXplZExpbmtOb2RlXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHN0eWxlc2hlZXRMb2FkVGltZW91dFxuICAgICk7XG4gIH1cbiAgcmV0dXJuIHNlcmlhbGl6ZWROb2RlO1xufVxuZnVuY3Rpb24gc25hcHNob3Qobiwgb3B0aW9ucykge1xuICBjb25zdCB7XG4gICAgbWlycm9yID0gbmV3IE1pcnJvcigpLFxuICAgIGJsb2NrQ2xhc3MgPSBcInJyLWJsb2NrXCIsXG4gICAgYmxvY2tTZWxlY3RvciA9IG51bGwsXG4gICAgbWFza1RleHRDbGFzcyA9IFwicnItbWFza1wiLFxuICAgIG1hc2tUZXh0U2VsZWN0b3IgPSBudWxsLFxuICAgIGlubGluZVN0eWxlc2hlZXQgPSB0cnVlLFxuICAgIGlubGluZUltYWdlcyA9IGZhbHNlLFxuICAgIHJlY29yZENhbnZhcyA9IGZhbHNlLFxuICAgIG1hc2tBbGxJbnB1dHMgPSBmYWxzZSxcbiAgICBtYXNrVGV4dEZuLFxuICAgIG1hc2tJbnB1dEZuLFxuICAgIHNsaW1ET00gPSBmYWxzZSxcbiAgICBkYXRhVVJMT3B0aW9ucyxcbiAgICBwcmVzZXJ2ZVdoaXRlU3BhY2UsXG4gICAgb25TZXJpYWxpemUsXG4gICAgb25JZnJhbWVMb2FkLFxuICAgIGlmcmFtZUxvYWRUaW1lb3V0LFxuICAgIG9uU3R5bGVzaGVldExvYWQsXG4gICAgc3R5bGVzaGVldExvYWRUaW1lb3V0LFxuICAgIGtlZXBJZnJhbWVTcmNGbiA9ICgpID0+IGZhbHNlXG4gIH0gPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBtYXNrSW5wdXRPcHRpb25zID0gbWFza0FsbElucHV0cyA9PT0gdHJ1ZSA/IHtcbiAgICBjb2xvcjogdHJ1ZSxcbiAgICBkYXRlOiB0cnVlLFxuICAgIFwiZGF0ZXRpbWUtbG9jYWxcIjogdHJ1ZSxcbiAgICBlbWFpbDogdHJ1ZSxcbiAgICBtb250aDogdHJ1ZSxcbiAgICBudW1iZXI6IHRydWUsXG4gICAgcmFuZ2U6IHRydWUsXG4gICAgc2VhcmNoOiB0cnVlLFxuICAgIHRlbDogdHJ1ZSxcbiAgICB0ZXh0OiB0cnVlLFxuICAgIHRpbWU6IHRydWUsXG4gICAgdXJsOiB0cnVlLFxuICAgIHdlZWs6IHRydWUsXG4gICAgdGV4dGFyZWE6IHRydWUsXG4gICAgc2VsZWN0OiB0cnVlLFxuICAgIHBhc3N3b3JkOiB0cnVlXG4gIH0gOiBtYXNrQWxsSW5wdXRzID09PSBmYWxzZSA/IHtcbiAgICBwYXNzd29yZDogdHJ1ZVxuICB9IDogbWFza0FsbElucHV0cztcbiAgY29uc3Qgc2xpbURPTU9wdGlvbnMgPSBzbGltRE9NID09PSB0cnVlIHx8IHNsaW1ET00gPT09IFwiYWxsXCIgPyAoXG4gICAgLy8gaWYgdHJ1ZTogc2V0IG9mIHNlbnNpYmxlIG9wdGlvbnMgdGhhdCBzaG91bGQgbm90IHRocm93IGF3YXkgYW55IGluZm9ybWF0aW9uXG4gICAge1xuICAgICAgc2NyaXB0OiB0cnVlLFxuICAgICAgY29tbWVudDogdHJ1ZSxcbiAgICAgIGhlYWRGYXZpY29uOiB0cnVlLFxuICAgICAgaGVhZFdoaXRlc3BhY2U6IHRydWUsXG4gICAgICBoZWFkTWV0YURlc2NLZXl3b3Jkczogc2xpbURPTSA9PT0gXCJhbGxcIixcbiAgICAgIC8vIGRlc3RydWN0aXZlXG4gICAgICBoZWFkTWV0YVNvY2lhbDogdHJ1ZSxcbiAgICAgIGhlYWRNZXRhUm9ib3RzOiB0cnVlLFxuICAgICAgaGVhZE1ldGFIdHRwRXF1aXY6IHRydWUsXG4gICAgICBoZWFkTWV0YUF1dGhvcnNoaXA6IHRydWUsXG4gICAgICBoZWFkTWV0YVZlcmlmaWNhdGlvbjogdHJ1ZVxuICAgIH1cbiAgKSA6IHNsaW1ET00gPT09IGZhbHNlID8ge30gOiBzbGltRE9NO1xuICByZXR1cm4gc2VyaWFsaXplTm9kZVdpdGhJZChuLCB7XG4gICAgZG9jOiBuLFxuICAgIG1pcnJvcixcbiAgICBibG9ja0NsYXNzLFxuICAgIGJsb2NrU2VsZWN0b3IsXG4gICAgbWFza1RleHRDbGFzcyxcbiAgICBtYXNrVGV4dFNlbGVjdG9yLFxuICAgIHNraXBDaGlsZDogZmFsc2UsXG4gICAgaW5saW5lU3R5bGVzaGVldCxcbiAgICBtYXNrSW5wdXRPcHRpb25zLFxuICAgIG1hc2tUZXh0Rm4sXG4gICAgbWFza0lucHV0Rm4sXG4gICAgc2xpbURPTU9wdGlvbnMsXG4gICAgZGF0YVVSTE9wdGlvbnMsXG4gICAgaW5saW5lSW1hZ2VzLFxuICAgIHJlY29yZENhbnZhcyxcbiAgICBwcmVzZXJ2ZVdoaXRlU3BhY2UsXG4gICAgb25TZXJpYWxpemUsXG4gICAgb25JZnJhbWVMb2FkLFxuICAgIGlmcmFtZUxvYWRUaW1lb3V0LFxuICAgIG9uU3R5bGVzaGVldExvYWQsXG4gICAgc3R5bGVzaGVldExvYWRUaW1lb3V0LFxuICAgIGtlZXBJZnJhbWVTcmNGbixcbiAgICBuZXdseUFkZGVkRWxlbWVudDogZmFsc2VcbiAgfSk7XG59XG5mdW5jdGlvbiB2aXNpdFNuYXBzaG90KG5vZGUyLCBvblZpc2l0KSB7XG4gIGZ1bmN0aW9uIHdhbGsoY3VycmVudCkge1xuICAgIG9uVmlzaXQoY3VycmVudCk7XG4gICAgaWYgKGN1cnJlbnQudHlwZSA9PT0gTm9kZVR5cGUuRG9jdW1lbnQgfHwgY3VycmVudC50eXBlID09PSBOb2RlVHlwZS5FbGVtZW50KSB7XG4gICAgICBjdXJyZW50LmNoaWxkTm9kZXMuZm9yRWFjaCh3YWxrKTtcbiAgICB9XG4gIH1cbiAgd2Fsayhub2RlMik7XG59XG5mdW5jdGlvbiBjbGVhbnVwU25hcHNob3QoKSB7XG4gIF9pZCA9IDE7XG59XG5jb25zdCBNRURJQV9TRUxFQ1RPUiA9IC8obWF4fG1pbiktZGV2aWNlLSh3aWR0aHxoZWlnaHQpLztcbmNvbnN0IE1FRElBX1NFTEVDVE9SX0dMT0JBTCA9IG5ldyBSZWdFeHAoTUVESUFfU0VMRUNUT1Iuc291cmNlLCBcImdcIik7XG5jb25zdCBtZWRpYVNlbGVjdG9yUGx1Z2luID0ge1xuICBwb3N0Y3NzUGx1Z2luOiBcInBvc3Rjc3MtY3VzdG9tLXNlbGVjdG9yc1wiLFxuICBwcmVwYXJlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3N0Y3NzUGx1Z2luOiBcInBvc3Rjc3MtY3VzdG9tLXNlbGVjdG9yc1wiLFxuICAgICAgQXRSdWxlOiBmdW5jdGlvbihhdHJ1bGUpIHtcbiAgICAgICAgaWYgKGF0cnVsZS5wYXJhbXMubWF0Y2goTUVESUFfU0VMRUNUT1JfR0xPQkFMKSkge1xuICAgICAgICAgIGF0cnVsZS5wYXJhbXMgPSBhdHJ1bGUucGFyYW1zLnJlcGxhY2UoTUVESUFfU0VMRUNUT1JfR0xPQkFMLCBcIiQxLSQyXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxufTtcbmNvbnN0IHBzZXVkb0NsYXNzUGx1Z2luID0ge1xuICBwb3N0Y3NzUGx1Z2luOiBcInBvc3Rjc3MtaG92ZXItY2xhc3Nlc1wiLFxuICBwcmVwYXJlOiBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBmaXhlZCA9IFtdO1xuICAgIHJldHVybiB7XG4gICAgICBSdWxlOiBmdW5jdGlvbihydWxlMikge1xuICAgICAgICBpZiAoZml4ZWQuaW5kZXhPZihydWxlMikgIT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZpeGVkLnB1c2gocnVsZTIpO1xuICAgICAgICBydWxlMi5zZWxlY3RvcnMuZm9yRWFjaChmdW5jdGlvbihzZWxlY3Rvcikge1xuICAgICAgICAgIGlmIChzZWxlY3Rvci5pbmNsdWRlcyhcIjpob3ZlclwiKSkge1xuICAgICAgICAgICAgcnVsZTIuc2VsZWN0b3IgKz0gXCIsXFxuXCIgKyBzZWxlY3Rvci5yZXBsYWNlKC86aG92ZXIvZywgXCIuXFxcXDpob3ZlclwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn07XG5mdW5jdGlvbiBnZXREZWZhdWx0RXhwb3J0RnJvbUNqcyh4Mikge1xuICByZXR1cm4geDIgJiYgeDIuX19lc01vZHVsZSAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeDIsIFwiZGVmYXVsdFwiKSA/IHgyW1wiZGVmYXVsdFwiXSA6IHgyO1xufVxuZnVuY3Rpb24gZ2V0QXVnbWVudGVkTmFtZXNwYWNlKG4pIHtcbiAgaWYgKG4uX19lc01vZHVsZSkgcmV0dXJuIG47XG4gIHZhciBmID0gbi5kZWZhdWx0O1xuICBpZiAodHlwZW9mIGYgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGEgPSBmdW5jdGlvbiBhMigpIHtcbiAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgYTIpIHtcbiAgICAgICAgcmV0dXJuIFJlZmxlY3QuY29uc3RydWN0KGYsIGFyZ3VtZW50cywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gICAgYS5wcm90b3R5cGUgPSBmLnByb3RvdHlwZTtcbiAgfSBlbHNlIGEgPSB7fTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICBPYmplY3Qua2V5cyhuKS5mb3JFYWNoKGZ1bmN0aW9uKGspIHtcbiAgICB2YXIgZCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iobiwgayk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsIGssIGQuZ2V0ID8gZCA6IHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbltrXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBhO1xufVxudmFyIHBpY29jb2xvcnNfYnJvd3NlciA9IHsgZXhwb3J0czoge30gfTtcbnZhciB4ID0gU3RyaW5nO1xudmFyIGNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4geyBpc0NvbG9yU3VwcG9ydGVkOiBmYWxzZSwgcmVzZXQ6IHgsIGJvbGQ6IHgsIGRpbTogeCwgaXRhbGljOiB4LCB1bmRlcmxpbmU6IHgsIGludmVyc2U6IHgsIGhpZGRlbjogeCwgc3RyaWtldGhyb3VnaDogeCwgYmxhY2s6IHgsIHJlZDogeCwgZ3JlZW46IHgsIHllbGxvdzogeCwgYmx1ZTogeCwgbWFnZW50YTogeCwgY3lhbjogeCwgd2hpdGU6IHgsIGdyYXk6IHgsIGJnQmxhY2s6IHgsIGJnUmVkOiB4LCBiZ0dyZWVuOiB4LCBiZ1llbGxvdzogeCwgYmdCbHVlOiB4LCBiZ01hZ2VudGE6IHgsIGJnQ3lhbjogeCwgYmdXaGl0ZTogeCB9O1xufTtcbnBpY29jb2xvcnNfYnJvd3Nlci5leHBvcnRzID0gY3JlYXRlKCk7XG5waWNvY29sb3JzX2Jyb3dzZXIuZXhwb3J0cy5jcmVhdGVDb2xvcnMgPSBjcmVhdGU7XG52YXIgcGljb2NvbG9yc19icm93c2VyRXhwb3J0cyA9IHBpY29jb2xvcnNfYnJvd3Nlci5leHBvcnRzO1xuY29uc3QgX192aXRlQnJvd3NlckV4dGVybmFsID0ge307XG5jb25zdCBfX3ZpdGVCcm93c2VyRXh0ZXJuYWwkMSA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuZnJlZXplKC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuZGVmaW5lUHJvcGVydHkoe1xuICBfX3Byb3RvX186IG51bGwsXG4gIGRlZmF1bHQ6IF9fdml0ZUJyb3dzZXJFeHRlcm5hbFxufSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiBcIk1vZHVsZVwiIH0pKTtcbmNvbnN0IHJlcXVpcmUkJDIgPSAvKiBAX19QVVJFX18gKi8gZ2V0QXVnbWVudGVkTmFtZXNwYWNlKF9fdml0ZUJyb3dzZXJFeHRlcm5hbCQxKTtcbmxldCBwaWNvID0gcGljb2NvbG9yc19icm93c2VyRXhwb3J0cztcbmxldCB0ZXJtaW5hbEhpZ2hsaWdodCQxID0gcmVxdWlyZSQkMjtcbmxldCBDc3NTeW50YXhFcnJvciQzID0gY2xhc3MgQ3NzU3ludGF4RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGxpbmUsIGNvbHVtbiwgc291cmNlLCBmaWxlLCBwbHVnaW4yKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5uYW1lID0gXCJDc3NTeW50YXhFcnJvclwiO1xuICAgIHRoaXMucmVhc29uID0gbWVzc2FnZTtcbiAgICBpZiAoZmlsZSkge1xuICAgICAgdGhpcy5maWxlID0gZmlsZTtcbiAgICB9XG4gICAgaWYgKHNvdXJjZSkge1xuICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgfVxuICAgIGlmIChwbHVnaW4yKSB7XG4gICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbGluZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29sdW1uICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBpZiAodHlwZW9mIGxpbmUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgdGhpcy5saW5lID0gbGluZTtcbiAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxpbmUgPSBsaW5lLmxpbmU7XG4gICAgICAgIHRoaXMuY29sdW1uID0gbGluZS5jb2x1bW47XG4gICAgICAgIHRoaXMuZW5kTGluZSA9IGNvbHVtbi5saW5lO1xuICAgICAgICB0aGlzLmVuZENvbHVtbiA9IGNvbHVtbi5jb2x1bW47XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2V0TWVzc2FnZSgpO1xuICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgQ3NzU3ludGF4RXJyb3IpO1xuICAgIH1cbiAgfVxuICBzZXRNZXNzYWdlKCkge1xuICAgIHRoaXMubWVzc2FnZSA9IHRoaXMucGx1Z2luID8gdGhpcy5wbHVnaW4gKyBcIjogXCIgOiBcIlwiO1xuICAgIHRoaXMubWVzc2FnZSArPSB0aGlzLmZpbGUgPyB0aGlzLmZpbGUgOiBcIjxjc3MgaW5wdXQ+XCI7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmxpbmUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMubWVzc2FnZSArPSBcIjpcIiArIHRoaXMubGluZSArIFwiOlwiICsgdGhpcy5jb2x1bW47XG4gICAgfVxuICAgIHRoaXMubWVzc2FnZSArPSBcIjogXCIgKyB0aGlzLnJlYXNvbjtcbiAgfVxuICBzaG93U291cmNlQ29kZShjb2xvcikge1xuICAgIGlmICghdGhpcy5zb3VyY2UpIHJldHVybiBcIlwiO1xuICAgIGxldCBjc3MgPSB0aGlzLnNvdXJjZTtcbiAgICBpZiAoY29sb3IgPT0gbnVsbCkgY29sb3IgPSBwaWNvLmlzQ29sb3JTdXBwb3J0ZWQ7XG4gICAgaWYgKHRlcm1pbmFsSGlnaGxpZ2h0JDEpIHtcbiAgICAgIGlmIChjb2xvcikgY3NzID0gdGVybWluYWxIaWdobGlnaHQkMShjc3MpO1xuICAgIH1cbiAgICBsZXQgbGluZXMgPSBjc3Muc3BsaXQoL1xccj9cXG4vKTtcbiAgICBsZXQgc3RhcnQgPSBNYXRoLm1heCh0aGlzLmxpbmUgLSAzLCAwKTtcbiAgICBsZXQgZW5kID0gTWF0aC5taW4odGhpcy5saW5lICsgMiwgbGluZXMubGVuZ3RoKTtcbiAgICBsZXQgbWF4V2lkdGggPSBTdHJpbmcoZW5kKS5sZW5ndGg7XG4gICAgbGV0IG1hcmssIGFzaWRlO1xuICAgIGlmIChjb2xvcikge1xuICAgICAgbGV0IHsgYm9sZCwgZ3JheSwgcmVkIH0gPSBwaWNvLmNyZWF0ZUNvbG9ycyh0cnVlKTtcbiAgICAgIG1hcmsgPSAodGV4dCkgPT4gYm9sZChyZWQodGV4dCkpO1xuICAgICAgYXNpZGUgPSAodGV4dCkgPT4gZ3JheSh0ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWFyayA9IGFzaWRlID0gKHN0cikgPT4gc3RyO1xuICAgIH1cbiAgICByZXR1cm4gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKChsaW5lLCBpbmRleDIpID0+IHtcbiAgICAgIGxldCBudW1iZXIgPSBzdGFydCArIDEgKyBpbmRleDI7XG4gICAgICBsZXQgZ3V0dGVyID0gXCIgXCIgKyAoXCIgXCIgKyBudW1iZXIpLnNsaWNlKC1tYXhXaWR0aCkgKyBcIiB8IFwiO1xuICAgICAgaWYgKG51bWJlciA9PT0gdGhpcy5saW5lKSB7XG4gICAgICAgIGxldCBzcGFjaW5nID0gYXNpZGUoZ3V0dGVyLnJlcGxhY2UoL1xcZC9nLCBcIiBcIikpICsgbGluZS5zbGljZSgwLCB0aGlzLmNvbHVtbiAtIDEpLnJlcGxhY2UoL1teXFx0XS9nLCBcIiBcIik7XG4gICAgICAgIHJldHVybiBtYXJrKFwiPlwiKSArIGFzaWRlKGd1dHRlcikgKyBsaW5lICsgXCJcXG4gXCIgKyBzcGFjaW5nICsgbWFyayhcIl5cIik7XG4gICAgICB9XG4gICAgICByZXR1cm4gXCIgXCIgKyBhc2lkZShndXR0ZXIpICsgbGluZTtcbiAgICB9KS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHRvU3RyaW5nKCkge1xuICAgIGxldCBjb2RlID0gdGhpcy5zaG93U291cmNlQ29kZSgpO1xuICAgIGlmIChjb2RlKSB7XG4gICAgICBjb2RlID0gXCJcXG5cXG5cIiArIGNvZGUgKyBcIlxcblwiO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5uYW1lICsgXCI6IFwiICsgdGhpcy5tZXNzYWdlICsgY29kZTtcbiAgfVxufTtcbnZhciBjc3NTeW50YXhFcnJvciA9IENzc1N5bnRheEVycm9yJDM7XG5Dc3NTeW50YXhFcnJvciQzLmRlZmF1bHQgPSBDc3NTeW50YXhFcnJvciQzO1xudmFyIHN5bWJvbHMgPSB7fTtcbnN5bWJvbHMuaXNDbGVhbiA9IFN5bWJvbChcImlzQ2xlYW5cIik7XG5zeW1ib2xzLm15ID0gU3ltYm9sKFwibXlcIik7XG5jb25zdCBERUZBVUxUX1JBVyA9IHtcbiAgYWZ0ZXI6IFwiXFxuXCIsXG4gIGJlZm9yZUNsb3NlOiBcIlxcblwiLFxuICBiZWZvcmVDb21tZW50OiBcIlxcblwiLFxuICBiZWZvcmVEZWNsOiBcIlxcblwiLFxuICBiZWZvcmVPcGVuOiBcIiBcIixcbiAgYmVmb3JlUnVsZTogXCJcXG5cIixcbiAgY29sb246IFwiOiBcIixcbiAgY29tbWVudExlZnQ6IFwiIFwiLFxuICBjb21tZW50UmlnaHQ6IFwiIFwiLFxuICBlbXB0eUJvZHk6IFwiXCIsXG4gIGluZGVudDogXCIgICAgXCIsXG4gIHNlbWljb2xvbjogZmFsc2Vcbn07XG5mdW5jdGlvbiBjYXBpdGFsaXplKHN0cikge1xuICByZXR1cm4gc3RyWzBdLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG59XG5sZXQgU3RyaW5naWZpZXIkMiA9IGNsYXNzIFN0cmluZ2lmaWVyIHtcbiAgY29uc3RydWN0b3IoYnVpbGRlcikge1xuICAgIHRoaXMuYnVpbGRlciA9IGJ1aWxkZXI7XG4gIH1cbiAgYXRydWxlKG5vZGUyLCBzZW1pY29sb24pIHtcbiAgICBsZXQgbmFtZSA9IFwiQFwiICsgbm9kZTIubmFtZTtcbiAgICBsZXQgcGFyYW1zID0gbm9kZTIucGFyYW1zID8gdGhpcy5yYXdWYWx1ZShub2RlMiwgXCJwYXJhbXNcIikgOiBcIlwiO1xuICAgIGlmICh0eXBlb2Ygbm9kZTIucmF3cy5hZnRlck5hbWUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG5hbWUgKz0gbm9kZTIucmF3cy5hZnRlck5hbWU7XG4gICAgfSBlbHNlIGlmIChwYXJhbXMpIHtcbiAgICAgIG5hbWUgKz0gXCIgXCI7XG4gICAgfVxuICAgIGlmIChub2RlMi5ub2Rlcykge1xuICAgICAgdGhpcy5ibG9jayhub2RlMiwgbmFtZSArIHBhcmFtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBlbmQgPSAobm9kZTIucmF3cy5iZXR3ZWVuIHx8IFwiXCIpICsgKHNlbWljb2xvbiA/IFwiO1wiIDogXCJcIik7XG4gICAgICB0aGlzLmJ1aWxkZXIobmFtZSArIHBhcmFtcyArIGVuZCwgbm9kZTIpO1xuICAgIH1cbiAgfVxuICBiZWZvcmVBZnRlcihub2RlMiwgZGV0ZWN0KSB7XG4gICAgbGV0IHZhbHVlO1xuICAgIGlmIChub2RlMi50eXBlID09PSBcImRlY2xcIikge1xuICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlMiwgbnVsbCwgXCJiZWZvcmVEZWNsXCIpO1xuICAgIH0gZWxzZSBpZiAobm9kZTIudHlwZSA9PT0gXCJjb21tZW50XCIpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5yYXcobm9kZTIsIG51bGwsIFwiYmVmb3JlQ29tbWVudFwiKTtcbiAgICB9IGVsc2UgaWYgKGRldGVjdCA9PT0gXCJiZWZvcmVcIikge1xuICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlMiwgbnVsbCwgXCJiZWZvcmVSdWxlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucmF3KG5vZGUyLCBudWxsLCBcImJlZm9yZUNsb3NlXCIpO1xuICAgIH1cbiAgICBsZXQgYnVmID0gbm9kZTIucGFyZW50O1xuICAgIGxldCBkZXB0aCA9IDA7XG4gICAgd2hpbGUgKGJ1ZiAmJiBidWYudHlwZSAhPT0gXCJyb290XCIpIHtcbiAgICAgIGRlcHRoICs9IDE7XG4gICAgICBidWYgPSBidWYucGFyZW50O1xuICAgIH1cbiAgICBpZiAodmFsdWUuaW5jbHVkZXMoXCJcXG5cIikpIHtcbiAgICAgIGxldCBpbmRlbnQgPSB0aGlzLnJhdyhub2RlMiwgbnVsbCwgXCJpbmRlbnRcIik7XG4gICAgICBpZiAoaW5kZW50Lmxlbmd0aCkge1xuICAgICAgICBmb3IgKGxldCBzdGVwID0gMDsgc3RlcCA8IGRlcHRoOyBzdGVwKyspIHZhbHVlICs9IGluZGVudDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGJsb2NrKG5vZGUyLCBzdGFydCkge1xuICAgIGxldCBiZXR3ZWVuID0gdGhpcy5yYXcobm9kZTIsIFwiYmV0d2VlblwiLCBcImJlZm9yZU9wZW5cIik7XG4gICAgdGhpcy5idWlsZGVyKHN0YXJ0ICsgYmV0d2VlbiArIFwie1wiLCBub2RlMiwgXCJzdGFydFwiKTtcbiAgICBsZXQgYWZ0ZXI7XG4gICAgaWYgKG5vZGUyLm5vZGVzICYmIG5vZGUyLm5vZGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5ib2R5KG5vZGUyKTtcbiAgICAgIGFmdGVyID0gdGhpcy5yYXcobm9kZTIsIFwiYWZ0ZXJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFmdGVyID0gdGhpcy5yYXcobm9kZTIsIFwiYWZ0ZXJcIiwgXCJlbXB0eUJvZHlcIik7XG4gICAgfVxuICAgIGlmIChhZnRlcikgdGhpcy5idWlsZGVyKGFmdGVyKTtcbiAgICB0aGlzLmJ1aWxkZXIoXCJ9XCIsIG5vZGUyLCBcImVuZFwiKTtcbiAgfVxuICBib2R5KG5vZGUyKSB7XG4gICAgbGV0IGxhc3QgPSBub2RlMi5ub2Rlcy5sZW5ndGggLSAxO1xuICAgIHdoaWxlIChsYXN0ID4gMCkge1xuICAgICAgaWYgKG5vZGUyLm5vZGVzW2xhc3RdLnR5cGUgIT09IFwiY29tbWVudFwiKSBicmVhaztcbiAgICAgIGxhc3QgLT0gMTtcbiAgICB9XG4gICAgbGV0IHNlbWljb2xvbiA9IHRoaXMucmF3KG5vZGUyLCBcInNlbWljb2xvblwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUyLm5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY2hpbGQgPSBub2RlMi5ub2Rlc1tpXTtcbiAgICAgIGxldCBiZWZvcmUgPSB0aGlzLnJhdyhjaGlsZCwgXCJiZWZvcmVcIik7XG4gICAgICBpZiAoYmVmb3JlKSB0aGlzLmJ1aWxkZXIoYmVmb3JlKTtcbiAgICAgIHRoaXMuc3RyaW5naWZ5KGNoaWxkLCBsYXN0ICE9PSBpIHx8IHNlbWljb2xvbik7XG4gICAgfVxuICB9XG4gIGNvbW1lbnQobm9kZTIpIHtcbiAgICBsZXQgbGVmdCA9IHRoaXMucmF3KG5vZGUyLCBcImxlZnRcIiwgXCJjb21tZW50TGVmdFwiKTtcbiAgICBsZXQgcmlnaHQgPSB0aGlzLnJhdyhub2RlMiwgXCJyaWdodFwiLCBcImNvbW1lbnRSaWdodFwiKTtcbiAgICB0aGlzLmJ1aWxkZXIoXCIvKlwiICsgbGVmdCArIG5vZGUyLnRleHQgKyByaWdodCArIFwiKi9cIiwgbm9kZTIpO1xuICB9XG4gIGRlY2wobm9kZTIsIHNlbWljb2xvbikge1xuICAgIGxldCBiZXR3ZWVuID0gdGhpcy5yYXcobm9kZTIsIFwiYmV0d2VlblwiLCBcImNvbG9uXCIpO1xuICAgIGxldCBzdHJpbmcgPSBub2RlMi5wcm9wICsgYmV0d2VlbiArIHRoaXMucmF3VmFsdWUobm9kZTIsIFwidmFsdWVcIik7XG4gICAgaWYgKG5vZGUyLmltcG9ydGFudCkge1xuICAgICAgc3RyaW5nICs9IG5vZGUyLnJhd3MuaW1wb3J0YW50IHx8IFwiICFpbXBvcnRhbnRcIjtcbiAgICB9XG4gICAgaWYgKHNlbWljb2xvbikgc3RyaW5nICs9IFwiO1wiO1xuICAgIHRoaXMuYnVpbGRlcihzdHJpbmcsIG5vZGUyKTtcbiAgfVxuICBkb2N1bWVudChub2RlMikge1xuICAgIHRoaXMuYm9keShub2RlMik7XG4gIH1cbiAgcmF3KG5vZGUyLCBvd24sIGRldGVjdCkge1xuICAgIGxldCB2YWx1ZTtcbiAgICBpZiAoIWRldGVjdCkgZGV0ZWN0ID0gb3duO1xuICAgIGlmIChvd24pIHtcbiAgICAgIHZhbHVlID0gbm9kZTIucmF3c1tvd25dO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBsZXQgcGFyZW50ID0gbm9kZTIucGFyZW50O1xuICAgIGlmIChkZXRlY3QgPT09IFwiYmVmb3JlXCIpIHtcbiAgICAgIGlmICghcGFyZW50IHx8IHBhcmVudC50eXBlID09PSBcInJvb3RcIiAmJiBwYXJlbnQuZmlyc3QgPT09IG5vZGUyKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmVudCAmJiBwYXJlbnQudHlwZSA9PT0gXCJkb2N1bWVudFwiKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXBhcmVudCkgcmV0dXJuIERFRkFVTFRfUkFXW2RldGVjdF07XG4gICAgbGV0IHJvb3QyID0gbm9kZTIucm9vdCgpO1xuICAgIGlmICghcm9vdDIucmF3Q2FjaGUpIHJvb3QyLnJhd0NhY2hlID0ge307XG4gICAgaWYgKHR5cGVvZiByb290Mi5yYXdDYWNoZVtkZXRlY3RdICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gcm9vdDIucmF3Q2FjaGVbZGV0ZWN0XTtcbiAgICB9XG4gICAgaWYgKGRldGVjdCA9PT0gXCJiZWZvcmVcIiB8fCBkZXRlY3QgPT09IFwiYWZ0ZXJcIikge1xuICAgICAgcmV0dXJuIHRoaXMuYmVmb3JlQWZ0ZXIobm9kZTIsIGRldGVjdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBtZXRob2QgPSBcInJhd1wiICsgY2FwaXRhbGl6ZShkZXRlY3QpO1xuICAgICAgaWYgKHRoaXNbbWV0aG9kXSkge1xuICAgICAgICB2YWx1ZSA9IHRoaXNbbWV0aG9kXShyb290Miwgbm9kZTIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdDIud2FsaygoaSkgPT4ge1xuICAgICAgICAgIHZhbHVlID0gaS5yYXdzW293bl07XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikgdmFsdWUgPSBERUZBVUxUX1JBV1tkZXRlY3RdO1xuICAgIHJvb3QyLnJhd0NhY2hlW2RldGVjdF0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmF3QmVmb3JlQ2xvc2Uocm9vdDIpIHtcbiAgICBsZXQgdmFsdWU7XG4gICAgcm9vdDIud2FsaygoaSkgPT4ge1xuICAgICAgaWYgKGkubm9kZXMgJiYgaS5ub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaS5yYXdzLmFmdGVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgdmFsdWUgPSBpLnJhd3MuYWZ0ZXI7XG4gICAgICAgICAgaWYgKHZhbHVlLmluY2x1ZGVzKFwiXFxuXCIpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxuXSskLywgXCJcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh2YWx1ZSkgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXFMvZywgXCJcIik7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJhd0JlZm9yZUNvbW1lbnQocm9vdDIsIG5vZGUyKSB7XG4gICAgbGV0IHZhbHVlO1xuICAgIHJvb3QyLndhbGtDb21tZW50cygoaSkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBpLnJhd3MuYmVmb3JlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHZhbHVlID0gaS5yYXdzLmJlZm9yZTtcbiAgICAgICAgaWYgKHZhbHVlLmluY2x1ZGVzKFwiXFxuXCIpKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcbl0rJC8sIFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucmF3KG5vZGUyLCBudWxsLCBcImJlZm9yZURlY2xcIik7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXFMvZywgXCJcIik7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByYXdCZWZvcmVEZWNsKHJvb3QyLCBub2RlMikge1xuICAgIGxldCB2YWx1ZTtcbiAgICByb290Mi53YWxrRGVjbHMoKGkpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgaS5yYXdzLmJlZm9yZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB2YWx1ZSA9IGkucmF3cy5iZWZvcmU7XG4gICAgICAgIGlmICh2YWx1ZS5pbmNsdWRlcyhcIlxcblwiKSkge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXG5dKyQvLCBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlMiwgbnVsbCwgXCJiZWZvcmVSdWxlXCIpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxTL2csIFwiXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmF3QmVmb3JlT3Blbihyb290Mikge1xuICAgIGxldCB2YWx1ZTtcbiAgICByb290Mi53YWxrKChpKSA9PiB7XG4gICAgICBpZiAoaS50eXBlICE9PSBcImRlY2xcIikge1xuICAgICAgICB2YWx1ZSA9IGkucmF3cy5iZXR3ZWVuO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJhd0JlZm9yZVJ1bGUocm9vdDIpIHtcbiAgICBsZXQgdmFsdWU7XG4gICAgcm9vdDIud2FsaygoaSkgPT4ge1xuICAgICAgaWYgKGkubm9kZXMgJiYgKGkucGFyZW50ICE9PSByb290MiB8fCByb290Mi5maXJzdCAhPT0gaSkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpLnJhd3MuYmVmb3JlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgdmFsdWUgPSBpLnJhd3MuYmVmb3JlO1xuICAgICAgICAgIGlmICh2YWx1ZS5pbmNsdWRlcyhcIlxcblwiKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcbl0rJC8sIFwiXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodmFsdWUpIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxTL2csIFwiXCIpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByYXdDb2xvbihyb290Mikge1xuICAgIGxldCB2YWx1ZTtcbiAgICByb290Mi53YWxrRGVjbHMoKGkpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgaS5yYXdzLmJldHdlZW4gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgdmFsdWUgPSBpLnJhd3MuYmV0d2Vlbi5yZXBsYWNlKC9bXlxcczpdL2csIFwiXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJhd0VtcHR5Qm9keShyb290Mikge1xuICAgIGxldCB2YWx1ZTtcbiAgICByb290Mi53YWxrKChpKSA9PiB7XG4gICAgICBpZiAoaS5ub2RlcyAmJiBpLm5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YWx1ZSA9IGkucmF3cy5hZnRlcjtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByYXdJbmRlbnQocm9vdDIpIHtcbiAgICBpZiAocm9vdDIucmF3cy5pbmRlbnQpIHJldHVybiByb290Mi5yYXdzLmluZGVudDtcbiAgICBsZXQgdmFsdWU7XG4gICAgcm9vdDIud2FsaygoaSkgPT4ge1xuICAgICAgbGV0IHAgPSBpLnBhcmVudDtcbiAgICAgIGlmIChwICYmIHAgIT09IHJvb3QyICYmIHAucGFyZW50ICYmIHAucGFyZW50ID09PSByb290Mikge1xuICAgICAgICBpZiAodHlwZW9mIGkucmF3cy5iZWZvcmUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBsZXQgcGFydHMgPSBpLnJhd3MuYmVmb3JlLnNwbGl0KFwiXFxuXCIpO1xuICAgICAgICAgIHZhbHVlID0gcGFydHNbcGFydHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXFMvZywgXCJcIik7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJhd1NlbWljb2xvbihyb290Mikge1xuICAgIGxldCB2YWx1ZTtcbiAgICByb290Mi53YWxrKChpKSA9PiB7XG4gICAgICBpZiAoaS5ub2RlcyAmJiBpLm5vZGVzLmxlbmd0aCAmJiBpLmxhc3QudHlwZSA9PT0gXCJkZWNsXCIpIHtcbiAgICAgICAgdmFsdWUgPSBpLnJhd3Muc2VtaWNvbG9uO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJhd1ZhbHVlKG5vZGUyLCBwcm9wKSB7XG4gICAgbGV0IHZhbHVlID0gbm9kZTJbcHJvcF07XG4gICAgbGV0IHJhdyA9IG5vZGUyLnJhd3NbcHJvcF07XG4gICAgaWYgKHJhdyAmJiByYXcudmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gcmF3LnJhdztcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJvb3Qobm9kZTIpIHtcbiAgICB0aGlzLmJvZHkobm9kZTIpO1xuICAgIGlmIChub2RlMi5yYXdzLmFmdGVyKSB0aGlzLmJ1aWxkZXIobm9kZTIucmF3cy5hZnRlcik7XG4gIH1cbiAgcnVsZShub2RlMikge1xuICAgIHRoaXMuYmxvY2sobm9kZTIsIHRoaXMucmF3VmFsdWUobm9kZTIsIFwic2VsZWN0b3JcIikpO1xuICAgIGlmIChub2RlMi5yYXdzLm93blNlbWljb2xvbikge1xuICAgICAgdGhpcy5idWlsZGVyKG5vZGUyLnJhd3Mub3duU2VtaWNvbG9uLCBub2RlMiwgXCJlbmRcIik7XG4gICAgfVxuICB9XG4gIHN0cmluZ2lmeShub2RlMiwgc2VtaWNvbG9uKSB7XG4gICAgaWYgKCF0aGlzW25vZGUyLnR5cGVdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiVW5rbm93biBBU1Qgbm9kZSB0eXBlIFwiICsgbm9kZTIudHlwZSArIFwiLiBNYXliZSB5b3UgbmVlZCB0byBjaGFuZ2UgUG9zdENTUyBzdHJpbmdpZmllci5cIlxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpc1tub2RlMi50eXBlXShub2RlMiwgc2VtaWNvbG9uKTtcbiAgfVxufTtcbnZhciBzdHJpbmdpZmllciA9IFN0cmluZ2lmaWVyJDI7XG5TdHJpbmdpZmllciQyLmRlZmF1bHQgPSBTdHJpbmdpZmllciQyO1xubGV0IFN0cmluZ2lmaWVyJDEgPSBzdHJpbmdpZmllcjtcbmZ1bmN0aW9uIHN0cmluZ2lmeSQ0KG5vZGUyLCBidWlsZGVyKSB7XG4gIGxldCBzdHIgPSBuZXcgU3RyaW5naWZpZXIkMShidWlsZGVyKTtcbiAgc3RyLnN0cmluZ2lmeShub2RlMik7XG59XG52YXIgc3RyaW5naWZ5XzEgPSBzdHJpbmdpZnkkNDtcbnN0cmluZ2lmeSQ0LmRlZmF1bHQgPSBzdHJpbmdpZnkkNDtcbmxldCB7IGlzQ2xlYW46IGlzQ2xlYW4kMiwgbXk6IG15JDIgfSA9IHN5bWJvbHM7XG5sZXQgQ3NzU3ludGF4RXJyb3IkMiA9IGNzc1N5bnRheEVycm9yO1xubGV0IFN0cmluZ2lmaWVyMiA9IHN0cmluZ2lmaWVyO1xubGV0IHN0cmluZ2lmeSQzID0gc3RyaW5naWZ5XzE7XG5mdW5jdGlvbiBjbG9uZU5vZGUob2JqLCBwYXJlbnQpIHtcbiAgbGV0IGNsb25lZCA9IG5ldyBvYmouY29uc3RydWN0b3IoKTtcbiAgZm9yIChsZXQgaSBpbiBvYmopIHtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGkgPT09IFwicHJveHlDYWNoZVwiKSBjb250aW51ZTtcbiAgICBsZXQgdmFsdWUgPSBvYmpbaV07XG4gICAgbGV0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gICAgaWYgKGkgPT09IFwicGFyZW50XCIgJiYgdHlwZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgaWYgKHBhcmVudCkgY2xvbmVkW2ldID0gcGFyZW50O1xuICAgIH0gZWxzZSBpZiAoaSA9PT0gXCJzb3VyY2VcIikge1xuICAgICAgY2xvbmVkW2ldID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgY2xvbmVkW2ldID0gdmFsdWUubWFwKChqKSA9PiBjbG9uZU5vZGUoaiwgY2xvbmVkKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsKSB2YWx1ZSA9IGNsb25lTm9kZSh2YWx1ZSk7XG4gICAgICBjbG9uZWRbaV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNsb25lZDtcbn1cbmxldCBOb2RlJDQgPSBjbGFzcyBOb2RlIHtcbiAgY29uc3RydWN0b3IoZGVmYXVsdHMgPSB7fSkge1xuICAgIHRoaXMucmF3cyA9IHt9O1xuICAgIHRoaXNbaXNDbGVhbiQyXSA9IGZhbHNlO1xuICAgIHRoaXNbbXkkMl0gPSB0cnVlO1xuICAgIGZvciAobGV0IG5hbWUgaW4gZGVmYXVsdHMpIHtcbiAgICAgIGlmIChuYW1lID09PSBcIm5vZGVzXCIpIHtcbiAgICAgICAgdGhpcy5ub2RlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBub2RlMiBvZiBkZWZhdWx0c1tuYW1lXSkge1xuICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZTIuY2xvbmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhpcy5hcHBlbmQobm9kZTIuY2xvbmUoKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kKG5vZGUyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXNbbmFtZV0gPSBkZWZhdWx0c1tuYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYWRkVG9FcnJvcihlcnJvcikge1xuICAgIGVycm9yLnBvc3Rjc3NOb2RlID0gdGhpcztcbiAgICBpZiAoZXJyb3Iuc3RhY2sgJiYgdGhpcy5zb3VyY2UgJiYgL1xcblxcc3s0fWF0IC8udGVzdChlcnJvci5zdGFjaykpIHtcbiAgICAgIGxldCBzID0gdGhpcy5zb3VyY2U7XG4gICAgICBlcnJvci5zdGFjayA9IGVycm9yLnN0YWNrLnJlcGxhY2UoXG4gICAgICAgIC9cXG5cXHN7NH1hdCAvLFxuICAgICAgICBgJCYke3MuaW5wdXQuZnJvbX06JHtzLnN0YXJ0LmxpbmV9OiR7cy5zdGFydC5jb2x1bW59JCZgXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZXJyb3I7XG4gIH1cbiAgYWZ0ZXIoYWRkKSB7XG4gICAgdGhpcy5wYXJlbnQuaW5zZXJ0QWZ0ZXIodGhpcywgYWRkKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBhc3NpZ24ob3ZlcnJpZGVzID0ge30pIHtcbiAgICBmb3IgKGxldCBuYW1lIGluIG92ZXJyaWRlcykge1xuICAgICAgdGhpc1tuYW1lXSA9IG92ZXJyaWRlc1tuYW1lXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgYmVmb3JlKGFkZCkge1xuICAgIHRoaXMucGFyZW50Lmluc2VydEJlZm9yZSh0aGlzLCBhZGQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGNsZWFuUmF3cyhrZWVwQmV0d2Vlbikge1xuICAgIGRlbGV0ZSB0aGlzLnJhd3MuYmVmb3JlO1xuICAgIGRlbGV0ZSB0aGlzLnJhd3MuYWZ0ZXI7XG4gICAgaWYgKCFrZWVwQmV0d2VlbikgZGVsZXRlIHRoaXMucmF3cy5iZXR3ZWVuO1xuICB9XG4gIGNsb25lKG92ZXJyaWRlcyA9IHt9KSB7XG4gICAgbGV0IGNsb25lZCA9IGNsb25lTm9kZSh0aGlzKTtcbiAgICBmb3IgKGxldCBuYW1lIGluIG92ZXJyaWRlcykge1xuICAgICAgY2xvbmVkW25hbWVdID0gb3ZlcnJpZGVzW25hbWVdO1xuICAgIH1cbiAgICByZXR1cm4gY2xvbmVkO1xuICB9XG4gIGNsb25lQWZ0ZXIob3ZlcnJpZGVzID0ge30pIHtcbiAgICBsZXQgY2xvbmVkID0gdGhpcy5jbG9uZShvdmVycmlkZXMpO1xuICAgIHRoaXMucGFyZW50Lmluc2VydEFmdGVyKHRoaXMsIGNsb25lZCk7XG4gICAgcmV0dXJuIGNsb25lZDtcbiAgfVxuICBjbG9uZUJlZm9yZShvdmVycmlkZXMgPSB7fSkge1xuICAgIGxldCBjbG9uZWQgPSB0aGlzLmNsb25lKG92ZXJyaWRlcyk7XG4gICAgdGhpcy5wYXJlbnQuaW5zZXJ0QmVmb3JlKHRoaXMsIGNsb25lZCk7XG4gICAgcmV0dXJuIGNsb25lZDtcbiAgfVxuICBlcnJvcihtZXNzYWdlLCBvcHRzID0ge30pIHtcbiAgICBpZiAodGhpcy5zb3VyY2UpIHtcbiAgICAgIGxldCB7IGVuZCwgc3RhcnQgfSA9IHRoaXMucmFuZ2VCeShvcHRzKTtcbiAgICAgIHJldHVybiB0aGlzLnNvdXJjZS5pbnB1dC5lcnJvcihcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgeyBjb2x1bW46IHN0YXJ0LmNvbHVtbiwgbGluZTogc3RhcnQubGluZSB9LFxuICAgICAgICB7IGNvbHVtbjogZW5kLmNvbHVtbiwgbGluZTogZW5kLmxpbmUgfSxcbiAgICAgICAgb3B0c1xuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBDc3NTeW50YXhFcnJvciQyKG1lc3NhZ2UpO1xuICB9XG4gIGdldFByb3h5UHJvY2Vzc29yKCkge1xuICAgIHJldHVybiB7XG4gICAgICBnZXQobm9kZTIsIHByb3ApIHtcbiAgICAgICAgaWYgKHByb3AgPT09IFwicHJveHlPZlwiKSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGUyO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3AgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgcmV0dXJuICgpID0+IG5vZGUyLnJvb3QoKS50b1Byb3h5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGUyW3Byb3BdO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2V0KG5vZGUyLCBwcm9wLCB2YWx1ZSkge1xuICAgICAgICBpZiAobm9kZTJbcHJvcF0gPT09IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgbm9kZTJbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgaWYgKHByb3AgPT09IFwicHJvcFwiIHx8IHByb3AgPT09IFwidmFsdWVcIiB8fCBwcm9wID09PSBcIm5hbWVcIiB8fCBwcm9wID09PSBcInBhcmFtc1wiIHx8IHByb3AgPT09IFwiaW1wb3J0YW50XCIgfHwgLyogYzggaWdub3JlIG5leHQgKi9cbiAgICAgICAgcHJvcCA9PT0gXCJ0ZXh0XCIpIHtcbiAgICAgICAgICBub2RlMi5tYXJrRGlydHkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIG1hcmtEaXJ0eSgpIHtcbiAgICBpZiAodGhpc1tpc0NsZWFuJDJdKSB7XG4gICAgICB0aGlzW2lzQ2xlYW4kMl0gPSBmYWxzZTtcbiAgICAgIGxldCBuZXh0ID0gdGhpcztcbiAgICAgIHdoaWxlIChuZXh0ID0gbmV4dC5wYXJlbnQpIHtcbiAgICAgICAgbmV4dFtpc0NsZWFuJDJdID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIG5leHQoKSB7XG4gICAgaWYgKCF0aGlzLnBhcmVudCkgcmV0dXJuIHZvaWQgMDtcbiAgICBsZXQgaW5kZXgyID0gdGhpcy5wYXJlbnQuaW5kZXgodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50Lm5vZGVzW2luZGV4MiArIDFdO1xuICB9XG4gIHBvc2l0aW9uQnkob3B0cywgc3RyaW5nUmVwcmVzZW50YXRpb24pIHtcbiAgICBsZXQgcG9zID0gdGhpcy5zb3VyY2Uuc3RhcnQ7XG4gICAgaWYgKG9wdHMuaW5kZXgpIHtcbiAgICAgIHBvcyA9IHRoaXMucG9zaXRpb25JbnNpZGUob3B0cy5pbmRleCwgc3RyaW5nUmVwcmVzZW50YXRpb24pO1xuICAgIH0gZWxzZSBpZiAob3B0cy53b3JkKSB7XG4gICAgICBzdHJpbmdSZXByZXNlbnRhdGlvbiA9IHRoaXMudG9TdHJpbmcoKTtcbiAgICAgIGxldCBpbmRleDIgPSBzdHJpbmdSZXByZXNlbnRhdGlvbi5pbmRleE9mKG9wdHMud29yZCk7XG4gICAgICBpZiAoaW5kZXgyICE9PSAtMSkgcG9zID0gdGhpcy5wb3NpdGlvbkluc2lkZShpbmRleDIsIHN0cmluZ1JlcHJlc2VudGF0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIHBvcztcbiAgfVxuICBwb3NpdGlvbkluc2lkZShpbmRleDIsIHN0cmluZ1JlcHJlc2VudGF0aW9uKSB7XG4gICAgbGV0IHN0cmluZyA9IHN0cmluZ1JlcHJlc2VudGF0aW9uIHx8IHRoaXMudG9TdHJpbmcoKTtcbiAgICBsZXQgY29sdW1uID0gdGhpcy5zb3VyY2Uuc3RhcnQuY29sdW1uO1xuICAgIGxldCBsaW5lID0gdGhpcy5zb3VyY2Uuc3RhcnQubGluZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4MjsgaSsrKSB7XG4gICAgICBpZiAoc3RyaW5nW2ldID09PSBcIlxcblwiKSB7XG4gICAgICAgIGNvbHVtbiA9IDE7XG4gICAgICAgIGxpbmUgKz0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbHVtbiArPSAxO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBjb2x1bW4sIGxpbmUgfTtcbiAgfVxuICBwcmV2KCkge1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHJldHVybiB2b2lkIDA7XG4gICAgbGV0IGluZGV4MiA9IHRoaXMucGFyZW50LmluZGV4KHRoaXMpO1xuICAgIHJldHVybiB0aGlzLnBhcmVudC5ub2Rlc1tpbmRleDIgLSAxXTtcbiAgfVxuICByYW5nZUJ5KG9wdHMpIHtcbiAgICBsZXQgc3RhcnQgPSB7XG4gICAgICBjb2x1bW46IHRoaXMuc291cmNlLnN0YXJ0LmNvbHVtbixcbiAgICAgIGxpbmU6IHRoaXMuc291cmNlLnN0YXJ0LmxpbmVcbiAgICB9O1xuICAgIGxldCBlbmQgPSB0aGlzLnNvdXJjZS5lbmQgPyB7XG4gICAgICBjb2x1bW46IHRoaXMuc291cmNlLmVuZC5jb2x1bW4gKyAxLFxuICAgICAgbGluZTogdGhpcy5zb3VyY2UuZW5kLmxpbmVcbiAgICB9IDoge1xuICAgICAgY29sdW1uOiBzdGFydC5jb2x1bW4gKyAxLFxuICAgICAgbGluZTogc3RhcnQubGluZVxuICAgIH07XG4gICAgaWYgKG9wdHMud29yZCkge1xuICAgICAgbGV0IHN0cmluZ1JlcHJlc2VudGF0aW9uID0gdGhpcy50b1N0cmluZygpO1xuICAgICAgbGV0IGluZGV4MiA9IHN0cmluZ1JlcHJlc2VudGF0aW9uLmluZGV4T2Yob3B0cy53b3JkKTtcbiAgICAgIGlmIChpbmRleDIgIT09IC0xKSB7XG4gICAgICAgIHN0YXJ0ID0gdGhpcy5wb3NpdGlvbkluc2lkZShpbmRleDIsIHN0cmluZ1JlcHJlc2VudGF0aW9uKTtcbiAgICAgICAgZW5kID0gdGhpcy5wb3NpdGlvbkluc2lkZShpbmRleDIgKyBvcHRzLndvcmQubGVuZ3RoLCBzdHJpbmdSZXByZXNlbnRhdGlvbik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChvcHRzLnN0YXJ0KSB7XG4gICAgICAgIHN0YXJ0ID0ge1xuICAgICAgICAgIGNvbHVtbjogb3B0cy5zdGFydC5jb2x1bW4sXG4gICAgICAgICAgbGluZTogb3B0cy5zdGFydC5saW5lXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKG9wdHMuaW5kZXgpIHtcbiAgICAgICAgc3RhcnQgPSB0aGlzLnBvc2l0aW9uSW5zaWRlKG9wdHMuaW5kZXgpO1xuICAgICAgfVxuICAgICAgaWYgKG9wdHMuZW5kKSB7XG4gICAgICAgIGVuZCA9IHtcbiAgICAgICAgICBjb2x1bW46IG9wdHMuZW5kLmNvbHVtbixcbiAgICAgICAgICBsaW5lOiBvcHRzLmVuZC5saW5lXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRzLmVuZEluZGV4ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIGVuZCA9IHRoaXMucG9zaXRpb25JbnNpZGUob3B0cy5lbmRJbmRleCk7XG4gICAgICB9IGVsc2UgaWYgKG9wdHMuaW5kZXgpIHtcbiAgICAgICAgZW5kID0gdGhpcy5wb3NpdGlvbkluc2lkZShvcHRzLmluZGV4ICsgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbmQubGluZSA8IHN0YXJ0LmxpbmUgfHwgZW5kLmxpbmUgPT09IHN0YXJ0LmxpbmUgJiYgZW5kLmNvbHVtbiA8PSBzdGFydC5jb2x1bW4pIHtcbiAgICAgIGVuZCA9IHsgY29sdW1uOiBzdGFydC5jb2x1bW4gKyAxLCBsaW5lOiBzdGFydC5saW5lIH07XG4gICAgfVxuICAgIHJldHVybiB7IGVuZCwgc3RhcnQgfTtcbiAgfVxuICByYXcocHJvcCwgZGVmYXVsdFR5cGUpIHtcbiAgICBsZXQgc3RyID0gbmV3IFN0cmluZ2lmaWVyMigpO1xuICAgIHJldHVybiBzdHIucmF3KHRoaXMsIHByb3AsIGRlZmF1bHRUeXBlKTtcbiAgfVxuICByZW1vdmUoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICB0aGlzLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5wYXJlbnQgPSB2b2lkIDA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgcmVwbGFjZVdpdGgoLi4ubm9kZXMpIHtcbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgIGxldCBib29rbWFyayA9IHRoaXM7XG4gICAgICBsZXQgZm91bmRTZWxmID0gZmFsc2U7XG4gICAgICBmb3IgKGxldCBub2RlMiBvZiBub2Rlcykge1xuICAgICAgICBpZiAobm9kZTIgPT09IHRoaXMpIHtcbiAgICAgICAgICBmb3VuZFNlbGYgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGZvdW5kU2VsZikge1xuICAgICAgICAgIHRoaXMucGFyZW50Lmluc2VydEFmdGVyKGJvb2ttYXJrLCBub2RlMik7XG4gICAgICAgICAgYm9va21hcmsgPSBub2RlMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBhcmVudC5pbnNlcnRCZWZvcmUoYm9va21hcmssIG5vZGUyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFmb3VuZFNlbGYpIHtcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgcm9vdCgpIHtcbiAgICBsZXQgcmVzdWx0MiA9IHRoaXM7XG4gICAgd2hpbGUgKHJlc3VsdDIucGFyZW50ICYmIHJlc3VsdDIucGFyZW50LnR5cGUgIT09IFwiZG9jdW1lbnRcIikge1xuICAgICAgcmVzdWx0MiA9IHJlc3VsdDIucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0MjtcbiAgfVxuICB0b0pTT04oXywgaW5wdXRzKSB7XG4gICAgbGV0IGZpeGVkID0ge307XG4gICAgbGV0IGVtaXRJbnB1dHMgPSBpbnB1dHMgPT0gbnVsbDtcbiAgICBpbnB1dHMgPSBpbnB1dHMgfHwgLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbiAgICBsZXQgaW5wdXRzTmV4dEluZGV4ID0gMDtcbiAgICBmb3IgKGxldCBuYW1lIGluIHRoaXMpIHtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsIG5hbWUpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKG5hbWUgPT09IFwicGFyZW50XCIgfHwgbmFtZSA9PT0gXCJwcm94eUNhY2hlXCIpIGNvbnRpbnVlO1xuICAgICAgbGV0IHZhbHVlID0gdGhpc1tuYW1lXTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBmaXhlZFtuYW1lXSA9IHZhbHVlLm1hcCgoaSkgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgaSA9PT0gXCJvYmplY3RcIiAmJiBpLnRvSlNPTikge1xuICAgICAgICAgICAgcmV0dXJuIGkudG9KU09OKG51bGwsIGlucHV0cyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZS50b0pTT04pIHtcbiAgICAgICAgZml4ZWRbbmFtZV0gPSB2YWx1ZS50b0pTT04obnVsbCwgaW5wdXRzKTtcbiAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gXCJzb3VyY2VcIikge1xuICAgICAgICBsZXQgaW5wdXRJZCA9IGlucHV0cy5nZXQodmFsdWUuaW5wdXQpO1xuICAgICAgICBpZiAoaW5wdXRJZCA9PSBudWxsKSB7XG4gICAgICAgICAgaW5wdXRJZCA9IGlucHV0c05leHRJbmRleDtcbiAgICAgICAgICBpbnB1dHMuc2V0KHZhbHVlLmlucHV0LCBpbnB1dHNOZXh0SW5kZXgpO1xuICAgICAgICAgIGlucHV0c05leHRJbmRleCsrO1xuICAgICAgICB9XG4gICAgICAgIGZpeGVkW25hbWVdID0ge1xuICAgICAgICAgIGVuZDogdmFsdWUuZW5kLFxuICAgICAgICAgIGlucHV0SWQsXG4gICAgICAgICAgc3RhcnQ6IHZhbHVlLnN0YXJ0XG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaXhlZFtuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW1pdElucHV0cykge1xuICAgICAgZml4ZWQuaW5wdXRzID0gWy4uLmlucHV0cy5rZXlzKCldLm1hcCgoaW5wdXQyKSA9PiBpbnB1dDIudG9KU09OKCkpO1xuICAgIH1cbiAgICByZXR1cm4gZml4ZWQ7XG4gIH1cbiAgdG9Qcm94eSgpIHtcbiAgICBpZiAoIXRoaXMucHJveHlDYWNoZSkge1xuICAgICAgdGhpcy5wcm94eUNhY2hlID0gbmV3IFByb3h5KHRoaXMsIHRoaXMuZ2V0UHJveHlQcm9jZXNzb3IoKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByb3h5Q2FjaGU7XG4gIH1cbiAgdG9TdHJpbmcoc3RyaW5naWZpZXIyID0gc3RyaW5naWZ5JDMpIHtcbiAgICBpZiAoc3RyaW5naWZpZXIyLnN0cmluZ2lmeSkgc3RyaW5naWZpZXIyID0gc3RyaW5naWZpZXIyLnN0cmluZ2lmeTtcbiAgICBsZXQgcmVzdWx0MiA9IFwiXCI7XG4gICAgc3RyaW5naWZpZXIyKHRoaXMsIChpKSA9PiB7XG4gICAgICByZXN1bHQyICs9IGk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDI7XG4gIH1cbiAgd2FybihyZXN1bHQyLCB0ZXh0LCBvcHRzKSB7XG4gICAgbGV0IGRhdGEgPSB7IG5vZGU6IHRoaXMgfTtcbiAgICBmb3IgKGxldCBpIGluIG9wdHMpIGRhdGFbaV0gPSBvcHRzW2ldO1xuICAgIHJldHVybiByZXN1bHQyLndhcm4odGV4dCwgZGF0YSk7XG4gIH1cbiAgZ2V0IHByb3h5T2YoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG52YXIgbm9kZSA9IE5vZGUkNDtcbk5vZGUkNC5kZWZhdWx0ID0gTm9kZSQ0O1xubGV0IE5vZGUkMyA9IG5vZGU7XG5sZXQgRGVjbGFyYXRpb24kNCA9IGNsYXNzIERlY2xhcmF0aW9uIGV4dGVuZHMgTm9kZSQzIHtcbiAgY29uc3RydWN0b3IoZGVmYXVsdHMpIHtcbiAgICBpZiAoZGVmYXVsdHMgJiYgdHlwZW9mIGRlZmF1bHRzLnZhbHVlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBkZWZhdWx0cy52YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgZGVmYXVsdHMgPSBfX3NwcmVhZFByb3BzKF9fc3ByZWFkVmFsdWVzKHt9LCBkZWZhdWx0cyksIHsgdmFsdWU6IFN0cmluZyhkZWZhdWx0cy52YWx1ZSkgfSk7XG4gICAgfVxuICAgIHN1cGVyKGRlZmF1bHRzKTtcbiAgICB0aGlzLnR5cGUgPSBcImRlY2xcIjtcbiAgfVxuICBnZXQgdmFyaWFibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcC5zdGFydHNXaXRoKFwiLS1cIikgfHwgdGhpcy5wcm9wWzBdID09PSBcIiRcIjtcbiAgfVxufTtcbnZhciBkZWNsYXJhdGlvbiA9IERlY2xhcmF0aW9uJDQ7XG5EZWNsYXJhdGlvbiQ0LmRlZmF1bHQgPSBEZWNsYXJhdGlvbiQ0O1xubGV0IHVybEFscGhhYmV0ID0gXCJ1c2VhbmRvbS0yNlQxOTgzNDBQWDc1cHhKQUNLVkVSWU1JTkRCVVNIV09MRl9HUVpiZmdoamtscXZ3eXpyaWN0XCI7XG5sZXQgY3VzdG9tQWxwaGFiZXQgPSAoYWxwaGFiZXQsIGRlZmF1bHRTaXplID0gMjEpID0+IHtcbiAgcmV0dXJuIChzaXplID0gZGVmYXVsdFNpemUpID0+IHtcbiAgICBsZXQgaWQgPSBcIlwiO1xuICAgIGxldCBpID0gc2l6ZTtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZCArPSBhbHBoYWJldFtNYXRoLnJhbmRvbSgpICogYWxwaGFiZXQubGVuZ3RoIHwgMF07XG4gICAgfVxuICAgIHJldHVybiBpZDtcbiAgfTtcbn07XG5sZXQgbmFub2lkJDEgPSAoc2l6ZSA9IDIxKSA9PiB7XG4gIGxldCBpZCA9IFwiXCI7XG4gIGxldCBpID0gc2l6ZTtcbiAgd2hpbGUgKGktLSkge1xuICAgIGlkICs9IHVybEFscGhhYmV0W01hdGgucmFuZG9tKCkgKiA2NCB8IDBdO1xuICB9XG4gIHJldHVybiBpZDtcbn07XG52YXIgbm9uU2VjdXJlID0geyBuYW5vaWQ6IG5hbm9pZCQxLCBjdXN0b21BbHBoYWJldCB9O1xubGV0IHsgU291cmNlTWFwQ29uc3VtZXI6IFNvdXJjZU1hcENvbnN1bWVyJDIsIFNvdXJjZU1hcEdlbmVyYXRvcjogU291cmNlTWFwR2VuZXJhdG9yJDIgfSA9IHJlcXVpcmUkJDI7XG5sZXQgeyBleGlzdHNTeW5jLCByZWFkRmlsZVN5bmMgfSA9IHJlcXVpcmUkJDI7XG5sZXQgeyBkaXJuYW1lOiBkaXJuYW1lJDEsIGpvaW4gfSA9IHJlcXVpcmUkJDI7XG5mdW5jdGlvbiBmcm9tQmFzZTY0KHN0cikge1xuICBpZiAoQnVmZmVyKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHN0ciwgXCJiYXNlNjRcIikudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gd2luZG93LmF0b2Ioc3RyKTtcbiAgfVxufVxubGV0IFByZXZpb3VzTWFwJDIgPSBjbGFzcyBQcmV2aW91c01hcCB7XG4gIGNvbnN0cnVjdG9yKGNzcywgb3B0cykge1xuICAgIGlmIChvcHRzLm1hcCA9PT0gZmFsc2UpIHJldHVybjtcbiAgICB0aGlzLmxvYWRBbm5vdGF0aW9uKGNzcyk7XG4gICAgdGhpcy5pbmxpbmUgPSB0aGlzLnN0YXJ0V2l0aCh0aGlzLmFubm90YXRpb24sIFwiZGF0YTpcIik7XG4gICAgbGV0IHByZXYgPSBvcHRzLm1hcCA/IG9wdHMubWFwLnByZXYgOiB2b2lkIDA7XG4gICAgbGV0IHRleHQgPSB0aGlzLmxvYWRNYXAob3B0cy5mcm9tLCBwcmV2KTtcbiAgICBpZiAoIXRoaXMubWFwRmlsZSAmJiBvcHRzLmZyb20pIHtcbiAgICAgIHRoaXMubWFwRmlsZSA9IG9wdHMuZnJvbTtcbiAgICB9XG4gICAgaWYgKHRoaXMubWFwRmlsZSkgdGhpcy5yb290ID0gZGlybmFtZSQxKHRoaXMubWFwRmlsZSk7XG4gICAgaWYgKHRleHQpIHRoaXMudGV4dCA9IHRleHQ7XG4gIH1cbiAgY29uc3VtZXIoKSB7XG4gICAgaWYgKCF0aGlzLmNvbnN1bWVyQ2FjaGUpIHtcbiAgICAgIHRoaXMuY29uc3VtZXJDYWNoZSA9IG5ldyBTb3VyY2VNYXBDb25zdW1lciQyKHRoaXMudGV4dCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbnN1bWVyQ2FjaGU7XG4gIH1cbiAgZGVjb2RlSW5saW5lKHRleHQpIHtcbiAgICBsZXQgYmFzZUNoYXJzZXRVcmkgPSAvXmRhdGE6YXBwbGljYXRpb25cXC9qc29uO2NoYXJzZXQ9dXRmLT84O2Jhc2U2NCwvO1xuICAgIGxldCBiYXNlVXJpID0gL15kYXRhOmFwcGxpY2F0aW9uXFwvanNvbjtiYXNlNjQsLztcbiAgICBsZXQgY2hhcnNldFVyaSA9IC9eZGF0YTphcHBsaWNhdGlvblxcL2pzb247Y2hhcnNldD11dGYtPzgsLztcbiAgICBsZXQgdXJpID0gL15kYXRhOmFwcGxpY2F0aW9uXFwvanNvbiwvO1xuICAgIGlmIChjaGFyc2V0VXJpLnRlc3QodGV4dCkgfHwgdXJpLnRlc3QodGV4dCkpIHtcbiAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQodGV4dC5zdWJzdHIoUmVnRXhwLmxhc3RNYXRjaC5sZW5ndGgpKTtcbiAgICB9XG4gICAgaWYgKGJhc2VDaGFyc2V0VXJpLnRlc3QodGV4dCkgfHwgYmFzZVVyaS50ZXN0KHRleHQpKSB7XG4gICAgICByZXR1cm4gZnJvbUJhc2U2NCh0ZXh0LnN1YnN0cihSZWdFeHAubGFzdE1hdGNoLmxlbmd0aCkpO1xuICAgIH1cbiAgICBsZXQgZW5jb2RpbmcgPSB0ZXh0Lm1hdGNoKC9kYXRhOmFwcGxpY2F0aW9uXFwvanNvbjsoW14sXSspLC8pWzFdO1xuICAgIHRocm93IG5ldyBFcnJvcihcIlVuc3VwcG9ydGVkIHNvdXJjZSBtYXAgZW5jb2RpbmcgXCIgKyBlbmNvZGluZyk7XG4gIH1cbiAgZ2V0QW5ub3RhdGlvblVSTChzb3VyY2VNYXBTdHJpbmcpIHtcbiAgICByZXR1cm4gc291cmNlTWFwU3RyaW5nLnJlcGxhY2UoL15cXC9cXCpcXHMqIyBzb3VyY2VNYXBwaW5nVVJMPS8sIFwiXCIpLnRyaW0oKTtcbiAgfVxuICBpc01hcChtYXApIHtcbiAgICBpZiAodHlwZW9mIG1hcCAhPT0gXCJvYmplY3RcIikgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0eXBlb2YgbWFwLm1hcHBpbmdzID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBtYXAuX21hcHBpbmdzID09PSBcInN0cmluZ1wiIHx8IEFycmF5LmlzQXJyYXkobWFwLnNlY3Rpb25zKTtcbiAgfVxuICBsb2FkQW5ub3RhdGlvbihjc3MpIHtcbiAgICBsZXQgY29tbWVudHMgPSBjc3MubWF0Y2goL1xcL1xcKlxccyojIHNvdXJjZU1hcHBpbmdVUkw9L2dtKTtcbiAgICBpZiAoIWNvbW1lbnRzKSByZXR1cm47XG4gICAgbGV0IHN0YXJ0ID0gY3NzLmxhc3RJbmRleE9mKGNvbW1lbnRzLnBvcCgpKTtcbiAgICBsZXQgZW5kID0gY3NzLmluZGV4T2YoXCIqL1wiLCBzdGFydCk7XG4gICAgaWYgKHN0YXJ0ID4gLTEgJiYgZW5kID4gLTEpIHtcbiAgICAgIHRoaXMuYW5ub3RhdGlvbiA9IHRoaXMuZ2V0QW5ub3RhdGlvblVSTChjc3Muc3Vic3RyaW5nKHN0YXJ0LCBlbmQpKTtcbiAgICB9XG4gIH1cbiAgbG9hZEZpbGUocGF0aCkge1xuICAgIHRoaXMucm9vdCA9IGRpcm5hbWUkMShwYXRoKTtcbiAgICBpZiAoZXhpc3RzU3luYyhwYXRoKSkge1xuICAgICAgdGhpcy5tYXBGaWxlID0gcGF0aDtcbiAgICAgIHJldHVybiByZWFkRmlsZVN5bmMocGF0aCwgXCJ1dGYtOFwiKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICB9XG4gIH1cbiAgbG9hZE1hcChmaWxlLCBwcmV2KSB7XG4gICAgaWYgKHByZXYgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHByZXYpIHtcbiAgICAgIGlmICh0eXBlb2YgcHJldiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHByZXYgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBsZXQgcHJldlBhdGggPSBwcmV2KGZpbGUpO1xuICAgICAgICBpZiAocHJldlBhdGgpIHtcbiAgICAgICAgICBsZXQgbWFwID0gdGhpcy5sb2FkRmlsZShwcmV2UGF0aCk7XG4gICAgICAgICAgaWYgKCFtYXApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgXCJVbmFibGUgdG8gbG9hZCBwcmV2aW91cyBzb3VyY2UgbWFwOiBcIiArIHByZXZQYXRoLnRvU3RyaW5nKClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBtYXA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocHJldiBpbnN0YW5jZW9mIFNvdXJjZU1hcENvbnN1bWVyJDIpIHtcbiAgICAgICAgcmV0dXJuIFNvdXJjZU1hcEdlbmVyYXRvciQyLmZyb21Tb3VyY2VNYXAocHJldikudG9TdHJpbmcoKTtcbiAgICAgIH0gZWxzZSBpZiAocHJldiBpbnN0YW5jZW9mIFNvdXJjZU1hcEdlbmVyYXRvciQyKSB7XG4gICAgICAgIHJldHVybiBwcmV2LnRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNNYXAocHJldikpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHByZXYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIFwiVW5zdXBwb3J0ZWQgcHJldmlvdXMgc291cmNlIG1hcCBmb3JtYXQ6IFwiICsgcHJldi50b1N0cmluZygpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmlubGluZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlSW5saW5lKHRoaXMuYW5ub3RhdGlvbik7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFubm90YXRpb24pIHtcbiAgICAgIGxldCBtYXAgPSB0aGlzLmFubm90YXRpb247XG4gICAgICBpZiAoZmlsZSkgbWFwID0gam9pbihkaXJuYW1lJDEoZmlsZSksIG1hcCk7XG4gICAgICByZXR1cm4gdGhpcy5sb2FkRmlsZShtYXApO1xuICAgIH1cbiAgfVxuICBzdGFydFdpdGgoc3RyaW5nLCBzdGFydCkge1xuICAgIGlmICghc3RyaW5nKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHN0cmluZy5zdWJzdHIoMCwgc3RhcnQubGVuZ3RoKSA9PT0gc3RhcnQ7XG4gIH1cbiAgd2l0aENvbnRlbnQoKSB7XG4gICAgcmV0dXJuICEhKHRoaXMuY29uc3VtZXIoKS5zb3VyY2VzQ29udGVudCAmJiB0aGlzLmNvbnN1bWVyKCkuc291cmNlc0NvbnRlbnQubGVuZ3RoID4gMCk7XG4gIH1cbn07XG52YXIgcHJldmlvdXNNYXAgPSBQcmV2aW91c01hcCQyO1xuUHJldmlvdXNNYXAkMi5kZWZhdWx0ID0gUHJldmlvdXNNYXAkMjtcbmxldCB7IFNvdXJjZU1hcENvbnN1bWVyOiBTb3VyY2VNYXBDb25zdW1lciQxLCBTb3VyY2VNYXBHZW5lcmF0b3I6IFNvdXJjZU1hcEdlbmVyYXRvciQxIH0gPSByZXF1aXJlJCQyO1xubGV0IHsgZmlsZVVSTFRvUGF0aCwgcGF0aFRvRmlsZVVSTDogcGF0aFRvRmlsZVVSTCQxIH0gPSByZXF1aXJlJCQyO1xubGV0IHsgaXNBYnNvbHV0ZSwgcmVzb2x2ZTogcmVzb2x2ZSQxIH0gPSByZXF1aXJlJCQyO1xubGV0IHsgbmFub2lkIH0gPSBub25TZWN1cmU7XG5sZXQgdGVybWluYWxIaWdobGlnaHQgPSByZXF1aXJlJCQyO1xubGV0IENzc1N5bnRheEVycm9yJDEgPSBjc3NTeW50YXhFcnJvcjtcbmxldCBQcmV2aW91c01hcCQxID0gcHJldmlvdXNNYXA7XG5sZXQgZnJvbU9mZnNldENhY2hlID0gU3ltYm9sKFwiZnJvbU9mZnNldENhY2hlXCIpO1xubGV0IHNvdXJjZU1hcEF2YWlsYWJsZSQxID0gQm9vbGVhbihTb3VyY2VNYXBDb25zdW1lciQxICYmIFNvdXJjZU1hcEdlbmVyYXRvciQxKTtcbmxldCBwYXRoQXZhaWxhYmxlJDEgPSBCb29sZWFuKHJlc29sdmUkMSAmJiBpc0Fic29sdXRlKTtcbmxldCBJbnB1dCQ0ID0gY2xhc3MgSW5wdXQge1xuICBjb25zdHJ1Y3Rvcihjc3MsIG9wdHMgPSB7fSkge1xuICAgIGlmIChjc3MgPT09IG51bGwgfHwgdHlwZW9mIGNzcyA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgY3NzID09PSBcIm9iamVjdFwiICYmICFjc3MudG9TdHJpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUG9zdENTUyByZWNlaXZlZCAke2Nzc30gaW5zdGVhZCBvZiBDU1Mgc3RyaW5nYCk7XG4gICAgfVxuICAgIHRoaXMuY3NzID0gY3NzLnRvU3RyaW5nKCk7XG4gICAgaWYgKHRoaXMuY3NzWzBdID09PSBcIlxcdUZFRkZcIiB8fCB0aGlzLmNzc1swXSA9PT0gXCJcXHVGRkZFXCIpIHtcbiAgICAgIHRoaXMuaGFzQk9NID0gdHJ1ZTtcbiAgICAgIHRoaXMuY3NzID0gdGhpcy5jc3Muc2xpY2UoMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFzQk9NID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChvcHRzLmZyb20pIHtcbiAgICAgIGlmICghcGF0aEF2YWlsYWJsZSQxIHx8IC9eXFx3KzpcXC9cXC8vLnRlc3Qob3B0cy5mcm9tKSB8fCBpc0Fic29sdXRlKG9wdHMuZnJvbSkpIHtcbiAgICAgICAgdGhpcy5maWxlID0gb3B0cy5mcm9tO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5maWxlID0gcmVzb2x2ZSQxKG9wdHMuZnJvbSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwYXRoQXZhaWxhYmxlJDEgJiYgc291cmNlTWFwQXZhaWxhYmxlJDEpIHtcbiAgICAgIGxldCBtYXAgPSBuZXcgUHJldmlvdXNNYXAkMSh0aGlzLmNzcywgb3B0cyk7XG4gICAgICBpZiAobWFwLnRleHQpIHtcbiAgICAgICAgdGhpcy5tYXAgPSBtYXA7XG4gICAgICAgIGxldCBmaWxlID0gbWFwLmNvbnN1bWVyKCkuZmlsZTtcbiAgICAgICAgaWYgKCF0aGlzLmZpbGUgJiYgZmlsZSkgdGhpcy5maWxlID0gdGhpcy5tYXBSZXNvbHZlKGZpbGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXRoaXMuZmlsZSkge1xuICAgICAgdGhpcy5pZCA9IFwiPGlucHV0IGNzcyBcIiArIG5hbm9pZCg2KSArIFwiPlwiO1xuICAgIH1cbiAgICBpZiAodGhpcy5tYXApIHRoaXMubWFwLmZpbGUgPSB0aGlzLmZyb207XG4gIH1cbiAgZXJyb3IobWVzc2FnZSwgbGluZSwgY29sdW1uLCBvcHRzID0ge30pIHtcbiAgICBsZXQgcmVzdWx0MiwgZW5kTGluZSwgZW5kQ29sdW1uO1xuICAgIGlmIChsaW5lICYmIHR5cGVvZiBsaW5lID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBsZXQgc3RhcnQgPSBsaW5lO1xuICAgICAgbGV0IGVuZCA9IGNvbHVtbjtcbiAgICAgIGlmICh0eXBlb2Ygc3RhcnQub2Zmc2V0ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIGxldCBwb3MgPSB0aGlzLmZyb21PZmZzZXQoc3RhcnQub2Zmc2V0KTtcbiAgICAgICAgbGluZSA9IHBvcy5saW5lO1xuICAgICAgICBjb2x1bW4gPSBwb3MuY29sO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGluZSA9IHN0YXJ0LmxpbmU7XG4gICAgICAgIGNvbHVtbiA9IHN0YXJ0LmNvbHVtbjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgZW5kLm9mZnNldCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5mcm9tT2Zmc2V0KGVuZC5vZmZzZXQpO1xuICAgICAgICBlbmRMaW5lID0gcG9zLmxpbmU7XG4gICAgICAgIGVuZENvbHVtbiA9IHBvcy5jb2w7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbmRMaW5lID0gZW5kLmxpbmU7XG4gICAgICAgIGVuZENvbHVtbiA9IGVuZC5jb2x1bW47XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghY29sdW1uKSB7XG4gICAgICBsZXQgcG9zID0gdGhpcy5mcm9tT2Zmc2V0KGxpbmUpO1xuICAgICAgbGluZSA9IHBvcy5saW5lO1xuICAgICAgY29sdW1uID0gcG9zLmNvbDtcbiAgICB9XG4gICAgbGV0IG9yaWdpbiA9IHRoaXMub3JpZ2luKGxpbmUsIGNvbHVtbiwgZW5kTGluZSwgZW5kQ29sdW1uKTtcbiAgICBpZiAob3JpZ2luKSB7XG4gICAgICByZXN1bHQyID0gbmV3IENzc1N5bnRheEVycm9yJDEoXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIG9yaWdpbi5lbmRMaW5lID09PSB2b2lkIDAgPyBvcmlnaW4ubGluZSA6IHsgY29sdW1uOiBvcmlnaW4uY29sdW1uLCBsaW5lOiBvcmlnaW4ubGluZSB9LFxuICAgICAgICBvcmlnaW4uZW5kTGluZSA9PT0gdm9pZCAwID8gb3JpZ2luLmNvbHVtbiA6IHsgY29sdW1uOiBvcmlnaW4uZW5kQ29sdW1uLCBsaW5lOiBvcmlnaW4uZW5kTGluZSB9LFxuICAgICAgICBvcmlnaW4uc291cmNlLFxuICAgICAgICBvcmlnaW4uZmlsZSxcbiAgICAgICAgb3B0cy5wbHVnaW5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdDIgPSBuZXcgQ3NzU3ludGF4RXJyb3IkMShcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgZW5kTGluZSA9PT0gdm9pZCAwID8gbGluZSA6IHsgY29sdW1uLCBsaW5lIH0sXG4gICAgICAgIGVuZExpbmUgPT09IHZvaWQgMCA/IGNvbHVtbiA6IHsgY29sdW1uOiBlbmRDb2x1bW4sIGxpbmU6IGVuZExpbmUgfSxcbiAgICAgICAgdGhpcy5jc3MsXG4gICAgICAgIHRoaXMuZmlsZSxcbiAgICAgICAgb3B0cy5wbHVnaW5cbiAgICAgICk7XG4gICAgfVxuICAgIHJlc3VsdDIuaW5wdXQgPSB7IGNvbHVtbiwgZW5kQ29sdW1uLCBlbmRMaW5lLCBsaW5lLCBzb3VyY2U6IHRoaXMuY3NzIH07XG4gICAgaWYgKHRoaXMuZmlsZSkge1xuICAgICAgaWYgKHBhdGhUb0ZpbGVVUkwkMSkge1xuICAgICAgICByZXN1bHQyLmlucHV0LnVybCA9IHBhdGhUb0ZpbGVVUkwkMSh0aGlzLmZpbGUpLnRvU3RyaW5nKCk7XG4gICAgICB9XG4gICAgICByZXN1bHQyLmlucHV0LmZpbGUgPSB0aGlzLmZpbGU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQyO1xuICB9XG4gIGZyb21PZmZzZXQob2Zmc2V0KSB7XG4gICAgbGV0IGxhc3RMaW5lLCBsaW5lVG9JbmRleDtcbiAgICBpZiAoIXRoaXNbZnJvbU9mZnNldENhY2hlXSkge1xuICAgICAgbGV0IGxpbmVzID0gdGhpcy5jc3Muc3BsaXQoXCJcXG5cIik7XG4gICAgICBsaW5lVG9JbmRleCA9IG5ldyBBcnJheShsaW5lcy5sZW5ndGgpO1xuICAgICAgbGV0IHByZXZJbmRleCA9IDA7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBsaW5lVG9JbmRleFtpXSA9IHByZXZJbmRleDtcbiAgICAgICAgcHJldkluZGV4ICs9IGxpbmVzW2ldLmxlbmd0aCArIDE7XG4gICAgICB9XG4gICAgICB0aGlzW2Zyb21PZmZzZXRDYWNoZV0gPSBsaW5lVG9JbmRleDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGluZVRvSW5kZXggPSB0aGlzW2Zyb21PZmZzZXRDYWNoZV07XG4gICAgfVxuICAgIGxhc3RMaW5lID0gbGluZVRvSW5kZXhbbGluZVRvSW5kZXgubGVuZ3RoIC0gMV07XG4gICAgbGV0IG1pbiA9IDA7XG4gICAgaWYgKG9mZnNldCA+PSBsYXN0TGluZSkge1xuICAgICAgbWluID0gbGluZVRvSW5kZXgubGVuZ3RoIC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG1heCA9IGxpbmVUb0luZGV4Lmxlbmd0aCAtIDI7XG4gICAgICBsZXQgbWlkO1xuICAgICAgd2hpbGUgKG1pbiA8IG1heCkge1xuICAgICAgICBtaWQgPSBtaW4gKyAobWF4IC0gbWluID4+IDEpO1xuICAgICAgICBpZiAob2Zmc2V0IDwgbGluZVRvSW5kZXhbbWlkXSkge1xuICAgICAgICAgIG1heCA9IG1pZCAtIDE7XG4gICAgICAgIH0gZWxzZSBpZiAob2Zmc2V0ID49IGxpbmVUb0luZGV4W21pZCArIDFdKSB7XG4gICAgICAgICAgbWluID0gbWlkICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtaW4gPSBtaWQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbDogb2Zmc2V0IC0gbGluZVRvSW5kZXhbbWluXSArIDEsXG4gICAgICBsaW5lOiBtaW4gKyAxXG4gICAgfTtcbiAgfVxuICBtYXBSZXNvbHZlKGZpbGUpIHtcbiAgICBpZiAoL15cXHcrOlxcL1xcLy8udGVzdChmaWxlKSkge1xuICAgICAgcmV0dXJuIGZpbGU7XG4gICAgfVxuICAgIHJldHVybiByZXNvbHZlJDEodGhpcy5tYXAuY29uc3VtZXIoKS5zb3VyY2VSb290IHx8IHRoaXMubWFwLnJvb3QgfHwgXCIuXCIsIGZpbGUpO1xuICB9XG4gIG9yaWdpbihsaW5lLCBjb2x1bW4sIGVuZExpbmUsIGVuZENvbHVtbikge1xuICAgIGlmICghdGhpcy5tYXApIHJldHVybiBmYWxzZTtcbiAgICBsZXQgY29uc3VtZXIgPSB0aGlzLm1hcC5jb25zdW1lcigpO1xuICAgIGxldCBmcm9tID0gY29uc3VtZXIub3JpZ2luYWxQb3NpdGlvbkZvcih7IGNvbHVtbiwgbGluZSB9KTtcbiAgICBpZiAoIWZyb20uc291cmNlKSByZXR1cm4gZmFsc2U7XG4gICAgbGV0IHRvO1xuICAgIGlmICh0eXBlb2YgZW5kTGluZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgdG8gPSBjb25zdW1lci5vcmlnaW5hbFBvc2l0aW9uRm9yKHsgY29sdW1uOiBlbmRDb2x1bW4sIGxpbmU6IGVuZExpbmUgfSk7XG4gICAgfVxuICAgIGxldCBmcm9tVXJsO1xuICAgIGlmIChpc0Fic29sdXRlKGZyb20uc291cmNlKSkge1xuICAgICAgZnJvbVVybCA9IHBhdGhUb0ZpbGVVUkwkMShmcm9tLnNvdXJjZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyb21VcmwgPSBuZXcgVVJMKFxuICAgICAgICBmcm9tLnNvdXJjZSxcbiAgICAgICAgdGhpcy5tYXAuY29uc3VtZXIoKS5zb3VyY2VSb290IHx8IHBhdGhUb0ZpbGVVUkwkMSh0aGlzLm1hcC5tYXBGaWxlKVxuICAgICAgKTtcbiAgICB9XG4gICAgbGV0IHJlc3VsdDIgPSB7XG4gICAgICBjb2x1bW46IGZyb20uY29sdW1uLFxuICAgICAgZW5kQ29sdW1uOiB0byAmJiB0by5jb2x1bW4sXG4gICAgICBlbmRMaW5lOiB0byAmJiB0by5saW5lLFxuICAgICAgbGluZTogZnJvbS5saW5lLFxuICAgICAgdXJsOiBmcm9tVXJsLnRvU3RyaW5nKClcbiAgICB9O1xuICAgIGlmIChmcm9tVXJsLnByb3RvY29sID09PSBcImZpbGU6XCIpIHtcbiAgICAgIGlmIChmaWxlVVJMVG9QYXRoKSB7XG4gICAgICAgIHJlc3VsdDIuZmlsZSA9IGZpbGVVUkxUb1BhdGgoZnJvbVVybCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZpbGU6IHByb3RvY29sIGlzIG5vdCBhdmFpbGFibGUgaW4gdGhpcyBQb3N0Q1NTIGJ1aWxkYCk7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBzb3VyY2UgPSBjb25zdW1lci5zb3VyY2VDb250ZW50Rm9yKGZyb20uc291cmNlKTtcbiAgICBpZiAoc291cmNlKSByZXN1bHQyLnNvdXJjZSA9IHNvdXJjZTtcbiAgICByZXR1cm4gcmVzdWx0MjtcbiAgfVxuICB0b0pTT04oKSB7XG4gICAgbGV0IGpzb24gPSB7fTtcbiAgICBmb3IgKGxldCBuYW1lIG9mIFtcImhhc0JPTVwiLCBcImNzc1wiLCBcImZpbGVcIiwgXCJpZFwiXSkge1xuICAgICAgaWYgKHRoaXNbbmFtZV0gIT0gbnVsbCkge1xuICAgICAgICBqc29uW25hbWVdID0gdGhpc1tuYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICBqc29uLm1hcCA9IF9fc3ByZWFkVmFsdWVzKHt9LCB0aGlzLm1hcCk7XG4gICAgICBpZiAoanNvbi5tYXAuY29uc3VtZXJDYWNoZSkge1xuICAgICAgICBqc29uLm1hcC5jb25zdW1lckNhY2hlID0gdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuICBnZXQgZnJvbSgpIHtcbiAgICByZXR1cm4gdGhpcy5maWxlIHx8IHRoaXMuaWQ7XG4gIH1cbn07XG52YXIgaW5wdXQgPSBJbnB1dCQ0O1xuSW5wdXQkNC5kZWZhdWx0ID0gSW5wdXQkNDtcbmlmICh0ZXJtaW5hbEhpZ2hsaWdodCAmJiB0ZXJtaW5hbEhpZ2hsaWdodC5yZWdpc3RlcklucHV0KSB7XG4gIHRlcm1pbmFsSGlnaGxpZ2h0LnJlZ2lzdGVySW5wdXQoSW5wdXQkNCk7XG59XG5sZXQgeyBTb3VyY2VNYXBDb25zdW1lciwgU291cmNlTWFwR2VuZXJhdG9yIH0gPSByZXF1aXJlJCQyO1xubGV0IHsgZGlybmFtZSwgcmVsYXRpdmUsIHJlc29sdmUsIHNlcCB9ID0gcmVxdWlyZSQkMjtcbmxldCB7IHBhdGhUb0ZpbGVVUkwgfSA9IHJlcXVpcmUkJDI7XG5sZXQgSW5wdXQkMyA9IGlucHV0O1xubGV0IHNvdXJjZU1hcEF2YWlsYWJsZSA9IEJvb2xlYW4oU291cmNlTWFwQ29uc3VtZXIgJiYgU291cmNlTWFwR2VuZXJhdG9yKTtcbmxldCBwYXRoQXZhaWxhYmxlID0gQm9vbGVhbihkaXJuYW1lICYmIHJlc29sdmUgJiYgcmVsYXRpdmUgJiYgc2VwKTtcbmxldCBNYXBHZW5lcmF0b3IkMiA9IGNsYXNzIE1hcEdlbmVyYXRvciB7XG4gIGNvbnN0cnVjdG9yKHN0cmluZ2lmeTIsIHJvb3QyLCBvcHRzLCBjc3NTdHJpbmcpIHtcbiAgICB0aGlzLnN0cmluZ2lmeSA9IHN0cmluZ2lmeTI7XG4gICAgdGhpcy5tYXBPcHRzID0gb3B0cy5tYXAgfHwge307XG4gICAgdGhpcy5yb290ID0gcm9vdDI7XG4gICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICB0aGlzLmNzcyA9IGNzc1N0cmluZztcbiAgICB0aGlzLm9yaWdpbmFsQ1NTID0gY3NzU3RyaW5nO1xuICAgIHRoaXMudXNlc0ZpbGVVcmxzID0gIXRoaXMubWFwT3B0cy5mcm9tICYmIHRoaXMubWFwT3B0cy5hYnNvbHV0ZTtcbiAgICB0aGlzLm1lbW9pemVkRmlsZVVSTHMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICAgIHRoaXMubWVtb2l6ZWRQYXRocyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gICAgdGhpcy5tZW1vaXplZFVSTHMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICB9XG4gIGFkZEFubm90YXRpb24oKSB7XG4gICAgbGV0IGNvbnRlbnQ7XG4gICAgaWYgKHRoaXMuaXNJbmxpbmUoKSkge1xuICAgICAgY29udGVudCA9IFwiZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIHRoaXMudG9CYXNlNjQodGhpcy5tYXAudG9TdHJpbmcoKSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5tYXBPcHRzLmFubm90YXRpb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnRlbnQgPSB0aGlzLm1hcE9wdHMuYW5ub3RhdGlvbjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLm1hcE9wdHMuYW5ub3RhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBjb250ZW50ID0gdGhpcy5tYXBPcHRzLmFubm90YXRpb24odGhpcy5vcHRzLnRvLCB0aGlzLnJvb3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW50ID0gdGhpcy5vdXRwdXRGaWxlKCkgKyBcIi5tYXBcIjtcbiAgICB9XG4gICAgbGV0IGVvbCA9IFwiXFxuXCI7XG4gICAgaWYgKHRoaXMuY3NzLmluY2x1ZGVzKFwiXFxyXFxuXCIpKSBlb2wgPSBcIlxcclxcblwiO1xuICAgIHRoaXMuY3NzICs9IGVvbCArIFwiLyojIHNvdXJjZU1hcHBpbmdVUkw9XCIgKyBjb250ZW50ICsgXCIgKi9cIjtcbiAgfVxuICBhcHBseVByZXZNYXBzKCkge1xuICAgIGZvciAobGV0IHByZXYgb2YgdGhpcy5wcmV2aW91cygpKSB7XG4gICAgICBsZXQgZnJvbSA9IHRoaXMudG9VcmwodGhpcy5wYXRoKHByZXYuZmlsZSkpO1xuICAgICAgbGV0IHJvb3QyID0gcHJldi5yb290IHx8IGRpcm5hbWUocHJldi5maWxlKTtcbiAgICAgIGxldCBtYXA7XG4gICAgICBpZiAodGhpcy5tYXBPcHRzLnNvdXJjZXNDb250ZW50ID09PSBmYWxzZSkge1xuICAgICAgICBtYXAgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIocHJldi50ZXh0KTtcbiAgICAgICAgaWYgKG1hcC5zb3VyY2VzQ29udGVudCkge1xuICAgICAgICAgIG1hcC5zb3VyY2VzQ29udGVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcCA9IHByZXYuY29uc3VtZXIoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubWFwLmFwcGx5U291cmNlTWFwKG1hcCwgZnJvbSwgdGhpcy50b1VybCh0aGlzLnBhdGgocm9vdDIpKSk7XG4gICAgfVxuICB9XG4gIGNsZWFyQW5ub3RhdGlvbigpIHtcbiAgICBpZiAodGhpcy5tYXBPcHRzLmFubm90YXRpb24gPT09IGZhbHNlKSByZXR1cm47XG4gICAgaWYgKHRoaXMucm9vdCkge1xuICAgICAgbGV0IG5vZGUyO1xuICAgICAgZm9yIChsZXQgaSA9IHRoaXMucm9vdC5ub2Rlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBub2RlMiA9IHRoaXMucm9vdC5ub2Rlc1tpXTtcbiAgICAgICAgaWYgKG5vZGUyLnR5cGUgIT09IFwiY29tbWVudFwiKSBjb250aW51ZTtcbiAgICAgICAgaWYgKG5vZGUyLnRleHQuaW5kZXhPZihcIiMgc291cmNlTWFwcGluZ1VSTD1cIikgPT09IDApIHtcbiAgICAgICAgICB0aGlzLnJvb3QucmVtb3ZlQ2hpbGQoaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY3NzKSB7XG4gICAgICB0aGlzLmNzcyA9IHRoaXMuY3NzLnJlcGxhY2UoL1xcbio/XFwvXFwqI1tcXFNcXHNdKj9cXCpcXC8kL2dtLCBcIlwiKTtcbiAgICB9XG4gIH1cbiAgZ2VuZXJhdGUoKSB7XG4gICAgdGhpcy5jbGVhckFubm90YXRpb24oKTtcbiAgICBpZiAocGF0aEF2YWlsYWJsZSAmJiBzb3VyY2VNYXBBdmFpbGFibGUgJiYgdGhpcy5pc01hcCgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZU1hcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcmVzdWx0MiA9IFwiXCI7XG4gICAgICB0aGlzLnN0cmluZ2lmeSh0aGlzLnJvb3QsIChpKSA9PiB7XG4gICAgICAgIHJlc3VsdDIgKz0gaTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIFtyZXN1bHQyXTtcbiAgICB9XG4gIH1cbiAgZ2VuZXJhdGVNYXAoKSB7XG4gICAgaWYgKHRoaXMucm9vdCkge1xuICAgICAgdGhpcy5nZW5lcmF0ZVN0cmluZygpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2aW91cygpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGV0IHByZXYgPSB0aGlzLnByZXZpb3VzKClbMF0uY29uc3VtZXIoKTtcbiAgICAgIHByZXYuZmlsZSA9IHRoaXMub3V0cHV0RmlsZSgpO1xuICAgICAgdGhpcy5tYXAgPSBTb3VyY2VNYXBHZW5lcmF0b3IuZnJvbVNvdXJjZU1hcChwcmV2LCB7XG4gICAgICAgIGlnbm9yZUludmFsaWRNYXBwaW5nOiB0cnVlXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tYXAgPSBuZXcgU291cmNlTWFwR2VuZXJhdG9yKHtcbiAgICAgICAgZmlsZTogdGhpcy5vdXRwdXRGaWxlKCksXG4gICAgICAgIGlnbm9yZUludmFsaWRNYXBwaW5nOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHRoaXMubWFwLmFkZE1hcHBpbmcoe1xuICAgICAgICBnZW5lcmF0ZWQ6IHsgY29sdW1uOiAwLCBsaW5lOiAxIH0sXG4gICAgICAgIG9yaWdpbmFsOiB7IGNvbHVtbjogMCwgbGluZTogMSB9LFxuICAgICAgICBzb3VyY2U6IHRoaXMub3B0cy5mcm9tID8gdGhpcy50b1VybCh0aGlzLnBhdGgodGhpcy5vcHRzLmZyb20pKSA6IFwiPG5vIHNvdXJjZT5cIlxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzU291cmNlc0NvbnRlbnQoKSkgdGhpcy5zZXRTb3VyY2VzQ29udGVudCgpO1xuICAgIGlmICh0aGlzLnJvb3QgJiYgdGhpcy5wcmV2aW91cygpLmxlbmd0aCA+IDApIHRoaXMuYXBwbHlQcmV2TWFwcygpO1xuICAgIGlmICh0aGlzLmlzQW5ub3RhdGlvbigpKSB0aGlzLmFkZEFubm90YXRpb24oKTtcbiAgICBpZiAodGhpcy5pc0lubGluZSgpKSB7XG4gICAgICByZXR1cm4gW3RoaXMuY3NzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFt0aGlzLmNzcywgdGhpcy5tYXBdO1xuICAgIH1cbiAgfVxuICBnZW5lcmF0ZVN0cmluZygpIHtcbiAgICB0aGlzLmNzcyA9IFwiXCI7XG4gICAgdGhpcy5tYXAgPSBuZXcgU291cmNlTWFwR2VuZXJhdG9yKHtcbiAgICAgIGZpbGU6IHRoaXMub3V0cHV0RmlsZSgpLFxuICAgICAgaWdub3JlSW52YWxpZE1hcHBpbmc6IHRydWVcbiAgICB9KTtcbiAgICBsZXQgbGluZSA9IDE7XG4gICAgbGV0IGNvbHVtbiA9IDE7XG4gICAgbGV0IG5vU291cmNlID0gXCI8bm8gc291cmNlPlwiO1xuICAgIGxldCBtYXBwaW5nID0ge1xuICAgICAgZ2VuZXJhdGVkOiB7IGNvbHVtbjogMCwgbGluZTogMCB9LFxuICAgICAgb3JpZ2luYWw6IHsgY29sdW1uOiAwLCBsaW5lOiAwIH0sXG4gICAgICBzb3VyY2U6IFwiXCJcbiAgICB9O1xuICAgIGxldCBsaW5lcywgbGFzdDtcbiAgICB0aGlzLnN0cmluZ2lmeSh0aGlzLnJvb3QsIChzdHIsIG5vZGUyLCB0eXBlKSA9PiB7XG4gICAgICB0aGlzLmNzcyArPSBzdHI7XG4gICAgICBpZiAobm9kZTIgJiYgdHlwZSAhPT0gXCJlbmRcIikge1xuICAgICAgICBtYXBwaW5nLmdlbmVyYXRlZC5saW5lID0gbGluZTtcbiAgICAgICAgbWFwcGluZy5nZW5lcmF0ZWQuY29sdW1uID0gY29sdW1uIC0gMTtcbiAgICAgICAgaWYgKG5vZGUyLnNvdXJjZSAmJiBub2RlMi5zb3VyY2Uuc3RhcnQpIHtcbiAgICAgICAgICBtYXBwaW5nLnNvdXJjZSA9IHRoaXMuc291cmNlUGF0aChub2RlMik7XG4gICAgICAgICAgbWFwcGluZy5vcmlnaW5hbC5saW5lID0gbm9kZTIuc291cmNlLnN0YXJ0LmxpbmU7XG4gICAgICAgICAgbWFwcGluZy5vcmlnaW5hbC5jb2x1bW4gPSBub2RlMi5zb3VyY2Uuc3RhcnQuY29sdW1uIC0gMTtcbiAgICAgICAgICB0aGlzLm1hcC5hZGRNYXBwaW5nKG1hcHBpbmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hcHBpbmcuc291cmNlID0gbm9Tb3VyY2U7XG4gICAgICAgICAgbWFwcGluZy5vcmlnaW5hbC5saW5lID0gMTtcbiAgICAgICAgICBtYXBwaW5nLm9yaWdpbmFsLmNvbHVtbiA9IDA7XG4gICAgICAgICAgdGhpcy5tYXAuYWRkTWFwcGluZyhtYXBwaW5nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGluZXMgPSBzdHIubWF0Y2goL1xcbi9nKTtcbiAgICAgIGlmIChsaW5lcykge1xuICAgICAgICBsaW5lICs9IGxpbmVzLmxlbmd0aDtcbiAgICAgICAgbGFzdCA9IHN0ci5sYXN0SW5kZXhPZihcIlxcblwiKTtcbiAgICAgICAgY29sdW1uID0gc3RyLmxlbmd0aCAtIGxhc3Q7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2x1bW4gKz0gc3RyLmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlMiAmJiB0eXBlICE9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgbGV0IHAgPSBub2RlMi5wYXJlbnQgfHwgeyByYXdzOiB7fSB9O1xuICAgICAgICBsZXQgY2hpbGRsZXNzID0gbm9kZTIudHlwZSA9PT0gXCJkZWNsXCIgfHwgbm9kZTIudHlwZSA9PT0gXCJhdHJ1bGVcIiAmJiAhbm9kZTIubm9kZXM7XG4gICAgICAgIGlmICghY2hpbGRsZXNzIHx8IG5vZGUyICE9PSBwLmxhc3QgfHwgcC5yYXdzLnNlbWljb2xvbikge1xuICAgICAgICAgIGlmIChub2RlMi5zb3VyY2UgJiYgbm9kZTIuc291cmNlLmVuZCkge1xuICAgICAgICAgICAgbWFwcGluZy5zb3VyY2UgPSB0aGlzLnNvdXJjZVBhdGgobm9kZTIpO1xuICAgICAgICAgICAgbWFwcGluZy5vcmlnaW5hbC5saW5lID0gbm9kZTIuc291cmNlLmVuZC5saW5lO1xuICAgICAgICAgICAgbWFwcGluZy5vcmlnaW5hbC5jb2x1bW4gPSBub2RlMi5zb3VyY2UuZW5kLmNvbHVtbiAtIDE7XG4gICAgICAgICAgICBtYXBwaW5nLmdlbmVyYXRlZC5saW5lID0gbGluZTtcbiAgICAgICAgICAgIG1hcHBpbmcuZ2VuZXJhdGVkLmNvbHVtbiA9IGNvbHVtbiAtIDI7XG4gICAgICAgICAgICB0aGlzLm1hcC5hZGRNYXBwaW5nKG1hcHBpbmcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXBwaW5nLnNvdXJjZSA9IG5vU291cmNlO1xuICAgICAgICAgICAgbWFwcGluZy5vcmlnaW5hbC5saW5lID0gMTtcbiAgICAgICAgICAgIG1hcHBpbmcub3JpZ2luYWwuY29sdW1uID0gMDtcbiAgICAgICAgICAgIG1hcHBpbmcuZ2VuZXJhdGVkLmxpbmUgPSBsaW5lO1xuICAgICAgICAgICAgbWFwcGluZy5nZW5lcmF0ZWQuY29sdW1uID0gY29sdW1uIC0gMTtcbiAgICAgICAgICAgIHRoaXMubWFwLmFkZE1hcHBpbmcobWFwcGluZyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgaXNBbm5vdGF0aW9uKCkge1xuICAgIGlmICh0aGlzLmlzSW5saW5lKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBPcHRzLmFubm90YXRpb247XG4gICAgfVxuICAgIGlmICh0aGlzLnByZXZpb3VzKCkubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcmV2aW91cygpLnNvbWUoKGkpID0+IGkuYW5ub3RhdGlvbik7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlzSW5saW5lKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5tYXBPcHRzLmlubGluZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuIHRoaXMubWFwT3B0cy5pbmxpbmU7XG4gICAgfVxuICAgIGxldCBhbm5vdGF0aW9uID0gdGhpcy5tYXBPcHRzLmFubm90YXRpb247XG4gICAgaWYgKHR5cGVvZiBhbm5vdGF0aW9uICE9PSBcInVuZGVmaW5lZFwiICYmIGFubm90YXRpb24gIT09IHRydWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJldmlvdXMoKS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLnByZXZpb3VzKCkuc29tZSgoaSkgPT4gaS5pbmxpbmUpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpc01hcCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMub3B0cy5tYXAgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybiAhIXRoaXMub3B0cy5tYXA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByZXZpb3VzKCkubGVuZ3RoID4gMDtcbiAgfVxuICBpc1NvdXJjZXNDb250ZW50KCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5tYXBPcHRzLnNvdXJjZXNDb250ZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBPcHRzLnNvdXJjZXNDb250ZW50O1xuICAgIH1cbiAgICBpZiAodGhpcy5wcmV2aW91cygpLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJldmlvdXMoKS5zb21lKChpKSA9PiBpLndpdGhDb250ZW50KCkpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBvdXRwdXRGaWxlKCkge1xuICAgIGlmICh0aGlzLm9wdHMudG8pIHtcbiAgICAgIHJldHVybiB0aGlzLnBhdGgodGhpcy5vcHRzLnRvKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0cy5mcm9tKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXRoKHRoaXMub3B0cy5mcm9tKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwidG8uY3NzXCI7XG4gICAgfVxuICB9XG4gIHBhdGgoZmlsZSkge1xuICAgIGlmICh0aGlzLm1hcE9wdHMuYWJzb2x1dGUpIHJldHVybiBmaWxlO1xuICAgIGlmIChmaWxlLmNoYXJDb2RlQXQoMCkgPT09IDYwKSByZXR1cm4gZmlsZTtcbiAgICBpZiAoL15cXHcrOlxcL1xcLy8udGVzdChmaWxlKSkgcmV0dXJuIGZpbGU7XG4gICAgbGV0IGNhY2hlZCA9IHRoaXMubWVtb2l6ZWRQYXRocy5nZXQoZmlsZSk7XG4gICAgaWYgKGNhY2hlZCkgcmV0dXJuIGNhY2hlZDtcbiAgICBsZXQgZnJvbSA9IHRoaXMub3B0cy50byA/IGRpcm5hbWUodGhpcy5vcHRzLnRvKSA6IFwiLlwiO1xuICAgIGlmICh0eXBlb2YgdGhpcy5tYXBPcHRzLmFubm90YXRpb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGZyb20gPSBkaXJuYW1lKHJlc29sdmUoZnJvbSwgdGhpcy5tYXBPcHRzLmFubm90YXRpb24pKTtcbiAgICB9XG4gICAgbGV0IHBhdGggPSByZWxhdGl2ZShmcm9tLCBmaWxlKTtcbiAgICB0aGlzLm1lbW9pemVkUGF0aHMuc2V0KGZpbGUsIHBhdGgpO1xuICAgIHJldHVybiBwYXRoO1xuICB9XG4gIHByZXZpb3VzKCkge1xuICAgIGlmICghdGhpcy5wcmV2aW91c01hcHMpIHtcbiAgICAgIHRoaXMucHJldmlvdXNNYXBzID0gW107XG4gICAgICBpZiAodGhpcy5yb290KSB7XG4gICAgICAgIHRoaXMucm9vdC53YWxrKChub2RlMikgPT4ge1xuICAgICAgICAgIGlmIChub2RlMi5zb3VyY2UgJiYgbm9kZTIuc291cmNlLmlucHV0Lm1hcCkge1xuICAgICAgICAgICAgbGV0IG1hcCA9IG5vZGUyLnNvdXJjZS5pbnB1dC5tYXA7XG4gICAgICAgICAgICBpZiAoIXRoaXMucHJldmlvdXNNYXBzLmluY2x1ZGVzKG1hcCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c01hcHMucHVzaChtYXApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaW5wdXQyID0gbmV3IElucHV0JDModGhpcy5vcmlnaW5hbENTUywgdGhpcy5vcHRzKTtcbiAgICAgICAgaWYgKGlucHV0Mi5tYXApIHRoaXMucHJldmlvdXNNYXBzLnB1c2goaW5wdXQyLm1hcCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByZXZpb3VzTWFwcztcbiAgfVxuICBzZXRTb3VyY2VzQ29udGVudCgpIHtcbiAgICBsZXQgYWxyZWFkeSA9IHt9O1xuICAgIGlmICh0aGlzLnJvb3QpIHtcbiAgICAgIHRoaXMucm9vdC53YWxrKChub2RlMikgPT4ge1xuICAgICAgICBpZiAobm9kZTIuc291cmNlKSB7XG4gICAgICAgICAgbGV0IGZyb20gPSBub2RlMi5zb3VyY2UuaW5wdXQuZnJvbTtcbiAgICAgICAgICBpZiAoZnJvbSAmJiAhYWxyZWFkeVtmcm9tXSkge1xuICAgICAgICAgICAgYWxyZWFkeVtmcm9tXSA9IHRydWU7XG4gICAgICAgICAgICBsZXQgZnJvbVVybCA9IHRoaXMudXNlc0ZpbGVVcmxzID8gdGhpcy50b0ZpbGVVcmwoZnJvbSkgOiB0aGlzLnRvVXJsKHRoaXMucGF0aChmcm9tKSk7XG4gICAgICAgICAgICB0aGlzLm1hcC5zZXRTb3VyY2VDb250ZW50KGZyb21VcmwsIG5vZGUyLnNvdXJjZS5pbnB1dC5jc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNzcykge1xuICAgICAgbGV0IGZyb20gPSB0aGlzLm9wdHMuZnJvbSA/IHRoaXMudG9VcmwodGhpcy5wYXRoKHRoaXMub3B0cy5mcm9tKSkgOiBcIjxubyBzb3VyY2U+XCI7XG4gICAgICB0aGlzLm1hcC5zZXRTb3VyY2VDb250ZW50KGZyb20sIHRoaXMuY3NzKTtcbiAgICB9XG4gIH1cbiAgc291cmNlUGF0aChub2RlMikge1xuICAgIGlmICh0aGlzLm1hcE9wdHMuZnJvbSkge1xuICAgICAgcmV0dXJuIHRoaXMudG9VcmwodGhpcy5tYXBPcHRzLmZyb20pO1xuICAgIH0gZWxzZSBpZiAodGhpcy51c2VzRmlsZVVybHMpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvRmlsZVVybChub2RlMi5zb3VyY2UuaW5wdXQuZnJvbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnRvVXJsKHRoaXMucGF0aChub2RlMi5zb3VyY2UuaW5wdXQuZnJvbSkpO1xuICAgIH1cbiAgfVxuICB0b0Jhc2U2NChzdHIpIHtcbiAgICBpZiAoQnVmZmVyKSB7XG4gICAgICByZXR1cm4gQnVmZmVyLmZyb20oc3RyKS50b1N0cmluZyhcImJhc2U2NFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHdpbmRvdy5idG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKSk7XG4gICAgfVxuICB9XG4gIHRvRmlsZVVybChwYXRoKSB7XG4gICAgbGV0IGNhY2hlZCA9IHRoaXMubWVtb2l6ZWRGaWxlVVJMcy5nZXQocGF0aCk7XG4gICAgaWYgKGNhY2hlZCkgcmV0dXJuIGNhY2hlZDtcbiAgICBpZiAocGF0aFRvRmlsZVVSTCkge1xuICAgICAgbGV0IGZpbGVVUkwgPSBwYXRoVG9GaWxlVVJMKHBhdGgpLnRvU3RyaW5nKCk7XG4gICAgICB0aGlzLm1lbW9pemVkRmlsZVVSTHMuc2V0KHBhdGgsIGZpbGVVUkwpO1xuICAgICAgcmV0dXJuIGZpbGVVUkw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJgbWFwLmFic29sdXRlYCBvcHRpb24gaXMgbm90IGF2YWlsYWJsZSBpbiB0aGlzIFBvc3RDU1MgYnVpbGRcIlxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgdG9VcmwocGF0aCkge1xuICAgIGxldCBjYWNoZWQgPSB0aGlzLm1lbW9pemVkVVJMcy5nZXQocGF0aCk7XG4gICAgaWYgKGNhY2hlZCkgcmV0dXJuIGNhY2hlZDtcbiAgICBpZiAoc2VwID09PSBcIlxcXFxcIikge1xuICAgICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXFxcXC9nLCBcIi9cIik7XG4gICAgfVxuICAgIGxldCB1cmwgPSBlbmNvZGVVUkkocGF0aCkucmVwbGFjZSgvWyM/XS9nLCBlbmNvZGVVUklDb21wb25lbnQpO1xuICAgIHRoaXMubWVtb2l6ZWRVUkxzLnNldChwYXRoLCB1cmwpO1xuICAgIHJldHVybiB1cmw7XG4gIH1cbn07XG52YXIgbWFwR2VuZXJhdG9yID0gTWFwR2VuZXJhdG9yJDI7XG5sZXQgTm9kZSQyID0gbm9kZTtcbmxldCBDb21tZW50JDQgPSBjbGFzcyBDb21tZW50IGV4dGVuZHMgTm9kZSQyIHtcbiAgY29uc3RydWN0b3IoZGVmYXVsdHMpIHtcbiAgICBzdXBlcihkZWZhdWx0cyk7XG4gICAgdGhpcy50eXBlID0gXCJjb21tZW50XCI7XG4gIH1cbn07XG52YXIgY29tbWVudCA9IENvbW1lbnQkNDtcbkNvbW1lbnQkNC5kZWZhdWx0ID0gQ29tbWVudCQ0O1xubGV0IHsgaXNDbGVhbjogaXNDbGVhbiQxLCBteTogbXkkMSB9ID0gc3ltYm9scztcbmxldCBEZWNsYXJhdGlvbiQzID0gZGVjbGFyYXRpb247XG5sZXQgQ29tbWVudCQzID0gY29tbWVudDtcbmxldCBOb2RlJDEgPSBub2RlO1xubGV0IHBhcnNlJDQ7XG5sZXQgUnVsZSQ0O1xubGV0IEF0UnVsZSQ0O1xubGV0IFJvb3QkNjtcbmZ1bmN0aW9uIGNsZWFuU291cmNlKG5vZGVzKSB7XG4gIHJldHVybiBub2Rlcy5tYXAoKGkpID0+IHtcbiAgICBpZiAoaS5ub2RlcykgaS5ub2RlcyA9IGNsZWFuU291cmNlKGkubm9kZXMpO1xuICAgIGRlbGV0ZSBpLnNvdXJjZTtcbiAgICByZXR1cm4gaTtcbiAgfSk7XG59XG5mdW5jdGlvbiBtYXJrRGlydHlVcChub2RlMikge1xuICBub2RlMltpc0NsZWFuJDFdID0gZmFsc2U7XG4gIGlmIChub2RlMi5wcm94eU9mLm5vZGVzKSB7XG4gICAgZm9yIChsZXQgaSBvZiBub2RlMi5wcm94eU9mLm5vZGVzKSB7XG4gICAgICBtYXJrRGlydHlVcChpKTtcbiAgICB9XG4gIH1cbn1cbmxldCBDb250YWluZXIkNyA9IGNsYXNzIENvbnRhaW5lciBleHRlbmRzIE5vZGUkMSB7XG4gIGFwcGVuZCguLi5jaGlsZHJlbikge1xuICAgIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICBsZXQgbm9kZXMgPSB0aGlzLm5vcm1hbGl6ZShjaGlsZCwgdGhpcy5sYXN0KTtcbiAgICAgIGZvciAobGV0IG5vZGUyIG9mIG5vZGVzKSB0aGlzLnByb3h5T2Yubm9kZXMucHVzaChub2RlMik7XG4gICAgfVxuICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgY2xlYW5SYXdzKGtlZXBCZXR3ZWVuKSB7XG4gICAgc3VwZXIuY2xlYW5SYXdzKGtlZXBCZXR3ZWVuKTtcbiAgICBpZiAodGhpcy5ub2Rlcykge1xuICAgICAgZm9yIChsZXQgbm9kZTIgb2YgdGhpcy5ub2Rlcykgbm9kZTIuY2xlYW5SYXdzKGtlZXBCZXR3ZWVuKTtcbiAgICB9XG4gIH1cbiAgZWFjaChjYWxsYmFjaykge1xuICAgIGlmICghdGhpcy5wcm94eU9mLm5vZGVzKSByZXR1cm4gdm9pZCAwO1xuICAgIGxldCBpdGVyYXRvciA9IHRoaXMuZ2V0SXRlcmF0b3IoKTtcbiAgICBsZXQgaW5kZXgyLCByZXN1bHQyO1xuICAgIHdoaWxlICh0aGlzLmluZGV4ZXNbaXRlcmF0b3JdIDwgdGhpcy5wcm94eU9mLm5vZGVzLmxlbmd0aCkge1xuICAgICAgaW5kZXgyID0gdGhpcy5pbmRleGVzW2l0ZXJhdG9yXTtcbiAgICAgIHJlc3VsdDIgPSBjYWxsYmFjayh0aGlzLnByb3h5T2Yubm9kZXNbaW5kZXgyXSwgaW5kZXgyKTtcbiAgICAgIGlmIChyZXN1bHQyID09PSBmYWxzZSkgYnJlYWs7XG4gICAgICB0aGlzLmluZGV4ZXNbaXRlcmF0b3JdICs9IDE7XG4gICAgfVxuICAgIGRlbGV0ZSB0aGlzLmluZGV4ZXNbaXRlcmF0b3JdO1xuICAgIHJldHVybiByZXN1bHQyO1xuICB9XG4gIGV2ZXJ5KGNvbmRpdGlvbikge1xuICAgIHJldHVybiB0aGlzLm5vZGVzLmV2ZXJ5KGNvbmRpdGlvbik7XG4gIH1cbiAgZ2V0SXRlcmF0b3IoKSB7XG4gICAgaWYgKCF0aGlzLmxhc3RFYWNoKSB0aGlzLmxhc3RFYWNoID0gMDtcbiAgICBpZiAoIXRoaXMuaW5kZXhlcykgdGhpcy5pbmRleGVzID0ge307XG4gICAgdGhpcy5sYXN0RWFjaCArPSAxO1xuICAgIGxldCBpdGVyYXRvciA9IHRoaXMubGFzdEVhY2g7XG4gICAgdGhpcy5pbmRleGVzW2l0ZXJhdG9yXSA9IDA7XG4gICAgcmV0dXJuIGl0ZXJhdG9yO1xuICB9XG4gIGdldFByb3h5UHJvY2Vzc29yKCkge1xuICAgIHJldHVybiB7XG4gICAgICBnZXQobm9kZTIsIHByb3ApIHtcbiAgICAgICAgaWYgKHByb3AgPT09IFwicHJveHlPZlwiKSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGUyO1xuICAgICAgICB9IGVsc2UgaWYgKCFub2RlMltwcm9wXSkge1xuICAgICAgICAgIHJldHVybiBub2RlMltwcm9wXTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wID09PSBcImVhY2hcIiB8fCB0eXBlb2YgcHJvcCA9PT0gXCJzdHJpbmdcIiAmJiBwcm9wLnN0YXJ0c1dpdGgoXCJ3YWxrXCIpKSB7XG4gICAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZTJbcHJvcF0oXG4gICAgICAgICAgICAgIC4uLmFyZ3MubWFwKChpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoY2hpbGQsIGluZGV4MikgPT4gaShjaGlsZC50b1Byb3h5KCksIGluZGV4Mik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wID09PSBcImV2ZXJ5XCIgfHwgcHJvcCA9PT0gXCJzb21lXCIpIHtcbiAgICAgICAgICByZXR1cm4gKGNiKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZTJbcHJvcF0oXG4gICAgICAgICAgICAgIChjaGlsZCwgLi4ub3RoZXIpID0+IGNiKGNoaWxkLnRvUHJveHkoKSwgLi4ub3RoZXIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcCA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICByZXR1cm4gKCkgPT4gbm9kZTIucm9vdCgpLnRvUHJveHkoKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wID09PSBcIm5vZGVzXCIpIHtcbiAgICAgICAgICByZXR1cm4gbm9kZTIubm9kZXMubWFwKChpKSA9PiBpLnRvUHJveHkoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcCA9PT0gXCJmaXJzdFwiIHx8IHByb3AgPT09IFwibGFzdFwiKSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGUyW3Byb3BdLnRvUHJveHkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbm9kZTJbcHJvcF07XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXQobm9kZTIsIHByb3AsIHZhbHVlKSB7XG4gICAgICAgIGlmIChub2RlMltwcm9wXSA9PT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgICAgICBub2RlMltwcm9wXSA9IHZhbHVlO1xuICAgICAgICBpZiAocHJvcCA9PT0gXCJuYW1lXCIgfHwgcHJvcCA9PT0gXCJwYXJhbXNcIiB8fCBwcm9wID09PSBcInNlbGVjdG9yXCIpIHtcbiAgICAgICAgICBub2RlMi5tYXJrRGlydHkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGluZGV4KGNoaWxkKSB7XG4gICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIGNoaWxkO1xuICAgIGlmIChjaGlsZC5wcm94eU9mKSBjaGlsZCA9IGNoaWxkLnByb3h5T2Y7XG4gICAgcmV0dXJuIHRoaXMucHJveHlPZi5ub2Rlcy5pbmRleE9mKGNoaWxkKTtcbiAgfVxuICBpbnNlcnRBZnRlcihleGlzdCwgYWRkKSB7XG4gICAgbGV0IGV4aXN0SW5kZXggPSB0aGlzLmluZGV4KGV4aXN0KTtcbiAgICBsZXQgbm9kZXMgPSB0aGlzLm5vcm1hbGl6ZShhZGQsIHRoaXMucHJveHlPZi5ub2Rlc1tleGlzdEluZGV4XSkucmV2ZXJzZSgpO1xuICAgIGV4aXN0SW5kZXggPSB0aGlzLmluZGV4KGV4aXN0KTtcbiAgICBmb3IgKGxldCBub2RlMiBvZiBub2RlcykgdGhpcy5wcm94eU9mLm5vZGVzLnNwbGljZShleGlzdEluZGV4ICsgMSwgMCwgbm9kZTIpO1xuICAgIGxldCBpbmRleDI7XG4gICAgZm9yIChsZXQgaWQgaW4gdGhpcy5pbmRleGVzKSB7XG4gICAgICBpbmRleDIgPSB0aGlzLmluZGV4ZXNbaWRdO1xuICAgICAgaWYgKGV4aXN0SW5kZXggPCBpbmRleDIpIHtcbiAgICAgICAgdGhpcy5pbmRleGVzW2lkXSA9IGluZGV4MiArIG5vZGVzLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBpbnNlcnRCZWZvcmUoZXhpc3QsIGFkZCkge1xuICAgIGxldCBleGlzdEluZGV4ID0gdGhpcy5pbmRleChleGlzdCk7XG4gICAgbGV0IHR5cGUgPSBleGlzdEluZGV4ID09PSAwID8gXCJwcmVwZW5kXCIgOiBmYWxzZTtcbiAgICBsZXQgbm9kZXMgPSB0aGlzLm5vcm1hbGl6ZShhZGQsIHRoaXMucHJveHlPZi5ub2Rlc1tleGlzdEluZGV4XSwgdHlwZSkucmV2ZXJzZSgpO1xuICAgIGV4aXN0SW5kZXggPSB0aGlzLmluZGV4KGV4aXN0KTtcbiAgICBmb3IgKGxldCBub2RlMiBvZiBub2RlcykgdGhpcy5wcm94eU9mLm5vZGVzLnNwbGljZShleGlzdEluZGV4LCAwLCBub2RlMik7XG4gICAgbGV0IGluZGV4MjtcbiAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmluZGV4ZXMpIHtcbiAgICAgIGluZGV4MiA9IHRoaXMuaW5kZXhlc1tpZF07XG4gICAgICBpZiAoZXhpc3RJbmRleCA8PSBpbmRleDIpIHtcbiAgICAgICAgdGhpcy5pbmRleGVzW2lkXSA9IGluZGV4MiArIG5vZGVzLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBub3JtYWxpemUobm9kZXMsIHNhbXBsZSkge1xuICAgIGlmICh0eXBlb2Ygbm9kZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG5vZGVzID0gY2xlYW5Tb3VyY2UocGFyc2UkNChub2Rlcykubm9kZXMpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG5vZGVzID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBub2RlcyA9IFtdO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShub2RlcykpIHtcbiAgICAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCk7XG4gICAgICBmb3IgKGxldCBpIG9mIG5vZGVzKSB7XG4gICAgICAgIGlmIChpLnBhcmVudCkgaS5wYXJlbnQucmVtb3ZlQ2hpbGQoaSwgXCJpZ25vcmVcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChub2Rlcy50eXBlID09PSBcInJvb3RcIiAmJiB0aGlzLnR5cGUgIT09IFwiZG9jdW1lbnRcIikge1xuICAgICAgbm9kZXMgPSBub2Rlcy5ub2Rlcy5zbGljZSgwKTtcbiAgICAgIGZvciAobGV0IGkgb2Ygbm9kZXMpIHtcbiAgICAgICAgaWYgKGkucGFyZW50KSBpLnBhcmVudC5yZW1vdmVDaGlsZChpLCBcImlnbm9yZVwiKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5vZGVzLnR5cGUpIHtcbiAgICAgIG5vZGVzID0gW25vZGVzXTtcbiAgICB9IGVsc2UgaWYgKG5vZGVzLnByb3ApIHtcbiAgICAgIGlmICh0eXBlb2Ygbm9kZXMudmFsdWUgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVmFsdWUgZmllbGQgaXMgbWlzc2VkIGluIG5vZGUgY3JlYXRpb25cIik7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBub2Rlcy52YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICBub2Rlcy52YWx1ZSA9IFN0cmluZyhub2Rlcy52YWx1ZSk7XG4gICAgICB9XG4gICAgICBub2RlcyA9IFtuZXcgRGVjbGFyYXRpb24kMyhub2RlcyldO1xuICAgIH0gZWxzZSBpZiAobm9kZXMuc2VsZWN0b3IpIHtcbiAgICAgIG5vZGVzID0gW25ldyBSdWxlJDQobm9kZXMpXTtcbiAgICB9IGVsc2UgaWYgKG5vZGVzLm5hbWUpIHtcbiAgICAgIG5vZGVzID0gW25ldyBBdFJ1bGUkNChub2RlcyldO1xuICAgIH0gZWxzZSBpZiAobm9kZXMudGV4dCkge1xuICAgICAgbm9kZXMgPSBbbmV3IENvbW1lbnQkMyhub2RlcyldO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIG5vZGUgdHlwZSBpbiBub2RlIGNyZWF0aW9uXCIpO1xuICAgIH1cbiAgICBsZXQgcHJvY2Vzc2VkID0gbm9kZXMubWFwKChpKSA9PiB7XG4gICAgICBpZiAoIWlbbXkkMV0pIENvbnRhaW5lci5yZWJ1aWxkKGkpO1xuICAgICAgaSA9IGkucHJveHlPZjtcbiAgICAgIGlmIChpLnBhcmVudCkgaS5wYXJlbnQucmVtb3ZlQ2hpbGQoaSk7XG4gICAgICBpZiAoaVtpc0NsZWFuJDFdKSBtYXJrRGlydHlVcChpKTtcbiAgICAgIGlmICh0eXBlb2YgaS5yYXdzLmJlZm9yZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAoc2FtcGxlICYmIHR5cGVvZiBzYW1wbGUucmF3cy5iZWZvcmUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpLnJhd3MuYmVmb3JlID0gc2FtcGxlLnJhd3MuYmVmb3JlLnJlcGxhY2UoL1xcUy9nLCBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaS5wYXJlbnQgPSB0aGlzLnByb3h5T2Y7XG4gICAgICByZXR1cm4gaTtcbiAgICB9KTtcbiAgICByZXR1cm4gcHJvY2Vzc2VkO1xuICB9XG4gIHByZXBlbmQoLi4uY2hpbGRyZW4pIHtcbiAgICBjaGlsZHJlbiA9IGNoaWxkcmVuLnJldmVyc2UoKTtcbiAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgbGV0IG5vZGVzID0gdGhpcy5ub3JtYWxpemUoY2hpbGQsIHRoaXMuZmlyc3QsIFwicHJlcGVuZFwiKS5yZXZlcnNlKCk7XG4gICAgICBmb3IgKGxldCBub2RlMiBvZiBub2RlcykgdGhpcy5wcm94eU9mLm5vZGVzLnVuc2hpZnQobm9kZTIpO1xuICAgICAgZm9yIChsZXQgaWQgaW4gdGhpcy5pbmRleGVzKSB7XG4gICAgICAgIHRoaXMuaW5kZXhlc1tpZF0gPSB0aGlzLmluZGV4ZXNbaWRdICsgbm9kZXMubGVuZ3RoO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHB1c2goY2hpbGQpIHtcbiAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuICAgIHRoaXMucHJveHlPZi5ub2Rlcy5wdXNoKGNoaWxkKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZW1vdmVBbGwoKSB7XG4gICAgZm9yIChsZXQgbm9kZTIgb2YgdGhpcy5wcm94eU9mLm5vZGVzKSBub2RlMi5wYXJlbnQgPSB2b2lkIDA7XG4gICAgdGhpcy5wcm94eU9mLm5vZGVzID0gW107XG4gICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZW1vdmVDaGlsZChjaGlsZCkge1xuICAgIGNoaWxkID0gdGhpcy5pbmRleChjaGlsZCk7XG4gICAgdGhpcy5wcm94eU9mLm5vZGVzW2NoaWxkXS5wYXJlbnQgPSB2b2lkIDA7XG4gICAgdGhpcy5wcm94eU9mLm5vZGVzLnNwbGljZShjaGlsZCwgMSk7XG4gICAgbGV0IGluZGV4MjtcbiAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmluZGV4ZXMpIHtcbiAgICAgIGluZGV4MiA9IHRoaXMuaW5kZXhlc1tpZF07XG4gICAgICBpZiAoaW5kZXgyID49IGNoaWxkKSB7XG4gICAgICAgIHRoaXMuaW5kZXhlc1tpZF0gPSBpbmRleDIgLSAxO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHJlcGxhY2VWYWx1ZXMocGF0dGVybiwgb3B0cywgY2FsbGJhY2spIHtcbiAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IG9wdHM7XG4gICAgICBvcHRzID0ge307XG4gICAgfVxuICAgIHRoaXMud2Fsa0RlY2xzKChkZWNsKSA9PiB7XG4gICAgICBpZiAob3B0cy5wcm9wcyAmJiAhb3B0cy5wcm9wcy5pbmNsdWRlcyhkZWNsLnByb3ApKSByZXR1cm47XG4gICAgICBpZiAob3B0cy5mYXN0ICYmICFkZWNsLnZhbHVlLmluY2x1ZGVzKG9wdHMuZmFzdCkpIHJldHVybjtcbiAgICAgIGRlY2wudmFsdWUgPSBkZWNsLnZhbHVlLnJlcGxhY2UocGF0dGVybiwgY2FsbGJhY2spO1xuICAgIH0pO1xuICAgIHRoaXMubWFya0RpcnR5KCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgc29tZShjb25kaXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5ub2Rlcy5zb21lKGNvbmRpdGlvbik7XG4gIH1cbiAgd2FsayhjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVhY2goKGNoaWxkLCBpKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0MjtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdDIgPSBjYWxsYmFjayhjaGlsZCwgaSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IGNoaWxkLmFkZFRvRXJyb3IoZSk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0MiAhPT0gZmFsc2UgJiYgY2hpbGQud2Fsaykge1xuICAgICAgICByZXN1bHQyID0gY2hpbGQud2FsayhjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0MjtcbiAgICB9KTtcbiAgfVxuICB3YWxrQXRSdWxlcyhuYW1lLCBjYWxsYmFjaykge1xuICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gbmFtZTtcbiAgICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZC50eXBlID09PSBcImF0cnVsZVwiKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChuYW1lIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gXCJhdHJ1bGVcIiAmJiBuYW1lLnRlc3QoY2hpbGQubmFtZSkpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soY2hpbGQsIGkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgIGlmIChjaGlsZC50eXBlID09PSBcImF0cnVsZVwiICYmIGNoaWxkLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICB3YWxrQ29tbWVudHMoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgaWYgKGNoaWxkLnR5cGUgPT09IFwiY29tbWVudFwiKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgd2Fsa0RlY2xzKHByb3AsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sgPSBwcm9wO1xuICAgICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09IFwiZGVjbFwiKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChwcm9wIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gXCJkZWNsXCIgJiYgcHJvcC50ZXN0KGNoaWxkLnByb3ApKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICBpZiAoY2hpbGQudHlwZSA9PT0gXCJkZWNsXCIgJiYgY2hpbGQucHJvcCA9PT0gcHJvcCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soY2hpbGQsIGkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHdhbGtSdWxlcyhzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IHNlbGVjdG9yO1xuICAgICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09IFwicnVsZVwiKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09IFwicnVsZVwiICYmIHNlbGVjdG9yLnRlc3QoY2hpbGQuc2VsZWN0b3IpKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICBpZiAoY2hpbGQudHlwZSA9PT0gXCJydWxlXCIgJiYgY2hpbGQuc2VsZWN0b3IgPT09IHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZ2V0IGZpcnN0KCkge1xuICAgIGlmICghdGhpcy5wcm94eU9mLm5vZGVzKSByZXR1cm4gdm9pZCAwO1xuICAgIHJldHVybiB0aGlzLnByb3h5T2Yubm9kZXNbMF07XG4gIH1cbiAgZ2V0IGxhc3QoKSB7XG4gICAgaWYgKCF0aGlzLnByb3h5T2Yubm9kZXMpIHJldHVybiB2b2lkIDA7XG4gICAgcmV0dXJuIHRoaXMucHJveHlPZi5ub2Rlc1t0aGlzLnByb3h5T2Yubm9kZXMubGVuZ3RoIC0gMV07XG4gIH1cbn07XG5Db250YWluZXIkNy5yZWdpc3RlclBhcnNlID0gKGRlcGVuZGFudCkgPT4ge1xuICBwYXJzZSQ0ID0gZGVwZW5kYW50O1xufTtcbkNvbnRhaW5lciQ3LnJlZ2lzdGVyUnVsZSA9IChkZXBlbmRhbnQpID0+IHtcbiAgUnVsZSQ0ID0gZGVwZW5kYW50O1xufTtcbkNvbnRhaW5lciQ3LnJlZ2lzdGVyQXRSdWxlID0gKGRlcGVuZGFudCkgPT4ge1xuICBBdFJ1bGUkNCA9IGRlcGVuZGFudDtcbn07XG5Db250YWluZXIkNy5yZWdpc3RlclJvb3QgPSAoZGVwZW5kYW50KSA9PiB7XG4gIFJvb3QkNiA9IGRlcGVuZGFudDtcbn07XG52YXIgY29udGFpbmVyID0gQ29udGFpbmVyJDc7XG5Db250YWluZXIkNy5kZWZhdWx0ID0gQ29udGFpbmVyJDc7XG5Db250YWluZXIkNy5yZWJ1aWxkID0gKG5vZGUyKSA9PiB7XG4gIGlmIChub2RlMi50eXBlID09PSBcImF0cnVsZVwiKSB7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKG5vZGUyLCBBdFJ1bGUkNC5wcm90b3R5cGUpO1xuICB9IGVsc2UgaWYgKG5vZGUyLnR5cGUgPT09IFwicnVsZVwiKSB7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKG5vZGUyLCBSdWxlJDQucHJvdG90eXBlKTtcbiAgfSBlbHNlIGlmIChub2RlMi50eXBlID09PSBcImRlY2xcIikge1xuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihub2RlMiwgRGVjbGFyYXRpb24kMy5wcm90b3R5cGUpO1xuICB9IGVsc2UgaWYgKG5vZGUyLnR5cGUgPT09IFwiY29tbWVudFwiKSB7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKG5vZGUyLCBDb21tZW50JDMucHJvdG90eXBlKTtcbiAgfSBlbHNlIGlmIChub2RlMi50eXBlID09PSBcInJvb3RcIikge1xuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihub2RlMiwgUm9vdCQ2LnByb3RvdHlwZSk7XG4gIH1cbiAgbm9kZTJbbXkkMV0gPSB0cnVlO1xuICBpZiAobm9kZTIubm9kZXMpIHtcbiAgICBub2RlMi5ub2Rlcy5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgQ29udGFpbmVyJDcucmVidWlsZChjaGlsZCk7XG4gICAgfSk7XG4gIH1cbn07XG5sZXQgQ29udGFpbmVyJDYgPSBjb250YWluZXI7XG5sZXQgTGF6eVJlc3VsdCQ0O1xubGV0IFByb2Nlc3NvciQzO1xubGV0IERvY3VtZW50JDMgPSBjbGFzcyBEb2N1bWVudCBleHRlbmRzIENvbnRhaW5lciQ2IHtcbiAgY29uc3RydWN0b3IoZGVmYXVsdHMpIHtcbiAgICBzdXBlcihfX3NwcmVhZFZhbHVlcyh7IHR5cGU6IFwiZG9jdW1lbnRcIiB9LCBkZWZhdWx0cykpO1xuICAgIGlmICghdGhpcy5ub2Rlcykge1xuICAgICAgdGhpcy5ub2RlcyA9IFtdO1xuICAgIH1cbiAgfVxuICB0b1Jlc3VsdChvcHRzID0ge30pIHtcbiAgICBsZXQgbGF6eSA9IG5ldyBMYXp5UmVzdWx0JDQobmV3IFByb2Nlc3NvciQzKCksIHRoaXMsIG9wdHMpO1xuICAgIHJldHVybiBsYXp5LnN0cmluZ2lmeSgpO1xuICB9XG59O1xuRG9jdW1lbnQkMy5yZWdpc3RlckxhenlSZXN1bHQgPSAoZGVwZW5kYW50KSA9PiB7XG4gIExhenlSZXN1bHQkNCA9IGRlcGVuZGFudDtcbn07XG5Eb2N1bWVudCQzLnJlZ2lzdGVyUHJvY2Vzc29yID0gKGRlcGVuZGFudCkgPT4ge1xuICBQcm9jZXNzb3IkMyA9IGRlcGVuZGFudDtcbn07XG52YXIgZG9jdW1lbnQkMSA9IERvY3VtZW50JDM7XG5Eb2N1bWVudCQzLmRlZmF1bHQgPSBEb2N1bWVudCQzO1xubGV0IHByaW50ZWQgPSB7fTtcbnZhciB3YXJuT25jZSQyID0gZnVuY3Rpb24gd2Fybk9uY2UobWVzc2FnZSkge1xuICBpZiAocHJpbnRlZFttZXNzYWdlXSkgcmV0dXJuO1xuICBwcmludGVkW21lc3NhZ2VdID0gdHJ1ZTtcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUud2Fybikge1xuICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgfVxufTtcbmxldCBXYXJuaW5nJDIgPSBjbGFzcyBXYXJuaW5nIHtcbiAgY29uc3RydWN0b3IodGV4dCwgb3B0cyA9IHt9KSB7XG4gICAgdGhpcy50eXBlID0gXCJ3YXJuaW5nXCI7XG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICBpZiAob3B0cy5ub2RlICYmIG9wdHMubm9kZS5zb3VyY2UpIHtcbiAgICAgIGxldCByYW5nZSA9IG9wdHMubm9kZS5yYW5nZUJ5KG9wdHMpO1xuICAgICAgdGhpcy5saW5lID0gcmFuZ2Uuc3RhcnQubGluZTtcbiAgICAgIHRoaXMuY29sdW1uID0gcmFuZ2Uuc3RhcnQuY29sdW1uO1xuICAgICAgdGhpcy5lbmRMaW5lID0gcmFuZ2UuZW5kLmxpbmU7XG4gICAgICB0aGlzLmVuZENvbHVtbiA9IHJhbmdlLmVuZC5jb2x1bW47XG4gICAgfVxuICAgIGZvciAobGV0IG9wdCBpbiBvcHRzKSB0aGlzW29wdF0gPSBvcHRzW29wdF07XG4gIH1cbiAgdG9TdHJpbmcoKSB7XG4gICAgaWYgKHRoaXMubm9kZSkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS5lcnJvcih0aGlzLnRleHQsIHtcbiAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXG4gICAgICAgIHBsdWdpbjogdGhpcy5wbHVnaW4sXG4gICAgICAgIHdvcmQ6IHRoaXMud29yZFxuICAgICAgfSkubWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGx1Z2luKSB7XG4gICAgICByZXR1cm4gdGhpcy5wbHVnaW4gKyBcIjogXCIgKyB0aGlzLnRleHQ7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnRleHQ7XG4gIH1cbn07XG52YXIgd2FybmluZyA9IFdhcm5pbmckMjtcbldhcm5pbmckMi5kZWZhdWx0ID0gV2FybmluZyQyO1xubGV0IFdhcm5pbmckMSA9IHdhcm5pbmc7XG5sZXQgUmVzdWx0JDMgPSBjbGFzcyBSZXN1bHQge1xuICBjb25zdHJ1Y3Rvcihwcm9jZXNzb3IyLCByb290Miwgb3B0cykge1xuICAgIHRoaXMucHJvY2Vzc29yID0gcHJvY2Vzc29yMjtcbiAgICB0aGlzLm1lc3NhZ2VzID0gW107XG4gICAgdGhpcy5yb290ID0gcm9vdDI7XG4gICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICB0aGlzLmNzcyA9IHZvaWQgMDtcbiAgICB0aGlzLm1hcCA9IHZvaWQgMDtcbiAgfVxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5jc3M7XG4gIH1cbiAgd2Fybih0ZXh0LCBvcHRzID0ge30pIHtcbiAgICBpZiAoIW9wdHMucGx1Z2luKSB7XG4gICAgICBpZiAodGhpcy5sYXN0UGx1Z2luICYmIHRoaXMubGFzdFBsdWdpbi5wb3N0Y3NzUGx1Z2luKSB7XG4gICAgICAgIG9wdHMucGx1Z2luID0gdGhpcy5sYXN0UGx1Z2luLnBvc3Rjc3NQbHVnaW47XG4gICAgICB9XG4gICAgfVxuICAgIGxldCB3YXJuaW5nMiA9IG5ldyBXYXJuaW5nJDEodGV4dCwgb3B0cyk7XG4gICAgdGhpcy5tZXNzYWdlcy5wdXNoKHdhcm5pbmcyKTtcbiAgICByZXR1cm4gd2FybmluZzI7XG4gIH1cbiAgd2FybmluZ3MoKSB7XG4gICAgcmV0dXJuIHRoaXMubWVzc2FnZXMuZmlsdGVyKChpKSA9PiBpLnR5cGUgPT09IFwid2FybmluZ1wiKTtcbiAgfVxuICBnZXQgY29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5jc3M7XG4gIH1cbn07XG52YXIgcmVzdWx0ID0gUmVzdWx0JDM7XG5SZXN1bHQkMy5kZWZhdWx0ID0gUmVzdWx0JDM7XG5jb25zdCBTSU5HTEVfUVVPVEUgPSBcIidcIi5jaGFyQ29kZUF0KDApO1xuY29uc3QgRE9VQkxFX1FVT1RFID0gJ1wiJy5jaGFyQ29kZUF0KDApO1xuY29uc3QgQkFDS1NMQVNIID0gXCJcXFxcXCIuY2hhckNvZGVBdCgwKTtcbmNvbnN0IFNMQVNIID0gXCIvXCIuY2hhckNvZGVBdCgwKTtcbmNvbnN0IE5FV0xJTkUgPSBcIlxcblwiLmNoYXJDb2RlQXQoMCk7XG5jb25zdCBTUEFDRSA9IFwiIFwiLmNoYXJDb2RlQXQoMCk7XG5jb25zdCBGRUVEID0gXCJcXGZcIi5jaGFyQ29kZUF0KDApO1xuY29uc3QgVEFCID0gXCJcdFwiLmNoYXJDb2RlQXQoMCk7XG5jb25zdCBDUiA9IFwiXFxyXCIuY2hhckNvZGVBdCgwKTtcbmNvbnN0IE9QRU5fU1FVQVJFID0gXCJbXCIuY2hhckNvZGVBdCgwKTtcbmNvbnN0IENMT1NFX1NRVUFSRSA9IFwiXVwiLmNoYXJDb2RlQXQoMCk7XG5jb25zdCBPUEVOX1BBUkVOVEhFU0VTID0gXCIoXCIuY2hhckNvZGVBdCgwKTtcbmNvbnN0IENMT1NFX1BBUkVOVEhFU0VTID0gXCIpXCIuY2hhckNvZGVBdCgwKTtcbmNvbnN0IE9QRU5fQ1VSTFkgPSBcIntcIi5jaGFyQ29kZUF0KDApO1xuY29uc3QgQ0xPU0VfQ1VSTFkgPSBcIn1cIi5jaGFyQ29kZUF0KDApO1xuY29uc3QgU0VNSUNPTE9OID0gXCI7XCIuY2hhckNvZGVBdCgwKTtcbmNvbnN0IEFTVEVSSVNLID0gXCIqXCIuY2hhckNvZGVBdCgwKTtcbmNvbnN0IENPTE9OID0gXCI6XCIuY2hhckNvZGVBdCgwKTtcbmNvbnN0IEFUID0gXCJAXCIuY2hhckNvZGVBdCgwKTtcbmNvbnN0IFJFX0FUX0VORCA9IC9bXFx0XFxuXFxmXFxyIFwiIycoKS87W1xcXFxcXF17fV0vZztcbmNvbnN0IFJFX1dPUkRfRU5EID0gL1tcXHRcXG5cXGZcXHIgIVwiIycoKTo7QFtcXFxcXFxde31dfFxcLyg/PVxcKikvZztcbmNvbnN0IFJFX0JBRF9CUkFDS0VUID0gLy5bXFxyXFxuXCInKC9cXFxcXS87XG5jb25zdCBSRV9IRVhfRVNDQVBFID0gL1tcXGRhLWZdL2k7XG52YXIgdG9rZW5pemUgPSBmdW5jdGlvbiB0b2tlbml6ZXIoaW5wdXQyLCBvcHRpb25zID0ge30pIHtcbiAgbGV0IGNzcyA9IGlucHV0Mi5jc3MudmFsdWVPZigpO1xuICBsZXQgaWdub3JlID0gb3B0aW9ucy5pZ25vcmVFcnJvcnM7XG4gIGxldCBjb2RlLCBuZXh0LCBxdW90ZSwgY29udGVudCwgZXNjYXBlO1xuICBsZXQgZXNjYXBlZCwgZXNjYXBlUG9zLCBwcmV2LCBuLCBjdXJyZW50VG9rZW47XG4gIGxldCBsZW5ndGggPSBjc3MubGVuZ3RoO1xuICBsZXQgcG9zID0gMDtcbiAgbGV0IGJ1ZmZlciA9IFtdO1xuICBsZXQgcmV0dXJuZWQgPSBbXTtcbiAgZnVuY3Rpb24gcG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHBvcztcbiAgfVxuICBmdW5jdGlvbiB1bmNsb3NlZCh3aGF0KSB7XG4gICAgdGhyb3cgaW5wdXQyLmVycm9yKFwiVW5jbG9zZWQgXCIgKyB3aGF0LCBwb3MpO1xuICB9XG4gIGZ1bmN0aW9uIGVuZE9mRmlsZSgpIHtcbiAgICByZXR1cm4gcmV0dXJuZWQubGVuZ3RoID09PSAwICYmIHBvcyA+PSBsZW5ndGg7XG4gIH1cbiAgZnVuY3Rpb24gbmV4dFRva2VuKG9wdHMpIHtcbiAgICBpZiAocmV0dXJuZWQubGVuZ3RoKSByZXR1cm4gcmV0dXJuZWQucG9wKCk7XG4gICAgaWYgKHBvcyA+PSBsZW5ndGgpIHJldHVybjtcbiAgICBsZXQgaWdub3JlVW5jbG9zZWQgPSBvcHRzID8gb3B0cy5pZ25vcmVVbmNsb3NlZCA6IGZhbHNlO1xuICAgIGNvZGUgPSBjc3MuY2hhckNvZGVBdChwb3MpO1xuICAgIHN3aXRjaCAoY29kZSkge1xuICAgICAgY2FzZSBORVdMSU5FOlxuICAgICAgY2FzZSBTUEFDRTpcbiAgICAgIGNhc2UgVEFCOlxuICAgICAgY2FzZSBDUjpcbiAgICAgIGNhc2UgRkVFRDoge1xuICAgICAgICBuZXh0ID0gcG9zO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgbmV4dCArPSAxO1xuICAgICAgICAgIGNvZGUgPSBjc3MuY2hhckNvZGVBdChuZXh0KTtcbiAgICAgICAgfSB3aGlsZSAoY29kZSA9PT0gU1BBQ0UgfHwgY29kZSA9PT0gTkVXTElORSB8fCBjb2RlID09PSBUQUIgfHwgY29kZSA9PT0gQ1IgfHwgY29kZSA9PT0gRkVFRCk7XG4gICAgICAgIGN1cnJlbnRUb2tlbiA9IFtcInNwYWNlXCIsIGNzcy5zbGljZShwb3MsIG5leHQpXTtcbiAgICAgICAgcG9zID0gbmV4dCAtIDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBPUEVOX1NRVUFSRTpcbiAgICAgIGNhc2UgQ0xPU0VfU1FVQVJFOlxuICAgICAgY2FzZSBPUEVOX0NVUkxZOlxuICAgICAgY2FzZSBDTE9TRV9DVVJMWTpcbiAgICAgIGNhc2UgQ09MT046XG4gICAgICBjYXNlIFNFTUlDT0xPTjpcbiAgICAgIGNhc2UgQ0xPU0VfUEFSRU5USEVTRVM6IHtcbiAgICAgICAgbGV0IGNvbnRyb2xDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgICAgICAgY3VycmVudFRva2VuID0gW2NvbnRyb2xDaGFyLCBjb250cm9sQ2hhciwgcG9zXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIE9QRU5fUEFSRU5USEVTRVM6IHtcbiAgICAgICAgcHJldiA9IGJ1ZmZlci5sZW5ndGggPyBidWZmZXIucG9wKClbMV0gOiBcIlwiO1xuICAgICAgICBuID0gY3NzLmNoYXJDb2RlQXQocG9zICsgMSk7XG4gICAgICAgIGlmIChwcmV2ID09PSBcInVybFwiICYmIG4gIT09IFNJTkdMRV9RVU9URSAmJiBuICE9PSBET1VCTEVfUVVPVEUgJiYgbiAhPT0gU1BBQ0UgJiYgbiAhPT0gTkVXTElORSAmJiBuICE9PSBUQUIgJiYgbiAhPT0gRkVFRCAmJiBuICE9PSBDUikge1xuICAgICAgICAgIG5leHQgPSBwb3M7XG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgZXNjYXBlZCA9IGZhbHNlO1xuICAgICAgICAgICAgbmV4dCA9IGNzcy5pbmRleE9mKFwiKVwiLCBuZXh0ICsgMSk7XG4gICAgICAgICAgICBpZiAobmV4dCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgaWYgKGlnbm9yZSB8fCBpZ25vcmVVbmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIG5leHQgPSBwb3M7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdW5jbG9zZWQoXCJicmFja2V0XCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlc2NhcGVQb3MgPSBuZXh0O1xuICAgICAgICAgICAgd2hpbGUgKGNzcy5jaGFyQ29kZUF0KGVzY2FwZVBvcyAtIDEpID09PSBCQUNLU0xBU0gpIHtcbiAgICAgICAgICAgICAgZXNjYXBlUG9zIC09IDE7XG4gICAgICAgICAgICAgIGVzY2FwZWQgPSAhZXNjYXBlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IHdoaWxlIChlc2NhcGVkKTtcbiAgICAgICAgICBjdXJyZW50VG9rZW4gPSBbXCJicmFja2V0c1wiLCBjc3Muc2xpY2UocG9zLCBuZXh0ICsgMSksIHBvcywgbmV4dF07XG4gICAgICAgICAgcG9zID0gbmV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0ID0gY3NzLmluZGV4T2YoXCIpXCIsIHBvcyArIDEpO1xuICAgICAgICAgIGNvbnRlbnQgPSBjc3Muc2xpY2UocG9zLCBuZXh0ICsgMSk7XG4gICAgICAgICAgaWYgKG5leHQgPT09IC0xIHx8IFJFX0JBRF9CUkFDS0VULnRlc3QoY29udGVudCkpIHtcbiAgICAgICAgICAgIGN1cnJlbnRUb2tlbiA9IFtcIihcIiwgXCIoXCIsIHBvc107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRUb2tlbiA9IFtcImJyYWNrZXRzXCIsIGNvbnRlbnQsIHBvcywgbmV4dF07XG4gICAgICAgICAgICBwb3MgPSBuZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgU0lOR0xFX1FVT1RFOlxuICAgICAgY2FzZSBET1VCTEVfUVVPVEU6IHtcbiAgICAgICAgcXVvdGUgPSBjb2RlID09PSBTSU5HTEVfUVVPVEUgPyBcIidcIiA6ICdcIic7XG4gICAgICAgIG5leHQgPSBwb3M7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICBlc2NhcGVkID0gZmFsc2U7XG4gICAgICAgICAgbmV4dCA9IGNzcy5pbmRleE9mKHF1b3RlLCBuZXh0ICsgMSk7XG4gICAgICAgICAgaWYgKG5leHQgPT09IC0xKSB7XG4gICAgICAgICAgICBpZiAoaWdub3JlIHx8IGlnbm9yZVVuY2xvc2VkKSB7XG4gICAgICAgICAgICAgIG5leHQgPSBwb3MgKyAxO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHVuY2xvc2VkKFwic3RyaW5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlc2NhcGVQb3MgPSBuZXh0O1xuICAgICAgICAgIHdoaWxlIChjc3MuY2hhckNvZGVBdChlc2NhcGVQb3MgLSAxKSA9PT0gQkFDS1NMQVNIKSB7XG4gICAgICAgICAgICBlc2NhcGVQb3MgLT0gMTtcbiAgICAgICAgICAgIGVzY2FwZWQgPSAhZXNjYXBlZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKGVzY2FwZWQpO1xuICAgICAgICBjdXJyZW50VG9rZW4gPSBbXCJzdHJpbmdcIiwgY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpLCBwb3MsIG5leHRdO1xuICAgICAgICBwb3MgPSBuZXh0O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQVQ6IHtcbiAgICAgICAgUkVfQVRfRU5ELmxhc3RJbmRleCA9IHBvcyArIDE7XG4gICAgICAgIFJFX0FUX0VORC50ZXN0KGNzcyk7XG4gICAgICAgIGlmIChSRV9BVF9FTkQubGFzdEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgbmV4dCA9IGNzcy5sZW5ndGggLSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5leHQgPSBSRV9BVF9FTkQubGFzdEluZGV4IC0gMjtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50VG9rZW4gPSBbXCJhdC13b3JkXCIsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSwgcG9zLCBuZXh0XTtcbiAgICAgICAgcG9zID0gbmV4dDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIEJBQ0tTTEFTSDoge1xuICAgICAgICBuZXh0ID0gcG9zO1xuICAgICAgICBlc2NhcGUgPSB0cnVlO1xuICAgICAgICB3aGlsZSAoY3NzLmNoYXJDb2RlQXQobmV4dCArIDEpID09PSBCQUNLU0xBU0gpIHtcbiAgICAgICAgICBuZXh0ICs9IDE7XG4gICAgICAgICAgZXNjYXBlID0gIWVzY2FwZTtcbiAgICAgICAgfVxuICAgICAgICBjb2RlID0gY3NzLmNoYXJDb2RlQXQobmV4dCArIDEpO1xuICAgICAgICBpZiAoZXNjYXBlICYmIGNvZGUgIT09IFNMQVNIICYmIGNvZGUgIT09IFNQQUNFICYmIGNvZGUgIT09IE5FV0xJTkUgJiYgY29kZSAhPT0gVEFCICYmIGNvZGUgIT09IENSICYmIGNvZGUgIT09IEZFRUQpIHtcbiAgICAgICAgICBuZXh0ICs9IDE7XG4gICAgICAgICAgaWYgKFJFX0hFWF9FU0NBUEUudGVzdChjc3MuY2hhckF0KG5leHQpKSkge1xuICAgICAgICAgICAgd2hpbGUgKFJFX0hFWF9FU0NBUEUudGVzdChjc3MuY2hhckF0KG5leHQgKyAxKSkpIHtcbiAgICAgICAgICAgICAgbmV4dCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNzcy5jaGFyQ29kZUF0KG5leHQgKyAxKSA9PT0gU1BBQ0UpIHtcbiAgICAgICAgICAgICAgbmV4dCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50VG9rZW4gPSBbXCJ3b3JkXCIsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSwgcG9zLCBuZXh0XTtcbiAgICAgICAgcG9zID0gbmV4dDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGlmIChjb2RlID09PSBTTEFTSCAmJiBjc3MuY2hhckNvZGVBdChwb3MgKyAxKSA9PT0gQVNURVJJU0spIHtcbiAgICAgICAgICBuZXh0ID0gY3NzLmluZGV4T2YoXCIqL1wiLCBwb3MgKyAyKSArIDE7XG4gICAgICAgICAgaWYgKG5leHQgPT09IDApIHtcbiAgICAgICAgICAgIGlmIChpZ25vcmUgfHwgaWdub3JlVW5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgbmV4dCA9IGNzcy5sZW5ndGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB1bmNsb3NlZChcImNvbW1lbnRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnRUb2tlbiA9IFtcImNvbW1lbnRcIiwgY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpLCBwb3MsIG5leHRdO1xuICAgICAgICAgIHBvcyA9IG5leHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgUkVfV09SRF9FTkQubGFzdEluZGV4ID0gcG9zICsgMTtcbiAgICAgICAgICBSRV9XT1JEX0VORC50ZXN0KGNzcyk7XG4gICAgICAgICAgaWYgKFJFX1dPUkRfRU5ELmxhc3RJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgbmV4dCA9IGNzcy5sZW5ndGggLSAxO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0ID0gUkVfV09SRF9FTkQubGFzdEluZGV4IC0gMjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudFRva2VuID0gW1wid29yZFwiLCBjc3Muc2xpY2UocG9zLCBuZXh0ICsgMSksIHBvcywgbmV4dF07XG4gICAgICAgICAgYnVmZmVyLnB1c2goY3VycmVudFRva2VuKTtcbiAgICAgICAgICBwb3MgPSBuZXh0O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBwb3MrKztcbiAgICByZXR1cm4gY3VycmVudFRva2VuO1xuICB9XG4gIGZ1bmN0aW9uIGJhY2sodG9rZW4pIHtcbiAgICByZXR1cm5lZC5wdXNoKHRva2VuKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGJhY2ssXG4gICAgZW5kT2ZGaWxlLFxuICAgIG5leHRUb2tlbixcbiAgICBwb3NpdGlvblxuICB9O1xufTtcbmxldCBDb250YWluZXIkNSA9IGNvbnRhaW5lcjtcbmxldCBBdFJ1bGUkMyA9IGNsYXNzIEF0UnVsZSBleHRlbmRzIENvbnRhaW5lciQ1IHtcbiAgY29uc3RydWN0b3IoZGVmYXVsdHMpIHtcbiAgICBzdXBlcihkZWZhdWx0cyk7XG4gICAgdGhpcy50eXBlID0gXCJhdHJ1bGVcIjtcbiAgfVxuICBhcHBlbmQoLi4uY2hpbGRyZW4pIHtcbiAgICBpZiAoIXRoaXMucHJveHlPZi5ub2RlcykgdGhpcy5ub2RlcyA9IFtdO1xuICAgIHJldHVybiBzdXBlci5hcHBlbmQoLi4uY2hpbGRyZW4pO1xuICB9XG4gIHByZXBlbmQoLi4uY2hpbGRyZW4pIHtcbiAgICBpZiAoIXRoaXMucHJveHlPZi5ub2RlcykgdGhpcy5ub2RlcyA9IFtdO1xuICAgIHJldHVybiBzdXBlci5wcmVwZW5kKC4uLmNoaWxkcmVuKTtcbiAgfVxufTtcbnZhciBhdFJ1bGUgPSBBdFJ1bGUkMztcbkF0UnVsZSQzLmRlZmF1bHQgPSBBdFJ1bGUkMztcbkNvbnRhaW5lciQ1LnJlZ2lzdGVyQXRSdWxlKEF0UnVsZSQzKTtcbmxldCBDb250YWluZXIkNCA9IGNvbnRhaW5lcjtcbmxldCBMYXp5UmVzdWx0JDM7XG5sZXQgUHJvY2Vzc29yJDI7XG5sZXQgUm9vdCQ1ID0gY2xhc3MgUm9vdCBleHRlbmRzIENvbnRhaW5lciQ0IHtcbiAgY29uc3RydWN0b3IoZGVmYXVsdHMpIHtcbiAgICBzdXBlcihkZWZhdWx0cyk7XG4gICAgdGhpcy50eXBlID0gXCJyb290XCI7XG4gICAgaWYgKCF0aGlzLm5vZGVzKSB0aGlzLm5vZGVzID0gW107XG4gIH1cbiAgbm9ybWFsaXplKGNoaWxkLCBzYW1wbGUsIHR5cGUpIHtcbiAgICBsZXQgbm9kZXMgPSBzdXBlci5ub3JtYWxpemUoY2hpbGQpO1xuICAgIGlmIChzYW1wbGUpIHtcbiAgICAgIGlmICh0eXBlID09PSBcInByZXBlbmRcIikge1xuICAgICAgICBpZiAodGhpcy5ub2Rlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgc2FtcGxlLnJhd3MuYmVmb3JlID0gdGhpcy5ub2Rlc1sxXS5yYXdzLmJlZm9yZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgc2FtcGxlLnJhd3MuYmVmb3JlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZmlyc3QgIT09IHNhbXBsZSkge1xuICAgICAgICBmb3IgKGxldCBub2RlMiBvZiBub2Rlcykge1xuICAgICAgICAgIG5vZGUyLnJhd3MuYmVmb3JlID0gc2FtcGxlLnJhd3MuYmVmb3JlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlcztcbiAgfVxuICByZW1vdmVDaGlsZChjaGlsZCwgaWdub3JlKSB7XG4gICAgbGV0IGluZGV4MiA9IHRoaXMuaW5kZXgoY2hpbGQpO1xuICAgIGlmICghaWdub3JlICYmIGluZGV4MiA9PT0gMCAmJiB0aGlzLm5vZGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMubm9kZXNbMV0ucmF3cy5iZWZvcmUgPSB0aGlzLm5vZGVzW2luZGV4Ml0ucmF3cy5iZWZvcmU7XG4gICAgfVxuICAgIHJldHVybiBzdXBlci5yZW1vdmVDaGlsZChjaGlsZCk7XG4gIH1cbiAgdG9SZXN1bHQob3B0cyA9IHt9KSB7XG4gICAgbGV0IGxhenkgPSBuZXcgTGF6eVJlc3VsdCQzKG5ldyBQcm9jZXNzb3IkMigpLCB0aGlzLCBvcHRzKTtcbiAgICByZXR1cm4gbGF6eS5zdHJpbmdpZnkoKTtcbiAgfVxufTtcblJvb3QkNS5yZWdpc3RlckxhenlSZXN1bHQgPSAoZGVwZW5kYW50KSA9PiB7XG4gIExhenlSZXN1bHQkMyA9IGRlcGVuZGFudDtcbn07XG5Sb290JDUucmVnaXN0ZXJQcm9jZXNzb3IgPSAoZGVwZW5kYW50KSA9PiB7XG4gIFByb2Nlc3NvciQyID0gZGVwZW5kYW50O1xufTtcbnZhciByb290ID0gUm9vdCQ1O1xuUm9vdCQ1LmRlZmF1bHQgPSBSb290JDU7XG5Db250YWluZXIkNC5yZWdpc3RlclJvb3QoUm9vdCQ1KTtcbmxldCBsaXN0JDIgPSB7XG4gIGNvbW1hKHN0cmluZykge1xuICAgIHJldHVybiBsaXN0JDIuc3BsaXQoc3RyaW5nLCBbXCIsXCJdLCB0cnVlKTtcbiAgfSxcbiAgc3BhY2Uoc3RyaW5nKSB7XG4gICAgbGV0IHNwYWNlcyA9IFtcIiBcIiwgXCJcXG5cIiwgXCJcdFwiXTtcbiAgICByZXR1cm4gbGlzdCQyLnNwbGl0KHN0cmluZywgc3BhY2VzKTtcbiAgfSxcbiAgc3BsaXQoc3RyaW5nLCBzZXBhcmF0b3JzLCBsYXN0KSB7XG4gICAgbGV0IGFycmF5ID0gW107XG4gICAgbGV0IGN1cnJlbnQgPSBcIlwiO1xuICAgIGxldCBzcGxpdCA9IGZhbHNlO1xuICAgIGxldCBmdW5jID0gMDtcbiAgICBsZXQgaW5RdW90ZSA9IGZhbHNlO1xuICAgIGxldCBwcmV2UXVvdGUgPSBcIlwiO1xuICAgIGxldCBlc2NhcGUgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBsZXR0ZXIgb2Ygc3RyaW5nKSB7XG4gICAgICBpZiAoZXNjYXBlKSB7XG4gICAgICAgIGVzY2FwZSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChsZXR0ZXIgPT09IFwiXFxcXFwiKSB7XG4gICAgICAgIGVzY2FwZSA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGluUXVvdGUpIHtcbiAgICAgICAgaWYgKGxldHRlciA9PT0gcHJldlF1b3RlKSB7XG4gICAgICAgICAgaW5RdW90ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGxldHRlciA9PT0gJ1wiJyB8fCBsZXR0ZXIgPT09IFwiJ1wiKSB7XG4gICAgICAgIGluUXVvdGUgPSB0cnVlO1xuICAgICAgICBwcmV2UXVvdGUgPSBsZXR0ZXI7XG4gICAgICB9IGVsc2UgaWYgKGxldHRlciA9PT0gXCIoXCIpIHtcbiAgICAgICAgZnVuYyArPSAxO1xuICAgICAgfSBlbHNlIGlmIChsZXR0ZXIgPT09IFwiKVwiKSB7XG4gICAgICAgIGlmIChmdW5jID4gMCkgZnVuYyAtPSAxO1xuICAgICAgfSBlbHNlIGlmIChmdW5jID09PSAwKSB7XG4gICAgICAgIGlmIChzZXBhcmF0b3JzLmluY2x1ZGVzKGxldHRlcikpIHNwbGl0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChzcGxpdCkge1xuICAgICAgICBpZiAoY3VycmVudCAhPT0gXCJcIikgYXJyYXkucHVzaChjdXJyZW50LnRyaW0oKSk7XG4gICAgICAgIGN1cnJlbnQgPSBcIlwiO1xuICAgICAgICBzcGxpdCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudCArPSBsZXR0ZXI7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChsYXN0IHx8IGN1cnJlbnQgIT09IFwiXCIpIGFycmF5LnB1c2goY3VycmVudC50cmltKCkpO1xuICAgIHJldHVybiBhcnJheTtcbiAgfVxufTtcbnZhciBsaXN0XzEgPSBsaXN0JDI7XG5saXN0JDIuZGVmYXVsdCA9IGxpc3QkMjtcbmxldCBDb250YWluZXIkMyA9IGNvbnRhaW5lcjtcbmxldCBsaXN0JDEgPSBsaXN0XzE7XG5sZXQgUnVsZSQzID0gY2xhc3MgUnVsZSBleHRlbmRzIENvbnRhaW5lciQzIHtcbiAgY29uc3RydWN0b3IoZGVmYXVsdHMpIHtcbiAgICBzdXBlcihkZWZhdWx0cyk7XG4gICAgdGhpcy50eXBlID0gXCJydWxlXCI7XG4gICAgaWYgKCF0aGlzLm5vZGVzKSB0aGlzLm5vZGVzID0gW107XG4gIH1cbiAgZ2V0IHNlbGVjdG9ycygpIHtcbiAgICByZXR1cm4gbGlzdCQxLmNvbW1hKHRoaXMuc2VsZWN0b3IpO1xuICB9XG4gIHNldCBzZWxlY3RvcnModmFsdWVzKSB7XG4gICAgbGV0IG1hdGNoID0gdGhpcy5zZWxlY3RvciA/IHRoaXMuc2VsZWN0b3IubWF0Y2goLyxcXHMqLykgOiBudWxsO1xuICAgIGxldCBzZXAyID0gbWF0Y2ggPyBtYXRjaFswXSA6IFwiLFwiICsgdGhpcy5yYXcoXCJiZXR3ZWVuXCIsIFwiYmVmb3JlT3BlblwiKTtcbiAgICB0aGlzLnNlbGVjdG9yID0gdmFsdWVzLmpvaW4oc2VwMik7XG4gIH1cbn07XG52YXIgcnVsZSA9IFJ1bGUkMztcblJ1bGUkMy5kZWZhdWx0ID0gUnVsZSQzO1xuQ29udGFpbmVyJDMucmVnaXN0ZXJSdWxlKFJ1bGUkMyk7XG5sZXQgRGVjbGFyYXRpb24kMiA9IGRlY2xhcmF0aW9uO1xubGV0IHRva2VuaXplcjIgPSB0b2tlbml6ZTtcbmxldCBDb21tZW50JDIgPSBjb21tZW50O1xubGV0IEF0UnVsZSQyID0gYXRSdWxlO1xubGV0IFJvb3QkNCA9IHJvb3Q7XG5sZXQgUnVsZSQyID0gcnVsZTtcbmNvbnN0IFNBRkVfQ09NTUVOVF9ORUlHSEJPUiA9IHtcbiAgZW1wdHk6IHRydWUsXG4gIHNwYWNlOiB0cnVlXG59O1xuZnVuY3Rpb24gZmluZExhc3RXaXRoUG9zaXRpb24odG9rZW5zKSB7XG4gIGZvciAobGV0IGkgPSB0b2tlbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBsZXQgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgbGV0IHBvcyA9IHRva2VuWzNdIHx8IHRva2VuWzJdO1xuICAgIGlmIChwb3MpIHJldHVybiBwb3M7XG4gIH1cbn1cbmxldCBQYXJzZXIkMSA9IGNsYXNzIFBhcnNlciB7XG4gIGNvbnN0cnVjdG9yKGlucHV0Mikge1xuICAgIHRoaXMuaW5wdXQgPSBpbnB1dDI7XG4gICAgdGhpcy5yb290ID0gbmV3IFJvb3QkNCgpO1xuICAgIHRoaXMuY3VycmVudCA9IHRoaXMucm9vdDtcbiAgICB0aGlzLnNwYWNlcyA9IFwiXCI7XG4gICAgdGhpcy5zZW1pY29sb24gPSBmYWxzZTtcbiAgICB0aGlzLmNyZWF0ZVRva2VuaXplcigpO1xuICAgIHRoaXMucm9vdC5zb3VyY2UgPSB7IGlucHV0OiBpbnB1dDIsIHN0YXJ0OiB7IGNvbHVtbjogMSwgbGluZTogMSwgb2Zmc2V0OiAwIH0gfTtcbiAgfVxuICBhdHJ1bGUodG9rZW4pIHtcbiAgICBsZXQgbm9kZTIgPSBuZXcgQXRSdWxlJDIoKTtcbiAgICBub2RlMi5uYW1lID0gdG9rZW5bMV0uc2xpY2UoMSk7XG4gICAgaWYgKG5vZGUyLm5hbWUgPT09IFwiXCIpIHtcbiAgICAgIHRoaXMudW5uYW1lZEF0cnVsZShub2RlMiwgdG9rZW4pO1xuICAgIH1cbiAgICB0aGlzLmluaXQobm9kZTIsIHRva2VuWzJdKTtcbiAgICBsZXQgdHlwZTtcbiAgICBsZXQgcHJldjtcbiAgICBsZXQgc2hpZnQ7XG4gICAgbGV0IGxhc3QgPSBmYWxzZTtcbiAgICBsZXQgb3BlbiA9IGZhbHNlO1xuICAgIGxldCBwYXJhbXMgPSBbXTtcbiAgICBsZXQgYnJhY2tldHMgPSBbXTtcbiAgICB3aGlsZSAoIXRoaXMudG9rZW5pemVyLmVuZE9mRmlsZSgpKSB7XG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5pemVyLm5leHRUb2tlbigpO1xuICAgICAgdHlwZSA9IHRva2VuWzBdO1xuICAgICAgaWYgKHR5cGUgPT09IFwiKFwiIHx8IHR5cGUgPT09IFwiW1wiKSB7XG4gICAgICAgIGJyYWNrZXRzLnB1c2godHlwZSA9PT0gXCIoXCIgPyBcIilcIiA6IFwiXVwiKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJ7XCIgJiYgYnJhY2tldHMubGVuZ3RoID4gMCkge1xuICAgICAgICBicmFja2V0cy5wdXNoKFwifVwiKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gYnJhY2tldHNbYnJhY2tldHMubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgYnJhY2tldHMucG9wKCk7XG4gICAgICB9XG4gICAgICBpZiAoYnJhY2tldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmICh0eXBlID09PSBcIjtcIikge1xuICAgICAgICAgIG5vZGUyLnNvdXJjZS5lbmQgPSB0aGlzLmdldFBvc2l0aW9uKHRva2VuWzJdKTtcbiAgICAgICAgICBub2RlMi5zb3VyY2UuZW5kLm9mZnNldCsrO1xuICAgICAgICAgIHRoaXMuc2VtaWNvbG9uID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcIntcIikge1xuICAgICAgICAgIG9wZW4gPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwifVwiKSB7XG4gICAgICAgICAgaWYgKHBhcmFtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzaGlmdCA9IHBhcmFtcy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgcHJldiA9IHBhcmFtc1tzaGlmdF07XG4gICAgICAgICAgICB3aGlsZSAocHJldiAmJiBwcmV2WzBdID09PSBcInNwYWNlXCIpIHtcbiAgICAgICAgICAgICAgcHJldiA9IHBhcmFtc1stLXNoaWZ0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgICAgIG5vZGUyLnNvdXJjZS5lbmQgPSB0aGlzLmdldFBvc2l0aW9uKHByZXZbM10gfHwgcHJldlsyXSk7XG4gICAgICAgICAgICAgIG5vZGUyLnNvdXJjZS5lbmQub2Zmc2V0Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZW5kKHRva2VuKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXJhbXMucHVzaCh0b2tlbik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtcy5wdXNoKHRva2VuKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnRva2VuaXplci5lbmRPZkZpbGUoKSkge1xuICAgICAgICBsYXN0ID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIG5vZGUyLnJhd3MuYmV0d2VlbiA9IHRoaXMuc3BhY2VzQW5kQ29tbWVudHNGcm9tRW5kKHBhcmFtcyk7XG4gICAgaWYgKHBhcmFtcy5sZW5ndGgpIHtcbiAgICAgIG5vZGUyLnJhd3MuYWZ0ZXJOYW1lID0gdGhpcy5zcGFjZXNBbmRDb21tZW50c0Zyb21TdGFydChwYXJhbXMpO1xuICAgICAgdGhpcy5yYXcobm9kZTIsIFwicGFyYW1zXCIsIHBhcmFtcyk7XG4gICAgICBpZiAobGFzdCkge1xuICAgICAgICB0b2tlbiA9IHBhcmFtc1twYXJhbXMubGVuZ3RoIC0gMV07XG4gICAgICAgIG5vZGUyLnNvdXJjZS5lbmQgPSB0aGlzLmdldFBvc2l0aW9uKHRva2VuWzNdIHx8IHRva2VuWzJdKTtcbiAgICAgICAgbm9kZTIuc291cmNlLmVuZC5vZmZzZXQrKztcbiAgICAgICAgdGhpcy5zcGFjZXMgPSBub2RlMi5yYXdzLmJldHdlZW47XG4gICAgICAgIG5vZGUyLnJhd3MuYmV0d2VlbiA9IFwiXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUyLnJhd3MuYWZ0ZXJOYW1lID0gXCJcIjtcbiAgICAgIG5vZGUyLnBhcmFtcyA9IFwiXCI7XG4gICAgfVxuICAgIGlmIChvcGVuKSB7XG4gICAgICBub2RlMi5ub2RlcyA9IFtdO1xuICAgICAgdGhpcy5jdXJyZW50ID0gbm9kZTI7XG4gICAgfVxuICB9XG4gIGNoZWNrTWlzc2VkU2VtaWNvbG9uKHRva2Vucykge1xuICAgIGxldCBjb2xvbiA9IHRoaXMuY29sb24odG9rZW5zKTtcbiAgICBpZiAoY29sb24gPT09IGZhbHNlKSByZXR1cm47XG4gICAgbGV0IGZvdW5kZWQgPSAwO1xuICAgIGxldCB0b2tlbjtcbiAgICBmb3IgKGxldCBqID0gY29sb24gLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbal07XG4gICAgICBpZiAodG9rZW5bMF0gIT09IFwic3BhY2VcIikge1xuICAgICAgICBmb3VuZGVkICs9IDE7XG4gICAgICAgIGlmIChmb3VuZGVkID09PSAyKSBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcihcbiAgICAgIFwiTWlzc2VkIHNlbWljb2xvblwiLFxuICAgICAgdG9rZW5bMF0gPT09IFwid29yZFwiID8gdG9rZW5bM10gKyAxIDogdG9rZW5bMl1cbiAgICApO1xuICB9XG4gIGNvbG9uKHRva2Vucykge1xuICAgIGxldCBicmFja2V0cyA9IDA7XG4gICAgbGV0IHRva2VuLCB0eXBlLCBwcmV2O1xuICAgIGZvciAobGV0IFtpLCBlbGVtZW50XSBvZiB0b2tlbnMuZW50cmllcygpKSB7XG4gICAgICB0b2tlbiA9IGVsZW1lbnQ7XG4gICAgICB0eXBlID0gdG9rZW5bMF07XG4gICAgICBpZiAodHlwZSA9PT0gXCIoXCIpIHtcbiAgICAgICAgYnJhY2tldHMgKz0gMTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlID09PSBcIilcIikge1xuICAgICAgICBicmFja2V0cyAtPSAxO1xuICAgICAgfVxuICAgICAgaWYgKGJyYWNrZXRzID09PSAwICYmIHR5cGUgPT09IFwiOlwiKSB7XG4gICAgICAgIGlmICghcHJldikge1xuICAgICAgICAgIHRoaXMuZG91YmxlQ29sb24odG9rZW4pO1xuICAgICAgICB9IGVsc2UgaWYgKHByZXZbMF0gPT09IFwid29yZFwiICYmIHByZXZbMV0gPT09IFwicHJvZ2lkXCIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcHJldiA9IHRva2VuO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29tbWVudCh0b2tlbikge1xuICAgIGxldCBub2RlMiA9IG5ldyBDb21tZW50JDIoKTtcbiAgICB0aGlzLmluaXQobm9kZTIsIHRva2VuWzJdKTtcbiAgICBub2RlMi5zb3VyY2UuZW5kID0gdGhpcy5nZXRQb3NpdGlvbih0b2tlblszXSB8fCB0b2tlblsyXSk7XG4gICAgbm9kZTIuc291cmNlLmVuZC5vZmZzZXQrKztcbiAgICBsZXQgdGV4dCA9IHRva2VuWzFdLnNsaWNlKDIsIC0yKTtcbiAgICBpZiAoL15cXHMqJC8udGVzdCh0ZXh0KSkge1xuICAgICAgbm9kZTIudGV4dCA9IFwiXCI7XG4gICAgICBub2RlMi5yYXdzLmxlZnQgPSB0ZXh0O1xuICAgICAgbm9kZTIucmF3cy5yaWdodCA9IFwiXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBtYXRjaCA9IHRleHQubWF0Y2goL14oXFxzKikoW15dKlxcUykoXFxzKikkLyk7XG4gICAgICBub2RlMi50ZXh0ID0gbWF0Y2hbMl07XG4gICAgICBub2RlMi5yYXdzLmxlZnQgPSBtYXRjaFsxXTtcbiAgICAgIG5vZGUyLnJhd3MucmlnaHQgPSBtYXRjaFszXTtcbiAgICB9XG4gIH1cbiAgY3JlYXRlVG9rZW5pemVyKCkge1xuICAgIHRoaXMudG9rZW5pemVyID0gdG9rZW5pemVyMih0aGlzLmlucHV0KTtcbiAgfVxuICBkZWNsKHRva2VucywgY3VzdG9tUHJvcGVydHkpIHtcbiAgICBsZXQgbm9kZTIgPSBuZXcgRGVjbGFyYXRpb24kMigpO1xuICAgIHRoaXMuaW5pdChub2RlMiwgdG9rZW5zWzBdWzJdKTtcbiAgICBsZXQgbGFzdCA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgaWYgKGxhc3RbMF0gPT09IFwiO1wiKSB7XG4gICAgICB0aGlzLnNlbWljb2xvbiA9IHRydWU7XG4gICAgICB0b2tlbnMucG9wKCk7XG4gICAgfVxuICAgIG5vZGUyLnNvdXJjZS5lbmQgPSB0aGlzLmdldFBvc2l0aW9uKFxuICAgICAgbGFzdFszXSB8fCBsYXN0WzJdIHx8IGZpbmRMYXN0V2l0aFBvc2l0aW9uKHRva2VucylcbiAgICApO1xuICAgIG5vZGUyLnNvdXJjZS5lbmQub2Zmc2V0Kys7XG4gICAgd2hpbGUgKHRva2Vuc1swXVswXSAhPT0gXCJ3b3JkXCIpIHtcbiAgICAgIGlmICh0b2tlbnMubGVuZ3RoID09PSAxKSB0aGlzLnVua25vd25Xb3JkKHRva2Vucyk7XG4gICAgICBub2RlMi5yYXdzLmJlZm9yZSArPSB0b2tlbnMuc2hpZnQoKVsxXTtcbiAgICB9XG4gICAgbm9kZTIuc291cmNlLnN0YXJ0ID0gdGhpcy5nZXRQb3NpdGlvbih0b2tlbnNbMF1bMl0pO1xuICAgIG5vZGUyLnByb3AgPSBcIlwiO1xuICAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICBsZXQgdHlwZSA9IHRva2Vuc1swXVswXTtcbiAgICAgIGlmICh0eXBlID09PSBcIjpcIiB8fCB0eXBlID09PSBcInNwYWNlXCIgfHwgdHlwZSA9PT0gXCJjb21tZW50XCIpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBub2RlMi5wcm9wICs9IHRva2Vucy5zaGlmdCgpWzFdO1xuICAgIH1cbiAgICBub2RlMi5yYXdzLmJldHdlZW4gPSBcIlwiO1xuICAgIGxldCB0b2tlbjtcbiAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgdG9rZW4gPSB0b2tlbnMuc2hpZnQoKTtcbiAgICAgIGlmICh0b2tlblswXSA9PT0gXCI6XCIpIHtcbiAgICAgICAgbm9kZTIucmF3cy5iZXR3ZWVuICs9IHRva2VuWzFdO1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0b2tlblswXSA9PT0gXCJ3b3JkXCIgJiYgL1xcdy8udGVzdCh0b2tlblsxXSkpIHtcbiAgICAgICAgICB0aGlzLnVua25vd25Xb3JkKFt0b2tlbl0pO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUyLnJhd3MuYmV0d2VlbiArPSB0b2tlblsxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5vZGUyLnByb3BbMF0gPT09IFwiX1wiIHx8IG5vZGUyLnByb3BbMF0gPT09IFwiKlwiKSB7XG4gICAgICBub2RlMi5yYXdzLmJlZm9yZSArPSBub2RlMi5wcm9wWzBdO1xuICAgICAgbm9kZTIucHJvcCA9IG5vZGUyLnByb3Auc2xpY2UoMSk7XG4gICAgfVxuICAgIGxldCBmaXJzdFNwYWNlcyA9IFtdO1xuICAgIGxldCBuZXh0O1xuICAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICBuZXh0ID0gdG9rZW5zWzBdWzBdO1xuICAgICAgaWYgKG5leHQgIT09IFwic3BhY2VcIiAmJiBuZXh0ICE9PSBcImNvbW1lbnRcIikgYnJlYWs7XG4gICAgICBmaXJzdFNwYWNlcy5wdXNoKHRva2Vucy5zaGlmdCgpKTtcbiAgICB9XG4gICAgdGhpcy5wcmVjaGVja01pc3NlZFNlbWljb2xvbih0b2tlbnMpO1xuICAgIGZvciAobGV0IGkgPSB0b2tlbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgaWYgKHRva2VuWzFdLnRvTG93ZXJDYXNlKCkgPT09IFwiIWltcG9ydGFudFwiKSB7XG4gICAgICAgIG5vZGUyLmltcG9ydGFudCA9IHRydWU7XG4gICAgICAgIGxldCBzdHJpbmcgPSB0aGlzLnN0cmluZ0Zyb20odG9rZW5zLCBpKTtcbiAgICAgICAgc3RyaW5nID0gdGhpcy5zcGFjZXNGcm9tRW5kKHRva2VucykgKyBzdHJpbmc7XG4gICAgICAgIGlmIChzdHJpbmcgIT09IFwiICFpbXBvcnRhbnRcIikgbm9kZTIucmF3cy5pbXBvcnRhbnQgPSBzdHJpbmc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmICh0b2tlblsxXS50b0xvd2VyQ2FzZSgpID09PSBcImltcG9ydGFudFwiKSB7XG4gICAgICAgIGxldCBjYWNoZSA9IHRva2Vucy5zbGljZSgwKTtcbiAgICAgICAgbGV0IHN0ciA9IFwiXCI7XG4gICAgICAgIGZvciAobGV0IGogPSBpOyBqID4gMDsgai0tKSB7XG4gICAgICAgICAgbGV0IHR5cGUgPSBjYWNoZVtqXVswXTtcbiAgICAgICAgICBpZiAoc3RyLnRyaW0oKS5pbmRleE9mKFwiIVwiKSA9PT0gMCAmJiB0eXBlICE9PSBcInNwYWNlXCIpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdHIgPSBjYWNoZS5wb3AoKVsxXSArIHN0cjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RyLnRyaW0oKS5pbmRleE9mKFwiIVwiKSA9PT0gMCkge1xuICAgICAgICAgIG5vZGUyLmltcG9ydGFudCA9IHRydWU7XG4gICAgICAgICAgbm9kZTIucmF3cy5pbXBvcnRhbnQgPSBzdHI7XG4gICAgICAgICAgdG9rZW5zID0gY2FjaGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0b2tlblswXSAhPT0gXCJzcGFjZVwiICYmIHRva2VuWzBdICE9PSBcImNvbW1lbnRcIikge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IGhhc1dvcmQgPSB0b2tlbnMuc29tZSgoaSkgPT4gaVswXSAhPT0gXCJzcGFjZVwiICYmIGlbMF0gIT09IFwiY29tbWVudFwiKTtcbiAgICBpZiAoaGFzV29yZCkge1xuICAgICAgbm9kZTIucmF3cy5iZXR3ZWVuICs9IGZpcnN0U3BhY2VzLm1hcCgoaSkgPT4gaVsxXSkuam9pbihcIlwiKTtcbiAgICAgIGZpcnN0U3BhY2VzID0gW107XG4gICAgfVxuICAgIHRoaXMucmF3KG5vZGUyLCBcInZhbHVlXCIsIGZpcnN0U3BhY2VzLmNvbmNhdCh0b2tlbnMpLCBjdXN0b21Qcm9wZXJ0eSk7XG4gICAgaWYgKG5vZGUyLnZhbHVlLmluY2x1ZGVzKFwiOlwiKSAmJiAhY3VzdG9tUHJvcGVydHkpIHtcbiAgICAgIHRoaXMuY2hlY2tNaXNzZWRTZW1pY29sb24odG9rZW5zKTtcbiAgICB9XG4gIH1cbiAgZG91YmxlQ29sb24odG9rZW4pIHtcbiAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKFxuICAgICAgXCJEb3VibGUgY29sb25cIixcbiAgICAgIHsgb2Zmc2V0OiB0b2tlblsyXSB9LFxuICAgICAgeyBvZmZzZXQ6IHRva2VuWzJdICsgdG9rZW5bMV0ubGVuZ3RoIH1cbiAgICApO1xuICB9XG4gIGVtcHR5UnVsZSh0b2tlbikge1xuICAgIGxldCBub2RlMiA9IG5ldyBSdWxlJDIoKTtcbiAgICB0aGlzLmluaXQobm9kZTIsIHRva2VuWzJdKTtcbiAgICBub2RlMi5zZWxlY3RvciA9IFwiXCI7XG4gICAgbm9kZTIucmF3cy5iZXR3ZWVuID0gXCJcIjtcbiAgICB0aGlzLmN1cnJlbnQgPSBub2RlMjtcbiAgfVxuICBlbmQodG9rZW4pIHtcbiAgICBpZiAodGhpcy5jdXJyZW50Lm5vZGVzICYmIHRoaXMuY3VycmVudC5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY3VycmVudC5yYXdzLnNlbWljb2xvbiA9IHRoaXMuc2VtaWNvbG9uO1xuICAgIH1cbiAgICB0aGlzLnNlbWljb2xvbiA9IGZhbHNlO1xuICAgIHRoaXMuY3VycmVudC5yYXdzLmFmdGVyID0gKHRoaXMuY3VycmVudC5yYXdzLmFmdGVyIHx8IFwiXCIpICsgdGhpcy5zcGFjZXM7XG4gICAgdGhpcy5zcGFjZXMgPSBcIlwiO1xuICAgIGlmICh0aGlzLmN1cnJlbnQucGFyZW50KSB7XG4gICAgICB0aGlzLmN1cnJlbnQuc291cmNlLmVuZCA9IHRoaXMuZ2V0UG9zaXRpb24odG9rZW5bMl0pO1xuICAgICAgdGhpcy5jdXJyZW50LnNvdXJjZS5lbmQub2Zmc2V0Kys7XG4gICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLmN1cnJlbnQucGFyZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVuZXhwZWN0ZWRDbG9zZSh0b2tlbik7XG4gICAgfVxuICB9XG4gIGVuZEZpbGUoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudC5wYXJlbnQpIHRoaXMudW5jbG9zZWRCbG9jaygpO1xuICAgIGlmICh0aGlzLmN1cnJlbnQubm9kZXMgJiYgdGhpcy5jdXJyZW50Lm5vZGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5jdXJyZW50LnJhd3Muc2VtaWNvbG9uID0gdGhpcy5zZW1pY29sb247XG4gICAgfVxuICAgIHRoaXMuY3VycmVudC5yYXdzLmFmdGVyID0gKHRoaXMuY3VycmVudC5yYXdzLmFmdGVyIHx8IFwiXCIpICsgdGhpcy5zcGFjZXM7XG4gICAgdGhpcy5yb290LnNvdXJjZS5lbmQgPSB0aGlzLmdldFBvc2l0aW9uKHRoaXMudG9rZW5pemVyLnBvc2l0aW9uKCkpO1xuICB9XG4gIGZyZWVTZW1pY29sb24odG9rZW4pIHtcbiAgICB0aGlzLnNwYWNlcyArPSB0b2tlblsxXTtcbiAgICBpZiAodGhpcy5jdXJyZW50Lm5vZGVzKSB7XG4gICAgICBsZXQgcHJldiA9IHRoaXMuY3VycmVudC5ub2Rlc1t0aGlzLmN1cnJlbnQubm9kZXMubGVuZ3RoIC0gMV07XG4gICAgICBpZiAocHJldiAmJiBwcmV2LnR5cGUgPT09IFwicnVsZVwiICYmICFwcmV2LnJhd3Mub3duU2VtaWNvbG9uKSB7XG4gICAgICAgIHByZXYucmF3cy5vd25TZW1pY29sb24gPSB0aGlzLnNwYWNlcztcbiAgICAgICAgdGhpcy5zcGFjZXMgPSBcIlwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBIZWxwZXJzXG4gIGdldFBvc2l0aW9uKG9mZnNldCkge1xuICAgIGxldCBwb3MgPSB0aGlzLmlucHV0LmZyb21PZmZzZXQob2Zmc2V0KTtcbiAgICByZXR1cm4ge1xuICAgICAgY29sdW1uOiBwb3MuY29sLFxuICAgICAgbGluZTogcG9zLmxpbmUsXG4gICAgICBvZmZzZXRcbiAgICB9O1xuICB9XG4gIGluaXQobm9kZTIsIG9mZnNldCkge1xuICAgIHRoaXMuY3VycmVudC5wdXNoKG5vZGUyKTtcbiAgICBub2RlMi5zb3VyY2UgPSB7XG4gICAgICBpbnB1dDogdGhpcy5pbnB1dCxcbiAgICAgIHN0YXJ0OiB0aGlzLmdldFBvc2l0aW9uKG9mZnNldClcbiAgICB9O1xuICAgIG5vZGUyLnJhd3MuYmVmb3JlID0gdGhpcy5zcGFjZXM7XG4gICAgdGhpcy5zcGFjZXMgPSBcIlwiO1xuICAgIGlmIChub2RlMi50eXBlICE9PSBcImNvbW1lbnRcIikgdGhpcy5zZW1pY29sb24gPSBmYWxzZTtcbiAgfVxuICBvdGhlcihzdGFydCkge1xuICAgIGxldCBlbmQgPSBmYWxzZTtcbiAgICBsZXQgdHlwZSA9IG51bGw7XG4gICAgbGV0IGNvbG9uID0gZmFsc2U7XG4gICAgbGV0IGJyYWNrZXQgPSBudWxsO1xuICAgIGxldCBicmFja2V0cyA9IFtdO1xuICAgIGxldCBjdXN0b21Qcm9wZXJ0eSA9IHN0YXJ0WzFdLnN0YXJ0c1dpdGgoXCItLVwiKTtcbiAgICBsZXQgdG9rZW5zID0gW107XG4gICAgbGV0IHRva2VuID0gc3RhcnQ7XG4gICAgd2hpbGUgKHRva2VuKSB7XG4gICAgICB0eXBlID0gdG9rZW5bMF07XG4gICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICBpZiAodHlwZSA9PT0gXCIoXCIgfHwgdHlwZSA9PT0gXCJbXCIpIHtcbiAgICAgICAgaWYgKCFicmFja2V0KSBicmFja2V0ID0gdG9rZW47XG4gICAgICAgIGJyYWNrZXRzLnB1c2godHlwZSA9PT0gXCIoXCIgPyBcIilcIiA6IFwiXVwiKTtcbiAgICAgIH0gZWxzZSBpZiAoY3VzdG9tUHJvcGVydHkgJiYgY29sb24gJiYgdHlwZSA9PT0gXCJ7XCIpIHtcbiAgICAgICAgaWYgKCFicmFja2V0KSBicmFja2V0ID0gdG9rZW47XG4gICAgICAgIGJyYWNrZXRzLnB1c2goXCJ9XCIpO1xuICAgICAgfSBlbHNlIGlmIChicmFja2V0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKHR5cGUgPT09IFwiO1wiKSB7XG4gICAgICAgICAgaWYgKGNvbG9uKSB7XG4gICAgICAgICAgICB0aGlzLmRlY2wodG9rZW5zLCBjdXN0b21Qcm9wZXJ0eSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcIntcIikge1xuICAgICAgICAgIHRoaXMucnVsZSh0b2tlbnMpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcIn1cIikge1xuICAgICAgICAgIHRoaXMudG9rZW5pemVyLmJhY2sodG9rZW5zLnBvcCgpKTtcbiAgICAgICAgICBlbmQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiOlwiKSB7XG4gICAgICAgICAgY29sb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IGJyYWNrZXRzW2JyYWNrZXRzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgIGJyYWNrZXRzLnBvcCgpO1xuICAgICAgICBpZiAoYnJhY2tldHMubGVuZ3RoID09PSAwKSBicmFja2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHRva2VuID0gdGhpcy50b2tlbml6ZXIubmV4dFRva2VuKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnRva2VuaXplci5lbmRPZkZpbGUoKSkgZW5kID0gdHJ1ZTtcbiAgICBpZiAoYnJhY2tldHMubGVuZ3RoID4gMCkgdGhpcy51bmNsb3NlZEJyYWNrZXQoYnJhY2tldCk7XG4gICAgaWYgKGVuZCAmJiBjb2xvbikge1xuICAgICAgaWYgKCFjdXN0b21Qcm9wZXJ0eSkge1xuICAgICAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgICAgIHRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXVswXTtcbiAgICAgICAgICBpZiAodG9rZW4gIT09IFwic3BhY2VcIiAmJiB0b2tlbiAhPT0gXCJjb21tZW50XCIpIGJyZWFrO1xuICAgICAgICAgIHRoaXMudG9rZW5pemVyLmJhY2sodG9rZW5zLnBvcCgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5kZWNsKHRva2VucywgY3VzdG9tUHJvcGVydHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVua25vd25Xb3JkKHRva2Vucyk7XG4gICAgfVxuICB9XG4gIHBhcnNlKCkge1xuICAgIGxldCB0b2tlbjtcbiAgICB3aGlsZSAoIXRoaXMudG9rZW5pemVyLmVuZE9mRmlsZSgpKSB7XG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5pemVyLm5leHRUb2tlbigpO1xuICAgICAgc3dpdGNoICh0b2tlblswXSkge1xuICAgICAgICBjYXNlIFwic3BhY2VcIjpcbiAgICAgICAgICB0aGlzLnNwYWNlcyArPSB0b2tlblsxXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIjtcIjpcbiAgICAgICAgICB0aGlzLmZyZWVTZW1pY29sb24odG9rZW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwifVwiOlxuICAgICAgICAgIHRoaXMuZW5kKHRva2VuKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImNvbW1lbnRcIjpcbiAgICAgICAgICB0aGlzLmNvbW1lbnQodG9rZW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYXQtd29yZFwiOlxuICAgICAgICAgIHRoaXMuYXRydWxlKHRva2VuKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIntcIjpcbiAgICAgICAgICB0aGlzLmVtcHR5UnVsZSh0b2tlbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhpcy5vdGhlcih0b2tlbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZW5kRmlsZSgpO1xuICB9XG4gIHByZWNoZWNrTWlzc2VkU2VtaWNvbG9uKCkge1xuICB9XG4gIHJhdyhub2RlMiwgcHJvcCwgdG9rZW5zLCBjdXN0b21Qcm9wZXJ0eSkge1xuICAgIGxldCB0b2tlbiwgdHlwZTtcbiAgICBsZXQgbGVuZ3RoID0gdG9rZW5zLmxlbmd0aDtcbiAgICBsZXQgdmFsdWUgPSBcIlwiO1xuICAgIGxldCBjbGVhbiA9IHRydWU7XG4gICAgbGV0IG5leHQsIHByZXY7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICB0eXBlID0gdG9rZW5bMF07XG4gICAgICBpZiAodHlwZSA9PT0gXCJzcGFjZVwiICYmIGkgPT09IGxlbmd0aCAtIDEgJiYgIWN1c3RvbVByb3BlcnR5KSB7XG4gICAgICAgIGNsZWFuID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiY29tbWVudFwiKSB7XG4gICAgICAgIHByZXYgPSB0b2tlbnNbaSAtIDFdID8gdG9rZW5zW2kgLSAxXVswXSA6IFwiZW1wdHlcIjtcbiAgICAgICAgbmV4dCA9IHRva2Vuc1tpICsgMV0gPyB0b2tlbnNbaSArIDFdWzBdIDogXCJlbXB0eVwiO1xuICAgICAgICBpZiAoIVNBRkVfQ09NTUVOVF9ORUlHSEJPUltwcmV2XSAmJiAhU0FGRV9DT01NRU5UX05FSUdIQk9SW25leHRdKSB7XG4gICAgICAgICAgaWYgKHZhbHVlLnNsaWNlKC0xKSA9PT0gXCIsXCIpIHtcbiAgICAgICAgICAgIGNsZWFuID0gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlICs9IHRva2VuWzFdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjbGVhbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSArPSB0b2tlblsxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFjbGVhbikge1xuICAgICAgbGV0IHJhdyA9IHRva2Vucy5yZWR1Y2UoKGFsbCwgaSkgPT4gYWxsICsgaVsxXSwgXCJcIik7XG4gICAgICBub2RlMi5yYXdzW3Byb3BdID0geyByYXcsIHZhbHVlIH07XG4gICAgfVxuICAgIG5vZGUyW3Byb3BdID0gdmFsdWU7XG4gIH1cbiAgcnVsZSh0b2tlbnMpIHtcbiAgICB0b2tlbnMucG9wKCk7XG4gICAgbGV0IG5vZGUyID0gbmV3IFJ1bGUkMigpO1xuICAgIHRoaXMuaW5pdChub2RlMiwgdG9rZW5zWzBdWzJdKTtcbiAgICBub2RlMi5yYXdzLmJldHdlZW4gPSB0aGlzLnNwYWNlc0FuZENvbW1lbnRzRnJvbUVuZCh0b2tlbnMpO1xuICAgIHRoaXMucmF3KG5vZGUyLCBcInNlbGVjdG9yXCIsIHRva2Vucyk7XG4gICAgdGhpcy5jdXJyZW50ID0gbm9kZTI7XG4gIH1cbiAgc3BhY2VzQW5kQ29tbWVudHNGcm9tRW5kKHRva2Vucykge1xuICAgIGxldCBsYXN0VG9rZW5UeXBlO1xuICAgIGxldCBzcGFjZXMgPSBcIlwiO1xuICAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICBsYXN0VG9rZW5UeXBlID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXVswXTtcbiAgICAgIGlmIChsYXN0VG9rZW5UeXBlICE9PSBcInNwYWNlXCIgJiYgbGFzdFRva2VuVHlwZSAhPT0gXCJjb21tZW50XCIpIGJyZWFrO1xuICAgICAgc3BhY2VzID0gdG9rZW5zLnBvcCgpWzFdICsgc3BhY2VzO1xuICAgIH1cbiAgICByZXR1cm4gc3BhY2VzO1xuICB9XG4gIC8vIEVycm9yc1xuICBzcGFjZXNBbmRDb21tZW50c0Zyb21TdGFydCh0b2tlbnMpIHtcbiAgICBsZXQgbmV4dDtcbiAgICBsZXQgc3BhY2VzID0gXCJcIjtcbiAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgbmV4dCA9IHRva2Vuc1swXVswXTtcbiAgICAgIGlmIChuZXh0ICE9PSBcInNwYWNlXCIgJiYgbmV4dCAhPT0gXCJjb21tZW50XCIpIGJyZWFrO1xuICAgICAgc3BhY2VzICs9IHRva2Vucy5zaGlmdCgpWzFdO1xuICAgIH1cbiAgICByZXR1cm4gc3BhY2VzO1xuICB9XG4gIHNwYWNlc0Zyb21FbmQodG9rZW5zKSB7XG4gICAgbGV0IGxhc3RUb2tlblR5cGU7XG4gICAgbGV0IHNwYWNlcyA9IFwiXCI7XG4gICAgd2hpbGUgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgIGxhc3RUb2tlblR5cGUgPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdWzBdO1xuICAgICAgaWYgKGxhc3RUb2tlblR5cGUgIT09IFwic3BhY2VcIikgYnJlYWs7XG4gICAgICBzcGFjZXMgPSB0b2tlbnMucG9wKClbMV0gKyBzcGFjZXM7XG4gICAgfVxuICAgIHJldHVybiBzcGFjZXM7XG4gIH1cbiAgc3RyaW5nRnJvbSh0b2tlbnMsIGZyb20pIHtcbiAgICBsZXQgcmVzdWx0MiA9IFwiXCI7XG4gICAgZm9yIChsZXQgaSA9IGZyb207IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdDIgKz0gdG9rZW5zW2ldWzFdO1xuICAgIH1cbiAgICB0b2tlbnMuc3BsaWNlKGZyb20sIHRva2Vucy5sZW5ndGggLSBmcm9tKTtcbiAgICByZXR1cm4gcmVzdWx0MjtcbiAgfVxuICB1bmNsb3NlZEJsb2NrKCkge1xuICAgIGxldCBwb3MgPSB0aGlzLmN1cnJlbnQuc291cmNlLnN0YXJ0O1xuICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoXCJVbmNsb3NlZCBibG9ja1wiLCBwb3MubGluZSwgcG9zLmNvbHVtbik7XG4gIH1cbiAgdW5jbG9zZWRCcmFja2V0KGJyYWNrZXQpIHtcbiAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKFxuICAgICAgXCJVbmNsb3NlZCBicmFja2V0XCIsXG4gICAgICB7IG9mZnNldDogYnJhY2tldFsyXSB9LFxuICAgICAgeyBvZmZzZXQ6IGJyYWNrZXRbMl0gKyAxIH1cbiAgICApO1xuICB9XG4gIHVuZXhwZWN0ZWRDbG9zZSh0b2tlbikge1xuICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoXG4gICAgICBcIlVuZXhwZWN0ZWQgfVwiLFxuICAgICAgeyBvZmZzZXQ6IHRva2VuWzJdIH0sXG4gICAgICB7IG9mZnNldDogdG9rZW5bMl0gKyAxIH1cbiAgICApO1xuICB9XG4gIHVua25vd25Xb3JkKHRva2Vucykge1xuICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoXG4gICAgICBcIlVua25vd24gd29yZFwiLFxuICAgICAgeyBvZmZzZXQ6IHRva2Vuc1swXVsyXSB9LFxuICAgICAgeyBvZmZzZXQ6IHRva2Vuc1swXVsyXSArIHRva2Vuc1swXVsxXS5sZW5ndGggfVxuICAgICk7XG4gIH1cbiAgdW5uYW1lZEF0cnVsZShub2RlMiwgdG9rZW4pIHtcbiAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKFxuICAgICAgXCJBdC1ydWxlIHdpdGhvdXQgbmFtZVwiLFxuICAgICAgeyBvZmZzZXQ6IHRva2VuWzJdIH0sXG4gICAgICB7IG9mZnNldDogdG9rZW5bMl0gKyB0b2tlblsxXS5sZW5ndGggfVxuICAgICk7XG4gIH1cbn07XG52YXIgcGFyc2VyID0gUGFyc2VyJDE7XG5sZXQgQ29udGFpbmVyJDIgPSBjb250YWluZXI7XG5sZXQgUGFyc2VyMiA9IHBhcnNlcjtcbmxldCBJbnB1dCQyID0gaW5wdXQ7XG5mdW5jdGlvbiBwYXJzZSQzKGNzcywgb3B0cykge1xuICBsZXQgaW5wdXQyID0gbmV3IElucHV0JDIoY3NzLCBvcHRzKTtcbiAgbGV0IHBhcnNlcjIgPSBuZXcgUGFyc2VyMihpbnB1dDIpO1xuICB0cnkge1xuICAgIHBhcnNlcjIucGFyc2UoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmICh0cnVlKSB7XG4gICAgICBpZiAoZS5uYW1lID09PSBcIkNzc1N5bnRheEVycm9yXCIgJiYgb3B0cyAmJiBvcHRzLmZyb20pIHtcbiAgICAgICAgaWYgKC9cXC5zY3NzJC9pLnRlc3Qob3B0cy5mcm9tKSkge1xuICAgICAgICAgIGUubWVzc2FnZSArPSBcIlxcbllvdSB0cmllZCB0byBwYXJzZSBTQ1NTIHdpdGggdGhlIHN0YW5kYXJkIENTUyBwYXJzZXI7IHRyeSBhZ2FpbiB3aXRoIHRoZSBwb3N0Y3NzLXNjc3MgcGFyc2VyXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoL1xcLnNhc3MvaS50ZXN0KG9wdHMuZnJvbSkpIHtcbiAgICAgICAgICBlLm1lc3NhZ2UgKz0gXCJcXG5Zb3UgdHJpZWQgdG8gcGFyc2UgU2FzcyB3aXRoIHRoZSBzdGFuZGFyZCBDU1MgcGFyc2VyOyB0cnkgYWdhaW4gd2l0aCB0aGUgcG9zdGNzcy1zYXNzIHBhcnNlclwiO1xuICAgICAgICB9IGVsc2UgaWYgKC9cXC5sZXNzJC9pLnRlc3Qob3B0cy5mcm9tKSkge1xuICAgICAgICAgIGUubWVzc2FnZSArPSBcIlxcbllvdSB0cmllZCB0byBwYXJzZSBMZXNzIHdpdGggdGhlIHN0YW5kYXJkIENTUyBwYXJzZXI7IHRyeSBhZ2FpbiB3aXRoIHRoZSBwb3N0Y3NzLWxlc3MgcGFyc2VyXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgZTtcbiAgfVxuICByZXR1cm4gcGFyc2VyMi5yb290O1xufVxudmFyIHBhcnNlXzEgPSBwYXJzZSQzO1xucGFyc2UkMy5kZWZhdWx0ID0gcGFyc2UkMztcbkNvbnRhaW5lciQyLnJlZ2lzdGVyUGFyc2UocGFyc2UkMyk7XG5sZXQgeyBpc0NsZWFuLCBteSB9ID0gc3ltYm9scztcbmxldCBNYXBHZW5lcmF0b3IkMSA9IG1hcEdlbmVyYXRvcjtcbmxldCBzdHJpbmdpZnkkMiA9IHN0cmluZ2lmeV8xO1xubGV0IENvbnRhaW5lciQxID0gY29udGFpbmVyO1xubGV0IERvY3VtZW50JDIgPSBkb2N1bWVudCQxO1xubGV0IHdhcm5PbmNlJDEgPSB3YXJuT25jZSQyO1xubGV0IFJlc3VsdCQyID0gcmVzdWx0O1xubGV0IHBhcnNlJDIgPSBwYXJzZV8xO1xubGV0IFJvb3QkMyA9IHJvb3Q7XG5jb25zdCBUWVBFX1RPX0NMQVNTX05BTUUgPSB7XG4gIGF0cnVsZTogXCJBdFJ1bGVcIixcbiAgY29tbWVudDogXCJDb21tZW50XCIsXG4gIGRlY2w6IFwiRGVjbGFyYXRpb25cIixcbiAgZG9jdW1lbnQ6IFwiRG9jdW1lbnRcIixcbiAgcm9vdDogXCJSb290XCIsXG4gIHJ1bGU6IFwiUnVsZVwiXG59O1xuY29uc3QgUExVR0lOX1BST1BTID0ge1xuICBBdFJ1bGU6IHRydWUsXG4gIEF0UnVsZUV4aXQ6IHRydWUsXG4gIENvbW1lbnQ6IHRydWUsXG4gIENvbW1lbnRFeGl0OiB0cnVlLFxuICBEZWNsYXJhdGlvbjogdHJ1ZSxcbiAgRGVjbGFyYXRpb25FeGl0OiB0cnVlLFxuICBEb2N1bWVudDogdHJ1ZSxcbiAgRG9jdW1lbnRFeGl0OiB0cnVlLFxuICBPbmNlOiB0cnVlLFxuICBPbmNlRXhpdDogdHJ1ZSxcbiAgcG9zdGNzc1BsdWdpbjogdHJ1ZSxcbiAgcHJlcGFyZTogdHJ1ZSxcbiAgUm9vdDogdHJ1ZSxcbiAgUm9vdEV4aXQ6IHRydWUsXG4gIFJ1bGU6IHRydWUsXG4gIFJ1bGVFeGl0OiB0cnVlXG59O1xuY29uc3QgTk9UX1ZJU0lUT1JTID0ge1xuICBPbmNlOiB0cnVlLFxuICBwb3N0Y3NzUGx1Z2luOiB0cnVlLFxuICBwcmVwYXJlOiB0cnVlXG59O1xuY29uc3QgQ0hJTERSRU4gPSAwO1xuZnVuY3Rpb24gaXNQcm9taXNlKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygb2JqLnRoZW4gPT09IFwiZnVuY3Rpb25cIjtcbn1cbmZ1bmN0aW9uIGdldEV2ZW50cyhub2RlMikge1xuICBsZXQga2V5ID0gZmFsc2U7XG4gIGxldCB0eXBlID0gVFlQRV9UT19DTEFTU19OQU1FW25vZGUyLnR5cGVdO1xuICBpZiAobm9kZTIudHlwZSA9PT0gXCJkZWNsXCIpIHtcbiAgICBrZXkgPSBub2RlMi5wcm9wLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSBpZiAobm9kZTIudHlwZSA9PT0gXCJhdHJ1bGVcIikge1xuICAgIGtleSA9IG5vZGUyLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgfVxuICBpZiAoa2V5ICYmIG5vZGUyLmFwcGVuZCkge1xuICAgIHJldHVybiBbXG4gICAgICB0eXBlLFxuICAgICAgdHlwZSArIFwiLVwiICsga2V5LFxuICAgICAgQ0hJTERSRU4sXG4gICAgICB0eXBlICsgXCJFeGl0XCIsXG4gICAgICB0eXBlICsgXCJFeGl0LVwiICsga2V5XG4gICAgXTtcbiAgfSBlbHNlIGlmIChrZXkpIHtcbiAgICByZXR1cm4gW3R5cGUsIHR5cGUgKyBcIi1cIiArIGtleSwgdHlwZSArIFwiRXhpdFwiLCB0eXBlICsgXCJFeGl0LVwiICsga2V5XTtcbiAgfSBlbHNlIGlmIChub2RlMi5hcHBlbmQpIHtcbiAgICByZXR1cm4gW3R5cGUsIENISUxEUkVOLCB0eXBlICsgXCJFeGl0XCJdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbdHlwZSwgdHlwZSArIFwiRXhpdFwiXTtcbiAgfVxufVxuZnVuY3Rpb24gdG9TdGFjayhub2RlMikge1xuICBsZXQgZXZlbnRzO1xuICBpZiAobm9kZTIudHlwZSA9PT0gXCJkb2N1bWVudFwiKSB7XG4gICAgZXZlbnRzID0gW1wiRG9jdW1lbnRcIiwgQ0hJTERSRU4sIFwiRG9jdW1lbnRFeGl0XCJdO1xuICB9IGVsc2UgaWYgKG5vZGUyLnR5cGUgPT09IFwicm9vdFwiKSB7XG4gICAgZXZlbnRzID0gW1wiUm9vdFwiLCBDSElMRFJFTiwgXCJSb290RXhpdFwiXTtcbiAgfSBlbHNlIHtcbiAgICBldmVudHMgPSBnZXRFdmVudHMobm9kZTIpO1xuICB9XG4gIHJldHVybiB7XG4gICAgZXZlbnRJbmRleDogMCxcbiAgICBldmVudHMsXG4gICAgaXRlcmF0b3I6IDAsXG4gICAgbm9kZTogbm9kZTIsXG4gICAgdmlzaXRvckluZGV4OiAwLFxuICAgIHZpc2l0b3JzOiBbXVxuICB9O1xufVxuZnVuY3Rpb24gY2xlYW5NYXJrcyhub2RlMikge1xuICBub2RlMltpc0NsZWFuXSA9IGZhbHNlO1xuICBpZiAobm9kZTIubm9kZXMpIG5vZGUyLm5vZGVzLmZvckVhY2goKGkpID0+IGNsZWFuTWFya3MoaSkpO1xuICByZXR1cm4gbm9kZTI7XG59XG5sZXQgcG9zdGNzcyQyID0ge307XG5sZXQgTGF6eVJlc3VsdCQyID0gY2xhc3MgTGF6eVJlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHByb2Nlc3NvcjIsIGNzcywgb3B0cykge1xuICAgIHRoaXMuc3RyaW5naWZpZWQgPSBmYWxzZTtcbiAgICB0aGlzLnByb2Nlc3NlZCA9IGZhbHNlO1xuICAgIGxldCByb290MjtcbiAgICBpZiAodHlwZW9mIGNzcyA9PT0gXCJvYmplY3RcIiAmJiBjc3MgIT09IG51bGwgJiYgKGNzcy50eXBlID09PSBcInJvb3RcIiB8fCBjc3MudHlwZSA9PT0gXCJkb2N1bWVudFwiKSkge1xuICAgICAgcm9vdDIgPSBjbGVhbk1hcmtzKGNzcyk7XG4gICAgfSBlbHNlIGlmIChjc3MgaW5zdGFuY2VvZiBMYXp5UmVzdWx0IHx8IGNzcyBpbnN0YW5jZW9mIFJlc3VsdCQyKSB7XG4gICAgICByb290MiA9IGNsZWFuTWFya3MoY3NzLnJvb3QpO1xuICAgICAgaWYgKGNzcy5tYXApIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzLm1hcCA9PT0gXCJ1bmRlZmluZWRcIikgb3B0cy5tYXAgPSB7fTtcbiAgICAgICAgaWYgKCFvcHRzLm1hcC5pbmxpbmUpIG9wdHMubWFwLmlubGluZSA9IGZhbHNlO1xuICAgICAgICBvcHRzLm1hcC5wcmV2ID0gY3NzLm1hcDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHBhcnNlcjIgPSBwYXJzZSQyO1xuICAgICAgaWYgKG9wdHMuc3ludGF4KSBwYXJzZXIyID0gb3B0cy5zeW50YXgucGFyc2U7XG4gICAgICBpZiAob3B0cy5wYXJzZXIpIHBhcnNlcjIgPSBvcHRzLnBhcnNlcjtcbiAgICAgIGlmIChwYXJzZXIyLnBhcnNlKSBwYXJzZXIyID0gcGFyc2VyMi5wYXJzZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJvb3QyID0gcGFyc2VyMihjc3MsIG9wdHMpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICB9XG4gICAgICBpZiAocm9vdDIgJiYgIXJvb3QyW215XSkge1xuICAgICAgICBDb250YWluZXIkMS5yZWJ1aWxkKHJvb3QyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5yZXN1bHQgPSBuZXcgUmVzdWx0JDIocHJvY2Vzc29yMiwgcm9vdDIsIG9wdHMpO1xuICAgIHRoaXMuaGVscGVycyA9IF9fc3ByZWFkUHJvcHMoX19zcHJlYWRWYWx1ZXMoe30sIHBvc3Rjc3MkMiksIHsgcG9zdGNzczogcG9zdGNzcyQyLCByZXN1bHQ6IHRoaXMucmVzdWx0IH0pO1xuICAgIHRoaXMucGx1Z2lucyA9IHRoaXMucHJvY2Vzc29yLnBsdWdpbnMubWFwKChwbHVnaW4yKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHBsdWdpbjIgPT09IFwib2JqZWN0XCIgJiYgcGx1Z2luMi5wcmVwYXJlKSB7XG4gICAgICAgIHJldHVybiBfX3NwcmVhZFZhbHVlcyhfX3NwcmVhZFZhbHVlcyh7fSwgcGx1Z2luMiksIHBsdWdpbjIucHJlcGFyZSh0aGlzLnJlc3VsdCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHBsdWdpbjI7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgYXN5bmMoKSB7XG4gICAgaWYgKHRoaXMuZXJyb3IpIHJldHVybiBQcm9taXNlLnJlamVjdCh0aGlzLmVycm9yKTtcbiAgICBpZiAodGhpcy5wcm9jZXNzZWQpIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5yZXN1bHQpO1xuICAgIGlmICghdGhpcy5wcm9jZXNzaW5nKSB7XG4gICAgICB0aGlzLnByb2Nlc3NpbmcgPSB0aGlzLnJ1bkFzeW5jKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByb2Nlc3Npbmc7XG4gIH1cbiAgY2F0Y2gob25SZWplY3RlZCkge1xuICAgIHJldHVybiB0aGlzLmFzeW5jKCkuY2F0Y2gob25SZWplY3RlZCk7XG4gIH1cbiAgZmluYWxseShvbkZpbmFsbHkpIHtcbiAgICByZXR1cm4gdGhpcy5hc3luYygpLnRoZW4ob25GaW5hbGx5LCBvbkZpbmFsbHkpO1xuICB9XG4gIGdldEFzeW5jRXJyb3IoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVXNlIHByb2Nlc3MoY3NzKS50aGVuKGNiKSB0byB3b3JrIHdpdGggYXN5bmMgcGx1Z2luc1wiKTtcbiAgfVxuICBoYW5kbGVFcnJvcihlcnJvciwgbm9kZTIpIHtcbiAgICBsZXQgcGx1Z2luMiA9IHRoaXMucmVzdWx0Lmxhc3RQbHVnaW47XG4gICAgdHJ5IHtcbiAgICAgIGlmIChub2RlMikgbm9kZTIuYWRkVG9FcnJvcihlcnJvcik7XG4gICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICBpZiAoZXJyb3IubmFtZSA9PT0gXCJDc3NTeW50YXhFcnJvclwiICYmICFlcnJvci5wbHVnaW4pIHtcbiAgICAgICAgZXJyb3IucGx1Z2luID0gcGx1Z2luMi5wb3N0Y3NzUGx1Z2luO1xuICAgICAgICBlcnJvci5zZXRNZXNzYWdlKCk7XG4gICAgICB9IGVsc2UgaWYgKHBsdWdpbjIucG9zdGNzc1ZlcnNpb24pIHtcbiAgICAgICAgaWYgKHRydWUpIHtcbiAgICAgICAgICBsZXQgcGx1Z2luTmFtZSA9IHBsdWdpbjIucG9zdGNzc1BsdWdpbjtcbiAgICAgICAgICBsZXQgcGx1Z2luVmVyID0gcGx1Z2luMi5wb3N0Y3NzVmVyc2lvbjtcbiAgICAgICAgICBsZXQgcnVudGltZVZlciA9IHRoaXMucmVzdWx0LnByb2Nlc3Nvci52ZXJzaW9uO1xuICAgICAgICAgIGxldCBhID0gcGx1Z2luVmVyLnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICBsZXQgYiA9IHJ1bnRpbWVWZXIuc3BsaXQoXCIuXCIpO1xuICAgICAgICAgIGlmIChhWzBdICE9PSBiWzBdIHx8IHBhcnNlSW50KGFbMV0pID4gcGFyc2VJbnQoYlsxXSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgIFwiVW5rbm93biBlcnJvciBmcm9tIFBvc3RDU1MgcGx1Z2luLiBZb3VyIGN1cnJlbnQgUG9zdENTUyB2ZXJzaW9uIGlzIFwiICsgcnVudGltZVZlciArIFwiLCBidXQgXCIgKyBwbHVnaW5OYW1lICsgXCIgdXNlcyBcIiArIHBsdWdpblZlciArIFwiLiBQZXJoYXBzIHRoaXMgaXMgdGhlIHNvdXJjZSBvZiB0aGUgZXJyb3IgYmVsb3cuXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoY29uc29sZSAmJiBjb25zb2xlLmVycm9yKSBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfVxuICAgIHJldHVybiBlcnJvcjtcbiAgfVxuICBwcmVwYXJlVmlzaXRvcnMoKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcbiAgICBsZXQgYWRkID0gKHBsdWdpbjIsIHR5cGUsIGNiKSA9PiB7XG4gICAgICBpZiAoIXRoaXMubGlzdGVuZXJzW3R5cGVdKSB0aGlzLmxpc3RlbmVyc1t0eXBlXSA9IFtdO1xuICAgICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0ucHVzaChbcGx1Z2luMiwgY2JdKTtcbiAgICB9O1xuICAgIGZvciAobGV0IHBsdWdpbjIgb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICBpZiAodHlwZW9mIHBsdWdpbjIgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgZm9yIChsZXQgZXZlbnQgaW4gcGx1Z2luMikge1xuICAgICAgICAgIGlmICghUExVR0lOX1BST1BTW2V2ZW50XSAmJiAvXltBLVpdLy50ZXN0KGV2ZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgVW5rbm93biBldmVudCAke2V2ZW50fSBpbiAke3BsdWdpbjIucG9zdGNzc1BsdWdpbn0uIFRyeSB0byB1cGRhdGUgUG9zdENTUyAoJHt0aGlzLnByb2Nlc3Nvci52ZXJzaW9ufSBub3cpLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghTk9UX1ZJU0lUT1JTW2V2ZW50XSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwbHVnaW4yW2V2ZW50XSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICBmb3IgKGxldCBmaWx0ZXIgaW4gcGx1Z2luMltldmVudF0pIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyID09PSBcIipcIikge1xuICAgICAgICAgICAgICAgICAgYWRkKHBsdWdpbjIsIGV2ZW50LCBwbHVnaW4yW2V2ZW50XVtmaWx0ZXJdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYWRkKFxuICAgICAgICAgICAgICAgICAgICBwbHVnaW4yLFxuICAgICAgICAgICAgICAgICAgICBldmVudCArIFwiLVwiICsgZmlsdGVyLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgIHBsdWdpbjJbZXZlbnRdW2ZpbHRlcl1cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwbHVnaW4yW2V2ZW50XSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgIGFkZChwbHVnaW4yLCBldmVudCwgcGx1Z2luMltldmVudF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmhhc0xpc3RlbmVyID0gT2JqZWN0LmtleXModGhpcy5saXN0ZW5lcnMpLmxlbmd0aCA+IDA7XG4gIH1cbiAgYXN5bmMgcnVuQXN5bmMoKSB7XG4gICAgdGhpcy5wbHVnaW4gPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wbHVnaW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgcGx1Z2luMiA9IHRoaXMucGx1Z2luc1tpXTtcbiAgICAgIGxldCBwcm9taXNlID0gdGhpcy5ydW5PblJvb3QocGx1Z2luMik7XG4gICAgICBpZiAoaXNQcm9taXNlKHByb21pc2UpKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgcHJvbWlzZTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICB0aHJvdyB0aGlzLmhhbmRsZUVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnByZXBhcmVWaXNpdG9ycygpO1xuICAgIGlmICh0aGlzLmhhc0xpc3RlbmVyKSB7XG4gICAgICBsZXQgcm9vdDIgPSB0aGlzLnJlc3VsdC5yb290O1xuICAgICAgd2hpbGUgKCFyb290Mltpc0NsZWFuXSkge1xuICAgICAgICByb290Mltpc0NsZWFuXSA9IHRydWU7XG4gICAgICAgIGxldCBzdGFjayA9IFt0b1N0YWNrKHJvb3QyKV07XG4gICAgICAgIHdoaWxlIChzdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLnZpc2l0VGljayhzdGFjayk7XG4gICAgICAgICAgaWYgKGlzUHJvbWlzZShwcm9taXNlKSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgYXdhaXQgcHJvbWlzZTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgbGV0IG5vZGUyID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0ubm9kZTtcbiAgICAgICAgICAgICAgdGhyb3cgdGhpcy5oYW5kbGVFcnJvcihlLCBub2RlMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5saXN0ZW5lcnMuT25jZUV4aXQpIHtcbiAgICAgICAgZm9yIChsZXQgW3BsdWdpbjIsIHZpc2l0b3JdIG9mIHRoaXMubGlzdGVuZXJzLk9uY2VFeGl0KSB7XG4gICAgICAgICAgdGhpcy5yZXN1bHQubGFzdFBsdWdpbiA9IHBsdWdpbjI7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyb290Mi50eXBlID09PSBcImRvY3VtZW50XCIpIHtcbiAgICAgICAgICAgICAgbGV0IHJvb3RzID0gcm9vdDIubm9kZXMubWFwKFxuICAgICAgICAgICAgICAgIChzdWJSb290KSA9PiB2aXNpdG9yKHN1YlJvb3QsIHRoaXMuaGVscGVycylcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocm9vdHMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYXdhaXQgdmlzaXRvcihyb290MiwgdGhpcy5oZWxwZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyB0aGlzLmhhbmRsZUVycm9yKGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnByb2Nlc3NlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMuc3RyaW5naWZ5KCk7XG4gIH1cbiAgcnVuT25Sb290KHBsdWdpbjIpIHtcbiAgICB0aGlzLnJlc3VsdC5sYXN0UGx1Z2luID0gcGx1Z2luMjtcbiAgICB0cnkge1xuICAgICAgaWYgKHR5cGVvZiBwbHVnaW4yID09PSBcIm9iamVjdFwiICYmIHBsdWdpbjIuT25jZSkge1xuICAgICAgICBpZiAodGhpcy5yZXN1bHQucm9vdC50eXBlID09PSBcImRvY3VtZW50XCIpIHtcbiAgICAgICAgICBsZXQgcm9vdHMgPSB0aGlzLnJlc3VsdC5yb290Lm5vZGVzLm1hcChcbiAgICAgICAgICAgIChyb290MikgPT4gcGx1Z2luMi5PbmNlKHJvb3QyLCB0aGlzLmhlbHBlcnMpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoaXNQcm9taXNlKHJvb3RzWzBdKSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHJvb3RzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJvb3RzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwbHVnaW4yLk9uY2UodGhpcy5yZXN1bHQucm9vdCwgdGhpcy5oZWxwZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBsdWdpbjIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gcGx1Z2luMih0aGlzLnJlc3VsdC5yb290LCB0aGlzLnJlc3VsdCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfVxuICBzdHJpbmdpZnkoKSB7XG4gICAgaWYgKHRoaXMuZXJyb3IpIHRocm93IHRoaXMuZXJyb3I7XG4gICAgaWYgKHRoaXMuc3RyaW5naWZpZWQpIHJldHVybiB0aGlzLnJlc3VsdDtcbiAgICB0aGlzLnN0cmluZ2lmaWVkID0gdHJ1ZTtcbiAgICB0aGlzLnN5bmMoKTtcbiAgICBsZXQgb3B0cyA9IHRoaXMucmVzdWx0Lm9wdHM7XG4gICAgbGV0IHN0ciA9IHN0cmluZ2lmeSQyO1xuICAgIGlmIChvcHRzLnN5bnRheCkgc3RyID0gb3B0cy5zeW50YXguc3RyaW5naWZ5O1xuICAgIGlmIChvcHRzLnN0cmluZ2lmaWVyKSBzdHIgPSBvcHRzLnN0cmluZ2lmaWVyO1xuICAgIGlmIChzdHIuc3RyaW5naWZ5KSBzdHIgPSBzdHIuc3RyaW5naWZ5O1xuICAgIGxldCBtYXAgPSBuZXcgTWFwR2VuZXJhdG9yJDEoc3RyLCB0aGlzLnJlc3VsdC5yb290LCB0aGlzLnJlc3VsdC5vcHRzKTtcbiAgICBsZXQgZGF0YSA9IG1hcC5nZW5lcmF0ZSgpO1xuICAgIHRoaXMucmVzdWx0LmNzcyA9IGRhdGFbMF07XG4gICAgdGhpcy5yZXN1bHQubWFwID0gZGF0YVsxXTtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XG4gIH1cbiAgc3luYygpIHtcbiAgICBpZiAodGhpcy5lcnJvcikgdGhyb3cgdGhpcy5lcnJvcjtcbiAgICBpZiAodGhpcy5wcm9jZXNzZWQpIHJldHVybiB0aGlzLnJlc3VsdDtcbiAgICB0aGlzLnByb2Nlc3NlZCA9IHRydWU7XG4gICAgaWYgKHRoaXMucHJvY2Vzc2luZykge1xuICAgICAgdGhyb3cgdGhpcy5nZXRBc3luY0Vycm9yKCk7XG4gICAgfVxuICAgIGZvciAobGV0IHBsdWdpbjIgb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICBsZXQgcHJvbWlzZSA9IHRoaXMucnVuT25Sb290KHBsdWdpbjIpO1xuICAgICAgaWYgKGlzUHJvbWlzZShwcm9taXNlKSkge1xuICAgICAgICB0aHJvdyB0aGlzLmdldEFzeW5jRXJyb3IoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wcmVwYXJlVmlzaXRvcnMoKTtcbiAgICBpZiAodGhpcy5oYXNMaXN0ZW5lcikge1xuICAgICAgbGV0IHJvb3QyID0gdGhpcy5yZXN1bHQucm9vdDtcbiAgICAgIHdoaWxlICghcm9vdDJbaXNDbGVhbl0pIHtcbiAgICAgICAgcm9vdDJbaXNDbGVhbl0gPSB0cnVlO1xuICAgICAgICB0aGlzLndhbGtTeW5jKHJvb3QyKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmxpc3RlbmVycy5PbmNlRXhpdCkge1xuICAgICAgICBpZiAocm9vdDIudHlwZSA9PT0gXCJkb2N1bWVudFwiKSB7XG4gICAgICAgICAgZm9yIChsZXQgc3ViUm9vdCBvZiByb290Mi5ub2Rlcykge1xuICAgICAgICAgICAgdGhpcy52aXNpdFN5bmModGhpcy5saXN0ZW5lcnMuT25jZUV4aXQsIHN1YlJvb3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnZpc2l0U3luYyh0aGlzLmxpc3RlbmVycy5PbmNlRXhpdCwgcm9vdDIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlc3VsdDtcbiAgfVxuICB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgaWYgKHRydWUpIHtcbiAgICAgIGlmICghKFwiZnJvbVwiIGluIHRoaXMub3B0cykpIHtcbiAgICAgICAgd2Fybk9uY2UkMShcbiAgICAgICAgICBcIldpdGhvdXQgYGZyb21gIG9wdGlvbiBQb3N0Q1NTIGNvdWxkIGdlbmVyYXRlIHdyb25nIHNvdXJjZSBtYXAgYW5kIHdpbGwgbm90IGZpbmQgQnJvd3NlcnNsaXN0IGNvbmZpZy4gU2V0IGl0IHRvIENTUyBmaWxlIHBhdGggb3IgdG8gYHVuZGVmaW5lZGAgdG8gcHJldmVudCB0aGlzIHdhcm5pbmcuXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYXN5bmMoKS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKTtcbiAgfVxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5jc3M7XG4gIH1cbiAgdmlzaXRTeW5jKHZpc2l0b3JzLCBub2RlMikge1xuICAgIGZvciAobGV0IFtwbHVnaW4yLCB2aXNpdG9yXSBvZiB2aXNpdG9ycykge1xuICAgICAgdGhpcy5yZXN1bHQubGFzdFBsdWdpbiA9IHBsdWdpbjI7XG4gICAgICBsZXQgcHJvbWlzZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHByb21pc2UgPSB2aXNpdG9yKG5vZGUyLCB0aGlzLmhlbHBlcnMpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyB0aGlzLmhhbmRsZUVycm9yKGUsIG5vZGUyLnByb3h5T2YpO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUyLnR5cGUgIT09IFwicm9vdFwiICYmIG5vZGUyLnR5cGUgIT09IFwiZG9jdW1lbnRcIiAmJiAhbm9kZTIucGFyZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKGlzUHJvbWlzZShwcm9taXNlKSkge1xuICAgICAgICB0aHJvdyB0aGlzLmdldEFzeW5jRXJyb3IoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdmlzaXRUaWNrKHN0YWNrKSB7XG4gICAgbGV0IHZpc2l0MiA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgIGxldCB7IG5vZGU6IG5vZGUyLCB2aXNpdG9ycyB9ID0gdmlzaXQyO1xuICAgIGlmIChub2RlMi50eXBlICE9PSBcInJvb3RcIiAmJiBub2RlMi50eXBlICE9PSBcImRvY3VtZW50XCIgJiYgIW5vZGUyLnBhcmVudCkge1xuICAgICAgc3RhY2sucG9wKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh2aXNpdG9ycy5sZW5ndGggPiAwICYmIHZpc2l0Mi52aXNpdG9ySW5kZXggPCB2aXNpdG9ycy5sZW5ndGgpIHtcbiAgICAgIGxldCBbcGx1Z2luMiwgdmlzaXRvcl0gPSB2aXNpdG9yc1t2aXNpdDIudmlzaXRvckluZGV4XTtcbiAgICAgIHZpc2l0Mi52aXNpdG9ySW5kZXggKz0gMTtcbiAgICAgIGlmICh2aXNpdDIudmlzaXRvckluZGV4ID09PSB2aXNpdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgdmlzaXQyLnZpc2l0b3JzID0gW107XG4gICAgICAgIHZpc2l0Mi52aXNpdG9ySW5kZXggPSAwO1xuICAgICAgfVxuICAgICAgdGhpcy5yZXN1bHQubGFzdFBsdWdpbiA9IHBsdWdpbjI7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gdmlzaXRvcihub2RlMi50b1Byb3h5KCksIHRoaXMuaGVscGVycyk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IHRoaXMuaGFuZGxlRXJyb3IoZSwgbm9kZTIpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodmlzaXQyLml0ZXJhdG9yICE9PSAwKSB7XG4gICAgICBsZXQgaXRlcmF0b3IgPSB2aXNpdDIuaXRlcmF0b3I7XG4gICAgICBsZXQgY2hpbGQ7XG4gICAgICB3aGlsZSAoY2hpbGQgPSBub2RlMi5ub2Rlc1tub2RlMi5pbmRleGVzW2l0ZXJhdG9yXV0pIHtcbiAgICAgICAgbm9kZTIuaW5kZXhlc1tpdGVyYXRvcl0gKz0gMTtcbiAgICAgICAgaWYgKCFjaGlsZFtpc0NsZWFuXSkge1xuICAgICAgICAgIGNoaWxkW2lzQ2xlYW5dID0gdHJ1ZTtcbiAgICAgICAgICBzdGFjay5wdXNoKHRvU3RhY2soY2hpbGQpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZpc2l0Mi5pdGVyYXRvciA9IDA7XG4gICAgICBkZWxldGUgbm9kZTIuaW5kZXhlc1tpdGVyYXRvcl07XG4gICAgfVxuICAgIGxldCBldmVudHMgPSB2aXNpdDIuZXZlbnRzO1xuICAgIHdoaWxlICh2aXNpdDIuZXZlbnRJbmRleCA8IGV2ZW50cy5sZW5ndGgpIHtcbiAgICAgIGxldCBldmVudCA9IGV2ZW50c1t2aXNpdDIuZXZlbnRJbmRleF07XG4gICAgICB2aXNpdDIuZXZlbnRJbmRleCArPSAxO1xuICAgICAgaWYgKGV2ZW50ID09PSBDSElMRFJFTikge1xuICAgICAgICBpZiAobm9kZTIubm9kZXMgJiYgbm9kZTIubm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgbm9kZTJbaXNDbGVhbl0gPSB0cnVlO1xuICAgICAgICAgIHZpc2l0Mi5pdGVyYXRvciA9IG5vZGUyLmdldEl0ZXJhdG9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmxpc3RlbmVyc1tldmVudF0pIHtcbiAgICAgICAgdmlzaXQyLnZpc2l0b3JzID0gdGhpcy5saXN0ZW5lcnNbZXZlbnRdO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHN0YWNrLnBvcCgpO1xuICB9XG4gIHdhbGtTeW5jKG5vZGUyKSB7XG4gICAgbm9kZTJbaXNDbGVhbl0gPSB0cnVlO1xuICAgIGxldCBldmVudHMgPSBnZXRFdmVudHMobm9kZTIpO1xuICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgaWYgKGV2ZW50ID09PSBDSElMRFJFTikge1xuICAgICAgICBpZiAobm9kZTIubm9kZXMpIHtcbiAgICAgICAgICBub2RlMi5lYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFjaGlsZFtpc0NsZWFuXSkgdGhpcy53YWxrU3luYyhjaGlsZCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB2aXNpdG9ycyA9IHRoaXMubGlzdGVuZXJzW2V2ZW50XTtcbiAgICAgICAgaWYgKHZpc2l0b3JzKSB7XG4gICAgICAgICAgaWYgKHRoaXMudmlzaXRTeW5jKHZpc2l0b3JzLCBub2RlMi50b1Byb3h5KCkpKSByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgd2FybmluZ3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3luYygpLndhcm5pbmdzKCk7XG4gIH1cbiAgZ2V0IGNvbnRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RyaW5naWZ5KCkuY29udGVudDtcbiAgfVxuICBnZXQgY3NzKCkge1xuICAgIHJldHVybiB0aGlzLnN0cmluZ2lmeSgpLmNzcztcbiAgfVxuICBnZXQgbWFwKCkge1xuICAgIHJldHVybiB0aGlzLnN0cmluZ2lmeSgpLm1hcDtcbiAgfVxuICBnZXQgbWVzc2FnZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3luYygpLm1lc3NhZ2VzO1xuICB9XG4gIGdldCBvcHRzKCkge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdC5vcHRzO1xuICB9XG4gIGdldCBwcm9jZXNzb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0LnByb2Nlc3NvcjtcbiAgfVxuICBnZXQgcm9vdCgpIHtcbiAgICByZXR1cm4gdGhpcy5zeW5jKCkucm9vdDtcbiAgfVxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG4gICAgcmV0dXJuIFwiTGF6eVJlc3VsdFwiO1xuICB9XG59O1xuTGF6eVJlc3VsdCQyLnJlZ2lzdGVyUG9zdGNzcyA9IChkZXBlbmRhbnQpID0+IHtcbiAgcG9zdGNzcyQyID0gZGVwZW5kYW50O1xufTtcbnZhciBsYXp5UmVzdWx0ID0gTGF6eVJlc3VsdCQyO1xuTGF6eVJlc3VsdCQyLmRlZmF1bHQgPSBMYXp5UmVzdWx0JDI7XG5Sb290JDMucmVnaXN0ZXJMYXp5UmVzdWx0KExhenlSZXN1bHQkMik7XG5Eb2N1bWVudCQyLnJlZ2lzdGVyTGF6eVJlc3VsdChMYXp5UmVzdWx0JDIpO1xubGV0IE1hcEdlbmVyYXRvcjIgPSBtYXBHZW5lcmF0b3I7XG5sZXQgc3RyaW5naWZ5JDEgPSBzdHJpbmdpZnlfMTtcbmxldCB3YXJuT25jZTIgPSB3YXJuT25jZSQyO1xubGV0IHBhcnNlJDEgPSBwYXJzZV8xO1xuY29uc3QgUmVzdWx0JDEgPSByZXN1bHQ7XG5sZXQgTm9Xb3JrUmVzdWx0JDEgPSBjbGFzcyBOb1dvcmtSZXN1bHQge1xuICBjb25zdHJ1Y3Rvcihwcm9jZXNzb3IyLCBjc3MsIG9wdHMpIHtcbiAgICBjc3MgPSBjc3MudG9TdHJpbmcoKTtcbiAgICB0aGlzLnN0cmluZ2lmaWVkID0gZmFsc2U7XG4gICAgdGhpcy5fcHJvY2Vzc29yID0gcHJvY2Vzc29yMjtcbiAgICB0aGlzLl9jc3MgPSBjc3M7XG4gICAgdGhpcy5fb3B0cyA9IG9wdHM7XG4gICAgdGhpcy5fbWFwID0gdm9pZCAwO1xuICAgIGxldCByb290MjtcbiAgICBsZXQgc3RyID0gc3RyaW5naWZ5JDE7XG4gICAgdGhpcy5yZXN1bHQgPSBuZXcgUmVzdWx0JDEodGhpcy5fcHJvY2Vzc29yLCByb290MiwgdGhpcy5fb3B0cyk7XG4gICAgdGhpcy5yZXN1bHQuY3NzID0gY3NzO1xuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5yZXN1bHQsIFwicm9vdFwiLCB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiBzZWxmLnJvb3Q7XG4gICAgICB9XG4gICAgfSk7XG4gICAgbGV0IG1hcCA9IG5ldyBNYXBHZW5lcmF0b3IyKHN0ciwgcm9vdDIsIHRoaXMuX29wdHMsIGNzcyk7XG4gICAgaWYgKG1hcC5pc01hcCgpKSB7XG4gICAgICBsZXQgW2dlbmVyYXRlZENTUywgZ2VuZXJhdGVkTWFwXSA9IG1hcC5nZW5lcmF0ZSgpO1xuICAgICAgaWYgKGdlbmVyYXRlZENTUykge1xuICAgICAgICB0aGlzLnJlc3VsdC5jc3MgPSBnZW5lcmF0ZWRDU1M7XG4gICAgICB9XG4gICAgICBpZiAoZ2VuZXJhdGVkTWFwKSB7XG4gICAgICAgIHRoaXMucmVzdWx0Lm1hcCA9IGdlbmVyYXRlZE1hcDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbWFwLmNsZWFyQW5ub3RhdGlvbigpO1xuICAgICAgdGhpcy5yZXN1bHQuY3NzID0gbWFwLmNzcztcbiAgICB9XG4gIH1cbiAgYXN5bmMoKSB7XG4gICAgaWYgKHRoaXMuZXJyb3IpIHJldHVybiBQcm9taXNlLnJlamVjdCh0aGlzLmVycm9yKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMucmVzdWx0KTtcbiAgfVxuICBjYXRjaChvblJlamVjdGVkKSB7XG4gICAgcmV0dXJuIHRoaXMuYXN5bmMoKS5jYXRjaChvblJlamVjdGVkKTtcbiAgfVxuICBmaW5hbGx5KG9uRmluYWxseSkge1xuICAgIHJldHVybiB0aGlzLmFzeW5jKCkudGhlbihvbkZpbmFsbHksIG9uRmluYWxseSk7XG4gIH1cbiAgc3luYygpIHtcbiAgICBpZiAodGhpcy5lcnJvcikgdGhyb3cgdGhpcy5lcnJvcjtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XG4gIH1cbiAgdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgIGlmICh0cnVlKSB7XG4gICAgICBpZiAoIShcImZyb21cIiBpbiB0aGlzLl9vcHRzKSkge1xuICAgICAgICB3YXJuT25jZTIoXG4gICAgICAgICAgXCJXaXRob3V0IGBmcm9tYCBvcHRpb24gUG9zdENTUyBjb3VsZCBnZW5lcmF0ZSB3cm9uZyBzb3VyY2UgbWFwIGFuZCB3aWxsIG5vdCBmaW5kIEJyb3dzZXJzbGlzdCBjb25maWcuIFNldCBpdCB0byBDU1MgZmlsZSBwYXRoIG9yIHRvIGB1bmRlZmluZWRgIHRvIHByZXZlbnQgdGhpcyB3YXJuaW5nLlwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFzeW5jKCkudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCk7XG4gIH1cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NzcztcbiAgfVxuICB3YXJuaW5ncygpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgZ2V0IGNvbnRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0LmNzcztcbiAgfVxuICBnZXQgY3NzKCkge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdC5jc3M7XG4gIH1cbiAgZ2V0IG1hcCgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQubWFwO1xuICB9XG4gIGdldCBtZXNzYWdlcygpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgZ2V0IG9wdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0Lm9wdHM7XG4gIH1cbiAgZ2V0IHByb2Nlc3NvcigpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQucHJvY2Vzc29yO1xuICB9XG4gIGdldCByb290KCkge1xuICAgIGlmICh0aGlzLl9yb290KSB7XG4gICAgICByZXR1cm4gdGhpcy5fcm9vdDtcbiAgICB9XG4gICAgbGV0IHJvb3QyO1xuICAgIGxldCBwYXJzZXIyID0gcGFyc2UkMTtcbiAgICB0cnkge1xuICAgICAgcm9vdDIgPSBwYXJzZXIyKHRoaXMuX2NzcywgdGhpcy5fb3B0cyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICB9XG4gICAgaWYgKHRoaXMuZXJyb3IpIHtcbiAgICAgIHRocm93IHRoaXMuZXJyb3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Jvb3QgPSByb290MjtcbiAgICAgIHJldHVybiByb290MjtcbiAgICB9XG4gIH1cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiBcIk5vV29ya1Jlc3VsdFwiO1xuICB9XG59O1xudmFyIG5vV29ya1Jlc3VsdCA9IE5vV29ya1Jlc3VsdCQxO1xuTm9Xb3JrUmVzdWx0JDEuZGVmYXVsdCA9IE5vV29ya1Jlc3VsdCQxO1xubGV0IE5vV29ya1Jlc3VsdDIgPSBub1dvcmtSZXN1bHQ7XG5sZXQgTGF6eVJlc3VsdCQxID0gbGF6eVJlc3VsdDtcbmxldCBEb2N1bWVudCQxID0gZG9jdW1lbnQkMTtcbmxldCBSb290JDIgPSByb290O1xubGV0IFByb2Nlc3NvciQxID0gY2xhc3MgUHJvY2Vzc29yIHtcbiAgY29uc3RydWN0b3IocGx1Z2lucyA9IFtdKSB7XG4gICAgdGhpcy52ZXJzaW9uID0gXCI4LjQuMzhcIjtcbiAgICB0aGlzLnBsdWdpbnMgPSB0aGlzLm5vcm1hbGl6ZShwbHVnaW5zKTtcbiAgfVxuICBub3JtYWxpemUocGx1Z2lucykge1xuICAgIGxldCBub3JtYWxpemVkID0gW107XG4gICAgZm9yIChsZXQgaSBvZiBwbHVnaW5zKSB7XG4gICAgICBpZiAoaS5wb3N0Y3NzID09PSB0cnVlKSB7XG4gICAgICAgIGkgPSBpKCk7XG4gICAgICB9IGVsc2UgaWYgKGkucG9zdGNzcykge1xuICAgICAgICBpID0gaS5wb3N0Y3NzO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBpID09PSBcIm9iamVjdFwiICYmIEFycmF5LmlzQXJyYXkoaS5wbHVnaW5zKSkge1xuICAgICAgICBub3JtYWxpemVkID0gbm9ybWFsaXplZC5jb25jYXQoaS5wbHVnaW5zKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGkgPT09IFwib2JqZWN0XCIgJiYgaS5wb3N0Y3NzUGx1Z2luKSB7XG4gICAgICAgIG5vcm1hbGl6ZWQucHVzaChpKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGkgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBub3JtYWxpemVkLnB1c2goaSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpID09PSBcIm9iamVjdFwiICYmIChpLnBhcnNlIHx8IGkuc3RyaW5naWZ5KSkge1xuICAgICAgICBpZiAodHJ1ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIFwiUG9zdENTUyBzeW50YXhlcyBjYW5ub3QgYmUgdXNlZCBhcyBwbHVnaW5zLiBJbnN0ZWFkLCBwbGVhc2UgdXNlIG9uZSBvZiB0aGUgc3ludGF4L3BhcnNlci9zdHJpbmdpZmllciBvcHRpb25zIGFzIG91dGxpbmVkIGluIHlvdXIgUG9zdENTUyBydW5uZXIgZG9jdW1lbnRhdGlvbi5cIlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihpICsgXCIgaXMgbm90IGEgUG9zdENTUyBwbHVnaW5cIik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub3JtYWxpemVkO1xuICB9XG4gIHByb2Nlc3MoY3NzLCBvcHRzID0ge30pIHtcbiAgICBpZiAoIXRoaXMucGx1Z2lucy5sZW5ndGggJiYgIW9wdHMucGFyc2VyICYmICFvcHRzLnN0cmluZ2lmaWVyICYmICFvcHRzLnN5bnRheCkge1xuICAgICAgcmV0dXJuIG5ldyBOb1dvcmtSZXN1bHQyKHRoaXMsIGNzcywgb3B0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgTGF6eVJlc3VsdCQxKHRoaXMsIGNzcywgb3B0cyk7XG4gICAgfVxuICB9XG4gIHVzZShwbHVnaW4yKSB7XG4gICAgdGhpcy5wbHVnaW5zID0gdGhpcy5wbHVnaW5zLmNvbmNhdCh0aGlzLm5vcm1hbGl6ZShbcGx1Z2luMl0pKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufTtcbnZhciBwcm9jZXNzb3IgPSBQcm9jZXNzb3IkMTtcblByb2Nlc3NvciQxLmRlZmF1bHQgPSBQcm9jZXNzb3IkMTtcblJvb3QkMi5yZWdpc3RlclByb2Nlc3NvcihQcm9jZXNzb3IkMSk7XG5Eb2N1bWVudCQxLnJlZ2lzdGVyUHJvY2Vzc29yKFByb2Nlc3NvciQxKTtcbmxldCBEZWNsYXJhdGlvbiQxID0gZGVjbGFyYXRpb247XG5sZXQgUHJldmlvdXNNYXAyID0gcHJldmlvdXNNYXA7XG5sZXQgQ29tbWVudCQxID0gY29tbWVudDtcbmxldCBBdFJ1bGUkMSA9IGF0UnVsZTtcbmxldCBJbnB1dCQxID0gaW5wdXQ7XG5sZXQgUm9vdCQxID0gcm9vdDtcbmxldCBSdWxlJDEgPSBydWxlO1xuZnVuY3Rpb24gZnJvbUpTT04kMShqc29uLCBpbnB1dHMpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoanNvbikpIHJldHVybiBqc29uLm1hcCgobikgPT4gZnJvbUpTT04kMShuKSk7XG4gIGxldCBfYSA9IGpzb24sIHsgaW5wdXRzOiBvd25JbnB1dHMgfSA9IF9hLCBkZWZhdWx0cyA9IF9fb2JqUmVzdChfYSwgW1wiaW5wdXRzXCJdKTtcbiAgaWYgKG93bklucHV0cykge1xuICAgIGlucHV0cyA9IFtdO1xuICAgIGZvciAobGV0IGlucHV0MiBvZiBvd25JbnB1dHMpIHtcbiAgICAgIGxldCBpbnB1dEh5ZHJhdGVkID0gX19zcHJlYWRQcm9wcyhfX3NwcmVhZFZhbHVlcyh7fSwgaW5wdXQyKSwgeyBfX3Byb3RvX186IElucHV0JDEucHJvdG90eXBlIH0pO1xuICAgICAgaWYgKGlucHV0SHlkcmF0ZWQubWFwKSB7XG4gICAgICAgIGlucHV0SHlkcmF0ZWQubWFwID0gX19zcHJlYWRQcm9wcyhfX3NwcmVhZFZhbHVlcyh7fSwgaW5wdXRIeWRyYXRlZC5tYXApLCB7XG4gICAgICAgICAgX19wcm90b19fOiBQcmV2aW91c01hcDIucHJvdG90eXBlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaW5wdXRzLnB1c2goaW5wdXRIeWRyYXRlZCk7XG4gICAgfVxuICB9XG4gIGlmIChkZWZhdWx0cy5ub2Rlcykge1xuICAgIGRlZmF1bHRzLm5vZGVzID0ganNvbi5ub2Rlcy5tYXAoKG4pID0+IGZyb21KU09OJDEobiwgaW5wdXRzKSk7XG4gIH1cbiAgaWYgKGRlZmF1bHRzLnNvdXJjZSkge1xuICAgIGxldCBfYiA9IGRlZmF1bHRzLnNvdXJjZSwgeyBpbnB1dElkIH0gPSBfYiwgc291cmNlID0gX19vYmpSZXN0KF9iLCBbXCJpbnB1dElkXCJdKTtcbiAgICBkZWZhdWx0cy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgaWYgKGlucHV0SWQgIT0gbnVsbCkge1xuICAgICAgZGVmYXVsdHMuc291cmNlLmlucHV0ID0gaW5wdXRzW2lucHV0SWRdO1xuICAgIH1cbiAgfVxuICBpZiAoZGVmYXVsdHMudHlwZSA9PT0gXCJyb290XCIpIHtcbiAgICByZXR1cm4gbmV3IFJvb3QkMShkZWZhdWx0cyk7XG4gIH0gZWxzZSBpZiAoZGVmYXVsdHMudHlwZSA9PT0gXCJkZWNsXCIpIHtcbiAgICByZXR1cm4gbmV3IERlY2xhcmF0aW9uJDEoZGVmYXVsdHMpO1xuICB9IGVsc2UgaWYgKGRlZmF1bHRzLnR5cGUgPT09IFwicnVsZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBSdWxlJDEoZGVmYXVsdHMpO1xuICB9IGVsc2UgaWYgKGRlZmF1bHRzLnR5cGUgPT09IFwiY29tbWVudFwiKSB7XG4gICAgcmV0dXJuIG5ldyBDb21tZW50JDEoZGVmYXVsdHMpO1xuICB9IGVsc2UgaWYgKGRlZmF1bHRzLnR5cGUgPT09IFwiYXRydWxlXCIpIHtcbiAgICByZXR1cm4gbmV3IEF0UnVsZSQxKGRlZmF1bHRzKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIG5vZGUgdHlwZTogXCIgKyBqc29uLnR5cGUpO1xuICB9XG59XG52YXIgZnJvbUpTT05fMSA9IGZyb21KU09OJDE7XG5mcm9tSlNPTiQxLmRlZmF1bHQgPSBmcm9tSlNPTiQxO1xubGV0IENzc1N5bnRheEVycm9yMiA9IGNzc1N5bnRheEVycm9yO1xubGV0IERlY2xhcmF0aW9uMiA9IGRlY2xhcmF0aW9uO1xubGV0IExhenlSZXN1bHQyID0gbGF6eVJlc3VsdDtcbmxldCBDb250YWluZXIyID0gY29udGFpbmVyO1xubGV0IFByb2Nlc3NvcjIgPSBwcm9jZXNzb3I7XG5sZXQgc3RyaW5naWZ5ID0gc3RyaW5naWZ5XzE7XG5sZXQgZnJvbUpTT04gPSBmcm9tSlNPTl8xO1xubGV0IERvY3VtZW50MiA9IGRvY3VtZW50JDE7XG5sZXQgV2FybmluZzIgPSB3YXJuaW5nO1xubGV0IENvbW1lbnQyID0gY29tbWVudDtcbmxldCBBdFJ1bGUyID0gYXRSdWxlO1xubGV0IFJlc3VsdDIgPSByZXN1bHQ7XG5sZXQgSW5wdXQyID0gaW5wdXQ7XG5sZXQgcGFyc2UgPSBwYXJzZV8xO1xubGV0IGxpc3QgPSBsaXN0XzE7XG5sZXQgUnVsZTIgPSBydWxlO1xubGV0IFJvb3QyID0gcm9vdDtcbmxldCBOb2RlMiA9IG5vZGU7XG5mdW5jdGlvbiBwb3N0Y3NzKC4uLnBsdWdpbnMpIHtcbiAgaWYgKHBsdWdpbnMubGVuZ3RoID09PSAxICYmIEFycmF5LmlzQXJyYXkocGx1Z2luc1swXSkpIHtcbiAgICBwbHVnaW5zID0gcGx1Z2luc1swXTtcbiAgfVxuICByZXR1cm4gbmV3IFByb2Nlc3NvcjIocGx1Z2lucyk7XG59XG5wb3N0Y3NzLnBsdWdpbiA9IGZ1bmN0aW9uIHBsdWdpbihuYW1lLCBpbml0aWFsaXplcikge1xuICBsZXQgd2FybmluZ1ByaW50ZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gY3JlYXRvciguLi5hcmdzKSB7XG4gICAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuICYmICF3YXJuaW5nUHJpbnRlZCkge1xuICAgICAgd2FybmluZ1ByaW50ZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBuYW1lICsgXCI6IHBvc3Rjc3MucGx1Z2luIHdhcyBkZXByZWNhdGVkLiBNaWdyYXRpb24gZ3VpZGU6XFxuaHR0cHM6Ly9ldmlsbWFydGlhbnMuY29tL2Nocm9uaWNsZXMvcG9zdGNzcy04LXBsdWdpbi1taWdyYXRpb25cIlxuICAgICAgKTtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5MQU5HICYmIHByb2Nlc3MuZW52LkxBTkcuc3RhcnRzV2l0aChcImNuXCIpKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBuYW1lICsgXCI6IFxcdTkxQ0NcXHU5NzYyIHBvc3Rjc3MucGx1Z2luIFxcdTg4QUJcXHU1RjAzXFx1NzUyOC4gXFx1OEZDMVxcdTc5RkJcXHU2MzA3XFx1NTM1NzpcXG5odHRwczovL3d3dy53M2N0ZWNoLmNvbS90b3BpYy8yMjI2XCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHRyYW5zZm9ybWVyID0gaW5pdGlhbGl6ZXIoLi4uYXJncyk7XG4gICAgdHJhbnNmb3JtZXIucG9zdGNzc1BsdWdpbiA9IG5hbWU7XG4gICAgdHJhbnNmb3JtZXIucG9zdGNzc1ZlcnNpb24gPSBuZXcgUHJvY2Vzc29yMigpLnZlcnNpb247XG4gICAgcmV0dXJuIHRyYW5zZm9ybWVyO1xuICB9XG4gIGxldCBjYWNoZTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNyZWF0b3IsIFwicG9zdGNzc1wiLCB7XG4gICAgZ2V0KCkge1xuICAgICAgaWYgKCFjYWNoZSkgY2FjaGUgPSBjcmVhdG9yKCk7XG4gICAgICByZXR1cm4gY2FjaGU7XG4gICAgfVxuICB9KTtcbiAgY3JlYXRvci5wcm9jZXNzID0gZnVuY3Rpb24oY3NzLCBwcm9jZXNzT3B0cywgcGx1Z2luT3B0cykge1xuICAgIHJldHVybiBwb3N0Y3NzKFtjcmVhdG9yKHBsdWdpbk9wdHMpXSkucHJvY2Vzcyhjc3MsIHByb2Nlc3NPcHRzKTtcbiAgfTtcbiAgcmV0dXJuIGNyZWF0b3I7XG59O1xucG9zdGNzcy5zdHJpbmdpZnkgPSBzdHJpbmdpZnk7XG5wb3N0Y3NzLnBhcnNlID0gcGFyc2U7XG5wb3N0Y3NzLmZyb21KU09OID0gZnJvbUpTT047XG5wb3N0Y3NzLmxpc3QgPSBsaXN0O1xucG9zdGNzcy5jb21tZW50ID0gKGRlZmF1bHRzKSA9PiBuZXcgQ29tbWVudDIoZGVmYXVsdHMpO1xucG9zdGNzcy5hdFJ1bGUgPSAoZGVmYXVsdHMpID0+IG5ldyBBdFJ1bGUyKGRlZmF1bHRzKTtcbnBvc3Rjc3MuZGVjbCA9IChkZWZhdWx0cykgPT4gbmV3IERlY2xhcmF0aW9uMihkZWZhdWx0cyk7XG5wb3N0Y3NzLnJ1bGUgPSAoZGVmYXVsdHMpID0+IG5ldyBSdWxlMihkZWZhdWx0cyk7XG5wb3N0Y3NzLnJvb3QgPSAoZGVmYXVsdHMpID0+IG5ldyBSb290MihkZWZhdWx0cyk7XG5wb3N0Y3NzLmRvY3VtZW50ID0gKGRlZmF1bHRzKSA9PiBuZXcgRG9jdW1lbnQyKGRlZmF1bHRzKTtcbnBvc3Rjc3MuQ3NzU3ludGF4RXJyb3IgPSBDc3NTeW50YXhFcnJvcjI7XG5wb3N0Y3NzLkRlY2xhcmF0aW9uID0gRGVjbGFyYXRpb24yO1xucG9zdGNzcy5Db250YWluZXIgPSBDb250YWluZXIyO1xucG9zdGNzcy5Qcm9jZXNzb3IgPSBQcm9jZXNzb3IyO1xucG9zdGNzcy5Eb2N1bWVudCA9IERvY3VtZW50MjtcbnBvc3Rjc3MuQ29tbWVudCA9IENvbW1lbnQyO1xucG9zdGNzcy5XYXJuaW5nID0gV2FybmluZzI7XG5wb3N0Y3NzLkF0UnVsZSA9IEF0UnVsZTI7XG5wb3N0Y3NzLlJlc3VsdCA9IFJlc3VsdDI7XG5wb3N0Y3NzLklucHV0ID0gSW5wdXQyO1xucG9zdGNzcy5SdWxlID0gUnVsZTI7XG5wb3N0Y3NzLlJvb3QgPSBSb290MjtcbnBvc3Rjc3MuTm9kZSA9IE5vZGUyO1xuTGF6eVJlc3VsdDIucmVnaXN0ZXJQb3N0Y3NzKHBvc3Rjc3MpO1xudmFyIHBvc3Rjc3NfMSA9IHBvc3Rjc3M7XG5wb3N0Y3NzLmRlZmF1bHQgPSBwb3N0Y3NzO1xuY29uc3QgcG9zdGNzcyQxID0gLyogQF9fUFVSRV9fICovIGdldERlZmF1bHRFeHBvcnRGcm9tQ2pzKHBvc3Rjc3NfMSk7XG5wb3N0Y3NzJDEuc3RyaW5naWZ5O1xucG9zdGNzcyQxLmZyb21KU09OO1xucG9zdGNzcyQxLnBsdWdpbjtcbnBvc3Rjc3MkMS5wYXJzZTtcbnBvc3Rjc3MkMS5saXN0O1xucG9zdGNzcyQxLmRvY3VtZW50O1xucG9zdGNzcyQxLmNvbW1lbnQ7XG5wb3N0Y3NzJDEuYXRSdWxlO1xucG9zdGNzcyQxLnJ1bGU7XG5wb3N0Y3NzJDEuZGVjbDtcbnBvc3Rjc3MkMS5yb290O1xucG9zdGNzcyQxLkNzc1N5bnRheEVycm9yO1xucG9zdGNzcyQxLkRlY2xhcmF0aW9uO1xucG9zdGNzcyQxLkNvbnRhaW5lcjtcbnBvc3Rjc3MkMS5Qcm9jZXNzb3I7XG5wb3N0Y3NzJDEuRG9jdW1lbnQ7XG5wb3N0Y3NzJDEuQ29tbWVudDtcbnBvc3Rjc3MkMS5XYXJuaW5nO1xucG9zdGNzcyQxLkF0UnVsZTtcbnBvc3Rjc3MkMS5SZXN1bHQ7XG5wb3N0Y3NzJDEuSW5wdXQ7XG5wb3N0Y3NzJDEuUnVsZTtcbnBvc3Rjc3MkMS5Sb290O1xucG9zdGNzcyQxLk5vZGU7XG5jb25zdCB0YWdNYXAgPSB7XG4gIHNjcmlwdDogXCJub3NjcmlwdFwiLFxuICAvLyBjYW1lbCBjYXNlIHN2ZyBlbGVtZW50IHRhZyBuYW1lc1xuICBhbHRnbHlwaDogXCJhbHRHbHlwaFwiLFxuICBhbHRnbHlwaGRlZjogXCJhbHRHbHlwaERlZlwiLFxuICBhbHRnbHlwaGl0ZW06IFwiYWx0R2x5cGhJdGVtXCIsXG4gIGFuaW1hdGVjb2xvcjogXCJhbmltYXRlQ29sb3JcIixcbiAgYW5pbWF0ZW1vdGlvbjogXCJhbmltYXRlTW90aW9uXCIsXG4gIGFuaW1hdGV0cmFuc2Zvcm06IFwiYW5pbWF0ZVRyYW5zZm9ybVwiLFxuICBjbGlwcGF0aDogXCJjbGlwUGF0aFwiLFxuICBmZWJsZW5kOiBcImZlQmxlbmRcIixcbiAgZmVjb2xvcm1hdHJpeDogXCJmZUNvbG9yTWF0cml4XCIsXG4gIGZlY29tcG9uZW50dHJhbnNmZXI6IFwiZmVDb21wb25lbnRUcmFuc2ZlclwiLFxuICBmZWNvbXBvc2l0ZTogXCJmZUNvbXBvc2l0ZVwiLFxuICBmZWNvbnZvbHZlbWF0cml4OiBcImZlQ29udm9sdmVNYXRyaXhcIixcbiAgZmVkaWZmdXNlbGlnaHRpbmc6IFwiZmVEaWZmdXNlTGlnaHRpbmdcIixcbiAgZmVkaXNwbGFjZW1lbnRtYXA6IFwiZmVEaXNwbGFjZW1lbnRNYXBcIixcbiAgZmVkaXN0YW50bGlnaHQ6IFwiZmVEaXN0YW50TGlnaHRcIixcbiAgZmVkcm9wc2hhZG93OiBcImZlRHJvcFNoYWRvd1wiLFxuICBmZWZsb29kOiBcImZlRmxvb2RcIixcbiAgZmVmdW5jYTogXCJmZUZ1bmNBXCIsXG4gIGZlZnVuY2I6IFwiZmVGdW5jQlwiLFxuICBmZWZ1bmNnOiBcImZlRnVuY0dcIixcbiAgZmVmdW5jcjogXCJmZUZ1bmNSXCIsXG4gIGZlZ2F1c3NpYW5ibHVyOiBcImZlR2F1c3NpYW5CbHVyXCIsXG4gIGZlaW1hZ2U6IFwiZmVJbWFnZVwiLFxuICBmZW1lcmdlOiBcImZlTWVyZ2VcIixcbiAgZmVtZXJnZW5vZGU6IFwiZmVNZXJnZU5vZGVcIixcbiAgZmVtb3JwaG9sb2d5OiBcImZlTW9ycGhvbG9neVwiLFxuICBmZW9mZnNldDogXCJmZU9mZnNldFwiLFxuICBmZXBvaW50bGlnaHQ6IFwiZmVQb2ludExpZ2h0XCIsXG4gIGZlc3BlY3VsYXJsaWdodGluZzogXCJmZVNwZWN1bGFyTGlnaHRpbmdcIixcbiAgZmVzcG90bGlnaHQ6IFwiZmVTcG90TGlnaHRcIixcbiAgZmV0aWxlOiBcImZlVGlsZVwiLFxuICBmZXR1cmJ1bGVuY2U6IFwiZmVUdXJidWxlbmNlXCIsXG4gIGZvcmVpZ25vYmplY3Q6IFwiZm9yZWlnbk9iamVjdFwiLFxuICBnbHlwaHJlZjogXCJnbHlwaFJlZlwiLFxuICBsaW5lYXJncmFkaWVudDogXCJsaW5lYXJHcmFkaWVudFwiLFxuICByYWRpYWxncmFkaWVudDogXCJyYWRpYWxHcmFkaWVudFwiXG59O1xuZnVuY3Rpb24gZ2V0VGFnTmFtZShuKSB7XG4gIGxldCB0YWdOYW1lID0gdGFnTWFwW24udGFnTmFtZV0gPyB0YWdNYXBbbi50YWdOYW1lXSA6IG4udGFnTmFtZTtcbiAgaWYgKHRhZ05hbWUgPT09IFwibGlua1wiICYmIG4uYXR0cmlidXRlcy5fY3NzVGV4dCkge1xuICAgIHRhZ05hbWUgPSBcInN0eWxlXCI7XG4gIH1cbiAgcmV0dXJuIHRhZ05hbWU7XG59XG5mdW5jdGlvbiBhZGFwdENzc0ZvclJlcGxheShjc3NUZXh0LCBjYWNoZSkge1xuICBjb25zdCBjYWNoZWRTdHlsZSA9IGNhY2hlID09IG51bGwgPyB2b2lkIDAgOiBjYWNoZS5zdHlsZXNXaXRoSG92ZXJDbGFzcy5nZXQoY3NzVGV4dCk7XG4gIGlmIChjYWNoZWRTdHlsZSkgcmV0dXJuIGNhY2hlZFN0eWxlO1xuICBsZXQgcmVzdWx0MiA9IGNzc1RleHQ7XG4gIHRyeSB7XG4gICAgY29uc3QgYXN0ID0gcG9zdGNzcyQxKFtcbiAgICAgIG1lZGlhU2VsZWN0b3JQbHVnaW4sXG4gICAgICBwc2V1ZG9DbGFzc1BsdWdpblxuICAgIF0pLnByb2Nlc3MoY3NzVGV4dCk7XG4gICAgcmVzdWx0MiA9IGFzdC5jc3M7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS53YXJuKFwiRmFpbGVkIHRvIGFkYXB0IGNzcyBmb3IgcmVwbGF5XCIsIGVycm9yKTtcbiAgfVxuICBjYWNoZSA9PSBudWxsID8gdm9pZCAwIDogY2FjaGUuc3R5bGVzV2l0aEhvdmVyQ2xhc3Muc2V0KGNzc1RleHQsIHJlc3VsdDIpO1xuICByZXR1cm4gcmVzdWx0Mjtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUNhY2hlKCkge1xuICBjb25zdCBzdHlsZXNXaXRoSG92ZXJDbGFzcyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gIHJldHVybiB7XG4gICAgc3R5bGVzV2l0aEhvdmVyQ2xhc3NcbiAgfTtcbn1cbmZ1bmN0aW9uIGFwcGx5Q3NzU3BsaXRzKG4sIGNzc1RleHQsIGhhY2tDc3MsIGNhY2hlKSB7XG4gIGNvbnN0IGNoaWxkVGV4dE5vZGVzID0gW107XG4gIGZvciAoY29uc3Qgc2NuIG9mIG4uY2hpbGROb2Rlcykge1xuICAgIGlmIChzY24udHlwZSA9PT0gTm9kZVR5cGUuVGV4dCkge1xuICAgICAgY2hpbGRUZXh0Tm9kZXMucHVzaChzY24pO1xuICAgIH1cbiAgfVxuICBjb25zdCBjc3NUZXh0U3BsaXRzID0gY3NzVGV4dC5zcGxpdChcIi8qIHJyX3NwbGl0ICovXCIpO1xuICB3aGlsZSAoY3NzVGV4dFNwbGl0cy5sZW5ndGggPiAxICYmIGNzc1RleHRTcGxpdHMubGVuZ3RoID4gY2hpbGRUZXh0Tm9kZXMubGVuZ3RoKSB7XG4gICAgY3NzVGV4dFNwbGl0cy5zcGxpY2UoLTIsIDIsIGNzc1RleHRTcGxpdHMuc2xpY2UoLTIpLmpvaW4oXCJcIikpO1xuICB9XG4gIGxldCBhZGFwdGVkQ3NzID0gXCJcIjtcbiAgaWYgKGhhY2tDc3MpIHtcbiAgICBhZGFwdGVkQ3NzID0gYWRhcHRDc3NGb3JSZXBsYXkoY3NzVGV4dFNwbGl0cy5qb2luKFwiXCIpLCBjYWNoZSk7XG4gIH1cbiAgbGV0IHN0YXJ0SW5kZXggPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkVGV4dE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGkgPT09IGNzc1RleHRTcGxpdHMubGVuZ3RoKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY29uc3QgY2hpbGRUZXh0Tm9kZSA9IGNoaWxkVGV4dE5vZGVzW2ldO1xuICAgIGlmICghaGFja0Nzcykge1xuICAgICAgY2hpbGRUZXh0Tm9kZS50ZXh0Q29udGVudCA9IGNzc1RleHRTcGxpdHNbaV07XG4gICAgfSBlbHNlIGlmIChpIDwgY3NzVGV4dFNwbGl0cy5sZW5ndGggLSAxKSB7XG4gICAgICBsZXQgZW5kSW5kZXggPSBzdGFydEluZGV4O1xuICAgICAgbGV0IGVuZFNlYXJjaCA9IGNzc1RleHRTcGxpdHNbaSArIDFdLmxlbmd0aDtcbiAgICAgIGVuZFNlYXJjaCA9IE1hdGgubWluKGVuZFNlYXJjaCwgMzApO1xuICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICBmb3IgKDsgZW5kU2VhcmNoID4gMjsgZW5kU2VhcmNoLS0pIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoQml0ID0gY3NzVGV4dFNwbGl0c1tpICsgMV0uc3Vic3RyaW5nKDAsIGVuZFNlYXJjaCk7XG4gICAgICAgIGNvbnN0IHNlYXJjaEluZGV4ID0gYWRhcHRlZENzcy5zdWJzdHJpbmcoc3RhcnRJbmRleCkuaW5kZXhPZihzZWFyY2hCaXQpO1xuICAgICAgICBmb3VuZCA9IHNlYXJjaEluZGV4ICE9PSAtMTtcbiAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgZW5kSW5kZXggKz0gc2VhcmNoSW5kZXg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgZW5kSW5kZXggKz0gY3NzVGV4dFNwbGl0c1tpXS5sZW5ndGg7XG4gICAgICB9XG4gICAgICBjaGlsZFRleHROb2RlLnRleHRDb250ZW50ID0gYWRhcHRlZENzcy5zdWJzdHJpbmcoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuICAgICAgc3RhcnRJbmRleCA9IGVuZEluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGlsZFRleHROb2RlLnRleHRDb250ZW50ID0gYWRhcHRlZENzcy5zdWJzdHJpbmcoc3RhcnRJbmRleCk7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBidWlsZFN0eWxlTm9kZShuLCBzdHlsZUVsLCBjc3NUZXh0LCBvcHRpb25zKSB7XG4gIGNvbnN0IHsgZG9jLCBoYWNrQ3NzLCBjYWNoZSB9ID0gb3B0aW9ucztcbiAgaWYgKG4uY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICBhcHBseUNzc1NwbGl0cyhuLCBjc3NUZXh0LCBoYWNrQ3NzLCBjYWNoZSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGhhY2tDc3MpIHtcbiAgICAgIGNzc1RleHQgPSBhZGFwdENzc0ZvclJlcGxheShjc3NUZXh0LCBjYWNoZSk7XG4gICAgfVxuICAgIHN0eWxlRWwuYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZVRleHROb2RlKGNzc1RleHQpKTtcbiAgfVxufVxuZnVuY3Rpb24gYnVpbGROb2RlKG4sIG9wdGlvbnMpIHtcbiAgdmFyIF9hLCBfYjtcbiAgY29uc3QgeyBkb2MsIGhhY2tDc3MsIGNhY2hlIH0gPSBvcHRpb25zO1xuICBzd2l0Y2ggKG4udHlwZSkge1xuICAgIGNhc2UgTm9kZVR5cGUuRG9jdW1lbnQ6XG4gICAgICByZXR1cm4gZG9jLmltcGxlbWVudGF0aW9uLmNyZWF0ZURvY3VtZW50KG51bGwsIFwiXCIsIG51bGwpO1xuICAgIGNhc2UgTm9kZVR5cGUuRG9jdW1lbnRUeXBlOlxuICAgICAgcmV0dXJuIGRvYy5pbXBsZW1lbnRhdGlvbi5jcmVhdGVEb2N1bWVudFR5cGUoXG4gICAgICAgIG4ubmFtZSB8fCBcImh0bWxcIixcbiAgICAgICAgbi5wdWJsaWNJZCxcbiAgICAgICAgbi5zeXN0ZW1JZFxuICAgICAgKTtcbiAgICBjYXNlIE5vZGVUeXBlLkVsZW1lbnQ6IHtcbiAgICAgIGNvbnN0IHRhZ05hbWUgPSBnZXRUYWdOYW1lKG4pO1xuICAgICAgbGV0IG5vZGUyO1xuICAgICAgaWYgKG4uaXNTVkcpIHtcbiAgICAgICAgbm9kZTIgPSBkb2MuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgdGFnTmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgLy8gSWYgdGhlIHRhZyBuYW1lIGlzIGEgY3VzdG9tIGVsZW1lbnQgbmFtZVxuICAgICAgICAgIG4uaXNDdXN0b20gJiYgLy8gSWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgY3VzdG9tIGVsZW1lbnRzXG4gICAgICAgICAgKChfYSA9IGRvYy5kZWZhdWx0VmlldykgPT0gbnVsbCA/IHZvaWQgMCA6IF9hLmN1c3RvbUVsZW1lbnRzKSAmJiAvLyBJZiB0aGUgY3VzdG9tIGVsZW1lbnQgaGFzbid0IGJlZW4gZGVmaW5lZCB5ZXRcbiAgICAgICAgICAhZG9jLmRlZmF1bHRWaWV3LmN1c3RvbUVsZW1lbnRzLmdldChuLnRhZ05hbWUpXG4gICAgICAgIClcbiAgICAgICAgICBkb2MuZGVmYXVsdFZpZXcuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFxuICAgICAgICAgICAgbi50YWdOYW1lLFxuICAgICAgICAgICAgY2xhc3MgZXh0ZW5kcyBkb2MuZGVmYXVsdFZpZXcuSFRNTEVsZW1lbnQge1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIG5vZGUyID0gZG9jLmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgICB9XG4gICAgICBjb25zdCBzcGVjaWFsQXR0cmlidXRlcyA9IHt9O1xuICAgICAgZm9yIChjb25zdCBuYW1lIGluIG4uYXR0cmlidXRlcykge1xuICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuLmF0dHJpYnV0ZXMsIG5hbWUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZhbHVlID0gbi5hdHRyaWJ1dGVzW25hbWVdO1xuICAgICAgICBpZiAodGFnTmFtZSA9PT0gXCJvcHRpb25cIiAmJiBuYW1lID09PSBcInNlbGVjdGVkXCIgJiYgdmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSB2YWx1ZSA9IFwiXCI7XG4gICAgICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoXCJycl9cIikpIHtcbiAgICAgICAgICBzcGVjaWFsQXR0cmlidXRlc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIDtcbiAgICAgICAgZWxzZSBpZiAodGFnTmFtZSA9PT0gXCJzdHlsZVwiICYmIG5hbWUgPT09IFwiX2Nzc1RleHRcIikge1xuICAgICAgICAgIGJ1aWxkU3R5bGVOb2RlKG4sIG5vZGUyLCB2YWx1ZSwgb3B0aW9ucyk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGFnTmFtZSA9PT0gXCJ0ZXh0YXJlYVwiICYmIG5hbWUgPT09IFwidmFsdWVcIikge1xuICAgICAgICAgIG5vZGUyLmFwcGVuZENoaWxkKGRvYy5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSkpO1xuICAgICAgICAgIG4uY2hpbGROb2RlcyA9IFtdO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKG4uaXNTVkcgJiYgbmFtZSA9PT0gXCJ4bGluazpocmVmXCIpIHtcbiAgICAgICAgICAgIG5vZGUyLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIixcbiAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgdmFsdWUudG9TdHJpbmcoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT09IFwib25sb2FkXCIgfHwgbmFtZSA9PT0gXCJvbmNsaWNrXCIgfHwgbmFtZS5zdWJzdHJpbmcoMCwgNykgPT09IFwib25tb3VzZVwiKSB7XG4gICAgICAgICAgICBub2RlMi5zZXRBdHRyaWJ1dGUoXCJfXCIgKyBuYW1lLCB2YWx1ZS50b1N0cmluZygpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRhZ05hbWUgPT09IFwibWV0YVwiICYmIG4uYXR0cmlidXRlc1tcImh0dHAtZXF1aXZcIl0gPT09IFwiQ29udGVudC1TZWN1cml0eS1Qb2xpY3lcIiAmJiBuYW1lID09PSBcImNvbnRlbnRcIikge1xuICAgICAgICAgICAgbm9kZTIuc2V0QXR0cmlidXRlKFwiY3NwLWNvbnRlbnRcIiwgdmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRhZ05hbWUgPT09IFwibGlua1wiICYmIChuLmF0dHJpYnV0ZXMucmVsID09PSBcInByZWxvYWRcIiAmJiBuLmF0dHJpYnV0ZXMuYXMgPT09IFwic2NyaXB0XCIgfHwgbi5hdHRyaWJ1dGVzLnJlbCA9PT0gXCJtb2R1bGVwcmVsb2FkXCIpKSB7XG4gICAgICAgICAgfSBlbHNlIGlmICh0YWdOYW1lID09PSBcImxpbmtcIiAmJiBuLmF0dHJpYnV0ZXMucmVsID09PSBcInByZWZldGNoXCIgJiYgdHlwZW9mIG4uYXR0cmlidXRlcy5ocmVmID09PSBcInN0cmluZ1wiICYmIGV4dHJhY3RGaWxlRXh0ZW5zaW9uKG4uYXR0cmlidXRlcy5ocmVmKSA9PT0gXCJqc1wiKSB7XG4gICAgICAgICAgfSBlbHNlIGlmICh0YWdOYW1lID09PSBcImltZ1wiICYmIG4uYXR0cmlidXRlcy5zcmNzZXQgJiYgbi5hdHRyaWJ1dGVzLnJyX2RhdGFVUkwpIHtcbiAgICAgICAgICAgIG5vZGUyLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgXCJycndlYi1vcmlnaW5hbC1zcmNzZXRcIixcbiAgICAgICAgICAgICAgbi5hdHRyaWJ1dGVzLnNyY3NldFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZTIuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBuYW1lIGluIHNwZWNpYWxBdHRyaWJ1dGVzKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gc3BlY2lhbEF0dHJpYnV0ZXNbbmFtZV07XG4gICAgICAgIGlmICh0YWdOYW1lID09PSBcImNhbnZhc1wiICYmIG5hbWUgPT09IFwicnJfZGF0YVVSTFwiKSB7XG4gICAgICAgICAgY29uc3QgaW1hZ2UgPSBkb2MuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdHggPSBub2RlMi5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICBpZiAoY3R4KSB7XG4gICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgaW1hZ2Uuc3JjID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICBpZiAobm9kZTIuUlJOb2RlVHlwZSlcbiAgICAgICAgICAgIG5vZGUyLnJyX2RhdGFVUkwgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhZ05hbWUgPT09IFwiaW1nXCIgJiYgbmFtZSA9PT0gXCJycl9kYXRhVVJMXCIpIHtcbiAgICAgICAgICBjb25zdCBpbWFnZSA9IG5vZGUyO1xuICAgICAgICAgIGlmICghaW1hZ2UuY3VycmVudFNyYy5zdGFydHNXaXRoKFwiZGF0YTpcIikpIHtcbiAgICAgICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgXCJycndlYi1vcmlnaW5hbC1zcmNcIixcbiAgICAgICAgICAgICAgbi5hdHRyaWJ1dGVzLnNyY1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChuYW1lID09PSBcInJyX3dpZHRoXCIpIHtcbiAgICAgICAgICBub2RlMi5zdHlsZS5zZXRQcm9wZXJ0eShcIndpZHRoXCIsIHZhbHVlLnRvU3RyaW5nKCkpO1xuICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT09IFwicnJfaGVpZ2h0XCIpIHtcbiAgICAgICAgICBub2RlMi5zdHlsZS5zZXRQcm9wZXJ0eShcImhlaWdodFwiLCB2YWx1ZS50b1N0cmluZygpKTtcbiAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSBcInJyX21lZGlhQ3VycmVudFRpbWVcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICBub2RlMi5jdXJyZW50VGltZSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT09IFwicnJfbWVkaWFTdGF0ZVwiKSB7XG4gICAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICAgICAgY2FzZSBcInBsYXllZFwiOlxuICAgICAgICAgICAgICBub2RlMi5wbGF5KCkuY2F0Y2goKGUpID0+IGNvbnNvbGUud2FybihcIm1lZGlhIHBsYXliYWNrIGVycm9yXCIsIGUpKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicGF1c2VkXCI6XG4gICAgICAgICAgICAgIG5vZGUyLnBhdXNlKCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSBcInJyX21lZGlhUGxheWJhY2tSYXRlXCIgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgbm9kZTIucGxheWJhY2tSYXRlID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gXCJycl9tZWRpYU11dGVkXCIgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikge1xuICAgICAgICAgIG5vZGUyLm11dGVkID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gXCJycl9tZWRpYUxvb3BcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgbm9kZTIubG9vcCA9IHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT09IFwicnJfbWVkaWFWb2x1bWVcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICBub2RlMi52b2x1bWUgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSBcInJyX29wZW5fbW9kZVwiKSB7XG4gICAgICAgICAgbm9kZTIuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgXCJycl9vcGVuX21vZGVcIixcbiAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG4uaXNTaGFkb3dIb3N0KSB7XG4gICAgICAgIGlmICghbm9kZTIuc2hhZG93Um9vdCkge1xuICAgICAgICAgIG5vZGUyLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pO1xuICAgICAgICAgIChfYiA9IG4uY2hyb21hdGljQWRvcHRlZFN0eWxlc2hlZXRzKSA9PSBudWxsID8gdm9pZCAwIDogX2IuZm9yRWFjaChcbiAgICAgICAgICAgIChjaHJvbWF0aWNBZG9wdGVkU3R5bGVzaGVldCkgPT4ge1xuICAgICAgICAgICAgICB2YXIgX2EyO1xuICAgICAgICAgICAgICBjb25zdCBzdHlsZVNoZWV0ID0gbmV3IENTU1N0eWxlU2hlZXQoKTtcbiAgICAgICAgICAgICAgc3R5bGVTaGVldC5yZXBsYWNlU3luYyhjaHJvbWF0aWNBZG9wdGVkU3R5bGVzaGVldCk7XG4gICAgICAgICAgICAgIChfYTIgPSBub2RlMi5zaGFkb3dSb290KSA9PSBudWxsID8gdm9pZCAwIDogX2EyLmFkb3B0ZWRTdHlsZVNoZWV0cy5wdXNoKHN0eWxlU2hlZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2hpbGUgKG5vZGUyLnNoYWRvd1Jvb3QuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgbm9kZTIuc2hhZG93Um9vdC5yZW1vdmVDaGlsZChub2RlMi5zaGFkb3dSb290LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5vZGUyO1xuICAgIH1cbiAgICBjYXNlIE5vZGVUeXBlLlRleHQ6XG4gICAgICBpZiAobi5pc1N0eWxlICYmIGhhY2tDc3MpIHtcbiAgICAgICAgcmV0dXJuIGRvYy5jcmVhdGVUZXh0Tm9kZShhZGFwdENzc0ZvclJlcGxheShuLnRleHRDb250ZW50LCBjYWNoZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRvYy5jcmVhdGVUZXh0Tm9kZShuLnRleHRDb250ZW50KTtcbiAgICBjYXNlIE5vZGVUeXBlLkNEQVRBOlxuICAgICAgcmV0dXJuIGRvYy5jcmVhdGVDREFUQVNlY3Rpb24obi50ZXh0Q29udGVudCk7XG4gICAgY2FzZSBOb2RlVHlwZS5Db21tZW50OlxuICAgICAgcmV0dXJuIGRvYy5jcmVhdGVDb21tZW50KG4udGV4dENvbnRlbnQpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuZnVuY3Rpb24gYnVpbGROb2RlV2l0aFNOKG4sIG9wdGlvbnMpIHtcbiAgY29uc3Qge1xuICAgIGRvYyxcbiAgICBtaXJyb3IsXG4gICAgc2tpcENoaWxkID0gZmFsc2UsXG4gICAgaGFja0NzcyA9IHRydWUsXG4gICAgYWZ0ZXJBcHBlbmQsXG4gICAgY2FjaGVcbiAgfSA9IG9wdGlvbnM7XG4gIGlmIChtaXJyb3IuaGFzKG4uaWQpKSB7XG4gICAgY29uc3Qgbm9kZUluTWlycm9yID0gbWlycm9yLmdldE5vZGUobi5pZCk7XG4gICAgY29uc3QgbWV0YSA9IG1pcnJvci5nZXRNZXRhKG5vZGVJbk1pcnJvcik7XG4gICAgaWYgKGlzTm9kZU1ldGFFcXVhbChtZXRhLCBuKSkgcmV0dXJuIG1pcnJvci5nZXROb2RlKG4uaWQpO1xuICB9XG4gIGxldCBub2RlMiA9IGJ1aWxkTm9kZShuLCB7IGRvYywgaGFja0NzcywgY2FjaGUgfSk7XG4gIGlmICghbm9kZTIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAobi5yb290SWQgJiYgbWlycm9yLmdldE5vZGUobi5yb290SWQpICE9PSBkb2MpIHtcbiAgICBtaXJyb3IucmVwbGFjZShuLnJvb3RJZCwgZG9jKTtcbiAgfVxuICBpZiAobi50eXBlID09PSBOb2RlVHlwZS5Eb2N1bWVudCkge1xuICAgIGRvYy5jbG9zZSgpO1xuICAgIGRvYy5vcGVuKCk7XG4gICAgaWYgKG4uY29tcGF0TW9kZSA9PT0gXCJCYWNrQ29tcGF0XCIgJiYgbi5jaGlsZE5vZGVzICYmIG4uY2hpbGROb2Rlc1swXS50eXBlICE9PSBOb2RlVHlwZS5Eb2N1bWVudFR5cGUpIHtcbiAgICAgIGlmIChuLmNoaWxkTm9kZXNbMF0udHlwZSA9PT0gTm9kZVR5cGUuRWxlbWVudCAmJiBcInhtbG5zXCIgaW4gbi5jaGlsZE5vZGVzWzBdLmF0dHJpYnV0ZXMgJiYgbi5jaGlsZE5vZGVzWzBdLmF0dHJpYnV0ZXMueG1sbnMgPT09IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiKSB7XG4gICAgICAgIGRvYy53cml0ZShcbiAgICAgICAgICAnPCFET0NUWVBFIGh0bWwgUFVCTElDIFwiLS8vVzNDLy9EVEQgWEhUTUwgMS4wIFRyYW5zaXRpb25hbC8vRU5cIiBcIlwiPidcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvYy53cml0ZShcbiAgICAgICAgICAnPCFET0NUWVBFIGh0bWwgUFVCTElDIFwiLS8vVzNDLy9EVEQgSFRNTCA0LjAgVHJhbnNpdGlvbmFsLy9FTlwiIFwiXCI+J1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBub2RlMiA9IGRvYztcbiAgfVxuICBtaXJyb3IuYWRkKG5vZGUyLCBuKTtcbiAgaWYgKChuLnR5cGUgPT09IE5vZGVUeXBlLkRvY3VtZW50IHx8IG4udHlwZSA9PT0gTm9kZVR5cGUuRWxlbWVudCkgJiYgIXNraXBDaGlsZCkge1xuICAgIGZvciAoY29uc3QgY2hpbGROIG9mIG4uY2hpbGROb2Rlcykge1xuICAgICAgY29uc3QgY2hpbGROb2RlID0gYnVpbGROb2RlV2l0aFNOKGNoaWxkTiwge1xuICAgICAgICBkb2MsXG4gICAgICAgIG1pcnJvcixcbiAgICAgICAgc2tpcENoaWxkOiBmYWxzZSxcbiAgICAgICAgaGFja0NzcyxcbiAgICAgICAgYWZ0ZXJBcHBlbmQsXG4gICAgICAgIGNhY2hlXG4gICAgICB9KTtcbiAgICAgIGlmICghY2hpbGROb2RlKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIkZhaWxlZCB0byByZWJ1aWxkXCIsIGNoaWxkTik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKGNoaWxkTi5pc1NoYWRvdyAmJiBpc0VsZW1lbnQobm9kZTIpICYmIG5vZGUyLnNoYWRvd1Jvb3QpIHtcbiAgICAgICAgbm9kZTIuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjaGlsZE5vZGUpO1xuICAgICAgfSBlbHNlIGlmIChuLnR5cGUgPT09IE5vZGVUeXBlLkRvY3VtZW50ICYmIGNoaWxkTi50eXBlID09IE5vZGVUeXBlLkVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgaHRtbEVsZW1lbnQgPSBjaGlsZE5vZGU7XG4gICAgICAgIGxldCBib2R5ID0gbnVsbDtcbiAgICAgICAgaHRtbEVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gXCJCT0RZXCIpIGJvZHkgPSBjaGlsZDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChib2R5KSB7XG4gICAgICAgICAgaHRtbEVsZW1lbnQucmVtb3ZlQ2hpbGQoYm9keSk7XG4gICAgICAgICAgbm9kZTIuYXBwZW5kQ2hpbGQoY2hpbGROb2RlKTtcbiAgICAgICAgICBodG1sRWxlbWVudC5hcHBlbmRDaGlsZChib2R5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBub2RlMi5hcHBlbmRDaGlsZChjaGlsZE5vZGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlMi5hcHBlbmRDaGlsZChjaGlsZE5vZGUpO1xuICAgICAgfVxuICAgICAgaWYgKGFmdGVyQXBwZW5kKSB7XG4gICAgICAgIGFmdGVyQXBwZW5kKGNoaWxkTm9kZSwgY2hpbGROLmlkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5vZGUyO1xufVxuZnVuY3Rpb24gdmlzaXQobWlycm9yLCBvblZpc2l0KSB7XG4gIGZ1bmN0aW9uIHdhbGsobm9kZTIpIHtcbiAgICBvblZpc2l0KG5vZGUyKTtcbiAgfVxuICBmb3IgKGNvbnN0IGlkIG9mIG1pcnJvci5nZXRJZHMoKSkge1xuICAgIGlmIChtaXJyb3IuaGFzKGlkKSkge1xuICAgICAgd2FsayhtaXJyb3IuZ2V0Tm9kZShpZCkpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gaGFuZGxlU2Nyb2xsKG5vZGUyLCBtaXJyb3IpIHtcbiAgY29uc3QgbiA9IG1pcnJvci5nZXRNZXRhKG5vZGUyKTtcbiAgaWYgKChuID09IG51bGwgPyB2b2lkIDAgOiBuLnR5cGUpICE9PSBOb2RlVHlwZS5FbGVtZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGVsID0gbm9kZTI7XG4gIGZvciAoY29uc3QgbmFtZSBpbiBuLmF0dHJpYnV0ZXMpIHtcbiAgICBpZiAoIShPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobi5hdHRyaWJ1dGVzLCBuYW1lKSAmJiBuYW1lLnN0YXJ0c1dpdGgoXCJycl9cIikpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSBuLmF0dHJpYnV0ZXNbbmFtZV07XG4gICAgaWYgKG5hbWUgPT09IFwicnJfc2Nyb2xsTGVmdFwiKSB7XG4gICAgICBlbC5zY3JvbGxMZWZ0ID0gdmFsdWU7XG4gICAgfVxuICAgIGlmIChuYW1lID09PSBcInJyX3Njcm9sbFRvcFwiKSB7XG4gICAgICBlbC5zY3JvbGxUb3AgPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIHJlYnVpbGQobiwgb3B0aW9ucykge1xuICBjb25zdCB7XG4gICAgZG9jLFxuICAgIG9uVmlzaXQsXG4gICAgaGFja0NzcyA9IHRydWUsXG4gICAgYWZ0ZXJBcHBlbmQsXG4gICAgY2FjaGUsXG4gICAgbWlycm9yID0gbmV3IE1pcnJvcigpXG4gIH0gPSBvcHRpb25zO1xuICBjb25zdCBub2RlMiA9IGJ1aWxkTm9kZVdpdGhTTihuLCB7XG4gICAgZG9jLFxuICAgIG1pcnJvcixcbiAgICBza2lwQ2hpbGQ6IGZhbHNlLFxuICAgIGhhY2tDc3MsXG4gICAgYWZ0ZXJBcHBlbmQsXG4gICAgY2FjaGVcbiAgfSk7XG4gIHZpc2l0KG1pcnJvciwgKHZpc2l0ZWROb2RlKSA9PiB7XG4gICAgaWYgKG9uVmlzaXQpIHtcbiAgICAgIG9uVmlzaXQodmlzaXRlZE5vZGUpO1xuICAgIH1cbiAgICBoYW5kbGVTY3JvbGwodmlzaXRlZE5vZGUsIG1pcnJvcik7XG4gIH0pO1xuICByZXR1cm4gbm9kZTI7XG59XG5leHBvcnRzLklHTk9SRURfTk9ERSA9IElHTk9SRURfTk9ERTtcbmV4cG9ydHMuTWlycm9yID0gTWlycm9yO1xuZXhwb3J0cy5hYnNvbHV0aWZ5VVJMcyA9IGFic29sdXRpZnlVUkxzO1xuZXhwb3J0cy5hZGFwdENzc0ZvclJlcGxheSA9IGFkYXB0Q3NzRm9yUmVwbGF5O1xuZXhwb3J0cy5idWlsZE5vZGVXaXRoU04gPSBidWlsZE5vZGVXaXRoU047XG5leHBvcnRzLmNsYXNzTWF0Y2hlc1JlZ2V4ID0gY2xhc3NNYXRjaGVzUmVnZXg7XG5leHBvcnRzLmNsZWFudXBTbmFwc2hvdCA9IGNsZWFudXBTbmFwc2hvdDtcbmV4cG9ydHMuY3JlYXRlQ2FjaGUgPSBjcmVhdGVDYWNoZTtcbmV4cG9ydHMuY3JlYXRlTWlycm9yID0gY3JlYXRlTWlycm9yO1xuZXhwb3J0cy5lc2NhcGVJbXBvcnRTdGF0ZW1lbnQgPSBlc2NhcGVJbXBvcnRTdGF0ZW1lbnQ7XG5leHBvcnRzLmV4dHJhY3RGaWxlRXh0ZW5zaW9uID0gZXh0cmFjdEZpbGVFeHRlbnNpb247XG5leHBvcnRzLmZpeFNhZmFyaUNvbG9ucyA9IGZpeFNhZmFyaUNvbG9ucztcbmV4cG9ydHMuZ2VuSWQgPSBnZW5JZDtcbmV4cG9ydHMuZ2V0SW5wdXRUeXBlID0gZ2V0SW5wdXRUeXBlO1xuZXhwb3J0cy5pZ25vcmVBdHRyaWJ1dGUgPSBpZ25vcmVBdHRyaWJ1dGU7XG5leHBvcnRzLmlzMkRDYW52YXNCbGFuayA9IGlzMkRDYW52YXNCbGFuaztcbmV4cG9ydHMuaXNDU1NJbXBvcnRSdWxlID0gaXNDU1NJbXBvcnRSdWxlO1xuZXhwb3J0cy5pc0NTU1N0eWxlUnVsZSA9IGlzQ1NTU3R5bGVSdWxlO1xuZXhwb3J0cy5pc0VsZW1lbnQgPSBpc0VsZW1lbnQ7XG5leHBvcnRzLmlzTmF0aXZlU2hhZG93RG9tID0gaXNOYXRpdmVTaGFkb3dEb207XG5leHBvcnRzLmlzTm9kZU1ldGFFcXVhbCA9IGlzTm9kZU1ldGFFcXVhbDtcbmV4cG9ydHMuaXNTaGFkb3dSb290ID0gaXNTaGFkb3dSb290O1xuZXhwb3J0cy5tYXJrQ3NzU3BsaXRzID0gbWFya0Nzc1NwbGl0cztcbmV4cG9ydHMubWFza0lucHV0VmFsdWUgPSBtYXNrSW5wdXRWYWx1ZTtcbmV4cG9ydHMubmVlZE1hc2tpbmdUZXh0ID0gbmVlZE1hc2tpbmdUZXh0O1xuZXhwb3J0cy5ub3JtYWxpemVDc3NTdHJpbmcgPSBub3JtYWxpemVDc3NTdHJpbmc7XG5leHBvcnRzLnJlYnVpbGQgPSByZWJ1aWxkO1xuZXhwb3J0cy5zZXJpYWxpemVOb2RlV2l0aElkID0gc2VyaWFsaXplTm9kZVdpdGhJZDtcbmV4cG9ydHMuc25hcHNob3QgPSBzbmFwc2hvdDtcbmV4cG9ydHMuc3BsaXRDc3NUZXh0ID0gc3BsaXRDc3NUZXh0O1xuZXhwb3J0cy5zdHJpbmdpZnlSdWxlID0gc3RyaW5naWZ5UnVsZTtcbmV4cG9ydHMuc3RyaW5naWZ5U3R5bGVzaGVldCA9IHN0cmluZ2lmeVN0eWxlc2hlZXQ7XG5leHBvcnRzLnRvTG93ZXJDYXNlID0gdG9Mb3dlckNhc2U7XG5leHBvcnRzLnRyYW5zZm9ybUF0dHJpYnV0ZSA9IHRyYW5zZm9ybUF0dHJpYnV0ZTtcbmV4cG9ydHMudmlzaXRTbmFwc2hvdCA9IHZpc2l0U25hcHNob3Q7XG5pZiAodHlwZW9mIG1vZHVsZS5leHBvcnRzID09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGV4cG9ydHMgPT0gXCJvYmplY3RcIikge1xuICB2YXIgX19jcCA9ICh0bywgZnJvbSwgZXhjZXB0LCBkZXNjKSA9PiB7XG4gICAgaWYgKChmcm9tICYmIHR5cGVvZiBmcm9tID09PSBcIm9iamVjdFwiKSB8fCB0eXBlb2YgZnJvbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZnJvbSkpIHtcbiAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodG8sIGtleSkgJiYga2V5ICE9PSBleGNlcHQpXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0bywga2V5LCB7XG4gICAgICAgICAgZ2V0OiAoKSA9PiBmcm9tW2tleV0sXG4gICAgICAgICAgZW51bWVyYWJsZTogIShkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihmcm9tLCBrZXkpKSB8fCBkZXNjLmVudW1lcmFibGUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG87XG4gIH07XG4gIG1vZHVsZS5leHBvcnRzID0gX19jcChtb2R1bGUuZXhwb3J0cywgZXhwb3J0cyk7XG59XG5yZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59KSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJyd2ViLXNuYXBzaG90LnVtZC5janMubWFwXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vIFRoaXMgZXhhbXBsZSBzdXBwb3J0L2luZGV4LmpzIGlzIHByb2Nlc3NlZCBhbmRcbi8vIGxvYWRlZCBhdXRvbWF0aWNhbGx5IGJlZm9yZSB5b3VyIHRlc3QgZmlsZXMuXG4vL1xuLy8gVGhpcyBpcyBhIGdyZWF0IHBsYWNlIHRvIHB1dCBnbG9iYWwgY29uZmlndXJhdGlvbiBhbmRcbi8vIGJlaGF2aW9yIHRoYXQgbW9kaWZpZXMgQ3lwcmVzcy5cbi8vXG4vLyBZb3UgY2FuIGNoYW5nZSB0aGUgbG9jYXRpb24gb2YgdGhpcyBmaWxlIG9yIHR1cm4gb2ZmXG4vLyBhdXRvbWF0aWNhbGx5IHNlcnZpbmcgc3VwcG9ydCBmaWxlcyB3aXRoIHRoZVxuLy8gJ3N1cHBvcnRGaWxlJyBjb25maWd1cmF0aW9uIG9wdGlvbi5cbi8vXG4vLyBZb3UgY2FuIHJlYWQgbW9yZSBoZXJlOlxuLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2NvbmZpZ3VyYXRpb25cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbi8vIEltcG9ydCBjb21tYW5kcy5qcyB1c2luZyBFUzIwMTUgc3ludGF4OlxuaW1wb3J0ICcuL2NvbW1hbmRzJ1xuXG4vLyBjeXByZXNzL3N1cHBvcnQvZTJlLmpzXG5yZXF1aXJlKCdAY2hyb21hdGljLWNvbS9jeXByZXNzL3N1cHBvcnQnKVxuXG5cbi8vIEFsdGVybmF0aXZlbHkgeW91IGNhbiB1c2UgQ29tbW9uSlMgc3ludGF4OlxuLy8gcmVxdWlyZSgnLi9jb21tYW5kcycpXG5cbkN5cHJlc3Mub24oJ3VuY2F1Z2h0OmV4Y2VwdGlvbicsIChlcnIsIHJ1bm5hYmxlKSA9PiB7XG4gIC8vIHJldHVybmluZyBmYWxzZSBoZXJlIHByZXZlbnRzIEN5cHJlc3MgZnJvbVxuICAvLyBmYWlsaW5nIHRoZSB0ZXN0XG4gIHJldHVybiBmYWxzZVxufSlcbiJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiQ3lwcmVzcyIsIm9uIiwiZXJyIiwicnVubmFibGUiXSwic291cmNlUm9vdCI6IiJ9