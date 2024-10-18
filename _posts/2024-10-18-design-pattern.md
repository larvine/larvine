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

downcasting
: 기반 클래스 포인터(참조) 타입을 파생 클래스 포인터(참조) 타입으로 캐스팅하는 것

- 암시적으로 될 수 없음
- 반드시 명시적 캐스팅을 해야 함

```cpp
#include <print>

class Animal
{
public:
	virtual ~Animal() {}
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

### Cat을 Dog로 static_cast할 때 

![Image](/larvine/assets/images/design-pattern/img01.PNG){:.border} 

```cpp
int main()
{
	Animal* pa = new Cat;
	Dog* pd = static_cast<Dog*>(pa); // 분명히 잘못됐지만 성공은 함

	std::println("{}", 
				 reinterpret_cast<void*>(pd));
}
```

static_cast
: 
- 컴파일 시간 캐스팅
- runtime 오버헤드 없음
- 컴파일 시간에는 pa가 가리키는 메모리를 조사할 수 없음 ->  잘못된 downcasting을 조사할 수 없음
- 상속 관계에서는 항상 캐스팅 성공(주소 반환)


해결책은 dynamic_cast이다.
{:.success}

dynamic_cast
: 
- runtime 캐스팅
- runtime 오버헤드 있음
- runtime에 pa가 가리키는 곳을 조사 후 잘못되지 않은 경우만 주소 반환 
- 잘못된 downcasting 사용 시 0을 반환
- polymorphic type에 대해서만 사용 가능함 -> 가상 함수가 없는 경우는 컴파일 에러

```cpp
class Animal
{
public:
//	virtual ~Animal() {}
};
class Dog : public Animal {};
class Cat : public Animal {};

int main()
{
	Animal* pa = new Cat;
	Dog* pd = dynamic_cast<Dog*>(pa); // 0

	std::println("{}", 
				 reinterpret_cast<void*>(pd));
}
```

함수가 인자로 Animal* 를 사용하는 것은
:
- 모든 동물의 공통 작업만 하겠다는 것
- 함수 안에서 어떤 동물인지 조사하는 코드는 좋은 코드가 아님


```cpp
class Animal
{
public:
	virtual ~Animal() {}
};
class Cat : public Animal {};
class Dog : public Animal 
{
public:
	void run() {}
};
void foo(Animal* p)
{
	// p가 Dog를 가리킨다면 run() 멤버 함수를 호출하고 싶다
	// p->run(); // error

	Dog* pdog = dynamic_cast<Dog*>(p);

	if ( pdog != nullptr )
	{
		pdog->run();
	}

}
int main()
{
	Dog d; foo(&d);
	Cat c; foo(&c);
}
```

dynamic_cast와 디자인
:
- dynamic_cast 를 사용하기보다는 다형성을 활용하는 것이 좋음
- 디자인 관점에서는 dynamic_cast를 되도록이면 사용하지 않는 것이 좋음


```cpp
void foo(Animal* p)
{
	// 모든 동물의 공통의 작업
}

void foo(Dog* p)
{
	foo(static_cast<Animal*>(p));
	p->run();
}

int main()
{
	Dog d; foo(&d);
	Cat c; foo(&c);
}
```
