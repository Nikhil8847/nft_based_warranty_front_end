import "./sell.css"
import { ethers } from "ethers"
import PorductFactoryInterface from "./constants/ProductFactory.sol/ProductFactory.json"
import productFactoryAddress from "./constants/productFactoryAddress"
import productInterface from "./constants/Product.sol/Product.json"
import React, { useState } from "react"
import { create } from "ipfs-http-client"
const client = create("https://ipfs.infura.io:5001/api/v0")

const Sell = () => {
    const [items, setUser] = useState({
        name: "",
        symbol: "",
        warranty: "",
        quantity: "",
    })
    const [currentURI, setCurrentTokenURI] = useState(null)
    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...items,
            [name]: value,
        })
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(productFactoryAddress, PorductFactoryInterface.abi, signer)

    const pinning = async () => {
        let tokenURI
        try {
            const added = await client.add(JSON.stringify(items))
            tokenURI = `http://ipfs.infura.io/ipfs/${added.path}`
        } catch (err) {
            alert(err)
        }
        setCurrentTokenURI(tokenURI)
        return tokenURI
    }
    const onSubmit = async () => {
        if (items.name && items.symbol && items.warranty && items.quantity) {
            const tokenURI = await pinning()
            console.log("Response", tokenURI)
            const transactionResponse = await contract.addProduct(
                items.name,
                items.symbol,
                365 * 24 * 60 * 60 * parseInt(items.warranty, 10),
                items.quantity,
                tokenURI
            )
            const transactionReceipt = await transactionResponse.wait(1)
            const productAddedAddress = transactionReceipt.events[0].args.productAddress
            const productcontract = new ethers.Contract(
                productAddedAddress,
                productInterface.abi,
                signer
            )
            const name = await productcontract.name()
            const symbol = await productcontract.symbol()
            const warrantyPeriod = await productcontract.getWarrantyPeriod()
            console.log(name.toString(), symbol.toString(), warrantyPeriod.toString(), currentURI)
        }
    }
    return (
        <div className="App">
            <div></div>
            <div className="form-main">
                <input
                    type="text"
                    name="name"
                    value={items.name}
                    onChange={handleChange}
                    placeholder="Name"
                ></input>
                <input
                    type="text"
                    name="symbol"
                    value={items.symbol}
                    onChange={handleChange}
                    placeholder="symbol"
                ></input>
                <input
                    type="text"
                    name="warranty"
                    value={items.warranty}
                    onChange={handleChange}
                    placeholder="warranty"
                ></input>
                <input
                    type="text"
                    name="quantity"
                    value={items.quantity}
                    onChange={handleChange}
                    placeholder="quantity"
                ></input>
                <button className="button-submit" onClick={onSubmit}>
                    {" "}
                    SUBMIT
                </button>
            </div>
        </div>
    )
}

export default Sell
