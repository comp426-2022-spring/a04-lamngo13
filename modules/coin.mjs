/** Coin flip functions 
 * This module will emulate a coin flip given various conditions as parameters as defined below
 */

//export all functions
//export {coinFlip, coinFlips, countFlips, flipACoin};

/** Simple coin flip
 * 
 * Write a function that accepts no parameters but returns either heads or tails at random.
 * 
 * @param {*}
 * @returns {string} 
 * 
 * example: coinFlip()
 * returns: heads
 * 
 */

 function coinFlip() {
    let num = Math.floor(Math.random() * 10);
    if (num % 2 == 0) {
      return "heads";
    } else {
      return "tails";
    }
    }
    
    
    
    
    /** Multiple coin flips
     * 
     * Write a function that accepts one parameter (number of flips) and returns an array of 
     * resulting "heads" or "tails".
     * 
     * @param {number} flips 
     * @returns {string[]} results
     * 
     * example: coinFlips(10)
     * returns:
     *  [
          'heads', 'heads',
          'heads', 'tails',
          'heads', 'tails',
          'tails', 'heads',
          'tails', 'heads'
        ]
     */
    
    function coinFlips(flips) {
      let theResult = ""
      let bruh = [];
      for (let i = 0; i < flips; i++) {
        //bruh[i] = coinFlip();
        theResult = coinFlip()
        bruh.push(theResult)
      }
    return bruh;
    }
    
    /** Count multiple flips
     * 
     * Write a function that accepts an array consisting of "heads" or "tails" 
     * (e.g. the results of your `coinFlips()` function) and counts each, returning 
     * an object containing the number of each.
     * 
     * example: conutFlips(['heads', 'heads','heads', 'tails','heads', 'tails','tails', 'heads','tails', 'heads'])
     * { tails: 5, heads: 5 }
     * 
     * @param {string[]} array 
     * @returns {{ heads: number, tails: number }}
     */
    
    function countFlips(array) {
      let nHeads = 0;
      let nTails = 0;
      if (array.length == 0) {
        return "the array is empty.";
      }
    
      var returnable = {
        heads: 0,
        tails: 0
      }
      //end edge case 
    
      array.forEach(flip => {
        if (flip == "heads") {
          returnable.heads++
        } else {
          returnable.tails++
        }
      })
      return returnable
    
    
      //if (nHeads == 0) {
      //  return "{ tails: " + nTails.toString() + " }";
      //}
      //else if (nTails == 0){
      //  return "{ heads: " + nHeads.toString() + " }";
      //}
      //else {
      //  //return "{ heads: " + nHeads + " tails: " + nTails + " }"
      //  return "{heads: " + nHeads + " tails: " + nTails + "}"
      //  
      //}
    
      //return array;
    }
    
    /** Flip a coin!
     * 
     * Write a function that accepts one input parameter: a string either "heads" or "tails", flips a coin, and then records "win" or "lose". 
     * 
     * @param {string} call 
     * @returns {object} with keys that are the input param (heads or tails), a flip (heads or tails), and the result (win or lose). See below example.
     * 
     * example: flipACoin('tails')
     * returns: { call: 'tails', flip: 'heads', result: 'lose' }
     */
    
    function flipACoin(call) {
        let flip = coinFlip()
        const obj = { call: call, flip: flip, result: 'lose' }
        if (call == flip) {
            obj.result = 'win';
        }
        return obj;
      //let result = coinFlip();
      //let winner = ""
      //if (call == result) {
      //  winner = "win"
      //} else {
      //  winner = "lose"
     // }
    //  return "{call:" + call +",flip:" + result + ",result:" + winner +"}"
    }
    
    /** Export 
     * export {coinFlip, coinFlips, countFlips, flipACoin};
     * Export all of your named functions
    */
    export {coinFlip, coinFlips, countFlips, flipACoin};