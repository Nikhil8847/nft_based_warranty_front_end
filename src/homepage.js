import "./homepage.css";
import { ethers } from "ethers";
import PorductFactoryInterface from "./constants/ProductFactory.sol/ProductFactory.json";
import productFactoryAddress from "./constants/productFactoryAddress";
import productInterface from "./constants/Product.sol/Product.json";
import IPFSobject from "./constants/IPFSHash/1.json";
import React, { useState } from "react";
const Homepage = () => 
{   
    const [ items, setUser] = useState({
      name : "",
      symbol : "",
      warranty : "",
      quantity : ""
  }) 

  const handleChange = e => {
    const { name, value } = e.target
    setUser({
          ...items,
          [name]: value,
      })
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const IPFSHash = IPFSobject.IpfsHash;
  const contract = new ethers.Contract(
    productFactoryAddress,
    PorductFactoryInterface.abi,
    signer
  );

  const [number, setNumber] = useState("-1");
  const [productFactory, setProductFactory] = useState(null);
  const [firstProductName, setFirstProductName] = useState("khota");
  const getNumberOfProducts = async () => {
    const numberOfProducts = await contract.getNumberOfProducts();
    const ProductFactoryOwner = await contract.getFactoryOwner();
    console.log(numberOfProducts.toString());
    setNumber(numberOfProducts.toString());
    setProductFactory(ProductFactoryOwner);
  };

  const addProduct = async () => {
    const transactionResponse = await contract.addProduct(
      "mohit",
      "moh",
      365 * 24 * 60 * 60,
      1,
      IPFSHash
    );
    const transactionReceipt = await transactionResponse.wait(1);
    const firstproductAddress =
      transactionReceipt.events[0].args.productAddress;
    const firstproduct = new ethers.Contract(
      firstproductAddress,
      productInterface.abi,
      signer
    );
    console.log(firstproduct);
    const name = await firstproduct.name();
    console.log(name);
    setFirstProductName(name.toString());
      


  };

  const onSubmit = async () => {
    if(items.name && items.symbol && items.warranty && items.quantity) {
      const transactionResponse = await contract.addProduct(
        items.name,
        items.symbol,
        365 * 24 * 60 * 60 * parseInt(items.warranty, 10),
        items.quantity,
        IPFSHash
      )
      const transactionReceipt = await transactionResponse.wait(1);
      const productAddedAddress = transactionReceipt.events[0].args.productAddress;
      const productcontract = new ethers.Contract(
        productAddedAddress,
        productInterface.abi,
        signer
      )
      const name = await productcontract.name()
      const symbol = await productcontract.symbol();
      const warrantyPeriod = await productcontract.getWarrantyPeriod(); 
      console.log(name.toString(), symbol.toString(), warrantyPeriod.toString());
    }
  }
  return (
    <div className="App">
      <div>
        {/* <header></header>
        <button onClick={getNumberOfProducts}>getNumberOfProducts</button>
        <h1>{number}</h1>
        <h1>{productFactory}</h1> */}
        
        
      </div>
      <div className="form-main">
        <input type="text" name="name" value={items.name} onChange={handleChange} placeholder="Name"></input>
        <input type="text" name="symbol" value={items.symbol} onChange={handleChange} placeholder="symbol"></input>
        <input type="text" name="warranty" value={items.warranty} onChange={handleChange} placeholder="warranty"></input>
        <input type="text" name="quantity" value={items.quantity} onChange={handleChange} placeholder="quantity"></input>
        <button className="button-submit" onClick={onSubmit}> SUBMIT</button>
      </div>
    </div>
  );
}

export default Homepage