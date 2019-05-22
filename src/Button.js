import React, {PureComponent} from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
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

class Button extends PureComponent {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    const {x, y, triggerCheckValue} = this.props;
    const button = evt.button;
    console.log(button)

    if(button === 0){
      triggerCheckValue(x, y);
    }
  }

  render(){
    const {value} = this.props;
    return (
      <StyledButton onClick={this.handleClick} value={value}>
        {value === 0 ? '' : value}
      </StyledButton>
    )
  }
}

export default Button;