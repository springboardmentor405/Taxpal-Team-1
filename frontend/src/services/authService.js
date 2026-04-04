// const BASE_URL = "http://localhost:5000";

// export const loginUser = async (email, password) => {
//   const response = await fetch(`${BASE_URL}/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password })
//   });
//   return response.json();
// };

// export const sendRegisterOTP = async (username, email, password) => {
//   const response = await fetch(`${BASE_URL}/send-register-otp`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, email, password })
//   });
//   return response.json();
// };

// export const verifyRegisterOTP = async (email, otp) => {
//   const response = await fetch(`${BASE_URL}/verify-register-otp`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, otp })
//   });
//   return response.json();
// };

const BASE_URL = "http://localhost:5000";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Login failed",
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      message: "Server connection error",
    };
  }
};

export const sendRegisterOTP = async (username, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/send-register-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to send OTP",
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      message: "Server connection error",
    };
  }
};

export const verifyRegisterOTP = async (email, otp) => {
  try {
    const response = await fetch(`${BASE_URL}/verify-register-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "OTP verification failed",
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      message: "Server connection error",
    };
  }
};

export const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/api/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch dashboard data",
        user: {},
        transactions: [],
      };
    }

    return {
      success: true,
      user: data.user || {},
      transactions: data.transactions || [],
    };
  } catch (error) {
    return {
      success: false,
      message: "Server connection error",
      user: {},
      transactions: [],
    };
  }
};