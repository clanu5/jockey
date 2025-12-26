

echo -e "${GREEN}🍀 YASUO & JOCKEY SETUP BAŞLIYOR...${NC}"

# 1. Paketleri Güncelle ve Kur
echo "🔄 Temel paketler kuruluyor..."
pkg update -y && pkg upgrade -y
pkg install nodejs wget -y

# 2. Çalışma Klasörü Oluştur
echo "📂 Klasör hazırlanıyor..."
mkdir -p jockey_bot
cd jockey_bot

# 3. Kütüphaneleri Kur
# Not: Botun socket.io-client kullandığını varsayıyoruz. 
# bot.mjs içinde farklı importlar varsa buraya ekleme yapabilirsin.
echo "📚 Kütüphaneler yükleniyor..."
npm install socket.io-client

# 4. GitHub'dan Dosyaları Çek
# GitHub linkini wget'in anlayacağı RAW formatına çevirdik.
echo "📥 Dosyalar indiriliyor..."
wget -O bot.mjs https://raw.githubusercontent.com/clanu5/jockey/main/bot.mjs

echo -e "${GREEN}✅ Kurulum Tamamlandı!${NC}"
echo "🚀 Botu başlatmak için: node bot.mjs"
