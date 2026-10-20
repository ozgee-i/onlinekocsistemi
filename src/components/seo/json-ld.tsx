/**
 * Yapılandırılmış veri (schema.org). Yalnızca koddaki sabit veriler için kullanılır.
 * `<` kaçışlanır; böylece metin içindeki `</script>` etiketi kapatamaz.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
