var MenuItems = document.getElementById("MenuItems");
MenuItems.style.maxHeight = "0px";

function menutoggle() {
    if (MenuItems.style.maxHeight == "0px") {
        MenuItems.style.maxHeight = "200px";
    }
    else {
        MenuItems.style.maxHeight = "0px";
    }
}

var LoginForm = document.querySelector("#Login")
var RegForm = document.getElementById("Reg")
var Indicator = document.getElementById("indicator")

function register() {
    LoginForm.style.visibility = "hidden"
    RegForm.style.visibility = "visible"
    Indicator.style.transform = "translateX(100px)"
}

function login() {
    LoginForm.style.visibility = "visible"
    RegForm.style.visibility = "hidden"
    Indicator.style.transform = "translateX(0px)"
}


let products = [
    {
        name: 'Casual Black Tee',
        tag: 'p1',
        price: 25,
        inCart: 0
    },
    {
        name: 'Tuxedo',
        tag: 'p2',
        price: 200,
        inCart: 0
    },
    {
        name: 'Leather Jacket',
        tag: 'p3',
        price: 60,
        inCart: 0
    },
    {
        name: 'Rado Watch',
        tag: 'p4',
        price: 40,
        inCart: 0
    },
    {
        name: 'Timex Watch',
        tag: 'p5',
        price: 30,
        inCart: 0
    },
    {
        name: 'Bentley Cologne',
        tag: 'p6',
        price: 45,
        inCart: 0
    },
    {
        name: 'Nike Shoes and Socks Pair',
        tag: 'p7',
        price: 35,
        inCart: 0
    },
    {
        name: 'Casual Canvas Shoes',
        tag: 'p8',
        price: 20,
        inCart: 0
    },
    {
        name: 'Nike Air Sneakers',
        tag: 'p9',
        price: 30,
        inCart: 0
    }
];

let carts = document.querySelectorAll('.add-cart');

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onloadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.getElementById('cart-products').innerText = productNumbers;
    }
}

function cartNumbers(product) {
    // console.log("The product clicked is ", product)

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.getElementById('cart-products').innerText = productNumbers + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.getElementById('cart-products').innerText = 1;
    }

    setItems(product)
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    // console.log("My cart items are ", cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }

        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product){
    // console.log("The product price is ", product.price);
    let cartCost = localStorage.getItem('totalCost');

    // console.log("My cart cost is ", cartCost);
    // console.log(typeof cartCost);
    
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    }else{
        localStorage.setItem('totalCost', product.price);
    }

}


function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products")
    let finalCost = document.querySelector(".finalSum")
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems)
    if(cartItems && productContainer && finalCost){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="cart-info">
                <img src="./images/${item.tag}.jpg">
                <p><span>${item.name}</span></p>
            </div>
            <div class="price">$${item.price}.00</div>
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="subtotal">
                $${item.inCart * item.price}.00
            </div>
            `
        });

        finalCost.innerHTML += `
        $${cartCost}
        `

    }
}

function clrcart(){
    // console.log("Clearing the cart")
    localStorage.clear()
    location.reload()
}

onloadCartNumbers();

displayCart()