import { PageWrapper } from "@/components/page-wrapper";
import RichTextEditor from "@/components/rich-text-editor";
import { getNoteById } from "@/server/notes";
import { JSONContent } from "@tiptap/react";

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
      <div className="flex flex-col gap-8 min-w-0">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold tracking-tight">{note?.title}</h1>
          <RichTextEditor
            content={note?.content as JSONContent}
            noteId={noteid}
          />
        </div>
      </div>
    </PageWrapper>
  );
}
