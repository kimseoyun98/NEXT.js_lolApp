import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';

interface ChampionSliderProps {
  images: string[];
}

export const ChampionSlider: React.FC<ChampionSliderProps> = ({ images }) => {
  const settings = {
    infinite: true, //무한 슬라이더로 할지
    speed: 500,
    arrows: true, //화살표 (양옆 버튼) 구현할 것인지
    autoplay: true, //자동 재생 할 것인지
    autoplaySpeed: 5000,
    slidesToShow: 1, // 한번에 몇개 슬라이드 보여줄 것인지
    slidesToScroll: 3,
    vertical: false,
    centerMode: true,
    variableWidth: true,
    centerPadding: '0px',
    // nextArrow: <SvgIcon component={NavigateNextIcon} inheritViewBox />,
    // prevArrow: <SvgIcon component={NavigateBeforeIcon} inheritViewBox />,
  };

  return (
    <Slider {...settings}>
      {images.map((imageUrl, index) => (
        <div key={index}>
          <Image
            src={imageUrl}
            alt={`Champion image ${index}`}
            width={800}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
        // <img src={imageUrl}></img>
      ))}
    </Slider>
  );
};
