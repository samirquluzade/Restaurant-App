// import '@babel/polyfill';
// import { forEach } from "core-js/core/array";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { successAlert } from "./alerts";
import {
  login,
  logout,
  signup,
  sendToken,
  resetToken,
  deleteUser,
  deleteCard,
} from "./login";
import {
  updateSettings,
  updateAllSettings,
  createNewCard,
} from "./updateSettings";
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector(".nav__el--logout");
const signUpForm = document.querySelector(".form--signup");
const userDataForm = document.querySelector(".form-user-data");
const userPasswordForm = document.querySelector(".form-user-settings");
const userAllDataForm = document.querySelector(".form-user-all-data");
const createNewDataForm = document.querySelector(".form-new-card");
const cardAllDataForm = document.querySelector(".form-card-all-data");
const forgotBtn = document.querySelector(".forgot__btn");
let forgotSendBtn = document.querySelector(".send__btn");
const resetBtn = document.querySelector(".reset__btn");
let deleteBtn = document.querySelectorAll(".card-delete");
let deleteBtnCard = document.querySelectorAll(".card-deleteCard");
let basketCount = document.querySelectorAll(".add__basket");
let basketCountDisco = document.querySelectorAll(".add__basketDisco");
let orders = document.querySelector(".orders");

if (signUpForm) {
  signUpForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    signup(name, surname, email, password, passwordConfirm);
  });
}
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    // top.window.onbeforeunload = null;
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}
if (logOutBtn) logOutBtn.addEventListener("click", logout);

if (forgotBtn) {
  forgotBtn.addEventListener("click", e => {
    let inputForgotPassword = `<div class="form-group"><label class="form__label" for="email">Email</label>
    <input type="email" class="form__input send__Email" id="email" placeholder="you@example.com" required> </div>`;
    loginForm.insertAdjacentHTML("beforeend", inputForgotPassword);
    forgotSendBtn.style.display = "block";
    loginForm.insertAdjacentElement("afterend", forgotSendBtn);
    forgotBtn.style.display = "none";
  });
}
if (forgotSendBtn) {
  forgotSendBtn.addEventListener("click", e => {
    const email = document.querySelector(".send__Email").value;
    sendToken(email);
  });
}

if (resetBtn) {
  resetBtn.addEventListener("submit", e => {
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    resetToken(password, passwordConfirm);
  });
}
if (userDataForm) {
  userDataForm.addEventListener("submit", e => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);

    updateSettings(form, "data");
  });
}
if (userAllDataForm) {
  userAllDataForm.addEventListener("submit", e => {
    e.preventDefault();
    const form = new FormData();
    const id = document.getElementById("id").value;
    form.append("id", document.getElementById("id").value);
    form.append("role", document.getElementById("role").value);
    form.append("name", document.getElementById("name").value);
    form.append("surname", document.getElementById("surname").value);
    form.append("email", document.getElementById("email").value);
    updateAllSettings(form, "users", id);
  });
}
if (cardAllDataForm) {
  cardAllDataForm.addEventListener("submit", e => {
    e.preventDefault();
    const form = new FormData();
    const id = document.getElementById("id").value;
    form.append("id", document.getElementById("id").value);
    form.append("name", document.getElementById("name").value);
    form.append("price", document.getElementById("price").value);
    form.append(
      "priceDiscount",
      document.getElementById("priceDiscount").value
    );
    form.append("category", document.getElementById("category").value);
    updateAllSettings(form, "cards", id);
  });
}
if (createNewDataForm) {
  createNewDataForm.addEventListener("submit", e => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("image", document.getElementById("image").files[0]);
    form.append("price", document.getElementById("price").value);
    form.append("category", document.getElementById("category").value);
    form.append(
      "priceDiscount",
      document.getElementById("priceDiscount").value
    );
    createNewCard(form);
  });
}
if (userPasswordForm) {
  userPasswordForm.addEventListener("submit", async e => {
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Yenilənir...";

    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      "password"
    );

    document.querySelector(".btn--save-password").textContent = "Yadda saxla";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
  });
}
for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", function () {
    deleteUser(this.id);
  });
}
for (let i = 0; i < deleteBtnCard.length; i++) {
  deleteBtnCard[i].addEventListener("click", function () {
    deleteCard(this.id);
  });
}

// Shopping cart
let shoppingCart = (function () {
  let cart = [];
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }
  function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }
  function loadCart() {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
  }
  if (localStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  let obj = {};
  obj.addItemToCart = function (name, price, count) {
    for (let i in cart) {
      if (cart[i].name === name) {
        cart[i].count++;
        saveCart();
        return;
      }
    }
    let item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  };
  obj.setCountForItem = function (name, count) {
    for (let i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  obj.removeItemFromCart = function (name) {
    for (let item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  };
  obj.removeItemFromCartAll = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  };
  obj.clearCart = function () {
    cart = [];
    saveCart();
  };
  obj.totalCount = function () {
    let totalCount = 0;
    for (let item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  };
  obj.totalCart = function () {
    let totalCart = 0;
    for (let item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2)) + "₼";
  };
  obj.listCart = function () {
    let cartCopy = [];
    for (let i in cart) {
      let item = cart[i];
      let itemCopy = {};
      for (let p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy);
    }
    return cartCopy;
  };
  return obj;
})();
for (let i = 0; i < basketCount.length; i++) {
  basketCount[i].addEventListener("click", function () {
    let name = this.parentElement.parentElement.childNodes[0].textContent;
    let price = this.parentElement.parentElement.childNodes[1].textContent;
    price = price.slice(0, price.length - 1);
    shoppingCart.addItemToCart(name, price, 1);
    displayCard();
  });
}
for (let i = 0; i < basketCountDisco.length; i++) {
  basketCountDisco[i].addEventListener("click", function () {
    let name = this.parentElement.parentElement.childNodes[0].textContent;
    let priceDiscount =
      this.parentElement.parentElement.childNodes[2].textContent;
    priceDiscount = priceDiscount.slice(0, priceDiscount.length - 1);
    shoppingCart.addItemToCart(name, priceDiscount, 1);
    displayCard();
  });
}
function displayCard() {
  var cardArray = shoppingCart.listCart();
  var output = "";
  for (var i in cardArray) {
    output +=
      "<tr>" +
      "<td>" +
      cardArray[i].name +
      "</td>" +
      "<td>" +
      cardArray[i].price +
      "</td>" +
      "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name='" +
      cardArray[i].name +
      "' data-price=" +
      cardArray[i].price +
      ">-</button>" +
      "<input type='number' class='item-count form-control' data-name='" +
      cardArray[i].name +
      "' value='" +
      cardArray[i].count +
      "'>" +
      "<button class='plus-item btn btn-success input-group-addon' data-name='" +
      cardArray[i].name +
      "' data-price=" +
      cardArray[i].price +
      ">+</button></div></td>" +
      "<td>" +
      cardArray[i].total +
      "</td>" +
      "<td><button class='delete-item btn btn-danger' data-name='" +
      cardArray[i].name +
      "'>X</button></td>" +
      "</tr>" +
      "<tr>" +
      "<td>" +
      "</tr>";
  }
  orders.innerHTML = output;
  $(".total-cart").html(shoppingCart.totalCart);
  $("#count").html(shoppingCart.totalCount);
}
$(".orders").on("click", ".delete-item", function (event) {
  var name = $(this).data("name");
  shoppingCart.removeItemFromCartAll(name);
  displayCard();
});
$(".orders").on("click", ".minus-item", function (event) {
  var name = $(this).data("name");
  shoppingCart.removeItemFromCart(name);
  displayCard();
});
$(".orders").on("click", ".plus-item", function (event) {
  var name = $(this).data("name");
  shoppingCart.addItemToCart(name);
  displayCard();
});
$(".orders").on("change", ".item-count", function () {
  let name = $(this).data("name");
  let count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCard();
});
$(".orderNow").on("click", function () {
  successAlert("success", "Sifarişiniz uğurla qeyd edildi");
});
displayCard();
// Simple DOM events
const hamburger = document.querySelector(".menu-bar");
const header = document.querySelector(".header ul");
const headerBar = document.querySelector(".header-bar");
hamburger.addEventListener("click", e => {
  headerBar.classList.toggle("header-bar-end");
});
// Slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");
let curSlide = 0;
const maxSlide = slides.length;
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();
const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach(dot => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};
activateDot(0);
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};
let interval;
function slideShow() {
  interval = setInterval(nextSlide, 3000);
}
slideShow();
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlide();
  e.key === "ArrowRight" && nextSlide();
});
dotContainer.addEventListener("click", function (e) {
  const clicked = e.target;
  if (clicked.classList.contains("dots__dot")) {
    const { slide } = clicked.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
