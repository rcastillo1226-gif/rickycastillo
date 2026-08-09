// Vercel Web Analytics
// This script injects Vercel Analytics tracking for the site
(function() {
  // Initialize the analytics queue
  if (window.va) return;
  
  window.va = function a() {
    var params = [].slice.call(arguments);
    if (!window.vaq) window.vaq = [];
    window.vaq.push(params);
  };

  // Inject the analytics script
  function inject() {
    var script = document.createElement('script');
    script.defer = true;
    script.src = '/_vercel/insights/script.js';
    
    var firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
