const timeString = document.getElementById('time-string');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const statusBadge = document.getElementById('status-badge');
const progressIndicator = document.getElementById('progress-indicator');
const alarmSound = document.getElementById('alarm-sound');

const inputWork = document.getElementById('input-work');
const inputBreak = document.getElementById('input-break');

let countdownInterval = null;
let currentMode = 'work'; 
let isClockRunning = false;
let isAudioUnlocked = false; 

function getAllocatedSeconds() {
    const workMinutes = parseInt(inputWork.value) || 25;
    const breakMinutes = parseInt(inputBreak.value) || 5;
    return currentMode === 'work' ? workMinutes * 60 : breakMinutes * 60;
}

let totalSecondsAllocated = getAllocatedSeconds();
let secondsRemaining = totalSecondsAllocated;

const circleRadius = progressIndicator.r.baseVal.value;
const totalCircumference = circleRadius * 2 * Math.PI;
progressIndicator.style.strokeDasharray = `${totalCircumference} ${totalCircumference}`;
progressIndicator.style.strokeDashoffset = 0;

function updateTimerDisplay() {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    
    timeString.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    const fractionProcessed = secondsRemaining / totalSecondsAllocated;
    progressIndicator.style.strokeDashoffset = totalCircumference - (fractionProcessed * totalCircumference);
}

function unlockAudioContext() {
    if (!isAudioUnlocked && alarmSound) {
        alarmSound.muted = true;
        alarmSound.play()
            .then(() => {
                alarmSound.pause();
                alarmSound.currentTime = 0;
                alarmSound.muted = false;
                isAudioUnlocked = true; 
                console.log("Audio pipeline unlocked securely for Chrome/Edge.");
            })
            .catch(err => console.log("Waiting for user interaction to unlock audio..."));
    }
}

function toggleTimerExecution() {
    unlockAudioContext();

    if (isClockRunning) {
        clearInterval(countdownInterval);
        isClockRunning = false;
        startPauseBtn.innerText = "Resume Session";
        startPauseBtn.style.backgroundColor = "var(--accent-blue)";
    } else {
        if (secondsRemaining === totalSecondsAllocated) {
            totalSecondsAllocated = getAllocatedSeconds();
            secondsRemaining = totalSecondsAllocated;
        }
        
        isClockRunning = true;
        startPauseBtn.innerText = "Pause Clock";
        startPauseBtn.style.backgroundColor = "#fbbf24";
        
        countdownInterval = setInterval(() => {
            secondsRemaining--;
            updateTimerDisplay();
            
            if (secondsRemaining <= 0) {
                clearInterval(countdownInterval);
                triggerAlarmNotification();
                switchExecutionModes(); 
            }
        }, 1000);
    }
}

function switchExecutionModes() {
    isClockRunning = false;
    clearInterval(countdownInterval);
    
    if (currentMode === 'work') {
        currentMode = 'break';
        statusBadge.innerText = "Short Break";
        statusBadge.className = "badge break";
        progressIndicator.style.stroke = "var(--accent-green)";
    } else {
        currentMode = 'work';
        statusBadge.innerText = "Focus Session";
        statusBadge.className = "badge work";
        progressIndicator.style.stroke = "var(--accent-blue)";
    }

    totalSecondsAllocated = getAllocatedSeconds();
    secondsRemaining = totalSecondsAllocated;
    startPauseBtn.innerText = currentMode === 'work' ? "Start Focus" : "Start Break";
    startPauseBtn.style.backgroundColor = "var(--accent-blue)";
    updateTimerDisplay();
}

function resetTimerSystem() {
    clearInterval(countdownInterval);
    isClockRunning = false;
    startPauseBtn.innerText = currentMode === 'work' ? "Start Focus" : "Start Break";
    startPauseBtn.style.backgroundColor = "var(--accent-blue)";
    
    totalSecondsAllocated = getAllocatedSeconds();
    secondsRemaining = totalSecondsAllocated;
    updateTimerDisplay();
}

function triggerAlarmNotification() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'sine'; 
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); 
      
        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
      
        oscillator.start();
        
        oscillator.stop(audioCtx.currentTime + 0.5); 
        
        console.log("🔊 Hardware-generated Beep sound played successfully!");
    } catch (err) {
        console.warn("Hardware audio blocked. Triggering screen fallback.", err);
        alert("⏰ Time's up!");
    }
}

startPauseBtn.addEventListener('click', toggleTimerExecution);
resetBtn.addEventListener('click', resetTimerSystem);

inputWork.addEventListener('change', () => { if(!isClockRunning && currentMode === 'work') resetTimerSystem(); });
inputBreak.addEventListener('change', () => { if(!isClockRunning && currentMode === 'break') resetTimerSystem(); });

updateTimerDisplay();
