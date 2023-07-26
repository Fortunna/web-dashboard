import React, { memo } from "react";
import Card from "../card";
import Typography from "../typography";
import Portal from "./portal";
import classNames from "classnames";
import { AnimateFadeIn } from "@/animations";

type ComponentProps = {
  children: React.ReactNode;
  onClose: Function;
  title?: string;
  hideClose?: boolean;
  containerClass?: string;
  visible: boolean;
};

function Modal({
  children,
  title,
  containerClass,
  hideClose,
  onClose,
  visible,
}: ComponentProps) {
  if (!visible) return null;
  return (
    <Portal selector="#modal">
      <div
        style={{
          // background: "rgba(225, 225, 225, 0.2)",
          backdropFilter: "blur(4px)",
        }}
        className="h-screen w-screen !overflow-y-scroll pt-[8%] flex fixed z-10 top-0   justify-center "
      >
        <div className="lg:w-[35%] md:w-[60%] w-[90%] !h-full overflow-y-scroll  relative overflow-hidden">
          {/* {!hideClose ? (
            <div className="flex justify-end mb-5 cursor-pointer">
              <svg
                width={28}
                height={28}
                onClick={() => onClose()}
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.7865 0.665527C24.3065 0.665527 27.3332 3.83886 27.3332 8.55886V19.4535C27.3332 24.1602 24.3065 27.3322 19.7865 27.3322H8.2265C3.7065 27.3322 0.666504 24.1602 0.666504 19.4535V8.55886C0.666504 3.83886 3.7065 0.665527 8.2265 0.665527H19.7865ZM18.0132 9.96019C17.5598 9.50553 16.8265 9.50553 16.3598 9.96019L13.9998 12.3322L11.6265 9.96019C11.1598 9.50553 10.4265 9.50553 9.97317 9.96019C9.51984 10.4135 9.51984 11.1602 9.97317 11.6122L12.3465 13.9869L9.97317 16.3469C9.51984 16.8135 9.51984 17.5469 9.97317 17.9989C10.1998 18.2255 10.5065 18.3469 10.7998 18.3469C11.1065 18.3469 11.3998 18.2255 11.6265 17.9989L13.9998 15.6402L16.3732 17.9989C16.5998 18.2402 16.8932 18.3469 17.1865 18.3469C17.4932 18.3469 17.7865 18.2255 18.0132 17.9989C18.4665 17.5469 18.4665 16.8135 18.0132 16.3602L15.6398 13.9869L18.0132 11.6122C18.4665 11.1602 18.4665 10.4135 18.0132 9.96019Z"
                  fill="white"
                />
              </svg>
            </div>
          ) : null} */}
          <AnimateFadeIn>
            <div
              className={`bg-[#070714] rounded-[16px] overflow-y-auto !h-full mb-10 ${containerClass}`}
            >
              {title ? (
                <div className="grid pt-[40px] pb-[36px] px-[24px] grid-cols-[20%_auto_20%] ">
                  <div></div>
                  <div className="text-center">
                    <Typography variant="subtitle" label={title} />
                  </div>
                  <div className="flex justify-end">
                    <svg
                      width={24}
                      height={24}
                      onClick={() => onClose()}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 7L17 17"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 17L17 7"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              ) : null}

              <>{children}</>
            </div>
          </AnimateFadeIn>
        </div>
      </div>
    </Portal>
  );
}

export default memo(Modal);
