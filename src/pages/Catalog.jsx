import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from "react-redux"
import Error from "./Error"

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id =
        res?.data?.data?.find((ct) =>
          ct.name.split(" ").join("-").toLowerCase() === catalogName
        )?._id;
      setCategoryId(category_id);
    }
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(categoryId);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (categoryId) getCategoryDetails();
  }, [categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!loading && !catalogPageData.success) {
    return <Error />;
  }

  return (
    <>
      {/* Hero Section */}
      <div className="box-content bg-gray-50 dark:bg-richblack-900 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
          <p className="text-sm text-gray-700 dark:text-richblack-200">
            {`Home / Catalog / `}
            <span className="text-blue-700 dark:text-yellow-50">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-gray-800 dark:text-richblack-300">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-2xl font-semibold text-gray-900 dark:text-richblack-5">
          Courses to get you started
        </div>
        <div className="my-4 flex border-b border-b-gray-300 dark:border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 cursor-pointer ${
              active === 1
                ? "border-b-2 border-b-blue-500 text-blue-700 dark:border-b-yellow-50 dark:text-yellow-50"
                : "text-gray-700 dark:text-richblack-300"
            }`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-4 py-2 cursor-pointer ${
              active === 2
                ? "border-b-2 border-b-blue-500 text-blue-700 dark:border-b-yellow-50 dark:text-yellow-50"
                : "text-gray-700 dark:text-richblack-300"
            }`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
      </div>

      {/* Section 2 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-2xl font-semibold text-gray-900 dark:text-richblack-5">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="py-8">
          <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses} />
        </div>
      </div>

      {/* Section 3 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-2xl font-semibold text-gray-900 dark:text-richblack-5">
          Frequently Bought
        </div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <Course_Card course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Catalog;
