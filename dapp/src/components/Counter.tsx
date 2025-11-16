import React, { useState } from 'react';
import {
  useCounterNumber,
  useCounterSetNumber,
  useCounterIncrement,
  usePrepareCounterIncrement,
  usePrepareCounterSetNumber,
  useWaitForTransaction,
  useNetwork,
} from 'wagmi';

function Counter() {
  return (
    <div>
      <Count />
      <SetNumber />
      <Increment />
    </div>
  );
}

function Count() {
  const { data: count } = useCounterNumber();
  return <div>Count: {count?.toString()}</div>;
}

function SetNumber() {
  const [value, setValue] = useState('');
  const { data, write, config } = useCounterSetNumber({
    args: value ? [BigInt(value)] : undefined,
    enabled: Boolean(value),
    onSuccess: () => setValue(''),
  });

  const { refetch } = useCounterNumber();
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: refetch,
  });

  return (
    <div>
      Set Number:
      <input
        disabled={isLoading}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <button disabled={!write || isLoading} onClick={write}>
        Set
      </button>
      {isLoading && <ProcessingMessage hash={data?.hash} />}
    </div>
  );
}

function Increment() {
  const { data, write, config } = useCounterIncrement();
  const { refetch } = useCounterNumber();
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: refetch,
  });

  return (
    <div>
      <button disabled={!write || isLoading} onClick={write}>
        Increment
      </button>
      {isLoading && <ProcessingMessage hash={data?.hash} />}
    </div>
  );
}

function ProcessingMessage({ hash }) {
  const { chain } = useNetwork();
  const etherscan = chain?.blockExplorers?.etherscan;

  return (
    <span>
      Processing transaction...{' '}
      {etherscan && (
        <a href={`${etherscan.url}/tx/${hash}`}>{etherscan.name}</a>
      )}
    </span>
  );
}

export default Counter;
