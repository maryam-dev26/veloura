import { state, setWishlist } from "./state.js"
import { saveWishlist } from "./storage.js"
import { renderProducts, getFilteredProducts } from "./products.js"

const wishlistItems = document.querySelector("#wishlist-items")
const wishlistCount = document.querySelector("#wishlist-count")


export function toggleWishlist(productId) {
    if (state.wishlist.includes(productId)) {
        setWishlist(
            state.wishlist.filter(id => id !== productId)
        )
    } else {
        state.wishlist.push(productId)
    }

    renderProducts(getFilteredProducts())
    renderWishlist()
    saveWishlist()
}


export function renderWishlist() {
    if (state.wishlist.length === 0) {
        wishlistItems.innerHTML = "<p>Your wishlist is empty.</p>"
    } else {
        const itemsHtml = state.wishlist.map(id => {
            const product = state.products.find(
                p => p.id === id
            )

            return `
                <div class="wishlist-item" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}" />

                    <div>
                        <h4>${product.name}</h4>
                        <p>৳ ${product.price}</p>
                    </div>

                    <button class="remove-wishlist-btn">✕</button>
                </div>
            `
        }).join("")

        wishlistItems.innerHTML = itemsHtml
    }

    updateWishlistCount()
}


export function updateWishlistCount() {
    wishlistCount.textContent = state.wishlist.length
}

