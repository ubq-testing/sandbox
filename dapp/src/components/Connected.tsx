import React, { ReactNode } from 'react';
import { useAccount } from 'wagmi';

interface ConnectedProps {
  children: ReactNode;
}

function Connected({ children }: ConnectedProps) {
  const { isConnected } = useAccount();

  return isConnected ? <>{children}</> : null;
}

export default Connected;
