// שלב 26: החלפת סקינים
// ------------------------------------

// 1. רשימה של כל קבצי ה-CSS שנמצאים בתקיית SKINS
//    *** החלף את אלה בשמות הקבצים האמיתיים שלך! ***
const skins = [
    'basic.css',
    'dark.css',
    'modern.css',
];

// 2. משתנה שעוקב אחרי הסקין הנוכחי (מתחילים מ-0, שזה הסקין הראשון ברשימה)
let currentSkinIndex = 0;

// 3. "לתפוס" את האלמנטים מה-HTML לפי ה-ID שנתנו להם
const skinLinkTag = document.getElementById('skin-link');
const switchButton = document.getElementById('skin-switcher-btn');

// 4. להאזין לאירוע "קליק" על הכפתור
switchButton.addEventListener('click', function() {
    
    // 5. כשלוחצים, קדם את המונה לסקין הבא
    currentSkinIndex++;

    // 6. אם הגענו לסוף הרשימה, תחזור להתחלה (לאינדקס 0)
    //    זה מה שגורם לזה להסתובב בלולאה
    if (currentSkinIndex >= skins.length) {
        currentSkinIndex = 0;
    }

    // 7. קח את שם קובץ ה-CSS החדש מהרשימה
    const newSkinFile = skins[currentSkinIndex];

    // 8. הדבר הכי חשוב: שנה את ה-href של תגית ה-link
    //    לנתיב של הקובץ החדש
    skinLinkTag.href = 'SKINS/' + newSkinFile;
});