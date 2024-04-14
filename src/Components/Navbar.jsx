import React from "react";

export default function Navbar({ handleSignOut }) {
  return (
    <div>
      <button onClick={() => handleSignOut()}>Sign Out</button>
    </div>
  );
}
