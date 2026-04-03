/**
 * Generate widget icons (icon.png, icon.dark.png, title.png, title.dark.png)
 * for each widget from Google Material Symbols Outlined.
 *
 * Usage: node scripts/generate-icons.mjs
 * Requires: sharp (npm install --no-save sharp)
 */

import { createRequire } from 'module'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const sharp = require('sharp')

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const LIGHT_COLOR = '#3F51B5'
const DARK_COLOR = '#C5CAE9'
const SIZE = 128
const PADDING = 20

const widgets = [
  { name: 'AXWebApp', pkg: 'ax-web-app', icon: 'web' },
  { name: 'AXLogo', pkg: 'ax-logo', icon: 'branding_watermark' },
  { name: 'AXTasksMenu', pkg: 'ax-tasks-menu', icon: 'assignment_late' },
  { name: 'AXNotifyMenu', pkg: 'ax-notify-menu', icon: 'notifications' },
  { name: 'AXUserMenu', pkg: 'ax-user-menu', icon: 'account_circle' },
  { name: 'AXSidebar', pkg: 'ax-sidebar', icon: 'view_sidebar' },
  { name: 'AXAgentChat', pkg: 'ax-agent-chat', icon: 'smart_toy' },
  { name: 'AXTextField', pkg: 'ax-text-field', icon: 'text_fields' },
  { name: 'AXButton', pkg: 'ax-button', icon: 'smart_button' },
  { name: 'AXButtonGroup', pkg: 'ax-button-group', icon: 'view_week' },
  { name: 'AXCheckbox', pkg: 'ax-checkbox', icon: 'check_box' },
  { name: 'AXRadioGroup', pkg: 'ax-radio-group', icon: 'radio_button_checked' },
  { name: 'AXSelect', pkg: 'ax-select', icon: 'arrow_drop_down_circle' },
  { name: 'AXSlider', pkg: 'ax-slider', icon: 'tune' },
  { name: 'AXSwitch', pkg: 'ax-switch', icon: 'toggle_on' },
  { name: 'AXToggleButton', pkg: 'ax-toggle-button', icon: 'toggle_off' },
]

async function fetchSvg(iconName) {
  const url = `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${iconName}/default/48px.svg`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to fetch ${iconName}: ${response.status}`)
  return response.text()
}

function buildSvg(rawSvg, color) {
  // Google Material Symbols SVGs have viewBox="0 -960 960 960" and contain <path d="..."/>
  // Extract paths
  const pathMatches = rawSvg.match(/<path[^>]*?d="[^"]*"[^>]*?\/?>/g) || []

  // Clean paths: remove any fill attrs, we set fill on the group
  const cleanedPaths = pathMatches.map((p) => p.replace(/\s*fill="[^"]*"/g, '')).join('\n    ')

  // Build new SVG: place the 960x960 content scaled into our 128x128 canvas with padding
  const innerSize = SIZE - PADDING * 2 // 88
  const scale = innerSize / 960

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <g transform="translate(${PADDING}, ${PADDING + innerSize}) scale(${scale}, ${scale})" fill="${color}">
    ${cleanedPaths}
  </g>
</svg>`
}

async function generateIcon(widget) {
  const srcDir = join(ROOT, 'packages', widget.pkg, 'src')

  console.log(`  Fetching ${widget.icon}...`)
  const rawSvg = await fetchSvg(widget.icon)

  for (const [suffix, color] of [
    ['icon.png', LIGHT_COLOR],
    ['icon.dark.png', DARK_COLOR],
    ['title.png', LIGHT_COLOR],
    ['title.dark.png', DARK_COLOR],
  ]) {
    const svg = buildSvg(rawSvg, color)
    const pngPath = join(srcDir, `${widget.name}.${suffix}`)

    await sharp(Buffer.from(svg))
      .resize(SIZE, SIZE)
      .png()
      .toFile(pngPath)
  }

  console.log(`  ✓ ${widget.name}`)
}

async function main() {
  console.log('Generating widget icons...\n')

  for (const widget of widgets) {
    console.log(`[${widget.name}]`)
    await generateIcon(widget)
  }

  console.log('\nAll icons generated!')
}

main().catch(console.error)
