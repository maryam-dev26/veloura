let activeCategory = "all"
let searchQuery = ""
let sortOption = "default"

const productGrid = document.querySelector("#product-grid")
const searchInput = document.querySelector("#search-input")
const filterButtons = document.querySelectorAll(".filters button")
const sortSelect = document.querySelector("#sort-select")

const products = [
    {
        id: 1,
        name: "Leather Bag",
        category: "Bags",
        price: 1010,
        description: "A timeless leather bag for everyday elegance.",
        image: "assets/images/Bag.jpg",
        rating: 4.5
    },
    {
        id: 2,
        name: "Classic Blazer",
        category: "Clothing",
        price: 3250,
        description: "A tailored blazer designed for a polished and effortless look.",
        image: "assets/images/clothing.jpg",
        rating: 4.7
    },
    {
        id: 3,
        name: "Minimal Gold Earrings",
        category: "Jewelry",
        price: 890,
        description: "Simple and elegant earrings for everyday styling.",
        image: "assets/images/jewelry.jpg",
        rating: 4.6
    },
    {
        id: 4,
        name: "Classic Sneakers",
        category: "Shoes",
        price: 2490,
        description: "Comfortable everyday sneakers with a clean, versatile design.",
        image: "assets/images/shoes.jpg",
        rating: 4.8
    }
]


function createProductCard(product) {
    return `
        <article class="card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">৳ ${product.price}</p>
            <button>Add to Cart</button>
        </article>
    `
}

searchInput.addEventListener("input", () => {
     searchQuery = searchInput.value
     renderProducts(getFilteredProducts())
})

sortSelect.addEventListener("change", () => {
    sortOption = sortSelect.value
    renderProducts(getFilteredProducts())
})

function getFilteredProducts () {
    const filtered = products.filter(product => {
        const matchesCategory = activeCategory === "all" || product.category === activeCategory
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch

    })

    const sorted = [...filtered]
    if (sortOption === "price-low") {
        sorted.sort((a, b) => a.price - b.price)
    } else if (sortOption === "price-high") {
        sorted.sort((a, b) => b.price - a.price)
    } else if (sortOption === "name-az") {
        sorted.sort((a,b) => a.name.localeCompare(b.name)) 
    } else if (sortOption === "name-za") {
        sorted.sort((a, b) => b.name.localeCompare(a.name))
    }
       
    return sorted
}


filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        activeCategory = button.dataset.category

        filterButtons.forEach(btn => {
            btn.classList.remove("active")
    })
    button.classList.add("active")
        
        renderProducts(getFilteredProducts())
    })
})

function renderProducts(productList) {

    if(productList.length === 0) {
        productGrid.innerHTML = "<p class ='no-result'> No product found</p>"
        return
    }

const productCards = productList.map(product => {
    return createProductCard(product)
})

productGrid.innerHTML = productCards.join("")
}

productGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".card")

    if (!card) return
    const id = card.dataset.id
    location.hash = `#/product/${id}`
})

function renderProductDetail (product) {
    productGrid.innerHTML = `
    <div class="product-detail">
       <img src="${product.image}" alt="${product.name}" />
       <div class="product-detail-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">৳ ${product.price}</p>
        <button>Add to Cart</button>
        <a href="#/shop">← Back to shop</a>
        </div>
    </div>
    `
}

function handleRouteChange () {
    
    const hash = location.hash

    if (hash.startsWith("#/product")) {
        const id = hash.split("/")[2]
        const product = products.find(p => p.id === Number(id))
        renderProductDetail(product)
    } else {
        renderProducts(getFilteredProducts())
    }
}

window.addEventListener("hashchange", handleRouteChange)

handleRouteChange()
