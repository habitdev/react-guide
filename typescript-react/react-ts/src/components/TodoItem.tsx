import React, { ReactNode } from 'react';

type todoItem = {
	text: string;
};

function TodoItem({ text }: todoItem) {
	return <li>{text}</li>;
}

export default TodoItem;
