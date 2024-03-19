
(() => {
    let feed, dms, story, reel, explore, parentFeed, parentMsg, parentStory, parentReel, parentExplore;



    chrome.runtime.onMessage.addListener((obj, sender, response) => {


        const { type, bool } = obj;
        if (type === "INSTAGRAM") {
            //Logic to deal with each state state on load and go to settings last used by user 
            feed = document.getElementsByClassName("xdt5ytf xqjyukv x6s0dn4 x1oa3qoh x1nhvcw1")[0];
            parentFeed = feed.parentElement;

            story = document.getElementsByClassName("_aac4")[0];
            parentStory = story.parentElement;


            chrome.storage.sync.get('storyState', function (result) {
                if (result.storyState === true) {
                    hideStory();
                }
            });

            chrome.storage.sync.get('feedState', function (result) {
                if (result.feedState === true) {
                    hideFeed();
                }
            });

            chrome.storage.sync.get('dmState', function (result) {
                if (result.dmState === true) {
                    setTimeout(hideDm, 2000);
                }
            });

            chrome.storage.sync.get('reelState', function (result) {
                if (result.reelState === true) {
                    setTimeout(hideReel, 2000);
                }
            });

            chrome.storage.sync.get('exploreState', function (result) {
                if (result.exploreState === true) {
                    setTimeout(hideExplore, 2000);
                }
            });

        }

        if (type === "HIDEFEED" && bool == "TRUE") {
            hideFeed();
        }
        else if (type === "HIDEFEED" && bool == "FALSE") {
            parentFeed.append(feed);
        }
        if (type === "HIDESTORY" && bool == "TRUE") {
            hideStory();
        }
        else if (type === "HIDESTORY" && bool == "FALSE") {
            parentStory.append(story);
        }
        if (type === "HIDEDM" && bool == "TRUE") {
            hideDm();
        }
        else if (type === "HIDEDM" && bool == "FALSE") {
            parentMsg.append(dms);
        };
        if (type === "HIDEREEL" && bool == "TRUE") {
            hideReel();
        }
        else if (type === "HIDEREEL" && bool == "FALSE") {
            parentReel.append(reel);
        };
        if (type === "HIDEEXPLORE" && bool == "TRUE") {
            hideExplore();
        }
        else if (type === "HIDEEXPLORE" && bool == "FALSE") {
            parentExplore.append(explore);
        };
    });

    const hideFeed = () => {
        feed.remove();
    }

    const hideStory = () => {
        story.remove();
    }

    const hideDm = () => {
        dms = document.querySelector("a[href='/direct/inbox/']");
        parentMsg = dms.parentElement;
        dms.remove();
    }

    const hideReel = () => {
        reel = document.querySelector("a[href='/reels/']");
        parentReel = reel.parentElement;
        reel.remove();
    }
    const hideExplore = () => {
        reel = document.querySelector("a[href='/reels/']");
        parentReel = reel.parentElement;
        reel.remove();
    }





})();