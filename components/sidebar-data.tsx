"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupAction,
} from "./ui/sidebar";
import { ChevronRight, FileText } from "lucide-react";
import { useQueryState } from "nuqs";
import { CreateNoteButton } from "./create-note-button";
import { NoteActionMenu } from "./note-action-menu";

interface SidebarDataProps {
  data: {
    navMain: {
      id: string;
      title: string;
      url: string;
      items: { id: string; notebookId: string; title: string; url: string }[];
    }[];
  };
}

export function SidebarData({ data }: SidebarDataProps) {
  const [search] = useQueryState("search", { defaultValue: "" });

  const filteredData = data.navMain.filter((item) => {
    const notebookMatches = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const noteMatches = item.items.some((note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    );

    return notebookMatches || noteMatches;
  });

  return (
    <>
      {filteredData.map((item) => (
        <Collapsible
          key={item.title}
          title={item.title}
          defaultOpen
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm pr-8"
            >
              <CollapsibleTrigger>
                {item.title}{" "}
                {item.items.length > 0 && (
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <SidebarGroupAction asChild>
              <CreateNoteButton
                notebookId={item.id}
                iconOnly
                className="opacity-0 group-hover/collapsible:opacity-100 transition-opacity"
              />
            </SidebarGroupAction>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((note) => (
                    <SidebarMenuItem key={note.id}>
                      <SidebarMenuButton asChild>
                        <a href={note.url}>
                          <FileText className="size-4" />
                          {note.title}
                        </a>
                      </SidebarMenuButton>
                      <NoteActionMenu note={note} />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
    </>
  );
}