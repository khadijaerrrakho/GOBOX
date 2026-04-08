let cart = JSON.parse(localStorage.getItem("cart")) || []

let container = document.getElementById("cart-items")
let totalElement = document.getElementById("total")

function displayCart(){

container.innerHTML = ""
let total = 0

cart.forEach((product, index) => {

let price = parseFloat(product.price) // مهم
let subtotal = price * product.qty
total += subtotal

container.innerHTML += `

<div class="cart-item">

<img src="${product.image}">

<div class="item-info">
<h3>${product.name}</h3>
<p>$${price}</p>

<div class="quantity">
<button onclick="decrease(${index})">-</button>
<span>${product.qty}</span>
<button onclick="increase(${index})">+</button>
</div>

</div>

<button class="remove-btn" onclick="removeItem(${index})">X</button>

</div>

`

})

totalElement.innerText = "$" + total

localStorage.setItem("cart", JSON.stringify(cart))

}

function increase(index){
cart[index].qty++
displayCart()
}

function decrease(index){
if(cart[index].qty > 1){
cart[index].qty--
}else{
cart.splice(index,1)
}
displayCart()
}

function removeItem(index){
cart.splice(index,1)
displayCart()
}

function orderWhatsApp(){

let message = "🛒 New Order\n\n"

let total = 0

cart.forEach(product => {

let subtotal = product.price * product.qty
total += subtotal

message += `• ${product.name} x${product.qty} = $${subtotal}\n`

})

message += `\n💰 Total: $${total}`

// encoding صحيح
let url = "https://api.whatsapp.com/send?phone=971555594938&text=" + encodeURIComponent(message)

window.open(url)

}
// load
displayCart()
// فتح popup
function openPopup(){

document.getElementById("orderPopup").style.display = "flex"

let box = document.getElementById("popup-products")
let totalBox = document.getElementById("popup-total")

box.innerHTML = ""
let total = 0

cart.forEach(p => {

let subtotal = p.price * p.qty
total += subtotal

box.innerHTML += `
<div class="popup-product">
<img src="${p.image}">
<div>
<p>${p.name}</p>
<p>x${p.qty} - $${subtotal}</p>
</div>
</div>
`
})

totalBox.innerText = "$" + total
}

// غلق popup
function closePopup(){
document.getElementById("orderPopup").style.display = "none"
}

// إرسال الطلب
function sendOrder(){

let name = document.getElementById("clientName").value
let phone = document.getElementById("clientPhone").value
let address = document.getElementById("clientAddress").value

if(!name || !phone || !address){
alert("Fill all fields")
return
}

let message = "🛒 New Order\n\n"
let total = 0

cart.forEach(p => {

let subtotal = p.price * p.qty
total += subtotal

message += `• ${p.name} x${p.qty} = $${subtotal}\n`
})

message += `\n👤 Name: ${name}`
message += `\n📞 Phone: ${phone}`
message += `\n📍 Address: ${address}`
message += `\n\n💰 Total: $${total}`

let url = `https://wa.me/971555594938?text=${encodeURIComponent(message)}`

window.location.href = url
}
function openPopup(){

document.getElementById("orderPopup").style.display = "flex"

let box = document.getElementById("popup-products")
let totalBox = document.getElementById("popup-total")

box.innerHTML = ""
let total = 0

cart.forEach(p => {

let subtotal = p.price * p.qty
total += subtotal

box.innerHTML += `
<div class="popup-product">
<img src="${p.image}">
<div>
<p><strong>${p.name}</strong></p>
<p>x${p.qty}</p>
<p>$${subtotal}</p>
</div>
</div>
`
})

totalBox.innerText = "$" + total
}

function closePopup(){
document.getElementById("orderPopup").style.display = "none"
}

