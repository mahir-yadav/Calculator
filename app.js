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
    else if (op === 'X') {
        return multiply(num1, num2);
    }
    else if (op === '/') {
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
document.querySelectorAll('.number').forEach(num => {
    num.addEventListener("click", () => {
        if (!wait && !disable) {
            first += num.textContent
            if (first.length > 10) {
                error()
                return;
            }
            display.innerText = first
        } else if (!disable && wait) {
            second += num.textContent
            if (second.length > 10) {
                error()
                return;
            }
            display.innerText = second
        }
    });
});
document.querySelectorAll('.operator').forEach(op => {
    op.addEventListener("click", () => {
        if (!opwait && !disable) {
            operator = op.textContent
            display.innerText = op.textContent
            opwait = true;
            wait = true;
        }
    });
});
document.querySelector('.equal').addEventListener("click", () => {
    let ans = operate(parseFloat(first), operator, parseFloat(second))
    updatedisplay(ans)

    first = String(ans)
    second = ""
    wait = false
    opwait = false;
});
document.querySelector('.clear').addEventListener("click", () => {
    first = ""
    second = ""
    wait = false
    opwait = false
    display.innerText = "0"
    disable = false
});
document.querySelector('.backspace').addEventListener("click", () => {
    if (!wait && !disable) {
        first = first.slice(0, first.length - 1)
        updatedisplay(first)
    } else if (wait && !disable) {
        second = second.slice(0, second.length - 1)
        updatedisplay(second)

    }
});
document.querySelector('.decimal').addEventListener("click", () => {
    if (!wait && !disable) {
        first += '.'
        if (first.length > 10) {
            error()
            return;
        }
        display.innerText = first
    } else if (!disable && wait) {
        second += '.'
        if (second.length > 10) {
            error()
            return;
        }
        display.innerText = second
    }
});