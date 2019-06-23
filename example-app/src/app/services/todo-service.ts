import {Service} from '@lio-spa/core';
import {Todo} from '../models/todo';

@Service()
export class TodoService {

    private _todos: Todo[] = [
        {
            id: 0,
            name: 'First Todo',
            description: 'Do the first thing',
            done: false
        },
        {
            id: 1,
            name: 'Second One',
            description: 'Do the second thing',
            done: false
        },
        {
            id: 2,
            name: 'Another one',
            description: 'Do the third thing',
            done: false
        },
        {
            id: 3,
            name: 'Last one',
            description: 'Do the last thing',
            done: false
        }
    ];

    public get todos(): Todo[] {
        return this._todos;
    }

    public getTodoFromId(id: number): Todo | undefined {
        return this._todos.find((todo) => todo.id === id);
    }

    public addTodo(todo: Todo) {
        this._todos.push(todo);
    }
}