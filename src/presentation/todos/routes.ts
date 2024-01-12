import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDataSourceImpl } from "../../infraestructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infraestructure/repositories/todo.repository.impl";


export class TodoRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new TodoDataSourceImpl();
        const todoRepository = new TodoRepositoryImpl(datasource);

        const todoController = new TodosController(todoRepository);
        router.get('/', todoController.getTodos );
        router.post('/', todoController.createTodo);
        router.get('/:id', todoController.getTodoById );
        router.put('/:id', todoController.updateTodo );
        router.delete('/:id', todoController.deleteTodo );

        return router;

    };
}