import React, { useState } from "react";

interface ImageWithFallbackProps {
  src: string | undefined;
  fallbackSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  width,
  height,
  className,
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [imgError, setImgError] = useState<boolean>(false);

  const onError = () => {
    if (!imgError) {
      setImgSrc(fallbackSrc);
      setImgError(true);
    }
  };

  return (
    <a href={imgSrc} target="_blank" rel="noopener noreferrer">
      <img
        src={imgSrc}
        onError={onError}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
    </a>
  );
};

export default ImageWithFallback;
