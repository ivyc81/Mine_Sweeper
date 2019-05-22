import React, {PureComponent} from 'react';
import styled from 'styled-components';

const StyledNewGameForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: ${({value}) => {
    return value === '' ? 'grey' : 'white';
  }}
`;

class NewGameForm extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      height: 10,
      width: 10,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleSubmit(evt) {
    const {triggerMakeBoard} = this.props;
    const {height, width} = this.state;
    evt.preventDefault();

    triggerMakeBoard(height, width);
  }

  render(){
    const {height, width} = this.state;
    return (
      <StyledNewGameForm onSubmit={this.handleSubmit}>
        <label htmlFor='height' >Height:</label>
        <input name='height' value={height} onChange={this.handleChange}/>
        <label htmlFor='width' >Width:</label>
        <input name='width' value={width} onChange={this.handleChange}/>
        <button>Start New Game</button>
      </StyledNewGameForm>
    )
  }
}

export default NewGameForm;