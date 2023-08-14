import { type } from 'os';
import React, { useRef } from 'react';
import classes from './NewTodo.module.css';

type newTodos = {
	onAddTodo: (text: string) => void;
};

function NewTodo({ onAddTodo }: newTodos) {
	const textRef = useRef<HTMLInputElement>(null);
	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		const enteredText = textRef.current!.value;
		// '!'은 확실히 값을 가지고 있을 때만 사용한다

		if (enteredText.trim().length === 0) {
			return;
		}

		onAddTodo(enteredText);
	};

	return (
		<form onSubmit={submitHandler} className={classes.form}>
			<label htmlFor='text'>Todo text</label>
			<input
				type='text'
				name='text'
				id='text'
				ref={textRef}
			/>
			<button type='submit'>Add Todo</button>
		</form>
	);
}

export default NewTodo;
