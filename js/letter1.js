class Letter {
    constructor() {
        // this.letters = [];
    }

    /* If the letter is not present in the chosen word, it is allowed.
        Otherwise, if it is the first letter in the word, then it is allowed.
        Else , not allowed */
    
    canDisplay(r) {
        var letterToDisplay = allLettersArray[r];
        console.log(letterToDisplay);

        if(wordObj.letters.indexOf(letterToDisplay) === -1) {
            return true;
        } else if(wordObj.letters.indexOf(letterToDisplay) === 0){
            return true;
        } else {
            return false;
        }
    }

    checkChosenLetter() {
        for(var i = 0; i < lettersGroup.length; i++) {
            var sprite = lettersGroup[i];
            if(pikachu.isTouching(sprite)) {
                var clickedLetterLabel = sprite.getAnimationLabel();
                if(clickedLetterLabel === wordObj.letters[0]) {
                    // mark that the letter is chosen
                    // Remove it from the letters array
                    wordObj.letters.shift();
                }
            }
        }
        
        
        
    }

    
}
// sprite.addAnimation(allLettersArray[r], loadedAlphabetImages[r]);
// sprite.getAnimationLabel();
//  clickedLetterLabel === wordObj.letters[0]