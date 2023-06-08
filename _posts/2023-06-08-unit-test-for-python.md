---
title: "[E-Z] pytest"
key: pytest
category: tdd
tags: tdd
---

# 설치
python 3.7+ 필요  

```bash
pip install -U pytest
```

# 실행 방법
## 테스트 1개 실행하기
```python
def func(x):
    return x + 1
```

```python
def test_answer():
    assert func(3) == 5
```

어떤 테스트 파일의 어떤 함수를 수행하다가 fail했는지 원인과 코드 줄 번호를 알려준다.  

![Image](/larvine/assets/images/pytest/pytest.PNG){:.border} 

pytest는 현재 폴더와 그 하위 폴더 안의 모든 파일을 기준으로 이름이 `test_*.py`{:.info}이거나 `*_test.py`{:.info}이면  테스트 대상으로 간주한다.  

## 테스트 여러 개 실행하기
![Image](/larvine/assets/images/pytest/pytest01.PNG){:.border} 

## 테스트 클래스로 테스트 여러 개 실행하기
`test_*.py`{:.info}이거나 `*_test.py`{:.info} 형식의 파일 내에서  
* 클래스 외부의 `test*`{:.info} 형식 메소드
* `Test*`{:.info} 형식의 클래스 내부에서의 `test*`{:.info} 형식 메소드 (`__init__` 함수 제외)  

도 테스트 대상이다.  

```python
class TestClass:
    def test_one(self):
        x = "this"
        assert "h" in x

    def test_two(self):
        x = "hello"
        assert hasattr(x, "check")

class SEClass:
    def test_two(self):
        x = "hello"
        assert hasattr(x, "check")
```
![Image](/larvine/assets/images/pytest/pytest05.PNG){:.border} 

각각의 테스트들은 독립적으로 수행된다.  

### 클래스 수준 변수는 주의하자
파이썬의 클래스 변수
: cpp에서의 static member variable과 동일한 개념이다.  

클래스 수준에서 관리하는 변수는 테스트 간에 공유되므로 다른 테스트에 영향을 줄 수 있다.  

```python
class TestClassDemoInstance:
    value = 0

    def test_one(self):
        self.value = 1
        assert self.value == 1

    def test_two(self):
        assert self.value == 1
    
    def test_three(self):
        assert TestClassDemoInstance.value == 1

    def test_influencer(self):
        TestClassDemoInstance.value = 1
        assert TestClassDemoInstance.value == 1

    def test_fan(self):
        assert TestClassDemoInstance.value == 1
```

![Image](/larvine/assets/images/pytest/pytest06.PNG){:.border} 


## 테스트 대상 지정하기
### 파일 이름으로 지정하기
![Image](/larvine/assets/images/pytest/pytest02.PNG){:.border} 

### 경로로 지정하기
![Image](/larvine/assets/images/pytest/pytest09.PNG){:.border} 

### 문자열로 필터링하기
-k 옵션을 사용한다.  
{:.success}

`not three and on`일 때,  

![Image](/larvine/assets/images/pytest/pytest08.PNG){:.border} 

`not three or on`일 때,  

![Image](/larvine/assets/images/pytest/pytest07.PNG){:.border} 

### 클래스명, 함수명 등으로 필터링하기
![Image](/larvine/assets/images/pytest/pytest11.PNG){:.border} 

![Image](/larvine/assets/images/pytest/pytest10.PNG){:.border} 

## 테스트 조용하게 실행하기
-q, --quiet 옵션을 사용한다.  
{:.success}

![Image](/larvine/assets/images/pytest/pytest03.PNG){:.border} 

Fail했을 때는 -q 옵션이 적용되지 않는다. 
{:.error}

![Image](/larvine/assets/images/pytest/pytest04.PNG){:.border} 

# Reference
[pytest](https://docs.pytest.org/en/7.1.x/index.html)  
[pytest-builtin](https://docs.pytest.org/en/7.1.x/builtin.html)  
[API reference](https://docs.pytest.org/en/7.1.x/reference/reference.html#api-reference)  
