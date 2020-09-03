let container = document.querySelector(".container"),
  wrapper = container.querySelector(".wrapper"),
  paginationList = document.querySelectorAll(".pagination li"),
  prev = document.querySelectorAll(".arrow")[0],
  next = document.querySelectorAll(".arrow")[1];

let timer = null,
  step = 0,
  interval = 2000;

//自动轮播
function move() {
  step++;
  if (step >= 5) {
    wrapper.style.left = "0px";
    step = 1;
  }
  wrapper.style.left = `${-step * 900}px`;
  autoFocus();
}
//自动对焦
function autoFocus() {
  let temp = step;
  step === 4 ? (temp = 0) : null;
  paginationList.forEach((item, index) => {
    if (index === temp) {
      item.className = "active";
      return;
    }
    item.className = "";
  });
}

//点击焦点切换指定位置
function handlePagination() {
  paginationList.forEach((item, index) => {
    item.onclick = debounce(
      function () {
        step = index;
        wrapper.style.left = `${-step * 900}px`;
        autoFocus();
      },
      300,
      true
    );
  });
}
//点击小按钮切换
function handleArrow() {
  next.onclick = debounce(move, 300, true);
  prev.onclick = debounce(
    function () {
      step--;
      if (step < 0) {
        wrapper.style.left = `${-4 * 900}px`;
        step = 3;
      }
      wrapper.style.left = `${-step * 900}px`;
      move();
    },
    300,
    true
  );
}

//函数防抖
function debounce(fn, wait, immediate) {
  let timer = null,
    result = null;
  return function (...args) {
    let _this = this,
      now = immediate && !timer;

    // console.log(timer);
    clearTimeout(timer);
    timer = setTimeout(() => {
      //   console.log(timer);
      timer = null;
      !immediate ? (result = fn.call(_this, ...args)) : null;
    }, wait);
    now ? (result = fn.call(_this, ...args)) : null;
    return result;
  };
}

timer = setInterval(move, interval);

container.onmouseenter = () => clearInterval(timer);
container.onmouseleave = () => (timer = setInterval(move, interval));

handlePagination();
handleArrow();
