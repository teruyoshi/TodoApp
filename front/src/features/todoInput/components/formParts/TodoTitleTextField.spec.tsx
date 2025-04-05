import { FormTestDriver } from "@/__tests__/drivers"
import { TodoTitleTextField } from "."
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const setup = () => {
  const screen = render(
    <FormTestDriver defaultValues={ { test: '' } }>
      <TodoTitleTextField name="test" />
    </FormTestDriver>
  )

  const { getByLabelText } = screen
  const titleInput = getByLabelText('タイトル')

  return {
    titleInput
  }
}

describe('TodoTitleTextField', () => {
  it('Todo のタイトルを入力出来る', async () => {
    const { titleInput } = setup()

    await userEvent.type(titleInput, '国語の勉強')

    expect(titleInput).toHaveValue('国語の勉強')
  })
})