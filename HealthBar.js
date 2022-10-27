import  React from "react";
class BalanceBar extends React.Component {
  
    constructor() {
      super();
      // debugger;
      this.state = { 
        budget: 2000,
        spent: 1677,
        spending: 197,
      };
      
      this.setBudget = this.setBudget.bind(this);
    }
    
    setBudget(amount) {
      this.setState({spent: amount});
    }
   
    render() {
      
      let bal = (this.state.budget - this.state.spent - this.state.spending)
      let spentPercent = (this.state.spent / this.state.budget * 100);
      let spendingPercent = (this.state.spending / this.state.budget * 100);
      let balPercent = (100 - spentPercent - spendingPercent);
      
      return (
        <div>
          <div className='balanceBar'>
            <div className='balanceSection spent' style={{'width': spentPercent+'%'}}></div>
            <div className='balanceSection spending' style={{'width': spendingPercent+'%'}}></div>
            <div id='left' className='balanceSection left' style={{'width': balPercent+'%'}}><p>${bal} left</p></div>    
          </div>
          <a href='#' onClick={this.setBudget.bind(this, 107)}>Set to 107</a>
          <br />
          <a href='#' onClick={this.setBudget.bind(this, 807)}>Set to 807</a>
        </div>
      );
    }
  }
  
  //React.render(<BalanceBar />, document.body);

  export default BalanceBar