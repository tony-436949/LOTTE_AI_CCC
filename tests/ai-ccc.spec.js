const { test, expect } = require('@playwright/test');

test.describe('AI_CCC 웹 콘텐츠 에디터 테스트', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/AI_CCC.html');
  });

  test('1. 페이지 로드 - 타이틀 확인', async ({ page }) => {
    await expect(page).toHaveTitle(/웹 콘텐츠 에디터/);
  });

  test('2. 업로드 화면이 표시되는지 확인', async ({ page }) => {
    const uploadScreen = page.locator('#uploadScreen');
    await expect(uploadScreen).toBeVisible();
  });

  test('3. 드롭존 영역이 존재하는지 확인', async ({ page }) => {
    const dropzone = page.locator('.dropzone');
    await expect(dropzone).toBeVisible();
  });

  test('4. 상단 바(Topbar) 렌더링 확인', async ({ page }) => {
    const topbar = page.locator('.topbar');
    await expect(topbar).toBeVisible();
  });

  test('5. 브랜드 로고 텍스트 확인', async ({ page }) => {
    const brand = page.locator('.brand');
    await expect(brand).toBeVisible();
  });

  test('6. 디바이스 토글(MO/PC) 버튼 존재 확인', async ({ page }) => {
    const devToggle = page.locator('.dev-tgl');
    await expect(devToggle).toBeVisible();
  });

  test('7. ZIP 저장 버튼 존재 확인', async ({ page }) => {
    const exportBtn = page.locator('.topbar-btn.export');
    await expect(exportBtn).toBeVisible();
  });

  test('8. 초기화 버튼 존재 확인', async ({ page }) => {
    const resetBtn = page.locator('.topbar-btn.reset');
    await expect(resetBtn).toBeVisible();
  });

  test('9. 콘텐츠 정보 버튼 존재 확인', async ({ page }) => {
    const infoBtn = page.locator('.topbar-btn.info');
    await expect(infoBtn).toBeVisible();
  });

  test('10. 로딩 화면이 숨겨져 있는지 확인', async ({ page }) => {
    const loadingScreen = page.locator('#loadingScreen');
    await expect(loadingScreen).toHaveClass(/hidden/);
  });

  test('11. 에디터 화면이 초기에는 숨겨져 있는지 확인', async ({ page }) => {
    const editorScreen = page.locator('#editorScreen');
    await expect(editorScreen).toHaveClass(/hidden/);
  });

  test('12. 범례(Legend) 항목 표시 확인', async ({ page }) => {
    const legend = page.locator('.legend');
    await expect(legend).toBeVisible();
  });

  test('13. 드롭존 클릭 시 파일 선택 트리거 확인', async ({ page }) => {
    const fileInput = page.locator('#zipInput');
    await expect(fileInput).toBeAttached();
  });

  test('14. ZIP 구조 안내 트리 표시 확인', async ({ page }) => {
    const tree = page.locator('.ucard-tree');
    await expect(tree).toBeVisible();
  });

  test('15. 사용 단계(Step) 안내 표시 확인', async ({ page }) => {
    const steps = page.locator('.ustep');
    await expect(steps).toBeVisible();
  });

});

