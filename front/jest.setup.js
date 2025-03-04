// React Testing Library のカスタムマッチャをインポート
import '@testing-library/jest-dom'

// モックサーバーのインポート（エイリアス '@mocks' が有効になっている前提です）
import { server } from '@mocks'

// dayjs を用いた日付フォーマットのロケール設定
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
dayjs.locale('ja')

// Node 環境下で必要な TextEncoder と TextDecoder をポリフィル
import { TextEncoder, TextDecoder } from 'util'
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder
}

// 全テスト実行前にモックサーバーを起動
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// 各テストケース終了後にハンドラをリセット
afterEach(() => server.resetHandlers())

// 全テスト終了後にモックサーバーを終了
afterAll(() => server.close())
