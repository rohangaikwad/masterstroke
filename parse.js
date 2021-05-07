const parse =  require('svg-parser').parse;
const fs = require('fs');

let data = [];
let name = 'hiragana';
//name = 'katakana';
let roman = {
    "12354":"a",
    "12363":"ka",
    "12373":"sa",
    "12383":"ta",
    "12394":"na",
    "12399":"ha",
    "12414":"ma",
    "12420":"ya",
    "12425":"ra",
    "12431":"wa",
    "12364":"ga",
    "12374":"za",
    "12384":"da",
    "12400":"ba",
    "12401":"pa",
    "12356":"i",
    "12365":"ki",
    "12375":"shi",
    "12385":"chi",
    "12395":"ni",
    "12402":"hi",
    "12415":"mi",
    "12426":"ri",
    "12432":"wi",
    "12366":"gi",
    "12376":"ji",
    "12386":"dji",
    "12403":"bi",
    "12404":"pi",
    "12358":"u",
    "12367":"ku",
    "12377":"su",
    "12388":"tsu",
    "12396":"nu",
    "12405":"fu",
    "12416":"mu",
    "12422":"yu",
    "12427":"ru",
    "12368":"gu",
    "12378":"zu",
    "12389":"dzu",
    "12406":"bu",
    "12407":"pu",
    "12360":"e",
    "12369":"ke",
    "12379":"se",
    "12390":"te",
    "12397":"ne",
    "12408":"he",
    "12417":"me",
    "12428":"re",
    "12433":"we",
    "12370":"ge",
    "12380":"ze",
    "12391":"de",
    "12409":"be",
    "12410":"pe",
    "12362":"o",
    "12371":"ko",
    "12381":"so",
    "12392":"to",
    "12398":"no",
    "12411":"ho",
    "12418":"mo",
    "12424":"yo",
    "12429":"ro",
    "12434":"wo",
    "12372":"go",
    "12382":"zo",
    "12393":"do",
    "12412":"bo",
    "12413":"po",
    "12436":"v",
    "12435":"n",
    "12450": "a",
    "12459": "ka",
    "12469": "sa",
    "12479": "ta",
    "12490": "na",
    "12495": "ha",
    "12510": "ma",
    "12516": "ya",
    "12521": "ra",
    "12527": "wa",
    "12460": "ga",
    "12470": "za",
    "12480": "da",
    "12496": "ba",
    "12497": "pa",
    "12452": "i",
    "12461": "ki",
    "12471": "shi",
    "12481": "chi",
    "12491": "ni",
    "12498": "hi",
    "12511": "mi",
    "12522": "ri",
    "12528": "wi",
    "12462": "gi",
    "12472": "ji",
    "12482": "dji",
    "12499": "bi",
    "12500": "pi",
    "12454": "u",
    "12463": "ku",
    "12473": "su",
    "12484": "tsu",
    "12492": "nu",
    "12501": "fu",
    "12512": "mu",
    "12518": "yu",
    "12523": "ru",
    "12464": "gu",
    "12474": "zu",
    "12485": "dzu",
    "12502": "bu",
    "12503": "pu",
    "12456": "e",
    "12465": "ke",
    "12475": "se",
    "12486": "te",
    "12493": "ne",
    "12504": "he",
    "12513": "me",
    "12524": "re",
    "12529": "we",
    "12466": "ge",
    "12476": "ze",
    "12487": "de",
    "12505": "be",
    "12506": "pe",
    "12458": "o",
    "12467": "ko",
    "12477": "so",
    "12488": "to",
    "12494": "no",
    "12507": "ho",
    "12514": "mo",
    "12520": "yo",
    "12525": "ro",
    "12530": "wo",
    "12468": "go",
    "12478": "zo",
    "12489": "do",
    "12508": "bo",
    "12509": "po",
    "12532": "v",
    "12531": "n"
}

let letters = {
    "3041": "HIRAGANA LETTER SMALL A",
    "3042": "HIRAGANA LETTER A",
    "3043": "HIRAGANA LETTER SMALL I",
    "3044": "HIRAGANA LETTER I",
    "3045": "HIRAGANA LETTER SMALL U",
    "3046": "HIRAGANA LETTER U",
    "3047": "HIRAGANA LETTER SMALL E",
    "3048": "HIRAGANA LETTER E",
    "3049": "HIRAGANA LETTER SMALL O",
    "304A": "HIRAGANA LETTER O",
    "304B": "HIRAGANA LETTER KA",
    "304C": "HIRAGANA LETTER GA",
    "304D": "HIRAGANA LETTER KI",
    "304E": "HIRAGANA LETTER GI",
    "304F": "HIRAGANA LETTER KU",
    "3050": "HIRAGANA LETTER GU",
    "3051": "HIRAGANA LETTER KE",
    "3052": "HIRAGANA LETTER GE",
    "3053": "HIRAGANA LETTER KO",
    "3054": "HIRAGANA LETTER GO",
    "3055": "HIRAGANA LETTER SA",
    "3056": "HIRAGANA LETTER ZA",
    "3057": "HIRAGANA LETTER SI = SHI",
    "3058": "HIRAGANA LETTER ZI = JI (not unique)",
    "3059": "HIRAGANA LETTER SU",
    "305A": "HIRAGANA LETTER ZU",
    "305B": "HIRAGANA LETTER SE",
    "305C": "HIRAGANA LETTER ZE",
    "305D": "HIRAGANA LETTER SO",
    "305E": "HIRAGANA LETTER ZO",
    "305F": "HIRAGANA LETTER TA",
    "3060": "HIRAGANA LETTER DA",
    "3061": "HIRAGANA LETTER TI = CHI",
    "3062": "HIRAGANA LETTER DI = JI (not unique)",
    "3063": "HIRAGANA LETTER SMALL TU = SMALL TSU",
    "3064": "HIRAGANA LETTER TU = TSU",
    "3065": "HIRAGANA LETTER DU = ZU (not unique)",
    "3066": "HIRAGANA LETTER TE",
    "3067": "HIRAGANA LETTER DE",
    "3068": "HIRAGANA LETTER TO",
    "3069": "HIRAGANA LETTER DO",
    "306A": "HIRAGANA LETTER NA",
    "306B": "HIRAGANA LETTER NI",
    "306C": "HIRAGANA LETTER NU",
    "306D": "HIRAGANA LETTER NE",
    "306E": "HIRAGANA LETTER NO",
    "306F": "HIRAGANA LETTER HA",
    "3070": "HIRAGANA LETTER BA",
    "3071": "HIRAGANA LETTER PA",
    "3072": "HIRAGANA LETTER HI",
    "3073": "HIRAGANA LETTER BI",
    "3074": "HIRAGANA LETTER PI",
    "3075": "HIRAGANA LETTER HU = FU",
    "3076": "HIRAGANA LETTER BU",
    "3077": "HIRAGANA LETTER PU",
    "3078": "HIRAGANA LETTER HE",
    "3079": "HIRAGANA LETTER BE",
    "307A": "HIRAGANA LETTER PE",
    "307B": "HIRAGANA LETTER HO",
    "307C": "HIRAGANA LETTER BO",
    "307D": "HIRAGANA LETTER PO",
    "307E": "HIRAGANA LETTER MA",
    "307F": "HIRAGANA LETTER MI",
    "3080": "HIRAGANA LETTER MU",
    "3081": "HIRAGANA LETTER ME",
    "3082": "HIRAGANA LETTER MO",
    "3083": "HIRAGANA LETTER SMALL YA",
    "3084": "HIRAGANA LETTER YA",
    "3085": "HIRAGANA LETTER SMALL YU",
    "3086": "HIRAGANA LETTER YU",
    "3087": "HIRAGANA LETTER SMALL YO",
    "3088": "HIRAGANA LETTER YO",
    "3089": "HIRAGANA LETTER RA",
    "308A": "HIRAGANA LETTER RI",
    "308B": "HIRAGANA LETTER RU",
    "308C": "HIRAGANA LETTER RE",
    "308D": "HIRAGANA LETTER RO",
    "308E": "HIRAGANA LETTER SMALL WA",
    "308F": "HIRAGANA LETTER WA",
    "3090": "HIRAGANA LETTER WI",
    "3091": "HIRAGANA LETTER WE",
    "3092": "HIRAGANA LETTER WO",
    "3093": "HIRAGANA LETTER N",
    "3094": "HIRAGANA LETTER VU",
    "3095": "HIRAGANA LETTER SMALL KA",
    "3096": "HIRAGANA LETTER SMALL KE",
    "3099": "COMBINING KATAKANA-HIRAGANA VOICED SOUND MARK",
    "309A": "COMBINING KATAKANA-HIRAGANA SEMIVOICED SOUND MARK",
    "309B": "KATAKANA-HIRAGANA VOICED SOUND MARK",
    "309C": "KATAKANA-HIRAGANA SEMI-VOICED SOUND MARK",
    "309D": "HIRAGANA ITERATION MARK",
    "309E": "HIRAGANA VOICED ITERATION MARK",
    "309F": "HIRAGANA DIGRAPH YORI",
    "30A0": "KATAKANA-HIRAGANA DOUBLE HYPHEN",
    "30A1": "KATAKANA LETTER SMALL A",
    "30A2": "KATAKANA LETTER A",
    "30A3": "KATAKANA LETTER SMALL I",
    "30A4": "KATAKANA LETTER I",
    "30A5": "KATAKANA LETTER SMALL U",
    "30A6": "KATAKANA LETTER U",
    "30A7": "KATAKANA LETTER SMALL E",
    "30A8": "KATAKANA LETTER E",
    "30A9": "KATAKANA LETTER SMALL O",
    "30AA": "KATAKANA LETTER O",
    "30AB": "KATAKANA LETTER KA",
    "30AC": "KATAKANA LETTER GA",
    "30AD": "KATAKANA LETTER KI",
    "30AE": "KATAKANA LETTER GI",
    "30AF": "KATAKANA LETTER KU",
    "30B0": "KATAKANA LETTER GU",
    "30B1": "KATAKANA LETTER KE",
    "30B2": "KATAKANA LETTER GE",
    "30B3": "KATAKANA LETTER KO",
    "30B4": "KATAKANA LETTER GO",
    "30B5": "KATAKANA LETTER SA",
    "30B6": "KATAKANA LETTER ZA",
    "30B7": "KATAKANA LETTER SI = SHI",
    "30B8": "KATAKANA LETTER ZI = JI (not unique)",
    "30B9": "KATAKANA LETTER SU",
    "30BA": "KATAKANA LETTER ZU",
    "30BB": "KATAKANA LETTER SE",
    "30BC": "KATAKANA LETTER ZE",
    "30BD": "KATAKANA LETTER SO",
    "30BE": "KATAKANA LETTER ZO",
    "30BF": "KATAKANA LETTER TA",
    "30C0": "KATAKANA LETTER DA",
    "30C1": "KATAKANA LETTER TI = CHI",
    "30C2": "KATAKANA LETTER DI = JI (not unique)",
    "30C3": "KATAKANA LETTER SMALL TU = SMALL TSU",
    "30C4": "KATAKANA LETTER TU = TSU",
    "30C5": "KATAKANA LETTER DU = ZU (not unique)",
    "30C6": "KATAKANA LETTER TE",
    "30C7": "KATAKANA LETTER DE",
    "30C8": "KATAKANA LETTER TO",
    "30C9": "KATAKANA LETTER DO",
    "30CA": "KATAKANA LETTER NA",
    "30CB": "KATAKANA LETTER NI",
    "30CC": "KATAKANA LETTER NU",
    "30CD": "KATAKANA LETTER NE",
    "30CE": "KATAKANA LETTER NO",
    "30CF": "KATAKANA LETTER HA",
    "30D0": "KATAKANA LETTER BA",
    "30D1": "KATAKANA LETTER PA",
    "30D2": "KATAKANA LETTER HI",
    "30D3": "KATAKANA LETTER BI",
    "30D4": "KATAKANA LETTER PI",
    "30D5": "KATAKANA LETTER HU = FU",
    "30D6": "KATAKANA LETTER BU",
    "30D7": "KATAKANA LETTER PU",
    "30D8": "KATAKANA LETTER HE",
    "30D9": "KATAKANA LETTER BE",
    "30DA": "KATAKANA LETTER PE",
    "30DB": "KATAKANA LETTER HO",
    "30DC": "KATAKANA LETTER BO",
    "30DD": "KATAKANA LETTER PO",
    "30DE": "KATAKANA LETTER MA",
    "30DF": "KATAKANA LETTER MI",
    "30E0": "KATAKANA LETTER MU",
    "30E1": "KATAKANA LETTER ME",
    "30E2": "KATAKANA LETTER MO",
    "30E3": "KATAKANA LETTER SMALL YA",
    "30E4": "KATAKANA LETTER YA",
    "30E5": "KATAKANA LETTER SMALL YU",
    "30E6": "KATAKANA LETTER YU",
    "30E7": "KATAKANA LETTER SMALL YO",
    "30E8": "KATAKANA LETTER YO",
    "30E9": "KATAKANA LETTER RA",
    "30EA": "KATAKANA LETTER RI",
    "30EB": "KATAKANA LETTER RU",
    "30EC": "KATAKANA LETTER RE",
    "30ED": "KATAKANA LETTER RO",
    "30EE": "KATAKANA LETTER SMALL WA",
    "30EF": "KATAKANA LETTER WA",
    "30F0": "KATAKANA LETTER WI",
    "30F1": "KATAKANA LETTER WE",
    "30F2": "KATAKANA LETTER WO",
    "30F3": "KATAKANA LETTER N",
    "30F4": "KATAKANA LETTER VU",
    "30F5": "KATAKANA LETTER SMALL KA",
    "30F6": "KATAKANA LETTER SMALL KE",
    "30F7": "KATAKANA LETTER VA",
    "30F8": "KATAKANA LETTER VI",
    "30F9": "KATAKANA LETTER VE",
    "30FA": "KATAKANA LETTER VO",
    "30FB": "KATAKANA MIDDLE DOT",
    "30FC": "KATAKANA-HIRAGANA PROLONGED SOUND MARK",
    "30FD": "KATAKANA ITERATION MARK",
    "30FE": "KATAKANA VOICED ITERATION MARK",
    "30FF": "KATAKANA DIGRAPH KOTO"
}

const dirname = `images/${name}/`;
fs.readdir(dirname, async (err, filenames) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(filenames.length);

    
    let promise = new Promise((resolve, reject) => {
        filenames.forEach((filename,index) => {
            fs.readFile(dirname + filename, 'utf-8', function (err, content) {
                if (err) {
                    onError(err);
                    return;
                }
                let parsed = parse(content);
        
                let dec = parseInt(filename.split('.')[0]);
                let hex = dec.toString(16);
                let glyph = {
                    dec: dec,
                    hex: hex,
                    char: String.fromCharCode(dec),
                    romanization: roman[dec] || "",
                    name: letters[hex.toLocaleUpperCase()] || "",
                    viewBox: parsed.children[0].properties.viewBox,
                    paths: parsed.children[0].children[0].properties.d.split('M').map(p => `M${p}`)
                }
                glyph.paths.splice(0,1)
                data.push(glyph);

                if(index == filenames.length-1) {
                    resolve();
                }
            });
        });
    })

    let result = await promise;

    data = data.sort((a,b) => {
        if(a.dec > b.dec) return 1;
        if(a.dec < b.dec) return -1;
        return 0;
    })

    //console.log(data);
    fs.writeFileSync(`${name}.json`, JSON.stringify(data, null, 4));
});