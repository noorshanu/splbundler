import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';

export default function HeroSection() {
    return (
        <section 
            className='flex flex-col items-center justify-center leading-6 mt-12'
            aria-label="Solana Bundler Hero Section"
        >
            <div className='flex flex-col sm:flex-row justify-between items-center gap-8 max-w-6xl mb-8'>
                {/* Left Content */}
                <div className='w-full sm:w-1/2'>
                    <h1 className='text-4xl font-semibold tracking-tight pb-4'>
                        SPL Bundler
                    </h1>
                    <p className='mt-4 text-gray-600'>
                        A cutting-edge tool designed to optimize Solana transactions. 
                        Solana Bundler aggregates multiple transactions into a single, cost-efficient bundle.
                        Perfect for developers, traders, and projects seeking efficiency in the Solana ecosystem.
                    </p>
                    <div className='flex flex-wrap gap-4 mt-6'>
                        <Link href="/dashboard">
                            <Button className='rounded-md bg-btn text-sm font-semibold text-white'>
                                Login
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button className='rounded-md bg-btn text-sm font-semibold text-white'>
                                Proceed
                            </Button>
                        </Link>
                        <Link 
                            href="#" 
                            target="_blank" 
                            aria-label="Join Discord (opens in a new tab)"
                        >
                            <Button variant="outline" className="flex gap-1">
                                Join Discord
                                <ArrowRight className='w-4 h-4' aria-hidden="true" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Right Image */}
                <div className='w-full sm:w-1/2'>
                    <Image 
                        src='/hero.png' 
                        height={500} 
                        width={400} 
                        alt='Illustration of Solana Bundler' 
                        className='mx-auto' 
                        priority 
                    />
                </div>
            </div>
        </section>
    );
}