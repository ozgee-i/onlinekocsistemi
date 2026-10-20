import { THEME_STORAGE_KEY } from "./theme-constants";

/**
 * İlk boyamadan önce temayı uygular (koyu tema yanıp sönmesini önler).
 * İçerik sabit bir dizedir; kullanıcı girdisi içermez.
 */
const script = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var d=s==="dark"||((!s||s==="system")&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.setAttribute("data-theme",d?"dark":"light")}catch(e){}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
