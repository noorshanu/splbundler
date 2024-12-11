import Provider from '@/app/provider'
import { ThemeProvider } from "@/components/theme-provider"
 import AuthWrapper from '@/components/wrapper/auth-wrapper'
 import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { ConfirmDialogProvider } from '@/components/confirm-dialog-provider'

import './globals.css'
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  metadataBase: new URL("https://spl.blocktools.ai"),
  title: {
    default: 'Spl Bundler',
    template: `%s | SPL Bundler`
  },
  description: 'A cutting-edge tool designed to optimize Solana transactions, Solana Bundler aggregates multiple transactions into a single, cost-efficient bundle. Maximize speed, reduce fees, and streamline your on-chain operations with seamless integration and superior performance. Perfect for developers, traders, and projects seeking efficiency in the Solana ecosystem.',
  openGraph: {
    description: 'A cutting-edge tool designed to optimize Solana transactions, Solana Bundler aggregates multiple transactions into a single, cost-efficient bundle. Maximize speed, reduce fees, and streamline your on-chain operations with seamless integration and superior performance. Perfect for developers, traders, and projects seeking efficiency in the Solana ecosystem.',
    images: ['https://utfs.io/f/8a428f85-ae83-4ca7-9237-6f8b65411293-eun6ii.png'],
    url: 'https://spl.blocktools.ai'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SPL Bundler',
    description: 'A cutting-edge tool designed to optimize Solana transactions, Solana Bundler aggregates multiple transactions into a single, cost-efficient bundle. Maximize speed, reduce fees, and streamline your on-chain operations with seamless integration and superior performance. Perfect for developers, traders, and projects seeking efficiency in the Solana ecosystem.',
    siteId: "",
    creator: "@rasmic",
    creatorId: "",
    images: ['https://utfs.io/f/8a428f85-ae83-4ca7-9237-6f8b65411293-eun6ii.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthWrapper>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link
            rel="preload"
            href="https://utfs.io/f/31dba2ff-6c3b-4927-99cd-b928eaa54d5f-5w20ij.png"
            as="image"
          />
          <link
            rel="preload"
            href="https://utfs.io/f/69a12ab1-4d57-4913-90f9-38c6aca6c373-1txg2.png"
            as="image"
          />
          <link rel="icon" href="./logos.webp" sizes="any" />
        </head>
        <body className={GeistSans.className}>
        <div className=" ">
        <div id="stars"></div>
      </div>
        
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
             <Toaster />
            <ConfirmDialogProvider defaultOptions={{
              confirmText: 'Yes',
              cancelText: 'No',
              confirmButton: {
                variant: 'destructive',
                size: 'sm'
              },
              cancelButton: {
                variant: 'outline',
                size: 'sm'
              },
              alertDialogContent: {
                className: 'sm:max-w-[1025px]'
              }
            }}>
              {children}
            </ConfirmDialogProvider>
            <Toaster /> 
            </ThemeProvider>
          
         </body>
      </html>
    </AuthWrapper>
  )
}