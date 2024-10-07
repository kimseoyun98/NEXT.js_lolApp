'use client';

import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { fetchChampions } from '@/utils/serverApi';
import { Champion } from '@/types/Champion';
import { getChampionSplashArtUrl01 } from '@/utils/championUtils';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const RotationPage = () => {
  const [championsRotation, setChampionsRotation] = useState<number[]>([]);
  const [championsData, setChampionsData] = useState<{
    [key: string]: Champion;
  }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRotations = async () => {
      try {
        const res = await fetch('/api/rotation');
        if (!res.ok) {
          throw new Error('네트워크 오류 발생');
        }
        const fetchedRotations = await res.json();
        setChampionsRotation(fetchedRotations);
      } catch (error) {
        console.error('오류:', error);
        setError('로테이션 데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };

    loadRotations();
  }, []);

  useEffect(() => {
    const loadChampionsData = async () => {
      try {
        const champions = await fetchChampions();
        setChampionsData(champions.data);
      } catch (error) {
        setError('챔피언 데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };

    loadChampionsData();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  return (
    <div>
      <h2 className="text-center mb-10">금주 플레이 가능한 챔피언</h2>
      <div>
        {error ? (
          <p className="text-center">{error}</p>
        ) : championsData && championsRotation.length > 0 ? (
          <Slider {...sliderSettings}>
            {championsRotation.map((id) => {
              const championKey = Object.keys(championsData).find(
                (key) => championsData[key].key === id.toString()
              );
              const champion = championKey ? championsData[championKey] : null;
              if (!champion) {
                return null;
              }
              const splashArtUrl = getChampionSplashArtUrl01(champion.id);

              return (
                <div key={champion.id}>
                  <img
                    src={splashArtUrl}
                    alt={champion.name}
                    className="w-120 h-auto mx-auto"
                  />
                  <h3 className="text-center mt-4 mb-4">{champion.name}</h3>
                </div>
              );
            })}
          </Slider>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default RotationPage;
