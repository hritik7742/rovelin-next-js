Get-ChildItem -Path "src" -Recurse -Filter "*.tsx" | 
ForEach-Object {
    $content = Get-Content $_.FullName
    $hasAdUnit = $content | Select-String -Pattern "import.*AdUnit|<AdUnit"
    if ($hasAdUnit) {
        Write-Host "Processing $($_.FullName)..."
        $newContent = $content | 
            Where-Object { $_ -notmatch "import.*AdUnit" } |
            Where-Object { $_ -notmatch "\s*<AdUnit.*?/>" } |
            Where-Object { $_ -notmatch "\s*<AdUnit[\s\S]*?</AdUnit>" }
        $newContent | Set-Content $_.FullName
    }
}
