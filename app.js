/**
 * Safari Dakwah 2026 - Main Interactive Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
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
  const navbar = document.getElementById('main-navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('header-scrolled');
    } else {
      navbar.classList.remove('header-scrolled');
    }

    // ScrollSpy active link detection
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* 2. Mobile Menu Drawer */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !mobileMenu) return;

  function toggleMenu(open) {
    if (open) {
      mobileMenu.classList.remove('translate-x-full');
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.add('translate-x-full');
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  hamburgerBtn.addEventListener('click', () => toggleMenu(true));
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', () => toggleMenu(false));
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* 3. Smooth Scrolling with Offset */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* 4. Copy Bank Account to Clipboard with Toast Notification */
function initCopyClipboard() {
  const copyButtons = document.querySelectorAll('.btn-copy');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const copyTarget = btn.getAttribute('data-copy');
      if (!copyTarget) return;

      navigator.clipboard.writeText(copyTarget).then(() => {
        showToast(`Nomor Rekening ${copyTarget} berhasil disalin!`);
        
        // Button temporary visual feedback
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `
          <svg class="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>
          <span>Tersalin!</span>
        `;
        btn.classList.add('bg-emerald-800');

        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.classList.remove('bg-emerald-800');
        }, 2200);
      }).catch(err => {
        showToast('Gagal menyalin. Silakan salin manual.');
      });
    });
  });

  window.showToast = function(message) {
    if (!toast) return;
    toastText.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };
}

/* 5. Donation Options Interactive Detail Modal */
const donationDetailsData = {
  uang: {
    title: 'Donasi Uang / Dana Operasional Dakwah',
    badge: 'Paling Dibutuhkan',
    description: 'Donasi dana Anda akan dialokasikan langsung untuk pengadaan 2.000 paket sembako, biaya tenaga medis khitan massal, akomodasi dai ke pelosok terpencil, dan operasional kegiatan.',
    guidelines: [
      'Bebas menentukan nominal donasi (mulai dari Rp 10.000,-).',
      'Tersedia transfer via Bank Syariah Indonesia (BSI), Mandiri, BCA, dan QRIS.',
      'Sertakan kode unik (misal: Rp 100.026) atau konfirmasikan melalui formulir donasi.'
    ],
    actionText: 'Lihat Nomor Rekening & QRIS',
    actionHref: '#transfer'
  },
  pakaian: {
    title: 'Donasi Pakaian Layak Pakai',
    badge: 'Barang Fisik',
    description: 'Pakaian muslim, baju harian, mukena, sarung, peci, dan jilbab yang bersih serta layak pakai akan disalurkan kepada warga dhuafa & mualaf di daerah pelosok binaan.',
    guidelines: [
      'Pakaian dalam kondisi bersih, sudah dicuci dan dilipat rapi.',
      'Tidak sobek, tidak bernoda parah, dan kancing/resleting berfungsi.',
      'Kemas dalam kardus atau plastik tebal dengan label jenis pakaian (Pria/Wanita/Anak-anak).',
      'Drop point: Posko Utama Safari Dakwah 2026 (Jl. Dakwah Raya No. 45, Jakarta Selatan).'
    ],
    actionText: 'Hubungi Narahubung Drop-Off',
    actionHref: 'https://wa.me/6281234567890?text=Assalamu%27alaikum%2C+saya+ingin+mengirimkan+donasi+pakaian+layak+pakai+untuk+Safari+Dakwah+2026'
  },
  sembako: {
    title: 'Donasi Paket Sembako & Pangan',
    badge: 'Kebutuhan Pokok',
    description: 'Penyediaan bahan pokok (Beras, Minyak Goreng, Gula, Tepung, Mie Instan, Susu, dan Kurma) untuk memenuhi kebutuhan 2.000 keluarga dhuafa di wilayah target dakwah.',
    guidelines: [
      'Menerima sembako per komoditas atau paket lengkap siap salur senilai Rp 150.000/paket.',
      'Pastikan tanggal kedaluwarsa (expired date) minimal 6 bulan ke depan.',
      'Bisa dikirim langsung ke gudang logistik atau dipesan via mitra penyedia.'
    ],
    actionText: 'Tanya Paket Sembako via WA',
    actionHref: 'https://wa.me/6281234567890?text=Assalamu%27alaikum%2C+saya+ingin+konfirmasi+donasi+paket+sembako+Safari+Dakwah+2026'
  },
  quran: {
    title: 'Wakaf Al-Qur\'an & Buku Buku Islami',
    badge: 'Amal Jariyah Abadi',
    description: 'Distribusi Mushaf Al-Qur\'an Standar Madinah/Kemenag, Iqro, Juz Amma, buku panduan shalat, dan buku kisah Nabi untuk membina TPA dan masjid pelosok.',
    guidelines: [
      'Wakaf mushaf baru senilai Rp 85.000 / mushaf (bisa titip beli).',
      'Buku bacaan Islami anak & dewasa dalam kondisi sangat baik tanpa halaman hilang.',
      'Setiap mushaf akan dicap stempel wakaf dan dibagikan langsung kepada para santri pelosok.'
    ],
    actionText: 'Donasi Wakaf Mushaf Sekarang',
    actionHref: '#transfer'
  }
};

function initDonationOptions() {
  const cards = document.querySelectorAll('.donation-option-card');
  const modal = document.getElementById('donation-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalBadge = document.getElementById('modal-badge');
  const modalDesc = document.getElementById('modal-desc');
  const modalList = document.getElementById('modal-guidelines');
  const modalActionBtn = document.getElementById('modal-action-btn');

  if (!modal) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const type = card.getAttribute('data-type');
      const data = donationDetailsData[type];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalBadge.textContent = data.badge;
      modalDesc.textContent = data.description;
      
      modalList.innerHTML = '';
      data.guidelines.forEach(item => {
        const li = document.createElement('li');
        li.className = 'flex items-start gap-2 text-sm text-gray-700';
        li.innerHTML = `
          <svg class="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>${item}</span>
        `;
        modalList.appendChild(li);
      });

      modalActionBtn.textContent = data.actionText;
      modalActionBtn.setAttribute('href', data.actionHref);

      if (data.actionHref.startsWith('http')) {
        modalActionBtn.setAttribute('target', '_blank');
      } else {
        modalActionBtn.removeAttribute('target');
      }

      modal.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  if (modalActionBtn) {
    modalActionBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
}

/* 6. QRIS Modal Zoom & Download */
function initQrisModal() {
  const btnScanQris = document.getElementById('btn-scan-qris');
  const btnDownloadQris = document.getElementById('btn-download-qris');
  const qrisModal = document.getElementById('qris-modal');
  const qrisModalClose = document.getElementById('qris-modal-close');

  if (btnScanQris && qrisModal) {
    btnScanQris.addEventListener('click', () => {
      qrisModal.classList.add('active');
    });
  }

  if (qrisModalClose) {
    qrisModalClose.addEventListener('click', () => {
      qrisModal.classList.remove('active');
    });
  }

  if (qrisModal) {
    qrisModal.addEventListener('click', (e) => {
      if (e.target === qrisModal) {
        qrisModal.classList.remove('active');
      }
    });
  }

  if (btnDownloadQris) {
    btnDownloadQris.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Mengunduh QRIS Safari Dakwah 2026...');
      setTimeout(() => {
        showToast('QR Code QRIS berhasil disimpan di perangkat Anda.');
      }, 1000);
    });
  }
}

/* 7. Contact & Donation Confirmation Form */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const contact = document.getElementById('form-contact').value.trim();
    const type = document.getElementById('form-type').value;
    const message = document.getElementById('form-message').value.trim();

    if (!name || !contact) {
      showToast('Harap isi Nama dan Nomor WhatsApp / Email Anda.');
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

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();
      showToast(`Alhamdulillah, terima kasih Sahabat ${name}! Pesan dan doa Anda telah kami terima.`);
    }, 1200);
  });
}

/* 8. Impact Statistics Counter Animation */
function initStatsCounter() {
  const statElements = document.querySelectorAll('.stat-number');
  let animated = false;

  function countUp(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString('id-ID');
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString('id-ID');
      }
    }, stepTime);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statElements.forEach(el => countUp(el));
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats-container');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* 9. Countdown Timer to Safari Dakwah 2026 */
function initCountdownTimer() {
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minsEl = document.getElementById('countdown-mins');
  const secsEl = document.getElementById('countdown-secs');

  if (!daysEl) return;

  // Target event date: December 20, 2026
  const targetDate = new Date('December 21, 2026 08:00:00 GMT+0700').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* 10. Scroll In-View Fade Animations */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

