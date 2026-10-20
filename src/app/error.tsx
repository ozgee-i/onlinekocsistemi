"use client";

import { Button } from "@/components/ui/button";

// Hata ayrıntısı kullanıcıya gösterilmez; yalnızca izlenebilir `digest` kodu verilir.
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Bir şeyler ters gitti</h1>
      <p className="max-w-md text-muted-foreground">
        Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin; sorun sürerse bize bildirin.
      </p>
      {error.digest && (
        <p className="font-mono text-xs text-muted-foreground">Hata kodu: {error.digest}</p>
      )}
      <Button onClick={reset}>Tekrar dene</Button>
    </main>
  );
}
