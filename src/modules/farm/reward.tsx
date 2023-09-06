import Button from "@/components/button";
import Card from "@/components/card";
import FormGroup from "@/components/form/form-group";
import Radio from "@/components/radio";
import Typography from "@/components/typography";
import React, { ChangeEventHandler, MouseEventHandler, useEffect, useState } from "react";
import { ethers } from 'ethers';
import { useFarm } from "@/hooks/useFarm";
import FortunnaFactoryABI from "@/assets/FortunnaFactory.json";
import { useNetwork, useWalletClient, usePublicClient, Address } from "wagmi";
import { toast } from "react-toastify";
import { DEFAULT_VALUE, FACTORY_ADDRESS, SupportedChains, TOAST_MESSAGE } from "@/constants";
import { makeCostUnit } from "@/utils";

type componentProps = {
  onNext: MouseEventHandler<HTMLButtonElement>;
  onPrevious: MouseEventHandler<HTMLButtonElement>;
};
export default function CreateFarmReward({
  onNext,
  onPrevious,
}: componentProps) {

  const {
    tokenBAddress,
    tokenARewardQt,
    setTokenARewardQt,
    tokenARewardDis,
    setTokenARewardDis,
    tokenARewardInit,
    setTokenARewardInit,
    tokenBRewardQt,
    setTokenBRewardQt,
    tokenBRewardDis,
    setTokenBRewardDis,
    tokenBRewardInit,
    setTokenBRewardInit,
    rewardToken,
    setRewardToken,
    setTokenARewardDur,
    setTokenBRewardDur,
    costFarm,
    setCostFarm
  } = useFarm();

  const [AQuant, setAQuant] = useState<string>(tokenARewardQt.toString());
  const [BQuant, setBQuant] = useState<string>(tokenBRewardQt.toString());
  const [AInit, setAInit] = useState<string>(tokenARewardInit.toString());
  const [BInit, setBInit] = useState<string>(tokenBRewardInit.toString());
  const [ADis, setADis] = useState<string>(tokenARewardDis.toString());
  const [BDis, setBDis] = useState<string>(tokenBRewardDis.toString());
  const { chain } = useNetwork();
  const chainId = chain?.id;
  const { data: walletClient } = useWalletClient({ chainId });
  const publicClient = usePublicClient();
  let validNumber = new RegExp(/^\d*\.?\d*$/);

  useEffect(() => {
    const setCost = async () => {

      try {

        const info: any = await publicClient.readContract({
          address: FACTORY_ADDRESS[chain?.id as SupportedChains] as Address,
          abi: FortunnaFactoryABI,
          functionName: "paymentInfo",
        });
        setCostFarm(ethers.formatEther(info[1]));
      } catch (err) {
        console.error(err);
      }
    }
    if (walletClient && chain)
      setCost();

  }, [walletClient, chain]);

  useEffect(() => {
    if (!tokenBAddress) {
      setRewardToken(1);
    } else {
      setRewardToken(0);
    }
  }, []);

  const onChangeSelection = (event: { target: { value: any; }; }) => {
    const selectedToken = event.target.value;
    setRewardToken(selectedToken);
    if (selectedToken == 1) {
      setBQuant('0');
      setBDis('0');
      setBInit('0');
    } else if (selectedToken == 2) {
      setAQuant('0');
      setADis('0');
      setAInit('0');
    }
  }

  const onChangeADurationSelection = (event: { target: { value: any; }; }) => {
    const selectedToken = event.target.value;
    setTokenARewardDur(selectedToken == 0 ? 1 : selectedToken == 1 ? 7 : 30);
  }

  const onChangeBDurationSelection = (event: { target: { value: any; }; }) => {
    const selectedToken = event.target.value;
    setTokenBRewardDur(selectedToken == 0 ? 1 : selectedToken == 1 ? 7 : 30);
  }

  const onHandleNext = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    if (!chain) {
      toast.error(TOAST_MESSAGE.CONNECT_WALLET, {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    if (tokenBAddress) {
      if (rewardToken != 2 && (!AQuant.length || AQuant === "0")) {
        toast.error(TOAST_MESSAGE.FILL_FIELD, {
          position: toast.POSITION.TOP_CENTER
        });
        return;
      }
      if (rewardToken != 1 && (!BQuant.length || BQuant === "0")) {
        toast.error(TOAST_MESSAGE.FILL_FIELD, {
          position: toast.POSITION.TOP_CENTER
        });
        return;
      }
    } else {
      setRewardToken(1);
    }


    setTokenARewardQt(!AQuant.length ? 0 : parseFloat(AQuant));
    setTokenBRewardQt(!BQuant.length ? 0 : parseFloat(BQuant));
    setTokenARewardInit(!AInit.length ? 0 : parseFloat(AInit));
    setTokenBRewardInit(!BInit.length ? 0 : parseFloat(BInit));
    setTokenARewardDis(!ADis.length ? 0 : parseFloat(ADis));
    setTokenBRewardDis(!BDis.length ? 0 : parseFloat(BDis));

    onNext(event);
  }

  return (
    <div>
      <Card>
        <>
          <Typography
            label="(*) is required field."
            variant="body1"
            className="!text-secondary mb-[18px] !font-aeonik-pro"
          />
          {tokenBAddress ?
            <FormGroup
              useSelect
              options={[
                { title: "Both (Token A and Token B)" },
                { title: "Token A" },
                { title: "Token B" },
              ]}
              containerClassName="w-full mb-[28px]"
              selectClassName="w-full"
              inputPlaceholder="Rewards Token"
              id="Rewards Token"
              label="Rewards Token"
              onChange={onChangeSelection}
              value={rewardToken.toString()}
            /> :
            <FormGroup
              containerClassName="w-full mb-[16px]"
              inputClassName="w-full"
              id="Rewards Token"
              label="Rewards Token"
              disabled={true}
              value={"Token A"}
            />
          }

          <div className="md:grid grid-cols-2 gap-24">
            <div>
              <Typography
                variant="semi-heading"
                label="Token A"
                className="mb-4"
              />

              <FormGroup
                containerClassName="w-full mb-[16px]"
                inputClassName="w-full"
                id="Reward Quantity"
                label={rewardToken != 2 ? "Reward Quantity*" : "Reward Quantity"}
                inputPlaceholder="Ex. 0.1"
                onChange={(event) => {
                  const val = event.target.value;
                  if (validNumber.test(val)) {
                    setAQuant(val);
                  }
                }}
                value={AQuant}
                disabled={rewardToken != 2 ? false : true}
                bgColor={rewardToken != 2 ? "" : "dimgray"}
              />
              <FormGroup
                containerClassName="w-full mb-[16px]"
                inputClassName="w-full"
                id="Reward Distribution Frequency"
                label="Reward Distribution Frequency"
                inputPlaceholder="Ex. 5%"
                onChange={(event) => {
                  const val = event.target.value;
                  if (validNumber.test(val)) {
                    setADis(val);
                  }
                }}
                value={ADis}
                disabled={rewardToken != 2 ? false : true}
                bgColor={rewardToken != 2 ? "" : "dimgray"}
              />

              <Typography
                className="mt-[4px] mb-4"
                variant="body0.5"
                label="Reward distributed in Linear/Increasing/Decreasing/Custom"
              />
              <div className="mb-[20px]">
                <Typography
                  variant="body2"
                  className="!text-neutrals-5 mb-[16px] !font-aeonik-pro-bold"
                  label={"Compounding"}
                />
                <div className="flex items-center">
                  <Radio label="Yes" checked={false} />
                  <div className="mx-4"></div>
                  <Radio label="No" checked={true} />
                </div>
              </div>
              <FormGroup
                useSelect
                options={[
                  { title: "Daily - 24h" },
                  { title: "Weekly - 7 days" },
                  { title: "Monthly - 30 days" },
                ]}
                containerClassName="w-full mb-4"
                selectClassName="w-full"
                id="Reward Distribution Duration"
                label="Reward Distribution Duration"
                onChange={onChangeADurationSelection}
                disabled={rewardToken != 2 ? false : true}
                bgColor={rewardToken != 2 ? "" : "dimgray"}
              />

              <FormGroup
                containerClassName="w-full mb-[16px]"
                inputClassName="w-full"
                id="Initial Deposit Amount"
                label="Initial Deposit Amount"
                inputPlaceholder="Ex. 0.1"
                onChange={(event) => {
                  const val = event.target.value;
                  if (validNumber.test(val)) {
                    setAInit(val);
                  }
                }}
                value={AInit}
                disabled={rewardToken != 2 ? false : true}
                bgColor={rewardToken != 2 ? "" : "dimgray"}
              />
            </div>
            <div>
              <Typography
                variant="semi-heading"
                label="Token B"
                className="mb-4"
              />

              <FormGroup
                containerClassName="w-full mb-[16px]"
                inputClassName="w-full"
                id="Reward Quantity"
                label={rewardToken != 1 ? "Reward Quantity*" : "Reward Quantity"}
                inputPlaceholder="Ex. 0.1"
                onChange={(event) => {
                  const val = event.target.value;
                  if (validNumber.test(val)) {
                    setBQuant(val);
                  }
                }}
                value={BQuant}
                disabled={rewardToken != 1 ? false : true}
                bgColor={rewardToken != 1 ? "" : "dimgray"}
              />
              <FormGroup
                containerClassName="w-full mb-[16px]"
                inputClassName="w-full"
                id="Reward Distribution Frequency"
                label="Reward Distribution Frequency"
                inputPlaceholder="Ex. 5%"
                onChange={(event) => {
                  const val = event.target.value;
                  if (validNumber.test(val)) {
                    setBDis(val);
                  }
                }}
                value={BDis}
                disabled={rewardToken != 1 ? false : true}
                bgColor={rewardToken != 1 ? "" : "dimgray"}
              />

              <Typography
                className="mt-[4px] mb-4"
                variant="body0.5"
                label="Reward distributed in Linear/Increasing/Decreasing/Custom"
              />
              <div className="mb-[20px]">
                <Typography
                  variant="body2"
                  className="!text-neutrals-5 mb-[16px] !font-aeonik-pro-bold"
                  label={"Compounding"}
                />
                <div className="flex items-center">
                  <Radio label="Yes" checked={false} />
                  <div className="mx-4"></div>
                  <Radio label="No" checked={true} />
                </div>
              </div>
              <FormGroup
                useSelect
                options={[
                  { title: "Daily - 24h" },
                  { title: "Weekly - 7 days" },
                  { title: "Monthly - 30 days" },
                ]}
                containerClassName="w-full mb-4"
                selectClassName="w-full"
                id="Reward Distribution Duration"
                label="Reward Distribution Duration"
                disabled={rewardToken != 1 ? false : true}
                bgColor={rewardToken != 1 ? "" : "dimgray"}
                onChange={onChangeBDurationSelection}
              />

              <FormGroup
                containerClassName="w-full mb-[16px]"
                inputClassName="w-full"
                id="Initial Deposit Amount"
                label="Initial Deposit Amount"
                inputPlaceholder="Ex. 0.1"
                onChange={(event) => {
                  const val = event.target.value;
                  if (validNumber.test(val)) {
                    setBInit(val);
                  }
                }}
                value={BInit}
                disabled={rewardToken != 1 ? false : true}
                bgColor={rewardToken != 1 ? "" : "dimgray"}
              />
            </div>
          </div>

          <div className="text-center mt-8 ">
            <div>
              <Typography
                variant="body3"
                className="!text-secondary !font-aeonik-pro-bold mb-3"
                label={"Need equivalent of " + makeCostUnit(costFarm, chain?.nativeCurrency.symbol) + " to create pool"}
              />
            </div>
            <div className="flex justify-center">
              <Button
                onClick={onPrevious}
                theme="dark"
                className="!px-12"
                size="big"
                label="Back"
              />
              <div className="mx-4"></div>
              <Button
                theme="secondary"
                className="!px-12"
                size="big"
                onClick={onHandleNext}
                label="Next"
              />
            </div>
          </div>
        </>
      </Card>
    </div>
  );
}
