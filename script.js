// 获取元素
const loveBtn = document.getElementById('loveBtn');
const message = document.getElementById('message');
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

// 设置画布大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 爱心数组
let hearts = [];

// 爱心类
class Heart {
    constructor() {
        // 随机位置
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        // 随机大小
        this.size = Math.random() * 15 + 5;
        // 随机速度
        this.speed = Math.random() * 2 + 1;
        // 随机颜色（粉色系）
        this.color = `rgb(255, ${Math.random() * 100 + 100}, ${Math.random() * 100 + 150})`;
        // 旋转角度
        this.angle = 0;
    }

    // 绘制爱心
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // 爱心公式
        for (let t = 0; t < Math.PI * 2; t += 0.1) {
            let x = 16 * Math.sin(t) ** 3;
            let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            ctx.lineTo(x * this.size, -y * this.size);
        }
        ctx.fill();
        ctx.restore();
    }

    // 更新位置
    update() {
        this.y -= this.speed;
        this.angle += 0.02;
        // 移出屏幕则重置
        if (this.y < -50) {
            this.y = canvas.height + 20;
            this.x = Math.random() * canvas.width;
        }
    }
}

// 点击按钮显示消息
loveBtn.addEventListener('click', () => {
    message.classList.remove('hidden');
    // 按钮禁用（防止重复点击）
    loveBtn.disabled = true;
    loveBtn.style.opacity = 0.7;
});

// 生成爱心
function createHearts() {
    if (Math.random() < 0.1) { // 控制生成频率
        hearts.push(new Heart());
    }
}

// 动画循环
function animate() {
    // 半透明黑色覆盖，实现拖尾效果
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    createHearts();

    // 绘制并更新所有爱心
    hearts.forEach((heart, index) => {
        heart.draw();
        heart.update();
        // 移出屏幕的爱心移除
        if (heart.y < -50) {
            hearts.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

// 窗口大小变化时重置
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 启动动画
animate();