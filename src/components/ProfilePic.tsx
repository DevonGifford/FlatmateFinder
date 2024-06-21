import React, { useState } from "react";

interface ProfilePicProps {
  src: string | undefined;
  fallbackSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  openLabel?: string;
}

export const ProfilePic: React.FC<ProfilePicProps> = ({
  src,
  fallbackSrc,
  alt,
  width,
  height,
  className,
  openLabel,
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [imgError, setImgError] = useState<boolean>(false);

  const onError = () => {
    if (!imgError) {
      setImgSrc(fallbackSrc);
      setImgError(true);
    }
  };

  const image = (
    <img
      src={imgSrc}
      onError={onError}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        objectFit: "cover",
      }}
      className={className}
    />
  );

  if (!imgSrc || imgError) return image;

  return (
    <a
      href={imgSrc}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={openLabel ?? `Open ${alt} in a new tab`}
    >
      {image}
    </a>
  );
};
