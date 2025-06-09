const attendanceList = [];

function addToList() {
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  const checkIn = format12Hour(document.getElementById("checkIn").value);
  const checkOut = format12Hour(document.getElementById("checkOut").value);
  const supervisor = document.getElementById("supervisor").value;

  if (!name || !date || !checkIn || !checkOut) {
    alert("Please fill all fields except Supervisor.");
    return;
  }

  const entry = { name, date, checkIn, checkOut, supervisor };
  attendanceList.push(entry);

  updateTable();
  clearForm();
}

function updateTable() {
  const tbody = document.querySelector("#attendanceTable tbody");
  tbody.innerHTML = "";

  attendanceList.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.name}</td>
      <td>${entry.checkIn}</td>
      <td>${entry.checkOut}</td>
      <td>${entry.supervisor || '—'}</td>
      <td>
        <button onclick="editEntry(${index})">Edit</button>
        <button onclick="deleteEntry(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function deleteEntry(index) {
  if (confirm("Are you sure you want to delete this entry?")) {
    attendanceList.splice(index, 1);
    updateTable();
  }
}

function editEntry(index) {
  const entry = attendanceList[index];
  document.getElementById("name").value = entry.name;
  document.getElementById("date").value = entry.date;
  document.getElementById("checkIn").value = entry.checkIn;
  document.getElementById("checkOut").value = entry.checkOut;
  document.getElementById("supervisor").value = entry.supervisor;

  // Remove old entry so we overwrite it
  attendanceList.splice(index, 1);
  updateTable();
}




  attendanceList.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.date}</td>
      <td>${entry.checkIn}</td>
      <td>${entry.checkOut}</td>
      <td>${entry.supervisor}</td>
    `;
    tbody.appendChild(row);
  });


function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("date").value = "";
  document.getElementById("checkIn").value = "";
  document.getElementById("checkOut").value = "";
  document.getElementById("supervisor").value = "";
}

function exportListToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("Attendance List", 20, 20);

  let y = 30;
  attendanceList.forEach((entry, i) => {
    doc.setFontSize(10);
    doc.text(`${i + 1}. Name: ${entry.name} | date: ${entry.date} | checkIn: ${entry.checkIn} | checkOut: ${entry.checkOut} | Supervisor Segneture: ${entry.supervisor}`, 20, y);
    y += 10;
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("attendance-list.pdf");
}
function format12Hour(timeStr) {
  if (!timeStr) return "";
  const [hour, minute] = timeStr.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = ((hour + 11) % 12 + 1);
  return `${hour12}:${minute.toString().padStart(2, '0')} ${suffix}`;
}
