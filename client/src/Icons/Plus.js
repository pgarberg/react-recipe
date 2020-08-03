import React from "react";

export default class Plus extends React.Component {
  render() {
    return (
      <svg width="24" height="24">
        <rect width="24" height="24" fill="none" rx="0" ry="0" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6 2H18C20.21 2 22 3.79 22 6V18C22 20.21 20.21 22 18 22H6C3.79 22 2 20.21 2 18V6C2 3.79 3.79 2 6 2ZM12 17.5C11.45 17.5 11 17.05 11 16.5V13H7.5C6.95 13 6.5 12.55 6.5 12C6.5 11.45 6.95 11 7.5 11H11V7.5C11 6.95 11.45 6.5 12 6.5C12.55 6.5 13 6.95 13 7.5V11H16.5C17.05 11 17.5 11.45 17.5 12C17.5 12.55 17.05 13 16.5 13H13V16.5C13 17.05 12.55 17.5 12 17.5Z"
          fill="#f6f6f2"
        />
      </svg>
    );
  }
}
