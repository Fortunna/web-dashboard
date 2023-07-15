import Store from "@/stores";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { WagmiConfig, createConfig, mainnet, useBalance } from "wagmi";
import { createPublicClient, http } from "viem";

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <Store>
        <Component {...pageProps} />
        <div id="modal"></div>
      </Store>
    </WagmiConfig>
  );
}
