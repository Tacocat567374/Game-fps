window.__killshiftRoot=document.getElementById('killshift-root');

window.addEventListener('load', () => {
        setTimeout(() => {
          if (window.__killshiftEngineStarted) {
            return;
          }

          if (document.getElementById('engineError')) {
            return;
          }

          const errorPanel = document.createElement('div');
          errorPanel.id = 'engineError';
          errorPanel.setAttribute('role', 'alert');

          errorPanel.innerHTML = `
            <b>The 3D engine could not start.</b>
            <span>
              Killshift could not initialize the 3D engine. Check the browser console and reload the page.
            </span>
          `;

          document.body.appendChild(errorPanel);
        }, 4000);
      });

import './legacy/killshift-engine.js';
