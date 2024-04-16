function goToTownSquare() {
	const townSquare = locations.find(loc => loc.name === "town square");
	update(townSquare);
}

// Data structure for different game locations, and their corresponding UI elements
const locations = [
  {
    name: "town square", 
    "button text": ["Talk", "Blacksmith", "Dungeon Entrance"],
    "button functions": [talkToGuard, goBlacksmith, goDungeon],
    text: "After leaving the guard at the town entrance, you pause a short distance away, lingering under the shadow of an old, gnarled tree to consider your next move"
  },
	{
		name: "blacksmith",
		"button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
		"button functions": [buyHealth, buyWeapon, goToTownSquare],
		text: `The heat from the forge warms your face as you step into the dimly lit blacksmith shop. \n\nThe rhythmic clanging of hammer on anvil resonates as the blacksmith, muscles glistening with sweat, shapes a glowing piece of metal.`
	},
	{
		name: "dungeon",
		levels: [
	{ // Level 1 Dungeon
		"button text": ["Enter Dungeon (Level 1)", "Leave Dungeon"],
		"button functions": [fightLevel1Monster, goToTownSquare],
		text: "You step into the dimly lit dungeon, where echoes of ancient battles linger in the shadowy corridors..."
	},
	{ // Level 2 Dungeon
		"button text": ["Fight Level 2 Monster", "Leave Dungeon"],
		"button functions": [fightLevel2Monster, goToTownSquare],
		text: "The ancient stone steps groan underfoot as you ascend the spiral staircase, each turn bringing you closer to the unknown.\n\n You find a set of mystical armor.\n Armor increased by 10!"
	}
		]
	},
	{
		name: "win",
		"button text": ["REPLAY ?", "REPLAY ??", "REPLAY ???"],
		"button functions": [restart, restart, restart],
		text: "Victory is yours! 🎉 The last creature remains clatter to the stone floor, defeated.\n\n The dungeon's ominous silence now sings a tune of triumph. You have cleansed this ancient place of its curse.\n\n What new adventures await the hero who conquers even the darkest depths?"
},
{
		name: "lose",
		"button text": ["REPLAY ?", "REPLAY ??", "REPLAY ???"],
		"button functions": [restart, restart, restart],
		text: "You died. ☠️\n\n Overwhelmed by the dark forces of the dungeon, you have fallen. \n\nThe dungeon claims another weary soul.\n\n Will you rise again to challenge the darkness?"
},
]

// initialize buttons
button1.onclick = talkToGuard;
button2.onclick = goBlacksmith;
button3.onclick = goDungeon;

// Function to update UI elements based on the provided location data
function update(location) {
	const buttons = [button1, button2, button3];
	const buttonTexts = location["button text"];
	const buttonFunctions = location["button functions"];

	for (let i = 0; i < buttons.length; i++) {
			if (buttonTexts[i]) { // Check if the text exists for the button
					buttons[i].innerText = buttonTexts[i];
					buttons[i].onclick = buttonFunctions[i];
					buttons[i].style.display = 'inline-block';
			} else {
					buttons[i].style.display = 'none'; // Hide the button if no text is assigned
			}
	}
	text.innerText = location.text;
}

function talkToGuard() {
    update(locations[0]);
}

function goBlacksmith() {
    update(locations[1]);
}

function goDungeon() {
    update(locations[2]);
}

// Simplified dialog interaction function
function talkToGuard() {
	text.innerText = "As you approach the ancient town gates, a rugged guard blocks your path, his eyes narrowing. \n\n\Guard: \"None may enter without a trophy from the dungeon. Prove your worth.\" he demands sternly.";
	button1.innerText = "Ask for Quest";
	button2.innerText = "Return to Town Square";
	button3.style.display = 'none'; // Hide the third button as it's not needed here

	button1.onclick = function() {
			text.innerText = "Guard: 'I don’t have any quests for you at the moment. Check back later!'";
			button1.innerText = "Leave";
			button2.style.display = 'none';
			button3.style.display = 'none';
			button1.onclick = () => update(locations[0]); // Recycle the function to stay in dialog
			button2.onclick = () => update(locations[0]); // Function to return back to town square
	};
	button2.onclick = () => update(locations[0]);
}

function buyHealth() {
	if (gold >= 10) {
		gold -= 10;
		health += 10;
		goldText.innerText = gold;
		healthText.innerText = health;  
		text.innerText = "You hand over some coins and receive a healing potion\n\n You now have " + health + " health.";     
	} else {
			text.innerText = "You do not have enough gold to buy health.";
	}
}

function buyWeapon() {
	if (currentWeapon < weapons.length - 1) {
		if (gold >= 30) {
					gold -= 30;
					currentWeapon++;
					goldText.innerText = gold;
					let newWeapon = weapons[currentWeapon].name;
			text.innerText = "You now have a " + newWeapon + ".";
					inventory.push(newWeapon);
					text.innerText += " \n\nIn your inventory you have: " + inventory;
					weaponText.innerText = weapons[currentWeapon].name + " | Power: " + weapons[currentWeapon].power;
		} else {
			text.innerText = "You do not have enough gold to buy a weapon.";
		} 
	} else {
	text.innerText = "You already have the most powerful weapon!";
	button2.innerText = "Sell weapon for 15 gold";
	button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
	if (inventory.length > 1) {
		gold += 15;
		goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
	} else {
    	text.innerText = "Don't sell your only weapon!";
  	}
}

function goDungeon() {
	const dungeon = locations.find(loc => loc.name === "dungeon");
	if (dungeonLevel < dungeon.levels.length) {
			updateDungeon(dungeon.levels[dungeonLevel]);
	} else {
			text.innerText = "You have cleared all available dungeon levels!";
			button1.style.display = 'none';
			button2.style.display = 'none';
			button3.style.display = 'inline-block';
			button3.innerText = "Return to Town Square";
			button3.onclick = goToTownSquare;
	}
}

// Function to handle the fight with the level 1 monster
function fightLevel1Monster() {
	// Find the monster with the name "skeleton" in the monsters array
	const enemy = monsters.find(monster => monster.name === "lesser skeleton");

	// Update the enemy stats on the UI
	updateMonsterStats(enemy);

	// Set up the UI for the fight
	button1.innerText = "Attack";
	button1.onclick = () => attackEnemy(enemy, 0); // Assuming level parameter is the dungeon level
	button2.innerText = "Flee";
	button2.onclick = goDungeon;
	button2.style.display = 'inline-block';
	button3.style.display = 'none';

	// Update the text to show the monster challenge
	text.innerHTML = `A chilling clatter echoes through the dim corridor as a skeleton emerges from the shadows, bones clinking melodically with every sinister step.<br>
			<span class="enemy-name">${enemy.name}</span> : <span class="health-number">${enemy.health}</span> hp`;
}


// Function to handle the fight with the level 2 monster
function fightLevel2Monster() {
	const enemy = monsters.find(monster => monster.name === "fierce beast");
	updateMonsterStats(enemy);
	button1.innerText = "Attack";
	button1.onclick = () => attackEnemy(enemy, 1);
	button2.innerText = "Flee";
	button2.onclick = goToTownSquare;
	button2.style.display = 'inline-block';
	button3.style.display = 'none';
	text.innerHTML = `Your torch flickers as a growl reverberates through the cavern, and the ominous silhouette of a fierce beast looms ahead...<br><br>
	<span class="enemy-name">Fierce Beast</span> : <span class="health-number">${enemy.health}</span> hp`;
}

// Function to handle updating the dungeon
function updateDungeon(dungeonInfo) {
	text.innerText = dungeonInfo.text;
	button1.innerText = dungeonInfo["button text"][0];
	button1.onclick = dungeonInfo["button functions"][0];
	button2.innerText = dungeonInfo["button text"][1];
	button2.onclick = dungeonInfo["button functions"][1];
	if (dungeonInfo["button text"].length > 2 && button3) {
			button3.innerText = dungeonInfo["button text"][2];
			button3.onclick = dungeonInfo["button functions"][2];
			button3.style.display = 'inline-block';
	} else {
			button3.style.display = 'none';
	}
}

// Function to handle the attack
function attackEnemy(enemy, level) {
	const xpBonus = Math.floor(Math.random() * xp) + 1; // Random bonus from 1 to XP
	const playerDamage = weapons[currentWeapon].power + xpBonus; // Include XP bonus in damage calculation
	enemy.health -= playerDamage;

	// Update the enemy's health on the UI
	updateMonsterStats(enemy);

	if (enemy.health > 0) {
			const enemyDamage = calculateEnemyDamage(enemy);
			if (armor > 0) {
				if (enemyDamage > armor) {
						// Enemy damage exceeds current armor; armor is depleted, and excess damage goes to health.
						health -= (enemyDamage - armor);
						armor = 0;  // Armor is fully depleted
				} else {
						// Armor absorbs all the damage
						armor -= enemyDamage;
				}
		} else {
				// No armor; all damage goes to health
				health -= enemyDamage;
		}
		armorText.innerText = armor;
		healthText.innerText = health; // Update player's health on the UI
		text.innerHTML = `You hit the <span class="enemy-name">${enemy.name}</span> for <span class="damage-number">${playerDamage}</span> damage.<br>The <span class="enemy-name">${enemy.name}</span> hits you back for <span class="damage-number">${enemyDamage}</span> damage.<br><span class="enemy-name">${enemy.name}</span> Health: <span class="health-number">${enemy.health}</span>`;
	} else {
			// Enemy defeated
			text.innerHTML = `You defeated the <span class="enemy-name">${enemy.name}</span> with a final blow of <span class="damage-number">${playerDamage}</span> damage!`;
			xp += 7; // Add XP for defeating an enemy, adjust value as needed
			updatePlayerStats(); // Update UI including XP
			button1.innerText = "Proceed to next level (save)";
			button1.onclick = () => proceedToNextLevel(level);
			button2.style.display = goToTownSquare; // Optionally modify the "Flee" button
	}

	  if (health <= 0) {
			lose();
			return; // Exit the function to prevent further actions
	  }
 }

function calculateEnemyDamage(enemy) {
	// Placeholder for enemy attack logic
	return Math.floor(Math.random() * 10) + 5;  // Example damage range 5-15
}

function proceedToNextLevel(level) {
	if (level === 0) { // Level 0 corresponds to the first level dungeon
			armor += 10; // Grant 10 armor points after clearing level 1
			armorText.innerText =  armor; // Update armor display
	}
	if (level < maxDungeonLevel) {
			dungeonLevel++;
			goDungeon();  // function handles entering the next dungeon level
	} else {
			winGame();
	}
}

function updateMonsterStats(enemy) {
	monsterNameText.innerText = enemy.name;
	monsterHealthText.innerText =  enemy.health;
}

function updatePlayerStats() {
	healthText.innerText = health;
	goldText.innerText = gold;
	xpText.innerText = xp; 
	armorText.innerText = armor;
}

function winGame() {
  update(locations[3]);
}

function lose() {

	update(locations[4]);
}

function restart() {
  // Reset player stats
	xp = 0;
	health = 100;
	armor = 0;
	gold = 50;
	currentWeapon = 0;
	inventory = ["stick"];
	goldText.innerText = gold;
	healthText.innerText = health;
	xpText.innerText = xp;
	armorText.innerText = armor;

	  // Reset monster health
		monsters.forEach(monster => {
			switch (monster.name) {
				case "lesser skeleton":
					monster.health = 50;
					break;
				case "fierce beast":
					monster.health = 100;
					break;
				case "ancient dragon":
					monster.health = 300;
					break;
			}
		});
		dungeonLevel--; // Reset dungeon level
  goToTownSquare(); // Start over from the town square
}