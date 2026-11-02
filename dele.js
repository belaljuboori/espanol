// محتوى تحضير DELE A1 — نصوص وتمارين أصلية بأسلوب الاختبار الرسمي
// بنية الاختبار الحقيقي: قراءة 45د · استماع 20د · كتابة 25د · محادثة 15د (+15 تحضير)
// كل جزء من 25 نقطة. النجاح: 60/100 مع 30/50 على الأقل في كل مجموعة.

const DELE_INFO = [
  { key: "reading", icon: "fa-book-open", ar: "فهم المقروء", es: "Comprensión de lectura", min: 45, group: 1 },
  { key: "listening", icon: "fa-headphones", ar: "فهم المسموع", es: "Comprensión auditiva", min: 20, group: 2 },
  { key: "writing", icon: "fa-pen-nib", ar: "التعبير الكتابي", es: "Expresión e interacción escritas", min: 25, group: 1 },
  { key: "oral", icon: "fa-microphone", ar: "التعبير الشفهي", es: "Expresión e interacción orales", min: 15, group: 2 }
];

// ===================== القراءة (تدريب) =====================
const DELE_READING = [
  {
    title: "Un correo de Sara", ar: "اقرأ رسالة سارة إلى صديقتها مارتا وأجب عن الأسئلة.", kind: "text",
    text: `¡Hola, Marta!

¿Qué tal? Yo estoy muy bien en Valencia. Vivo en un piso pequeño en el centro, cerca de la playa. Tengo dos compañeros de piso: Luca, un chico italiano, y Emma, una chica alemana. Son muy simpáticos.

Por las mañanas estudio español en una academia y por las tardes trabajo en una cafetería. Los fines de semana voy a la playa o visito museos con mis amigos.

¿Por qué no vienes a Valencia en agosto? Mi piso tiene una habitación libre.

Un beso,
Sara`,
    questions: [
      { q: "¿Dónde vive Sara?", options: ["En un piso grande.", "En un piso en el centro.", "En una casa en la playa."], a: 1 },
      { q: "Emma es...", options: ["italiana.", "española.", "alemana."], a: 2 },
      { q: "Por las tardes Sara...", options: ["estudia.", "trabaja.", "va a la playa."], a: 1 },
      { q: "Los fines de semana Sara...", options: ["visita museos.", "trabaja en una cafetería.", "estudia español."], a: 0 },
      { q: "Sara invita a Marta a...", options: ["su piso en agosto.", "un museo.", "la academia."], a: 0 }
    ]
  },
  {
    title: "Carteles y avisos", ar: "اقرأ اللافتات واختر المعنى الصحيح لكل واحدة.", kind: "notices",
    notices: [
      "FARMACIA CENTRAL\nAbierto 24 horas",
      "PROHIBIDO FUMAR",
      "BIBLIOTECA\nPor favor, silencio",
      "REBAJAS\n50 % en toda la ropa",
      "Cerrado por vacaciones\ndel 1 al 15 de agosto"
    ],
    questions: [
      { q: "Cartel 1: La farmacia...", options: ["cierra por la noche.", "abre a todas horas.", "abre solo por la mañana."], a: 1 },
      { q: "Cartel 2:", options: ["No se puede fumar aquí.", "Aquí se puede fumar.", "Aquí se venden cigarros."], a: 0 },
      { q: "Cartel 3: En la biblioteca...", options: ["no se debe hacer ruido.", "hay música.", "está todo cerrado."], a: 0 },
      { q: "Cartel 4: La ropa...", options: ["cuesta la mitad.", "es nueva.", "no se vende."], a: 0 },
      { q: "Cartel 5: La tienda...", options: ["abre el 2 de agosto.", "no abre la primera mitad de agosto.", "cierra en septiembre."], a: 1 }
    ]
  },
  {
    title: "Anuncios", ar: "اقرأ الإعلانات واختر الإعلان المناسب لكل شخص.", kind: "ads",
    ads: [
      ["A", "Alquilo piso en el centro. Tres dormitorios, dos baños, cocina grande. 900 € al mes. Tel. 612 345 678."],
      ["B", "Se busca profesor de inglés para clases particulares los sábados por la mañana. Llamar a Carmen: 654 987 321."],
      ["C", "Vendo bicicleta azul, casi nueva. 80 €. Escribir a pedro@correo.es"],
      ["D", "Clases de cocina española: tortilla, paella y gazpacho. Martes y jueves de 18:00 a 20:00. Escuela La Olla."],
      ["E", "Se necesita camarero con experiencia para restaurante en la playa. Julio y agosto."]
    ],
    questions: [
      { q: "Quieres aprender a hacer paella.", options: ["A", "B", "C", "D", "E"], a: 3 },
      { q: "Necesitas una casa para tu familia.", options: ["A", "B", "C", "D", "E"], a: 0 },
      { q: "Quieres trabajar en verano.", options: ["A", "B", "C", "D", "E"], a: 4 },
      { q: "Quieres ir a la universidad sin coche y sin gastar mucho.", options: ["A", "B", "C", "D", "E"], a: 2 },
      { q: "Hablas inglés muy bien y quieres ganar dinero el fin de semana.", options: ["A", "B", "C", "D", "E"], a: 1 }
    ]
  },
  {
    title: "Un día en la vida de Javier", ar: "اقرأ النص عن يوم خافيير وأجب عن الأسئلة.", kind: "text",
    text: `Javier es médico y trabaja en un hospital de Sevilla. Se levanta todos los días a las seis y media, se ducha y desayuna un café con tostadas. Va al hospital en bicicleta porque está cerca de su casa. Empieza a trabajar a las ocho.

A las dos come con sus compañeros en la cafetería del hospital. Por la tarde, normalmente, va al gimnasio o pasea con su perro, Toby. Cena a las nueve con su mujer, Lucía, y se acuesta a las once.

Los domingos no trabaja: va al campo con su familia.`,
    questions: [
      { q: "Javier se levanta a las...", options: ["6:30.", "7:30.", "8:00."], a: 0 },
      { q: "Va al trabajo...", options: ["en coche.", "en bicicleta.", "a pie."], a: 1 },
      { q: "Javier come...", options: ["en casa.", "en la cafetería del hospital.", "en un restaurante."], a: 1 },
      { q: "Toby es...", options: ["su hijo.", "su compañero.", "su perro."], a: 2 },
      { q: "Los domingos Javier...", options: ["trabaja en el hospital.", "va al campo.", "va al gimnasio."], a: 1 }
    ]
  },
  {
    title: "Horario del polideportivo", ar: "اقرأ معلومات المركز الرياضي وأجب عن الأسئلة.", kind: "text",
    text: `POLIDEPORTIVO MUNICIPAL LAS ROZAS

Natación: lunes, miércoles y viernes, de 9:00 a 13:00 y de 17:00 a 21:00.
Yoga: martes y jueves, de 18:00 a 19:30.
Fútbol para niños: sábados, de 10:00 a 12:00.

Precio: adultos, 30 € al mes; niños y estudiantes, 15 € al mes.
El polideportivo está cerrado los domingos y festivos.`,
    questions: [
      { q: "¿Qué día puedes hacer yoga?", options: ["El lunes.", "El jueves.", "El sábado."], a: 1 },
      { q: "Los niños juegan al fútbol...", options: ["los sábados por la mañana.", "los domingos.", "los viernes por la tarde."], a: 0 },
      { q: "Un estudiante paga...", options: ["30 € al mes.", "15 € al mes.", "nada."], a: 1 },
      { q: "El domingo el polideportivo...", options: ["abre por la mañana.", "está cerrado.", "abre solo para natación."], a: 1 },
      { q: "Puedes nadar el viernes a las...", options: ["15:00.", "18:00.", "22:00."], a: 1 }
    ]
  }
];

// ===================== الاستماع (تدريب) =====================
// lines: [المتحدث, النص] — كل متحدث بصوت مختلف
const DELE_LISTENING = [
  { lines: [["A", "Perdone, ¿a qué hora sale el tren para Madrid?"], ["B", "Sale a las diez y cuarto, del andén tres."]], q: "¿A qué hora sale el tren?", options: ["10:00", "10:15", "10:45"], a: 1 },
  { lines: [["A", "Hola, ¿qué va a tomar?"], ["B", "Para mí, un café con leche y una tostada, por favor."]], q: "¿Qué pide?", options: ["Café con leche y una tostada.", "Té y un bocadillo.", "Zumo y una tostada."], a: 0 },
  { lines: [["A", "Hola, me llamo Andrés, tengo treinta y dos años y soy de Colombia. Soy ingeniero."]], q: "¿Cuántos años tiene Andrés?", options: ["22", "32", "42"], a: 1 },
  { lines: [["A", "Mi hermana es alta y morena, tiene el pelo largo y lleva gafas."]], q: "¿Cómo es su hermana?", options: ["Alta, morena y con gafas.", "Baja y rubia.", "Alta, con el pelo corto."], a: 0 },
  { lines: [["A", "Perdone, ¿cuánto cuestan estos zapatos?"], ["B", "Cuarenta y cinco euros."]], q: "¿Cuánto cuestan los zapatos?", options: ["35 €", "45 €", "55 €"], a: 1 },
  { lines: [["A", "Perdona, ¿dónde está el baño?"], ["B", "Al final del pasillo, a la derecha."]], q: "¿Dónde está el baño?", options: ["Al final del pasillo, a la derecha.", "Al final del pasillo, a la izquierda.", "Al lado de la cocina."], a: 0 },
  { lines: [["A", "Mañana va a hacer mucho calor en el sur, pero en el norte va a llover."]], q: "¿Qué tiempo va a hacer en el norte?", options: ["Va a llover.", "Va a hacer calor.", "Va a nevar."], a: 0 },
  { lines: [["A", "¿Quedamos el sábado para ir al cine?"], ["B", "El sábado no puedo, tengo que trabajar. ¿El domingo por la tarde?"], ["A", "¡Vale, perfecto!"]], q: "¿Cuándo van al cine?", options: ["El sábado.", "El domingo por la tarde.", "El domingo por la mañana."], a: 1 }
];

// ===================== الكتابة (تدريب) =====================
const DELE_WRITING = [
  {
    title: "Inscripción en una academia", type: "form",
    ar: "تريد التسجيل في معهد لتعلم الإسبانية. املأ الاستمارة.",
    fields: [
      ["Nombre", "Ahmed"], ["Apellidos", "Hassan Ali"], ["Nacionalidad", "iraquí"], ["Edad", "25 años"],
      ["Profesión", "Ingeniero"], ["Correo electrónico", "ahmed.hassan@correo.com"],
      ["¿Por qué estudias español?", "Estudio español porque quiero viajar a España y trabajar en una empresa internacional."],
      ["¿Qué días prefieres tener clase?", "Los lunes y los miércoles por la tarde."]
    ],
    checklist: ["ملأت كل الحقول", "كتبت الجنسية بصيغة الصفة (iraquí / egipcio...) وليس اسم البلد", "أجبت عن السؤالين الأخيرين بجملة كاملة فيها فعل", "استخدمت الحروف الكبيرة في الأسماء"]
  },
  {
    title: "Correo a un amigo nuevo", type: "text", words: [20, 30],
    ar: "صديقك الجديد الإسباني لا يعرفك جيدًا. اكتب له بريدًا (20–30 كلمة):",
    points: ["قدّم نفسك (الاسم، العمر، البلد)", "تكلم عن مدينتك", "تكلم عن عائلتك", "اذكر هواياتك"],
    model: `¡Hola!
Soy Ahmed, tengo 25 años y soy de Bagdad, una ciudad grande. Vivo con mis padres y dos hermanos. Me gusta leer y jugar al fútbol.
Un abrazo,
Ahmed`,
    checklist: ["بدأت بتحية (¡Hola...!) وانتهيت بوداع (Un abrazo / Un saludo)", "غطيت النقاط الأربع", "استخدمت tener للعمر (tengo 25 años)", "استخدمت me gusta + مصدر بشكل صحيح"]
  },
  {
    title: "Una postal de vacaciones", type: "text", words: [20, 30],
    ar: "أنت في عطلة. اكتب بطاقة بريدية لصديق (20–30 كلمة):",
    points: ["أين أنت؟", "كيف الطقس؟", "ماذا تفعل كل يوم؟", "ما الذي يعجبك هناك؟"],
    model: `Querida Laura:
Estoy en Málaga. Hace sol y mucho calor. Todos los días vamos a la playa y por la noche cenamos pescado. ¡Me encanta esta ciudad!
Besos,
Sara`,
    checklist: ["استخدمت estar للمكان (Estoy en...)", "استخدمت hace للطقس (hace sol / hace calor)", "غطيت النقاط الأربع", "أنهيت بوداع مناسب"]
  },
  {
    title: "Nota para tu compañero de piso", type: "text", words: [20, 30],
    ar: "صديقك في السكن دعاك إلى عشاء الليلة لكنك لا تستطيع الذهاب. اكتب له ملاحظة (20–30 كلمة):",
    points: ["اعتذر لأنك لا تستطيع الذهاب", "اشرح السبب", "اقترح يومًا آخر"],
    model: `Hola, Marcos:
Lo siento, pero esta noche no puedo ir a la cena. Tengo que trabajar hasta las once. ¿Por qué no cenamos juntos el viernes?
Hasta luego,
Ahmed`,
    checklist: ["استخدمت عبارة اعتذار (Lo siento...)", "شرحت السبب بـ tengo que + مصدر", "اقترحت موعدًا آخر بسؤال (¿Por qué no...? / ¿Quedamos...?)", "العدد بين 20 و 30 كلمة تقريبًا"]
  },
  {
    title: "Registro en un hotel", type: "form",
    ar: "وصلت إلى فندق في مدريد. املأ استمارة التسجيل.",
    fields: [
      ["Nombre y apellidos", "Layla Karim Saleh"], ["Fecha de llegada", "12 de julio"], ["Número de noches", "Tres noches"],
      ["Tipo de habitación (individual / doble)", "Doble"], ["Teléfono", "+964 770 123 4567"],
      ["Observaciones", "Quiero una habitación tranquila, con vistas a la calle. Llego tarde, a las once de la noche."]
    ],
    checklist: ["كتبت التاريخ بالطريقة الإسبانية (12 de julio)", "ملأت كل الحقول", "حقل الملاحظات فيه جملة كاملة واحدة على الأقل"]
  }
];

// ===================== المحادثة (تدريب) =====================
const DELE_ORAL = [
  {
    title: "Presentación personal", ar: "تقديم نفسك", tarea: "المهمة 1 — مدتها 1–2 دقيقة",
    guide: ["الاسم والعمر", "الجنسية والمدينة", "اللغات التي تتكلمها", "عملك أو دراستك", "عائلتك", "شخصيتك وهواياتك"],
    model: ["Hola, me llamo Ahmed y tengo veinticinco años.", "Soy iraquí, de Bagdad, pero ahora vivo en Madrid.", "Hablo árabe, inglés y un poco de español.", "Soy ingeniero y trabajo en una empresa de informática.", "Tengo una familia grande: mis padres, dos hermanos y una hermana.", "Soy una persona tranquila, trabajadora y bastante simpática.", "En mi tiempo libre me gusta leer y jugar al fútbol."],
    questions: [["¿Cómo te llamas?", "Me llamo Ahmed."], ["¿Cuántos años tienes?", "Tengo veinticinco años."], ["¿De dónde eres?", "Soy de Irak, de Bagdad."], ["¿Qué lenguas hablas?", "Hablo árabe, inglés y un poco de español."], ["¿A qué te dedicas?", "Soy ingeniero."], ["¿Cómo eres?", "Soy tranquilo y trabajador."]]
  },
  {
    title: "Mi familia", ar: "عائلتي", tarea: "المهمة 2 — موضوع لمدة 2–3 دقائق",
    guide: ["كم شخصًا في عائلتك؟", "صف والديك (العمل، الشخصية)", "إخوتك وأعمارهم", "ماذا تفعلون معًا؟"],
    model: ["Mi familia no es muy grande. Somos cinco: mi padre, mi madre, mi hermano, mi hermana y yo.", "Mi padre se llama Karim, tiene cincuenta y cinco años y es profesor.", "Mi madre se llama Layla, es muy alegre y trabaja en un hospital.", "Mi hermano mayor está casado y tiene un hijo pequeño.", "Mi hermana es estudiante, tiene diecinueve años y estudia Medicina.", "Los viernes comemos todos juntos en casa de mis padres."],
    questions: [["¿Tienes hermanos?", "Sí, tengo un hermano y una hermana."], ["¿Cómo es tu madre?", "Es muy alegre y simpática."], ["¿Estás casado?", "No, estoy soltero."], ["¿Qué hacéis juntos?", "Los viernes comemos juntos."]]
  },
  {
    title: "Mi casa y mi barrio", ar: "بيتي وحيّي", tarea: "المهمة 2 — موضوع لمدة 2–3 دقائق",
    guide: ["أين تسكن؟", "كم غرفة في بيتك؟", "صف غرفتك", "ماذا يوجد في حيّك؟", "هل يعجبك حيّك؟ لماذا؟"],
    model: ["Vivo en un piso en el centro de la ciudad.", "El piso tiene tres dormitorios, un salón grande, una cocina y dos baños.", "Mi habitación es pequeña pero muy luminosa: hay una cama, un armario y una mesa para estudiar.", "En mi barrio hay muchas tiendas, un parque y un supermercado.", "Me gusta mi barrio porque es tranquilo y está cerca de mi trabajo."],
    questions: [["¿Dónde vives?", "Vivo en un piso en el centro."], ["¿Cómo es tu casa?", "Es grande y luminosa."], ["¿Qué hay en tu barrio?", "Hay tiendas, un parque y un supermercado."], ["¿Te gusta tu barrio? ¿Por qué?", "Sí, porque es muy tranquilo."]]
  },
  {
    title: "Mi rutina diaria", ar: "روتيني اليومي", tarea: "المهمة 2 — موضوع لمدة 2–3 دقائق",
    guide: ["متى تستيقظ؟", "ماذا تفعل في الصباح؟", "كيف تذهب إلى العمل أو الدراسة؟", "ماذا تفعل بعد الظهر والمساء؟", "متى تنام؟"],
    model: ["Todos los días me levanto a las siete.", "Me ducho, me visto y desayuno té con pan.", "Voy al trabajo en autobús y empiezo a las ocho y media.", "Como a las dos con mis compañeros.", "Por la tarde vuelvo a casa, estudio español y a veces voy al gimnasio.", "Ceno a las nueve y me acuesto a las once y media."],
    questions: [["¿A qué hora te levantas?", "Me levanto a las siete."], ["¿Cómo vas al trabajo?", "Voy en autobús."], ["¿Qué haces por la tarde?", "Estudio español y a veces voy al gimnasio."], ["¿A qué hora te acuestas?", "Me acuesto a las once y media."]]
  },
  {
    title: "Mi tiempo libre", ar: "وقت فراغي", tarea: "المهمة 2 — موضوع لمدة 2–3 دقائق",
    guide: ["ماذا تفعل في وقت فراغك؟", "مع من؟", "متى وأين؟", "ما الذي لا تحبه؟"],
    model: ["En mi tiempo libre me gusta mucho hacer deporte.", "Juego al fútbol con mis amigos los sábados por la mañana.", "También me encanta leer novelas y ver películas.", "Los domingos normalmente paseo por el parque con mi familia.", "No me gusta nada ver la televisión."],
    questions: [["¿Qué haces en tu tiempo libre?", "Hago deporte y leo novelas."], ["¿Con quién juegas al fútbol?", "Con mis amigos."], ["¿Qué películas te gustan?", "Me gustan las películas de acción."], ["¿Qué vas a hacer este fin de semana?", "Voy a ir al cine con mis amigos."]]
  },
  {
    title: "La comida", ar: "الطعام وأذواقي", tarea: "المهمة 2 — موضوع لمدة 2–3 دقائق",
    guide: ["ماذا تفطر؟", "مواعيد وجباتك", "أكلتك المفضلة", "ما الذي لا تحبه؟", "هل تعرف الأكل الإسباني؟"],
    model: ["Me gusta mucho la comida de mi país, especialmente el arroz con carne.", "Para desayunar tomo té, pan, queso y huevos.", "Normalmente como a las dos y ceno a las nueve.", "Me encanta la fruta, sobre todo las naranjas y las uvas.", "No me gusta el pescado.", "De la comida española me gustan mucho la tortilla de patatas y el gazpacho."],
    questions: [["¿Qué desayunas?", "Tomo té, pan y queso."], ["¿Cuál es tu comida favorita?", "El arroz con carne."], ["¿Te gusta la comida española?", "Sí, me gusta mucho la tortilla."], ["¿Sabes cocinar?", "Sí, un poco."]]
  },
  {
    title: "Mis estudios o mi trabajo", ar: "دراستي أو عملي", tarea: "المهمة 2 — موضوع لمدة 2–3 دقائق",
    guide: ["ماذا تدرس أو أين تعمل؟", "مواعيدك", "المواد أو المهام التي تحبها", "زملاؤك", "لماذا تتعلم الإسبانية؟"],
    model: ["Soy estudiante de Ingeniería en la universidad.", "Las clases empiezan a las nueve y terminan a las tres.", "Mis asignaturas favoritas son Matemáticas e Informática.", "Mis compañeros son muy simpáticos y estudiamos juntos en la biblioteca.", "Estudio español porque quiero trabajar en España en el futuro."],
    questions: [["¿Trabajas o estudias?", "Estudio Ingeniería."], ["¿Qué asignatura te gusta más?", "Las Matemáticas."], ["¿Por qué estudias español?", "Porque quiero trabajar en España."], ["¿Cómo son tus compañeros?", "Son muy simpáticos."]]
  },
  {
    title: "Las vacaciones", ar: "العطلات", tarea: "المهمة 2 — موضوع لمدة 2–3 دقائق",
    guide: ["متى تكون عطلتك؟", "إلى أين تحب الذهاب؟", "عطلتك الماضية", "خططك للعطلة القادمة"],
    model: ["Normalmente tengo vacaciones en verano, en agosto.", "Me gusta ir a la playa con mi familia.", "El verano pasado fui a Turquía y visité Estambul.", "Visité museos, comí comida típica y compré muchos recuerdos.", "Este año quiero ir a España para practicar español."],
    questions: [["¿Cuándo tienes vacaciones?", "En agosto."], ["¿Adónde te gusta ir?", "Me gusta ir a la playa."], ["¿Adónde fuiste el verano pasado?", "Fui a Turquía."], ["¿Qué vas a hacer en tus próximas vacaciones?", "Voy a viajar a España."]]
  },
  {
    title: "En una tienda de ropa", ar: "موقف: في محل ملابس", tarea: "المهمة 4 — حوار في موقف يومي",
    guide: ["أنت تريد شراء تيشيرت", "اسأل عن اللون والمقاس", "اسأل عن السعر", "ادفع بالبطاقة"],
    model: ["— Buenos días, ¿puedo ayudarle?", "— Sí, busco una camiseta.", "— ¿De qué color la quiere?", "— Azul, por favor.", "— ¿Qué talla usa?", "— La talla M.", "— Son quince euros.", "— Perfecto, me la llevo. ¿Puedo pagar con tarjeta?"],
    questions: [["Buenos días, ¿puedo ayudarle?", "Sí, busco una camiseta."], ["¿De qué color la quiere?", "Azul, por favor."], ["¿Qué talla usa?", "La talla M."], ["Son quince euros.", "Perfecto, me la llevo. ¿Puedo pagar con tarjeta?"]]
  },
  {
    title: "En un restaurante", ar: "موقف: في مطعم", tarea: "المهمة 4 — حوار في موقف يومي",
    guide: ["اطلب قائمة اليوم", "اختر الطبق الأول والثاني", "اطلب مشروبًا", "اطلب الحساب"],
    model: ["— Hola, ¿qué va a tomar?", "— Para mí, el menú del día.", "— ¿Y de primero?", "— Una ensalada, por favor.", "— ¿Y de segundo?", "— Pollo con patatas.", "— ¿Y para beber?", "— Agua, por favor. Y la cuenta, por favor."],
    questions: [["Hola, ¿qué va a tomar?", "Para mí, el menú del día."], ["¿Y de primero?", "Una ensalada, por favor."], ["¿Y de segundo?", "Pollo con patatas."], ["¿Y para beber?", "Agua, por favor."]]
  }
];

// ===================== الاختبار التجريبي الكامل =====================
const DELE_EXAM = {
  reading: [
    {
      title: "Tarea 1 · Un correo", ar: "اقرأ رسالة بابلو وأجب عن الأسئلة.", kind: "text",
      text: `Hola, Laura:

Te escribo desde Barcelona. ¡Tengo un trabajo nuevo! Trabajo en una agencia de viajes en el centro de la ciudad. Mi horario es de lunes a viernes, de nueve a cinco. Mis compañeros son muy amables y mi jefa es argentina.

Vivo con mi primo Daniel en un apartamento cerca del mar. No tenemos coche, pero no es un problema: voy a trabajar en metro y tardo veinte minutos.

Los sábados juego al baloncesto con unos amigos y los domingos descanso en casa o paseo por la playa.

¿Cuándo vienes a visitarme?
Un abrazo,
Pablo`,
      questions: [
        { q: "Pablo trabaja en...", options: ["un hotel.", "una agencia de viajes.", "una escuela."], a: 1 },
        { q: "Pablo trabaja...", options: ["los fines de semana.", "de lunes a viernes.", "solo por las mañanas."], a: 1 },
        { q: "La jefa de Pablo es...", options: ["española.", "argentina.", "mexicana."], a: 1 },
        { q: "Pablo va al trabajo...", options: ["en coche.", "a pie.", "en metro."], a: 2 },
        { q: "Los sábados Pablo...", options: ["juega al baloncesto.", "pasea por la playa.", "trabaja."], a: 0 }
      ]
    },
    {
      title: "Tarea 2 · Carteles", ar: "اقرأ اللافتات واختر المعنى الصحيح.", kind: "notices",
      notices: [
        "MUSEO DE ARTE\nEntrada gratuita los domingos",
        "No se admiten perros",
        "Ascensor averiado.\nUsen la escalera",
        "SUPERMERCADO\nAbierto de lunes a sábado\nde 9:00 a 21:30",
        "SE BUSCA GATO BLANCO\nSe llama Nube\nLlamar al 600 112 233"
      ],
      questions: [
        { q: "Cartel 1: Los domingos el museo...", options: ["no cuesta dinero.", "está cerrado.", "cuesta 10 €."], a: 0 },
        { q: "Cartel 2:", options: ["Los perros no pueden entrar.", "Aquí se venden perros.", "Los perros entran gratis."], a: 0 },
        { q: "Cartel 3:", options: ["El ascensor no funciona.", "El ascensor es nuevo.", "La escalera está cerrada."], a: 0 },
        { q: "Cartel 4: El supermercado...", options: ["abre los domingos.", "cierra a las nueve y media de la noche.", "abre a las diez."], a: 1 },
        { q: "Cartel 5:", options: ["Alguien vende un gato.", "Alguien busca su gato.", "Es una tienda de animales."], a: 1 }
      ]
    },
    {
      title: "Tarea 3 · Cursos", ar: "اقرأ إعلانات الدورات واختر الدورة المناسبة لكل شخص. (هناك إعلان زائد)", kind: "ads",
      ads: [
        ["A", "Curso de fotografía: aprende a hacer fotos con tu móvil. Viernes de 17:00 a 19:00."],
        ["B", "Clases de natación para niños de 4 a 10 años. Sábados por la mañana."],
        ["C", "Curso intensivo de español para extranjeros: 4 horas al día, de lunes a viernes."],
        ["D", "Taller de cocina vegetariana. Miércoles por la tarde. Incluye cena."],
        ["E", "Yoga para mayores de 60 años. Martes y jueves de 10:00 a 11:00."],
        ["F", "Club de lectura: una novela al mes. Primer lunes de cada mes."]
      ],
      questions: [
        { q: "Tomás no come carne y quiere aprender a cocinar.", options: ["A", "B", "C", "D", "E", "F"], a: 3 },
        { q: "Ana tiene un hijo de seis años que quiere aprender a nadar.", options: ["A", "B", "C", "D", "E", "F"], a: 1 },
        { q: "Kenji es japonés y quiere aprender español muy rápido.", options: ["A", "B", "C", "D", "E", "F"], a: 2 },
        { q: "Rosa tiene 65 años y quiere hacer un deporte tranquilo.", options: ["A", "B", "C", "D", "E", "F"], a: 4 },
        { q: "A Miguel le encanta leer libros y hablar de ellos.", options: ["A", "B", "C", "D", "E", "F"], a: 5 }
      ]
    }
  ],
  listening: [
    { lines: [["A", "¿Cómo se llama usted?"], ["B", "Lucía Romero. Romero: erre, o, eme, e, erre, o."]], q: "¿Cuál es el apellido de Lucía?", options: ["Romero", "Moreno", "Rivero"], a: 0 },
    { lines: [["A", "Atención, señores pasajeros: el tren con destino a Valencia sale con veinte minutos de retraso, a las once y media."]], q: "¿A qué hora sale el tren?", options: ["11:10", "11:30", "11:50"], a: 1 },
    { lines: [["A", "¿Tienes hermanos?"], ["B", "Sí, tengo dos hermanas y un hermano."]], q: "¿Cuántos hermanos tiene en total?", options: ["Dos", "Tres", "Cuatro"], a: 1 },
    { lines: [["A", "¿Qué haces los fines de semana?"], ["B", "Normalmente voy al cine con mis amigos o leo en casa."]], q: "¿Qué hace los fines de semana?", options: ["Va al cine o lee.", "Juega al fútbol.", "Trabaja."], a: 0 },
    { lines: [["A", "Buenos días, ¿qué desea?"], ["B", "Un kilo de tomates y medio kilo de naranjas, por favor."]], q: "¿Qué compra?", options: ["1 kg de tomates y ½ kg de naranjas.", "1 kg de naranjas y ½ kg de tomates.", "2 kg de tomates."], a: 0 },
    { lines: [["A", "Hola, Juan, soy Elena. Te llamo porque no puedo ir a la reunión de mañana. Estoy enferma. ¿Puedes llamarme esta tarde?"]], q: "¿Por qué no va Elena a la reunión?", options: ["Está enferma.", "Tiene que trabajar.", "Está de vacaciones."], a: 0 },
    { lines: [["A", "Perdone, ¿dónde está la farmacia?"], ["B", "Está en la plaza, al lado del banco."]], q: "¿Dónde está la farmacia?", options: ["Al lado del banco.", "Delante del hospital.", "Detrás del supermercado."], a: 0 },
    { lines: [["A", "¿Cuál es tu número de teléfono?"], ["B", "Es el seis, cuatro, siete, dos, uno, ocho, cero, nueve, tres."]], q: "¿Cuál es el número?", options: ["647 218 093", "647 128 093", "674 218 093"], a: 0 },
    { lines: [["A", "Hoy en Madrid hace sol y la temperatura máxima es de veinticinco grados."]], q: "¿Qué tiempo hace en Madrid?", options: ["Sol, 25 grados.", "Lluvia, 15 grados.", "Nublado, 25 grados."], a: 0 },
    { lines: [["A", "¿A qué hora empieza la película?"], ["B", "A las ocho menos cuarto."]], q: "¿A qué hora empieza la película?", options: ["7:45", "8:15", "8:45"], a: 0 }
  ],
  writing: [
    {
      title: "Tarea 1 · Formulario", type: "form",
      ar: "تريد الاشتراك في نادٍ رياضي. املأ الاستمارة.",
      fields: [
        ["Nombre y apellidos", "Ahmed Hassan Ali"], ["Edad", "25 años"], ["Nacionalidad", "iraquí"], ["Teléfono", "612 345 678"],
        ["Correo electrónico", "ahmed.hassan@correo.com"], ["¿Qué deportes practicas?", "Juego al fútbol y nado."],
        ["¿Qué horario prefieres?", "Por la tarde, de seis a ocho."],
        ["¿Por qué quieres ser socio del gimnasio?", "Porque quiero hacer deporte todos los días y conocer a gente nueva."]
      ],
      rubric: [["أكملت كل الحقول", 3], ["الإجابات مفهومة ومناسبة للسؤال", 3], ["القواعد صحيحة غالبًا (التصريف، المذكر والمؤنث)", 2], ["الإملاء والعلامات صحيحة (á, ñ, ¿?)", 2]]
    },
    {
      title: "Tarea 2 · Correo", type: "text", words: [20, 30],
      ar: "صديقك الإسباني كارلوس يسألك عن بيتك الجديد. اكتب له بريدًا (20–30 كلمة):",
      points: ["حيّه", "صف بيتك (الغرف وكيف هو)", "قل أين يقع", "ادعُه لزيارتك", "ودّعه"],
      model: `¡Hola, Carlos!
Mi casa nueva es bonita. Tiene dos dormitorios, un salón grande y una terraza. Está en el centro, cerca del parque. ¿Quieres venir el sábado?
Un abrazo,
Ahmed`,
      rubric: [["غطيت كل النقاط المطلوبة", 5], ["عدد الكلمات بين 20 و 30 تقريبًا", 2], ["بدأت بتحية وانتهيت بوداع", 2], ["القواعد صحيحة غالبًا", 3], ["المفردات مناسبة ومتنوعة", 3]]
    }
  ],
  oral: {
    tasks: [
      { title: "Tarea 1 · Presentación personal", ar: "قدّم نفسك لمدة 1–2 دقيقة:", points: ["الاسم والعمر", "الجنسية", "اللغات", "العمل أو الدراسة", "العائلة", "الشخصية"] },
      { title: "Tarea 2 · Exposición de un tema", ar: "تكلم عن موضوع «Mi tiempo libre» لمدة 2–3 دقائق:", points: ["ماذا تفعل في وقت فراغك؟", "مع من؟", "أين ومتى؟", "ما الذي لا تحبه؟"] },
      { title: "Tarea 3 · Conversación", ar: "استمع إلى كل سؤال من الممتحِن وأجب بجملة كاملة:", questions: ["¿Qué deporte te gusta?", "¿Con quién sales los fines de semana?", "¿Te gusta el cine? ¿Por qué?", "¿Qué tipo de música escuchas?", "¿Qué vas a hacer este fin de semana?"] },
      { title: "Tarea 4 · Diálogo en una tienda", ar: "أنت في محل ملابس وتريد شراء تيشيرت. استمع إلى البائع وأجب. اسأل عن السعر والمقاس واللون.", questions: ["Buenos días, ¿puedo ayudarle?", "¿De qué color la quiere?", "¿Qué talla usa?", "Aquí tiene. ¿Algo más?"] }
    ],
    rubric: [
      ["المهمة 1: قدّمت كل المعلومات المطلوبة", 4], ["المهمة 1: تكلمت بدون توقف طويل", 2],
      ["المهمة 2: تكلمت عن الموضوع دقيقتين تقريبًا", 4], ["المهمة 2: غطيت كل النقاط الإرشادية", 2],
      ["المهمة 3: أجبت عن كل الأسئلة بجمل كاملة", 5], ["المهمة 4: حققت هدف الموقف (السعر، المقاس، اللون)", 4],
      ["النطق واضح ومفهوم", 2], ["القواعد صحيحة غالبًا", 2]
    ]
  }
};
