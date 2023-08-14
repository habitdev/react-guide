import React, { ReactNode } from 'react';
import classes from './TodoItem.module.css';

type todoItem = {
	text: string;
  onRemoveTodo: (event: React.MouseEvent) => void
};

function TodoItem({ text, onRemoveTodo }: todoItem) {
	return <li className={classes.item} onClick={onRemoveTodo}>{text}</li>;
}

export default TodoItem;
