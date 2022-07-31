import "./products.css"
import React,{useState} from "react"
import axios from "axios"
import PorductFactoryInterface from "./constants/ProductFactory.sol/ProductFactory.json"
import productFactoryAddress from "./constants/productFactoryAddress"
import productInterface from "./constants/Product.sol/Product.json"
import { getNumberOfProducts } from "./utils/numberOfProducts"
import { ethers } from "ethers"
import { useNavigate } from "react-router-dom"
import { queryHelpers } from "@testing-library/react"

const Products = () => {
    const navigate = useNavigate();

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(productFactoryAddress, PorductFactoryInterface.abi, signer)
    const [productsList, getData] = useState([])
    // const [item, setItem] = useState({})
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
                warrantyPeriod: warrantyPeriod,
                // address: productsList[i]
            }
            // setItem(item)
            productsList.push(item);
            console.log(productsList[i], name.toString(), symbol.toString(), quantity.toString())
        }
        // console.log(productsList);
        // const helpinghands = async()=>
        // { 
        //     return (
        //         <div>

        //         </div>
        //     )
        // }
        // render=()=> { 
        // Object.keys(productsList).map((key)=>
        // {
        //     return (<div>
        //         <span>
        //             "Id is :" {key}
        //         </span>
        //         <span> "name of products is"{productsList[key].name}</span>
        //         <span> "Symbol is"{productsList[key].symbol}</span>
        //         <span> "Wuantity is"{productsList[key].quantity}</span>
        //         <span> "Warranty period is"{productsList[key].warrantyPeriod}</span>
        //     </div>
        //     )
        // })
    }
    // const temp = async () => {
    //     let result = "";
    //     Promise.all(productsList.map(async (item) => {
    //         result += `<h1>${item.name}</h1>`
    //         result += `<h1>${item.symbol}</h1>`
    //         result += `<h1>${item.quantity}</h1>`
    //         result += `<h1>${item.warrantyPeriod}</h1>`
    //     }))
    //     console.log(result);
    //     document.getElementById("khota").innerHTML = result;
    // }

    const buy = async () => {
        const productAddress = '0xD1279736a8A436Aff124B10D3597A4eCF08B9A1d';
        const productContract = new ethers.Contract(productAddress, productInterface.abi, signer);
        let transactionResponse;
        try{
            transactionResponse = await productContract.mint();
        } catch(err){
            console.log(err)
        }
            
        const transactionReceipt = await transactionResponse.wait(1);
        // console.log(transactionReceipt)
        const from = transactionReceipt.events[0].args.from;
        const to = transactionReceipt.events[0].args.to
        const tokenId = transactionReceipt.events[0].args.tokenId
        const buyTime = transactionReceipt.events[1].args.buyingTime
        const expiryTime = transactionReceipt.events[1].args.expiryTime
        console.log(from.toString(), to.toString(), tokenId.toString(), buyTime.toString(), expiryTime.toString());
        var mydate=new Date(expiryTime*1000);
        alert("Thank You for puchasing the product " + "Your warranty dealine is :" + mydate.toLocaleString())
    }

// Email
const [sent, setSent] = useState(false)
const [text, setText] = useState("")
const sendEmail = async(e) => {
    setSent(true)
    try{
        await axios.post("http://localhost:3000/send", {text})
    }catch(error)
    {
        console.error(error)
    }
}


    return(  
    <div className="main">
            {/* {/* <div>
                {handler} */}
                <button onClick={handler}>click here to show all products</button>    
            {/* </div> */} 
            {/* <div><button onClick={''}>delete</button></div> */}
            <div className="main-card">
                
                <div className="card">
                    <div>
                        <h2>
                            Mohit
                        </h2>
                        <h2>
                            price : 1
                        </h2>
                    </div>
                    <div>
                        <h2>
                        0xD1279736a8A436Aff124B10D3597A4eCF08B9A1d
                        </h2>
                    </div>
                    <div>
                        <button className="page-button-card" onClick={buy}>
                            Buy Now
                        </button>
                        
                    </div>
                </div>
                <div className="card">
                    <div>
                        <h2>Mohit</h2>
                        <h2>
                                0.04
                        </h2>
                    </div>
                    <div>
                        <h2>
                        0xee90dc967CBa2eC95c713a8736e8B9a1068847CB
                        </h2>
                    </div>
                    <div>
                        <button className="page-button-card" onClick={buy}>                            Buy Now
                        </button>
                    </div>
                </div>
                
            </div>
            <div className="buttonpanel">
                    <button className="page-button" onClick={ () => navigate("/")}>
						Homepage
					</button>
					<button className="page-button" onClick={ () => navigate("/sell")}>
						Sell
					</button>
            </div>    
            <div>
            {!sent ? (
                <form onSubmit={sendEmail}>
                        <label>Email Address</label>
                        <input type="text" value={text} onChange={(e)=>setText(e.target.value)}/>
                        <button type="submit">Submit</button>
                </form>
            ) : (
                <h1 className="email-message">Email sent</h1>
            )}
            </div>
    </div>
    )
}

export default Products
