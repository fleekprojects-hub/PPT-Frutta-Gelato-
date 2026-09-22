/**
 * ============================================================
 * FLEEK AI ENGINE // FRUTTA GELATO LUXURY ARTISAN EDITION
 * Master Engine: Anime.js Morphing, Interactive Dual Demos,
 * PO Document Generator & Dynamic Cost Calculator
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const printBtn = document.getElementById('printBtn');
  const navToggleBtn = document.getElementById('navToggleBtn');
  const navDrawer = document.getElementById('navDrawer');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const deckToast = document.getElementById('deckToast');
  const deckToastText = document.getElementById('deckToastText');

  // --- Typewriter Word & Letter Wrapper ---
  const animateTexts = document.querySelectorAll('.animate-text');
  animateTexts.forEach(el => {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    let wrappedHTML = '';
    
    words.forEach((wordText, wordIdx) => {
      let wordHTML = '<span class="word">';
      for (let i = 0; i < wordText.length; i++) {
        wordHTML += `<span class="letter">${wordText[i]}</span>`;
      }
      wordHTML += '</span>';
      wrappedHTML += wordHTML;
      if (wordIdx < words.length - 1) {
        wrappedHTML += ' ';
      }
    });
    
    el.innerHTML = wrappedHTML;
  });

  // Slide IDs ordered for navigation
  const slideIds = [
    'opening',
    'problem',
    'architecture',
    'demo-inbound',
    'demo-po',
    'doc-generator',
    'sys-flow',
    'extended-scope',
    'commercial-transparency',
    'outbound-roadmap',
    'timeline',
    'closing-cta'
  ];

  let currentIndex = 0;
  let isTransitioning = false;
  const cooldownMs = 700;

  // --- Anime.js Entry Trigger ---
  function triggerAnimeAnimations(content) {
    // 1. Letters Stagger
    const letters = content.querySelectorAll('.letter');
    if (letters.length > 0) {
      anime.remove(letters);
      anime.set(letters, { opacity: 0, translateY: 20 });
      anime({
        targets: letters,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(14),
        duration: 750,
        easing: 'easeOutElastic(1, .8)'
      });
    }

    // 2. Block elements Stagger
    const blocks = content.querySelectorAll('.cyber-decor, .wa-mock-card, .inspector-card, .cost-card, .timeline-step');
    if (blocks.length > 0) {
      anime.remove(blocks);
      anime.set(blocks, { opacity: 0, translateY: 25 });
      anime({
        targets: blocks,
        opacity: [0, 1],
        translateY: [25, 0],
        delay: anime.stagger(100, { start: 120 }),
        duration: 800,
        easing: 'easeOutQuart'
      });
    }

    // 3. Bubbles stagger
    const bubbles = content.querySelectorAll('.wa-bubble-container');
    if (bubbles.length > 0) {
      anime.remove(bubbles);
      anime.set(bubbles, { opacity: 0, scale: 0.9, translateY: 15 });
      anime({
        targets: bubbles,
        opacity: [0, 1],
        scale: [0.9, 1],
        translateY: [15, 0],
        delay: anime.stagger(150, { start: 200 }),
        duration: 750,
        easing: 'easeOutElastic(1, .7)'
      });
    }
  }

  // --- Viewport Auto-Scaling for 100% Single-Screen Fit ---
  function autoScaleActiveSlide() {
    const activeSlide = document.getElementById(slideIds[currentIndex]);
    if (!activeSlide) return;
    
    const content = activeSlide.querySelector('.section-content');
    if (!content) return;

    content.style.transform = '';
    const isDemo = activeSlide.classList.contains('slide-demo');
    content.style.transformOrigin = isDemo ? 'top center' : 'center center';
    
    // Only scale if screen height is unusually cramped and content genuinely overflows
    const availableHeight = activeSlide.clientHeight - 20;
    const contentHeight = content.scrollHeight;
    
    if (contentHeight > availableHeight && availableHeight > 300) {
      const scale = Math.max(0.90, Math.min(1, (availableHeight / contentHeight)));
      if (scale < 0.99) {
        content.style.transform = `scale(${scale})`;
        content.style.transformOrigin = isDemo ? 'top center' : 'center center';
      }
    }
  }

  window.addEventListener('resize', autoScaleActiveSlide);

  // --- Show Slide & Trigger Lifecycle ---
  function showSlide(index) {
    if (index < 0 || index >= slideIds.length) return;
    currentIndex = index;
    
    const slides = document.querySelectorAll('.slide-panel');
    slides.forEach(s => s.classList.remove('active-slide'));
    
    const targetSlide = document.getElementById(slideIds[index]);
    if (targetSlide) {
      targetSlide.classList.add('active-slide');
      targetSlide.scrollTop = 0;
      
      const content = targetSlide.querySelector('.section-content');
      if (content) {
        triggerAnimeAnimations(content);
      }

      setTimeout(autoScaleActiveSlide, 50);

      // Render Mermaid sequence diagram on slide 07
      const currentId = slideIds[index];
      if (window.mermaid && currentId === 'sys-flow') {
        setTimeout(() => {
          try {
            const diag = targetSlide.querySelector('pre.mermaid');
            if (diag && !diag.getAttribute('data-processed')) {
              mermaid.run({ nodes: [diag] });
            }
          } catch (e) {
            console.warn('Mermaid rendering notice:', e);
          }
        }, 120);
      }
    }
    
    // Update active nav link
    navLinks.forEach(link => {
      const targetHref = link.getAttribute('href').replace('#', '');
      if (targetHref === slideIds[index]) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update progress bar
    const progressPercent = (index / (slideIds.length - 1)) * 100;
    scrollProgressBar.style.width = `${progressPercent}%`;
  }

  // --- Navigation Input Event Listeners ---
  window.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) < 30) return;
    if (isTransitioning) return;

    const direction = e.deltaY > 0 ? 1 : -1;
    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < slideIds.length) {
      isTransitioning = true;
      showSlide(nextIndex);
      setTimeout(() => { isTransitioning = false; }, cooldownMs);
    }
  }, { passive: true });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (navDrawer && navDrawer.classList.contains('open')) {
        closeNav();
        return;
      }
    }

    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
      return;
    }

    if (isTransitioning) return;

    let direction = 0;
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      direction = 1;
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      direction = -1;
    }

    if (direction !== 0) {
      const nextIndex = currentIndex + direction;
      if (nextIndex >= 0 && nextIndex < slideIds.length) {
        isTransitioning = true;
        showSlide(nextIndex);
        setTimeout(() => { isTransitioning = false; }, cooldownMs);
      }
    }
  });

  // Touch swipe support
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (isTransitioning) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diffY = touchStartY - touchEndY;
    
    if (Math.abs(diffY) > 50) {
      const direction = diffY > 0 ? 1 : -1;
      const nextIndex = currentIndex + direction;
      if (nextIndex >= 0 && nextIndex < slideIds.length) {
        isTransitioning = true;
        showSlide(nextIndex);
        setTimeout(() => { isTransitioning = false; }, cooldownMs);
      }
    }
  }, { passive: true });

  // Init on slide 0
  showSlide(0);

  // --- Theme Toggle ---
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // --- Print ---
  printBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.print();
  });

  // --- Navigation Drawer Handlers ---
  function openNav() {
    navDrawer.classList.add('open');
    navOverlay.classList.add('open');
    navToggleBtn.classList.add('active');
  }

  function closeNav() {
    navDrawer.classList.remove('open');
    navOverlay.classList.remove('open');
    navToggleBtn.classList.remove('active');
  }

  navToggleBtn.addEventListener('click', () => {
    if (navDrawer.classList.contains('open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  navOverlay.addEventListener('click', closeNav);

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeNav();
      const targetId = link.getAttribute('href').replace('#', '');
      const targetIndex = slideIds.indexOf(targetId);
      if (targetIndex !== -1) {
        showSlide(targetIndex);
      }
    });
  });

  // --- Toast Notification Helper ---
  window.triggerToast = function(msg) {
    if (!deckToast) return;
    deckToastText.innerHTML = msg;
    deckToast.classList.add('show');
    setTimeout(() => { deckToast.classList.remove('show'); }, 3000);
  };

  // ============================================================
  // --- INTERACTIVE DEMO 1: INBOUND LEAD QUALIFYING & HANDOVER ---
  // ============================================================

  const inboundChatBody = document.getElementById('inboundChatBody');
  const inboundInput = document.getElementById('inboundInput');
  const leadName = document.getElementById('leadName');
  const leadCity = document.getElementById('leadCity');
  const leadBiz = document.getElementById('leadBiz');
  const leadVolume = document.getElementById('leadVolume');
  const salesHandoverBox = document.getElementById('salesHandoverBox');
  const inboundReasoningLog = document.getElementById('inboundReasoningLog');

  function appendInboundMessage(sender, text) {
    const container = document.createElement('div');
    container.className = `wa-bubble-container ${sender}`;
    
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    container.innerHTML = `
      <div class="wa-bubble ${sender}">
        ${text}
        <span class="wa-bubble-time">${timeStr}</span>
      </div>
    `;
    
    inboundChatBody.appendChild(container);
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  window.resetInboundChat = function() {
    inboundChatBody.innerHTML = `
      <div class="wa-bubble-container ai">
        <div class="wa-bubble ai">
          Halo! Terima kasih telah menghubungi <b>Frutta Gelato</b> 🍨✨<br>
          Apakah ada yang bisa kami bantu seputar kemitraan gerai gelato atau pasokan Horeca untuk bisnis Anda?
          <span class="wa-bubble-time">14:00</span>
        </div>
      </div>
    `;
    leadName.textContent = "Rian Prakoso";
    leadCity.textContent = "Surabaya Barat";
    leadBiz.textContent = "Dedicated Gelato Bar";
    leadVolume.textContent = "15 - 20 Tub / Bulan";
    inboundReasoningLog.innerHTML = `// AI Core Reasoning State:
{
  "sender_type": "NEW_INBOUND_LEAD",
  "intent_detected": "PARTNERSHIP_INVESTMENT",
  "confidence_score": 0.98,
  "action_taken": "QUALIFY_LOCATION_AND_ESCALATE_TO_SALES"
}`;
    window.triggerToast("🔄 Chat Demo 1 di-reset.");
  };

  window.triggerInboundPreset = function(presetId) {
    if (presetId === 1) {
      const userText = "Halo, saya tertarik buka kemitraan Frutta Gelato di Surabaya Barat untuk konsep cafe dessert kami.";
      appendInboundMessage('user', userText);
      
      setTimeout(() => {
        const aiText = "Halo Bapak Rian! Senang sekali dengan ketertarikan Anda. Wilayah <b>Surabaya Barat</b> merupakan salah satu target ekspansi prioritas kami. Untuk konsep cafe dessert, kami menyediakan paket pasokan 12 varian gelato artisan fresh beserta freezer display standar internasional. Berapa perkiraan kapasitas tempat duduk di cafe Anda?";
        appendInboundMessage('ai', aiText);
        
        // Update Inspector
        leadName.textContent = "Rian Prakoso";
        leadCity.textContent = "Surabaya Barat";
        leadBiz.textContent = "Cafe Dessert Lounge";
        leadVolume.textContent = "15 - 20 Tub / Bulan";

        // Pulse effect
        anime({
          targets: salesHandoverBox,
          scale: [0.98, 1],
          borderColor: ['#FF0033', '#E5A93C', '#FF0033'],
          duration: 900
        });

        inboundReasoningLog.innerHTML = `// AI Intent State:
{
  "sender": "NEW_PROSPECT",
  "intent": "PARTNERSHIP_SURABAYA_EXPANSION",
  "qualified_score": 0.94,
  "recommendation": "ESCALATE_TO_SALES_MEETING"
}`;
        window.triggerToast("🎯 <strong>New Lead Terkualifikasi!</strong> Intent kemitraan terdeteksi & data terekam.");
      }, 700);
    } 
    else if (presetId === 2) {
      const userText = "Berapa perkiraan modal awal dan fasilitas apa saja yang disediakan Frutta Gelato?";
      appendInboundMessage('user', userText);

      setTimeout(() => {
        const aiText = "Kemitraan Frutta Gelato tidak mengenakan royalty fee bulanan. Investasi awal difokuskan pada pengadaan display freezer showcase, starter kit rasa gelato, SOP penanganan suhu, dan materi branding. Tim Sales kami siap memberikan simulasi kalkulasi ROI lengkap. Boleh kami jadwalkan diskusi singkat?";
        appendInboundMessage('ai', aiText);
        leadBiz.textContent = "Kemitraan Franchise / Mitra";
        window.triggerToast("📄 Menjawab FAQ Kemitraan secara natural & mengarahkan ke Sales.");
      }, 700);
    } 
    else if (presetId === 3) {
      const userText = "Boleh saya jadwalkan konsultasi dengan tim sales Frutta Gelato minggu ini?";
      appendInboundMessage('user', userText);

      setTimeout(() => {
        const aiText = "Tentu Bapak Rian! Permintaan Anda telah kami teruskan ke Mas Alif (Account Executive Frutta Gelato). Beliau akan menghubungi WhatsApp Anda dalam 15 menit ke depan untuk mengonfirmasi jadwal meeting. Terima kasih! 🍨🤝";
        appendInboundMessage('ai', aiText);
        bookSalesMeetingDemo();
      }, 600);
    }
  };

  window.handleInboundSubmit = function(e) {
    e.preventDefault();
    const text = inboundInput.value.trim();
    if (!text) return;
    
    appendInboundMessage('user', text);
    inboundInput.value = '';

    setTimeout(() => {
      const aiReply = `Terima kasih atas pertanyaannya! Tim AI kami telah memetakan kebutuhan Anda: <i>"${text}"</i>. Kami akan mengarahkan informasi ini ke tim terkait Frutta Gelato.`;
      appendInboundMessage('ai', aiReply);
    }, 650);
  };

  window.bookSalesMeetingDemo = function() {
    window.triggerToast("📅 <strong>Jadwal Konsultasi Disimpan!</strong> Notifikasi diteruskan ke Tim Sales.");
    anime({
      targets: salesHandoverBox,
      backgroundColor: ['rgba(255, 0, 51, 0.08)', 'rgba(16, 185, 129, 0.15)', 'rgba(255, 0, 51, 0.08)'],
      duration: 1000
    });
  };

  // ============================================================
  // --- INTERACTIVE DEMO 2: PO CAPTURE, YA/TIDAK & SIGNED DOC ---
  // ============================================================

  const poChatBody = document.getElementById('poChatBody');
  const poInput = document.getElementById('poInput');
  const poConfirmBar = document.getElementById('poConfirmBar');
  const signedPoCard = document.getElementById('signedPoCard');
  const opsNotificationBox = document.getElementById('opsNotificationBox');
  const opsNotificationText = document.getElementById('opsNotificationText');
  const poJsonPayload = document.getElementById('poJsonPayload');
  const poTableBody = document.getElementById('poTableBody');
  const poDocNumber = document.getElementById('poDocNumber');
  const poClientName = document.getElementById('poClientName');
  const poDeliveryDate = document.getElementById('poDeliveryDate');
  const poToken = document.getElementById('poToken');

  function appendPoMessage(sender, text) {
    const container = document.createElement('div');
    container.className = `wa-bubble-container ${sender}`;
    
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    container.innerHTML = `
      <div class="wa-bubble ${sender}">
        ${text}
        <span class="wa-bubble-time">${timeStr}</span>
      </div>
    `;
    
    poChatBody.appendChild(container);
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  window.resetPoChat = function() {
    poChatBody.innerHTML = `
      <div class="wa-bubble-container ai">
        <div class="wa-bubble ai">
          <b>Selamat malam Mitra Frutta Gelato! 🌙🍨</b><br>
          Layanan penerimaan PO otomatis aktif 24 jam. Silakan kirimkan rincian pesanan gelato untuk outlet Anda.
          <span class="wa-bubble-time">23:15</span>
        </div>
      </div>
    `;
    poConfirmBar.style.display = 'none';
    opsNotificationBox.style.background = 'rgba(16, 185, 129, 0.08)';
    opsNotificationText.textContent = 'Menunggu input PO dari mitra via WhatsApp...';
    poDocNumber.textContent = 'PO-FRU-2026-0921-084';
    poClientName.textContent = 'Cafe Senja (Seminyak Bali)';
    poDeliveryDate.textContent = 'Besok, 11:00 WITA';
    poToken.textContent = '#FRU-VLD-9842';
    poTableBody.innerHTML = `
      <tr><td>Sicilian Pistachio 5L Tub</td><td>PST-5L</td><td style="text-align:right;">5 Tub</td></tr>
      <tr><td>Dark Chocolate 70% 5L Tub</td><td>DCH-5L</td><td style="text-align:right;">3 Tub</td></tr>
    `;
    poJsonPayload.innerHTML = `// Menunggu tangkapan order...
{
  "status": "IDLE",
  "channel": "WHATSAPP_NIGHT_GATEWAY",
  "guardrail_non_payment": true
}`;
    window.triggerToast("🔄 Chat Demo 2 di-reset.");
  };

  window.triggerPoPreset = function(presetId) {
    if (presetId === 1) {
      const userText = "Malam admin, dari Cafe Senja Seminyak mau repeat order Gelato: Sicilian Pistachio 5 tub, Dark Chocolate 3 tub. Kirim besok jam 11 siang ya.";
      appendPoMessage('user', userText);

      setTimeout(() => {
        const aiText = `Selamat malam <b>Cafe Senja Seminyak!</b> 🌙🍨<br>
Pesanan PO Anda telah berhasil kami uraikan:<br>
• 5 Tub <b>Sicilian Pistachio 5L</b> (SKU: PST-5L)<br>
• 3 Tub <b>Dark Chocolate 70% 5L</b> (SKU: DCH-5L)<br>
• Jadwal Kirim: <b>Besok, 11:00 WITA</b><br>
Total: <b>8 Tub Gelato</b>.<br><br>
Mohon konfirmasi: Apakah rincian pesanan di atas sudah benar? (Klik tombol di bawah atau balas <i>"Ya" / "Tidak"</i>).`;
        
        appendPoMessage('ai', aiText);
        poConfirmBar.style.display = 'flex';
        
        // Update preview table
        poDocNumber.textContent = `PO-FRU-2026-0921-0${Math.floor(Math.random() * 90 + 10)}`;
        poClientName.textContent = "Cafe Senja (Seminyak Bali)";
        poDeliveryDate.textContent = "Besok, 11:00 WITA";
        poTableBody.innerHTML = `
          <tr><td>Sicilian Pistachio 5L Tub</td><td>PST-5L</td><td style="text-align:right;">5 Tub</td></tr>
          <tr><td>Dark Chocolate 70% 5L Tub</td><td>DCH-5L</td><td style="text-align:right;">3 Tub</td></tr>
        `;
        
        window.triggerToast("⚡ PO Berhasil Di-parsing! Menunggu konfirmasi 'Ya / Tidak'.");
      }, 700);
    }
    else if (presetId === 2) {
      const userText = "Malam, dari The Seminyak Resort mau order 12 tub: 4 Mango Sorbet, 4 Vanilla Bean, 4 Strawberry Cheesecake untuk event lusa pagi.";
      appendPoMessage('user', userText);

      setTimeout(() => {
        const aiText = `Selamat malam <b>The Seminyak Resort!</b> Pesanan telah kami catat:<br>
• 4 Tub Mango Sorbet (MNG-5L)<br>
• 4 Tub Vanilla Bean Madagascar (VNL-5L)<br>
• 4 Tub Strawberry Cheesecake (STB-5L)<br>
Total: <b>12 Tub Gelato</b>. Jadwal: <b>Lusa Pagi (09:00 WITA)</b>.<br><br>
Apakah detail ini sudah sesuai untuk diproses ke sistem ERP?`;
        
        appendPoMessage('ai', aiText);
        poConfirmBar.style.display = 'flex';

        poDocNumber.textContent = `PO-FRU-2026-0921-0${Math.floor(Math.random() * 90 + 10)}`;
        poClientName.textContent = "The Seminyak Beach Resort";
        poDeliveryDate.textContent = "Lusa Pagi (09:00 WITA)";
        poTableBody.innerHTML = `
          <tr><td>Mango Sorbet 5L</td><td>MNG-5L</td><td style="text-align:right;">4 Tub</td></tr>
          <tr><td>Vanilla Bean Madagascar</td><td>VNL-5L</td><td style="text-align:right;">4 Tub</td></tr>
          <tr><td>Strawberry Cheesecake</td><td>STB-5L</td><td style="text-align:right;">4 Tub</td></tr>
        `;
      }, 700);
    }
    else if (presetId === 3) {
      const userText = "Min, pesanan PO #083 kemarin sore sudah sampai mana ya kurirnya?";
      appendPoMessage('user', userText);

      setTimeout(() => {
        const aiText = "Halo Cafe Senja! Berdasarkan data log ERP, <b>PO #083</b> saat ini berstatus <b>[IN_DELIVERY]</b>. Kurir Frutta Gelato (Bpk. Wayan) sedang dalam perjalanan menuju outlet Anda dengan estimasi tiba 20 menit lagi. 🛵🍨";
        appendPoMessage('ai', aiText);
        window.triggerToast("📦 Query Status Order ERP berhasil dijawab.");
      }, 650);
    }
  };

  window.confirmPoAction = function(isConfirmed) {
    poConfirmBar.style.display = 'none';

    if (isConfirmed) {
      appendPoMessage('user', "Ya, rincian pesanan sudah benar. Silakan diproses.");

      setTimeout(() => {
        const uniqueToken = `#FRU-VLD-${Math.floor(Math.random() * 9000 + 1000)}`;
        poToken.textContent = uniqueToken;

        const aiText = `Terima kasih! Pesanan telah <b>TERKONFIRMASI</b> ✅<br>
1. Tercatat otomatis di ERP Frutta Gelato.<br>
2. Dokumen PO bertanda tangan digital telah terbit dengan Token <code>${uniqueToken}</code>.<br>
3. Notifikasi pesanan telah diteruskan ke Grup WA Operasional.<br><br>
Tim gudang akan langsung mempersiapkan pesanan Anda esok pagi. Selamat beristirahat! 🍨✨`;
        
        appendPoMessage('ai', aiText);

        // Highlight Inspector Card
        anime({
          targets: signedPoCard,
          scale: [0.95, 1],
          borderColor: ['#FF0033', '#10b981'],
          duration: 850
        });

        // Highlight Ops Group Notification
        opsNotificationBox.style.background = 'rgba(16, 185, 129, 0.2)';
        opsNotificationText.textContent = `⚡ [PO BARU TERKONFIRMASI] Mitra: Cafe Senja Bali. 8 Tub Gelato (5 Pistachio, 3 Dark Choco). Kirim Besok 11:00 WITA. Status ERP: TERKUNCI.`;
        
        poJsonPayload.innerHTML = `POST /api/v1/frutta/orders/po-capture -> HTTP/1.1 200 OK
{
  "order_status": "SUCCESS_RECORDED",
  "document_generated": true,
  "delivery_token": "${uniqueToken}",
  "forwarded_to_group": "OPERASIONAL_FRUTTA_BALI",
  "non_payment_guardrail": "CONFIRMED_MANUAL_BILLING"
}`;

        window.triggerToast("🎉 <strong>PO Berhasil Tercatat!</strong> Dokumen PDF Signed terbit & terkirim ke Grup WA.");
      }, 700);
    } else {
      appendPoMessage('user', "Tidak, ada yang ingin saya ubah.");
      setTimeout(() => {
        appendPoMessage('ai', "Baik, pesanan sebelumnya dibatalkan. Silakan kirimkan kembali rincian rasa dan jumlah tub yang Anda inginkan.");
        window.triggerToast("Pesanan dibatalkan/revisi.");
      }, 500);
    }
  };

  window.handlePoSubmit = function(e) {
    e.preventDefault();
    const text = poInput.value.trim();
    if (!text) return;

    appendPoMessage('user', text);
    poInput.value = '';

    if (text.toLowerCase() === 'ya') {
      confirmPoAction(true);
    } else if (text.toLowerCase() === 'tidak') {
      confirmPoAction(false);
    } else {
      setTimeout(() => {
        appendPoMessage('ai', `Pesan Anda: <i>"${text}"</i> telah kami terima. Jika ini adalah revisi PO, mohon sebutkan rasa gelato dan jumlah tub yang diinginkan.`);
      }, 600);
    }
  };

  // ============================================================
  // --- INTERACTIVE COST CALCULATOR (SLIDE 09) ---
  // ============================================================

  window.updateCostCalculation = function(volumeVal) {
    const volume = parseInt(volumeVal, 10);
    const costPerBubble = 500;
    const totalCost = volume * costPerBubble;
    
    const volumeDisplay = document.getElementById('chatVolumeDisplay');
    const costDisplay = document.getElementById('costEstimateDisplay');

    if (volumeDisplay) {
      volumeDisplay.textContent = `${volume.toLocaleString('id-ID')} Chat`;
    }
    if (costDisplay) {
      costDisplay.textContent = `Rp ${totalCost.toLocaleString('id-ID')} / bln`;
    }
  };

});
