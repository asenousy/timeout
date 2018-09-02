import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { buildBlackList } from './helpers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should', () => {
  const users = [{
    "name": "User",
    "wont_eat": ["Fish"],
    "drinks": ["Coke"]
  }];
  const venues = [{
    "name": "Restaurant",
    "food": ["Beef"],
    "drinks": ["Coke"]
  }];
  expect(buildBlackList(users, venues)).toEqual([]);
});
