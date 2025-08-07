import React, { useState } from 'react'
import CTAButton from "./Button"
import HighlightText from './HighlightText'
import { FaArrowRight } from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroudGradient, codeColor
}) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);

    return (
        <div className={`flex ${position} my-20 justify-between gap-10`}>
            
            {/* LEFT Section */}
            <div className='w-[50%] flex flex-col gap-8'>
                {heading}
                <div className='text-gray-200 font-bold'>
                    {subheading}
                </div>
                <div className='flex gap-7 mt-7'>
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className='flex gap-2 items-center'>
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>

                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </CTAButton>
                </div>
            </div>

            {/* RIGHT Section: Code Block */}
            <div
                className='h-fit  flex flex-row text-10[px] w-[100%] py-4 lg:w-[500px]'
                onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setMousePos({
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top
                    });
                }}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
            >

                {/* LINE NUMBERS */}
                <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
        </div>

                {/* CODE BLOCK */}
                <div
                    className={`w-[90%] font-bold font-mono ${codeColor} relative rounded-md p-4 transition-all duration-300 shadow-glow`}
                    style={{
  maskImage: hovering
    ? `radial-gradient(circle 60px at ${mousePos.x}px ${mousePos.y}px, white 99%, transparent 100%)`
    : "none",
  WebkitMaskImage: hovering
    ? `radial-gradient(circle 60px at ${mousePos.x}px ${mousePos.y}px, white 99%, transparent 100%)`
    : "none",
 backgroundColor: "#1e1e2f",
    
  transition: "mask-image 0.1s ease, background-color 0.3s ease",
}}

                >
                    <TypeAnimation
                        sequence={[codeblock, 2000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={{
                            whiteSpace: "pre-line",
                            display: "block",
                        }}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default CodeBlocks
