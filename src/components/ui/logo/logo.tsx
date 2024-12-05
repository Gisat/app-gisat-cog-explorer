import Link from "next/link";
import NextImage from "next/image";
import { Image } from "@mantine/core";

export type LogoProps = {
  className?: string;
  href: string;
  ariaLabel?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  expanded?: boolean;
  expandedText?: string;
};

// Path in public dir
const defaultLogoPath = "/gisat.svg";

export const Logo = ({
  className,
  width = 100,
  height = 30,
  href,
  ariaLabel,
  src = defaultLogoPath,
  alt = "Logo",
  expanded,
  expandedText,
  ...props
}: LogoProps) => {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={className}
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Image
        component={NextImage}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        style={{ width: width, minWidth: width }}
      />
      {expanded ? (
        <>
          <span
            style={{
              margin: "0 15px",
              fontWeight: "bold",
              color: "var(--accent-old)",
            }}
          >
            {" "}
            |{" "}
          </span>
          <h1
            style={{
              fontSize: "15px",
              color: "var(--accent-old)",
              margin: "0",
            }}
          >
            {expandedText}
          </h1>
        </>
      ) : null}
    </Link>
  );
};
