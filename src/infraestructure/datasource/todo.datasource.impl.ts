import { prisma } from "../../data/postgres";
import { CreateTodoDto, CustomError, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";

export class TodoDataSourceImpl implements TodoDatasource{
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        return TodoEntity.fromObject(todo);
    }
    
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany({
            where: {completed: null},
        });

        return todos.map( todo =>  TodoEntity.fromObject(todo));
    }
    
    async findByID(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where:{ id }
        });

        if(!todo) throw new CustomError( `Todo with id ${ id } not found`,404);

        return TodoEntity.fromObject(todo);
    }
    
    async updateByID(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        await this.findByID( updateTodoDto.id );
        const updateTodo = await prisma.todo.update({
            where: {id: updateTodoDto.id},
            data: updateTodoDto!.values
        });
        
        return TodoEntity.fromObject(updateTodo);
    }
    
    async deleteByID(id: number): Promise<TodoEntity> {
        await this.findByID( id );

        const deleteTodo = await prisma.todo.delete({
            where: { id: id },
        });

        return TodoEntity.fromObject(deleteTodo);
    }
    

}