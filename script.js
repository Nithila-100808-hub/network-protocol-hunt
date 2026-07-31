// Protocol Data
const protocols = [
  {
    id: 'http',
    name: 'HTTP',
    fullName: 'HyperText Transfer Protocol',
    port: 80,
    secure: false,
    description: 'The foundation of data communication on the World Wide Web.',
    uses: ['Web browsing', 'API communication', 'Loading web pages', 'REST services'],
    advantages: ['Simple and easy to implement', 'Widely supported', 'Stateless protocol', 'Flexible'],
    risks: ['No encryption - data sent in plain text', 'Vulnerable to MITM attacks', 'No authentication', 'Session hijacking possible'],
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.15)'
  },
  {
    id: 'https',
    name: 'HTTPS',
    fullName: 'HyperText Transfer Protocol Secure',
    port: 443,
    secure: true,
    description: 'Secure version of HTTP using TLS/SSL encryption.',
    uses: ['Secure web browsing', 'Online banking', 'E-commerce', 'Login pages'],
    advantages: ['Encrypted communication', 'Data integrity', 'Authentication via certificates', 'SEO benefits'],
    risks: ['Slightly slower due to encryption', 'Certificate management required', 'TLS vulnerabilities exist', 'Mixed content issues'],
    color: '#00ff88',
    bgColor: 'rgba(0,255,136,0.15)'
  },
  {
    id: 'ftp',
    name: 'FTP',
    fullName: 'File Transfer Protocol',
    port: 21,
    secure: false,
    description: 'Standard network protocol for transferring files between systems.',
    uses: ['File uploads/downloads', 'Website maintenance', 'Large file transfers', 'Backup systems'],
    advantages: ['Fast file transfers', 'Supports large files', 'Directory management', 'Widely supported'],
    risks: ['Credentials sent in plain text', 'No encryption', 'Vulnerable to sniffing', 'FTP bounce attacks'],
    color: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.15)'
  },
  {
    id: 'dns',
    name: 'DNS',
    fullName: 'Domain Name System',
    port: 53,
    secure: false,
    description: 'Translates human-readable domain names to IP addresses.',
    uses: ['Domain resolution', 'Email routing', 'Load balancing', 'Reverse lookups'],
    advantages: ['Human-friendly names', 'Distributed system', 'Caching improves speed', 'Hierarchical structure'],
    risks: ['DNS spoofing/poisoning', 'DNS amplification attacks', 'Zone transfer vulnerabilities', 'Cache poisoning'],
    color: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.15)'
  },
  {
    id: 'tcp',
    name: 'TCP',
    fullName: 'Transmission Control Protocol',
    port: 'Various',
    secure: 'Depends on implementation',
    description: 'Connection-oriented protocol ensuring reliable data delivery.',
    uses: ['Web browsing', 'Email', 'File transfers', 'Database connections'],
    advantages: ['Reliable delivery', 'Error checking', 'Ordered data transfer', 'Flow control'],
    risks: ['SYN flood attacks', 'Connection hijacking', 'Slow due to overhead', 'Resource intensive'],
    color: '#00d4ff',
    bgColor: 'rgba(0,212,255,0.15)'
  },
  {
    id: 'udp',
    name: 'UDP',
    fullName: 'User Datagram Protocol',
    port: 'Various',
    secure: 'Depends on implementation',
    description: 'Connectionless protocol for fast, lightweight transmissions.',
    uses: ['Video streaming', 'Online gaming', 'DNS queries', 'VoIP'],
    advantages: ['Low latency', 'No connection setup', 'Lightweight header', 'Fast transmission'],
    risks: ['No guaranteed delivery', 'No error recovery', 'Packet loss', 'UDP flood attacks'],
    color: '#ec4899',
    bgColor: 'rgba(236,72,153,0.15)'
  },
  {
    id: 'icmp',
    name: 'ICMP',
    fullName: 'Internet Control Message Protocol',
    port: 'N/A',
    secure: false,
    description: 'Used for error messages and operational information in IP networks.',
    uses: ['Ping commands', 'Traceroute', 'Error reporting', 'Network diagnostics'],
    advantages: ['Simple diagnostics', 'Low overhead', 'Essential for troubleshooting', 'Universal support'],
    risks: ['ICMP flood attacks', 'Ping of Death', 'ICMP redirect attacks', 'Smurf attacks'],
    color: '#ef4444',
    bgColor: 'rgba(239,68,68,0.15)'
  },
  {
    id: 'ssh',
    name: 'SSH',
    fullName: 'Secure Shell',
    port: 22,
    secure: true,
    description: 'Cryptographic protocol for secure remote login and command execution.',
    uses: ['Remote server access', 'Secure file transfers (SFTP/SCP)', 'Tunneling', 'Port forwarding'],
    advantages: ['Strong encryption', 'Public key authentication', 'Port forwarding', 'Replaces insecure Telnet'],
    risks: ['Brute force attacks', 'Key management complexity', 'Misconfigured permissions', 'CVE vulnerabilities'],
    color: '#00ff88',
    bgColor: 'rgba(0,255,136,0.15)'
  }
];

// Sample Packets for Analyzer
const samplePackets = [
  { src: '192.168.1.105', dst: '142.250.185.78', proto: 'HTTPS', port: 443, size: 1420, status: 'safe' },
  { src: '192.168.1.105', dst: '8.8.8.8', proto: 'DNS', port: 53, size: 78, status: 'safe' },
  { src: '203.0.113.45', dst: '192.168.1.105', proto: 'TCP', port: 22, size: 64, status: 'warn' },
  { src: '192.168.1.105', dst: '52.94.76.10', proto: 'SSH', port: 22, size: 92, status: 'safe' },
  { src: '198.51.100.22', dst: '192.168.1.105', proto: 'ICMP', port: 'N/A', size: 84, status: 'danger' },
  { src: '192.168.1.105', dst: '93.184.216.34', proto: 'HTTP', port: 80, size: 512, status: 'warn' },
  { src: '192.168.1.105', dst: '172.217.14.110', proto: 'UDP', port: 3478, size: 128, status: 'safe' },
  { src: '185.220.101.33', dst: '192.168.1.105', proto: 'FTP', port: 21, size: 256, status: 'danger' },
  { src: '192.168.1.105', dst: '13.107.42.14', proto: 'HTTPS', port: 443, size: 2048, status: 'safe' },
  { src: '203.0.113.99', dst: '192.168.1.105', proto: 'TCP', port: 3389, size: 48, status: 'danger' }
];

// DOM Elements
const protocolsGrid = document.getElementById('protocolsGrid');
const modal = document.getElementById('protocolModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');
const searchInput = document.getElementById('searchInput');
const startScanBtn = document.getElementById('startScanBtn');
const clearScanBtn = document.getElementById('clearScanBtn');
const scanStatus = document.getElementById('scanStatus');
const packetTableBody = document.getElementById('packetTableBody');

// Render Protocol Cards
function renderProtocols(filter = '') {
  protocolsGrid.innerHTML = '';
  const filtered = protocols.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) ||
    p.fullName.toLowerCase().includes(filter.toLowerCase()) ||
    p.description.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(protocol => {
    const card = document.createElement('div');
    card.className = 'protocol-card';
    card.innerHTML = `
      <div class="protocol-icon" style="background: ${protocol.bgColor}; color: ${protocol.color}">
        ${protocol.name}
      </div>
      <h3>${protocol.fullName}</h3>
      <p>${protocol.description}</p>
      <div class="protocol-meta">
        <span class="badge badge-port">Port: ${protocol.port}</span>
        <span class="badge ${protocol.secure === true ? 'badge-secure' : protocol.secure === false ? 'badge-insecure' : 'badge-port'}">
          ${protocol.secure === true ? 'Secure' : protocol.secure === false ? 'Not Secure' : 'Varies'}
        </span>
      </div>
    `;
    card.addEventListener('click', () => openModal(protocol));
    protocolsGrid.appendChild(card);
  });
}

// Open Modal
function openModal(protocol) {
  modalBody.innerHTML = `
    <div class="modal-header">
      <div class="protocol-icon" style="background: ${protocol.bgColor}; color: ${protocol.color}">
        ${protocol.name}
      </div>
      <div>
        <h2>${protocol.name}</h2>
        <p style="color: var(--text-secondary)">${protocol.fullName}</p>
      </div>
    </div>
    <div class="detail-grid">
      <div class="detail-item">
        <h4>What it is</h4>
        <p>${protocol.description}</p>
      </div>
      <div class="detail-item">
        <h4>Default Port Number</h4>
        <p style="font-family: monospace; font-size: 1.1rem; color: var(--accent-cyan)">${protocol.port}</p>
      </div>
      <div class="detail-item">
        <h4>Security Status</h4>
        <p style="color: ${protocol.secure === true ? 'var(--accent-green)' : protocol.secure === false ? 'var(--accent-red)' : 'var(--accent-yellow)'}">
          ${protocol.secure === true ? '✓ Secure - Uses encryption or secure mechanisms' : protocol.secure === false ? '✗ Not Secure - Transmits data in plain text' : '~ Security depends on implementation'}
        </p>
      </div>
      <div class="detail-item">
        <h4>Common Uses</h4>
        <ul>${protocol.uses.map(u => `<li>${u}</li>`).join('')}</ul>
      </div>
      <div class="detail-item">
        <h4>Advantages</h4>
        <ul>${protocol.advantages.map(a => `<li>${a}</li>`).join('')}</ul>
      </div>
      <div class="detail-item">
        <h4>Risks & Vulnerabilities</h4>
        <ul>${protocol.risks.map(r => `<li>${r}</li>`).join('')}</ul>
      </div>
    </div>
  `;
  modal.classList.add('active');
}

// Close Modal
modalClose.addEventListener('click', () => modal.classList.remove('active'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});

// Navigation
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.dataset.section;
    sections.forEach(s => s.classList.remove('active'));
    document.getElementById(target).classList.add('active');
  });
});

// Search
searchInput.addEventListener('input', (e) => {
  renderProtocols(e.target.value);
});

// Packet Analyzer
let scanInterval;
let packetIndex = 0;

function addPacketRow(packet, index) {
  const row = document.createElement('tr');
  const statusClass = packet.status === 'safe' ? 'status-safe' : packet.status === 'warn' ? 'status-warn' : 'status-danger';
  const statusText = packet.status === 'safe' ? '✓ Safe' : packet.status === 'warn' ? '⚠ Warning' : '✗ Suspicious';
  
  row.innerHTML = `
    <td>${index + 1}</td>
    <td>${packet.src}</td>
    <td>${packet.dst}</td>
    <td><strong>${packet.proto}</strong></td>
    <td>${packet.port}</td>
    <td>${packet.size} bytes</td>
    <td class="${statusClass}">${statusText}</td>
    <td><button class="btn-copy" onclick="copyPacket(this, '${packet.src}', '${packet.dst}', '${packet.proto}', '${packet.port}', '${packet.size}', '${packet.status}')">Copy</button></td>
  `;
  packetTableBody.appendChild(row);
}

function copyPacket(btn, src, dst, proto, port, size, status) {
  const text = `Packet Details:\nSource: ${src}\nDestination: ${dst}\nProtocol: ${proto}\nPort: ${port}\nSize: ${size} bytes\nStatus: ${status}`;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  });
}

startScanBtn.addEventListener('click', () => {
  if (scanInterval) return;
  packetTableBody.innerHTML = '';
  packetIndex = 0;
  scanStatus.textContent = 'Scanning network...';
  scanStatus.classList.add('scanning');
  startScanBtn.disabled = true;
  startScanBtn.style.opacity = '0.6';

  scanInterval = setInterval(() => {
    if (packetIndex >= samplePackets.length) {
      clearInterval(scanInterval);
      scanInterval = null;
      scanStatus.textContent = 'Scan complete - ' + samplePackets.length + ' packets captured';
      scanStatus.classList.remove('scanning');
      startScanBtn.disabled = false;
      startScanBtn.style.opacity = '1';
      return;
    }
    addPacketRow(samplePackets[packetIndex], packetIndex);
    packetIndex++;
    scanStatus.textContent = `Capturing packet ${packetIndex}/${samplePackets.length}...`;
  }, 600);
});

clearScanBtn.addEventListener('click', () => {
  if (scanInterval) {
    clearInterval(scanInterval);
    scanInterval = null;
  }
  packetTableBody.innerHTML = '';
  packetIndex = 0;
  scanStatus.textContent = 'Ready to scan';
  scanStatus.classList.remove('scanning');
  startScanBtn.disabled = false;
  startScanBtn.style.opacity = '1';
});

// Initialize
renderProtocols();