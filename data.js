// محتوى المنهج — مبني على تسلسل وحدات كتاب nuevo Prisma A1
// كل وحدة: دروس (شرح + جداول + أمثلة)، مفردات، وتمارين.
// أنواع التمارين: mc = اختيار من متعدد، write = كتابة الإجابة.

const ALPHABET = [
  ["A", "a"], ["B", "be"], ["C", "ce"], ["D", "de"], ["E", "e"], ["F", "efe"], ["G", "ge"],
  ["H", "hache"], ["I", "i"], ["J", "jota"], ["K", "ka"], ["L", "ele"], ["M", "eme"], ["N", "ene"],
  ["Ñ", "eñe"], ["O", "o"], ["P", "pe"], ["Q", "cu"], ["R", "erre"], ["S", "ese"], ["T", "te"],
  ["U", "u"], ["V", "uve"], ["W", "uve doble"], ["X", "equis"], ["Y", "i griega / ye"], ["Z", "zeta"]
];

const UNITS = [
  {
    id: 1, icon: "fa-hand", es: "¿Qué tal?", ar: "كيف حالك؟",
    goals: ["التحية والوداع", "تقديم نفسك والآخرين", "الضمائر الشخصية", "فعل ser وفعل llamarse", "الأبجدية والتهجئة", "الجنسيات"],
    lessons: [
      {
        title: "التحية والتعارف",
        text: "للتحية نستخدم <b>¡Hola!</b> (غير رسمية) أو <b>Buenos días</b> صباحًا، <b>Buenas tardes</b> بعد الظهر، <b>Buenas noches</b> مساءً. وللتعريف بنفسك: <b>Me llamo...</b> أو <b>Soy...</b>",
        examples: [
          ["¡Hola! ¿Qué tal?", "مرحبًا! كيف الحال؟"],
          ["Me llamo Ana. ¿Y tú? ¿Cómo te llamas?", "اسمي آنا. وأنت؟ ما اسمك؟"],
          ["Soy Vicente.", "أنا فيسنتي."],
          ["Encantado / Encantada.", "تشرفت (للمذكر / للمؤنث)."],
          ["Mucho gusto.", "سررت بمعرفتك."],
          ["Adiós. Hasta luego. Hasta mañana.", "مع السلامة. أراك لاحقًا. إلى الغد."]
        ]
      },
      {
        title: "الضمائر الشخصية",
        text: "في الإسبانية ضمائر مؤنثة خاصة (nosotras, vosotras, ellas) وضمائر للاحترام <b>usted / ustedes</b>. في أمريكا اللاتينية تُستخدم <b>ustedes</b> بدل vosotros، وفي الأرجنتين وأوروغواي وغيرها يُستخدم <b>vos</b> بدل tú.",
        table: [
          ["الضمير", "المعنى"],
          ["yo", "أنا"], ["tú", "أنتَ / أنتِ (غير رسمي)"], ["él / ella / usted", "هو / هي / حضرتك"],
          ["nosotros / nosotras", "نحن"], ["vosotros / vosotras", "أنتم / أنتن"], ["ellos / ellas / ustedes", "هم / هن / حضراتكم"]
        ]
      },
      {
        title: "تصريف llamarse و ser",
        text: "<b>llamarse</b> = يُسمّى، و<b>ser</b> = يكون (للهوية والجنسية والأصل). لاحظ: <b>ser + de + مدينة/بلد</b> للأصل.",
        table: [
          ["الضمير", "llamarse", "ser"],
          ["yo", "me llamo", "soy"], ["tú", "te llamas", "eres"], ["él/ella/usted", "se llama", "es"],
          ["nosotros/as", "nos llamamos", "somos"], ["vosotros/as", "os llamáis", "sois"], ["ellos/ellas/ustedes", "se llaman", "son"]
        ],
        examples: [
          ["Soy Miriam Rubio.", "أنا ميريام روبيو."],
          ["Soy mexicana.", "أنا مكسيكية."],
          ["Soy de Guanajuato, México.", "أنا من غواناخواتو، المكسيك."]
        ]
      },
      {
        title: "tú أم usted؟",
        text: "<b>tú / vosotros</b> مع الأصدقاء والعائلة (غير رسمي). <b>usted / ustedes</b> مع كبار السن والغرباء والمواقف الرسمية، ويأتي الفعل معهما بصيغة الغائب.",
        examples: [
          ["Hola, Inés, ¿qué tal estás?", "مرحبًا إينيس، كيف حالك؟ (غير رسمي)"],
          ["Buenos días, ¿cómo está usted?", "صباح الخير، كيف حال حضرتك؟ (رسمي)"],
          ["Sr. = señor · Sra. = señora · Srta. = señorita · Dr. = doctor", "اختصارات الألقاب"]
        ]
      },
      {
        title: "الجنسيات",
        text: "عادةً المذكر ينتهي بـ <b>-o / -és</b> والمؤنث بـ <b>-a / -esa</b>. بعضها لا يتغير: <b>estadounidense, belga</b>.",
        table: [
          ["البلد", "مذكر", "مؤنث"],
          ["España", "español", "española"], ["México", "mexicano", "mexicana"], ["Francia", "francés", "francesa"],
          ["Alemania", "alemán", "alemana"], ["Egipto", "egipcio", "egipcia"], ["Marruecos", "marroquí", "marroquí"],
          ["Estados Unidos", "estadounidense", "estadounidense"], ["Japón", "japonés", "japonesa"]
        ]
      },
      {
        title: "أسئلة الصف المفيدة",
        text: "عبارات تحتاجها دائمًا في الفصل. لاحظ أن الإسبانية تستخدم علامة استفهام وتعجب مقلوبة في البداية: <b>¿...? ¡...!</b>",
        examples: [
          ["¿Cómo se dice «email» en español?", "كيف نقول «email» بالإسبانية؟"],
          ["¿Puedes repetir, por favor?", "هل يمكنك الإعادة من فضلك؟"],
          ["¿Puedes deletrearlo, por favor?", "هل يمكنك تهجئته من فضلك؟"],
          ["¡Más despacio, por favor!", "أبطأ من فضلك!"],
          ["Tú eres de Argentina, ¿verdad?", "أنت من الأرجنتين، أليس كذلك؟"]
        ]
      }
    ],
    alphabet: true,
    vocab: [
      ["hola", "مرحبًا"], ["buenos días", "صباح الخير"], ["buenas tardes", "مساء الخير (بعد الظهر)"],
      ["buenas noches", "مساء الخير / تصبح على خير"], ["adiós", "مع السلامة"], ["hasta luego", "أراك لاحقًا"],
      ["encantado", "تشرفت"], ["por favor", "من فضلك"], ["gracias", "شكرًا"], ["el nombre", "الاسم"],
      ["el apellido", "اسم العائلة"], ["el país", "البلد"], ["español", "إسباني"], ["alemán", "ألماني"],
      ["francés", "فرنسي"], ["egipcio", "مصري"], ["muy bien", "بخير جدًا"], ["señor", "السيد"], ["señora", "السيدة"]
    ],
    quiz: [
      { type: "mc", q: "Yo ___ Alejandro.", options: ["me llamo", "te llamas", "se llama"], a: 0 },
      { type: "mc", q: "Nosotros ___ de Egipto.", options: ["son", "somos", "sois"], a: 1 },
      { type: "mc", q: "Ellos ___ Vicente y Miriam.", options: ["se llaman", "nos llamamos", "os llamáis"], a: 0 },
      { type: "mc", q: "أي تحية رسمية؟", options: ["¡Hola, chicos!", "¿Cómo está usted?", "¿Qué tal estás?"], a: 1 },
      { type: "mc", q: "مؤنث «francés» هو:", options: ["francesa", "franceso", "francés"], a: 0 },
      { type: "mc", q: "في أمريكا اللاتينية بدل vosotros نقول:", options: ["ellos", "ustedes", "nosotros"], a: 1 },
      { type: "write", q: "Tú ___ de Japón. (ser)", a: ["eres"] },
      { type: "write", q: "Vosotras ___ de Francia. (ser)", a: ["sois"] },
      { type: "write", q: "Ella ___ Marta. (llamarse)", a: ["se llama"] },
      { type: "write", q: "اكتب بالإسبانية: «صباح الخير»", a: ["buenos dias", "buenos días"] }
    ]
  },

  {
    id: 2, icon: "fa-graduation-cap", es: "Estudiante de profesión", ar: "طالب بالمهنة",
    goals: ["أدوات الصف", "المذكر والمؤنث والجمع", "أداة التعريف el/la/los/las", "الألوان والأرقام", "المهن", "أفعال tener وtrabajar وhablar"],
    lessons: [
      {
        title: "المذكر والمؤنث",
        text: "الأسماء المذكرة تنتهي غالبًا بـ <b>-o</b>، والمؤنثة بـ <b>-a, -dad, -ción</b>. هناك استثناءات: <b>el mapa, el día, el tema</b> مذكرة، و<b>la mano, la foto</b> مؤنثة. أسماء الأرقام وأيام الأسبوع مذكرة دائمًا.",
        examples: [
          ["el libro, el cuaderno, el bolígrafo", "الكتاب، الدفتر، القلم"],
          ["la silla, la ciudad, la lección", "الكرسي، المدينة، الدرس"],
          ["el mapa, el día, el tema", "استثناءات مذكرة تنتهي بـ -a"],
          ["el / la estudiante, el / la periodista", "كلمات لا تتغير"]
        ]
      },
      {
        title: "الجمع وأداة التعريف",
        text: "إذا انتهت الكلمة بحرف علة نضيف <b>-s</b>، وإذا انتهت بحرف ساكن نضيف <b>-es</b>. أداة التعريف تتوافق مع الاسم في الجنس والعدد.",
        table: [
          ["", "مفرد", "جمع"],
          ["مذكر", "el libro", "los libros"], ["مؤنث", "la silla", "las sillas"],
          ["ساكن", "el rotulador", "los rotuladores"], ["ساكن", "el cartel", "los carteles"]
        ]
      },
      {
        title: "الأفعال المنتظمة: trabajar و hablar و tener",
        text: "الأفعال المنتهية بـ <b>-ar</b> تُصرّف هكذا: نحذف -ar ونضيف (o, as, a, amos, áis, an). أما <b>tener</b> (يملك) فهو فعل شاذ، ويُستخدم أيضًا للعمر: <b>Tengo 25 años</b>.",
        table: [
          ["الضمير", "trabajar", "hablar", "tener"],
          ["yo", "trabajo", "hablo", "tengo"], ["tú", "trabajas", "hablas", "tienes"], ["él/ella/usted", "trabaja", "habla", "tiene"],
          ["nosotros/as", "trabajamos", "hablamos", "tenemos"], ["vosotros/as", "trabajáis", "habláis", "tenéis"], ["ellos/ellas/ustedes", "trabajan", "hablan", "tienen"]
        ]
      },
      {
        title: "أسئلة المعلومات الشخصية",
        examples: [
          ["¿Cómo te llamas?", "ما اسمك؟"],
          ["¿Cuántos años tienes? — Tengo veinte años.", "كم عمرك؟ — عمري عشرون سنة."],
          ["¿De dónde eres?", "من أين أنت؟"],
          ["¿A qué te dedicas? — Soy profesora.", "ما عملك؟ — أنا معلمة."],
          ["¿Dónde trabajas? — Trabajo en un hospital.", "أين تعمل؟ — أعمل في مستشفى."],
          ["¿Qué lenguas hablas? — Hablo árabe e inglés.", "ما اللغات التي تتحدثها؟ — أتحدث العربية والإنجليزية."],
          ["¿Cuál es tu número de teléfono?", "ما رقم هاتفك؟"]
        ]
      },
      {
        title: "الأرقام 0–20",
        table: [
          ["رقم", "إسباني", "رقم", "إسباني"],
          ["0", "cero", "11", "once"], ["1", "uno", "12", "doce"], ["2", "dos", "13", "trece"], ["3", "tres", "14", "catorce"],
          ["4", "cuatro", "15", "quince"], ["5", "cinco", "16", "dieciséis"], ["6", "seis", "17", "diecisiete"],
          ["7", "siete", "18", "dieciocho"], ["8", "ocho", "19", "diecinueve"], ["9", "nueve", "20", "veinte"], ["10", "diez", "", ""]
        ]
      },
      {
        title: "اللغات في إسبانيا",
        text: "إلى جانب الإسبانية (el castellano) توجد لغات رسمية في بعض المناطق: <b>el catalán</b> (كتالونيا)، <b>el gallego</b> (غاليسيا)، <b>el euskera</b> (إقليم الباسك)."
      }
    ],
    vocab: [
      ["la mesa", "الطاولة"], ["la silla", "الكرسي"], ["la pizarra", "السبورة"], ["el libro", "الكتاب"],
      ["el cuaderno", "الدفتر"], ["el bolígrafo", "القلم الجاف"], ["el lápiz", "قلم الرصاص"], ["la goma", "الممحاة"],
      ["la carpeta", "الملف"], ["la mochila", "حقيبة الظهر"], ["el mapa", "الخريطة"], ["la papelera", "سلة المهملات"],
      ["rojo", "أحمر"], ["azul", "أزرق"], ["verde", "أخضر"], ["amarillo", "أصفر"], ["negro", "أسود"], ["blanco", "أبيض"],
      ["el médico", "الطبيب"], ["el profesor", "المعلم"], ["el camarero", "النادل"], ["el ingeniero", "المهندس"],
      ["el hospital", "المستشفى"], ["la escuela", "المدرسة"]
    ],
    quiz: [
      { type: "mc", q: "___ mapa", options: ["el", "la", "los"], a: 0 },
      { type: "mc", q: "___ ciudad", options: ["el", "la", "las"], a: 1 },
      { type: "mc", q: "جمع «el cartel»:", options: ["los cartels", "los carteles", "las carteles"], a: 1 },
      { type: "mc", q: "أي كلمة مؤنثة؟", options: ["el día", "la mano", "el tema"], a: 1 },
      { type: "mc", q: "¿Cuántos años ___? (tú)", options: ["tienes", "tiene", "tengo"], a: 0 },
      { type: "mc", q: "Ellos ___ en un hospital.", options: ["trabajamos", "trabaja", "trabajan"], a: 2 },
      { type: "write", q: "Yo ___ árabe y español. (hablar)", a: ["hablo"] },
      { type: "write", q: "Nosotros ___ veinte años. (tener)", a: ["tenemos"] },
      { type: "write", q: "اكتب الرقم 15 بالإسبانية", a: ["quince"] },
      { type: "write", q: "جمع «la lección»", a: ["las lecciones"] }
    ]
  },

  {
    id: 3, icon: "fa-house", es: "¡Bienvenidos a casa!", ar: "أهلًا بكم في البيت!",
    goals: ["أداة التنكير un/una", "hay (يوجد)", "فعل estar للمكان", "حروف الجر المكانية", "الفرق بين hay و está", "مفردات البيت والحي"],
    lessons: [
      {
        title: "أداة التنكير",
        table: [["", "مفرد", "جمع"], ["مذكر", "un sofá", "unos sofás"], ["مؤنث", "una cama", "unas camas"]]
      },
      {
        title: "hay — يوجد",
        text: "<b>hay</b> لا يتغير، ويأتي بعده اسم نكرة أو رقم أو mucho/poco. <b>hay + un/una/unos/unas + اسم</b>.",
        examples: [
          ["En mi casa hay una cocina grande.", "في بيتي يوجد مطبخ كبير."],
          ["Hay dos dormitorios.", "توجد غرفتا نوم."],
          ["No hay garaje.", "لا يوجد مرآب."],
          ["En mi barrio hay muchas tiendas y pocos parques.", "في حيّي محلات كثيرة وحدائق قليلة."]
        ]
      },
      {
        title: "فعل estar — للمكان",
        text: "نستخدم <b>estar</b> لتحديد مكان شيء معروف (مع أداة التعريف). <b>a + el = al</b> و <b>de + el = del</b>.",
        table: [
          ["الضمير", "estar"],
          ["yo", "estoy"], ["tú", "estás"], ["él/ella/usted", "está"],
          ["nosotros/as", "estamos"], ["vosotros/as", "estáis"], ["ellos/ellas/ustedes", "están"]
        ],
        examples: [
          ["El libro está encima de la mesa.", "الكتاب فوق الطاولة."],
          ["La lámpara está al lado del sofá.", "المصباح بجانب الأريكة."],
          ["El gato está debajo de la cama.", "القطة تحت السرير."]
        ]
      },
      {
        title: "حروف الجر المكانية",
        table: [
          ["إسباني", "المعنى"],
          ["encima de", "فوق"], ["debajo de", "تحت"], ["al lado de", "بجانب"], ["delante de", "أمام"],
          ["detrás de", "خلف"], ["entre ... y ...", "بين ... و ..."], ["dentro de", "داخل"], ["cerca de / lejos de", "قريب من / بعيد عن"],
          ["a la derecha de / a la izquierda de", "على يمين / على يسار"]
        ]
      },
      {
        title: "hay أم está؟",
        text: "<b>hay</b> لوجود شيء غير محدد (نكرة). <b>está/están</b> لمكان شيء محدد (معرّف). و <b>muy</b> + صفة: <b>muy grande</b>.",
        examples: [
          ["Hay un banco en la calle.", "يوجد بنك في الشارع."],
          ["El banco está en la Gran Vía.", "البنك موجود في شارع غران فيا."]
        ]
      }
    ],
    vocab: [
      ["la casa", "البيت"], ["el piso", "الشقة"], ["la cocina", "المطبخ"], ["el baño", "الحمّام"],
      ["el dormitorio", "غرفة النوم"], ["el salón", "الصالة"], ["la terraza", "الشرفة"], ["la cama", "السرير"],
      ["el sofá", "الأريكة"], ["la ventana", "النافذة"], ["la puerta", "الباب"], ["el armario", "الخزانة"],
      ["la lámpara", "المصباح"], ["la calle", "الشارع"], ["el barrio", "الحي"], ["el parque", "الحديقة العامة"],
      ["la tienda", "المحل"], ["el supermercado", "السوبرماركت"], ["la farmacia", "الصيدلية"], ["grande", "كبير"], ["pequeño", "صغير"]
    ],
    quiz: [
      { type: "mc", q: "En mi casa ___ dos baños.", options: ["hay", "está", "están"], a: 0 },
      { type: "mc", q: "El sofá ___ en el salón.", options: ["hay", "está", "están"], a: 1 },
      { type: "mc", q: "Las llaves ___ encima de la mesa.", options: ["hay", "está", "están"], a: 2 },
      { type: "mc", q: "___ cocina", options: ["un", "una", "unos"], a: 1 },
      { type: "mc", q: "La lámpara está al lado ___ sofá.", options: ["de el", "del", "al"], a: 1 },
      { type: "mc", q: "«debajo de» تعني:", options: ["فوق", "تحت", "بجانب"], a: 1 },
      { type: "write", q: "Yo ___ en casa. (estar)", a: ["estoy"] },
      { type: "write", q: "Nosotros ___ en el parque. (estar)", a: ["estamos"] },
      { type: "write", q: "اكتب بالإسبانية: «غرفة النوم» (مع أداة التعريف)", a: ["el dormitorio"] }
    ]
  },

  {
    id: 4, icon: "fa-people-roof", es: "¡Qué guapo!", ar: "ما أوسمه!",
    goals: ["أفراد العائلة", "صفات الملكية mi/tu/su", "وصف الشكل والشخصية", "ser و tener و llevar", "الملابس"],
    lessons: [
      {
        title: "صفات الملكية",
        text: "تتوافق مع الشيء المملوك في العدد (وفي nuestro/vuestro في الجنس أيضًا).",
        table: [
          ["المالك", "مفرد", "جمع"],
          ["yo", "mi", "mis"], ["tú", "tu", "tus"], ["él/ella/usted", "su", "sus"],
          ["nosotros/as", "nuestro/a", "nuestros/as"], ["vosotros/as", "vuestro/a", "vuestros/as"], ["ellos/ellas/ustedes", "su", "sus"]
        ],
        examples: [["Mi hermana se llama Laura.", "أختي اسمها لاورا."], ["Nuestros padres son egipcios.", "والدانا مصريان."]]
      },
      {
        title: "وصف الأشخاص: ser · tener · llevar",
        text: "<b>ser</b> + صفة (الشكل العام والشخصية). <b>tener</b> + شعر/عيون. <b>llevar</b> + ملابس، نظارة، لحية.",
        examples: [
          ["Es alto, delgado y muy simpático.", "هو طويل ونحيف ولطيف جدًا."],
          ["Tiene el pelo largo y los ojos verdes.", "لديه شعر طويل وعينان خضراوان."],
          ["Lleva gafas y una camisa azul.", "يرتدي نظارة وقميصًا أزرق."]
        ]
      },
      {
        title: "صفات مفيدة",
        table: [
          ["الشكل", "الشخصية"],
          ["alto / bajo — طويل / قصير", "simpático / antipático — لطيف / ثقيل"],
          ["gordo / delgado — سمين / نحيف", "trabajador / vago — مجتهد / كسول"],
          ["guapo / feo — وسيم / قبيح", "alegre / serio — مرح / جاد"],
          ["joven / mayor — شاب / كبير السن", "inteligente — ذكي"],
          ["rubio / moreno — أشقر / أسمر", "tímido — خجول"]
        ]
      },
      {
        title: "التلطيف في الكلام",
        text: "لوصف شيء سلبي بلطف نستخدم <b>un poco</b>: <b>Es un poco tímido</b> (هو خجول قليلًا) بدلًا من الوصف المباشر."
      }
    ],
    vocab: [
      ["el padre", "الأب"], ["la madre", "الأم"], ["los padres", "الوالدان"], ["el hermano", "الأخ"],
      ["la hermana", "الأخت"], ["el hijo", "الابن"], ["la hija", "البنت"], ["el abuelo", "الجد"], ["la abuela", "الجدة"],
      ["el tío", "العم / الخال"], ["el primo", "ابن العم"], ["el marido", "الزوج"], ["la mujer", "الزوجة"],
      ["el pelo", "الشعر"], ["los ojos", "العيون"], ["las gafas", "النظارة"], ["la camisa", "القميص"],
      ["los pantalones", "البنطال"], ["la falda", "التنورة"], ["los zapatos", "الحذاء"], ["la chaqueta", "السترة"], ["el vestido", "الفستان"]
    ],
    quiz: [
      { type: "mc", q: "___ hermanos son altos. (yo)", options: ["Mi", "Mis", "Tu"], a: 1 },
      { type: "mc", q: "Ana ___ el pelo rubio.", options: ["es", "tiene", "lleva"], a: 1 },
      { type: "mc", q: "Carlos ___ gafas.", options: ["es", "tiene", "lleva"], a: 2 },
      { type: "mc", q: "Mi abuela ___ muy simpática.", options: ["es", "tiene", "lleva"], a: 0 },
      { type: "mc", q: "عكس «alto»:", options: ["bajo", "gordo", "joven"], a: 0 },
      { type: "mc", q: "___ casa es grande. (nosotros)", options: ["Nuestro", "Nuestra", "Nuestros"], a: 1 },
      { type: "write", q: "اكتب بالإسبانية: «الأم» (مع أداة التعريف)", a: ["la madre"] },
      { type: "write", q: "El padre de mi padre es mi ___.", a: ["abuelo"] },
      { type: "write", q: "Pedro y Luis ___ simpáticos. (ser)", a: ["son"] }
    ]
  },

  {
    id: 5, icon: "fa-train-subway", es: "¿Dónde vamos?", ar: "إلى أين نذهب؟",
    goals: ["فعل ir (يذهب)", "وسائل المواصلات", "necesitar, querer, preferir", "حرفا a و en مع أفعال الحركة", "السؤال عن السعر والاتجاهات"],
    lessons: [
      {
        title: "ir + a / en",
        text: "<b>ir a</b> + مكان (الوجهة). <b>ir en</b> + وسيلة نقل. استثناء: <b>ir a pie</b> (مشيًا).",
        table: [
          ["الضمير", "ir"],
          ["yo", "voy"], ["tú", "vas"], ["él/ella/usted", "va"],
          ["nosotros/as", "vamos"], ["vosotros/as", "vais"], ["ellos/ellas/ustedes", "van"]
        ],
        examples: [
          ["Voy al trabajo en metro.", "أذهب إلى العمل بالمترو."],
          ["Vamos a la playa en coche.", "نذهب إلى الشاطئ بالسيارة."],
          ["Mi hermano va a la escuela a pie.", "أخي يذهب إلى المدرسة مشيًا."]
        ]
      },
      {
        title: "necesitar · querer · preferir",
        text: "تأتي بعدها كلمة اسم أو مصدر (infinitivo). <b>querer</b> و<b>preferir</b> شاذّان: e → ie.",
        table: [
          ["الضمير", "necesitar", "querer", "preferir"],
          ["yo", "necesito", "quiero", "prefiero"], ["tú", "necesitas", "quieres", "prefieres"], ["él/ella/usted", "necesita", "quiere", "prefiere"],
          ["nosotros/as", "necesitamos", "queremos", "preferimos"], ["vosotros/as", "necesitáis", "queréis", "preferís"], ["ellos/ellas/ustedes", "necesitan", "quieren", "prefieren"]
        ],
        examples: [["Quiero un billete para Málaga.", "أريد تذكرة إلى مالقة."], ["Prefiero ir en tren.", "أفضّل الذهاب بالقطار."]]
      },
      {
        title: "في المحطة",
        examples: [
          ["¿Cuánto cuesta un billete de metro?", "كم سعر تذكرة المترو؟"],
          ["Cuesta dos euros.", "سعرها يوروان."],
          ["¿Cómo voy a la Plaza Mayor?", "كيف أذهب إلى الساحة الكبرى؟"],
          ["Sigue todo recto y gira a la derecha.", "استمر مباشرة ثم انعطف يمينًا."],
          ["Muchas gracias. — De nada.", "شكرًا جزيلًا. — عفوًا."]
        ]
      },
      {
        title: "porque و ¿por qué?",
        text: "<b>¿Por qué?</b> (لماذا؟) للسؤال، و<b>porque</b> (لأن) للإجابة. <b>¿Por qué vas en metro? — Porque es rápido.</b>"
      }
    ],
    vocab: [
      ["el coche", "السيارة"], ["el autobús", "الحافلة"], ["el metro", "المترو"], ["el tren", "القطار"],
      ["el avión", "الطائرة"], ["la bicicleta", "الدراجة"], ["el taxi", "التاكسي"], ["el barco", "السفينة"],
      ["a pie", "مشيًا"], ["el billete", "التذكرة"], ["la estación", "المحطة"], ["el aeropuerto", "المطار"],
      ["la parada", "موقف الحافلات"], ["a la derecha", "إلى اليمين"], ["a la izquierda", "إلى اليسار"],
      ["todo recto", "مباشرة إلى الأمام"], ["el viaje", "الرحلة"], ["rápido", "سريع"], ["barato", "رخيص"], ["caro", "غالٍ"]
    ],
    quiz: [
      { type: "mc", q: "Yo ___ a la universidad.", options: ["va", "voy", "vamos"], a: 1 },
      { type: "mc", q: "Vamos al centro ___ autobús.", options: ["a", "en", "de"], a: 1 },
      { type: "mc", q: "Voy al trabajo ___ pie.", options: ["a", "en", "con"], a: 0 },
      { type: "mc", q: "Ellos ___ viajar en avión. (preferir)", options: ["prefieren", "preferen", "prefieres"], a: 0 },
      { type: "mc", q: "«¿Cuánto cuesta?» تعني:", options: ["أين؟", "كم السعر؟", "متى؟"], a: 1 },
      { type: "mc", q: "___ vas en metro? — Porque es rápido.", options: ["¿Porque", "¿Por qué", "¿Qué"], a: 1 },
      { type: "write", q: "Yo ___ un billete. (querer)", a: ["quiero"] },
      { type: "write", q: "Nosotros ___ un taxi. (necesitar)", a: ["necesitamos"] },
      { type: "write", q: "اكتب بالإسبانية: «القطار» (مع أداة التعريف)", a: ["el tren"] }
    ]
  },

  {
    id: 6, icon: "fa-clock", es: "¡Hoy es mi día!", ar: "اليوم يومي!",
    goals: ["الروتين اليومي", "الأفعال الانعكاسية", "الساعة والمواعيد", "الشذوذ e→ie و o→ue", "التكرار: siempre, nunca...", "أيام الأسبوع"],
    lessons: [
      {
        title: "الأفعال الانعكاسية",
        text: "أفعال تنتهي بـ <b>-se</b> ويسبقها ضمير: me, te, se, nos, os, se.",
        table: [
          ["الضمير", "levantarse", "ducharse"],
          ["yo", "me levanto", "me ducho"], ["tú", "te levantas", "te duchas"], ["él/ella/usted", "se levanta", "se ducha"],
          ["nosotros/as", "nos levantamos", "nos duchamos"], ["vosotros/as", "os levantáis", "os ducháis"], ["ellos/ellas/ustedes", "se levantan", "se duchan"]
        ]
      },
      {
        title: "أفعال شاذة في المضارع",
        text: "يتغير حرف العلة في الجذر في كل الضمائر ما عدا nosotros و vosotros.",
        table: [
          ["e → ie (empezar)", "o → ue (dormir)", "yo شاذة"],
          ["empiezo", "duermo", "hago (hacer)"], ["empiezas", "duermes", "salgo (salir)"], ["empieza", "duerme", "pongo (poner)"],
          ["empezamos", "dormimos", "vengo (venir)"], ["empezáis", "dormís", "conozco (conocer)"], ["empiezan", "duermen", "sé (saber)"]
        ]
      },
      {
        title: "الساعة",
        examples: [
          ["¿Qué hora es?", "كم الساعة؟"],
          ["Es la una.", "إنها الواحدة."],
          ["Son las dos y cuarto.", "الثانية والربع."],
          ["Son las tres y media.", "الثالثة والنصف."],
          ["Son las cinco menos cuarto.", "الخامسة إلا ربعًا."],
          ["¿A qué hora te levantas? — A las siete.", "متى تستيقظ؟ — في السابعة."],
          ["por la mañana / por la tarde / por la noche", "صباحًا / بعد الظهر / ليلًا"]
        ]
      },
      {
        title: "التكرار",
        table: [
          ["إسباني", "المعنى"],
          ["siempre", "دائمًا"], ["normalmente", "عادةً"], ["a menudo", "غالبًا"], ["a veces", "أحيانًا"],
          ["casi nunca", "نادرًا"], ["nunca", "أبدًا"], ["todos los días", "كل يوم"], ["una vez a la semana", "مرة في الأسبوع"]
        ]
      }
    ],
    vocab: [
      ["levantarse", "يستيقظ / ينهض"], ["ducharse", "يستحم"], ["desayunar", "يفطر"], ["comer", "يأكل / يتغدى"],
      ["cenar", "يتعشى"], ["acostarse", "يذهب للنوم"], ["dormir", "ينام"], ["trabajar", "يعمل"], ["estudiar", "يدرس"],
      ["el lunes", "الإثنين"], ["el martes", "الثلاثاء"], ["el miércoles", "الأربعاء"], ["el jueves", "الخميس"],
      ["el viernes", "الجمعة"], ["el sábado", "السبت"], ["el domingo", "الأحد"], ["la mañana", "الصباح"],
      ["la tarde", "بعد الظهر"], ["la noche", "الليل"], ["siempre", "دائمًا"], ["nunca", "أبدًا"]
    ],
    quiz: [
      { type: "mc", q: "Yo ___ a las siete.", options: ["me levanto", "se levanta", "te levantas"], a: 0 },
      { type: "mc", q: "La clase ___ a las nueve. (empezar)", options: ["empeza", "empieza", "empiezan"], a: 1 },
      { type: "mc", q: "Nosotros ___ ocho horas. (dormir)", options: ["duermemos", "dormimos", "duermen"], a: 1 },
      { type: "mc", q: "2:30 =", options: ["Son las dos y cuarto", "Son las dos y media", "Son las tres menos media"], a: 1 },
      { type: "mc", q: "1:00 =", options: ["Es la una", "Son la una", "Es las una"], a: 0 },
      { type: "mc", q: "«a veces» تعني:", options: ["دائمًا", "أحيانًا", "أبدًا"], a: 1 },
      { type: "write", q: "Yo ___ los deberes. (hacer)", a: ["hago"] },
      { type: "write", q: "Ella ___ ocho horas. (dormir)", a: ["duerme"] },
      { type: "write", q: "اليوم الذي بعد الإثنين:", a: ["martes", "el martes"] }
    ]
  },

  {
    id: 7, icon: "fa-utensils", es: "¿A cenar o al cine?", ar: "إلى العشاء أم السينما؟",
    goals: ["التعبير عن الإعجاب gustar و encantar", "الموافقة: también / tampoco", "الطعام والوجبات", "أجزاء الجسم", "التعبير عن الألم doler"],
    lessons: [
      {
        title: "gustar و encantar",
        text: "الفعل يتوافق مع الشيء المحبوب: <b>gusta</b> + مفرد أو مصدر، <b>gustan</b> + جمع. يسبقه ضمير المفعول غير المباشر.",
        table: [
          ["(a mí) me", "gusta / gustan"], ["(a ti) te", "gusta / gustan"], ["(a él/ella/usted) le", "gusta / gustan"],
          ["(a nosotros/as) nos", "gusta / gustan"], ["(a vosotros/as) os", "gusta / gustan"], ["(a ellos/ellas/ustedes) les", "gusta / gustan"]
        ],
        examples: [
          ["Me gusta el chocolate.", "أحب الشوكولاتة."],
          ["Me gustan las frutas.", "أحب الفواكه."],
          ["Nos encanta ir al cine.", "نعشق الذهاب إلى السينما."],
          ["No me gusta nada el café.", "لا أحب القهوة إطلاقًا."]
        ]
      },
      {
        title: "también و tampoco",
        table: [
          ["أنا قلت", "توافق", "تخالف"],
          ["Me gusta el té.", "A mí también.", "A mí no."],
          ["No me gusta el té.", "A mí tampoco.", "A mí sí."]
        ]
      },
      {
        title: "doler — الألم",
        text: "يعمل مثل gustar: <b>me duele</b> + مفرد، <b>me duelen</b> + جمع. أو <b>tener dolor de</b> + عضو.",
        examples: [
          ["Me duele la cabeza.", "رأسي يؤلمني."],
          ["Me duelen los pies.", "قدماي تؤلمانني."],
          ["Tengo dolor de estómago.", "لدي ألم في المعدة."]
        ]
      },
      {
        title: "الحمية المتوسطية",
        text: "يشتهر النظام الغذائي الإسباني بزيت الزيتون والخضار والسمك والفواكه. الوجبات الرئيسية: <b>el desayuno</b> (الفطور)، <b>la comida</b> (الغداء، حوالي 14:00)، <b>la cena</b> (العشاء، حوالي 21:00)."
      }
    ],
    vocab: [
      ["el pan", "الخبز"], ["la leche", "الحليب"], ["el agua", "الماء"], ["el café", "القهوة"], ["el té", "الشاي"],
      ["la fruta", "الفاكهة"], ["la verdura", "الخضار"], ["la carne", "اللحم"], ["el pescado", "السمك"], ["el pollo", "الدجاج"],
      ["el arroz", "الأرز"], ["el huevo", "البيضة"], ["el queso", "الجبن"], ["la cabeza", "الرأس"], ["la mano", "اليد"],
      ["el pie", "القدم"], ["el brazo", "الذراع"], ["la pierna", "الساق"], ["el estómago", "المعدة"], ["los dientes", "الأسنان"], ["el cine", "السينما"]
    ],
    quiz: [
      { type: "mc", q: "Me ___ las películas de acción.", options: ["gusta", "gustan", "gusto"], a: 1 },
      { type: "mc", q: "A mi madre ___ gusta cocinar.", options: ["me", "le", "les"], a: 1 },
      { type: "mc", q: "— No me gusta el pescado. — A mí ___.", options: ["también", "tampoco", "sí también"], a: 1 },
      { type: "mc", q: "— Me encanta el cine. — A mí ___.", options: ["también", "tampoco", "nada"], a: 0 },
      { type: "mc", q: "Me ___ los ojos.", options: ["duele", "duelen", "dolor"], a: 1 },
      { type: "mc", q: "A nosotros ___ encanta el fútbol.", options: ["nos", "os", "les"], a: 0 },
      { type: "write", q: "اكتب بالإسبانية: «الماء» (مع أداة التعريف)", a: ["el agua"] },
      { type: "write", q: "Tengo dolor de ___. (الرأس)", a: ["cabeza"] },
      { type: "write", q: "¿Te ___ el chocolate? (gustar)", a: ["gusta"] }
    ]
  },

  {
    id: 8, icon: "fa-bowl-food", es: "Nos vamos de tapas", ar: "لنذهب لتناول التاباس",
    goals: ["الاقتراح والقبول والرفض", "تحديد موعد: quedar", "estar + gerundio", "ir a + infinitivo للخطط", "الطلب في المقهى"],
    lessons: [
      {
        title: "estar + gerundio — ما يحدث الآن",
        text: "<b>-ar → -ando</b>، <b>-er / -ir → -iendo</b>. شواذ: leer → leyendo، dormir → durmiendo، decir → diciendo.",
        examples: [
          ["Estoy comiendo.", "أنا آكل الآن."],
          ["¿Qué estás haciendo?", "ماذا تفعل الآن؟"],
          ["Están hablando por teléfono.", "يتحدثون على الهاتف."]
        ]
      },
      {
        title: "ir a + infinitivo — الخطط",
        examples: [
          ["Esta noche voy a cenar con mis amigos.", "الليلة سأتعشى مع أصدقائي."],
          ["Mañana vamos a ver una película.", "غدًا سنشاهد فيلمًا."],
          ["¿Qué vas a hacer el fin de semana?", "ماذا ستفعل في عطلة نهاية الأسبوع؟"]
        ]
      },
      {
        title: "الاقتراح وتحديد الموعد",
        examples: [
          ["¿Quedamos esta tarde?", "هل نلتقي بعد الظهر؟"],
          ["¿Por qué no vamos de tapas?", "لماذا لا نذهب لتناول التاباس؟"],
          ["Podemos ir al cine.", "يمكننا الذهاب إلى السينما."],
          ["¡Vale! / ¡Buena idea!", "حسنًا! / فكرة جيدة!"],
          ["Lo siento, no puedo. Tengo que trabajar.", "آسف، لا أستطيع. يجب أن أعمل."],
          ["¿A qué hora quedamos? — A las ocho.", "في أي ساعة نلتقي؟ — في الثامنة."]
        ]
      },
      {
        title: "في البار",
        examples: [
          ["¿Qué vas a tomar?", "ماذا ستشرب / تأكل؟"],
          ["Para mí, un zumo de naranja, por favor.", "لي عصير برتقال من فضلك."],
          ["Una ración de patatas bravas.", "طبق من البطاطا الحارة."],
          ["La cuenta, por favor.", "الحساب من فضلك."]
        ]
      }
    ],
    vocab: [
      ["las tapas", "المقبلات الإسبانية"], ["la tortilla", "عجة البيض بالبطاطا"], ["las aceitunas", "الزيتون"],
      ["el bocadillo", "الساندويتش"], ["el zumo", "العصير"], ["el refresco", "المشروب الغازي"], ["la ración", "الطبق / الحصة"],
      ["la cuenta", "الحساب"], ["el camarero", "النادل"], ["quedar", "يتواعد / يلتقي"], ["el plan", "الخطة"],
      ["vale", "حسنًا"], ["lo siento", "آسف"], ["esta noche", "الليلة"], ["mañana", "غدًا"], ["el fin de semana", "عطلة نهاية الأسبوع"],
      ["poder", "يستطيع"], ["tener que", "يجب أن"]
    ],
    quiz: [
      { type: "mc", q: "Ahora estoy ___ un libro. (leer)", options: ["leyendo", "leiendo", "leendo"], a: 0 },
      { type: "mc", q: "¿Qué ___ haciendo? (tú)", options: ["estás", "eres", "vas"], a: 0 },
      { type: "mc", q: "Mañana ___ a viajar. (nosotros)", options: ["vamos", "estamos", "somos"], a: 0 },
      { type: "mc", q: "للرفض بلطف:", options: ["¡Vale!", "Lo siento, no puedo.", "¡Buena idea!"], a: 1 },
      { type: "mc", q: "gerundio «dormir»:", options: ["dormiendo", "durmiendo", "dormando"], a: 1 },
      { type: "mc", q: "«La cuenta, por favor» تعني:", options: ["القائمة من فضلك", "الحساب من فضلك", "الماء من فضلك"], a: 1 },
      { type: "write", q: "gerundio «hablar»", a: ["hablando"] },
      { type: "write", q: "gerundio «comer»", a: ["comiendo"] },
      { type: "write", q: "Esta noche yo ___ a cenar fuera. (ir)", a: ["voy"] }
    ]
  },

  {
    id: 9, icon: "fa-plane", es: "Viaja con nosotros", ar: "سافر معنا",
    goals: ["الطقس", "الماضي البسيط pretérito indefinido", "أفعال شاذة: ser, ir, estar, tener, hacer", "مؤشرات الزمن الماضي", "الشهور والفصول"],
    lessons: [
      {
        title: "الماضي البسيط — الأفعال المنتظمة",
        text: "للأحداث المنتهية في الماضي. لاحظ أن <b>-er</b> و<b>-ir</b> لهما نفس النهايات.",
        table: [
          ["الضمير", "viajar", "comer", "vivir"],
          ["yo", "viajé", "comí", "viví"], ["tú", "viajaste", "comiste", "viviste"], ["él/ella/usted", "viajó", "comió", "vivió"],
          ["nosotros/as", "viajamos", "comimos", "vivimos"], ["vosotros/as", "viajasteis", "comisteis", "vivisteis"], ["ellos/ellas/ustedes", "viajaron", "comieron", "vivieron"]
        ]
      },
      {
        title: "أفعال شاذة",
        text: "<b>ser</b> و <b>ir</b> لهما نفس التصريف في الماضي، ويُفهم المعنى من السياق.",
        table: [
          ["الضمير", "ser / ir", "estar", "tener", "hacer"],
          ["yo", "fui", "estuve", "tuve", "hice"], ["tú", "fuiste", "estuviste", "tuviste", "hiciste"], ["él/ella/usted", "fue", "estuvo", "tuvo", "hizo"],
          ["nosotros/as", "fuimos", "estuvimos", "tuvimos", "hicimos"], ["vosotros/as", "fuisteis", "estuvisteis", "tuvisteis", "hicisteis"], ["ellos/ellas/ustedes", "fueron", "estuvieron", "tuvieron", "hicieron"]
        ]
      },
      {
        title: "مؤشرات الزمن",
        examples: [
          ["ayer / anoche / anteayer", "أمس / ليلة أمس / أول أمس"],
          ["el otro día", "في ذلك اليوم"],
          ["la semana pasada / el mes pasado / el año pasado", "الأسبوع الماضي / الشهر الماضي / السنة الماضية"],
          ["El verano pasado fui a Granada.", "في الصيف الماضي ذهبت إلى غرناطة."]
        ]
      },
      {
        title: "الطقس",
        examples: [
          ["¿Qué tiempo hace?", "كيف الطقس؟"],
          ["Hace calor / frío / sol / viento.", "الجو حار / بارد / مشمس / عاصف."],
          ["Hace buen tiempo / mal tiempo.", "الطقس جيد / سيئ."],
          ["Llueve. / Nieva.", "تمطر. / تثلج."],
          ["Está nublado.", "الجو غائم."]
        ]
      }
    ],
    vocab: [
      ["enero", "يناير"], ["febrero", "فبراير"], ["marzo", "مارس"], ["abril", "أبريل"], ["mayo", "مايو"], ["junio", "يونيو"],
      ["julio", "يوليو"], ["agosto", "أغسطس"], ["septiembre", "سبتمبر"], ["octubre", "أكتوبر"], ["noviembre", "نوفمبر"], ["diciembre", "ديسمبر"],
      ["la primavera", "الربيع"], ["el verano", "الصيف"], ["el otoño", "الخريف"], ["el invierno", "الشتاء"],
      ["la playa", "الشاطئ"], ["la montaña", "الجبل"], ["el río", "النهر"], ["el mar", "البحر"], ["la isla", "الجزيرة"], ["el hotel", "الفندق"]
    ],
    quiz: [
      { type: "mc", q: "Ayer yo ___ paella. (comer)", options: ["comí", "comió", "como"], a: 0 },
      { type: "mc", q: "El año pasado nosotros ___ a México. (ir)", options: ["fuimos", "fueron", "vamos"], a: 0 },
      { type: "mc", q: "Ella ___ en Sevilla dos días. (estar)", options: ["estuvo", "estuve", "estaba"], a: 0 },
      { type: "mc", q: "En invierno ___ frío.", options: ["hace", "está", "es"], a: 0 },
      { type: "mc", q: "¿Qué ___ el fin de semana? (tú, hacer)", options: ["hiciste", "hizo", "haces"], a: 0 },
      { type: "mc", q: "«anoche» تعني:", options: ["أمس صباحًا", "ليلة أمس", "غدًا"], a: 1 },
      { type: "write", q: "Ellos ___ por Andalucía. (viajar, pasado)", a: ["viajaron"] },
      { type: "write", q: "Yo ___ mucho trabajo ayer. (tener)", a: ["tuve"] },
      { type: "write", q: "الفصل الأحرّ في السنة:", a: ["el verano", "verano"] }
    ]
  },

  {
    id: 10, icon: "fa-champagne-glasses", es: "¡Mañana es fiesta!", ar: "غدًا عطلة!",
    goals: ["إبداء الرأي", "الموافقة والاعتراض", "صيغة الأمر", "النفي", "الأعياد والعطلات"],
    lessons: [
      {
        title: "إبداء الرأي",
        examples: [
          ["Creo que es una buena idea.", "أعتقد أنها فكرة جيدة."],
          ["Pienso que el español es fácil.", "أظن أن الإسبانية سهلة."],
          ["Para mí, la Navidad es la mejor fiesta.", "بالنسبة لي، عيد الميلاد هو أفضل عيد."],
          ["¿Qué te parece? — Me parece genial.", "ما رأيك؟ — يبدو لي رائعًا."]
        ]
      },
      {
        title: "الموافقة والاعتراض",
        examples: [
          ["Estoy de acuerdo contigo.", "أتفق معك."],
          ["No estoy de acuerdo con eso.", "لا أتفق مع ذلك."],
          ["Tienes razón.", "معك حق."],
          ["¡Claro! / ¡Por supuesto!", "طبعًا! / بالتأكيد!"]
        ]
      },
      {
        title: "صيغة الأمر (tú / usted)",
        text: "<b>tú</b>: نفس صيغة él في المضارع (habla, come, escribe). <b>usted</b>: نعكس حرف العلة (hable, coma, escriba).",
        table: [
          ["المصدر", "tú", "usted", "vosotros", "ustedes"],
          ["hablar", "habla", "hable", "hablad", "hablen"], ["comer", "come", "coma", "comed", "coman"], ["escribir", "escribe", "escriba", "escribid", "escriban"],
          ["hacer", "haz", "haga", "haced", "hagan"], ["poner", "pon", "ponga", "poned", "pongan"], ["ir", "ve", "vaya", "id", "vayan"],
          ["venir", "ven", "venga", "venid", "vengan"], ["decir", "di", "diga", "decid", "digan"]
        ]
      },
      {
        title: "النفي",
        examples: [
          ["No hablo alemán.", "لا أتكلم الألمانية."],
          ["No tengo nada.", "ليس لدي شيء."],
          ["No viene nadie.", "لا يأتي أحد."],
          ["Nunca como carne. = No como carne nunca.", "لا آكل اللحم أبدًا."]
        ]
      },
      {
        title: "أعياد في إسبانيا",
        text: "<b>la Navidad</b> (عيد الميلاد)، <b>Nochevieja</b> (ليلة رأس السنة، حيث تؤكل 12 حبة عنب)، <b>los Reyes Magos</b> (6 يناير)، <b>la Semana Santa</b>، و<b>San Fermín</b> في بنبلونة."
      }
    ],
    vocab: [
      ["la fiesta", "الحفلة / العيد"], ["las vacaciones", "العطلة"], ["la Navidad", "عيد الميلاد"], ["el cumpleaños", "عيد الميلاد الشخصي"],
      ["el regalo", "الهدية"], ["celebrar", "يحتفل"], ["la opinión", "الرأي"], ["creo que", "أعتقد أن"], ["de acuerdo", "موافق"],
      ["tener razón", "معه حق"], ["nada", "لا شيء"], ["nadie", "لا أحد"], ["nunca", "أبدًا"], ["el festivo", "يوم العطلة الرسمية"],
      ["la tradición", "التقليد"], ["genial", "رائع"]
    ],
    quiz: [
      { type: "mc", q: "___ que el examen es fácil.", options: ["Creo", "Parece", "Acuerdo"], a: 0 },
      { type: "mc", q: "¿Qué te ___ la idea?", options: ["parece", "crees", "piensas"], a: 0 },
      { type: "mc", q: "أمر (tú) من «hablar»:", options: ["habla", "hable", "hablas"], a: 0 },
      { type: "mc", q: "أمر (usted) من «escribir»:", options: ["escribe", "escriba", "escribes"], a: 1 },
      { type: "mc", q: "أمر (tú) من «hacer»:", options: ["hace", "haz", "haga"], a: 1 },
      { type: "mc", q: "No hay ___ en la calle.", options: ["nadie", "nada", "nunca"], a: 0 },
      { type: "write", q: "أمر (tú) من «venir»:", a: ["ven"] },
      { type: "write", q: "أكمل: Estoy de ___ contigo.", a: ["acuerdo"] },
      { type: "write", q: "أمر (tú) من «comer»:", a: ["come"] }
    ]
  }
];
