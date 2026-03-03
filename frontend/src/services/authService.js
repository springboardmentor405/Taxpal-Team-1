const BASE_URL = "http://localhost:5000";

export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

export const sendRegisterOTP = async (username, email, password) => {
  const response = await fetch(`${BASE_URL}/send-register-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });
  return response.json();
};

export const verifyRegisterOTP = async (email, otp) => {
  const response = await fetch(`${BASE_URL}/verify-register-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp })
  });
  return response.json();
};