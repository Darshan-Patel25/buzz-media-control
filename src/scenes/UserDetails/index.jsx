import { useEffect, useState } from "react";
import { Box, Button, useTheme, useMediaQuery, CircularProgress } from "@mui/material";
import { DownloadOutlined } from "@mui/icons-material";
import Cookies from "js-cookie";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import { url } from "globalbackendurl";
import StatBox from "components/StatBox";
import SelectOption from "components/SelectOption"

const UserDetails = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [postedPosts, setPostedPosts] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);

  const handleDownload = async (type) => {
    const setLoading = type === "pdf" ? setLoadingPdf : setLoadingExcel;
    const endpoint = type === "pdf" ? "/generate-pdf" : "/api/user/generate-excel";
    const fileName = type === "pdf" ? "Report.pdf" : "SocialMediaData.xlsx";
    
    setLoading(true);
    try {
      const response = await fetch(`${url}${endpoint}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error("Download Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPostedPosts = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) return console.error("Access token not found in cookies.");

        const response = await fetch(`${url}/api/schedule/show-posted-post`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) return console.error("Failed to fetch posted posts");

        const data = await response.json();
        setPostedPosts(data.data || []);
      } catch (error) {
        console.error("Error fetching posted posts:", error);
      }
    };
    fetchPostedPosts();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="User Details" subtitle="Add User Detail " />
        <Box display="flex" gap="10px">
          {["pdf", "excel"].map((type) => (
            <Button
              key={type}
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={() => handleDownload(type)}
              disabled={type === "pdf" ? loadingPdf : loadingExcel}
            >
              {type === "pdf" ? loadingPdf : loadingExcel ? (
                <CircularProgress size={20} sx={{ color: theme.palette.background.alt, mr: "10px" }} />
              ) : (
                <DownloadOutlined sx={{ mr: "10px" }} />
              )}
              {type === "pdf" ? (loadingPdf ? "Downloading..." : "Download PDF") : (loadingExcel ? "Downloading..." : "Download Excel")}
            </Button>
          ))}
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{ "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" } }}
      >
        
            <Box
          gridColumn="span 12"
          gridRow="span 5"
          backgroundColor={theme.palette.background.alt}
          p="0.5rem"
          borderRadius="0.55rem"
        >
           

           <form className="space-y-6 max-w-4xl ml-10 mt-3">
          
    

          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-slate-600">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mobile Number */}
          <div className="space-y-2">
            <label htmlFor="mobileNumber" className="block text-slate-600">
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              type="tel"
              className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-slate-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label htmlFor="address" className="block text-slate-600">
              Location
            </label>
            <textarea
              id="address"
              className="w-full border border-slate-300 rounded px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-slate-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
             <SelectOption /> 
          </div>


          <div className="space-y-2 w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <label htmlFor="password" className="block text-slate-600">
              Availabity Status
            </label>
            <select id="pet-select">
            <option value="">--Please choose status--</option>
            <option value="dog">Available</option>
            <option value="cat">Offline</option>
            <option value="hamster">Busy</option>

          </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded shadow-sm transition duration-200"
            >
              Add
            </button>
          </div>
        </form>
          
        </Box>
      </Box>
    </Box>
  );
};

export default UserDetails;