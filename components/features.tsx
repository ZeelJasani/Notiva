import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Settings2, Sparkles, Zap } from 'lucide-react'
import { ReactNode } from 'react'

export default function Features() {
    return (
        <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Built to cover your needs</h2>
                    <p className="mt-4">Libero sapiente aliquam quibusdam aspernatur, praesentium iusto repellendus.</p>
                </div>
                <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
                    <Card className="group bg-background shadow-zinc-950">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Zap
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Customizable</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">Extensive customization options, allowing you to tailor every aspect to meet your specific needs.</p>
                        </CardContent>
                    </Card>

                    <Card className="group bg-background shadow-zinc-950">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Settings2
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">You have full control</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm">From design elements to functionality, you have complete control to create a unique and personalized experience.</p>
                        </CardContent>
                    </Card>

                    <Card className="group bg-background shadow-zinc-950">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Sparkles
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Powered By AI</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm">Elements to functionality, you have complete control to create a unique experience.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
        />

        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)














// import { cn } from "@/lib/utils";
// import React from "react";
// import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
// import {
//   IconClipboardCheck,
//   IconFileAnalytics,
//   IconBrush,
//   IconMessage2,
//   IconRocket,
//   IconCloudComputing,
//   IconChartBar,
//   IconCloud
// } from "@tabler/icons-react";

// export function Features() {
//   return (
//     <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
//       {items.map((item, i) => (
//         <BentoGridItem
//           key={i}
//           title={
//             <div className="flex items-center gap-2">
//               <div className={`p-1.5 rounded-lg ${item.iconColor} bg-opacity-10`}>
//                 {item.icon}
//               </div>
//               <span>{item.title}</span>
//             </div>
//           }
//           description={
//             <div className="space-y-3">
//               <p className="text-sm text-muted-foreground">{item.description}</p>
//               {item.date && (
//                 <div className="text-xs text-muted-foreground/80">
//                   <span className="font-medium">Duration:</span> {item.date}
//                 </div>
//               )}
//               {item.features && (
//                 <div className="space-y-1">
//                   <span className="text-xs font-medium text-muted-foreground/80">Key Features:</span>
//                   <ul className="list-disc list-inside text-xs space-y-1 text-muted-foreground/80">
//                     {item.features.map((feature, idx) => (
//                       <li key={idx} className="flex items-center">
//                         <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 opacity-70"></span>
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               <div className="flex flex-wrap gap-2 pt-1">
//                 {item.tags?.map((tag, idx) => (
//                   <span
//                     key={idx}
//                     className={`text-xs px-2.5 py-1 rounded-full ${tag.color} ${tag.textColor} border border-border/30`}
//                   >
//                     {tag.label}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           }
//           header={item.header}
//           className={`${item.className} group hover:bg-accent/5 transition-colors`}
//           icon={null}
//         />
//       ))}
//     </BentoGrid>
//   );
// }

// const Skeleton = () => (
//   <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl border border-border/50 dark:border-white/10 bg-background/50">
//     <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5" />
//   </div>
// );

// const items = [
//   {
//     title: "Project Aurora",
//     description: "A cutting-edge AI platform that automates business processes with 98% accuracy. Launched in Q3 2023 with over 1M active users.",
//     header: <Skeleton />,
//     className: "md:col-span-2",
//     icon: <IconFileAnalytics className="h-4 w-4" />,
//     iconColor: "text-blue-500",
//     date: "March 2023 - Present",
//     features: ["AI Automation", "Real-time Analytics", "Multi-tenant"],
//     tags: [
//       { label: "AI/ML", color: "bg-blue-100 dark:bg-blue-900/30", textColor: "text-blue-800 dark:text-blue-200" },
//       { label: "SaaS", color: "bg-indigo-100 dark:bg-indigo-900/30", textColor: "text-indigo-800 dark:text-indigo-200" },
//       { label: "Enterprise", color: "bg-cyan-100 dark:bg-cyan-900/30", textColor: "text-cyan-800 dark:text-cyan-200" }
//     ]
//   },
//   {
//     title: "Nexus Blockchain",
//     description: "High-performance blockchain solution with 50,000+ TPS. Successfully processed over 10M transactions since launch in Q2 2023.",
//     header: <Skeleton />,
//     className: "md:col-span-1",
//     icon: <IconCloudComputing className="h-4 w-4" />,
//     iconColor: "text-green-500",
//     date: "January 2023 - Present",
//     features: ["Smart Contracts", "DeFi", "NFTs"],
//     tags: [
//       { label: "Blockchain", color: "bg-green-100 dark:bg-green-900/30", textColor: "text-green-800 dark:text-green-200" },
//       { label: "Web3", color: "bg-emerald-100 dark:bg-emerald-900/30", textColor: "text-emerald-800 dark:text-emerald-200" },
//       { label: "Crypto", color: "bg-lime-100 dark:bg-lime-900/30", textColor: "text-lime-800 dark:text-lime-200" }
//     ]
//   },
//   {
//     title: "DesignHub Pro",
//     description: "Collaborative design platform with 50K+ assets. Launched in Q1 2023 with 100+ enterprise clients.",
//     header: <Skeleton />,
//     className: "md:col-span-1",
//     icon: <IconBrush className="h-4 w-4" />,
//     iconColor: "text-purple-500",
//     date: "November 2022 - Present",
//     features: ["Real-time Collab", "3D Design", "Prototyping"],
//     tags: [
//       { label: "UI/UX", color: "bg-fuchsia-100 dark:bg-fuchsia-900/30", textColor: "text-fuchsia-800 dark:text-fuchsia-200" },
//       { label: "Design Tools", color: "bg-violet-100 dark:bg-violet-900/30", textColor: "text-violet-800 dark:text-violet-200" },
//       { label: "Cloud", color: "bg-pink-100 dark:bg-pink-900/30", textColor: "text-pink-800 dark:text-pink-200" }
//     ]
//   },
//   {
//     title: "ConnectSphere",
//     description: "Enterprise communication platform with end-to-end encryption. Trusted by 500+ companies worldwide since 2022.",
//     header: <Skeleton />,
//     className: "md:col-span-2",
//     icon: <IconMessage2 className="h-4 w-4" />,
//     iconColor: "text-amber-500",
//     date: "September 2022 - Present",
//     features: ["Secure Messaging", "Video Calls", "File Sharing"],
//     tags: [
//       { label: "Communication", color: "bg-amber-100 dark:bg-amber-900/30", textColor: "text-amber-800 dark:text-amber-200" },
//       { label: "Security", color: "bg-orange-100 dark:bg-orange-900/30", textColor: "text-orange-800 dark:text-orange-200" },
//       { label: "Enterprise", color: "bg-rose-100 dark:bg-rose-900/30", textColor: "text-rose-800 dark:text-rose-200" }
//     ]
//   },
//   {
//     title: "DataForge Analytics",
//     description: "Advanced data analysis platform processing 1TB+ daily. Launched in Q4 2022 with 95% customer satisfaction.",
//     header: <Skeleton />,
//     className: "md:col-span-1",
//     icon: <IconChartBar className="h-4 w-4" />,
//     iconColor: "text-red-500",
//     date: "August 2022 - Present",
//     features: ["Big Data", "Predictive Analytics", "Dashboards"],
//     tags: [
//       { label: "Data Science", color: "bg-red-100 dark:bg-red-900/30", textColor: "text-red-800 dark:text-red-200" },
//       { label: "BI", color: "bg-pink-100 dark:bg-pink-900/30", textColor: "text-pink-800 dark:text-pink-200" },
//       { label: "Cloud", color: "bg-rose-100 dark:bg-rose-900/30", textColor: "text-rose-800 dark:text-rose-200" }
//     ]
//   },
//   {
//     title: "CloudNova",
//     description: "Serverless cloud platform with 99.99% uptime. Launched in Q3 2022, now serving 10K+ developers.",
//     header: <Skeleton />,
//     className: "md:col-span-1",
//     icon: <IconClipboardCheck className="h-4 w-4" />,
//     iconColor: "text-sky-500",
//     date: "June 2022 - Present",
//     features: ["Serverless", "Auto-scaling", "Global CDN"],
//     tags: [
//       { label: "Cloud", color: "bg-sky-100 dark:bg-sky-900/30", textColor: "text-sky-800 dark:text-sky-200" },
//       { label: "DevOps", color: "bg-cyan-100 dark:bg-cyan-900/30", textColor: "text-cyan-800 dark:text-cyan-200" },
//       { label: "Infrastructure", color: "bg-blue-100 dark:bg-blue-900/30", textColor: "text-blue-800 dark:text-blue-200" }
//     ]
//   },
// ];
