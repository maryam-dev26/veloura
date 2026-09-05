import {setActiveCategory,setSearchQuery,setSortOption} from "./state.js"
import {getFilteredProducts,renderProducts, productGrid} from "./products.js"
import {loadCart,loadWishlist} from "./storage.js"
import {toggleWishlist,renderWishlist} from "./wishlist.js"
import {handleRouteChange,loadProducts} from "./router.js"
import {
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        updateCartCount,
        renderCart
} from "./cart.js"


// DOM elements

const searchInput = document.querySelector("#search-input")
const filterButtons = document.querySelectorAll(".filters button")
const sortSelect = document.querySelector("#sort-select")

const cartButton = document.querySelector("#cart-button")
const cartOverlay = document.querySelector("#cart-overlay")
const cartDrawer = document.querySelector("#cart-drawer")
const closeCartBtn = document.querySelector("#close-cart")

const wishlistButton = document.querySelector("#wishlist-button")
const wishlistDrawer = document.querySelector("#wishlist-drawer")
const wishlistOverlay = document.querySelector("#wishlist-overlay")
const closeWishlistBtn = document.querySelector("#close-wishlist")


// Product grid events

productGrid.addEventListener("click", (event) => {

    const retryBtn = event.target.closest("#retry-btn")

    if (retryBtn) {
        loadProducts()
        return
    }


    const wishlistBtn = event.target.closest(".wishlist-btn")

    if (wishlistBtn) {
        const id = Number(wishlistBtn.dataset.id)

        toggleWishlist(id)
        return
    }


    const addButton = event.target.closest(".add-to-cart")

    if (addButton) {
        const id = Number(addButton.dataset.id)

        addToCart(id, addButton)
        return
    }


    const card = event.target.closest(".card")

    if (!card) return

    const id = card.dataset.id

    location.hash = `#/product/${id}`
})


// Search

searchInput.addEventListener("input", () => {

    setSearchQuery(searchInput.value)

    renderProducts(getFilteredProducts())
})


// Sort

sortSelect.addEventListener("change", () => {

    setSortOption(sortSelect.value)

    renderProducts(getFilteredProducts())
})


// Category filter

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        setActiveCategory(button.dataset.category)

        filterButtons.forEach(btn => {
            btn.classList.remove("active")
        })

        button.classList.add("active")

        renderProducts(getFilteredProducts())
    })
})


// Cart drawer

cartButton.addEventListener("click", () => {

    cartDrawer.classList.add("open")
    cartOverlay.classList.add("active")
})


closeCartBtn.addEventListener("click", () => {

    cartDrawer.classList.remove("open")
    cartOverlay.classList.remove("active")
})


cartOverlay.addEventListener("click", () => {

    cartDrawer.classList.remove("open")
    cartOverlay.classList.remove("active")
})


// Cart item events

document.querySelector("#cart-items").addEventListener("click", (event) => {

    const cartItem = event.target.closest(".cart-item")

    if (!cartItem) return

    const productId = Number(cartItem.dataset.id)


    if (event.target.closest(".increase-btn")) {

        increaseQuantity(productId)

    } else if (event.target.closest(".decrease-btn")) {

        decreaseQuantity(productId)

    } else if (event.target.closest(".remove-btn")) {

        removeFromCart(productId)
    }
})


// Wishlist drawer

wishlistButton.addEventListener("click", () => {

    wishlistDrawer.classList.add("open")
    wishlistOverlay.classList.add("active")
})


closeWishlistBtn.addEventListener("click", () => {

    wishlistDrawer.classList.remove("open")
    wishlistOverlay.classList.remove("active")
})


wishlistOverlay.addEventListener("click", () => {

    wishlistDrawer.classList.remove("open")
    wishlistOverlay.classList.remove("active")
})


// Wishlist item events

document.querySelector("#wishlist-items").addEventListener("click", (event) => {

    const removeBtn = event.target.closest(".remove-wishlist-btn")

    if (!removeBtn) return

    const item = event.target.closest(".wishlist-item")

    const id = Number(item.dataset.id)

    toggleWishlist(id)
})


// Initialize stored data

loadCart()
loadWishlist()

updateCartCount()

// Routing

window.addEventListener("hashchange", handleRouteChange)

handleRouteChange()
