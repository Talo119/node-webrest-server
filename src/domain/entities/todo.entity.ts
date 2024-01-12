export class TodoEntity {
    constructor(
        public id: number,
        public text: string,
        public completed?: Date | null
    ) {}

    get isCompleted(){
        return !!this.completed;
    }

    public static fromObject( object: {[key: string]: any} ){
        const { id, text, completed } = object;
        if ( !id )throw 'Id is required';
        if ( !text )throw 'Text is required';

        let newCompleted;
        if (completed) {
            newCompleted = new Date(completed);
            if ( isNaN( newCompleted.getTime() ) ) {
                throw 'Completed is not a valid date.'
            }
        }

        return new TodoEntity(id, text, completed);
    }
}