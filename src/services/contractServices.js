import { ethers } from "ethers";

export const buyNFT = async (param) => {
    try {
        const contract = new ethers.Contract(param.contractAddress, param.abi, param.provider);
        const tx = await contract.buyNFT(param.tokenId, param.price);
        return {
            status: true,
            data: tx
        }
    } catch (error) {
        return {
            status: false,
            data: error
        }
    }
}