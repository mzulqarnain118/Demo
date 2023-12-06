import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({ loading, color, bg, overlay }) => {
    const override = {
      display: "block",
      margin: "0 auto",
      borderColor: color,
    };

    const containerStyle = {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 9999,
      background: overlay ? bg : "transparent",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    };
  return (
    <div style={overlay ? containerStyle : {}}>
      <ClipLoader
        color={color}
        loading={loading}
        css={override} // Use css prop instead of cssOverride
        size={150}
      />
    </div>
  );
};

// Set default color prop
Spinner.defaultProps = {
  color: "#ffffff",
  bg: "rgba(255, 255, 255, 0.8)",
};

export default Spinner;
//TODO:   CALLING WAY

      // <Spinner loading={loading} color={color} overlay={true} />;