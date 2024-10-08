# NEXT.js_lolApp

이 프로젝트는 Riot의 API를 활용한 League of Legends 정보 제공 웹 애플리케이션입니다.

![스크린샷 2024-10-08 오전 8 12 31](https://github.com/user-attachments/assets/2fb26c15-94db-4599-812d-a44388504461)
![스크린샷 2024-10-08 오전 8 12 57](https://github.com/user-attachments/assets/d657aa55-6cc1-4e4f-b413-4cbee3bcdeb0)
![스크린샷 2024-10-08 오전 8 13 15](https://github.com/user-attachments/assets/ce71b159-f54e-4653-81aa-4c7ae1912c51)
![스크린샷 2024-10-08 오전 8 13 42](https://github.com/user-attachments/assets/bfb0b097-7e0c-4041-a306-5e593c3153e7)
![스크린샷 2024-10-08 오전 8 14 02](https://github.com/user-attachments/assets/f1f354cb-33bd-4992-a3f3-58967a5c51d2)
![스크린샷 2024-10-08 오전 8 14 27](https://github.com/user-attachments/assets/5f5620fe-9bfc-4657-bfce-1ae0a9d2e930)

</br>

## 📦 폴더 구조

```plaintext
📦
├─ .gitignore
├─ README.md
├─ global.d.ts
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ assets
│  │  ├─ home-img1.png
│  │  ├─ home-img2.png
│  │  ├─ home-img3.jpg
│  │  └─ logo.png
│  └─ favicon.ico
├─ src
│  ├─ app
│  │  ├─ api
│  │  │  └─ rotation
│  │  │     └─ route.ts
│  │  ├─ champions
│  │  │  ├─ [id]
│  │  │  │  └─ page.tsx
│  │  │  └─ page.tsx
│  │  ├─ globals.css
│  │  ├─ home
│  │  │  └─ page.tsx
│  │  ├─ items
│  │  │  ├─ [name]
│  │  │  │  └─ page.tsx
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ rotation
│  │     └─ (api)
│  │        └─ page.tsx
│  ├─ components
│  │  ├─ LoadingSpinner.tsx
│  │  ├─ MainImage.tsx
│  │  ├─ Navbar.tsx
│  │  └─ ThemeSwitch.tsx
│  ├─ types
│  │  ├─ Champion.ts
│  │  ├─ ChampionStore.ts
│  │  ├─ ChampionsRotation.ts
│  │  ├─ Item.ts
│  │  └─ Props.ts
│  ├─ utils
│  │  ├─ championUtils.js
│  │  ├─ serverApi.ts
│  │  └─ store
│  │     └─ useThemeStore.ts
│  ├─ GlobalError.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ tailwind.config.ts
├─ tsconfig.json
└─ yarn.lock
```

</br>

## 🔥배포 링크

[✓ lol-app 바로가기 ✓](https://next-js-lol-app.vercel.app/)

</br>

## ⚙️ 주요 기능

### 1. 프로젝트 셋업 및 기본 구조 구성

- Next.js와 TypeScript를 사용하여 프로젝트를 생성하고, Tailwind CSS를 설치합니다.

</br>

### 2. 데이터 Fetching

- **타입 정의**: `types/` 디렉토리에 필요한 타입들을 정의합니다. 타입 정의 시 any 타입은 배제했습니다.
- **서버 액션**: 페이지 컴포넌트 내에서 직접 외부 API를 호출하여 데이터 페칭을 처리합니다. 예를 들어, `/champions`, `/items`, `/rotation` 등의 데이터를 서버 액션을 통해 관리합니다.
- **라우트 핸들러**: `/api/rotation` 엔드포인트를 클라이언트 사이드에서만 사용하는 라우트 핸들러로 유지합니다.
- **에러 처리**: `fetch`를 사용하여 외부 API를 호출하고, 적절한 에러 처리를 수행합니다.

</br>

### 3. 각 페이지 구현 및 렌더링 방식 적용

- **챔피언 목록 페이지 (`/champions`)**:

  - **렌더링 방식**: **Incremental Static Regeneration (ISR)**
  - **재검증 시간**: 하루(86400초)
  - 모든 챔피언의 목록을 표시하며, 데이터는 자주 변경되지 않으므로 ISR을 사용하여 성능을 최적화합니다.

- **챔피언 상세 페이지 (`/champions/[id]`)**:

  - **렌더링 방식**: **동적 렌더링**
  - 챔피언의 상세 정보를 표시하고, 해당 페이지에서 동적 메타데이터를 생성해 SEO를 향상합니다.

- **챔피언 로테이션 페이지 (`/rotation`)**:

  - **렌더링 방식**: **클라이언트 사이드 렌더링 (CSR)**
  - 현재 무료로 플레이 가능한 챔피언들을 표시하며, 클라이언트에서 데이터를 가져와 렌더링합니다.

- **아이템 목록 페이지 (`/items`)**:

  - **렌더링 방식**: **Static Site Generation (SSG)**
  - 모든 아이템의 목록을 표시하며, 빌드 시점에 페이지를 정적으로 생성합니다.

- **아이템 상세 페이지 (`/items/[name]`)**:
  - **렌더링 방식**: **동적 렌더링**
  - 아이템의 상세 정보를 표시하고, 해당 페이지에서 동적 메타데이터를 생성해 SEO를 향상합니다.

</br>

### 4. 레이아웃 및 네비게이션 구성

- 글로벌 레이아웃을 설정하고, 네비게이션 메뉴를 추가하여 페이지 간 이동이 가능하도록 합니다.

</br>

### 5. 로딩 및 에러 핸들링 고도화

- `LoadingSpinner.tsx`를 사용하여 서버 컴포넌트의 로딩 상태를 관리합니다.
- 스트리밍 서버 사이드 렌더링(SSR)을 적용하여 여러 컴포넌트의 로딩 시간을 효율적으로 처리합니다.
- **에러 핸들링 강화**: 전역 에러 관리 컴포넌트인 `GlobalError.tsx`를 통해 모든 예외적 에러를 처리합니다.

</br>

### 6. 성능 최적화

- **이미지 최적화**: Next.js의 `<Image>` 컴포넌트를 활용하여 이미지 로딩 최적화 및 자동 서식 변경을 적용합니다.
- **코드 스플리팅**: 동적 import를 사용하여 중복되는 코드를 리팩토링하고 필요한 시점에만 코드를 로드하도록 최적화합니다.
- **코드 스플리팅**: React Suspense와 toastify를 사용하여 서버 컴포넌트의 로딩 상태를 관리합니다.

</br>

### 7. 반응형 디자인 및 UI 개선

- Tailwind CSS의 유틸리티 클래스를 활용하여 반응형 디자인을 구현하고, 모바일 환경에서도 사용하기 편리한 반응형 인터페이스를 제공합니다.

</br>

### 8. 다크 모드 기능 구현

- `ThemeSwitch.tsx` 컴포넌트를 생성하고, Zustand의 store로 상태 관리 합니다. 다크 모드 기능을 추가하여 애플리케이션 전체에서 다크 모드를 지원합니다.
- 사용자 인터페이스에 다크 모드 토글 스위치를 제공하여 테마를 전환할 수 있게 합니다.

</br>

## 🛠️ 사용한 기술 스택

![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=JavaScript&logoColor=white)
![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=JavaScript&logoColor=white)
![](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![](https://img.shields.io/badge/Zustand-181818?style=for-the-badge)

</br>

## 💥트러블 슈팅

[✓ 트러블 슈팅 바로가기 ✓](https://velog.io/@gimmari/트러블슈팅-타입-선언-그-외-이슈/)
