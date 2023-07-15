import Button from "@/components/button";
import Card from "@/components/card";
import FormGroup from "@/components/form/form-group";
import Radio from "@/components/radio";
import Typography from "@/components/typography";
import React, { MouseEventHandler } from "react";

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
  return (
    <div>
      <Card>
        <>
          <div className="md:grid grid-cols-2 gap-24">
            <FormGroup
              type="date"
              containerClassName="w-full mb-4"
              value={values.startTimestamp}
              onChange={(e) => {
                values.setStartTimestamp(e.target.value);
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
              value={values.endTimestamp}
              onChange={(e) => {
                values.setEndTimestamp(e.target.value);
              }}
              inputPlaceholder="2022-05-01T16:43(UTC)"
            />
          </div>
          <div className="md:grid grid-cols-2 gap-24">
            <FormGroup
              containerClassName="w-full mb-4"
              inputClassName="w-full"
              onChange={(e) => {
                values.setMinStakeAmount(e.target.value);
              }}
              inputPlaceholder="0.0001"
              value={values?.minStakeAmount.toString()}
              id="Minimum stake amount"
              label="Minimum stake amount"
            />
            <FormGroup
              containerClassName="w-full  mb-4"
              inputClassName="w-full"
              id="Maximum stake amount"
              onChange={(e) => {
                values.setMaxStakeAmount(e.target.value);
              }}
              value={values?.maxStakeAmount.toString()}
              label="Maximum stake amount"
              inputPlaceholder="0.0001"
            />
          </div>
          {/* <div className="mb-5">
            <Typography
              variant="body2"
              className="!text-neutrals-5 mb-[16px] !font-aeonik-pro-bold"
              label={"Early withdrawal fee (Optional)"}
            />
            <Radio label="Yes" checked={false} />
            <div className="mt-4"></div>
            <Radio label="No" checked={true} />
            <div className="mt-1"></div>
            <Typography
              variant="body0.5"
              label="You can enable/disable early withdrawal"
            />
          </div> */}
          <div className="md:grid grid-cols-2 gap-24">
            <div>
              {/* <FormGroup
                containerClassName="w-full  mb-4"
                inputClassName="w-full"
                id="% Loss"
                label="% Loss"
                inputPlaceholder="10"
              /> */}
            </div>
            {/* <div>
              <FormGroup
                containerClassName="w-full  mb-4"
                inputClassName="w-full"
                id="% From deposit/profit"
                label="% From deposit/profit"
                inputPlaceholder="Deposit"
              />
            </div> */}
          </div>
          <div className="md:grid grid-cols-2 gap-24">
            {/* <div>
              <FormGroup
                containerClassName="w-full  mb-4"
                inputClassName="w-full"
                id="Taken in"
                label="Taken in"
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
            </div> */}
            <div>
              <FormGroup
                containerClassName="w-full  mb-4"
                value={values.minLockUpRewardsPeriod}
                type="date"
                inputClassName="w-full"
                id="Minimum lock up period"
                onChange={(e) => {
                  values.setMinLockUpRewardsPeriod(e.target.value);
                }}
                label="Minimum lock up period"
                // inputPlaceholder="30 Days"
              />
            </div>
          </div>
          <div className="flex mt-8 justify-center">
            {onPrevious ? (
              <Button
                onClick={onPrevious}
                theme="dark"
                className="!px-12"
                size="big"
                label="Back"
              />
            ) : null}

            <div className="mx-4"></div>
            <Button
              theme="secondary"
              className="!px-12"
              size="big"
              onClick={onNext}
              label="Next"
            />
          </div>
        </>
      </Card>
    </div>
  );
}
