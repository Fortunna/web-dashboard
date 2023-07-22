import { AnimateFadeIn, RenderWhenInView } from "@/animations";
import Badge from "@/components/badge";
import { PlusIcon, ThreeDotIcon } from "@/components/icons";
import TabComponent from "@/components/tab";
import Table from "@/components/table";
import Typography from "@/components/typography";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import Image from "next/image";

export default function ProvidersPrice() {
  type Providers = {
    name: string;
    price: string;
    img: string;
    _24hrs: string;
    holdings_fiat?: string;
    holdings_crypto?: string;
    avg?: string;
    profit?: string;
    loss?: string;
  };

  const defaultData: Providers[] = [
    {
      name: "Binance Coin (BNB) ",
      img: "/binance.png",
      price: "$ 1720.83",
      _24hrs: "+13.1%",
      holdings_fiat: "$ 200.63",
      holdings_crypto: "0.47 BNB",
      avg: "$ 411.39",
      profit: "+ $7.14",
      loss: "3.67%",
    },
    {
      name: "Polkadot (DOT) ",
      img: "/dot.png",
      price: "$ 19.31",
      _24hrs: "- 3.1%",
      holdings_fiat: "$ 188.94",
      holdings_crypto: "9.8 DOT",
      avg: "$ 20.39",
      profit: "- $17.14",
      loss: "+ 33.67%",
    },
    {
      name: "Bitcoin (BTC)",
      img: "/btc.png",
      price: "$ 390.83",
      _24hrs: "-9.1%",
      holdings_fiat: "$ 2030.63",
      holdings_crypto: "4.47 BTC",
      avg: "$ 211.39",
      profit: "+ $17.14",
      loss: "- 3.67%",
    },
    {
      name: "Ethereum (ETH) ",
      img: "/eth.png",
      price: "$ 5720.83",
      _24hrs: "-103.1%",
      holdings_fiat: "$ 500.63",
      holdings_crypto: "0.47 ETH",
      avg: "$ 411.39",
      profit: "+ $7.14",
      loss: "3.67%",
    },
    {
      name: "Chainlink (LINK) ",
      img: "/binance.png",
      price: "$ 1720.83",
      _24hrs: "+13.1%",
      holdings_fiat: "$ 200.63",
      holdings_crypto: "0.47 LINK",
      avg: "$ 411.39",
      profit: "+ $7.14",
      loss: "3.67%",
    },
  ];

  const columnHelper = createColumnHelper<Providers>();

  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "Name",
      cell: (info) => (
        <span className={`whitespace-nowrap flex items-center`}>
          <Image
            width={30}
            height={30}
            src={info.row.original.img}
            alt="icon"
          />
          <Typography
            label={info.row.original.name}
            variant="body2"
            className="ml-3 !font-inter"
          ></Typography>
        </span>
      ),
      header: (props) => <div className="whitespace-nowrap">Name</div>,
    }),
    columnHelper.accessor((row) => row.price, {
      id: "PRICE (ETH/DAI)",
      cell: (info) => (
        <Typography
          variant="body2"
          className="ml-3 !font-inter"
          label={info.getValue()}
        />
      ),
      header: (props) => (
        <div className="whitespace-nowrap">PRICE (ETH/DAI)</div>
      ),
    }),

    columnHelper.accessor((row) => row._24hrs, {
      id: "24H",
      cell: (info) => (
        <Typography
          variant="body2"
          className={`!font-inter ${
            info.getValue().includes("-")
              ? "!text-[#F94F59]"
              : "!text-[#47A663]"
          }`}
          label={info.getValue()}
        />
      ),
      header: (props) => <span>24H</span>,
    }),

    columnHelper.accessor((row) => row.price, {
      id: "HOLDINGS",
      cell: (info) => (
        <div>
          <Typography
            variant="body2"
            className="ml-3 !font-inter"
            label={info.row.original.holdings_fiat}
          />
          <Typography
            variant="body2"
            className="ml-3 !font-inter opacity-[0.4000000059604645]"
            label={info.row.original.holdings_crypto}
          />
        </div>
      ),
      header: (props) => <div className="whitespace-nowrap">HOLDINGS </div>,
    }),

    columnHelper.accessor((row) => row.price, {
      id: "Avg. Buy Price",
      cell: (info) => (
        <Typography
          variant="body2"
          className="ml-3 !font-inter"
          label={info.row.original.avg}
        />
      ),
      header: (props) => (
        <div className="whitespace-nowrap">Avg. Buy Price</div>
      ),
    }),

    columnHelper.accessor((row) => row.price, {
      id: "Profit/Loss",
      cell: (info) => (
        <div>
          <Typography
            variant="body2"
            className={`!font-inter`}
            label={info.getValue()}
          />
          <Typography
            variant="body2"
            className={`!font-inter ${
              info.row.original?.loss?.includes("-")
                ? "!text-[#F94F59]"
                : "!text-[#47A663]"
            }`}
            label={info.getValue()}
          />
        </div>
      ),
      header: (props) => <div className="whitespace-nowrap"> Profit/Loss</div>,
    }),
    columnHelper.accessor((row) => row.price, {
      id: "Actions",
      cell: (info) => (
        <div className="flex items-center">
          <PlusIcon />
          <div className="mx-2"></div>
          <ThreeDotIcon />
        </div>
      ),
      header: (props) => <span>Actions</span>,
    }),
  ];

  return (
    <div>
      <Typography
        variant="heading"
        label="Token Holdings"
        className="!font-aeonik-pro-bold mb-3"
      />
      <Table columns={columns} data={...defaultData} />
    </div>
  );
}
