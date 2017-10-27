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
    let origQueryParams = new URLSearchParams(document.location.search.substring(1));

    let reportItemHeaders = document.querySelectorAll('.reportItemHeader');
    for (let reportItemHeader of reportItemHeaders) {
        let mlid = reportItemHeader.innerText.split(' ')[1].trim();

        // Get address and make Google Maps links right after internal map links.
        let reportBox = reportItemHeader.nextElementSibling;
        let existingMapLink = reportBox.querySelector('.MAPLINK_ADDRESS_FULL:not(.GOOGLE_EXT)');
        let propertyAddress = existingMapLink.parentElement.firstChild.nodeValue;
        let gmapLink = document.createElement('a');
        gmapLink.className = 'MAPLINK_ADDRESS_FULL GOOGLE_EXT';
        let gmapLinkQueryParams = new URLSearchParams();
        gmapLinkQueryParams.set("api", 1);
        gmapLinkQueryParams.set("query", propertyAddress);
        gmapLink.href = 'https://www.google.com/maps/search/?' + gmapLinkQueryParams.toString();
        gmapLink.setAttribute('target', 'gmap');
        gmapLink.innerHTML = '<span class="BOXLINK BOXICON_M np" title="Google Map">&nbsp;G&nbsp;</span>';
        // Insert before.
        existingMapLink.parentNode.insertBefore(gmapLink, existingMapLink.nextSibling);

        // Update header text to be permalink with address.
        let reportItemHeaderText = reportItemHeader.querySelector('b');
        let permalinkQueryParams = new URLSearchParams(origQueryParams);
        permalinkQueryParams.set("DMD", 1);
        permalinkQueryParams.set("MLID_ARRAY", ["", mlid].join(","));
        let permalinkHref = baseUrl + permalinkQueryParams.toString();
        reportItemHeaderText.innerHTML = 'MLS#: <a href="' + permalinkHref + '" target="_blank">' + mlid + '</a> - ' + propertyAddress;
    }
})();
