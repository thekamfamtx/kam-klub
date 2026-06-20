const MEMBERS_URL = "members.json";

const messages = [
  "THANK YOU KAM KLUB MEMBERS",
  "YOU GUYS MAKE THIS CHANNEL POSSIBLE",
  "WELCOME TO THE KAM KLUB FAMILY",
  "WE APPRECIATE EVERY MEMBER",
  "CRUISE FAMILY FOREVER"
];

let members = [];
let queue = [];
let index = 0;

// START
loadMembers();

// LOAD MEMBERS FROM GITHUB
async function loadMembers() {
  try {
    const res = await fetch(MEMBERS_URL);
    members = await res.json();

    shuffleMembers();
    showNextMember();

  } catch (err) {
    console.error("Failed to load members:", err);
  }
}

// SHUFFLE ORDER EACH CYCLE
function shuffleMembers() {
  queue = [...members];

  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }

  index = 0;
}

// SHOW NEXT MEMBER
function showNextMember() {
  if (queue.length === 0) return;

  if (index >= queue.length) {
    shuffleMembers();
  }

  const member = queue[index++];
  displayMember(member);

  setTimeout(showMessage, 8000);
}

// DISPLAY MEMBER
function displayMember(member) {
  const nameEl = document.getElementById("circleText");
  const levelEl = document.getElementById("memberLevel");

  nameEl.innerText = member.name;
  levelEl.innerText = member.level;

  autoSizeText(nameEl, member.name);
}

// SHOW MESSAGE BETWEEN MEMBERS
function showMessage() {
  const nameEl = document.getElementById("circleText");
  const levelEl = document.getElementById("memberLevel");

  const msg = messages[Math.floor(Math.random() * messages.length)];

  nameEl.innerText = msg;
  levelEl.innerText = "";

  autoSizeText(nameEl, msg);

  setTimeout(showNextMember, 3000);
}

// AUTO SIZE TEXT SO IT NEVER BREAKS CIRCLE
function autoSizeText(el, text) {
  const len = text.length;

  if (len <= 10) {
    el.style.fontSize = "44px";
  } 
  else if (len <= 18) {
    el.style.fontSize = "36px";
  } 
  else if (len <= 28) {
    el.style.fontSize = "28px";
  } 
  else {
    el.style.fontSize = "22px";
  }
}
