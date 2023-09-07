import { ETH } from "@/components/icons";
import { FTA, FTB } from "@/components/logo";
import Image from "next/image";

export const assets: any = {
  FTA: FTA,
  FTB: FTB,
  ETH: ETH,
  WETH: ETH,
};

export const RenderAsset = ({ type, noDefault, ...props }: any) => {
  const Asset = assets[type];

  if (Asset) {
    return <Asset {...props} />;
  } else if (noDefault) {
    return <></>;
  } else {
    return (
      <Image
        height={40}
        className="ms-3 mr-2"
        width={30}
        src={"/default_token.png"}
        alt="img"
      />
    );
  }
};
