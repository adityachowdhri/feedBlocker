chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("instagram.com")){
        chrome.tabs.sendMessage(tabId, {
            type: "INSTAGRAM"
        });
    }
});

chrome.runtime.onInstalled.addListener(function() {
    // Set initial values for states if they're not already set
    setInitialState('feedState', false);
    setInitialState('storyState', false);
    setInitialState('dmState', false);
  });
  
  function setInitialState(key, value) {
    chrome.storage.sync.get(key, function(result) {
      if (result[key] === undefined) {
        chrome.storage.sync.set({ [key]: value });
      }
    });
  }
  