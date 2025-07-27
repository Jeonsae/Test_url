let items = document.querySelectorAll('.slider .item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    
    let active = 3;
    function loadShow(){
        let stt = 0;
        items[active].style.transform = `none`;
        items[active].style.zIndex = 1;
        items[active].style.filter = 'none';
        items[active].style.opacity = 1;
        for(var i = active + 1; i < items.length; i++){
            stt++;
            items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
        stt = 0;
        for(var i = active - 1; i >= 0; i--){
            stt++;
            items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
    }
    loadShow();
    next.onclick = function(){
        active = active + 1 < items.length ? active + 1 : active;
        loadShow();
    }
    prev.onclick = function(){
        active = active - 1 >= 0 ? active - 1 : active;
        loadShow();
    }


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
    if (Math.abs(diff) < 30) return; // 너무 짧으면 무시

    if (diff > 0) {
        // 왼쪽으로 스와이프 (다음 슬라이드)
        active = active + 1 < items.length ? active + 1 : active;
    } else {
        // 오른쪽으로 스와이프 (이전 슬라이드)
        active = active - 1 >= 0 ? active - 1 : active;
    }
    loadShow();
}
