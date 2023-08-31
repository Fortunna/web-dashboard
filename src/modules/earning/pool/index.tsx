import { AnimateWhileInView } from "@/animations";
import Button from "@/components/button";
import PageWrapper from "@/components/pageWrapper";
import Typography from "@/components/typography";
import { PoolCollection, PoolMode, TOAST_MESSAGE, TokenInfos } from "@/constants";
import FarmList from "@/widget/earning/farmList/index";
import PoolList from "@/widget/earning/poolList";
import React, { useState } from "react";
import { useNetwork } from "wagmi";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ActionModal from "../actionModal";

const AccountBalance = () => {
  return (
    <div>
      <div>
        <div className="flex md:mt-0 mt-5 justify-end">
          <div>
            <div>
              <Typography
                className="!font-poppins-light !text-light-harsh"
                variant="body3"
                label="Account Equity"
              />
            </div>
            <div className="flex items-center">
              <Typography
                className="!text-light-4"
                variant="subtitle"
                label="$ 0.000"
              />
              <Typography
                className="bg-harsh rounded-md px-[7px] ms-3 py-[5px]"
                variant="body1"
                label="USD"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const headers = [
  {
    name: "Top 5",
  },
  {
    name: "Popular Farms",
  },
  {
    name: "My Pools",
  },
  {
    name: "Newest Farms",
  },
];

type PoolModuleType = {
  poolData: PoolCollection[]
}

export default function PoolModule({
  poolData
}: PoolModuleType) {
  const { chain } = useNetwork();
  const [openActionModal, setOpenActionModal] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState(-1);
  const [activePool, setActivePool] = useState<PoolCollection>();
  const [tokenAInfo, setTokenAInfo] = useState<TokenInfos>();
  const [tokenBInfo, setTokenBInfo] = useState<TokenInfos>();
  const [depositWithdrawIndex, setDepositWithdrawIndex] = useState<number>(0);
  const [selectedPool, setSelectedPool] = useState(-1);

  return (
    <div>
      <div className="grid text-start  lg:grid-cols-[70%_auto]">
        <div>
          <Typography
            className="!font-poppins !text-light-3 !leading-leading-24"
            variant="body2"
          >
            <>
              We offer a variety of staking pools, designed to provide secure
              and reliable rewards for your investments. Our curated project
              list offers an effortless and rewarding staking experience.
              {/* <span className="text-light-secondary"> Learn more</span> */}
            </>
          </Typography>
        </div>
        <div>
          <AccountBalance />
        </div>
      </div>

      <div className="mt-[52px] text-start">
        <Typography
          variant="body1"
          className="!text-light-white"
          label="Farms"
        />
      </div>

      <div className="flex flex-wrap mt-[25px]">
        {headers.map((data, index) => {
          return (
            <Button
              className="mr-4 md:mt-0 mt-4"
              size="small"
              outline
              rounded
              key={index}
              label={data.name}
            />
          );
        })}
      </div>

      <div className="mt-[32px]"></div>

      <PageWrapper className="!px-0">
        <>
          {poolData.map((_list, index) => {
            return (
              <AnimateWhileInView key={index}>
                <div className="mb-[32px] overflow-hidden relative">
                  <PoolList
                    active={index == selectedPool}
                    pool={_list}
                    onStake={() => {
                      if (!chain) {
                        toast.error(TOAST_MESSAGE.CONNECT_WALLET, {
                          position: toast.POSITION.TOP_CENTER
                        });
                        return;
                      }
                      if (index == selectedPool) {
                        setSelectedPool(-1);
                      } else {
                        setSelectedPool(index);
                      }
                      setActivePool(_list)
                    }}
                    onOpenActionModal={() => setOpenActionModal(true)}
                    onSetTokenAInfo={setTokenAInfo}
                    onSetTokenBInfo={setTokenBInfo}
                    onSelectedIndex={setDepositWithdrawIndex}
                  />
                </div>
              </AnimateWhileInView>
            );
          })}
          {openActionModal ? (
            <ActionModal
              tokenAInfo={tokenAInfo!}
              tokenBInfo={tokenBInfo!}
              pool={activePool!}
              poolMode={PoolMode.CLASSIC_FARM}
              onClose={() => setOpenActionModal(false)}
              index={depositWithdrawIndex}
            />
          ) : null}
        </>
      </PageWrapper>
    </div>
  );
}
