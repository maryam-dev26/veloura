import { state, setCart } from "./state.js"
import { saveCart } from "./storage.js"

const cartItems = document.querySelector("#cart-items")
const cartTotal = document.querySelector("#cart-total")
const cartCount = document.querySelector("#cart-count")

export function addToCart(productId, button) {
    
    const existingItem = state.cart.find(
        item => item.productId === productId
    )

    if (existingItem) {
        existingItem.quantity += 1
    } else {
        state.cart.push({
            productId: productId,
            quantity: 1
        })
    }

    updateCartCount()

    button.textContent = "Added ✓"

    renderCart()
    saveCart()
}


export function increaseQuantity(productId) {
    const item = state.cart.find(
        item => item.productId === productId
    )

    item.quantity += 1

    renderCart()
    saveCart()
}


export function decreaseQuantity(productId) {
    const item = state.cart.find(
        item => item.productId === productId
    )

    item.quantity -= 1

    if (item.quantity <= 0) {
        removeFromCart(productId)
        return
    }

    renderCart()
    saveCart()
}


export function removeFromCart(productId) {
    setCart(
        state.cart.filter(
            item => item.productId !== productId
        )
    )

    renderCart()
    saveCart()
}


export function renderCart() {
    if (state.cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>"
    } else {
        const itemsHtml = state.cart.map(item => {
            const product = state.products.find(
                p => p.id === item.productId
            )

            return `
                <div class="cart-item" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}" />

                    <div class="cart-item-info">
                        <h4>${product.name}</h4>
                        <p>৳ ${product.price}</p>

                        <div class="quantity-controls">
                            <button class="decrease-btn">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase-btn">+</button>
                        </div>
                    </div>

                    <button class="remove-btn">🗑</button>
                </div>
            `
        }).join("")

        cartItems.innerHTML = itemsHtml
    }

    updateCartTotal()
}


export function updateCartTotal() {
    const total = state.cart.reduce((sum, item) => {
        const product = state.products.find(
            p => p.id === item.productId
        )

        return sum + (product.price * item.quantity)
    }, 0)

    cartTotal.textContent = total

    updateCartCount()
}


export function updateCartCount() {
    const totalQuantity = state.cart.reduce((total, item) => {
        return total + item.quantity
    }, 0)

    cartCount.textContent = totalQuantity
}