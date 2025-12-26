#!/bin/bash

# Renk tanımları
YEIL='\033[0;32m'
NC='\033[0m'

echo -e "${YEIL}🚀 Kurulum Başlıyor...${NC}"

# Sistem Güncelleme
pkg update -y && pkg upgrade -y

# Gerekli Paketler
pkg install nodejs wget -y

# Klasör ve Kütüphane Kurulumu
mkdir -p wolf_bot
cd wolf_bot
npm install socket.io-client

# İki Dosyayı Aynı Anda İndirme (Linkleri Kendi Linklerinle Değiştir)
echo -e "${YEIL}📥 Dosyalar indiriliyor...${NC}"
wget -q https://raw.githubusercontent.com/clanu5/jockey/refs/heads/main/bot.mjs
wget -q https://raw.githubusercontent.com/KULLANICI/REPO/main/diger_dosya.js

echo -e "${YEIL}✅ İşlem Tamam! Çalıştırmak için: node bot.js${NC}"
