//监听空格按键，实现跳跃
//获取小球元素
const ball = document.querySelector('.ball');
//跳跃高度
const jumpHeight = 150;
//小球初始底部距离
const initialBottom = 0;
//监听空格按键
document.addEventListener('keydown', (e) => {
    //判断是否按下空格键
    if (e.keyCode === 32) {
        //第一步 向上跳
        ball.style.bottom = jumpHeight + 'px'; //跳跃
        //第二步 落下
        setTimeout(() => {
            ball.style.bottom = initialBottom + 'px';
        }, 300)
    }
})

// 动态生成更多星星
function createStars() {
    const container = document.querySelector('.game-container');
    const starCount = 100; // 星星数量
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        // 随机大小（1-3px）
        const size = Math.random() * 2 + 1;
        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: white;
            border-radius: 50%;
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            opacity: ${Math.random() * 0.8 + 0.2};
            animation: twinkle ${Math.random() * 3 + 2}s infinite;
            animation-delay: ${Math.random() * 3}s;
        `;
        container.appendChild(star);
    }
}
// 页面加载时生成星星
createStars();

//小球跳跃粒子效果
ball.addEventListener('transitionend', () => {
  if (ball.style.bottom === '300px') { // 最高点
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 2px; height: 2px;
      background: #fff;
      border-radius: 50%;
      top: ${ball.offsetTop}px;
      left: ${ball.offsetLeft + 25}px;
      animation: particle 0.5s forwards;
    `;
    container.appendChild(particle);
    setTimeout(() => particle.remove(), 500);
  }
});