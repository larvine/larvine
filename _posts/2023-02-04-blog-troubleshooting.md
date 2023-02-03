---
title: "TroubleShooting for Blog"
key: troubleshooting-githublog
category: githublog
tags: [jekyll, troubleshooting]
#cover: /assets/images/recommend-theme-md/dark-mode.gif
---

trouble shooting
<!--more-->

## sassc 2.4.0 설치 에러
```console
Installing sassc 2.4.0 with native extensions
```

gem을 설치할 때, 위 상태에서 멈춘다.
{:.error}

GemFile
: 
```
gem 'sassc', '>2.1.0'
```

GemFile에 위의 버전을 적는다.  

```console
sudo gem install sassc
```
그리고 따로 gem install로 설치한다.  

## sass-embedded-1.5.7 설치 에러
jekyll-sass-converter를 설치할 때 종속 gem을 설치할 수 없다.
{:.error}

```console
An error occurred while installing sass-embedded (1.57.1), and Bundler cannot
continue.

In Gemfile:
  minimal-mistakes-jekyll was resolved to 4.24.0, which depends on
    jekyll-feed was resolved to 0.17.0, which depends on
      jekyll was resolved to 4.3.1, which depends on
        jekyll-sass-converter was resolved to 3.0.0, which depends on
          sass-embedded
```

GemFile
: 
```
gem "jekyll-sass-converter", "~> 2.0"
```

GemFile에 위의 버전을 적는다.  