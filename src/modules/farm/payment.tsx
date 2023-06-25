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
export default function CreateFarmPayment({
  onNext,
  onPrevious,
}: componentProps) {
  return (
    <div>
      <Card>
        <>
          <div className="md:grid grid-cols-2 gap-24">
            <div>
              <div className="">
                <Typography
                  variant="body2"
                  className="!text-neutrals-5 mb-[16px] !font-aeonik-pro-bold"
                  label={"Currency"}
                />
                <Radio label="BNB" checked={false} />
                <div className="mb-[8px]"></div>
                <Radio label="ETH" checked={true} />
                <div className="mb-[8px]"></div>
                <Radio label="FTN" checked={false} />
                <div className="mb-[8px]"></div>
                <Radio label="USDT" checked={false} />
                <Typography
                  className="mt-[8px] mb-4"
                  variant="body0.5"
                  label="Pay with BNB for you to complete creating your pool"
                />
              </div>
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
                onClick={onNext}
                size="big"
                label="Next"
              />
            </div>
          </div>
        </>
      </Card>
    </div>
  );
}
