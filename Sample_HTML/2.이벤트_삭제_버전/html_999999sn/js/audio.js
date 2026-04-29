// *************************************************************************
// *************************************************************************
// * 2025.03.31 작업
// * 작업자 : 조윤상
// * version : v1.0
// *************************************************************************
// *************************************************************************

// TODO ********************************************************************
// ! postMessage 동작 - 받기
// TODO ********************************************************************

// ! parent window message receive - parent window에서 메세지 받기 [S]
window.addEventListener('message', (message) => {
  if (message && message.data) {
    // 크롭 확장프로그램 [react-devtools] postMessage 차단
    // if (message.data.source == 'react-devtools-content-script') return;
    // console.log(message);

    const fnNm = message.data.fnNm;
    const param = message.data.param;

    // console.log(param);

    // * 오디오 정지
    if (fnNm === 'getIframeVisibilityChange') {
      audioStop(message.data.param.audioState);
    }
  }
});
// parent window message receive - parent window에서 메세지 받기 [E]

// TODO ********************************************************************
// ! iframe 내부 동작
// TODO ********************************************************************

// ! audioObj 세팅 [S]
const audioObj = [
  {
    id: 0,
    element: document.querySelector('.audio-box1'),
    audio: new Audio('https://minfo.lotteshopping.com/docentAudio/240411/yoon.mp3'),
    color: '#ffab8e',
    isPaused: true,
  },
  {
    id: 1,
    element: document.querySelector('.audio-box2'),
    audio: new Audio('https://minfo.lotteshopping.com/docentAudio/240411/joe.mp3'),
    color: '#ffab8e',
    isPaused: true,
  },
];
// audioObj 세팅 [E]

// ! 오디오 재생 [S]
const audioPlay = (audio, trackInput, playBtn, pauseBtn, audioIdx) => {
  audio.play();
  trackInput.disabled = false;
  audioObj[audioIdx].isPaused = false;
  playChk(audio, playBtn, pauseBtn);

  audioObj.forEach((el) => {
    if (el.id !== audioIdx) {
      const playBtn = el.element.querySelector('.playBtn');
      const pauseBtn = el.element.querySelector('.pauseBtn');

      audioPause(el.audio, playBtn, pauseBtn, el.id);
    }
  });
};
// 오디오 재생 [E]

// ! 오디오 일시정지 [S]
const audioPause = (audio, playBtn, pauseBtn, audioIdx) => {
  audio.pause();
  audioObj[audioIdx].isPaused = true;
  playChk(audio, playBtn, pauseBtn);
};
// 오디오 일시정지 [E]

// ! 오디오 재생 체크 [S]
const playChk = (audio, playBtn, pauseBtn) => {
  if (!audio.paused) {
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
  } else {
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
  }
};
// 오디오 재생 체크 [E]

// ! 오디오 업데이트 [S]
const timeUpdate = (
  audio,
  audioCurrent,
  audioTotal,
  trackInput,
  playBtn,
  pauseBtn,
  audioIdx,
  color
) => {
  const total = Math.floor(audio.duration);
  const totalMin = parseInt((total % 3600) / 60);
  const totalSec = String(total % 60);
  let current = Math.floor(audio.currentTime);
  let currentMin = parseInt((current % 3600) / 60);
  let currentSec = String(current % 60);

  audioCurrent.innerHTML = `${currentMin} : ${currentSec.padStart(2, '0')}`;
  audioTotal.innerHTML = `${totalMin} : ${totalSec.padStart(2, '0')}`;

  let progress = (audio.currentTime / audio.duration) * 100;
  trackInput.style.background = `linear-gradient(to right, ${color} ${progress}%, rgba(136, 136, 136, 0.2) ${progress}%)`;

  playChk(audio, playBtn, pauseBtn);

  audioObj.forEach((el) => {
    if (el.id === audioIdx && total === current) {
      audioObj[audioIdx].isPaused = true;
    }
  });
};
// 오디오 업데이트 [E]

// ! 화면 이동 시, 오디오 일시 정지 [S]
// TODO APP, KIOSK 에서 확인 필요!!
const audioStop = (audioState) => {
  audioObj.forEach((item, audioIdx) => {
    const audio = item.audio;
    const audioBox = item.element;
    const playBtn = audioBox.querySelector('.playBtn');
    const pauseBtn = audioBox.querySelector('.pauseBtn');

    audio.pause();
    audioObj[audioIdx].isPaused = audioState;
    playChk(audio, playBtn, pauseBtn);
  });
};
// 화면 이동 시, 오디오 일시 정지 [E]

// ! 오디오 이벤트 [S]
audioObj.forEach((item, audioIdx) => {
  const audio = item.audio;
  const audioBox = item.element;
  const trackInput = audioBox.querySelector('input');
  const audioCurrent = audioBox.querySelector('.audio-current');
  const audioTotal = audioBox.querySelector('.audio-total');
  const playBtn = audioBox.querySelector('.playBtn');
  const pauseBtn = audioBox.querySelector('.pauseBtn');
  const color = item.color;

  audio.addEventListener('loadedmetadata', () => {
    trackInput.max = audio.duration;
    timeUpdate(audio, audioCurrent, audioTotal, trackInput, playBtn, pauseBtn, audioIdx, color);

    setDataInit();
  });

  audio.ontimeupdate = () => {
    trackInput.value = audio.currentTime;
    timeUpdate(audio, audioCurrent, audioTotal, trackInput, playBtn, pauseBtn, audioIdx, color);
  };

  playBtn.addEventListener('click', () =>
    audioPlay(audio, trackInput, playBtn, pauseBtn, audioIdx)
  );

  pauseBtn.addEventListener('click', () => audioPause(audio, playBtn, pauseBtn, audioIdx));

  trackInput.addEventListener('input', () => {
    audio.currentTime = trackInput.value;
    timeUpdate(audio, audioCurrent, audioTotal, trackInput, playBtn, pauseBtn, audioIdx, color);
  });

  trackInput.addEventListener('mousedown', () => {
    audio.pause();
  });

  trackInput.addEventListener('mouseup', () => {
    audioObj.forEach((item, audioIdx) => {
      if (audioObj[audioIdx].isPaused === false) item.audio.play();
    });
  });

  trackInput.addEventListener(
    'touchstart',
    () => {
      audio.pause();
    },
    { passive: true }
  );

  trackInput.addEventListener(
    'touchend',
    () => {
      audioObj.forEach((item, audioIdx) => {
        if (audioObj[audioIdx].isPaused === false) item.audio.play();
      });
    },
    { passive: true }
  );
});
// 오디오 이벤트 [E]
