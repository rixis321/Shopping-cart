let shop = document.getElementById("shop");

let shopItemsData = [
  {
    id: "ok",
    name: "Blue shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
    img: "images/image-1.jpg",
  },
  {
    id: "o543k",
    name: "Black shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
    img: "images/image-2.jpg",
  },
  {
    id: "ok123",
    name: "White shirt",
    price: 60,
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
    img: "images/image-5.jpg",
  },
  {
    id: "ok65",
    name: "Black shirt",
    price: 30,
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
    img: "images/image-6.jpg",
  },
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return ` <div id=product-id-${id} class="item">
        <img width="220" height="300" src=${img} alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>${price}</h2>
                <div class="buttons">
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    <div id="${id}" class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                </div>
            </div>
        </div>
    </div>`;
    })
    .join(""));
};

generateShop();

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
  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedItem.id);
};
let decrement = (id) => {
  let selectedItem = id;

  let searchForItem = basket.find((x) => x.id === selectedItem.id);
  if (searchForItem.item === 0) return;
  else {
    searchForItem.item -= 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  //console.log(basket);
  update(selectedItem.id);
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");

  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
