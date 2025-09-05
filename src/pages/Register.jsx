import { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { Box, Typography, Paper, Alert, Snackbar, } from "@mui/material";
import CommonForm from "../components/common/form";
import { registerFormControls } from "../config";
import { useDispatch } from "react-redux";
import { register } from "../store/auth-slice";

const initialstate = {
  userName: '',
  email: '',
  password: ''
};

function Register() {
  const [formData, setFormData] = useState(initialstate);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })
  function onSubmit(event) {
    event.preventDefault();
    // Handle form submission logic

    dispatch(register(formData)).then((data) => {
      if (data?.payload?.success) {
        setSnackbar({
          open: true,
          message: data?.payload?.message,
          severity: "success",
        });
        setTimeout(() => {
          navigate("/layout/login");
        }, 4000);
      } else {
        setSnackbar({
          open: true,
          message: data?.payload?.message || "Registration failed!",
          severity: "error",
        });
      }
    })
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Paper elevation={3} sx={{ width: 400, p: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" align="center">
          Create new account
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          Already have an account?{" "}
          <Link to="/layout/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: '700' }}>
            Login
          </Link>
        </Typography>
        <Box sx={{ mt: 4 }}>
          <CommonForm
            formControls={registerFormControls}
            buttonText="Sign Up"
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
          />
        </Box>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Register;
