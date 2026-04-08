

// CART
let cart = JSON.parse(localStorage.getItem("cart")) || []

function addToCart(name, price, image){
    let product = cart.find(p => p.name === name)

    if(product){ 
        product.qty++ 
    } else { 
        cart.push({
            name: name,
            price: parseFloat(price),
            image: image,
            qty: 1
        }) 
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    updateCartCount()
    alert("Product added to cart")
}

function updateCartCount(){
    let total = cart.reduce((acc,p)=> acc + p.qty,0)
    let count = document.getElementById("cart-count")
    if(count){ count.innerText = total }
}

// SHOW DETAILS
function showDetails(name, price, images, desc){

    let p = document.getElementById("products")
    let displayImages = images
    let mainImage = displayImages[0]

    let thumbnails = displayImages.map(img => 
        `<img src="${img}" style="width:80px;cursor:pointer" onclick="changeImage('${img}')">`
    ).join("")

    p.innerHTML = `
    <div class="product-details">
        <div>
            <img id="main-img" src="${mainImage}" class="detail-img">
            <div id="thumbs">${thumbnails}</div>
        </div>

        <div class="info">
            <h1>${name}</h1>
            <p class="price">$${price}</p>
            <p>${desc}</p>
            
            <button onclick='addToCartWithColor("${name}",${price},"${mainImage}")'>Add to cart</button>
            <button onclick="location.reload()">⬅ Back</button>
        </div>
    </div>
    `

    window.currentImages = images
}

// LOAD PRODUCTS FROM JSON
async function loadProducts(){

    let container = document.getElementById("products")
    if(!container) return

    let currentPage = window.location.pathname.split("/").pop()

    let res = await fetch("products.json")
    let data = await res.json()

    let filtered = data.filter(p => p.category === currentPage)

    container.innerHTML = ""

    if(filtered.length === 0){
        container.innerHTML = "<p>No products yet...</p>"
        return
    }

    filtered.forEach(p => {

        let div = document.createElement("div")
        div.className = "product"

        div.innerHTML = `
            <img src="${p.images[0]}">
            <h3>${p.name}</h3>
            <p>${p.price} DH</p>
        `

        div.onclick = () => {
            showDetails(p.name, p.price, p.images, p.desc)
        }

        container.appendChild(div)
    })
}


// SEARCH
async function goSearch(){

    let word = document.getElementById("search").value.toLowerCase()

    let res = await fetch("products.json")
    let data = await res.json()

    let found = data.find(p => p.name.toLowerCase().includes(word))

    if(found){
        window.location.href = found.category
    } else {
        alert("Product not found")
    }
}


// SUGGESTIONS
async function showSuggestions(){

    let input = document.getElementById("search").value.toLowerCase()
    let box = document.getElementById("suggestions")

    if(!box) return

    box.innerHTML = ""

    if(input === "") return

    let res = await fetch("products.json")
    let data = await res.json()

    data.forEach(product => {
        if(product.name.toLowerCase().includes(input)){
            box.innerHTML += `
            <div class="suggestion-item"
            onclick="selectProduct('${product.category}')">
                ${product.name}
            </div>`
        }
    })
}
function selectProduct(page){
    document.getElementById("suggestions").innerHTML = ""
    window.location.href = page
}


// COLORS
function addToCartWithColor(name, price, image){

    let cart = JSON.parse(localStorage.getItem("cart")) || []

    let product = cart.find(p => p.name === name)

    if(product){
        product.qty++
    }else{
        cart.push({
            name,
            price,
            image,
            qty: 1
        })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    alert("Added to cart")
}

function selectColor(color){
    let images = window.currentImages[color]

    if(!images || images.length === 0){
        alert("No images for this color")
        return
    }

    document.getElementById("main-img").src = images[0]

    let thumbs = images.map(img => 
        `<img src="${img}" style="width:80px;cursor:pointer" onclick="changeImage('${img}')">`
    ).join("")

    document.getElementById("thumbs").innerHTML = thumbs
}

function changeImage(src){
    document.getElementById("main-img").src = src
}
loadProducts()