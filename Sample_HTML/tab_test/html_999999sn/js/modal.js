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

const modalBtn = document.querySelectorAll(".modal-btn");

// TODO ********************************************************************
// ! postMessage 동작 - 보내기
// TODO ********************************************************************

// ! modalWrapCreate - 모달 만들기 설정 [S]
const modalWrapCreate = () => {
  initCommonObj.modalImgPath = `${initCommonObj.imgPath}/modal`;

  window.parent.postMessage(
    {
      fnNm: "modalWrapCreate",
      param: {
        modalImgPath: initCommonObj.modalImgPath,
        // TODO modalState setting : null or 'full'
        modalState: null,
        // modalState: 'full',
        // TODO headerState setting : null or 'transparent'
        headerState: null,
        // headerState: 'transparent',
      },
    },
    "*"
  );
};
// modalWrapCreate - 모달 만들기 설정 [E]

// ! modalOpen - 모달 열기 설정 [S]
const modalOpen = (modalContent) => {
  window.parent.postMessage(
    {
      fnNm: "modalOpen",
      param: {
        modalContent: modalContent.replaceAll(
          "./images/modal",
          initCommonObj.modalImgPath
        ),
      },
    },
    "*"
  );
};
// modalOpen - 모달 열기 설정 [E]

// ! setModalLink - 모달 링크 설정 [S]
// * index.html > head > contentCode, contentName 값 설정
// TODO modalLinkObj 설정
const modalLinkObj = [
  {
    type: "BrowserOpen",
    url: "https://bit.ly/4jbJAkI",
    value: "쿠폰 받으러 가기 1",
  },
  {
    type: "shopping",
    url: "SNM00000000000273808",
    value: "쿠폰 받으러 가기 2",
  },
];

const setModalLink = () => {
  const linkJsPath = `${initCommonObj.basePath}/js/link.js`;
  const ga4EventJsPath = `${initCommonObj.basePath}/js/ga4Event.js`;

  window.parent.postMessage(
    {
      fnNm: "setModalLink",
      param: {
        modalLinkObj,
        linkJsPath,
        ga4EventJsPath,
        contentCode,
        contentName,
      },
    },
    "*"
  );
};
// setModalLink - 모달 링크 설정 [E]

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

    // * 모달 만들기
    if (fnNm === "modalWrapCreate") {
      modalWrapCreate();
    }

    // * 모달 수정
    if (fnNm === "modalContentEdit") {
      // * 링크
      if (param.modalLink) {
        setModalLink();
      }
    }
  }
});
// parent window message receive - parent window에서 메세지 받기 [E]

// TODO ********************************************************************
// ! iframe 내부 동작
// TODO ********************************************************************

// ! modalClick 예시 [S]
const modalBtn1 = document.querySelector(".modal-btn1");
const modalBtn2 = document.querySelector(".modal-btn2");

modalBtn1.addEventListener("click", () => modalOpen(modalContent1));
modalBtn2.addEventListener("click", () => modalOpen(modalContent2));
// modalClick 예시 [E]

// TODO 모달 컨텐츠 내용 작성 [S]
const modalContent1 = `
  <div class="modal-content">
    <img src="./images/modal/img_01.png" alt="" />
    <a href="#" id="link1" class="if-link-btn">
      <img src="./images/modal/img_02.png" alt="" />
    </a>
    <a href="#" id="link2" class="if-link-btn">
      <img src="./images/modal/img_02.png" alt="" />
    </a>
    <img src="./images/modal/img_03.png" alt="" />
  </div>
`;
const modalContent2 = `
<div class="modal-content">
  <!-- .swiper 부모 .swiper-mask 필수 -->
  <div class="swiper-mask swiper-basic swiper1">
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="./images/modal/slide/1/1.png" alt="" />
        </div>
        <div class="swiper-slide">
          <img src="./images/modal/slide/1/2.png" alt="" />
        </div>
        <div class="swiper-slide">
          <img src="./images/modal/slide/1/3.png" alt="" />
        </div>
      </div>
      <div class="swiper-pagination"></div>

      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <div class="swiper-scrollbar"></div>
    </div>
  </div>
  <div class="if-modal-img-box">
    <img src="./images/modal/img_03.png" alt="" />
  </div>
  <img src="./images/modal/img_02.png" alt="" />
  <img src="./images/modal/img_01.png" alt="" />
  <!-- .swiper 부모 .swiper-mask 필수 -->
  <div class="swiper-mask swiper-basic swiper2">
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="./images/modal/slide/1/3.png" alt="" />
        </div>
        <div class="swiper-slide">
          <img src="./images/modal/slide/1/2.png" alt="" />
        </div>
        <div class="swiper-slide">
          <img src="./images/modal/slide/1/1.png" alt="" />
        </div>
      </div>
      <div class="swiper-pagination"></div>

      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <div class="swiper-scrollbar"></div>
    </div>
  </div>
</div>
`;
// TODO 모달 컨텐츠 내용 작성 [E]
