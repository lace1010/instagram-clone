import { useSession } from "next-auth/react";
import Head from "next/head";
import BottomMobileHeader from "../components/BottomMobileHeader";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Welcome from "../components/Welcome";
import Modal from "../components/Modal";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="relative h-screen overflow-y-scroll bg-gray-50 scrollbar-none">
      <Head>
        <title>Instagram Clone</title>
        <link rel="icon" href="/My initial favicon.png" />
      </Head>

      <Header />
      {session ? (
        <>
          <Feed />
          <Modal />
          <BottomMobileHeader />
        </>
      ) : (
        <Welcome />
      )}
    </div>
  );
}
