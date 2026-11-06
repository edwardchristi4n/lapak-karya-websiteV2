import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function StrokeIcon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </StrokeIcon>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M19 12H5M11 19l-7-7 7-7" />
    </StrokeIcon>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </StrokeIcon>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </StrokeIcon>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </StrokeIcon>
  );
}

export function MapsLogoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </StrokeIcon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </StrokeIcon>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </StrokeIcon>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
    </StrokeIcon>
  );
}

export function LinesIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M4 7h16M4 12h10M4 17h6" />
    </StrokeIcon>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3Z" />
    </StrokeIcon>
  );
}

export function PencilIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </StrokeIcon>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </StrokeIcon>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </StrokeIcon>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 21s-7-4.4-9.3-9A5.2 5.2 0 0 1 12 6.6 5.2 5.2 0 0 1 21.3 12C19 16.6 12 21 12 21Z" />
    </StrokeIcon>
  );
}

export function BoxLidIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M4 8l8-4 8 4-8 4-8-4Z" />
      <path d="M4 8v8l8 4 8-4V8" />
      <path d="M12 12v8" />
    </StrokeIcon>
  );
}

export function BoxFlapIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M5 10h14v10H5z" />
      <path d="M5 10l2-6h10l2 6" />
      <path d="M12 4v6" />
    </StrokeIcon>
  );
}

export function BoxDrawerIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M4 5h16v14H4z" />
      <path d="M4 10h16" />
      <path d="M9 15h6" />
    </StrokeIcon>
  );
}

export function RotateIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M21 12a9 9 0 1 1-2.6-6.4" />
      <path d="M21 3v6h-6" />
    </StrokeIcon>
  );
}

export function ResetIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M3 12a9 9 0 1 0 2.6-6.4" />
      <path d="M3 3v6h6" />
    </StrokeIcon>
  );
}

export function BoxMailerIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M4 7h16v12H4z" />
      <path d="M4 7l8 6 8-6" />
    </StrokeIcon>
  );
}

export function BoxBookIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M4 5c2.5-1 5.5-1 8 1 2.5-2 5.5-2 8-1v14c-2.5-1-5.5-1-8 1-2.5-2-5.5-2-8-1V5Z" />
      <path d="M12 6v14" />
    </StrokeIcon>
  );
}

export function BoxGableIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M4 12h16v8H4z" />
      <path d="M4 12l8-6 8 6" />
      <path d="M9 6h6" />
    </StrokeIcon>
  );
}

export function UploadIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 15V3M7 8l5-5 5 5" />
      <path d="M4 15v6h16v-6" />
    </StrokeIcon>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 3v12M7 10l5 5 5-5" />
      <path d="M4 15v6h16v-6" />
    </StrokeIcon>
  );
}

export function LinkIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 1 0-5.7-5.7l-1.5 1.5" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 1 0 5.7 5.7l1.5-1.5" />
    </StrokeIcon>
  );
}

export function FrontViewIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <rect x="6" y="4" width="12" height="16" rx="1.5" />
      <path d="M9 8h6" />
    </StrokeIcon>
  );
}

export function TopViewIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <rect x="4" y="8" width="16" height="8" rx="1.5" />
      <path d="M12 8v8" />
    </StrokeIcon>
  );
}

export function IsoViewIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="M12 12l8-4.5M12 12L4 7.5M12 12v9" />
    </StrokeIcon>
  );
}

export function DielineIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M9.5 9.5h5v5h-5z" />
      <path d="M9.5 3.5h5v6h-5zM9.5 14.5h5v6h-5zM3.5 9.5h6v5h-6zM14.5 9.5h6v5h-6z" />
    </StrokeIcon>
  );
}
