const MEMBERS_URL = "members.json";

const messages = [
  "THANK YOU KAM KLUB MEMBERS",
  "YOU GUYS MAKE THIS CHANNEL POSSIBLE",
  "WELCOME TO THE KAM KLUB FAMILY",
  "WE APPRECIATE EVERY SINGLE MEMBER",
  "CRUISE FAMILY FOREVER"
];

let members = [];
let queue = [];
let index = 0;

// START APP
loadMembers();

// LOAD MEMBERS FROM GITHUB JSON
async function loadMembers() {
  try {
    const res = await fetch(MEMBERS_URL);
    members = await res.json();

    shuffleMembers();
    showNextMember();

  } catch (err) {
    console.error("Error loading members.json:", err);
  }
}

// SHUFFLE MEMBERS EACH CYCLE
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

  // show for 8 seconds
  setTimeout(showMessage, 8000);
}

// DISPLAY MEMBER
function displayMember(member) {
  const circle = document.getElementById("circleText");
  const level = document.getElementById("memberLevel");

  circle.innerText = member.name;
  level.innerText = member.level;

  autoSizeText(circle, member.name);
}

// SHOW RANDOM MESSAGE BETWEEN MEMBERS
function showMessage() {
  const circle = document.getElementById("circleText");
  const level = document.getElementById("memberLevel");

  const msg = messages[Math.floor(Math.random() * messages.length)];

  circle.innerText = msg;
  level.innerText = "";

  autoSizeText(circle, msg);

  // show message for 3 seconds then continue
  setTimeout(showNextMember, 3000);
}

// AUTO RESIZE TEXT (FIXES LONG NAMES / MESSAGES)
function autoSizeText(el, text) {
  const length = text.length;

  if (length <= 10) {
    el.style.fontSize = "44px";
  } 
  else if (length <= 18) {
    el.style.fontSize = "36px";
  } 
  else if (length <= 28) {
    el.style.fontSize = "28px";
  } 
  else {
    el.style.fontSize = "22px";
  }
}
