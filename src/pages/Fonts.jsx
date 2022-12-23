import React from "react";
const Fonts = () => {
  const st =
    'qwertyuiop[]asdfghjkl;"|zxcvbnm,./QWERTYUIOP{}ASDFGHJKL:ZXCVBNM<>?/1234567890-=+_~!@#$%^&*()'.split(
      ""
    );
  return (
    <>
      {st.map((c, i) => (
        <div key={i} className="flex flex-row">
          <div className="flex-1">{c}</div>
          <div className="flex-1">
            <button
              className="icon-button icon-button_small"
              data-icon={c}
            ></button>
          </div>
        </div>
      ))}
    </>
  );
};
export default Fonts;
