import Link from 'next/link';
import Image from 'next/image';

export const MainImage1 = () => {
  return (
    <div className="relative w-full h-[300px] group overflow-hidden">
      <Link href="/champions" className="relative w-full h-full">
        <Image
          width={1920}
          height={750}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          src="/assets/home-img1.png"
          alt="main-image1"
        />
        <div className="main-Imgbox">
          <p className="text-white text-l font-md">챔피언 목록 보기</p>
        </div>
      </Link>
    </div>
  );
};

export const MainImage2 = () => {
  return (
    <div className="relative w-full h-[300px] group overflow-hidden">
      <Link href="/items" className="relative w-full h-full">
        <Image
          width={1920}
          height={750}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          src="/assets/home-img2.png"
          alt="main-image2"
        />
        <div className="main-Imgbox">
          <p className="text-white text-l font-md">아이템 목록 보기</p>
        </div>
      </Link>
    </div>
  );
};

export const MainImage3 = () => {
  return (
    <div className="relative w-full h-[300px] group overflow-hidden">
      <Link href="/rotation" className="relative w-full h-full">
        <Image
          width={1920}
          height={750}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          src="/assets/home-img3.jpg"
          alt="main-image3"
        />
        <div className="main-Imgbox">
          <p className="text-white text-l font-md">챔피언 로테이션</p>
        </div>
      </Link>
    </div>
  );
};
