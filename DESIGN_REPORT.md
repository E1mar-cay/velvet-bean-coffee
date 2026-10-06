# Velvet & Bean — High-Fidelity Mobile & Desktop Prototype Design Report

**Project Title:** Velvet & Bean Artisanal Cafe Ordering Prototype  
**Flow Selected:** Artisanal Beverage Discovery, Customization, Checkout & Live Order Tracking  
**Word Count:** 445 words  
**Currency Standard:** Philippine Peso (₱ / PHP)  

---

### 1. Key User Flow Selection
For this interactive high-fidelity prototype, I designed the complete end-to-end beverage ordering flow for **Velvet & Bean**, an artisanal coffee roastery located in Metro Manila. The key user journey spans four interconnected states:
1. **Menu Discovery & Showcase:** Customers explore signature espresso blends, cold brews, and ceremonial matchas with dynamic filtering and upfront pricing in Philippine Pesos (`₱`).
2. **Drink Customizer Modal:** An interactive drawer allowing customers to tailor cup size, dairy alternatives (e.g., Oat Milk +₱30), sweetness level, ice ratios, and cold foam add-ons with real-time recalculation.
3. **Cart Review & Checkout:** Reviewing order items, selecting express delivery (₱49) versus store pickup, choosing tip amounts (₱20, ₱30, ₱50), and choosing regional payment methods (GCash, Maya, Card).
4. **Live Order Tracking:** Real-time feedback timeline from brewing to doorstep arrival with barista contact and animated countdown.

This journey was selected because mobile beverage ordering demands high customization, instant monetary feedback, and post-purchase reassurance within a concise thumb-driven interface.

---

### 2. Design Choices & Visual Hierarchy
- **Color Palette:** Grounded in a warm artisanal cafe atmosphere, the UI pairs deep espresso charcoal (`#1A110B`) and dark roast surfaces with creamy oat-milk backgrounds (`#FAF7F2`) and vibrant roasted caramel accents (`#D97736`). Fresh sage green (`#3F8A58`) provides positive feedback for completed milestones and freshness cues.
- **Typography:** The layout pairs **Outfit** for distinctive display titles and numerical pricing with **Plus Jakarta Sans** for crisp, highly legible body copy and micro-controls. Hierarchy is established through size variance (24px headlines to 11px uppercase tags) and high contrast ratios that exceed WCAG AA standards.
- **Layout & Ergonomics:** Designed around an 8-point spatial grid with a minimum 44px touch target standard. Key call-to-actions (the slide-up drawer trigger, floating cart pill, and "Place Order" button) are anchored in the ergonomic "thumb zone" at the bottom of the screen.

---

### 3. Responsive Architecture: Mobile-First & PC Desktop Experience
The design adheres to a **mobile-first responsive architecture**:
- **On Mobile Devices:** The layout functions as a native mobile app with touch-friendly bottom sheets, single-column feed, sticky floating tray pill, and thumb navigation bar.
- **On PC / Desktop View:** The application gracefully expands into an expansive desktop storefront with a persistent 2-column layout (wide menu grid alongside a sticky live order summary sidebar), desktop top header, and centered dialog modals. A dedicated "Phone View" toggle allows reviewers to switch between desktop and mobile simulator modes at will.

---

### 4. Transitions & Interactive Animations
The prototype includes four purpose-built animations:
1. **Spring Customizer Transition:** Selecting any beverage raises the customizer drawer using a fluid `cubic-bezier(0.16, 1, 0.3, 1)` easing curve while applying a blurred backdrop overlay.
2. **Spatial Screen Transitions:** Transitions between Menu, Checkout, and Live Tracker employ horizontal motion to convey clear spatial navigation.
3. **Pulsing Brewing Radar & Live Progress:** The order tracker features radiating concentric radar waves around an animated coffee cup alongside a growing progress timeline bar.
4. **Dynamic Price Recalculation:** Modifiers recalculate totals live in Philippine Pesos (`₱`) with tactile button feedback.

---

### 5. Design Challenges & Solutions
The primary challenge was mitigating **cognitive overload** during drink customization. Specialty orders require selecting size, milk, ice, and toppings simultaneously. To solve this, options were arranged into segmented chips with explicit upfront pricing badges (e.g., `+₱30`) that immediately update the total in real time. Another challenge was post-checkout user anxiety; implementing a live milestone tracker with an animated brewing status provides psychological reassurance and trust.
