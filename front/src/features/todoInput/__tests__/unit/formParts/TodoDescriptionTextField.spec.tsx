import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FormTestDriver } from '@/__tests__/drivers'

import { TodoDescriptionTextField } from '../../../components/formParts'

const setup = (onSubmitHandlerMock?: jest.Func, spyOnError?: jest.Func) => {
  render(
    <FormTestDriver<{ test: string }>
      defaultValues={{ test: '' }}
      onSubmitHandler={onSubmitHandlerMock || jest.fn()}
      spyOnError={spyOnError || jest.fn()}
    >
      <TodoDescriptionTextField name="test" />
    </FormTestDriver>
  )

  const descriptionInput = screen.getByLabelText('説明')
  const submitButton = screen.getByRole('button', { name: '送信' })

  return {
    descriptionInput,
    submitButton,
  }
}

describe('TodoDescriptionTextField', () => {
  describe('正常系テスト', () => {
    it('Todo の説明を入力出来る', async () => {
      const { descriptionInput } = setup()

      await userEvent.type(descriptionInput, '以下の宿題をする。\n音読\n漢字')

      expect(descriptionInput).toHaveValue('以下の宿題をする。\n音読\n漢字')
    })

    it('Todo の説明を入力し、送信出来る', async () => {
      const onSubmitHandlerMock = jest.fn()
      const { descriptionInput, submitButton } = setup(onSubmitHandlerMock)

      await userEvent.type(descriptionInput, '以下の宿題をする。\n音読\n漢字')
      await userEvent.click(submitButton)

      expect(onSubmitHandlerMock).toHaveBeenCalled()
    })
  })

  describe('Todo の説明が空の時', () => {
    const emptyOperationSetup = async () => {
      const onSubmitHandlerMock = jest.fn()
      const spyOnError = jest.fn()

      const { descriptionInput, submitButton } = setup(
        onSubmitHandlerMock,
        spyOnError
      )

      await userEvent.type(descriptionInput, 'a')
      await userEvent.clear(descriptionInput)
      await userEvent.click(submitButton)

      return { onSubmitHandlerMock, spyOnError }
    }

    it('フォームにエラーが発生する', async () => {
      const { spyOnError } = await emptyOperationSetup()
      const errors = spyOnError.mock.calls[0][0]

      expect(errors).not.toStrictEqual({})
      expect(errors.test.message).toBe('説明を入力してください')
    })

    it('エラーメッセージが表示される', async () => {
      await emptyOperationSetup()
      expect(screen.getByText('説明を入力してください')).toBeInTheDocument()
    })

    it('フォームが送信出来ない', async () => {
      const { onSubmitHandlerMock } = await emptyOperationSetup()
      expect(onSubmitHandlerMock).not.toHaveBeenCalled()
    })
  })

  describe('Todo の説明に201文字以上入れた時', () => {
    const overTextOperationSetup = async () => {
      const onSubmitHandlerMock = jest.fn()
      const spyOnError = jest.fn()

      const { descriptionInput, submitButton } = setup(
        onSubmitHandlerMock,
        spyOnError
      )

      let textLength201 = ''
      for (let i = 0; i < 201; i++) {
        textLength201 += 'a'
      }

      expect(textLength201).toHaveLength(201)

      await userEvent.type(descriptionInput, textLength201)
      await userEvent.click(submitButton)

      return { onSubmitHandlerMock, spyOnError }
    }

    it('フォームにエラーが発生する', async () => {
      const { spyOnError } = await overTextOperationSetup()
      const errors = spyOnError.mock.calls[0][0]

      expect(errors).not.toStrictEqual({})
      expect(errors.test.message).toBe('説明は200文字以内で入力してください')
    })

    it('エラーメッセージが表示される', async () => {
      await overTextOperationSetup()
      expect(
        screen.getByText('説明は200文字以内で入力してください')
      ).toBeInTheDocument()
    })

    it('フォームが送信出来ない', async () => {
      const { onSubmitHandlerMock } = await overTextOperationSetup()
      expect(onSubmitHandlerMock).not.toHaveBeenCalled()
    })
  })
})
