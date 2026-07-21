import React from 'react';

// Forwarding refs so GSAP can see inside the component from Stage.jsx
const TestPath = React.forwardRef((props, ref) => {
    // We split our single passed ref into path and object targets
    const { pathRef, objectRef, children } = ref;

    return (
        <svg
            viewBox="0 0 800 400"
            width="100%"
            height="100%"
            className="overflow-visible"
            {...props}
        >
            {/* 1. The custom curve track */}
            <path
                ref={pathRef}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
                strokeDasharray="6 6"
                className="text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                d="M 50 200 C 200 50, 250 350, 400 200 C 550 50, 600 350, 750 200"
            />

            {/* 2. The moving frame container */}
            <g ref={objectRef}>
                {/* Background glow design elements */}
                <circle r="22" fill="#a855f7" opacity="0.3" className="blur-sm" />
                <rect
                    x="-15"
                    y="-15"
                    width="30"
                    height="30"
                    rx="6"
                    fill="#c084fc"
                    stroke="#fff"
                    strokeWidth="2"
                />
                <circle r="4" fill="#fff" />

                {/* Dynamically insert other graphics like LearnSVG if needed */}
                {children}
            </g>
        </svg>
    );
});

TestPath.displayName = "TestPath";
export { TestPath };
