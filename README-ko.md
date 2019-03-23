# 2019 JSconf Korea 웹페이지 변화 탐지 스크립트

[English README (영어 설명 링크)](https://github.com/roeniss/check_if_something_changed_in_2019.jsconfkorea/blob/master/README.md)

## 1. 개요

이 스크립트는 [2019 JSconf Korea 웹사이트](https://2019.jsconfkorea.com/)에 변화가 있는지 확인합니다.

(현재까지는 아직 티켓이 판매 전 상태입니다.)

만약 스크립트가 `True` 값을 리턴한다면 -- 이는 사이트에 변화가 있다는 뜻이고 그 말인즉슨 티켓이 판매상태로 바뀌었다는 뜻입니다 -- 자동으로 `mailToMe.js`를 호출합니다. 이 스크립트는 당신이 `.env`에 적은 이메일로 메일을 보내줍니다. **웹사이트 확인 요망!!**

## 2. 목적

2019 JSConf Korea의 티켓을 얻기 위해서입니다. 물론 로직 자체는 다른 웹사이트에서도 적용할 수 있습니다. 적절하게 수정만 한다면 말입니다... (ㅎㅎㅎ)

## 3. 실제 원리

`index.js`는 파악한 내용 전체를 (첫번째 섹션만 파악함) `note.txt`에 저장합니다. 그 다음번에 `index.js`가 실행되면 기존에 `note.txt` 저장된 내용과 이번에 새로 탐색한 웹페이지 내용을 대조합니다.

## 4. 구조

`.env`: 4개의 환경변수를 저장합니다. GID와 GPW는 당신의 이메일 계정입니다. 이걸 이용해 이메일을 보낼겁니다.

`index.js`: 이 스크립트가[the webpage](https://2019.jsconfkorea.com/)를 탐색할 것입니다. 사실 첫 번째 섹션만 확인하는데, 웹페이지를 보시면 아시겠지만 그거면 충분할 겁니다.

`mailToMe.js`: 만약 위 스크립트가 변화를 탐지한다면, 이건 매우 높은 확률로 티켓이 판매중이라는 뜻이며, 아니면 적어도 웹사이트에 어떤 변화가 있다는 뜻입니다. 그렇다면 이 스크립트가 `TO`에게 이메일을 보내 알려줄 것입니다. `TO`는 `.env`에 기록되어있습니다.

`note.txt`: 실제 작동원리의 핵심 포인트입니다.

`package.json`, `package-lock.json`: 4개의 라이브러리를 사용합니다.

- `cheerio`: jquery 대용. 웹 컨텐츠를 캐치하기 위함.
- `dotenv`: 환경변수 사용을 위함.
- `emailjs`: 이메일 전송을 위함.
- `request`: 웹 탐색을 위함.

## 5. 사용법

현재 저는 AWS ec2를 사용하고 있어서 crontab에 다음과 같이 등록해두었습니다.

```bash
$ sudo crontab -e

...
*/5 * * * * cd /path/where/script/existed && sudo node ./index.js >> ./crontab.log 2>&1
...
```

이건 공식적이지도, 효율적이지도 않은 방법이지만 분명 효과는 좋을 겁니다.
