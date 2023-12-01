// toaster.js
import { Position, OverlayToaster } from "@blueprintjs/core";

// This code will create a toaster instance that can be used throughout your app.
// It checks if the window object is available to ensure it's running in the browser environment.
export const AppToaster = (typeof window !== 'undefined') ? OverlayToaster.create({
  className: "my-toaster",
  position: Position.TOP,
}) : null;
