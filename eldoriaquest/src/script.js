var xp = 0;
var health = 100;
var gold = 50;
var currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];


const talkButton = document.querySelector("#button1");
const attackButton = document.querySelector("#button2");
const leaveButton = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// initialize buttons
button1.onclick = talk;
button2.onclick = attack;
button3.onclick = Crossroads;

function talk() {

  button1.innerText = "Accept Quest";
  button2.innerText = "Decline";
  button3.innerText = "Leave";
  button1.onclick = acceptQuest;
  button2.onclick = declineQuest;
  button3.onclick = leave;
  text.innerText = "The guard looks at you suspiciously and says, 'Only those who prove their worth may enter Eldoria. Do you have what it takes?'";
  

}

function attack() {

}

function leave() {
  button1.innerText = "Talk to Guard";
  button2.innerText = "Attack!";
  button3.innerText = "Go to Crossroads";
  button1.onclick = talk;
  button2.onclick = attack;
  button3.onclick = Crossroads;
  text.innerText = "After leaving the guard at the town entrance, you pause a short distance away, lingering under the shadow of an old, gnarled tree to consider your next move";
  
}

function acceptQuest() {

}

function declineQuest() {

}

function Crossroads() {
  button1.innerText = "Town Entrance";
  button2.innerText = "Dungeon Entrance";
  button3.innerText = "BlackSmith";
  button1.onclick = leave;
  button2.onclick = declineQuest;
  button3.onclick = declineQuest;
  text.innerText = "You arrive at the crossroads, where three paths diverge: one leads to the dungeon entrance, another to the blacksmith, and the last back to the town entrance. Each direction promises its own challenges and rewards.";
}



document.getElementById('startButton').addEventListener('click', function() {
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('mainContent').style.display = 'block';
});