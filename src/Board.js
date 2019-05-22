import React, {Component} from 'react';
import {drawRandom} from './helper';
import styled from 'styled-components';
import Button from './Button';

const StyledBoard = styled.div`
  height: 100vh;
  display: flex;
  margin: auto;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  margin: auto;

  table, td {
    border: 1px solid black;
  }

  td {
    width: 3rem;
    height: 3rem;
  }

`;

const StyledBanner = styled.div`
  position: absolute;
  top: 15px;
  align-text: center;
  width: 100vw;
  font-size: 4em;
`;

class Board extends Component {
  constructor(props){
    super(props);
    this.state={
      b: [],
      button: [],
      lost: false,
      win: false,
      start: true,
    }
    this.checkValue = this.checkValue.bind(this);
    this.flag = this.flag.bind(this);
  }

  componentDidUpdate(prevProps){
    const {x, y, gameId} = this.props;
    if(prevProps.gameId !== gameId){
      const b = Array.from({length: x}, () => Array.from({length: y}, () => 0));
      const button = Array.from({length: x}, () => Array.from({length: y}, () => ''));
      this.setState({b, button, lost: false, win: false, start: true});
    }
  }

  checkValue(x, y){
    const {b, button, win, start} = this.state;
    const boardWidth = b[0].length;
    const boardLength = b.length;
    let newButton = [...button];
    let nowLost;

    if(start){
      const currNum = x * boardWidth + y;
      this.createBoard(boardLength, boardWidth, currNum);
    }

    if(!win){
      if(b[x][y] === 'mine'){
        newButton = [...b];
        nowLost = true;
      } else if(b[x][y]){
        newButton[x][y] = b[x][y];
      } else {
        newButton = this.findBorder(x, y, newButton, b);
      }

      let nowWin;
      if(!nowLost){
        nowWin = this.checkWin(newButton, b);
      }
      this.setState({button: newButton, lost: nowLost, win: nowWin, start: false});
    }
  }

  flag(x, y){
    const {button} = this.state;
    const newButton = [...button];
    newButton[x][y] = '!';

    this.setState({buttln: newButton})
  }

  findBorder(x, y, newButton, board, seen = new Set()){
    for(let i = x - 1; i <= x + 1; i++){
      for(let j = y - 1; j <= y + 1; j++){
        if(board[i] && board[i][j] >= 0 && newButton[i][j] !== '!'){
          newButton[i][j] = board[i][j];
          if (board[i][j] === 0 && !seen.has(`${i}${j}`)){
          seen.add(`${i}${j}`);
          this.findBorder(i, j, newButton, board, seen);
          }
        }
      }
    }

    return newButton;
  }

  checkWin(currButton, board){
    for(let i = 0; i < currButton.length; i ++){
      for(let j = 0; j < currButton[i].length; j++){
        if(board[i][j] !== 'mine' && currButton[i][j] !== board[i][j]){
          return false;
        }
      }
    }

    return true;
  }

  checkSourrounding(b, x, y){
    for(let i = x - 1; i <= x + 1; i++){
      for(let j = y - 1; j <= y + 1; j++){
        if(b[i] && b[i][j] >= 0 && b[i][j] !== 'mine'){
          b[i][j] ++;
        }
      }
    }

    return b;
  }

  createBoard(length, width, startPoint){
    const {b} = this.state;
    let newBoard = [...b];
    const mines = drawRandom(0.1, length * width, startPoint);
    for(let num of mines){
      const x = Math.floor(num / width);
      const y = num % width;
      newBoard[x][y] = 'mine';
      newBoard = this.checkSourrounding(newBoard, x, y);
    }
    this.setState({b: newBoard});
  }

  renderBoard(){
    const {button} = this.state;

    return button.map((row, rowIdx) => {
      return <tr key={rowIdx}>
        {row.map((cell, cellIdx) => {
          return <td key={cellIdx}>
                  <Button
                    key={`${rowIdx}, ${cellIdx}`}
                    x={rowIdx}
                    y={cellIdx}
                    value={cell}
                    triggerCheckValue={this.checkValue}
                    triggerFlag={this.flag}
                  />
                </td>
        })}
      </tr>
    })
  }

  render(){
    const {lost, win} = this.state;
    const boardHTML = this.renderBoard();
    return (
      <StyledBoard>
        {lost && <StyledBanner>You Lost!</StyledBanner>}
        {win && <StyledBanner>Congrats!</StyledBanner>}
        <StyledTable>
          <tbody>
            {boardHTML}
          </tbody>
        </StyledTable>
      </StyledBoard>
    )
  }
}

export default Board;