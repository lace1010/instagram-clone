import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header";

export default function SignIn({ providers }) {
  return (
    <>
      <Header />

      <div className="px-10 -mt-20 flex flex-col items-center justify-center w-full min-h-screen text-center">
        <img
          className=" w-96 object-contain flex"
          src="https://links.papareact.com/ocw"
          alt="big instagram"
        />
        <p className="text-xs italic pb-20">
          This is not a real app, I have built this app to impress future
          employers enhance my knowledge with React/Next.js, tailwind, recoil,
          and firebase. <br /> <br />
          (This is a customized auth page used in Next.js.)
        </p>

        {/* code from next auth to sign in with providers */}
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="p-3 bg-blue-500 rounded-lg text-white"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
