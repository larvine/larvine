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

## Abstract class
순수 가상함수(pure virtual function)
: 구현이 없고 =0 으로 끝나는 가상함수

추상 클래스(abstract class)
: 순수 가상함수가 1개 이상인 클래스
- 객체를 생성할 수 없다.
- 포인터 변수는 생성할 수 있다.

```cpp
class Shape
{
public:
	virtual ~Shape() {}	

	virtual void draw() = 0;
};

int main()
{
//	Shape  s;	// error	
	Shape* p;	// ok
}
```

### 추상 클래스로부터 파생된 클래스
- 기반 클래스(추상 클래스)가 가진 순수 가상함수의 구현부를 제공하지 않으면 역시 추상클래스이다.
- 객체를 생성할 수 있게 하려면 반드시 순수 가상함수를 override해서 구현부를 제공해야 한다.

```cpp
class Shape
{
public:
	virtual ~Shape() {}	

	virtual void draw() = 0;	
};

class Rect : public Shape
{
public:
	virtual void draw() {} // 객체 생성 불가
};

int main()
{
	Rect r; // ??
}
```


추상클래스의 의도 
:
- 파생 클래스에게 특정 멤버 함수를 반드시 만들라고 지시하기 위한 것

### 도형(Shape)을 그릴 수 (draw) 있을까?
- 사각형(Rect)은 실제 존재하는 객체이므로 그릴 수 있음
- 도형(Shape)은 추상적인 개념이므로 그릴 수는 없음

```cpp
#include <print>

class Shape
{
public:
	virtual ~Shape() {}

//	virtual void draw() { std::println("draw Shape"); }
	virtual void draw() = 0;
};

class Rect : public Shape 
{
public:
	void draw() override { std::println("draw Rect"); }

    // draw 가 가상 함수일 때,
    // Rect가 draw를 override하지 않으면
    // Shape의 기본 구현을 물려 받게 된다.
    // 논리적으로 맞나?
};

int main()
{
	Rect r;
	r.draw();
}
```

### 가상 함수 vs 순수 가상 함수

|함수 종류| 특징 |
|---|---|
|가상 함수|파생 클래스가 반드시 재정의할 필요 없음, 재정의 하지 않으면 기본 구현 제공|
|순수 가상 함수|파생 클래스가 반드시 구현을 제공해야 함, 모든 도형이 지켜야 하는 규칙|

## interface
OCP, Open-Closed Principle 
: 소프트웨어 개체(클래스, 모듈, 함수 등)는 확장에 대해 열려 있어야 하고, 수정에 대해서는 닫혀 있어야 한다.

새로운 요소가 추가되어도 기존 요소가 변경되지 않게 설계해야 한다는 원칙
{:.info}

![Image](/larvine/assets/images/design-pattern/img02.PNG){:.border} 

```cpp
#include <print>

class Camera
{
public:
	void take() { std::println("take picture"); }
};

class HDCamera
{
public:
	void take() { std::println("take HD picture"); }
};

class People
{
public:
	void use_camera(Camera* p) { p->take(); }
	void use_camera(HDCamera* p) { p->take(); }
};

int main()
{
	People p;
	Camera c;
	p.use_camera(&c);

	HDCamera hc;
	p.use_camera(&hc); // ?
}
```

카메라 사용자와 제작자 사이에서 지켜야하는 설계 규칙
: 추상 클래스 사용

```cpp
#include <print>



// 규칙 : 모든 카메라는 ICamera 로 부터 파생 되어야 한다.
// 규칙 : 모든 카메라는 ICamera 인터페이스를 구현해야 한다.
//class ICamera
struct ICamera
{	
//public:
	virtual ~ICamera() {}

	virtual void take() = 0;	
};
```

카메라 사용자(People)
: 특정 제품이 아닌 규칙의 이름(추상 클래스)만 사용

```cpp
class People
{
public:
	void use_camera(ICamera* p) { p->take(); }
};

```

다양한 카메라 제품
: 
- 반드시 규칙을 지켜야 함
- 규칙을 담은 추상 클래스로부터 파생해야 함

```cpp
class Camera : public ICamera
{
public:
	void take() { std::println("take picture"); }
};

class HDCamera : public ICamera
{
public:
	void take() { std::println("take HD picture"); }
};

class UHDCamera : public ICamera
{
public:
	void take() { std::println("take UHD picture"); }
};

int main()
{
	People p;
	Camera c;
	p.use_camera(&c);

	HDCamera hc;
	p.use_camera(&hc); // ok

	UHDCamera uhc;
	p.use_camera(&uhc); // ok
}

```


### 추상 클래스 vs 인터페이스

| 종류| 특징 |
|---|---|
| 추상 클래스 | 지켜야 하는 규칙 + 다른 멤버도 있는 경우 |
| 인터페이스 | 지켜야하는 규칙(순수 가상함수)만 가진 것 |