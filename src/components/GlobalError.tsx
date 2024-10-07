'use client';

import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GlobalError({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    toast.error(`${error.message}`);
  }, [error]);

  return (
    <div>
      <h2>예상치 못한 에러가 발생했습니다.</h2>
      <button onClick={() => router.push('/')}>홈으로 돌아가기</button>
    </div>
  );
}
