const inputForm = document.querySelectorAll("input");
const addBtn = document.querySelector(".add-btn");
const addBtnSmallScreen = document.querySelector(".add-btn-smallscreen");
const itemsList = document.querySelector(".items-list");
const alert = document.querySelector(".alert");
const clearBtn = document.querySelector(".clear");
const monthBtnList = document.querySelector(".month-btns-list");
const btn = document.querySelector(".input-container");
const btnSmallScreen = document.querySelector(".btn-add-container");

const newDate = new Date();
let editStatus = false;
let editId = "";
let editTitle = "";
let editValue = "";
const monthName = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];
let monthInteger = newDate.getMonth();
document.querySelector("title").innerHTML = "Despesas " + newDate.getFullYear();

window.addEventListener("DOMContentLoaded", setupItems);
window.addEventListener("click", clickOut);
addBtn.addEventListener("click", addItemBtn);
addBtnSmallScreen.addEventListener("click", addItemBtn);
clearBtn.addEventListener("click", clearItems);

function clickOut(e) {
  console.log(e.target.className);

  if (e.target.className === "form") {
    return;
  }
  if (e.target.className === "add-btn") {
    return;
  }
  if (e.target.className === "material-symbols-outlined") {
    return;
  }
  if (e.target.id === "expensetitle") {
    return;
  }
  if (e.target.id === "expensevalue") {
    return;
  }
  if (e.target.className === "input-container show") {
    return;
  }
  if (e.target.className !== addBtn.className) {
    let btnCheck = btn.classList.contains("show");
    if (btnCheck) {
      if (btnSmallScreen.classList.contains("show-btn")) {
        btn.classList.remove("show");
        btnSmallScreen.classList.remove("show-btn");
        return;
      } else {
        btn.classList.remove("show");
        btnSmallScreen.classList.remove("show-btn");
        addBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Nova Despesa`;
      }
    }
  }
}

function selectMonth(event) {
  const monthBtns = document.querySelectorAll(".month-btn");
  if (event.target) {
    const element = event.target;
    const monthId = event.target.dataset.id;
    monthInteger = monthId;
    const items = document.querySelectorAll(".item");
    monthBtns.forEach((btn) => {
      if (btn.classList.contains("btn-selected")) {
        btn.classList.remove("btn-selected");
      }
    });
    element.classList.add("btn-selected");
    items.forEach((item) => {
      item.remove();
    });
    setupItems();
  } else {
    monthBtns[2].classList.add("btn-selected");
  }
}

function addItemBtn(e) {
  e.preventDefault();
  console.log(e.target);
  const btnCheck = btn.classList.contains("show");
  const btnSmallScreenCheck = e.target.className;
  if (!btnCheck) {
    btn.classList.add("show");
    btnSmallScreenCheck === "material-symbols-outlined"
      ? btnSmallScreen.classList.add("show-btn")
      : null;
    addBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Adicionar`;
  } else {
    const newDateId = new Date();
    const id = newDateId.getTime().toString();
    const title = expensetitle.value;
    const value = expensevalue.value
      ? parseFloat(expensevalue.value)
      : expensevalue.value;
    if (!title || !value) {
    } else if (title && value && !editStatus) {
      createItem(title, value, id);
      setLocalStorage(title, value, id);
      calculateTotal();
      checkItems();
      setDefault();
      displayAlert("Item adicionado a lista!", "success");
    } else if (title && value && editStatus) {
      editTitle.innerHTML = title;
      editValue.innerHTML = value.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
      editLocalStorage(editId, title, value);
      calculateTotal();
      setDefault();
      displayAlert("Item foi alterado!", "success");
    }
    if (btnSmallScreen.classList.contains("show-btn")) {
      btn.classList.remove("show");
      btnSmallScreen.classList.remove("show-btn");
      return;
    } else {
      btn.classList.remove("show");
      btnSmallScreen.classList.remove("show-btn");
      addBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Nova Despesa`;
    }
  }
}

function createBtnsMonth(month) {
  const element = document.createElement("li");
  element.innerHTML = `<button type="button" class="month-btn" data-id="${month}">${
    !monthName[month] ? "dezembro" : monthName[month]
  }</button>`;
  monthBtnList.appendChild(element);
  const monthBtn = element.querySelector(".month-btn");
  monthBtn.addEventListener("click", selectMonth);
}

function createItem(title, value, id) {
  const element = document.createElement("div");
  const attr = document.createAttribute("data-id");
  const valueReal = value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("item");
  element.innerHTML = `<div class="item-content">
    <p class="expense-title">${title}</p>
    <p class="expense-value">${valueReal}</p>
  </div>
  <div class="container-item-btn">
    <button type="button" class="edit item-btn">
      <i class="fas fa-edit"></i>
    </button>
    <button type="button" class="delete item-btn">
      <i class="fas fa-trash"></i>
    </button>
  </div>`;
  itemsList.appendChild(element);
  const editBtn = element.querySelector(".edit");
  editBtn.addEventListener("click", editItem);
  const deleteBtn = element.querySelector(".delete");
  deleteBtn.addEventListener("click", deleteItem);
}

function editItem(e) {
  e.stopPropagation();
  const btn = document.querySelector(".input-container");
  const element = e.currentTarget.parentElement.parentElement;
  editId = element.dataset.id;
  let items = getLocalStorage();
  const selectedItem = items.filter(function (item) {
    return item.id.includes(editId) ? item : null;
  });
  expensetitle.value = selectedItem[0].title;
  expensevalue.value = selectedItem[0].value.toFixed(2);
  addBtn.innerHTML = "Editar";
  btn.classList.add("show");
  btnSmallScreen.classList.add("show-btn");
  editTitle = element.querySelector(".expense-title");
  editValue = element.querySelector(".expense-value");
  editStatus = true;
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  element.remove();
  removeFromLocalStorage(id);
  calculateTotal();
  checkItems();
  setDefault();
  displayAlert("Item removido da lista!", "danger");
}

function clearItems() {
  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.remove();
  });
  localStorage.removeItem(monthName[monthInteger]);
  calculateTotal();
  checkItems();
  setDefault();
  displayAlert("Todos os items removidos da lista!", "danger");
}

function checkItems() {
  const monthBtns = document.querySelectorAll(".month-btn");
  const element = document.querySelector(".no-item-section");
  const itemsList = document.querySelector(".items-list");
  const noItem = document.querySelector(".no-item");

  monthBtns[0].classList.add("btn-start");
  monthBtns[2].classList.add("btn-end");

  if (itemsList.children.length === 0) {
    element.innerHTML = `            <div class="no-item">
              <div class="no-item-content">
                <p class="expense-title">Lista vazia, adicione novos itens!</p>`;
  } else if (itemsList.children.length > 0 && noItem) {
    noItem.remove();
  }
  itemsList.children.length > 0
    ? clearBtn.classList.add("clear-show")
    : clearBtn.classList.remove("clear-show");
  const item = document.querySelectorAll(".item")[0];
  itemsList.children.length > 0 ? item.classList.add("start") : null;
}

function setDefault() {
  editStatus = false;
  expensetitle.value = "";
  expensevalue.value = "";
  editId = "";
  editTitle = "";
  editValue = "";
  !btnSmallScreen.classList.contains("show-btn")
    ? (addBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Nova Despesa`)
    : null;
}

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(() => {
    alert.innerHTML = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

function calculateTotal() {
  const items = getLocalStorage();
  const itemsValue = items.map((item) => {
    let values = item.value;
    return values;
  });
  let result = itemsValue.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  result = result.toLocaleString("pt-br", { minimumFractionDigits: 2 });
  if (!result) {
    document.querySelector(".real").innerHTML = "0";
    document.querySelector(".decimal").innerHTML = "00";
  }
  const intNumber = result.slice(0, result.length - 3);
  const decNumber = result.slice(result.length - 2, result.length);
  document.querySelector(".real").innerHTML = intNumber;
  document.querySelector(".decimal").innerHTML = decNumber;
}

function setupItems() {
  const month = newDate.getMonth();
  let months = [month - 2, month - 1, month];
  if (document.querySelector(".month-btns-list").children.length === 0) {
    months.map((month) => {
      createBtnsMonth(month);
    });
    selectMonth(month);
    localStorage.removeItem(monthName[monthInteger - 3]);
  }
  const title = document.querySelector(".title");
  const year = newDate.getFullYear();
  title.innerHTML = `Despesas ${monthName[monthInteger]} ${year}`;
  const items = getLocalStorage();
  items.map((item) => {
    createItem(item.title, item.value, item.id);
  });
  itemsList.children.length > 0 ? checkItems() : null;
  checkItems();
  calculateTotal();
}

function setLocalStorage(title, value, id) {
  const newItem = { title, value, id };
  let items = getLocalStorage();
  items.push(newItem);
  localStorage.setItem(monthName[monthInteger], JSON.stringify(items));
}

function editLocalStorage(id, title, value) {
  let items = getLocalStorage();
  items = items.map((item) => {
    return item.id === id ? { id: id, title: title, value: value } : item;
  });
  localStorage.setItem("expenses", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter((item) => {
    return item.id !== id ? item : null;
  });
  localStorage.setItem(monthName[monthInteger], JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem(monthName[monthInteger])
    ? JSON.parse(localStorage.getItem(monthName[monthInteger]))
    : [];
}
