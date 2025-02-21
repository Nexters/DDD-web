"use client";

import mixpanel from "mixpanel-browser";
import { useEffect } from "react";

export default function MixpanelSDKInitializer() {
  useEffect(() => {
    mixpanel.init("206953e53aebe08b0d26725c2b4ee1f0", {
      track_pageview: true,
      persistence: "localStorage",
      record_sessions_percent: 100,
    });
  }, []);

  return <></>;
}
