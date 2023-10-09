import React from "react";
import FlexRow from "../../../components/layout/FlexRow.tsx";
import FlexColumn from "../../../components/layout/FlexColumn.tsx";
import logo from "../../../assets/images/logo.png";

function AuthenticationWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <FlexRow
      aligned
      justified
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <FlexColumn sx={{ width: "50%", height: "100vh", background: "#F6F6F6" }}>
        <FlexColumn sx={{ height: "100vh", margin: "100px" }} aligned justified>
          {children}
        </FlexColumn>
      </FlexColumn>
      <FlexColumn aligned justified sx={{ width: "50%" }}>
        <img src={logo} style={{ width: "300px" }} />
      </FlexColumn>
    </FlexRow>
  );
}

export default AuthenticationWrapper;
