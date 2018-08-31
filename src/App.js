import React, {Component} from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentName: '',
      users: [],
      whiteList: [],
      blackList: []
    };
  }

  handleAdd = () => {
    const {users, currentName} = this.state;
    if (!currentName) return alert('please add valid name');
    this.setState({users: [...users, currentName], currentName: ''});
  }

  handleRemove = (index) => {
    const newUsers = this.state.users.slice(); 
    newUsers.splice(index, 1);
    this.setState({users: newUsers});
  }

  handleChange = (event) => {
    this.setState({currentName: event.target.value});
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {users} = this.state;
      const venues = await (await fetch('/venues.json')).json();
      const usersList = await (await fetch('/users.json')).json();

      const foundUsers = users.map(name => {
        const user = usersList.find(user => user.name.toLowerCase() === name.toLowerCase());
        if (!user) throw `user ${name}does not exit'`;
        return user;
      });

      const blackList = venues.reduce((blackList, {name: venueName, food, drinks: venueDrinks}) => {
        const blackUsers = foundUsers.reduce((list, {name: userName, wont_eat, drinks: UserDrinks}) => {
          const noFood = food.every(food => wont_eat.find(eat => eat.toLowerCase() === food.toLowerCase()));
          const noDrink = !venueDrinks.some(drink => UserDrinks.find(userDrink => userDrink.toLowerCase() === drink.toLowerCase()));
          if (noFood || noDrink) list.push({name: userName, noFood, noDrink});
          return list;
        }, []);
        blackUsers.length && blackList.push({name: venueName, users: blackUsers});
        return blackList;
      }, []);

      const whiteList = venues.filter(venue => !blackList.find(blackVenue => blackVenue.name.toLowerCase() === venue.name.toLowerCase()));
      this.setState({whiteList, blackList});
    } catch (error) {
      alert(error);
    }
  }

  displayWhiteList = () => {
    return <div>
      <h3>Go To:</h3>
      <ul>
        {this.state.whiteList.map((list, i) => <li key={list.name + i}>{list.name}</li>)}
      </ul>
    </div>
  }

  displayBlackList = () => {
    return <div>
      <h3>Avoid:</h3>
      <ul>
        {this.state.blackList.map((list, i) => {
          return <div key={list.name + i}>
            <li>{list.name}</li>
            <ul>
              {list.users.map((user, j) => <li key={user.name + j}>there is nothing for {user.name} to {user.noFood ? (user.noDrink ? 'eat or drink' : 'eat') : 'drink'}</li>)}
            </ul>
          </div>
        })}
      </ul>
    </div>
  }

  names = () => {
    const {users} = this.state;
    return <ul>{users.map((name, i) => <li key={name + i}>{name} <input type="button" value="-" onClick={this.handleRemove.bind(this, i)} /></li>)}</ul>;
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Time to Eat</h1>
        </header>
        <div className="App">
          <form className="pad-vertical" onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.currentName} onChange={this.handleChange} placeholder="who" />
            <input type="button" value="+" onClick={this.handleAdd} />
            <div className="pad-vertical">
              {this.names()}
              <input type="submit" value="Submit" />
            </div>
          </form>
          {this.state.whiteList.length ? this.displayWhiteList() : null}
          {this.state.blackList.length ? this.displayBlackList() : null}
        </div>
      </div>
    );
  }
}

export default App;
