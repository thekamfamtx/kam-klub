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

async function loadMembers() {
  const res = await fetch(MEMBERS_URL);
  members = await res.json();

  shuffleMembers();
  showNext();
}

function shuffleMembers() {
  queue = [...members];

  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }

  index = 0;
}

function showNext() {
  if (index >= queue.length) {
    shuffleMembers();
  }

  const member = queue[index++];
  showMember(member);

  setTimeout(() => {
    showMessage();
  }, 8000);
}

function showMember(member) {
  document.getElementById("messageScreen").classList.add("hidden");

  document.getElementById("memberName").innerText = member.name;
  document.getElementById("memberLevel").innerText = member.level;
}

function showMessage() {
  const msg = messages[Math.floor(Math.random() * messages.length)];

  const screen = document.getElementById("messageScreen");
  screen.innerText = msg;
  screen.classList.remove("hidden");

  setTimeout(() => {
    showNext();
  }, 3000);
}

loadMembers();
