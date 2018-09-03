import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {buildBlackList} from './helpers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('black list should be empty', () => {
  const users = [{
    "name": "User",
    "wont_eat": ["Fish"],
    "drinks": ["Coke"]
  }];
  const venues = [{
    "name": "Restaurant",
    "food": ["Beef", "Fish"],
    "drinks": ["Coke"]
  }];
  expect(buildBlackList(users, venues)).toEqual([]);
});

it('black list should return Restaurant with user has no drink', () => {
  const users = [{
    "name": "User",
    "wont_eat": ["Fish"],
    "drinks": ["Coke"]
  }];
  const venues = [{
    "name": "Restaurant",
    "food": ["Beef", "Fish"],
    "drinks": ["Juice"]
  }];
  expect(buildBlackList(users, venues)).toEqual([{name: 'Restaurant', users: [{name: 'User', noFood: false, noDrink: true}]}]);
});

it('black list should return Restaurant with user has no food', () => {
  const users = [{
    "name": "User",
    "wont_eat": ["Fish"],
    "drinks": ["Coke"]
  }];
  const venues = [{
    "name": "Restaurant",
    "food": ["Fish"],
    "drinks": ["Coke"]
  }];
  expect(buildBlackList(users, venues)).toEqual([{name: 'Restaurant', users: [{name: 'User', noFood: true, noDrink: false}]}]);
});

it('black list should return Restaurant2 with user2 has no food and user3 has no drink', () => {
  const users = [{
    "name": "User1",
    "wont_eat": ["Duck"],
    "drinks": ["Water"]
  }, {
    "name": "User2",
    "wont_eat": ["Chicken"],
    "drinks": ["Juice"]
  }, {
    "name": "User3",
    "wont_eat": ["Beef"],
    "drinks": ["Coke"]
  }];
  const venues = [{
    "name": "Restaurant1",
    "food": ["Fish", "Beef"],
    "drinks": ["Water", "Coke", "Juice"]
  }, {
    "name": "Restaurant2",
    "food": ["Chicken"],
    "drinks": ["Water", "Juice"]
  }, {
    "name": "Restaurant3",
    "food": ["Fish"],
    "drinks": ["Water", "Wine"]
  }];

  expect(buildBlackList(users, venues)).toEqual([
    {
      "name": "Restaurant2",
      "users": [
        {
          "name": "User2",
          "noDrink": false,
          "noFood": true
        },
        {
          "name": "User3",
          "noDrink": true,
          "noFood": false
        }
      ]
    },
    {
      "name": "Restaurant3",
      "users": [
        {
          "name": "User2",
          "noDrink": true,
          "noFood": false
        },
        {
          "name": "User3",
          "noDrink": true,
          "noFood": false
        }
      ]
    }
  ]);
});
