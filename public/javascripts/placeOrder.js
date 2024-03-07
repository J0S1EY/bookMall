
$("#checkOutForm").submit((e) => {
    e.preventDefault();
    $.ajax({
        url: "/place-order",
        method: "post",
        data: $('#checkOutForm').serialize(),
    }).done((response) => {
        handleOrderResponse(response);
    }).fail((xhr, status, error) => {
        console.log("Error placing order:", error);
        alert("Failed to place order. Please try again.");
    });
});

function handleOrderResponse(response) {
    alert(response.message);
    if (response.codSuccess) {
        window.location.href = "/order-history";
    } else {
        razorpayPayment(response.order);
    }
}

function razorpayPayment(order) {
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
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
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
        method: "post",
        data: {
            order: order,
            payment: payment
        }
    }).done((response) => {
        console.log("verifyPayment", response);
        if (response.success) {
            window.location.href = "/order-history";
        } else {
            alert("Payment verification failed. Please contact support.");
        }
    }).fail((xhr, status, error) => {
        console.log("Error verifying payment:", error);
        alert("Failed to verify payment. Please try again.");
    });
}
