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

module.exports = (req, res) => {
  res.status(200).json({ count: projects.length, data: projects });
};
