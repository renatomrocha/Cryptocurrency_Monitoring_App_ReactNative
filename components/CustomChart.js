
import React, {Component} from 'react';
import { VictoryCandlestick, VictoryChart, VictoryAxis, VictoryVoronoiContainer , VictoryZoomContainer, createContainer, VictoryTheme} from 'victory-native';
import _ from 'lodash';
import {View, Text} from 'react-native';
import generalStyles from '../generalStyles';
const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

export default class CustomChart extends React.Component {

    constructor(props){
        super(props);
        console.log("Recbi props: ", props);
        this.entireDomain = this.getEntireDomain(props);
        this.state = {
        zoomedXDomain: this.entireDomain.x,
        data: this.props.data
        };
    }

    componentDidUpdate() {

    }

    onDomainChange(domain) {
        this.setState({
          zoomedXDomain: domain.x,
        });
      }
    
    getData() {
      const  zoomedXDomain  = this.state.zoomedXDomain;
      const  data  = this.props.data;
      if(data){
        var processedData =  data.filter((d) => (d.x >= zoomedXDomain[0] && d.x <= zoomedXDomain[1]));
        this.setState({data: processedData});
        return processedData;
      } else{
        return [];
      }
    }

      getZoomFactor() {
        const zoomedXDomain  = this.state.zoomedXDomain;
        const factor = 10 / (zoomedXDomain[1] - zoomedXDomain[0]);
        return _.round(factor, factor < 3 ? 1 : 0);
      }
    
      getEntireDomain(props) {
          //console.log("Recebi props: ", props);
        const  data  = props.data;
        const maxPrice = Math.max.apply(Math, data.map((o) => { return o.high; }));
        const minPrice = Math.min.apply(Math, data.map((o) => { return o.low; }));
        const minDate = Math.min.apply(Math, data.map((o) => { return o.x; }));
        const maxDate = Math.max.apply(Math, data.map((o) => { return o.x; }));
        return {
          y: [minPrice, maxPrice],
          x: [minDate, maxDate]
        };
      }




      dataAtualFormatada(date){
        var data = new Date(date),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }
    



    render(){
        return ( 
       <View style={{backgroundColor: generalStyles.background, flex: 1}}>
        <VictoryChart  theme = {VictoryTheme.material}>
              <VictoryAxis tickCount={6}
              tickFormat={(t) => this.dataAtualFormatada(t)}
              style={{grid:{stroke:'white', strokeWidth: 0.5}, ticks: {size: 10} , tickLabels: {angle: -30, fontSize:9, fill: 'white'}}}/> 
             <VictoryAxis 
             style={{grid:{stroke:'white', strokeWidth: 0.5}, ticks: {size: 10} , tickLabels: {angle: -30, fontSize:9, fill: 'white'}}}
              dependentAxis
              tickFormat={(t) => t + '$'}
              />  
              <VictoryCandlestick style = {{data: {strokeWidth:0}}} candleColors={{ positive: generalStyles.green, negative:  generalStyles.red }}
              candleRatio={0.7}
              
              data={this.props.data}
                />
        </VictoryChart>

        </View>
        )
    }
}