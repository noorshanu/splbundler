import ModeToggle from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { Banknote, Folder, HomeIcon, Settings } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import Noor from "./logo.webp"

import Image from "next/image"
export default function Header() {
  return (
    <div className="border-b border-[#1E1B24]">
      <div className="flex h-8 items-center justify-center gap-4 bg-[#37ff2139] px-6">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <span className="text-sm text-white">
          Make sure you&apos;re using the domain https://spl.blocktools.ai – Beware of phishing sites.
        </span>
      </div>
      <div className="flex h-14 items-center justify-between px-6 bg-[#25252580]">
        <div className="flex items-center gap-2">
        
          <Image   src={Noor}
                            alt="Nextjs Starter Kit Dashboard Preview"
                            width={150}
                            height={150}
                            priority={true}
                            className="block " />
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/settings">
            <Button variant="outline" size={'md'}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <UserButton />
           <ModeToggle />
        </div>
      </div>
    </div>
  )
}

