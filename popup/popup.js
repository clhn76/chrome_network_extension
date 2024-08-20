document.addEventListener("DOMContentLoaded", function () {
  var httpsSwitch = document.getElementById("httpsSwitch");
  var cspSwitch = document.getElementById("cspSwitch");

  // 저장된 상태 불러오기
  chrome.storage.sync.get(["httpsEnabled", "cspEnabled"], function (data) {
    httpsSwitch.checked = data.httpsEnabled !== false;
    cspSwitch.checked = data.cspEnabled !== false;
  });

  // HTTPS 스위치 이벤트 리스너
  httpsSwitch.addEventListener("change", function () {
    var isEnabled = this.checked;
    chrome.storage.sync.set({ httpsEnabled: isEnabled }, function () {
      console.log(
        "HTTPS enforcement is " + (isEnabled ? "enabled" : "disabled")
      );
    });
    chrome.runtime.sendMessage({
      action: "updateRules",
      rulesetId: "https_ruleset",
      enabled: isEnabled,
    });
  });

  // CSP 스위치 이벤트 리스너
  cspSwitch.addEventListener("change", function () {
    var isEnabled = this.checked;
    chrome.storage.sync.set({ cspEnabled: isEnabled }, function () {
      console.log("CSP enforcement is " + (isEnabled ? "enabled" : "disabled"));
    });
    chrome.runtime.sendMessage({
      action: "updateRules",
      rulesetId: "csp_ruleset",
      enabled: isEnabled,
    });
  });
});
