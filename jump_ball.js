//监听空格按键，实现跳跃
//获取小球元素
const container = document.querySelector('.game-container');
const ball = document.querySelector('.ball');

// 游戏配置（集中管理参数）
const config = {
    jumpHeight: 300,
    initialBottom: 0,
    jumpDuration: 300,
    meteorInterval: 1000,
    meteorDurationMin: 1500,  // 修正原代码中的错误值（原60000过大）
    meteorDurationMax: 3000
};

// 统一的跳跃函数
function jump() {
    // 获取小球当前实际的bottom值（包含CSS定义的样式）
    const currentBottom = getComputedStyle(ball).bottom;
    // 防止连续跳跃（如果不在初始位置则不响应）
    if (currentBottom !== `${config.initialBottom}px`) return;
    
    ball.style.bottom = `${config.jumpHeight}px`;
    setTimeout(() => {
        ball.style.bottom = `${config.initialBottom}px`;
    }, config.jumpDuration);
}

// 键盘事件（电脑端）
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault(); // 防止空格导致页面滚动
        jump();
    }
});

// 触摸事件（移动端）
container.addEventListener('touchstart', (e) => {
    e.preventDefault(); // 防止默认行为（如缩放、滚动）
    jump();
}, { passive: false }); // 确保能阻止默认行为

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

// --------------------------
// 流星生成核心逻辑
// --------------------------
// 固定时间间隔（比如每4秒尝试生成流星，可自定义）
const METEOR_INTERVAL = 1000; // 单位ms
// 流星动画时长范围（随机）
const METEOR_DURATION_MIN = 3000; // 最短3秒
const METEOR_DURATION_MAX = 6000; // 最长6秒

// 定时生成流星
setInterval(() => {
    createRandomMeteor();
}, METEOR_INTERVAL);

// 创建单颗随机流星
function createRandomMeteor() {
    // 1. 创建流星元素
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');

    // 2. 随机参数设置
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // 随机起始位置（从屏幕右侧/顶部外进入）
    const startX = Math.random() * screenWidth + screenWidth * 0.5; // 右侧外100px~屏幕右边缘+50%宽度
    const startY = Math.random() * screenHeight * 0.3; // 顶部0~30%高度

    // 随机角度（-45°~-15°，模拟从右上到左下划过）
    const angle = -Math.random() * 30 - 15; // 角度范围-45°~-15°
    // 随机长度（50~150px）
    const length = Math.random() * 100 + 50;
    // 随机动画时长（1.5~3秒）
    const duration = Math.random() * (METEOR_DURATION_MAX - METEOR_DURATION_MIN) + METEOR_DURATION_MIN;
    // 随机移动距离（确保流星划出屏幕）
    const distance = Math.random() * 6000;

    // 3. 应用样式
    meteor.style.cssText = `
        width: ${length}px;
        height: 2px;
        top: ${startY}px;
        left: ${startX}px;
        --angle: ${angle}deg; /* CSS变量传递角度 */
        --distance: ${-distance}px; /* 向左下移动的距离 */
        animation: meteor-fall ${duration}ms linear forwards;
    `;

    // 4. 添加到容器并自动移除
    container.appendChild(meteor);
    setTimeout(() => {
        meteor.remove();
    }, duration); // 动画结束后移除
}

