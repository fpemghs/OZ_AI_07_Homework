## CSS 란?
    - HTML에서 각 태그별로 디자인(색상, 크기, 글꼴 등)을 부여하는 기법

### Internal CSS
    - 내부 CSS로 < head >태그 및에 < style > 태그를 작성하고 그 아래 각 태그별 CSS를 작성하는 방식
### Inline CSS
    - 각 태그에 직접 CSS를 작성하는 방식(하나의 태그별로 따로 지정하여야 되므로 코드가 길어지고 편집에 어려움이 있다)
### External CSS
    - 외부 CSS로 로컬 또는 네트워크상에 정의된 CSS를 불러오는 방식(네트워크에 공유된 여러 CSS를 사용가능하다)

## CSS Selector(선택자)
    - 태그를 선택하기 위한 규칙
    - * : 문서 내 모든 태그를 선택
    - 태그명 : div등 특정 태그를 선택할 때, 해당 태그 이름으로 지정
    - .class명 : 같은 클래스를 가진 태그 지정(중복 가능)
    - #ID명 : 중복된 태그에서 하나의 ID를 가진 태그를 지정(중복 불가)
    - div header : 계층 구조를 활용하여 div 아래 header만 지정(div > header도 가능)

## style 속성
### text 관련
    - font-size : 글꼴 크기
    - font-weight : 글꼴 두께
    - text-align : 정렬(center:가운데, lefr:왼쪽, right:오른쪽 등)

## box model
    - margin : 보더 바깥쪽에 다른 요소와의 바깥쪽 여백 영역
    - padding : 콘탠츠와 보더(테두리)사이의 안쪽 여백 영역
    - border : 패딩을 둘러싸는 테두리 영역
    - content : 택스트나 이미지등 실제 작성 내용에 해당하는 영역
    - width : 콘텐츠의 너비
    - height : 콘텐츠의 높이
    - box-sizing : 콘텐츠의 높이와 너비가 포함된 규격