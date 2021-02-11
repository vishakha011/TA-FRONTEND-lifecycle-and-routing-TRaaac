import React from "react";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : null,
            user : {
                field : "name",
                value : ""
            }

        }
    }

    componentDidMount() {
        this.handleUser()
    }
    
    handleUser = async () => {
        let response = await fetch("https://randomuser.me/api/");
        let data = await response.json();

        this.setState({
            data : data.results[0],
            user : {
                field : "name",
                value : `${data.results[0].name.first} ${data.results[0].name.last}`
            }
        })
    }

    handleRandomUser = () => {
        this.handleUser()
    }


    handleData = ({target}) => {
        let id = target.dataset.id;
        let user = null;
        switch(id) {
            case "email" :
                user = {
                    field : id,
                    value : this.state.data.email
                }
                break;
            case "age" :
                user = {
                    field : id,
                    value : this.state.data.dob.age
                }
                break;
            case "street" :
                user = {
                    field : id,
                    value : `${this.state.data.location.street.number}, ${this.state.data.location.street.name}`
                }
                break;

            case "phone" :
                user = {
                    field : id,
                    value : this.state.data.phone
                }
                break;

            case "password" :
                user = {
                    field : id,
                    value : this.state.data.login.password
                }
                break;
            default : 
            user = {
                field: id,
                value : `${this.state.data.name.first} ${this.state.data.name.last}`
            }
            break;
        }

        this.setState({ user })

    }

   
    render() {
        let data = this.state.data;

    if (!this.state.data) {
        return (
                <div className="profile-card center-text">
                    <div className="loader"></div>
                </div>
            );
        }
     return (
        <>
        <div className ="profile-card">
            <div className ="profile-card__img">
                <img src={data.picture.large} alt="profile card" className="img" />
                
            </div>

            <div className ="profile-card__cnt">

                <div className ="profile-card__txt">My {this.state.user.field} is</div>
                <div className ="profile-card__name">{this.state.user.value}</div>
            
                <div className ="profile-card-social">
                    
                    <span className ="profile-card-social__item" onClick = {this.handleData}>
                        <i className="fas fa-user icon-font" data-id="name"></i>
                    </span>
        
                    <span className ="profile-card-social__item" onClick = {this.handleData}>
                        <i className="fas fa-envelope-open icon-font"  data-id="email"></i>       
                    </span>
                
                    <span className ="profile-card-social__item" onClick = {this.handleData}>
                        <i className="fas fa-trash-alt icon-font" data-id="age"></i>
                    </span>
                
                    <span className ="profile-card-social__item" onClick = {this.handleData}>
                        <i className="fas fa-map icon-font" data-id="street"></i>
                    </span>
                
                    <span className ="profile-card-social__item" onClick = {this.handleData}>
                        <i className="fas fa-phone icon-font" data-id="phone"></i>
                    </span>
                
                    <span className="profile-card-social__item" onClick = {this.handleData}>
                        <i className="fas fa-lock icon-font" data-id="password"></i>
                    </span>
            

                </div>

                <div className="profile-card-ctr">
                    <button className="profile-card__button button--blue js-message-btn" onClick = {this.handleRandomUser}>Random</button>
                </div>
            </div>
        </div>
    </>
    )
     }
}

export default Card;