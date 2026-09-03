import { cart, wishlist, setCart, setWishlist } from "./state.js"



export function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart))
}

export function loadCart() {
    try {
        const saved = localStorage.getItem("cart")
        if (saved) {
            setCart ((JSON.parse(saved)))
        }
    } catch (error) {
        setCart ([])
    }
}

export function saveWishlist() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
}

export function loadWishlist() {
    try {
        const saved = localStorage.getItem("wishlist")
        if (saved) {
            setWishlist ((JSON.parse(saved)))
        }
    } catch (error) {
        setWishlist ([])
    }
}