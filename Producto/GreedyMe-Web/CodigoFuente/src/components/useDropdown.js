import React, { useState } from "react";

const useDropdown = (label, defaultState, list) => {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;

  const Dropdown = () => (
    <label htmlFor={id}>
      {label}
      <select
        id={id}
        value={value}
        onChange={(e) => setState(e.target.value)}
        onBlur={(e) => setState(e.target.value)}
        disabled={list.length === 0}
      >
        <option> All </option>
        {list.map((item) => (
          <option key={item} value={item}>
            {" "}
            {item}{" "}
          </option>
        ))}
      </select>
    </label>
  );

  return [state, Dropdown, setState];
};

export default useDropdown;