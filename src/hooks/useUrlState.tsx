import { useSearchParams } from "react-router-dom";

export function useURLState() {
  const [searchParams] = useSearchParams(); 
  const pageId = searchParams.get("pageId");
  return { pageId };
}
