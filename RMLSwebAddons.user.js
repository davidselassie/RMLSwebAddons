// ==UserScript==
// @name         RMLSwebAddons
// @namespace    https://github.com/selassid/RMLSwebAddons
// @version      0.1
// @updateURL    https://raw.githubusercontent.com/selassid/RMLSwebAddons/master/RMLSwebAddons.user.js
// @description  Adds Google Maps and permalinks to RMLSweb!
// @author       David Selassie
// @match        http://www.rmlsweb.com/*
// ==/UserScript==

(function() {
    'use strict';

    let queryParams = new URLSearchParams(document.location.search.substring(1));

    let existingMapLinks = document.querySelectorAll('.MAPLINK_ADDRESS_FULL:not(.GOOGLE_EXT)');
    for (let existingMapLink of existingMapLinks) {
        // Insert Google Maps links.
        let propertyAddress = existingMapLink.parentElement.firstChild.nodeValue;
        let newLink = document.createElement('a');
        newLink.className = 'MAPLINK_ADDRESS_FULL GOOGLE_EXT';
        newLink.href = 'https://www.google.com/maps/search/?api=1&query=' + propertyAddress;
        newLink.innerHTML = '<span class="BOXLINK BOXICON_M np" title="Google Street View">&nbsp;G&nbsp;</span>';
        // Insert before.
        existingMapLink.parentNode.insertBefore(newLink, existingMapLink.nextSibling);

        // Insert permalinks to entry.
        let mlsnTd = existingMapLink.parentElement.previousSibling;
        let mlsn = mlsnTd.innerText;
        let linkQueryParams = new URLSearchParams(queryParams);
        linkQueryParams.set("mlsn", mlsn);
        let href = window.location.href.split('?')[0] + linkQueryParams.toString();
        mlsnTd.innerHTML = '<a href="' + href + '">' + mlsn + '</a>';
    }

    // Create all plain MLSN anchors before each entry.
    let idAnchors = document.querySelectorAll('div[id^="REPORT_ITEM_"]');
    for (let idAnchor of idAnchors) {
        idAnchor.style = '';
        let oldStructuredId = idAnchor.id;
        idAnchor.id = oldStructuredId.split('_')[2];
    }

    // Scroll to selected entry. Can't use anchor # because server parses it and hangs...
    let mlsn = queryParams.get("mlsn");
    if (mlsn) {
        document.getElementById(mlsn).scrollIntoView();
    }
})();
