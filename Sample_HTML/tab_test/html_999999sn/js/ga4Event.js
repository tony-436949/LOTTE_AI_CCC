window.dataLayer = window.dataLayer || [];

(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-K8J2ZKT");

var ga4Event = {
  isIPHONE:
    navigator.userAgent.match("iPhone") != null ||
    navigator.userAgent.match("iPod") != null,
  isIPAD: navigator.userAgent.match("iPad") != null,
  isANDROID: navigator.userAgent.match("Android") != null,
  isApp: function () {
    if (
      window.AnalyticsWebInterface ||
      (window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers.firebase)
    ) {
      return true;
    }

    return false;
  },
  logEvent: function (name, params) {
    //앱 이벤트 태깅
    if (!name) {
      return;
    }
    try {
      if (this.isANDROID) {
        // Call Android interface
        window.AnalyticsWebInterface.logEvent(name, JSON.stringify(params));
      } else if (this.isIPAD || this.isIPHONE) {
        // Call iOS interface
        var message = {
          command: "logEvent",
          name: name,
          parameters: params,
        };
        window.webkit.messageHandlers.firebase.postMessage(message);
      } else {
        // No Android or iOS interface found
        console.log("No native APIs found.");
      }
    } catch (e) {
      console.error("GA logEvent Error");
      console.error("name : ", name);
      console.error("params : ", params);
      console.error(e);
    }
  },
  event: function (
    event_name,
    event_category,
    event_action,
    event_label,
    event_addInfo,
    json_custom_params,
    dept_mall_yn
  ) {
    // 이벤트 태깅(APP/WEB)
    var event_data = {
      event: "ga_event", //트리거설정
      event_name: event_name, //이벤트명
      event_params: {
        // 카테고리,액션,라벨은 쌍으로 하나라도 누락되면 NOT SET으로 표시됨.
        event_category: event_category, //이벤트카테고리
        event_action: event_action, // 이벤트 액션
        event_label: event_label, //이벤트 라벨
        event_addInfo: event_addInfo || "", // 이벤트 부가정보
      },
    };
    // console.log(event_data);
    try {
      if (json_custom_params != null) {
        // 추가적으로 보내야할 공통 맞춤정의 값이 있으면 event_data.event_params에 같이 넣어서 전달하여 전송 필요
        for (let key in json_custom_params) {
          event_data.event_params[key] = json_custom_params[key];
        }
      }

      // (신규추가) 백화점몰 콘텐츠여부(백화점몰 송객 시 "Y", 아닐 경우 ""(빈 값) or "N"세팅
      if (dept_mall_yn != null) {
        event_data.event_params["dept_mall_yn"] = dept_mall_yn;
      }

      event_data.event_params.dev_yn = "N"; // 운영
      // if (_ACTIVE_ && _ACTIVE_ !== 'prd') {
      // 	console.log(event_data);
      // 	event_data.event_params.dev_yn = 'Y'; // 개발
      // }

      //Normalize Email Sha256 Hash값
      if (!event_data.event_params.user_eid)
        event_data.event_params.user_eid = "";

      if (this.isApp()) {
        event_data.event_params["event_category"] = event_category.startsWith(
          "MO_"
        )
          ? event_category.replace("MO_", "APP_")
          : event_category;
        // APP 웹뷰 내에서 호출할 경우 APP-Javascript Handler logEvent호출하여 데이터 전송
        this.logEvent(event_data.event_name, event_data.event_params);
      } else {
        // 웹브라우저에서 호출할 경우 dataLayer로 넣어 GTM에서 데이터 전송(공통 맞춤정의는 자동전송)
        event_data.event_params["event_category"] = event_category.startsWith(
          "APP_"
        )
          ? event_category.replace("APP_", "MO_")
          : event_category;
        dataLayer.push(event_data);
      }
    } catch (e) {
      console.error("GA sending Error");
      console.error("data : ", event_data);
      console.error(e);
    }
  },
};
