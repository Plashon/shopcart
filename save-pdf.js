document.getElementById("place-order").addEventListener("click", async () => {
  const { PDFDocument, rgb } = PDFLib;
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([180, 250]); // smaller page size
  const { width, height } = page.getSize();

  let y = height - 50;
  // Add header "Receipt"
  page.drawText("Receipt", {
    x: 44.5,
    y: height - 30,
    size: 18,
    color: rgb(0, 0, 0),
  });

  y -= 10;

  // Add cart items to PDF
  for (const productName in cart) {
    const item = cart[productName];
    const itemTotalPrice = item.quantity * item.price;
    const text = `${productName}: ${item.quantity} x $${item.price} = $${itemTotalPrice}`;
    page.drawText(text, { x: 20, y, size: 8, color: rgb(0, 0, 0) });
    y -= 10;
  }

  // Add total price to PDF
  const totalPrice = Object.values(cart).reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const totalPriceText = `Total Price: $${totalPrice}`;
  page.drawText(totalPriceText, {
    x: 20,
    y: 50,
    size: 8,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  // Download PDF
  const order = document.createElement("a");
  order.href = url;
  order.download = "order.pdf";
  order.click();
});

