"use client";

import {
    useEditor,
    EditorContent,
    useEditorState,
    type JSONContent,
} from "@tiptap/react";
import { useEffect, useRef, useState, useTransition } from "react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Undo,
    Redo,
    Bold,
    Italic,
    Strikethrough,
    Code,
    Underline,
    Link,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Plus,
    ChevronDown,
    Superscript,
    Subscript,
    CheckCircle2,
    CloudUpload,
    CloudOff,
    Loader2,
    Quote,
} from "lucide-react";
import { updateNote } from "@/server/notes";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { Underline as TiptapUnderline } from "@tiptap/extension-underline";
import { Link as TiptapLink } from "@tiptap/extension-link";
import { Commands } from "./editor/slash-command";
import { common, createLowlight } from "lowlight";
import { suggestion as slashCommandSuggestion } from "./editor/suggestion";

const lowlight = createLowlight(common);

interface RichTextEditorProps {
    content?: JSONContent;
    noteId?: string;
}

const RichTextEditor = ({ content, noteId }: RichTextEditorProps) => {
    const timerRef = useRef<NodeJS.Timeout>(null);
    const [isPending, startTransition] = useTransition();
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            Document,
            Paragraph,
            Text,
            TiptapUnderline,
            TiptapLink.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-primary underline underline-offset-4 cursor-pointer",
                },
            }),
            TaskList.configure({
                HTMLAttributes: {
                    class: "not-prose pl-2",
                },
            }),
            TaskItem.configure({
                nested: true,
                HTMLAttributes: {
                    class: "flex gap-2 items-start my-4",
                },
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
            Commands.configure({
                suggestion: {
                    ...slashCommandSuggestion,
                    char: "/",
                },
            }),
        ],
        immediatelyRender: false,
        autofocus: true,
        editable: true,
        injectCSS: false,
        content: content ?? {
            type: "doc",
            content: [],
        },
    });

    useEffect(() => {
        if (!editor) return;

        const handleUpdate = () => {
            if (noteId) {
                setSaveStatus("saving");
                if (timerRef.current) clearTimeout(timerRef.current);

                const json = editor.getJSON();
                timerRef.current = setTimeout(() => {
                    startTransition(async () => {
                        try {
                            const result = await updateNote(noteId, { content: json });
                            if (result.success) {
                                setSaveStatus("saved");
                                setTimeout(() => setSaveStatus("idle"), 3000);
                            } else {
                                setSaveStatus("error");
                            }
                        } catch {
                            setSaveStatus("error");
                        }
                    });
                }, 300);
            }
        };

        editor.on("update", handleUpdate);
        return () => {
            editor.off("update", handleUpdate);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [editor, noteId]);

    const editorState = useEditorState({
        editor,
        selector: (ctx) => {
            if (!ctx.editor) return {};
            return {
                isBold: ctx.editor?.isActive("bold"),
                canBold: ctx.editor?.can().chain().focus().toggleBold().run(),
                isItalic: ctx.editor?.isActive("italic"),
                canItalic: ctx.editor?.can().chain().focus().toggleItalic().run(),
                isStrike: ctx.editor?.isActive("strike"),
                canStrike: ctx.editor?.can().chain().focus().toggleStrike().run(),
                isCode: ctx.editor?.isActive("code"),
                canCode: ctx.editor?.can().chain().focus().toggleCode().run(),
                isParagraph: ctx.editor?.isActive("paragraph"),
                isHeading1: ctx.editor?.isActive("heading", { level: 1 }),
                isHeading2: ctx.editor?.isActive("heading", { level: 2 }),
                isHeading3: ctx.editor?.isActive("heading", { level: 3 }),
                isBulletList: ctx.editor?.isActive("bulletList"),
                isOrderedList: ctx.editor?.isActive("orderedList"),
                isTaskList: ctx.editor?.isActive("taskList"),
                isCodeBlock: ctx.editor?.isActive("codeBlock"),
                isBlockquote: ctx.editor?.isActive("blockquote"),
                canUndo: ctx.editor?.can().chain().focus().undo().run(),
                canRedo: ctx.editor?.can().chain().focus().redo().run(),
            };
        },
    });

    const getActiveHeading = () => {
        if (editorState?.isHeading1) return "H1";
        if (editorState?.isHeading2) return "H2";
        if (editorState?.isHeading3) return "H3";
        return "H1";
    };

    return (
        <div className="w-full max-w-7xl bg-card text-card-foreground rounded-lg overflow-hidden border">
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 bg-muted/50 border-b">
                {/* Undo/Redo */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().undo().run()}
                    disabled={!editorState?.canUndo}
                    className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                    <Undo className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().redo().run()}
                    disabled={!editorState?.canRedo}
                    className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                    <Redo className="h-4 w-4" />
                </Button>

                <div className="w-px h-6 bg-border mx-1" />

                {/* Heading Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-accent gap-1"
                        >
                            {getActiveHeading()}
                            <ChevronDown className="h-3 w-3" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-popover border">
                        <DropdownMenuItem
                            onClick={() =>
                                editor?.chain().focus().toggleHeading({ level: 1 }).run()
                            }
                            className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            Heading 1
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                editor?.chain().focus().toggleHeading({ level: 2 }).run()
                            }
                            className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            Heading 2
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                editor?.chain().focus().toggleHeading({ level: 3 }).run()
                            }
                            className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            Heading 3
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => editor?.chain().focus().setParagraph().run()}
                            className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            Paragraph
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Lists */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    className={`size-8 p-0 hover:bg-accent ${editorState?.isBulletList
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    className={`size-8 p-0 hover:bg-accent ${editorState?.isOrderedList
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleTaskList().run()}
                    className={`size-8 p-0 hover:bg-accent ${editorState?.isTaskList
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <CheckCircle2 className="h-4 w-4" />
                </Button>

                <div className="w-px h-6 bg-border mx-1" />

                {/* Text Formatting */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    disabled={!editorState?.canBold}
                    className={`size-8 p-0 hover:bg-accent ${editorState?.isBold
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    disabled={!editorState?.canItalic}
                    className={`size-8 p-0 hover:bg-accent ${editorState?.isItalic
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                    disabled={!editorState?.canStrike}
                    className={`size-8 p-0 hover:bg-accent ${editorState?.isStrike
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Strikethrough className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleCode().run()}
                    disabled={!editorState?.canCode}
                    className={`size-8 p-0 hover:bg-accent ${editorState?.isCode
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Code className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleUnderline().run()}
                    className={`size-8 p-0 hover:bg-accent ${editor?.isActive("underline")
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Underline className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                    className={`size-8 p-0 hover:bg-accent ${editorState?.isBlockquote
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Quote className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                    className={`size-8 p-0 hover:bg-accent ${editorState?.isCodeBlock
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Code className="h-4 w-4" />
                </Button>

                <div className="w-px h-6 bg-border mx-1" />

                {/* Additional Tools */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        const url = window.prompt("Enter URL");
                        if (url) {
                            editor?.chain().focus().setLink({ href: url }).run();
                        }
                    }}
                    className={`size-8 p-0 hover:bg-accent ${editor?.isActive("link")
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Link className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                    <Superscript className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                    <Subscript className="h-4 w-4" />
                </Button>

                <div className="w-px h-6 bg-border mx-1" />

                {/* Alignment */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                    <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                    <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                    <AlignRight className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                    <AlignJustify className="h-4 w-4" />
                </Button>


                {/* Save Status */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border rounded-full bg-muted/30 ml-2 min-w-[90px] justify-center transition-all duration-300">
                    {saveStatus === "saving" && (
                        <>
                            <Loader2 className="h-3 w-3 animate-spin text-primary" />
                            <span className="text-muted-foreground">Saving...</span>
                        </>
                    )}
                    {saveStatus === "saved" && (
                        <>
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            <span className="text-green-500">Saved</span>
                        </>
                    )}
                    {saveStatus === "error" && (
                        <>
                            <CloudOff className="h-3 w-3 text-destructive" />
                            <span className="text-destructive">Error saving</span>
                        </>
                    )}
                    {saveStatus === "idle" && !isPending && (
                        <>
                            <CloudUpload className="h-3 w-3 text-muted-foreground/50" />
                            <span className="text-muted-foreground/50">Up to date</span>
                        </>
                    )}
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Add Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-accent gap-1"
                >
                    <Plus className="h-4 w-4" />
                    Add
                </Button>
            </div>

            {/* Editor Content */}
            <div className="min-h-96 p-6 bg-card">
                <EditorContent
                    editor={editor}
                    className="prose prose-neutral dark:prose-invert max-w-none focus:outline-none [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:min-h-96 [&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mb-4 [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mb-3 [&_.ProseMirror_p]:mb-4 [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-border [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_pre]:bg-muted [&_.ProseMirror_pre]:p-4 [&_.ProseMirror_pre]:rounded [&_.ProseMirror_pre]:overflow-x-auto [&_.ProseMirror_code]:bg-muted [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:rounded [&_ul[data-type='taskList']]:list-none [&_ul[data-type='taskList']]:pl-2"
                />
            </div>
        </div>
    );
};

export default RichTextEditor;