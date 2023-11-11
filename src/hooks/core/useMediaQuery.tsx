import muiUseMediaQuery from "@mui/material/useMediaQuery";

export enum MEDIA_QUERY_BREAKPOINTS {
  XS = "(max-width: 600px)",
  SM = "(min-width: 600px)",
  MD = "(min-width: 900px)",
  LG = "(min-width: 1200px)",
  XL = "(min-width: 1536px)",
}

function useMediaQuery(breakpoint: MEDIA_QUERY_BREAKPOINTS) {
  const matches = muiUseMediaQuery(breakpoint);
  return [matches];
}

export default useMediaQuery;
