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
        
    let productsList = []
    const handler = async () => {
        const numberOfProducts = await getNumberOfProducts(contract);
        console.log(numberOfProducts)
        for(let i = 0; i < numberOfProducts; i++){
            const productAddress = await contract.getProductAtIndex(i);
            productsList.push(productAddress);
        }
        for(let i = 0; i< numberOfProducts; i++){
            const productContract = new ethers.Contract(productsList[i], productInterface.abi, signer);
            const name = await productContract.name();
            const symbol = await productContract.symbol();
            const quantity = await productContract.numberOfUnits();
            const warrantyPeriod = await contract.getWarrantyPeriod(productsList[i])
            const item = {
                name: name,
                symbol: symbol,
                quantity: quantity,
                warrantyPeriod: warrantyPeriod
            }
            productsList.push(item);
            console.log(productsList[i], name.toString(), symbol.toString(), quantity.toString())
        }
    }
    return(  
    <div className="main">
        {
            
        }
        <h1>hello world</h1>
        <button onClick={handler}>click Me</button>
    </div>
    
    )
}

export default Products
