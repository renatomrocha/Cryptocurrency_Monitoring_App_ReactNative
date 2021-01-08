import axios from 'axios';
import apis from '../APIs.json';



class Service{

    constructor(){
    }


    getPrices(){
        let reqAddr = apis.nomics.api +'prices' + '?key=' + apis.nomics.key;
        //console.log(reqAddr)
        return axios.get(reqAddr);
    }

    getExchangeRates(){
        let reqAddr = apis.nomics.api +'exchange-rates' + '?key=' + apis.nomics.key;
        //console.log(reqAddr)
        return axios.get(reqAddr);
    }

    getMarketGenericInfo(){
        let reqAddr = apis.lunarCrush.api +'data=market&key=' + apis.lunarCrush.key;
        return axios.get(reqAddr);
    }

    getPricesFromCoinGecko(){
        let reqAddr = apis.coinGecko.api +'/simple/price';
        return axios.get(reqAddr);
    }

    //Get coins to set ref
    getVsCoins(){
        let reqAddr = apis.coinGecko.api +'/simple/supported_vs_currencies';
        console.log("Pedido CoinGecko: ", reqAddr);

        return axios.get(reqAddr);
    }


    getBtcCandleInfo(){
        let reqAddr = apis.coinGecko.api + '/coins/bitcoin/ohlc?vs_currency=usd&days=1';
        return axios.get(reqAddr);
    }

    getCandleForCoin(coin, interval){
        console.log("Pedir candle para coin: ", coin);
        let reqAddr = apis.coinGecko.api + '/coins/'+coin+'/ohlc?vs_currency=usd&days=' + interval;
        console.log("Pedido: ", reqAddr);
        return axios.get(reqAddr);

    }

    //Get coins to check price
    getCoins(){
        let reqAddr = apis.coinGecko.api +'/coins/list';
        console.log("Pedido CoinGecko: ", reqAddr);

        return axios.get(reqAddr);
    }


    paprikaGetTickers(){
        const options = {
            method: 'GET',
            url: 'https://coinpaprika1.p.rapidapi.com/tickers',
            headers: {
              'x-rapidapi-key': 'f39087f61dmshe2da911c1edbf23p1f5237jsn229d19a3701d',
              'x-rapidapi-host': 'coinpaprika1.p.rapidapi.com'
            }
          };        
        return axios.request(options);
    }

}

export default Service;