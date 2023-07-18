import Button from "@/components/button";
import Card from "@/components/card";
import FormGroup from "@/components/form/form-group";
import Radio from "@/components/radio";
import Typography from "@/components/typography";
import React, { MouseEventHandler } from "react";

type componentProps = {
  onNext: MouseEventHandler<HTMLButtonElement>;
  onPrevious: MouseEventHandler<HTMLButtonElement>;
};
export default function CreateFarmReward({
  onNext,
  onPrevious,
}: componentProps) {
  return (
    <div>
      <Card>
        <>
          <Typography
            label="(*) is required field."
            variant="body1"
            className="!text-secondary mb-[18px] !font-aeonik-pro"
          />
          <FormGroup
            useSelect
            options={[
              { title: "Both (Token A and Token B)" },
              { title: "Both (Token A and Token B)" },
              { title: "Both (Token A and Token B)" },
            ]}
            containerClassName="w-full mb-[28px]"
            selectClassName="w-full"
            inputPlaceholder="Rewards Token"
            id="Rewards Token"
            label="Rewards Token"
          />

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
                id="Reward Quantity*"
                label="Reward Quantity*"
                inputPlaceholder="Ex. 0.1"
              />
              <FormGroup
                useSelect
                options={[
                  { title: "Linear" },
                  { title: "Linear" },
                  { title: "Linear" },
                ]}
                containerClassName="w-full mb"
                selectClassName="w-full"
                id="Reward Distribution"
                label="Reward Distribution"
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
                  { title: "Weekly - 7 days" },
                  { title: "Weekly - 7 days" },
                  { title: "Weekly - 7 days" },
                ]}
                containerClassName="w-full mb-4"
                selectClassName="w-full"
                id="Reward Distribution Duration"
                label="Reward Distribution Duration"
              />

              <FormGroup
                containerClassName="w-full mb-[16px]"
                inputClassName="w-full"
                id="Initial Deposit Amount"
                label="Initial Deposit Amount"
                inputPlaceholder="Ex. 0.1"
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
                id="Reward Quantity*"
                label="Reward Quantity*"
                inputPlaceholder="Ex. 0.1"
              />
              <FormGroup
                useSelect
                options={[
                  { title: "Linear" },
                  { title: "Linear" },
                  { title: "Linear" },
                ]}
                containerClassName="w-full mb"
                selectClassName="w-full"
                id="Reward Distribution"
                label="Reward Distribution"
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
                  { title: "Weekly - 7 days" },
                  { title: "Weekly - 7 days" },
                  { title: "Weekly - 7 days" },
                ]}
                containerClassName="w-full mb-4"
                selectClassName="w-full"
                id="Reward Distribution Duration"
                label="Reward Distribution Duration"
              />

              <FormGroup
                containerClassName="w-full mb-[16px]"
                inputClassName="w-full"
                id="Initial Deposit Amount"
                label="Initial Deposit Amount"
                inputPlaceholder="Ex. 0.1"
              />
            </div>
          </div>

          <div className="text-center mt-8 ">
            <div>
              <Typography
                variant="body3"
                className="!text-secondary !font-aeonik-pro-bold mb-3"
                label="Need equivalent of 1000 USDT to create pool"
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
                onClick={onNext}
                label="Next"
              />
            </div>
          </div>
        </>
      </Card>
    </div>
  );
}
