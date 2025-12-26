#!/bin/bash

echo "🍀 YASUO WOLF BOT - Otomatik Kurulum Başlıyor..."
sleep 2

# 1. Sistem Güncelleme
echo "🔄 Sistem paketleri güncelleniyor..."
pkg update -y && pkg upgrade -y

# 2. Gerekli Paketlerin Kurulumu (Node.js ve Wget)
echo "📦 Node.js ve Wget kuruluyor..."
pkg install nodejs wget -y

# 3. Klasör Hazırlığı
echo "📂 Proje klasörü oluşturuluyor..."
mkdir -p yasuo_bot
cd yasuo_bot

# 4. Kütüphanelerin Kurulumu
echo "📚 Socket.io-client kütüphanesi yükleniyor..."
npm install socket.io-client

# 5. Bot Dosyasını GitHub'dan Çekme
# NOT: Buradaki URL'yi kendi GitHub Raw linkinle değiştir!
echo "📥 Bot dosyası indiriliyor..."
wget -O bot.mjs https://raw.githubusercontent.com/clanu5/jockey/refs/heads/main/bot.mjs

echo "✅ KURULUM TAMAMLANDI!"

echo "🚀 Botu başlatmak için: cd yasuo_bot && node bot.js"
