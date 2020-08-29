(() => {
    let userNum = 1;

    chrome.webRequest.onBeforeRequest.addListener(
        details => {
            if (userNum == null) userNum = 1;

            // Verify that classroom.google.com is the host
            if (
                ![5, 6].includes(details.url.indexOf('//classroom.google.com'))
            ) {
                return;
            }

            // Exit if already signed in to correct user
            if (details.url.includes('/u/' + userNum)) return;

            let redirectUrl;

            if (/\/u\/[0-9]/.test(details.url)) {
                // Replace if incorrect user
                redirectUrl = details.url.replace(
                    /\/u\/[0-9]/,
                    '/u/' + userNum
                );
            } else {
                // Insert if no user
                redirectUrl = details.url.replace(
                    '//classroom.google.com',
                    '//classroom.google.com/u/1'
                );
            }

            return { redirectUrl };
        },
        {
            urls: ['*://classroom.google.com/*']
        },
        ['blocking']
    );

    chrome.storage.sync.get(['userNum'], res => void (userNum = res.userNum));

    chrome.storage.onChanged.addListener(changes => {
        if (changes['userNum']) userNum = changes['userNum'].newValue;
    });

    chrome.runtime.onInstalled.addListener(function (details) {
        if (details.reason !== 'install') return;

        chrome.storage.sync.set({ userNum: 1 });
        chrome.tabs.create({ url: 'views/options.html?newinstall=yes' });
    });
})();
