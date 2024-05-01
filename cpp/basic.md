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

