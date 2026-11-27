"""Check the root list against common Hebrew and Arabic roots.

Every root here is in everyday or classical use; the dictionary should know
it and give it a short, readable meaning. Run after rebuilding:

  python3 scripts/check_lexicon.py src/data/roots.json
"""
import json, sys

HEBREW = """
אבד אבה אהב אור אזנ אחז אכל אמנ אמצ אמר אספ ארכ ארצ אשמ באר בגד בדל בוא בוש בזה בחנ בחר בטח בינ בכה
בנה בער בקע בקש ברא ברח ברכ ברר בשל גאל גבה גבר גדל גור גזל גלה גמל גנב גרש דבק דבר דרש דמה דעכ דרכ
הלכ הלל הפכ הרג הרה זבח זהר זכר זמר זנה זעק זרע חבר חבש חגג חדש חזק חטא חיה חכמ חלה חלל חלמ חלק חמד
חנכ חננ חסד חפצ חקר חרב חרש חשב חשכ טבע טהר טוב טמא טעמ טרפ ידה ידע יכל ילד יסד יסר יעצ יצא יצר ירא
ירד ירש ישב ישע כבד כבס כהנ כונ כלה כנס כסה כעס כפר כרע כרת כשל כתב לבש לחמ למד לקח מאס מדד מהר מות
מכר מלא מלח מלט מלכ מנה מצא משח משכ משל נבא נגד נגע נדר נהג נוח נטע נכר נסע נפל נצח נצל נשא נשכ נשק
נתנ סבב סגר סור סלח ספר סתר עבד עבר עזב עזר עלה עמד ענה עשה פגע פדה פחד פלא פלל פנה פקד פרד פרה פתח
צדק צוה צמח צעק קבל קבצ קבר קדמ קדש קומ קטנ קנה קרא קרב קרע ראה רבה רגל רדפ רוצ רחמ רחק רכב רעה רפא
רצה שאל שבע שבר שבת שוב שחק שחת שיר שכב שכח שכנ שלח שלמ שמח שמע שמר שנא שפט שפכ שקה שקל שרפ שרת שתה
תמכ תפש
""".split()

ARABIC = """
ءبي ءخذ ءذن ءكل ءمر ءمن ءنس بحث بدء برك بعث بقي بكي بني بيع تبع ترك ثبت جلس جمع جهد حبب حدث حرب حرم
حسب حسن حضر حفظ حكم حمد حمل خبر خدم خرج خلق خوف دخل درس دعو ذكر ذهب رجع رحم ركب رزق رسل رضي رفع رقص
زرع زور سءل سجد سرق سفر سكن سلم سمع سهل شرب شرح شكر شهد صبر صدق صرخ صعد صلح صنع ضحك ضرب طبخ طلب طير
ظلم ظهر عبد عرف عزم عشق عفو علم عمل عود عيش غفر غلب فتح فرح فرق فعل فقد فكر فهم قبل قتل قدر قدس قرء
قرب قسم قطع قعد قول قوم كتب كذب كرم كسر كفر لبس لعب لقي مدح مرض مسك مشي ملك منع موت نبت نجح نزل نصر
نظر نعم نفع نوم هدي هرب وجد وجه وحد ودع ورث وصل وضع وعد وقف ولد يسر
""".split()


def main(path):
    d = json.load(open(path, encoding="utf-8"))
    failed = 0
    for lang, roots in (("he", HEBREW), ("ar", ARABIC)):
        missing = [r for r in roots if r not in d[lang]]
        long = [r for r in roots if r in d[lang] and len(d[lang][r]) > 90]
        share = 100 * (len(roots) - len(missing)) / len(roots)
        print(f"{lang}: {len(roots) - len(missing)}/{len(roots)} known ({share:.0f}%)")
        if missing:
            print("  missing:", " ".join(missing))
        if long:
            print("  meanings over 90 characters:", " ".join(long))
        failed += share < 95
    return failed


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else "src/data/roots.json"))
