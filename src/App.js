// import "./App.css";
// import { ethers } from "ethers";
// import PorductFactoryInterface from "./constants/ProductFactory.sol/ProductFactory.json";
// import productFactoryAddress from "./constants/productFactoryAddress";
// import productInterface from "./constants/Product.sol/Product.json";
// import IPFSobject from "./IPFSHash/1.json";
// import { useState } from "react";
// function App() {
//   const [ user, setUser] = useState({
//     email:"",
//     password:""
// })

// const handleChange = e => {
//   const { name, value } = e.target
//   setUser({
//       ...user,
//       [name]: value
//   })
// }


//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const signer = provider.getSigner();
//   const IPFSHash = IPFSobject.IpfsHash;
//   const contract = new ethers.Contract(
//     productFactoryAddress,
//     PorductFactoryInterface.abi,
//     signer
//   );

//   const [number, setNumber] = useState("-1");
//   const [productFactory, setProductFactory] = useState(null);
//   const [firstProductName, setFirstProductName] = useState("khota");
//   const getNumberOfProducts = async () => {
//     const numberOfProducts = await contract.getNumberOfProducts();
//     const ProductFactoryOwner = await contract.getFactoryOwner();
//     console.log(numberOfProducts.toString());
//     setNumber(numberOfProducts.toString());
//     setProductFactory(ProductFactoryOwner);
//   };

//   const addProduct = async () => {
//     const transactionResponse = await contract.addProduct(
//       "mohit",
//       "moh",
//       365 * 24 * 60 * 60,
//       1,
//       IPFSHash
//     );
//     const transactionReceipt = await transactionResponse.wait(1);
//     const firstproductAddress =
//       transactionReceipt.events[0].args.productAddress;
//     const firstproduct = new ethers.Contract(
//       firstproductAddress,
//       productInterface.abi,
//       signer
//     );
//     console.log(firstproduct);
//     const name = await firstproduct.name();
//     console.log(name);
//     setFirstProductName(name.toString());
//   };
//   return (
//     <div className="App">
//       <header></header>
//       <button onClick={getNumberOfProducts}>getNumberOfProducts</button>
//       <h1>{number}</h1>
//       <h1>{productFactory}</h1>
//       <button onClick={addProduct}>loadName</button>
//       <h3>{firstProductName}</h3>
//       <div>
//         <input name={}></input>
//         <input></input>
//         <input></input>
//         <input></input>
//         <input></input>
//       </div>
//     </div>
//   );
// }

import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Homepage from './homepage'
import Sell from './sell'
import Products from './products'



function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage/>}/>
        </Routes>
        <Routes>
          <Route exact path="/sell" element={<Sell/>}/>
        </Routes>
        <Routes>
          <Route exact path="/products" element={<Products/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

