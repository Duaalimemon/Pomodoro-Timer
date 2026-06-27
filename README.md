# Project 03: Flexible Pomodoro State Machine

A productivity-focused time management engine that implements structured focus and recovery intervals. This application showcases precise asynchronous loop mechanics, dynamic hardware-level audio calculations, and custom layout styling designed to process volatile user time constraints.

---

##  Tech Stack & Architecture

* **Frontend Structure:** High-contrast responsive single-page visual viewport layout.
* **Style Engine:** Hardware-accelerated CSS `@keyframes`, customized SVG geometry stroke tracking configurations, and tabular numeric alignment formatting.
* **Core Logic:** Native window-level background clock processes (`setInterval`), automated type conversion handlers, and low-level JavaScript synthesis frequency oscillators.

---

##  Core Features Engineered

* **User-Driven Flexible Configurations:** Replaced hardcoded timing constants with real-time numeric inputs that automatically recalibrate ticking baselines on active mode changes.
* **Automated Mode State Machine:** Engineered an internal state evaluation engine that switches dynamically between focus and break modes instantly when the counter limits run out.
* **Mathematical Vector Progress Ring:** Translates seconds into circular graphic dimensions dynamically by calculating current offsets against geometric circumference metrics ($\text{Circumference} = 2 \cdot \pi \cdot r$).
* **Hardware-Generated Beep Notification:** Bypassed restrictive modern browser autoplay policies by synthesizing direct digital audio signals in real time via the browser's native Web Audio API.

---

##  Core Engineering Concepts Applied

### 1. Vector Circumference Stroke Scaling
Maps remaining seconds cleanly over visual outer borders using explicit SVG line element manipulations:
```
const fractionProcessed = secondsRemaining / totalSecondsAllocated;
progressIndicator.style.strokeDashoffset = totalCircumference - (fractionProcessed * totalCircumference);
```

2. Hardware Web Audio Synthesis
Avoided remote asset dependency by creating real-time electronic frequencies using code-driven sound wave configurations:

```
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
oscillator.start();
oscillator.stop(audioCtx.currentTime + 0.5);
```

3. Precise Tabular String Alignment
To prevent shifting text bugs during digital count tracking updates, integers are forced into double-digit strings while padding layouts evenly:

```
timeString.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
```

📂 File Directory Mapping
03-pomodoro-timer/

├── index.html  
├── style.css  
└── app.js    

👤 Development Context
Developed intentionally as part of the core JavaScript track assignments during the DevWeekends Fellowship program.
