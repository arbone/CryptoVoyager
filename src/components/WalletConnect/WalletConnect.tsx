// src/components/WalletConnect/WalletConnect.tsx
import { useWeb3 } from '../../context/Web3Context';
import { formatAddress } from '../../utils/web3';

const WalletConnect = () => {
  const { account, balance, connectWallet, isConnected } = useWeb3();

  return (
    <div className="flex items-center gap-4">
      {isConnected ? (
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <span className="text-sm text-green-800 dark:text-green-200">
              {balance?.substring(0, 6)} ETH
            </span>
          </div>
          <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-800 dark:text-gray-200">
              {formatAddress(account || '')}
            </span>
          </div>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
