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
        console.log(this.word);
    }

    display(){
        var myWordArray = this.word.split("");
        console.log(myWordArray);
        var cam = camera.position.x;
        for(var l in myWordArray) {
            var i = allLettersArray.indexOf(myWordArray[i]);
            console.log(i);
            image(loadedAlphabetImages[i],cam,20,10,10);
            cam+=20;
        }
    }
}