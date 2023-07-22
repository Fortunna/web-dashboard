import Store from "@/stores";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { mainnet, goerli } from 'wagmi/chains'
import { FarmProvider } from "@/hooks/useFarm";
import { publicProvider } from 'wagmi/providers/public'
import { ToastContainer } from "react-toastify";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli],
  [publicProvider()]
);

// Set up wagmi config
const config = createConfig({
  autoConnect: false,
  publicClient,
  connectors: [
    new MetaMaskConnector(), 
    new InjectedConnector()]
});

// Pass config to React Context Provider

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <FarmProvider>
        <Store>
          <Component {...pageProps} />
          <div id="modal"></div>
          <ToastContainer/>
        </Store>
      </FarmProvider>
    </WagmiConfig>
  );
}
