import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import {
  BookOpen,
  IndianRupee,
  PlayCircle,
  Plus,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ConfirmDialog from "../../Components/Ui/ConfirmDialog";
import EmptyState from "../../Components/Ui/EmptyState";
import HomeLayout from "../../Layouts/HomeLayout";
import {
  deleteCourse,
  getAllCourses,
} from "../../Redux/Slices/CourseSlice";
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

function StatCard({ icon: Icon, label, value, tone = "rose" }) {
  const tones = {
    rose: "bg-rose-500/10 text-rose-400",
    emerald: "bg-emerald-500/10 text-emerald-400",
    sky: "bg-sky-500/10 text-sky-400",
    violet: "bg-violet-500/10 text-violet-400",
  };

  return (
    <div className="card card-interactive flex items-center gap-4 p-5">
      <div
        className={`flex size-11 shrink-0 items-center justify-center rounded-lg ${tones[tone]}`}
      >
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="truncate font-display text-2xl font-bold text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

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

  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const totalRevenue = (allPayments?.count || 0) * 499;

  const userData = {
    labels: ["Registered Users", "Enrolled Users"],
    datasets: [
      {
        label: "Users",
        data: [allUsersCount, subscribedCount],
        backgroundColor: ["#f43f5e", "#fb7185"],
        borderColor: "#0f172a",
        borderWidth: 2,
      },
    ],
  };

  const salesData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: "rgba(244, 63, 94, 0.7)",
        hoverBackgroundColor: "#f43f5e",
        borderRadius: 6,
        maxBarThickness: 32,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#94a3b8", font: { size: 11 } },
        position: "bottom",
      },
    },
    scales: {
      x: {
        ticks: { color: "#64748b", font: { size: 10 } },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#64748b", font: { size: 10 } },
        grid: { color: "rgba(51, 65, 85, 0.4)" },
        beginAtZero: true,
      },
    },
  };

  async function confirmDeleteCourse() {
    if (!courseToDelete) return;
    setIsDeleting(true);
    const res = await dispatch(deleteCourse(courseToDelete._id));
    if (res?.payload?.success) {
      dispatch(getAllCourses());
    }
    setIsDeleting(false);
    setCourseToDelete(null);
  }

  useEffect(() => {
    async function load() {
      await Promise.allSettled([
        dispatch(getAllCourses()),
        dispatch(getStatsData()),
        dispatch(getPaymentRecord()),
      ]);
      setIsLoading(false);
    }
    load();
  }, [dispatch]);

  return (
    <HomeLayout>
      <div className="container-page py-12">
        {/* Header */}
        <div className="anim-fade-up mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="badge badge-rose mb-2 font-semibold uppercase tracking-wider">
              Admin
            </span>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Platform performance at a glance.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/course/create")}
            className="btn btn-primary self-start sm:self-auto"
          >
            <Plus className="size-4" aria-hidden="true" />
            Create new course
          </button>
        </div>

        {/* Stat cards */}
        <div className="stagger mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={Users}
            label="Registered users"
            value={allUsersCount}
            tone="rose"
          />
          <StatCard
            icon={BookOpen}
            label="Enrolled users"
            value={subscribedCount}
            tone="emerald"
          />
          <StatCard
            icon={TrendingUp}
            label="Subscriptions"
            value={allPayments?.count || 0}
            tone="sky"
          />
          <StatCard
            icon={IndianRupee}
            label="Total revenue"
            value={`₹${totalRevenue.toLocaleString("en-IN")}`}
            tone="violet"
          />
        </div>

        {/* Charts */}
        <div className="mb-12 grid gap-6 lg:grid-cols-2">
          <div className="card anim-fade-up p-6">
            <h2 className="mb-4 text-base font-semibold">Users overview</h2>
            <div className="relative h-72">
              <Pie data={userData} options={chartOptions} />
            </div>
          </div>
          <div className="card anim-fade-up p-6" style={{ animationDelay: "80ms" }}>
            <h2 className="mb-4 text-base font-semibold">Sales by month</h2>
            <div className="relative h-72">
              <Bar data={salesData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Courses table */}
        <section aria-label="Courses overview">
          <h2 className="anim-fade-up mb-5 text-lg font-semibold">
            Courses overview
          </h2>

          {isLoading ? (
            <div className="card space-y-3 p-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="skeleton h-10 w-full" />
              ))}
            </div>
          ) : myCourses.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No courses yet"
              description="Create your first course to start building the catalog."
              actionLabel="Create course"
              onAction={() => navigate("/course/create")}
            />
          ) : (
            <>
              {/* Desktop table */}
              <div className="card anim-fade-up hidden overflow-hidden md:block">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/80 text-xs uppercase tracking-wider text-slate-400">
                      <th scope="col" className="px-5 py-3.5 font-semibold">#</th>
                      <th scope="col" className="px-5 py-3.5 font-semibold">Title</th>
                      <th scope="col" className="px-5 py-3.5 font-semibold">Category</th>
                      <th scope="col" className="px-5 py-3.5 font-semibold">Instructor</th>
                      <th scope="col" className="px-5 py-3.5 font-semibold">Lectures</th>
                      <th scope="col" className="px-5 py-3.5 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myCourses.map((course, index) => (
                      <tr
                        key={course._id}
                        className="border-b border-slate-800/60 transition-colors last:border-0 hover:bg-slate-800/40"
                      >
                        <td className="px-5 py-4 text-slate-500">{index + 1}</td>
                        <td className="max-w-[14rem] px-5 py-4">
                          <span className="block truncate font-medium text-white">
                            {course?.title}
                          </span>
                          <span className="block truncate text-xs text-slate-500">
                            {course?.description}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="badge badge-slate">{course?.category}</span>
                        </td>
                        <td className="max-w-[10rem] truncate px-5 py-4 text-slate-300">
                          {course?.createdBy}
                        </td>
                        <td className="px-5 py-4 text-slate-300">
                          {course?.numberOfLectures}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              onClick={() =>
                                navigate("/course/displaylectures", {
                                  state: { ...course },
                                })
                              }
                              aria-label={`Manage lectures for ${course?.title}`}
                            >
                              <PlayCircle className="size-4" aria-hidden="true" />
                              Lectures
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => setCourseToDelete(course)}
                              aria-label={`Delete ${course?.title}`}
                            >
                              <Trash2 className="size-4" aria-hidden="true" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="stagger space-y-4 md:hidden">
                {myCourses.map((course) => (
                  <div key={course._id} className="card p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-white">
                          {course?.title}
                        </h3>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {course?.category} · {course?.createdBy} ·{" "}
                          {course?.numberOfLectures} lectures
                        </p>
                      </div>
                      <span className="badge badge-slate shrink-0">
                        #{course?.category}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                      {course?.description}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm flex-1"
                        onClick={() =>
                          navigate("/course/displaylectures", {
                            state: { ...course },
                          })
                        }
                      >
                        <PlayCircle className="size-4" aria-hidden="true" />
                        Lectures
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => setCourseToDelete(course)}
                        aria-label={`Delete ${course?.title}`}
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={Boolean(courseToDelete)}
        destructive
        title="Delete this course?"
        message={`"${courseToDelete?.title}" and its lectures will be permanently removed. This action cannot be undone.`}
        confirmLabel="Delete course"
        busy={isDeleting}
        onConfirm={confirmDeleteCourse}
        onCancel={() => setCourseToDelete(null)}
      />
    </HomeLayout>
  );
}

export default AdminDashboard;
