import React,{useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Coin from './Coin';


function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h')
         .then(res => {
           setCoins(res.data);
           console.log(res.data);
         });
  });

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
    )


  return (
    <div className="coin-app">
      <div className = "coin-search">
        <h1 className = "coin-text">Search a currency</h1>
        <form>
          <input type = "text" placeholder = "Search" className = "coin-input" onChange = {handleChange}/>
          </form>
          </div>
          <script type="text/javascript" src="https://files.coinmarketcap.com/static/widget/currency.js"></script>
          <div class="coinmarketcap-currency-widget" data-currencyid="1" data-base="USD"
             data-secondary="" data-ticker="true" data-rank="true" data-marketcap="true" data-volume="true" data-statsticker="true" data-stats="USD"></div>
          {filteredCoins.map(coin =>{
            return(
               <Coin 
              key = {coin.id} 
              name = {coin.name} 
              image = {coin.image}
              symbol = {coin.symbol}
              marketcap = {coin.market_cap}
              price = {coin.current_price}
              priceChange = {coin.price_change_percentage_24h}
              volume = {coin.total_volume}
              />
            );
          })}
    </div>
  );
}

export default App;
