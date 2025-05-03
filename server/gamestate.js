import { Player } from './player.js';

export class GameState {
    constructor() {
        this.players = [];
        this.questions = ["If you were a soup, what flavored soup would you be?", "100 Ghadas vs. 1 Gorilla: who wins and why?"]
        // Current question, if -1 then pregame
        // players who submit answers pregame can get some easter egg at the end of the game?
        this.currentQuestion = -1;
        this.gameStateChangeCallbacks = [];
    }

    // Janitor stuff
    addPlayer(name, id) {
        if (this.players.filter(p => p.name == name || p.id == id) == 0)
        {
            this.players.push(new Player(name, id))
        }
        else
        {
            console.warn(`${name} already exists, or the socket already has a session open`)
        }
        this.fireGameStateChange()
    }

    removePlayer(id) {
        this.players = this.players.filter(p => p.id != id)
        this.fireGameStateChange()
    }

    // Host specific
    
    // Add or remove score points from a player
    updateScore(id, amount)
    {
        let player = this.players.find(p => p.id == id);
        if(player == undefined)
        {
            console.warn('${player} not found');
            return;
        }
        player.updateScore(amount);
        this.fireGameStateChange();
    }

    nextQuestion()
    {
        this.currentQuestion += 1;
        this.fireGameStateChange();
    }

    // Player specific

    submitAnswer(id, answer)
    {
        let player = this.players.find(p => p.id == id);
        if(player == undefined)
        {
            console.warn('${player} not found');
            return;
        }
        player.logAnswer(this.currentQuestion, answer);
    }

    // Callbacks

    onGameStateChange(f)
    {
        this.gameStateChangeCallbacks.push(f);
    }

    fireGameStateChange()
    {
        this.gameStateChangeCallbacks.forEach(f => f());
    }

    // Rendering
    getGameState()
    {
        return [ this.players, this.currentQuestion, this.questions ];
    }

}