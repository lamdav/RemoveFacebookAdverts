// ==UserScript==
// @name         Remove Facebook Adverts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove Facebook Adverts using Contact List
// @author       lamdav
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

// Inspired By: https://gist.github.com/scarlac/3c4b9d9868148ef31e2ea5082e59a0f1
(() => {
    "use strict";
    window.addEventListener("load", () => {
        const facebookHomeRegex = /http[s]?:\/\/www\.facebook\.com(\/\?.*)?/gm;
        const currentUrl = window.location.href;
        // Check if you are on the manage ads page. If so, attempt to open up the interacted panel and
        // then let the next interval handle showing all adverts and removing them all.
        // Upon removal completion, clear the interval.
        if (currentUrl === "https://www.facebook.com/ads/preferences/?entry_product=ad_settings_screen") {
            let showMoreElementsClickable = false;
            const clearAds = setInterval(() => {
                if (showMoreElementsClickable) {
                    // Keep clicking the show more element until there are none left.
                    let showMoreElement = document.querySelector("div[shade=medium]");
                    if (showMoreElement) {
                        showMoreElement.click();
                        console.log("[rm-fbad] showing more adverts");
                    } else {
                        // click the removal button.
                        console.log("[rm-fbad] showing all adverts");
                        document.querySelectorAll(`[data-tooltip-content="Hide ads from this advertiser"]`)
                            .forEach((element) => element.click());
                        console.log("[rm-fbad] removed all adverts");
                        clearInterval(clearAds);
                    }
                } else {
                    // Attempt to reveal the interacted panel.
                    let interactedElement = document.getElementById("interacted");
                    if (interactedElement) {
                        let interactedElementButton = interactedElement.querySelector("div[data-testid]");
                        if (interactedElementButton) {
                            interactedElementButton.click();
                            console.log("[rm-fbad] revealed adverts");
                            showMoreElementsClickable = true;
                        }
                    }
                }
            }, 1000);
            // Check if on facebook homepage (page with news feed). If so, create an element link that leds
            // to the manage advertisement preference page.
        } else if (currentUrl.match(facebookHomeRegex)) {
            const createReminder = setInterval(() => {
                const topStoriesDiv = document.getElementById("topstoriesdiv");
                if (topStoriesDiv) {
                    const rootElement = document.createElement("div");
                    rootElement.setAttribute("id", "rm-fbad");
                    const messageElement = document.createElement("a");
                    messageElement.setAttribute("href", "https://www.facebook.com/ads/preferences/?entry_product=ad_settings_screen");
                    messageElement.appendChild(document.createTextNode("Manage Advertisment Preferences"));
                    rootElement.appendChild(messageElement);
        
                    topStoriesDiv.parentElement.insertBefore(rootElement, topStoriesDiv.nextSibling);

                    clearInterval(createReminder);
                } else {
                    console.log("[rm-fbad] could not find topstoriesdiv. trying again in 1 second.");
                }
            }, 1000);
        }
    }, false);
})();
