# Fix all forms to use inline styles with CSS variables

$propertyFormPath = "nextra-ui\src\components\forms\PropertyForm.tsx"
$clientFormPath = "nextra-ui\src\components\forms\ClientForm.tsx"
$dynamicFormPath = "nextra-ui-lib\src\components\common\DynamicForm.tsx"
$modalPath = "nextra-ui-lib\src\components\common\Modal.tsx"
$offCanvasLibPath = "nextra-ui-lib\src\components\common\OffCanvas.tsx"
$offCanvasAppPath = "nextra-ui\src\components\common\OffCanvas.tsx"
$loadingPath = "nextra-ui-lib\src\components\common\LoadingScreen.tsx"

function Fix-PropertyForm {
    $path = Join-Path $PSScriptRoot $propertyFormPath
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        
        # Fix section containers
        $content = $content -replace 'className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"', 'className="rounded-lg p-6 border" style={{ backgroundColor: ''var(--color-surface)'', borderColor: ''var(--color-border)'' }}'
        
        # Fix section headings
        $content = $content -replace 'className="text-lg font-semibold text-gray-900 dark:text-white mb-4"', 'className="text-lg font-semibold mb-4" style={{ color: ''var(--color-text)'' }}'
        
        # Fix labels
        $content = $content -replace 'className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"', 'className="block text-sm font-medium mb-1" style={{ color: ''var(--color-textSecondary)'' }}'
        
        # Fix inputs and selects
        $content = $content -replace 'className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"', 'className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary" style={{ backgroundColor: ''var(--color-background)'', color: ''var(--color-text)'', borderColor: ''var(--color-border)'' }}'
        
        # Fix textareas
        $content = $content -replace 'className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-y"', 'className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary resize-y" style={{ backgroundColor: ''var(--color-background)'', color: ''var(--color-text)'', borderColor: ''var(--color-border)'' }}'
        
        Set-Content $path $content -NoNewline
        Write-Host "Fixed PropertyForm.tsx" -ForegroundColor Green
    }
}

function Fix-ClientForm {
    $path = Join-Path $PSScriptRoot $clientFormPath
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        
        # Fix container
        $content = $content -replace 'className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-300 dark:border-gray-600"', 'className="rounded-lg p-6 border" style={{ backgroundColor: ''var(--color-surface)'', borderColor: ''var(--color-border)'' }}'
        $content = $content -replace 'className="bg-surface rounded-lg p-6 border border"', 'className="rounded-lg p-6 border" style={{ backgroundColor: ''var(--color-surface)'', borderColor: ''var(--color-border)'' }}'
        
        # Fix heading
        $content = $content -replace 'className="text-lg font-semibold text-gray-900 dark:text-white mb-4"', 'className="text-lg font-semibold mb-4" style={{ color: ''var(--color-text)'' }}'
        $content = $content -replace 'className="text-lg font-semibold text mb-4"', 'className="text-lg font-semibold mb-4" style={{ color: ''var(--color-text)'' }}'
        
        Set-Content $path $content -NoNewline
        Write-Host "Fixed ClientForm.tsx" -ForegroundColor Green
    }
}

function Fix-DynamicForm {
    $path = Join-Path $PSScriptRoot $dynamicFormPath
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        
        # Fix label
        $content = $content -replace 'className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"', 'className="block text-sm font-medium mb-1" style={{ color: ''var(--color-textSecondary)'' }}'
        
        # Fix cancel button
        $content = $content -replace 'className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"', 'className="px-6 py-2 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundColor: ''var(--color-surfaceHover)'', color: ''var(--color-text)'' }}'
        
        Set-Content $path $content -NoNewline
        Write-Host "Fixed DynamicForm.tsx" -ForegroundColor Green
    }
}

function Fix-Modal {
    $path = Join-Path $PSScriptRoot $modalPath
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        
        # Fix modal background
        $content = $content -replace 'className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl', 'className="rounded-lg shadow-2xl" style={{ backgroundColor: ''var(--color-surface)'' }} className="'
        $content = $content -replace 'className="bg-surface rounded-lg shadow-2xl', 'className="rounded-lg shadow-2xl" style={{ backgroundColor: ''var(--color-surface)'' }} className="'
        
        Set-Content $path $content -NoNewline
        Write-Host "Fixed Modal.tsx" -ForegroundColor Green
    }
}

function Fix-OffCanvas {
    param($path)
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        
        # Fix background
        $content = $content -replace 'className="relative bg-white dark:bg-gray-800 rounded-lg', 'className="relative rounded-lg" style={{ backgroundColor: ''var(--color-surface)'' }} className="'
        $content = $content -replace 'className="relative bg-surface rounded-lg', 'className="relative rounded-lg" style={{ backgroundColor: ''var(--color-surface)'' }} className="'
        
        Set-Content $path $content -NoNewline
        Write-Host "Fixed $(Split-Path $path -Leaf)" -ForegroundColor Green
    }
}

function Fix-LoadingScreen {
    $path = Join-Path $PSScriptRoot $loadingPath
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        
        # Fix loading overlay
        $content = $content -replace 'className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 z-50"', 'className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm" style={{ backgroundColor: ''var(--color-overlay)'' }}'
        $content = $content -replace 'className="fixed inset-0 flex items-center justify-center bg-white/80  z-50"', 'className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm" style={{ backgroundColor: ''var(--color-overlay)'' }}'
        
        # Fix text
        $content = $content -replace 'className="text-sm text-gray-700 dark:text-gray-300"', 'className="text-sm" style={{ color: ''var(--color-text)'' }}'
        $content = $content -replace 'className="text-sm text-gray-700 "', 'className="text-sm" style={{ color: ''var(--color-text)'' }}'
        
        Set-Content $path $content -NoNewline
        Write-Host "Fixed LoadingScreen.tsx" -ForegroundColor Green
    }
}

Write-Host "Starting fixes..." -ForegroundColor Cyan
Fix-PropertyForm
Fix-ClientForm
Fix-DynamicForm
Fix-Modal
Fix-OffCanvas (Join-Path $PSScriptRoot $offCanvasLibPath)
Fix-OffCanvas (Join-Path $PSScriptRoot $offCanvasAppPath)
Fix-LoadingScreen
Write-Host "`nAll files fixed with inline styles!" -ForegroundColor Cyan
