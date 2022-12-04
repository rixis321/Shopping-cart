let basket = JSON.parse(localStorage.getItem("data")) || [];
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");

  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCardItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        let { name, img, price } = search;
        return `
      <div class="cart-item">
     <img width="220" height="160"  src=${img} alt="">
     <div class="details">
     <div class="title-price-x">
     <h4 class="title-price">
     <p>${name}</p>
     <p class="cart-item-price"> ${price}$</p>
</h4>
     <i  onclick="removeItem(${id})" class="bi bi-x-lg"></i>

</div>
     
    <div class="buttons">
     <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
     <div id="${id}" class="quantity">${item}</div>
      <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            
     </div>
     
     <h3>${item * search.price}$</h3>
</div>
</div>
       `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="index.html"> 
        <button class="homeButton">Back to home</button>
        </a>
    `;
  }
};
generateCardItems();
let increment = (id) => {
  let selectedItem = id;

  let searchForItem = basket.find((x) => x.id === selectedItem.id);
  if (searchForItem === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    searchForItem.item += 1;
  }
  generateCardItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;

  let searchForItem = basket.find((x) => x.id === selectedItem.id);
  if (searchForItem === undefined) return;
  else if (searchForItem.item === 0) return;
  else {
    searchForItem.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);

  generateCardItems();

  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCardItems();
  totalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    //console.log(amount);
    label.innerHTML = `
    <h2>Total Bill: ${amount}$ </h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear cart</button>
    `;
  } else return;
};

let clearCart = () => {
  basket = [];
  generateCardItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};
totalAmount();
