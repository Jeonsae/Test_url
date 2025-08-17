let items = document.querySelectorAll('.slider .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let active = 3;

function loadShow() {
    let stt = 0;
    // 모든 아이템의 스타일 초기화
    items.forEach(item => {
        item.style.transform = 'none';
        item.style.zIndex = '';
        item.style.filter = '';
        item.style.opacity = '';
    });

    // 활성화된 아이템 설정
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;

    // 오른쪽 슬라이드들
    for (let i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }

    // 왼쪽 슬라이드들
    stt = 0;
    for (let i = active - 1; i >= 0; i--) {
        stt++;
        items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}

// 초기 로딩
loadShow();

next.onclick = function() {
    let lastItem = items[items.length - 1];
    document.querySelector('.slider').prepend(lastItem);
    items = document.querySelectorAll('.slider .item');
    loadShow();
}

prev.onclick = function() {
    let firstItem = items[0];
    document.querySelector('.slider').appendChild(firstItem);
    items = document.querySelectorAll('.slider .item');
    loadShow();
}

// 마우스/터치 스와이프 로직
let startX = 0;
let endX = 0;

document.querySelector('.slider').addEventListener('mousedown', (e) => {
    startX = e.clientX;
});

document.querySelector('.slider').addEventListener('mouseup', (e) => {
    endX = e.clientX;
    handleGesture();
});

document.querySelector('.slider').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector('.slider').addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleGesture();
});

function handleGesture() {
    let diff = startX - endX;
    if (Math.abs(diff) < 30) return;

    if (diff > 0) {
        // 왼쪽으로 스와이프 (이전 슬라이드) -> 맨 앞의 요소를 맨 뒤로 이동
        let firstItem = items[0];
        document.querySelector('.slider').appendChild(firstItem);
    } else {
        // 오른쪽으로 스와이프 (다음 슬라이드) -> 맨 뒤의 요소를 맨 앞으로 이동
        let lastItem = items[items.length - 1];
        document.querySelector('.slider').prepend(lastItem);
    }
    items = document.querySelectorAll('.slider .item');
    loadShow();
}