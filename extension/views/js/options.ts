chrome.storage.sync.get(['userNum'], res => {
    document.querySelector<HTMLInputElement>('#userNum').value = res.userNum;
});

document.querySelector('#save').addEventListener('click', event => {
    document.querySelector<HTMLElement>('#saved').style.visibility = 'hidden';
    const userNum = document.querySelector<HTMLInputElement>('#userNum').value;
    console.log(userNum);

    chrome.storage.sync.set({ userNum: Number(userNum) }, () => {
        document.querySelector<HTMLElement>('#saved').style.visibility =
            'visible';
        setTimeout(() => {
            document.querySelector<HTMLElement>('#saved').style.visibility =
                'hidden';
        }, 2000);
    });
});
