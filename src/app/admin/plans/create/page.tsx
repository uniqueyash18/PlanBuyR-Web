import { Suspense } from "react";
import PlanForm from "./PlanForm";

export default function PlanFormPage() {
  return (
    <main className="max-w-lg mx-auto py-10 px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <PlanForm />
      </Suspense>
    </main>
  );
} 