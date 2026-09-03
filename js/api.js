export async function fetchProducts() {
    const response = await fetch("https://dummyjson.com/products")

    if (!response.ok) {
        throw new Error("Failed to fetch products")
    }


    const data = await response.json()

    const velouraProducts = data.products.map((apiProduct) => {
        return {
            id: apiProduct.id,
            name: apiProduct.title,
            category: apiProduct.category,
            price: apiProduct.price,
            description: apiProduct.description,
            image: apiProduct.thumbnail,
            rating: apiProduct.rating
        }
    })

    return velouraProducts
}