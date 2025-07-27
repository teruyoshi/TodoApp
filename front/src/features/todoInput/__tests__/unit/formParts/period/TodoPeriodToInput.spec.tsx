import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import dayjs, { Dayjs } from 'dayjs'

import { DayjsLocalizationProvider } from '@/providers'
import { FormTestDriver } from '@/__tests__/drivers'

import { TodoPeriodToInput } from '../../../../components/formParts/period'

const setup = (onSubmitHandlerMock?: jest.Func, spyOnError?: jest.Func) => {
  render(
    <DayjsLocalizationProvider>
      <FormTestDriver<{ test: Dayjs }>
        defaultValues={{ test: dayjs(dayjs().format('YYYY/MM/DD')) }}
        onSubmitHandler={onSubmitHandlerMock || jest.fn()}
        spyOnError={spyOnError || jest.fn()}
      >
        <TodoPeriodToInput name="test" />
      </FormTestDriver>
    </DayjsLocalizationProvider>
  )

  const dateToInput = screen.getByLabelText('終了日')
  const submitButton = screen.getByRole('button', { name: '送信' })

  return {
    screen,
    dateToInput,
    submitButton,
  }
}

describe('TodoPeriodToInput', () => {
  describe('正常系テスト', () => {
    it('Todo の終了日を入力出来る', async () => {
      const { dateToInput } = setup()

      await userEvent.type(dateToInput, '20250101')

      expect(dateToInput).toHaveValue('2025/01/01')
    })

    it('Todo の終了日を入力し、送信出来る', async () => {
      const onSubmitHandlerMock = jest.fn()
      const { dateToInput, submitButton } = setup(onSubmitHandlerMock)

      await userEvent.type(dateToInput, '20250101')
      await userEvent.click(submitButton)

      expect(onSubmitHandlerMock).toHaveBeenCalled()
    })
  })

  describe('Todo の終了日が空の時', () => {
    const emptyOperationSetup = async () => {
      const onSubmitHandlerMock = jest.fn()
      const spyOnError = jest.fn()

      const { dateToInput, submitButton } = setup(
        onSubmitHandlerMock,
        spyOnError
      )

      await userEvent.type(dateToInput, '2')
      await userEvent.clear(dateToInput)
      await userEvent.click(submitButton)

      return { onSubmitHandlerMock, spyOnError }
    }

    it('フォームにエラーが発生する', async () => {
      const { spyOnError } = await emptyOperationSetup()
      const errors = spyOnError.mock.calls[0][0]

      expect(errors).not.toStrictEqual({})
      expect(errors.test.message).toBe('終了日を入力してください')
    })

    it('エラーメッセージが表示される', async () => {
      await emptyOperationSetup()
      expect(screen.getByText('終了日を入力してください')).toBeInTheDocument()
    })

    it('フォームが送信出来ない', async () => {
      const { onSubmitHandlerMock } = await emptyOperationSetup()
      expect(onSubmitHandlerMock).not.toHaveBeenCalled()
    })
  })
})
