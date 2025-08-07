import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { logout } from "../../../services/operations/authAPI";

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100 dark:text-richblack-300 transition-colors duration-300" />
      </div>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-600 overflow-hidden rounded-md border border-richblack-700 bg-richblack-800 dark:bg-richblack-900 transition-all duration-300"
          ref={ref}
        >
          <Link
            to="/dashboard/my-profile"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-x-2 py-2 px-4 text-sm text-richblack-100 dark:text-richblack-200 hover:bg-richblack-700 dark:hover:bg-richblack-800 hover:text-richblack-25 transition-colors duration-200"
          >
            <VscDashboard className="text-lg" />
            Dashboard
          </Link>

          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-2 py-2 px-4 text-sm text-richblack-100 dark:text-richblack-200 hover:bg-richblack-700 dark:hover:bg-richblack-800 hover:text-richblack-25 transition-colors duration-200 cursor-pointer"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
}
