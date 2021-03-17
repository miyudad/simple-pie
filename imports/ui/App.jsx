import React from 'react';
import { Hello } from './Hello.jsx';
import { Myeth } from './Myeth.jsx';
import { Account } from './Account.jsx';
import { Uniswap } from './Uniswap.jsx';
//import { GetPrice } from './GetPrice.jsx';
import { Info } from './Info.jsx';

export const App = () => (
  <div>
    <h1>DreamFi Book 1.0</h1>
    <Hello />
    <Account />
    <Myeth />
    <Uniswap />
    <Info />
  </div>
);
