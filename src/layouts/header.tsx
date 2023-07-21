"use client";
import Button from "@/components/button";
import Typography from "@/components/typography";
import React, { useState } from "react";
import MobileMenu from "./mobileMenu";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Spinner from "@/components/spinner";

export default function Header({
  onOpenMobileMenu,
}: {
  onOpenMobileMenu: () => void;
}) {
  const [account, setAccount] = useState("");

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const { data, isError, isLoading } = useBalance({
    address: address,
  });

  const handleConnect = async () => {
    try {
      connect();
    } catch (error) {}
  };
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              style={{ width: "15px", height: "auto" }}
              width="100%"
              height="100%"
              version="1.1"
              shapeRendering="geometricPrecision"
              className="mr-2"
              textRendering="geometricPrecision"
              imageRendering="optimizeQuality"
              fillRule="evenodd"
              clipRule="evenodd"
              viewBox="0 0 784.37 1277.39"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              // xmlns:xodm="http://www.corel.com/coreldraw/odm/2003"
            >
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer" />
                <g id="_1421394342400">
                  <g>
                    <polygon
                      fill="#343434"
                      fillRule="nonzero"
                      points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "
                    />
                    <polygon
                      fill="#8C8C8C"
                      fillRule="nonzero"
                      points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "
                    />
                    <polygon
                      fill="#3C3C3B"
                      fillRule="nonzero"
                      points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "
                    />
                    <polygon
                      fill="#8C8C8C"
                      fillRule="nonzero"
                      points="392.07,1277.38 392.07,956.52 -0,724.89 "
                    />
                    <polygon
                      fill="#141414"
                      fillRule="nonzero"
                      points="392.07,882.29 784.13,650.54 392.07,472.33 "
                    />
                    <polygon
                      fill="#393939"
                      fillRule="nonzero"
                      points="0,650.54 392.07,882.29 392.07,472.33 "
                    />
                  </g>
                </g>
              </g>
            </svg>

            <Typography
              variant="body2"
              className="!font-dm-sans-bold"
              label="ETH"
            />
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
                      label={data?.formatted + " " + data?.symbol}
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

                  <Typography
                    label={`${address?.slice(0, 10)}...${address?.slice(-4)}`}
                  />
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
