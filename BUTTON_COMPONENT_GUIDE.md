# Enhanced Button Component - Usage Guide
**Version**: 2.0 (Phase 3 Complete)  
**Date**: November 22, 2025  
**Library**: @nextra/ui-lib

---

## 🎯 Overview

The enhanced Button component is a **production-ready, accessible, and performant** button system that follows industry best practices. It supports:

✅ **7 Semantic Variants** - Clear intent for every action  
✅ **Loading States** - Built-in spinner with accessibility  
✅ **Icon Support** - Start/end icons with proper spacing  
✅ **Full Accessibility** - ARIA attributes, keyboard navigation  
✅ **Theme Integration** - CSS variables for easy customization  
✅ **Performance Optimized** - React.forwardRef, minimal re-renders  
✅ **Smooth Animations** - Subtle hover/active effects (200ms transitions)

---

## 📦 Installation

Already available in `@nextra/ui-lib`:

```tsx
import { Button } from '@nextra/ui-lib';
```

---

## 🎨 Semantic Variants

### 1. **primary** - Main Actions
Use for the most important action on a screen.

```tsx
<Button variant="primary" onClick={handleSave}>
  Save Changes
</Button>
```

**Examples**: Save, Submit, Continue, Confirm, Next Step

---

### 2. **secondary** - Alternative Actions
Use for secondary importance actions.

```tsx
<Button variant="secondary" onClick={handleEdit}>
  Edit Profile
</Button>
```

**Examples**: Edit, Modify, Update, Change

---

### 3. **success** - Positive/Creative Actions
Use for actions that create or add something positive.

```tsx
<Button 
  variant="success" 
  startIcon={<PlusIcon className="w-5 h-5" />}
  onClick={handleCreate}
>
  Add New Client
</Button>
```

**Examples**: Create, Add, Approve, Enable, Activate, Publish

**Color**: `--color-success` (default: #10B981 / green-500)

---

### 4. **danger** - Destructive Actions
Use for actions that delete or permanently remove data.

```tsx
<Button 
  variant="danger" 
  onClick={handleDelete}
  startIcon={<TrashIcon className="w-5 h-5" />}
>
  Delete Property
</Button>
```

**Examples**: Delete, Remove, Revoke, Terminate, Cancel Subscription

**Color**: `--color-error` (default: #EF4444 / red-500)

⚠️ **Best Practice**: Always pair with confirmation dialog

---

### 5. **warning** - Caution Actions
Use for actions that need user attention but aren't destructive.

```tsx
<Button 
  variant="warning" 
  onClick={handleArchive}
>
  Archive Client
</Button>
```

**Examples**: Archive, Reset, Disable (reversible), Pause

**Color**: `--color-warning` (default: #F59E0B / yellow-500)

---

### 6. **outline** - Secondary Emphasis
Use for actions with lower emphasis or as cancel buttons.

```tsx
<div className="flex gap-2">
  <Button variant="outline" onClick={onCancel}>
    Cancel
  </Button>
  <Button variant="primary" onClick={onSubmit}>
    Submit
  </Button>
</div>
```

**Examples**: Cancel, Go Back, Skip, View Details

---

### 7. **ghost** - Minimal Emphasis
Use for tertiary actions or navigation.

```tsx
<Button variant="ghost" onClick={handleClose}>
  Close
</Button>
```

**Examples**: Close, Dismiss, More Options, Settings

---

## 🔄 Loading States

Show progress for async operations:

```tsx
function SaveButton() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveData();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button 
      variant="primary" 
      isLoading={isSaving}
      onClick={handleSave}
    >
      {isSaving ? 'Saving...' : 'Save Changes'}
    </Button>
  );
}
```

**Features**:
- ✅ Automatically disables button
- ✅ Shows animated spinner
- ✅ Hides start/end icons during loading
- ✅ Sets `aria-busy="true"` for screen readers

---

## 🎯 Icons

Add visual context with icons:

```tsx
import { 
  PlusIcon, 
  TrashIcon, 
  ArrowRightIcon,
  CheckIcon 
} from '@heroicons/react/24/outline';

// Start icon (left side)
<Button 
  variant="success" 
  startIcon={<PlusIcon className="w-5 h-5" />}
>
  Add Client
</Button>

// End icon (right side)
<Button 
  variant="primary" 
  endIcon={<ArrowRightIcon className="w-5 h-5" />}
>
  Continue
</Button>

// Both icons
<Button 
  variant="success" 
  startIcon={<CheckIcon className="w-5 h-5" />}
  endIcon={<ArrowRightIcon className="w-5 h-5" />}
>
  Confirm & Continue
</Button>
```

**Icon Sizing**:
- Small buttons: `w-4 h-4`
- Medium buttons: `w-5 h-5`
- Large buttons: `w-6 h-6`

---

## 📏 Sizes

```tsx
<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>  {/* Default */}
<Button size="lg">Large Button</Button>
```

**Dimensions**:
- **sm**: 32px height, text-sm, px-3 py-1.5
- **md**: 40px height, text-base, px-4 py-2 (default)
- **lg**: 48px height, text-lg, px-6 py-3

---

## 🎨 Active States

Show selected/active state:

```tsx
function TabButton({ isActive, children, onClick }) {
  return (
    <Button 
      variant="ghost" 
      isActive={isActive}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

// Usage in tabs
<div className="flex gap-2">
  <TabButton isActive={tab === 'overview'} onClick={() => setTab('overview')}>
    Overview
  </TabButton>
  <TabButton isActive={tab === 'details'} onClick={() => setTab('details')}>
    Details
  </TabButton>
</div>
```

**Visual Effect**: Ring, shadow, and slight scale increase

---

## 📐 Full Width

Stretch button to container width:

```tsx
<Button variant="primary" fullWidth>
  Sign In
</Button>
```

**Use Cases**: Forms, modals, mobile layouts

---

## ♿ Accessibility

Built-in accessibility features:

```tsx
<Button
  variant="danger"
  onClick={handleDelete}
  aria-label="Delete property listing"
  title="Permanently delete this property"
>
  Delete
</Button>
```

**Features**:
- ✅ Keyboard navigation (Enter/Space)
- ✅ Focus ring (2px with offset)
- ✅ `aria-busy` for loading states
- ✅ `aria-pressed` for active states
- ✅ `aria-hidden` on icons
- ✅ Disabled state with `disabled:cursor-not-allowed`

---

## 🎭 Common Patterns

### Pattern 1: Form Actions

```tsx
<div className="flex gap-3 justify-end">
  <Button variant="outline" onClick={onCancel}>
    Cancel
  </Button>
  <Button 
    variant="primary" 
    type="submit"
    isLoading={isSubmitting}
  >
    {isSubmitting ? 'Saving...' : 'Save Property'}
  </Button>
</div>
```

---

### Pattern 2: Confirmation Actions

```tsx
<div className="flex gap-3">
  <Button 
    variant="outline" 
    onClick={() => setShowConfirm(false)}
  >
    No, Cancel
  </Button>
  <Button 
    variant="danger" 
    onClick={handleConfirmedDelete}
    startIcon={<TrashIcon className="w-5 h-5" />}
  >
    Yes, Delete
  </Button>
</div>
```

---

### Pattern 3: Action List

```tsx
<div className="flex gap-2">
  <Button 
    variant="success" 
    size="sm"
    startIcon={<PlusIcon className="w-4 h-4" />}
    onClick={handleCreate}
  >
    Add
  </Button>
  <Button 
    variant="secondary" 
    size="sm"
    onClick={handleEdit}
  >
    Edit
  </Button>
  <Button 
    variant="danger" 
    size="sm"
    startIcon={<TrashIcon className="w-4 h-4" />}
    onClick={handleDelete}
  >
    Delete
  </Button>
</div>
```

---

### Pattern 4: Loading with State Change

```tsx
function CreateClientButton() {
  const [isCreating, setIsCreating] = useState(false);
  const { addToast } = useToast();

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      await createClient(formData);
      addToast('success', 'Client created successfully');
    } catch (error) {
      addToast('error', 'Failed to create client');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Button 
      variant="success" 
      isLoading={isCreating}
      onClick={handleCreate}
      startIcon={!isCreating && <PlusIcon className="w-5 h-5" />}
    >
      {isCreating ? 'Creating Client...' : 'Create Client'}
    </Button>
  );
}
```

---

## 🎨 Theme Customization

Customize colors via CSS variables:

```css
/* In your theme CSS */
:root {
  --color-success: #059669;      /* Custom green */
  --color-error: #DC2626;        /* Custom red */
  --color-warning: #D97706;      /* Custom orange */
  --color-primary: #0066CC;      /* Custom blue */
  --color-secondary: #6B46C1;    /* Custom purple */
}

/* Dark theme */
.dark {
  --color-success: #34D399;
  --color-error: #F87171;
  --color-warning: #FBBF24;
}
```

---

## ⚡ Performance Tips

1. **Use React.memo for lists**:
```tsx
const MemoizedButton = React.memo(Button);

// In list renders:
{items.map(item => (
  <MemoizedButton 
    key={item.id} 
    variant="ghost"
    onClick={() => handleClick(item.id)}
  >
    {item.name}
  </MemoizedButton>
))}
```

2. **Avoid inline arrow functions**:
```tsx
// ❌ Bad - Creates new function every render
<Button onClick={() => handleClick(id)}>Click</Button>

// ✅ Good - Use useCallback
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

<Button onClick={handleClick}>Click</Button>
```

3. **Use forwardRef for advanced patterns**:
```tsx
const buttonRef = useRef<HTMLButtonElement>(null);

<Button 
  ref={buttonRef}
  variant="primary"
  onClick={() => buttonRef.current?.focus()}
>
  Save
</Button>
```

---

## 🐛 Troubleshooting

### Button not showing correct colors?

**Solution**: Ensure CSS variables are defined in your theme:

```css
:root {
  --color-success: #10B981;
  --color-error: #EF4444;
  --color-warning: #F59E0B;
}
```

---

### Loading spinner not appearing?

**Check**:
1. `isLoading={true}` is set
2. Button has content (text or icons)
3. No conflicting CSS overriding spinner

---

### Focus ring not visible?

**Solution**: Ensure no global CSS removes outlines:

```css
/* ❌ Bad - removes focus indicators */
* {
  outline: none;
}

/* ✅ Good - custom focus only */
*:focus-visible {
  outline: 2px solid var(--color-primary);
}
```

---

## 📊 Migration from Old Button

### Before (Old Button):
```tsx
<Button variant="primary" isLoading={loading}>
  Save
</Button>
```

### After (Enhanced Button):
```tsx
<Button variant="primary" isLoading={loading}>
  Save
</Button>
```

**Breaking Changes**: None! ✅ Fully backwards compatible

**New Features**:
- ✅ `success`, `danger`, `warning` variants
- ✅ `startIcon`, `endIcon` props
- ✅ `isActive` prop
- ✅ Better accessibility
- ✅ Smoother animations

---

## ✅ Best Practices Summary

1. **Use Semantic Variants**:
   - `primary` for main actions
   - `success` for create/add
   - `danger` for delete/remove
   - `warning` for caution
   - `outline` for cancel

2. **Always Show Loading States**:
   ```tsx
   <Button isLoading={isSaving}>
     {isSaving ? 'Saving...' : 'Save'}
   </Button>
   ```

3. **Add Icons for Clarity**:
   ```tsx
   <Button variant="success" startIcon={<PlusIcon />}>
     Add Client
   </Button>
   ```

4. **Pair Danger Actions with Confirmation**:
   ```tsx
   {showConfirm && (
     <Modal>
       <Button variant="danger" onClick={handleDelete}>
         Confirm Delete
       </Button>
     </Modal>
   )}
   ```

5. **Use Full Width in Forms**:
   ```tsx
   <Button variant="primary" fullWidth type="submit">
     Sign In
   </Button>
   ```

---

## 🎓 Examples from Codebase

### ClientsPage - Action Button
```tsx
<Button 
  variant="success" 
  onClick={handleOpenCreate}
>
  Add New Client
</Button>
```

### SettingsPage - Tab Navigation
```tsx
<Button
  variant="ghost"
  isActive={activeTab === 'profile'}
  onClick={() => setActiveTab('profile')}
>
  Profile Settings
</Button>
```

### AiHelper - Minimal Action
```tsx
<Button 
  variant="ghost" 
  size="sm"
  onClick={handleClose}
>
  Close
</Button>
```

---

## 📚 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'outline' \| 'ghost'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `isLoading` | `boolean` | `false` | Shows spinner, disables button |
| `isActive` | `boolean` | `false` | Shows selected state |
| `fullWidth` | `boolean` | `false` | Stretches to container width |
| `startIcon` | `React.ReactNode` | - | Icon before text |
| `endIcon` | `React.ReactNode` | - | Icon after text |
| `disabled` | `boolean` | `false` | Disables button |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `onClick` | `() => void` | - | Click handler |
| `className` | `string` | `''` | Additional CSS classes |
| `...props` | `HTMLButtonElement` | - | All standard button attributes |

---

## 🚀 Phase 3 Complete!

**Status**: ✅ Enhanced Button component is production-ready

**Next Steps**:
- Phase 4: Migrate 48 static buttons to use this component
- Phase 5: Create ThemedInput component following same patterns

**Build Size**: 93.27 KB (93.51 KB → 93.27 KB = optimized!)
