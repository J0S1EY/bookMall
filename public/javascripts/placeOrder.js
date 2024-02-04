$("#checkOutForm").submit((e) => {
    e.preventDefault();
    $.ajax({
        url: "/place-order",
        method: "post",
        data: $('#checkOutForm').serialize(),
        success: (response) => {
            alert(response.message);
            // console.log(response);

            if (response.success) {
                // Redirect to a success page
                window.location.href = "/";
            }
        },
        error: (error) => {
            // Handle error if needed
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        }
    });
});

