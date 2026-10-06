/**
 * Velvet & Bean — Artisanal Cafe Ordering Platform
 * Mobile-First Responsive & Desktop Architecture Engine
 * Currency: Philippine Peso (₱ / PHP)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ================= 1. MENU DATA & INITIAL STATE =================
  const DRINKS = [
    {
      id: 'caramel-macchiato',
      name: 'Iced Caramel Macchiato',
      badge: 'Best Seller',
      category: 'espresso',
      price: 185.00,
      description: 'Single-origin espresso layered over fresh vanilla whole milk, capped with golden amber caramel drizzle and sea-salt flakes.',
      image: 'assets/caramel_macchiato.jpg',
      favorite: true
    },
    {
      id: 'matcha-latte',
      name: 'Matcha Cloud Latte',
      badge: 'Ceremonial',
      category: 'tea',
      price: 195.00,
      description: 'First-harvest Uji ceremonial matcha layered with cold sweet cream and oat milk foam.',
      image: 'assets/matcha_latte.jpg',
      favorite: false
    },
    {
      id: 'spanish-latte',
      name: 'Artisanal Spanish Latte',
      badge: 'Staff Pick',
      category: 'espresso',
      price: 175.00,
      description: 'Rich double espresso swirled with sweet condensed milk, cinnamon dusting, and creamy froth.',
      image: 'assets/spanish_latte.jpg',
      favorite: true
    },
    {
      id: 'cold-brew',
      name: 'Vanilla Cold Brew Float',
      badge: 'Steeped 20h',
      category: 'cold',
      price: 165.00,
      description: 'Single-origin Benguet cold brew with slow-cascading vanilla cream float and sea salt rim.',
      image: 'assets/cold_brew.jpg',
      favorite: false
    }
  ];

  let state = {
    currentScreen: 'menu',
    selectedDrink: DRINKS[0],
    customizer: {
      size: 'Medium',
      sizePrice: 20.00,
      milk: 'Oat Milk',
      milkPrice: 30.00,
      sweetness: '50%',
      ice: 'Regular Ice',
      addons: ['Salted Caramel Foam'],
      addonPrice: 35.00,
      specialNotes: '',
      quantity: 1
    },
    cart: [
      {
        id: 'cart-init-1',
        drink: DRINKS[0],
        size: 'Medium (16 oz)',
        milk: 'Oat Milk',
        sweetness: '50%',
        ice: 'Regular Ice',
        addons: ['Salted Caramel Foam'],
        quantity: 1,
        unitPrice: 270.00,
        totalPrice: 270.00
      }
    ],
    tipAmount: 30.00,
    deliveryFee: 49.00,
    paymentMethod: 'gcash',
    countdownSeconds: 14 * 60 + 30, // 14 mins 30 secs
    timerInterval: null,
    isPhoneMode: false
  };

  // ================= 2. DOM ELEMENTS =================
  const drinksGrid = document.getElementById('drinksGrid');
  const screens = {
    menu: document.getElementById('screenMenu'),
    checkout: document.getElementById('screenCheckout'),
    tracker: document.getElementById('screenTracker')
  };

  // Navigations
  const pcNavLinks = {
    menu: document.getElementById('pcNavMenu'),
    checkout: document.getElementById('pcNavCheckout'),
    tracker: document.getElementById('pcNavTracker')
  };

  const mobNavTabs = {
    menu: document.getElementById('mobNavMenu'),
    favorites: document.getElementById('mobNavFavorites'),
    checkout: document.getElementById('mobNavOrders'),
    tracker: document.getElementById('mobNavTracker')
  };

  const navCartBadge = document.getElementById('navCartBadge');

  // Search Elements
  const searchInput = document.getElementById('searchInput');
  const mobileSearchInput = document.getElementById('mobileSearchInput');

  // Fulfillment Elements
  const modeBtnDelivery = document.getElementById('modeBtnDelivery');
  const modeBtnPickup = document.getElementById('modeBtnPickup');
  const btnMobileFulfillment = document.getElementById('btnMobileFulfillment');
  const mobileFulfillText = document.getElementById('mobileFulfillText');
  const hdrFulfillType = document.getElementById('hdrFulfillType');

  // Sidebar Elements (Desktop PC View)
  const sidebarItemsList = document.getElementById('sidebarItemsList');
  const sidebarBadgeCount = document.getElementById('sidebarBadgeCount');
  const sidebarSubtotal = document.getElementById('sidebarSubtotal');
  const sidebarDelivery = document.getElementById('sidebarDelivery');
  const sidebarTip = document.getElementById('sidebarTip');
  const sidebarTotal = document.getElementById('sidebarTotal');
  const btnSidebarCheckout = document.getElementById('btnSidebarCheckout');

  // Mobile Floating Cart Bar
  const floatingCartBar = document.getElementById('floatingCartBar');
  const cartItemCount = document.getElementById('cartItemCount');
  const cartBarPreview = document.getElementById('cartBarPreview');
  const cartBarTotal = document.getElementById('cartBarTotal');
  const btnGoToCheckout = document.getElementById('btnGoToCheckout');

  // Customizer Elements
  const customizerBackdrop = document.getElementById('customizerBackdrop');
  const btnCloseCustomizer = document.getElementById('btnCloseCustomizer');
  const modalDrinkImg = document.getElementById('modalDrinkImg');
  const modalDrinkBadge = document.getElementById('modalDrinkBadge');
  const modalDrinkTitle = document.getElementById('modalDrinkTitle');
  const modalDrinkBasePrice = document.getElementById('modalDrinkBasePrice');
  const custModalTotalPrice = document.getElementById('custModalTotalPrice');
  const custQtyValue = document.getElementById('custQtyValue');
  const btnQtyMinus = document.getElementById('btnQtyMinus');
  const btnQtyPlus = document.getElementById('btnQtyPlus');
  const btnConfirmAddToCart = document.getElementById('btnConfirmAddToCart');
  const milkOptionsWrap = document.getElementById('milkOptions');
  const sweetnessOptionsWrap = document.getElementById('sweetnessOptions');
  const iceOptionsWrap = document.getElementById('iceOptions');

  // Checkout Elements
  const checkoutItemsList = document.getElementById('checkoutItemsList');
  const billSubtotal = document.getElementById('billSubtotal');
  const billDelivery = document.getElementById('billDelivery');
  const billTip = document.getElementById('billTip');
  const billTotal = document.getElementById('billTotal');
  const btnPlaceOrder = document.getElementById('btnPlaceOrder');
  const placeOrderSpinner = document.getElementById('placeOrderSpinner');
  const placeOrderText = document.getElementById('placeOrderText');
  const tipOptionsWrap = document.getElementById('tipOptions');

  // Tracker Elements
  const countdownClock = document.getElementById('countdownClock');
  const progressFill = document.getElementById('progressFill');
  const trackerItemsPreview = document.getElementById('trackerItemsPreview');
  const trackerItemQty = document.getElementById('trackerItemQty');
  const trackerTotalPaid = document.getElementById('trackerTotalPaid');

  // Presentation & Utility
  const btnToggleDeviceMode = document.getElementById('btnToggleDeviceMode');
  const toggleModeIcon = document.getElementById('toggleModeIcon');
  const toggleModeLabel = document.getElementById('toggleModeLabel');
  const reportModalOverlay = document.getElementById('reportModalOverlay');
  const btnOpenReport = document.getElementById('btnOpenReport');
  const btnCloseReport = document.getElementById('btnCloseReport');
  const btnCloseReportBottom = document.getElementById('btnCloseReportBottom');
  const btnCopyReport = document.getElementById('btnCopyReport');
  const copyReportBtnText = document.getElementById('copyReportBtnText');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  // ================= 3. RENDER FUNCTIONS =================

  // Render Drinks Catalog
  function renderDrinksGrid(filterCategory = 'all') {
    drinksGrid.innerHTML = '';
    const filtered = filterCategory === 'all'
      ? DRINKS
      : DRINKS.filter(d => d.category === filterCategory);

    document.getElementById('menuCountBadge').textContent = `${filtered.length} Beverages`;

    filtered.forEach(drink => {
      const card = document.createElement('div');
      card.className = 'drink-card';
      card.setAttribute('data-id', drink.id);
      card.innerHTML = `
        <div class="drink-thumb-wrap">
          <img src="${drink.image}" alt="${drink.name}" class="drink-thumb-img" loading="lazy">
          <span class="drink-badge-tag">${drink.badge}</span>
          <button type="button" class="drink-heart-btn ${drink.favorite ? 'active' : ''}" aria-label="Favorite" data-fav-id="${drink.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="${drink.favorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <h3 class="drink-name-text">${drink.name}</h3>
        <p class="drink-desc-text">${drink.description}</p>
        <div class="drink-card-footer">
          <span class="drink-price-php">₱${drink.price.toFixed(2)}</span>
          <button type="button" class="drink-btn-add" aria-label="Customize ${drink.name}">&plus;</button>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.closest('.drink-heart-btn')) {
          e.stopPropagation();
          drink.favorite = !drink.favorite;
          renderDrinksGrid(filterCategory);
          showToast(drink.favorite ? 'Saved to Favorites ❤️' : 'Removed from Favorites');
          return;
        }
        openCustomizer(drink);
      });

      drinksGrid.appendChild(card);
    });
  }

  // Calculate & Update Live Price in Customizer Modal (Pesos)
  function calculateCustomizerPrice() {
    const base = state.selectedDrink.price;
    const unitPrice = base + state.customizer.sizePrice + state.customizer.milkPrice + state.customizer.addonPrice;
    const totalPrice = unitPrice * state.customizer.quantity;
    custModalTotalPrice.textContent = `₱${totalPrice.toFixed(2)}`;
    return { unitPrice, totalPrice };
  }

  // Open Customizer Modal
  function openCustomizer(drink) {
    state.selectedDrink = drink;
    modalDrinkImg.src = drink.image;
    modalDrinkImg.alt = drink.name;
    modalDrinkBadge.textContent = drink.badge;
    modalDrinkTitle.textContent = drink.name;
    modalDrinkBasePrice.textContent = `Base: ₱${drink.price.toFixed(2)}`;

    // Reset stepper
    state.customizer.quantity = 1;
    custQtyValue.textContent = '1';

    calculateCustomizerPrice();
    customizerBackdrop.classList.add('open');
    customizerBackdrop.setAttribute('aria-hidden', 'false');
  }

  // Close Customizer Modal
  function closeCustomizer() {
    customizerBackdrop.classList.remove('open');
    customizerBackdrop.setAttribute('aria-hidden', 'true');
  }

  // Update Cart UI across Mobile and Desktop PC Sidebar
  function updateCartUI() {
    const totalQty = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const total = subtotal + state.deliveryFee + state.tipAmount;

    // Badges
    navCartBadge.textContent = totalQty;
    sidebarBadgeCount.textContent = `${totalQty} item${totalQty !== 1 ? 's' : ''}`;

    // Desktop PC Sidebar
    sidebarItemsList.innerHTML = '';
    if (state.cart.length === 0) {
      sidebarItemsList.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px 0; font-size: 0.85rem;">Your tray is empty.<br>Choose a handcrafted drink above!</div>`;
    } else {
      state.cart.forEach((item) => {
        const itemRow = document.createElement('div');
        itemRow.className = 'sidebar-item-row';
        itemRow.innerHTML = `
          <img src="${item.drink.image}" alt="${item.drink.name}" class="sidebar-item-thumb">
          <div class="sidebar-item-meta">
            <div class="sidebar-item-name">${item.quantity}x ${item.drink.name}</div>
            <div class="sidebar-item-spec">${item.size.split(' ')[0]} &bull; ${item.milk}</div>
          </div>
          <div class="sidebar-item-price">₱${item.totalPrice.toFixed(2)}</div>
        `;
        sidebarItemsList.appendChild(itemRow);
      });
    }

    sidebarSubtotal.textContent = `₱${subtotal.toFixed(2)}`;
    sidebarDelivery.textContent = `₱${state.deliveryFee.toFixed(2)}`;
    sidebarTip.textContent = `₱${state.tipAmount.toFixed(2)}`;
    sidebarTotal.textContent = `₱${total.toFixed(2)}`;

    // Mobile Floating Cart Pill
    if (totalQty > 0 && state.currentScreen === 'menu') {
      floatingCartBar.classList.add('visible');
      cartItemCount.textContent = totalQty;
      const lastItem = state.cart[state.cart.length - 1];
      cartBarPreview.textContent = `${lastItem.quantity}x ${lastItem.drink.name}`;
      cartBarTotal.textContent = `₱${subtotal.toFixed(2)}`;
    } else {
      floatingCartBar.classList.remove('visible');
    }
  }

  // Render Checkout Order Summary & Bill (Pesos)
  function renderCheckout() {
    checkoutItemsList.innerHTML = '';
    let subtotal = 0;

    state.cart.forEach((item) => {
      subtotal += item.totalPrice;
      const row = document.createElement('div');
      row.className = 'checkout-item-line';
      row.innerHTML = `
        <img src="${item.drink.image}" alt="${item.drink.name}" class="checkout-item-thumb">
        <div class="checkout-item-info">
          <div class="checkout-item-name">${item.quantity}x ${item.drink.name}</div>
          <div class="checkout-item-options">${item.size} &bull; ${item.milk} &bull; ${item.sweetness} &bull; ${item.ice}</div>
          ${item.addons.length ? `<div class="checkout-item-options">+ ${item.addons.join(', ')}</div>` : ''}
        </div>
        <div class="checkout-item-price-php">₱${item.totalPrice.toFixed(2)}</div>
      `;
      checkoutItemsList.appendChild(row);
    });

    const total = subtotal + state.deliveryFee + state.tipAmount;

    billSubtotal.textContent = `₱${subtotal.toFixed(2)}`;
    billDelivery.textContent = `₱${state.deliveryFee.toFixed(2)}`;
    billTip.textContent = `₱${state.tipAmount.toFixed(2)}`;
    billTotal.textContent = `₱${total.toFixed(2)}`;
    placeOrderText.innerHTML = `Confirm Order &bull; ₱${total.toFixed(2)}`;
  }

  // Render Tracker Summary (Pesos)
  function renderTracker() {
    trackerItemsPreview.innerHTML = '';
    const totalQty = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    trackerItemQty.textContent = `${totalQty} item${totalQty !== 1 ? 's' : ''}`;

    let subtotal = 0;
    state.cart.forEach(item => {
      subtotal += item.totalPrice;
      const itemRow = document.createElement('div');
      itemRow.style.padding = '4px 0';
      itemRow.innerHTML = `
        <div style="font-size: 0.84rem; font-weight: 700;">${item.quantity}x ${item.drink.name} (${item.size.split(' ')[0]})</div>
        <div style="font-size: 0.72rem; color: var(--text-muted);">${item.milk}, ${item.sweetness} sugar, ${item.ice}</div>
      `;
      trackerItemsPreview.appendChild(itemRow);
    });

    const grandTotal = subtotal + state.deliveryFee + state.tipAmount;
    trackerTotalPaid.textContent = `₱${grandTotal.toFixed(2)}`;

    // Live countdown timer
    startTrackerCountdown();
  }

  function startTrackerCountdown() {
    if (state.timerInterval) clearInterval(state.timerInterval);

    state.timerInterval = setInterval(() => {
      if (state.countdownSeconds > 0) {
        state.countdownSeconds--;
        const mins = Math.floor(state.countdownSeconds / 60);
        const secs = state.countdownSeconds % 60;
        countdownClock.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
      }
    }, 1000);
  }

  // Navigate Screen Function
  function navigateTo(screenId) {
    if (state.currentScreen === screenId) return;

    closeCustomizer();

    Object.keys(screens).forEach(k => {
      screens[k].classList.remove('active');
    });

    if (screens[screenId]) {
      screens[screenId].classList.add('active');
      state.currentScreen = screenId;
    }

    // Update active nav links on PC
    Object.keys(pcNavLinks).forEach(k => {
      if (pcNavLinks[k]) pcNavLinks[k].classList.toggle('active', k === screenId);
    });

    // Update active tabs on Mobile Bottom Nav
    Object.keys(mobNavTabs).forEach(k => {
      if (mobNavTabs[k]) {
        mobNavTabs[k].classList.remove('active');
      }
    });

    if (screenId === 'menu' && mobNavTabs.menu) mobNavTabs.menu.classList.add('active');
    if (screenId === 'checkout' && mobNavTabs.checkout) mobNavTabs.checkout.classList.add('active');
    if (screenId === 'tracker' && mobNavTabs.tracker) mobNavTabs.tracker.classList.add('active');

    // Screen specific updates
    if (screenId === 'menu') {
      updateCartUI();
    } else if (screenId === 'checkout') {
      renderCheckout();
      updateCartUI();
    } else if (screenId === 'tracker') {
      renderTracker();
      updateCartUI();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showToast(msg) {
    toastMessage.textContent = msg;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 2400);
  }

  // Fulfillment Switcher
  function setFulfillment(mode) {
    if (mode === 'delivery') {
      state.deliveryFee = 49.00;
      if (modeBtnDelivery) modeBtnDelivery.classList.add('active');
      if (modeBtnPickup) modeBtnPickup.classList.remove('active');
      if (mobileFulfillText) mobileFulfillText.textContent = 'Delivery (₱49)';
      if (hdrFulfillType) hdrFulfillType.textContent = 'Express Delivery';
      showToast('Switched to Express Delivery (₱49)');
    } else {
      state.deliveryFee = 0.00;
      if (modeBtnDelivery) modeBtnDelivery.classList.remove('active');
      if (modeBtnPickup) modeBtnPickup.classList.add('active');
      if (mobileFulfillText) mobileFulfillText.textContent = 'Pickup (₱0)';
      if (hdrFulfillType) hdrFulfillType.textContent = 'In-Store Pickup';
      showToast('Switched to In-Store Pickup (₱0 Free)');
    }
    updateCartUI();
    if (state.currentScreen === 'checkout') renderCheckout();
  }

  // ================= 4. EVENT LISTENERS =================

  // Category Filter
  document.getElementById('categoryTabs').addEventListener('click', (e) => {
    const pill = e.target.closest('.cat-pill');
    if (!pill) return;
    document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    renderDrinksGrid(pill.getAttribute('data-category'));
  });

  // Search input filtering (synced between desktop & mobile)
  const handleSearch = (q) => {
    const query = q.toLowerCase().trim();
    document.querySelectorAll('.drink-card').forEach(card => {
      const name = card.querySelector('.drink-name-text').textContent.toLowerCase();
      const desc = card.querySelector('.drink-desc-text').textContent.toLowerCase();
      if (name.includes(query) || desc.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  if (searchInput) searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
  if (mobileSearchInput) mobileSearchInput.addEventListener('input', (e) => handleSearch(e.target.value));

  // Fulfillment Toggles
  if (modeBtnDelivery) modeBtnDelivery.addEventListener('click', () => setFulfillment('delivery'));
  if (modeBtnPickup) modeBtnPickup.addEventListener('click', () => setFulfillment('pickup'));
  if (btnMobileFulfillment) btnMobileFulfillment.addEventListener('click', () => {
    setFulfillment(state.deliveryFee > 0 ? 'pickup' : 'delivery');
  });

  // Hero Card Customize Click
  document.getElementById('heroBannerCard').addEventListener('click', () => openCustomizer(DRINKS[0]));
  document.getElementById('btnHeroCustomize').addEventListener('click', (e) => {
    e.stopPropagation();
    openCustomizer(DRINKS[0]);
  });

  // Brand Logo Click to reset to Menu
  document.getElementById('brandLogoHome').addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('menu');
  });

  // Size Options in Customizer
  document.querySelectorAll('.size-option-card').forEach(card => {
    card.addEventListener('click', () => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        document.querySelectorAll('.size-option-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        state.customizer.size = radio.value;
        state.customizer.sizePrice = parseFloat(radio.getAttribute('data-price')) || 0;
        calculateCustomizerPrice();
      }
    });
  });

  // Milk Options in Customizer
  milkOptionsWrap.addEventListener('click', (e) => {
    const pill = e.target.closest('.opt-pill');
    if (!pill) return;
    milkOptionsWrap.querySelectorAll('.opt-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    state.customizer.milk = pill.getAttribute('data-milk');
    state.customizer.milkPrice = parseFloat(pill.getAttribute('data-price')) || 0;
    calculateCustomizerPrice();
  });

  // Sweetness Options in Customizer
  sweetnessOptionsWrap.addEventListener('click', (e) => {
    const pill = e.target.closest('.opt-pill');
    if (!pill) return;
    sweetnessOptionsWrap.querySelectorAll('.opt-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    state.customizer.sweetness = pill.getAttribute('data-sweetness');
    document.getElementById('sweetnessLabel').textContent = `${state.customizer.sweetness} &bull; Adjusted`;
  });

  // Ice Options in Customizer
  iceOptionsWrap.addEventListener('click', (e) => {
    const pill = e.target.closest('.opt-pill');
    if (!pill) return;
    iceOptionsWrap.querySelectorAll('.opt-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    state.customizer.ice = pill.getAttribute('data-ice');
    document.getElementById('iceLabel').textContent = state.customizer.ice;
  });

  // Addon Checkboxes in Customizer
  document.querySelectorAll('.addon-check-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT') {
        const cb = card.querySelector('input[type="checkbox"]');
        if (cb) {
          cb.checked = !cb.checked;
        }
      }
      let addonSum = 0;
      const selected = [];
      document.querySelectorAll('input[name="addon"]:checked').forEach(c => {
        addonSum += parseFloat(c.getAttribute('data-price')) || 0;
        selected.push(c.value);
      });
      state.customizer.addonPrice = addonSum;
      state.customizer.addons = selected;
      calculateCustomizerPrice();
    });
  });

  // Stepper Controls
  btnQtyMinus.addEventListener('click', () => {
    if (state.customizer.quantity > 1) {
      state.customizer.quantity--;
      custQtyValue.textContent = state.customizer.quantity;
      calculateCustomizerPrice();
    }
  });

  btnQtyPlus.addEventListener('click', () => {
    if (state.customizer.quantity < 10) {
      state.customizer.quantity++;
      custQtyValue.textContent = state.customizer.quantity;
      calculateCustomizerPrice();
    }
  });

  // Add to Tray Button
  btnConfirmAddToCart.addEventListener('click', () => {
    const { unitPrice, totalPrice } = calculateCustomizerPrice();
    const notes = document.getElementById('specialNotes').value.trim();

    state.cart.push({
      id: `cart-${Date.now()}`,
      drink: state.selectedDrink,
      size: `${state.customizer.size} (${state.customizer.size === 'Small' ? '12 oz' : state.customizer.size === 'Medium' ? '16 oz' : '24 oz'})`,
      milk: state.customizer.milk,
      sweetness: state.customizer.sweetness,
      ice: state.customizer.ice,
      addons: [...state.customizer.addons],
      specialNotes: notes,
      quantity: state.customizer.quantity,
      unitPrice,
      totalPrice
    });

    closeCustomizer();
    showToast(`Added ${state.customizer.quantity}x ${state.selectedDrink.name} to tray!`);
    updateCartUI();
  });

  // Close Customizer Modal
  btnCloseCustomizer.addEventListener('click', closeCustomizer);
  customizerBackdrop.addEventListener('click', (e) => {
    if (e.target === customizerBackdrop) closeCustomizer();
  });

  // Desktop Sidebar Checkout
  btnSidebarCheckout.addEventListener('click', () => navigateTo('checkout'));

  // Mobile Floating Cart Checkout
  btnGoToCheckout.addEventListener('click', () => navigateTo('checkout'));

  // Desktop Header Nav
  pcNavLinks.menu.addEventListener('click', () => navigateTo('menu'));
  pcNavLinks.checkout.addEventListener('click', () => navigateTo('checkout'));
  pcNavLinks.tracker.addEventListener('click', () => navigateTo('tracker'));

  // Mobile Bottom Tabs Nav
  mobNavTabs.menu.addEventListener('click', () => navigateTo('menu'));
  mobNavTabs.checkout.addEventListener('click', () => navigateTo('checkout'));
  mobNavTabs.tracker.addEventListener('click', () => navigateTo('tracker'));

  if (mobNavTabs.favorites) {
    mobNavTabs.favorites.addEventListener('click', () => {
      if (state.currentScreen !== 'menu') navigateTo('menu');
      drinksGrid.innerHTML = '';
      const favs = DRINKS.filter(d => d.favorite);
      document.getElementById('menuCountBadge').textContent = `${favs.length} Favorites`;
      favs.forEach(drink => {
        const card = document.createElement('div');
        card.className = 'drink-card';
        card.setAttribute('data-id', drink.id);
        card.innerHTML = `
          <div class="drink-thumb-wrap">
            <img src="${drink.image}" alt="${drink.name}" class="drink-thumb-img" loading="lazy">
            <span class="drink-badge-tag">${drink.badge}</span>
            <button type="button" class="drink-heart-btn active" aria-label="Favorite">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>
          <h3 class="drink-name-text">${drink.name}</h3>
          <p class="drink-desc-text">${drink.description}</p>
          <div class="drink-card-footer">
            <span class="drink-price-php">₱${drink.price.toFixed(2)}</span>
            <button type="button" class="drink-btn-add" aria-label="Customize ${drink.name}">&plus;</button>
          </div>
        `;
        card.addEventListener('click', () => openCustomizer(drink));
        drinksGrid.appendChild(card);
      });

      document.querySelectorAll('.mobile-nav-tab').forEach(t => t.classList.remove('active'));
      mobNavTabs.favorites.classList.add('active');
      showToast(`Showing ${favs.length} favorite beverage(s) ❤️`);
    });
  }

  // Back Link Buttons
  document.getElementById('btnBackToMenu').addEventListener('click', () => navigateTo('menu'));
  document.getElementById('btnAddMoreItems').addEventListener('click', () => navigateTo('menu'));
  document.getElementById('btnTrackerToMenu').addEventListener('click', () => navigateTo('menu'));
  document.getElementById('btnOrderAgain').addEventListener('click', () => {
    navigateTo('menu');
    showToast('Ready for your next craft beverage! 🌟');
  });

  // Tip Selector Chips
  tipOptionsWrap.addEventListener('click', (e) => {
    const chip = e.target.closest('.tip-chip');
    if (!chip) return;
    tipOptionsWrap.querySelectorAll('.tip-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const tipVal = chip.getAttribute('data-tip');
    if (tipVal === 'custom') {
      const customVal = prompt('Enter custom tip amount in Pesos (₱):', '60');
      state.tipAmount = parseFloat(customVal) || 0;
      chip.textContent = `₱${state.tipAmount.toFixed(0)}`;
    } else {
      state.tipAmount = parseFloat(tipVal) || 0;
    }
    renderCheckout();
    updateCartUI();
  });

  // Payment Selection
  document.querySelectorAll('.payment-card-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        document.querySelectorAll('.payment-card-opt').forEach(c => c.classList.remove('active'));
        opt.classList.add('active');
        state.paymentMethod = radio.value;
      }
    });
  });

  // Confirm Order Button
  btnPlaceOrder.addEventListener('click', () => {
    btnPlaceOrder.classList.add('loading');
    placeOrderText.textContent = 'Processing GCash Transfer...';
    btnPlaceOrder.disabled = true;

    setTimeout(() => {
      btnPlaceOrder.classList.remove('loading');
      btnPlaceOrder.disabled = false;
      navigateTo('tracker');
      showToast('Payment verified! Barista Marco is now brewing. ☕');
    }, 1200);
  });

  // Toggle View Mode (PC Desktop View vs Simulated Mobile Phone View)
  btnToggleDeviceMode.addEventListener('click', () => {
    state.isPhoneMode = !state.isPhoneMode;
    document.body.classList.toggle('simulated-phone-mode', state.isPhoneMode);
    
    if (state.isPhoneMode) {
      toggleModeIcon.textContent = '💻';
      toggleModeLabel.textContent = 'PC View';
      showToast('Switched to Mobile Phone Simulator View');
    } else {
      toggleModeIcon.textContent = '📱';
      toggleModeLabel.textContent = 'Phone View';
      showToast('Switched to Full PC Desktop Storefront View');
    }
  });

  // Design Report Modal
  btnOpenReport.addEventListener('click', () => {
    reportModalOverlay.classList.add('open');
    reportModalOverlay.setAttribute('aria-hidden', 'false');
  });

  const closeReportModal = () => {
    reportModalOverlay.classList.remove('open');
    reportModalOverlay.setAttribute('aria-hidden', 'true');
  };

  btnCloseReport.addEventListener('click', closeReportModal);
  btnCloseReportBottom.addEventListener('click', closeReportModal);
  reportModalOverlay.addEventListener('click', (e) => {
    if (e.target === reportModalOverlay) closeReportModal();
  });

  // Copy Report
  btnCopyReport.addEventListener('click', () => {
    const text = document.querySelector('.report-article').innerText;
    navigator.clipboard.writeText(text).then(() => {
      copyReportBtnText.textContent = 'Copied to Clipboard! ✓';
      setTimeout(() => {
        copyReportBtnText.textContent = 'Copy Report to Clipboard';
      }, 2500);
    }).catch(() => {
      alert('Report text ready to copy.');
    });
  });

  // Barista Contact Actions
  document.getElementById('btnCallBarista').addEventListener('click', () => {
    alert('Calling Barista Marco Castillo at Velvet & Bean Roastery Studio (+63 917 555 8920)...');
  });
  document.getElementById('btnMsgBarista').addEventListener('click', () => {
    alert('Opening chat with Barista Marco: "Hi Marco, looking forward to the craft!"');
  });
  document.getElementById('btnHelp').addEventListener('click', () => {
    alert('Customer Care Hotline (+63 2 8888 2326) & Live Chat is available 24/7.');
  });

  // Initialize
  renderDrinksGrid('all');
  updateCartUI();
});
