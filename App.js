import React, {Component} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Alert
} from 'react-native';
import params from './src/params';
import {createMinedBoard, 
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines
} from './src/components/functions'
import MineField from './src/components/MineField'


export default class App extends Component {

  constructor(props){
    super(props)
    this.state=this.createState()
  }

  minesAmount=()=>{
    const cols=params.getColumnsAmount()
    const rows=params.getRowsAmount()
    return Math.ceil(cols*rows*params.difficultLevel)
  }

  createState=()=>{
    const cols=params.getColumnsAmount()
    const rows=params.getRowsAmount()
    const totalMinas=this.minesAmount()
    console.log('Total Minas:'+totalMinas)
    return {
      board: createMinedBoard(rows, cols, totalMinas),
      won:false, lost:false,
    }
  }

  onOpenField=(row,column)=>{
    //console.log(this.state.board)
    const board=cloneBoard(this.state.board)
    //console.log(board)
    openField(board,row,column)
    const lost = hadExplosion(board)
    const won = wonGame(board)
    if(lost){
      showMines(board)
      Alert.alert('Perdeeeeu!','Ai! Que buuuuuurro! Dá zero para ele.')
    }
    if(won){
      console.log(board)
      showMines(board)
      Alert.alert('Parabéns!','Você venceu!')
    }
    this.setState({board,lost,won})
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando o Mines</Text>
        <Text style={styles.instructions}>Tamanho de grade:
        {params.getColumnsAmount()}x{params.getColumnsAmount()}
        </Text>
        <View style={styles.board}>
          <MineField board={this.state.board} onOpenField={this.onOpenField} ></MineField>
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

/* video 74 9:27 */