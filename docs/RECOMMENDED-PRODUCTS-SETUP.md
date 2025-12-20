# Recommended Products Page - Setup Instructions

## ✅ Amazon Associate Links Already Active

The following Amazon affiliate short links are already integrated and do NOT need updating:
- `https://amzn.to/49rOXIT` — DGSL Tile Leveling System
- `https://amzn.to/4p6jqBU` — Cotton Farm Cheesecloth
- `https://amzn.to/4atkxIk` — BOSCH Laser Distance Measure
- `https://amzn.to/4qls9kO` — Room By Room Project Planner

These use Amazon's short URL format which already includes the affiliate tracking.

## ⚠️ IMPORTANT: Replace Placeholder Links

The remaining product links throughout the page still use `YOUR-AMAZON-TAG` placeholders. 
You have two options:

### Where to Find Your Amazon Associate Tag

1. Log into [Amazon Associates Central](https://affiliate-program.amazon.com/)
2. Navigate to "Product Linking" → "Link to Any Page"
3. Your Associate ID (tag) will be shown in the format: `yourname-20` or `yoursite-20`

### Search and Replace

Open `/workspaces/Tillerstead-live/pages/recommended-products.html` and replace:

```
tag=YOUR-AMAZON-TAG
```

With your actual tag:

```
tag=tillerstead-20
```

(Or whatever your actual Amazon Associate ID is)

### Example Before/After

**Before:**
```html
https://www.amazon.com/dp/B001QUZEEU?tag=YOUR-AMAZON-TAG&linkCode=ogi&th=1
```

**After:**
```html
https://www.amazon.com/dp/B001QUZEEU?tag=tillerstead-20&linkCode=ogi&th=1
```

## Product Link Updates

All product links use Amazon's short URL format with tracking parameters:
- `tag=` — Your Associate ID (required for commission tracking)
- `linkCode=ogi` — Amazon's organic link code
- `th=1` — Specifies primary variation if multiple options exist

If any product becomes unavailable or discontinued:
1. Search Amazon for the replacement product
2. Copy the ASIN (found in product URL after `/dp/`)
3. Update the link maintaining the same format

## FTC Compliance

The page includes:
- ✅ Prominent disclosure at top of page
- ✅ Explanation of commission structure
- ✅ `rel="nofollow noopener"` attributes on all affiliate links
- ✅ Clear statement that prices are identical
- ✅ Legal disclaimer footer

## Testing Checklist

Before launch:
- [ ] Replace `YOUR-AMAZON-TAG` with actual Associate ID
- [ ] Verify at least 3 affiliate links click through correctly
- [ ] Test page renders correctly on mobile
- [ ] Verify disclosure card is visible above fold
- [ ] Check all blog post reference links work
- [ ] Validate HTML with W3C checker

## Maintenance Schedule

**Monthly:**
- Check for broken Amazon links (they change product IDs frequently)
- Update product availability notes
- Review new ANSI/TCNA standards releases

**Quarterly:**
- Audit product recommendations for new releases
- Update pricing context if market changes significantly
- Verify FTC compliance with current regulations

## Adding New Products

When adding new products:
1. Verify ANSI/TCNA compliance on manufacturer spec sheets
2. Include specific installation guidance or tips
3. Link to relevant blog posts when applicable
4. Use the existing product-card structure for consistency

## Analytics Tracking

Consider adding UTM parameters for better tracking:
```
?tag=tillerstead-20&linkCode=ogi&utm_source=tillerstead&utm_medium=affiliate&utm_campaign=recommended-products
```

## Legal Notes

- Amazon Associates program requires disclosure within 200 words of first link
- Links must have `rel="nofollow"` per FTC guidelines
- Cannot make medical/safety claims beyond manufacturer specs
- Cannot guarantee pricing or availability
- Must clearly state you earn commissions

---

**Last Updated:** December 20, 2025  
**Page Location:** `/pages/recommended-products.html`  
**Navigation:** Added to secondary nav and footer Resources section
