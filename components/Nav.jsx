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
    <header className="sticky top-1 z-50 px-2">
      <nav className="max-w-screen-xl mx-auto lg:px-20 px-4 secondary-bg items-center flex justify-between h-16 w-full shadow-xl rounded-[2rem]">
        <Link href="/" className="font-semibold sm:text-3xl text-2xl">
          SLASH
        </Link>
        {/* {alert(session?.user)} */}
        <div>
          {session?.user ? (
            <>
              <div className="flex md:gap-7 gap-4 items-center">
                <Link
                  href="/create-prompt"
                  className="primary-bg rounded-xl lg:px-6 px-5 py-[5px] hover:opacity-95"
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
                    <div className="secondary-bg absolute lg:right-24 right-7 top-[4.3rem] w-40  rounded px-2 py-3 space-y-2">
                      <div className="flex items-center gap-3 p-1 hover:bg-[#222831] rounded">
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
                        className="primary-bg w-full py-1 items-center gap-3 rounded flex px-1"
                        onClick={() => signOut()}
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="rotate-180  w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                            />
                          </svg>
                        </span>
                        <span>Sign Out</span>
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
                    className="primary-bg px-10 py-2 rounded-3xl"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
