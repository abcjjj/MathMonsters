/**
 * JavaScript for Math Monsters
 * This file keeps track of the player and monster objects and their attributes
 * @author: Xu, John and Jordan Larock
 * @since: Wednesday, October 30, 2013
 */

function Monster() {
    type = "";// 6 types: snake, snail, heugh, 'jack'(chimaera), robot, and boss
    totalLP = -1;// LP = life points
    lifePointsMonster = -1;
    moneyGive = -1;
    
    this.setType = function(t) {
        type = t;
    };// end mutator
    this.getType = function() {
        return type;
    };// end accessor    
    this.setTotalLP = function(tLP) {
        totalLP = tLP;
    };// end mutator
    this.getTotalLP = function() {
        return totalLP;
    };// end accessor        
    this.setLifePointsMonster = function(points) {
        lifePointsMonster = points;
        changeMonsterLives();
    };// end mutator
    this.getLifePointsMonster = function() {
        return lifePointsMonster;
    };// end accessor       
        this.setMoneyGive = function(m) {
                moneyGive = m;
        };// end mutator
        this.getMoneyGive = function() {
                return moneyGive;
        };// end accessor
    
    this.loseLifeMonster = function(){
            lifePointsMonster --;
                changeMonsterLives();
    };// end loseLife
    
    this.setImageMonster = function() {
            switch(type) {
                    case "snail":
                            $("#monsterA").css("visibility", "visible");
                            break;
                    case "snake":
                            $("#monsterC").css("visibility", "visible");
                            break;
                    case "heugh":
                            $("#monsterB").css("visibility", "visible");
                            break;
                    case "jack":
                            $("#monsterE").css("visibility", "visible");
                            break;
                    case "robot":
                            $("#monsterD").css("visibility", "visible");
                            break;
                    case "boss":
                            $("#monsterF").css("visibility", "visible");
                            break;
                    default:
                            $("#monster").css("visibility", "visible");// <- the original doge
                    changeMonsterLives();
            }// end switch case
            
    };// end setImage
    
    function changeMonsterLives() {
        var canvas = document.getElementById("monsterLives");
        var context = canvas.getContext('2d');
        var imageObj = new Image();
        context.clearRect(0,0,canvas.width,canvas.height);
        imageObj.src = "images/heart.png";
        imageObj.onload = function() {
            for(var i=0; i<lifePointsMonster; i++)
                context.drawImage(imageObj, 20*i, 0);
        };
    }// end changeMonsterLives
    this.clearMonsterLPCanvas = function() {
            var canvas = document.getElementById("monsterLives");
            var context = canvas.getContext('2d');
            context.clearRect(0,0,canvas.width,canvas.height);        
    };// end clearMonsterLPCanvas

    /**
     * resets the monster type after a forced conversion into robot or boss 
     */
    this.resetMonsterType = function() {
            if(typeControl.getIsEasy())
                    type = "snail";
            if(typeControl.getIsMedium())
                    type = "snake";
            if(typeControl.getIsHard())
                    type = "heugh";
            if(typeControl.getIsCrazy())
                    type = "jack";                                                
    };// end resetMonsterType
    
}// end createMonster
// initialize monster
var monster = new Monster();

/**
 * the character that the user controls
 */
function Character() {
    // customization attributes
    isMale = false;

    // battle attributes
    money = -1;
    lifePoints = -1;
    weaponUpgrade = -1;
    shieldUpgrade = -1;
    clockNumber = -1;
    brainNumber = -1;
    
    // customization attributes
    this.setGender = function(gender) {
        if(gender==="male")
            isMale = true;
        else // is not male -> female
            isMale = false;
    };// end mutator
    this.getGender = function() {
        if(isMale)
            return "male";
        else // is not male -> female
            return "female";
    };// end accessor
    this.setImage = function() {           
            if(isMale)
                    $("#girlSprite").css("visibility", "hidden");// hide girl for boy, and vice versa
            else// is female
                    $("#boySprite").css("visibility", "hidden");
            changeCharacterLives();
    };// end setImage   
    
    // battle-related functions
    this.setMoney = function(m) {
        money = m;
    };// end mutator
    this.getMoney = function() {
        return money;
    };// end accessor
    this.setLifePoints = function(lp) {
        lifePoints = lp;
        changeCharacterLives();
    };// end mutator
    this.getLifePoints = function() {
        return lifePoints;
    };// end accessor    
    this.setWeaponUpgrade = function(level) {
        weaponUpgrade = level;
    };// end mutator
   this.getWeaponUpgrade = function() {
        return weaponUpgrade;
    };// end accessor    
    this.setShieldUpgrade = function(level) {
        shieldUpgrade = level;
    };// end mutator
   this.getShieldUpgrade = function() {
        return shieldUpgrade;
    };// end accessor    
    this.setClockNumber = function(amount) {
        clockNumber = amount;
    };// end mutator
    this.getClockNumber = function() {
        return clockNumber;
    };// end accessor
    this.setBrainNumber = function(amount) {
        brainNumber = amount;
    };// end mutator
    this.getBrainNumber = function() {
        return brainNumber;
    };// end accessor 
    
    this.loseLife = function() {
            lifePoints --;
            changeCharacterLives();
    };// end loseLife
    function changeCharacterLives() {
                var canvas = document.getElementById("characterLives");
            var context = canvas.getContext('2d');
            var imageObj = new Image();
            context.clearRect(0,0,canvas.width,canvas.height);
            imageObj.src = "images/heart.png";
            imageObj.onload = function() {
                for(var i=0; i<lifePoints; i++)
                    context.drawImage(imageObj, 20*i, 0);
            };
        }// end changeCharacterLives
    this.clearCharacterLPCanvas = function() {
            var canvas = document.getElementById("characterLives");
            var context = canvas.getContext('2d');
            context.clearRect(0,0,canvas.width,canvas.height);        
    };// end clearMonsterLPCanvas
        
    this.death = function() {
        // when character is dead
        $(".ASDF").css("visibility", "hidden");
        $(".battle").css("visibility", "hidden");
        $(".gameOver").css("visibility", "visible");
        document.getElementById("loseSound").load();
        document.getElementById("loseSound").play();
        $("#loseToMenu").click(function(){
	        $(".gameOver").css("visibility", "hidden");
	        $(".menu").css("visibility", "visible");
	        $("#lock2, #lock3, #lock4").addClass("stageSelection");
	        $("#girlSprite").css("left", 700);
         });
        character.clearCharacterLPCanvas();
        monster.clearMonsterLPCanvas();
    };// end death
}// end Constructor
// initialize character
var character = new Character();
