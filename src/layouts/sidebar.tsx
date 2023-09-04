import { AnimateFadeIn } from "@/animations";
import Divider from "@/components/divider";
import AppLogo from "@/components/logo";
import Typography from "@/components/typography";
import classNames from "classnames";
import { BOTTOM_MENU_DATA, TOP_MENU_DATA } from "config/theme/sidebar";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MenuItem = ({
  data,
  type,
  active,
  to,
}: {
  data: { name: string; icon: React.ReactNode };
  type: "main" | "submenu";
  active: boolean;
  to: string;
}) => {
  const classStyles = classNames({
    "hover:border-secondary  ": type == "main" && !active,
    "!border-secondary": type == "main" && active,
  });

  return (
    <li>
      <Link
        href={to}
        className={`flex ps-2 border-l-2  ${
          active ? "active" : ""
        }  cursor-pointer hover:border-l-2 border-transparent ${type}   items-center ${classStyles}`}
      >
        {type == "submenu" ? (
          <div>
            <svg
              className="no-animate"
              width={6}
              height={7}
              viewBox="0 0 6 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 3.1701L0.75 5.76817L0.75 0.572021L5.25 3.1701Z"
                fill="#636C7B"
              />
            </svg>
          </div>
        ) : null}
        <div className={`w-[54px] flex justify-center items-center h-[54px] `}>
          {data.icon}
        </div>

        <Typography
          className={`text-light-white ${
            active && type == "submenu" ? "border-b-[1px] border-b-white" : ""
          }`}
          label={data.name}
          use="span"
        />
      </Link>
    </li>
  );
};
const BottomMenuItem = ({
  data,
}: {
  data: { name: string; icon: React.JSX.Element; to?: string };
}) => {
  return (
    <li
      className={` ps-2 border-l-2   cursor-pointer hover:border-l-2 border-transparent hover:border-secondary  `}
    >
      <a href={data?.to} target="_blank" className="flex items-center ">
        <div className="w-[44px] flex justify-end items-center h-[44px]">
          {data.icon}
        </div>

        <Typography
          className="text-light-white ps-3"
          label={data.name}
          use="span"
        />
      </a>
    </li>
  );
};
export default function Sidebar({
  mobile,
  onClose,
}: {
  mobile?: boolean;
  onClose?: () => void;
}) {
  const [asPath, setAsPath] = useState("/");
  const router = useRouter();

  const menuIsActive = (link: string) => {
    const getLink = asPath.split("/")[1];
    let active = link?.replace("/", "") == getLink;
    return active;
  };

  const SubMenuIsActive = (mainLink: string, link: string) => {
    const mainIsActive = menuIsActive(mainLink);
    if (!mainIsActive) return false;
    const getLink = asPath.split("?")[0];
    let active = getLink.includes(link);

    return active;
  };

  useEffect(() => {
    if (router.isReady) {
      setAsPath(router.asPath);
    }
  }, [router]);

  return (
    <div className="bg-background overflow-y-auto pb-10 sidebar flex flex-col justify-between h-screen">
      <div>
        <div className="p-5 flex justify-between items-center">
          <AppLogo />
          {mobile ? (
            <svg
              onClick={onClose}
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x w-[30px] h-auto"
              width={44}
              height={44}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#e5e7ed"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          ) : null}
        </div>
        <div className="">
          <div className="mt-5"></div>
          <ul>
            {TOP_MENU_DATA.map((_data, index) => {
              return (
                <div key={index} className="">
                  <MenuItem
                    to={_data.to}
                    active={menuIsActive(_data.key)}
                    type="main"
                    data={_data}
                  />

                  {_data?.menu && menuIsActive(_data.key) ? (
                    <div className="ps-9">
                      {_data?.menu?.map((_subMenu, _index) => {
                        return (
                          <div
                            className="relative overflow-hidden"
                            key={_index + index.toString()}
                          >
                            <AnimateFadeIn>
                              <MenuItem
                                to={_subMenu.to}
                                active={SubMenuIsActive(_data.key, _subMenu.to)}
                                type="submenu"
                                data={_subMenu}
                              />
                            </AnimateFadeIn>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </ul>
        </div>
        <div className="h-100 flex-col-reverse">
          <div className="my-[41px]">
            <Divider />
          </div>

          <ul>
            {BOTTOM_MENU_DATA.map((_data, index) => {
              return (
                <div key={index}>
                  <BottomMenuItem data={_data} />
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
