MONSTER CHESS ARENA — UNANG PLAYABLE PROTOTYPE
================================================

ANO ITO?
- Mobile-first installable web app (PWA).
- May recruit shop, 4x4 board, player vs AI auto-battle, coins at demo premium shop.
- Orihinal na monster concepts na gumagamit pa ng emoji placeholders.
- Hindi pa ito full 3D game, hindi pa online multiplayer, at wala pang totoong payment.
- Ang mga premium button ay demo lamang at walang kinokolektang pera.

MGA FILE
- index.html: app screen
- style.css: mobile UI
- game.js: game logic
- manifest.json: PWA install settings
- sw.js: basic offline cache
- icon-192.png at icon-512.png: app icons

PINAKAMADALING PARAAN GAMIT ANG ANDROID PHONE
1. I-download at i-extract ang ZIP.
2. Gumawa ng GitHub account kung wala ka pa.
3. Gumawa ng bagong public repository, halimbawa: monster-chess-arena.
4. I-upload ang lahat ng file sa root ng repository. Siguraduhing kasama ang index.html, style.css, game.js, manifest.json, sw.js at dalawang PNG icons.
5. Sa repository Settings > Pages, piliin ang deploy mula sa branch (main) at folder /(root), saka Save.
6. Hintayin ang published URL na ibibigay ng GitHub Pages.
7. Buksan ang HTTPS URL sa Chrome sa Android. I-tap ang menu (⋮) at piliin ang Install app o Add to Home screen kung available.
8. Subukan ang recruit, placement, battle at reset.

Kung mobile upload mahirap, puwedeng gumamit ng GitHub website sa Chrome; piliin ang “Desktop site” kung hindi makita ang upload controls. Ang free hosting terms ay puwedeng magbago.

KUNG MAY COMPUTER LATER
- I-download ang ZIP, i-extract, at patakbuhin sa local web server.
- Para sa totoong 3D, gumamit ng Three.js at GLB models; tingnan ang https://threejs.org/manual/
- Huwag buksan lang ang index.html bilang file:// kapag sinusubukan ang service worker/PWA. Gumamit ng HTTPS hosting o local server.

PAGKAKAKITAAN — HAKBANG-HAKBANG
1. Unahin ang libreng gameplay at humingi ng feedback.
2. Magdagdag ng cosmetics: skins, board themes, victory effects. Huwag magbenta ng unfair combat advantage sa competitive mode.
3. Bago tumanggap ng pera, mag-set up ng totoong backend, order records, secure payment provider, refund/support process at server-side verification. Huwag ilagay ang secret API keys sa browser code.
4. Huwag magpakita ng “successful purchase” hangga't hindi nakukumpirma ng payment provider/server.
5. Ihiwalay ang demo coins sa totoong pera. Huwag mangakong may cash winnings.

LEGAL / PRIVACY CHECKLIST (PHILIPPINES)
- Gumamit ng sariling monster names, art, sounds at music. Huwag kopyahin ang Pokémon o ibang franchise.
- Maglagay ng Terms of Use, Privacy Policy, contact/support details at malinaw na presyo/refund rules bago magbenta.
- Suriin ang DTI/SEC business registration, BIR tax/invoicing at naaangkop na LGU requirements kapag nagpapatakbo na ng negosyo. Suriin din ang kasalukuyang DTI e-commerce/Trustmark requirements.
- Kung mangolekta ng personal data, sundin ang Data Privacy Act at mga naaangkop na NPC requirements; mangolekta lang ng kailangan at protektahan ito.
- Kung gagamit ng Google Play billing sa Android app, basahin ang kasalukuyang Google Play payments policy. Ang web-based purchases at in-app digital goods ay maaaring may magkaibang rules depende sa platform.
- Iwasan muna ang loot boxes na may random paid rewards, cash prizes, betting o cash-out features; maaari itong mag-trigger ng dagdag na batas/platform rules.
- Hindi ito legal advice. Kumuha ng propesyonal na payo bago maglunsad ng real-money features.

NEXT TECHNICAL MILESTONES
1. Replace emoji with optimized original GLB 3D monsters.
2. Add account/authentication and save data.
3. Create secure server for matchmaking and authoritative battle simulation.
4. Add secure payments only after compliance review.
