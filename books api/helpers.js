const display = (element) => (element.style.display = "block");

const hide = (element) => (element.style.display = "none");

const clearInnerHTML = (element) => (element.innerHTML = "");

const setText = (element, string) => (element.textContent = string);

export { display, hide, clearInnerHTML, setText };
