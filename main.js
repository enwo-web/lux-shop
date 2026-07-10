const products = [

    {
        id:1,
        name:"iPhone 15 Pro Max",
        category:"گوشی",
        price:1199,
        image:"https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=600"
    },


    {
        id:2,
        name:"Sony WH-1000XM5",
        category:"هدفون",
        price:349,
        image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600"
    },


    {
        id:3,
        name:"MacBook Pro M3",
        category:"لپتاپ",
        price:1999,
        image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600"
    },


    {
        id:4,
        name:"ASUS ROG Gaming",
        category:"گیمینگ",
        price:1599,
        image:"https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=600"
    },


    {
        id:5,
        name:"Galaxy Watch Pro",
        category:"ساعت",
        price:449,
        image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600"
    },


    {
        id:6,
        name:"4K Ultra Monitor",
        category:"مانیتور",
        price:699,
        image:"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600"
    }

];






// ================================
// RENDER PRODUCTS
// ================================


const shopProducts =
document.getElementById("shopProducts");




function renderProducts(list){


    shopProducts.innerHTML="";



    list.forEach(product=>{


        shopProducts.innerHTML += `


        <article class="product-card">


            <div class="product-image">


                <button class="wishlist">
                    ♡
                </button>


                <img 
                src="${product.image}"
                alt="${product.name}">


            </div>



            <div class="product-info">


                <small>
                ${product.category}
                </small>


                <h3>
                ${product.name}
                </h3>



                <div class="rating">

                ⭐⭐⭐⭐⭐

                </div>



                <div class="product-bottom">


                    <strong>
                    $${product.price}
                    </strong>


                    <button 
                    class="add-cart"
                    onclick="addToCart(${product.id})">

                    +

                    </button>


                </div>


            </div>


        </article>


        `;


    });


}





renderProducts(products);




const filterButtons =
document.querySelectorAll(
".filter-box button"
);



filterButtons.forEach(btn=>{


btn.addEventListener("click",()=>{


    const category =
    btn.dataset.category;



    if(category==="all"){


        renderProducts(products);


    }

    else{


        const result =
        products.filter(product=>

        product.category===category

        );


        renderProducts(result);


    }


});


});

// CATEGORY CARDS CLICK


const categoryCards =
document.querySelectorAll(
".category-card"
);



categoryCards.forEach(card=>{


card.addEventListener("click",()=>{


    const category =
    card.dataset.category;



    const result =
    products.filter(product=>

    product.category===category

    );



    renderProducts(result);



    document
    .getElementById("shop")
    .scrollIntoView({

        behavior:"smooth"

    });



});


});





// CART



let cart =
JSON.parse(localStorage.getItem("cart"))
|| [];






function addToCart(id){



    const product =
    products.find(item=>item.id===id);



    const exist =
    cart.find(item=>item.id===id);



    if(exist){


        exist.qty++;


    }

    else{


        cart.push({

            ...product,

            qty:1

        });


    }




    saveCart();


    renderCart();



    showToast(
        "محصول با موفقیت به سبد خرید اضافه شد ✅"
    );



}







function saveCart(){


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


}







const cartItems =
document.querySelector(".cart-items");


const cartTotal =
document.querySelector(".cart-footer strong");




function renderCart(){


    cartItems.innerHTML="";


    let total=0;



    if(cart.length===0){


        cartItems.innerHTML=
        "<p>سبد خرید خالی است</p>";


    }




    cart.forEach(item=>{


        total += item.price * item.qty;



        cartItems.innerHTML += `


        <div class="cart-item">


            <img src="${item.image}">



            <div class="cart-item-info">


                <h4>
                ${item.name}
                </h4>



                <div class="cart-price">

                $${item.price}

                </div>



                <div class="qty-box">


                <button onclick="increaseQty(${item.id})">
                +
                </button>



                <span>
                ${item.qty}
                </span>



                <button onclick="decreaseQty(${item.id})">
                -
                </button>



                <button 
                class="delete-cart"
                onclick="removeCart(${item.id})">

                🗑

                </button>


                </div>



            </div>



        </div>


        `;


    });



    cartTotal.innerHTML =
    `جمع کل: $${total}`;



    document.querySelector(".cart-count")
    .textContent = cart.length;



}

function increaseQty(id){


let item =
cart.find(p=>p.id===id);


item.qty++;


saveCart();

renderCart();


}




function decreaseQty(id){


let item =
cart.find(p=>p.id===id);



if(item.qty>1){

item.qty--;

}

else{

removeCart(id);

}



saveCart();

renderCart();


}





function removeCart(id){


cart =
cart.filter(item=>item.id!==id);


saveCart();


renderCart();


showToast(
"محصول حذف شد 🗑"
);


}




renderCart();

// CART OPEN CLOSE



document
.getElementById("cartBtn")
.addEventListener("click",()=>{


document
.getElementById("cartPanel")
.classList.add("active");


});



document
.getElementById("closeCart")
.addEventListener("click",()=>{


document
.getElementById("cartPanel")
.classList.remove("active");


});

// DARK MODE


document
.getElementById("themeBtn")
.addEventListener("click",()=>{


document.body.classList.toggle("dark");


});

// FAQ


document
.querySelectorAll(".faq-item button")
.forEach(btn=>{


btn.onclick=()=>{


btn.parentElement
.classList.toggle("active");


};


});



// TOAST


function showToast(text){


const toast =
document.createElement("div");


toast.className="toast";


toast.innerHTML=text;


document.body.appendChild(toast);



setTimeout(()=>{


toast.classList.add("show");


},100);




setTimeout(()=>{


toast.remove();


},2500);



}





// MOBILE MENU


const mobileBtn = 
document.getElementById("mobileBtn");


const navMenu =
document.querySelector(".nav-menu");



if(mobileBtn && navMenu){


mobileBtn.addEventListener("click",()=>{


    navMenu.classList.toggle("active");


});



}


// Close menu when clicking links


document
.querySelectorAll(".nav-menu a")
.forEach(link=>{


    link.addEventListener("click",()=>{


        navMenu.classList.remove("active");


    });


});