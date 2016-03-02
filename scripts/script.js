/**
 * JavaScript for Math Monsters
 * This file mainly consists of action events including functions 
 * associated with them and the timer object
 * @author: Xu, John and Jordan Larock
 * @since: Wednesday, October 30, 2013
 */

/**
 * Switch to the menu after showing the 'loading' icon for two seconds
 */
setTimeout(function(){
	$(".menu").css("visibility","visible");
	$("#loadScreen").css("visibility","hidden");
}, 2000);


// action events
$(function(){
    // a sound effect for all buttons
	$("button").click(function() {
	        document.getElementById("buttonSound").load();        
	        document.getElementById("buttonSound").play();                               
    });
    /*
     * The menu screens
     */
    $("#start").click(function() {
            $(".menu").css("visibility", "hidden");
            $(".storySkip").css("visibility", "visible");
    });

    $("#howtoplay").click(function() {
            $(".instructions").css("visibility", "visible");
            $(".menu").css("visibility", "hidden");
    });

    $("#settings").click(function() {
        readSettings();
        $(".settings").css("visibility", "visible");
        $(".menu").css("visibility", "hidden"); 
    });

    $("#loadGame").click(function() {
            // $(".savedgames").css("visibility", "visible");
            // $(".menu").css("visibility", "hidden");
            if(localStorage.money!=null)
           	   dalert.confirm("Ton jeu est en course?", "readGame", "blank", " ");
    });

    $("#instructionstoMenu").click(function() {
        $(".instructions").css("visibility", "hidden");
        $(".menu").css("visibility", "visible");
    });

    $("#settingstoMenu").click(function() {
        $(".settings").css("visibility", "hidden");
        $(".menu").css("visibility", "visible");
        saveSettings();
    });
    $("#turnSound").click(function() {
            if(localStorage.isSound==="false") {
                    // sounds are currently off
                    $("#turnSound").text("allumer");
                    localStorage.isSound=true;
                    $(".sound").attr("src", "music/silent.mp3");
                    $(".indSounds").prop("checked", false);                    
            }
            else {
                    // sounds are currently on
                    $("#turnSound").text("eteindre");
                    localStorage.isSound=false;
                    addSoundSrc();
                    $(".indSounds").prop("checked", true);
            }// end if-else
    });
    
    $("#savedgamestoMenu").click(function() {
            $(".savedgames").css("visibility", "hidden");
            $(".menu").css("visibility", "visible");
    });
            
    $("#backToMenu").click(function() {
            $(".won").css("visibility", "hidden");
            $(".menu").css("visibility", "visible");
            $("#lock2, #lock3, #lock4").addClass("stageSelection");
            $("#girlSprite").css("left", 700);            
    });
    
    /*
     * The transition/information screens
     */
    $("#yesView").click(function() {
            $(".storySkip").css("visibility", "hidden");
            $(".story").css("visibility", "visible");                        
    });
    $("#noView").click(function() {
            $(".storySkip").css("visibility", "hidden");
            $(".customization").css("visibility", "visible");
    });
    
    $("#ok").click(function() {
            $(".story").css("visibility", "hidden"); 
            $(".customization").css("visibility", "visible");
    });

    $("#doneCus").click(function() {
            if($("#femaleRadio").is(':checked')||$("#maleRadio").is(':checked')) {
                $(".customization").css("visibility", "hidden");
            $(".stageSelection").css("visibility", "visible");
            if($("#femaleRadio").is(':checked')) {
                    character.setGender("female");
                    setFemaleImage();
            }
            if($("#maleRadio").is(':checked'))
                    character.setGender("male");       
            character.setLifePoints(5);// every relevant variable is reinitialized manually
            //character.clearCharacterLPCanvas();
            character.setMoney(500);
            character.setClockNumber(0);
            character.setBrainNumber(0);
            character.setShieldUpgrade(0);
            character.setWeaponUpgrade(0);
            stageControl.setIsMediumUnlocked(false);
            stageControl.setIsHardUnlocked(false);
            stageControl.setIsCrazyUnlocked(false);
            stageControl.setBossAppear(0);
            shield.setShieldPrice(500);
            weapon.setWeaponPrice(500);
            }
            else 
            	dalert.alert("Est-tu un garcon ou une fille???", "???");
    });           
  
    /*
     * The battle, action, and stage selection screens
     */  
    $("#backToBattle").click(function() {
            $(".won").css("visibility", "hidden");
            $(".stageSelection").css("visibility", "visible");
    });       
    
    $("#stage1").click(function() {
            $(".stageSelection").css("visibility", "hidden");
            $(".hub").css("visibility", "visible");
            typeControl.setIsEasy(true);
            typeControl.setIsMedium(false);
            typeControl.setIsHard(false);
            typeControl.setIsCrazy(false);
            monster.setTotalLP(1);
            monster.setMoneyGive(5);
            monster.setType("snail");
    });  
    $("#stage2").click(function() {
            $(".stageSelection").css("visibility", "hidden");
            $(".hub").css("visibility", "visible");
            typeControl.setIsMedium(true);
            typeControl.setIsEasy(false);
            typeControl.setIsHard(false);
            typeControl.setIsCrazy(false);
            monster.setTotalLP(3);
            monster.setMoneyGive(10);
            monster.setType("snake");
    });  
    $("#stage3").click(function() {
            $(".stageSelection").css("visibility", "hidden");
            $(".hub").css("visibility", "visible");
            typeControl.setIsHard(true);
            typeControl.setIsEasy(false);
            typeControl.setIsMedium(false); 
            typeControl.setIsCrazy(false);
            monster.setTotalLP(3);
            monster.setMoneyGive(20);
            monster.setType("heugh");
    });          
    $("#stage4").click(function() {
            $(".stageSelection").css("visibility", "hidden");
            $(".hub").css("visibility", "visible");
            typeControl.setIsCrazy(true);
            typeControl.setIsEasy(false);
            typeControl.setIsMedium(false); 
            typeControl.setIsHard(false);
            monster.setTotalLP(5);
            monster.setMoneyGive(50);
            monster.setType("jack");
    });                     
                     
    $("#travelAddition").click(function() {
            typeControl.setOperation("add");
    });  
    $("#travelSubtraction").click(function() {
            typeControl.setOperation("subtract");               
    });  
    $("#travelMultiplication").click(function() {
            typeControl.setOperation("multiply");               
    });  
    $("#travelDivision").click(function() {
            typeControl.setOperation("divide");               
    });           
    $("#travelCombined").click(function() {
            monster.setType("robot");
            typeControl.setOperation("mix");               
    });        
    $("#travelAddition, #travelSubtraction, #travelMultiplication, #travelDivision, #travelCombined").click(function() {    
            if(typeControl.getIsEasy()||typeControl.getIsHard())
                    timer.setTotalTime(30);
            else // medium or crazy stage
                    timer.setTotalTime(15);
            stageControl.setBoss();
            $(".hub").css("visibility", "hidden");
            $(".battle").css("visibility", "visible");
            startBattle();                
            monster.setLifePointsMonster(monster.getTotalLP());                        
    });  
          
    $("#hubToStage").click(function() {
            $(".hub").css("visibility", "hidden");
            $(".stageSelection").css("visibility", "visible");
    });                 
                       
    $("#hubToShop").click(function() {
            $("#showMoney").text("Argent: $" + character.getMoney());
            $(".hub").css("visibility", "hidden");
            $(".shop").css("visibility", "visible");
            
    });        
    
    $("#toHub").click(function() {
            $(".shop").css("visibility", "hidden");
            $(".hub").css("visibility", "visible");
    });
    
    $("#key").click(function() {
            if(character.getMoney()>=10000) {
                    dalert.confirm("Echappe de la caverne!", "winning", "blank", " ");
                    function winning() {
	                    character.clearCharacterLPCanvas();
        				monster.clearMonsterLPCanvas();
	                    character.setMoney(character.getMoney()-10000);
	                    $(".shop").css("visibility", "hidden");
	                    $(".won").css("visibility", "visible");
	                    document.getElementById("winSound").load();
	                    document.getElementById("winSound").play();
                    }// end winning
            }
            else
                    dalert.alert("Tu n'as pas assez d'argent!", " ");
    });  
                
    $("#buyHeart").click(function() {
    	if(character.getMoney()>=75)
        	dalert.confirm("Est tu sure?", "heart.heartBuy", "blank", " ");
        else
    		dalert.alert("Tu n'as pas assez d'argent!", " ");
    });
    $("#buyFist").click(function() {
    	if(character.getMoney()>=weapon.getWeaponPrice())
            dalert.confirm("Est tu sure?", "weapon.weaponBuy", "blank", " ");
        else
    		dalert.alert("Tu n'as pas assez d'argent!", " ");
    });           
    $("#buyClock").click(function() {
    	if(character.getMoney()>=25)                
            dalert.confirm("Est tu sure?", "clock.clockBuy", "blank", " ");
        else
    		dalert.alert("Tu n'as pas assez d'argent!", " ");
    }); 
    $("#buyShield").click(function() {
    	 if(character.getMoney()>=shield.getShieldPrice())
            dalert.confirm("Est tu sure?", "shield.shieldBuy", "blank", " ");
        else
    		dalert.alert("Tu n'as pas assez d'argent!", " ");
    }); 
    $("#buyBrain").click(function() {
    	if(character.getMoney()>=50)
    		dalert.confirm("Est tu sure?", "brain.brainBuy", "blank", " ");
    	else
    		dalert.alert("Tu n'as pas assez d'argent!", " ");
    });         
    
    $("#saveButton").click(function() {
    		dalert.confirm("Est-ce que vous voulez sauver votre progres?", "saveGame", "blank", " ");
    });    
    
    $("#submitAnswer").click(function() {
        clearInterval(timeInterval);        
        document.getElementById("hitSound").load();
        document.getElementById("punchSound").load();
        if(checkAnswer()) { 
        		var text = "Correcte: Tu attaque le monstre!";
                document.getElementById("punchSound").play();                
                monster.loseLifeMonster();
                if(weapon.isCritical()) {
                    text = text + "\nEt c'etait une attaque critique!";
                    monster.loseLifeMonster();
                }
                if(monster.getLifePointsMonster()<=0) { // checks if the monster is dead
                	start = false;
                	text = text + "\nTu as vaincu le monstre!\n Vous recevez $" + monster.getMoneyGive();
                    dalert.alert(text, " ");
                    character.setMoney(parseInt(character.getMoney())+parseInt(monster.getMoneyGive()));
                    $(".battle").css("visibility", "hidden");
                    $(".ASDF").css("visibility", "hidden");
                    $(".hub").css("visibility", "visible");
                    if(stageControl.isCurrentStage())
                    	stageControl.setBossAppear(stageControl.getBossAppear()+1);// add one
                    stageControl.clearStage();
                    monster.resetMonsterType();  
                    removeContent();                  
                }
                else {
                	dalert.alert(text, " ");
                }// end if-else
        }
        else {
        	var text = "Mal reponse: Le monstre t'attaque!";
        	document.getElementById("hitSound").play();
            //dalert.alert(text, " ");
            if(shield.isEvaded() == false){             
                    character.loseLife();               
                    if(character.getLifePoints()<=0) { // check if the character is dead
                    	start = false;
                        text = text + "\nOh non! Tu est vaincu par le monstre!";
                        dalert.alert(text, " ");
                        character.death();
                        removeContent(); 
                    }
                    else
                        dalert.alert(text, " ");
            }
            else {
            		text = text + "\nMais tu esquive le attaque!";
                    dalert.alert(text, " ");
            }// end if-else
        }// end if-else
    });
    $("#item1").click(function() {
                clock.clockUse();
                clock.showClockNumber();
    });
    $("#item2").click(function() {
                brain.brainUse();
                brain.showBrainNumber();
    });            

    $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
    });   // this prevents the user from pressing enter, which will relaod the screen                     
          
});// end document ready
var start = false;// this variable determines if the battle has started

/**
 * This function is used for a negative response from the confirm boxes 
 */
function blank() {
	
}// end blank
/**
 * this function adds to original sources to the audio elements 
 */
function addSoundSrc() {
        $("#buttonSound").attr("src", "music/button.mp3");
        $("#loseSound").attr("src", "music/lose.mp3");
        $("#winSound").attr("src", "music/win.mp3");
        $("#punchSound").attr("src", "music/punch.mp3");
        $("#hitSound").attr("src", "music/hit.mp3");
        $("#moneySound").attr("src", "music/money.mp3");
}// end addSoundSrc
/**
 * this function reads the previous settings
 */
function readSettings() {
        if(localStorage.isClick==="false") {
                $("#click").prop("checked", false);
                $("#buttonSound").attr("src", "music/silent.mp3");
        }
        else {
                $("#click").prop("checked", true);
                $("#buttonSound").attr("src", "music/button.mp3");
        }// end if-else
        if(localStorage.isWin==="false") {
                $("#win").prop("checked", false);
                $("#winSound").attr("src", "music/silent.mp3");
        }
        else {
                $("#win").prop("checked", true);
                $("#winSound").attr("src", "music/win.mp3");
        }// end if-else
        if(localStorage.isLose==="false") {
                $("#lose").prop("checked", false);
                $("#loseSound").attr("src", "music/silent.mp3");
        }
        else {
                $("#lose").prop("checked", true);
                $("#loseSound").attr("src", "music/lose.mp3");
        }// end if-else
        if(localStorage.isPunch==="false") {
                $("#punch").prop("checked", false);
                $("#punchSound").attr("src", "music/silent.mp3");
        }
        else {
                $("#punch").prop("checked", true);
                $("#punchSound").attr("src", "music/punch.mp3");
        }// end if-else
        if(localStorage.isHit==="false") {
                $("#hit").prop("checked", false);
                $("#hitSound").attr("src", "music/silent.mp3");
        }
        else {
                $("#hit").prop("checked", true);
                $("#hitSound").attr("src", "music/hit.mp3");
        }// end if-else
        if(localStorage.isCash==="false") {
                $("#money").prop("checked", false);
                $("#moneySound").attr("src", "music/silent.mp3");
        }
        else {
                $("#money").prop("checked", true);
                $("#moneySound").attr("src", "music/money.mp3");
        }// end if-else                                 
        if(localStorage.isSound==="true")
            $("#turnSound").text("allumer");
        else 
            $("#turnSound").text("eteindre");        
}// end readSettings
readSettings();//read when the game is started
/**
 * this function saves settings
 */
function saveSettings() {
    localStorage.isClick = $("#click").prop("checked");
    localStorage.isPunch = $("#punch").prop("checked");
    localStorage.isHit = $("#hit").prop("checked");
    localStorage.isCash = $("#money").prop("checked");
    localStorage.isWin = $("#win").prop("checked");
    localStorage.isLose = $("#lose").prop("checked");
    readSettings();
}// end saveSettings
/**
 * this function stores the current process of the game locally
 */
function saveGame() {
        localStorage.isMediumUnlocked = stageControl.getIsMediumUnlocked();
        localStorage.isHardUnlocked = stageControl.getIsHardUnlocked();
        localStorage.isCrazyUnlocked = stageControl.getIsCrazyUnlocked();        
        localStorage.bossAppear = stageControl.getBossAppear();        
        localStorage.money = character.getMoney();
        localStorage.gender = character.getGender();
        localStorage.lifePoints = character.getLifePoints();
        localStorage.weaponUpgrade = character.getWeaponUpgrade();
        localStorage.shieldUpgrade = character.getShieldUpgrade();
        localStorage.brainNumber = character.getBrainNumber();
        localStorage.clockNumber = character.getClockNumber();
        localStorage.weaponPrice = weapon.getWeaponPrice();
        localStorage.shieldPrice = shield.getShieldPrice();
}// end saveGame
/**
 * this function loads the saved process of the game
 */
function readGame() {
        if(localStorage.isMediumUnlocked==="true")
                stageControl.setIsMediumUnlocked(true);
        else
                stageControl.setIsMediumUnlocked(false);
        if(localStorage.isHardUnlocked==="true")
                stageControl.setIsHardUnlocked(true);
        else
                stageControl.setIsHardUnlocked(false);
        if(localStorage.isCrazyUnlocked==="true")
                stageControl.setIsCrazyUnlocked(true);
        else
                stageControl.setIsCrazyUnlocked(false);                
        stageControl.setBossAppear(localStorage.bossAppear);        
        character.setMoney(localStorage.money);
        character.setGender(localStorage.gender);
        character.setLifePoints(localStorage.lifePoints);
        //character.clearCharacterLPCanvas();        
        character.setWeaponUpgrade(localStorage.weaponUpgrade);
        character.setShieldUpgrade(localStorage.shieldUpgrade);
        character.setBrainNumber(localStorage.brainNumber);
        character.setClockNumber(localStorage.clockNumber);
        weapon.setWeaponPrice(localStorage.weaponPrice);
        shield.setShieldPrice(localStorage.shieldPrice);        
        
        //redirects the user to the stage selection screen
        $(".menu").css("visibility", "hidden");
        $(".stageSelection").css("visibility", "visible");
        setFemaleImage();
        $("#buyFist").text("Surclasse: " + weapon.getWeaponPrice() + "$");
        $("#buyShield").text("Surclasse: " + shield.getShieldPrice() + "$");
}// end readGame
/**
 * removes the contents of the canvas when they are not supposed to show up
 */
function removeContent() {
        //character.clearCharacterLPCanvas();
        monster.clearMonsterLPCanvas();
}// end removeContent
/**
 * moves the girl character to the left of the screen 
 */
function setFemaleImage() {
        $("#girlSprite").css("left", 50);
}// end setFemaleImage
/**
 * sets up the scene for a battle
 */
function startBattle() {
		start = true;
        // setting usable items
        clock.showClockNumber();
        brain.showBrainNumber();
        // setting HTML elements around the centre of the screen
        // $("#remainderInput").css("visibility", "hidden"); 
        // $("#remainder").css("visibility", "hidden");
        character.setImage();        
        monster.setImageMonster();
	    questionGenerator.createQuestion(typeControl.getOperation(), typeControl.getIsEasy()||typeControl.getIsMedium());
	    $("#userAnswer, #remainder").val(" ");
	    $("#hint").css("visibility", "hidden");
	    $("#question").text(questionGenerator.getQuestion());  
        if(typeControl.getIsCrazy()||typeControl.getIsHard()) {
        	var temp = $("#question").text();
        	if(temp.indexOf('/') != -1) {
        		$("#remainderInput").css("visibility", "visible");  
        		$("#remainder").css("visibility", "visible");  
        	}
        }   	    
	    // starting timer                
        $("#timer").text("Temps restant " + timer.getTotalTime()); // reset timing
        timer.setCurrentTime(timer.getTotalTime());
        timer.countDown();
}// end startBattle
/**
 * checks whether if the answer from the user is right
 * @return whether if the answer is correct
 */
function checkAnswer() {
        var temp = $("#userAnswer").val();
        var temp2 = $("#remainder").val();
        if(questionGenerator.getAnswer()==0) {
        	if(temp === " ")
        		return false; // the user has to enter 0 for a zero answer
        }
        if(typeControl.getIsHard()||typeControl.getIsCrazy()) {
                if(typeControl.getOperation()==4)// check for remainders in the more difficult divisions
                        return parseInt(temp) == questionGenerator.getAnswer() && parseInt(temp2) == questionGenerator.getRemainder();
        }
        return temp == questionGenerator.getAnswer();
}// end checkAnswer

var timeInterval = -1;// an interval object that can be cleared by the timer object
/**
 * The timer object
 */
function Timer() {
        currentTime=-1;
        totalTime=-1;
        this.countDown = function() {
            timeInterval=setInterval(function(){
                    if(this.currentTime!==0) {
                        currentTime--;
                        $("#timer").text("Temps restant " + currentTime);
                    }
                    else {// currentTime == 0
                            clearInterval(timeInterval);
                            var text = "Le temps est ecoule! The monster t'attaque!";
                            document.getElementById("hitSound").load();
                            document.getElementById("hitSound").play();
                            if(shield.isEvaded() == false)
                                    character.loseLife();
                            else {
                            		text = text + "Mais tu esquive le attaque!";
                                    dalert.alert(text, " ");
                            }
                            //startBattle();
                        if(character.getLifePoints()<=0) {
                        	start = false;
                            dalert.alert("Oh non! Tu est vaincu par le monstre!", " ");
                            character.death();
                            removeContent(); 
                    }
                    }// end if-else                    
            },1000);
    };// end countDown
    this.getTotalTime = function() {
            return totalTime;
    };// end accessor
    this.setTotalTime = function(time) {
            totalTime = time;
    };// end mutator
    this.getCurrentTime = function() {
            return currentTime;
    };// end accessor
    this.setCurrentTime = function(t) {
            currentTime = t;
    };// end mutator
}// end constructor
// initialize timer
var timer = new Timer();


