
$("#checkOutForm").submit((e) => {
    e.preventDefault();
    $.ajax({
        url: "/place-order",
        method: "post",
        data: $('#checkOutForm').serialize(),
    }).done((response) => {
        handleOrderResponse(response, response.orderData
        );
    }).fail((xhr, status, error) => {
        console.log("Error placing order:", error);
        alert("Failed to place order. Please try again.");
    });
});

function handleOrderResponse(response, orderData) {
    let razorPayment = response.razorData
    alert(razorPayment.message);
    if (response.codSuccess) {
        window.location.href = "/order-history";
    } else {
        razorpayPayment(razorPayment.order, orderData);
    }
}

function razorpayPayment(order, orderData) {
    var options = {
        "key": "rzp_test_1wfC342gQGFoVg",
        "amount": order.amount, // Convert amount to paise if it's in rupees
        "currency": "INR",
        "name": "BookMall",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": order.id,
        "handler": function (response) {
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature);
            verifyPayment(order, response);
            window.location.href = "/order-history";
        },
        "prefill": {
            "name": orderData.firstName + orderData.lastName,
            "email": orderData.email,
            "contact": orderData.tel
        },
        "notes": {
            "address": orderData.streetName + orderData.apartment + orderData.city
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.error', function (error) {
        console.log("Razorpay payment error:", error);
        alert("Failed to initiate Razorpay payment. Please try again.");
    });
    rzp1.open();
}

function verifyPayment(order, payment) {
    $.ajax({
        url: "/verify_payment",
        method: "POST",
        data: {
            order: order,
            payment: payment
        },
        success: function (response) {
            if (response.status) {
                alert("Payment successful");
                location.href = "/";
            } else {
                alert("Payment Failed ");
            }
        },
        error: function (xhr, status, error) {
            console.error('Error verifying payment:', error);
            alert("Error verifying payment. Please try again later.");
        }
    });
}

