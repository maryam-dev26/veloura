import { products, wishlist, setWishlist } from "./state.js"
import { saveWishlist, loadWishlist } from "./storage.js"
import { renderProducts, getFilteredProducts } from "./products.js"

const wishlistItems = document.querySelector("#wishlist-items")
const wishlistCount = document.querySelector("#wishlist-count")

export function toggleWishlist (productId) {
    if (wishlist.includes(productId)) {
        setWishlist ((wishlist.filter(id => id !== productId)))
    } else {
        wishlist.push(productId)
    }

    renderProducts(getFilteredProducts())
    renderWishlist()
    saveWishlist()
}


export function renderWishlist() {

    if (wishlist.length === 0) {
        wishlistItems.innerHTML = "<p>Your wishlist is empty.</p>"
    } else {
        const itemsHtml = wishlist.map(id => {
            const product =products.find(p => p.id === id)

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
   wishlistCount.textContent = wishlist.length
}

