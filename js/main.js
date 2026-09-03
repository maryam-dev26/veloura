let activeCategory = "all"
let searchQuery = ""
let sortOption = "default"
let cart = []
let wishlist = []
let isLoading = false
let hasError = false

const productGrid = document.querySelector("#product-grid")
const searchInput = document.querySelector("#search-input")
const filterButtons = document.querySelectorAll(".filters button")
const sortSelect = document.querySelector("#sort-select")
const cartCount = document.querySelector("#cart-count")
const cartButton = document.querySelector("#cart-button")
const cartOverlay = document.querySelector("#cart-overlay")
const cartDrawer = document.querySelector("#cart-drawer")
const closeCartBtn = document.querySelector("#close-cart")
const wishlistButton = document.querySelector("#wishlist-button")
const wishlistDrawer = document.querySelector("#wishlist-drawer")
const wishlistOverlay = document.querySelector("#wishlist-overlay")
const closeWishlistBtn = document.querySelector("#close-wishlist")

let products = [
   /* {
        id: 1,
        name: "Leather Bag",
        category: "Bags",
        price: 1010,
        description: "A timeless leather bag for everyday elegance.",
        image: "assets/images/Bag.jpg",
        rating: 4.5
    },
    {
        id: 2,
        name: "Classic Blazer",
        category: "Clothing",
        price: 3250,
        description: "A tailored blazer designed for a polished and effortless look.",
        image: "assets/images/clothing.jpg",
        rating: 4.7
    },
    {
        id: 3,
        name: "Minimal Gold Earrings",
        category: "Jewelry",
        price: 890,
        description: "Simple and elegant earrings for everyday styling.",
        image: "assets/images/jewelry.jpg",
        rating: 4.6
    },
    {
        id: 4,
        name: "Classic Sneakers",
        category: "Shoes",
        price: 2490,
        description: "Comfortable everyday sneakers with a clean, versatile design.",
        image: "assets/images/shoes.jpg",
        rating: 4.8
    },
     {
        id: 5,
        name: "Canvas Tote Bag",
        category: "Bags",
        price: 650,
        description: "A spacious, everyday tote made from durable canvas.",
        image: "assets/images/Tote-Bag.jpg",
        rating: 4.3
    },
     {
        id: 6,
        name: "Crossbody Sling Bag",
        category: "Bags",
        price: 1450,
        description: "A compact sling bag for hands-free convenience on the go.",
        image: "assets/images/crossbody-bag.jpg",
        rating: 4.4
    },
    {
        id: 7,
        name: "Mini Backpack",
        category: "Bags",
        price: 1890,
        description: "A stylish mini backpack that fits daily essentials with ease.",
        image: "assets/images/mini-backpack.jpg",
        rating: 4.6
    },
    {
        id: 8,
        name: "Linen Shirt",
        category: "Clothing",
        price: 1350,
        description: "A breathable linen shirt perfect for warm, casual days.",
        image: "assets/images/linen-shirt.jpg",
        rating: 4.5
    },
    {
        id: 9,
        name: "Denim Jacket",
        category: "Clothing",
        price: 2790,
        description: "A classic denim jacket that layers well in any season.",
        image: "assets/images/denim-jacket.jpg",
        rating: 4.7
    },
    {
        id: 10,
        name: "Cotton Sweater",
        category: "Clothing",
        price: 1990,
        description: "A soft, cozy cotton sweater for everyday comfort.",
        image: "assets/images/cotton-sweater.jpg",
        rating: 4.4
    },
    {
        id: 11,
        name: "Layered Necklace",
        category: "Jewelry",
        price: 1150,
        description: "A delicate layered necklace that adds effortless charm.",
        image: "assets/images/layered-necklace.jpg",
        rating: 4.6
    },
    {
        id: 12,
        name: "Silver Hoop Earrings",
        category: "Jewelry",
        price: 720,
        description: "Classic silver hoops that go with every outfit.",
        image: "assets/images/silver-hoops.jpg",
        rating: 4.5
    },
    {
        id: 13,
        name: "Pearl Bracelet",
        category: "Jewelry",
        price: 980,
        description: "An elegant pearl bracelet for a refined, subtle finish.",
        image: "assets/images/pearl-bracelet.jpg",
        rating: 4.8
    },
    {
        id: 14,
        name: "Ankle Boots",
        category: "Shoes",
        price: 3150,
        description: "Sturdy ankle boots built for style and all-day comfort.",
        image: "assets/images/ankle-boots.jpg",
        rating: 4.7
    },
    {
        id: 15,
        name: "Loafers",
        category: "Shoes",
        price: 2350,
        description: "Smart, versatile loafers for a polished everyday look.",
        image: "assets/images/loafers.jpg",
        rating: 4.6
    },
    {
        id: 16,
        name: "Strappy Sandals",
        category: "Shoes",
        price: 1290,
        description: "Lightweight strappy sandals perfect for warm-weather days.",
        image: "assets/images/strappy-sandals.jpg",
        rating: 4.2
    }
        */
]



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

searchInput.addEventListener("input", () => {
     searchQuery = searchInput.value
     renderProducts(getFilteredProducts())
})

sortSelect.addEventListener("change", () => {
    sortOption = sortSelect.value
    renderProducts(getFilteredProducts())
})


filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        activeCategory = button.dataset.category

        filterButtons.forEach(btn => {
            btn.classList.remove("active")
    })
    button.classList.add("active")
        
        renderProducts(getFilteredProducts())
    })
})




/* basic structure of reduce
array.reduce((accumulator, currentValue) => {
    // calculation
}, initialValue)
*/



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


document.querySelector("#wishlist-items").addEventListener("click", (event) => {
    const removeBtn = event.target.closest(".remove-wishlist-btn")
    if (!removeBtn) return

    const item = event.target.closest(".wishlist-item")
    const id = Number(item.dataset.id)
    toggleWishlist(id) 
})



function loadCart() {
    try {
        const saved = localStorage.getItem("cart")
        if (saved) {
            cart = JSON.parse(saved)
        }
    } catch (error) {
        cart = []
    }
}

loadCart()
loadWishlist()
updateCartCount()

window.addEventListener("hashchange", handleRouteChange)

handleRouteChange()
