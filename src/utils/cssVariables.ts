export function applyTheme(theme: string) { document.documentElement.dataset.theme = theme }
export function getCssVariable(name: string) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim() }
