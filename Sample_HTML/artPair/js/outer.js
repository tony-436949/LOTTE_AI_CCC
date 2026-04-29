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

const initOuterObj = {
  // deviceState: '',
  // iframeHeight: 0,
  // tabAreaPosition: [],
  // tabAreaHeight: [],
  // tabBtnAreaPosition: 0,
  // tabBtnAreaHeight: 0,
  basicTopPosition: 1,
  oldBasicTopPosition: 0,
  isModalCdn: false,
};

// TODO ********************************************************************
// ! postMessage 동작 - 보내기
// TODO ********************************************************************

// ! getDeviceSet - 디바이스 설정값 메세지 보내기 [S]
const getDeviceSet = () => {
  // the_iframe : 쇼핑뉴스 iframe
  // detailHTML : 이벤트 iframe

  let iframe;

  if (
    document.getElementById("the_iframe") &&
    !document.getElementById("detailHTML")
  ) {
    iframe = document.getElementById("the_iframe");
  } else if (
    !document.getElementById("the_iframe") &&
    document.getElementById("detailHTML")
  ) {
    iframe = document.getElementById("detailHTML");
  }

  if (!document.body.classList.contains("kiosk")) {
    if (!document.querySelector(".snb")) {
      // * PC
      initOuterObj.deviceState = "pc";
    } else {
      const browserInfo = navigator.userAgent;
      if (
        browserInfo.indexOf("LD_Android") > -1 ||
        browserInfo.indexOf("LD_iOS") > -1
      ) {
        // * APP
        initOuterObj.deviceState = "app";
      } else {
        // * MO
        initOuterObj.deviceState = "mo";
      }
      // * APP
    }
  } else {
    // * KIOSK
    initOuterObj.deviceState = "kiosk";
  }

  if (iframe) {
    iframe.contentWindow.postMessage(
      { fnNm: "setDataInit", param: { deviceState: initOuterObj.deviceState } },
      "*",
    );
    // console.log('outer send initOuterObj deviceState', initOuterObj.deviceState);
  }
};
// getDeviceSet - 디바이스 설정값 메세지 보내기 [E]

// ! getIframeHeightIF setting - iframe 높이값 설정 메세지 보내기 [S]
const getIframeHeightIF = (iframeHeight) => {
  // the_iframe : 쇼핑뉴스 iframe
  // detailHTML : 이벤트 iframe

  let iframe;

  if (
    document.getElementById("the_iframe") &&
    !document.getElementById("detailHTML")
  ) {
    iframe = document.getElementById("the_iframe");
  } else if (
    !document.getElementById("the_iframe") &&
    document.getElementById("detailHTML")
  ) {
    iframe = document.getElementById("detailHTML");
  }

  iframe.style.height = `${iframeHeight}px`;

  if (iframe) {
    iframe.contentWindow.postMessage(
      { fnNm: "setDataInit", param: { isIframeHeight: true } },
      "*",
    );
  }
};
// getIframeHeightIF setting - iframe 높이값 설정 메세지 보내기 [E]

// ! getTabValues - 탭 상세,탭 버튼 영역 높이값 & 탭 상세,탭 버튼 영역 위치값 설정 메세지 보내기 [S]
const getTabValues = () => {
  // the_iframe : 쇼핑뉴스 iframe
  // detailHTML : 이벤트 iframe

  let iframe;

  if (
    document.getElementById("the_iframe") &&
    !document.getElementById("detailHTML")
  ) {
    iframe = document.getElementById("the_iframe");
  } else if (
    !document.getElementById("the_iframe") &&
    document.getElementById("detailHTML")
  ) {
    iframe = document.getElementById("detailHTML");
  }

  if (iframe) {
    iframe.contentWindow.postMessage(
      {
        fnNm: "setDataInit",
        param: {
          isTabValues: true,
        },
      },
      "*",
    );
  }
};
// getTabValues - 탭 상세,탭 버튼 영역 높이값 & 탭 상세,탭 버튼 영역 위치값 설정 메세지 보내기 [E]

// ! getTabCloneData - 탭 복사 데이터 설정 메세지 보내기 [S]
const getTabCloneData = () => {
  // the_iframe : 쇼핑뉴스 iframe
  // detailHTML : 이벤트 iframe

  let iframe;

  if (
    document.getElementById("the_iframe") &&
    !document.getElementById("detailHTML")
  ) {
    iframe = document.getElementById("the_iframe");
  } else if (
    !document.getElementById("the_iframe") &&
    document.getElementById("detailHTML")
  ) {
    iframe = document.getElementById("detailHTML");
  }

  if (iframe) {
    iframe.contentWindow.postMessage(
      {
        fnNm: "getTabCloneData",
      },
      "*",
    );
  }
};
// getTabCloneData - 탭 복사 데이터 설정 메세지 보내기 [E]

// ! ifSlideTransform - 탭 연동 설정 보내기 [S]
const ifSlideTransform = (transform) => {
  // the_iframe : 쇼핑뉴스 iframe
  // detailHTML : 이벤트 iframe

  let iframe;

  if (
    document.getElementById("the_iframe") &&
    !document.getElementById("detailHTML")
  ) {
    iframe = document.getElementById("the_iframe");
  } else if (
    !document.getElementById("the_iframe") &&
    document.getElementById("detailHTML")
  ) {
    iframe = document.getElementById("detailHTML");
  }

  if (iframe) {
    iframe.contentWindow.postMessage(
      {
        fnNm: "ifSlideTransform",
        param: {
          transform,
        },
      },
      "*",
    );
  }
};
// ifSlideTransform - 탭 연동 설정 보내기 [E]

// ! getModalCreateData - 모달 만들기 데이터 설정 메세지 보내기 [S]
const getModalCreateData = () => {
  // the_iframe : 쇼핑뉴스 iframe
  // detailHTML : 이벤트 iframe

  let iframe;

  if (
    document.getElementById("the_iframe") &&
    !document.getElementById("detailHTML")
  ) {
    iframe = document.getElementById("the_iframe");
  } else if (
    !document.getElementById("the_iframe") &&
    document.getElementById("detailHTML")
  ) {
    iframe = document.getElementById("detailHTML");
  }

  if (iframe) {
    iframe.contentWindow.postMessage(
      {
        fnNm: "modalWrapCreate",
      },
      "*",
    );
  }
};
// getModalCreateData - 모달 만들기 데이터 설정 메세지 보내기 [E]

// ! ifModalContentEdit - 모달 수정 메세지 보내기 [S]
const ifModalContentEdit = (content) => {
  // the_iframe : 쇼핑뉴스 iframe
  // detailHTML : 이벤트 iframe

  let iframe;

  if (
    document.getElementById("the_iframe") &&
    !document.getElementById("detailHTML")
  ) {
    iframe = document.getElementById("the_iframe");
  } else if (
    !document.getElementById("the_iframe") &&
    document.getElementById("detailHTML")
  ) {
    iframe = document.getElementById("detailHTML");
  }

  let modalLink = false;

  if (content.includes("if-link-btn")) {
    modalLink = true;
  }

  if (iframe) {
    iframe.contentWindow.postMessage(
      {
        fnNm: "modalContentEdit",
        param: {
          modalLink,
        },
      },
      "*",
    );
  }
};
// ifModalContentEdit - 모달 수정 메세지 보내기 [E]

// ! getIframeVisibilityChange - 컨텐츠 변경 시, 메세지 보내기 [S]
const getIframeVisibilityChange = () => {
  // the_iframe : 쇼핑뉴스 iframe
  // detailHTML : 이벤트 iframe

  let iframe;

  if (
    document.getElementById("the_iframe") &&
    !document.getElementById("detailHTML")
  ) {
    iframe = document.getElementById("the_iframe");
  } else if (
    !document.getElementById("the_iframe") &&
    document.getElementById("detailHTML")
  ) {
    iframe = document.getElementById("detailHTML");
  }

  if (iframe) {
    iframe.contentWindow.postMessage(
      {
        fnNm: "getIframeVisibilityChange",
        param: { audioState: true },
      },
      "*",
    );
  }
};
// getIframeVisibilityChange - 컨텐츠 변경 시, 메세지 보내기 [E]

// TODO ********************************************************************
// ! postMessage 동작 - 받기
// TODO ********************************************************************

// ! iframe message receive - iframe에서 메세지 받기 [S]
window.addEventListener("message", (message) => {
  if (message && message.data) {
    // 크롭 확장프로그램 [react-devtools] postMessage 차단
    // if (message.data.source == 'react-devtools-content-script') return;
    // console.log(message);

    const fnNm = message.data.fnNm;
    const param = message.data.param;

    // * 이미지 경로 설정
    if (fnNm === "setImgPath" && param && param.basePath && param.imgPath) {
      initOuterObj.basePath = param.basePath;
      initOuterObj.imgPath = param.imgPath;
    }

    // * iframe 높이값 설정
    if (fnNm === "setDataInit" && param && param.iframeHeight) {
      getIframeHeightIF(param.iframeHeight);
    }

    // * 탭 상세,탭 버튼 영역 높이값 & 탭 상세,탭 버튼 영역 위치값 설정
    if (
      fnNm === "setDataInit" &&
      param &&
      param.tabAreaHeight &&
      param.tabAreaPosition &&
      param.tabBtnAreaHeight &&
      typeof param.tabBtnAreaPosition == "number"
    ) {
      initOuterObj.tabAreaHeight = param.tabAreaHeight;
      initOuterObj.tabAreaPosition = param.tabAreaPosition;
      initOuterObj.tabBtnAreaHeight = param.tabBtnAreaHeight;
      initOuterObj.tabBtnAreaPosition = param.tabBtnAreaPosition;
    }

    // * 탭 복사 설정
    if (fnNm === "tabClone") {
      if (param && param.count && param.imgExtension) {
        if (param.isSwiper) {
          initOuterObj.isSwiper = param.isSwiper;
        }
        getIframeTabClone(param.count, param.imgExtension);
      }
    }

    // * 탭 클릭 설정
    if (fnNm === "tabClickAction") {
      if (param && param.tabIdx != undefined) {
        getTabClickAction(param.tabIdx);
      }
    }

    // * 탭 연동 설정
    if (fnNm === "slideTransform") {
      if (param && param.transform != undefined) {
        const swiperWrapper = document.querySelector(
          ".tab-btn-area.swiper-tab .swiper-wrapper",
        );

        swiperWrapper.style.transform = `translate3d(${param.transform}px, 0px, 0px)`;
      }
    }

    // * 타겟 위치 스크롤 이동
    if (fnNm === "targetMoveScroll") {
      if (param && param.targetPosition) {
        targetMoveScrollAction(param.targetPosition);
      }
    }

    // * 모달 만들기
    if (fnNm === "modalWrapCreate") {
      if (param && param.modalImgPath) {
        getModalWrapCreate(
          param.modalImgPath,
          param.modalState,
          param.headerState,
        );
      }
    }

    // * 모달 열기 설정
    if (fnNm === "modalOpen") {
      if (param && param.modalContent) {
        modalOpenAction(param.modalContent);
      }
    }

    // * 모달 링크 설정
    if (fnNm === "setModalLink") {
      if (
        param &&
        param.modalLinkObj &&
        param.linkJsPath &&
        param.ga4EventJsPath &&
        param.contentCode &&
        param.contentName
      ) {
        if (!initOuterObj.isModalCdn) {
          const head = document.getElementsByTagName("head")[0];
          const linkScript = document.createElement("script");
          const ga4EventScript = document.createElement("script");

          linkScript.type = "text/javascript";
          linkScript.src = `${param.linkJsPath}`;
          ga4EventScript.type = "text/javascript";
          ga4EventScript.src = `${param.ga4EventJsPath}`;
          head.appendChild(linkScript);
          head.appendChild(ga4EventScript);
          initOuterObj.isModalCdn = true;
        }

        const modalLinkAll = document.querySelectorAll(".if-link-btn");

        const APP_EVENT = (label, addInfo) => {
          // <!-- ! lable : 버튼명, addInfo : 이벤트 부가정보 -->
          ga4Event.event(
            "click_event",
            "APP_쇼핑뉴스상세",
            "하단버튼",
            label,
            addInfo,
          );
        };

        setTimeout(() => {
          modalLinkAll.forEach((element, idx) => {
            element.onclick = () => {
              APP_EVENT(
                param.modalLinkObj[idx].value,
                `${param.contentName}_${param.contentCode}`,
              );
            };
            LinkSetting(
              element,
              param.modalLinkObj[idx].type,
              "yes",
              param.modalLinkObj[idx].url,
            );
          });
        }, 500);
      }
    }

    // * 고정 백그라운드 설정
    if (fnNm === "setFixedBg") {
      getFixedBg();
    }
  }
});
// iframe message receive - iframe에서 메세지 받기 [E]

// TODO ********************************************************************
// ! window 내부 동작
// TODO ********************************************************************

// ! getBasicTop setting - 기본 탑 위치값 설정 [S]
const getBasicTop = () => {
  // the_iframe : 쇼핑뉴스 iframe
  // detailHTML : 이벤트 iframe

  let iframe;

  if (
    document.getElementById("the_iframe") &&
    !document.getElementById("detailHTML")
  ) {
    iframe = document.getElementById("the_iframe");
  } else if (
    !document.getElementById("the_iframe") &&
    document.getElementById("detailHTML")
  ) {
    iframe = document.getElementById("detailHTML");
  }

  if (initOuterObj.oldBasicTopPosition == initOuterObj.basicTopPosition) {
    return;
  }

  initOuterObj.oldBasicTopPosition = initOuterObj.basicTopPosition;

  if (iframe) {
    setTimeout(() => {
      const headDetail =
        document.querySelector(".__head").getBoundingClientRect().height +
        document.querySelector(".__detail__").getBoundingClientRect().top +
        window.pageYOffset;

      if (initOuterObj.deviceState == "pc") {
        // PC
        initOuterObj.basicTopPosition = headDetail + 2;
      } else if (
        initOuterObj.deviceState == "mo" ||
        initOuterObj.deviceState == "app"
      ) {
        // APP, MO
        initOuterObj.basicTopPosition =
          headDetail -
          document.querySelector(".snb").getBoundingClientRect().height +
          1;
      } else if (initOuterObj.deviceState == "kiosk") {
        // KIOSK
        initOuterObj.basicTopPosition =
          headDetail -
          document.querySelector("#kiosk-snb").getBoundingClientRect().height;
      }
    }, 300);
  }
};
// getBasicTop setting - 기본 탑 위치값 설정 [E]

// ! getIframeTabClone setting - 탭 복사 [S]
const getIframeTabClone = (count, imgExtension) => {
  const container = document.querySelector("#container");
  const ifTabCloneWrap = document.createElement("div");

  ifTabCloneWrap.style.cssText = `
    width: 100%;
    position: fixed;
    transition: top 0.5s;
    visibility: hidden;
  `;

  ifTabCloneWrap.classList.add("if-tab-clone-wrap");
  container.prepend(ifTabCloneWrap);

  let tabCode = "";

  if (initOuterObj.deviceState == "pc") {
    ifTabCloneWrap.style.top = `${
      document.querySelector(".util").getBoundingClientRect().height +
      document.querySelector(".header__container").getBoundingClientRect()
        .height
    }px`;
  } else if (
    initOuterObj.deviceState == "mo" ||
    initOuterObj.deviceState == "app"
  ) {
    ifTabCloneWrap.style.top = `${
      document.querySelector(".snb").getBoundingClientRect().height
    }px`;
  }

  for (let idx = 0; idx < count; idx++) {
    idx == 0
      ? initOuterObj.isSwiper
        ? (tabCode += `
        <div class="swiper-slide tab-btn on">
          <img src="${initOuterObj.imgPath}/tab/tab${
            idx + 1
          }_off.${imgExtension}" alt="" />
          <img src="${initOuterObj.imgPath}/tab/tab${
            idx + 1
          }_on.${imgExtension}" alt="" />
        </div>
      `)
        : (tabCode += `
        <div class="tab-btn on">
          <img src="${initOuterObj.imgPath}/tab/tab${
            idx + 1
          }_off.${imgExtension}" alt="" />
          <img src="${initOuterObj.imgPath}/tab/tab${
            idx + 1
          }_on.${imgExtension}" alt="" />
        </div>
      `)
      : initOuterObj.isSwiper
        ? (tabCode += `
        <div class="swiper-slide tab-btn">
          <img src="${initOuterObj.imgPath}/tab/tab${
            idx + 1
          }_off.${imgExtension}" alt="" />
          <img src="${initOuterObj.imgPath}/tab/tab${
            idx + 1
          }_on.${imgExtension}" alt="" />
        </div>
      `)
        : (tabCode += `
        <div class="tab-btn">
          <img src="${initOuterObj.imgPath}/tab/tab${
            idx + 1
          }_off.${imgExtension}" alt="" />
          <img src="${initOuterObj.imgPath}/tab/tab${
            idx + 1
          }_on.${imgExtension}" alt="" />
        </div>
      `);
  }

  ifTabCloneWrap.innerHTML = initOuterObj.isSwiper
    ? `
    <div class="tab-btn-area swiper-tab">
      <div class="swiper">
        <div class="swiper-wrapper">
          ${tabCode}
        </div>
      </div>
    </div>
    `
    : `
    <div class="tab-btn-area basic-tab">
          ${tabCode}
    </div>
    `;

  if (initOuterObj.deviceState == "pc") {
    ifTabCloneWrap.style.width = "758px";

    if (document.body.classList.contains("down")) {
      ifTabCloneWrap.style.top = "0px";
    } else {
      ifTabCloneWrap.style.top = `${
        document.querySelector(".util").getBoundingClientRect().height +
        document.querySelector(".header__container").getBoundingClientRect()
          .height
      }px`;
    }
  }

  if (initOuterObj.isSwiper && !initOuterObj.isSwiperCdn) {
    const tabBtnArea = ifTabCloneWrap.querySelector(".tab-btn-area");
    const head = document.getElementsByTagName("head")[0];
    const script = document.createElement("script");
    const link = document.createElement("link");

    script.type = "text/javascript";
    script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
    head.appendChild(script);
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
    head.appendChild(link);
    initOuterObj.isSwiperCdn = true;
    initOuterObj.isSwiperMove = false;

    // TODO 스와이프탭 백그라운드 설정
    tabBtnArea.style.background = `url(${initOuterObj.imgPath}/tab/tab_bg.jpg) no-repeat center / cover`;

    setTimeout(() => {
      initOuterObj.swiperTab = new Swiper(".tab-btn-area.swiper-tab .swiper", {
        observer: true,
        observeParents: true,
        slidesPerView: "auto",
        freeMode: true,
        debugger: true,
        on: {
          setTranslate: function (swiper, translate) {
            ifSlideTransform(translate);
          },
        },
      });
    }, 500);
  }

  const tabBtn = document.querySelectorAll(".tab-btn");
  tabBtn.forEach((element, idx) => {
    element.removeEventListener("click", () =>
      getTabClickAction(idx, initOuterObj.isSwiper),
    );
    element.addEventListener("click", () =>
      getTabClickAction(idx, initOuterObj.isSwiper),
    );
  });

  // ? LSY 탭 가로값 자동 계산 [S]
  const setWidth = (img) => {
    img.parentElement.style.width = `${(img.naturalWidth / 750) * 100}%`;
  };

  document.querySelectorAll(".tab-btn img").forEach((img) => {
    if (img.clientWidth) {
      img.complete
        ? setWidth(img)
        : img.addEventListener("load", () => setWidth(img));
    }
  });
  // ? LSY 탭 가로값 자동 계산 [E]
};
// getIframeTabClone setting - 탭 복사 [E]

// ! getTabClickAction - 탭 클릭 [S]
const getTabClickAction = (idx) => {
  // console.log(initOuterObj);
  const winScrollTop = window.scrollY;
  let position = initOuterObj.tabAreaPosition[idx];

  if (initOuterObj.deviceState == "pc") {
    const headerH =
      document.querySelector(".util").getBoundingClientRect().height +
      document.querySelector(".header__container").getBoundingClientRect()
        .height;

    // *  pc 중복 클릭 return
    if (
      (document.body.classList.contains("up") &&
        (winScrollTop ==
          Math.floor(initOuterObj.basicTopPosition + position - headerH) ||
          winScrollTop ==
            Math.floor(initOuterObj.basicTopPosition + position - headerH) -
              1 ||
          winScrollTop ==
            Math.floor(initOuterObj.basicTopPosition + position - headerH) +
              1)) ||
      (document.body.classList.contains("down") &&
        (winScrollTop == Math.floor(initOuterObj.basicTopPosition + position) ||
          winScrollTop ==
            Math.floor(initOuterObj.basicTopPosition + position) - 1 ||
          winScrollTop ==
            Math.floor(initOuterObj.basicTopPosition + position) + 1))
    ) {
      return;
    }

    // * PC 스크롤 예외처리
    if (
      winScrollTop > Math.floor(initOuterObj.basicTopPosition + position) ||
      (document.body.classList.contains("up") &&
        winScrollTop >
          Math.floor(initOuterObj.basicTopPosition + position - headerH))
    ) {
      position = position - headerH;
    }
  } else {
    // * mo, app 중복 클릭 return

    if (winScrollTop == Math.floor(initOuterObj.basicTopPosition + position)) {
      return;
    }
  }

  initOuterObj.isSwiperMove = true;

  setTimeout(() => {
    window.scrollTo({
      top: initOuterObj.basicTopPosition + position,
      behavior: "smooth",
    });
  }, 200);

  if (initOuterObj.isSwiper) {
    setTimeout(() => {
      initOuterObj.swiperTab.slideTo(idx);
    }, 500);
  }
};
// getTabClickAction - 탭 클릭 [E]

// ! cloneTabTopChange - 복사 탭 탑 위치값 수정 [S]
const cloneTabTopChange = () => {
  const ifTabCloneWrap = document.querySelector(".if-tab-clone-wrap");

  if (ifTabCloneWrap) {
    setTimeout(() => {
      ifTabCloneWrap.style.top = `${
        document.querySelector(".snb").getBoundingClientRect().height
      }px`;
    }, 300);
  }
};
// cloneTabTopChange - 복사 탭 탑 위치값 수정 [E]

// ! tabActive - 탭 활성화 [S]
const tabActive = (element, idx, winScrollTop, sectionTop, sectionHeight) => {
  if (initOuterObj.isTabActive == false) {
    return;
  }

  element.forEach((el) => {
    if (initOuterObj.deviceState == "pc") {
      const headerH =
        document.querySelector(".util").getBoundingClientRect().height +
        document.querySelector(".header__container").getBoundingClientRect()
          .height;

      if (document.body.classList.contains("up")) {
        // Scroll Up
        if (
          winScrollTop >= sectionTop - headerH &&
          winScrollTop != sectionTop &&
          winScrollTop < sectionTop + sectionHeight
        ) {
          el.classList.remove("on");
          element[idx].classList.add("on");

          if (
            initOuterObj.swiperTab &&
            initOuterObj.isSwiper &&
            !initOuterObj.isSwiperMove
          ) {
            initOuterObj.swiperTab.slideTo(idx);
          }
        }
      } else {
        // Scroll Down
        if (
          winScrollTop >= sectionTop &&
          winScrollTop < sectionTop + sectionHeight
        ) {
          el.classList.remove("on");
          element[idx].classList.add("on");

          if (
            initOuterObj.swiperTab &&
            initOuterObj.isSwiper &&
            !initOuterObj.isSwiperMove
          ) {
            initOuterObj.swiperTab.slideTo(idx);
          }
        }
      }
    } else {
      if (
        winScrollTop >= sectionTop &&
        winScrollTop < sectionTop + sectionHeight
      ) {
        el.classList.remove("on");
        element[idx].classList.add("on");

        if (
          initOuterObj.swiperTab &&
          initOuterObj.isSwiper &&
          !initOuterObj.isSwiperMove
        ) {
          initOuterObj.swiperTab.slideTo(idx);
        }
      }
    }
  });
};
// tabActive - 탭 활성화 [E]

// ! targetMoveScrollAction setting - 타겟 위치 스크롤 이동 [S]
const targetMoveScrollAction = (position) => {
  const winScrollTop = window.scrollY;

  if (initOuterObj.deviceState == "pc") {
    const headerH =
      document.querySelector(".util").getBoundingClientRect().height +
      document.querySelector(".header__container").getBoundingClientRect()
        .height;

    // * 중복 클릭 return
    if (
      (document.body.classList.contains("up") &&
        winScrollTop ==
          Math.floor(initOuterObj.basicTopPosition + position - headerH - 1)) ||
      (document.body.classList.contains("down") &&
        winScrollTop == Math.floor(initOuterObj.basicTopPosition + position))
    ) {
      return;
    }

    // * PC 스크롤 예외처리
    if (
      winScrollTop > initOuterObj.basicTopPosition + position ||
      (document.body.classList.contains("up") &&
        winScrollTop > initOuterObj.basicTopPosition + position - headerH)
    ) {
      position = position - headerH;
    }
  } else {
    // * 중복 클릭 return
    if (winScrollTop == Math.floor(initOuterObj.basicTopPosition + position)) {
      return;
    }
  }

  setTimeout(() => {
    window.scrollTo({
      top: initOuterObj.basicTopPosition + position,
      behavior: "smooth",
    });
  }, 200);
};
// targetMoveScrollAction setting - 타겟 위치 스크롤 이동 [E]

// ! getModalWrapCreate setting - 모달 만들기 [S]
const getModalWrapCreate = (modalImgPath, modalState, headerState) => {
  initOuterObj.modalImgPath = modalImgPath;

  if (modalState == "full") {
    headerState = "null";
  }

  const container = document.querySelector("#container");
  const ifModalWrap = document.createElement("div");

  ifModalWrap.classList.add("if-modal-wrap");
  container.prepend(ifModalWrap);

  let modalBasicCode = `
    <div class='if-modal-inner ${modalState}'>
      <div class='if-modal__header ${headerState}'>
        <div class="if-modal__close">
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="13.0815"
                y="12.3744"
                width="36"
                height="1"
                transform="rotate(45 13.0815 12.3744)"
                fill="black"
              />
              <rect
                x="38.5373"
                y="13.0814"
                width="36"
                height="1"
                transform="rotate(135 38.5373 13.0814)"
                fill="black"
              />
            </svg>
          </div>
      </div>
      <div class='if-modal__container'></div>
    </div>
  `;

  ifModalWrap.innerHTML = modalBasicCode;

  // TODO modal css 설정
  if (initOuterObj.deviceState == "pc") {
    const ifModalHeader = document.querySelector(".if-modal__header");
    const ifModalClose = document.querySelector(".if-modal__close");

    ifModalHeader.style.padding = `${headerState == null ? "20px" : "20pox 0"}`;
    ifModalClose.style.cssText = `
      width: 60px;
      height: 60px;
    `;
  }

  // TODO modal css 설정
  if (initOuterObj.deviceState == "pc" && modalState != "full") {
    const ifModalInner = document.querySelector(".if-modal-inner");

    ifModalWrap.style.minWidth = "1200px";
    ifModalInner.style.maxWidth = "758px";
    ifModalInner.style.minHeight = "70%";
  }
};
// getModalWrapCreate setting - 모달 만들기 [E]

// ! modalOpenAction - 모달 열기 설정 [S]
const modalOpenAction = (content) => {
  const ifModalWrap = document.querySelector(".if-modal-wrap");
  const ifModalContainer = document.querySelector(".if-modal__container");

  if (content.includes(".swiper-mask") && !initOuterObj.isSwiperCdn) {
    const head = document.getElementsByTagName("head")[0];
    const script = document.createElement("script");
    const link = document.createElement("link");

    script.type = "text/javascript";
    script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
    head.appendChild(script);
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
    head.appendChild(link);
    initOuterObj.isSwiperCdn = true;
  }

  ifModalContainer.innerHTML = content;

  // * modal link 분기
  if (content.includes("if-link-btn")) {
    ifModalContentEdit(content);
    modalShow(content);
  } else {
    modalShow(content);
  }

  ifModalWrap.removeEventListener("click", modalCloseAction);
  ifModalWrap.addEventListener("click", modalCloseAction);
};
// modalOpenAction - 모달 열기 설정 [E]

// ! modalShow - 모달 show [S]
const modalShow = (content) => {
  const ifModalWrap = document.querySelector(".if-modal-wrap");
  const ifModalContainer = document.querySelector(".if-modal__container");

  document.body.style.overflow = "hidden";
  ifModalWrap.style.display = "flex";
  ifModalContainer.scrollTop = 0;

  setTimeout(() => {
    // * modal swiper pc class 추가 & modal swiper prev button & next button background-image url 설정 & modal swiper 옵션 설정
    if (content.includes("swiper-mask")) {
      // * modal swiper pc class 추가
      if (initOuterObj.deviceState == "pc") {
        const swiperMask = ifModalWrap.querySelectorAll(".swiper-mask");

        swiperMask.forEach((element) => {
          element.classList.add("pc");
        });
      }

      const ifSwiperPrev = document.querySelectorAll(
        ".swiper-mask .swiper-button-prev",
      );
      const ifSwiperNext = document.querySelectorAll(
        ".swiper-mask .swiper-button-next",
      );

      //  * modal swiper prev button & next button background-image url 설정
      if (ifSwiperPrev && ifSwiperNext) {
        const cssImgPath = ifModalContainer
          .querySelector("img")
          .src.substring(
            0,
            ifModalContainer.querySelector("img").src.indexOf("/modal"),
          );

        ifSwiperPrev.forEach((element) => {
          element.style.backgroundImage = `url(${cssImgPath}/slide_prev.png)`;
        });

        ifSwiperNext.forEach((element) => {
          element.style.backgroundImage = `url(${cssImgPath}/slide_next.png)`;
        });
      }

      // * modal swiper 옵션 설정
      const swiperAll = document.querySelectorAll(".swiper-mask");

      // TODO swiper 옵션 설정
      let modalSwiperObj = {};
      swiperAll.forEach((element, idx) => {
        modalSwiperObj[`modalSwiper${idx}`] = new Swiper(
          element.querySelector(".swiper"),
          {
            observer: true,
            observeParents: true,

            pagination: {
              el: element.querySelector(".swiper-pagination"),
            },
            navigation: {
              nextEl: element.querySelector(".swiper-button-next"),
              prevEl: element.querySelector(".swiper-button-prev"),
            },
            scrollbar: {
              el: element.querySelector(".swiper-scrollbar"),
            },
          },
        );
      });
    }

    ifModalWrap.style.opacity = "1";
  }, 500);
};
// modalShow - 모달 show [E]

// ! modalCloseAction - 모달 닫기 설정 [S]
const modalCloseAction = (e) => {
  const ifModalWrap = document.querySelector(".if-modal-wrap");
  const ifModalContainer = document.querySelector(".if-modal__container");

  if (
    e.target.classList == "if-modal-wrap" ||
    e.target.classList == "if-modal__close" ||
    e.target.tagName == "svg" ||
    e.target.tagName == "rect"
  ) {
    document.body.style.overflow = "auto";
    ifModalWrap.style.opacity = "0";
    setTimeout(() => {
      ifModalContainer.innerHTML = "";
      ifModalWrap.style.display = "none";
    }, 500);
  }
};
// modalCloseAction - 모달 닫기 설정 [E]

// ! getFixedBg - 고정 백그라운드 설정 [S]
const getFixedBg = () => {
  const container = document.querySelector("#container");

  // TODO 이미지 경로 설정
  container.style.background = `url(${initOuterObj.imgPath}/bg1.png) no-repeat top /  cover`;
  container.style.backgroundAttachment = `fixed`;
};
// getFixedBg - 고정 백그라운드 설정 [E]

// ! scrollAction - 스크롤 동작 [S]
const scrollAction = () => {
  const scrollLimits = document.body.scrollHeight * 0.9;
  const winScrollTop = window.scrollY;
  const ifTabCloneWrap = document.querySelector(".if-tab-clone-wrap");
  const tabBtn = document.querySelectorAll(".tab-btn");

  if (initOuterObj.isSwiper) {
    clearTimeout(window.scrollEndTimer);
    window.scrollEndTimer = setTimeout(() => {
      initOuterObj.isSwiperMove = false;
    }, 100);
  }

  if (ifTabCloneWrap) {
    // * ACTIVE
    tabBtn.forEach((el, idx) => {
      const sectionHeight = initOuterObj.tabAreaHeight[idx];
      let sectionTop;

      sectionTop = Math.floor(
        initOuterObj.tabAreaPosition[idx] + initOuterObj.basicTopPosition,
      );

      tabActive(tabBtn, idx, winScrollTop, sectionTop, sectionHeight);
    });

    if (
      initOuterObj.deviceState == "pc" &&
      document.body.classList.contains("up")
    ) {
      const headerH =
        document.querySelector(".util").getBoundingClientRect().height +
        document.querySelector(".header__container").getBoundingClientRect()
          .height;

      if (
        winScrollTop >=
          Math.floor(
            initOuterObj.basicTopPosition +
              initOuterObj.tabBtnAreaPosition -
              headerH,
          ) &&
        winScrollTop < scrollLimits
      ) {
        ifTabCloneWrap.style.visibility = "visible";

        if (initOuterObj.isSwiper) {
          initOuterObj.isTabActive = true;
        }
      } else {
        ifTabCloneWrap.style.visibility = "hidden";

        if (initOuterObj.isSwiper) {
          initOuterObj.isTabActive = false;
        }
      }

      ifTabCloneWrap.style.top = `${headerH}px`;
    } else {
      if (document.body.classList.contains("down")) {
        ifTabCloneWrap.style.top = 0 + "px";
      }

      if (
        winScrollTop >=
          Math.floor(
            initOuterObj.basicTopPosition + initOuterObj.tabBtnAreaPosition,
          ) &&
        winScrollTop < scrollLimits
      ) {
        ifTabCloneWrap.style.visibility = "visible";

        if (initOuterObj.isSwiper) {
          initOuterObj.isTabActive = true;
        }
      } else {
        ifTabCloneWrap.style.visibility = "hidden";

        if (initOuterObj.isSwiper) {
          initOuterObj.isTabActive = false;
        }
      }
    }
  }
};
// scrollAction - 스크롤 동작 [E]

// ! initFn : 초기화 함수 [S]
const initFn = {
  loadInit: function () {
    getDeviceSet(); // 디바이스값 설정
    getIframeHeightIF(); // iframe 높이값 설정
    getTabCloneData(); // 탭 복사 데이터 설정
    if (initOuterObj.deviceState != "kiosk") {
      getBasicTop(); // 기본 탑 위치값 설정
      getTabValues(); // 탭 상세,탭 버튼 영역 높이값 & 탭 상세,탭 버튼 영역 위치값 설정
      getModalCreateData(); // 모달 만들기 데이터 설정
    }
  },

  resizeInit: function () {
    getIframeHeightIF(); // iframe 높이값 설정
    if (initOuterObj.deviceState != "kiosk") {
      getBasicTop(); // 기본 탑 위치값 설정
      getTabValues(); // 탭 상세,탭 버튼 영역 높이값 & 탭 상세,탭 버튼 영역 위치값 설정
    }
    if (initOuterObj.deviceState == "mo" || initOuterObj.deviceState == "app") {
      cloneTabTopChange(); // 복사 탭 탑 위치값 수정
    }
    if (initOuterObj.deviceState != "kiosk") {
      scrollAction(); // 스크롤 동작
    }

    // console.log(initOuterObj);
  },
  scrollAction: function () {
    if (initOuterObj.deviceState != "kiosk") {
      scrollAction(); // 스크롤 동작
    }
  },
};
// initFn : 초기화 함수 [E]

// ! window load, resize setting & scroll, visibilitychange action - 로드, 리사이즈 초기화 & 스크롤 동작 [S]
window.addEventListener("load", initFn.loadInit);
window.addEventListener("resize", initFn.resizeInit, { passive: true });
window.addEventListener("scroll", initFn.scrollAction, { passive: true });
window.addEventListener("visibilitychange", getIframeVisibilityChange);
// window load, resize setting & scroll, visibilitychange action - 로드, 리사이즈 초기화 & 스크롤 동작 [E]

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
