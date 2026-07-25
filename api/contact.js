import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { name, phone, email, subject, message, service } = req.body || {};

    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'الرجاء إدخال الاسم ورقم الهاتف والرسالة'
      });
    }

    const newMessage = {
      id: Date.now(),
      name, phone,
      email: email || '',
      subject: subject || 'طلب تواصل جديد',
      message,
      service: service || '',
      createdAt: new Date().toISOString()
    };

    const toEmail = process.env.CONTACT_TO_EMAIL || 'rawnaqsystems@gmail.com';
    const smtpUser = process.env.SMTP_USER || '';
    const smtpPass = process.env.SMTP_PASS || '';
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465');
    const smtpSecure = process.env.SMTP_SECURE !== 'false';

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: { user: smtpUser, pass: smtpPass }
      });

      const serviceText = service ? `\n\nنوع الخدمة: ${service}` : '';
      const emailText = email ? `\nالبريد الإلكتروني: ${email}` : '';

      await transporter.sendMail({
        from: `"Ronaq Website" <${smtpUser}>`,
        to: toEmail,
        replyTo: email || smtpUser,
        subject: `[Ronaq] ${newMessage.subject}`,
        text: `رسالة جديدة من نموذج التواصل بالموقع:\n\nالاسم: ${name}\nالهاتف: ${phone}${emailText}${serviceText}\n\nالرسالة:\n${message}\n\nوقت الإرسال: ${newMessage.createdAt}`,
        html: `
          <div dir="rtl" style="font-family:Arial,sans-serif;padding:24px;background:#f8fafc;border-radius:16px;max-width:600px;margin:auto;">
            <h2 style="color:#2563eb;margin-top:0;">📩 رسالة جديدة من الموقع</h2>
            <div style="background:#fff;padding:16px 20px;border-radius:12px;border:1px solid #e2e8f0;">
              <p style="margin:8px 0;"><strong>👤 الاسم:</strong> ${name}</p>
              <p style="margin:8px 0;"><strong>📞 الهاتف:</strong> <a href="tel:${phone}">${phone}</a></p>
              ${email ? `<p style="margin:8px 0;"><strong>📧 الإيميل:</strong> <a href="mailto:${email}">${email}</a></p>` : ''}
              ${service ? `<p style="margin:8px 0;"><strong>🔧 نوع الخدمة:</strong> ${service}</p>` : ''}
              <p style="margin:8px 0;"><strong>📝 الموضوع:</strong> ${newMessage.subject}</p>
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;">
              <p style="margin:0;line-height:1.8;color:#0f172a;white-space:pre-wrap;"><strong>الرسالة:</strong><br>${message}</p>
              <p style="margin-top:16px;font-size:12px;color:#64748b;">الوقت: ${newMessage.createdAt}</p>
            </div>
          </div>
        `
      });
    } else {
      console.warn('⚠️ SMTP credentials not set — email not sent. Message stored in log only:', newMessage);
    }

    console.log('📩 رسالة جديدة:', newMessage);

    res.status(201).json({
      success: true,
      message: 'تم إرسال رسالتك بنجاح! سنتواصل معك في أقرب وقت ✅',
      ticket: `#RS${newMessage.id}`
    });
  } catch (err) {
    console.error('❌ خطأ:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'حدث خطأ أثناء الإرسال، حاول مرة أخرى لاحقاً.'
    });
  }
}
