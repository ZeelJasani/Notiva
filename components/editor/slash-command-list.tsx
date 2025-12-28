import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import {
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    CheckSquare,
    Quote,
    Code,
} from "lucide-react";

export const SlashCommandList = forwardRef((props: any, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
        const item = props.items[index];
        if (item) {
            props.command(item);
        }
    };

    useImperativeHandle(ref, () => ({
        onKeyDown: ({ event }: { event: KeyboardEvent }) => {
            if (event.key === "ArrowUp") {
                setSelectedIndex(
                    (selectedIndex + props.items.length - 1) % props.items.length
                );
                return true;
            }

            if (event.key === "ArrowDown") {
                setSelectedIndex((selectedIndex + 1) % props.items.length);
                return true;
            }

            if (event.key === "Enter") {
                selectItem(selectedIndex);
                return true;
            }

            return false;
        },
    }));

    useEffect(() => {
        setSelectedIndex(0);
    }, [props.items]);

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "H1":
                return <Heading1 className="w-4 h-4" />;
            case "H2":
                return <Heading2 className="w-4 h-4" />;
            case "H3":
                return <Heading3 className="w-4 h-4" />;
            case "List":
                return <List className="w-4 h-4" />;
            case "ListOrdered":
                return <ListOrdered className="w-4 h-4" />;
            case "CheckSquare":
                return <CheckSquare className="w-4 h-4" />;
            case "Quote":
                return <Quote className="w-4 h-4" />;
            case "Code":
                return <Code className="w-4 h-4" />;
            default:
                return null;
        }
    };

    return (
        <div className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-border bg-popover p-1 shadow-md transition-all">
            {props.items.length > 0 ? (
                props.items.map((item: any, index: number) => (
                    <button
                        key={index}
                        onClick={() => selectItem(index)}
                        className={`flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground ${index === selectedIndex ? "bg-accent text-accent-foreground" : ""
                            }`}
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background">
                            {getIcon(item.icon)}
                        </div>
                        <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                    </button>
                ))
            ) : (
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    No results
                </div>
            )}
        </div>
    );
});

SlashCommandList.displayName = "SlashCommandList";
