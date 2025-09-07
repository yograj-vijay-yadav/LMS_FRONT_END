import aboutMainPage from "../Assets/Images/aboutMainPage.png";
import apjAbdulKalam from "../Assets/Images/apjAbdulKalam.png"
import billGates from "../Assets/Images/billGates.png";
import nelsonMandela from "../Assets/Images/nelsonMandela.png";
import steveJobs from "../Assets/Images/steveJobs.png";
import HomeLayout from "../Layouts/HomeLayout";

function Aboutus() {
  return (
    <HomeLayout>
      <div className="flex flex-col text-white pl-20 pt-20 ">
        {/* Top Section */}
        <div className="flex items-center gap-5 mx-10">
          <section className="w-3/7 space-y-10">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              Affordable and quality education
            </h1>
            <p className="text-xl text-gray-200">
              Our goal is to provide affordable and quality education to the
              world. We are providing a platform for aspiring teachers and
              students to share their skills, creativity, and knowledge with
              each other — empowering growth and contributing to the wellness of
              mankind.
            </p>
          </section>
          <div className="w-1/3 ml-30">
            <img
              src={aboutMainPage}
              alt="About page illustration"
              className="drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Quotes Carousel */}
        <div className="carousel w-1/3 py-30 items-center mx-auto pr-5">
          {/* Slide 1 */}
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={apjAbdulKalam}
                alt="APJ Abdul Kalam"
                className="w-40 rounded-full border-2 border-gray-400"
              />
              <p className="text-xl text-gray-200 text-center">
                Teaching is a very noble profession that shapes the character,
                caliber, and future of an individual.
              </p>
              <h3 className="text-2xl font-semibold">APJ Abdul Kalam</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div id="slide2" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={steveJobs}
                alt="Steve Jobs"
                className="w-40 rounded-full border-2 border-gray-400"
              />
              <p className="text-xl text-gray-200 text-center">
                We don’t get a chance to do that many things, and every one
                should be really excellent.
              </p>
              <h3 className="text-2xl font-semibold">Steve Jobs</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div id="slide3" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={billGates}
                alt="Bill Gates"
                className="w-40 rounded-full border-2 border-gray-400"
              />
              <p className="text-xl text-gray-200 text-center">
                Success is a lousy teacher. It seduces smart people into
                thinking they can’t lose.
              </p>
              <h3 className="text-2xl font-semibold">Bill Gates</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>

          {/* Slide 4 */}
          <div id="slide4" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={nelsonMandela}
                alt="Nelson Mandela"
                className="w-40 rounded-full border-2 border-gray-400"
              />
              <p className="text-xl text-gray-200 text-center">
                Education is the most powerful tool you can use to change the
                world.
              </p>
              <h3 className="text-2xl font-semibold">Nelson Mandela</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Aboutus;
