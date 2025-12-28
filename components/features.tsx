import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FileText, Terminal, Keyboard, Layers, CheckSquare, Code } from 'lucide-react'
import { ReactNode } from 'react'

export default function Features() {
    const features = [
        {
            title: "Block-based Editor",
            description: "Write with blocks — headings, paragraphs, lists, code, quotes.",
            category: "Writing",
            icon: <FileText className="size-5" />,
            tagBg: "bg-blue-500/10 border-blue-500/20",
            tagText: "text-blue-500"
        },
        {
            title: "Slash Commands",
            description: "Type / to quickly insert any block type.",
            category: "Commands",
            icon: <Terminal className="size-5" />,
            tagBg: "bg-green-500/10 border-green-500/20",
            tagText: "text-green-500"
        },
        {
            title: "Keyboard Shortcuts",
            description: "Navigate and format without leaving your keyboard.",
            category: "Productive",
            icon: <Keyboard className="size-5" />,
            tagBg: "bg-purple-500/10 border-purple-500/20",
            tagText: "text-purple-500"
        },
        {
            title: "Nested Pages",
            description: "Organize pages within pages. Build your own hierarchy.",
            category: "Organization",
            icon: <Layers className="size-5" />,
            tagBg: "bg-orange-500/10 border-orange-500/20",
            tagText: "text-orange-500"
        },
        {
            title: "Task Lists",
            description: "Track todos right in your notes.",
            category: "Checklist",
            icon: <CheckSquare className="size-5" />,
            tagBg: "bg-pink-500/10 border-pink-500/20",
            tagText: "text-pink-500"
        },
        {
            title: "Code Blocks",
            description: "Write code with syntax highlighting.",
            category: "Documentation",
            icon: <Code className="size-5" />,
            tagBg: "bg-yellow-500/10 border-yellow-500/20",
            tagText: "text-yellow-500"
        }
    ]

    return (
        <section className="bg-zinc-50 py-16 md:py-32 dark:bg-zinc-950/50">
            <div className="@container mx-auto max-w-6xl px-6">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-balance text-4xl font-bold tracking-tight lg:text-5xl mb-4 text-foreground">Everything you need, nothing you don&apos;t</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Notiva combines the simplicity of text files with the power of a modern block-based editor.</p>
                </div>

                <div className="mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card key={index} className="group relative bg-background dark:bg-[#1c1c1c] border-zinc-200 dark:border-zinc-800/50 transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700/80 pt-10 pb-6 px-6 flex flex-col items-center text-center shadow-sm dark:shadow-none min-h-[250px]">
                            <CardHeader className="p-0 pt-4 mb-6 w-full flex flex-col items-center">
                                <CardDecorator>
                                    {feature.icon}
                                </CardDecorator>

                                <div className="mt-10 relative top-7 flex justify-center">
                                    {/* mt-10: Base spacing from icon. top-3: Moves capsule down without stretching the card. px-5/py-2: Internal padding. */}
                                    <span className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide uppercase border ${feature.tagBg} ${feature.tagText} transition-colors group-hover:bg-opacity-100`}>
                                        {feature.title}
                                    </span>
                                </div>
                            </CardHeader>

                            <CardContent className="p-0 mt-2">
                                <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px]">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative size-20 flex items-center justify-center">
        {/* Grid Background - Circular Mask */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[10px_10px] opacity-[0.08] text-zinc-500 dark:text-zinc-400 rounded-full overflow-hidden" />

        {/* Central Box - Square */}
        <div className="relative z-10 size-10 bg-background flex items-center justify-center shadow-sm dark:shadow-2xl text-zinc-400 group-hover:text-primary transition-colors duration-300">
            {children}
        </div>

        {/* Glow */}
        <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
)
