// Register the Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => {
        console.log('✅ Service Worker registered:', reg.scope);
      })
      .catch(err => {
        console.error('❌ Service Worker registration failed:', err);
      });
  });
}

// Add LLAMACOIN to MetaMask
function addLLAMACOIN() {
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: '0x8fc340121b3924d31220e7c47740f05f86e6ce27',
          symbol: 'LLAMA',
          decimals: 18,
          image: 'https://wiv-01.github.io/llamacoin/images/llamacoin_logo_200x200.png',
        },
      },
    }).then(success => {
      if (success) {
        alert('🦙 LLAMACOIN has been added to MetaMask!');
      } else {
        alert('🛑 Token addition was cancelled.');
      }
    }).catch(error => {
      console.error('MetaMask Add Error:', error);
    });
  } else {
    const warningEl = document.getElementById('metamask-warning');
    if (warningEl) {
      warningEl.innerHTML = `
        MetaMask not detected. 
        <a href="https://metamask.io/download.html" target="_blank" rel="noopener noreferrer">Get MetaMask</a>
      `;
      warningEl.style.display = 'block';
    }
  }
}
