export class UpdateTodoDto {
    private constructor(
        public readonly id:number,
        public readonly text?:string,
        public readonly completed?:Date,
    ) {}

    get values() {
        const returnObj: {[key: string]: any} = {};
        if ( this.text )  returnObj.text = this.text;
        if ( this.completed )  returnObj.completed = this.completed;
        console.log({returnObj:returnObj});
        return returnObj;
    }

    static create(props: {[key:string]: any}):[string?, UpdateTodoDto?]{
        
        const { id, text, completed } = props;

        if( !id || isNaN( Number(id) ) ) {
            return ['Id must be a valid number']
        }

        let newCompleted = completed;
        if (completed) {
            newCompleted = new Date( completed );
            if (newCompleted.toString()  === 'Invalid Date') {
                return ['Completed must be a valid date']
            }
        }

        return[undefined, new UpdateTodoDto(id, text, newCompleted)];
    }
}