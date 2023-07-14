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
import { headers } from "next/dist/client/components/headers";
import React, { useState } from "react";

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

  return (
    <div>
      <DashboardLayout>
        <PageWrapper>
          <>
            <Typography
              label="Create Farm"
              variant="title"
              className="mb-[20px]"
            />
            <Stepper current={isActiveSteeper} headers={steeperHeader}>
              <FarmInformation
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
