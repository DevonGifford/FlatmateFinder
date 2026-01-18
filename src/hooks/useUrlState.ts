import { useSearchParams } from "react-router-dom";

/** Reads the current application page identifier from the URL query string. */
export function useUrlState() {
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get("pageId");
  return { pageId };
}
