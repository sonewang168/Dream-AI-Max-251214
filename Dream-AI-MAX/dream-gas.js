// ============================================
// 🌙 AI 解夢大師 - GAS 後端 v1.0
// LINE Messaging API + Flex Message 圖文卡片
// ============================================

// ⚠️ 請填入你的 LINE 設定
const LINE_CHANNEL_TOKEN = '你的 Channel Access Token';
const LINE_USER_ID = '你的 User ID';

// ============================================
// 接收請求
// ============================================
function doPost(e) {
  console.log('=== doPost 開始 ===');
  
  try {
    const rawData = e.postData.contents;
    console.log('原始資料:', rawData);
    
    const data = JSON.parse(rawData);
    console.log('解析後 action:', data.action);
    
    switch (data.action) {
      case 'sendDream':
        console.log('→ 處理解夢結果');
        return handleSendDream(data.result);
      
      case 'testNotify':
        console.log('→ 處理測試通知');
        return handleTestNotify();
      
      default:
        console.log('→ 未知的 action:', data.action);
        return jsonResponse({ success: false, error: '未知的 action' });
    }
  } catch (error) {
    console.error('doPost 錯誤:', error.message);
    console.error('錯誤堆疊:', error.stack);
    return jsonResponse({ success: false, error: error.message });
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    '🌙 AI 解夢大師 GAS 後端 v1.0 運作中！\n' +
    '支援功能：解夢結果推送、LINE Flex Message'
  );
}

// ============================================
// 🌙 解夢結果 - Flex Message
// ============================================
function handleSendDream(result) {
  console.log('=== handleSendDream 開始 ===');
  
  const title = result.title || '夢境解析';
  const dreamType = result.dreamType || '一般夢境';
  const scores = result.scores || { positive: 70, psychology: 70, prophetic: 60 };
  const symbolMeaning = result.symbolMeaning || '解析中...';
  const psychoAnalysis = result.psychoAnalysis || '解析中...';
  const prediction = result.prediction || '解析中...';
  const lucky = result.lucky || { color: '紫色', number: '7', time: '子時', charm: '水晶' };
  
  // 截斷文字
  const shortSymbol = symbolMeaning.length > 100 ? symbolMeaning.substring(0, 100) + '...' : symbolMeaning;
  const shortPsycho = psychoAnalysis.length > 100 ? psychoAnalysis.substring(0, 100) + '...' : psychoAnalysis;
  const shortPrediction = prediction.length > 100 ? prediction.substring(0, 100) + '...' : prediction;
  
  // 建立 Flex Message
  const flexMessage = {
    type: 'flex',
    altText: '🌙 AI 解夢結果：' + title,
    contents: {
      type: 'bubble',
      size: 'giga',
      header: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#1a0033',
        paddingAll: '20px',
        contents: [
          {
            type: 'text',
            text: '🌙 AI 解夢大師',
            color: '#00FFFF',
            size: 'md',
            weight: 'bold'
          },
          {
            type: 'text',
            text: title,
            color: '#FFFFFF',
            size: 'xl',
            weight: 'bold',
            margin: 'md',
            wrap: true
          },
          {
            type: 'text',
            text: dreamType,
            color: '#FF00FF',
            size: 'sm',
            margin: 'sm'
          }
        ]
      },
      body: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#0a0a1a',
        paddingAll: '20px',
        contents: [
          // 指數
          {
            type: 'box',
            layout: 'horizontal',
            contents: [
              createScoreBox('💫正向', scores.positive),
              createScoreBox('🧠心理', scores.psychology),
              createScoreBox('🔮預示', scores.prophetic)
            ]
          },
          {
            type: 'separator',
            margin: 'lg',
            color: '#333355'
          },
          // 夢境象徵
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            contents: [
              {
                type: 'text',
                text: '🌙 夢境象徵',
                color: '#00FFFF',
                size: 'sm',
                weight: 'bold'
              },
              {
                type: 'text',
                text: shortSymbol,
                color: '#CCCCCC',
                size: 'sm',
                wrap: true,
                margin: 'sm'
              }
            ]
          },
          {
            type: 'separator',
            margin: 'lg',
            color: '#333355'
          },
          // 心理分析
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            contents: [
              {
                type: 'text',
                text: '🧠 心理分析',
                color: '#FF00FF',
                size: 'sm',
                weight: 'bold'
              },
              {
                type: 'text',
                text: shortPsycho,
                color: '#CCCCCC',
                size: 'sm',
                wrap: true,
                margin: 'sm'
              }
            ]
          },
          {
            type: 'separator',
            margin: 'lg',
            color: '#333355'
          },
          // 預示
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            contents: [
              {
                type: 'text',
                text: '🔮 預示與建議',
                color: '#BF00FF',
                size: 'sm',
                weight: 'bold'
              },
              {
                type: 'text',
                text: shortPrediction,
                color: '#CCCCCC',
                size: 'sm',
                wrap: true,
                margin: 'sm'
              }
            ]
          },
          {
            type: 'separator',
            margin: 'lg',
            color: '#333355'
          },
          // 幸運元素
          {
            type: 'box',
            layout: 'horizontal',
            margin: 'lg',
            contents: [
              createLuckyBox('🎨', lucky.color),
              createLuckyBox('🔢', String(lucky.number)),
              createLuckyBox('⏰', lucky.time),
              createLuckyBox('🧿', lucky.charm)
            ]
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#0f0f1a',
        paddingAll: '15px',
        contents: [
          {
            type: 'text',
            text: '🌙 AI 解夢大師 · Powered by Groq',
            color: '#666666',
            size: 'xs',
            align: 'center'
          }
        ]
      }
    }
  };
  
  const sendResult = sendLineFlexMessage(flexMessage);
  return jsonResponse({ success: sendResult.success });
}

// 建立分數方塊
function createScoreBox(label, score) {
  var color = '#00FF80';
  if (score < 50) color = '#FF6666';
  else if (score < 70) color = '#FFAA00';
  
  return {
    type: 'box',
    layout: 'vertical',
    flex: 1,
    contents: [
      {
        type: 'text',
        text: label,
        size: 'xs',
        color: '#888888',
        align: 'center'
      },
      {
        type: 'text',
        text: String(score || 70),
        size: 'xl',
        weight: 'bold',
        color: color,
        align: 'center',
        margin: 'sm'
      }
    ]
  };
}

// 建立幸運元素方塊
function createLuckyBox(icon, value) {
  return {
    type: 'box',
    layout: 'vertical',
    flex: 1,
    contents: [
      {
        type: 'text',
        text: icon,
        size: 'md',
        align: 'center'
      },
      {
        type: 'text',
        text: value || '--',
        size: 'xs',
        color: '#FF00FF',
        align: 'center',
        margin: 'sm'
      }
    ]
  };
}

// ============================================
// LINE Messaging API
// ============================================
function sendLineFlexMessage(flexMessage) {
  console.log('=== sendLineFlexMessage 開始 ===');
  
  const url = 'https://api.line.me/v2/bot/message/push';
  
  const payload = {
    to: LINE_USER_ID,
    messages: [flexMessage]
  };
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + LINE_CHANNEL_TOKEN
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    const code = response.getResponseCode();
    
    if (code === 200) {
      console.log('✅ LINE Flex Message 發送成功');
      return { success: true };
    } else {
      console.error('❌ LINE 發送失敗:', response.getContentText());
      return { success: false, error: response.getContentText() };
    }
  } catch (error) {
    console.error('❌ LINE 發送錯誤:', error.message);
    return { success: false, error: error.message };
  }
}

// ============================================
// 測試通知
// ============================================
function handleTestNotify() {
  const flexMessage = {
    type: 'flex',
    altText: '🌙 AI 解夢大師測試通知',
    contents: {
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#1a0033',
        paddingAll: '20px',
        contents: [
          {
            type: 'text',
            text: '🌙 系統測試',
            color: '#00FFFF',
            size: 'lg',
            weight: 'bold',
            align: 'center'
          }
        ]
      },
      body: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#0a0a1a',
        paddingAll: '20px',
        contents: [
          {
            type: 'text',
            text: '✅ GAS 後端連接成功！',
            color: '#00FF80',
            size: 'lg',
            weight: 'bold',
            align: 'center'
          },
          {
            type: 'text',
            text: 'AI 解夢大師 v1.0',
            color: '#888888',
            size: 'sm',
            align: 'center',
            margin: 'md'
          },
          {
            type: 'text',
            text: '✍️ 文字 · 📄 檔案 · 🖼️ 圖片',
            color: '#FF00FF',
            size: 'sm',
            align: 'center',
            margin: 'lg'
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#0f0f1a',
        paddingAll: '15px',
        contents: [
          {
            type: 'text',
            text: new Date().toLocaleString('zh-TW'),
            color: '#666666',
            size: 'xs',
            align: 'center'
          }
        ]
      }
    }
  };
  
  const result = sendLineFlexMessage(flexMessage);
  return jsonResponse({ success: result.success });
}

// ============================================
// 手動測試用（直接在 GAS 執行）
// ============================================
function testConnection() {
  console.log('=== testConnection 開始 ===');
  
  const flexMessage = {
    type: 'flex',
    altText: '🌙 AI 解夢大師測試通知',
    contents: {
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#1a0033',
        paddingAll: '20px',
        contents: [
          {
            type: 'text',
            text: '🌙 系統測試',
            color: '#00FFFF',
            size: 'lg',
            weight: 'bold',
            align: 'center'
          }
        ]
      },
      body: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#0a0a1a',
        paddingAll: '20px',
        contents: [
          {
            type: 'text',
            text: '✅ GAS 後端連接成功！',
            color: '#00FF80',
            size: 'lg',
            weight: 'bold',
            align: 'center'
          },
          {
            type: 'text',
            text: 'AI 解夢大師 v1.0',
            color: '#888888',
            size: 'sm',
            align: 'center',
            margin: 'md'
          },
          {
            type: 'text',
            text: '✍️ 文字 · 📄 檔案 · 🖼️ 圖片',
            color: '#FF00FF',
            size: 'sm',
            align: 'center',
            margin: 'lg'
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#0f0f1a',
        paddingAll: '15px',
        contents: [
          {
            type: 'text',
            text: new Date().toLocaleString('zh-TW'),
            color: '#666666',
            size: 'xs',
            align: 'center'
          }
        ]
      }
    }
  };
  
  const result = sendLineFlexMessage(flexMessage);
  console.log('測試結果:', result.success ? '✅ 成功' : '❌ 失敗');
}

function testSendDream() {
  console.log('=== testSendDream 開始 ===');
  
  const mockResult = {
    title: '神秘海洋之夢',
    dreamType: '水/海夢',
    scores: { positive: 82, psychology: 75, prophetic: 68 },
    symbolMeaning: '海洋象徵著你的潛意識世界，深藍色代表平靜與智慧。在水中游泳表示你正在探索內心深處的感受。',
    psychoAnalysis: '這個夢境反映了你近期可能需要更多獨處時間來思考人生方向。水的意象暗示情感的流動與變化。',
    prediction: '近期可能會有新的機會或靈感出現，建議保持開放心態。適合進行創意工作或學習新技能。',
    lucky: { color: '藍色', number: '7', time: '子時', charm: '海藍寶石' }
  };
  
  // 直接建立 Flex Message 並發送
  const title = mockResult.title;
  const dreamType = mockResult.dreamType;
  const scores = mockResult.scores;
  const lucky = mockResult.lucky;
  
  const shortSymbol = mockResult.symbolMeaning.length > 100 ? mockResult.symbolMeaning.substring(0, 100) + '...' : mockResult.symbolMeaning;
  const shortPsycho = mockResult.psychoAnalysis.length > 100 ? mockResult.psychoAnalysis.substring(0, 100) + '...' : mockResult.psychoAnalysis;
  const shortPrediction = mockResult.prediction.length > 100 ? mockResult.prediction.substring(0, 100) + '...' : mockResult.prediction;
  
  const flexMessage = {
    type: 'flex',
    altText: '🌙 AI 解夢結果：' + title,
    contents: {
      type: 'bubble',
      size: 'giga',
      header: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#1a0033',
        paddingAll: '20px',
        contents: [
          {
            type: 'text',
            text: '🌙 AI 解夢大師',
            color: '#00FFFF',
            size: 'md',
            weight: 'bold'
          },
          {
            type: 'text',
            text: title,
            color: '#FFFFFF',
            size: 'xl',
            weight: 'bold',
            margin: 'md',
            wrap: true
          },
          {
            type: 'text',
            text: dreamType,
            color: '#FF00FF',
            size: 'sm',
            margin: 'sm'
          }
        ]
      },
      body: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#0a0a1a',
        paddingAll: '20px',
        contents: [
          {
            type: 'box',
            layout: 'horizontal',
            contents: [
              createScoreBox('💫正向', scores.positive),
              createScoreBox('🧠心理', scores.psychology),
              createScoreBox('🔮預示', scores.prophetic)
            ]
          },
          {
            type: 'separator',
            margin: 'lg',
            color: '#333355'
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            contents: [
              {
                type: 'text',
                text: '🌙 夢境象徵',
                color: '#00FFFF',
                size: 'sm',
                weight: 'bold'
              },
              {
                type: 'text',
                text: shortSymbol,
                color: '#CCCCCC',
                size: 'sm',
                wrap: true,
                margin: 'sm'
              }
            ]
          },
          {
            type: 'separator',
            margin: 'lg',
            color: '#333355'
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            contents: [
              {
                type: 'text',
                text: '🧠 心理分析',
                color: '#FF00FF',
                size: 'sm',
                weight: 'bold'
              },
              {
                type: 'text',
                text: shortPsycho,
                color: '#CCCCCC',
                size: 'sm',
                wrap: true,
                margin: 'sm'
              }
            ]
          },
          {
            type: 'separator',
            margin: 'lg',
            color: '#333355'
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            contents: [
              {
                type: 'text',
                text: '🔮 預示與建議',
                color: '#BF00FF',
                size: 'sm',
                weight: 'bold'
              },
              {
                type: 'text',
                text: shortPrediction,
                color: '#CCCCCC',
                size: 'sm',
                wrap: true,
                margin: 'sm'
              }
            ]
          },
          {
            type: 'separator',
            margin: 'lg',
            color: '#333355'
          },
          {
            type: 'box',
            layout: 'horizontal',
            margin: 'lg',
            contents: [
              createLuckyBox('🎨', lucky.color),
              createLuckyBox('🔢', String(lucky.number)),
              createLuckyBox('⏰', lucky.time),
              createLuckyBox('🧿', lucky.charm)
            ]
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#0f0f1a',
        paddingAll: '15px',
        contents: [
          {
            type: 'text',
            text: '🌙 AI 解夢大師 · Powered by Groq',
            color: '#666666',
            size: 'xs',
            align: 'center'
          }
        ]
      }
    }
  };
  
  const result = sendLineFlexMessage(flexMessage);
  console.log('測試結果:', result.success ? '✅ 成功' : '❌ 失敗');
}

// 工具函數
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
