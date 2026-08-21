import { forwardRef } from "react";
// All the paths for each plane as well as overlays for each path in the levels

// Main SVG containing the background of all the paths. Called SVGComponentTest but functions as the main SVG to overlay on
const SVGComponentTest = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="40 25 840 400"
        width="100%"
        height="100%"
        {...props}
    >
        <defs>
            <style bx:fonts="Ancizar Sans">
                {
                    "@import url(https://fonts.googleapis.com/css2?family=Ancizar+Sans%3Aital%2Cwght%400%2C100..1000%3B1%2C100..1000&display=swap);"
                }
            </style>
        </defs>

        {/* Labels & Numbers */}
        <g
            style={{
                fill: props.color ? `#${props.color}` : "#38bdf8",
                fontFamily: "'Ancizar Sans'",
                fontSize: 16,
                fontWeight: 500,
                textAnchor: "middle",
            }}
            >
            <text x={41.008} y={208.061} textAnchor="start">TO SFO</text>
            <text x={224.867} y={207.695}>MOD</text>
            <text x={433.778} y={210.809}>OAL</text>
            <text x={592.053} y={211.71} textAnchor="start">TPH</text>
            <text x={539.359} y={95.237} textAnchor="start">MINAH</text>
            <text x={539.175} y={363.237} textAnchor="start">LIDAT</text>
            <text x={52} y={248}>10</text>
            <text x={138.8} y={248}>5</text>
            <text x={225.6} y={248}>0</text>
            <text x={312.3} y={248}>5</text>
            <text x={399.1} y={248}>10</text>
            <text x={485.8} y={248}>15</text>
            <text x={572.5} y={248}>20</text>
            <text x={659.3} y={248}>25</text>
            <text x={746} y={248}>30</text>
            <text x={296} y={174}>5</text>
            <text x={372} y={136}>10</text>
            <text x={450} y={96}>15</text>
            <text x={296} y={284}>5</text>
            <text x={372} y={322}>10</text>
            <text x={450} y={362}>15</text>
            <text x={476.331} y={145.766}>5</text>
            <text x={475} y={318}>5</text>
            <text x={624.6} y={52}>25</text>
            <text x={710.7} y={44}>30</text>
            <text x={797.3} y={36}>35</text>
            <text x={859.252} y={64.112} textAnchor="start">40</text>
            <text x={791.537} y={103.595}>35</text>
            <text x={718.016} y={144.748}>30</text>
            <text x={646.26} y={195.237}>25</text>
            <text x={624.346} y={405.669}>25</text>
            <text x={708.511} y={414.334}>30</text>
            <text x={746} y={248}>30</text>
            <text x={797.713} y={422.454}>35</text>
            <text x={831.849} y={248.145}>35</text>
            <text x={534.73} y={59.886}>20</text>
            <text x={531.918} y={400.268}>20</text>
        </g>

        {/* Triangles */}
        <g
            style={{
                fill: props.color ? `#${props.color}` : "#38bdf8",
            }}
        >
            <path d="M 227.53,217.47 L 235.03,232.47 L 220.03,232.47 Z" />
            <path d="M 451.0,217.47 L 458.5,232.47 L 443.5,232.47 Z" />
            <path d="M 536.0,67.77 L 543.5,82.77 L 528.5,82.77 Z" />
            <path d="M 624.6,217.47 L 632.1,232.47 L 617.1,232.47 Z" />
            <path d="M 538.0,366.82 L 545.5,381.82 L 530.5,381.82 Z" />
        </g>
    </svg>
);



// Overlay ontop of main svg
const SVGComponent0 = (props) => (
    <svg
        xmlns="http://w3.org"
        viewBox="40 25 840 400"
        width="100%"
        height="100%"
        {...props}
    >
        <path
            style={{
                fill: "none",
                stroke: props.color ? `#${props.color}` : "#38bdf8",
                strokeWidth: "2px",
                strokeLinejoin: "square",
                strokeLinecap: "miter"
            }}
            d="M 52 225.6 L 225.6 225.6 M 225.6 225.6 L 451 225.6 M 451 225.6 L 624.6 225.6 M 867.48 225.6 L 624.6 225.6 M 536 75 L 225.6 225.6 M 538 375 L 451 225.6 L 536 75 M 538 375 L 225.6 225.6 M 538 375 L 849.818 402.584 M 536 75 L 849.821 47.451 M 624.6 225.6 L 879 75 M 52.042 235.121 L 52.05 225.55 M 138.792 235.121 L 138.8 225.55 M 312.3 235.121 L 312.308 225.55 M 399.05 235.121 L 399.058 225.55 M 485.792 235.121 L 485.8 225.55 M 572.542 235.121 L 572.55 225.55 M 659.3 235.121 L 659.308 225.55 M 746.042 235.121 L 746.05 225.55 M 832.8 235.121 L 832.808 225.55 M 710.681 401.731 L 710.881 390.087 M 797.9 409.353 L 798.1 397.709 M 624.6 394.24 L 624.8 382.596 M 299.71 271.917 L 304.051 262.785 M 377.359 309.317 L 381.7 300.185 M 456.095 347 L 460.436 337.868 M 299.652 178.738 L 303.993 187.87 M 377.358 140.672 L 381.699 149.804 M 455.89 102.747 L 460.231 111.879 M 624.6 55.699 L 624.8 67.343 M 710.688 48.137 L 710.888 59.781 M 797.259 40.869 L 797.459 52.513 M 650.366 198.722 L 655.042 207.551 M 724.994 154.993 L 729.67 163.822 M 799.873 110.608 L 804.549 119.437 M 874.457 66.714 L 879.133 75.543 M 69.4 225.551 L 69.4 231.992 M 86.75 231.99 L 86.75 225.55 M 104.1 231.991 L 104.1 225.55 M 121.45 231.991 L 121.45 225.55 M 156.15 231.991 L 156.15 225.55 M 173.5 231.991 L 173.5 225.55 M 190.85 231.991 L 190.85 225.55 M 208.2 231.991 L 208.2 225.55 M 260.25 231.991 L 260.25 225.55 M 277.6 231.991 L 277.6 225.55 M 294.95 231.991 L 294.95 225.55 M 242.9 231.991 L 242.9 225.55 M 329.65 231.991 L 329.65 225.55 M 347 231.991 L 347 225.55 M 364.35 231.991 L 364.35 225.55 M 381.7 231.991 L 381.7 225.55 M 416.4 231.991 L 416.4 225.55 M 433.75 231.991 L 433.75 225.55 M 468.45 231.991 L 468.45 225.55 M 503.15 231.991 L 503.15 225.55 M 520.5 231.991 L 520.5 225.55 M 537.85 231.991 L 537.85 225.55 M 555.2 231.991 L 555.2 225.55 M 589.9 231.991 L 589.9 225.55 M 607.249 231.991 L 607.25 225.55 M 641.95 231.99 L 641.95 225.55 M 676.651 231.991 L 676.651 225.55 M 694 231.991 L 694 225.55 M 711.351 231.991 L 711.35 225.55 M 728.7 231.991 L 728.7 225.55 M 763.401 231.991 L 763.4 225.55 M 780.75 231.991 L 780.75 225.55 M 798.1 231.99 L 798.1 225.55 M 815.452 231.991 L 815.451 225.55 M 238.505 212.206 L 241.531 218.199 M 253.881 204.7 L 256.907 210.693 M 269.703 196.852 L 272.729 202.845 M 285.017 189.316 L 288.043 195.309 M 316.237 174.3 L 319.263 180.293 M 332.356 166.453 L 335.382 172.446 M 347.84 159.369 L 350.866 165.362 M 363.534 151.918 L 366.56 157.911 M 394.754 136.435 L 397.78 142.428 M 410.11 129.096 L 413.136 135.089 M 425.679 121.451 L 428.705 127.444 M 441.628 113.698 L 444.654 119.691 M 472.593 98.108 L 475.619 104.101 M 488.076 90.411 L 491.102 96.404 M 503.687 83.496 L 506.713 89.489 M 519.212 75.266 L 522.238 81.259 M 555.2 66.739 L 555.676 73.479 M 572.55 65.131 L 573.026 71.871 M 589.9 63.645 L 590.376 70.385 M 607.25 62.23 L 607.726 68.97 M 641.474 58.811 L 641.95 65.551 M 658.824 57.567 L 659.3 64.307 M 675.819 55.875 L 676.295 62.615 M 693.524 54.147 L 694 60.887 M 727.833 51.005 L 728.309 57.745 M 745.206 49.934 L 745.682 56.674 M 762.405 47.965 L 762.881 54.705 M 779.846 46.55 L 780.322 53.29 M 555.199 383.618 L 555.65 376.043 M 572.098 385.197 L 572.549 377.622 M 589.899 386.66 L 590.35 379.085 M 607.249 388.287 L 607.7 380.712 M 641.95 391.672 L 642.401 384.097 M 659.3 392.877 L 659.75 385.302 M 675.828 394.667 L 676.279 387.092 M 693.549 395.969 L 694 388.394 M 728.249 399.05 L 728.7 391.475 M 745.599 400.494 L 746.05 392.919 M 762.949 402.023 L 763.4 394.448 M 779.826 403.651 L 780.277 396.076 M 238.182 239.264 L 241.113 232.984 M 253.795 246.69 L 256.726 240.41 M 269.496 253.707 L 272.427 247.427 M 284.843 261.59 L 287.774 255.309 M 316.211 276.584 L 319.142 270.304 M 332.134 283.88 L 335.065 277.6 M 347.45 291.002 L 350.381 284.722 M 363.214 299.012 L 366.145 292.732 M 394.774 313.943 L 397.705 307.663 M 410.089 321.345 L 413.02 315.065 M 426.013 328.65 L 428.944 322.37 M 441.745 336.275 L 444.676 329.995 M 472.953 351.334 L 475.884 345.054 M 488.845 358.832 L 491.776 352.552 M 504.16 366.126 L 507.091 359.846 M 520.18 373.719 L 523.111 367.439 M 711.333 166.274 L 714.596 172.064 M 696.67 174.954 L 699.933 180.744 M 681.226 184.445 L 684.489 190.235 M 665.98 193.176 L 669.243 198.966 M 636.268 211.201 L 639.531 216.991 M 741.203 149.516 L 744.466 155.306 M 756.015 140.141 L 759.278 145.931 M 772.265 131.141 L 775.528 136.931 M 786.139 122.953 L 789.402 128.743 M 816.013 105.267 L 819.276 111.057 M 831.2 95.954 L 834.463 101.744 M 845.887 87.58 L 849.15 93.37 M 860.449 78.455 L 863.712 84.245 M 485.798 144.6 L 493.6 149.791 M 479.299 161.808 L 485.456 165.182 M 470.936 176.871 L 477.093 180.245 M 462.608 191.504 L 468.765 194.878 M 453.355 206.617 L 459.512 209.991 M 496.275 131.214 L 502.431 134.588 M 505.294 116.025 L 511.451 119.399 M 513.729 101.149 L 519.885 104.523 M 521.654 85.882 L 527.811 89.256 M 486.217 304.903 L 494.019 299.712 M 480.064 288.087 L 485.421 284.527 M 471.347 273.13 L 476.704 269.57 M 462.16 258.268 L 467.517 254.708 M 453.945 242.9 L 459.302 239.34 M 497.152 318.303 L 502.509 314.743 M 506.558 333.21 L 511.915 329.65 M 515.142 348.058 L 520.499 344.498 M 523.364 362.763 L 528.721 359.203 M 814.682 43.75 L 815.274 50.484 M 831.956 42.233 L 832.547 48.967 M 849.23 40.717 L 849.821 47.451 M 814.605 407.078 L 815.273 399.528 M 831.877 408.606 L 832.545 401.056 M 849.15 410.134 L 849.818 402.584 M 850.14 231.991 L 850.14 225.55 M 867.48 231.991 L 867.48 225.55"
        />
        {props.children}
    </svg>
);

// Path 1
const SVGComponent1 = forwardRef((props, ref) => {
    const { color, children, ...restProps } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="40 25 840 400"
            width="100%"
            height="100%"
            {...restProps}
        >
            <path
                ref={ref}
                className="motion-track-1 fill-none"
                style={{
                    fill: "none",
                    stroke: `#${color || "000"}`,
                    strokeWidth: "3px",
                    strokeLinejoin: "round",
                    strokeLinecap: "round",
                }}
                d="M 52 225.6 L 225.6 225.6 L 536 75 L 798 52 L 849.821 47.451"
            />
            {children}
        </svg>
    );
});

SVGComponent1.displayName = "SVGComponent1";

// Internal Component Breakpoints with Waypoint Reference Names
SVGComponent1.breakpoints = {
    "10_END": 0.00,
    "FINISH_3": 17.35,
    "FINISH_2": 69.43,
    "5_END": 86.80,
    "FINISH_1": 121.51,
    "0_MOD": 173.59,
    "5_DESC": 251.85,
    "10_DESC": 336.32,
    "15_DESC": 423.02,
    "20_MINAH": 518.61,
    "25_INIT_DESC": 607.55,
    "30_INIT_DESC": 693.98,
    "35_START": 780.91
};

// Segment 1: 0px to 173.6px (TO SFO to MOD)
// Segment 2: 173.6px to 518.6px (MOD to MINAH)
// Segment 3: 518.6px to 781.6px (MINAH to START)
// Total 833.63 px Long (781.61 to 35_START, plus a 3 tick entry run past it)

// All Values in px (Label - Track : px)
// Segment 1
// 10 - End : 0
// 5 - End : 86.8
// 0 - MOD : 173.6
//Segment 2
// 5 -  Desc : 251.85
// 10 - Desc : 336.32
// 15 - Desc : 423.02
// 20 - MINAH : 518.61
//Segment 3
// 25 - Init Desc : 607.55
// 30 - Init Desc : 693.98
// 35 - Start : 780.91

// Each small tick is 17.36px long
// Each small tick in Diag is 17.34px long

// Path 2
const SVGComponent2 = forwardRef((props, ref) => {
    const { color, children, ...restProps } = props;
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="40 25 840 400"
        width="100%"
        height="100%"
        {...restProps}
        >
        <path
            ref={ref}
            className="motion-track-2 fill-none"
            style={{
                fill: "none",
                stroke: `#${color || "000"}`,
                strokeWidth: "3px",
                strokeLinejoin: "round",
                strokeLinecap: "round"
            }}
            d="M 52 225.6 L 225.6 225.6 L 451 225.6 L 536 75 L 798 52 L 849.821 47.451"
        />
            {children}
    </svg>
    );
});

SVGComponent2.breakpoints = {
    "10_END": 0.00,
    "FINISH_3": 17.35,
    "FINISH_2": 69.43,
    "5_END": 86.80,
    "FINISH_1": 121.51,
    "0_MOD": 173.59,
    "5_HORIZONTAL": 260.30,
    "10_HORIZONTAL": 347.10,
    "13_OAL": 399.00,
    "20_MINAH": 571.93,
    "25_INIT_DESC": 661.12,
    "30_INIT_DESC": 747.81,
    "35_START": 834.94
};

// Segment 1: 0px to 399.00px (TO SFO to OAL)
// Segment 2: 399.00px to 571.93px (OAL to MINAH)
// Segment 3: 571.93px to 834.94px (MINAH to START)
// 886.96 px Long (834.94 to 35_START, plus a 3 tick entry run past it)

// All Values in px (Label - Track : px)
// Segment 1
// 10 - End : 0
// 5 - End : 86.8
// 0 - MOD : 173.6
// 5 -  Horizontal : 260.30
// 10 - Horizontal : 347.10
// 13 - OAL : 399.00
// Segment 2
// 20 - MINAH : 571.93
// Segment 3
// 25 - Init Desc : 661.12
// 30 - Init Desc : 747.81
// 35 - Start : 834.94

// Each small tick is 17.36px long
// Each small tick on Diag drop is 34.59px long
SVGComponent2.displayName = "SVGComponent2";

// Path 3
const SVGComponent3 = forwardRef((props, ref) => {
    const { color, children, ...restProps } = props;
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="40 25 840 400"
        width="100%"
        height="100%"
        {...restProps}
        >
        <path
            ref={ref}
            className="motion-track-3 fill-none"
            style={{
                fill: "none",
                stroke: `#${color || "000"}`,
                strokeWidth: "3px",
                strokeLinejoin: "round",
                strokeLinecap: "round"
            }}
            d="M 52 225.6 L 225.6 225.6 L 538 375 L 798 398 L 849.818 402.584"
        />
            {children}
    </svg>
    );
});
SVGComponent3.breakpoints = {
    "10_END": 0.00,
    "FINISH_3": 17.35,
    "FINISH_2": 69.43,
    "5_END": 86.80,
    "FINISH_1": 121.51,
    "0_MOD": 173.59,
    "5_DESC": 251.81,
    "10_DESC": 336.26,
    "15_DESC": 422.92,
    "20_LIDAT": 519.89,
    "25_INIT_DESC": 606.31,
    "30_INIT_DESC": 693.42,
    "35_START": 780.90
};

// Segment 1: 0px to 173.6px (TO SFO to MOD)
// Segment 2: 173.6px to 518.6px (MOD to LIDAT)
// Segment 3: 518.6px to 781.6px (LIDAT to START)
// 832.92 px Long (780.90 to 35_START, plus a 3 tick entry run past it)

// All Values in px (Label - Track : px)
// Segment 1
// 10 - End : 0
// 5 - End : 86.8
// 0 - MOD : 173.6
// Segment 2
// 5 -  Desc : 251.81
// 10 - Desc : 336.26
// 15 - Desc : 422.92
// 20 - LIDAT : 519.89
// Segment 3
// 25 - Init Desc : 606.31
// 30 - Init Desc : 690.62
// 35 - Start : 780.90

// Each small tick is 17.36px long
// Each small tick in Diag is 17.34px long


SVGComponent3.displayName = "SVGComponent3";


// Path 4
const SVGComponent4 = forwardRef((props, ref) => {
    const { color, children, ...restProps } = props;
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="40 25 840 400"
        width="100%"
        height="100%"
        {...restProps}
    >
        <path
            ref={ref}
            className="motion-track-4 fill-none"
            style={{
                fill: "none",
                stroke: `#${color || "000"}`,
                strokeWidth: "3px",
                strokeLinejoin: "round",
                strokeLinecap: "round"
            }}
            d="M 52 225.6 L 225.6 225.6 L 451 225.6 L 538 375 L 798 398 L 849.818 402.584"
        />
        {children}
    </svg>
    );
});

SVGComponent4.breakpoints = {
    "10_END": 0.00,
    "FINISH_3": 17.35,
    "FINISH_2": 69.43,
    "5_END": 86.80,
    "FINISH_1": 121.51,
    "0_MOD": 173.59,
    "5_HORIZONTAL": 260.30,
    "10_HORIZONTAL": 347.10,
    "13_OAL": 399.00,
    "20_LIDAT": 571.89,
    "25_INIT_DESC": 658.31,
    "30_INIT_DESC": 745.42,
    "35_START": 832.90
};

// Segment 1: 0px to 173.6px (TO SFO to OAL)
// Segment 2: 173.6px to 518.6px (OAL to LIDAT)
// Segment 3: 518.6px to 781.6px (LIDAT to START)
// 884.92 px Long (832.90 to 35_START, plus a 3 tick entry run past it)

// All Values in px (Label - Track : px)
// Segment 1
// 10 - End : 0
// 5 - End : 86.8
// 0 - MOD : 173.6
// 5 -  Horizontal : 260.30
// 10 - Horizontal : 347.10
// 13 - OAL : 399.00
// Segment 2
// 20 - LIDAT : 571.89
// Segment 3
// 25 - Init Desc : 658.31
// 30 - Init Desc : 742.62
// 35 - Start : 832.90

// Each small tick is 17.36px long
// Each small tick in Diag is 39.75 px long
SVGComponent4.displayName = "SVGComponent4";

// Path 5
const SVGComponent5 = forwardRef((props, ref) => {
    const { color, children, ...restProps } = props;
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="40 25 840 400"
        width="100%"
        height="100%"
        {...restProps}
>
        <path
            ref={ref}
            className="motion-track-5 fill-none"
            style={{
                fill: "none",
                stroke: `#${color || "000"}`,
                strokeWidth: "3px",
                strokeLinejoin: "round",
                strokeLinecap: "round"
            }}
            d="M 52 225.6 L 225.6 225.6 L 451 225.6 L 625.489 225.155 L 879.889 74.555"
        />
            {children}
    </svg>
);
});

SVGComponent5.breakpoints = {
    "10_END": 0.00,
    "FINISH_3": 17.35,
    "FINISH_2": 69.43,
    "5_END": 86.80,
    "FINISH_1": 121.51,
    "SEP_1": 121.51,
    "0_MOD": 173.59,
    "5_HORIZONTAL": 260.30,
    "10_HORIZONTAL": 347.10,
    "13_OAL": 399.00,
    "15_HORIZONTAL": 433.72,
    "20_HORIZONTAL": 520.52,
    "23_TPH": 572.60,
    "25_INIT_DESC": 660.17,
    "30_INIT_DESC": 747.54,
    "35_START": 869.12
};

// Segment 1: 0px to 173.6px (TO SFO to TPH)
// Segment 2: 173.6px to 518.6px (TPH to START)
// 869.1239624023438 px Long (no entry run: the path already ends at the viewBox edge)

// All Values in px (Label - Track : px)
// Segment 1
// 10 - End : 0
// 5 - End : 86.8
// 0 - MOD : 173.6
// 5 -  Horizontal : 260.30
// 10 - Horizontal : 347.10
// 13 - OAL : 399.00
// Segment 2
// 20 - TPH : 573.49
// 25 - Init Desc : 667.65
// 30 - Init Desc : 742.45
// 35 - Start : 869.12

// Each small tick is 17.36px long
// Each small tick in Diag is 59.04 px long
SVGComponent5.displayName = "SVGComponent5";

// Path 6
const SVGComponent6 = forwardRef((props, ref) => {
    const { color, children, ...restProps } = props;
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="40 25 840 400"
        width="100%"
        height="100%"
        {...restProps}
    >
        <path
            ref={ref}
            className="motion-track-6 fill-none"
            style={{
                fill: "none",
                stroke: `#${color || "000"}`,
                strokeWidth: "3px",
                strokeLinejoin: "round",
                strokeLinecap: "round"
            }}
            d="M 52 225.6 L 225.6 225.6 L 451 225.6 L 624.6 225.6 L 832.8 225.6 L 867.48 225.6"
        />
            {children}
    </svg>
);
});
SVGComponent6.breakpoints = {
    "10_END": 0.00,
    "FINISH_3": 17.35,
    "FINISH_2": 69.43,
    "5_END": 86.80,
    "FINISH_1": 121.51,
    "SEP_1": 121.51,
    "0_MOD": 173.59,
    "5_HORIZONTAL": 260.30,
    "10_HORIZONTAL": 347.10,
    "13_OAL": 399.00,
    "15_HORIZONTAL": 433.72,
    "20_HORIZONTAL": 520.52,
    "23_TPH": 572.60,
    "25_HORIZONTAL": 607.30,
    "30_HORIZONTAL": 694.00,
    "35_START": 780.80
};

// Segment 1: 0px to 869.12px (TO SFO to START)
// 815.48 px Long (780.80 to 35_START, plus a 2 tick entry run past it)

// All Values in px (Label - Track : px)
// Segment 1
// 10 - End : 0
// 5 - End : 86.8
// 0 - MOD : 173.6
// 5 -  Horizontal : 260.30
// 10 - Horizontal : 347.10
// 13 - OAL : 399.00
// 20 - TPH : 572.60
// 25 - Horizontal : 607.30
// 30 - Horizontal : 694.00
// 35 - Start : 780.80

// Each small tick is 17.36px long
SVGComponent6.displayName = "SVGComponent6";

export {SVGComponent0, SVGComponent1, SVGComponent2, SVGComponent3, SVGComponent4, SVGComponent5, SVGComponent6, SVGComponentTest};