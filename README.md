# 🌙 AI 解夢大師 MAX

> **終極版 · 362 種夢境類型 · 史上最完整的 AI 解夢系統**

![Version](https://img.shields.io/badge/Version-MAX-ff00ff)
![Dream Types](https://img.shields.io/badge/夢境類型-362種-00ffff)
![Categories](https://img.shields.io/badge/分類-22大類-bf00ff)
![AI](https://img.shields.io/badge/AI-Groq%20LLaMA-00ff80)

---

## ✨ 功能特色

| 功能 | 說明 |
|------|------|
| 🏷️ **362 種夢境** | 22 大分類，涵蓋心理學、周公解夢、精神分析 |
| 🔍 **搜尋功能** | 快速搜尋夢境類型 |
| 🏷️ **分類標籤** | 一鍵篩選 22 大分類 |
| 🔊 **三種語音** | Web / Gemini TTS / ElevenLabs |
| 📝 **三種輸入** | 文字 / 檔案上傳 / 圖片辨識 |
| 📱 **LINE 推送** | Flex Message 精美卡片 |
| 🔄 **清除按鈕** | 一鍵重新解夢 |
| 📜 **歷史記錄** | 本地儲存，隨時回顧 |

---

## 🏷️ 362 種夢境類型（22 大分類）

| 分類 | 數量 | 包含內容 |
|------|------|----------|
| 💫 常見 | 10 | 一般、惡夢、重複、清醒、鮮明、預知、象徵、療癒、警示、願望 |
| 🏃 動作 | 20 | 飛翔、墜落、被追、奔跑、游泳、攀爬、開車、跳舞、戰鬥、逃脫... |
| 🏠 場景 | 30 | 海洋、森林、山脈、天空、房屋、學校、醫院、城堡、迷宮、太空... |
| 👥 人物 | 26 | 家人、父母、朋友、戀人、前任、陌生人、已故者、名人、神明... |
| 🐾 動物 | 30 | 蛇、狗、貓、龍、虎、獅、鳳凰、獨角獸、恐龍、怪物... |
| 🦴 身體 | 20 | 掉牙、頭髮、眼睛、血、裸露、生病、受傷、懷孕、死亡、鬼壓床... |
| 💭 情緒 | 15 | 快樂、悲傷、憤怒、恐懼、焦慮、孤獨、平靜、興奮、嫉妒... |
| 💼 生活 | 18 | 考試、遲到、迷路、婚禮、葬禮、旅行、面試、畢業、告白... |
| 📦 物品 | 20 | 金錢、禮物、電話、鏡子、門、鑰匙、書、戒指、劍、槍... |
| 🚗 交通 | 12 | 汽車、火車、飛機、船、機車、直升機、火箭、救護車... |
| 🌿 自然 | 20 | 下雨、下雪、暴風雨、地震、火山、海嘯、太陽、月亮、彩虹... |
| 🍜 食物 | 18 | 米飯、麵、肉、水果、蛋糕、巧克力、咖啡、酒、毒藥... |
| 👔 職業 | 18 | 教師、醫生、律師、警察、廚師、機師、太空人、國王、僧侶... |
| ⚽ 運動 | 15 | 足球、籃球、棒球、游泳、拳擊、武術、瑜伽、賽車... |
| 🎵 音樂 | 10 | 鋼琴、吉他、小提琴、鼓、演唱會、交響樂、歌劇... |
| 🌌 奇幻 | 24 | 穿越、超能力、變身、隱形、外星人、鬼魂、殭屍、吸血鬼、魔法... |
| 🎨 顏色 | 12 | 紅、橙、黃、綠、藍、紫、粉、白、黑、金、銀、黑白夢 |
| ⏰ 時間 | 11 | 童年、過去、未來、古代、中世紀、現代、科幻、黎明、黃昏... |
| 🙏 靈性 | 12 | 天堂、地獄、輪迴、因果、冥想、開悟、祝福、詛咒、預言... |
| 🔢 數字 | 12 | 0-9、樂透、幸運數 |
| 🍂 季節 | 9 | 春夏秋冬、新年、聖誕、萬聖節、情人節、生日 |

---

## 🚀 快速開始

### 1️⃣ 下載檔案
```
Dream-AI-MAX/
├── index.html      ← 主程式
└── dream-gas.js    ← GAS 後端（LINE 推送用）
```

### 2️⃣ 取得 Groq API Key（必要）
1. 前往 [Groq Console](https://console.groq.com/)
2. 註冊/登入帳號
3. 建立 API Key（`gsk_` 開頭）
4. 在 App 設定頁面填入

### 3️⃣ 開啟使用
- 直接開啟 `index.html`
- 或部署到 Netlify / GitHub Pages

---

## 🔊 語音播報設定

### Web 語音（免費）
- 瀏覽器內建，免設定

### Gemini TTS（高品質）
1. 前往 [Google AI Studio](https://aistudio.google.com/)
2. 取得 API Key（`AIza` 開頭）
3. 在設定頁面填入

### ElevenLabs（超擬真）
1. 前往 [ElevenLabs](https://elevenlabs.io/)
2. 取得 API Key（`sk_` 開頭）
3. 選擇 Voice ID
4. 在設定頁面填入

---

## 📱 LINE 推送設定

### 步驟 1：建立 LINE Bot
1. 前往 [LINE Developers](https://developers.line.biz/)
2. 建立 Messaging API Channel
3. 取得 Channel Access Token
4. 取得你的 User ID

### 步驟 2：部署 GAS
1. 前往 [Google Apps Script](https://script.google.com/)
2. 新建專案，貼上 `dream-gas.js` 內容
3. 填入 LINE Token 和 User ID
4. 部署為網頁應用程式
5. 複製部署 URL 到 App 設定

---

## 🎯 解夢結果包含

| 項目 | 說明 |
|------|------|
| 📊 **三大指數** | 正向指數、心理指數、預示指數（0-100） |
| 🌙 **夢境象徵** | 符號與意象的深層含義 |
| 🧠 **心理分析** | 潛意識與情緒狀態解讀 |
| 🔮 **預示建議** | 未來發展與行動建議 |
| 🍀 **幸運元素** | 顏色、數字、時辰、護身物 |

---

## 📋 版本歷程

| 版本 | 夢境類型 | 新增功能 |
|------|----------|----------|
| v1.0 | 40 種 | 基礎解夢、LINE 推送 |
| v2.0 | 80 種 | 三種語音、8 大分類 |
| **MAX** | **362 種** | **22 大分類、搜尋、篩選** |

---

## 🛠️ 技術架構

- **前端**：HTML5 + CSS3 + Vanilla JavaScript
- **AI 模型**：Groq LLaMA 3.3 70B / LLaMA 3.2 90B Vision
- **語音**：Web Speech API / Gemini TTS / ElevenLabs
- **後端**：Google Apps Script
- **推送**：LINE Messaging API (Flex Message)

---

## 📄 授權

MIT License

---

## 🙏 致謝

- [Groq](https://groq.com/) - 超快 AI 推論
- [Google Gemini](https://ai.google.dev/) - TTS 語音合成
- [ElevenLabs](https://elevenlabs.io/) - 擬真語音
- [LINE](https://developers.line.biz/) - Messaging API

---

<div align="center">

### 🌙 探索你的潛意識世界

**AI 解夢大師 MAX** - 362 種夢境，無限可能

Made with 💜 by Claude AI

</div>
