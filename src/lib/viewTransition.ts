export interface Point {
  x: number
  y: number
}

interface ViewTransitionLike {
  ready: Promise<void>
}

/** Applies a theme update and reveals it from a point when view transitions are available. */
export function runCircularReveal(update: () => void, origin?: Point) {
  const startViewTransition = document.startViewTransition as
    | ((update: () => void) => ViewTransitionLike)
    | undefined
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!origin || !startViewTransition || reducedMotion) {
    update()
    return
  }

  let updated = false
  const applyUpdate = () => {
    if (updated) return
    updated = true
    update()
  }

  let transition: ViewTransitionLike
  try {
    transition = startViewTransition.call(document, applyUpdate)
  } catch {
    applyUpdate()
    return
  }

  void transition.ready
    .then(() => {
      const x = origin.x
      const y = origin.y
      const radius = Math.max(
        Math.hypot(x, y),
        Math.hypot(window.innerWidth - x, y),
        Math.hypot(x, window.innerHeight - y),
        Math.hypot(window.innerWidth - x, window.innerHeight - y),
      )

      document.documentElement.animate(
        [
          { clipPath: `circle(0px at ${x}px ${y}px)` },
          { clipPath: `circle(${radius}px at ${x}px ${y}px)` },
        ],
        {
          duration: 600,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        } as KeyframeAnimationOptions,
      )
    })
    .catch(() => {})
}