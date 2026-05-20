import { useState } from "react";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    email: "",
    otp: "",
    newPassword: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    const res = await fetch("http://localhost:5000/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: data.email })
    });

    const result = await res.json();
    alert(result.message);
    setStep(2);
  };

  const resetPassword = async () => {
    const res = await fetch("http://localhost:5000/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);
  };

  return (
    <div className="bg-green-800 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl w-80">

        {step === 1 && (
          <>
            <h2 className="text-xl mb-4">Enter Email</h2>
            <input
              name="email"
              onChange={handleChange}
              className="w-full border p-2 mb-4"
            />
            <button onClick={sendOtp} className="w-full bg-green-700 text-white p-2 rounded">
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl mb-4">Reset Password</h2>
            <input name="otp" placeholder="Enter OTP" onChange={handleChange} className="w-full border p-2 mb-2"/>
            <input name="newPassword" placeholder="New Password" onChange={handleChange}className="w-full border p-2 mb-4" />
            <button onClick={resetPassword}className="w-full bg-green-700 text-white p-2 rounded">
              Reset Password
            </button>
          </>
        )}

      </div>
    </div>
  );
}