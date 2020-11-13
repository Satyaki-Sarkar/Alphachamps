class Word{
    constructor(){
        this.word="";
        this.letters=[];
    }
    static readWords(){
        
    }

    chooseWord(){
        var randomNumber=Math.round(random(0,allWords.length-1));
        this.word=allWords[randomNumber];
    }

    display(){
        var myWordArray = this.word.split("");
        var cam = camera.position.x;
        for(var l in myWordArray) {
            var i = allLettersArray.indexOf(myWordArray[l].toLowerCase());
            image(loadedAlphabetImages[i],cam,20,60,25);
            cam+=40;
        }
    }

    generateLetters() {
        if(this.word) {
            this.letters = this.word.split("");
            var r = Math.round(random(0, 25));
            letterObj = new Letter();
            if(letterObj.canDisplay(r)) {
                // display the letter

                
                // var sprite = createSprite()
                // sprite.velocityX  = -2;
                // sprite.addAnimation(allLettersArray[r], loadedAlphabetImages[r]);
                // lettersGroup.add(sprite);
            }
        }
    }
}