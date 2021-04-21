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
  showMines,
  invertFlag,
  flagsUsed
} from './src/components/functions'
import MineField from './src/components/MineField'
import Header from './src/components/Header'
import LevelSelection from './src/components/Screens/LevelSelection'

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
      won:false, lost:false, showLevelSelection: false,
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

  onSelectField=(row,column)=>{
    const board=cloneBoard(this.state.board)
    invertFlag(board,row,column)
    const won=wonGame(board)
    if(won){
      Alert.alert('Parabéns!','Você venceu!')
    }
    this.setState({board,won})
  }

  onLevelSelected = level => {
    params.difficultLevel=level
    this.setState(this.createState())
  }

  render(){
    return (
      <View style={styles.container}>
        <LevelSelection isVisible={this.state.showLevelSelection} onLevelSelected={this.onLevelSelected} onCancel={()=> this.setState({ showLevelSelection: false})} onFlagPress={()=>this.setState({showLevelSelection:true})} />
        <Header flagsLeft={this.minesAmount()-flagsUsed(this.state.board)}
        onNewGame={()=>this.setState(this.createState())}
        />
        <View style={styles.board}>
          <MineField board={this.state.board} onOpenField={this.onOpenField} 
          onSelectField={this.onSelectField}
          ></MineField>
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

/* video 77 */