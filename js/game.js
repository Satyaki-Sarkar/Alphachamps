class Game{
    constructor(){

    }

    async start(){
        // Reading words from database
        var wordInstance = database.ref("words");
        var words = await wordInstance.once("value");
        allWords = words.val();
        // console.log(allWords);

       
        wordObj = new Word();
        // Choosing a word from the words read from database
        wordObj.chooseWord();
        gameState = 1;
        
    }
}