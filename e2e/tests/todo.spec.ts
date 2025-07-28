import { test, expect } from '@playwright/test'

test.describe.configure({ mode: 'parallel' })

test('/todo ページ TODO を追加して表示される', async ({ page }) => {
  console.log(`${process.env.API_BASE_URL}/todo へ接続`)
  await page.goto(`${process.env.API_BASE_URL}/todo`)

  const body = await page.locator('body')
  console.log('body:', await body.textContent())

  page.on('request', (request) => {
    console.log('>>', request.method(), request.url())
  })
  page.on('response', (response) => {
    console.log('<<', response.status(), response.url())
  })

  await page.getByLabel('タイトル').fill('TODO のタイトル')
  await page.getByLabel('説明').fill('TODO の説明')
  await page.getByRole('button', { name: '追加' }).click()

  await page.getByText('TODO のタイトル')

  await expect(page.locator('body')).toContainText('TODO のタイトル')
  await expect(page.locator('body')).toContainText('TODO の説明')
})
