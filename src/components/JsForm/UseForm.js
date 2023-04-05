import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import { useValue } from "../../Context/ContextProvider";
import { fsgetRequests } from "../../Context/actions";
import { useSelector } from "react-redux";

const UseForm = (params) => {
  const [open, setOpen] = useState(false);
  // const loginStatus = useSelector((state) => state.login.value);
  const parameter = params;
  const {
    state: { fsrequests },
    dispatch,
  } = useValue();

  const ConfrimedData = fsrequests.filter((row) => row.status === "Confrimed");
  const FollowUpStatus = [
    "Demo Completed",
    "Demo Scheduled",
    "Demo Yet to Schedule",
  ];
  const FollowupData = fsrequests.filter((row) => {
    if (FollowUpStatus.includes(row.status)) {
      return row;
    }
  });
  const [values, setValues] = useState({
    candidate_name: "",
    mobile: "",
    technology: "",
    start_date: new Date(),
    followup_date: "",
    resource: "",
    status: "",
    feedback: "",
    date_of_enquiry: new Date(),
    payment_period: "Task",
    charges: 10,
    created_by: "admin",
    updated_by: "admin",
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

  const FollowupDate = () => {
    if (values.payment_period === "Task") {
      return new Date();
    } else if (values.payment_period === "Weekly") {
      let currentDate = new Date();
      let Weekly = new Date(currentDate.getTime() + 6 * 24 * 60 * 60 * 1000);
      return Weekly;
    } else if (values.payment_period === "BiWeekly") {
      let currentDate = new Date();
      let biWeekly = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000);
      return biWeekly;
    } else if (values.payment_period === "Monthly") {
      let currentDate = new Date();
      let Monthly = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
      return Monthly;
    }
  };

  const enqdata = {
    candidate_name: values.candidate_name,
    mobile: values.mobile,
    technology: values.technology,
    date_of_enquiry: moment(values.date_of_enquiry).format("DD-MM-YYYY"),
    start_date:
      values.status === "Confrimed"
        ? moment(values.start_date).format("DD-MM-YYYY")
        : "",
    followup_date:
      values.status === "Confrimed"
        ? moment(FollowupDate()).format("DD-MM-YYYY")
        : "",
    resource: values.resource,
    status: values.status,
    feedback: values.feedback,
    charges: values.charges,
    payment_period: values.payment_period,
    created_by: values.created_by,
    updated_by: values.updated_by,
  };

  const postData = () => {
    // if (Object.values(values).includes("") === false) {
    axios
      .post("http://127.0.0.1:8000/api/v1/job-support-data", enqdata)
      .then((res) => console.log(res.data));
    setOpen(true);
    // }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    console.log("I am Working");

    postData();

    setValues({
      candidate_name: "",
      mobile: "",
      technology: "",
      start_date: null,
      followup_date: null,
      resource: "",
      status: "",
      feedback: "",
    });
  };

  const clearFields = () => {
    setValues({
      candidate_name: "",
      mobile: "",
      technology: "",
      start_date: null,
      followup_date: null,
      resource: "",
      status: "",
      feedback: "",
    });
  };

  useEffect(() => {
    fsgetRequests(dispatch);
  }, []);

  const handleDelete = async () => {
    const { id } = parameter.row;
    if (window.confirm("Are you sure to delete this record?")) {
      await axios
        .delete(`http://127.0.0.1:8000/api/v1/job-support-data-delete/${id}`)
        .then((res) => console.log("Employee Data Successfully deleted"))

        .catch((error) => {
          console.log(error);
        });
      dispatch({ type: "FSDELETE_REQUESTS", payload: id });
      fsgetRequests(dispatch);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [cmdopen, setcmdOpen] = useState(false);

  return {
    setcmdOpen,
    cmdopen,
    handleClose,
    handleChange,
    values,
    handleSubmit,
    setValues,
    handleDelete,
    fsrequests,
    clearFields,
    open,
    setOpen,
    ConfrimedData,
    FollowupData,
  };
};
export default UseForm;
