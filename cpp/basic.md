| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |


# std::print
std::cout
: 
* c++ 초창기부터 사용되던 표준 출력 체계
* 단점 1: 여러 개 변수 출력 시 코드가 복잡해짐
* 단점 2: 성능이 느림

std::print
:
* c++23에서 추가되는 새로운 출력 함수
* `include <print>`

# Auto, Decltype, Using
auto(c++11)
: 
* 변수 선언 시, **우변의 표현식을 조사**해서 컴파일러가 타입을 결정
* 컴파일할 때 타입을 결정해서 실행 시 오버헤드는 없음
* 가독성은 떨어짐

```cpp
int main() {
    int x[3] = {1, 2, 3};
    auto n = x[0]; // int n = x[0];
}
```

decltype(c++11)
:
* **()안의 표현식**으로 타입 결정
* 함수(클래스) 템플릿 등을 만들 때 주로 사용

```cpp
int main() {
    int x[3] = {1, 2, 3};
    decltype(n) = n1; // int n1;
}
```

## 배열과 auto
auto n=x;
:
* `int n[3] = x;` // compile error
* `int *n = x;`

다른 배열의 이름으로 배열을 초기화할 수 없다.
{:.error}

```cpp
int main() {
    int x[3] = {1, 2, 3};
    auto n = x;
}
```

decltype(n) d;
: 
* `int d[3];`

```cpp
int main() {
    int x[3] = {1, 2, 3};
    decltype(n) d;
    decltype(n) d = d1; // error
}
```

type deduction(inference, 추론, 연역)
: 주어진 **표현식을 보고 컴파일러가 타입을 결정**하는 과정

## using
typedef vs using(c++11)
: 
* typedef: type에 대한 별칭
* using: type에 대한 별칭 + template에 대한 별칭

```cpp
typedef int DWORD;
using DWORD int;
```

# Uniform initialization, Structrue binding
## 일관된 초기화
c++11 이전 초기화 방법
: 일반 변수, 구조체, 배열, 클래스에 따라 **초기화 방법이 다르다**

```cpp
struct Point {
    int x;
    int y;
};

int n1 = 0;
Point p1 = {0, 0};
int x1 = {1, 2, 3};
```

c++11 이후 초기화 방법
: 
* 모든 종류의 변수를 한 가지 방법으로 초기화할 수 있게 하자.
* 중괄호 초기화(brace-init)이라고도 부름

```cpp
struct Point {
    int x;
    int y;
};

int n1 = {0};
Point p1 = {0, 0};
int x1 = {1, 2, 3};
```

```cpp
struct Point {
    int x;
    int y;
};

int n1{0};
Point p1{0, 0};
int x1{1, 2, 3};
```

직접 초기화 vs 복사 초기화
:
직접 초기화: = 없이 초기화하는 것
복사 초기화: = 를 사용해서 초기화하는 것

prevent narrow
:

```cpp
int n1 = 3.4; // warning

int n2{3.4}; // error
int n3 = {3.4}; // error
char c{500}; // error
```

## struct와 structure binding
c와 다른 c++ 구조체
: 
* 구조체 **멤버에 디폴트 초기값을 지정**할 수 있음(c++11)
* 구조체 변수 선언 시 **struct** 키워드를 표기하지 않아도 됨

structure binding(c++17)
:
* 구조체 또는 배열의 모든 요소의 값을 한 줄을 꺼내는 방법
* 타입은 반드시 **auto**로 사용해야 한다.
* 요소의 개수와 선언된 변수의 개수가 같아야 한다.

```cpp
struct Point {
    int x = 1;
    int y{2};
};

Point foo {
    Point p = {1, 2};
    return p;
}

int main() {
    struct Point p1; // 전통적 방법으로, c++에서는 struct이 없어도 됨
    Point pt2 = {3, 4};

    // int x = pt2.x;
    // int y = pt2.y;
    auto [x, y] = pt2;

    auto ret = foo(); // Point ret = foo();
    auto [x1, y1] = foo();
}
```

# string and ...
## 문자열
c 언어의 문자열 처리
: 
* `char 배열` 또는 `const char*`를 사용
* =, == 등의 연산자를 사용하면 안되고 문자열 전용 함수를 사용해야 한다.

```cpp
#include <iostream>
#include <cstring>

int main() {
    char s1[] = "abcd";
    char s2[5];

    // s2 = s1; // compile error
    strcpy_s(s2, s1);

    // if(s2 == s1) // 배열 주소 비교
    if(strcmp(s2, s1)) std::cout << "same" <<std::endl;
}
```

std::string
:
* c++ 표준 라이브러리인 STL이 제공하는 문자열 타입
* class 문법으로 만들어진 **사용자 정의 타입**
* 문자열 변수를 정수형 변수와 비슷하게 사용 가능: +, =, == 등의 연산자 사용 가능


```cpp
#include <iostream>
#include <cstring>
#include <string>

int main() {
    std::string s1[] = "abcd";
    std::string s2[5];

    s2 = s1; // ok

    if(s2 == s1) std::cout << "same" <<std::endl;

    std::string s3 = s1 + s2;
}
```

헤더파일 주의!
: 
* `<cstring>`: `<string.h>`의 c++ 버전
* `<string>`: `std::string`을 사용하기 위한 헤더

## c++ 타입/변수 특징
```cpp
int main()
{
	bool b = true; 		// false, 0, 1 - C++98
	long long n = 10;	// C++11. 64bit 정수

	int n1 = 0b1000'0000; // 2진수 표기법 - C++11
	int n2 = 1'000'000;  // digit separator : 단순 표기이고 컴파일러는 주석처럼 읽지 않고 그냥 지나감

	int* p1 = 0;
	int* p2 = nullptr; // C++11 부터.
}
```

# default parameter
default parameter
: 함수 호출 시 인자를 전달하지 않으면 **미리 지정된 인자값**을 사용할 수 있다.


```cpp
#include <iostream>

void foo(int a, int b = 0, int c = 0)
{
	std::cout << a << ", " << b << ", " << c << std::endl;
}

int main()
{
	foo(1, 2, 3);
	foo(1, 2);   // foo(1, 2, 0)
	foo(1);      // foo(1, 0, 0)
}
```

주의사항
:
* 함수의 마지막 인자부터 차례대로 디폴트값을 지정해야 한다.
* 함수를 선언과 구현으로 분리할 때는 **함수 선언부에만 디폴트 값을 표기**해야 한다.
* 함수 호출 시 컴파일러가 함수 인자로 보고 어느 함수가 호출될 지 명확히 결정할 수 있어야 한다.

```cpp
void f1(int a = 0, int b = 0, int c = 0 ) {} // ok
void f2(int a,     int b = 0, int c = 0 ) {} // ok
//void f3(int a = 0, int b,     int c = 0 ) {} // error
//void f4(int a = 0, int b = 0, int c )     {} // error


void foo(int a, int b = 0, int c = 0);

int main()
{
	foo(1); 
}

//void foo(int a, int b  , int c )
void foo(int a, int b /* = 0 */ , int c /* = 0 */ ) // 구현부에도 디폴트값이 있으면 재정의 에러 발생!
{	
}
```

default parameter의 원리
: 컴파일러가 컴파일 시에 **함수를 호출하는 코드의 인자에 디폴트 값을 채워주는 것**

# function overloading
function overloading
: 
* 인자의 개수나 타입이 다르면 **동일한 이름의 함수를 여러 개 만들 수 있다.**
* 단, 함수 호출 시 어느 함수를 호출할 지 명확하게 구분되어야 한다.

특징
:
* 함수 사용자 입장에서는 동일한 함수처럼 생각하게 된다. **사용하기 쉬운, 일관된 형태의 라이브러리**를 구축
* c언어를 제외한 **대부분의 최신 언어들이 지원**하는 문법

```cpp
#include <iostream>

int square(int a)
{
	return a * a;
}
double square(double a)
{
	return a * a;
}

int main()
{
	auto ret1 = square(3);
	auto ret2 = square(3.4);

	std::cout << ret1 << std::endl;
	std::cout << ret2 << std::endl;
}
```

주의사항
: 
* 인자의 개수가 달라도, **default parameter**가 있는 경우는 주의!
* **함수 반환 타입만 다른 경우**는 오버로딩 안됨

```cpp
void f1(int    a){}
void f1(double a){} // ok

void f2(int a) {}
void f2(int a, int b) {} // ok

// f3은 아래처럼 만들수가 없다.
//void f3(int a) {}
//char f3(int a) { return 0;}

void f4(int a) {}
void f4(int a, int b = 0) {}

void f5(char  a) {}
void f5(short a) {}

int main()
{
	f1(3);
	f1(3.3);

	f2(1);
	f2(1, 2);

	f4(1, 2);
//	f4(1);   // ambiguos error

	f5('a'); // ok
	f5(1);   // ambiguos error
}
```

## name mangling
function overloading의 원리
: 
* 컴파일러가 **컴파일 시간에 함수의 이름을 변경**하는 것
* 컴파일 후의 코드에 있는 함수는 모두 이름이 다르다.
* name mangling

```cpp
int square(int a)    // square_int(  )
{
	return a * a;
}

double square(double a) // square_double( )
{
	return a * a;
}

int main()
{
	square(3);   // square_int(3)
	square(3.4); // square_double(3.4)
}
```

mangling 규칙은 컴파일러마다 다르다
{:.info}

name mangling 현상 때문에 c와 c++ 사이에는 호환성 문제가 발생한다
{:.error}
