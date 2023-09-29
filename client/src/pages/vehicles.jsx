import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../stylesheets/vehicles.scss"

const vehiclesForSale = [
  {
    make: "Ram",
    model: "1500",
    year: "2022",
    color: "Black",
    mileage: "30000",
    description: "Nice Truck with a phat booty",
  },
  {
    make: "Ford",
    model: "Tarus",
    year: "2019",
    color: "Gold",
    mileage: "255000",
    description: "Its an old car we dont talk about",
  },

]

const Vehicles = () => {
  return (
    <div>
        <Navbar />
        <div className="banner">
          <div className="vehiclesContent">
          <h1>Vehicles For Sale</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Accusamus unde libero iusto fugit! Quidem, nam ipsam magnam,
            labore eum modi aperiam repellat nisi sunt sit molestias
            necessitatibus soluta numquam libero!</p>
          </div>
      </div>
      <div className="vehicles container">
        {vehiclesForSale.map((vehicle, key) => (
          <div className="vehicle">
            
            <p>{ vehicle.year + " " + vehicle.make + " " + vehicle.model }</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default Vehicles
