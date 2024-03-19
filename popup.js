import { getCurrentTab } from "./currentTab.js";
const i = "Hide Feed";
const j = "Hide Stories";
const k = "Hide DM's";
const x = "Hide Reels"
const y = "Hide Explore"


document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getCurrentTab();
  const container = document.getElementsByClassName("container")[0];


  if (activeTab.url === "https://www.instagram.com/") {

    container.innerHTML = `<div class="title">Toggle Options</div>`;
    container.innerHTML += `<div class = "orientation"><label class="switch"><input type="checkbox" id="${i}"><span class="slider round"></span></label><p style="display: inline; padding: 2px">${i}</p></div>`;
    container.innerHTML += `<div class = "orientation"><label class="switch"><input type="checkbox" id="${j}"><span class="slider round"></span></label><p style="display: inline; padding: 2px">${j}</p></div>`;
    container.innerHTML += `<div class = "orientation"><label class="switch"><input type="checkbox" id="${k}"><span class="slider round"></span></label><p style="display: inline; padding: 2px">${k}</p></div>`;
    container.innerHTML += `<div class = "orientation"><label class="switch"><input type="checkbox" id="${x}"><span class="slider round"></span></label><p style="display: inline; padding: 2px">${x}</p></div>`;
    //container.innerHTML += `<div class = "orientation"><label class="switch"><input type="checkbox" id="${y}"><span class="slider round"></span></label><p style="display: inline; padding: 2px">${y}</p></div>`;
    addClicks();

    chrome.storage.sync.get('storyState', function (result) {
      const hideStory = document.getElementById(j);
      if (result.storyState === true) {
        hideStory.checked = !hideStory.checked;
      }
    });

    chrome.storage.sync.get('feedState', function (result) {
      const hideFeed = document.getElementById(i);
      if (result.feedState === true) {
        hideFeed.checked = !hideFeed.checked;
      }
    });

    chrome.storage.sync.get('dmState', function (result) {
      const hideDm = document.getElementById(k);
      if (result.dmState === true) {
        hideDm.checked = !hideDm.checked;
      }
    });

    chrome.storage.sync.get('reelState', function (result) {
      const hideReel = document.getElementById(x);
      if (result.reelState === true) {
        hideReel.checked = !hideReel.checked;
      }
    });

    chrome.storage.sync.get('exploreState', function (result) {
      const hideExplore = document.getElementById(y);
      if (result.exploreState === true) {
        hideExplore.checked = !hideExplore.checked;
      }
    });

  } else {
    container.innerHTML = '<div class="title">Good Job! You are not on Instagram</div>';
  }



});

const addClicks = () => {
  const hideFeed = document.getElementById(i);
  const hideStory = document.getElementById(j);
  const hideDms = document.getElementById(k);
  const hideReel = document.getElementById(x);
  const hideExplore = document.getElementById(y)
  hideFeed.addEventListener("click", changeFeed);
  hideStory.addEventListener("click", changeStory);
  hideDms.addEventListener("click", changeDms);
  hideReel.addEventListener("click", changeReel);
  hideExplore.addEventListener("click", changeExplore);


};

const changeFeed = async () => {
  const activeTab = await getCurrentTab();
  const hideFeed = document.getElementById(i);

  if (hideFeed.checked) {

    setState('feedState', true)
    chrome.tabs.sendMessage(activeTab.id, {
      type: "HIDEFEED",
      bool: "TRUE",

    });
  }
  else {

    setState('feedState', false)
    chrome.tabs.sendMessage(activeTab.id, {
      type: "HIDEFEED",
      bool: "FALSE",
    });
  }
};

const changeStory = async () => {
  const activeTab = await getCurrentTab();
  const hideStory = document.getElementById(j);

  if (hideStory.checked) {
    setState('storyState', true)
    chrome.tabs.sendMessage(activeTab.id, {
      type: "HIDESTORY",
      bool: "TRUE",
    });
  }
  else {
    setState('storyState', false)
    chrome.tabs.sendMessage(activeTab.id, {
      type: "HIDESTORY",
      bool: "FALSE",
    });
  }
};


const changeDms = async () => {
  const activeTab = await getCurrentTab();
  const hideDms = document.getElementById(k);

  if (hideDms.checked) {
    setState('dmState', true)
    chrome.tabs.sendMessage(activeTab.id, {
      type: "HIDEDM",
      bool: "TRUE",
    });
  }
  else {
    setState('dmState', false)
    chrome.tabs.sendMessage(activeTab.id, {
      type: "HIDEDM",
      bool: "FALSE",
    });
  }
};

const changeReel = async () => {
  const activeTab = await getCurrentTab();
  const hideReel = document.getElementById(x);

  if (hideReel.checked) {
    setState('reelState', true)
    chrome.tabs.sendMessage(activeTab.id, {
      type: "HIDEREEL",
      bool: "TRUE",
    });
  }
  else {
    setState('reelState', false)
    chrome.tabs.sendMessage(activeTab.id, {
      type: "HIDEREEL",
      bool: "FALSE",
    });
  }
};

const changeExplore = async () => {
  const activeTab = await getCurrentTab();
  const hideExplore = document.getElementById(y);

  if (hideExplore.checked) {
    setState('exploreState', true)
    chrome.tabs.sendMessage(activeTab.id, {
      type: "HIDEEXPLORE",
      bool: "TRUE",
    });
  }
  else {
    setState('exploreState', false)
    chrome.tabs.sendMessage(activeTab.id, {
      type: "HIDEEXPLORE",
      bool: "FALSE",
    });
  }
};



const setState = (key, value) => {
  chrome.storage.sync.get(key, function (result) {
    chrome.storage.sync.set({ [key]: value });
  });
}

const checkState = (key) => {
  chrome.storage.sync.get(key, function (result) {
    console.log(result[key]);
    return (result[key]);

  });
}