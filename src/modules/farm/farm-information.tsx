import Button from "@/components/button";
import Card from "@/components/card";
import FormGroup from "@/components/form/form-group";
import Radio from "@/components/radio";
import Typography from "@/components/typography";
import {
  useNetwork
} from "wagmi";
import React, { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { PoolMode, SupportedChains, TOAST_MESSAGE } from "@/constants";
import { getTokenInfo } from "@/api";
import { useFarm } from "@/hooks/useFarm";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkAddressValidation } from "@/utils";

type componentProps = {
  poolMode: PoolMode;
  onNext: MouseEventHandler<HTMLButtonElement>;
};
export default function FarmInformation({ poolMode, onNext }: componentProps) {

  const [showAErrorBorder, setShowAErrorBorder] = useState<boolean>();
  const [showBErrorBorder, setShowBErrorBorder] = useState<boolean>();
  const [tokenBInputDisabled, setTokenBInputDisabled] = useState<boolean>(true);
  const { chain } = useNetwork();

  const {
    poolName,
    setPoolName,
    poolImage,
    setPoolImage,
    tokenAAddress,
    setTokenAAddress,
    tokenASymbol,
    setTokenASymbol,
    tokenADecimal,
    setTokenADecimal,
    tokenALogo,
    setTokenALogo,
    tokenBAddress,
    setTokenBAddress,
    tokenBSymbol,
    setTokenBSymbol,
    tokenBDecimal,
    setTokenBDecimal,
    tokenBLogo,
    setTokenBLogo
  } = useFarm();

  const setTokenAInfo = useCallback(async (address: string) => {
    if (!chain)
      return;

    const [symbol, decimal] = await getTokenInfo(address, chain.id!, chain.rpcUrls.default.http[0]);

    if (symbol && decimal) {
      setTokenASymbol(symbol);
      setTokenADecimal(decimal);
    } else {
      setTokenASymbol("");
      setTokenADecimal(0);
    }
  }, [chain, tokenAAddress, tokenBAddress]);

  const setTokenBInfo = useCallback(async (address: string) => {
    if (!chain)
      return;

    const [symbol, decimal] = await getTokenInfo(address, chain.id!, chain.rpcUrls.default.http[0]);

    if (symbol && decimal) {
      setTokenBSymbol(symbol);
      setTokenBDecimal(decimal);
    } else {
      setTokenBSymbol("");
      setTokenBDecimal(0);
    }

  }, [chain, tokenAAddress, tokenBAddress]);

  useEffect(() => {
    setTokenBInputDisabled(poolMode == PoolMode.CLASSIC_FARM ? true : false);
    if (poolMode == PoolMode.CLASSIC_FARM)
      setTokenBAddress("");
  }, [poolMode]);

  const onCreateFarm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    if (!chain) {
      toast.error(TOAST_MESSAGE.CONNECT_WALLET, {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    if (poolMode == PoolMode.UNISWAP_POOL && tokenAAddress > tokenBAddress && !tokenBInputDisabled) {
      toast.error(TOAST_MESSAGE.TOKENA_ADDRESS_MUST_BE_LESS_THAN_TOKENB_ADDRESS, {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    if (!poolName ||
      (!tokenBInputDisabled && (!tokenASymbol || !tokenBSymbol)) ||
      (tokenBInputDisabled && !tokenASymbol)
    ) {
      setShowAErrorBorder(true);
      toast.error(TOAST_MESSAGE.FILL_FIELD, {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    onNext(event);
  }

  const onSetPoolName = (event: { target: { value: any; }; }) => {
    const val = event.target.value;
    setPoolName(val);
  }

  const onSetPoolImage = (event: { target: { value: any; }; }) => {
    const val = event.target.value;
    setPoolImage(val);
  }
  const onChangeTokenA = (event: { target: { value: any; }; }) => {
    const val = event.target.value;
    setShowAErrorBorder(false);
    if (checkAddressValidation(val))
      setTokenAAddress(val);
  }

  const onChangeTokenB = (event: { target: { value: any; }; }) => {
    const val = event.target.value;
    setShowBErrorBorder(false);
    if (checkAddressValidation(val))
      setTokenBAddress(val);
  }

  const onChangeSelection = (event: { target: { value: any; }; }) => {
    const selectedToken = event.target.value;
    if (selectedToken == 0) {
      setTokenBInputDisabled(true);
      setTokenBAddress("");
    }
    else {
      setTokenBInputDisabled(false);
    }
  }

  useEffect(() => {
    if (chain != undefined) {
      setTokenAInfo(tokenAAddress);
      setTokenBInfo(tokenBAddress);
    }
  }, [chain, tokenAAddress, tokenBAddress]);

  return (
    <div>
      <Card>
        <>

          {poolMode == PoolMode.CLASSIC_FARM &&
            <>
              <Typography
                label="(*) is required field."
                variant="body1"
                className="!text-secondary mb-[18px] !font-aeonik-pro"
              />
              <FormGroup
                useSelect
                options={[
                  { title: "Single Token" },
                  { title: "Dual Token" },
                ]}
                containerClassName="w-full mb-[28px]"
                selectClassName="w-full"
                inputPlaceholder="Pool Type"
                id="Pool Type"
                label="Pool Type"
                onChange={onChangeSelection}
              />
            </>
          }
          <FormGroup
            containerClassName="w-full mb-[24px]"
            inputClassName="w-full"
            inputPlaceholder="Ex. Fortuna Pool"
            id="label"
            label="Pool Name*"
            onChange={onSetPoolName}
            value={poolName}
          />
          <FormGroup
            containerClassName="w-full"
            inputClassName="w-full"
            id="Pool Image (Optional)"
            label="Pool Image (Optional)"
            inputPlaceholder="Ex. https://upload.fortuna.io"
            onChange={onSetPoolImage}
            value={poolImage}
          />
          <Typography
            variant="body2"
            className="!text-neutrals-5 my-7 !font-aeonik-pro-bold"
            label={"Tokens Info"}
          />
          <div className="md:grid grid-cols-2 gap-24">
            <div>
              <Typography
                variant="semi-heading"
                label="Token A"
                className="mb-4"
              />
              <FormGroup
                containerClassName="w-full mb-[24px]"
                inputClassName="w-full"
                id="Contract Address"
                label="Contract Address*"
                inputPlaceholder="Ex. 0xbb9bc244d798123fde783fcc1c72d3bb8c189413"
                inputAgain={showAErrorBorder}
                onChange={onChangeTokenA}
                value={tokenAAddress}
              />
              <FormGroup
                containerClassName="w-full mb-[24px]"
                inputClassName="w-full"
                id="Token Symbol"
                label="Token Symbol*"
                value={tokenASymbol}
                disabled={true}
              />
              <FormGroup
                containerClassName="w-full mb-[24px]"
                inputClassName="w-full"
                id="Token Decimals"
                label="Token Decimals*"
                value={tokenADecimal.toString()}
                disabled={true}
              />
              <FormGroup
                containerClassName="w-full mb-[24px]"
                inputClassName="w-full"
                id="Token Logo URL (Optional)"
                label="Token Logo URL (Optional)"
                inputPlaceholder="Ex. https://upload.fortuna.io"
                onChange={(event) => setTokenALogo(event.target.value)}
                value={tokenALogo}
              />
              <div className="mb-12">
                <Typography
                  variant="body2"
                  className="!text-neutrals-5 mb-[16px] !font-aeonik-pro-bold"
                  label={"Token Network"}
                />
                <Radio label="ETH" checked={
                  chain?.id !== SupportedChains.ETH_MAINNET
                } />
                <div className="mt-4"></div>
                <Radio label="BSC" checked={
                  chain?.id === SupportedChains.BSC_TESTNET
                } />
                <div className="mt-4"></div>
                <Typography
                  variant="body0.5"
                  label={`Users will pay with ${chain?.id! === SupportedChains.BSC_TESTNET ? "BNB" : "ETH"} for your token`}
                />
              </div>
            </div>
            <div>
              <Typography
                variant="semi-heading"
                label="Token B"
                className="mb-4"
              />
              <FormGroup
                containerClassName="w-full mb-[24px]"
                inputClassName="w-full"
                id="Contract Address"
                label="Contract Address*"
                inputPlaceholder="Ex. 0xbb9bc244d798123fde783fcc1c72d3bb8c189413"
                bgColor={!tokenBInputDisabled ? "" : "dimgray"}
                inputAgain={showBErrorBorder}
                onChange={onChangeTokenB}
                value={tokenBAddress}
                disabled={tokenBInputDisabled}
              />
              <FormGroup
                containerClassName="w-full mb-[24px]"
                inputClassName="w-full"
                id="Token Symbol"
                label="Token Symbol*"
                bgColor={!tokenBInputDisabled ? "" : "dimgray"}
                disabled={true}
                value={tokenBSymbol}
              />
              <FormGroup
                containerClassName="w-full mb-[24px]"
                inputClassName="w-full"
                id="Token Decimals"
                label="Token Decimals*"
                bgColor={!tokenBInputDisabled ? "" : "dimgray"}
                disabled={true}
                value={tokenBDecimal.toString()}
              />
              <FormGroup
                containerClassName="w-full mb-[24px]"
                inputClassName="w-full"
                id="Token Logo URL (Optional)"
                label="Token Logo URL (Optional)"
                bgColor={!tokenBInputDisabled ? "" : "dimgray"}
                inputPlaceholder="Ex. https://upload.fortuna.io"
                onChange={(event) => setTokenBLogo(event.target.value)}
                value={tokenBLogo}
              />
              <div className="mb-12">
                <Typography
                  variant="body2"
                  className="!text-neutrals-5 mb-[16px] !font-aeonik-pro-bold"
                  label={"Token Network"}
                />
                <Radio label="ETH" checked={
                  chain?.id !== SupportedChains.ETH_MAINNET
                } />
                <div className="mt-4"></div>
                <Radio label="BSC" checked={
                  chain?.id === SupportedChains.BSC_TESTNET
                } />
                <div className="mt-4"></div>
                <Typography
                  variant="body0.5"
                  label={`Users will pay with ${chain?.id! === SupportedChains.BSC_TESTNET ? "BNB" : "ETH"} for your token`}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={onCreateFarm}
              theme="secondary"
              className="!px-10"
              size="big"
              label="Create Pool"
              rightComponent={
                <svg
                  className="ms-1"
                  width={11}
                  height={10}
                  viewBox="0 0 11 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_87_1899)">
                    <path
                      d="M0.705078 5.3125L5.39258 0.625M5.39258 0.625H0.705078M5.39258 0.625V5.3125"
                      stroke="#FCFCFC"
                      strokeWidth="0.9375"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_87_1899">
                      <rect
                        width="6.25"
                        height="6.25"
                        fill="white"
                        transform="translate(0.0800781)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              }
            />
          </div>
        </>
      </Card>
    </div>
  );
}
