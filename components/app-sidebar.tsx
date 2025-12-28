// import * as React from "react"
// import { ChevronRight } from "lucide-react"

// import { SearchForm } from "@/components/search-form"
// import { VersionSwitcher } from "@/components/version-switcher"
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
// } from "@/components/ui/sidebar"

// // This is sample data.
// const data = {
//   versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
//   navMain: [
//     {
//       title: "Getting Started",
//       url: "#",
//       items: [
//         {
//           title: "Installation",
//           url: "#",
//         },
//         {
//           title: "Project Structure",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Building Your Application",
//       url: "#",
//       items: [
//         {
//           title: "Routing",
//           url: "#",
//         },
//         {
//           title: "Data Fetching",
//           url: "#",
//           isActive: true,
//         },
//         {
//           title: "Rendering",
//           url: "#",
//         },
//         {
//           title: "Caching",
//           url: "#",
//         },
//         {
//           title: "Styling",
//           url: "#",
//         },
//         {
//           title: "Optimizing",
//           url: "#",
//         },
//         {
//           title: "Configuring",
//           url: "#",
//         },
//         {
//           title: "Testing",
//           url: "#",
//         },
//         {
//           title: "Authentication",
//           url: "#",
//         },
//         {
//           title: "Deploying",
//           url: "#",
//         },
//         {
//           title: "Upgrading",
//           url: "#",
//         },
//         {
//           title: "Examples",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "API Reference",
//       url: "#",
//       items: [
//         {
//           title: "Components",
//           url: "#",
//         },
//         {
//           title: "File Conventions",
//           url: "#",
//         },
//         {
//           title: "Functions",
//           url: "#",
//         },
//         {
//           title: "next.config.js Options",
//           url: "#",
//         },
//         {
//           title: "CLI",
//           url: "#",
//         },
//         {
//           title: "Edge Runtime",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Architecture",
//       url: "#",
//       items: [
//         {
//           title: "Accessibility",
//           url: "#",
//         },
//         {
//           title: "Fast Refresh",
//           url: "#",
//         },
//         {
//           title: "Next.js Compiler",
//           url: "#",
//         },
//         {
//           title: "Supported Browsers",
//           url: "#",
//         },
//         {
//           title: "Turbopack",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Community",
//       url: "#",
//       items: [
//         {
//           title: "Contribution Guide",
//           url: "#",
//         },
//       ],
//     },
//   ],
// }

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   return (
//     <Sidebar {...props}>
//       <SidebarHeader>
//         <VersionSwitcher
//           versions={data.versions}
//           defaultVersion={data.versions[0]}
//         />
//         <SearchForm />
//       </SidebarHeader>
//       <SidebarContent className="gap-0">
//         {/* We create a collapsible SidebarGroup for each parent. */}
//         {data.navMain.map((item) => (
//           <Collapsible
//             key={item.title}
//             title={item.title}
//             defaultOpen
//             className="group/collapsible"
//           >
//             <SidebarGroup>
//               <SidebarGroupLabel
//                 asChild
//                 className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
//               >
//                 <CollapsibleTrigger>
//                   {item.title}{" "}
//                   <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
//                 </CollapsibleTrigger>
//               </SidebarGroupLabel>
//               <CollapsibleContent>
//                 <SidebarGroupContent>
//                   <SidebarMenu>
//                     {item.items.map((item) => (
//                       <SidebarMenuItem key={item.title}>
//                         <SidebarMenuButton asChild isActive={item.isActive}>
//                           <a href={item.url}>{item.title}</a>
//                         </SidebarMenuButton>
//                       </SidebarMenuItem>
//                     ))}
//                   </SidebarMenu>
//                 </SidebarGroupContent>
//               </CollapsibleContent>
//             </SidebarGroup>
//           </Collapsible>
//         ))}
//       </SidebarContent>
//       <SidebarRail />
//     </Sidebar>
//   )
// }












// my custom sidebar code
import * as React from "react";

import { SearchForm } from "@/components/search-form";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getNotebooks } from "@/server/notebooks";
import { Logo } from "@/components/logo";
import { SidebarData } from "./sidebar-data";
import Link from "next/link";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const notebooks = await getNotebooks();

  const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
      ...(notebooks.notebooks?.map((notebook) => ({
        title: notebook.name,
        url: `/dashboard/${notebook.id}`,
        items: notebook.notes.map((note) => ({
          title: note.title,
          url: `/dashboard/notebook/${notebook.id}/note/${note.id}`,
        })),
      })) ?? []),
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 pl-2 pt-2">
          <Logo />
        </Link>

        <React.Suspense>
          <SearchForm />
        </React.Suspense>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarData data={data} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}