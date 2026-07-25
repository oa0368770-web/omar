const companyData = {
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
    clients: 100,
    deals: 100,
    governorates: 27,
    support: '24/7'
  }
};

export default function handler(req, res) {
  res.status(200).json(companyData);
}
