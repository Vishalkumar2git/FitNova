import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Paper, Snackbar, Alert } from "@mui/material";
import CommonForm from "../components/common/form";
import { loginFormControls } from "../config";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/auth-slice";

const initialstate = {

  email: '',
  password: ''
};

function Login() {
  const [formData, setFormData] = useState(initialstate);
  const dispatch = useDispatch();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })
  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        setSnackbar({
          open: true,
          message: data?.payload?.message,
          severity: "success",
        });
        setTimeout(() => {

        }, 4000);
      } else {
        setSnackbar({
          open: true,
          message: data?.payload?.message || "Registration failed!",
          severity: "error",
        });
      }
    });
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Paper elevation={3} sx={{ width: 400, p: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" align="center">
          Sign in to your account
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          Don`t have an account?{" "}
          <Link to="/layout/register" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: '700' }}>
            Register
          </Link>
        </Typography>
        <Box sx={{ mt: 4 }}>
          <CommonForm
            formControls={loginFormControls}
            buttonText="Sign in"
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

export default Login;
