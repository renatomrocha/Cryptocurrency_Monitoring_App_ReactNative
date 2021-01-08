// import * as React from 'react';
// import { View, Text, Button } from 'react-native';
// import { createChart } from 'lightweight-charts';
// import Footer from './Footer';


// export default  Chart = () => {
//     const chart = createChart(document.body, { width: 400, height: 300 });
//     const lineSeries = chart.addLineSeries();
//     lineSeries.setData([
//         { time: '2019-04-11', value: 80.01 },
//         { time: '2019-04-12', value: 96.63 },
//         { time: '2019-04-13', value: 76.64 },
//         { time: '2019-04-14', value: 81.89 },
//         { time: '2019-04-15', value: 74.43 },
//         { time: '2019-04-16', value: 80.01 },
//         { time: '2019-04-17', value: 96.63 },
//         { time: '2019-04-18', value: 76.64 },
//         { time: '2019-04-19', value: 81.89 },
//         { time: '2019-04-20', value: 74.43 },
//     ]);
   

   
//         return(
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Footer></Footer>
//               <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  
//                 <Text>Chart</Text>
//               </View>
//             </View>
//         )
    
// }

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {  View, Button, Text, Image, ActivityIndicator} from 'react-native';

import { VictoryCandlestick, VictoryChart, VictoryAxis, VictoryTheme , VictoryZoomContainer} from 'victory-native';
import Footer from './Footer';
import Service from '../services/Service';
import CustomChart from './CustomChart';
import _ from 'lodash';
import { useFocusEffect } from '@react-navigation/native';
import apis from '../APIs.json';
import {Picker} from '@react-native-picker/picker';
import generalStyles from '../generalStyles';

export default class Chart extends Component {

  
  


  service = new Service();



  constructor(props){
    super(props);
    this.state = {
      series : [],
      zoomLimits: {x:null, y:null},
      zoomedXDomain: {x:0},
      timeInterval: 1,
      loading: true
    }
  }


  componentDidMount(){
    
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({loading: true});
        this.service.getCandleForCoin(this.props.route.params.coin.name.toLowerCase(),this.state.timeInterval)
      .then(serie=>{
        serie = serie.data;

        this.setState({series: serie.map(r=> {return {x: new Date(r[0]), open: r[1], high: r[2], low:r[3], close:r[4]}})})
        this.setState({loading: false})

      })
    });

    this.setState({loading: true})
    this.service.getCandleForCoin(this.props.route.params.coin.name.toLowerCase(),this.state.timeInterval)
    .then(serie=>{
      serie = serie.data;
      this.setState({series: serie.map(r=> {return {x: new Date(r[0]), open: r[1], high: r[2], low:r[3], close:r[4]}})})
      this.setState({loading: false})

    })
  }

  componentWillUnmount(){
    console.log("Dei unmount");
  }

  handleValueChange(v,i){
    console.log("Changed value to: ", v);
  }

  updateCoin(itemValue){
    this.setState({timeInterval: itemValue});
    this.setState({loading: true})
    this.service.getCandleForCoin(this.props.route.params.coin.name.toLowerCase(), itemValue)
        .then(serie=>{
          serie = serie.data;
          this.setState({series: serie.map(r=> {return {x: new Date(r[0]), open: r[1], high: r[2], low:r[3], close:r[4]}})})
          this.setState({loading: false})
        })
  }


  hasLength(){
    return this.state.series.length>0;
  }




  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Footer></Footer>
        
      
        <View style = {{padding: 10, flexDirection:"row", alignContent:'center', backgroundColor: generalStyles.secondaryColor}}>
          <Image style={{width:30, height:30, alignSelf:'center', paddingLeft:30}} source = {{uri : apis.cryptoIcons.api2 + '/'+ this.props.route.params.coin.symbol?.toLowerCase()+'/32x32'}}></Image>
          <Text style={{alignSelf:'flex-start', marginLeft:10,padding: 10, fontSize:20, fontWeight:'bold'}}>{this.props.route.params.coin.name}</Text>
        </View>
        
      
        <View style={{flex:1, alignItems: 'center', backgroundColor: generalStyles.background}}>
          {(this.state.series.length>0 && !this.loading) && (<CustomChart data={this.state.series}/>)}
          {this.state.loading && (<View style = {{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <ActivityIndicator size="large" color={generalStyles.secondaryColor}/>
            <Text style = {{color: 'white'}}>Loading chart...</Text>
          </View>)}
          {(this.state.series.length>0 && !this.loading) && ( <View style={{padding: 50,alignContent:'flex-start', width:'100%'}}>
              <Text style={{ color:'white'}}>Last open: {this.state.series[this.state.series.length-1].open} $</Text>
              <Text style={{ color:'white'}}>Last close: {this.state.series[this.state.series.length-1].close} $</Text>
              <Text style={{ color:'white'}}>Last high: {this.state.series[this.state.series.length-1].high} $</Text>
              <Text style={{ color:'white'}}>Last low: {this.state.series[this.state.series.length-1].low} $</Text>
            </View>   )}
               
        </View>

       
        

        <View style={{  flexDirection:"column", backgroundColor: generalStyles.secondaryColor}}>
       
        <View style={{flexDirection: "row", justifyContent:"space-between"}}>
          <Text style={{alignSelf:'center', padding: 20}}>Select time interval:</Text>
          <Picker
            selectedValue={this.state.timeInterval}
            onValueChange={(itemValue, itemPosition) => {
                this.updateCoin(itemValue);
            }}
            style={{height: 50, width: 150, padding: 20,  borderRadius:50}}
            >
            <Picker.Item label="24h" value="1" />
            <Picker.Item label="7 days" value="7" />
            <Picker.Item label="14 days" value="14" />
            <Picker.Item label="1 month" value="30" />
            <Picker.Item label="3 months" value="90" />
            <Picker.Item label="6 months" value="180" />
            <Picker.Item label="1 year" value="365" />
            <Picker.Item label="max" value="max" />

          </Picker>
        </View>
        </View>

      </View>
    );
  }
}

// onValueChange={(itemValue, itemIndex) =>
//   this.setState({timeInterval: itemValue})
// }