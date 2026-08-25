/**
 * Safari Dakwah 2026 - Main Interactive Application Script
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initCopyClipboard();
  initDonationOptions();
  initQrisModal();
  initContactForm();
  initStatsCounter();
  initCountdownTimer();
  initScrollAnimations();
});

/* 1. Navbar Sticky & Scroll Effects */
function initNavbar() {
  const navbar = document.getElementById("main-navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("header-scrolled");
    } else {
      navbar.classList.remove("header-scrolled");
    }

    // ScrollSpy active link detection
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

/* 2. Mobile Menu Drawer */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  if (!hamburgerBtn || !mobileMenu) return;

  function toggleMenu(open) {
    if (open) {
      mobileMenu.classList.remove("translate-x-full");
      mobileMenu.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    } else {
      mobileMenu.classList.add("translate-x-full");
      mobileMenu.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  hamburgerBtn.addEventListener("click", () => toggleMenu(true));
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", () => toggleMenu(false));
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener("click", () => toggleMenu(false));
  });
}

/* 3. Smooth Scrolling with Offset */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

/* 4. Copy Bank Account to Clipboard with Toast Notification */
function initCopyClipboard() {
  const copyButtons = document.querySelectorAll(".btn-copy");
  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toast-text");

  copyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const copyTarget = btn.getAttribute("data-copy");
      if (!copyTarget) return;

      navigator.clipboard
        .writeText(copyTarget)
        .then(() => {
          showToast(`Nomor Rekening ${copyTarget} berhasil disalin!`);

          // Button temporary visual feedback
          const originalHtml = btn.innerHTML;
          btn.innerHTML = `
          <svg class="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>
          <span>Tersalin!</span>
        `;
          btn.classList.add("bg-emerald-800");

          setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.classList.remove("bg-emerald-800");
          }, 2200);
        })
        .catch(err => {
          showToast("Gagal menyalin. Silakan salin manual.");
        });
    });
  });

  window.showToast = function (message) {
    if (!toast) return;
    toastText.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  };
}

/* 5. Donation Options Interactive Detail Modal */
const donationDetailsData = {
  uang: {
    title: "Donasi Uang / Dana Operasional Dakwah",
    badge: "Operasional",
    description:
      "Donasi dana Anda akan dialokasikan langsung untuk pengadaan paket sembako, biaya renovasi musholla, akomodasi dai ke desa target, dan operasional kegiatan.",
    guidelines: [
      "Bebas menentukan nominal donasi (mulai dari Rp 10.000,-).",
      "Tersedia transfer via Bank Jatim, Bank Jago, Bank Seabank dan QRIS.",
      'Sertakan kode "safwa26" pada note atau konfirmasikan melalui formulir donasi.',
    ],
    actionText: "Lihat Nomor Rekening & QRIS",
    actionHref: "#transfer",
  },
  pakaian: {
    title: "Donasi Pakaian Layak Pakai",
    badge: "Kebutuhan Pokok",
    description:
      "Pakaian muslim, baju harian, mukena, sarung, peci, dan jilbab yang bersih serta layak pakai akan disalurkan kepada warga membutuhkan.",
    guidelines: [
      "Pakaian dalam kondisi bersih, sudah dicuci dan dilipat rapi.",
      "Tidak sobek, tidak bernoda parah, dan kancing/resleting berfungsi.",
      "Kemas dalam kardus atau plastik tebal",
      "Drop point: Kesekretariatan UKM RISPOL (Gedung AS Politeknik Negeri Malang Lt. 2).",
      "Jam operasional: Pukul 10.00 – 16.30 WIB"
    ],
    actionText: "Hubungi Narahubung Donasi Offline",
    actionHref:
      "https://wa.me/6281935492638?text=Assalamu%27alaikm%2C+saya+ingin+mengirimkan+donasi+pakaian+layak+pakai+untuk+Safari+Dakwah+2026",
  },
  sembako: {
    title: "Donasi Paket Sembako",
    badge: "Kebutuhan Pokok",
    description:
      "Penyediaan bahan pokok (Beras, Minyak Goreng, Gula, Tepung, Mie Instan, Susu, dan Kurma) untuk memenuhi kebutuhan keluarga membutuhkan di desa target dakwah.",
    guidelines: [
      "Menerima sembako per komoditas atau paket lengkap siap salur",
      "Pastikan tanggal kedaluwarsa (expired date) minimal 6 bulan ke depan.",
      "Drop point: Kesekretariatan UKM RISPOL (Gedung AS Politeknik Negeri Malang Lt. 2).",
      "Jam operasional: Pukul 10.00 – 16.30 WIB"
    ],
    actionText: "Hubungi Narahubung Donasi Offline",
    actionHref:
      "https://wa.me/6281935492638?text=Assalamu%27alaikm%2C+saya+ingin+mengirimkan+donasi+paket+sembako+untuk+Safari+Dakwah+2026",
  },
  quran: {
    title: "Wakaf Al-Qur'an & Buku Buku Islami",
    badge: "Pendidikan",
    description:
      "Distribusi Mushaf Al-Qur'an Standar Madinah/Kemenag, Iqro, Juz Amma, buku panduan shalat, dan buku kisah Nabi untuk membina TPA dan masjid.",
    guidelines: [
      "Mushaf dalam kondisi sangat baik tanpa halaman rusak.",
      "Buku bacaan Islami anak & dewasa dalam kondisi sangat baik tanpa halaman hilang.",
      "Mushaf dan buku bacaan akan disalurkan pada warga dan TPQ.",
      "Drop point: Kesekretariatan UKM RISPOL (Gedung AS Politeknik Negeri Malang Lt. 2).",
      "Jam operasional: Pukul 10.00 – 16.30 WIB"
    ],
    actionText: "Hubungi Narahubung Donasi Offline",
    actionHref:
      "https://wa.me/6281935492638?text=Assalamu%27alaikm%2C+saya+ingin+mengirimkan+donasi+alquran+atau+buku+untuk+Safari+Dakwah+2026",
  },
};

function initDonationOptions() {
  const cards = document.querySelectorAll(".donation-option-card");
  const modal = document.getElementById("donation-modal");
  const modalClose = document.getElementById("modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalBadge = document.getElementById("modal-badge");
  const modalDesc = document.getElementById("modal-desc");
  const modalList = document.getElementById("modal-guidelines");
  const modalActionBtn = document.getElementById("modal-action-btn");

  if (!modal) return;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const type = card.getAttribute("data-type");
      const data = donationDetailsData[type];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalBadge.textContent = data.badge;
      modalDesc.textContent = data.description;

      modalList.innerHTML = "";
      data.guidelines.forEach(item => {
        const li = document.createElement("li");
        li.className = "flex items-start gap-2 text-sm text-gray-700";
        li.innerHTML = `
          <svg class="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>${item}</span>
        `;
        modalList.appendChild(li);
      });

      modalActionBtn.textContent = data.actionText;
      modalActionBtn.setAttribute("href", data.actionHref);

      if (data.actionHref.startsWith("http")) {
        modalActionBtn.setAttribute("target", "_blank");
      } else {
        modalActionBtn.removeAttribute("target");
      }

      modal.classList.add("active");
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  if (modalActionBtn) {
    modalActionBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }
}

/* 6. QRIS Modal Zoom & Download */
function initQrisModal() {
  const btnScanQris = document.getElementById("btn-scan-qris");
  // const btnDownloadQris = document.getElementById("btn-download-qris");
  const qrisModal = document.getElementById("qris-modal");
  const qrisModalClose = document.getElementById("qris-modal-close");

  if (btnScanQris && qrisModal) {
    btnScanQris.addEventListener("click", () => {
      qrisModal.classList.add("active");
    });
  }

  if (qrisModalClose) {
    qrisModalClose.addEventListener("click", () => {
      qrisModal.classList.remove("active");
    });
  }

  if (qrisModal) {
    qrisModal.addEventListener("click", e => {
      if (e.target === qrisModal) {
        qrisModal.classList.remove("active");
      }
    });
  }

  // if (btnDownloadQris) {
  //   btnDownloadQris.addEventListener("click", async () => {
  //     showToast("Mengunduh QRIS Safari Dakwah 2026...");
  //     await downloadimg(
  //       "file:///d%3A/KULIAH/RISPOL/web_safari_dakwah/assets/QRIS.webp",
  //       "qris-safari-dakwah-2026.webp",
  //     );
  //     showToast("QR Code QRIS berhasil disimpan di perangkat Anda.");
  //   });
  // }
}

// function downloadimg(url, namaFile) {
//   const link = document.createElement("a");
//   link.href = url;
//   link.download = namaFile; // Atribut ini memicu pengunduhan
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }

/* 7. Contact & Donation Confirmation Form */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("form-submit-btn");

  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("form-name").value.trim();
    const contact = document.getElementById("form-contact").value.trim();
    const type = document.getElementById("form-type").value;
    const message = document.getElementById("form-message").value.trim();

    if (!name || !contact) {
        showToast("Harap isi Nama dan Nomor WhatsApp / Email Anda.");
        return;
    }

    // Visual button state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Mengirim Data...
    `;
    submitBtn.disabled = true;

    // --- LOGIKA WHATSAPP DIMULAI DI SINI ---
    
    // 1. Tentukan nomor tujuan (Harus menggunakan kode negara, tanpa tanda '+' atau awalan '0')
    const adminWaNumber = "6281234567890"; // GANTI dengan nomor WhatsApp tujuan Anda

    // 2. Rangkai template pesan (Anda bisa menggunakan * teks * untuk membuat teks tebal di WA)
    const waTextTemplate = `Halo, saya ${name}. telah melakukan donasi berupa ${type}. Harapan saya, ${message}`;

    // 3. Ubah teks menjadi format URL yang aman
    const encodedWaText = encodeURIComponent(waTextTemplate);
    
    // 4. Buat tautan akhir WhatsApp
    const waUrl = `https://wa.me/${adminWaNumber}?text=${encodedWaText}`;

    // --- LOGIKA WHATSAPP SELESAI ---

    setTimeout(() => {
        // Kembalikan state tombol
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Eksekusi pengalihan ke WhatsApp di tab baru
        window.open(waUrl, '_blank');
        
        // Reset form dan tampilkan pesan sukses
        form.reset();
        showToast(
            `Alhamdulillah, terima kasih Sahabat ${name}! Pesan dan doa Anda telah kami terima.`
        );
    }, 1200);
});
}

/* 8. Impact Statistics Counter Animation */
function initStatsCounter() {
  const statElements = document.querySelectorAll(".stat-number");
  let animated = false;

  function countUp(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString("id-ID");
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString("id-ID");
      }
    }, stepTime);
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statElements.forEach(el => countUp(el));
        }
      });
    },
    { threshold: 0.3 },
  );

  const statsSection = document.getElementById("stats-container");
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* 9. Countdown Timer to Safari Dakwah 2026 */
function initCountdownTimer() {
  const daysEl = document.getElementById("countdown-days");
  const hoursEl = document.getElementById("countdown-hours");
  const minsEl = document.getElementById("countdown-mins");
  const secsEl = document.getElementById("countdown-secs");

  if (!daysEl) return;

  // Target event date: December 20, 2026
  const targetDate = new Date("December 21, 2026 08:00:00 GMT+0700").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minsEl.textContent = String(minutes).padStart(2, "0");
    secsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* 10. Scroll In-View Fade Animations */
function initScrollAnimations() {
  const elements = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.15 },
  );

  elements.forEach(el => observer.observe(el));
}
