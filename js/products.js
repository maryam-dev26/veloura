import {state} from "./state.js"

export const productGrid = document.querySelector("#product-grid")

export function createProductCard(product) {
    const isWishlisted = state.wishlist.includes(product.id)
    const heartIcon = isWishlisted ? "♥" : "♡"
    return `
        <article class="card" data-id="${product.id}">
            <button class="wishlist-btn" data-id="${product.id}">${heartIcon}</button>
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$ ${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </article>
    `
}

export function getFilteredProducts () {
    const filtered = state.products.filter(product => {
    const matchesCategory = 
        state.filters.activeCategory === "all" ||
        product.category === state.filters.activeCategory
    const matchesSearch = 
        product.name
            .toLowerCase()
            .includes(state.filters.searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
    })

    const sorted = [...filtered]
        if (state.filters.sortOption === "price-low") {
            sorted.sort((a, b) => a.price - b.price)
        } else if (state.filters.sortOption === "price-high") {
            sorted.sort((a, b) => b.price - a.price)
        } else if (state.filters.sortOption === "name-az") {
            sorted.sort((a,b) => a.name.localeCompare(b.name)) 
        } else if (state.filters.sortOption === "name-za") {
            sorted.sort((a, b) => b.name.localeCompare(a.name))
    }
       
    return sorted
}


export function renderProducts(productList) {
    productGrid.classList.remove("detail-view")

    if(productList.length === 0) {
        productGrid.innerHTML = "<p class ='no-result'> No product found</p>"
        return
    }

const productCards = productList.map(product => {
    return createProductCard(product)
})

productGrid.innerHTML = productCards.join("")
}


export function renderProductDetail (product) {
    productGrid.classList.add("detail-view")
    
    const isWishlisted = state.wishlist.includes(product.id)
    const heartIcon = isWishlisted ? "♥" : "♡"
    
    productGrid.innerHTML = `
    <div class="product-detail">
        <button class="wishlist-btn" data-id="${product.id}">${heartIcon}</button>
        <img src="${product.image}" alt="${product.name}" />
        <div class="product-detail-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">$ ${product.price}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        <a href="#/shop">← Back to shop</a>
        </div>
    </div>
    `
}


export function renderLoadingState() {
    productGrid.innerHTML = `
    <div class="loading-state">
        <div class="spinner"></div>
    </div>
    `
}

export function renderErrorState(message) {
    productGrid.innerHTML = `
        <div class="error-state">
            <p>${message}</p>
            <button id="retry-btn">Retry</button>
        </div>
    `
}

export function renderNotFound () {
    productGrid.innerHTML = "<p>Product not found.</p>"
}