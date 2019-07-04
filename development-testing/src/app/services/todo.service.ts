import {Service} from '@lio-spa/core';
import {Todo} from '../models/todo';

@Service()
export class TodoService {

    private _todos: Todo[] = [
        {
            id: 0,
            title: 'DoSomething',
            done: false
        },
        {
            id: 1,
            title: 'ToDo with Description',
            done: false,
            description: 'This is a description'
        },
        {
            id: 2,
            title: 'I am done',
            done: true,
            description: 'I am done, nice one!'
        }
    ];

    public get todos(): Todo[] {
        return this._todos;
    }

    public get doneToDos(): Todo[] {
        return this._todos.filter((todo) => todo.done);
    }

    public get notDoneToDos(): Todo[] {
        return this._todos.filter((todo) => !todo.done);
    }

    public addToDo(toAdd: Todo) {
        this._todos.push(toAdd);
    }

    public removeToDoById(id: number) {
        this._todos = this._todos.filter((todo) => todo.id !== id);
    }
}