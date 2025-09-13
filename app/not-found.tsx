import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FolderX, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md w-full mx-auto text-center p-8">
        <div className="mb-8">
          <div className="relative">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse"></div>
              <FolderX className="w-16 h-16 text-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Folder Not Found
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            The folder you're looking for doesn't exist or may have been moved.
            Let's get you back to familiar territory.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full" size="lg">
            <Link href="/" className="flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              Go to Home
            </Link>
          </Button>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>Error Code: 404 - Resource Not Found</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
