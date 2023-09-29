import img1 from "../assets/galleryImages/img1.jpg"
import img2 from "../assets/galleryImages/img2.jpg"
import img3 from "../assets/galleryImages/img3.jpg"
import img4 from "../assets/galleryImages/img4.jpg"
import img5 from "../assets/galleryImages/img5.jpg"

const galleryImages = [
  {
    url: img1,
  },
  {
    url: img2,
  },
  {
    url: img3,
  },
  {
    url: img4,
  },
  {
    url: img5,
  },
  {
    url: img3,
  },
  {
    url: img1,
  },
  {
    url: img2,
  },
]

const ImageGallery = () => {
  return (
    <div className="imageGallerySection container">
      <h1>Our Work</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia impedit ex laboriosam aspernatur dolores. Earum illum quisquam, nesciunt vero dicta temporibus cum error beatae, quo delectus consequatur, minus iure cumque.</p>
      <div className="imageGallery">
      {galleryImages.map((image, key) => (
        <div className="imageContainer">
          <img key={key} src={image.url} alt="Gallery Image" />
        </div>
      ))}
      </div>
    </div>
  )
}

export default ImageGallery
