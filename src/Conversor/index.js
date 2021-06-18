
import React, {Component} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native';

import api from '../services/api';


class Conversor extends Component{

  constructor(props){
    super(props);
    const de_para = `${props.moedaA}_${props.moedaB}`
    this.state={
      moedaA: props.moedaA,
      moedaB: props.moedaB,
      moedaB_valor: 0,
      valorConvertido: 0,
      toggleInverter: true,
      de_para,
    };
    this.converter = this.converter.bind(this);
    this.trocarParametros = this.trocarParametros.bind(this);
  }

  async converter(){
    const {de_para} = this.state
       

    const response = await api.get(`convert?q=${de_para}&compact=ultra&apiKey=7c5ef455b88d735bc6ad`);
    let cotacao = response.data[de_para];
    
    let resultado = (cotacao * parseFloat(this.state.moedaB_valor));

    
    this.setState({
      valorConvertido: resultado.toFixed(2),
      
    });

    //Fechar o teclado automaticamente..
    Keyboard.dismiss();
  }

 trocarParametros(){
  
  
  const {toggleInverter, moedaA, moedaB} = this.state
  const de_para = toggleInverter ? `${moedaB}_${moedaA}` : `${moedaA}_${moedaB}`
  
  this.setState({
    de_para,
    toggleInverter: !toggleInverter,
    valorConvertido: 0,
  });
 
  }

  render(){
    const{ moedaA, moedaB, toggleInverter } = this.state;

    return(
      <View style={styles.container}>
        <Image
        source={require('../img/pig.jpg')}
        style={styles.img}
        />      
           
        <Text 
          style={styles.titulo}
        >{toggleInverter ? moedaA : moedaB} para {toggleInverter ? moedaB : moedaA}</Text>

        <TextInput
        placeholder="Valor a ser convertido"
        style={styles.areaInput}
        onChangeText={(moedaB_valor) => this.setState({moedaB_valor})}
        keyboardType="numeric"
        />
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.botaoArea} onPress={this.converter}>
          <Text style={styles.botaoTexto}>Converter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoTrocar} onPress={this.trocarParametros}>
          <Image 
          source={require('../img/exchange.png')}
          style={styles.imgex}
          />
          
        </TouchableOpacity>
      </View>
        <Text style={styles.valorConvertido}>
          {(this.state.valorConvertido == 0 || isNaN(this.state.valorConvertido) || this.state.valorConvertido === undefined) ? '' : this.state.valorConvertido}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',

  },
  img:{
    width: 150,
    height: 150,
  },
  titulo:{
    fontSize: 30,
    fontWeight: 'bold', 
    color: '#000'
  },
  areaInput:{
    width: 280,
    height: 45,
    backgroundColor:'#e6e6e6',
    textAlign:'center',
    marginTop: 15,
    fontSize: 20,
    color: '#000',
    borderRadius: 5,
  },
  botaoArea:{
    width: 150,
    height: 45,
    backgroundColor: '#FF3829',
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center',
    marginTop: 15,
  },
  botaoTexto:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  botaoTrocar:{
    height: 45,
    width: 45,
    backgroundColor: '#FF3829',
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center',
    marginTop: 15,
    marginLeft: 15
  },
  imgex:{
    height: 29,
    width: 29,
    
  },
  valorConvertido:{
    fontSize: 30,
    fontWeight:'bold',
    color:'#000',
    marginTop:15,
  }
});

export default Conversor;