"use client";
import { Suspense } from "react";
import SideBar from "../component/sidebar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full grid grid-cols-12 min-w-full">
      <div className="col-span-2 flex-none">
        <SideBar />
      </div>
      <div className="col-span-10 min-w-full min-h-screen">
        <Suspense>
          <div className="p-2 md:overflow-y-auto md:p-2">{children}</div>
        </Suspense>
      </div>
    </div>
  );
}
