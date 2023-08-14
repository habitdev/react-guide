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

let person: {
	name: string;
	age: number;
};

person = {
	name: 'max',
	age: 45,
};

let people: {
	name: string;
	age: number;
}[]; // 객체 배열



let course = 'React'; // string으로 타입을 인식
// course = 123456; // 오류


// 유니온 타입
// 타입을 정의할 때 한개 이상의 타입을 사용할 수 있다
let study: string | number = 'React';
study = 123456;