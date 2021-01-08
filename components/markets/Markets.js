import React, { Component } from "react";
import {FlatList, Button, Text, View , ScrollView, ActivityIndicator} from "react-native";
import Service from '../../services/Service';
import CoinList from '../CoinList';
import Footer from "../Footer";
import PageableEntity from "../../services/PageableEntity";
import Loader from 'react-loader-spinner';
import generalStyles from '../../generalStyles';
import Chart from '../Chart';
import { TouchableOpacity } from "react-native-gesture-handler";

const service = new Service;


class MarketScreen extends Component {

  
state;
  

constructor(props){
    super(props);


    this.state = {
      navigation: this.props.navigation,
      btcPrice: null,
      rates: [],
      prices: [],
      vsCoins:[],
      coins: [],
      allCoins: [],
      pagedCoins: [],
      pageableEntity: null,
      currentIndexes: [],
      loading : true
      
    }

}

  _keyExtractor = (item, index) => item.id.toString();

  updateRates(values){
    let symbols = ['BTC', 'ETH', 'EUR', 'USD'];
    let coins = values.filter(val => symbols.includes(val.currency));
    console.log("Coins: ", coins);
    this.setState({rates: coins})
  }


  updateVsCoins(value){
    this.setState({vsCoins: value})
  }

  updateCoins(value){
    this.setState({coins: value})
  }



  componentDidMount(){

    this.allCoins = service.paprikaGetTickers()
    .then(response => {
      this.state.loading = false;
      this.setState({pageableEntity: new PageableEntity(response.data.sort((a,b) => (a.rank > b.rank) ? 1 : ((b.rank > a.rank) ? -1 : 0)))})     
      this.setState({pagedCoins: this.state.pageableEntity.getPagedArray()});
      this.setState({currentIndexes: this.state.pageableEntity.getCurrentIndexes()});
      //console.log("Coins: ", this.pageableEntity.getPagedArray());
    })
    .catch(error =>{
      console.log("Erro: ", error);
    })

    
  }

  nextPage() {
      this.setState({pagedCoins: this.state.pageableEntity.nextPage()});
      this.setState({currentIndexes: this.state.pageableEntity.getCurrentIndexes()});
  }

  previousPage() {
    this.setState({pagedCoins: this.state.pageableEntity.previousPage()});
    this.setState({currentIndexes: this.state.pageableEntity.getCurrentIndexes()});
  }

 
 
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: generalStyles.background}}>
        <Footer></Footer>
        {!this.state.loading &&
        <View style={{height:'80%', width: '100%'}}>
          <CoinList style={{height: '100%'}} onCoinClick={($event) => {this.props.navigation.navigate('Chart', {coin: $event})}} coins={this.state.pagedCoins} navigation={this.props.navigation}></CoinList>
        </View>}
        {this.state.loading && <View style={{height:'80%', width: '100%', justifyContent:'center', alignContent:'center'}}>
               <View>
                  <ActivityIndicator size="large" color={generalStyles.secondaryColor}/>
                  <Text style={{alignSelf:'center', paddingTop: 10, color: 'white'}}>Listing coins...</Text>
              </View>
        </View>}
        <View style = {{width: '100%', flexDirection: "row",  justifyContent: 'space-around', marginTop:15}}>
              
                  <View style= {{padding: 10}}>
                      <Text style= {{ color: 'white'}}>Page: {this.state.pageableEntity?.currentPage} of {this.state.pageableEntity?.maxPage}</Text>
                  </View>
                  
                  <View style= {{ flexDirection:"row" , justifyContent: 'flex-end'}}>
                
                      <TouchableOpacity style = {{backgroundColor: generalStyles.mainColor, margin:10, height:30, width:50, borderRadius:20, justifyContent:'center'}} disabled={this.state.currentIndexes[0]==0} onPress={this.previousPage.bind(this)}>
                          <Text style = {{alignSelf:'center', color: 'white'}}>Prev</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style = {{backgroundColor: generalStyles.mainColor, margin:10, height:30, width:50, borderRadius:20, justifyContent:'center'}}  onPress={this.nextPage.bind(this)}>
                        <Text style = {{alignSelf:'center', color: 'white'}}>Next</Text>
                      </TouchableOpacity>
                  </View>
             
        </View>

         
      
      </View>
    )
  }
}

export default MarketScreen;