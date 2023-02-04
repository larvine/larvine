---
title: "[E-Z] How to set the subtitle in Jekyll-TeXt-Theme"
key: subtitle
category: githublog
tags: jekyll
---

Jekyll TeXt 에서 부제목을 만들어보자
<!--more-->

[syki66님](https://syki66.github.io/blog/2020/04/17/TeXt-theme-detailed-customization.html#2-%EB%B3%B8%EB%AC%B8-%ED%97%A4%EB%8D%94%EC%9D%98-%EB%B0%9C%EC%B7%8C%EB%AC%B8-%EC%A0%9C%EA%B1%B0-%ED%9B%84-%EB%B6%80%EC%A0%9C%EB%AA%A9-%EB%9D%84%EC%9A%B0%EA%B8%B0) 없인 TeXt가 너무 어렵다.  :wq:
{:.info}

현재 내가 하고 싶은 일은 **블로그 배경화면에 부제목도 추가로 표현**하는 것이다.  
참조한 사이트에서는 발췌문을 제거하고, 그 자리에 부제목을 바꿔치기했다.  
하지만 나는 발췌문도 잘 쓰고 있어서 교체하고 싶진 않기 때문에 이 글을 작성하게 됐다.🤣  

## page.html 수정하기
_layout/page.html
: 

```html
<p class="overlay__subtitle">{{ page.subtitle }}</p>
```

## overlay__subtitle 정의하기
_sass/components/_article-header.scss
: 
```scss
.overlay__subtitle {
    font-size: map-get($base, font-size-h3-xl);
    @include media-breakpoint-down(lg) {
      font-size: map-get($base, font-size-h3-lg);
    }
    @include media-breakpoint-down(md) {
      font-size: map-get($base, font-size-h3-sm);
    }
    font-weight: map-get($base, font-weight-bold);
  }
```

## Reference
[TeXt theme 지킬 블로그 세부적인 커스터마이징](https://syki66.github.io/blog/2020/04/17/TeXt-theme-detailed-customization.html#2-%EB%B3%B8%EB%AC%B8-%ED%97%A4%EB%8D%94%EC%9D%98-%EB%B0%9C%EC%B7%8C%EB%AC%B8-%EC%A0%9C%EA%B1%B0-%ED%9B%84-%EB%B6%80%EC%A0%9C%EB%AA%A9-%EB%9D%84%EC%9A%B0%EA%B8%B0)  