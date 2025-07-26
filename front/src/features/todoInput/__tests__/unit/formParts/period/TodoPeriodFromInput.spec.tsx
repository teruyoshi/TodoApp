import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import dayjs from 'dayjs'

import { DayjsLocalizationProvider } from '@/providers'
import { FormTestDriver } from '@/__tests__/drivers'

import { TodoPeriodFromInput } from '../../../../components/formParts/period'

const setup = (onSubmitHandlerMock?: jest.Func, spyOnError?: jest.Func) => {
  const screen = render(
    <DayjsLocalizationProvider>
      <FormTestDriver
        defaultValues={{ test: dayjs(dayjs().format('YYYY/MM/DD')) }}
        onSubmitHandler={onSubmitHandlerMock || jest.fn()}
        spyOnError={spyOnError || jest.fn()}
      >
        <TodoPeriodFromInput name="test" />
      </FormTestDriver>
    </DayjsLocalizationProvider>
  )

  const { getByLabelText, getByRole } = screen
  const dateFromInput = getByLabelText('開始日')
  const submitButton = getByRole('button', { name: '送信' })

  return {
    screen,
    dateFromInput,
    submitButton,
  }
}

describe('TodoPeriodFromInput', () => {
  describe('正常系テスト', () => {
    it('Todo の開始日を入力出来る', async () => {
      const { dateFromInput } = setup()

      await userEvent.type(dateFromInput, '20250101')

      expect(dateFromInput).toHaveValue('2025/01/01')
    })

    it('Todo の開始日を入力し、送信出来る', async () => {
      const onSubmitHandlerMock = jest.fn()
      const { dateFromInput, submitButton } = setup(onSubmitHandlerMock)

      await userEvent.type(dateFromInput, '20250101')
      await userEvent.click(submitButton)

      expect(onSubmitHandlerMock).toHaveBeenCalled()
    })
  })

  describe('Todo の開始日が空の時', () => {
    const emptyOperationSetup = async () => {
      const onSubmitHandlerMock = jest.fn()
      const spyOnError = jest.fn()

      const { screen, dateFromInput, submitButton } = setup(
        onSubmitHandlerMock,
        spyOnError
      )

      await userEvent.type(dateFromInput, '2')
      await userEvent.clear(dateFromInput)
      await userEvent.click(submitButton)

      return { onSubmitHandlerMock, spyOnError, ...screen }
    }

    it('フォームにエラーが発生する', async () => {
      const { spyOnError } = await emptyOperationSetup()
      const errors = spyOnError.mock.calls[0][0]

      expect(errors).not.toStrictEqual({})
      expect(errors.test.message).toBe('開始日を入力してください')
    })

    it('エラーメッセージが表示される', async () => {
      const { getByText } = await emptyOperationSetup()
      expect(getByText('開始日を入力してください')).toBeInTheDocument()
    })

    it('フォームが送信出来ない', async () => {
      const { onSubmitHandlerMock } = await emptyOperationSetup()
      expect(onSubmitHandlerMock).not.toHaveBeenCalled()
    })
  })
})
