"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const dtos_1 = require("../../domain/dtos");
const domain_1 = require("../../domain");
class TodosController {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
        this.getTodos = (req, res) => {
            new domain_1.GetTodos(this.todoRepository)
                .execute()
                .then(todos => res.json(todos))
                .catch(error => res.status(400).json({ error }));
        };
        /**
         * getTodoById
         */
        this.getTodoById = (req, res) => {
            if (isNaN(+req.params.id))
                return res.status(400).json({ error: 'ID argument is not a number' });
            new domain_1.GetTodo(this.todoRepository)
                .execute(+req.params.id)
                .then(todo => res.json(todo))
                .catch(error => res.status(400).json({ error }));
        };
        /**
         * createTodo
         */
        this.createTodo = (req, res) => {
            const [error, createTodoDto] = dtos_1.CreateTodoDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new domain_1.CreateTodo(this.todoRepository)
                .execute(createTodoDto)
                .then(todo => res.json(todo))
                .catch(error => res.status(400).json({ error }));
        };
        /**
         * updateTodo
         */
        this.updateTodo = (req, res) => {
            const id = +req.params.id;
            const [error, updateTodoDto] = dtos_1.UpdateTodoDto.create(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            new domain_1.UpdateTodo(this.todoRepository)
                .execute(updateTodoDto)
                .then(todo => res.json(todo))
                .catch(error => res.status(400).json({ error }));
        };
        /**
         * deleteTodo
         */
        this.deleteTodo = (req, res) => {
            const id = +req.params.id;
            new domain_1.DeleteTodo(this.todoRepository)
                .execute(id)
                .then(todo => res.json(todo))
                .catch(error => res.status(400).json({ error }));
        };
    }
}
exports.TodosController = TodosController;
