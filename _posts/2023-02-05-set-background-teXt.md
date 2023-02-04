---
title: "[E-Z] How to set the background image in Jekyll-TeXt-Theme"
key: background
category: githublog
tags: jekyll
---

Jekyll TeXt 에서 대문 이미지를 만들어보자
<!--more-->

[syki66님](https://syki66.github.io/blog/2020/02/20/random-header-background.html) 없인 TeXt가 너무 어렵다.  
{:.info}

현재 내가 하고 싶은 일은 좌측 상단의 블로그 이름을 클릭할 때, 어떤 대표 이미지가 나오게 하는 것이다.  
그리고 그걸 여러 이미지로 random 하게 하는 것!  

## index.html 수정하기
```html
---
layout: home
title: LARVINE MADE IN KOREA
mode: immersive
header:
  theme: dark
article_header:
  type: overlay
  theme: dark
---
```

나는 post 에는 배경화면을 넣지 않을 것이므로 `index.html`{:.info}에 바로 정의한다.  

## home.html 수정하기
처음에는 index.html에 title을 정의해도, 아무 일이 일어나지 않으므로 관련 옵션을 수정해야 한다.  
index.html의 layout은 home이므로 `_layout/home.html`{:.info}을 수정하면 된다.  

```html
show_title: true
```




## Reference
[지킬 블로그 배경화면 랜덤하게 변경하기](https://syki66.github.io/blog/2020/02/20/random-header-background.html)  