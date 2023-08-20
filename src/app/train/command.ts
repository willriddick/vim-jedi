export class Command {
    constructor(
        public question: string,
        public answer: string,
    ){} 

    public getQuestion = (): string => {
        return this.question;
    }
    
    public getAnswer = (): string => {
        return this.answer;
    }
}