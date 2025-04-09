import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

function BackToTopBtn() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 bg-[#17A2DF] text-white border-none rounded-full p-2.5 cursor-pointer text-base z-[1000] shadow-[0_2px_5px_rgba(0,0,0,0.2)] transition-opacity duration-200 ${
        showTopBtn ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      data-testid="back-to-top-btn"
      aria-label="Back to top"
    >
      <FiArrowUp className="w-6 h-6" />
    </button>
  );
}

export default BackToTopBtn;
