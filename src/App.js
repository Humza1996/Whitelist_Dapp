import React from 'react';
import ReactDOM from 'react-dom';
import { ethers} from "ethers";
import { useEffect, useRef, useState } from "react";
import { CONTRACT_ADDRESS, ABI } from "./contract";
import "./App.css";

export default function App() {

  const [walletConnections, SetwalletConnections] = useState(false);
  const [isParticipated, SetParticipation] = useState("");
  const [isLoading, SetLoading] = useState(false);

  const [num_of_participants, Setnum_of_participants] = useState("");
  

  const getNumberOfWhitelisted = async () => 
  {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract_object = new ethers.Contract(CONTRACT_ADDRESS,ABI,provider)
    const numb= await contract_object.numAddressesWhitelisted()
    Setnum_of_participants(numb)
  
  };

  const participate = async ()=>
  {
    try
    {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      provider.send("eth_requestAccounts",[])
      const signer = provider.getSigner()
      const contract_object = new ethers.Contract(CONTRACT_ADDRESS,ABI,signer)
      const tx= await contract_object.addAddressToWhitelist()
      getNumberOfWhitelisted()
      SetParticipation("Woho !! Participated !")
    }
    catch(err)
    {
      console.log(err)
      SetParticipation("You are Already Participated !")
    }

  };

  return (
    <div>
      
      <div className="row main-block">
        <div className="col-sm">
          <div className="whitelist-btn">
            <button className="btn btn-success btn-lg" onClick={participate}>Participate</button>
            <button className="btn btn-success btn-lg" onClick={getNumberOfWhitelisted}>Check Participants</button>
          </div>
          <h5 className="participants_number">Total Participants {num_of_participants}</h5>
          {isLoading && <h6 className="participants_number">Trasaction is in process</h6> }
          <h6 className="participants_number">{isParticipated}</h6>
        </div>
        <div  className="col-sm">
          <img
            className="image-logo"
            src="/pancake-logo.png"
            alt="logo"
            width="200"
            height="200"
          />
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
