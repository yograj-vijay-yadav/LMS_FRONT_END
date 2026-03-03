import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate("/course/description/", { state: { ...data } })
      }
      className="text-white w-[22rem] h-[430px] shadow-lg rounded-xl cursor-pointer group overflow-hidden border border-pink-500 hover:shadow-pink-500/40 transition-transform duration-300 hover:scale-105"
    >
      {/* Thumbnail */}
      <div className="overflow-hidden ">
        <img
          className="h-58 w-100 object-cover rounded-t-xl transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
          src={data?.thumbnail?.secure_url}
          alt="course thumbnail"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-bold text-pink-400 line-clamp-2 group-hover:text-pink-300 transition-colors">
          {data?.title}
        </h2>
        <p className="text-sm text-gray-300 line-clamp-2">
          {data?.description}
        </p>
        <p className="text-sm font-medium">
          <span className="text-pink-400 font-semibold">Category: </span>
          {data?.category}
        </p>
        <p className="text-sm font-medium">
          <span className="text-pink-400 font-semibold">Total lectures: </span>
          {data?.numberoflectures}
        </p>
        <p className="text-sm font-medium">
          <span className="text-pink-400 font-semibold">Instructor: </span>
          {data?.createdBy}
        </p>
      </div>
    </div>
  );
}

export default CourseCard;
