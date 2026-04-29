// *************************************************************************
// *************************************************************************
// * 2025.06.12 작업
// * 작업자 : 조윤상
// * version : v1.0
// *************************************************************************
// *************************************************************************

// TODO ********************************************************************
// ! 전역 변수
// TODO ********************************************************************

// TODO ********************************************************************
// ! postMessage 동작 - 보내기
// TODO ********************************************************************
// ! setFixedBg setting - 고정 백그라운드 설정 보내기 [S]

const setFixedBg = (() => {
  window.parent.postMessage(
    {
      fnNm: "setFixedBg",
    },
    "*"
  );
})();
// setFixedBg setting - 고정 백그라운드 설정 보내기 [E]

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
  }
});
// parent window message receive - parent window에서 메세지 받기 [E]

// TODO ********************************************************************
// ! iframe 내부 동작
// TODO ********************************************************************

// console.log(initCommonObj);
