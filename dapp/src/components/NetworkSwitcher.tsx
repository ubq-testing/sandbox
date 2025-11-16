import React from 'react';
import { BaseError } from 'viem';
import { useNetwork, useSwitchNetwork } from 'wagmi';

function NetworkSwitcher() {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  const renderNetworkButtons = () => {
    if (!switchNetwork) return null;

    return (
      <div>
        {chains.map((x) =>
          x.id === chain?.id ? null : (
            <button key={x.id} onClick={() => switchNetwork(x.id)}>
              {x.name}
              {isLoading && x.id === pendingChainId && ' (switching)'}
            </button>
          )
        )}
      </div>
    );
  };

  return (
    <div>
      <div>
        Connected to {chain?.name ?? chain?.id}
        {chain?.unsupported && ' (unsupported)'}
      </div>

      {renderNetworkButtons()}

      <div>{error && (error as BaseError).shortMessage}</div>
    </div>
  );
}

export default NetworkSwitcher;
