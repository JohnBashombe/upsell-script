// Function to get query parameters from the script's URL
function getQueryParam(param) {
    const scripts = document.getElementsByTagName("script");
    for (let script of scripts) {
        if (script.src.includes("upsell-script.js")) { // Adjust if needed
            const urlParams = new URL(script.src).searchParams;
            return urlParams.get(param);
        }
    }
    return null;
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("Loading the new script: ", { path: window.location.pathname, host: window.location.hostname });

    if (window.location.pathname.includes("/cart.php") && window.location.hostname === "testshop-h8.mybigcommerce.com") {
        console.log("This message should be displayed in testing");

        const clientId = getQueryParam("client_id");

        setTimeout(() => {
            console.log("The client id is: ", { clientId });
            let cartContainer = document.querySelector(".page-content");

            if (cartContainer) {
                let upsellDiv = document.createElement("div");
                upsellDiv.innerHTML = `
                    <div class="upsell-container">
                        <h3 class="page-heading">Upgrade Your Order!</h3>
                        <p class="cart-summary">Get 10% off if you add <strong>Product XYZ</strong> to your cart!</p>
                        <button id="upsell-btn" class="button button--primary">
                            Add to Cart
                        </button>
                    </div>
                `;

                cartContainer.appendChild(upsellDiv);

                document.getElementById("upsell-btn").addEventListener("click", function () {
                    console.log("Adding upsell product to cart...");
                    fetch(`/cart.php?action=add&product_id=284`, { method: "POST" })
                        .then(response => {
                            if (response.ok) {
                                alert("Product added to cart!");
                                window.location.reload();
                            }
                        })
                        .catch(error => console.error("Error adding product:", error));
                });
            }
        }, 1000);
    }
});
