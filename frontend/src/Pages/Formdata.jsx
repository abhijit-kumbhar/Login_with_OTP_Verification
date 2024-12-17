import React from "react";
import { useForm } from "react-hook-form";
import { APIInstance } from "../ApiInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../CSS/Formdata.css";
import { useNavigate } from "react-router-dom";

const Formdata = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const handleFormData = async (data) => {
    try {
      const response = await APIInstance.post("/studentdata", data);
      console.log("Response:", response.data);
      reset();
      toast.success('Form submitted successfully!');
      setTimeout(() => navigate("/home"), 2000); // Navigate after 2 seconds to ensure toast is displayed
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      toast.warn('Student already exists');
    }
  };

  return (
    <>
      <div className="form-container">
        <h1>Student Information</h1>
        <form onSubmit={handleSubmit(handleFormData)}>
          <div className="form-group">
            <label>Enter Name</label>
            <input
              className="input-field"
              type="text"
              placeholder="Name"
              name="name"
              {...register("name", {
                required: "Please Enter Name",
              })}
            />
            <br />
            <br />
            {errors.name && (
              <p style={{ color: "red" }}>{errors.name.message}</p>
            )}
            <label>Enter Age</label>
            <input
              className="input-field"
              type="number"
              placeholder="Age"
              name="age"
              {...register("age", {
                required: "Age is required",
              })}
            />
            <br />
            {errors.age && <p style={{ color: "red" }}>{errors.age.message}</p>}
            <br />
            <label>Enter Address</label>
            <input
              className="input-field"
              type="text"
              placeholder="Address"
              name="address"
              {...register("address", {
                required: "Address is required",
              })}
            />
            <br />
            {errors.address && (
              <p style={{ color: "red" }}>{errors.address.message}</p>
            )}
            <br />

            <label>Enter Phone No.</label>
            <input
              className="input-field"
              type="number"
              placeholder="Phone No."
              name="phone"
              {...register("phone", {
                required: "Phone No. is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Mobile No. Must be 10 digits",
                },
              })}
            />
            <br />
            {errors.phone && (
              <p style={{ color: "red" }}>{errors.phone.message}</p>
            )}
            <br />
            <label>Enter Email</label>
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Enter a valid email",
                },
              })}
            />
            <br />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
            <br />
            <button className="submit-btn">Submit</button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right"  />
    </>
  );
};

export default Formdata;
