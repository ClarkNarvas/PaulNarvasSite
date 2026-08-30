// Next.js uses its bundled React build for App Router view transitions. The
// installed public React types do not expose this stable export yet.
// @ts-expect-error -- ViewTransition is provided by Next.js at runtime.
import { ViewTransition } from "react";

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return <ViewTransition default="page-blur">{children}</ViewTransition>;
}
