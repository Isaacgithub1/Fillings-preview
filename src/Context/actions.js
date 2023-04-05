import axios from "axios";

export const getRequests = async (dispatch) => {
  const result = await fetch("http://localhost:8000/api/v1/req-data-all");
  const content = await result.json();
  if (content) {
    dispatch({ type: "UPDATE_REQUESTS", payload: content });
  }
};

export const getUsers = async (dispatch) => {
  const result = await fetch("http://localhost:8000/api/users-data-all");
  const content = await result.json();
  if (content) {
    dispatch({ type: "UPDATE_USERS", payload: content });
  }
};

export const fsgetRequests = async (dispatch) => {
  const jsdata = await axios.get(
    "http://127.0.0.1:8000/api/v1/job-support-data-all"
  );
  const content = await jsdata.data;
  if (content) {
    dispatch({ type: "JS_GETREQUEST", payload: content });
  }
};

export const enqgetRequests = async (dispatch) => {
  const enqdata = await axios.get(
    "http://127.0.0.1:8000/api/v1/course-enquiry-all"
  );
  const content = await enqdata.data;
  if (content) {
    dispatch({ type: "ENQ_GETREQUEST", payload: content });
  }
};

export const cmdgetRequests = async (dispatch) => {
  const cmddata = await axios.get(
    "http://localhost:8000/api/v1/job-support-comment-data-all"
  );
  const content = await cmddata.data;
  if (content) {
    dispatch({ type: "CMD_GETREQUEST", payload: content });
  }
};
