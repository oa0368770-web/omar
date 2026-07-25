const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};
app.use(requestLogger);

app.use(express.static(path.join(__dirname, 'public')));

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2), 'utf8');
}

app.get('/api/company', (req, res) => {
  res.json({
    name: 'Ronaq Systems',
    slogan: 'رونق للأنظمة وتركيب الكاميرات',
    description: 'نقدم أفضل حلول الكاميرات وأنظمة أمنية وحلول البيع ونقاط البيع وأنظمة الباركود بأعلى جودة وأفضل سعر مع فريق محترف للتركيب والصيانة، ونخدم جميع محافظات مصر.',
    services: [
      'تركيب وصيانة كاميرات مراقبة (CCTV)',
      'أنظمة أمنية وحماية متكاملة',
      'أجهزة الكاشير ونقاط البيع (POS)',
      'أنظمة المنيو بالباركود (QR / Barcode Menus)',
      'شبكات وأنظمة POE و Switches',
      'الدعم الفني والصيانة الدورية'
    ],
    contact: {
      phones: ['+20 102 422 6973', '+20 102 350 5235'],
      whatsapp: '+20 102 350 5235',
      email: 'rawnaqsystems@gmail.com',
      address: 'شمال سيناء - نخدم جميع محافظات مصر',
      facebook: 'https://facebook.com/share/198UWMJMKp/?mibextid=wwXIfr',
      instagram: 'https://www.instagram.com/ronaqsystems?utm_source=qr'
    },
    management: ['م. عمر أيمن', 'م. عمرو بركات'],
    offers: [
      '🎉 عرض خاص: خصم 50% على تركيب الكاميرات لأول مرة - لوقت محدود!'
    ],
    stats: {
      clients: 1500,
      deals: 500,
      governorates: 27,
      support: '24/7'
    }
  });
});

app.get('/api/services', (req, res) => {
  const services = [
    {
      id: 1,
      title: 'كاميرات المراقبة CCTV',
      icon: '📹',
      shortDesc: 'تركيب وصيانة كاميرات مراقبة عالية الدقة',
      description: 'نوفر أحدث أنواع الكاميرات (Analog / IP / Wifi / DVR / NVR) مع فريق محترف للتركيب الصحيح والصيانة الدورية لضمان عمل النظام بكفاءة عالية.',
      features: ['كاميرات 2MP حتى 4K', 'رؤية ليلية (Night Vision)', 'تسجيل على هارد ديسك', 'مشاهدة عبر الموبايل', 'صيانة دورية']
    },
    {
      id: 2,
      title: 'أجهزة الكاشير POS',
      icon: '💳',
      shortDesc: 'نظام نقاط البيع المتكامل للمحلات والمطاعم',
      description: 'نظام كاشير احترافي يدير المبيعات والمخزون والتقارير المالية بسهولة. يدعم أنواع المطابع (Thermal / Barcode Printers) وماسح الباركود ومقياس الوزن.',
      features: ['إدارة المخزون', 'فواتير ضريبية', 'تقارير مبيعات يومية وشهرية', 'دعم الاكواد الخصم', 'نسخ احتياطي تلقائي']
    },
    {
      id: 3,
      title: 'المنيو بالباركود QR Menu',
      icon: '📱',
      shortDesc: 'منيو مطاعم وكافيهات عن طريق QR Code',
      description: 'نظام منيو رقمي احترافي للمطاعم والكافيهات، عرض قائمة الطعام على موبايل العميل مباشرة عن طريق مسح الكود، مع إمكانية الطلب والإضافة والتعديل.',
      features: ['تصميم منيو احترافي', 'تصنيفات الأطباق', 'تحديث الأسعار لحظياً', 'إمكانية الطلب من الموبايل', 'تحليلات زوار المنيو']
    },
    {
      id: 4,
      title: 'شبكات و POE Switches',
      icon: '🔌',
      shortDesc: 'شبكات وأنظمة POE و Switches للسيرفرات',
      description: 'تصميم وتركيب شبكات محلية (LAN / Wi-Fi) مع Switches و Routers و POE للكاميرات ونقاط الوصول، لضمان شبكة مستقرة وسريعة.',
      features: ['Switches POE', 'Access Points Wi-Fi', 'كابلات Cat6 / Cat7', 'تصميم الشبكة', 'صيانة الشبكات']
    },
    {
      id: 5,
      title: 'الصيانة والدعم الفني',
      icon: '🔧',
      shortDesc: 'دعم فني 24/7 وصيانة دورية لجميع أنظمتنا',
      description: 'فريق صيانة متخصص موجود لخدمتكم في أي وقت، مع زيارات دورية للمنشآت لفحص الأنظمة وتجنب أي أعطال قبل حدوثها.',
      features: ['دعم 24 ساعة', 'زيارات دورية', 'قطع غيار أصلية', 'ضمان على جميع الخدمات', 'فريق محترف']
    },
    {
      id: 6,
      title: 'حلول الأمان المتكاملة',
      icon: '🛡️',
      shortDesc: 'أنظمة إنذار حرائق ولصوص وإنتركوم',
      description: 'أنظمة أمان متكاملة تشمل إنذار حريق، إنذار ضد السطو، بوابات أمنية، وأنظمة إنتركوم للمداخل مع كاميرا وصوت.',
      features: ['إنذار حريق', 'إنذار لصوص', 'بوابات أمنية', 'إنتركوم مع كاميرا', 'أنظمة بوابات مركبات']
    }
  ];
  res.json({ count: services.length, data: services });
});

app.get('/api/portfolio', (req, res) => {
  const projects = [
    { id: 1, title: 'مشروع كاميرات مركز تجاري', category: 'كاميرات', year: '2024' },
    { id: 2, title: 'نظام كاشير لسلسلة مطاعم', category: 'POS', year: '2024' },
    { id: 3, title: 'منيو باركود لكافيه راقي', category: 'QR Menu', year: '2024' },
    { id: 4, title: 'شبكة كاملة لمدرسة دولية', category: 'شبكات', year: '2023' },
    { id: 5, title: 'كاميرات وأنذار لمستشفى', category: 'أمان', year: '2023' },
    { id: 6, title: 'نظام كاشير لمحل سوبر ماركت', category: 'POS', year: '2023' },
    { id: 7, title: 'كاميرات فندق 5 نجوم', category: 'كاميرات', year: '2022' },
    { id: 8, title: 'منيو رقمي لسلسلة مطاعم', category: 'QR Menu', year: '2022' },
    { id: 9, title: 'شبكة + POE لشركة برمجيات', category: 'شبكات', year: '2022' }
  ];
  res.json({ count: projects.length, data: projects });
});

app.post('/api/contact', (req, res) => {
  const { name, phone, email, subject, message, service } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: 'الرجاء إدخال الاسم ورقم الهاتف والرسالة'
    });
  }

  const newMessage = {
    id: Date.now(),
    name,
    phone,
    email: email || '',
    subject: subject || 'طلب تواصل جديد',
    message,
    service: service || '',
    createdAt: new Date().toISOString(),
    status: 'unread'
  };

  try {
    const raw = fs.readFileSync(MESSAGES_FILE, 'utf8');
    const messages = JSON.parse(raw || '[]');
    messages.push(newMessage);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf8');

    console.log('📩 رسالة جديدة:', newMessage);

    res.status(201).json({
      success: true,
      message: 'تم إرسال رسالتك بنجاح! سنتواصل معك في أقرب وقت ✅',
      ticket: `#RS${newMessage.id}`
    });
  } catch (err) {
    console.error('❌ خطأ في حفظ الرسالة:', err);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء الإرسال، حاول مرة أخرى لاحقاً.'
    });
  }
});

app.get('/api/messages', (req, res) => {
  try {
    const raw = fs.readFileSync(MESSAGES_FILE, 'utf8');
    const messages = JSON.parse(raw || '[]');
    res.json({
      count: messages.length,
      data: messages.reverse()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api', (req, res) => {
  res.json({
    name: 'Ronaq Systems API',
    version: '1.0.0',
    status: 'shغال ✅',
    endpoints: {
      company_info: 'GET /api/company',
      services: 'GET /api/services',
      portfolio: 'GET /api/portfolio',
      contact_send: 'POST /api/contact',
      messages_list: 'GET /api/messages'
    }
  });
});

app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'الرابط غير موجود' });
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({ error: 'خطأ في السيرفر', message: err.message });
});

app.listen(PORT, () => {
  const line = '═'.repeat(58);
  console.log(`
╔${line}╗
║     🚀 موقع Ronaq Systems شغال بنجاح!                     ║
╠${line}╣
║  🌐  الموقع:   http://localhost:${PORT}                        ║
║  📡  API:      http://localhost:${PORT}/api                     ║
╠${line}╣
║  ✅  GET   /api/company  → معلومات الشركة                    ║
║  ✅  GET   /api/services → جميع الخدمات                       ║
║  ✅  GET   /api/portfolio → أعمالنا السابقة                   ║
║  ✅  POST  /api/contact  → إرسال رسالة تواصل                  ║
╚${line}╝
`);
});
