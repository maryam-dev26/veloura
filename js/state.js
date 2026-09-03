export let activeCategory = "all"
export let searchQuery = ""
export let sortOption = "default"
export let cart = []
export let wishlist = []
export let isLoading = false
export let hasError = false
export let products = []

export function setActiveCategory(value) {
    activeCategory = value
}

export function setSearchQuery(value) {
    searchQuery = value
}

export function setSortOption(value) {
    sortOption = value
}

export function setCart(value) {
    cart = value
}

export function setWishlist(value) {
    wishlist = value
}

export function setLoading(value) {
    isLoading = value
}

export function setError(value) {
    hasError = value
}

export function setProducts(value) {
    products = value
}