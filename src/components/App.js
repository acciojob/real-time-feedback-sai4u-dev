import React, { useState } from "react";
import "../styles/App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Validation logic
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        break;

      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(value))
          error = "Invalid email format";
        break;

      case "password":
        if (!value.trim()) error = "Password is required";
        else if (value.length < 6)
          error = "Password must be at least 6 characters";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submit
    Object.entries(formData).forEach(([key, value]) =>
      validateField(key, value)
    );

    // If no errors, submit form
    if (Object.values(errors).every((err) => err === "")) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <p className="error-message">{errors.name}</p>
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <p className="error-message">{errors.email}</p>
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <p className="error-message">{errors.password}</p>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
