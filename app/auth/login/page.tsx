import { signIn, providerMap } from "@/auth";

export default async function SignInPage() {
  return (
    <div className="flex overflow-hidden relative w-full h-full">
      <img
        src="/gen3.png"
        alt="Pattern Background"
        className="object-cover fixed top-0 left-0 w-screen h-screen bg-white -z-10"
      />
      <div
        aria-label="Slate cover background"
        className="fixed left-0 top-0 z-10 flex h-screen w-[100%] translate-x-[-70%]
                bg-black/20 backdrop-blur-lg  shadow-black shadow-2xl "
      ></div>
      <div className="h-dvh z-20 flex w-full items-center justify-center md:ml-[3%] md:w-[22rem]">
        <div className="flex flex-col justify-center items-center w-80 text-xl min-h-[100vh]">
          <div className="flex flex-col gap-2 p-6 m-8 w-full bg-white rounded shadow-lg">
            {Object.values(providerMap).map((provider) => (
              <form
                className="[&>div]:last-of-type:hidden"
                key={provider.id}
                action={async (formData) => {
                  "use server";
                  if (provider.id === "credentials") {
                    await signIn(provider.id, {
                      redirectTo: "/about",
                      password: formData.get('password')
                    });
                  } else {
                    await signIn(provider.id, { redirectTo: "/" });
                  }
                }}
              >
                {provider.id === "credentials" && (
                  <>
                    <label className="text-base font-light text-neutral-800">
                      Password
                      <input
                        className="block flex-1 p-3 w-full font-normal rounded-md border border-gray-200 transition sm:text-sm placeholder:font-light placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-zinc-500"
                        required
                        data-1p-ignore
                        placeholder="password"
                        name="password"
                        type="password"
                      />
                    </label>
                  </>
                )}
                <button
                  type="submit"
                  className="flex justify-center items-center px-4 mt-2 space-x-2 w-full h-12 text-base font-light text-white rounded transition focus:ring-2 focus:ring-offset-2 focus:outline-none bg-pink-600 hover:bg-pink-700 focus:ring-pink-600"
                >
                  <span>Sign in with {provider.name}</span>
                </button>
                <div className="flex gap-2 items-center my-4">
                  <div className="flex-1 bg-neutral-300 h-[1px]" />
                  <span className="text-xs leading-4 uppercase text-neutral-500">
                    or
                  </span>
                  <div className="flex-1 bg-neutral-300 h-[1px]" />
                </div>
              </form>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
