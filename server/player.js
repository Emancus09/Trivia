export class Player {
    constructor(name, id) {
        this.score = 0;
        this.name = name;
        this.id = id;

        // question id : answer
        this.answersSubmitted = new Map();
    }

    updateScore(amount)
    {
        this.score += amount;
    }

    recordAnswer(question, answer)
    {
        this.answersSubmitted.set(question, answer);
    }
}