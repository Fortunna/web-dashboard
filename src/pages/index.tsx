import Button from "@/components/button";
import SelectComponent from "@/components/customSelect";
import Chart from "@/components/highchart";
import { ArrowRightIcon, InfoIcon, RefreshIcon } from "@/components/icons";
import PageWrapper from "@/components/pageWrapper";
import TabComponent from "@/components/tab";
import Typography from "@/components/typography";
import { useAuth } from "@/contexts/auth";
import DashboardLayout from "@/layouts";
import BalanceWidgets from "@/modules/home/balanceWidgets";
import ProviderRate from "@/modules/home/price";
import ProvidersPrice from "@/modules/home/providersPrice";
import Statistics from "@/modules/home/statistics";
import { getToken } from "@/utils/auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function HomePage() {
  const logs = useAuth();
  const router = useRouter();

  useEffect(() => {
    // router.push("/earn/farms");
  }, []);
  useEffect(() => {
    // getToken();
  }, []);
  return (
    <DashboardLayout>
      <PageWrapper>
        <div className="gap-4">
          {/* <div className="md:mb-0 mb-6">
            <BalanceWidgets />
          </div> */}
          <div>
            <Chart />
            <div className="mb-4"></div>
            <Statistics />
            <div className="mb-[30px]"></div>

            <ProvidersPrice />
          </div>
        </div>
      </PageWrapper>
    </DashboardLayout>
  );
}
