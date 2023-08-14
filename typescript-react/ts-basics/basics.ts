// 기본형: number, boolean, string
// 자료형: 배열, 객체
// 함수형: function types, parameters

// 기본형
let age: number = 24;
// number를 Number로 적으면 Number객체를 말하므로 반드시 소문자로 적어야 한다.

let userName: string;
userName = 'Max';

let isIn: boolean = false;

// let hobbies: null;

// 자료형
let hobbies: string[]; // 문자열 배열
hobbies = ['st', 'ring'];

type Person = {
	name: string;
	age: number;
};

let person: Person;

person = {
	name: 'max',
	age: 45,
};

let people: Person[]; // 객체 배열

let course = 'React'; // string으로 타입을 인식
// course = 123456; // 오류

// 유니온 타입
// 타입을 정의할 때 한개 이상의 타입을 사용할 수 있다
let study: string | number = 'React';
study = 123456;

// Functions & types

function add(a: number, b: number): number {
	return a + b;
}

function printOutPut(value: any): void {
	console.log(value);
}

// void 는 null 과 undefined와 같지만 항상 function(함수)과 결합해서 사용한다는 특징이 있다

// Generics
function insertAtBeginning<T>(array: T[], value: T) {
	const newArray = [value, ...array];
	return newArray;
}
const demoArray = [1, 2, 3];
const updateArray = insertAtBeginning(demoArray, -1);
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd');
// updateArray[0].split(''); // 오류가 안난다
// 이를 인식할 수 있도록 제너릭 기능을 이용한다
