let activeCategory = "all"
const filterButtons = document.querySelectorAll(".filters button")

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
        image: "assets/images/sneakers.jpg",
        rating: 4.8
    }
]

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        activeCategory = button.dataset.category
        renderProducts(getFilteredProducts())
    })
})


function createProductCard(product) {
    return `
        <article class="card">
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">৳ ${product.price}</p>
            <button>Add to Cart</button>
        </article>
    `
}

function getFilteredProducts () {
    if (activeCategory === "all"){
         return products
    }
    return products.filter(product => product.category === activeCategory)
}

function renderProducts(productList) {
const productCards = productList.map(product => {
    return createProductCard(product)
})

const productGrid = document.querySelector("#product-grid")

productGrid.innerHTML = productCards.join("")
}

renderProducts(getFilteredProducts())