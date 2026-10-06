# Velvet & Bean ☕ — Artisanal Mobile & Desktop Ordering Platform

> **High-Fidelity Interactive Prototype & Academic Laboratory Activity Submission**  
> **Key User Flow:** Artisanal Beverage Discovery, Customization, Frictionless Checkout & Live Order Tracking  
> **Currency:** Philippine Peso (₱ / PHP)  
> **Architecture:** Mobile-First Responsive + Expansive PC Desktop Storefront  

---

## 🌟 Live Interactive Prototype
- **GitHub Repository:** [https://github.com/E1mar-cay/velvet-bean-coffee](https://github.com/E1mar-cay/velvet-bean-coffee)
- **GitHub Pages Link:** `https://e1mar-cay.github.io/velvet-bean-coffee/` *(Enable under Repository Settings &rarr; Pages &rarr; Source: `main`)*

---

## 📱 Chosen Key User Flow & Screens

1. **Screen 1: Menu Discovery & Showcase**
   - Artisanal drink showcase with high-res photography.
   - Real-time search and category filter pills (*All Specials, Signature Espresso, Cold Brews, Matcha & Teas, Pastries*).
   - Favorite heart toggle saving drinks to favorites list.
   - Seamless delivery vs. in-store pickup toggle.
   - On PC: Expansive 3-column menu grid + persistent sticky order sidebar tray.
   - On Mobile: Single-column feed + sticky bottom navigation bar + floating tray indicator.

2. **Screen 2: Drink Customizer Modal (Bottom Sheet on Mobile / Centered Dialog on PC)**
   - Size options: Small (12 oz +₱0), Medium (16 oz +₱20), Large (24 oz +₱35).
   - Dairy & milk alternatives: Oat Milk (+₱30), Whole Milk (+₱0), Almond Milk (+₱30), Breve Cream (+₱35).
   - Sweetness adjustments: 0%, 50%, 75%, 100%.
   - Ice level adjustments: No Ice, Less Ice, Regular Ice, Extra Ice.
   - Add-on toppings & foam: Salted Caramel Cold Foam (+₱35), Extra Espresso Shot (+₱45), Honey Boba (+₱30).
   - Stepper quantity increments with live dynamic price calculation in Philippine Pesos (`₱`).

3. **Screen 3: Review & Frictionless Checkout**
   - Delivery address details with estimated arrival time.
   - Barista tip selector (None, ₱20, ₱30, ₱50, Custom).
   - Regional mobile payment options: GCash, Maya, Debit/Credit Card.
   - Order items list with full subtotal, delivery fee, barista gratuity, and total calculation.
   - Simulated 1-tap payment processing with loading micro-animation.

4. **Screen 4: Live Order Status & Tracking**
   - Pulsing concentric radar ripple animation centered on handcrafted brewing hub.
   - Live countdown timer with estimated arrival countdown.
   - 4-step milestone timeline (*Order Accepted &rarr; Crafting Beverage &rarr; Courier On the Way &rarr; Delivered*).
   - Barista profile card (Q-Grader certified) with 1-tap call and message actions.
   - Itemized order receipt with total paid in Pesos.
   - "Start Another Order" reset loop button.

---

## 🎨 Design System & Aesthetics
- **Color Palette:** Warm Espresso Charcoal (`#1A110B`), Roasted Caramel Bronze (`#D97736`), Oat Cream (`#FAF7F2`), and Fresh Sage Green (`#3F8A58`).
- **Typography:** Display headlines in Google Fonts **Outfit** and crisp micro-controls in **Plus Jakarta Sans**.
- **Ergonomics:** 8-point spatial grid with 44px+ minimum touch targets, sticky bottom navigation on mobile, and smooth `cubic-bezier(0.16, 1, 0.3, 1)` spring curves.

---

## 📄 Academic Design Report (300–500 Words)
The full academic report explaining design choices, visual hierarchy, micro-animations, and UX challenges overcome is included in [`DESIGN_REPORT.md`](DESIGN_REPORT.md) and can also be viewed inside the app via the **"Design Report"** button.

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/E1mar-cay/velvet-bean-coffee.git
   cd velvet-bean-coffee
   ```
2. Open `index.html` in any web browser, or serve via XAMPP (`http://localhost/act_app/`).
