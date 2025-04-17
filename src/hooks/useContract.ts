import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from '../config/contract';
import TravelBookingABI from '../abi/TravelBooking.json';

export const useContract = () => {
  const getContract = async (needSigner = false) => {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('Please install MetaMask');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = needSigner ? await provider.getSigner() : provider;
    
    return new ethers.Contract(
      CONTRACT_ADDRESS,
      // @ts-ignore - Ignora l'errore TypeScript
      TravelBookingABI,
      signer
    );
  };


  const getTravels = async () => {
    const contract = await getContract();
    const travelCount = await contract.travelCount();
    const travels = [];
    
    for (let i = 1; i <= travelCount; i++) {
      const travel = await contract.getTravel(i);
      travels.push(travel);
    }
    
    return travels;
  };

  const bookTravel = async (travelId: number, price: string) => {
    const contract = await getContract(true);
    const tx = await contract.bookTravel(travelId, {
      value: ethers.parseEther(price)
    });
    return await tx.wait();
  };

  return {
    getTravels,
    bookTravel
  };
};
