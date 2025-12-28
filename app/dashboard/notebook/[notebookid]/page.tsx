import { CreateNoteButton } from "@/components/create-note-button";
import NoteCard from "@/components/note-card";
import { PageWrapper } from "@/components/page-wrapper";
import { getNotebookById } from "@/server/notebooks";

type Params = Promise<{
  notebookid: string;
}>;

export default async function NotebookPage({ params }: { params: Params }) {
  const { notebookid } = await params;

  const { notebook } = await getNotebookById(notebookid);

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: notebook?.name ?? "Notebook",
          href: `/dashboard/notebook/${notebookid}`,
        },
      ]}
    >
      <h1>{notebook?.name}</h1>

      <CreateNoteButton notebookId={notebookid} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notebook?.notes?.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </PageWrapper>
  );
}