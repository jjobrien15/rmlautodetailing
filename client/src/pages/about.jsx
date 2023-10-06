import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import img from "../assets/background1.jpg"
import "../stylesheets/about.scss"

const profiles = [
  {
    name: "Rob Lentino",
    img: img,
    title: "CEO",
    descrtiption: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis harum, nobis dolores ex accusamus dolor? Eligendi ab dignissimos quam voluptas sint sapiente aliquam in, nemo adipisci quos odio doloribus accusamus?",
  },
  {
    name: "Rob Lentino",
    img: img,
    title: "CEO",
    descrtiption: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis harum, nobis dolores ex accusamus dolor? Eligendi ab dignissimos quam voluptas sint sapiente aliquam in, nemo adipisci quos odio doloribus accusamus?",
  },
]

const about = () => {
  return (
    <div>
      <Navbar />
      <div className="banner container">
        <div className="aboutContent">
          <h1>Meet the team</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis harum, nobis dolores ex accusamus dolor? Eligendi ab dignissimos quam voluptas sint sapiente aliquam in, nemo adipisci quos odio doloribus accusamus?</p>
        </div>
      </div>
      <div className="profiles container">
        {profiles.map((profile, key) => (
          <div className="profile">
            <img src={profile.img} alt={profile.name} />
            <h3>{profile.name} ({profile.title})</h3>
            <p>{profile.descrtiption}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default about
