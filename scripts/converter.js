function calculateCost() {
    const itemPrice = document.getElementById('item').value; // 商品選擇的價目表 (16, 32, 64)
    const itemQuantity = parseFloat(document.getElementById('item-quantity').value); // 商品數量
    const paymentCurrency = document.getElementById('payment-currency').value; // 支付貨幣 (銅/金/綠寶石)

    // 檢查商品數量和支付貨幣是否有效
    if (isNaN(itemQuantity) || itemQuantity <= 0) {
        document.getElementById('item-result').innerText = '請輸入有效的商品數量。';
        return;
    }

    if (isNaN(paymentCurrency) || paymentCurrency === "") {
        document.getElementById('item-result').innerText = '請選擇有效的支付貨幣。';
        return;
    }

    // 設定商品價格換算比例 (綠寶石 -> 銅/金)
    const itemRates = {
        "16": { // 遠古遺骸價格
            "6": 864,  // 1 遠古遺骸 = 864 銅
            "9": 144,   // 1 遠古遺骸 = 144 金
            "1": 16,   // 1 遠古遺骸 = 16 綠寶石
        },
        "32": { // 獄髓碎片價格
            "6": 1728,  // 1 獄髓碎片 = 1728 銅
            "9": 288,   // 1 獄髓碎片 = 288 金
            "1": 32,   // 1 獄髓碎片 = 32 綠寶石
        },
        "64": { // 獄髓升級模版價格
            "6": 3456, // 1 獄髓升級模版 = 3456 銅
            "9": 576,  // 1 獄髓升級模版 = 576 金
            "1": 64,   // 1 獄髓升級模版 = 64 綠寶石
        },
        "24": { // 混凝土價格
            "6": 1296,  // 1 混凝土 = 1296 銅
            "9": 216,   // 1 混凝土 = 216 金
            "1": 24,   // 1 混凝土 = 24 綠寶石
        },
    };

    // 確保商品價格對應的支付貨幣存在
    const selectedRates = itemRates[itemPrice];

    if (!selectedRates) {
        document.getElementById('item-result').innerText = '無效的商品選擇。';
        return;
    }

    // 確保選擇的支付貨幣有效
    const costForSelectedCurrency = selectedRates[paymentCurrency];

    if (costForSelectedCurrency === undefined) {
        document.getElementById('item-result').innerText = '無效的貨幣選擇。';
        return;
    }

    // 計算總價格
    const totalCost = costForSelectedCurrency * itemQuantity;

    // 顯示計算結果
    document.getElementById('item-result').innerText = `購買 ${itemQuantity} 單位的商品需要約 ${totalCost} 單位的選定支付貨幣。`;
}


function convertCurrency() {
    const currency1 = document.getElementById('currency1').value;
    const currency2 = document.getElementById('currency2').value;
    const amount = parseFloat(document.getElementById('currency-amount').value);

    if (isNaN(amount) || amount <= 0) {
        document.getElementById('currency-result').innerText = '請輸入有效的正數。';
        return;
    }

    let result;
    
    // 設定貨幣之間的轉換比例
    const conversionRates = {
        "銅-金": 6, // 6 銅 = 1 金
        "金-綠寶石": 9, // 9 金 = 1 綠寶石
        "綠寶石-銅": 54, // 1 綠寶石 = 27 銅
    };

    // 根據選擇的貨幣進行轉換計算
    if (currency1 === "6" && currency2 === "1") {
        result = amount / conversionRates["綠寶石-銅"]; // 銅轉換為綠寶石
    } else if (currency1 === "1" && currency2 === "6") {
        result = amount * conversionRates["綠寶石-銅"]; // 綠寶石轉換為銅
    } else if (currency1 === "9" && currency2 === "6") {
        result = amount * conversionRates["銅-金"]; // 金轉換為銅
    } else if (currency1 === "6" && currency2 === "9") {
        result = amount / conversionRates["銅-金"]; // 銅轉換為金
    } else if (currency1 === "1" && currency2 === "9") {
        result = amount * conversionRates["金-綠寶石"]; // 綠寶石轉換為金
    } else if (currency1 === "9" && currency2 === "1") {
        result = amount / conversionRates["金-綠寶石"]; // 金轉換為綠寶石
    }

    document.getElementById('currency-result').innerText = `使用 ${amount} 單位的貨幣 1，相當於約 ${result.toFixed(2)} 單位的貨幣 2。`;
}