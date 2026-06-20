const MEMBERS_URL = "members.json";

const messages = [
  "⭐ THANK YOU KAM KLUB MEMBERS ⭐",
  "🚢 MEMBERS MAKE THIS CHANNEL POSSIBLE 🚢",
  "🎉 JOIN THE KAM KLUB TODAY 🎉",
  "💙 WE APPRECIATE EVERY MEMBER 💙"
];

let members = [];
let queue = [];
let index = 0;

// LOAD MEMBERS FROM GITHUB JSON FILE
async function loadMembers() {
  try {
    const res = await fetch(MEMBERS_URL);
    members = await res.json();

    shuffleMembers();
    showNext();
  } catch (error) {
    console.error("Error loading members.json:", error);
  }
}

// SHUFFLE MEMBERS (RANDOM ORDER EACH CYCLE)
function shuffleMembers() {
  queue = [...members];

  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }

  index = 0;
}

// SHOW NEXT MEMBER
function showNext() {
  if (queue.length === 0) return;

  if (index >= queue.length) {
    shuffleMembers();
  }

  const member = queue[index++];
  showMember(member);

  setTimeout(() => {
    showMessage();
  }, 8000);
}

// DISPLAY MEMBER IN CIRCLE + LEVEL
function showMember(member) {
  document.getElementById("circleText").innerText = member.name;
  document.getElementById("memberLevel").innerText = member.level;
}

// SHOW RANDOM THANK YOU MESSAGE BETWEEN MEMBERS
function showMessage() {
  const msg = messages[Math.floor(Math.random() * messages.length)];

  const circle = document.getElementById("circleText");
  const level = document.getElementById("memberLevel");

  // temporarily clear member display
  circle.innerText = msg;
  level.innerText = "";

  setTimeout(() => {
    showNext();
  }, 3000);
}

// START EVERYTHING
loadMembers();
