
/**
 * JavaScript for Math Monsters
 * This file is for generating the math questions
 * @author: Xu, John and Jordan Larock
 * @since: Wednesday, October 30, 2013
 */


/**
 * The question generator object
 */
function QuestionGenerator() {
        var answer=-1; // answer of the question generated
        var question=""; // the question generated
        var numbersUsed = new Array(); // an array of numbers that are to be used in generating the question
        var remainder = -1; // in the harder case of divisions, this variable is used to record the calculated remainder 
        
        /**
         * allows access to the question generated
         * @return the current question stored in the generator
         */
        this.getQuestion = function() {
                return question;
        };// end accessor
        /**
         * allows access to the answer corresponding to the question
         * @return the corresponding answer to the curent question
         */
        this.getAnswer = function() {
                return answer;
        };// end accessor        
        /**
         * allows access to the remainder corresponding to the division
         * @return the corresponding remainder to the curent question
         */
        this.getRemainder = function() {
                return remainder;
        };// end accessor                
        /**
         * creates a question according to the specifications in the parameters
         * @param {number} type an integer, ranging from 1 to 5, that indicates the type of the question: 
         * "1" creates addition; "2" creates subtraction; "3" creates multiplicaction; 
         * "4" creates division; case "5" is a mix of the above; when the parameter type matches none 
         * of the above, a default "1+1" question is created
         * @param {boolean} isEasy determines whether or not the question should be easy relative
         * to "hard," which is related to the stage level the user is at
         */
        this.createQuestion = function(type, isEasy) {
                switch(type) {
                        case 1: // case of "+"
                createAddition(isEasy);
                                break;
                        case 2: // case of "-"
                        createSubtraction(isEasy);
                                break;
                        case 3: // case of "*"
                    createMultiplication(isEasy);
                                break;
                        case 4: // case of "/"
                    createDivision(isEasy);
                                break;        
                        case 5: // case of a mix
                            numbersUsed[0]=Math.floor(Math.random()*4);
                            if(numbersUsed[0]==0)
                                createAddition(isEasy);
                            else if(numbersUsed[0]==1)
                                    createSubtraction(isEasy);
                            else if(numbersUsed[0]==2)
                                    createMultiplication(isEasy);
                            else // ==3
                                    createDivision(isEasy);// an equal chance for any type
                            break;        
                        default:
                                question = "1 + 1 = ?";
                                answer = 2;// a default 1 + 1 question
                }// end switch case
        };// end createQuestion
        
        /**
        * generates a random 1-digit number including zero
        * @return the number generated
        */
        function makeOnes() {
            return Math.floor(Math.random()*10);
        }// end makeOnes
        /**
        * generates a random 2-digit number or zero
        * @return the number generated
        */
        function makeTens() {
            return Math.floor(Math.random()*100);
        }// end makeTens
        /**
        * generates a random 3-digit number or zero
        * @return the number generated
        */
        function makeHundreds() {
            return Math.floor(Math.random()*1000);
        }// end makeHundreds
        /**
        * generates a random 4-digit number or zero
        * @return the number generated
        */
        function makeThousands() {
            return Math.floor(Math.random()*10000);
        }// end makeThousands
        
        /**
         * creates a Math question with addition operation(s)
     * @param {boolean} isEasy the question should be easy or not
         */
        function createAddition(isEasy) {
                switch(isEasy) {
                        case true:
                                if(Math.round(Math.random())===0) {
                                        numbersUsed[0] = makeOnes();// a combination of ones and tens
                                        numbersUsed[1] = makeTens();
                                }
                                else {
                                        numbersUsed[0] = makeTens();// both numbers are tens
                                        numbersUsed[1] = makeTens()+makeOnes();                                                        
                                }// end if-else
                                question = numbersUsed[1] + " + " + numbersUsed[0] + " = ?";
                                answer = numbersUsed[0] + numbersUsed[1];// add the numbers together
                                break;
                        case false:
                            numbersUsed[0] = Math.floor(Math.random()*4);
                                if(numbersUsed[0]===0||numbersUsed[0]===1) {
                                        numbersUsed[0] = makeTens()+makeOnes();// a combination of hundreds and tens
                                        numbersUsed[1] = makeHundreds()+makeTens()+makeOnes();
                                        numbersUsed[2] = 0;
                                        question = numbersUsed[1] + " + " + numbersUsed[0] + " = ?";
                                }
                                else if(numbersUsed[0]===2) {
                                        numbersUsed[0] = makeHundreds()+makeTens()+makeOnes();// a combination of hundreds and thousands (digits)
                                        numbersUsed[1] = makeThousands()+makeHundreds()+makeTens()+makeOnes();
                                        numbersUsed[2] = 0;
                                        question = numbersUsed[1] + " + " + numbersUsed[0] + " = ?";                                                        
                                }
                                else {
                                        numbersUsed[0] = makeTens()+makeOnes();// a combination of 3 tens
                                        numbersUsed[1] = makeTens();
                                        numbersUsed[2] = makeTens()+makeOnes();
                                        question = numbersUsed[2] + " + " + numbersUsed[1] + " + " + numbersUsed[0] + " = ?";        
                                }// end if-else
                                answer = numbersUsed[0] + numbersUsed[1] + numbersUsed[2];                                            
                                break;
                        default:
                            question = "1 + 1 = ?";
                            answer = 2;// a default 1 + 1 question                                        
                }// end switch case
        }// end createAddition
        
        /**
         * creates a Math question with minus operation only
     * @param {boolean} isEasy the question should be easy or not
         */
        function createSubtraction(isEasy) {
                switch(isEasy) {
                        case true:
                                if(Math.round(Math.random())===0) {
                                        numbersUsed[0] = makeTens()+makeOnes();// a tens subtracted by ones
                                        numbersUsed[1] = makeTens()+makeOnes(); 
                                }
                                else {
                                        numbersUsed[0] = (makeTens()+makeOnes())*10+makeOnes();// an expanded version of the above (with an extra 0)
                                        numbersUsed[1] = makeTens()*10+makeOnes()*10;                                                        
                                }// end if-else                                                
                                break;
                        case false:
                                if(Math.round(Math.random())===0) {
                                        numbersUsed[0] = makeThousands()+makeHundreds()+makeTens();// more digits
                                        numbersUsed[1] = makeThousands()*(Math.round(Math.random()))+makeHundreds()+makeTens();// either in the thousands or in the hundreds
                                }
                                else {
                                        numbersUsed[0] = (makeThousands()+makeHundreds()+makeTens())*10;// more digits
                                        numbersUsed[1] = (makeThousands()*(Math.round(Math.random()))+makeHundreds()+makeTens())*10;// either in the thousands or in the hundreds                                
                                }// end if-else                        
                                break;
                        default:
                            question = "1 - 1 = ?";
                            answer = 0;// a default 1 - 1 question                                        
                }// end switch case        
                answer = numbersUsed[0] - numbersUsed[1];// subtract the numbers                                 
                if(answer<0) {
                        answer*=-1; //invert the two numbers
                        numbersUsed[2]=numbersUsed[0];
                        numbersUsed[0]=numbersUsed[1];
                        numbersUsed[1]=numbersUsed[2];
                }// end if
                question = numbersUsed[0] + " - " + numbersUsed[1] + " = ?";        
        }// end createSubtraction

        /**
         * creates a Math question with multimply operations only
     * @param {boolean} isEasy the question should be easy or not
         */        
        function createMultiplication(isEasy) {
                switch(isEasy) {
                        case true:
                                if(Math.round(Math.random())===0) {
                                        numbersUsed[0] = makeOnes();// simple multiplication facts
                                        numbersUsed[1] = makeOnes();
                                }
                                else {
                                        numbersUsed[0] = makeOnes()*10;// an expanded version of the above (with 2 extra zeros)
                                        numbersUsed[1] = makeOnes()*10;                                                        
                                }// end if-else        
                                answer = numbersUsed[0] * numbersUsed[1];// subtract the numbers         
                        question = numbersUsed[0] + " * " + numbersUsed[1] + " = ?";                                                                
                                break;
                        case false:
                                if(Math.round(Math.random())===0) {
                                        numbersUsed[0] = makeTens()+makeOnes();// 2 digits
                                        numbersUsed[1] = makeTens()+makeOnes();
                                        numbersUsed[2] = 1;
                            question = numbersUsed[0] + " * " + numbersUsed[1] + " = ?";                                        
                                }
                                else {
                                        numbersUsed[0] = makeOnes();// 3 numbers multiplied
                                        numbersUsed[1] = makeOnes();
                                        numbersUsed[2] = makeOnes();        
                                    question = numbersUsed[0] + " * " + numbersUsed[1] + " * " + numbersUsed[2] + " = ?";                                                
                                }// end if-else        
                                answer = numbersUsed[0] * numbersUsed[1] * numbersUsed[2];// subtract the numbers                                 
                                break;
                        default:
                            question = "1 * 1 = ?";
                            answer = 1;// a default 1 * 1 question                                        
                }// end switch case                                
        }// end createMultiplication

        /**
         * creates a Math question with divide operation only
     * @param {boolean} isEasy the question should be easy or not
         */        
        function createDivision(isEasy) {
                switch(isEasy) {
                        case true:
                            do {
                                numbersUsed[0]=makeOnes();
                            } while(numbersUsed[0]===0);// checks for zero divisors
                            numbersUsed[1]=numbersUsed[0]*makeOnes();// to ensure that it will be divisible
                            if(Math.floor(Math.random()*4)<1) {
                                    numbersUsed[2]=Math.floor(Math.random()*3)+1;// {1, 2, 3}
                                    numbersUsed[1]=numbersUsed[1]*Math.pow(10, numbersUsed[2]);
                                    numbersUsed[0]=Math.pow(10, numbersUsed[2]);// create some large numbers that end with zeros
                            }// end if
                            question = numbersUsed[1] + " / " + numbersUsed[0] + " = ?"; // always tens divided by ones
                                break;
                        case false:
                            do {
                                numbersUsed[0]=makeTens()+makeOnes();
                            } while(numbersUsed[0]===0);// checks for zero divisors
                            numbersUsed[1]=makeHundreds()+makeTens()+makeOnes();// unlike the easy ones, this one is completely random
                            question = numbersUsed[1] + " / " + numbersUsed[0] + " = ? , reste = ?"; // asks for the remainder        
                                break;
                        default:
                            question = "1 / 1 = ?";
                            numbersUsed[1] = 1;
                            numbersUsed[0] = 1;// a default 1 / 1 question                                        
                }// end switch case                        
            answer=Math.floor(numbersUsed[1]/numbersUsed[0]);
            remainder=numbersUsed[1]%numbersUsed[0];                                
        }// end createDivision
        
}// end constructor
// initialize question generator
var questionGenerator = new QuestionGenerator();

