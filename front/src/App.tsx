
function App() {

  return (
    <>
      <h1>TODOアプリ</h1>
      TODOを追加
      <br />
      <input type="text" /><button type="button">追加</button>
      <br />
      一覧
      <br />
      <label>
        <input type="checkbox" />
        部屋掃除
      </label>
      <br />
      <label>
        <input type="checkbox" />
        風呂掃除
      </label>
      <br />
      <label>
        <input type="checkbox" />
        晩飯
      </label>
    </>
  )
}

export default App
