import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ImageGallery from "../components/ImageGallery"
import "../stylesheets/gallery.scss"

const gallery = () => {
  return (
    <div>
      <Navbar />
      <div className="banner galleryBanner">
        <div className="galleryBannerContent">
          <h1>Gallery</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, nostrum amet sed suscipit, odit reiciendis, dolorem aspernatur voluptate laboriosam quasi labore aut? Quidem cupiditate eaque modi culpa officiis? Quod, repudiandae.</p>
        </div>
      </div>
      <ImageGallery />
      <Footer />
    </div>
  )
}

export default gallery
