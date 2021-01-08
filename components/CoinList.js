import React, { Component } from "react";
import {FlatList, Button,TouchableOpacity, Text, View , ScrollView, ListView, Image} from "react-native";

import Chart from './Chart';
import apis from '../APIs.json';
import generalStyles from "../generalStyles";

const Coin = ({ coin }) => (
    <View style={{padding:10,marginVertical: 8,marginHorizontal: 16}}>
      <Text>{coin}</Text>
    </View>
  );


class CoinList extends React.Component{

    constructor(props){
        super(props);
    
    }

    renderItem = ({ coin }) => (
        <Item coin={coin.id} />
      );
    

     


      getCurrencyPrice(price){
        const formattedPrice = Number(parseFloat(price).toFixed(3));
        return formattedPrice + '$';
      }


      getPercentageChange(coin){
        if(coin.quotes){
            const style = {borderRadius: 10, padding:5};
            var value = coin.quotes.USD.percent_change_24h;
            var fontColor = 'white';
            if(Number(value)<0){
                style.backgroundColor= generalStyles.red;
                value = value + '%';
                
            }   else {
                style.backgroundColor = generalStyles.green;
                fontColor = 'black';
                value = '+' + value + '%';
            }
            return (<View style = {style}><Text style={{color : fontColor}}>{value}</Text></View>)
        } else {
            return null;
        }
      
      }



    render(){
        return( 
        <View style={{ flex: 1, alignItems: 'center', width:'100%' ,justifyContent: 'space-between', backgroundColor: generalStyles.background}}>
    
            <View style={{alignSelf:'flex-start'}}>
                <Text style={{alignSelf:'flex-start', marginLeft:10,padding: 10, fontSize:20, fontWeight:'bold', color: 'white'}}>Market</Text>
                {/* <TouchableOpacity><Icon></Icon></TouchableOpacity> */}
            </View>
            <View style= {{padding:10, paddingBottom:3 ,width:'100%'}}>
            <View style = {{flexDirection:'row',justifyContent:'space-between',padding:10,marginBottom: 5, backgroundColor: generalStyles.secondaryColor, borderRadius:10}}>
              
                <Text style = {generalStyles.textStyle}>Rank</Text>
                <Text style = {generalStyles.textStyle}>Coin</Text>
                <Text style = {generalStyles.textStyle}>Price (USD)</Text>
                <Text style = {generalStyles.textStyle}>% Change</Text>
              
            </View>
            </View>
            <ScrollView style={{height:'100%', width:'100%', padding:10}}>
                {this.props.coins.map(coin=>{
                    //console.log("Mapear coin: ", coin);
                    let key = coin.id;
                    let simbolo = coin.symbol;
                    return (
                <TouchableOpacity key = {key} onPress={() => this.props.onCoinClick(coin)} delayPressIn={50} style = {{flexDirection:'row',justifyContent:'space-between',padding:10,marginBottom: 5, backgroundColor: generalStyles.secondaryColor, borderRadius:10}}>
                            <Text  style={{ alignSelf:'center', color: 'white'}} >#{coin.rank}</Text>
                            <Image style={{width:25, height:25}} source = {{uri : apis.cryptoIcons.api2 + '/'+ coin.symbol?.toLowerCase()+'/32x32'}}></Image>
                            <Text style={{ textTransform:'uppercase', alignSelf:'center', color: 'white'}}>{coin.symbol}</Text>
                       
                        <Text style={{alignSelf:'center', color: 'white'}} >{this.getCurrencyPrice(coin.quotes?.USD.price)}</Text>
                        <View>{this.getPercentageChange(coin)}</View>
                        {/* <Text style= {{ alignSelf: 'center', color: 'green'}}>{coin.quotes.USD.percent_change_24h}</Text> */}
                  
                    {/* <Button title="Add" style={{ height: 10, alignItems:'center' }}/> */}
                
                </TouchableOpacity>
                    )
                })}
           
            </ScrollView>
        </View>
    )
}

}




export default CoinList;