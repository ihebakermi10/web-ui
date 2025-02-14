// pages/index.tsx

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirige vers la page login
    router.push("/login");
  }, [router]);

  return null;
}
