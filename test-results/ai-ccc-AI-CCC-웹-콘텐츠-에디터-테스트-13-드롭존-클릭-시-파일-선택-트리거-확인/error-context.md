# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ai-ccc.spec.js >> AI_CCC 웹 콘텐츠 에디터 테스트 >> 13. 드롭존 클릭 시 파일 선택 트리거 확인
- Location: tests\ai-ccc.spec.js:68:3

# Error details

```
Error: expect(locator).toBeAttached() failed

Locator: locator('input[type="file"]')
Expected: attached
Error: strict mode violation: locator('input[type="file"]') resolved to 4 elements:
    1) <input type="file" id="zipInput" accept=".zip"/> aka locator('#zipInput')
    2) <input type="file" id="fpFileInput" accept="image/*"/> aka locator('#fpFileInput')
    3) <input type="file" id="spFileInput" accept="image/*"/> aka locator('#spFileInput')
    4) <input type="file" accept="image/*" id="tabMgrFileInput"/> aka locator('#tabMgrFileInput')

Call log:
  - Expect "toBeAttached" with timeout 5000ms
  - waiting for locator('input[type="file"]')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]: 콘텐츠 에디터
    - generic [ref=e10]:
      - generic [ref=e11]: 이미지
      - generic [ref=e13]: 링크
      - generic [ref=e15]: 텍스트·탭
      - generic [ref=e17]: 슬라이드
      - generic [ref=e19]: 외부이미지
    - generic [ref=e21]:
      - button "MO" [ref=e22] [cursor=pointer]
      - button "PC" [ref=e23] [cursor=pointer]
    - button "콘텐츠 정보" [ref=e24] [cursor=pointer]
    - button "초기화" [disabled] [ref=e25]
    - button "ZIP 저장" [disabled] [ref=e26]
  - generic [ref=e28]:
    - generic [ref=e29]:
      - generic [ref=e30]: 📦
      - text: ZIP 파일 업로드
    - generic [ref=e31]:
      - generic [ref=e32] [cursor=pointer]:
        - generic [ref=e33]: 📁
        - generic [ref=e34]: ZIP 파일을 여기에 드래그하거나 클릭하세요
        - generic [ref=e35]: .zip 형식만 지원됩니다
      - generic [ref=e36]:
        - generic [ref=e37]: 📂 ZIP 파일 구조 안내
        - text: html_콘텐츠코드/
        - text: ├── index.html
        - text: ├── css/ ← 스타일
        - text: ├── js/ ← 스크립트
        - text: └── images/ ← 이미지
      - generic [ref=e38]:
        - generic [ref=e39]:
          - generic [ref=e40]: "1"
          - text: ZIP 업로드
        - generic [ref=e41]: →
        - generic [ref=e42]:
          - generic [ref=e43]: "2"
          - text: 클릭으로 수정
        - generic [ref=e44]: →
        - generic [ref=e45]:
          - generic [ref=e46]: "3"
          - text: ZIP 저장
  - generic [ref=e47]:
    - generic [ref=e48]:
      - generic [ref=e49]: 슬라이드 관리
      - generic [ref=e50] [cursor=pointer]: ✕
    - button "+ 슬라이드 추가" [ref=e53] [cursor=pointer]
  - generic [ref=e54]:
    - generic [ref=e55]:
      - generic [ref=e56]: 콘텐츠 정보
      - generic [ref=e57] [cursor=pointer]: ✕
    - generic [ref=e58]:
      - generic [ref=e59]:
        - generic [ref=e60]: 콘텐츠명 (contentName)
        - textbox "콘텐츠명 (contentName)" [ref=e61]:
          - /placeholder: 콘텐츠명을 입력하세요
      - generic [ref=e62]:
        - generic [ref=e63]: 태깅코드 (contentCode)
        - textbox "태깅코드 (contentCode)" [ref=e64]:
          - /placeholder: 태깅코드를 입력하세요
```

# Test source

```ts
  1  | ﻿const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('AI_CCC 웹 콘텐츠 에디터 테스트', () => {
  4  | 
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await page.goto('/AI_CCC.html');
  7  |   });
  8  | 
  9  |   test('1. 페이지 로드 - 타이틀 확인', async ({ page }) => {
  10 |     await expect(page).toHaveTitle(/웹 콘텐츠 에디터/);
  11 |   });
  12 | 
  13 |   test('2. 업로드 화면이 표시되는지 확인', async ({ page }) => {
  14 |     const uploadScreen = page.locator('#uploadScreen');
  15 |     await expect(uploadScreen).toBeVisible();
  16 |   });
  17 | 
  18 |   test('3. 드롭존 영역이 존재하는지 확인', async ({ page }) => {
  19 |     const dropzone = page.locator('.dropzone');
  20 |     await expect(dropzone).toBeVisible();
  21 |   });
  22 | 
  23 |   test('4. 상단 바(Topbar) 렌더링 확인', async ({ page }) => {
  24 |     const topbar = page.locator('.topbar');
  25 |     await expect(topbar).toBeVisible();
  26 |   });
  27 | 
  28 |   test('5. 브랜드 로고 텍스트 확인', async ({ page }) => {
  29 |     const brand = page.locator('.brand');
  30 |     await expect(brand).toBeVisible();
  31 |   });
  32 | 
  33 |   test('6. 디바이스 토글(MO/PC) 버튼 존재 확인', async ({ page }) => {
  34 |     const devToggle = page.locator('.dev-tgl');
  35 |     await expect(devToggle).toBeVisible();
  36 |   });
  37 | 
  38 |   test('7. ZIP 저장 버튼 존재 확인', async ({ page }) => {
  39 |     const exportBtn = page.locator('.topbar-btn.export');
  40 |     await expect(exportBtn).toBeVisible();
  41 |   });
  42 | 
  43 |   test('8. 초기화 버튼 존재 확인', async ({ page }) => {
  44 |     const resetBtn = page.locator('.topbar-btn.reset');
  45 |     await expect(resetBtn).toBeVisible();
  46 |   });
  47 | 
  48 |   test('9. 콘텐츠 정보 버튼 존재 확인', async ({ page }) => {
  49 |     const infoBtn = page.locator('.topbar-btn.info');
  50 |     await expect(infoBtn).toBeVisible();
  51 |   });
  52 | 
  53 |   test('10. 로딩 화면이 숨겨져 있는지 확인', async ({ page }) => {
  54 |     const loadingScreen = page.locator('#loadingScreen');
  55 |     await expect(loadingScreen).toHaveClass(/hidden/);
  56 |   });
  57 | 
  58 |   test('11. 에디터 화면이 초기에는 숨겨져 있는지 확인', async ({ page }) => {
  59 |     const editorScreen = page.locator('#editorScreen');
  60 |     await expect(editorScreen).toHaveClass(/hidden/);
  61 |   });
  62 | 
  63 |   test('12. 범례(Legend) 항목 표시 확인', async ({ page }) => {
  64 |     const legend = page.locator('.legend');
  65 |     await expect(legend).toBeVisible();
  66 |   });
  67 | 
  68 |   test('13. 드롭존 클릭 시 파일 선택 트리거 확인', async ({ page }) => {
  69 |     const fileInput = page.locator('input[type="file"]');
> 70 |     await expect(fileInput).toBeAttached();
     |                             ^ Error: expect(locator).toBeAttached() failed
  71 |   });
  72 | 
  73 |   test('14. ZIP 구조 안내 트리 표시 확인', async ({ page }) => {
  74 |     const tree = page.locator('.ucard-tree');
  75 |     await expect(tree).toBeVisible();
  76 |   });
  77 | 
  78 |   test('15. 사용 단계(Step) 안내 표시 확인', async ({ page }) => {
  79 |     const steps = page.locator('.ustep');
  80 |     await expect(steps).toBeVisible();
  81 |   });
  82 | 
  83 | });
  84 | 
```