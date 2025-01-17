import { Auth } from '../../domain/entities/Auth';
import { AuthRepositoryBase } from '../../domain/repositories/AuthRepositoryBase';

export interface ISigninData {
signIn(email: string, password: string): Promise<Auth>;
}

export class AuthRepository implements AuthRepositoryBase {
private authData: ISigninData;

    constructor({ authApi }: { authApi: ISigninData }) {
        this.authData = authApi;
    }

    public async signin(email: string, password: string): Promise<Auth> {
        let response = await this.authData.signIn(email, password);
        return response;
    }

}

import { Todo } from '../../domain/entities/Todo';
import { TodoRepositoryBase } from '../../domain/repositories/TodoRepositoryBase';

export interface ITodoData {
findAll(): Promise<Todo[]>;
}

export class TodoRepository implements TodoRepositoryBase {
private todoData: ITodoData;

constructor({ todoData }: { todoData: ITodoData }) {
this.todoData = todoData;
}

public async getTodos(): Promise<Todo[]> {
let response = await this.todoData.findAll();
return response;
}

public async createTodo(): Promise<boolean> {
return true;
}

public async getTodoById(id: string): Promise<Todo> {
return { id: 1, title: 'TODO 1', description: 'Description 1', completed: false };
}

}
