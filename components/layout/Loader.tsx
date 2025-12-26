type LoaderProps = {
  message?: string
  timeoutMessage?: string
  colorClass?: string
  fullScreen?: boolean
}

export function Loader({
  message = 'Cargando…',
  timeoutMessage = 'Estamos tomando más tiempo de lo habitual...',
  colorClass = 'text-merlot',
  fullScreen = true,
}: LoaderProps) {
  return (
    <div
      className={
        fullScreen
          ? 'flex h-screen items-center justify-center'
          : 'flex items-center justify-center'
      }
    >
      <div className="w-full max-w-xs text-center">
        <svg
          className={`mx-auto mb-6 h-32 w-32 ${colorClass}`}
          viewBox="0 0 128 128"
          aria-label="Loading"
          role="img"
        >
          <g
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          >
            <g className="stroke-black/10 dark:stroke-white/10">
              <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
              <circle cx="43" cy="111" r="13" />
              <circle cx="102" cy="111" r="13" />
            </g>

            <g className="cart-lines">
              <polyline
                className="cart-top"
                points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                strokeDasharray="338 338"
                strokeDashoffset="-338"
              />

              <g className="cart-wheel-1">
                <circle
                  className="cart-wheel-stroke"
                  cx="43"
                  cy="111"
                  r="13"
                  strokeDasharray="81.68 81.68"
                  strokeDashoffset="81.68"
                />
              </g>

              <g className="cart-wheel-2">
                <circle
                  className="cart-wheel-stroke"
                  cx="102"
                  cy="111"
                  r="13"
                  strokeDasharray="81.68 81.68"
                  strokeDashoffset="81.68"
                />
              </g>
            </g>
          </g>
        </svg>

        <div className="relative h-6 text-sm">
          <p className="loader-msg absolute inset-0">{message}</p>
          <p className="loader-msg loader-msg-last absolute inset-0">
            {timeoutMessage}
          </p>
        </div>
      </div>
    </div>
  )
}
