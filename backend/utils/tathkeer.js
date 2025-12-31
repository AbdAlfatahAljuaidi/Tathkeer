const axios = require("axios");
const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars"); // تأكد من استدعاء المكتبة الأساسية
require("dotenv").config();

module.exports = async (to, documentName, subject, templateName) => {
  try {
    // 1️⃣ تحديد مسار ملف القالب وقراءته
    const templatePath = path.resolve("./views", `${templateName}.handlebars`);
    const source = fs.readFileSync(templatePath, "utf8");

    // 2️⃣ تجميع القالب (Compile) ووضع البيانات (documentName) بداخله
    const compiledTemplate = handlebars.compile(source);
    const htmlContent = compiledTemplate({ documentName });

    // 3️⃣ إرسال الإيميل عبر Brevo API
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Tathkeer Team",
          email: process.env.EMAIL, // يجب أن يكون الإيميل المسجل في بريفو
        },
        to: [{ email: to }],
        subject: subject,
        htmlContent: htmlContent, // هنا نرسل الـ HTML الذي تم إنتاجه
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`✅ تم الإرسال بنجاح إلى: ${to}`);
    return response.data;
  } catch (error) {
    console.error("❌ خطأ في الإرسال:", error.response?.data || error.message);
    throw error;
  }
};