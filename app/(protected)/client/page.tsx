"use client";

import { UserInfo } from "@/components/user-info";
import { CurrentUser } from "@/hooks/use-current-user";
import { ExtendedUser } from "@/next-auth";
import { useCallback, useEffect, useState } from "react";

const ClientPage = () => {
  const [user, setUser] = useState<ExtendedUser | null | undefined>(null);
  const getSession = () => {
    CurrentUser().then((data) => {
      setUser(data);
    });
  };
  useEffect(() => {
    getSession();
  }, []);
  if (!user) return null;
  return <UserInfo label="Client component" user={user} />;
};

export default ClientPage;
