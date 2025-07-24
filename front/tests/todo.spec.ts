import { test, expect } from '@playwright/test'

test.describe.configure({ mode: 'parallel' })

test('/todo ページ TODO を追加して表示される', async ({ page }) => {
  await page.goto('http://localhost:5173/todo')

  page.on('request', (request) => {
    console.log('>>', request.method(), request.url())
  })
  page.on('response', (response) => {
    console.log('<<', response.status(), response.url())
  })

  await page.getByLabel('タイトル').fill('TODO のタイトル')
  await page.getByLabel('説明').fill('TODO の説明')
  await page.getByRole('button', { name: '追加' }).click()

  await expect(page.getByRole('listitem')).toHaveText('TODO のタイトル')
  await expect(page.getByRole('listitem')).toHaveText('TODO の説明')
})

// test('/todo ページでタイトルが表示されている', async ({ page }) => {
//   await page.goto('http://localhost:5173/todo')

//   await expect(page).toHaveTitle('TODO管理アプリ')
// })

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/')

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click()

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole('heading', { name: 'Installation' })
//   ).toBeVisible()
// })
