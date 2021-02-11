// import FormContainer from "./FormContainer";
import React from "react";
import data from "../data/data.json"
// import moment from "moment";
import momentTimeZone from 'moment-timezone';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            counter : 3
        };
        this.timer = null;
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                time : new Date()
            })
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    handleAddclock = () => {
        if(!this.state.counter <= 3) {
            this.setState({
                counter : this.state.counter + 1
            })
        }
    }

    handleRemoveclock = () => {
        if(this.state.counter > 3) {
            this.setState({
                counter : this.state.counter - 1
            })
        }
    }

    render() {
        return(
        <>
        <header className="header">
            <div className="conatiner">
            <h1 className="title">🕜 World Clock</h1>
            </div>
        </header>

        <section className="container">
            <div className="flex-between">
                {data.slice(0, this.state.counter).map((timer) => {
                     let date = this.state.time
                     let timeZone = timer.tz
                     let result = momentTimeZone.tz( timeZone).format("LTS")
                    return < Time 
                    time = {timer} 
                    key = {timer.id}
                    result ={result.toLocaleString()}
                    />
                })}  
            </div>
            <div className="buttons">
                <button className="btn" onClick={this.handleRemoveclock}> - </button>
                <button className="btn" onClick={this.handleAddclock}> + </button>
            </div>
          
        </section>
        </>
    )
    }
}


function Time(props) {
   
    return (
        <>
        <div className="world-clock">
        <h1 className="time">{props.result}</h1>
        <h2 className="city">{props.time.city}</h2>
        </div>
        
        </>
    )
}

export default App;