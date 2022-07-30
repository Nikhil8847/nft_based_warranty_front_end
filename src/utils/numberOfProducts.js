const getNumberOfProducts = async (productFactoryContract) => {
    const numberOfProducts = await productFactoryContract.getNumberOfProducts()
    return parseInt(numberOfProducts.toString())
}

export default getNumberOfProducts
