import * as React from "react";

const StartBtnSvg = ({ className = "", ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="87.08 27.553 142.92 82.447"
        width="100%"
        height="100%"
        className={className}
        {...props}
    >
        <path
            fill="var(--svg-shadow, #166534)"
            stroke="var(--svg-shadow, #166534)"
            strokeWidth="1"
            d="m89.08 109.496.046-59.943 20-20h120v60l-20 20z"
        />

        <path
            fill="var(--svg-fill, #22c55e)"
            stroke="var(--svg-fill, #22c55e)"
            fillRule="nonzero"
            d="M87.954 106.943 88 47l20-20h120v60l-20 20z"
        />
    </svg>
);

const ExtrasBtnSVG = ({ className = "", ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="155 225 82 52"
        width="100%"
        height="100%"
        className={className}
        {...props}
    >
        <path
            fill="var(--svg-shadow, #166534)"
            stroke="var(--svg-shadow, #166534)"
            strokeWidth="1"
            d="M 157.024 257.049 L 157 227 L 217 227 L 237 247 L 237 277 L 207 277 L 197 267 L 157 267 L 157.024 257.049 Z"
        />

        <path
            fill="var(--svg-fill, #22c55e)"
            stroke="var(--svg-fill, #22c55e)"
            fillRule="nonzero"
            d="M 155.024 255.049 L 155 225 L 215 225 L 235 245 L 235 275 L 205 275 L 195 265 L 155 265 L 155.024 255.049 Z"
        />
    </svg>
);


const OptionsBtnSVG = ({ className = "", ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="110 129.86 82 53.14"
        width="100%"
        height="100%"
        className={className}
        {...props}
    >
        <path
            fill="var(--svg-shadow, #166534)"
            stroke="var(--svg-shadow, #166534)"
            strokeWidth="1"
            d="M 132.174 183 L 112 172.86 L 112 142.86 L 132 132.86 L 192 132.86 L 192 182.86 L 132.174 183 Z"
        />
        <path
            fill="var(--svg-fill, #22c55e)"
            stroke="var(--svg-fill, #22c55e)"
            strokeWidth="1"
            fillRule="nonzero"
            d="M 130.174 180 L 110 169.86 L 110 139.86 L 130 129.86 L 190 129.86 L 190 179.86 L 130.174 180 Z"
        />
    </svg>
);


const BackBtnSVG = ({ className = "", ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="212.882 99.99 142.553 72.972"
        width="100%"
        height="100%"
        className={className}
        {...props}
    >
        <path
            fill="var(--svg-shadow, #166534)"
            stroke="var(--svg-shadow, #166534)"
            strokeWidth="1"
            d="M 215.412 172.962 L 215.435 142.952 L 225.435 132.952 L 225.435 102.952 L 345.435 102.952 L 355.435 112.952 L 355.435 162.952 L 255.435 162.952 L 245.435 172.952 L 215.412 172.962 Z"
        />
        <path
            fill="var(--svg-fill, #22c55e)"
            stroke="var(--svg-fill, #22c55e)"
            strokeWidth="1"
            fillRule="nonzero"
            d="M 212.882 170 L 212.905 139.99 L 222.905 129.99 L 222.905 99.99 L 342.905 99.99 L 352.905 109.99 L 352.905 159.99 L 252.905 159.99 L 242.905 169.99 L 212.882 170 Z"
        />
    </svg>
);

const QuitBtnSVG = ({ className = "", ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="177.178 156.611 162.822 103.389"
        width="100%"
        height="100%"
        className={className}
        {...props}
    >
        <path
            fill="var(--svg-shadow, #166534)"
            stroke="var(--svg-shadow, #166534)"
            strokeWidth="1"
            d="M 179.967 239.87 L 180 180 L 200 160 L 320 160 L 340 180 L 340 240 L 320 260 L 200 260 L 179.967 239.87 Z"
            transform="matrix(1, 0, 0, 1, -1.4210854715202004e-14, 0)"
        />
        <path
            fill="var(--svg-fill, #22c55e)"
            stroke="var(--svg-fill, #22c55e)"
            strokeWidth="1"
            fillRule="nonzero"
            d="M 177.178 236.481 L 177.211 176.611 L 197.211 156.611 L 317.211 156.611 L 337.211 176.611 L 337.211 236.611 L 317.211 256.611 L 197.211 256.611 L 177.178 236.481 Z"
            transform="matrix(1, 0, 0, 1, -1.4210854715202004e-14, 0)"
        />
    </svg>
);


export { StartBtnSvg, ExtrasBtnSVG, OptionsBtnSVG, BackBtnSVG, QuitBtnSVG };
