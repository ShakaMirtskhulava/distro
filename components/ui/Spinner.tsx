import { useEffect } from "react";

interface SpinnerProps {
  color: string;
  size: number;
}

export default function Spinner({ color, size }: SpinnerProps) {
  async function getLoader() {
    const { ring } = await import("ldrs");
    ring.register();
  }

  useEffect(() => {
    getLoader();
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <l-ring size={size} stroke="2" bg-opacity="0%" speed="2" color={color}></l-ring>
    </div>
  );
}
