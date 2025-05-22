import { useState, useEffect } from "react";
import axios from "axios";

const useAdvice = () => {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.adviceslip.com/advice", { cache: "no-cache" });
      setAdvice(response.data.slip.advice);
    } catch (error) {
      console.error("Failed to fetch advice", error);
      setAdvice("Stay healthy and positive!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return { advice, loading, fetchAdvice };
};

export default useAdvice;
