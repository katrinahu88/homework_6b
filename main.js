//Image changes when glaze type is selected
var cart;

function chooseglaze() {
	var x = document.getElementById('glaze').value;
	if (x == "none") {
		document.getElementById('cinnaroll').src= 'images/noglaze.jpg';
	}
	if (x == "sugar milk") {
		document.getElementById('cinnaroll').src= 'images/originalroll.jpg';
	}
	if (x == "vanilla milk") {
		document.getElementById('cinnaroll').src= 'images/vanillamilkglaze.jpg';
	}
	if  (x == "double chocolate") {
		document.getElementById('cinnaroll').src= 'images/chocolateglaze.jpg';
	}
}

function chooseglaze2(glaze) {
	if (glaze == "NONE") {
		return 'images/noglaze.jpg';
	}
	else if (glaze == "SUGAR MILK") {
		return 'images/originalroll.jpg';
	}
	else if (glaze == "VANILLA MILK") {
		return 'images/vanillamilkglaze.jpg';
	}
	else if  (glaze == "DOUBLE CHOCOLATE") {
		return 'images/chocolateglaze.jpg';
	}
	else {
		return 'images/noglaze.jpg';
	}

}

//Total price changes when quantity is selected
function pricechange() {
	var x = document.getElementById('quantity').value;
	if (x == "1") {
		document.getElementById('price').innerHTML= "Total: $2.99";
	}
	if (x == "3") {
		document.getElementById('price').innerHTML= "Total: $8.97";
	}
	if (x == "6") {
		document.getElementById('price').innerHTML= "Total: $17.94";
	}
	if  (x == "12") {
		document.getElementById('price').innerHTML= "Total: $35.88";
	} 
}

//Quantity in cart is updated when "Add to Cart" button pressed
function addtocart() {
	const glazeContainer = document.getElementById("glaze")
	const glaze = glazeContainer.options[glazeContainer.selectedIndex].innerHTML;
	const quantityContainer = document.getElementById("quantity")
	const quantity = quantityContainer.options[quantityContainer.selectedIndex].innerHTML;
	const newItem = {glaze, quantity};
	const stored = localStorage.getItem("cart");

	if (stored === null) {
		localStorage.setItem("cart", JSON.stringify([newItem]));
	}
	else {
		cart = JSON.parse(stored);
		cart.push(newItem);
		localStorage.setItem("cart", JSON.stringify(cart));
	}
	document.getElementById('itemCount').innerHTML = "Cart (" + cart.length + ")";
	console.log(length);

}

//Removes item from cart
function removeItem(index) {
	cart.splice(index, 1);
	localStorage.setItem("cart", JSON.stringify(cart));
	createCart();
	document.getElementById('itemCount').innerHTML = "Cart (" + cart.length + ")";
}

//Adds cart items from local storage to cart page
function createCart() {
	const cartHTML = document.getElementById('cartItem');
	if (cartHTML !== null) {
		const stored = localStorage.getItem('cart');
		if (stored === null)
			cart = [];
		else 
			cart = JSON.parse(stored);

		if (cart.length === 0) {
			document.getElementById('emptyCartText').innerHTML = 'Your cart is empty! Browse our menu to add items to your cart! :)';
		}


		cartHTML.innerHTML = cart.map((item, i) => '<div class="flex-containerCart"><section class="cartItemImage">'
	      +'<img src="' + chooseglaze2(item.glaze) + '" alt="Original Cinnamon Roll" width="250"/>'
	    +'</section>'
	    +'<section class="cartItemDescription">'
	      +'<h2>Original Cinnamon Roll</h2>'
	      +'<p>Glaze: ' + item.glaze + '</p>'
	      +'<p>Quantity: ' + item.quantity + '</p>'
	      +'<input onclick="removeItem(' + i +')" type="submit" value="Remove" class="removeButton">'
	    +'</section></div>');
	    getCosts();
	}
}

//Calculates the subtotal,tax, and total cost of items in the cart
function getCosts() {
	let subtotal = 0;
	for (let i = 0; i < cart.length; i++) {
		subtotal += cart[i].quantity * 2.99;
	}
	const tax = 0.15 * subtotal;
	const total = tax + subtotal;
	document.getElementById('subtotal').innerHTML = "$" + subtotal.toFixed(2);
	document.getElementById('tax').innerHTML = "$" + tax.toFixed(2);
	document.getElementById('total').innerHTML = "$" + total.toFixed(2);
}

window.onload = createCart;