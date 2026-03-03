// ---------- Range Updaters ----------
function attachRangeUpdater(rateInput, rateValue, suffix) {
  rateInput.addEventListener("input", () => {
    rateValue.textContent = `$${rateInput.value}${suffix}`;
  });
}

attachRangeUpdater(document.getElementById("product1Rate"), document.getElementById("product1RateValue"), "/hr");
attachRangeUpdater(document.getElementById("product2Rate"), document.getElementById("product2RateValue"), " each");
attachRangeUpdater(document.getElementById("product3Rate"), document.getElementById("product3RateValue"), " each");
attachRangeUpdater(document.getElementById("product4Rate"), document.getElementById("product4RateValue"), "/session");
attachRangeUpdater(document.getElementById("product5Rate"), document.getElementById("product5RateValue"), "/package");
attachRangeUpdater(document.getElementById("product6Rate"), document.getElementById("product6RateValue"), "/license");

// ---------- Calculate Total ----------
document.getElementById("calculateBtn").addEventListener("click", () => {
  const qty1 = parseInt(document.getElementById("product1Qty").value) || 0;
  const qty2 = parseInt(document.getElementById("product2Qty").value) || 0;
  const qty3 = parseInt(document.getElementById("product3Qty").value) || 0;
  const qty4 = parseInt(document.getElementById("product4Qty").value) || 0;
  const qty5 = parseInt(document.getElementById("product5Qty").value) || 0;
  const qty6 = parseInt(document.getElementById("product6Qty").value) || 0;

  const rate1 = parseInt(document.getElementById("product1Rate").value);
  const rate2 = parseInt(document.getElementById("product2Rate").value);
  const rate3 = parseInt(document.getElementById("product3Rate").value);
  const rate4 = parseInt(document.getElementById("product4Rate").value);
  const rate5 = parseInt(document.getElementById("product5Rate").value);
  const rate6 = parseInt(document.getElementById("product6Rate").value);

  const total = (qty1 * rate1) + (qty2 * rate2) + (qty3 * rate3) +
                (qty4 * rate4) + (qty5 * rate5) + (qty6 * rate6);

  document.getElementById("result").textContent = `Total: $${total}`;
});

// ---------- Download/Print Quote ----------
let lastQuoteContent = ""; // store the last generated quote

document.getElementById("downloadBtn").addEventListener("click", () => {
  const businessName = document.getElementById("businessName").textContent;
  const result = document.getElementById("result").textContent || "No total calculated yet.";

  lastQuoteContent = `
    ${businessName} Quote
    -------------------------
    Consulting Hours: ${document.getElementById("product1Qty").value} @ $${document.getElementById("product1Rate").value}/hr
    Reports: ${document.getElementById("product2Qty").value} @ $${document.getElementById("product2Rate").value} each
    Subscriptions: ${document.getElementById("product3Qty").value} @ $${document.getElementById("product3Rate").value} each
    Training Sessions: ${document.getElementById("product4Qty").value} @ $${document.getElementById("product4Rate").value}/session
    Support Packages: ${document.getElementById("product5Qty").value} @ $${document.getElementById("product5Rate").value}/package
    Licensing: ${document.getElementById("product6Qty").value} @ $${document.getElementById("product6Rate").value}/license

    ${result}
  `;

  const printWindow = window.open('', '', 'width=600,height=400');
  printWindow.document.write(`<pre>${lastQuoteContent}</pre>`);
  printWindow.document.close();
  printWindow.print();
});

// ---------- Reset Calculator ----------
document.getElementById("refreshBtn").addEventListener("click", () => {
  // Reset all quantities
  ["product1Qty","product2Qty","product3Qty","product4Qty","product5Qty","product6Qty"].forEach(id => {
    document.getElementById(id).value = 0;
  });

  // Reset ranges to defaults
  document.getElementById("product1Rate").value = 15;
  document.getElementById("product1RateValue").textContent = "$15/hr";

  document.getElementById("product2Rate").value = 22;
  document.getElementById("product2RateValue").textContent = "$22 each";

  document.getElementById("product3Rate").value = 32;
  document.getElementById("product3RateValue").textContent = "$32 each";

  document.getElementById("product4Rate").value = 75;
  document.getElementById("product4RateValue").textContent = "$75/session";

  document.getElementById("product5Rate").value = 150;
  document.getElementById("product5RateValue").textContent = "$150/package";

  document.getElementById("product6Rate").value = 300;
  document.getElementById("product6RateValue").textContent = "$300/license";

  // Clear result
  document.getElementById("result").textContent = "";

  // Clear download/print history
  lastQuoteContent = "";
});

// ---------- Dark Mode Toggle ----------
document.getElementById("darkModeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// ---------- Language Toggle (English ↔ Amharic) ----------
let currentLang = "en";
document.getElementById("langBtn").addEventListener("click", () => {
  if (currentLang === "en") {
    document.getElementById("businessName").textContent = "ዴቭ ፒኤልሲ";
    document.getElementById("tagline").textContent = "በጣም ተስማሚ መፍትሄዎች በእጅዎ";
    document.getElementById("product1Label").textContent = "💼 ኮንሰልቲንግ ሰዓታት";
    document.getElementById("product2Label").textContent = "📊 ሪፖርቶች";
    document.getElementById("product3Label").textContent = "🔑 ስብስክሪፕሽኖች";
    document.getElementById("product4Label").textContent = "🎓 ስልጠና ክፍሎች";
    document.getElementById("product5Label").textContent = "🛠️ የድጋፍ ጥቅሎች";
    document.getElementById("product6Label").textContent = "📜 ፈቃዶች";
    document.getElementById("calculateBtn").textContent = "ድምር አስላ";
    document.getElementById("downloadBtn").textContent = "ኮት አውርድ/አትም";
    document.getElementById("refreshBtn").textContent = "ካልኩሌተር አዘምን";
    currentLang = "am";
  } else {
    document.getElementById("businessName").textContent = "Dave plc";
    document.getElementById("tagline").textContent = "Tailored solutions at fingertips";
    document.getElementById("product1Label").textContent = "💼 Consulting Hours";
    document.getElementById("product2Label").textContent = "📊 Reports";
    document.getElementById("product3Label").textContent = "🔑 Subscriptions";
    document.getElementById("product4Label").textContent = "🎓 Training Sessions";
    document.getElementById("product5Label").textContent = "🛠️ Support Packages";
    document.getElementById("product6Label").textContent = "📜 Licensing";
    document.getElementById("calculateBtn").textContent = "Calculate Total";
    document.getElementById("downloadBtn").textContent = "Download/Print Quote";
    document.getElementById("refreshBtn").textContent = "Reset Calculator";
    currentLang = "en";
  }
});
