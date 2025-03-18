import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// ✅ Fix: Corrected interface (images should be an array)
interface MentalIllnessCarouselProps {
  images: string[]; // ✅ Now correctly typed as an array of strings
  readMoreLink: string;
}

const MentalIllnessCarousel: React.FC<MentalIllnessCarouselProps> = ({ images, readMoreLink }) => {
  return (
    <div className="mental-illness-carousel">
      <Carousel  showThumbs={false} >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </Carousel>
      <a href={readMoreLink} className="read-more-link">
        Read More
      </a>
    </div>
  );
};

export default MentalIllnessCarousel;
