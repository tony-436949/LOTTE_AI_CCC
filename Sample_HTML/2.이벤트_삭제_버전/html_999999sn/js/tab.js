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

const tabArea = document.querySelectorAll(".tab-area");
const tabBtnArea = document.querySelector(".tab-btn-area");
const tabBtn = document.querySelectorAll(".tab-btn");
const tabBtnImage = tabBtn[0].querySelector("img");

// TODO ********************************************************************
// ! postMessage 동작 - 보내기
// TODO ********************************************************************

// ! setTabDataInit setting - 데이터 초기화 메세지 보내기 [S]
const setTabDataInit = () => {
  // * 탭 상세,탭 버튼 영역 높이값 & 탭 상세,탭 버튼 영역 위치값 설정
  if (initCommonObj.isTabValues) {
    initCommonObj.tabAreaHeight = [];
    tabArea.forEach((element) => {
      initCommonObj.tabAreaHeight.push(element.getBoundingClientRect().height);
    });

    initCommonObj.tabAreaPosition = [];
    tabArea.forEach((element) => {
      initCommonObj.tabAreaPosition.push(
        element.getBoundingClientRect().top -
          tabBtnArea.getBoundingClientRect().height
      );
    });

    initCommonObj.tabBtnAreaHeight = tabBtnArea.getBoundingClientRect().height;
    initCommonObj.tabBtnAreaPosition = tabBtnArea.getBoundingClientRect().top;

    window.parent.postMessage(
      {
        fnNm: "setDataInit",
        param: {
          tabAreaHeight: initCommonObj.tabAreaHeight,
          tabAreaPosition: initCommonObj.tabAreaPosition,
          tabBtnAreaHeight: initCommonObj.tabBtnAreaHeight,
          tabBtnAreaPosition: initCommonObj.tabBtnAreaPosition,
        },
      },
      "*"
    );
  }
};
setTabDataInit();
// setTabDataInit setting - 데이터 초기화 메세지 보내기 [E]

// ! tabClone - 탭 복사 설정 메세지 보내기 [S]
const tabClone = () => {
  let imgExtension;

  if (tabBtnArea.classList.contains("basic-tab")) {
    initCommonObj.isSwiper = false;
  } else if (tabBtnArea.classList.contains("swiper-tab")) {
    initCommonObj.isSwiper = true;
  }

  if (initCommonObj.isSwiper) {
    initCommonObj.swiperTab = new Swiper(".tab-btn-area.swiper-tab .swiper", {
      observer: true,
      observeParents: true,
      slidesPerView: "auto",
      freeMode: true,
      debugger: true,
      on: {
        setTranslate: function (swiper, translate) {
          slideTransform(translate);
        },
      },
    });
  }

  if (tabBtnImage.src.includes(".jpg")) {
    imgExtension = "jpg";
  } else if (tabBtnImage.src.includes(".png")) {
    imgExtension = "png";
  }

  window.parent.postMessage(
    {
      fnNm: "tabClone",
      param: {
        count: tabBtn.length,
        imgExtension,
        isSwiper: initCommonObj.isSwiper,
      },
    },
    "*"
  );
};
// tabClone - 탭 복사 설정 메세지 보내기 [E]

// ! tabClick 동작 메세지 보내기 [S]
const tabClickAction = (idx) => {
  if (initCommonObj.deviceState != "kiosk") {
    window.parent.postMessage(
      {
        fnNm: "tabClickAction",
        param: {
          tabIdx: idx,
        },
      },
      "*"
    );
  } else {
    tabBtn.forEach((element) => {
      element.classList.remove("on");
    });
    tabBtn[idx].classList.add("on");
    if (initCommonObj.isSwiper) {
      initCommonObj.swiperTab.slideTo(idx);
    }

    tabArea.forEach((element) => {
      element.style.display = "none";
    });
    tabArea[idx].style.display = "block";

    if (document.querySelector(".audio-range") != null) {
      audioStop(true);
    }
    setDataInit();
    setTabDataInit();
  }
};
// tabClick 동작 메세지 보내기 [E]

// ! slideTransform 동작 메세지 보내기 [S]
const slideTransform = (transform) => {
  window.parent.postMessage(
    {
      fnNm: "slideTransform",
      param: {
        transform,
      },
    },
    "*"
  );
};
// slideTransform 동작 메세지 보내기 [E]

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
      // * 탭 상세,탭 버튼 영역 높이값 & 탭 상세,탭 버튼 영역 위치값 설정
      if (param.isTabValues) {
        if (!initCommonObj.isTabValues) {
          initCommonObj.isTabValues = param.isTabValues;
        }

        // console.log('setDataInit function call!');
        setTabDataInit();
      }
    }

    // * 탭 복사
    if (fnNm === "getTabCloneData") {
      tabClone();
    }

    // * 탭 연동 설정
    if (fnNm === "ifSlideTransform") {
      if (param && param.transform != undefined) {
        const swiperWrapper = document.querySelector(
          ".tab-btn-area.swiper-tab .swiper-wrapper"
        );

        swiperWrapper.style.transform = `translate3d(${param.transform}px, 0px, 0px)`;
      }
    }
  }
});
// parent window message receive - parent window에서 메세지 받기 [E]

// TODO ********************************************************************
// ! iframe 내부 동작
// TODO ********************************************************************

// ! kioskTabAreaInit - 키오스트 탭 초기화 [S]
const kioskTabAreaInit = () => {
  const tabArea = document.querySelectorAll(".tab-area");
  tabArea.forEach((element, idx) => {
    if (idx == 0) return;
    element.style.display = "none";
  });

  setDataInit();
  setTabDataInit();
};
setTimeout(() => {
  if (initCommonObj.deviceState == "kiosk") {
    kioskTabAreaInit();
  }
}, 300);
// kioskTabAreaInit - 키오스트 탭 초기화 [E]

// ! tabClickFn - 탭 클릭 함수 [S]
const tabClickFn = () => {
  tabBtn.forEach((element, idx) => {
    element.addEventListener("click", () => tabClickAction(idx));
  });
};
tabClickFn();
// tabClickFn - 탭 클릭 함수 [E]
