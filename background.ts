chrome.tabs.onUpdated.addListener((tabId, tab) => {
  const match_article = /https?:\/\/(medium\.com\/(p\/[a-zA-Z0-9]+|@[\w-]+\/[\w-]+|[\w-]+\/[\w-]+)|[\w-]+\.medium\.com\/[\w-]+)/;
  if (match_article.test(tab.url)) {
    chrome.tabs.sendMessage(tabId, {
      lilac: tab.url,
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.openPopup();
})