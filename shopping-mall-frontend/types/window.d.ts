export {};

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: {
        method: string;
        params?: readonly unknown[];
      }) => Promise<unknown>;
    };
  }
}
