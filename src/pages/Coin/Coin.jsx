import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';



const Coin = () => {

    const {coinId} = useParams();
    const [coinData, setCoinData] = useState()
    const {currency} = useContext(CoinContext);
    const [historicalData, setHistoricalData] = useState()

    const fetchCoinData = async ()=>{
        const options = {
            method: 'GET', 
            headers: {'x-cg-demo-api-key': 'CG-3MciHeAymRnVxEwGaiPHMzrx'}
        };

        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
            .then(res => res.json())
            .then(data => setCoinData(data))
            .catch(err => console.error(err));
    }

    const fetchHistoricalData = async ()=>{
        const options = {method: 'GET', headers: {'x-cg-demo-api-key': 'CG-3MciHeAymRnVxEwGaiPHMzrx'}};

fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10`, options)
  .then(res => res.json())
  .then(data => setHistoricalData(data))
  .catch(err => console.error(err));
    }

    useEffect(()=>{
        fetchCoinData();
        fetchHistoricalData();
    },[CoinContext])


    if(coinData, historicalData){
        return (
    <div className='coin'>
        <div className="coin__name">
            <img src={coinData.image.large} alt="" />
            <p><b>{coinData.name} ({coinData.symbol.toUpperCase})</b></p>
        </div>
        <div className="coin__chart">
            <LineChart historicalData={historicalData}/>
        </div>
    </div>
  )
    }else{
        return (
    <div className='spinner'>
        <div className="spin"></div>
    </div>
  )
}

  
}

export default Coin