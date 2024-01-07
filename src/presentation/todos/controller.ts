import { Request, Response } from "express";
import { json } from "stream/consumers";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";



export class TodosController {
    constructor() {}

    public getTodos = async(req:Request, res: Response) =>{
        const todos = await prisma.todo.findMany({
            where: {completed: null},
        })
        return res.json(todos);
    };

    /**
     * getTodoById 
     */
    public getTodoById = async(req:Request, res:Response) => {
        
        if (isNaN(+req.params.id)) return res.status(400).json({error: 'ID argument is not a number'});

        const todo = await prisma.todo.findUnique({
            where:{
                id:+req.params.id,
            }
        })


        if (!todo) return res.status(404).json(`TODO with id ${req.params.id} not found. `);

        return res.json(todo);
    };

    /**
     * createTodo
     */
    public createTodo = async( req: Request, res: Response ) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if(error) return res.status(400).json({error});
        
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });
        
        res.status(200).json(todo);
    };

    /**
     * updateTodo
     */
    public updateTodo = async(req: Request, res: Response) => {
        
        const id = +req.params.id;
        
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});

        if(error) return res.status(400).json({error});

        const todo = await prisma.todo.findUnique({
            where:{
                id:id,
            }
        })

        if(!todo) return res.status(404).json(`TODO with id ${id} not found. `);

        console.log({updatedTod:updateTodoDto!.values})
        const updateTodo = await prisma.todo.update({
            where: {id:id},
            data: updateTodoDto!.values
        })


        res.json(updateTodo);

    };

    /**
     * deleteTodo
     */
    public deleteTodo = async(req: Request, res: Response) => {
        const id = +req.params.id;

        const todo = await prisma.todo.findUnique({
            where:{
                id:id,
            }
        })

        if(!todo) return res.status(404).json(`TODO with id ${id} not found. `);
        
        const deleteTodo = await prisma.todo.delete({
            where: { id: id },
        });

        (deleteTodo)
        ? res.json(this.deleteTodo)
        : res.status(400).json({ error: `Todo with id ${id} not found` });
    }

}