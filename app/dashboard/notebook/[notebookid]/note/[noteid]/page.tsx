import { PageWrapper } from "@/components/page-wrapper";
import RichTextEditor from "@/components/rich-text-editor";
import { getNoteById } from "@/server/notes";
import { JSONContent } from "@tiptap/react";
import { CreateNoteButton } from "@/components/create-note-button";
import NoteCard from "@/components/note-card";

type Params = Promise<{
  notebookid: string;
  noteid: string;
}>;

export default async function NotePage({ params }: { params: Params }) {
  const { noteid } = await params;

  const { note } = await getNoteById(noteid);

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: note?.notebook?.name ?? "Notebook",
          href: `/dashboard/notebook/${note?.notebookId}`,
        },
        { label: note?.title ?? "Note", href: `/dashboard/notebook/${note?.notebookId}/note/${noteid}` },
      ]}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight">{note?.title}</h1>
          <RichTextEditor
            content={note?.content as JSONContent}
            noteId={noteid}
          />
        </div>

        {/* Nested Pages Section */}
        <div className="flex flex-col gap-6 pt-8 border-t">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight leading-none">Nested Pages</h2>
            <CreateNoteButton
              notebookId={note?.notebookId || ""}
              parentId={noteid}
            />
          </div>

          {note?.children && note.children.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {note.children.map((child: any) => (
                <NoteCard key={child.id} note={child} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No nested pages yet.</p>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
