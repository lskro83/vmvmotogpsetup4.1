const $ = id => document.getElementById(id);

let state = JSON.parse(localStorage.getItem('vmv_setup_v6') || 'null') || {
  pseudo: 'Jérémy #83',
  connecte: true,
  published: [{id:1, author:'Jérémy #83', date:'14/09/2025 - 16:32', context:{bike:'Ducati Desmosedici', track:'Le Mans (France)', weather:'Sec - Chaud'}, setup:{preloadFront:3,oilFront:5,springFront:4,compFront:6,extFront:3,preloadRear:5,springRear:4,compRear:4,extRear:5,swingarm:6,g1:3,g2:4,g3:5,g4:5,g5:5,g6:6,final:4,antiDribble:5,tcs:3,aw:4,ebs:4,frontRideHeight:4,rearRideHeight:5,trail:4,offset:5,frontTyre:'Medium',rearTyre:'Soft'}}],
  history: [],
  versions: 2
};

function persist() {
  localStorage.setItem('vmv_setup_v6', JSON.stringify(state));
  renderProfilUI();
}

function renderProfilUI() {
  if ($('pseudoInput')) $('pseudoInput').value = state.pseudo;
  if ($('profilPseudoTitre')) $('profilPseudoTitre').textContent = state.pseudo;
  if ($('topbarPseudo')) $('topbarPseudo').textContent = state.pseudo;
  
  const statusEl = $('topbarStatus');
  if (statusEl) {
    if (state.connecte) {
      statusEl.textContent = "Connecté";
      statusEl.style.color = "var(--green)";
    } else {
      statusEl.textContent = "Déconnecté";
      statusEl.style.color = "#ff6460";
    }
  }
  if ($('statSetups')) $('statSetups').textContent = state.published.filter(p => p.author === state.pseudo).length;
}

// Gestion Connexion / Déconnexion
if ($('btnConnecter')) {
  $('btnConnecter').onclick = () => {
    const val = $('pseudoInput').value.trim();
    if (!val) { alert("Entre un pseudo valide."); return; }
    state.pseudo = val;
    state.connecte = true;
    persist();
    alert("Profil mis à jour et connecté !");
  };
}

if ($('btnDeconnecter')) {
  $('btnDeconnecter').onclick = () => {
    state.connecte = false;
    persist();
    alert("Vous êtes déconnecté.");
  };
}

// Navigation par onglets
document.querySelectorAll('.tabs button').forEach(b => {
  b.onclick = () => {
    document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    b.classList.add('active');
    const target = $(b.dataset.page);
    if (target) target.classList.add('active');
  };
});

// Initialisation au chargement
renderProfilUI();
