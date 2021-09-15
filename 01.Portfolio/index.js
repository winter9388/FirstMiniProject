const container = document.querySelector('.container');


//박스 class를 for문을 이용하여 추가
for(let i = 0; i <= 100; i++){
  const blocks = document.createElement('div');
  blocks.classList.add('block');
  container.appendChild(blocks);
}

//animejs를 활용한 박스 애니메이션 효과 함수
function animationBlock(){
  anime({
    targets: ".block",
    translateX: () => anime.random(-700, 700),
    translateY: () => anime.random(-500, 500),
    scale: () => anime.random(1, 5),
    
    easing: 'linear',
    duration: 3000,
    delay: anime.stagger(10),
    complete: animationBlock
  })
}

animationBlock()