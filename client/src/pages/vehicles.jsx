import Navbar from "../components/Navbar"
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
        <p>You have no Vehicles to display at this time....</p>
    </div>
  )
}

export default Vehicles
