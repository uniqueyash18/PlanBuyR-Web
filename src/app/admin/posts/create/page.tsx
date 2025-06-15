import { Suspense } from "react";
import PostForm from "./PostForm";

export default function PostFormPage() {
  return (
    <main className="max-w-lg mx-auto py-10 px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <PostForm />
      </Suspense>
    </main>
  );
} 