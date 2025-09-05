function openLightbox(src) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  lightbox.style.display = 'flex';
  img.src = src;
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

// hearts animation
const canvas = document.getElementById('hearts');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

class Heart {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 3, this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 3, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
    ctx.fillStyle = 'rgba(255,0,0,0.6)';
    ctx.fill();
  }
  update() {
    this.y -= this.speed;
    if (this.y < -this.size) {
      this.y = canvas.height + this.size;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  }
}

function initHearts() {
  hearts = [];
  for (let i = 0; i < 20; i++) {
    let size = Math.random() * 20 + 10;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let speed = Math.random() * 1 + 0.5;
    hearts.push(new Heart(x, y, size, speed));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(heart => heart.update());
  requestAnimationFrame(animate);
}

initHearts();
animate();
document.getElementById('start-btn').addEventListener('click', () => {
  const introScreen = document.querySelector('.intro-screen');
  const music = document.getElementById('background-music');
  
  introScreen.classList.add('hide'); // ซ่อนหน้า intro
  music.play().catch(error => {
    console.log("Autoplay was prevented by the browser. Please check your browser settings or user interaction.");
  });
});
// Function สำหรับโหลดหน้าเว็บด้วย AJAX
async function loadPage(pageName) {
  const contentDiv = document.getElementById('content');
  try {
    const response = await fetch(`${pageName}.html`);
    if (!response.ok) {
      throw new Error('ไม่พบไฟล์ที่ต้องการ');
    }
    const html = await response.text();
    contentDiv.innerHTML = html; // นำเนื้อหาใหม่มาใส่ใน div
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการโหลดหน้าเว็บ:', error);
    contentDiv.innerHTML = `<div class="hero"><h1>ขออภัย เกิดข้อผิดพลาดในการโหลดเนื้อหา 😕</h1></div>`;
  }
}

// เมื่อผู้ใช้คลิกที่ลิงก์เมนู
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // ป้องกันการรีโหลดหน้าเว็บ
    const page = event.target.getAttribute('data-page');
    loadPage(page);
  });
});