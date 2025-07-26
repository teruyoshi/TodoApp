import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import dayjs from 'dayjs'

import { DayjsLocalizationProvider } from '@/providers'
import { FormTestDriver } from '@/__tests__/drivers'

import { TodoPeriodInputs } from '../../components/formParts'

const setup = (onSubmitHandlerMock?: jest.Func, spyOnError?: jest.Func) => {
  const screen = render(
    <DayjsLocalizationProvider>
      <FormTestDriver
        defaultValues={{
          test: '',
          testFrom: dayjs(dayjs().format('YYYY/MM/DD')),
          testTo: dayjs(dayjs().format('YYYY/MM/DD')),
        }}
        onSubmitHandler={onSubmitHandlerMock || jest.fn()}
        spyOnError={spyOnError || jest.fn()}
      >
        <TodoPeriodInputs name="test" />
      </FormTestDriver>
    </DayjsLocalizationProvider>
  )

  const { getByLabelText, getByRole } = screen
  const fromInput = getByLabelText('開始日')
  const toInput = getByLabelText('終了日')
  const submitButton = getByRole('button', { name: '送信' })

  return {
    ...screen,
    fromInput,
    toInput,
    submitButton,
  }
}

describe('TodoPeriodInputs', () => {
  describe('正常系テスト', () => {
    it('期間として開始日と終了日が入力できる', async () => {
      const { fromInput, toInput } = setup()

      await userEvent.type(fromInput, '20250101')
      await userEvent.type(toInput, '20250102')

      expect(fromInput).toHaveValue('2025/01/01')
      expect(toInput).toHaveValue('2025/01/02')
    })
    it('期間を入力し、送信できる', async () => {
      const onSubmitHandlerMock = jest.fn()
      const { fromInput, toInput, submitButton } = setup(onSubmitHandlerMock)

      await userEvent.type(fromInput, '20250101')
      await userEvent.type(toInput, '20250102')
      await userEvent.click(submitButton)

      expect(onSubmitHandlerMock).toHaveBeenCalled()
    })
  })

  describe('終了日を操作し、終了日が開始日より前の日付になった時', () => {
    const fromIsAfterToWhenEnterToSetup = async () => {
      const onSubmitHandlerMock = jest.fn()
      const spyOnError = jest.fn()

      const { fromInput, toInput, submitButton, getByText } = setup(
        onSubmitHandlerMock,
        spyOnError
      )

      await userEvent.type(fromInput, '20250102')
      await userEvent.type(toInput, '20250101')
      await userEvent.click(submitButton)

      return { onSubmitHandlerMock, spyOnError, getByText }
    }

    it('フォームにエラーが発生する', async () => {
      const { spyOnError } = await fromIsAfterToWhenEnterToSetup()
      const errors = spyOnError.mock.calls[0][0]

      expect(errors).not.toStrictEqual({})
      expect(errors.test.message).toBe('終了日は開始日以前の日付にしてください')
    })

    it('エラーメッセージが表示される', async () => {
      const { getByText } = await fromIsAfterToWhenEnterToSetup()
      expect(
        getByText('終了日は開始日以前の日付にしてください')
      ).toBeInTheDocument()
    })

    it('フォームが送信出来ない', async () => {
      const { onSubmitHandlerMock } = await fromIsAfterToWhenEnterToSetup()
      expect(onSubmitHandlerMock).not.toHaveBeenCalled()
    })
  })

  describe('開始日を操作し、終了日が開始日より前の日付になった時', () => {
    const fromIsAfterToWhenEnterToSetup = async () => {
      const onSubmitHandlerMock = jest.fn()
      const spyOnError = jest.fn()

      const { fromInput, toInput, submitButton, getByText } = setup(
        onSubmitHandlerMock,
        spyOnError
      )

      await userEvent.type(toInput, '20250101')
      await userEvent.type(fromInput, '20250102')
      await userEvent.click(submitButton)

      return { onSubmitHandlerMock, spyOnError, getByText }
    }

    it('フォームにエラーが発生する', async () => {
      const { spyOnError } = await fromIsAfterToWhenEnterToSetup()
      const errors = spyOnError.mock.calls[0][0]

      expect(errors).not.toStrictEqual({})
      expect(errors.test.message).toBe('終了日は開始日以前の日付にしてください')
    })

    it('エラーメッセージが表示される', async () => {
      const { getByText } = await fromIsAfterToWhenEnterToSetup()
      expect(
        getByText('終了日は開始日以前の日付にしてください')
      ).toBeInTheDocument()
    })

    it('フォームが送信出来ない', async () => {
      const { onSubmitHandlerMock } = await fromIsAfterToWhenEnterToSetup()
      expect(onSubmitHandlerMock).not.toHaveBeenCalled()
    })
  })
})
