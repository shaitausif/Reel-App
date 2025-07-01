'use client'
import React from "react";
// To access the session in a component we can use the sessionProvider from next-auth/react
import { SessionProvider } from "next-auth/react";
// To know more : https://imagekit.io/docs/integration/nextjs
import { ImageKitProvider } from "@imagekit/next";

const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;



export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <>
        <SessionProvider refetchInterval={5 * 60} >
            <ImageKitProvider urlEndpoint={urlEndPoint}>
                {children}
            </ImageKitProvider>
        </SessionProvider>
    </>
  )
}

