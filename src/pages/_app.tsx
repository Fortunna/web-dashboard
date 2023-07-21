import Store from "@/stores";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { mainnet, goerli } from 'wagmi/chains'
import { FarmProvider } from "@/hooks/useFarm";
import { publicProvider } from 'wagmi/providers/public'
import { ToastContainer } from "react-toastify";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const { publicClient, chains } = configureChains(
  [mainnet, goerli],
  [publicProvider()]
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [
    new MetaMaskConnector(), 
    new InjectedConnector()]
});

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
