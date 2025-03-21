let display = document.getElementById("display")

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
    if (b == 0) {
        error()
    }
    return a / b;
}
function operate(num1, op, num2) {
    console.log(num1)
    console.log(num2)

    if (op === '+') {
        return add(num1, num2);
    }
    else if (op === '-') {
        return subtract(num1, num2);
    }
    else if (op === 'X' || op === '*') {
        return multiply(num1, num2);
    }
    else if (op === '/' || op === '%') {
        return divide(num1, num2);
    }
}
let first = ""
let second = ""
let operator = ""
let wait = false;
let opwait = false;
let disable = false;
function updatedisplay(s) {
    str = String(s)
    if (str.length < 11) {
        display.innerText = str
    } else {
        display.innerText = str.slice(0, 10)

    }
}
function error() {
    disable = true
    display.innerText = "ERROR"
}
function handlenumber(num) {
    if (!wait && !disable) {
        first += num
        if (first.length > 10) {
            error()
            return;
        }
        display.innerText = first
    } else if (!disable && wait) {
        second += num
        if (second.length > 10) {
            error()
            return;
        }
        display.innerText = second
    }
}
function handleoperator(op) {

    if (!opwait && !disable) {
        operator = op
        display.innerText = op
        opwait = true;
        wait = true;
    }
}
function handleequal() {
    if (!wait || second.length == 0) {
        return;
    }
    let ans = operate(parseFloat(first), operator, parseFloat(second))
    updatedisplay(ans)

    first = String(ans)
    second = ""
    wait = false
    opwait = false;
}
function handleclear() {
    first = ""
    second = ""
    wait = false
    opwait = false
    display.innerText = "0"
    disable = false
}
function handlebackspace() {
    if (!wait && !disable) {
        first = first.slice(0, first.length - 1)
        updatedisplay(first)
    } else if (wait && !disable) {
        second = second.slice(0, second.length - 1)
        updatedisplay(second)
    }
}
function handledecimal() {
    if (!wait && !disable) {
        if (!first.includes(".")) {
            first += ".";
            display.innerText = first;
        }
    } else if (!disable && wait) {
        if (!second.includes(".")) {
            second += ".";
            display.innerText = second;
        }
    }
}
document.querySelectorAll('.number').forEach(num => {
    num.addEventListener("click", () => handlenumber(num.textContent));
});
document.querySelectorAll('.operator').forEach(op => {
    op.addEventListener("click", () => handleoperator(op.textContent));
});
document.querySelector('.equal').addEventListener("click", () => handleequal());
document.querySelector('.clear').addEventListener("click", () => handleclear());
document.querySelector('.backspace').addEventListener("click", () => handlebackspace());
document.querySelector('.decimal').addEventListener("click", () => {
    handledecimal();
});

document.addEventListener("keydown", (e) => {
    let key = e.key
    console.log(key)
    if (key === "Shift") return;
    if (key >= "0" && key <= "9") {
        handlenumber(key);
    }
    if (key === "Enter" || key === "=") {
        handleequal()
    }
    if (key === "Escape") {
        handleclear()
    }
    if (key === "Backspace") {
        handlebackspace()
    }
    if (['+', '%', '-', '*'].includes(key)) {
        handleoperator(key)
    }
    if (key === '.') {
        handledecimal()
    }
})