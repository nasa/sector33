export function SimpleBox({ className = "" }) {
    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="52 40.869 827.157 368.484"
        >
            <rect
                className={className}
                width="12"
                height="12"
                x="-6"
                y="-6"
                fill="#34d399"
            />
        </svg>
    );
}
