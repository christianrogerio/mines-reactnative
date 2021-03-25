import React, {Component} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import params from './src/params';
import {createMineBoard} from './src/components/functions'
import MineField from './src/components/MineField'

/* 11:08 video */
export default class App extends Component {

  constructor(props){
    super(props)
    this.state=this.createState()
  }

  minesAmount=()=>{
    const cols=params.getColumnsAmount()
    const rows=params.getRowsAmount()
    return Math.ceil(cols*rows*params.difficultLevevl)
  }

  createState=()=>{
    const cols=params.getColumnsAmount()
    const rows=params.getRowsAmount()
    const totalMinas=this.minesAmount()
    return {
      board: createMineBoard(rows, cols, totalMinas),
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando o Mines</Text>
        <Text style={styles.instructions}>Tamanho de grade:
        {params.getColumnsAmount()}x{params.getColumnsAmount()}
        </Text>
        <View style={styles.board}>
          <MineField board={this.state.board} ></MineField>
        </View>        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-end',
  },
  board:{
    alignItems:'center',
    backgroundColor:'#AAA'
  }
});
