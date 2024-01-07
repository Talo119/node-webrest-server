"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodoDto = void 0;
class UpdateTodoDto {
    constructor(id, text, completed) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }
    get values() {
        const returnObj = {};
        if (this.text)
            returnObj.text = this.text;
        if (this.completed)
            returnObj.completed = this.completed;
        console.log({ returnObj: returnObj });
        return returnObj;
    }
    static create(props) {
        const { id, text, completed } = props;
        if (!id || isNaN(Number(id))) {
            return ['Id must be a valid number'];
        }
        let newCompleted = completed;
        if (completed) {
            newCompleted = new Date(completed);
            if (newCompleted.toString() === 'Invalid Date') {
                return ['Completed must be a valid date'];
            }
        }
        return [undefined, new UpdateTodoDto(id, text, newCompleted)];
    }
}
exports.UpdateTodoDto = UpdateTodoDto;
