import React from 'react';
import { useAccount, useEnsName } from 'wagmi';

function Account() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const displayName = ensName ? `${ensName} (${address})` : address;

  return (
    <div>
      {displayName}
    </div>
  );
}

export default Account;
