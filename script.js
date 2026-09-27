const numberInput = document.querySelector("#number-input");
const checkButton = document.querySelector("#check-button");
const result = document.querySelector("#result");
const historyList = document.querySelector("#history-list");
const clearButton = document.querySelector("#clear-button");

let history = [];
const MAX_INPUT = 1_000_000_000;

// 반복문으로 약수 쌍을 찾아 오름차순의 양의 약수 목록을 반환합니다.
function getDivisors(number) {
  const smallDivisors = [];
  const largeDivisors = [];

  for (let divisor = 1; divisor * divisor <= number; divisor += 1) {
    if (number % divisor === 0) {
      smallDivisors.push(divisor);
      if (divisor !== number / divisor) largeDivisors.unshift(number / divisor);
    }
  }
  return [...smallDivisors, ...largeDivisors];
}

function showResult(type, label, message, icon, detail = "") {
  result.className = `result result--${type}`;
  result.innerHTML = `
    <div class="result-icon">${icon}</div>
    <div>
      <p class="result-label">${label}</p>
      <p class="result-message">${message}</p>
      ${detail ? `<p class="result-detail">${detail}</p>` : ""}
    </div>`;
}

function renderHistory() {
  clearButton.disabled = history.length === 0;

  if (history.length === 0) {
    historyList.innerHTML = '<li class="history-empty">아직 판별한 숫자가 없습니다.</li>';
    return;
  }

  historyList.innerHTML = history
    .map(({ number, prime }) => `
      <li>
        <span class="history-number">${number}</span>
        <span class="history-badge history-badge--${prime ? "prime" : "not-prime"}">
          ${prime ? "소수" : "소수 아님"}
        </span>
      </li>`)
    .join("");
}

function addHistory(number, prime) {
  history = [{ number, prime }, ...history.filter((item) => item.number !== number)].slice(0, 5);
  renderHistory();
}

function checkNumber() {
  const value = numberInput.value.trim();

  // 정수가 아닌 입력을 조건문으로 걸러냅니다.
  if (!/^[1-9]\d*$/.test(value)) {
    showResult("error", "INPUT ERROR", "자연수만 입력할 수 있습니다. 1 이상의 정수를 입력해주세요.", "!");
    numberInput.focus();
    return;
  }

  const number = Number(value);
  if (Math.abs(number) > MAX_INPUT) {
    showResult("error", "INPUT ERROR", `입력 가능한 최대값은 ${MAX_INPUT.toLocaleString("ko-KR")}입니다.`, "!", "계산 속도를 위해 입력 범위를 제한했습니다.");
    numberInput.focus();
    return;
  }

  if (number === 1) {
    showResult("not-prime", "NOT PRIME", "1은 소수가 아닙니다.", "×", "소수는 1보다 큰 자연수여야 합니다.");
    addHistory(number, false);
    return;
  }

  const divisors = getDivisors(number);
  const prime = divisors.length === 2;

  if (prime) {
    showResult("prime", "PRIME NUMBER", `${number}은(는) 1과 자기 자신만을 약수로 가지는 소수입니다.`, "✓");
  } else {
    const nonTrivialDivisors = divisors.slice(1, -1);
    showResult(
      "not-prime",
      "NOT PRIME",
      `${number}은(는) 1과 자기 자신 외에 ${nonTrivialDivisors[0]}라는 약수가 있으므로 소수가 아닙니다.`,
      "×",
      `양의 약수: ${divisors.join(", ")}`
    );
  }
  addHistory(number, prime);
}

checkButton.addEventListener("click", checkNumber);
numberInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") checkNumber();
});
clearButton.addEventListener("click", () => {
  history = [];
  renderHistory();
});
