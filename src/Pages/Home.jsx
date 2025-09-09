import { Link } from "react-router-dom";
import Homepage from "../Assets/Images/Homepage.png";


import HomeLayout from "../Layouts/HomeLayout";
function Home() {

    
       return (
        <HomeLayout>
            <div className="pt-10 text-white flex items-center justify-center gap-10 ml-[100px] mx-16 h-[90vh]">
                <div className="w-4/5 space-y-6">
                    <h1 className="text-6xl font-semibold">Find out best <span className="text-yellow-500 font-bold">Online courses</span></h1>
                    <p className="text-xl text-gray-200 w-3/4">
                        We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cose.
                    </p>

                    <div className="space-x-6">
                        <Link to="/courses" >
                            <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                Explore courses
                            </button>
                        </Link>
                        <Link to="/contacts" >
                            <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>
                
                <div className="w-3/4 ml-[100px] flex items-center justify-center">
                    <img  src={Homepage} alt="home page" className="ml-[50px]"/>
                </div>

            </div>
        </HomeLayout>
    )
}

export default Home;