import React from "react";

export const ProfileIcon = ({
  width = "24",
  height = "24",
  fill = "#ffffff",
  fillAlt = "#ffffff",
}) => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <rect width={width} height={height} fill="none" rx="0" ry="0" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.4 9C8.4 7.01178 10.0118 5.4 12 5.4C13.9882 5.4 15.6 7.01178 15.6 9C15.6 10.9882 13.9882 12.6 12 12.6C10.0118 12.6 8.4 10.9882 8.4 9ZM12 6.6C10.6745 6.6 9.6 7.67452 9.6 9C9.6 10.3255 10.6745 11.4 12 11.4C13.3255 11.4 14.4 10.3255 14.4 9C14.4 7.67452 13.3255 6.6 12 6.6Z"
        fill={fill}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 2.4C6.69807 2.4 2.4 6.69807 2.4 12C2.4 14.7455 3.55249 17.2218 5.40007 18.9715C5.40002 18.981 5.4 18.9905 5.4 19H5.43033C7.14765 20.6124 9.45849 21.6 12 21.6C14.5415 21.6 16.8523 20.6124 18.5697 19H18.6C18.6 18.9905 18.6 18.981 18.5999 18.9715C20.4475 17.2218 21.6 14.7455 21.6 12C21.6 6.69807 17.3019 2.4 12 2.4ZM18.3851 17.4583C19.6413 15.9902 20.4 14.0837 20.4 12C20.4 7.36081 16.6392 3.6 12 3.6C7.36081 3.6 3.6 7.36081 3.6 12C3.6 14.0837 4.35869 15.9902 5.6149 17.4583C6.28444 15.1152 8.44192 13.4 11 13.4H13C15.5581 13.4 17.7156 15.1152 18.3851 17.4583ZM6.63259 18.4618C8.0881 19.6721 9.95905 20.4 12 20.4C14.041 20.4 15.9119 19.6721 17.3674 18.4618C17.102 16.2856 15.2478 14.6 13 14.6H11C8.75215 14.6 6.89801 16.2856 6.63259 18.4618Z"
        fill={fillAlt}
      />
    </svg>
  );
};