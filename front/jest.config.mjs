/** @type {import('@jest/types').Config.InitialOptions} */
export default {
  // テスト対象のファイルが存在するディレクトリ
  roots: ['<rootDir>/src'],

  // モックの自動クリア
  clearMocks: true,

  // テスト環境の設定
  // ※必要に応じ 'jsdom' に変更しても構いませんが、ここでは以前の 'jest-fixed-jsdom' を採用
  testEnvironment: 'jest-fixed-jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },

  // モジュール解決時に利用するファイル拡張子
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // ファイル変換の設定： swc を利用して TypeScript/JSX をトランスパイル
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: true,
            dynamicImport: true,
          },
          transform: {
            react: {
              runtime: 'automatic', // React 17以降の自動JSX変換
            },
          },
        },
        sourceMaps: true,
      },
    ],
  },

  // モジュールパスのエイリアス設定（tsconfig.json の paths と合わせる）
  moduleNameMapper: {
    '^@routes$': '<rootDir>/src/routes',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@features$': '<rootDir>/src/features',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@components$': '<rootDir>/src/components',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@hooks$': '<rootDir>/src/hooks',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@store$': '<rootDir>/src/store',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@styles$': '<rootDir>/src/styles',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@types$': '<rootDir>/src/types',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@utils$': '<rootDir>/src/utils',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@mocks$': '<rootDir>/src/mocks',
    '^@mocks/(.*)$': '<rootDir>/src/mocks/$1',

    // CSS モジュールや画像ファイルのモック設定
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // テスト実行前にセットアップするファイル（react-testing-library や MSW の初期化用）
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // カバレッジ計測の設定
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.d.ts', // 型定義ファイルは除外
    '!src/**/__tests__/**', // テストファイルは除外
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],

  // node_modules 以下のファイルは変換から除外
  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  // テストファイルの検出パターン
  testMatch: [
    '<rootDir>/src/**/*.{spec,test}.{ts,tsx,js,jsx}',
    '<rootDir>/tests/**/*.{spec,test}.{ts,tsx,js,jsx}',
  ],

  // ES Modules として扱うファイルの拡張子
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  // モジュール探索時のディレクトリ
  moduleDirectories: ['node_modules', 'src'],
}
