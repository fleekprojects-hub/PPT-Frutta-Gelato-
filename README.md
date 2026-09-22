# Fleek AI Engine — Frutta Gelato Interactive Executive Deck

Dokumen presentasi eksekutif dan demonstrasi sistem interaktif untuk **Frutta Gelato** (Attn: Bapak Fauzan — Brand Manager & Tim IT / Operasional). Dirancang dengan estetika **Fleek Arasaka Cyber Dark** berpadu aksen **Artisan Gelato Luxury Gold** (`#111110` base, `#FF0033` Fleek Red, `#E5A93C` Gelato Warm Gold, dan `#10b981` Emerald).

---

## 🧭 Struktur 12 Slide Presentasi

| No | Slide ID | Judul & Fokus Utama |
| :---: | :--- | :--- |
| **01** | `opening` | **Executive Cover:** Branding resmi Frutta Gelato x Fleek Project, Marquee ekspansi Horeca nasional & Alibaba B2B. |
| **02** | `problem` | **Strategic Context:** 3 Bottleneck Operasional (Admin non-24 jam, PO malam hari terbengkalai, leads website tanpa kualifikasi). |
| **03** | `architecture` | **Dual-Engine Architecture:** Pilar 1 (AI Admin Sales Inbound) vs Pilar 2 (AI PO Operations Engine 24/7). |
| **04** | `demo-inbound` | **🔥 LIVE DEMO 1:** Inbound Calon Mitra Baru, Intent Memory (`NEW LEAD`), Lead Scoring & Auto-Escalation ke Tim Sales. |
| **05** | `demo-po` | **🔥 LIVE DEMO 2 (THE SHOWSTOPPER):** PO Capture Malam Hari, Konfirmasi "Ya/Tidak", Digital Signed PO & Broadcast Grup WA Ops. |
| **06** | `doc-generator` | **Deep-Dive Document Generation:** Standarisasi nomor PO, mapping SKU otomatis, token validasi, & *Strict Non-Payment Guardrail*. |
| **07** | `sys-flow` | **Technical Flowchart (Mermaid.js):** Sequence alur data end-to-end (WhatsApp ➔ Fleek Core ➔ Open API ERP ➔ Grup Operasional). |
| **08** | `extended-scope` | **Fase 1.5 Technical Scoping:** Cek Stok Gelato via Chat (Stock Inquiry) & Pelacakan Status Pengiriman (Order Tracking). |
| **09** | `commercial-transparency` | **3rd Party Cost Transparency:** Pemodelan biner **Rp 500 / bubble**, **Threshold Guardrail (Maks 6–8 bubble)** anti-boncos, & Interactive Cost Calculator. |
| **10** | `outbound-roadmap` | **Workstream B (Future Growth):** Scraping & enrichment direktori Horeca nasional untuk suplai qualified leads ke sales. |
| **11** | `timeline` | **4-Week Implementation Roadmap:** Tahapan dari API Sandbox Discovery hingga Go-Live & Staff Training. |
| **12** | `closing-cta` | **Next Steps & Technical Handshake:** 3 Langkah konkrit persiapan Technical Discovery bersama tim IT Frutta Gelato. |

---

## 🎮 Panduan Presentasi Demo Interaktif (Untuk AE / Alif)

### Skenario Demo 1: Inbound Kemitraan (Slide 04)
1. Di Slide 04, klik chip preset: **`🍦 Tanya Syarat Kemitraan Surabaya`**.
2. Perhatikan AI merespons dengan gaya bahasa brand yang natural dan menanyakan kualifikasi tempat usaha.
3. Di panel kanan (Inspector), tunjukkan bahwa sistem secara otomatis mencatat profil prospek:
   - *Nama: Rian Prakoso*
   - *Target Lokasi: Surabaya Barat*
   - *Model Bisnis: Cafe Dessert Lounge*
   - *Estimasi Kebutuhan: 15–20 Tub / Bulan*
4. Jelaskan kepada Pak Fauzan: *"Karena kemitraan B2B tidak bisa di-close di chat, sistem langsung mengaktifkan tombol eskalasi ke Tim Sales manusia lengkap dengan rangkuman data di atas."*

### Skenario Demo 2: PO Malam Hari & Signed Document (Slide 05 ⭐)
1. Di Slide 05, klik chip preset: **`🌙 Kirim PO Malam (Cafe Senja Bali)`**.
2. Pesan simulasi mitra existing masuk pada pukul 23.15 WITA.
3. AI mengurai varian rasa gelato menjadi SKU standar dan memunculkan tombol konfirmasi:
   - **`[ ✅ YA, PROSES PO ]`**
   - **`[ ❌ TIDAK / UBAH ]`**
4. Klik tombol **`✅ YA, PROSES PO`**.
5. **Perhatikan reaksi simultan di layar kanan:**
   - 📑 Dokumen **PURCHASE ORDER (PO)** resmi bertanda tangan digital terbit lengkap dengan Token Validasi `#FRU-VLD-XXXX`.
   - 📢 Notifikasi seketika terkirim ke **Grup WhatsApp Operasional Frutta Bali** untuk dipersiapkan tim gudang esok pagi.
   - ⚙️ Log API ERP mencatat `HTTP 200 SUCCESS_RECORDED`.

---

## 💰 Transparansi Biaya 3rd Party (Slide 09)

- **Biaya Chat AI:** **Rp 500 per bubble balasan** (mencakup NLU Gemini 2.0 Flash + Meta WhatsApp Cloud API).
- **Biaya Generate Dokumen:** **Rp 1.500 per dokumen PDF PO signed**.
- **Threshold Guardrail (Anti-Boncos):** Dibatasi maksimal **6–8 bubble** per sesi percakapan sebelum otomatis dialihkan ke manusia.
- **Kalkulator Interaktif:** Klien bisa menggeser slider volume chat bulanan untuk melihat estimasi pengeluaran secara transparan (contoh: 1.000 chat = Rp 500.000 / bulan).

---

## 🚀 Panduan Deployment ke Vercel (1 Menit)

1. Buka Terminal di folder ini:
   ```bash
   cd "/Users/haimac/Dimitri Ahmad/Fleek/Client - Frutta Gelato"
   ```
2. Inisialisasi Git:
   ```bash
   git init && git add . && git commit -m "feat: frutta gelato executive interactive deck" && git branch -M main
   ```
3. Buat repo baru di GitHub (misal `frutta-gelato-deck`), hubungkan remote, lalu push:
   ```bash
   git remote add origin https://github.com/USERNAME_ANDA/frutta-gelato-deck.git
   git push -u origin main
   ```
4. Buka [Vercel](https://vercel.com/new), pilih repository tersebut, dan klik **Deploy**.

---
*Confidential — PT Fleek Group Indonesia — Fleek Project*
