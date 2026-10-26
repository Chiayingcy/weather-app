export function runThemeTransition(update: () => void) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (typeof document.startViewTransition !== 'function' || reducedMotion) {
    update()
    return
  }

  const transition = document.startViewTransition(update)
  void transition.ready.catch(() => {})
}