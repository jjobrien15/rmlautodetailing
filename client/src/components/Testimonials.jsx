import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'

const testimonials =[
    {
        body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, quasi. Corrupti ab sapiente dolor.",
        name: "Joe",
        date: "09/17/2023",
    },
    {
        body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, quasi. Corrupti ab sapiente doloribus harum voluptatum iste voluptas eligendi voluptatem nostrum fugiat in aspernatur consequuntur quaerat, molestias aut libero dolore.",
        name: "Frank",
        date: "09/15/2023",
    },
    {
        body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, quasi. Corrupti ab sapiente doloribus harum voluptatum.",
        name: "Joe",
        date: "09/17/2023",
    },

]

const Testimonials = () => {
  return (
    <div className="homeTestimonials container">
        <h1>Testimonials</h1>
        <div className="testimonialCards">
        {testimonials.map((testimonial, key) => (
            <div key={key} className="testimonialCard">
                <p>{testimonial.body}</p>
                <div className="testimonialAuthor">
                    <FontAwesomeIcon icon={faQuoteLeft} className="testimonialQuotes"/>
                    <p className="testimonialName">{testimonial.name}</p>
                    <p>{testimonial.date}</p>
                </div>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Testimonials
