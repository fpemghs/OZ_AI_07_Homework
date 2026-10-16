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

function inputFormula() {
    return prompt("계산식을 입력하세요.(예: 1 + 1 * 4)");  //prompt으로 계산기 보여주기
}

// 계산기 함수
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

function start(formula) { 
    let input = formula;
    
    // 인자가 없으면 prompt로 물어봄
    if (!input) {
        input = inputFormula();
    }
    
    if (!input) {  // 입력값이 없을때 출력 메시지
        console.log("계산식을 입력해주세요.");
        return;
    }

    const result = calculate(input);
    if (typeof result === "string") {  // 문자열 입력시 출력 메시지
        console.log(`에러 발생: ${result}`);
    } else {
        console.log(`결과: ${result}`);
    }
}