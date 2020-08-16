// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less



var fightOrSkip = function() {
    // ask user if they want to fight or skip
    var promptFight = window.prompt ("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    //recursive call until a valid answer is provided
    //if (promptFight === "" || promptFight === null){
    // can use falsy values check here instead
    if (!promptFight){
        window.alert("You need to provide a valid answer! Please choose 'FIGHT' or 'SKIP.'");
        return fightOrSkip();
    }
    // convert user input to lower case
    promptFight = promptFight.toLowerCase();
    // if the user picks skip, confirm and then stop the loop
    if (promptFight === "skip"){
        // confirm that they want to quit.
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes, subtract money and leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log("player money", playerInfo.money);
            //return true is player wants to skip
            return true;
        }
    }
    return false;
}


var fight = function(enemy) {
    // repeat and execute as long as the enemy robot is alive and the player is alive
    while(enemy.health > 0 && playerInfo.health > 0) {
        // check if the player wants to fight or skip
        if (fightOrSkip()) {
            //if true, leave fight
            break;
        }

        // if the player does not skip, then default to fight
        // Subtract the value of playerInfo.attack from the value of enemy.health, and use that result to update the value in the enemy.health variable.
        //use Math.max to not let the enemy health go below 0
        //generate random damage based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);

        // Log a resulting message to the console to confirm that it worked.
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        // check enemy's health
        if (enemy.health <= 0){
            window.alert(enemy.name + " has died!");
            //award player money for winning
            playerInfo.money += 20;
            //leave while loop since enemy is dead
            break;
        }else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        // Subtract the value of enemy.attack from the value of playerInfo.health, and use that result to update the value in the playerInfo.health variable.
        var playerDamage = randomNumber(enemy.attack - 3, enemy.attack);
        //console.log(playerDamage);
        playerInfo.health = Math.max(0, playerInfo.health - playerDamage);

        // Log a resulting message to the console to confirm that it worked.
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        // check player's health
        if (playerInfo.health <= 0){
            window.alert(playerInfo.name + " has died!");
            //if player died, leave while loop    
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
        
        // If the user did not pick any of the above words, then let the user know that they need to pick a valid option.
        // } else {
        //     window.alert("You need to pick a valid option. Try again!");
        // }
    }   
};

var startGame = function () {
    // reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            debugger;
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);


            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if user wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    endGame();
};

// function to end the entire game
var endGame = function () {
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

var shop = function () {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );

    shopOptionPrompt = parseInt(shopOptionPrompt);

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");

            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};


var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

// function to set name
var getPlayerName = function() {
    var name = "";
  
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
      }
  
    console.log("Your robot's name is " + name);
    return name;
  };

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, // comma!
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

// You can also log multiple values at once like this
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];


// start the game when the page loads
startGame();