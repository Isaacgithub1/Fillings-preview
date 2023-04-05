import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Filings } from "./components/Filings/Taxfilings";
import { Compliance } from "./components/Filings/Compliance";
import { PayrollHR } from "./components/Filings/PayrollHR";
import { EnqForm } from "./components/Forms/EnqForm";
import { EnqAdmin } from "./components/Admin/Admin";
import HeaderBar from "./components/Sidebar/headerBar";
import SignInComponent from "./components/Auth/Login";
import SignUpComponent from "./components/Auth/Register";
import JobSupportForm from "./components/JsForm/JobSupportForm";
import EnquiryForm from "./components/EnquiryForm/EnquiryForm";
import { RequireAuth } from "react-auth-kit";
import JobSupportDataTable from "./components/JsForm/JobSupportDataTable";
import JobSupportConfrimedTable from "./components/JsForm/JobSuppConfrimedTable";
import JobSupportResourceTable from "./components/JsForm/JobSuppResourceTable";
import JobSupportFollowUpTable from "./components/JsForm/JobSuppFollowUpTable";
import { AdminList } from "./components/AppAdmin/AdminList";
import { UserCreateForm } from "./components/Forms/UserCreate";
import EnquiryFormDataTable from "./components/EnquiryForm/EnquiryFormDataTable";
import HomePage from "./components/Home/Home";
function App() {
    // const isLoggedIn = getState().isLoggedIn
  return (
    <BrowserRouter>
      <HeaderBar>
        <Routes>
          {/* <Route path="/" element={Home} /> */}
          <Route path="/tax-filing" element={<Filings />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/payroll-hr" element={<PayrollHR />} />
          <Route path="/enq-form" element={<EnqForm />} />
          <Route path="/enq-admin" element={<EnqAdmin />} />
          <Route path="/login" element={<SignInComponent />} />
          <Route path="/register" element={<SignUpComponent />} />
          <Route path="/job-supp-form" element={<JobSupportForm />} />
          <Route path="/enquiry-form" element={<EnquiryForm />} />
          <Route path="/job-supp-table" element={<JobSupportDataTable />} />
          <Route path="/job-supp-confrimed-table" element={<JobSupportConfrimedTable />} />
          <Route path="/job-supp-resource-table" element={<JobSupportResourceTable />} />
          <Route path="/js-followup-table" element={<JobSupportFollowUpTable />} />
          <Route path="/enquiry-table" element={<EnquiryFormDataTable />} />
          <Route path="/admin" element={<AdminList />} />
          <Route path="/user-form" element={<UserCreateForm />} />
          <Route path="/" element={<HomePage />} />
          {/* <Route
            path="/"
            element={
              // <RequireAuth loginPath='/login'>

              <EnqAdmin />
              // </RequireAuth>z
            }
          /> */}
        </Routes>
      </HeaderBar>
    </BrowserRouter>
  );
}

export default App;
