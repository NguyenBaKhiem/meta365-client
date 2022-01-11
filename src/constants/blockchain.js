import { ethers } from "ethers";

export const TESTNET_PROVIDER = new ethers.providers.JsonRpcProvider(
  "https://data-seed-prebsc-1-s1.binance.org:8545/"
);
export const MAINNET_PROVIDER = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org/"
);
let web3Provider;
if (window.ethereum) {
  web3Provider = new ethers.providers.Web3Provider(window.ethereum, "any");
} else {
  web3Provider = new ethers.providers.JsonRpcProvider(
    "https://data-seed-prebsc-1-s1.binance.org:8545/"
  );
}
export const WEB3_PROVIDER = web3Provider;

export const TESTNET = {
  PROVIDER: new ethers.providers.JsonRpcProvider(
    "https://data-seed-prebsc-1-s1.binance.org:8545/"
  ),
  tokenAddress: "0xc920250547E8F3AB3Ff37528ae5134559d1D0B85",
  busdAddress: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
  usdtAddress: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
};
export const MAINNET = {
  PROVIDER: new ethers.providers.JsonRpcProvider(
    "https://bsc-dataseed.binance.org/"
  ),
  tokenAddress: "0xc920250547E8F3AB3Ff37528ae5134559d1D0B85",
  busdAddress: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
  usdtAddress: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
};
