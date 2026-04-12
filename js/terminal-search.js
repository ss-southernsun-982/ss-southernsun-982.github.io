(() => {
  const popup   = document.getElementById('terminal-popup');
  const overlay = document.getElementById('terminal-overlay');
  const input   = document.getElementById('terminal-search-input');
  const results = document.getElementById('terminal-results');
  const counter = document.getElementById('t-result-count');
  const btnOpen = document.getElementById('btn-open-terminal');

  function buildIndex() {
    const index = [];
    const sectionMap = { home: '~/home', projects: '~/projects', skills: '~/skills', contact: '~/contact' };
    document.querySelectorAll('main section, main > div').forEach(section => {
      const label = sectionMap[section.id] || '~/page';
      section.querySelectorAll('p, li, h3, h4, a, pre').forEach(el => {
        const raw = el.textContent.replace(/\s+/g, ' ').trim();
        if (raw.length >= 4) index.push({ text: raw, el, section: label });
      });
    });
    return index;
  }

  function fuzzyMatch(query, target) {
    const q = query.toLowerCase(), t = target.toLowerCase();
    let qi = 0;
    for (let i = 0; i < t.length && qi < q.length; i++) {
      if (t[i] === q[qi]) qi++;
    }
    return qi === q.length;
  }

  function highlightMatch(text, query) {
    const q = query.toLowerCase();
    let result = '', qi = 0;
    for (let i = 0; i < text.length; i++) {
      if (qi < q.length && text[i].toLowerCase() === q[qi]) {
        result += `<mark>${text[i]}</mark>`; qi++;
      } else {
        result += text[i].replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }
    }
    return result;
  }

  let searchIndex = [], currentSelected = -1, activeHighlight = null;

  function openTerminal() {
    if (!searchIndex.length) searchIndex = buildIndex();
    popup.classList.add('open');
    overlay.classList.add('open');
    input.value = '';
    results.innerHTML = '';
    counter.textContent = 'type to search...';
    currentSelected = -1;
    setTimeout(() => input.focus(), 50);
  }

  function closeTerminal() {
    popup.classList.remove('open');
    overlay.classList.remove('open');
    input.blur();
  }

  function clearHighlight() {
    if (activeHighlight) {
      activeHighlight.classList.remove('search-highlight-active');
      activeHighlight = null;
    }
  }

  function goTo(item) {
    clearHighlight();
    item.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    item.el.classList.add('search-highlight-active');
    activeHighlight = item.el;
    setTimeout(() => item.el.classList.remove('search-highlight-active'), 2200);
    closeTerminal();
  }

  function renderResults(query) {
    currentSelected = -1;
    if (!query) { results.innerHTML = ''; counter.textContent = 'type to search...'; return; }

    const seen = new Set();
    const unique = searchIndex
      .filter(item => fuzzyMatch(query, item.text))
      .filter(m => { if (seen.has(m.el)) return false; seen.add(m.el); return true; })
      .slice(0, 12);

    counter.textContent = unique.length ? `${unique.length} result(s)` : 'no match';

    if (!unique.length) {
      results.innerHTML = `<div style="padding:14px;font-size:12px;color:var(--c-border);">// no results for "${query}"</div>`;
      return;
    }

    results.innerHTML = unique.map((item, i) => {
      const snippet = item.text.length > 80 ? item.text.slice(0, 80) + '…' : item.text;
      return `<div class="t-result-item" data-idx="${i}" role="option">
        <span class="t-section">${item.section}</span>
        <span class="t-content">${highlightMatch(snippet, query)}</span>
      </div>`;
    }).join('');

    results.querySelectorAll('.t-result-item').forEach(el => {
      el.addEventListener('click', () => goTo(unique[parseInt(el.dataset.idx)]));
    });
    results._data = unique;
  }

  function updateSelection(dir) {
    const items = results.querySelectorAll('.t-result-item');
    if (!items.length) return;
    items[currentSelected]?.classList.remove('selected');
    currentSelected = (currentSelected + dir + items.length) % items.length;
    const sel = items[currentSelected];
    sel.classList.add('selected');
    sel.scrollIntoView({ block: 'nearest' });
  }

  btnOpen.addEventListener('click', openTerminal);
  overlay.addEventListener('click', closeTerminal);
  input.addEventListener('input', () => renderResults(input.value.trim()));
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeTerminal(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); updateSelection(1); return; }
    if (e.key === 'ArrowUp')   { e.preventDefault(); updateSelection(-1); return; }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentSelected >= 0 && results._data) goTo(results._data[currentSelected]);
      else if (results._data?.length) goTo(results._data[0]);
    }
  });

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      popup.classList.contains('open') ? closeTerminal() : openTerminal();
    }
  });
})();
