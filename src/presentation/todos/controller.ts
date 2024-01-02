import { Request, Response } from "express";
import { json } from "stream/consumers";

const todos = [
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Buy bread', completedAt: new Date() },
    { id: 3, text: 'Buy butter', completedAt: new Date() },
];

export class TodosController {
    constructor() {}

    public getTodos = (req:Request, res: Response) =>{
        return res.json(todos);
    };

    /**
     * getTodoById 
     */
    public getTodoById = (req:Request, res:Response) => {
        
        if (isNaN(+req.params.id)) return res.status(400).json({error: 'ID argument is not a number'});

        const todo = todos.find(td => {
            return td.id ===  +req.params.id;
        });


        if (!todo) return res.status(404).json(`TODO with id ${req.params.id} not found. `);

        return res.json(todo);
    };

    /**
     * createTodo
     */
    public createTodo = ( req: Request, res: Response ) => {
        const {text } = req.body;

        if (!text) return res.status(400).json({ error: 'Text property is required.' });
        const newTodo = {
            id: todos.length +1,
            text,
            completedAt: new Date(),
        }
        todos.push(newTodo);

        res.status(200).json(newTodo);
    };

    /**
     * updateTodo
     */
    public updateTodo = (req: Request, res: Response) => {
        
        const id = +req.params.id;

        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});

        const todo = todos.find( todo => todo.id === id );

        if(!todo) return res.status(404).json(`TODO with id ${id} not found. `);

        const { text ,completedAt } = req.body;

        todo.text = text || todo.text;

        (completedAt === 'null')
        ? todo.completedAt = todo.completedAt
        : todo.completedAt = completedAt;

        todo.completedAt = new Date();

        res.json(todo);

    };

    /**
     * deleteTodo
     */
    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        const todo = todos.find( todo => todo.id === id );

        if(!todo) return res.status(404).json(`TODO with id ${id} not found. `);
        todos.splice( todos.indexOf(todo), 1 );

        res.json(todo);
    }

}