// (function () {
//     const quantityContainer = document.querySelector(".quantity");
//     const minusBtn = quantityContainer.querySelector(".minus");
//     const plusBtn = quantityContainer.querySelector(".plus");
//     const inputBox = quantityContainer.querySelector(".input-box");

// const { response } = require("express");

//     updateButtonStates();

//     quantityContainer.addEventListener("click", handleButtonClick);
//     inputBox.addEventListener("input", handleQuantityChange);

//     function updateButtonStates() {
//         const value = parseInt(inputBox.value);
//         minusBtn.disabled = value <= 1;
//         plusBtn.disabled = value >= parseInt(inputBox.max);
//     }

//     function handleButtonClick(event) {
//         if (event.target.classList.contains("minus")) {
//             decreaseValue();
//         } else if (event.target.classList.contains("plus")) {
//             increaseValue();
//         }
//     }

//     function decreaseValue() {
//         let value = parseInt(inputBox.value);
//         value = isNaN(value) ? 1 : Math.max(value - 1, 1);
//         inputBox.value = value;
//         updateButtonStates();
//         handleQuantityChange();
//     }

//     function increaseValue() {
//         let value = parseInt(inputBox.value);
//         value = isNaN(value) ? 1 : Math.min(value + 1, parseInt(inputBox.max));
//         inputBox.value = value;
//         updateButtonStates();
//         handleQuantityChange();
//     }

//     function handleQuantityChange() {
//         let value = parseInt(inputBox.value);
//         value = isNaN(value) ? 1 : value;

//         // Execute your code here based on the updated quantity value
//         console.log("Quantity changed:", value);
//     }
// })();

function changeQuantity(userId, price, cartId, proId, count) {
    let quantity = parseInt(document.getElementById(proId).innerHTML);
    $.ajax({
        url: "/changeCartQuantity",
        method: "post",
        data: {
            cartId: cartId,
            proId: proId,
            count: count,
            quantity: quantity,
            userId: userId
        },
        success: (response) => {
            document.getElementById("totalValue").innerHTML = response.totalValue;
            if (response.removeProduct) {
                alert("Product remove from cart")
                location.reload();
                document.getElementById("cartCount").innerHTML = response.cartCount;
            } else {
                document.getElementById(proId).innerHTML = quantity + count;
                document.getElementById(proId + "price").innerHTML = (quantity + count) * price;
              
            }
        }
    });
}

