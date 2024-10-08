import { LoadingSpinner } from '@/components/LoadingSpinner';
import { MainImage1, MainImage2, MainImage3 } from '@/components/MainImage';
import { Suspense } from 'react';

const HomePage = () => {
  return (
    <div className="h-full p-40">
      <div className="flex flex-col justify-center gap-40">
        <div className="block w-[600px] mt-20">
          <p className="flex justify-left mb-4">
            리그오브레전드 입문자를 위한 가이드
          </p>
          <h1 className="flex justify-left tracking-tighter leading-tight">
            리그오브레전드에 <br />
            오신 것을 환영합니다
          </h1>
        </div>
        <div className="flex flex-col justify-center gap-8">
          <Suspense fallback={<LoadingSpinner />}>
            <MainImage1 />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <MainImage2 />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <MainImage3 />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
