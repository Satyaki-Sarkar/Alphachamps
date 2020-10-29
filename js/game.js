class Game{
    constructor(){

    }

    async start(){
        var wordInstance = database.ref("words");
        var words = await wordInstance.once("value");
        allWords = words.val();
        console.log(allWords);
        wordObj = new Word();
        wordObj.chooseWord();
    }
}