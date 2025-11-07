"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from '@repo/ui/Navbar'

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
   <div>
      <Navbar onSignin={signIn} onSignout={async () => {
        await signOut({ callbackUrl: "/api/auth/signin" })
      }} user={session.data?.user} />
   </div>
  );
}
