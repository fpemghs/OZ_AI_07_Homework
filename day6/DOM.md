### DOM(Document Object Model) 이란?
    - HTML문서를 JavaScrit가 다룰수 있게 만든 객체 구조

### Selector(선택자)로 DOM 요소 가져오기
    - let i = document.querySelector('span'); 등의 방법으로 사용

### Event 란?
    - "click" , "input" , "mouseover" 등 사용자의 동작이나 시스템 상의 변화

## EventListener(이벤트 리스너)
### EventListener(이벤트 리스너) 란?
    - 특정 이벤트가 발생했을때, 실행시킬 함수

### EventListener(이벤트 리스너) 를 사용하는 목적, 이유
    - 여러 이벤트에 같은 리스너 등록이 가능해지며, 코드의 가독성이 좋아지고 유지보수가 편해진다.
    - 정적인 페이지를 동적인 앱으로 변화

### EventListener(이벤트 리스너) 정의하기
    - function buttonAlert() {
         alert("버튼이 클릭됨")
        }

    - btn.addEventListener("click", buttonAlert)

### EventListener(이벤트 리스너) 응용
    - btn.addEventListener(
        "click",
        () => alert("버튼이 클릭됨")
        )

### 마우스 감지란?
    - 마우스 사용시 가능한 이벤트("mouseover" , "mouseout")

### 마우스 감지 사용
    - span.addEventListener(
        "mouseover",
        () => {
            span.style.backgroundColor = "orange";
            }
        )
### 화살표 함수란?
    - 함수 정의 시 function키워드 대신 =>를 사용하여 간결하게 정의

### 화살표 함수 사용
    - btn.addEventListener(
        "click",
        () => alert("버튼이 클릭됨")
        )