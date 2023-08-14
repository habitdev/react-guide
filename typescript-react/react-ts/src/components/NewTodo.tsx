import { type } from 'os';
import React, { useRef, useContext } from 'react';
import classes from './NewTodo.module.css';
import { TodosContext } from '../store/todo-context';

function NewTodo() {
	const todoCtx = useContext(TodosContext);
	const textRef = useRef<HTMLInputElement>(null);
	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		const enteredText = textRef.current!.value;
		// '!'은 확실히 값을 가지고 있을 때만 사용한다

		if (enteredText.trim().length === 0) {
			return;
		}

		todoCtx.addTodo(enteredText);
	};

	return (
		<form
			onSubmit={submitHandler}
			className={classes.form}
		>
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
