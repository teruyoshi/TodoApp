import { render } from '@testing-library/react'
import { TodoInputForm } from '../components'
import userEvent from '@testing-library/user-event'
import { DayjsLocalizationProvider } from '../../../providers'

const setup = (onSubmitHandlerMock?: jest.Func) => {
  const onSubmitHandler = onSubmitHandlerMock || jest.fn()
  const screen = render(
    <DayjsLocalizationProvider>
      <TodoInputForm />
    </DayjsLocalizationProvider>
  )

  const { getByLabelText, getByRole } = screen

  const titleInput = getByLabelText('タイトル')
  const descriptionInput = getByLabelText('説明')
  const dateFromInput = getByLabelText('開始日')
  const dateToInput = getByLabelText('終了日')
  const submitButton = getByRole('button', { name: '追加' })

  return {
    titleInput,
    descriptionInput,
    dateFromInput,
    dateToInput,
    submitButton,
  }
}

describe('TodoInputForm', () => {
  // TODO skipを外して実装する
  it.skip('入力した Todo のデータを送信できる', async () => {
    const onSubmitHandlerMock = jest.fn()

    const { submitButton } = setup(onSubmitHandlerMock)

    await userEvent.click(submitButton)

    expect(onSubmitHandlerMock).toHaveBeenCalledWith()
  })

  it('Todo のタイトルを入力出来る', async () => {
    const { titleInput } = setup()

    await userEvent.type(titleInput, '国語の勉強')

    expect(titleInput).toHaveValue('国語の勉強')
  })

  it('Todo の説明を入力出来る', async () => {
    const { descriptionInput } = setup()

    await userEvent.type(descriptionInput, '音読と漢字の宿題')

    expect(descriptionInput).toHaveValue('音読と漢字の宿題')
  })

  it('Todo の開始日を入力出来る', async () => {
    const { dateFromInput } = setup()

    await userEvent.type(dateFromInput, '20250101')

    expect(dateFromInput).toHaveValue('2025/01/01')
  })

  it('Todo の終了日を入力出来る', async () => {
    const { dateToInput } = setup()

    await userEvent.type(dateToInput, '20250227')

    expect(dateToInput).toHaveValue('2025/02/27')
  })
})
