import "./homepage.css"
import { useNavigate } from "react-router-dom"
import React , {useState} from "react"
import {ethers} from 'ethers'




const Homepage=()=>
{
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
				getAccountBalance(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
			});
		} else 
		{
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		getAccountBalance(newAccount.toString());
	}
	const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			setErrorMessage(error.message);
		});
	};

	const chainChangedHandler = () => {
		window.location.reload();
	}
	window.ethereum.on('accountsChanged', accountChangedHandler);
	window.ethereum.on('chainChanged', chainChangedHandler);
	
    return (
        <div className="main">
            <div className='walletcard'>
                <div> 
                    <div className='accountDisplay'>
					<h4> {connectWalletHandler()} </h4>	
                        <h3>Address: {defaultAccount}</h3>
                    </div>
                    <div className='balanceDisplay'>
                        <h3>Balance: {userBalance}</h3>
                    </div>
                </div>
                <div >
					<button className="connection-button" onClick={connectWalletHandler}>{connButtonText}</button>
				</div>
				{/* {errorMessage} */}
            </div>    
            <div class="below">
                <div className="image-gif">
					<iframe src="https://cryptologotypes.com/img/logos/ethereum/ethereum-eth-logo.svg" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://cryptologotypes.com/img/logos/ethereum/ethereum-eth-logo.svg"></a></p>
				</div>
				<div className="buttonpanel"> 
					<button className="page-button" onClick={ () => navigate("/products")}>
						Buy  
					</button>
					<button className="page-button" onClick={ () => navigate("/sell")}>
						Sell
					</button>
				</div>
			</div>    
        </div>
    )
}

export default Homepage 