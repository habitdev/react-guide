import React, { ReactNode, useState } from 'react';
import Todo from '../models/todo';

type todosContextObj = {
	items: Todo[];
	addTodo: (text: string) => void;
	removeTodo: (id: string) => void;
};

type todosProivder = {
	children: ReactNode;
};

export const TodosContext = React.createContext<todosContextObj>({
	items: [],
	addTodo: () => {},
	removeTodo: (id: string) => {},
});

const TodosContextProvider = ({ children }: todosProivder) => {
	const [todos, setTodos] = useState<Todo[]>([]);

	const addTodoHandler = (text: string) => {
		const newTodo = new Todo(text);
		setTodos((prevTodo) => {
			return prevTodo.concat(newTodo);
		});
	};

	const removeTodoHanlder = (todoId: string) => {
		setTodos((prevTodo) => {
			return prevTodo.filter((todo) => todo.id !== todoId);
		});
	};

	const contextValue: todosContextObj = {
		items: todos,
		addTodo: addTodoHandler,
		removeTodo: removeTodoHanlder,
	};

	return (
		<TodosContext.Provider value={contextValue}>
			{children}
		</TodosContext.Provider>
	);
};

export default TodosContextProvider;