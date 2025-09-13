import { NextResponse } from "next/server";
import { getRecentCache } from "@/lib/cache";

export async function GET() {
    try {
        const cache = getRecentCache();
        const recentFiles = cache.getAll();

        return NextResponse.json({
            success: true,
            files: recentFiles,
        });
    } catch (error) {
        console.error("Error getting recent files:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to retrieve recent files",
                files: [],
            },
            { status: 500 }
        );
    }
}