# 📮 여행 우표 앨범 / Travel Photo Stamp Album

여행 사진을 우표 모양으로 크롭하여 수집하는 창의적인 사진 큐레이션 웹앱입니다.

A creative web app that transforms your travel photos into collectible stamps, curated in a beautiful stamp album layout.

## ✨ 주요 기능 / Features

- **📷 사진 업로드** / **Photo Upload**
  - 클릭 또는 드래그 앤 드롭으로 간편하게 사진 업로드
  - 여러 장의 사진 동시 업로드 지원
  - Click or drag & drop to upload photos easily
  - Support for multiple photo uploads at once

- **🎨 우표 효과** / **Stamp Effect**
  - Canvas API를 활용한 실시간 우표 효과 생성
  - 톱니 모양 테두리와 프레임으로 진짜 우표처럼 표현
  - Real-time stamp effect generation using Canvas API
  - Perforated edges and frames for authentic stamp appearance

- **🗂️ 앨범 큐레이션** / **Album Curation**
  - 우표 수집 앨범 스타일의 그리드 레이아웃
  - 빈티지하고 클래식한 디자인
  - Stamp collection album-style grid layout
  - Vintage and classic design aesthetic

- **📝 메타데이터 관리** / **Metadata Management**
  - 각 우표에 장소와 날짜 정보 추가
  - 편리한 인라인 편집 기능
  - Add location and date information to each stamp
  - Convenient inline editing functionality

- **💾 로컬 저장** / **Local Storage**
  - localStorage를 활용한 자동 저장
  - 브라우저를 닫아도 데이터 유지
  - Automatic saving using localStorage
  - Data persists even after closing the browser

- **🔍 확대 보기** / **Enlarged View**
  - 우표 클릭 시 모달로 확대 보기
  - 상세 정보와 함께 표시
  - Click stamps to view in enlarged modal
  - Display with detailed information

## 🚀 시작하기 / Getting Started

### 설치 / Installation

```bash
npm install
```

### 개발 서버 실행 / Run Development Server

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`을 열어 확인하세요.

Open `http://localhost:5173` in your browser.

### 빌드 / Build

```bash
npm run build
```

### 미리보기 / Preview

```bash
npm run preview
```

### GitHub Pages 배포 / Deploy to GitHub Pages

```bash
npm run deploy
```

## 🎯 사용 방법 / How to Use

1. **사진 업로드** - 업로드 영역을 클릭하거나 사진을 드래그하여 업로드
2. **메타데이터 추가** - 각 우표의 장소와 날짜 정보를 입력
3. **우표 확인** - 우표를 클릭하면 확대해서 볼 수 있습니다
4. **관리** - 개별 삭제 또는 전체 삭제 버튼으로 우표 관리

1. **Upload Photos** - Click the upload area or drag photos to upload
2. **Add Metadata** - Enter location and date information for each stamp
3. **View Stamps** - Click stamps to view them enlarged
4. **Manage** - Use individual or clear all buttons to manage stamps

## 🛠️ 기술 스택 / Tech Stack

- **React 19** - UI 라이브러리 / UI library
- **TypeScript** - 타입 안정성 / Type safety
- **Vite** - 빌드 도구 / Build tool
- **Canvas API** - 이미지 프로세싱 / Image processing
- **CSS3** - 스타일링 및 애니메이션 / Styling and animations
- **LocalStorage** - 데이터 저장 / Data persistence

## 🎨 주요 기술 구현 / Key Technical Implementations

- **Canvas API를 활용한 우표 효과 생성**
  - 이미지 크롭 및 리사이징
  - 톱니 모양 테두리 자동 생성
  - 프레임 및 배경 추가

- **Stamp Effect Generation using Canvas API**
  - Image cropping and resizing
  - Automatic perforated edge generation
  - Frame and background addition

- **반응형 디자인**
  - 모바일, 태블릿, 데스크톱 최적화
  - 그리드 레이아웃 자동 조정

- **Responsive Design**
  - Optimized for mobile, tablet, and desktop
  - Automatic grid layout adjustment

## 📱 브라우저 지원 / Browser Support

- Chrome (권장 / Recommended)
- Firefox
- Safari
- Edge

## 📝 향후 개발 계획 / Future Development

- [ ] 다양한 우표 스타일 테마 추가
- [ ] 우표 컬렉션 내보내기 (PDF, PNG)
- [ ] 소셜 미디어 공유 기능
- [ ] 우표 정렬 및 필터링
- [ ] 클라우드 동기화
- [ ] AI 기반 자동 장소 인식

- [ ] Add various stamp style themes
- [ ] Export stamp collection (PDF, PNG)
- [ ] Social media sharing
- [ ] Stamp sorting and filtering
- [ ] Cloud synchronization
- [ ] AI-based automatic location recognition

## 📄 라이선스 / License

MIT

---

© 2025 Travel Photo Stamp Album | 여행 우표 앨범
