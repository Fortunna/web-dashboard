import React, { useEffect, useState } from "react";
import Typography from "../typography";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { AnimateFadeIn } from "@/animations/index";
import { AnimatePresence } from "framer-motion";

type dataType = {
  header: string;
  key: string;
};

type componentProps = {
  children: React.ReactNode;
  data: dataType[];
  current: string;
  onSelect?: (props: dataType) => any;
};
export default function TabComponent({
  data = [],
  current,
  onSelect,
  children,
}: componentProps) {
  const [currentKey, setCurrentKey] = useState(current);

  const handleSelect = (_selectedTab: dataType) => {
    onSelect && onSelect(_selectedTab);
    // setCurrentKey(_selectedTab.key);
  };

  useEffect(() => {
    if (current) {
      setCurrentKey(current);
    }
  }, [current]);
  return (
    <div>
      <div className={`  ${styles["tab-component"]}`}>
        <ul className="flex mb-4 flex-wrap">
          {data.map((_data, index) => {
            return (
              <li
                onClick={() => {
                  handleSelect(_data);
                }}
                key={index}
                className={`mr-5 pb-1  cursor-pointer relative overflow-hidden ${
                  current == data[index]?.key ? styles["current"] : ""
                }`}
              >
                <Typography variant="title" label={_data.header} />
              </li>
            );
          })}
        </ul>
        <ul className="flex flex-wrap -mb-px ">
          {/* <AnimatePresence> */}
          {React.Children.map(children, (child, index) => {
            if (currentKey == data[index]?.key) {
              return (
                // <AnimateFadeIn key={index}>
                <>{child}</>
                // </AnimateFadeIn>
              );
            }
            return null;
          })}
          {/* </AnimatePresence> */}
        </ul>
      </div>
    </div>
  );
}
