import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { HTMLAttributes, forwardRef } from "react"

const bentoGridVariants = cva("grid gap-4", {
    variants: {
        cols: {
            1: "grid-cols-1",
            2: "grid-cols-2",
            3: "grid-cols-3",
            4: "grid-cols-4",
            5: "grid-cols-5",
        },
        gap: {
            sm: "gap-2",
            md: "gap-4",
            lg: "gap-6",
            xl: "gap-8",
        },
    },
    defaultVariants: {
        cols: 3,
        gap: "md",
    },
})

interface BentoGridProps
    extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoGridVariants> { }

const BentoGrid = forwardRef<HTMLDivElement, BentoGridProps>(
    ({ className, cols, gap, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(bentoGridVariants({ cols, gap, className }))}
                {...props}
            />
        )
    }
)
BentoGrid.displayName = "BentoGrid"

const BentoGridItem = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & {
        span?: number
        className?: string
    }
>(({ className, span = 1, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "relative overflow-hidden rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md",
                `col-span-${span}`,
                className
            )}
            {...props}
        />
    )
})
BentoGridItem.displayName = "BentoGridItem"

export { BentoGrid, BentoGridItem }
