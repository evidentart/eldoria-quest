let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let armor = 0;
let monsterHealth;
let inventory = ["stick"];
let dungeonLevel = 0; // Start at level 0 (1st level)
const maxDungeonLevel = 1; // Corresponds to the last index of the levels array

// DOM elements
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const weaponText = document.querySelector("#weaponText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// Game functions
const weapons = [
	{
		name: "stick",
		power: 5
	},
	{
		name: "dagger",
		power: 20
	},
	{
		name: "claw hammer",
		power: 35
	},
	{
		name: "sword",
		power: 50
	}
];

// Game objects
const monsters = [
  {
    name: "lesser skeleton",
    level: 2,
    health: 50
  },
  {
    name: "fierce beast",
    level: 8,
    health: 100
  },
  {
    name: "ancient dragon",
    level: 20,
    health: 300
  }
];

// Event listeners for starting the game
document.getElementById('startButton').addEventListener('click', function() {
	document.getElementById('startScreen').style.display = 'none';
	document.getElementById('mainContent').style.display = 'block';
	initializeGame();
  playMusic();
});

function playMusic() {
  var music = document.getElementById('backgroundMusic');
  music.play().catch(e => console.error('Error playing music:', e));
}

// Initialization buttons
function initializeGame() {
	button1.onclick = goTown; // Initially setting to goTown or as required
	button2.onclick = goBlacksmith;
	button3.onclick = goDungeon;

	goTown(); // Load the initial location
}

// Event listeners for the buttons
document.addEventListener("DOMContentLoaded", function() {
  initializeButtons(); // This function will be defined in game-actions.js
});

