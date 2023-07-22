import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function EARN() {
  const router = useRouter();

  useEffect(() => {
    router.push("/earn/farms");
  }, []);

  return <div>EARN</div>;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/earn/farms",
      permanent: false,
    },
  };
}
