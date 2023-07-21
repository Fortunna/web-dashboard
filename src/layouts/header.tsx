"use client";
import Button from "@/components/button";
import Typography from "@/components/typography";
import React, { useEffect, useState } from "react";
import MobileMenu from "./mobileMenu";
import { 
  useAccount, 
  useConnect, 
  useDisconnect, 
  useBalance, 
  useSwitchNetwork,
  useNetwork
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Spinner from "@/components/spinner";
import { SupportedChains } from "@/constants";

export default function Header({
  onOpenMobileMenu,
}: {
  onOpenMobileMenu: () => void;
}) {

  const [account, setAccount] = useState<string>("");
  const [networkName, setNetworkName] = useState<string>("Network");
  const {chain} = useNetwork();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector()
  });
  const { disconnect } = useDisconnect();
  const {switchNetwork} = useSwitchNetwork();
  const { data:balance, isError, isLoading } = useBalance({
    address: address,
  });
  const handleConnect = async () => {
    try {
      connect();
    } catch (error) {}
  };

  const handleDisconnect = async() => {
    try{
      disconnect();
    } catch(error){}
  };

  const handleSwitchNetwork = async() => {
    try {
      if (!switchNetwork)
        return;

      if (chain?.id === SupportedChains.ETH_MAINNET) {
        switchNetwork(SupportedChains.GOERLI);
      } else {
        switchNetwork(SupportedChains.ETH_MAINNET);
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (!chain)
      setNetworkName("Network");
    else if (chain.id !== SupportedChains.ETH_MAINNET && chain.id !== SupportedChains.GOERLI)
      setNetworkName("Unsupported");
    else
      setNetworkName(chain.name);
  }, [chain]);

  return (
    <div>
      <header className="flex flex-row lg:px-8 md:px-5 px-3 py-4 justify-between">
        <div className="flex align-center">
          <Typography
            use="div"
            className="!text-light-white flex items-center !font-dm-sans-bold"
            variant="body2"
            label="Fortuna Token"
          />
          <Typography
            variant="body2"
            className="!text-light-white flex items-center ps-4 pr-12 !font-dm-sans-bold"
            label="$0.96"
          />

          <div className="bg-deep-secondary md:flex hidden px-[10px] rounded-2xl py-[5px]  items-center justify-center">
            {/* <svg
              width={24}
              height={24}
              className="mr-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_126_240"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x={3}
                y={3}
                width={18}
                height={18}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0_126_240)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.50447 10.5637L12.0001 7.06824L15.4975 10.5655L17.5315 8.53156L12.0001 3L6.47049 8.52971L8.50447 10.5637ZM5.03414 9.96568L7.06808 11.9996L5.03394 14.0338L3 11.9998L5.03414 9.96568ZM12 16.9316L8.50445 13.4362L6.46749 15.4674L6.47033 15.4703L12 21L17.5315 15.4684L17.5325 15.4673L15.4973 13.4345L12 16.9316ZM21.0002 12.0009L18.9662 14.0349L16.9323 12.001L18.9663 9.96693L21.0002 12.0009ZM14.0639 11.999H14.0631L14.0649 12L14.0639 12.0011L12 14.065L9.93784 12.0029L9.935 12L9.93784 11.997L10.2994 11.6355L10.4745 11.4603H10.4747L12 9.9349L14.0639 11.999Z"
                  fill="#F5BC00"
                />
              </g>
            </svg> */}

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 417">
            <path fill="#343434" d="m127.961 0l-2.795 9.5v275.668l2.795 2.79l127.962-75.638z"/>
            <path fill="#8C8C8C" d="M127.962 0L0 212.32l127.962 75.639V154.158z"/>
            <path fill="#3C3C3B" d="m127.961 312.187l-1.575 1.92v98.199l1.575 4.601l128.038-180.32z"/>
            <path fill="#8C8C8C" d="M127.962 416.905v-104.72L0 236.585z"/>
            <path fill="#141414" d="m127.961 287.958l127.96-75.637l-127.96-58.162z"/>
            <path fill="#393939" d="m.001 212.321l127.96 75.637V154.159z"/>
            </svg>

            <a onClick={handleSwitchNetwork}>
              
              <Typography
                variant="body2"
                className="!font-dm-sans-bold cursor-pointer"
                label={networkName}
              />
            </a>
          </div>
        </div>
        <div className="flex items-center ">
          {/* <div className="flex items-center mr-10 md:block hidden">
            <Typography variant="body2" className="" label="EN/USD" />

            <svg
              width={6}
              height={4}
              viewBox="0 0 6 4"
              fill="none"
              className="ms-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.80474 0.528595C5.54439 0.268246 5.12228 0.268246 4.86193 0.528595L3 2.39052L1.13807 0.528595C0.877722 0.268246 0.455612 0.268246 0.195262 0.528595C-0.0650877 0.788945 -0.0650877 1.21105 0.195262 1.4714L2.5286 3.80474C2.78894 4.06509 3.21105 4.06509 3.4714 3.80474L5.80474 1.4714C6.06509 1.21105 6.06509 0.788945 5.80474 0.528595Z"
                fill="#777E91"
              />
            </svg>
          </div> */}
          <div>
            <div className="flex item-center">
              {!isConnected ? (
                <Button
                  onClick={handleConnect}
                  className="font-dm-sans-bold"
                  rounded
                  label={
                    account
                      ? account.slice(0, 4) +
                        "..." +
                        account.slice(account.length - 4, account.length)
                      : "Connect wallet"
                  }
                />
              ) : (
                <div className="!bg-[#141414] px-4 py-3 rounded-3xl flex items-center">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <Typography
                      className="!text-secondary"
                      label={balance?.formatted.slice(0, 5) + " " + (chain?.nativeCurrency.symbol)}
                    />
                  )}

                  <svg
                    width={3}
                    height={16}
                    className="mx-4"
                    viewBox="0 0 3 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.304 15.024C0.984 15.024 0.738667 14.9387 0.568 14.768C0.397333 14.5973 0.312 14.3467 0.312 14.016V1.6C0.312 1.25867 0.397333 1.008 0.568 0.848C0.738667 0.677333 0.984 0.591999 1.304 0.591999C1.624 0.591999 1.86933 0.677333 2.04 0.848C2.22133 1.008 2.312 1.25867 2.312 1.6V14.016C2.312 14.688 1.976 15.024 1.304 15.024Z"
                      fill="white"
                    />
                  </svg>
                  <div onClick={handleDisconnect}>
                    <Typography
                      label={`${address?.slice(0, 10)}...${address?.slice(-4)}`}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              )}
              <svg
                onClick={onOpenMobileMenu}
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-menu-2 md:hidden block ms-3 w-[30px] h-auto "
                width={44}
                height={44}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#e5e7ed"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 6l16 0" />
                <path d="M4 12l16 0" />
                <path d="M4 18l16 0" />
              </svg>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
