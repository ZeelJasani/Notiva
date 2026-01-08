"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createNote } from "@/server/notes";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2).max(100),
});

interface CreateNoteButtonProps {
  notebookId: string;
  parentId?: string;
  iconOnly?: boolean;
  className?: string;
}

export const CreateNoteButton = ({ notebookId, parentId, iconOnly, className }: CreateNoteButtonProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const response = await createNote({
        title: values.title,
        notebookId,
        parentId,
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "" }],
          },
        ],
      });

      if (response.success) {
        form.reset();
        toast.success("Note created successfully");
        router.refresh();
        setIsOpen(false);
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Failed to create note");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {iconOnly ? (
          <Button
            variant="ghost"
            size="icon"
            className={cn("size-5 p-0", className)}
            title={parentId ? "Create Sub-page" : "Create Note"}
          >
            <Plus className="size-3" />
            <span className="sr-only">
              {parentId ? "Create Sub-page" : "Create Note"}
            </span>
          </Button>
        ) : (
          <Button className="w-max" variant={parentId ? "outline" : "default"}>
            <Plus className="mr-2 h-4 w-4" />
            {parentId ? "Create Sub-page" : "Create Note"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Note</DialogTitle>
          <DialogDescription>
            Create a new note in this notebook.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Note title"
                      {...field}
                      onKeyDown={(e) => {
                        if (e.key === " ") {
                          e.stopPropagation();
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};