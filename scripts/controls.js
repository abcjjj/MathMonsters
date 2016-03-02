/**
 * JavaScript for Math Monsters
 * This file keeps track of game events and progress (as objects)
 * @author: Xu, John and Jordan Larock
 * @since: Wednesday, October 30, 2013
 */

/**
 * This object directs what questions the question generator object will generate
 */
function TypeControl() {
        // the stages
        var isEasy = false;
        var isMedium = false;
        var isHard = false;
        var isCrzay = false;// describes the difficulty of the current stage
        
        // the operation of the question
        var operation = -1;
        const ADD = 1;// constants matching the types of operations in the generator
        const SUBTRACT = 2;
        const MULTIPLY = 3;
        const DIVIDE = 4;
        const MIX = 5;
        
        //accessor mutator functions; they allow access to the type of the current hub, or corresponding question
        this.setIsEasy = function(e) {
                isEasy = e;
        };// end mutator
        this.getIsEasy = function() {
                return isEasy;
        };// end accessor
        this.setIsMedium = function(m) {
                isMedium = m;
        };// end mutator
        this.getIsMedium = function() {
                return isMedium;
        };// end accessor        
        this.setIsHard = function(h) {
                isHard = h;
        };// end mutator
        this.getIsHard = function() {
                return isHard;
        };// end accessor        
        this.setIsCrazy = function(c) {
                isCrazy = c;
        };// end mutator
        this.getIsCrazy = function() {
                return isCrazy;
        };// end accessor        
        
        //operation accessor and mutator
        /**
         * switches the current operation by converting the string
         * of the type to the corresponding constant 
         * @param o the string that indicates the type
         */
        this.setOperation = function(o) {
                switch(o) {
                        case "add":
                                operation = ADD;
                                break;
                        case "subtract":
                                operation = SUBTRACT;
                                break;
                        case "multiply":
                                operation = MULTIPLY;
                                break;
                        case "divide":
                                operation = DIVIDE;
                                break;
                        default:
                                operation = MIX;
                }// end switch                
        };// end mutator
        /**
         * returns the current operation
         * @return the consant of the operation that matches the types
         * in the question genertator
         */
        this.getOperation = function() {
                switch(operation) {
                        case ADD:
                                return ADD;
                        case SUBTRACT:
                                return SUBTRACT;
                        case MULTIPLY:
                                return MULTIPLY;
                        case DIVIDE:
                                return DIVIDE;
                        default:
                                return MIX;
                }// end switch        
        };// end accessor        
                
}// end constructor
//initialize the type control
var typeControl = new TypeControl();

/**
 * This object keeps tract of what stages are unlocked
 */
function StageControl() {
        var isMediumUnlocked = false;// these properties indicate what stages are unlocked by the user,
        var isHardUnlocked = false;// which they can access
        var isCrazyUnlocked = false;
        var bossAppear = -1;// this variable triggers the boss by counting how many monsters are defeated
        const MONSTER_TO_BEAT = 50;// this constant represents how many monsters the user needs to defeat to encounter the next boss
        
        /**
         * mutator and accessor functions for checking which stages are unlocked
         * @param whether or not the stage is unlocked
         * @return if the stage is unlocked or not 
         */
        this.setIsCrazyUnlocked = function(c) {
                isCrazyUnlocked = c;
                if(isCrazyUnlocked)// for the mutators, the functions also seek to lock or unlock the stage, according to the parameter
                        unlockCrazy();
                else// is not unlocked
                        $("#stage4").prop("disabled", true);        
        };// end mutator
        this.getIsCrazyUnlocked = function() {
                return isCrazyUnlocked;
        };// end accessor        
        this.setIsHardUnlocked = function(h) {
                isHardUnlocked = h;
                if(isHardUnlocked)
                        unlockHard();
                else// is not unlocked
                        $("#stage3").prop("disabled", true);        
        };// end mutator
        this.getIsHardUnlocked = function() {
                return isHardUnlocked;
        };// end accessor        
        this.setIsMediumUnlocked = function(m) {
                isMediumUnlocked = m;
                if(isMediumUnlocked)
                        unlockMedium();
                else// is not unlocked
                        $("#stage2").prop("disabled", true);        
        };// end mutator
        this.getIsMediumUnlocked = function() {
                return isMediumUnlocked;
        };// end accessor                
        this.setBossAppear = function(b) {
                bossAppear = b;
        };// end mutator
        this.getBossAppear = function() {
                return bossAppear;
        };// end accessor                                
        
        this.setBoss = function() {
                if(isCharacterReady()&&isCurrentStage()) {
                        monster.setType("boss");// force the monster type into boss
                        monster.setTotalLP(monster.getTotalLP()*5);// 5 times the life points
                        monster.setMoneyGive(monster.getMoneyGive()*5);// 5 times the reward
                        dalert.alert("Regarde, le boss de cette etage!", " ");
                        typeControl.setOperation("boss");// which is the default mix
                }
        };// end setBoss
        /**
         * determines whether if the user is in currently most difficult hub, which
         * is necessary for the boss to appear
         * @return if the user is challanging the hardest stage 
         */
        function isCurrentStage() {
                if(isMediumUnlocked==false)
                        return true;// the user can only challange the easy stage
                else if(isHardUnlocked==false)
                        return typeControl.getIsMedium();// medium comes before hard
                else if(isCrazyUnlocked==false)
                        return typeControl.getIsHard();// hard comes before crazy
                else // default
                        return true; // when the user has completed the stages, the boss can randomly appear
        }// end isCurrentStage
        /**
         * determines whether if the user is in currently most difficult hub, which
         * is necessary for the boss to appear
         * @return if the user is challanging the hardest stage 
         */
        this.isCurrentStage = function() {
                if(isMediumUnlocked==false)
                        return true;// the user can only challange the easy stage
                else if(isHardUnlocked==false)
                        return typeControl.getIsMedium();// medium comes before hard
                else if(isCrazyUnlocked==false)
                        return typeControl.getIsHard();// hard comes before crazy
                else // default
                        return true; // when the user has completed the stages, the boss can randomly appear
        };// end isCurrentStage     
        /**
        * determines whether if the boss is to appear 
        * @return if the boss is to appear or not
        */
        function isCharacterReady() {
                if(bossAppear==MONSTER_TO_BEAT)// this happens when the user beats 50 monsters after starting the game or completing a stage
                        return true;
                return false;
        }// end setBoss
        
        /**
         * carry out tasks when the stage is cleared: the user is directed to the stage selection screen,
         * and is informed of clearing the stage 
         */
        this.clearStage = function() {
                if(monster.getType()==="boss") { 
                // checks if the monster defeated was a boss        
                        dalert.alert("Ouah, tu as vaincu le boss monstre", " ");
                        $(".hub").css("visibility", "hidden");// directs back
                        $(".stageSelection").css("visibility", "visible");
                        dalert.alert("La prochaine etage est disponible!!", " ");
                        unlockNextStage();
                }
        };// end clearStage
        /**
         * allows the user to access the next stages after beating the boss; 
         * this function is called in the clearStage function 
         */
        function unlockNextStage() {
                bossAppear=0;// reset counter
                if(isMediumUnlocked==false) {
                        isMediumUnlocked=true;
                        unlockMedium();
                }
                else if(isHardUnlocked==false) {
                        isHardUnlocked=true;
                        unlockHard();
                }
                else if(isCrazyUnlocked==false) {
                        isCrazyUnlocked=true;
                        unlockCrazy();
                }
                else 
                        dalert.alert("Tu as vaincu les 4 etages!\nMaintenant ton objectif est d'acheter le clef.", " ");
        }// end unlockNextStage
        
        /**
         * these functions allow the user to select the next stages and remove the lock images
         */
        function unlockMedium() {
                $("#stage2").prop("disabled", false);
                $("#lock2").removeClass("stageSelection");        
                $("#lock2").css("visibility", "hidden");        
        }// end unlockMedium
        function unlockHard() {
                $("#stage3").prop("disabled", false);
                $("#lock3").removeClass("stageSelection");
                $("#lock3").css("visibility", "hidden");
        }// end unlockHard
        function unlockCrazy() {
                $("#stage4").prop("disabled", false);
                $("#lock4").removeClass("stageSelection");        
                $("#lock4").css("visibility", "hidden");        
        }// end unlockCrazy        
        
}// end constructor
// initialize the stage control
var stageControl = new StageControl();