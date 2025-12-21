# Footer Background Pattern Reference

## Pattern Name: **Cross Grid Pattern** (or "Plus Pattern")

This is the beautiful SVG pattern used in the Tillerstead footer background.

### CSS Class Name
`.site-footer::before`

### Pattern Description
A subtle grid of cross/plus symbols with opacity set to create a sophisticated, barely-there texture.

### SVG Pattern Code
```html
<svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'>
  <g fill='none' fill-rule='evenodd'>
    <g fill='#ffffff' fill-opacity='0.03'>
      <path d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/>
    </g>
  </g>
</svg>
```

### CSS Data URI Format
```css
background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
```

### Usage Settings
- **Size**: `60px 60px`
- **Repeat**: `repeat`
- **Position**: covers entire footer
- **Opacity**: Built into the SVG (0.03)
- **Color**: White (`#ffffff`)

### Where It's Used
- Footer background (`.site-footer::before`)
- Creates depth and texture on dark gradient background
- Combined with radial gradient overlay for sophisticated effect

### Color Variations Available
You can change the fill color in the SVG:
- **White on dark**: `fill='%23ffffff'` (current)
- **Dark on light**: `fill='%23000000'` 
- **Teal**: `fill='%230d9aaa'`

### Easy Copy-Paste Classes
Use these utility classes anywhere in your HTML:

**Dark Background Pattern:**
```css
.pattern-cross-dark {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size: 60px 60px;
  background-repeat: repeat;
}
```

**Light Background Pattern:**
```css
.pattern-cross-light {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size: 60px 60px;
  background-repeat: repeat;
}
```

---

**Pattern saved on:** 2025-12-21  
**Why we love it:** Sophisticated, subtle, memorable, TCNA-professional
