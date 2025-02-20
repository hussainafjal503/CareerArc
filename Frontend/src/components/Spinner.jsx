import React from "react";
import {ClipLoader} from 'react-spinners'

function Spinner() {
  return (
    <>
      <section
        style={{
          minHeight: "525px",
          display: "flex",
          justifyContent: "center",
          alignItems: "Center",
        }}
      >
		<ClipLoader size={150} data-testid="loader"/>
	  </section>
    </>
  );
}

export default Spinner;
