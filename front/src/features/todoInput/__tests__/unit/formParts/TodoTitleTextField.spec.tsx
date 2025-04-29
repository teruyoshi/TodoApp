import { FormTestDriver } from "@/__tests__/drivers"
import { TodoTitleTextField } from "../../../components/formParts/"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const setup = (onSubmitHandlerMock?: jest.Func, spyOnError?: jest.Func) => {
  const screen = render(
    <FormTestDriver defaultValues={{ test: '' }} onSubmitHandler={onSubmitHandlerMock || jest.fn()} spyOnError={spyOnError || jest.fn()}>
      <TodoTitleTextField name="test" />
    </FormTestDriver>
  )

  const { getByLabelText, getByRole } = screen
  const titleInput = getByLabelText('タイトル')
  const submitButton = getByRole('button', { name: '送信' })

  return {
    screen,
    titleInput,
    submitButton,
  }
}

describe('TodoTitleTextField', () => {
  describe('正常系テスト', () => {
    it('Todo のタイトルを入力出来る', async () => {
      const { titleInput } = setup()

      await userEvent.type(titleInput, '国語の勉強')

      expect(titleInput).toHaveValue('国語の勉強')
    })

    it('Todo のタイトルを入力し、送信出来る', async () => {
      const onSubmitHandlerMock = jest.fn()
      const { titleInput, submitButton } = setup(onSubmitHandlerMock)

      await userEvent.type(titleInput, '国語の勉強')
      await userEvent.click(submitButton)

      expect(onSubmitHandlerMock).toHaveBeenCalled()
    })
  })

  describe('Todo のタイトルが空の時', () => {
    const emptyOperationSetup = async () => {
      const onSubmitHandlerMock = jest.fn()
      const spyOnError = jest.fn()

      const { screen, titleInput, submitButton } = setup(onSubmitHandlerMock, spyOnError)

      await userEvent.type(titleInput, 'a')
      await userEvent.clear(titleInput)
      await userEvent.click(submitButton)

      return { onSubmitHandlerMock, spyOnError, ...screen }
    }

    it('フォームにエラーが発生する', async () => {
      const { spyOnError } = await emptyOperationSetup()
      const errors = spyOnError.mock.calls[0][0]

      expect(errors).not.toStrictEqual({})
      expect(errors.test.message).toBe('タイトルを入力してください')
    })

    it('エラーメッセージが表示される', async () => {
      const { getByText } = await emptyOperationSetup()
      expect(getByText('タイトルを入力してください')).toBeInTheDocument()
    })

    it('フォームが送信出来ない', async () => {
      const { onSubmitHandlerMock } = await emptyOperationSetup()
      expect(onSubmitHandlerMock).not.toHaveBeenCalled()
    })
  })

  describe('Todo のタイトルに21文字以上入れた時', () => {
    const overTextOperationSetup = async () => {
      const onSubmitHandlerMock = jest.fn()
      const spyOnError = jest.fn()

      const { screen, titleInput, submitButton } = setup(onSubmitHandlerMock, spyOnError)

      await userEvent.type(titleInput, 'abcdefghijklmnopqrstuvwxyz')
      await userEvent.click(submitButton)

      return { onSubmitHandlerMock, spyOnError, ...screen }
    }

    it('フォームにエラーが発生する', async () => {
      const { spyOnError } = await overTextOperationSetup()
      const errors = spyOnError.mock.calls[0][0]

      expect(errors).not.toStrictEqual({})
      expect(errors.test.message).toBe('タイトルは20文字以内で入力してください')
    })

    it('エラーメッセージが表示される', async () => {
      const { getByText } = await overTextOperationSetup()
      expect(getByText('タイトルは20文字以内で入力してください')).toBeInTheDocument()
    })

    it('フォームが送信出来ない', async () => {
      const { onSubmitHandlerMock } = await overTextOperationSetup()
      expect(onSubmitHandlerMock).not.toHaveBeenCalled()
    })
  })
})