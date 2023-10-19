import React from "react";

class BackToTopButton extends React.Component {
  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  render() {
    return (
      <button className="back-to-top" onClick={this.scrollToTop}>
        👆
      </button>
    );
  }
}

export default BackToTopButton;
