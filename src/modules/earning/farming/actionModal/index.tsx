import Modal from "@/components/modal";
import Typography from "@/components/typography";
import React, { ChangeEventHandler, useState } from "react";
import Deposit from "./deposit";
import { Dai, Usdc, Usdt } from "@/components/icons";
import Rewards from "./rewards";
import Withdraw from "./withdraw";
import classNames from "classnames";

type componentProps = {
  onClose: () => void;
};
export default function ActionModal({ onClose }: componentProps) {
  const header = [
    {
      title: "Deposit",
      subtitle: "Wallet Balance",
      key: "deposit",
    },
    {
      title: "Withdraw",
      subtitle: "Current Rewards",
      key: "withdraw",
    },
    {
      title: "Rewards",
      subtitle: "Wallet Balance",
      key: "reward",
    },
  ];

  const data = [
    {
      value: "1000 DAI",
      icon: <Dai />,
    },
    {
      value: "21 USDC",
      icon: <Usdc />,
    },
    {
      value: "29 USDT",
      icon: <Usdt />,
    },
  ];

  const [currentData, setCurrentData] = useState(header[0]);

  return (
    <div>
      <Modal
        onClose={onClose}
        containerClass="px-4 py-6 relative overflow-hidden rounded-[4px]"
        visible={true}
      >
        <div>
          <div className="flex items-center">
            {header.map((_header, index) => {
              const activeContainerStyles = classNames({
                "bg-[#353945] rounded-full !text-white":
                  _header.key == currentData.key,
              });
              const activeTextStyles = classNames({
                "!text-white": _header.key == currentData.key,
              });
              return (
                <div
                  key={index}
                  className={`px-[28px] transition-all cursor-pointer  py-3  ${activeContainerStyles}`}
                  onClick={() => setCurrentData(_header)}
                >
                  <Typography
                    variant="body2"
                    className={`!font-dm-sans !text-[#777E90] ${activeTextStyles}`}
                    label={_header.title}
                  />
                </div>
              );
            })}
          </div>

          <div className="grid md:grid-cols-[30%_auto] mt-6">
            <Typography
              label={currentData.title}
              className="!font-aeonik-pro"
              variant="subtitle"
            />

            <div>
              <div>
                <Typography
                  variant="body2"
                  className="!font-inter !text-white"
                  label={currentData.subtitle}
                />
                <div className="flex mt-3">
                  {data.map((_d, index) => {
                    return (
                      <div key={index} className="flex  mr-3 items-center">
                        {_d.icon}

                        <Typography
                          variant="body3"
                          className="!text-secondary ms-2 "
                          label={_d.value}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <>
          {currentData.key == header[0].key ? <Deposit /> : null}

          {currentData.key == header[1].key ? <Rewards /> : null}
          {currentData.key == header[2].key ? <Withdraw /> : null}
        </>
      </Modal>
    </div>
  );
}
