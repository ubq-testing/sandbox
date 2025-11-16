import React from 'react';
import { BaseError } from 'viem';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

function Connect() {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      {isConnected && (
        <div>
          <button onClick={() => disconnect()}>
            Disconnect from {connector?.name}
          </button>
        </div>
      )}

      <div>
        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <div key={x.id}>
              <button onClick={() => connect({ connector: x })}>
                {x.name}
                {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
              </button>
            </div>
          ))}
      </div>

      {error && (
        <div>
          {(error as BaseError).shortMessage}
        </div>
      )}
    </div>
  );
}

export default Connect;
