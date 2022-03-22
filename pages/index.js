import { useSession } from "next-auth/react";
import Head from "next/head";
import BottomMobileHeader from "../components/BottomMobileHeader";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Welcome from "../components/Welcome";
import Modal from "../components/Modal";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(status, "<= loading");
  return (
    <div className="relative h-screen overflow-y-scroll bg-gray-50 scrollbar-none">
      <Head>
        <title>Instagram Clone</title>
        <link rel="icon" href="/My initial favicon.png" />
      </Head>

      <Header />
      {session && status === "authenticated" ? (
        <>
          <Feed />
          <Modal />
          <BottomMobileHeader />
        </>
      ) : status == "loading" ? (
        <div className="h-screen flex items-center justify-center animate-spin">
          <img
            className=" max-h-52"
            src="/rottweiler.png"
            alt="rot spinning head"
          />
        </div>
      ) : (
        <Welcome />
      )}
    </div>
  );
}
