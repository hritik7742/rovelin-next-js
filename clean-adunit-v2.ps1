Get-ChildItem -Path "src" -Recurse -Filter "*.tsx" | 
ForEach-Object {
    if ($_.FullName -notmatch "AdUnit.tsx") {
        $content = Get-Content $_.FullName
        $modified = $false
        
        # Join content into a single string
        $fullContent = $content -join "`n"
        
        # Remove AdUnit import
        if ($fullContent -match "import.*AdUnit") {
            $fullContent = $fullContent -replace "import\s+AdUnit\s+from\s+'@/components/AdUnit';\r?\n", ""
            $modified = $true
        }
        
        # Remove different types of AdUnit blocks
        $patterns = @(
            "(?ms)\s*{/\*\s*(Header|Content|Footer)\s*Ad.*?\*/}\s*<AdUnit[\s\S]*?/>",
            "(?ms)\s*<AdUnit\s+[^>]*?className=\s*[""'](header|content|footer)-ad[""'][^>]*?/>",
            "(?ms)\s*<AdUnit\s+[^>]*?adSlot=\s*[""'][^""']*?[""'][^>]*?/>"
        )
        
        foreach ($pattern in $patterns) {
            while ($fullContent -match $pattern) {
                $fullContent = $fullContent -replace $pattern, ""
                $modified = $true
            }
        }
        
        if ($modified) {
            Write-Host "Cleaning $($_.FullName)..."
            # Remove extra blank lines
            $fullContent = $fullContent -replace "(?m)^\s*[\r\n]+", "`n"
            $fullContent | Set-Content $_.FullName -NoNewline
        }
    }
}
