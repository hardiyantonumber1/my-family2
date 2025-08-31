// ========== NAVIGASI SPA ==========
document.querySelectorAll(".nav-btn").forEach(button => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    document.querySelectorAll(".page").forEach(page => {
      page.classList.remove("active");
    });
    document.getElementById(targetId).classList.add("active");
  });
});

// ========== DATA ANGGOTA ==========
const anggotaData = [
  {
    nama: "Hadi Prayitno",
    peran: "Ayah",
    bio: "Ayah yang penuh kasih dan penyayang.",
    foto: "img/ayah.png",
    ucapan: "Terima kasih Ayah, sudah menjadi pelindung keluarga kami."
  },
  {
    nama: "Siti Wasiah",
    peran: "Mama",
    bio: "Mama yang sabar dan penuh perhatian.",
    foto: "img/mama.png",
    ucapan: "Terima kasih Mama, atas semua cinta dan doa yang tak pernah putus."
  },
  {
    nama: "Hardiyanto Jaya Pranata",
    peran: "Aku",
    bio: "Berusaha jadi kebanggaan keluarga.",
    foto: "img/hardi.png",
    ucapan: "Terima kasih diriku, sudah berjuang sejauh ini demi keluarga."
  },
  {
    nama: "Diva Cahaya Azzahra",
    peran: "Adek",
    bio: "Adek yang ceria dan membawa kebahagiaan.",
    foto: "img/adek.png",
    ucapan: "Terima kasih Adek, sudah membuat suasana rumah selalu hangat."
  }
];

const anggotaContainer = document.getElementById("anggotaContainer");
if (anggotaContainer) {
  anggotaData.forEach((a, index) => {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${a.foto}" alt="${a.nama}">
      <h3>${a.nama}</h3>
      <p>${a.peran}</p>
      <p>${a.bio}</p>
      <button onclick="showUcapan(${index})">Lihat Ucapan</button>
    `;
    anggotaContainer.appendChild(card);
  });
}

// Modal Ucapan
let modal = document.createElement("div");
modal.className = "modal";
modal.innerHTML = `
  <div class="modal-content">
    <h3 id="modalNama"></h3>
    <p id="modalUcapan"></p>
    <button class="close-modal" onclick="closeModal()">Tutup</button>
  </div>
`;
document.body.appendChild(modal);

function showUcapan(index) {
  document.getElementById("modalNama").innerText = anggotaData[index].nama;
  document.getElementById("modalUcapan").innerText = anggotaData[index].ucapan;
  modal.style.display = "flex";
}
function closeModal() {
  modal.style.display = "none";
}

// ========== FITUR AGENDA ==========
const agendaContainer = document.getElementById("agendaContainer");
if (agendaContainer) {
  agendaContainer.innerHTML = `
    <input type="date" id="tanggalAgenda">
    <input type="text" id="judulAgenda" placeholder="Judul Agenda">
    <button onclick="tambahAgenda()">Tambah</button>
    <ul id="daftarAgenda"></ul>
  `;
}
let agendaList = JSON.parse(localStorage.getItem("agendaList")) || [];
function tambahAgenda() {
  let tgl = document.getElementById("tanggalAgenda").value;
  let judul = document.getElementById("judulAgenda").value;
  if (tgl && judul) {
    agendaList.push({ tgl, judul });
    localStorage.setItem("agendaList", JSON.stringify(agendaList));
    renderAgenda();
  }
}
function renderAgenda() {
  let daftar = document.getElementById("daftarAgenda");
  if (daftar) {
    daftar.innerHTML = "";
    agendaList.forEach((a, i) => {
      let li = document.createElement("li");
      li.textContent = `${a.tgl} - ${a.judul}`;
      daftar.appendChild(li);
    });
  }
}
renderAgenda();

// ========== FITUR GALERI ==========
const galeriContainer = document.getElementById("galeriContainer");
if (galeriContainer) {
  galeriContainer.innerHTML = `
    <input type="file" id="fotoGaleri" accept="image/*">
    <button onclick="unggahFoto()">Unggah</button>
    <div id="fotoList" class="anggota-container"></div>
  `;
}
let galeriFoto = JSON.parse(localStorage.getItem("galeriFoto")) || [
  "img/galeri/foto1.jpg"
];
function unggahFoto() {
  let fileInput = document.getElementById("fotoGaleri");
  let file = fileInput.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function(e) {
      galeriFoto.push(e.target.result);
      localStorage.setItem("galeriFoto", JSON.stringify(galeriFoto));
      renderGaleri();
    };
    reader.readAsDataURL(file);
  }
}
function renderGaleri() {
  let fotoList = document.getElementById("fotoList");
  if (fotoList) {
    fotoList.innerHTML = "";
    galeriFoto.forEach(src => {
      let img = document.createElement("img");
      img.src = src;
      img.style.width = "150px";
      img.style.height = "150px";
      img.style.objectFit = "cover";
      img.style.margin = "5px";
      fotoList.appendChild(img);
    });
  }
}
renderGaleri();

// ========== FITUR BUKU TAMU ==========
const bukuTamuContainer = document.getElementById("bukuTamuContainer");
if (bukuTamuContainer) {
  bukuTamuContainer.innerHTML = `
    <input type="text" id="namaTamu" placeholder="Nama (opsional)">
    <textarea id="pesanTamu" placeholder="Tulis pesan..."></textarea>
    <button onclick="kirimPesan()">Kirim</button>
    <ul id="daftarPesan"></ul>
  `;
}
let pesanList = JSON.parse(localStorage.getItem("pesanList")) || [];
function kirimPesan() {
  let nama = document.getElementById("namaTamu").value || "Anonim";
  let pesan = document.getElementById("pesanTamu").value;
  if (pesan) {
    pesanList.push({ nama, pesan });
    localStorage.setItem("pesanList", JSON.stringify(pesanList));
    renderPesan();
  }
}
function renderPesan() {
  let daftar = document.getElementById("daftarPesan");
  if (daftar) {
    daftar.innerHTML = "";
    pesanList.forEach(p => {
      let li = document.createElement("li");
      li.textContent = `${p.nama}: ${p.pesan}`;
      daftar.appendChild(li);
    });
  }
}
renderPesan();

// ========== FITUR TUGAS ==========
const tugasContainer = document.getElementById("tugasContainer");
if (tugasContainer) {
  tugasContainer.innerHTML = `
    <input type="text" id="tugasBaru" placeholder="Tugas baru">
    <button onclick="tambahTugas()">Tambah</button>
    <div style="display:flex; justify-content:space-around; margin-top:20px;">
      <ul id="todoList"><h4>To Do</h4></ul>
      <ul id="doingList"><h4>Doing</h4></ul>
      <ul id="doneList"><h4>Done</h4></ul>
    </div>
  `;
}
let tugasData = JSON.parse(localStorage.getItem("tugasData")) || [];
function tambahTugas() {
  let tugas = document.getElementById("tugasBaru").value;
  if (tugas) {
    tugasData.push({ teks: tugas, status: "todo" });
    localStorage.setItem("tugasData", JSON.stringify(tugasData));
    renderTugas();
  }
}
function ubahStatus(i) {
  let s = tugasData[i].status;
  if (s === "todo") tugasData[i].status = "doing";
  else if (s === "doing") tugasData[i].status = "done";
  localStorage.setItem("tugasData", JSON.stringify(tugasData));
  renderTugas();
}
function renderTugas() {
  let todo = document.getElementById("todoList");
  let doing = document.getElementById("doingList");
  let done = document.getElementById("doneList");
  if (todo && doing && done) {
    todo.innerHTML = "<h4>To Do</h4>";
    doing.innerHTML = "<h4>Doing</h4>";
    done.innerHTML = "<h4>Done</h4>";
    tugasData.forEach((t, i) => {
      let li = document.createElement("li");
      li.textContent = t.teks;
      li.style.cursor = "pointer";
      li.onclick = () => ubahStatus(i);
      if (t.status === "todo") todo.appendChild(li);
      else if (t.status === "doing") doing.appendChild(li);
      else done.appendChild(li);
    });
  }
}
renderTugas();

// ========== FITUR KEUANGAN ==========
const keuanganContainer = document.getElementById("keuanganContainer");
if (keuanganContainer) {
  keuanganContainer.innerHTML = `
    <input type="number" id="jumlah" placeholder="Jumlah">
    <select id="jenis">
      <option value="pemasukan">Pemasukan</option>
      <option value="pengeluaran">Pengeluaran</option>
    </select>
    <button onclick="tambahKeuangan()">Tambah</button>
    <h3>Saldo: Rp <span id="saldo">0</span></h3>
    <ul id="riwayatKeuangan"></ul>
  `;
}
let keuanganData = JSON.parse(localStorage.getItem("keuanganData")) || [];
function tambahKeuangan() {
  let jumlah = parseFloat(document.getElementById("jumlah").value);
  let jenis = document.getElementById("jenis").value;
  if (!isNaN(jumlah)) {
    keuanganData.push({ jumlah, jenis });
    localStorage.setItem("keuanganData", JSON.stringify(keuanganData));
    renderKeuangan();
  }
}
function renderKeuangan() {
  let saldoEl = document.getElementById("saldo");
  let riwayat = document.getElementById("riwayatKeuangan");
  if (saldoEl && riwayat) {
    let saldo = 0;
    riwayat.innerHTML = "";
    keuanganData.forEach(k => {
      let li = document.createElement("li");
      li.textContent = `${k.jenis} : Rp ${k.jumlah}`;
      riwayat.appendChild(li);
      saldo += k.jenis === "pemasukan" ? k.jumlah : -k.jumlah;
    });
    saldoEl.textContent = saldo;
  }
}
renderKeuangan();
