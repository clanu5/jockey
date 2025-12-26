import { io } from 'socket.io-client';
import readline from 'readline';

// --- AYARLAR ---
const WOLF_URL = "https://v3.palringo.com";
const EMAIL = 'xxxxxxx@gmail.com';
const PASSWORD = 'xxxxx';

// Dinamik Değişkenler
let trainMesaji = "!train";
let trainDakika = 10;
let yarisGrupId = 81941378;
let yarisDakika = 10;

// Yonca ve İmza Logosu
function drawClover() {
    console.log(`
           _   _
          ( )_( )
       _ (       ) _
      ( )_ YASUO _( )
       (           )
        (_       _)
          ( )_( )
             |
             |
    `);
    console.log("   --- YASUO WOLF BOT ---");
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const socket = io(WOLF_URL, {
    transports: ['websocket'],
    reconnection: true
});

// Yardımcı Mesaj Gönderme Fonksiyonu
function sendMessage(targetId, isGroup, text) {
    const packet = {
        body: {
            recipient: parseInt(targetId),
            isGroup: isGroup,
            mimeType: 'text/plain',
            data: Buffer.from(text, 'utf8'),
            flightId: Math.random().toString(36).substring(7)
        },
        headers: { version: 1 }
    };

    socket.emit('message send', packet, (res) => {
        if (res?.code === 200) {
            console.log(`✅ [${new Date().toLocaleTimeString()}] Gönderildi: ${text}`);
        } else {
            console.log(`❌ Hata: ${res?.code}`);
        }
    });
}

// Ana Menü Fonksiyonu
function showMainMenu() {
    console.log("\n==========================");
    console.log("   WOLF BOT KONTROL PANELİ   ");
    console.log("==========================");
    console.log("1-) Oto Train (Özel Mesaj)");
    console.log("2-) Oto Yarış (Grup Mesajı)");
    console.log("3-) Ayarlar");
    console.log("==========================");
    
    rl.question('Seçiminizi yapın (1-3): ', (choice) => {
        switch (choice) {
            case '1':
                console.log(`\n🚀 Oto Train Başlatıldı!`);
                setInterval(() => sendMessage(80277459, false, trainMesaji), trainDakika * 60000);
                break;
            case '2':
                console.log(`\n🚀 Oto Yarış Başlatıldı!`);
                setInterval(() => sendMessage(yarisGrupId, true, "!j race"), yarisDakika * 60000);
                break;
            case '3':
                showSettingsMenu();
                break;
            default:
                showMainMenu();
                break;
        }
    });
}

// Ayarlar Menüsü
function showSettingsMenu() {
    console.log("\n--- AYARLAR ---");
    console.log("1-) Oto Train Ayarları");
    console.log("2-) Oto Yarış Ayarları");
    console.log("b-) Geri Dön");
    
    rl.question('Seçiminizi yapın: ', (choice) => {
        if (choice === '1') {
            rl.question('Train Mesajı: ', (msg) => {
                trainMesaji = msg || trainMesaji;
                rl.question('Dakika: ', (dk) => {
                    trainDakika = parseInt(dk) || trainDakika;
                    showSettingsMenu();
                });
            });
        } else if (choice === '2') {
            rl.question('Grup ID: ', (id) => {
                yarisGrupId = id || yarisGrupId;
                rl.question('Dakika: ', (dk) => {
                    yarisDakika = parseInt(dk) || yarisDakika;
                    showSettingsMenu();
                });
            });
        } else if (choice.toLowerCase() === 'b') {
            showMainMenu();
        }
    });
}

// Bağlantı ve Giriş
socket.on('connect', () => {
    // Giriş anında logoyu çiz
    console.clear(); // Ekranı temizle
    drawClover(); 
    
    console.log('🌐 Sunucuya bağlanılıyor...');
    
    const loginData = {
        body: { onlineStatus: 1, username: EMAIL, password: PASSWORD, type: 'email' },
        headers: { version: 1 }
    };

    socket.emit('security login', loginData, (res) => {
        if (res?.code === 200 || res?.code === 201) {
            const nick = res.body?.subscriber?.nickname || "YASUO";
            console.log(`\n🔓 Giriş Başarılı! Hoş geldin, üçkağıtçı.`);
            showMainMenu();
        } else {
            console.error('❌ Giriş Hatası.');
            process.exit();
        }
    });
});
