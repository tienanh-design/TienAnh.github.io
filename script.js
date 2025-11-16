// Slideshow functionality
let currentSlide = 0;
let totalSlides = 0; // will be set after slides are queried
let musicStarted = false;
let isTransitioning = false;

const slides = document.querySelectorAll('.slide');
totalSlides = slides.length;
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas ? confettiCanvas.getContext('2d') : null;
const bgMusic = document.getElementById('bgMusic');
const happyAudio = document.getElementById('happyAudio');
let currentMusic = bgMusic;
const cakeCanvas = document.getElementById('cakeCanvas');
const cakeCtx = cakeCanvas ? cakeCanvas.getContext('2d') : null;
let confettiParticles = [];
let fireworksParticles = [];
let fireworksTimer = null;

function spawnFireworkExplosion(px, py, color) {
    const pCount = 60 + Math.floor(Math.random() * 50);
    for (let i = 0; i < pCount; i++) {
        const angle = (Math.PI * 2) * (i / pCount) + (Math.random() - 0.5) * 0.8;
        const speed = 3.2 + Math.random() * 5.6;
        fireworksParticles.push({ x: px, y: py, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 100 + Math.floor(Math.random() * 60), age: 0, size: 3 + Math.random() * 5, color: color || `hsl(${Math.floor(Math.random() * 360)},90%,55%)` });
    }
}

function spawnFireworks(count = 6) {
    if (!confettiCanvas) return;
    for (let i = 0; i < count; i++) {
        const x = 60 + Math.random() * (confettiCanvas.width - 120);
        const y = 60 + Math.random() * Math.min(200, confettiCanvas.height * 0.3);
        spawnFireworkExplosion(x, y);
    }
}

function startFireworks(durationMs = 8000, interval = 400) {
    spawnFireworks(5);
    if (fireworksTimer) clearInterval(fireworksTimer);
    fireworksTimer = setInterval(() => spawnFireworks(4), interval);
    if (durationMs > 0) setTimeout(() => stopFireworks(), durationMs);
}

function stopFireworks() {
    if (fireworksTimer) { clearInterval(fireworksTimer); fireworksTimer = null; }
}

// Resize canvas for confetti and cake
function resizeCanvas() {
    if (confettiCanvas && ctx) {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
    if (cakeCanvas && cakeCtx) {
        // size canvas to match the cake container width for sharper, larger cake
        try {
            const container = cakeCanvas.parentElement;
            const cw = container ? Math.min(container.clientWidth, Math.floor(window.innerWidth * 0.9)) : Math.min(window.innerWidth * 0.6, 800);
            cakeCanvas.width = cw;
            cakeCanvas.height = Math.floor(cw * 0.85);
        } catch (e) {
            const size = Math.min(window.innerWidth * 0.42, 600);
            cakeCanvas.width = size;
            cakeCanvas.height = Math.min(420, size * 0.8);
        }
    }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Show slide with animation (handles per-line in/out)
function showSlide(n) {
    slides.forEach((slide) => {
        slide.classList.remove('active');
        slide.querySelectorAll('.slide-text').forEach(el => el.classList.remove('in', 'out'));
    });
    if (slides[n]) {
        slides[n].classList.add('active');
        animateInSlide(n);
    }
}

function animateOutSlide(n) {
    if (!slides[n]) return;
    const items = slides[n].querySelectorAll('.slide-text');
    items.forEach((el, i) => setTimeout(() => { el.classList.remove('in'); el.classList.add('out'); }, i * 120));
    const imgs = slides[n].querySelectorAll('.slide-image, .achievement-img');
    imgs.forEach(img => { img.classList.remove('visible'); img.style.animation = ''; img.style.animationDelay = ''; });
}

function animateInSlide(n) {
    if (!slides[n]) return;
    const items = slides[n].querySelectorAll('.slide-text');
    items.forEach((el, i) => { el.classList.remove('out'); setTimeout(() => el.classList.add('in'), i * 180); });
    const imgs = slides[n].querySelectorAll('.slide-image, .achievement-img');
    imgs.forEach((img, i) => { img.classList.remove('visible'); const delay = 600 + i * 140; setTimeout(() => img.classList.add('visible'), delay); });
}

function nextSlide() {
    // while on the first slide, only allow opening the envelope (no generic next)
    if (currentSlide === 0) return;
    if (isTransitioning || currentSlide >= totalSlides - 1) return;
    isTransitioning = true; animateOutSlide(currentSlide);
    if (currentSlide === 0 && !musicStarted) { if (bgMusic) { bgMusic.currentTime = 0; bgMusic.play().catch(() => { }); currentMusic = bgMusic; } musicStarted = true; }
    setTimeout(() => {
        currentSlide++; showSlide(currentSlide);
        if (currentSlide === totalSlides - 1) {
            try { if (bgMusic && !bgMusic.paused) bgMusic.pause(); } catch { };
            if (happyAudio) { happyAudio.currentTime = 0; happyAudio.play().catch(() => { }); currentMusic = happyAudio; }
            spawnConfetti(); startCakeAnimation();
        }
        setTimeout(() => { isTransitioning = false; }, 700);
    }, 420);
}

document.addEventListener('click', nextSlide);
document.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nextSlide(); } });

showSlide(currentSlide);

// Confetti
function spawnConfetti() {
    confettiParticles = [];
    const colors = ['#ff4757', '#ffa502', '#ff7f50', '#2ed573', '#1e90ff', '#FFD700', '#FF69B4'];
    const count = Math.min(300, Math.floor((confettiCanvas.width * confettiCanvas.height) / 40000));
    for (let i = 0; i < count; i++) confettiParticles.push({ x: Math.random() * confettiCanvas.width, y: Math.random() * -confettiCanvas.height - 100, vy: 2 + Math.random() * 5, vx: -3 + Math.random() * 6, size: 6 + Math.random() * 10, color: colors[Math.floor(Math.random() * colors.length)], rot: Math.random() * 360, rotSpeed: -8 + Math.random() * 16 });
    animateConfetti();
}

let confettiAnimId = null;
function animateConfetti() {
    if (!ctx) return;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    // update and draw confetti
    for (let p of confettiParticles) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.rot += p.rotSpeed;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot * Math.PI / 180); ctx.fillStyle = p.color; ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size); ctx.restore();
    }
    confettiParticles = confettiParticles.filter(p => p.y < confettiCanvas.height + 50);

    // update and draw fireworks
    for (let f of fireworksParticles) {
        f.x += f.vx; f.y += f.vy; f.vy += 0.06; f.vx *= 0.995; f.age++;
        const lifeRatio = 1 - f.age / f.life;
        if (lifeRatio > 0) {
            ctx.beginPath();
            ctx.fillStyle = f.color;
            ctx.globalAlpha = Math.max(0, Math.min(1, lifeRatio));
            ctx.arc(f.x, f.y, f.size * (0.6 + lifeRatio), 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    fireworksParticles = fireworksParticles.filter(f => f.age < f.life);

    // keep animation alive while there are either confetti or fireworks
    if (confettiParticles.length > 0 || fireworksParticles.length > 0) {
        confettiAnimId = requestAnimationFrame(animateConfetti);
    } else {
        confettiAnimId = null;
    }
}

// ---------- Cake drawing helpers and animation (3-tier cake) ----------
function roundRect(ctx, x, y, w, h, r, fillStyle, strokeStyle) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath(); ctx.moveTo(x + radius, y); ctx.arcTo(x + w, y, x + w, y + h, radius); ctx.arcTo(x + w, y + h, x, y + h, radius); ctx.arcTo(x, y + h, x, y, radius); ctx.arcTo(x, y, x + w, y, radius); ctx.closePath();
    if (fillStyle) { ctx.fillStyle = fillStyle; ctx.fill(); } if (strokeStyle) { ctx.strokeStyle = strokeStyle; ctx.lineWidth = 1.4; ctx.stroke(); }
}

function drawFrostingDrip(ctx, cx, topY, width, idx) {
    const dripCount = Math.max(5, Math.floor(width / 30)); const startX = cx - width / 2 + 12;
    for (let i = 0; i < dripCount; i++) { const x = startX + (i / (dripCount - 1)) * (width - 24); const dripW = 6 + (i % 3) * 2; const dripH = 8 + ((i + idx) % 4) * 4; ctx.beginPath(); ctx.fillStyle = '#fffaf0'; ctx.moveTo(x - dripW / 2, topY); ctx.bezierCurveTo(x - dripW / 2, topY + dripH / 3, x - dripW / 6, topY + dripH, x, topY + dripH); ctx.bezierCurveTo(x + dripW / 6, topY + dripH, x + dripW / 2, topY + dripH / 3, x + dripW / 2, topY); ctx.closePath(); ctx.fill(); }
}

function drawDecorations(ctx, cx, cy) {
    const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF8CC6'];
    for (let i = 0; i < 18; i++) { const ang = Math.random() * Math.PI * 2; const r = 18 + Math.random() * 80; const x = cx + Math.cos(ang) * r * (0.5 + Math.random() * 0.6); const y = cy + Math.sin(ang) * r * (0.2 + Math.random() * 0.9); ctx.beginPath(); ctx.fillStyle = colors[i % colors.length]; ctx.arc(x, y, 2 + Math.random() * 3, 0, Math.PI * 2); ctx.fill(); }
}

function drawNumberCandles(ctx, cx, cy, now) {
    // Draw a single candle centered on the top oval (used to replace the "37" digits)
    const t = (now || Date.now()) * 0.004;
    const candleHeight = Math.max(48, Math.floor(ctx.canvas.width * (-3)));
    const candleWidth = Math.max(10, Math.floor(candleHeight * 0.16));
    // move the candle slightly down so it sits closer to the cake top
    const baseY = cy + Math.floor(ctx.canvas.height * 0.085);
    const x = cx;

    // candle body
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#e6cfcf';
    ctx.lineWidth = 2;
    const bodyTop = baseY - candleHeight;
    ctx.beginPath();
    roundRect(ctx, x - candleWidth / 2, bodyTop, candleWidth, candleHeight, 3, '#fff', '#e6cfcf');

    // a subtle stripe
    ctx.fillStyle = 'rgba(255,220,220,0.55)';
    ctx.fillRect(x - candleWidth / 2 + 2, bodyTop + 6, 4, candleHeight - 12);

    // wick (no block rectangle, just position the flame closer)
    const wickY = bodyTop - 4;

    // flame (animated)
    const flameH = 14 + Math.sin(t * 2.2) * 4;
    const fx = x;
    const fy = wickY;
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    ctx.quadraticCurveTo(fx - 6, fy - flameH * 0.5, fx, fy - flameH);
    ctx.quadraticCurveTo(fx + 6, fy - flameH * 0.5, fx, fy);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,120,60,0.95)';
    ctx.fill();
    // core
    ctx.beginPath(); ctx.fillStyle = 'rgba(255,230,120,0.98)'; ctx.arc(fx, fy - flameH - 3, 3, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
}

let cakeAnimId = null;

function drawCakeSprinkles(ctx, cx, cy, tierW, tierY, tierH, idx) {
    // colorful sprinkles on each tier
    const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#FF6B9D', '#FFA500'];
    const sprinkleCount = Math.floor(tierW / 8);
    for (let i = 0; i < sprinkleCount; i++) {
        const x = cx - tierW / 2 + 8 + Math.random() * (tierW - 16);
        const y = tierY + tierH / 2 - 6 + Math.random() * 4;
        ctx.fillStyle = colors[(idx + i) % colors.length];
        ctx.beginPath();
        ctx.arc(x, y, 1.5 + Math.random() * 1.5, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawBerriesOnCake(ctx, cx, cy, tierW, tierY) {
    // draw berries (raspberries/strawberries) on top of frosting
    const berryColors = ['#C1272D', '#E84C3D', '#D63031'];
    const berryCount = 6 + Math.floor(Math.random() * 4);
    for (let i = 0; i < berryCount; i++) {
        const bx = cx - tierW / 2 + 20 + Math.random() * (tierW - 40);
        const by = tierY - 12 + Math.random() * 3;
        const color = berryColors[Math.floor(Math.random() * berryColors.length)];
        ctx.fillStyle = color;
        // simple berry as a cluster of small circles
        for (let j = 0; j < 3; j++) {
            const ox = (Math.random() - 0.5) * 4;
            const oy = (Math.random() - 0.5) * 4;
            ctx.beginPath();
            ctx.arc(bx + ox, by + oy, 2.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function drawCakeTopOrnament(ctx, cx, cy) {
    // fancy ornament on top of cake (star or decorative shape)
    ctx.save();
    ctx.translate(cx, cy - 24);
    ctx.fillStyle = '#FFD700';
    ctx.strokeStyle = '#FFA500';
    ctx.lineWidth = 1.5;
    // draw a star
    for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const x = Math.cos(angle) * 8;
        const y = Math.sin(angle) * 8;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawCake3D() {
    if (!cakeCanvas || !cakeCtx) return;
    const w = cakeCanvas.width;
    const h = cakeCanvas.height;
    const cx = w / 2;
    const cy = h / 2 + 18;
    cakeCtx.clearRect(0, 0, w, h);
    cakeCtx.save(); /* shadow removed */
    // scale tiers based on canvas width for a larger cake
    const w1 = Math.floor(w * 0.68), h1 = Math.floor(w1 * 0.32), y1 = cy + Math.floor(h * 0.28);
    const w2 = Math.floor(w * 0.55), h2 = Math.floor(w2 * 0.32), y2 = cy + Math.floor(h * 0.02);
    const w3 = Math.floor(w * 0.42), h3 = Math.floor(w3 * 0.32), y3 = cy - Math.floor(h * 0.19);
    const tiers = [
        { w: w1, h: h1, y: y1, color: ['#E8A07C', '#C86B3A'] },
        { w: w2, h: h2, y: y2, color: ['#FFD4B8', '#F5A68A'] },
        { w: w3, h: h3, y: y3, color: ['#FFF0F6', '#FFD4E0'] }
    ];
    tiers.forEach((t, idx) => {
        const grad = cakeCtx.createLinearGradient(cx - t.w / 2, t.y - t.h / 2, cx + t.w / 2, t.y + t.h / 2);
        grad.addColorStop(0, t.color[0]);
        grad.addColorStop(1, t.color[1]);
        roundRect(cakeCtx, cx - t.w / 2, t.y - t.h / 2, t.w, t.h, 14, grad, '#8a4b2b');
        cakeCtx.beginPath();
        cakeCtx.fillStyle = '#FFFFFF';
        cakeCtx.rect(cx - t.w / 2 + 6, t.y - t.h / 2 - 8, t.w - 12, 12);
        cakeCtx.fill();
        drawFrostingDrip(cakeCtx, cx, t.y - t.h / 2 - 8, t.w - 12, idx);
        // add sprinkles and berries
        drawCakeSprinkles(cakeCtx, cx, cy, t.w, t.y, t.h, idx);
        drawBerriesOnCake(cakeCtx, cx, cy, t.w, t.y);
    });
    // top oval scaled
    const topRx = Math.max(54, Math.floor(w * 0.18));
    const topRy = Math.max(14, Math.floor(topRx * 0.26));
    const topY = cy - Math.floor(h * 0.32);
    cakeCtx.beginPath();
    cakeCtx.ellipse(cx, topY, topRx, topRy, 0, 0, Math.PI * 2);
    cakeCtx.fillStyle = '#FFFFFF';
    cakeCtx.fill();
    // draw ornament on top
    drawCakeTopOrnament(cakeCtx, cx, topY);
    drawNumberCandles(cakeCtx, cx, topY, Date.now());
    cakeCtx.restore();
}

function animateCake() { drawCake3D(); cakeAnimId = requestAnimationFrame(animateCake); }
function startCakeAnimation() { if (cakeAnimId) return; cakeAnimId = requestAnimationFrame(animateCake); }
function stopCakeAnimation() { if (!cakeAnimId) return; cancelAnimationFrame(cakeAnimId); cakeAnimId = null; }

// Envelope interaction on first slide
let envelopeOpened = false;
const envelopeEl = document.getElementById('envelope');
function openEnvelope() {
    if (envelopeOpened) return;
    envelopeOpened = true;
    if (envelopeEl) envelopeEl.classList.add('open');
    // after open animation, jump to celebration slide
    setTimeout(() => goToCelebration(), 900);
}

function goToCelebration() {
    // animate out current (slide 0)
    try { animateOutSlide(currentSlide); } catch (e) { }
    currentSlide = totalSlides - 1;
    showSlide(currentSlide);
    try { if (bgMusic && !bgMusic.paused) bgMusic.pause(); } catch (e) { }
    if (happyAudio) { happyAudio.currentTime = 0; happyAudio.play().catch(() => { }); currentMusic = happyAudio; }
    spawnConfetti();
    startCakeAnimation();
}

if (envelopeEl) envelopeEl.addEventListener('click', (e) => { e.stopPropagation(); openEnvelope(); });

