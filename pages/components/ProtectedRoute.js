import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user?.admin) {
      router.push("/");
    }
  }, [router, user]);

  return <>{user?.admin ? children : null}</>;
}

export default ProtectedRoute;
