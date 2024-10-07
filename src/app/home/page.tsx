import { MainImage1, MainImage2, MainImage3 } from '@/components/MainImage';

const HomePage = () => {
  return (
    <div className="h-full p-20">
      <div className="flex flex-col justify-center gap-40">
        <div className="block w-[600px] mt-40">
          <p className="flex justify-left mb-4">
            리그오브레전드 입문자를 위한 가이드
          </p>
          <h1 className="flex justify-left tracking-tighter leading-tight">
            리그오브레전드에 <br />
            오신 것을 환영합니다
          </h1>
        </div>
        <div className="flex flex-col justify-center gap-8">
          <MainImage1 />
          <MainImage2 />
          <MainImage3 />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
