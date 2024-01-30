import { AnimateFadeIn } from '@/animations';
import ModalWarning from '@/components/ModalWarning/ModalWarning';
import Modal from '@/components/modal';
import PageWrapper from '@/components/pageWrapper';
import DashboardLayout from '@/layouts';
import Allocation from '@/modules/aggregator/allocation';
import Balance from '@/modules/aggregator/balance';
import AggregatorBanner from '@/modules/aggregator/banner';
import LockAssetGraph from '@/modules/aggregator/lockAssetGraph';
import Summary from '@/modules/aggregator/summary';
import AllocationTransaction from '@/modules/aggregator/transactions';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Aggregator() {
  const router = useRouter();

  return (
    <DashboardLayout>
      <ModalWarning />
      <AnimateFadeIn>
        <AggregatorBanner />
      </AnimateFadeIn>
      <Summary />
      <PageWrapper className="!rounded-4">
        <Balance />
      </PageWrapper>
      <PageWrapper>
        <>
          <div className="mt-[32px]"></div>
          <Allocation />
          <div className="mt-[32px]"></div>

          <LockAssetGraph />
          <div className="overflow-hidden">
            <AllocationTransaction />
          </div>
        </>
      </PageWrapper>
    </DashboardLayout>
  );
}
