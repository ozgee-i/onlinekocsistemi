import { z } from "zod";

// CSP `unsafe-eval` içermediği için Zod'un `new Function` ile JIT denemesini kapat.
// Tüm şemalar `z`'yi bu dosyadan almalı.
z.config({ jitless: true });

export { z };
