import { useRef } from "react";
import Banner from "../assets/Images/banner1.mp4";

export default function InteractiveVideo() {
  const videoContainerRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = videoContainerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 20;
    const rotateY = (x - centerX) / 20;

    // Check if dark mode is active by checking the root class
    const isDark = document.documentElement.classList.contains("dark");

    container.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    container.style.boxShadow = isDark
      ? "0 0 25px rgba(255, 215, 0, 0.2)"
      : "0 0 25px rgba(0, 0, 0, 0.15)";
  };

  const handleMouseLeave = () => {
    const container = videoContainerRef.current;
    container.style.transform = `perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)`;
    container.style.boxShadow = `none`;
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div
        ref={videoContainerRef}
        className="rounded-xl overflow-hidden transition-all duration-300 w-full max-w-4xl bg-white dark:bg-richblack-800"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <video
          muted
          autoPlay
          loop
          playsInline
          className="w-full h-auto object-cover pointer-events-none"
        >
          <source src={Banner} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
