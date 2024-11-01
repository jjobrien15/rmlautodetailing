import "../stylesheets/admin.scss"
import "../stylesheets/admin_home.scss";

const admin_home = () => {

  const input = [
    {
      name:"title",
      label:"Title"
    },
    {
      name:"link1",
      label:"Link 1"
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted home admin form");
  }

  return (
    <div>
      <div className="adminHeader">
        <h1>Home</h1>
        <p>(Admin)</p>
      </div>
      <div className="adminForm">
        <form onSubmit={handleSubmit}>
          {input.map((currentInput, key) => (
            <div className="form-group">
              <label htmlFor={currentInput.name}>{currentInput.label}</label>
              <input name={currentInput.name} type="text"/>
            </div>
          ))}
          <button className="submitBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default admin_home