"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export function UserNav() {
    const router = useRouter();
    const session = authClient.useSession();

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/");
    };

    if (session.isPending || !session.data) {
        return null;
    }

    const { user } = session.data;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="group relative h-9 w-9 overflow-hidden rounded-full border ring-offset-background transition-all hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt={user.name || "User"}
                            fill
                            className="object-cover transition-transform group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted text-xs font-medium">
                            {user.name?.charAt(0) || "U"}
                        </div>
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex w-full items-center">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
