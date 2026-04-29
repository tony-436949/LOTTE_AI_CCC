// *************************************************************************
// *************************************************************************
// * 2025.03.31 작업
// * 작업자 : 조윤상
// * version : v1.0
// *************************************************************************
// *************************************************************************

// TODO ********************************************************************
// ! 전역 변수
// TODO ********************************************************************

const iframeHtml = document.querySelector("html");
const initCommonObj = {
  // deviceState: '',
  // iframeHeight: 0,
  isIframeHeight: false,
  tabAreaHeight: [],
  tabAreaPosition: [],
  tabBtnAreaHeight: 0,
  tabBtnAreaPosition: 0,
  isTabValues: false,
};

// TODO ********************************************************************
// ! postMessage 동작 - 보내기
// TODO ********************************************************************

// ! setImgPath - 이미지 경로 설정 [S]
const setImgPath = (() => {
  const imgTag = document.getElementsByTagName("img");
  let basePath;
  if (imgTag[0].src.includes("http://127.0.0.1")) {
    basePath = imgTag[0].src.substring(0, imgTag[0].src.indexOf("/images"));
  } else {
    if (imgTag[0].src.includes("https://www")) {
      basePath = imgTag[0].src
        .substring(0, imgTag[0].src.indexOf("/images"))
        .replace("https://www", "https://minfo");
    } else if (imgTag[0].src.includes("https://m")) {
      basePath = imgTag[0].src
        .substring(0, imgTag[0].src.indexOf("/images"))
        .replace("https://m", "https://minfo");
    }
  }
  const imgPath = `${basePath}/images`;

  initCommonObj.basePath = basePath;
  initCommonObj.imgPath = imgPath;

  // console.log(basePath);
  // console.log(imgPath);

  window.parent.postMessage(
    {
      fnNm: "setImgPath",
      param: {
        basePath,
        imgPath,
      },
    },
    "*"
  );
})();

// setImgPath - 이미지 경로 설정 [E]

// ! setDataInit setting - 데이터 초기화 메세지 보내기 [S]
const setDataInit = () => {
  // * iframe 높이값 설정
  if (initCommonObj.isIframeHeight) {
    if (
      initCommonObj.iframeHeight != iframeHtml.getBoundingClientRect().height
    ) {
      initCommonObj.iframeHeight = iframeHtml.getBoundingClientRect().height;

      window.parent.postMessage(
        {
          fnNm: "setDataInit",
          param: {
            iframeHeight: iframeHtml.getBoundingClientRect().height,
          },
        },
        "*"
      );
    }
  }
};
setDataInit();
// setDataInit setting - 데이터 초기화 메세지 보내기 [E]

// ! targetMoveScroll setting - 타겟 위치 스크롤 이동 [S]
const targetMoveScroll = (target) => {
  const tabBtnArea = document.querySelector(".tab-btn-area");

  window.parent.postMessage(
    {
      fnNm: "targetMoveScroll",
      param: {
        targetPosition: tabBtnArea
          ? target.getBoundingClientRect().top -
            tabBtnArea.getBoundingClientRect().height
          : target.getBoundingClientRect().top,
      },
    },
    "*"
  );
};
// targetMoveScroll setting - 타겟 위치 스크롤 이동 [E]

// TODO ********************************************************************
// ! postMessage 동작 - 받기
// TODO ********************************************************************

// ! parent window message receive - parent window에서 메세지 받기 [S]
window.addEventListener("message", (message) => {
  if (message && message.data) {
    // 크롭 확장프로그램 [react-devtools] postMessage 차단
    // if (message.data.source == 'react-devtools-content-script') return;
    // console.log(message);

    const fnNm = message.data.fnNm;
    const param = message.data.param;

    // console.log(param);

    if (fnNm === "setDataInit") {
      // * 디바이스값 설정
      if (param.deviceState) {
        // * deviceState 따른 기본 동작
        if (param.deviceState == "pc") {
          elDel("pcDel");
        } else if (param.deviceState == "mo") {
          elDel("moDel");
        } else if (param.deviceState == "app") {
          elDel("appDel");
        } else if (param.deviceState == "kiosk") {
          elDel("kioskDel");
        }

        initCommonObj.deviceState = param.deviceState;
      }

      // * iframe 높이값 설정
      if (param.isIframeHeight) {
        if (
          initCommonObj.iframeHeight ==
          iframeHtml.getBoundingClientRect().height
        ) {
          return;
        }

        if (!initCommonObj.isIframeHeight) {
          initCommonObj.isIframeHeight = param.isIframeHeight;
        }

        // console.log('setDataInit function call!');
        setDataInit();
      }
    }
  }
});
// parent window message receive - parent window에서 메세지 받기 [E]

// TODO ********************************************************************
// ! iframe 내부 동작
// TODO ********************************************************************

// ! 태깅 [S]
// * 2023.11.09 수정
const APP_EVENT = (label, addInfo) => {
  // <!-- ! lable : 버튼명, addInfo : 이벤트 부가정보 -->
  ga4Event.event("click_event", "APP_쇼핑뉴스상세", "하단버튼", label, addInfo);
};

const tg = () => {
  const linkAll = document.querySelectorAll(".link-btn");

  if (linkAll) {
    linkAll.forEach((element) => {
      const idx = element.dataset.order;

      element.onclick = () => {
        APP_EVENT(linkObj[idx].value, `${contentName}_${contentCode}`);
      };

      LinkSetting(element, linkObj[idx].type, "yes", linkObj[idx].url);
    });
  }
};
setTimeout(() => {
  tg();
}, 500);
// 태깅 [E]

// ! toggle-box - 토글 박스 [S]
const toggleAction = (e) => {
  e.target.closest(".toggle-box").classList.toggle("on");
  setDataInit();

  if (document.querySelector(".tab-btn-area")) {
    setTabDataInit();
  }
};

const toggleBtn = document.querySelectorAll(".toggle-box__btns");
toggleBtn.forEach((element) => {
  element.addEventListener("click", toggleAction);
});
// toggle-box - 토글 박스 [E]

// ! copy - 복사 [S]
const copyAction = (e) => {
  navigator.clipboard.writeText(e.target.dataset.text);
  window.alert("복사되었습니다.");
};

const copyBtn = document.querySelectorAll(".copy-btn");
copyBtn.forEach((element) => {
  element.addEventListener("click", copyAction);
});
// copy - 복사 [E]

// ! elDel - 엘리먼트 삭제 [S]
const elDel = (className) => {
  const hiddenContent = document.querySelectorAll(`.${className}`);

  if (hiddenContent.length == 0) {
    return;
  }
  for (const iterator of hiddenContent) {
    iterator.remove();
  }
};
// elDel - 엘리먼트 삭제 [E]

// TODO ********************************************************************
// TODO ********************************************************************
// ! 1. search.js
// ! 2. modal search.js
// ! 3. pinch-zoom.js

// ! 검색 작업
// ! 모달 검색 작업
// ! 핀치줌 작업
// ! 기능 추가....
// TODO ********************************************************************
// TODO ********************************************************************
