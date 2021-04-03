import React from "react";

export const Layout = ({ children }) => (
  <div style={{ color: "white" }}>
    <div style={{ margin: "20px", display: 'flex', justifyContent: "flex-end" }}>
      <input style={{ width: '300px', height: '25px', backgroundColor: '#737373', borderRadius: '2px' }}/>
    </div>
    {children}
  </div>
);
