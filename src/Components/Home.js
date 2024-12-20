import Carousel from 'react-bootstrap/Carousel';
import "./library.css";

function Home() {
  return (
    <div>
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="carousel w-100"
          src="https://img.freepik.com/premium-photo/book-table-with-library-background_865967-29196.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>WELCOME TO THE LIBRARY</h5>
          <p>Bad libraries build collections, good libraries build services, great libraries build communities</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel d-block w-100"
          src="https://s3-us-east-2.amazonaws.com/cdn-test.poetryfoundation.org/content/images/PF_Library_Group.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          
          <p>I have always imagined that Paradise will be a kind of a Library.</p>
          <h5>Jorge Luis Borges </h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel d-block w-100"
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpUgeZ3_LTSe4Z9I9qy59nxdslUSZ5VLAPxuj3Nh_rZSlI4F0of1cpf6PU3Vadj4DuWILb4SawnyNVaqUxi_dIryw4ChSD2zKskK77mNK3JVi0kATS9MEFVbGqa6_ortno0BiNiKQVUOA/s1600/yale+library.JPG"
          alt="Third slide"
        />
        <Carousel.Caption>
        <h5>Sarah J. Maas </h5>
          
          <p>
          Libraries were full of ideas – perhaps the most dangerous and powerful of all weapons
          </p>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default Home;