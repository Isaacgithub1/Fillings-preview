import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useValue } from "../../Context/ContextProvider";
import { enqgetRequests } from "../../Context/actions";

const UseForm = (params) => {
  const [open, setOpen] = useState(false);
  const parameter = params;
  const {
    state: { enqrequests },
    dispatch,
  } = useValue();
  const [values, setValues] = useState({
    name: "",
    followup_call_date:new Date(),
    followup_status: "",
    enquiry_by: "",
    mobile: "",
    location: "",
    course: "",
    fee_structure: "",
    experience_by: "",
    // info_source: "",
    // purpose: "",
    mode: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevalues) => {
      return {
        ...prevalues,
        [name]: value,
      };
    });
  };

  const enqdata = {
    name: values.name,
    followup_call_date: moment(values.followup_call_date).format("DD-MM-YYYY"),
    followup_status: values.followup_status,
    enquiry_by: values.enquiry_by,
    mobile: values.mobile,
    location: values.location,
    course: values.course,
    fee_structure: values.fee_structure,
    experience_by: values.experience_by,
    // info_source: values.info_source,
    // purpose: values.purpose,
    mode: values.mode,
    comments: values.comments,
  };

  useEffect(() => {
    enqgetRequests(dispatch);
  }, []);

  const postData = () => {
    if (Object.values(values).includes("") === false) {
      axios
        .post("http://127.0.0.1:8000/api/v1/course-enquiry", enqdata)
        .then((res) => console.log(res.data));
      console.log("success", Object.values(values));
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    console.log("I am Working");

    postData();
 
    setValues({
      name: "",
      followup_call_date: "",
      followup_status: "",
      enquiry_by: "",
      mobile: "",
      location: "",
      course: "",
      fee_structure: "",
      experience_by: "",
      // info_source: "",
      // purpose: "",
      mode: "",
      comments: "",
    });
    setOpen(true);
  };

const handleDelete = async () => {
    const { id } = parameter.row;
    if (window.confirm("Are you sure to delete this record?")) {
      await axios
        .delete(`http://127.0.0.1:8000/api/v1/course-enquiry-delete/${id}`)
        .then((res) => console.log("Employee Data Successfully deleted"))

        .catch((error) => {
          console.log(error);
        });
      dispatch({ type: "ENQDELETE_REQUESTS", payload: id });
      enqgetRequests(dispatch);
    }
  };

  const clearFields = () => {
    setValues({
      name: "",
      followup_call_date: "",
      followup_status: "",
      enquiry_by: "",
      mobile: "",
      location: "",
      course: "",
      fee_structure: "",
      experience_by: "",
      // info_source: "",
      // purpose: "",
      mode: "",
      comments: "",
    });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return {
    handleClose,
    handleChange,
    values,
    handleSubmit,
    setValues,
    handleDelete,
    enqrequests,
    clearFields,
    open,
    setOpen,
  };
};

export default UseForm;
