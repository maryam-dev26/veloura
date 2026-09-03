import {renderProducts, getFilteredProducts, renderProductDetail, renderLoadingState, renderErrorState} from "./products.js"
import { renderCart } from "./cart.js"
import { renderWishlist } from "./wishlist.js"
import {fetchProducts} from "./api.js"
import { products, setProducts, setLoading, setError } from "./state.js"

const productGrid = document.querySelector("#product-grid")

export function handleRouteChange () {    
    const hash = location.hash

    if (hash.startsWith("#/product")) {
        const id = hash.split("/")[2]
        const product = products.find(p => p.id === Number(id))
       
        if (!product) {
            productGrid.innerHTML = "<p>Product not found.</p>"
            return
        }
        renderProductDetail(product)
    } else {
        loadProducts()
    }
}

export async function loadProducts() {
    setLoading ((true))
    setError ((false))
    renderLoadingState()

    try {
        setProducts ((await fetchProducts()))
        renderProducts(getFilteredProducts())
        renderCart()
        renderWishlist()
    } catch (error) {
        setError ((true))
        renderErrorState(error.message)
    } finally {
       setLoading ((false))
    }
}