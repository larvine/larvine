---
title: "[E-Z] How to toggle the theme in Jekyll-TeXt-Theme"
key: toggle-theme
category: githublog
tags: jekyll
cover: /assets/images/recommend-theme-md/dark-mode.gif
---

Jekyll TeXt 에서 dark 모드로 토글하기
<!--more-->

[Toggle to dark mode in minimal-mistakes](https://etch-cure.github.io/blog/toggle-dark-mode/#--dark-themejs)를 참조하되, TeXt theme에 맞추어 조정해야 할 부분이 몇 가지가 있다.  

---
## 조정하기
### [2번 토글 버튼 만들기](https://etch-cure.github.io/blog/toggle-dark-mode/#2-%ED%86%A0%EA%B8%80-%EB%B2%84%ED%8A%BC-%EB%A7%8C%EB%93%A4%EA%B8%B0)
TeXt 에서는 main.scss에서 _sass/custom.scss를 참조해서 가져가는 듯 보인다.  
_sass/custom 에 scss 파일들을 자유롭게 만들되, `_sass/custom.scss`{:.info}에서 import한다.  

_sass/custom.scss
: 
```scss
/* start custom scss snippet */
@import "custom/customOverride.scss";
@import "custom/customImport.scss";
/* end custom scss snippet */
```

### [3번 헤더 커스텀](https://etch-cure.github.io/blog/toggle-dark-mode/#3-%ED%97%A4%EB%8D%94-%EC%BB%A4%EC%8A%A4%ED%85%80)
TeXt 에서는 `_includes/header.html`{:.info}에 적용한다.  

### [5번 main_dark.css 파일 가지고 오기](https://etch-cure.github.io/blog/toggle-dark-mode/#5-main_darkcss-%ED%8C%8C%EC%9D%BC-%EA%B0%80%EC%A7%80%EA%B3%A0-%EC%98%A4%EA%B8%B0)  
main_dark.css의 경로를 찾지 못하는 중이다.  
{:.error}

```console
GET http://127.0.0.1:4000/assets/css/main_dark.css net::ERR_ABORTED 404 (Not Found)
```

```
http://127.0.0.1:4000/larvine/assets/css/main_dark.css
```
위 경로로 찾을 수 있도록 `_include/head.html`{:.info}을 수정한다.  
이 경우는 내가 io 방식의 블로그를 운영하는 것이 아니라서 그런 듯 보인다.  


### [6번 다크모드 토글 스크립트 작성](https://etch-cure.github.io/blog/toggle-dark-mode/#6-%EB%8B%A4%ED%81%AC-%EB%AA%A8%EB%93%9C-%ED%86%A0%EA%B8%80-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%9E%91%EC%84%B1)
4번을 진행하지 않기 때문에 스크립트 내용도 이에 맞게 수정해야 한다.  


### [7번 dark-theme.js 스크립트 가지고 오기](https://etch-cure.github.io/blog/toggle-dark-mode/#7-dark-themejs-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%80%EC%A7%80%EA%B3%A0-%EC%98%A4%EA%B8%B0)
after_footer_scripts는 minimal-mistakes에서 고유하게 제공하는 기능인 듯 보인다.  
      
  첫째, `_includes/scripts/customJS/toggleTheme.js`라는 파일을 만든다.  

  둘째, `_layouts/page.html`에 선언한다.  
모든 page에서 다크모드로 토글할 수 있어야 하기 때문이다.  


### [8번 토글 버튼에 이미지 로드하기](https://etch-cure.github.io/blog/toggle-dark-mode/#8-%ED%86%A0%EA%B8%80-%EB%B2%84%ED%8A%BC%EC%97%90-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%A1%9C%EB%93%9C%ED%95%98%EA%B8%B0)
TeXt 에서의 화면과 조금 구성이 다른 면이 있어서 그대로 적용하면 버튼이 주소 표시줄에 바짝 붙어 있다.  

_sass/custom/toggle.scss
: 
```scss
.mh_toogle {
    display: none;
    + .mh_toggle_btn {
        ...
        position: relative;
        top: 1.8em; //기호에 맞게 조정하면 된다. 
        left: 1em; // 기호에 맞게 조정하면 된다. 
        ...
```

## Reference
[Toggle to dark mode in minimal-mistakes](https://etch-cure.github.io/blog/toggle-dark-mode/#--dark-themejs)  
[지킬 블로그 배경화면 랜덤하게 변경하기](https://syki66.github.io/blog/2020/02/20/random-header-background.html)  
[기본 css 지식](https://hianna.tistory.com/430)