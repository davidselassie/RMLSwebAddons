// ==UserScript==
// @name         RMLSweb Addons
// @namespace    http://selassid.net/
// @version      0.1
// @description  Adds Google Maps links to RMLSweb!
// @author       David Selassie
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        http://www.rmlsweb.com/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
  /* jshint esnext: false */
  /* jshint esversion: 6 */

  function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  let existingMapLinks = document.querySelectorAll('.MAPLINK_ADDRESS_FULL:not(.GOOGLE_EXT)');
  for (let existingMapLink of existingMapLinks) {
    let propertyAddress = existingMapLink.parentElement.firstChild.nodeValue;
    let newLink = document.createElement('a');
    newLink.className = 'MAPLINK_ADDRESS_FULL GOOGLE_EXT';
    newLink.href = 'https://www.google.com/maps/search/?api=1&query=' + propertyAddress;
    newLink.innerHTML = '<span class="BOXLINK BOXICON_M np" title="Google Street View">&nbsp;G&nbsp;</span>';
    insertAfter(newLink, existingMapLink);
  }

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */