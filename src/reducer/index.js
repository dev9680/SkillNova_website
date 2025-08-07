import {combineReducers} from "@reduxjs/toolkit";
import themeReducer from "../slices/themeSlice"

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice"
import courseReducer from "../slices/courseSlice"
import viewCourseReducer from "../slices/viewCourseSlice";
import catalogReducer from "../slices/catalogSlice";
const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    theme: themeReducer,
    viewCourse: viewCourseReducer,
     catalog: catalogReducer,
})

export default rootReducer