import { useSearchParams } from "react-router-dom";

export function useUrlState() {
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get("pageId");
  return { pageId };
}
