import axios from "axios";
import React, { useEffect } from "react";
import { verifyEmailApi } from "../const";
import { useNavigate, useSearchParams } from "react-router-dom";

const UserVerify = () => {
  let [query] = useSearchParams();
  let navigate = useNavigate();
  let token = query.get("token");
  let verifyEmail = async () => {
    try {
      let result = await axios({
        url: verifyEmailApi,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/login");
    } catch (e) {
      console.log("Error verifying email ", e);
    }
  };
  useEffect(() => {
    verifyEmail();
  }, []);
  return <div>UserVerify</div>;
};

export default UserVerify;
