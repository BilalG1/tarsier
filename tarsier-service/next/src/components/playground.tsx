import { useState } from "react"
import Image from "next/image";

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { BACKEND_BASE } from "@/constants/api";


type Props = { 
  accessToken: string, 
  incrementJobCount: () => void 
}

export default function Playground({ accessToken, incrementJobCount }: Props) {
  const [url, setUrl] = useState('')
  const [pageText, setPageText] = useState('')
  const [pageImg, setPageImg] = useState('')

  const handleSend = async () => {
    const headers = { 'Authorization': `Bearer ${accessToken}`, 'Content-type': 'application/json' }
    const config = {
      headers,
      method: "POST",
      body: JSON.stringify({ url })
    }
    const data = await fetch(`${BACKEND_BASE}/playground`, config).then(r => r.json())
    setPageText(data.data)
    setPageImg('data:image/png;base64,' + data.image)
    incrementJobCount()
  }

  return (
    <div>
      <div className="flex justify-start mb-8">
        <Input className="max-w-96" placeholder="Site URL" onChange={e => setUrl(e.target.value)} />
        <Button className="ml-4" onClick={handleSend}>Send</Button>
      </div>

      <div className="relative ring-offset-4 ring-gray-500 ring rounded-lg overflow-clip h-[1170px]">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} className="z-40 bg-white">
            <div className="whitespace-pre text-xs p-2 overflow-clip" style={{ lineHeight: '14px'}}>{ pageText }</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <Image 
              className="absolute top-0 left-0 h-full w-full transition-opacity duration-300"
              src={pageImg} 
              width={2169}
              height={1234}
              alt="screenshot" 
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}