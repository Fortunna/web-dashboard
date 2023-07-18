import Button from "@/components/button";
import Card from "@/components/card";
import FormGroup from "@/components/form/form-group";
import Radio from "@/components/radio";
import Typography from "@/components/typography";
import React, { MouseEventHandler } from "react";

type componentProps = {
  onNext: MouseEventHandler<HTMLButtonElement>;
};
export default function FarmInformation({ onNext }: componentProps) {
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
            containerClassName="w-full mb-[24px]"
            inputClassName="w-full"
            inputPlaceholder="Ex. Fortuna Pool"
            id="label"
            label="Pool Name"
          />
          <FormGroup
            containerClassName="w-full"
            inputClassName="w-full"
            id="Pool Image (Optional)"
            label="Pool Image (Optional)"
            inputPlaceholder="Ex. https://upload.fortuna.io"
          />
          <Typography
            variant="body2"
            className="!text-neutrals-5 my-7 !font-aeonik-pro-bold"
            label={"Token Pair Information"}
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
                label="Contract Address"
                inputPlaceholder="Ex. 0xbb9bc244d798123fde783fcc1c72d3bb8c189413"
              />
              <FormGroup
                containerClassName="w-full mb-[24px]"
                inputClassName="w-full"
                id="Token Symbol"
                label="Token Symbol"
                inputPlaceholder="Ex. FTN"
              />
              <FormGroup
                containerClassName="w-full mb-[24px]"
                inputClassName="w-full"
                id="Token Decimals"
                label="Token Decimals"
                inputPlaceholder="Ex. 0.01"
              />
              <FormGroup
                containerClassName="w-full mb-[24px]"
                inputClassName="w-full"
                id="Token Logo URL (Optional)"
                label="Token Logo URL (Optional)"
                inputPlaceholder="Ex. https://upload.fortuna.io"
              />
              <div className="mb-12">
                <Typography
                  variant="body2"
                  className="!text-neutrals-5 mb-[16px] !font-aeonik-pro-bold"
                  label={"Token Network"}
                />
                <Radio label="ETH" checked={false} />
                <div className="mt-4"></div>
                <Radio label="BSC" checked={true} />
                <div className="mt-4"></div>
                <Typography
                  variant="body0.5"
                  label="Users will pay with BNB for your token"
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
                label="Contract Address"
                inputPlaceholder="Ex. 0xbb9bc244d798123fde783fcc1c72d3bb8c189413"
              />
              <FormGroup
                containerClassName="w-full mb-[24px]"
                inputClassName="w-full"
                id="Token Symbol"
                label="Token Symbol"
                inputPlaceholder="Ex. FTN"
              />
              <FormGroup
                containerClassName="w-full mb-[24px]"
                inputClassName="w-full"
                id="Token Decimals"
                label="Token Decimals"
                inputPlaceholder="Ex. 0.01"
              />
              <FormGroup
                containerClassName="w-full mb-[24px]"
                inputClassName="w-full"
                id="Token Logo URL (Optional)"
                label="Token Logo URL (Optional)"
                inputPlaceholder="Ex. https://upload.fortuna.io"
              />
              <div className="mb-12">
                <Typography
                  variant="body2"
                  className="!text-neutrals-5 mb-[16px] !font-aeonik-pro-bold"
                  label={"Token Network"}
                />
                <Radio label="ETH" checked={false} />
                <div className="mt-4"></div>
                <Radio label="BSC" checked={true} />
                <div className="mt-4"></div>
                <Typography
                  variant="body0.5"
                  label="Users will pay with BNB for your token"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={onNext}
              theme="secondary"
              className="!px-10"
              size="big"
              label="Create Farm"
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
