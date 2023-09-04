import Card from "@/components/card";
import PageWrapper from "@/components/pageWrapper";
import Stepper from "@/components/stepper";
import Typography from "@/components/typography";
import DashboardLayout from "@/layouts";
import CreateFarmPayment from "@/modules/farm/payment";
import FarmInformation from "@/modules/farm/farm-information";
import FarmParameters from "@/modules/farm/farm-parameters";
import CreateFarmReview from "@/modules/farm/farmReviewSubmit";
import CreateFarmReward from "@/modules/farm/reward";
import React, { useEffect, useState } from "react";
import fortunaFactoryAbi from "../../abi/fortunaAbi.json";

import { toBytes } from "viem";
import {
  useConnect,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { InjectedConnector } from "wagmi/dist/connectors/injected";
import { useRouter } from "next/router";
import { PoolMode } from "@/constants";

const steeperHeader = [
  {
    title: "Pool Informations",
    key: "informations",
  },
  {
    title: "Pool Parameters",
    key: "parameters",
  },
  {
    title: "Reward",
    key: "reward",
  },
  {
    title: "Payment",
    key: "payment",
  },
  {
    title: "Review and Submit",
    key: "review",
  },
];

export default function Create() {
  const [isActiveSteeper, setActiveSteeper] = useState(steeperHeader[0].key);
  const [title, setTitle] = useState("");
  const [poolMode, setPoolMode] = useState<PoolMode>(PoolMode.CLASSIC_FARM);
  const router = useRouter();
  // const { connect } = useConnect({
  //   connector: new InjectedConnector(),
  // });

  useEffect(() => {
    if (router.query?.type) {
      if (router.query?.type == "pool") {
        setTitle("Create Pool");
        setPoolMode(PoolMode.CLASSIC_FARM);
        setActiveSteeper(steeperHeader[0].key);
      } else {
        setTitle("Create LP Pair");
        setPoolMode(PoolMode.UNISWAP_POOL);
        setActiveSteeper(steeperHeader[0].key);
      }
    }
  }, [router]);

  const { data, isError, isLoading } = useContractRead({
    address: "0xB8e4E0dF38005893CEaf45a7911Fc7DA9Fe50aD1",
    abi: fortunaFactoryAbi,
    functionName: "getPoolAt",
  });
  console.log(data, isError, isLoading, "----");
  return (
    <div>
      <DashboardLayout>
        <PageWrapper>
          <>
            <Typography label={title} variant="title" className="mb-[20px]" />
            <Stepper current={isActiveSteeper} headers={steeperHeader}>
              <FarmInformation
                poolMode={poolMode}
                onNext={() => {
                  setActiveSteeper(steeperHeader[1].key);
                }}
              />
              <FarmParameters
                onNext={() => {
                  setActiveSteeper(steeperHeader[2].key);
                }}
                onPrevious={() => {
                  setActiveSteeper(steeperHeader[0].key);
                }}
                values={[]}
              />
              <CreateFarmReward
                onNext={() => {
                  setActiveSteeper(steeperHeader[3].key);
                }}
                onPrevious={() => {
                  setActiveSteeper(steeperHeader[1].key);
                }}
              />
              <CreateFarmPayment
                onNext={() => {
                  setActiveSteeper(steeperHeader[4].key);
                }}
                onPrevious={() => {
                  setActiveSteeper(steeperHeader[2].key);
                }}
              />
              <CreateFarmReview
                onSubmit={() => {
                  // write?.();
                  // connect?.();
                }}
                mode={[poolMode]}
                onPrevious={() => {
                  setActiveSteeper(steeperHeader[3].key);
                }}
              />
            </Stepper>
          </>
        </PageWrapper>
      </DashboardLayout>
    </div>
  );
}
