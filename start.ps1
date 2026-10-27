$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$taskNode = (Get-Command node.exe -ErrorAction Stop).Source
$taskNpm = Join-Path (Split-Path $taskNode) 'node_modules/npm/bin/npm-cli.js'
if (-not (Test-Path -LiteralPath $taskNpm)) { throw '找不到 npm，请修复 Node.js 安装。' }
if (-not (Test-Path -LiteralPath 'node_modules/vite')) {
  & $taskNode $taskNpm install --cache (Join-Path $env:TEMP 'shixu-npm-cache')
  if ($LASTEXITCODE -ne 0) { throw '依赖安装失败。' }
}
& $taskNode $taskNpm run dev
