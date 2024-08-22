"use client"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DEMO_PAGE_TEXT } from "@/constants/marketingPage";
import Image from "next/image";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Home() {
  const router = useRouter()

  const signIn = () => {
    router.push("https://6966894145.propelauthtest.com")
  }


  return (
    <div className="mx-auto max-w-[1800px]">
      <div className="text-end p-3">
        <Button onClick={signIn}>Sign in</Button>
      </div>
      <div className="pt-10">
        <div className="pb-4 flex justify-between w-full">
          <div className="font-bold text-3xl">Tarsier Service</div>
        </div>
        <div className="relative ring-offset-4 ring-gray-500 ring rounded-lg overflow-clip h-[1170px]">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} className="z-40 bg-white">
              <div className="whitespace-pre text-xs p-2 overflow-clip" style={{ lineHeight: '14px'}}>{ DEMO_PAGE_TEXT }</div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <Image 
                className="absolute top-0 left-0 h-full w-full transition-opacity duration-300"
                src="/hn_ss.png" 
                width={2169}
                height={1234}
                alt="hacker news screenshot" 
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
}
