import React from "react";

interface PageLayoutComp {
  children?: React.ReactNode;
  title: string;
  description: string;
}
export default function PageLayoutComp({ children, title, description }: PageLayoutComp) {
  return (
    <div className="flex w-full flex-col p-4">
      <div className="w-full">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-1 text-sm">{description}</p>
      </div>
      {children && children}
    </div>
  );
}
