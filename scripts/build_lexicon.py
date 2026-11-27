"""Build the Semitic Triangles root list from two public-domain lexicons.

Hebrew: Brown-Driver-Briggs, digital edition by the Open Scriptures Hebrew
Bible Project (CC BY 4.0). Arabic: E. W. Lane, An Arabic-English Lexicon,
digital edition by the Perseus Digital Library (free distribution with credit).

Output: {"he": {root: gloss}, "ar": {root: gloss}} with three-letter roots
spelled in the game's letter ids (square Hebrew, Arabic).
"""
import glob, html, json, re, sys, unicodedata

bdb_path, lane_dir, out = sys.argv[1:4]

def clean(t):
    t = re.sub(r"<[^>]+>", "", t)
    t = html.unescape(re.sub(r"\s+", " ", t)).strip(" ,;:.()[]")
    return t

def join_glosses(gs, limit=3, maxlen=70):
    seen, outl = set(), []
    for g in gs:
        k = g.lower()
        if g and k not in seen and len(g) <= 40:
            seen.add(k); outl.append(g)
        if len(outl) == limit: break
    s = "; ".join(outl)
    return s if len(s) <= maxlen else s[:maxlen].rsplit(";", 1)[0]

# ---------------------------------------------------------------- Hebrew
FINALS = {"ך": "כ", "ם": "מ", "ן": "נ", "ף": "פ", "ץ": "צ"}
HEB = set("אבגדהוזחטיכלמנסעפצקרשת")

def heb_consonants(w):
    w = unicodedata.normalize("NFD", w)
    return "".join(FINALS.get(c, c) for c in w if FINALS.get(c, c) in HEB)

STOP = {"thus", "them", "this", "that", "they", "there", "then", "when", "with", "unto", "upon", "from", "also"}

bdb = open(bdb_path, encoding="utf-8").read()
he = {}
# BDB's Aramaic part is marked with xml:lang="arc"; keep Hebrew and Aramaic apart.
parts = re.split(r'(<part [^>]*>)', bdb)
lang = "he"
for chunk in parts:
    m = re.match(r'<part [^>]*xml:lang="(\w+)"', chunk)
    if m:
        lang = "arc" if m.group(1) == "arc" else "he"
        continue
    for body in re.findall(r'<entry [^>]*type="root"[^>]*>(.*?)</entry>', chunk, re.S):
        w = re.search(r"<w[^>]*>(.*?)</w>", body)
        if not w:
            continue
        root = heb_consonants(clean(w.group(1)))
        if len(root) != 3:
            continue
        defs = [clean(d) for d in re.findall(r"<def>(.*?)</def>", body, re.S)]
        # BDB tags some quoted fragments as definitions ("thus", "it", "let them").
        defs = [d for d in defs if len(d) > 3 and d.lower() not in STOP and not d.lower().startswith(("let ", "our ", "their ", "his ", "my "))]
        gloss = join_glosses(defs)
        if not gloss:
            continue
        key = (lang, root)
        he[key] = join_glosses((he.get(key, "") + "; " + gloss).split("; ")) if key in he else gloss

# ---------------------------------------------------------------- Arabic
LANE = {
    "A": "ء", "O": "ء", "b": "ب", "t": "ت", "v": "ث", "j": "ج", "H": "ح", "x": "خ",
    "d": "د", "c": "ذ", "r": "ر", "z": "ز", "s": "س", "X": "ش", "S": "ص", "D": "ض",
    "T": "ط", "Z": "ظ", "E": "ع", "g": "غ", "f": "ف", "q": "ق", "k": "ك", "l": "ل",
    "m": "م", "n": "ن", "h": "ه", "w": "و", "y": "ي", "I": "ي",
}
def lane_gloss(body):
    """Lane's first definition: from the first italic phrase to the end of its clause."""
    senses = []
    for m in re.finditer(r"<hi>", body):
        rest = body[m.start():m.start() + 1500]
        rest = re.sub(r"<foreign[^>]*>.*?</foreign>|<anchor[^>]*>.*?</anchor>|<pb[^>]*/>", " ", rest, flags=re.S)
        text = clean(rest)
        text = re.split(r"[:;(\[]| \(| \[", text)[0]
        text = re.sub(r"\s+", " ", text).strip(" ,.")
        text = re.sub(r"^(i\. e\.|i\. q\.?|or|and) ", "", text)
        if text.lower().startswith("i.") or text.lower().startswith("i "):
            continue
        if senses and set(re.findall(r"\w+", text.lower())) <= set(re.findall(r"\w+", senses[0].lower())):
            continue
        if len(text) >= 3 and not re.match(r"^(i\. ?[eq]|[A-Z][a-z]+ [a-z]+$)", text):
            text = text[0].lower() + text[1:] if not text.startswith("I ") else text
            senses.append(text)
        if len(senses) == 2:
            break
    return join_glosses(senses, limit=2, maxlen=80)

ar = {}
for f in sorted(glob.glob(lane_dir + "/*.xml")):
    s = open(f, encoding="utf-8").read()
    for rid, body in re.findall(r'<superEntry type="main" xml:id="Root_([^"]+)">(.*?)</superEntry>', s, re.S):
        if any(c not in LANE for c in rid):
            continue
        letters = [LANE[c] for c in rid]
        if len(letters) == 2:          # Lane files doubled roots under two letters: مدّ = m-d-d
            letters.append(letters[1])
        if len(letters) != 3:
            continue
        root = "".join(letters)
        gloss = lane_gloss(body)
        if gloss and root not in ar:
            ar[root] = gloss

data = {
    "_source": [
        "Hebrew and Aramaic: Brown-Driver-Briggs, digital edition by the Open Scriptures Hebrew Bible Project, CC BY 4.0 (https://github.com/openscriptures/HebrewLexicon).",
        "Arabic: E. W. Lane, An Arabic-English Lexicon. Text provided by Perseus Digital Library, with funding from The U.S. Department of Education and The Max Planck Society. This text may be freely distributed, subject to the following restrictions: You credit Perseus, as follows, whenever you use the document: Text provided by Perseus Digital Library, with funding from The U.S. Department of Education and The Max Planck Society. You leave this availability statement intact. You offer Perseus any modifications you make.",
        "Glosses are shortened extracts; roots are given as three consonants.",
    ],
    "he": {r: g for (l, r), g in sorted(he.items()) if l == "he"},
    "arc": {r: g for (l, r), g in sorted(he.items()) if l == "arc"},
    "ar": dict(sorted(ar.items())),
}
json.dump(data, open(out, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
print({k: len(v) for k, v in data.items()})
