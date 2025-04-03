import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SliderProps {
  children: React.ReactNode; 
}

const VideoSlider: React.FC<SliderProps> = ({ children }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {React.Children.map(children, (child) => (
        <div>{child}</div> // Ensure each child is wrapped in a div
      ))}
    </Slider>
  );
};

export default VideoSlider;
