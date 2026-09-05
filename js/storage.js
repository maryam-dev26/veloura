import { state, setCart, setWishlist } from "./state.js"


export function saveCart() {
    localStorage.setItem("cart", JSON.stringify(state.cart))
}

export function loadCart() {
    try {
        const saved = localStorage.getItem("cart")

        if (saved) {
            setCart(JSON.parse(saved))
        }
    } catch (error) {
        setCart([])
    }
}

export function saveWishlist() {
    localStorage.setItem("wishlist", JSON.stringify(state.wishlist))
}

export function loadWishlist() {
    try {
        const saved = localStorage.getItem("wishlist")

        if (saved) {
            setWishlist(JSON.parse(saved))
        }
    } catch (error) {
        setWishlist([])
    }
}