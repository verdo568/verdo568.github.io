function calculateCost() {
    const itemElement = document.getElementById('item');
    const itemPrice = itemElement.value; // 商品選擇的價目表 (16, 32, 64)
    const itemName = itemElement.options[itemElement.selectedIndex].text; // 商品名稱
    const itemQuantity = parseFloat(document.getElementById('item-quantity').value); // 商品數量
    const paymentCurrencyElement = document.getElementById('payment-currency');
    const paymentCurrency = paymentCurrencyElement.value; // 支付貨幣 (銅/金/綠寶石)
    const paymentCurrencyName = paymentCurrencyElement.options[paymentCurrencyElement.selectedIndex].text; // 支付貨幣名稱
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
            "16": 1,   // 1 遠古遺骸 = 1 鑽石   
        },
        "32": { // 獄髓碎片價格
            "6": 1728,  // 1 獄髓碎片 = 1728 銅
            "9": 288,   // 1 獄髓碎片 = 288 金
            "1": 32,   // 1 獄髓碎片 = 32 綠寶石
            "16": 2,   // 1 獄髓碎片 = 2 鑽石   
        },
        "64": { // 獄髓升級模版價格
            "6": 3456, // 1 獄髓升級模版 = 3456 銅
            "9": 576,  // 1 獄髓升級模版 = 576 金
            "1": 64,   // 1 獄髓升級模版 = 64 綠寶石
            "16": 4,   // 1 獄髓升級模版 = 4 鑽石   
        },
        "24": { // 混凝土價格
            "6": 1296,  // 1 混凝土 = 1296 銅
            "9": 216,   // 1 混凝土 = 216 金
            "1": 24,   // 1 混凝土 = 24 綠寶石
            "16": 1.5,   // 1 混凝土 = 1.5 鑽石    
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
    document.getElementById('item-result').innerText = `購買 ${itemQuantity} 單位的 ${itemName}，需要約 ${totalCost} 單位的 ${paymentCurrencyName}。`;
}

// 貨幣轉換 綠寶石/金錠/銅錠/鑽石
function convertCurrency() {
    const currency1 = document.getElementById('currency1');
    const currency2 = document.getElementById('currency2');
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
        "鑽石-綠寶石": 16, // 1 鑽石 = 16 綠寶石
        "鑽石-金": 144, // 1 鑽石 = 144 金
        "鑽石-銅": 864, // 1 鑽石 = 864 銅
        "鑽石-鑽石": 1, // 1 鑽石 = 1 鑽石
    };

    // 根據選擇的貨幣進行轉換計算
    if (currency1.value === "6" && currency2.value === "1") {
        result = amount / conversionRates["綠寶石-銅"]; // 銅轉換為綠寶石
    } else if (currency1.value === "1" && currency2.value === "6") {
        result = amount * conversionRates["綠寶石-銅"]; // 綠寶石轉換為銅
    } else if (currency1.value === "9" && currency2.value === "6") {
        result = amount * conversionRates["銅-金"]; // 金轉換為銅
    } else if (currency1.value === "6" && currency2.value === "9") {
        result = amount / conversionRates["銅-金"]; // 銅轉換為金
    } else if (currency1.value === "1" && currency2.value === "9") {
        result = amount * conversionRates["金-綠寶石"]; // 綠寶石轉換為金
    } else if (currency1.value === "9" && currency2.value === "1") {
        result = amount / conversionRates["金-綠寶石"]; // 金轉換為綠寶石
    } else if (currency1.value === "1" && currency2.value === "16") {
        result = amount / conversionRates["鑽石-綠寶石"]; // 綠寶石轉換為鑽石
    } else if (currency1.value === "16" && currency2.value === "1") {
        result = amount * conversionRates["鑽石-綠寶石"]; // 鑽石轉換為綠寶石
    } else if (currency1.value === "16" && currency2.value === "9") {
        result = amount * conversionRates["鑽石-金"]; // 鑽石轉換為金
    } else if (currency1.value === "9" && currency2.value === "16") {
        result = amount / conversionRates["鑽石-金"]; // 金轉換為鑽石
    } else if (currency1.value === "16" && currency2.value === "6") {
        result = amount * conversionRates["鑽石-銅"]; // 鑽石轉換為銅   
    } else if (currency1.value === "6" && currency2.value === "16") {
        result = amount / conversionRates["鑽石-銅"]; // 銅轉換為鑽石
    } else if (currency1.value === "16" && currency2.value === "16") {
        result = amount / conversionRates["鑽石-鑽石"]; // 鑽石轉換為鑽石
    }

    const currency1Name = currency1.options[currency1.selectedIndex].text;
    const currency2Name = currency2.options[currency2.selectedIndex].text;

    document.getElementById('currency-result').innerText = `使用 ${amount} 單位的 ${currency1Name}，相當於約 ${result.toFixed(2)} 單位的 ${currency2Name}。`;
}