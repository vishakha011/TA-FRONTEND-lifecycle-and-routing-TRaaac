import React from "react";
import Repos from "./Repos";
import Followers from "./Followers";
import Followings from "./Followings";
import "dotenv";

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : null,
      activeButton : ""
    }
    this.baseState = this.state;
  }
  fetchData = (username) => {
    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(user => {
        this.setState({
          user : user
        })
      })
  }
  componentDidMount() {
    let {username} = this.props.match.params;
    this.fetchData(username);
  }
  componentWillReceiveProps(nextProps){
    this.setState(this.baseState)
    let {username} = nextProps.match.params;
    this.fetchData(username);
  }
  handleClick = (button) => {
    this.setState({
      activeButton : button
    })
  }
  render() {
    let user = this.state.user;

    if(!user) {
      return <h1>Loading...</h1>
    }
    return (
      <section className="">
        <div className="header">
          <div className="container">
            <div className="info flex">
              <img src={user.avatar_url} alt="user avatar"/>
              <div className="user">
                <h2 className="username">{user.name}({user.login})</h2>
                <p className="bio">{user.bio}</p>
              </div> 
            </div>
            <ul className="user-info flex-evenly">
              <li onClick={() => this.handleClick("publicRepos")}>
                <span>{user.public_repos}</span>
                <h5>PUBLIC REPOS</h5>
              </li>
              <li onClick={() => this.handleClick("followers")}>
                <span>{user.followers}</span>
                <h5>FOLLOWERS</h5>
              </li>
              <li onClick={() => this.handleClick("followings")}>
                <span>{user.following}</span>
                <h5>FOLLOWING</h5>
              </li>
            </ul>
          </div>
        </div>
        {
          this.state.activeButton === "publicRepos"
          ? <Repos username={user.login} url={user.repos_url} />
          : this.state.activeButton === "followers"
          ? <Followers  username={user.login} url={user.followers_url} />
          : this.state.activeButton === "followings"
          ? <Followings
              username={user.login}
              url={`${user.following_url.slice(0, user.following_url.indexOf("{"))}?authorized-request${process.env.TOKEN}`} />
          : ""
        }
      </section>
    )
  }
}