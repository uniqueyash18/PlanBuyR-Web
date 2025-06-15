import { Suspense } from "react";
import BannerForm from "./BannerForm";

export default function BannerFormPage() {
  return (
    <main className="max-w-lg mx-auto py-10 px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <BannerForm />
      </Suspense>
    </main>
  );
} 