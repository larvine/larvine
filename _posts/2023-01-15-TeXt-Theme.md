---
title: "[A to z] Jekyll Blog with TeXT Theme"
key: TeXt
category: githublog
tags: jekyll
cover: /assets/images/recommend-theme-md/dark-mode.gif
---

Jekyll TeXt로 블로그를 꾸며보자.
<!--more-->

# Structure 이해
## 상단바 카테고리 설정
상단바에 Development 란을 두고, 그 안에 c++, tdd 순으로 나타내려고 한다.  
그리고 c++, tdd 각 카테고리 별로 post를 모아서 보고 싶다.  
![Image](/larvine/assets/images/blog-md/blog01.PNG){:.border}

##### 01. _config.yml에 상단바를 어떻게 구성할지 정의한다.  
_config.yml
: 
```yml
collections:
  dev:
    output: true
```  
 
**output: true**
: 각각의 문서가 독립적인 버전으로 rendering하게 한다.   
예를 들어, collection/sample_page/a.md에 대해 collection/sample_page/a.html이라는 파일이 생성된다.  

collections_dir
: 참조할 경로  

이를 사용할 경우, 경로를 찾을 때 복잡해지므로 / 로 둔다.
{:.warning}

---
_config.yml
: 
```yml
## development
  - scope:
      path: ""
      type: dev
    values:
      nav_key: dev
```

scope/path
: ""이면 프로젝트 전체에 설정한다.   

scope/type
: 어떤 유형으로 화면을 구성할 것인지 정한다.  

values/nav_key
: _data/navigation.yml의 key를 참조한다.  

values/layout
: 어떤 형식인지 정해주지만 파일에서 따로 선언되는 layout이 있다면 그것으로 적용된다.  

---
##### 02. Collection용 폴더 생성하기
**_경로명** 형식으로 폴더를 생성하고 그 아래에 파일을 생성하면 된다.  

```
/_dev
```

이 폴더 내에 생성한 파일들은 카테고리에 대한 정보를 담는다.  
이 예시에서는 [c++.md](https://github.com/larvine/larvine/blob/gh-graph/_dev/c%2B%2B.md)와 [tdd.md](https://github.com/larvine/larvine/blob/gh-graph/_dev/tdd.md)를 구성해야 한다.  

---
##### 03. 상단바에 둘 Development라는 최상위 카테고리를 정의한다.
_data/navigation.yml
: 
```yml
header:
  - title:      Development
    url:        /dev.html
    key:        dev
```

title
: _config.yml에서 key로 title을 찾아서 상단바 이름으로 설정한다.  

header/url
: 해당 url 안에 정의한 형식으로 화면을 구성한다.    

---
##### 04. dev.html를 작성한다.
```html
---
layout: page
title: Development
permalink: /dev.html
---
```

Development라는 제목을 가진 page 형식의 글이다.  
html 내부에서 선언된 순서대로 화면이 구성된다.   

permalink
: 일종의 symlink로 url을 지정한다.     

현재 글을 구성하는 방법은 GRID, ITEM, BRIEF 세 가지이다.
{:.info}

---
###### CASE01. GRID
``
    {%- include article-list.html articles=site.sample_page type='grid' -%}  
`` 

![Image](/larvine/assets/images/blog-md/grid.PNG){:.border}{:.image--xl}   

---
###### CASE02. ITEM
``
    {%- include article-list.html articles=site.sample_articles type='item' -%}  
`` 

![Image](/larvine/assets/images/blog-md/item.PNG){:.border}{:.image--xl}   

---
###### CASE03. BRIEF
``
    {%- include article-list.html articles=site.sample_languages type='brief' size='sm' -%}
`` 

![Image](/larvine/assets/images/blog-md/brief.PNG){:.border}{:.image--lg}  


---
## Sidebar 설정  
화면 오른쪽 상단에 Docs라는 카테고리를 두고, 이를 클릭하면 목차 형식으로 post를 모아서 보고 싶다.  

##### 01. post에 nav_key와 sidebar: nav를 정의한다.  

원래는 _config.yml에 sidebar를 어떻게 구성할지 정의한다.  

_config.yml
: 
```yml
  - scope:
      path: "_docs/en"
    values:
      layout: article
      nav_key: docs
      sidebar:
        nav: docs-en
      license: true
      aside:
        toc: true
      show_edit_on_github: true
      show_date: false
      lightbox: true
```  

위 방법으로 하면 _docs 폴더를 새로 만들어서 거기에 post를 모아야 한다.  
새로운 카테고리를 만들 때마다 폴더를 추가하게 되는 것이다.  

현재 나는 post들을 모두 _post에 두고 필요에 따라 목차로, 카테고리별로 모으고 싶기 때문에 이 방법은 이용하지 않는다.
{:.error}

여기서 Docs의 key는 docs를 것이므로, 이를 nav_key로 둔다.  
sidebar의 nav는 docs-en으로 정의한다.  

/_post/2023-02-04-test.md
: 
```
---
title: test
permalink: /test
nav_key: docs
sidebar:
    nav: docs-kr
---
```

##### 02. _data/navigation.yml에 nav를 정의한다.
sidebar의 nav를 먼저 정의하고, 그 아래로 어떻게 목차를 구성할지 정의한다.    

_data/navigation.yml
:  
```yml
docs-en:
  - title:      Start
    children:
      - title:  Quick Start
        url:    /docs/en/quick-start
      - title:  Structure
        url:    /docs/en/structure
      - title:  Update from 1.x to 2.x
        url:    /docs/en/update-from-1-to-2
  - title:      Customization
    children:
      - title:  Configuration
        url:    /docs/en/configuration
      - title:  Navigation
        url:    /docs/en/navigation
      - title:  Layouts
        url:    /docs/en/layouts
      - title:  Logo and Favicon
        url:    /docs/en/logo-and-favicon
      - title:  Authors
        url:    /docs/en/authors
      - title:  Internationalization
        url:    /docs/en/i18n
```

---
## 이미지
### 크기 변경
```scss
.image {
  max-width: 100%;
  @extend .image--md;
}
.image--md {
  width: map-get($image, width);
}
.image--xl {
  width: map-get($image, width-xl);
}
.image--lg {
  width: map-get($image, width-lg);
}
.image--sm {
  width: map-get($image, width-sm);
}
.image--xs {
  width: map-get($image, width-xs);
}
```

**{:.image--md}** 와 같은 형식으로 사용하면 된다.  

`![Image](이미지경로){:.border}{:.image--md}`  

---
## 테마 색깔 설정
_sass/skins/\_default.scss
: 

```scss
  $main-color-3:     #036563;
  $text-color-3:     #e8ddcb;
  // header and footer colors
  $header-text-color: $text-color-3;
  $header-background: $main-color-3;

  $footer-text-color: $text-color-3;
  $footer-background: $main-color-3;

  $text-color-theme-light-l: rgb(242, 97, 97); //날짜, 인용글, ---선 등
 
  $border-color:     mix(#036563, $background-color, 20%); 
  $border-color-l:   mix(#036563, $background-color, 10%); //인용선, post 간 경계선 등
```


현재 header와 footer의 색은 3번을 사용하고 있다.  

---
## footer 설정
### 연도 변경
locale.yml
: 
```yml
  COPYRIGHT_DATES         : "2023"
```

---
## 로고 설정
### 색 변경  
macOs Safari용으로 svg를 추출하면 monochrome icon으로 나온다.  

logo.svg
: 
``
fill="#ff92af"
``

### 크기 변경  
배수를 변경한다.  

_sass/component/header.scss
: 
```scss
  & > svg {
    width: map-get($base, font-size-h4) * 3;
    height: map-get($base, font-size-h4) * 3;
    margin-right: map-get($spacers, 3);
```

---
## 폰트
### 코드 블록 내 폰트 크기 설정
_sass/common/_variables.scss
: 
```scss
code {
  font-size: map-get($base, font-size);
  line-height: map-get($base, line-height-sm);
}
``` 

---
# Reference
[jekyll-reference](https://kasterra.github.io/)  
[jekyll-reference2](https://syki66.github.io/blog/2020/04/17/TeXt-theme-detailed-customization.html#7-%EB%9E%9C%EB%8D%A4-%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)