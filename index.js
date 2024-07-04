#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// step 01
class Hero {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    decrease() {
        this.health -= 20;
    }
    increase() {
        this.health = 100;
    }
}
// step 02
class Enemy {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    decrease() {
        this.health -= 20;
    }
    increase() {
        this.health = 100;
    }
}
// step 03
async function main() {
    const { heroName } = await inquirer.prompt([
        {
            name: "heroName",
            type: "input",
            message: chalk.blue.underline.magenta("Enter your name:")
        }
    ]);
    const { enemyType } = await inquirer.prompt([
        {
            name: "enemyType",
            type: "list",
            message: chalk.grey.underline.red("Select the enemy you fight with:"),
            choices: ["Alien", "Zombie", "Witch"]
        }
    ]);
    const hero = new Hero(heroName);
    const enemy = new Enemy(enemyType);
    console.log(`${hero.name} V/S ${enemy.name}`);
    do {
        const { action } = await inquirer.prompt([
            {
                name: "action",
                type: "list",
                message: "Select a type to attack",
                choices: ["Attack", "Defend", "Range Target", "Run"]
            }
        ]);
        switch (action) {
            case "Attack":
                const randomNum = Math.random();
                if (randomNum > 0.5) {
                    hero.decrease();
                    console.log(`${hero.name} health: ${hero.health}`);
                    console.log(`${enemy.name} health: ${enemy.health}`);
                    if (enemy.health <= 0) {
                        console.log("You loss! try again");
                        return;
                    }
                }
                else {
                    enemy.decrease();
                    enemy.decrease();
                    console.log(`${hero.name} health: ${hero.health}`);
                    console.log(`${enemy.name} health: ${enemy.health}`);
                    if (hero.health <= 0) {
                        console.log("Congratulation you win!!!!");
                        return;
                    }
                }
                break;
        }
    } while (true);
}
main();
