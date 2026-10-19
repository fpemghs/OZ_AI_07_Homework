const display = document.getElementById('display');
let currentFormula = ""; // 연산식 변수
let isPowerOn = true; // 전원 버튼 변수(불리언)
let isCalculated = false; // 계산상태 변수(불리언)

window.onload = function() { //전원 켜졋을때 함수
    const onOffBtn = document.querySelector('.on-off');
    onOffBtn.classList.add('on');
};

function togglePower() { //전원버튼에 대한 함수 정의
    isPowerOn = !isPowerOn;
    const buttons = document.querySelectorAll('button:not(.on-off)');
    const onOffBtn = document.querySelector('.on-off');

    if (isPowerOn) {  // 전원 켰을때
        display.value = "0";  // 화면에 0 띄우기
        onOffBtn.classList.add('on'); // 전원 상태 on 추가 
        buttons.forEach(btn => btn.disabled = false); //
    } else { // 전원 껏을때
        display.value = "";  // 화면 비우기
        onOffBtn.classList.remove('on');  // 전원 상태 on지우기 
        buttons.forEach(btn => btn.disabled = true);
        currentFormula = "";  // 계산 상태 지우기
        isCalculated = false;  
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function appendNumber(number) {  // 숫자 입력 함수
    if (!isPowerOn) return;  // 전원 꺼져있을때 바로 종료
    
    // 계산 완료 상태에서 숫자를 누르면 새 수식 시작
    if (isCalculated) {
        display.value = "";
        currentFormula = "";
        isCalculated = false;
    }

    if (display.value === "0" || display.value === "Error") {   // 화면 0이거나 비워져 있거나 꺼져있을때
        display.value = number; // 입력된 숫자 보여주기
        currentFormula = number; // 연산식 보여주기
    } else {  // 화면에 다른 숫자가 입력되어 있을때
        display.value += number;  // 입력된 숫자 추가
        currentFormula += number; // 입력된 연산자 추가
    }
}

function appendOperator(operator) {  // Enter 버튼 입력 함수 정의
    if (!isPowerOn) return;  
    if (display.value === "Error") return;
    
    // 계산 직후 연산자를 누르면 결과값에 이어서 계산
    if (isCalculated) {
        isCalculated = false;
    }

    // 수식이 비어있으면 0부터 시작하게 처리
    if (currentFormula === "") {
        currentFormula = "0";
    }

    // 마지막 입력이 공백이면 연산자가 이미 있는 것이므로 교체
    if (currentFormula.endsWith(" ")) {
        currentFormula = currentFormula.slice(0, -3);
    }
    
    currentFormula += " " + operator + " ";
    display.value = currentFormula;
}

function clearDisplay() {  // 화면 초기화(C버튼 입력 함수 정)
    if (!isPowerOn) return;
    display.value = "0";
    currentFormula = "";
    isCalculated = false;
}

function calculate(formula) {
    const tokens = formula.trim().split(/\s+/); // 계산식에 공백 제외
    if (tokens.length < 3 || tokens.length % 2 === 0) { // 계산식이 최소 3자리 이상(숫자와 연산자 포함)이고 홀수여야됨 
        return "잘못된 계산식이 입력되었습니다.";
    }

    // 1단계: 곱셈과 나눗셈 먼저 처리
    const intermediateTokens = [];  //연산식을 저장할 리스트 변수 선언
    let i = 0; // 리스트 내부 순서를 위해 변수 선언
    while (i < tokens.length) { // 연산자 갯수 만큼 반복문 적용
        const token = tokens[i];
        if (token === "*" || token === "/") { // *,/ 식별 조건문 
            const left = Number(intermediateTokens.pop()); // 식별된 *,/ 왼쪽 숫자 추출
            const operator = token; // 식별된 *,/
            const right = Number(tokens[i + 1]); // 식별된 *,/ 오른쪽 숫자 추출

            if (isNaN(left) || isNaN(right)) return "잘못된 숫자가 입력되었습니다.";  // 숫자가 아닐시 에러 메시지 출력

            let res; // 결과값 저장 변수 선언
            if (operator === "*") { // 연산자가 곱하기 일때
                res = multiply(left, right); //왼쪽 숫자 오른쪽 숫자 곱하기 함수에 입력
            } else {
                if (right === 0) return "0으로 나눌 수 없습니다."; // 오른쪽이 0일때 오류 메시지 출력
                res = divide(left, right); // 연산자가 *가 아닐때 왼쪽, 오른쪽 숫자 나누기 함수에 입력
            }
            intermediateTokens.push(res);
            i += 2; // 연산자와 오른쪽 피연산자 건너뜀
        } else {
            intermediateTokens.push(token); // 반복문을 위해 리스트에 저장
            i++;
        }
    }


    // 2단계: 덧셈과 뺄셈 처리
    let result = Number(intermediateTokens[0]); // 숫자만 추출
    if (isNaN(result)) return "잘못된 숫자가 입력되었습니다.";

    for (let j = 1; j < intermediateTokens.length; j += 2) {  // 길이 변수 선언후 연산자와 숫자의 길이 만큼 길이 변수에 2씩 더하는 반복문 실행
        const operator = intermediateTokens[j]; // 2씩 더하였으므로 연산자만 추출
        const nextValue = Number(intermediateTokens[j + 1]); // 연산자 제외 숫자만 추출

        if (isNaN(nextValue)) return "잘못된 숫자가 입력되었습니다."; // 숫자가 잘못 됫을경우 오류 출력

        if (operator === "+") { //연산자가 +일때
            result = add(result, nextValue); // 처음 숫자와 다음 숫자를 더하기 함수에 입력
        } else if (operator === "-") { // 연산자가 -일때
            result = subtract(result, nextValue); // 처음 숫자와 다음 숫자를 빼기 함수에 입력
        } else {
            return `예외 발생: ${operator}`; //연산자가 잘못됫을때 오류 출력
        }
    }
    return result; // 최종 결과값 반환
}

function performCalculate() {
    if (!isPowerOn || !currentFormula) return;  // 전원상태 및 연산자 입력 상태
    
    // 연산자로 끝나는 경우 마지막 연산자 제거 후 계산
    if (currentFormula.endsWith(" ")) {
        currentFormula = currentFormula.trim();
    }

    const result = calculate(currentFormula);
    display.value = result;
    isCalculated = true;
    
    if (result === "Error") {
        currentFormula = "";
    } else {
        currentFormula = result.toString();
    }
}
