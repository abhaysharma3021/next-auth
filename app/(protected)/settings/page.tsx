"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const user = useCurrentUser();

  const onClick = () => {
    signOut();
  };

  return (
    <div>
      <Button onClick={onClick} type="submit">
        Sign out
      </Button>
    </div>
  );
};

export default SettingsPage;
