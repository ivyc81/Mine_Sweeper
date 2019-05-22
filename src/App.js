import React, {Component} from 'react';
import Board from './Board';
import NewGameForm from './NewGameForm'
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      height: 0,
      width: 0,
      gameId: 0,
    }
    this.makeBoard = this.makeBoard.bind(this);
  }

  makeBoard(x, y){
    const gameId = Math.random();
    this.setState({
      height: x,
      width: y,
      gameId
    })
  }

  render(){
    const {height, width, gameId} = this.state;
    return (
      <div className="App">
        <NewGameForm triggerMakeBoard={this.makeBoard}/>
        <Board height={height} width={width} gameId={gameId}/>
      </div>
    );
  }
}

export default App;
