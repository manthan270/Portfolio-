import { useState } from 'react';
import './HeroImage.css';

export default function HeroImage({ src, illustratedSrc, alt }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  return (
    <button
      type="button"
      className="profile-flip"
      data-interacted={hasInteracted}
      aria-label={`Show ${isFlipped ? 'profile photo' : 'illustrated avatar'}`}
      aria-pressed={isFlipped}
      onClick={() => {
        setHasInteracted(true);
        setIsFlipped((value) => !value);
      }}
      onMouseLeave={() => setHasInteracted(false)}
    >
      <span className="profile-flip__card">
        <span className="profile-flip__face">
          <img
            src={src}
            alt={alt}
            width="800"
            height="800"
            loading="eager"
            decoding="async"
          />
        </span>
        <span className="profile-flip__face profile-flip__back" aria-hidden="true">
          <img
            src={illustratedSrc}
            alt=""
            width="512"
            height="512"
            loading="lazy"
            decoding="async"
          />
        </span>
      </span>
    </button>
  );
}
