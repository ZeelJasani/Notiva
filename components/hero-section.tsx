import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Zap, Keyboard, Code2, Layers, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AnimatedGroup } from "@/components/ui/animated-group"
import { HeroHeader } from "./header"

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

export default function HeroSection() {
  return (
    <>
      <HeroHeader />

      <main className="overflow-hidden">
        {/* Background glow */}
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden contain-strict lg:block"
        >
          <div className="absolute left-0 top-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="absolute left-0 top-0 h-320 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="absolute left-0 top-0 h-320 w-60 -translate-y-87.5 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>

        <section>
          <div className="relative pt-44">
            <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]" />

            <div className="mx-auto max-w-5xl px-6">
              <div className="flex flex-col items-center text-center">
                {/* Developer Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[#2B7FFF]/20 bg-[#2B7FFF]/5 px-4 py-1.5 text-sm font-medium text-[#2B7FFF] dark:border-[#2B7FFF]/30 dark:bg-[#2B7FFF]/10">
                  <Zap className="size-3.5 fill-[#2B7FFF] text-[#2B7FFF]" />
                  Built for developers, by developers
                </div>

                {/* Title */}
                <h1 className="mt-8 max-w-4xl text-balance text-5xl font-bold tracking-tight md:text-7xl">
                  The note taking app that{" "}
                  <span className="bg-linear-to-br from-zinc-900 to-zinc-500 bg-clip-text text-transparent dark:from-white dark:to-zinc-500">
                    thinks like you code
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
                  A minimal, block-based editor with keyboard shortcuts, slash
                  commands, and a developer-first design. Your thoughts,
                  organized like code.
                </p>

                {/* CTA */}
                <AnimatedGroup
                  className="mt-10 flex flex-wrap justify-center gap-4"
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.08,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                >
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-xl px-8 text-base font-semibold"
                  >
                    <Link href="/login">Sign In</Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-xl px-8 text-base font-semibold"
                  >
                    <Link href="/register" className="flex items-center gap-2">
                      Start Writing <ArrowRight size={12} />
                    </Link>
                  </Button>
                </AnimatedGroup>

                {/* Feature highlights */}
                <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground/80">
                  <div className="flex items-center gap-2">
                    <Keyboard className="size-4" />
                    Keyboard-first
                  </div>
                  <div className="flex items-center gap-2">
                    <Code2 className="size-4" />
                    Code blocks
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="size-4" />
                    Nested pages
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="size-4" />
                    Real-time sync
                  </div>
                </div>
              </div>
            </div>

            {/* Preview image */}
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.9,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative mt-12 overflow-hidden px-2 sm:mt-20">
                <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border bg-background p-4 shadow-lg ring-1 ring-border">
                  <Image
                    src="/notiva.webp"
                    alt="App preview"
                    width={2700}
                    height={1440}
                    className="aspect-[15/8] rounded-xl border dark:hidden"
                    priority
                  />
                  <Image
                    src="/notiva.webp"
                    alt="App preview dark"
                    width={2700}
                    height={1440}
                    className="hidden aspect-[15/8] rounded-xl dark:block"
                    priority
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
      </main>
    </>
  )
}
