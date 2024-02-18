import FormInput from "../components/FormInput";

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
    },
    {
      name:"link2",
      label:"Link 2"
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted home admin form");
  }

  return (
    <div>
      <div>
        <h1>Home</h1>
        <p>(Admin)</p>
      </div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          {input.map((input, key)=>(
            <FormInput input={input} key={key} />
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