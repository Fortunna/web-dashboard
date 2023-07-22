import Button from "@/components/button";
import Card from "@/components/card";
import FormGroup from "@/components/form/form-group";
import Radio from "@/components/radio";
import Typography from "@/components/typography";
import React, { MouseEventHandler, useState } from "react";
import { useFarm } from "@/hooks/useFarm";
import { convertTimeStamptoDate } from "@/utils";
import { useNetwork } from "wagmi";
import { DEFAULT_VALUE, TOAST_MESSAGE } from "@/constants";
import { toast } from "react-toastify";

type componentProps = {
  onNext: MouseEventHandler<HTMLButtonElement>;
  onPrevious?: MouseEventHandler<HTMLButtonElement>;
  values: {
    setMinStakeAmount: (value: any) => void;
    minStakeAmount: any;
    setMaxStakeAmount: (value: any) => void;
    setEndTimestamp: (value: any) => void;
    setStartTimestamp: (value: any) => void;
    setMinLockUpRewardsPeriod: (value: any) => void;
    minLockUpRewardsPeriod: any;
    endTimestamp: any;
    startTimestamp: any;
    maxStakeAmount: any;
  };
};
export default function FarmParameters({
  onNext,
  onPrevious,
  values,
}: componentProps) {

  const {
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    minimumStakeAmount,
    setMinimumStakeAmount,
    maximumStakeAmount,
    setMaximumStakeAmount,
    withdrawFee,
    setWithdrawFee,
    lossPercentage,
    setLossPercentage,
    depositProfit,
    setDepositProfit,
    takeInOption,
    setTakeInOption,
    lockupPeriod,
    setLockupPeriod
  } = useFarm();

  const [stTime, setSTtime] = useState<string>(convertTimeStamptoDate(startTime));
  const [enTime, setENtime] = useState<string>(convertTimeStamptoDate(endTime));
  const [minValue, setMinValue] = useState<string>(minimumStakeAmount.toString());
  const [maxValue, setMaxValue] = useState<string>(maximumStakeAmount.toString());
  const {chain} = useNetwork();
  let validNumber = new RegExp(/^\d*\.?\d*$/);

  const onHandleNext = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    if (!chain){
      toast.error(TOAST_MESSAGE.CONNECT_WALLET, {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    if (!stTime.length) {
      toast.error(TOAST_MESSAGE.FILL_FIELD, {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    if (!enTime.length) {
      toast.error(TOAST_MESSAGE.FILL_FIELD, {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    if (minValue.length !== 0) {
      setMinimumStakeAmount(parseFloat(minValue));
    }
    if (maxValue.length !== 0) {
      setMaximumStakeAmount(parseFloat(maxValue));
    }

    if (!lossPercentage.length) {
      setLossPercentage(DEFAULT_VALUE.LOSS_PERCENTAGE);
    }
    if (!lockupPeriod.length) {
      setLockupPeriod(DEFAULT_VALUE.MINIMUM_LOCKUP_PERIOD);
    }
    if (!depositProfit.length) {
      setDepositProfit("0");
    }

    const st_timestamp = new Date(stTime).getTime();
    const en_timestamp = new Date(enTime).getTime();

    if (en_timestamp < st_timestamp) {
      toast.error(TOAST_MESSAGE.DATE_INCORRECT, {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    setStartTime(st_timestamp);
    setEndTime(en_timestamp);

    onNext(event);
  }
  
  return (
    <div>
      <Card>
        <>
          <div className="md:grid grid-cols-2 gap-24">
            <FormGroup
              type="date"
              containerClassName="w-full mb-4"
              value={stTime}
              onChange={(e) => {
                setSTtime(e.target.value);
              }}
              inputClassName="w-full"
              inputPlaceholder="2022-05-01T16:43(UTC)"
              id="Start time (UTC)*"
              label="Start time (UTC)*"
            />
            <FormGroup
              containerClassName="w-full  mb-4"
              inputClassName="w-full"
              id="End time (UTC)*"
              label="End time (UTC)*"
              type="date"
              value={enTime}
              onChange={(e) => {
                setENtime(e.target.value);
              }}
              inputPlaceholder="2022-05-01T16:43(UTC)"
            />
          </div>
          <div className="md:grid grid-cols-2 gap-24">
            <FormGroup
              containerClassName="w-full mb-4"
              inputClassName="w-full"
              onChange={(e) => {
                if (validNumber.test(e.target.value)) {
                  setMinValue(e.target.value);
                }
              }}
              inputPlaceholder={DEFAULT_VALUE.MINIMUM_STAKE_AMOUNT}
              value={minValue}
              id="Minimum stake amount"
              label="Minimum stake amount"
            />
            <FormGroup
              containerClassName="w-full  mb-4"
              inputClassName="w-full"
              id="Maximum stake amount"
              onChange={(e) => {
                if (validNumber.test(e.target.value)) {
                  setMaxValue(e.target.value);
                }
              }}
              value={maxValue}
              label="Maximum stake amount"
              inputPlaceholder={DEFAULT_VALUE.MAXIMUM_STAKE_AMOUNT}
            />
          </div>
          <div className="mb-5">
            <Typography
              variant="body2"
              className="!text-neutrals-5 mb-[16px] !font-aeonik-pro-bold"
              label={"Early withdrawal fee (Optional)"}
            />
            <div onClick={() => setWithdrawFee(true)}>
              <Radio label="Yes" checked={withdrawFee} />
              <div className="mt-4"></div>
            </div>
            <div onClick={() => setWithdrawFee(false)}>
              <Radio label="No" checked={!withdrawFee} />
              <div className="mt-1"></div>
            </div>
            <Typography
              variant="body0.5"
              label="You can enable/disable early withdrawal"
            />
          </div>
          <div className="md:grid grid-cols-2 gap-24">
            <div>
              <FormGroup
                containerClassName="w-full  mb-4"
                inputClassName="w-full"
                id="% Loss"
                label="% Loss"
                inputPlaceholder={DEFAULT_VALUE.LOSS_PERCENTAGE}
                disabled={!withdrawFee}
                onChange={(e) => {
                  if (validNumber.test(e.target.value)) {
                    setLossPercentage(e.target.value);
                  }
                }}
                value={lossPercentage}
              />
            </div>
            <div>
              <FormGroup
                containerClassName="w-full  mb-4"
                inputClassName="w-full"
                id="% From deposit/profit"
                label="% From deposit/profit"
                inputPlaceholder="0"
                disabled={!withdrawFee}
                onChange={(e) => {
                  if (validNumber.test(e.target.value)) {
                    setDepositProfit(e.target.value);
                  }
                }}
                value={depositProfit}
              />
            </div>
          </div>
          <div className="md:grid grid-cols-2 gap-24">
            <div>
              <FormGroup
                containerClassName="w-full  mb-4"
                inputClassName="w-full"
                id="Taken in"
                label="Taken in"
                disabled={!withdrawFee}
                inputPlaceholder="Both"
              />
              <div className="mt-[18px]">
                <Typography
                  variant="body0.5"
                  label="Set the percentage and the duration in which the fee applies"
                />
                <ul className="list-disc marker:text-blue ml-4">
                  <li className="my-1">
                    <Typography variant="body0.5" label="what % loss" />
                  </li>
                  <li className="mb-1">
                    <Typography
                      variant="body0.5"
                      label="taken from whole deposit/profit"
                    />
                  </li>
                  <li>
                    <Typography
                      variant="body0.5"
                      label="taken in token 1 / token 2 / both tokens."
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <FormGroup
                containerClassName="w-full  mb-4"
                inputClassName="w-full"
                id="Minimum lock up period"
                label="Minimum lock up period(day)"
                inputPlaceholder={DEFAULT_VALUE.MINIMUM_LOCKUP_PERIOD}
                onChange={(e) => {
                  if (validNumber.test(e.target.value)) {
                    setLockupPeriod(e.target.value);
                  }
                }}
                value = {lockupPeriod}
              />
            </div>
          </div>
          <div className="flex mt-8 justify-center">
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
        </>
      </Card>
    </div>
  );
}
