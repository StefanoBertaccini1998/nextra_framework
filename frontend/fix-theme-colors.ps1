# Fix all theme colors to use CSS variables

$files = @(
    "nextra-ui\src\components\forms\PropertyForm.tsx",
    "nextra-ui\src\components\forms\ClientForm.tsx",
    "nextra-ui\src\components\common\OffCanvas.tsx",
    "nextra-ui-lib\src\components\common\Modal.tsx",
    "nextra-ui-lib\src\components\common\OffCanvas.tsx",
    "nextra-ui-lib\src\components\common\LoadingScreen.tsx",
    "nextra-ui-lib\src\components\common\DynamicForm.tsx"
)

foreach ($file in $files) {
    $path = Join-Path $PSScriptRoot $file
    if (Test-Path $path) {
        Write-Host "Fixing $file..."
        $content = Get-Content $path -Raw
        
        # Replace common patterns
        $content = $content -replace 'bg-white dark:bg-gray-800', 'bg-surface'
        $content = $content -replace 'bg-white dark:bg-gray-700', 'bg-background'
        $content = $content -replace 'text-gray-900 dark:text-white', 'text'
        $content = $content -replace 'text-gray-700 dark:text-gray-300', 'text-secondary'
        $content = $content -replace 'border-gray-300 dark:border-gray-600', 'border'
        $content = $content -replace 'border border-gray-300 dark:border-gray-600', 'border border'
        $content = $content -replace 'dark:bg-gray-900/80', ''
        $content = $content -replace 'dark:border-gray-700', ''
        $content = $content -replace 'dark:text-gray-300', ''
        
        Set-Content $path $content -NoNewline
        Write-Host "Fixed $file" -ForegroundColor Green
    }
}

Write-Host "`nAll files fixed!" -ForegroundColor Cyan
