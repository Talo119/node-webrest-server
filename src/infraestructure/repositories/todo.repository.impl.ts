import { CreateTodoDto, TodoDatasource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";


export class TodoRepositoryImpl implements TodoRepository {
    constructor(
        private readonly datasource: TodoDatasource,
    ) {}

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create(createTodoDto);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll();
    }
    findByID(id: number): Promise<TodoEntity> {
        return this.datasource.findByID(id);
    }
    updateByID(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.updateByID(updateTodoDto);
    }
    deleteByID(id: number): Promise<TodoEntity> {
        return this.datasource.deleteByID(id);
    }
}