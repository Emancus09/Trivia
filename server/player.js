export class Player {
    constructor(name, id) {
        this.score = 0;
        this.name = name;
        this.id = id;

        // question id : answer
        this.answersSubmitted = [];
    }

    updateScore(amount)
    {
        this.score += amount;
    }

    recordAnswer(question, answer)
    {
        if(this.answersSubmitted.filter(tuple => tuple[0] == question).length != 0)
        {
            console.log(`${this.name} attempted to resubmit answer to question ${question}`)
            return
        }
        this.answersSubmitted.push([question, answer]);
        console.log(`answers submitted by player ${this.name} : ${this.answersSubmitted}`)
    }
}