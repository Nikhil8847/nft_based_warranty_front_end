import "./products.css"
import React from "react"
import PorductFactoryInterface from "./constants/ProductFactory.sol/ProductFactory.json"
import productFactoryAddress from "./constants/productFactoryAddress"
import productInterface from "./constants/Product.sol/Product.json"
import { getNumberOfProducts } from "./utils/numberOfProducts"
import { ethers } from "ethers"
const Products = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(productFactoryAddress, PorductFactoryInterface.abi, signer)
    const productsList = []
    const numberOfProducts = getNumberOfProducts(contract);
    for(var i = 0; i < numberOfProducts; i++){
        const productAddress = contract.getProductAtIndex(i);
        productsList.push(productAddress);
    }

    for(var i = 0; i< numberOfProducts; i++){
        const productContract = new ethers.Contract(productsList[i], productInterface.abi, signer);
        const name = await productContract.name();
        const symbol = await productContract.symbol();
        const quantity = await productContract.numberOfUnits();
        console.log(productsList[i], name.toString(), symbol.toString(), quantity.toString())
    }
    return <div className="main"></div>
}

export default Products
