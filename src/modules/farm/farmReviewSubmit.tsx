import Button from "@/components/button";
import Card from "@/components/card";
import FormGroup from "@/components/form/form-group";
import Radio from "@/components/radio";
import Typography from "@/components/typography";
import classNames from "classnames";
import React, { MouseEventHandler } from "react";

type componentProps = {
  // onNext: MouseEventHandler<HTMLButtonElement>;
  onPrevious: MouseEventHandler<HTMLButtonElement>;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  data: {
    name: string;
    value: string;
    sub?: {
      name: string;
      value: string;
    }[];
  }[];
};

export default function CreateFarmReview({
  // onNext,
  onPrevious,
  onSubmit,
  data,
}: componentProps) {
  const DetailsPreview = ({
    name,
    value,
    sub = false,
  }: {
    name: string;
    sub?: boolean;
    value: null | string;
  }) => {
    const positionStyles = classNames({
      "lg:ps-[50px] md:ps-[35px] ps-[20px]": sub,
    });
    return (
      <>
        <div
          className={`flex flex-wrap py-[15px] justify-between ${positionStyles}`}
        >
          <Typography
            className="!font-aeonik-pro !text-light-white"
            variant="body2"
            label={name}
          />
          {value ? (
            <Typography
              variant="body2"
              className="!font-aeonik-pro-bold !text-light-4"
              label={value}
            />
          ) : null}
        </div>
        <div className={positionStyles}>
          <Line />
        </div>
      </>
    );
  };
  const Line = () => {
    return <div className="h-[1px] bg-harsh"></div>;
  };
  return (
    <div>
      <Card>
        <>
          {data.map((_data, index) => {
            return (
              <div className="" key={index}>
                <DetailsPreview
                  value={_data?.value || ""}
                  name={_data?.name || ""}
                />
                {_data?.sub?.map((_sub, index) => {
                  return (
                    <div key={index}>
                      <DetailsPreview
                        sub={true}
                        value={_sub?.value || ""}
                        name={_sub?.name || ""}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div className="text-center mt-[48px] ">
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
                onClick={onSubmit}
                size="big"
                label="Submit"
              />
            </div>
          </div>
        </>
      </Card>
    </div>
  );
}
