import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import { SlashCommandList } from "./slash-command-list";

export const suggestion = {
    items: ({ query }: { query: string }) => {
        return [
            {
                title: "Heading 1",
                description: "Large section heading",
                searchTerms: ["h1", "heading", "large"],
                icon: "H1",
                command: ({ editor, range }: any) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .setNode("heading", { level: 1 })
                        .run();
                },
            },
            {
                title: "Heading 2",
                description: "Medium section heading",
                searchTerms: ["h2", "heading", "medium"],
                icon: "H2",
                command: ({ editor, range }: any) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .setNode("heading", { level: 2 })
                        .run();
                },
            },
            {
                title: "Heading 3",
                description: "Small section heading",
                searchTerms: ["h3", "heading", "small"],
                icon: "H3",
                command: ({ editor, range }: any) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .setNode("heading", { level: 3 })
                        .run();
                },
            },
            {
                title: "Bullet List",
                description: "Create a simple bulleted list",
                searchTerms: ["bullet", "list", "unordered"],
                icon: "List",
                command: ({ editor, range }: any) => {
                    editor.chain().focus().deleteRange(range).toggleBulletList().run();
                },
            },
            {
                title: "Numbered List",
                description: "Create a list with numbering",
                searchTerms: ["number", "list", "ordered"],
                icon: "ListOrdered",
                command: ({ editor, range }: any) => {
                    editor.chain().focus().deleteRange(range).toggleOrderedList().run();
                },
            },
            {
                title: "Task List",
                description: "Track tasks with a checklist",
                searchTerms: ["todo", "task", "list", "check", "checkbox"],
                icon: "CheckSquare",
                command: ({ editor, range }: any) => {
                    editor.chain().focus().deleteRange(range).toggleTaskList().run();
                },
            },
            {
                title: "Quote",
                description: "Capture a quotation",
                searchTerms: ["blockquote", "quote", "citation"],
                icon: "Quote",
                command: ({ editor, range }: any) => {
                    editor.chain().focus().deleteRange(range).toggleBlockquote().run();
                },
            },
            {
                title: "Code Block",
                description: "Code with syntax highlighting",
                searchTerms: ["code", "block", "syntax"],
                icon: "Code",
                command: ({ editor, range }: any) => {
                    editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
                },
            },
        ]
            .filter((item) =>
                item.title.toLowerCase().startsWith(query.toLowerCase()) ||
                item.searchTerms.some((term) => term.startsWith(query.toLowerCase()))
            )
            .slice(0, 10);
    },

    render: () => {
        let component: any;
        let popup: any;

        return {
            onStart: (props: any) => {
                component = new ReactRenderer(SlashCommandList, {
                    props,
                    editor: props.editor,
                });

                if (!props.clientRect) {
                    return;
                }

                popup = tippy("body", {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: component.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: "manual",
                    placement: "bottom-start",
                });
            },

            onUpdate(props: any) {
                component.updateProps(props);

                if (!props.clientRect) {
                    return;
                }

                popup[0].setProps({
                    getReferenceClientRect: props.clientRect,
                });
            },

            onKeyDown(props: any) {
                if (props.event.key === "Escape") {
                    popup[0].hide();
                    return true;
                }
                return component.ref?.onKeyDown(props);
            },

            onExit() {
                popup[0].destroy();
                component.destroy();
            },
        };
    },
};
