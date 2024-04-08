"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  return (
    <nav className="z-50 primary-bg items-center flex justify-between h-16 w-full sticky top-0 lg:px-52 px-10 shadow-xl">
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
                className="secondary-bg rounded-xl px-6 py-[4px] hover:opacity-95"
              >
                Create Prompt
              </Link>
              <div>
                <Image
                  src={session?.user.image}
                  width={40}
                  height={40}
                  alt="profile"
                  className="rounded-full object-cover relative"
                  onClick={() => setShowProfile(!showProfile)}
                />
                {showProfile && (
                  <div className="secondary-bg absolute top-16 w-40  rounded px-2 py-3 space-y-3">
                    <div className="flex gap-3 p-1 hover:bg-[#222831] rounded">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </span>
                      <Link
                        href="/profile"
                        onClick={() => setShowProfile(!showProfile)}
                      >
                        Profile
                      </Link>
                    </div>
                    <button
                      type="button"
                      className="primary-bg w-full py-1 rounded"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
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
