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

파생이라는 단어보다는 "모든 카메라는 ICamera 인터페이스를 구현해야한다."는 표현이 더 정확함
{:.success}

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

인터페이스를 만들 때
: 
- 결국 기반 클래스로 사용되므로 반드시 가상 소멸자 사용
- class 대신 struct를 사용하는 경우도 많음 (public 적기 귀찮아서)

![Image](/larvine/assets/images/design-pattern/img03.PNG){:.border} 

강한 결합(tightly coupling)
: 
- 객체가 다른 객체와 강하게 결합되어 있는 것
- 교체가 불가능하고 확장성 없는 경직된 디자인

![Image](/larvine/assets/images/design-pattern/img04.PNG){:.border} 

약한 결합(loosely coupling)
: 
- 객체가 다른 객체와 약하게 결합되어 있는 것(인터페이스를 통해서 통신)
- 교체가 가능하고 확장성 있는 유연한 디자인

## Shape 예시
- 모든 도형을 타입으로 설계한다.
- 기반 클래스가 있다면 모든 도형을 하나의 컨테이너에 보관할 수 있다.

```cpp
#include <iostream>
#include <vector>

class Shape
{
public:
	virtual ~Shape() {}
};

class Rect : public Shape
{
public:
	void draw() { std::cout << "draw Rect" << std::endl; }
};

class Circle : public Shape
{
public:
	void draw() { std::cout << "draw Circle" << std::endl; }
};

int main()
{
	Rect* r1 = new Rect;
	Circle* c1 = new Circle;

	std::vector<Shape*> v;

	v.push_back( new Rect);
	v.push_back( new Circle);
	
}
```

![Image](/larvine/assets/images/design-pattern/img05.PNG){:.border} 

기반 클래스 타입 포인터로는 파생 클래스의 고유 멤버에 접근할 수는 없다.
{:.error}

기반 클래스에도 draw()를 제공한다.
{:.success}

```cpp
#include <iostream>
#include <vector>

class Shape
{
public:
	virtual ~Shape() {}
};
class Rect : public Shape
{
public:
	void draw() { std::cout << "draw Rect" << std::endl; }
};
class Circle : public Shape
{
public:
	void draw() { std::cout << "draw Circle" << std::endl; }
};

int main()
{
	std::vector<Shape*> v;

	while (1)
	{
		int cmd;
		std::cin >> cmd;

		if      ( cmd == 1 ) v.push_back(new Rect);
		else if ( cmd == 2 ) v.push_back(new Circle);
		else if ( cmd == 9 )
		{
			for (auto p : v) 
				p->draw(); // error	 
		}
	}
}
```

- 모든 파생 클래스에서 공통의 특징은 반드시 기반 클래스에도 있어야 한다.

문법적인 규칙이 아니라 디자인적인 관점이다.
{:.info}


```cpp
class Shape
{
public:
	virtual void draw() { std::cout << "draw Shape" << std::endl; }

	virtual ~Shape() {}
};
```

- 기반 클래스 함수 중 파생 클래스가 재정의하게 되는 것은 반드시 가상함수로 만들어라

가상 함수가 아니면 재정의하지 말라
{:.info}

```cpp
class Rect : public Shape
{
public:
	void draw() override  { std::cout << "draw Rect" << std::endl; }
};
class Circle : public Shape
{
public:
	void draw() override { std::cout << "draw Circle" << std::endl; }
};
```


다형성(polymorphism)
: 
- 동일한 표현식이 상황에 따라 다르게 동작하는 것
- `p->draw()`는 상황(실제 가리키는 객체의 종류)에 따라 다르게 동작함


k번째 도형의 복사본을 만드는 방법
: 
1. dynamic_cast로 타입을 조사
- 새로운 도형이 추가되면 기존 코드를 수정함 -> OCP 위반


```cpp
		else if (cmd == 8)
		{
			std::cout << "몇번째 도형을 복제 할까요 >> ";
			int k;
			std::cin >> k;

			if ( dynamic_cast<Rect*>(v[k]) != nullptr )
			{
				v.push_back( new Rect );
			}
			else if ( dynamic_cast<Circle*>(v[k]) != nullptr )
			{
				v.push_back( new Circle );
			}

		}
	}
}

```


2. clone() 가상함수
- 새로운 도형이 추가돼도 기존 코드를 수정하지 않아도 됨

```cpp
#include <iostream>
#include <vector>

class Shape
{
public:
	virtual void draw() { std::cout << "draw Shape" << std::endl; }

	virtual ~Shape() {}

	virtual Shape* clone() const 
	{
		return new Shape(*this);
	}
};


class Rect : public Shape
{
public:
	void draw() override  { std::cout << "draw Rect" << std::endl; }

	Shape* clone() const override
	{
		return new Rect(*this);
	}
};

class Circle : public Shape
{
public:
	void draw() override { std::cout << "draw Circle" << std::endl; }

	Shape* clone() const override
	{
		return new Circle(*this);
	}
};


int main()
{
	std::vector<Shape*> v;

	while (1)
	{
		int cmd;
		std::cin >> cmd;

		if      ( cmd == 1 ) v.push_back(new Rect);
		else if ( cmd == 2 ) v.push_back(new Circle);
		else if ( cmd == 9 )
		{
			for (auto p : v) 
				p->draw(); 
		}

		else if (cmd == 8)
		{
			std::cout << "몇번째 도형을 복제 할까요 >> ";
			int k;
			std::cin >> k;

			v.push_back( v[k]->clone() );
			
		}
	}
}
```

OCP를 위해서 제어문이 아니라 다형성을 사용하라
{:.info}

디자인 패턴
: 특정 문제를 해결하기 위해 만들어진 코딩때문에 이름을 부여한 것

prototype 패턴
: 기존 객체를 복사해서 새로운 객체를 만드는 패턴

// 1. 객체의 생성과정을 OCP를 만족하게 할수 없을까 ?
// 2. Undo/Redo 기능을 추가하려면 어떻게 해야 할까 ?

# 공통성과 가변성의 분리
## Template method
- 행위 패턴(Behavior Pattern)
- 의도

> 오퍼레이션에는 알고리즘의 처리 과정만을 정의하고 각 단계에서 수행할 구체적인 처리는 sub class에서 정의한다. 

알고리즘의 처리과정을 변경하지 않고 알고리즘 각 단계의 처리를 sub class에서 재정의할 수 있다.
{:.info}

![Image](/larvine/assets/images/design-pattern/img06.PNG){:.border} 


GUI 환경에서 윈도우에 그림 그리기
:   
- 대부분의 라이브러리에는 그림을 그리기 위한 클래스를 제공함
- 화면 깜빡임을 방지(flicker free)하기 위해 다양한 방법을 제공(더블 버퍼링 등)

현재 파생 클래스들끼리 멤버 함수가 거의 동일해서 중복되고 있음
{:.error}

```cpp
#include <iostream>
#include "Painter.h"

class Shape
{
public:
	virtual ~Shape() {}
	virtual void draw() = 0;
};

class Rect : public Shape
{
public:
	void draw() override
	{
		PainterPath path;
		path.begin();

		// path 멤버 함수로 그림을 그린다.
		path.draw_rect();

		path.end();

		Painter surface;
		surface.draw_path(path);
	}
};


class Circle : public Shape
{
public:
	void draw() override
	{
		PainterPath path;
		path.begin();

		// path 멤버 함수로 그림을 그린다.
		path.draw_circle();
		
		path.end();

		Painter surface;
		surface.draw_path(path);
	}
};

int main()
{
	Shape* s1 = new Rect;
	Shape* s2 = new Circle;

	s1->draw();
	s2->draw();
}
```

![Image](/larvine/assets/images/design-pattern/img07.PNG){:.border} 

- 변하지 않은 코드 내부에 있는 변해야 하는 코드를 찾는다.
- 변해야 하는 코드를 가상함수로 분리한다.
- 파생 클래스는 알고리즘의 처리 과정을 물려 받으면서 가상함수를 재정의하여 변경이 필요한 부분만 다시 만들 수 있다.

```cpp
#include <iostream>
#include "Painter.h"

class Shape
{
public:
	virtual ~Shape() {}

	void draw() 
	{
		PainterPath path;
		path.begin();

		// path 멤버 함수로 그림을 그린다.
		draw_imp(path);

		path.end();

		Painter surface;
		surface.draw_path(path);		
	}

protected:
	virtual void draw_imp(PainterPath& path) = 0;
};



class Rect : public Shape
{
protected:
	void draw_imp(PainterPath& path) override
	{
		path.draw_rect();
	}
};


class Circle : public Shape
{
protected:
	void draw_imp(PainterPath& path) override
	{
		path.draw_circle();
	}
};

int main()
{
	Shape* s1 = new Rect;
	Shape* s2 = new Circle;

	s1->draw();
	s2->draw();
}
```

![Image](/larvine/assets/images/design-pattern/img08.PNG){:.border} 

## Strategy
- 행위 패턴(Behavior Pattern)
- 의도

> 다양한 알고리즘이 존재하면 이들 각각을 하나의 클래스로 캡슐화하여 알고리즘을 대체할 수 있도록 한다.

> Strategy 패턴을 이용하면 클라이언트와 독립적으로 다양한 알고리즘으로 변형할 수 있다.

알고리즘을 바꾸더라도 클라이언트는 아무런 변경을 할 필요가 없다.
{:.info}

![Image](/larvine/assets/images/design-pattern/img09.PNG){:.border} 

```cpp
#include <iostream>
#include <string>
#include <conio.h>

class Edit
{
	std::string data;
public:
	std::string get_text()
	{
		std::cin >> data;
		return data;
	}
};

int main()
{
	Edit edit;
	while (1)
	{
		std::string s = edit.get_text();
		std::cout << s << std::endl;
	}
}
```

Edit 을 통해서 나이를 입력받고 싶다.
{:.info}

숫자만 입력하도록 제한해야 한다.

```cpp
class Edit
{
	std::string data;
public:

	std::string get_text()
	{
		data.clear();

		while (1)
		{
			char c = _getch();

			if (c == 13) break; // enter 키

			if (isdigit(c))
			{
				data.push_back(c);
				std::cout << c;
			}
		}
		std::cout << "\n";
		return data;
	}
};

```

Edit의 Validation 정책은 변경될 수 있어야 한다.
{:.info}

### Validation 정책 #1 변하는 코드를 가상함수로 분리
template method 패턴

```cpp
class Edit
{
	std::string data;
public:

	std::string get_text()
	{
		data.clear();

		while (1)
		{
			char c = _getch();

			if (c == 13 && iscomplete(data) ) break;

			if (validate(data, c))
			{
				data.push_back(c);
				std::cout << c;
			}
		}
		std::cout << "\n";
		return data;
	}
	virtual bool validate(const std::string& data, char c)
	{
		return true;
	}
	virtual bool iscomplete(const std::string& data) // 입력 값이 완성되었는지 확인함
	{
		return true;
	}
};
```


```cpp
class NumEdit : public Edit
{	
	int count;
public:
	NumEdit(int count = 9999) : count(count) {}

	bool validate(const std::string& data, char c) override
	{		
		return data.size() < count && isdigit(c); 
	}
	bool iscomplete(const std::string& data) override
	{
		return count != 9999 && data.size() == count;
	}
};

int main()
{
//	Edit edit;
	NumEdit edit(5); // 5자리 숫자만, 5자리 입력 되어야만 enter 가능
	
//	AddressEdit edit2;
	while (1)
	{
		std::string s = edit.get_text();
		std::cout << s << std::endl;
	}
}
```

### Validation 정책 #2 변하는 코드를 다른 클래스로 분리
strategy

인터페이스를 먼저 만들고, Edit에서 약한 결합으로 다양한 Validation 정책 클래스 사용

![Image](/larvine/assets/images/design-pattern/img10.PNG){:.border} 

```cpp
#include <iostream>
#include <string>
#include <conio.h>

struct IValidator
{
	virtual bool validate(const std::string& data, char c) = 0;
	virtual bool iscomplete(const std::string& data) { return true;}
	virtual ~IValidator() {}
};



class Edit
{
	std::string data;

	IValidator* val = nullptr;
public:
	void set_validator(IValidator* p) { val = p;}

	std::string get_text()
	{
		data.clear();

		while (1)
		{
			char c = _getch();

			if (c == 13 && ( val == nullptr || val->iscomplete(data)    )  ) break;
			
			if (val == nullptr || val->validate(data, c))
			{
				data.push_back(c);
				std::cout << c;
			}
		}
		std::cout << "\n";
		return data;
	}
};


int main()
{
	Edit edit;
	while (1)
	{
		std::string s = edit.get_text();
		std::cout << s << std::endl;
	}
}
```


```cpp
class DigitValidator : public IValidator
{
	int count;
public:
	DigitValidator(int count = 9999) : count(count) {}

	bool validate(const std::string& data, char c) override 
	{
		return data.size() < count && isdigit(c);
	}
	bool iscomplete(const std::string& data) override 
	{
		return count != 9999 && data.size() == count;
	}
};


int main()
{
	Edit edit;
	DigitValidator v(5);
	edit.set_validator(&v);
	
//	DigitValidator v2(15);
//	edit.set_validator(&v2);

	while (1)
	{
		std::string s = edit.get_text();
		std::cout << s << std::endl;
	}
}

```

### Validation 방식 2가지 비교
#### Validation #1 template method
![Image](/larvine/assets/images/design-pattern/img11.PNG){:.border} 

- NumEdit, AddressEdit 등 Edit을 확장해가면서 Validation을 따로 쓰게 되므로 유연성이 떨어짐

#### Validation #2 strategy
![Image](/larvine/assets/images/design-pattern/img12.PNG){:.border} 


Edit 예제의 경우는 strategy가 적합하지만, template method가 더 나쁜 것이 아님
{:.warning}

사각형을 그리는 방법은
- 다른 클래스에서 사용해야 할 일이 없고
- 실행 시간에 교체되어야 할 이유도 없음
- 가상 함수로 구현되면 멤버함수이므로 멤버 데이터 접근도 편해짐

