---
title: "[E-Z] Design Pattern🧁"
key: design-pattern
category: c++
tags: c++
---
Design Pattern
<!--more-->

# C++ 문법 정리
## constructor
### 상속과 생성자
- 파생 클래스 생성자는 기반 클래스 생성자를 호출함
- 기반 클래스 생성자를 호출하는 코드를 만들지 않으면, 컴파일러가 추가함
- 컴파일러가 만들면 항상 기반 클래스의 디폴트 생성자를 호출함

Base()
Derived(int)
~Derived()
~Base()

```cpp
#include <iostream>

class Base
{
public:
	Base()     { std::cout << "Base()"    << std::endl; }
	Base(int a){ std::cout << "Base(int)" << std::endl; }
	~Base()    { std::cout << "~Base()"   << std::endl; }
};

class Derived : public Base
{
public:		
	Derived()		// ==> Derived() : Base()
	{ 
		std::cout << "Derived()" << std::endl; 
	}
	Derived(int a)	// ==> Derived(int a) : Base()
	{ 
		std::cout << "Derived(int)" << std::endl;
	}
	~Derived()		
	{ 
		std::cout << "~Derived()" << std::endl; 

		// ~Base()
	}
};

int main()
{
//	Derived d1;		
	Derived d2(5);	// call Derived::Derived(int)

}
```

### Base에 디폴트 생성자가 없을 때
파생 클래스에서 반드시 기반 클래스 생성자를 명시적으로 호출해야 함

```cpp
#include <iostream>

class Base
{
public:
	// 핵심 : Base에 디폴트 생성자가 없음.
	Base(int a){ }
};
class Derived : public Base
{
public:		
//	Derived() { }     // Derived() : Base(){ }
//	Derived(int a) { }// Derived(int a) : Base() { }

	Derived()      : Base(0) { }
	Derived(int a) : Base(a) { }
};
int main()
{

}
```


```cpp
#include <string>

class People
{
	std::string name;
	int age;
public:
	People(const std::string& name, int age) : name(name), age(age) {}
};

class Student : public People
{
	int id;
public:
//	Student(int id) : id(id) {} // Student(int id) : People(),  id(id) {} //


	Student(const std::string& name, int age, int id) 
		: People(name, age),  id(id) {}
};

int main()
{
	Student s("kim", 20, 15);
}
```

### protected의 의미
- 자신의 객체는 생성할 수 없지만(추상적 존재)
- 파생 클래스의 객체는 생성할 수 있도록 하겠다는 의도

```cpp
class Animal
{
//public:		// A, B 모두 ok
//private:		// A, B 모두 error
protected:
	Animal() {}
};

class Dog : public Animal
{
public:
	Dog() {}	// Dog() : Animal() {}
};

int main()
{
	// 다음중 에러를 모두 골라 보세요
	Animal a;	// A error // 추상적 개념
	Dog    d;	// B ok // 현실 세계 개념
}
```

## upcasting
- 기반 클래스에서 상속받은 멤버가 메모리 layout 상단에 놓임

upcasting
: 기반 클래스 포인터로 파생 클래스 객체를 가리킬 수 있다.

```cpp
class Shape
{
public:
    int color;
};

class Rect : public Shape
{
public:
    int x, y, w, h;
};

int main()
{
    Rect rect;
    
    Rect*  p1 = &rect; // ok
    int*   p2 = &rect; // error. 
    Shape* p3 = &rect; // ok  
    
    Shape& r = rect;   // ok. 
    
}
```

- 기반 클래스 포인터로는 기반 클래스의 멤버만 접근할 수 있음
- 파생 클래스의 고유 멤버에 접근하려면 명시적으로 static_cast 해야 함

```cpp
class Shape
{
public:
    int color;
};
class Rect : public Shape
{
public:
    int x, y, w, h;
};

int main()
{
    Rect rect;

    Shape* p = &rect; 
    
    p->color = 0; // ok
    p->x = 0;     // error
    static_cast<Rect*>(p)->x = 0; // ok
    
}

```

### 활용
- 동종(동일 기반 클래스로부터 파생된 클래스)을 처리하는 함수
- 동종 보관하는 컨테이너


```cpp
class Shape
{
public:
    int color;
};
class Rect : public Shape
{
public:
    int x, y, w, h;
};

// 인자로 전달된 도형을 검정색으로 변경하는 함수
void changeBlack(Shape* p)
{
    p->color = 0;
}
/*
void changeBlack(Triangle* p)
{
    p->color = 0;
}
*/
int main()
{
    Rect r;
    changeBlack(&r); // 삼각형 색을 변경하는 함수에 사각형을 넣을 때 에러가 발생 -> Shape 사용
    
    Rect* buffer[10]; // 사각형만 보관
    Shape* buffer[10]; // 모든 도형 보관
}
```

## dynamic_cast
![Image](/larvine/assets/images/design-pattern/img.PNG){:.border} 


```cpp
#include <print>

class Animal
{
public:
//	virtual ~Animal() {}
};
class Dog : public Animal {};
class Cat : public Animal {};

int main()
{
	Animal* pa = new Dog;
//	Animal* pa = new Cat;

//	Dog* pd = pa; // error
//	Dog* pd = static_cast<Dog*>(pa); 
	Dog* pd = dynamic_cast<Dog*>(pa); 

	std::println("{}", 
				 reinterpret_cast<void*>(pd));
}
```