$ErrorActionPreference = "Stop"

$inputJson = [Console]::In.ReadToEnd()
$command = ""

try {
  if ($inputJson) {
    $payload = $inputJson | ConvertFrom-Json
    if ($payload.command) {
      $command = [string]$payload.command
    } elseif ($payload.tool_input -and $payload.tool_input.command) {
      $command = [string]$payload.tool_input.command
    }
  }
} catch {
  Write-Output '{ "permission": "allow" }'
  exit 0
}

if ($command -match "npm\s+run\s+check:i18n") {
  Write-Output '{ "permission": "allow" }'
  exit 0
}

$checkOutput = ""
try {
  $checkOutput = & npm run check:i18n 2>&1 | Out-String
  if ($LASTEXITCODE -eq 0) {
    Write-Output '{ "permission": "allow" }'
    exit 0
  }
} catch {
  $checkOutput = $_.Exception.Message
}

$msg = ($checkOutput -replace '"', "'") -replace '\r?\n', ' | '
$result = @{
  permission = "deny"
  user_message = "Sprachmix-Check fehlgeschlagen. Bitte zuerst 'npm run check:i18n' beheben. Details: $msg"
  agent_message = "Blocked by i18n guard hook because locale files contain mixed-language terms."
} | ConvertTo-Json -Compress

Write-Output $result
exit 0
