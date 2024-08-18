"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  // Initialize Router
  const router = useRouter();

  // On Click funtion to redirect to Login page
  const onClick = () => {
    router.push("/auth/login");
  };

  // MODAL: TODO - Implement Modal
  if (mode === "modal") {
    return <span>TODO: Implement Modal</span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
