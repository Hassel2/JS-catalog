var products = [
	{
		id: 0,
		title:"KitKat",
		price:22,
		count:100,
	},
	{
		id:1,
		title:"CornyBig",
		price:50,
		count:100,
	},
	{
		id:2,
		title:"Snickers",
		price:40,
		count:100,
	},
	{
		id:3,
		title:"Kick",
		price:15,
		count:100,
	}
	]

var cart = [];
var sum = 0;

function sumProducts() {
	var sum = 0;

	for (item of products) {
		sum+=item.count*item.price;
	}
	console.log(sum);
}

function showAllProducts() {
	var catalog = document.getElementById("catalog");
	catalog.innerHTML = "<p class=title>Catalog</p>";
	
	for (item of products) {
		var product = document.createElement("div");
		product.className = "product";
		
		var pic = document.createElement("img");
		pic.setAttribute("src","img/" + item.title + ".webp")
		product.appendChild(pic);

		var t = document.createElement("h3");
		t.innerText = item.title;
		product.appendChild(t);

		//var p = document.createElement("p");
		//p.innerText = "price: " + item.price + "$";
		//p.className = "price";
		//product.appendChild(p);

		var c = document.createElement("p");
		c.innerText = "count: " + item.count;
		product.appendChild(c);

		var button = document.createElement("button");
		button.innerText = item.price + "$";
		button.onclick = addProduct;
		button.setAttribute("id", item.id);
		product.appendChild(button);

		catalog.appendChild(product);
	}
}

function addProduct(event)	{
	var i = event.target.id;
	if (products[i].count != 0) {
		item = cart.find(el => el.id == i)
		if (item == undefined) {
			var newProduct = {
				id: products[i].id,
				title: products[i].title,
				price: products[i].price,
				count: 1,
			}
			newProduct.count = 1;
			cart.push(newProduct);
		} else {
			cart[cart.indexOf(item)].count += 1;
		}
		sum += products[i].price;
		products[i].count -= 1;
		showCart();
		showAllProducts();
	}
}

function returnProduct(event) {
	var i = event.target.id;
	item = cart.find(el => el.id == i)
	sum -= cart[cart.indexOf(item)].price;
	if (cart[cart.indexOf(item)].count == 1) {
		cart.splice(cart.indexOf(item), 1);
	} else {
		cart[cart.indexOf(item)].count -= 1;	
	}
	products[i].count += 1;
	showCart();
	showAllProducts();
}

function returnAll() {
	for (item of cart) {
		products[item.id].count += item.count;
	}
	cart = []
	sum = 0;
	showCart();
	showAllProducts();
}

function showCart() {
	var c = document.getElementById("cart");
	c.innerHTML = "<p class=title>MyCart</p>";

	for (item of cart) {
		var product = document.createElement("div");
		product.className = "product";

		var pic = document.createElement("img");
		pic.setAttribute("src", item.title + ".webp")
		product.appendChild(pic);

		var title = document.createElement("h3");
		title.innerText = item.title;
		product.appendChild(title);

		var count = document.createElement("p");
		count.innerText = "count: " + item.count;
		product.appendChild(count);

		var button = document.createElement("button");
		button.innerText = item.price * item.count + "$";
		button.onclick = returnProduct;
		button.setAttribute("id", item.id);
		product.appendChild(button);
	
		c.appendChild(product);
	}

	if (sum != 0) {
		var total = document.createElement("h3");
		total.innerText = "Total: " + sum + "$";
		c.appendChild(total);

		var returnAllb = document.createElement("button");
		returnAllb.innerText = "Return All";
		returnAllb.onclick = returnAll;
		c.appendChild(returnAllb)
	}
}
