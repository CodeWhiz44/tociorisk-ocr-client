import React from "react"
type Props = {
  size: number
}
export const BulkCopyIcon: React.FC<Props> = (props: Props) => {
  return (
    <svg
      width={props.size}
      height={props.size + 2}
      viewBox={`0 0 ${props.size} ${props.size + 2}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={props.size} height={props.size} rx="5" fill="#E5E5E5" />
      <g filter="url(#filter0_d_413_12013)">
        <path d="M9.28516 7.57031H23" stroke="#666666" />
        <path d="M9.28516 19.0005H23" stroke="#666666" />
        <path d="M9.28516 22.4302H23" stroke="#666666" />
        <rect x="7" y="7" width="1.1429" height="1.1429" fill="#666666" />
        <rect x="7" y="18.4302" width="1.1429" height="1.1429" fill="#666666" />
        <rect x="7" y="21.8599" width="1.1429" height="1.1429" fill="#666666" />
        <path
          d="M19.6957 16.1442C19.6957 16.4203 19.9196 16.6442 20.1957 16.6442C20.4719 16.6442 20.6957 16.4203 20.6957 16.1442H19.6957ZM20.6957 10.4297L20.6957 9.92969H19.6957L19.6957 10.4297L20.6957 10.4297ZM20.6957 16.1442L20.6957 10.4297L19.6957 10.4297L19.6957 16.1442H20.6957Z"
          fill="#666666"
        />
        <path
          d="M18.4301 13.8594L20.1445 16.1452L21.8588 13.8594"
          stroke="#666666"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_413_12013"
          x="3"
          y="7"
          width="24"
          height="24.0029"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_413_12013" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_413_12013"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}
