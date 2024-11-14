import React, { useState, ChangeEvent, FormEvent } from "react";
import {
    Checkbox,
    FormControlLabel,
    Button,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import { HiArrowLeft, HiEye, HiEyeOff } from "react-icons/hi";
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";

interface FormState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agree: boolean;
}

const SignupPage: React.FC = () => {
    const [form, setForm] = useState<FormState>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validateForm = (): boolean => {
        const formErrors: Record<string, string> = {};
        if (!form.firstName.trim()) formErrors.firstName = "First name is required.";
        if (!form.lastName.trim()) formErrors.lastName = "Last name is required.";
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
            formErrors.email = "Valid email is required.";
        if (form.password !== form.confirmPassword)
            formErrors.confirmPassword = "Passwords do not match.";
        if (!form.agree)
            formErrors.agree = "You must agree to the terms and conditions.";

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const config = { headers: { "Content-Type": "application/json" } };
            const response = await axios.post("http://localhost:8080", form, config);

            if (response.data.successful) {
                toast.success(`Welcome ${form.firstName}, you have signed up successfully!`);
                setForm({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    agree: false,
                });
            } else {
                toast.error("Sign up failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during sign up:", error);
            toast.error("Sign up failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = (): void => {
        setShowPassword((prev) => !prev);
    };

   

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#000a2c] relative">
            <div className="absolute top-4 left-4">
                <button className="flex items-center text-white hover:text-[#093c5e]">
                    <HiArrowLeft className="mr-2" /> Back
                </button>
            </div>
            <div className="bg-[#eeffff] w-full max-w-md p-8 shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                        />
                    </div>
                    <div className="mb-4">
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                        />
                    </div>
                    <div className="mb-4">
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </div>
                    <div className="mb-4">
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={togglePasswordVisibility} edge="end">
                                                {showPassword ? <HiEyeOff /> : <HiEye />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}

                            error={!!errors.password}
                            helperText={errors.password}
                        />
                    </div>
                    <div className="mb-4">
                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            fullWidth
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={togglePasswordVisibility} edge="end">
                                                {showPassword ? <HiEyeOff /> : <HiEye />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}

                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                        />
                    </div>
                    <div className="mb-4">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="agree"
                                    checked={form.agree}
                                    onChange={handleChange}
                                />
                            }
                            label="I agree to the terms and conditions"
                        />
                        {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}
                    </div>
                    <div className="mt-6">
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isLoading}
                            sx={{
                                backgroundColor: "#093c5e",
                                color: "white",
                                paddingY: 2,
                                "&:hover": { backgroundColor: "#093c5e" },
                            }}
                        >
                            {isLoading ? "Signing Up..." : "Sign Up"}
                        </Button>
                    </div>
                </form>
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default SignupPage;
