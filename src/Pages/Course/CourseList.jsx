// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import CourseCard from "../../Components/CourseCard";
// import HomeLayout from "../../Layouts/HomeLayout";
// import { getAllCourses } from "../../Redux/Slices/CourseSlice";

// function CourseList() {
//     const dispatch = useDispatch();

//     const {courseData} = useSelector((state) => state.course);

//     async function loadCourses() {
//         await dispatch(getAllCourses());
//     }

//     useEffect(() => {
//         loadCourses();
//     }, []);

//     return (
//         <HomeLayout>
//             <div className="min-h-[90vh] pt-12  flex flex-col gap-10 text-white items-center ">
//                 <h1 className="text-center text-3xl font-semibold mb-5">
//                     Explore the courses made by 
//                     <span className="font-bold text-yellow-500">
//                         -Industry experts
//                     </span>
//                 </h1>
//                 <div className="mb-10 flex flex-wrap gap-14 items-center justify-center">  
//                     {courseData?.map((element) => {
//                         return <CourseCard key={element._id} data={element} />
//                     })}
//                 </div>

//             </div>
//         </HomeLayout>  
//     );

// }

// export default CourseList;



import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import CourseCard from "../../Components/CourseCard";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";

function CourseList() {
    const dispatch = useDispatch();
    const { courseData } = useSelector((state) => state.course);

    async function loadCourses() {
        await dispatch(getAllCourses());
    }

    useEffect(() => {
        loadCourses();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        show: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" },
        },
    };

    return (
        <HomeLayout>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="min-h-[90vh] pt-22 flex flex-col gap-10 text-white items-center"
            >
                {/* Title Animation */}
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center text-3xl font-semibold mb-5 tracking-wide"
                >
                    Explore the courses made by{" "}
                    <span className="font-bold text-pink-500">
                        - Industry experts
                    </span>
                </motion.h1>

                {/* Cards with Stagger Animation */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="mb-10 flex flex-wrap gap-14 items-center justify-center p-6 "
                >
                    {courseData?.map((element) => (
                        <motion.div
                            key={element._id}
                            variants={cardVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="transition-all"
                        >
                            <CourseCard data={element} />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </HomeLayout>
    );
}

export default CourseList;








