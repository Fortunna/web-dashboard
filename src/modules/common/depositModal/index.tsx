import Modal from "@/components/modal";
import React, { useState } from "react";
import Image from "next/image";
import Typography from "@/components/typography";
import TextInput from "@/components/input";
import Slider from "@/components/slider";
import Button from "@/components/button";
import Auto from "./auto";
import Manual from "./manual";

type componentProps = {
  imgSrc: string;
  name: string;
  balance: number;
};

export default function Deposit({ onClose }: { onClose: Function }) {
  const [current, setCurrent] = useState<"manual" | "auto">("auto");
  return (
    <div>
      <Modal onClose={onClose} title="Deposit" visible={true}>
        <>
          <div className="md:px-[40px] px-5">
            <div className="grid grid-cols-2 cursor-pointer mb-8">
              <div onClick={() => setCurrent("auto")}>
                <Typography
                  className={`${
                    current == "auto" ? "bg-[#201B31] shadow-tab" : ""
                  } rounded-[20px] transition-all   py-3 text-center `}
                  variant="body3"
                  label="Auto"
                />
              </div>
              <div onClick={() => setCurrent("manual")}>
                <Typography
                  className={`${
                    current == "manual" ? "bg-[#201B31] shadow-tab" : ""
                  } rounded-[20px] transition-all   py-3 text-center `}
                  variant="body3"
                  label="Manual"
                />
              </div>
            </div>
          </div>
          <div className="md:px-[40px] px-5">
            {current == "auto" ? <Auto /> : <Manual />}
          </div>
        </>
      </Modal>
    </div>
  );
}
