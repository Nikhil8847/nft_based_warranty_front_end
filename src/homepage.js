import "./homepage.css";
import { ethers } from "ethers";
import PorductFactoryInterface from "./constants/ProductFactory.sol/ProductFactory.json";
import productFactoryAddress from "./constants/productFactoryAddress";
import productInterface from "./constants/Product.sol/Product.json";
import IPFSobject from "./constants/IPFSHash/1.json";
import React, { useState } from "react";
import react from "react";
const Homepage = () => {
    const [ item, setUser] = useState({
      name : "",
      symbol : "",
      warranty : "",
      quantity : ""
  }) 
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
          ...item,
          [name]: value
      })
  }


  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();
  // const IPFSHash = IPFSobject.IpfsHash;
  // const contract = new ethers.Contract(
  //   productFactoryAddress,
  //   PorductFactoryInterface.abi,
  //   signer
  // );

  // const [number, setNumber] = useState("-1");
  // const [productFactory, setProductFactory] = useState(null);
  // const [firstProductName, setFirstProductName] = useState("khota");
  // const getNumberOfProducts = async () => {
  //   const numberOfProducts = await contract.getNumberOfProducts();
  //   const ProductFactoryOwner = await contract.getFactoryOwner();
  //   console.log(numberOfProducts.toString());
  //   setNumber(numberOfProducts.toString());
  //   setProductFactory(ProductFactoryOwner);
  // };

  // const addProduct = async () => {
  //   const transactionResponse = await contract.addProduct(
  //     "mohit",
  //     "moh",
  //     365 * 24 * 60 * 60,
  //     1,
  //     IPFSHash
  //   );
  //   const transactionReceipt = await transactionResponse.wait(1);
  //   const firstproductAddress =
  //     transactionReceipt.events[0].args.productAddress;
  //   const firstproduct = new ethers.Contract(
  //     firstproductAddress,
  //     productInterface.abi,
  //     signer
  //   );
  //   console.log(firstproduct);
  //   const name = await firstproduct.name();
  //   console.log(name);
  //   setFirstProductName(name.toString());
      


  // };

  const onSubmit = () => {
    console.log(item);
  }
  return (
    <div className="App">
      <div>
        {/* <header></header>
        <button onClick={getNumberOfProducts}>getNumberOfProducts</button>
        <h1>{number}</h1>
        <h1>{productFactory}</h1>
        <button onClick={addProduct}>loadName</button>
        <h3>{firstProductName}</h3> */}

        hello
      </div>
      <div className="form-main">
        {/* <input name={}></input> */}

        <input className="name items" type=" text" value={item.name} onChange={handleChange}  placeholder="name"></input>
        <input className="symbol items" type=" text" value={item.symbol} onChange={handleChange}  placeholder="symbol"></input>
        <input className="warrantyPeriod items" type=" text" value={item.warranty} onChange={handleChange}  placeholder="warrantyPeriod"></input>
        <input className="quantity items" type=" text" value={item.quantity} onChange={handleChange}  placeholder="quantity"></input>
        <button className="button-submit" onClick={onSubmit}> SUBMIT</button>
      </div>
    </div>
  );
}

export default Homepage