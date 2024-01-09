const GASTYPES = [
  {
    gasType: 0,
    zh: '浓度',
    en: 'Concn.',
  },
  {
    gasType: 1,
    zh: '甲烷',
    en: 'CH4',
  },
  {
    gasType: 2,
    zh: '氨气',
    en: 'NH3',
  },
  {
    gasType: 3,
    zh: '硫化氢',
    en: 'H2S',
  },
  {
    gasType: 4,
    zh: '一氧化碳',
    en: 'CO',
  },
  {
    gasType: 5,
    zh: '氧气',
    en: 'O2',
  },
  {
    gasType: 6,
    zh: '氢气',
    en: 'H2',
  },
  {
    gasType: 7,
    zh: '乙烷',
    en: 'C2H6',
  },
  {
    gasType: 8,
    zh: '乙烯',
    en: 'C2H4',
  },
  {
    gasType: 9,
    zh: '乙炔',
    en: 'C2H2',
  },
  {
    gasType: 10,
    zh: '丙烷',
    en: 'C3H8',
  },
  {
    gasType: 11,
    zh: '丙烯',
    en: 'C3H6',
  },
  {
    gasType: 12,
    zh: '丁烷',
    en: 'C4H10',
  },
  {
    gasType: 13,
    zh: '丁烯',
    en: 'C4H8',
  },
  {
    gasType: 14,
    zh: '丁二烯',
    en: 'C4H6',
  },
  {
    gasType: 15,
    zh: '轻油',
    en: 'Oil',
  },
  {
    gasType: 16,
    zh: '重油',
    en: 'Oil',
  },
  {
    gasType: 17,
    zh: '汽油',
    en: 'GAS',
  },
  {
    gasType: 18,
    zh: '柴油',
    en: 'Diesel',
  },
  {
    gasType: 19,
    zh: '煤油',
    en: 'Kerose',
  },
  {
    gasType: 20,
    zh: '甲醇',
    en: 'CH3OH',
  },
  {
    gasType: 21,
    zh: '乙醇',
    en: 'C2H5OH',
  },
  {
    gasType: 22,
    zh: '异丙醇',
    en: 'C3H8O',
  },
  {
    gasType: 23,
    zh: '甲醛',
    en: 'HCHO',
  },
  {
    gasType: 24,
    zh: '丁醛',
    en: 'C4H8O',
  },
  {
    gasType: 25,
    zh: '丙酮',
    en: 'C3H6O',
  },
  {
    gasType: 26,
    zh: '丁酮',
    en: 'C4H8O',
  },
  {
    gasType: 27,
    zh: '苯',
    en: 'C6H6',
  },
  {
    gasType: 28,
    zh: '甲苯',
    en: 'C7H8',
  },
  {
    gasType: 29,
    zh: '二甲苯',
    en: 'C8H10',
  },
  {
    gasType: 30,
    zh: '苯乙烯',
    en: 'C8H8',
  },
  {
    gasType: 31,
    zh: '苯酚',
    en: 'C6H5OH',
  },
  {
    gasType: 32,
    zh: '乙醚',
    en: 'C4H10O',
  },
  {
    gasType: 33,
    zh: '二甲醚',
    en: 'C2H6O',
  },
  {
    gasType: 34,
    zh: '石油醚',
    en: 'Ether',
  },
  {
    gasType: 35,
    zh: '二甲胺',
    en: 'C2H7N',
  },
  {
    gasType: 36,
    zh: '三甲胺',
    en: 'C3H9N',
  },
  {
    gasType: 37,
    zh: '甲酰胺',
    en: 'CH3NO',
  },
  {
    gasType: 38,
    zh: '四氢呋喃',
    en: 'THF',
  },
  {
    gasType: 39,
    zh: '醋酸乙酯',
    en: 'C4H8O2',
  },
  {
    gasType: 40,
    zh: '氯代甲苯',
    en: 'C7H7Cl',
  },
  {
    gasType: 41,
    zh: '环氧乙烷',
    en: 'C2H4O',
  },
  {
    gasType: 42,
    zh: '臭氧',
    en: 'O3',
  },
  {
    gasType: 43,
    zh: '二氧化硫',
    en: 'SO2',
  },
  {
    gasType: 44,
    zh: '二氧化氮',
    en: 'NO2',
  },
  {
    gasType: 45,
    zh: '一氧化氮',
    en: 'NO',
  },
  {
    gasType: 46,
    zh: '氯化氢',
    en: 'HCl',
  },
  {
    gasType: 47,
    zh: '氰化氢',
    en: 'HCN',
  },
  {
    gasType: 48,
    zh: '二氧化碳',
    en: 'CO2',
  },
  {
    gasType: 49,
    zh: '氯气',
    en: 'Cl2',
  },
  {
    gasType: 50,
    zh: '可燃',
    en: 'Ex',
  },
  {
    gasType: 51,
    zh: '氮气',
    en: 'N2',
  },
  {
    gasType: 52,
    zh: '氮氧化物',
    en: 'NOx',
  },
  {
    gasType: 53,
    zh: '苯类',
    en: 'Benze.',
  },
  {
    gasType: 54,
    zh: '苯胺',
    en: 'C6H7N',
  },
  {
    gasType: 55,
    zh: '粗苯',
    en: 'Benzol',
  },
  {
    gasType: 56,
    zh: '油气',
    en: 'OilGas',
  },
  {
    gasType: 57,
    zh: '油漆',
    en: 'Paint',
  },
  {
    gasType: 58,
    zh: '煤气',
    en: 'GAS',
  },
  {
    gasType: 59,
    zh: '天然气',
    en: 'NG',
  },
  {
    gasType: 60,
    zh: '液化气',
    en: 'LPG',
  },
  {
    gasType: 61,
    zh: '沼气',
    en: 'Biogas',
  },
  {
    gasType: 62,
    zh: 'VOC',
    en: 'VOC',
  },
  {
    gasType: 63,
    zh: 'TVOC',
    en: 'TVOC',
  },
  {
    gasType: 64,
    zh: 'VOCS',
    en: 'VOCS',
  },
  {
    gasType: 65,
    zh: '温度',
    en: 'TEMP',
  },
  {
    gasType: 66,
    zh: '湿度',
    en: 'HR',
  },
  {
    gasType: 67,
    zh: '二氯氢硅',
    en: 'SiH2Cl2',
  },
  {
    gasType: 68,
    zh: '三氯氢硅',
    en: 'SiHCl3',
  },
  {
    gasType: 69,
    zh: '二硫化碳',
    en: 'CS2',
  },
  {
    gasType: 70,
    zh: '环氧丙烷',
    en: 'C3H6O',
  },
  {
    gasType: 71,
    zh: '氯乙烯',
    en: 'C2H3Cl',
  },
  {
    gasType: 72,
    zh: '氯丙烷',
    en: 'C3H7Cl',
  },
  {
    gasType: 73,
    zh: '砷化氢',
    en: 'AsH3',
  },
  {
    gasType: 74,
    zh: '磷化氢',
    en: 'PH3',
  },
  {
    gasType: 75,
    zh: '氟化氢',
    en: 'HF',
  },
  {
    gasType: 76,
    zh: '过氧化氢',
    en: 'H2O2',
  },
  {
    gasType: 77,
    zh: '醇类',
    en: 'Alcoh.',
  },
  {
    gasType: 78,
    zh: '酒精',
    en: 'Alcoh.',
  },
  {
    gasType: 79,
    zh: '水合肼',
    en: 'HHA',
  },
  {
    gasType: 80,
    zh: '四氢噻吩',
    en: 'C4H8S',
  },
  {
    gasType: 81,
    zh: '一氧化硫',
    en: 'SO',
  },
  {
    gasType: 82,
    zh: '三氧化硫',
    en: 'SO3',
  },
  {
    gasType: 83,
    zh: '三乙胺',
    en: 'C6H15N',
  },
  {
    gasType: 84,
    zh: '氢叠氮酸',
    en: 'HN3',
  },
  {
    gasType: 85,
    zh: '甲酸甲酯',
    en: 'C2H4O2',
  },
  {
    gasType: 86,
    zh: '醋酸',
    en: 'C2H4O2',
  },
  {
    gasType: 87,
    zh: '盐酸',
    en: 'HCl',
  },
  {
    gasType: 88,
    zh: '硫酸',
    en: 'H2SO4',
  },
  {
    gasType: 89,
    zh: '溴丙酸',
    en: '',
  },
  {
    gasType: 90,
    zh: '硫氢基',
    en: 'SH',
  },
  {
    gasType: 91,
    zh: '硫酸二甲酯',
    en: 'DMS',
  },
  {
    gasType: 92,
    zh: '碳酸二甲酯',
    en: 'C3H6O3',
  },
  {
    gasType: 93,
    zh: '羰基硫',
    en: 'COS',
  },
  {
    gasType: 94,
    zh: '丙烯腈',
    en: 'C3H3N',
  },
  {
    gasType: 95,
    zh: '六氟化硫',
    en: 'SF6',
  },
  {
    gasType: 96,
    zh: '氦气',
    en: 'He',
  },
  {
    gasType: 97,
    zh: '氩气',
    en: 'Ar',
  },
  {
    gasType: 98,
    zh: '光气',
    en: 'COCl2',
  },
  {
    gasType: 99,
    zh: '笑气',
    en: 'N2O',
  },
]

const GASSTATUS = [
  {
    key: 0,
    value: '预热',
  },
  {
    key: 1,
    value: '正常',
  },
  {
    key: 3,
    value: '传感器故障',
  },
  {
    key: 4,
    value: '预警',
  },
  {
    key: 5,
    value: '一级报警',
  },
  {
    key: 6,
    value: '二级报警',
  },
  {
    key: 7,
    value: '故障',
  },
  {
    key: 8,
    value: '禁止使用',
  },
  {
    key: 13,
    value: '探测器不存在',
  },
]

const GASUINT = [
  { key: 1, value: '%LEL' },
  { key: 2, value: '%VOL' },
  { key: 3, value: 'PPM' },
  { key: 4, value: 'umol/mol' },
  { key: 5, value: 'mg/m3' },
  { key: 6, value: 'ug/m3' },
  { key: 7, value: '℃' },
  { key: 8, value: '%' },
  { key: 9, value: '%RH' },
]

export { GASTYPES, GASSTATUS, GASUINT }
