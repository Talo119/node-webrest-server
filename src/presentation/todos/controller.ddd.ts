import { Request, Response } from "express";
import { json } from "stream/consumers";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";



export class TodosController {
    constructor(
        private readonly todoRepository: TodoRepository,
    ) {}

    public getTodos = async(req:Request, res: Response) =>{
        const todos = await this.todoRepository.getAll();
        return res.json(todos);
    };

    /**
     * getTodoById 
     */
    public getTodoById = async(req:Request, res:Response) => {
        
        if (isNaN(+req.params.id)) return res.status(400).json({error: 'ID argument is not a number'});
        
        try {
            const todo = await this.todoRepository.findByID(+req.params.id);
            res.json(todo);
            
        } catch (error) {
            res.status(400).json(error);
        }
    };

    /**
     * createTodo
     */
    public createTodo = async( req: Request, res: Response ) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if(error) return res.status(400).json({error});
        
        try {
            const todo = await this.todoRepository.create(createTodoDto!);
            
            res.status(200).json(todo);
            
        } catch (error) {
            res.status(400).json(error);
        }
    };

    /**
     * updateTodo
     */
    public updateTodo = async(req: Request, res: Response) => {
        
        const id = +req.params.id;
        
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});

        if(error) return res.status(400).json({error});

        try {
            const updatedTodo = await this.todoRepository.updateByID(updateTodoDto!);
            res.json(updatedTodo);
        } catch (error) {
            res.status(400).json(error);
        }

    };

    /**
     * deleteTodo
     */
    public deleteTodo = async(req: Request, res: Response) => {
        const id = +req.params.id;

        try {
            const deletedTodo = await this.todoRepository.deleteByID(id);
            res.json(deletedTodo);
        } catch (error) {
            res.status(400).json(error);
        }
    }

}