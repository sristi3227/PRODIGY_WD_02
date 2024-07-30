let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let i=1;

const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');
const tablist = document.getElementById('tablist_data');

function updateTime() {
    const now = Date.now();
    const timeDiff = now - startTime + elapsedTime;
    const minutes = Math.floor(timeDiff / 60000);
    const seconds = Math.floor((timeDiff % 60000) / 1000);
    const milliseconds = Math.floor((timeDiff % 1000) / 10);

    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
    millisecondsEl.textContent = String(milliseconds).padStart(2, '0');
}

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
        
    } else {
        startTime = Date.now();
        timer = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    millisecondsEl.textContent = '00';
    startStopBtn.textContent = 'Start';
    tablist.innerHTML = '';
    i=1;
});

lapBtn.addEventListener('click', () => {
    if(i==1){
        let head=`<tr><th>SL NO</th><th>LAP</th></tr>`;
        tablist.innerHTML=head;
    }
    if (isRunning) {
        const lapTime = `${minutesEl.textContent}:${secondsEl.textContent}:${millisecondsEl.textContent}`;
        const tr = document.createElement('tr');
        const tdsl = document.createElement('td');
        const tdlap = document.createElement('td');
        tdsl.textContent =`${i}`;
        tdlap.textContent =lapTime;
        tr.appendChild(tdsl);
        tr.appendChild(tdlap);
        
        tablist.appendChild(tr);
        i++;
    }
});
