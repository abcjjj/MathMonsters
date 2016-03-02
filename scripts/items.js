/**
 * JavaScript for Math Monsters
 * This file has all the objects for the shop items
 * @author: Xu, John and Jordan Larock
 * @since: Wednesday, October 30, 2013
 */

//shop items
/**
 *        The clock item that is sold in the shop: when it is used in battle,
 *  it gives the user 10 extra seconds to answer the question 
 */
function Clock() {
        const CLOCK_PRICE = 25;
        /**
         * used in the battle screen;
         * adjusts the timer so that there are 10 extra seconds
         */
        this.clockUse = function() {
                if(character.getClockNumber()>0) {
                        clearInterval(timeInterval);
                        var temp = parseInt(character.getClockNumber()) - 1;
                        character.setClockNumber(temp);// 1 clock comsumed
                        temp = timer.getCurrentTime() + 10 + 1;
                        timer.setCurrentTime(temp);// give 10 extra seconds
                        timer.countDown();
                }
        };// end clockUsed
        this.getClockPrice = function() {
                return CLOCK_PRICE;
        };// end accessor
        /**
         * triggered when a clock is bought in the shop 
         */
        this.clockBuy = function() {
                var temp = parseInt(character.getClockNumber()) + 1 ;
                character.setClockNumber(temp);
                temp = character.getMoney() - CLOCK_PRICE;
                character.setMoney(temp);
                document.getElementById("moneySound").load();
                document.getElementById("moneySound").play();
                $("#showMoney").text("Argent: $" + character.getMoney());
        };// end buyHeart
        /**
         * displays the remaining amount of clock items in the battle screen 
         */
        this.showClockNumber = function() {
                $("#item1").text("Cloche * " + character.getClockNumber());
        };// end showClockNumber
}// end constructor
// initialize shop item
var clock = new Clock();

/**
 * The heart item that is sold in the shop: when it is bought the user gains an 
 * extra life point
 */
function Heart() {
        const HEART_PRICE = 75;// constant price
        /**
         * the accessor to the price of the heart
         * @ return the price of the heart 
         */
        this.getHeartPrice = function() {
                return HEART_PRICE;
        };// end accessor
        /**
         * triggered when a heart is bought in the shop; the user gains another life point (chance) in the battle (answering questions)
         */        
        this.heartBuy = function() {
                var temp = parseInt(character.getLifePoints()) + 1; // add 1 life point
                character.setLifePoints(temp);
                temp = character.getMoney() - HEART_PRICE;
                character.setMoney(temp);
                document.getElementById("moneySound").load();
                document.getElementById("moneySound").play();
                $("#showMoney").text("Argent: $" + character.getMoney());
        };// end heartBuy
}// end constructor
// initialize shop item
var heart = new Heart();

/**
 * The shield object that is sold in the shop: when it is used in battle, 
 * it gives the character a chance to evade an attack from the monster
 */
function Shield() {
        var shieldPrice = 500;// initial price
        /**
         * accessor and mutator to the variable price of the shield
         * @param {number} p the price of the shield
         * @return the current price of the shield
         */        
        this.getShieldPrice = function() {
            return shieldPrice;
        };// end accessor
        this.setShieldPrice = function(p) {
            shieldPrice = p;
        };// end mutator        
        /**
         * triggered when the shield upgrade is bought in the shop 
         */
        this.shieldBuy = function() {
            var temp = character.getShieldUpgrade() + 1;
            character.setShieldUpgrade(temp);                                
            temp = character.getMoney() - shieldPrice;                                
            character.setMoney(temp);
            shieldPrice = parseInt(shieldPrice) + parseInt(500);// the price goes up
            document.getElementById("moneySound").load();
            document.getElementById("moneySound").play();
            $("#showMoney").text("Argent: $" + character.getMoney());
            $("#buyShield").text("Surclasse: " + shield.getShieldPrice() + "$");// the price changes
        };// end shieldBuy
        /**
         * Determines whether the user evades the monster's attack upon giving a wrong answer 
         * @return whether the hit was evaded or not
         */
        this.isEvaded = function() {
                var temp1 = Math.random();
                var temp2 = 0.5-0.5*Math.pow(0.5, character.getShieldUpgrade());
                if(temp1<temp2)
                        return true;// P(s) = 0.5 - 0.5^(s+1), where P represents the probability of an evasion, and s represent the level of the shield upgrade
                else
                        return false;
        };// end shield 
}// end constructor
// initialize shop item
var shield = new Shield();

/**
 * The weapon, or fist, that is sold in the shop: when it is used
 * in battle, it gives the character a chance to critical-hit
 * (reducing 2 life points at once) the monster
 */
function Weapon() {
        var weaponPrice = 500;// initial price
        /**
         * accessor and mutator to the variable price of the weapon
         * @param {number} p the price of the weapon
         * @return the current price of the weapon
         */
        this.getWeaponPrice = function() {
             return weaponPrice;
        };// end accessor
        this.setWeaponPrice = function(p) {
            weaponPrice = p;
        };// end mutator
        /**
         * triggered when the weapon is bought 
         */
        this.weaponBuy = function() {
            var temp = character.getWeaponUpgrade() + 1;
            character.setWeaponUpgrade(temp);
            temp = character.getMoney() - weaponPrice;
            character.setMoney(temp);
            weaponPrice = parseInt(weaponPrice) + parseInt(500); // price goes up
            document.getElementById("moneySound").load();
        	document.getElementById("moneySound").play();
            $("#showMoney").text("Argent: $" + character.getMoney());
            $("#buyFist").text("Surclasse: " + weapon.getWeaponPrice() + "$");// the price changes
        };// end weaponBuy
        /**
         * Determines whether the user hits the monster with a critical hit
         * @return whether if the hit was critical
         */
        this.isCritical = function() {
                var temp1 = Math.random();
                var temp2 = 0.5-0.5*Math.pow(0.5, character.getWeaponUpgrade());
                if(temp1<temp2)
                        return true;// P(s) = 0.5 - 0.5^(s+1), where P represents the probability of a critical hit, and s represent the level of the weapon (fist) upgrade
                else
                        return false;
        };// end isCritical
        
}// end constructor
// initialize shop item
var weapon = new Weapon();

/**
 * The brain item that is sold in the shop: when it is used in battle, it
 * will give the user a hint to the current question aksed by the monster (or question generator)
 */
function Brain() {
        const BRAIN_PRICE = 50; // constant price of the brain
        /**
         * triggered when a brain is bought in the shop 
         */
        this.brainBuy = function() {
	            var temp = parseInt(character.getBrainNumber()) + 1;
	            character.setBrainNumber(temp);
	            temp = character.getMoney() - BRAIN_PRICE;
	            character.setMoney(temp);
	            document.getElementById("moneySound").load();
	            document.getElementById("moneySound").play();
	       	    $("#showMoney").text("Argent: $" + character.getMoney());
        };// end brainBuy
        /**
         * triggered when the user uses a brain in the battle  
         */
        this.brainUse = function() {
                // has to be greater than nothing
                if(character.getBrainNumber()>0) {
                        var temp = parseInt(character.getBrainNumber()) - 1;
                        character.setBrainNumber(temp);
                        hint();
                        $("#hint").css("visibility", "visible");
                }
        };// end brainUse
        /**
         * gives the user a hint by making the question a multiple-choice one
         */
        function hint() {
                var temp = questionGenerator.getAnswer();
                var wrongChoice1 = temp + Math.round(Math.random()*10);
                var wrongChoice2 = -1;
                while(wrongChoice2<0)//<- ensures that it would not be negative
                        wrongChoice2 = temp - Math.round(Math.random()*10);
                // the following switch case shuffles the order of the choices so that the correct one does not always appear at the same place
                switch(Math.floor(Math.random()*3)) {
                        case 0:
                                $("#hint").text("Indice: La reponse est " + temp + " ou " + wrongChoice1 + " ou " + wrongChoice2);
                                break;
                        case 1:
                                $("#hint").text("Indice: La reponse est " + wrongChoice1 + " ou " + temp + " ou " + wrongChoice2);
                                break;
                        case 2:
                                $("#hint").text("Indice: La reponse est " + wrongChoice2 + " ou " + wrongChoice1 + " ou " + temp);
                                break;
                        default:
                                $("#hint").text("Tricheur: La reponse est " + temp);
                }// end switch case
        }// end hint
        /**
         * this function changes the text that indicates the brain number in the battle screen 
         */
        this.showBrainNumber = function() {
                $("#item2").text("Cerveau * " + character.getBrainNumber());                        
        };// end showBrainNumber
}// end constructor
// initialize shop item
var brain = new Brain();