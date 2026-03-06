"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

let isPosthogInitialized = false;

if (typeof window !== "undefined" && posthogKey && !isPosthogInitialized) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    capture_pageview: false
  });
  isPosthogInitialized = true;
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    if (!posthogKey) {
      return;
    }

    const url = `${window.location.origin}${pathname}${search ? `?${search}` : ""}`;
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, search]);

  return null;
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  if (!posthogKey) {
    return <>{children}</>;
  }

  return (
    <PostHogProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PostHogProvider>
  );
}
