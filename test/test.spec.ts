import { test, expect, Page } from '@playwright/test'

const baseURL = 'http://localhost:4173/'

async function prepare (page: Page, files: string[]) {
  await page.goto(baseURL)
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByText('Click, or drag files/folders to this area').click()
  ])
  return fileChooser.setFiles(files)
}

async function clickCheck (page: Page) {
  return page.getByRole('button', { name: 'Check' }).click()
}

test.describe('test', () => {
  test('Clear all', async ({ page }) => {
    await prepare(page, ['dist/magic.wasm', 'dist/magic.js'])

    const filesLocator = page.locator('.n-upload-file')
    await expect(filesLocator).toHaveCount(2)

    await page.getByRole('button', { name: 'Clear all' }).click()

    await expect(filesLocator).toHaveCount(0)
  })

  test('Check', async ({ page }) => {
    await prepare(page, ['dist/magic.wasm', 'dist/magic.js'])

    await clickCheck(page)
    await expect(page).toHaveURL(`${baseURL}result`)

    const trWasm = page.locator('tbody > tr:nth-child(1)')
    await expect(trWasm.locator('td:nth-child(1)')).toHaveText('magic.wasm')
    await expect(trWasm.locator('td:nth-child(2)')).toHaveText('WebAssembly (wasm) binary module version 0x1 (MVP)')
    await expect(trWasm.locator('td:nth-child(3)')).toHaveText('application/wasm; charset=binary')
    await expect(trWasm.locator('td:nth-child(4)')).toHaveText('wasm')
    await expect(trWasm.locator('td:nth-child(5)')).toBeEmpty()

    const trJs = page.locator('tbody > tr:nth-child(2)')
    await expect(trJs.locator('td:nth-child(1)')).toHaveText('magic.js')
    await expect(trJs.locator('td:nth-child(2)')).toHaveText('JavaScript source')
    await expect(trJs.locator('td:nth-child(3)')).toHaveText('text/javascript; charset=us-ascii')
    await expect(trJs.locator('td:nth-child(4)')).toHaveText('js')
    await expect(trJs.locator('td:nth-child(5) > i')).toBeVisible()
  })

  test('Language detection rejects small file', async ({ page }) => {
    await prepare(page, ['test/resource/pyc.gitignore'])

    await clickCheck(page)
    await expect(page).toHaveURL(`${baseURL}result`)

    await expect(page.locator('tbody > tr')).toHaveCount(1)
  })
})
