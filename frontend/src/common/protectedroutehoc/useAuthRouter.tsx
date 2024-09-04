"use client";

import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function AuthRoute<T>(Component: any) {
  return (props: T) => {
    const router = useRouter();

    useEffect(() => {
      if (useAuthStore.getState().user?.email) {
      } else {
        router.push("/auth/login");
      }
    }, []);

    if (useAuthStore.getState().user?.email) {
      return (
        <>
          <Component {...props!} />
        </>
      );
    } else {
      return null;
    }
  };
}

export default AuthRoute;
