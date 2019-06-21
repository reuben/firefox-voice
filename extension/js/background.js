/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

let triggeringTabId;

browser.browserAction.onClicked.addListener(async (triggeringTab) => {
  // set triggeringTabId
  triggeringTabId = triggeringTab.id;
  console.debug(`the tab that the user was on when triggering this action has ID ${triggeringTabId}`);

  triggerExtension();
});

browser.omnibox.setDefaultSuggestion({
  description: `Control Firefox through a text command (e.g. Play Hamilton on YouTube)`
});

browser.omnibox.onInputEntered.addListener(async (text, disposition) => {
  // Figure out if the new text thing is empty
  triggerExtension();
  // browser.tabs.update({url});

});

const triggerExtension = async () => {
  const url = "https://www.google.com";
  let tab = await browser.tabs.create({url});
  const intervalConnection = setInterval(() => {
    browser.tabs
      .sendMessage(tab.id, {
        msg: "background script syn",
      })
      .then((response) => {
        clearInterval(intervalConnection);
      })
      .catch((error) => {
        // console.error(`Not connected yet. Retrying ${error}`);
      });
  }, 100);
}