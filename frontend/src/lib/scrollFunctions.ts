function disableScrolling(str: string) {
  const div = document.querySelector(str) as HTMLDivElement;
  setTimeout(function () {
    div.style.overflowY = "hidden";
  }, 1000);
}

function enableScrolling(str: string) {
  const div = document.querySelector(str) as HTMLDivElement;
  div.style.overflowY = "";
}

export { disableScrolling, enableScrolling };
