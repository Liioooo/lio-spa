import {Service} from '@lio-spa/core';
import {Todo} from '../models/todo';

@Service()
export class TodoService {

    private _todos: Todo[] = [
        {
            id: 0,
            title: 'DoSomething',
            description: '',
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

    public get doneToDos(): Todo[] {
        return this._todos.filter((todo) => todo.done);
    }

    public get notDoneToDos(): Todo[] {
        return this._todos.filter((todo) => !todo.done);
    }

    public addToDo(toAdd: Todo) {
        this._todos.push(toAdd);
    }

    public generateNewTodo(): Todo {
        let idForNew: number = 0;
        while (!this._todos.every((todo) => todo.id !== idForNew)) {
            idForNew++;
        }
        return {
            id: idForNew,
            title: '',
            description: '',
            done: false
        };
    }

    public removeToDoById(id: number) {
        this._todos = this._todos.filter((todo) => todo.id !== id);
    }

    public getTodoById(id: number): Todo {
        return this._todos.find((todo) => todo.id === id);
    }

    public editToDoWithId(id: number, changes: object) {
        const index = this._todos.findIndex((todo) => todo.id === id);
        if (!index) {
            return;
        }
        this._todos[index] = {...this._todos[index], ...changes};
    }
}