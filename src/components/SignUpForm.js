import React, { useState } from 'react';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '',
        phone: '',
        birthday: '',
        department: '',
        program: '',
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.countryCode.trim()) {
            newErrors.countryCode = 'Country code is required';
        } else if (!/^\+\d+$/.test(formData.countryCode)) {
            newErrors.countryCode = 'Country code is invalid (must start with + and digits)';
        }

        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d+$/.test(formData.phone)) {
            newErrors.phone = 'Phone number should contain only digits';
        }

        if (!formData.birthday) {
            newErrors.birthday = 'Birthday is required';
        }

        if (!formData.department) {
            newErrors.department = 'Department is required';
        }

        if (!formData.program) {
            newErrors.program = 'Program is required';
        }

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            console.log('User signed up:', formData);
            // I need to add form submission logic to backend
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                />
                {errors.firstName && <span>{errors.firstName}</span>}
            </div>

            <div>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                />
                {errors.lastName && <span>{errors.lastName}</span>}
            </div>

            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                {errors.email && <span>{errors.email}</span>}
            </div>

            <div>
                <input
                    type="text"
                    name="countryCode"
                    placeholder="Country Code (e.g., +1)"
                    onChange={handleChange}
                />
                {errors.countryCode && <span>{errors.countryCode}</span>}
            </div>

            <div>
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                />
                {errors.phone && <span>{errors.phone}</span>}
            </div>

            <div>
                <input
                    type="date"
                    name="birthday"
                    onChange={handleChange}
                />
                {errors.birthday && <span>{errors.birthday}</span>}
            </div>

            <div>
                <select name="department" onChange={handleChange}>
                    <option value="">Select Department</option>
                    <option value="Software Development">Software Development</option>
                </select>
                {errors.department && <span>{errors.department}</span>}
            </div>

            <div>
                <select name="program" onChange={handleChange}>
                    <option value="">Select Program</option>
                    <option value="Diploma">Diploma (2 years)</option>
                    <option value="Post-Diploma">Post-Diploma (1 year)</option>
                    <option value="Certificate">Certificate (6 months)</option>
                </select>
                {errors.program && <span>{errors.program}</span>}
            </div>

            <div>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />
                {errors.username && <span>{errors.username}</span>}
            </div>

            <div>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                {errors.password && <span>{errors.password}</span>}
            </div>

            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignupForm;
