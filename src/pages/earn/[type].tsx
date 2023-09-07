import Button from "@/components/button";
import PageWrapper from "@/components/pageWrapper";
import TabComponent from "@/components/tab";
import { useAuth } from "@/contexts/auth";
import DashboardLayout from "@/layouts";
import FramingModule from "@/modules/earning/farming";
import PoolModule from "@/modules/earning/pool";
import { getToken } from "@/utils/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/utils/firebase";
import { FIREBASE_DATABASE_NAME, PoolCollection, PoolMode } from "@/constants";

const dbInstance = collection(database, FIREBASE_DATABASE_NAME);
export default function HomePage() {
  const logs = useAuth();
  const router = useRouter();
  const [poolsArray, setPoolsArray] = useState<PoolCollection[]>([]);
  const [farmArray, setFarmArray] = useState<PoolCollection[]>([]);
  const [poolArray, setPoolArray] = useState<PoolCollection[]>([]);

  const getPools = () => {
    getDocs(dbInstance).then((data) => {
      const tempPool = data.docs.map((item) => {
        return item.data() as PoolCollection;
      });
      setPoolsArray(tempPool);
    });
  };
  useEffect(() => {
    getToken();
    getPools();
  }, []);

  useEffect(() => {
    if (poolsArray) {
      let tempPoolArray: PoolCollection[] = [];
      let tempFarmArray: PoolCollection[] = [];
      poolsArray.map((poolItem: PoolCollection) => {
        if (!poolItem.visible) return;

        if (poolItem.type == PoolMode.CLASSIC_FARM) {
          tempPoolArray.push(poolItem);
        } else if (poolItem.type == PoolMode.UNISWAP_POOL) {
          tempFarmArray.push(poolItem);
        }
      });
      tempPoolArray = tempPoolArray.sort(
        (a: PoolCollection, b: PoolCollection) => b.createdAt - a.createdAt
      );
      tempFarmArray = tempFarmArray.sort(
        (a: PoolCollection, b: PoolCollection) => b.createdAt - a.createdAt
      );
      setPoolArray(tempPoolArray);
      setFarmArray(tempFarmArray);
    }
  }, [poolsArray]);

  const data = [
    { header: "Farms", key: "farms" },
    { header: "Pools", key: "pools" },
  ];

  const [currentTab, setCurrentTab] = useState(data[1].key);

  useEffect(() => {
    if (router.query?.type) {
      setCurrentTab(router.query?.type.toString());
    }
  }, [router]);

  const handleSelect = (props: { key: string }) => {
    router.push(`/earn/${props.key}`);
  };

  return (
    <DashboardLayout>
      {/* <Button theme="secondary" label="jkdjdjdj" /> */}
      <PageWrapper>
        <TabComponent onSelect={handleSelect} current={currentTab} data={data}>
          <div>
            <FramingModule poolData={farmArray} />
          </div>
          <div>
            <PoolModule poolData={poolArray} />
          </div>
          <div>{/* <FramingModule /> */}</div>
        </TabComponent>
      </PageWrapper>
      <div className="mt-6"></div>
    </DashboardLayout>
  );
}
