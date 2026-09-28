/* Contact demo only: no data is sent. Replace the form independently during WordPress migration. */
(() => {
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMsg");
  if (!form || !msg) return;

  const labels = {
    name: "お名前", email: "メールアドレス", type: "お問い合わせ内容",
    message: "ご相談内容", privacy: "プライバシーポリシーへの同意",
  };

  form.addEventListener("input", (event) => {
    const field = event.target;
    if (typeof field.setCustomValidity !== "function") return;
    field.setCustomValidity("");
    field.removeAttribute("aria-invalid");
    if (field.getAttribute("aria-describedby") === "formMsg") {
      field.removeAttribute("aria-describedby");
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    for (const name of ["name", "email", "message"]) {
      const field = form.elements.namedItem(name);
      field.setCustomValidity(field.value.trim() ? "" : "入力してください。");
    }
    const fields = Array.from(form.elements).filter((field) => field.willValidate);
    const invalid = fields.filter((field) => !field.validity.valid);
    fields.forEach((field) => {
      if (invalid.includes(field)) {
        field.setAttribute("aria-invalid", "true");
        field.setAttribute("aria-describedby", "formMsg");
      } else {
        field.removeAttribute("aria-invalid");
        field.removeAttribute("aria-describedby");
      }
    });
    if (invalid.length) {
      const names = [...new Set(invalid.map((field) => labels[field.name]))];
      msg.className = "form__message form__message--error";
      msg.textContent = "入力内容をご確認ください：" + names.join("、") + "。必須項目の入力・同意と、メールアドレスの形式をご確認ください。";
      invalid[0].focus();
      return;
    }
    msg.className = "form__message form__message--success";
    msg.textContent = "入力内容を確認しました。このフォームはデモのため、実際の送信は行われていません。";
    form.reset();
    msg.focus();
  });
})();
