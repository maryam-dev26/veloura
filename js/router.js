import {renderProducts, getFilteredProducts, 
        renderProductDetail,renderLoadingState, 
        renderErrorState, renderNotFound
} from "./products.js"
import { state,setProducts, setLoading,setError } from "./state.js"
import { renderCart } from "./cart.js"
import { renderWishlist } from "./wishlist.js"
import { fetchProducts } from "./api.js"


export function handleRouteChange () {    
    const hash = location.hash

    if (hash.startsWith("#/product")) {
        const id = hash.split("/")[2]
        const product = state.products.find(p => p.id === Number(id))
       
        if (!product) {
            renderNotFound()
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