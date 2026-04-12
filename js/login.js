(() => {
  const screen    = document.getElementById('login-screen');
  const bootLog   = document.getElementById('login-boot-log');
  const passInput = document.getElementById('login-password-input');
  const loginBtn  = document.getElementById('login-btn');
  const statusEl  = document.getElementById('login-status');
  const btnPower  = document.getElementById('btn-power');

  const BOOT_LINES = [
    { text: '[    0.000000] Linux version 6.8.0-portfolio (gcc 13.2.0)', type: 'info' },
    { text: '[    0.000000] BIOS-provided physical RAM map:', type: 'info' },
    { text: '[    0.112431] ACPI: IRQ0 used by override.', type: 'info' },
    { text: '[    0.448812] PCI: Using configuration type 1 for base access', type: 'info' },
    { text: '[    1.203944] systemd[1]: Starting system...', type: 'info' },
    { text: '[  OK  ] Started Journal Service.', type: 'ok' },
    { text: '[  OK  ] Reached target Local File Systems.', type: 'ok' },
    { text: '[  OK  ] Started Network Manager.', type: 'ok' },
    { text: '[  OK  ] Started OpenSSH server daemon.', type: 'ok' },
    { text: '[ WARN ] Clock skew detected. Syncing via NTP...', type: 'warn' },
    { text: '[  OK  ] Started Portfolio Service v2.0.4-stable.', type: 'ok' },
    { text: '[  OK  ] Reached target Multi-User System.', type: 'ok' },
  ];

  let animating = false;

  function getTimestamp() {
    return new Date().toLocaleTimeString('en-US', { hour12: false });
  }

  function showLine(line, delay) {
    return new Promise(resolve => {
      setTimeout(() => {
        const div = document.createElement('div');
        div.className = `log-line ${line.type}`;
        div.textContent = line.text;
        bootLog.appendChild(div);
        requestAnimationFrame(() => {
          div.style.opacity = '1';
          div.style.transform = 'translateY(0)';
        });
        // auto-scroll log
        bootLog.scrollTop = bootLog.scrollHeight;
        resolve();
      }, delay);
    });
  }

  async function runBootSequence() {
    bootLog.innerHTML = '';
    let delay = 0;
    for (const line of BOOT_LINES) {
      await showLine(line, delay);
      delay += Math.random() * 80 + 40;
    }
  }

  function showLogin() {
    // Make visible first (display), then opacity in next frame
    screen.style.display = 'flex';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        screen.classList.add('active');
      });
    });
    animating = true;
    statusEl.textContent = '';
    statusEl.className = '';
    passInput.value = '';

    runBootSequence().then(() => {
      statusEl.textContent = `${getTimestamp()} — portfolio-os login:`;
      setTimeout(() => passInput.focus(), 100);
      animating = false;
    });
  }

  function hideLogin() {
    screen.classList.remove('active');
    setTimeout(() => {
      screen.style.display = 'none';
    }, 400);
  }

  function doLogin() {
    if (animating) return;

    statusEl.className = 'success';
    statusEl.textContent = 'Authenticating...';

    setTimeout(() => {
      statusEl.textContent = `Welcome back, namtn. Session restored.`;
      setTimeout(() => hideLogin(), 900);
    }, 600);
  }

  // Power button opens login screen
  btnPower.addEventListener('click', showLogin);

  // Login button
  loginBtn.addEventListener('click', doLogin);

  // Enter key on password field
  passInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') doLogin();
  });
})();
