$(document).ready(function () {
  const table = $("#table")
    .DataTable({
      responsive: true,
      // dom: "Bfrtip",
      // buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
    })
    .columns.adjust()
    .responsive.recalc();

  $("body").on("click", ".modal-open", function (e) {
    e.preventDefault();
    const me = $(this),
      id = me.attr("id"),
      nama = me.attr("nama"),
      alamat = me.attr("alamat"),
      no_hp = me.attr("no_hp");

    toggleModal();
    const text = id == "add" ? "Save" : "Update";
    const titleModal = id == "add" ? "Tambah Data Baru" : "Edit Data ";
    const action = id == "add" ? "/calon" : `/calon/${id}`;

    $("#nama").val(nama);
    $("#alamat").val(alamat);
    $("#no_hp").val(no_hp);
    $(".modal-title").text(titleModal);
    $("#modal-btn-save").text(text);
    $("#formCalon").attr("action", action);
    $("#formCalon").attr("method", "POST");
  });

  $("body").on("click", ".modal-overlay", function (e) {
    e.preventDefault();
    toggleModal();
  });

  $("body").on("click", ".modal-close", function (e) {
    e.preventDefault();
    toggleModal();
  });

  document.onkeydown = function (evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
      isEscape = evt.key === "Escape" || evt.key === "Esc";
    } else {
      isEscape = evt.keyCode === 27;
    }
    if (isEscape && document.body.classList.contains("modal-active")) {
      toggleModal();
    }
  };

  function toggleModal() {
    const body = document.querySelector("body");
    const modal = document.querySelector(".modal");
    modal.classList.toggle("opacity-0");
    modal.classList.toggle("pointer-events-none");
    body.classList.toggle("modal-active");
  }

  function addEdit({
    nama,
    alamat,
    no_hp,
    materi,
    pemrograman,
    tanggung_jawab,
    jaringan,
    metode,
    sistem,
    alat,
    web,
    bInggris,
    berinteraksi,
    mengajar,
    presentrasi,
    nilai,
    rank,
    type,
  }) {
    const method = type == "add" ? "post" : "put";
    const data = {
      nama,
      alamat,
      no_hp,
      materi,
      pemrograman,
      tanggung_jawab,
      jaringan,
      metode,
      sistem,
      alat,
      web,
      bInggris,
      berinteraksi,
      mengajar,
      presentrasi,
      nilai,
      rank,
    };

    $.ajax({
      type: method,
      url: "/calon",
      data,
      success: function (response) {
        console.log(response);
      },
    });
  }
});
