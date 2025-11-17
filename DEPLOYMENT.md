# 배포 가이드 / Deployment Guide

홋카이도 유빙 정보 웹앱을 배포하는 여러 방법을 안내합니다.

## 🚀 추천 배포 방법

### 1. Vercel (가장 쉬운 방법, 무료)

**장점:**
- GitHub 연동으로 자동 배포
- 무료 플랜으로 충분
- 빠른 CDN
- 자동 HTTPS
- 커밋할 때마다 자동 배포

**배포 방법:**

1. [Vercel](https://vercel.com) 가입
2. "New Project" 클릭
3. GitHub 저장소 연결
4. 프로젝트 선택: `propractitioner/testv`
5. 브랜치 선택: `claude/add-drift-ice-info-01Ct6pzPaFuUKKQdtT2SLqhh`
6. Framework Preset: Vite (자동 감지됨)
7. "Deploy" 클릭

**자동 설정:**
```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

배포 후 URL: `https://your-project-name.vercel.app`

---

### 2. Netlify (무료, 쉬운 배포)

**장점:**
- 드래그 앤 드롭으로 즉시 배포 가능
- GitHub 연동 자동 배포
- 무료 플랜
- 자동 HTTPS

**방법 A: 드래그 앤 드롭 배포**

1. 로컬에서 빌드:
```bash
npm run build
```

2. [Netlify](https://www.netlify.com) 가입
3. "Sites" → "Add new site" → "Deploy manually"
4. `dist` 폴더를 드래그 앤 드롭

**방법 B: GitHub 연동**

1. Netlify에서 "Add new site" → "Import from Git"
2. GitHub 저장소 선택
3. 설정:
```
Build command: npm run build
Publish directory: dist
```

배포 후 URL: `https://your-site-name.netlify.app`

---

### 3. GitHub Pages (무료)

**장점:**
- GitHub와 완벽 통합
- 무료
- 설정 간단

**배포 방법:**

1. `vite.config.ts` 파일 수정 필요:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/testv/', // 저장소 이름으로 변경
})
```

2. 배포 스크립트 추가 (`package.json`):

```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. gh-pages 패키지 설치:
```bash
npm install --save-dev gh-pages
```

4. 배포:
```bash
npm run deploy
```

5. GitHub 저장소 Settings → Pages에서 `gh-pages` 브랜치 선택

배포 후 URL: `https://propractitioner.github.io/testv/`

---

### 4. Cloudflare Pages (무료, 빠름)

**장점:**
- 전 세계 CDN으로 매우 빠름
- 무료 무제한 대역폭
- GitHub 연동

**배포 방법:**

1. [Cloudflare Pages](https://pages.cloudflare.com) 가입
2. "Create a project" 클릭
3. GitHub 저장소 연결
4. 빌드 설정:
```
Framework preset: Vite
Build command: npm run build
Build output directory: dist
```

배포 후 URL: `https://your-project.pages.dev`

---

### 5. AWS S3 + CloudFront (프로덕션)

**장점:**
- 완전한 제어
- 확장성
- 커스텀 도메인 쉽게 설정

**배포 방법:**

1. 빌드:
```bash
npm run build
```

2. AWS S3 버킷 생성 (정적 웹사이트 호스팅 활성화)

3. AWS CLI로 배포:
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

4. CloudFront 배포 생성 (선택사항, CDN용)

---

## 📝 배포 전 체크리스트

- [ ] `npm run build` 정상 작동 확인
- [ ] 환경변수 설정 (필요시)
- [ ] 커스텀 도메인 준비 (선택사항)
- [ ] Analytics 설정 (선택사항)

---

## 🔧 커스텀 도메인 연결

모든 배포 플랫폼에서 커스텀 도메인 연결을 지원합니다:

**Vercel:**
1. Project Settings → Domains
2. 도메인 입력 및 DNS 설정

**Netlify:**
1. Site Settings → Domain management
2. Add custom domain

**Cloudflare Pages:**
1. Custom domains → Set up a custom domain
2. 자동 SSL 인증서 발급

---

## 💡 추천

**초보자:** Vercel 또는 Netlify (자동 배포, 관리 쉬움)

**개발자:** Cloudflare Pages (빠른 속도, 무제한 대역폭)

**기업용:** AWS S3 + CloudFront (완전한 제어)

---

## 🆘 문제 해결

### 404 에러 발생 시

SPA(Single Page Application)이므로 모든 경로를 index.html로 리디렉션 필요:

**Vercel:** `vercel.json` 추가
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Netlify:** `public/_redirects` 추가
```
/*    /index.html   200
```

**GitHub Pages:** 자동 처리됨 (base path 설정 필요)

---

## 📊 배포 후 모니터링

- **Vercel Analytics:** 무료 분석 도구
- **Google Analytics:** 추적 코드 추가
- **Cloudflare Analytics:** 자동 제공

---

궁금한 점이 있으시면 각 플랫폼의 문서를 참고하세요:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)
