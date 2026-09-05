export const state = {
    products: [],
    cart: [],
    wishlist: [],
    filters: {
        activeCategory: "all",
        searchQuery: "",
        sortOption: "default"
    },
    isLoading: false,
    hasError: false
}

export function setActiveCategory(value) {
    state.filters.activeCategory = value
}

export function setSearchQuery(value) {
    state.filters.searchQuery = value
}

export function setSortOption(value) {
    state.filters.sortOption = value
}

export function setCart(value) {
    state.cart = value
}

export function setWishlist(value) {
    state.wishlist = value
}

export function setLoading(value) {
    state.isLoading = value
}

export function setError(value) {
    state.hasError = value
}

export function setProducts(value) {
    state.products = value
}