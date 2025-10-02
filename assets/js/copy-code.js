(function() {
  function detectLanguageFromClass(codeEl) {
    // Lee lenguaje desde class="language-xxx" o data-language/data-lang
    let el = codeEl;
    let hops = 0;
    while (el && hops < 6) {
      const dataLang = el.getAttribute && (el.getAttribute('data-language') || el.getAttribute('data-lang'));
      if (dataLang) return String(dataLang).toLowerCase();
      const cls = (el.className || '').toString();
      const m = cls.match(/(?:^|\s)language-([a-zA-Z0-9_+\-]+)/);
      if (m && m[1]) return m[1].toLowerCase();
      el = el.parentElement;
      hops++;
    }
    return null;
  }

  function createButton() {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Copiar código');
    btn.innerHTML = '<svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
    return btn;
  }

  function getCodeText(codeEl) {
    return codeEl.innerText.replace(/^\$\s+/gm, '');
  }

  function attachButtons() {
    document.querySelectorAll('pre > code').forEach(function(code) {
      const pre = code.parentElement;
      if (pre.classList.contains('with-copy')) return;
      pre.classList.add('with-copy');

      const wrapper = document.createElement('div');
      wrapper.className = 'code-wrapper';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const btn = createButton();
      const lang = detectLanguageFromClass(code);
      if (lang && lang !== 'plaintext' && lang !== 'text') {
        btn.textContent = lang;
      }
      btn.addEventListener('click', function() {
        const text = getCodeText(code);
        navigator.clipboard.writeText(text).then(function() {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>';
          btn.classList.add('copied');
          setTimeout(function(){ btn.innerHTML = originalHTML; btn.classList.remove('copied'); }, 1200);
        }).catch(function() {
          try {
            const sel = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(code);
            sel.removeAllRanges();
            sel.addRange(range);
            document.execCommand('copy');
            sel.removeAllRanges();
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>';
            btn.classList.add('copied');
            setTimeout(function(){ btn.innerHTML = originalHTML; btn.classList.remove('copied'); }, 1200);
          } catch (e) {
            console.error('No se pudo copiar', e);
          }
        });
      });

      wrapper.appendChild(btn);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachButtons);
  } else {
    attachButtons();
  }
})();

