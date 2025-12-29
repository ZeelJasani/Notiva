"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarMenuAction } from "@/components/ui/sidebar";
import { updateNote, deleteNote } from "@/server/notes";

const formSchema = z.object({
    title: z.string().min(2).max(100),
});

interface NoteActionMenuProps {
    note: {
        id: string;
        title: string;
        notebookId: string;
    };
}

export function NoteActionMenu({ note }: NoteActionMenuProps) {
    const router = useRouter();
    const [isRenameOpen, setIsRenameOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: note.title,
        },
    });

    async function onRenameSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            const response = await updateNote(note.id, { title: values.title });
            if (response.success) {
                toast.success("Note renamed successfully");
                setIsRenameOpen(false);
                router.refresh();
            } else {
                toast.error(response.message);
            }
        } catch {
            toast.error("Failed to rename note");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete() {
        try {
            setIsLoading(true);
            const response = await deleteNote(note.id);
            if (response.success) {
                toast.success("Note deleted successfully");
                router.refresh();
            } else {
                toast.error(response.message);
            }
        } catch {
            toast.error("Failed to delete note");
        } finally {
            setIsLoading(false);
            setIsDeleteOpen(false);
        }
    }

    return (
        <>
            <DropdownMenu>
                <SidebarMenuAction asChild>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-5 hover:bg-sidebar-accent">
                            <MoreHorizontal className="size-3" />
                        </Button>
                    </DropdownMenuTrigger>
                </SidebarMenuAction>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onSelect={() => {
                        form.setValue("title", note.title);
                        setIsRenameOpen(true);
                    }}>
                        <Pencil className="mr-2 size-4" />
                        Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={() => setIsDeleteOpen(true)}
                        className="text-destructive focus:text-destructive"
                    >
                        <Trash2 className="mr-2 size-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Rename Dialog */}
            <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rename Note</DialogTitle>
                        <DialogDescription>
                            Enter a new title for your note.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onRenameSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onKeyDown={(e) => {
                                                    if (e.key === " ") e.stopPropagation();
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => setIsRenameOpen(false)}>Cancel</Button>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="animate-spin size-4" /> : "Save Changes"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete &quot;{note.title}&quot; and all its sub-pages.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault();
                                handleDelete();
                            }}
                            disabled={isLoading}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            {isLoading ? <Loader2 className="animate-spin size-4" /> : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
