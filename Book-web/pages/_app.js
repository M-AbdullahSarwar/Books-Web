import { SessionProvider } from "next-auth/react";
import { UserProvider } from "../context/user-context";
import "@/styles/globals.css";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <UserProvider>
        <Layout>
          <Component {...pageProps} /> 
        </Layout>
      </UserProvider>
    </SessionProvider>
  )}