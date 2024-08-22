"use client"
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { withAuthInfo, type WithAuthInfoProps } from "@propelauth/react"
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"

import { BACKEND_BASE } from "@/constants/api";
import LogsTable from "@/components/apiLogsTable"
import Playground from "@/components/playground"
import CheckoutForm from "@/components/checkoutForm";

const Dashboard = withAuthInfo((props: WithAuthInfoProps) => {
  const requestLimit: number = (props.user as any)?.metadata?.request_limit || 100
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [jobsThisMonth, setJobsThisMonth] = useState<'?' | number>('?')
  const [tab, setTab] = useState<'logs' | 'playground'>('logs')


  if (searchParams.get("session_id")) {
    toast({ "title": "Payment Successful", "description": "API monthly limit set to 1000", "className": "bg-black text-white" })
    router.replace("/dash");
  }

  useEffect(() => {
    const headers = { 'Authorization': `Bearer ${props.accessToken}`}
    fetch(`${BACKEND_BASE}/job-count-cur-month`, { headers })
      .then(r => r.json())
      .then(count => {
        setJobsThisMonth(count)
      })
  }, [])

  const manageApiKeys = () => {
    router.push("https://6966894145.propelauthtest.com/api_keys/personal")
  }

  const incrementJobCount = () => {
    setJobsThisMonth(x => {
      if (x === '?')
        return '?'
      return x + 1
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between p-3 items-center border-b border-gray-300">
        <div className="pr">Tarsier Service</div>
        <div>
          <CheckoutForm accessToken={props.accessToken!} />
          <a href="https://tarsier.mintlify.app" target="_blank" className="ml-4">
            <Button variant="secondary">Docs</Button>
          </a>
          <Button className="ml-4" onClick={manageApiKeys}>Create API Key</Button>
        </div>
      </div>
      <div className="flex flex-row flex-1">
        <div className="bg-gray-100 w-80 py-2 border-r border-gray-300">
          <div className="text-center mb-8 pb-2">{ props.user?.email }</div>
          <div className={`pl-4 py-2 mb-2 mr-6 rounded-r-full hover:outline outline-1 outline-gray-400 cursor-pointer bg-gray-300 ${tab === 'logs' ? 'font-bold' : ''} `} onClick={() => setTab('logs')}>Jobs Log</div>
          <div className={`pl-4 py-2 mb-2 mr-6 rounded-r-full hover:outline outline-1 outline-gray-400 cursor-pointer bg-gray-300 ${tab !== 'logs' ? 'font-bold' : ''} `} onClick={() => setTab('playground')}>Playground</div>
        </div>
        <div className="flex-1 p-8">
          <div className="mb-8 flex justify-between">
            <div className="font-bold text-3xl ">{tab === 'logs' ? 'Jobs Log' : 'Playground'}</div>
            <div>This month: {jobsThisMonth} / { requestLimit }</div>
          </div>
            { props.accessToken && tab === 'logs' && <LogsTable accessToken={props.accessToken} /> }
            { props.accessToken && tab === 'playground' && <Playground accessToken={props.accessToken} incrementJobCount={incrementJobCount} /> }
        </div>
      </div>
    </div>
  );
})
export default Dashboard