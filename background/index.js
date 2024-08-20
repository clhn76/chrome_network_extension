
// 규칙 활성화/비활성화 함수
function updateRules(rulesetId, enabled) {
  this.chrome.declarativeNetRequest.updateEnabledRulesets({
    disableRulesetIds: enabled ? [] : [rulesetId],
    enableRulesetIds: enabled ? [rulesetId] : [],
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["httpsEnabled", "cspEnabled"], function (data) {
    if (data.httpsEnabled === undefined) {
      chrome.storage.sync.set({ httpsEnabled: true });
    }
    if (data.cspEnabled === undefined) {
      chrome.storage.sync.set({ cspEnabled: true });
    }
    this.updateRules("https_ruleset", data.httpsEnabled !== false);
    this.updateRules("csp_ruleset", data.cspEnabled !== false);
  });
});

// 메시지 리스너
this.chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.action === "updateRules") {
      this.updateRules(request.rulesetId, request.enabled);
    }
  }
);