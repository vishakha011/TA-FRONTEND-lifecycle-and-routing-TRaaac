import React from "react";
import {Link} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username : ""
    }
  }
  handleInputText = ({target}) => {
    let {value} = target;
    this.setState({
      username : value
    })
  }
  render() {
    return (
   
    <div className="form">
        <form className="flex-between" onChange={this.handleInputText}>
            <input type="text" placeholder="Type Username.."></input>

            <Link to={`/users/${this.state.username}`}>
                <button className="btn">Search</button>
            </Link>
            
        </form>
    </div>
    )
  }
}

export default App;