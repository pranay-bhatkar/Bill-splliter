"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard");
    return null;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <button
        onClick={() => signIn("google")}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Sign in With Google
      </button>
    </div>
  );
}
