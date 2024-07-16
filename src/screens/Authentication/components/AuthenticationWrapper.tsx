import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexRow from "../../../components/layout/FlexRow.tsx";
import FlexColumn from "../../../components/layout/FlexColumn.tsx";
import logo from "../../../assets/images/logo.jpg";
import UseMediaQuery, {
  MEDIA_QUERY_BREAKPOINTS,
} from "../../../hooks/core/useMediaQuery.tsx";
import Tabs from "../../../components/navigation/Tabs.tsx";

function AuthenticationWrapper({ children }: { children?: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState("login");

  const [isDesktop] = UseMediaQuery(MEDIA_QUERY_BREAKPOINTS.MD);

  const currentRoute = location.pathname.split("/")[2];

  const handleChange = (_event: React.SyntheticEvent, value: string) => {
    setCurrentTab(value);
    navigate(`/auth/${value}`);
  };

  useEffect(() => {
    setCurrentTab(currentRoute);
  }, [currentRoute]);

  return (
    <FlexRow
      aligned
      justified
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <FlexColumn
        sx={{
          width: isDesktop ? "50%" : "100%",
          height: "100vh",
          background: "#F6F6F6",
        }}
      >
        {!isDesktop && (
          <FlexRow sx={{ paddingTop: "40px" }}>
            <img src={logo} style={{ width: "200px", marginBottom: "80px" }} />
          </FlexRow>
        )}
        <FlexColumn
          sx={{ height: "100vh", margin: isDesktop ? "100px" : "40px" }}
          aligned
          justified={isDesktop}
        >
          <FlexColumn
            sx={{ marginBottom: "40px", gap: "10px" }}
            aligned
            justified
          >
            <Tabs
              value={currentTab}
              onChange={handleChange}
              orientation="horizontal"
              tabs={[
                { label: "Entrar", value: "login" },
                { label: "Registrar", value: "register" },
              ]}
            />
          </FlexColumn>
          {children}
        </FlexColumn>
      </FlexColumn>
      {isDesktop && (
        <FlexColumn aligned justified sx={{ width: "50%" }}>
          LOGO
        </FlexColumn>
      )}
    </FlexRow>
  );
}

export default AuthenticationWrapper;
