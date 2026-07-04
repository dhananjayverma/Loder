const flyArea = document.getElementById("flyArea");
const mainCore = document.getElementById("mainCore");
const statusText = document.getElementById("status");
const percent = document.getElementById("percent");
const bar = document.getElementById("bar");
const loader = document.getElementById("loader");
const website = document.getElementById("website");

let loaded = 0;
let progress = 0;

const items = [
  "Attendance", "Resources", "Assessment", "Feeds", 
  "Students", "Faculty", "Results", "Login"
];

const gradients = [
  "linear-gradient(135deg,#ef1d22,#ff6b35)",
  "linear-gradient(135deg,#1d4ed8,#38bdf8)",
  "linear-gradient(135deg,#16a34a,#5eead4)",
  "linear-gradient(135deg,#7c3aed,#c084fc)",
  "linear-gradient(135deg,#f97316,#facc15)",
  "linear-gradient(135deg,#0f172a,#334155)"
];

function createFlyingItem() {
  const item = document.createElement("div");
  item.innerText = items[Math.floor(Math.random() * items.length)];
  item.className = "flying-item";
  
  item.style.background = gradients[Math.floor(Math.random() * gradients.length)];  // Set CSS variables for animation dynamically
  const spreadX = Math.min(620, window.innerWidth - 72);
  const startX = window.innerWidth / 2 - spreadX / 2 + Math.random() * spreadX;
  const startY = Math.max(28, window.innerHeight / 2 - 330 + Math.random() * 145);
  const rotate = (Math.random() * 44 - 22) + "deg";

  item.style.setProperty("--x", startX + "px");
  item.style.setProperty("--y", startY + "px");
  item.style.setProperty("--r", rotate);

  flyArea.appendChild(item);

  setTimeout(() => {
    item.remove();
    loaded++;
  }, 1250);
}

const flyTimer = setInterval(createFlyingItem, 280);

const progressTimer = setInterval(() => {
  progress += Math.floor(Math.random() * 4) + 2;

  if (progress >= 100) {
    progress = 100;
    clearInterval(flyTimer);
    clearInterval(progressTimer);

    const brandText = document.querySelector(".brandText");
    if (brandText) brandText.style.display = "none";
    
    const progressWrap = document.querySelector(".progressWrap");
    if (progressWrap) progressWrap.style.display = "none";

    const logoBadge = document.querySelector(".logoBadge");
    if (logoBadge) {
      logoBadge.style.display = "flex";
      logoBadge.style.alignItems = "center";
      logoBadge.style.justifyContent = "center";
      logoBadge.innerHTML = "";
      
      const readyBadge = document.createElement("div");
      readyBadge.className = "ready-badge";
      readyBadge.innerHTML = `
        <div class="success-badge">
          <div class="success-circle" aria-hidden="true">
            <svg class="success-check" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
              <path class="success-path" d="M4.7 12.7 L9.3 17.3 L19.3 7.3" />
            </svg>
          </div>
        </div>
      `;

      logoBadge.appendChild(readyBadge);

      // After the path draw completes, add a subtle pulse class to the circle
      setTimeout(() => {
        const circle = logoBadge.querySelector('.success-circle');
        if (circle) circle.classList.add('pulse');
        // STOP: Do not hide the loader or reveal the website — remain on OK state
      }, 800);
    }
  }

  bar.style.width = progress + "%";
  percent.innerText = progress + "%";

  if (progress < 30) statusText.innerText = "Loading login interface...";
  else if (progress < 60) statusText.innerText = "Importing academic modules...";
  else if (progress < 85) statusText.innerText = "Connecting campus services...";
  else if (progress < 100) statusText.innerText = "Finalizing CUIMS...";
}, 420);
