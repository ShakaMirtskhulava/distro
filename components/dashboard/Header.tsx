"use client";

import { Avatar } from "@ark-ui/react/avatar";
import { useRouter } from "next/navigation";

interface HeaderProps {
  userMail: string | undefined;
}

export default function Header({ userMail }: HeaderProps) {
  const router = useRouter();
  return (
    <div className="flex justify-end p-2">
      <Avatar.Root
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-secondary text-white"
        onClick={() => router.push("/dashboard/profile")}
      >
        <Avatar.Fallback>{userMail}</Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}
