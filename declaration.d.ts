declare module "*.module.css";

type ModelViewerElementAttributes = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  src?: string;
  class?: string;
  poster?: string;
  "camera-controls"?: boolean;
  "auto-rotate"?: boolean;
  "shadow-intensity"?: string;
  "camera-orbit"?: string;
};

declare namespace React.JSX {
  interface IntrinsicElements {
    "model-viewer": ModelViewerElementAttributes;
  }
}
