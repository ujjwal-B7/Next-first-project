"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  return (
    <nav className=" primary-bg items-center flex justify-between h-16 w-full sticky top-0 lg:px-52 px-10 shadow-xl">
      <Link href="/" className="font-semibold text-3xl">
        UB
      </Link>
      {/* {alert(session?.user)} */}
      <div>
        {session?.user ? (
          <>
            <div className="flex gap-7 items-center">
              <Link
                href="/create-prompt"
                className="fourth-bg secondary-text rounded-xl px-6 py-[4px] hover:opacity-95"
              >
                Create Prompt
              </Link>
              <button
                type="button"
                className="border-2 rounded-xl px-6 py-[4px]"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
              <div>
                <Image
                  src={session?.user.image}
                  width={40}
                  height={40}
                  alt="profile"
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="secondary-bg px-10 py-2 rounded-3xl"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
