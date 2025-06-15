import { Suspense } from "react";
import CategoryForm from "./CategoryForm";

export default function CategoryFormPage() {
  return (
    <main className="max-w-lg mx-auto py-10 px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryForm />
      </Suspense>
    </main>
  );
} 