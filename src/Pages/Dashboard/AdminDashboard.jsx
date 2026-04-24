import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from "chart.js";

import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip
);

function AdminDashboard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount = 0, subscribedCount = 0 } = useSelector(
    (state) => state.stat
  );

  const { allPayments = {}, monthlySalesRecord = [] } = useSelector(
    (state) => state.razorpay
  );

  const myCourses = useSelector((state) => state?.course?.courseData || []);

  const totalRevenue = (allPayments?.count || 0) * 499;

  const userData = {
    labels: ["Registered Users", "Enrolled Users"],
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedCount],
        backgroundColor: ["#ec4899", "#f472b6"],
        borderWidth: 1
      }
    ]
  };

  const salesData = {
    labels: [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ],
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: "#ec4899",
        borderColor: "#ffffff",
        borderWidth: 2
      }
    ]
  };

  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const res = await dispatch(deleteCourse(id));

      if (res?.payload?.success) {
        dispatch(getAllCourses());
      }
    }
  }

  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getStatsData());
    dispatch(getPaymentRecord());
  }, [dispatch]);

  return (
    <HomeLayout>

      <div className="min-h-[90vh] pt-20 flex flex-col gap-10 text-gray-200 px-6 bg-gradient-to-b from-gray-900 to-black">

        {/* TITLE */}

        <h1 className="text-center text-5xl font-bold text-pink-500 border-b border-gray-700 pb-4">
          Admin Dashboard
        </h1>

        {/* CHART SECTION */}

        <div className="grid grid-cols-2 gap-6">

          {/* USER CHART */}

          <div className="flex flex-col items-center gap-10 p-6 bg-gray-900 border border-gray-700 shadow-xl rounded-xl">

            <div className="w-80 h-80">
              <Pie data={userData} />
            </div>

            <div className="grid grid-cols-2 gap-5 w-full">

              <div className="flex items-center justify-between p-5 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700 transition">

                <div>
                  <p className="text-gray-400">Registered Users</p>
                  <h3 className="text-4xl font-bold text-pink-700">
                    {allUsersCount}
                  </h3>
                </div>

                <FaUsers className="text-pink-700 text-5xl" />

              </div>

              <div className="flex items-center justify-between p-5 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700 transition">

                <div>
                  <p className="text-gray-400">Subscribed Users</p>
                  <h3 className="text-4xl font-bold text-pink-300">
                    {subscribedCount}
                  </h3>
                </div>

                <FaUsers className="text-pink-300 text-5xl" />

              </div>

            </div>

          </div>

          {/* SALES CHART */}

          <div className="flex flex-col items-center gap-10 p-6 bg-gray-900 border border-gray-700 shadow-xl rounded-xl">

            <div className="h-80 w-full">
              <Bar data={salesData} />
            </div>

            <div className="grid grid-cols-2 gap-5 w-full">

              <div className="flex items-center justify-between p-5 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700 transition">

                <div>
                  <p className="text-gray-400">Subscription Count</p>
                  <h3 className="text-4xl font-bold text-pink-500">
                    {allPayments?.count || 0}
                  </h3>
                </div>

                <FcSalesPerformance className="text-5xl" />

              </div>

              <div className="flex items-center justify-between p-5 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700 transition">

                <div>
                  <p className="text-gray-400">Total Revenue</p>
                  <h3 className="text-4xl font-bold text-pink-400">
                    ₹{totalRevenue}
                  </h3>
                </div>

                <GiMoneyStack className="text-pink-400 text-5xl" />

              </div>

            </div>

          </div>

        </div>

        {/* COURSE TABLE */}

        <div className="mx-[10%] w-[80%] flex flex-col gap-10 mb-10">

          <div className="flex items-center justify-between">

            <h1 className="text-3xl font-semibold text-pink-500">
              Courses Overview
            </h1>

            <button
              onClick={() => navigate("/course/create")}
              className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition"
            >
              Create New Course
            </button>

          </div>

          <table className="w-full border border-gray-700 rounded-lg overflow-hidden">

            <thead className="bg-gray-800 text-pink-400 text-lg">

              <tr>
                <th className="p-3">S No</th>
                <th className="p-3">Course Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Instructor</th>
                <th className="p-3">Lectures</th>
                <th className="p-3">Description</th>
                <th className="p-3">Actions</th>
              </tr>

            </thead>

            <tbody>

              {myCourses.length > 0 ? (
                myCourses.map((course, idx) => (

                  <tr
                    key={course._id}
                    className="border-b border-gray-700 hover:bg-gray-800 transition"
                  >

                    <td className="p-3">{idx + 1}</td>
                    <td className="p-3">{course?.title}</td>
                    <td className="p-3">{course?.category}</td>
                    <td className="p-3">{course?.createdBy}</td>
                    <td className="p-3">{course?.numberOfLectures}</td>

                    <td className="p-3 max-w-xs text-gray-300 truncate">
                      {course?.description}
                    </td>

                    <td className="p-3 flex gap-3">

                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow"
                        onClick={() =>
                          navigate("/course/displaylectures", {
                            state: { ...course }
                          })
                        }
                      >
                        <BsCollectionPlayFill />
                      </button>

                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow"
                        onClick={() => onCourseDelete(course?._id)}
                      >
                        <BsTrash />
                      </button>

                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td colSpan="7" className="text-center p-6 text-gray-400">
                    No Courses Found
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </HomeLayout>
  );
}

export default AdminDashboard;