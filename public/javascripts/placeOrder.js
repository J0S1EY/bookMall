
$("#checkOutForm").submit((e) => {
    e.preventDefault();
    $.ajax({
        url: "/place-order",
        method: "post",
        data: $('#checkOutForm').serialize(),
        success: (response) => {
            alert(response)
        }

    })

})
