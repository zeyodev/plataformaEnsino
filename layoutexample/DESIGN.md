```markdown
# Design System Document: Editorial Excellence for Beauty Entrepreneurs

## 1. Overview & Creative North Star: "The Digital Atelier"
This design system moves away from the "SaaS dashboard" aesthetic and toward the world of high-end editorial fashion and luxury craftsmanship. The Creative North Star is **The Digital Atelier**: an environment that feels curated, quiet, and profoundly authoritative.

To break the "template" look, we employ **Intentional Asymmetry**. We do not fill every corner of a grid. Instead, we use generous white space (the "Breathing Room" principle) and overlapping elements to create depth. By pairing the architectural stability of *Manrope* with the high-contrast elegance of *Noto Serif*, we signal to the salon owner that they are not just managing a business—they are mastering an art form.

---

## 2. Colors & Tonal Depth
We avoid the "flatness" of modern web design by using a sophisticated dark-mode architecture. The palette is rooted in deep charcoals and elevated by metallic transitions.

### The "No-Line" Rule
**Strict Prohibition:** 1px solid borders (`#000` or `#FFF`) are forbidden for sectioning. 
Boundaries must be defined solely through background color shifts. For example, a card (`surface-container-low`) should sit on a `surface` background. If the background changes to `surface-container-lowest`, the card should transition to `surface-container`. Let the tonal shift do the work, not a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine, heavy-weight paper:
- **Base Layer:** `surface` (#131313)
- **Primary Layout Sections:** `surface-container-low` (#1C1B1B)
- **Interactive Cards:** `surface-container-high` (#2A2A2A)
- **Floating Overlays/Modals:** `surface-container-highest` (#353534)

### The Glass & Gradient Rule
To achieve a "premium" soul, use **Glassmorphism** for floating elements (like navigation bars or hovering action menus). Use `surface-container` tokens at 60-80% opacity with a `20px` backdrop-blur. 
For CTAs, use a **Signature Gradient** transitioning from `primary` (#F2CA50) to `primary-container` (#D4AF37) at a 135-degree angle. This mimics the way light hits brushed gold.

---

## 3. Typography: The Editorial Voice
Typography is the primary vehicle for the brand’s "Millionaire" identity. 

- **Display & Headlines (Noto Serif):** Used for high-impact moments—revenue totals, module titles, and welcome messages. The high-contrast serifs convey heritage and luxury.
- **Titles & Body (Manrope):** A modern, geometric sans-serif that ensures clarity in data-heavy sections. It provides the "professional" balance to the "luxury" of the serif.

**Hierarchy Strategy:**
- **Display-LG:** For "Hero" numbers (e.g., Total Monthly Revenue).
- **Headline-MD:** For section starts.
- **Label-SM:** Always uppercase with `0.05rem` letter-spacing for category tags (e.g., "MARKETING STRATEGY").

---

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering**, not structural scaffolding.

- **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section to create a soft, natural "recessed" look. This is "inverse elevation"—making elements feel carved into the UI.
- **Ambient Shadows:** For floating elements (Modals/Dropdowns), use an extra-diffused shadow: `0px 20px 40px rgba(0, 0, 0, 0.4)`. The shadow must never be pure black; it should feel like a deep tint of the background.
- **The "Ghost Border" Fallback:** If a border is required for accessibility in forms, use the `outline-variant` token (#4D4635) at **20% opacity**. It should be felt, not seen.

---

## 5. Components & Primitive Styling

### Buttons
- **Primary:** Gradient (`primary` to `primary-container`), `on-primary` text, `md` radius (0.375rem). No border.
- **Secondary:** Ghost style. `outline` (#99907C) border at 30% opacity. `primary` text color.
- **Tertiary:** Text only, `label-md` weight, uppercase with high letter-spacing.

### Cards & Lists
- **The Divider Ban:** Never use a horizontal line to separate list items. Use a `1.4rem` (Spacing 4) vertical gap or a subtle background shift to `surface-container-low` on hover.
- **Layout:** Cards should use `xl` radius (0.75rem) for a softer, more modern furniture-like feel.

### Input Fields
- **Styling:** Background `surface-container-highest`, no border, `sm` radius. 
- **Focus State:** A 1px "Ghost Border" using the `primary` token at 50% opacity. Avoid heavy glows.

### Specialized Components for "Salão Milionário"
- **The Revenue Orchid:** A custom sparkline chart using the `secondary` (#FFB77B) copper color, sitting on a `surface-container-lowest` background.
- **Progress Halo:** For educational modules, use a circular progress indicator with a `primary` glow effect (`blur-sm`).

---

## 6. Do’s and Don’ts

### Do:
- **Embrace Asymmetry:** Let a headline sit 20% further to the left than the body text below it to create an editorial "magazine" feel.
- **Use "White Space" as a Tool:** If a section feels crowded, don't shrink the text—increase the container padding using `spacing-12` (4rem).
- **Textural Contrast:** Pair a very large `display-lg` serif number with a very small `label-sm` sans-serif description.

### Don't:
- **No Pure White:** Never use `#FFFFFF` for text. Use `on-surface` (#E5E2E1) to keep the contrast high but the "glare" low.
- **No Sharp Corners:** Never use `radius-none`. Even the most professional elements need the `sm` (0.125rem) radius to feel "finished."
- **No Standard Grids:** Avoid the "12-column" look where everything is perfectly boxed. Allow elements to overlap slightly to create a layered, "couture" experience.

---

**Director’s Note:** 
Remember, you are designing for a "Millionaire Salon." The user should feel like they are stepping into a quiet, exclusive VIP lounge. If a design choice feels "busy" or "loud," strip it back. Let the typography and the subtle shifts in dark tones speak for the brand's premium nature.```