"use client";
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { authClient } from "@/lib/auth-client"

export default function CallToAction() {
    const session = authClient.useSession()

    return (
        <section className="relative py-24 md:py-44 overflow-hidden">
            {/* Background glow effect */}
            <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10">
                <div className="size-[500px] bg-primary/5 blur-[120px] rounded-full" />
            </div>

            <div className="mx-auto max-w-5xl px-6">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                        Ready to upgrade your <br />
                        <span className="bg-linear-to-br from-zinc-900 to-zinc-500 bg-clip-text text-transparent dark:from-white dark:to-zinc-500">
                            writing workflow?
                        </span>
                    </h2>
                    <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl font-medium">
                        Join developers who are organizing their thoughts with the power of blocks
                        and the speed of keyboard shortcuts.
                    </p>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        {session.data ? (
                            <Button
                                asChild
                                size="lg"
                                className="h-12 rounded-xl px-8 text-base font-semibold shadow-sm">
                                <Link href="/dashboard" className="flex items-center gap-2">
                                    Go to Dashboard <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        ) : (
                            <>
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-12 rounded-xl px-8 text-base font-semibold shadow-sm">
                                    <Link href="/register" className="flex items-center gap-2">
                                        Start Writing Free <ArrowRight className="size-4" />
                                    </Link>
                                </Button>

                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="h-12 rounded-xl px-8 text-base font-semibold">
                                    <Link href="/login">
                                        Sign In
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
