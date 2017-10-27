// ==UserScript==
// @name         RMLSwebAddons
// @namespace    https://github.com/selassid/RMLSwebAddons
// @version      1.0.0
// @updateURL    https://raw.githubusercontent.com/selassid/RMLSwebAddons/master/RMLSwebAddons.user.js
// @description  Adds Google Maps and permalinks to RMLSweb
// @author       David Selassie
// @match        http://www.rmlsweb.com/v2/public/report.asp*
// ==/UserScript==

(function() {
    'use strict';

    let baseUrl = window.location.href.split('?')[0] + '?';
    let queryParams = new URLSearchParams(document.location.search.substring(1));

    let reportItemHeaders = document.querySelectorAll('.reportItemHeader');
    for (let reportItemHeader of reportItemHeaders) {
        let mlsn = reportItemHeader.innerText.split(' ')[1].trim();

        // Setup anchors we can link to.
        reportItemHeader.id = mlsn;

        // Get address and make Google Maps links right after internal map links.
        let reportBox = reportItemHeader.nextElementSibling;
        let existingMapLink = reportBox.querySelector('.MAPLINK_ADDRESS_FULL:not(.GOOGLE_EXT)');
        let propertyAddress = existingMapLink.parentElement.firstChild.nodeValue;
        let newLink = document.createElement('a');
        newLink.className = 'MAPLINK_ADDRESS_FULL GOOGLE_EXT';
        newLink.href = 'https://www.google.com/maps/search/?api=1&query=' + propertyAddress;
        newLink.setAttribute('target', 'gmap');
        newLink.innerHTML = '<span class="BOXLINK BOXICON_M np" title="Google Map">&nbsp;G&nbsp;</span>';
        // Insert before.
        existingMapLink.parentNode.insertBefore(newLink, existingMapLink.nextSibling);

        // Update header text to be permalink with address.
        let reportItemHeaderText = reportItemHeader.querySelector('b');
        let linkQueryParams = new URLSearchParams(queryParams);
        linkQueryParams.set("mlsn", mlsn);
        let href = baseUrl + linkQueryParams.toString();
        reportItemHeaderText.innerHTML = 'MLS#: <a href="' + href + '">' + mlsn + '</a> - ' + propertyAddress;
    }

    // Scroll to selected entry. Can't use anchor # because server parses it and hangs...
    let mlsn = queryParams.get("mlsn");
    if (mlsn) {
        document.getElementById(mlsn).scrollIntoView();
    }
})();
