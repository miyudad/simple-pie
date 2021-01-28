import React, { useState } from 'react';
import { ChainId, Token, WETH, Fetcher, Route } from '@uniswap/sdk'


export const Uniswap = () => {
  const [amplPrice, setAmplPrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const [yfiPrice, setYfiPrice] = useState(0);



  async function getPrice() {
    const AMPL = new Token(ChainId.MAINNET, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9)
    const USDT = new Token(ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6)
    const YFI = new Token(ChainId.MAINNET, '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e', 18)
    // note that you may want/need to handle this async code differently,
    // for example if top-level await is not an option
    /**
    Fetcher.fetchPairData(AMPL, WETH[AMPL.chainId])
      .then(result => {
        console.log(result);
        const pair = result;

        const route = new Route([pair], WETH[AMPL.chainId])

        console.log(route.midPrice.toSignificant(6)) // 201.306
        setAmpleth(route.midPrice.invert().toSignificant(6));
        console.log(route.midPrice.invert().toSignificant(6)) // 0.00496756
        
      }).catch(function (error) {
        console.log('Request failed', error)
      });
**/

    const ETHUSDTPair = await Fetcher.fetchPairData(USDT, WETH[ChainId.MAINNET])
    const AMPLUSDTPair = await Fetcher.fetchPairData(AMPL, USDT)
    const YFIUSDTPair = await Fetcher.fetchPairData(YFI, USDT)
    setEthPrice(ETHUSDTPair.token0Price.toSignificant(6))
    setAmplPrice(AMPLUSDTPair.priceOf(AMPL).toSignificant(6))
    setYfiPrice(YFIUSDTPair.priceOf(YFI).toSignificant(6))

    // setAmpleth(route.midPrice.invert().toSignificant(6));
  };



  return (
    <div>
      <button onClick={getPrice}>Click Me To Know Price:</button>
      <p>The Current ETH price On uniswap is  {ethPrice} USDT .</p>
      <p>The Current AMPL price On uniswap is  {amplPrice} USDT .</p>
      <p>The Current YFI price On uniswap is  {yfiPrice} USDT .</p>
    </div>
  );
};
