"use client";

import * as Sheet from "@radix-ui/react-dialog";
import React from "react";
import styled, { keyframes } from "styled-components";

const overlaySlow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.4;
  }
`;

const Root = Sheet.Root;

const Trigger = Sheet.Trigger;

const Close = Sheet.Close;

const Portal = Sheet.Portal;

const Overlay = React.forwardRef<
  React.ElementRef<typeof Sheet.Overlay>,
  React.ComponentPropsWithoutRef<typeof Sheet.Overlay>
>(({ className, ...props }, ref) => (
  <StyledBottomSheetOverlay className={className} {...props} ref={ref} />
));
Overlay.displayName = Sheet.Overlay.displayName;

type SheetContentProps = React.ComponentPropsWithoutRef<typeof Sheet.Content>;

const Content = React.forwardRef<
  React.ElementRef<typeof Sheet.Content>,
  SheetContentProps
>(({ className, children, ...props }, ref) => (
  <Sheet.Portal>
    <StyledBottomSheetContent ref={ref} className={className} {...props}>
      {children}
    </StyledBottomSheetContent>
  </Sheet.Portal>
));
Content.displayName = Sheet.Content.displayName;

const StyledBottomSheetOverlay = styled(Sheet.Overlay)`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.black};
  opacity: 0.4;
  animation: ${overlaySlow} 200ms;
`;

const StyledBottomSheetContent = styled(Sheet.Content)`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 12px 0px;
  border-radius: 16px 16px 0px 0px;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  max-width: 600px;
`;

export default {
  Root,
  Trigger,
  Close,
  Portal,
  Content,
  Overlay,
};
