import { EVENTS } from "@builderbot/bot";

export const flowData = {
  "flows": [
    {
      "name": EVENTS.WELCOME,
      "question": [
        "¡Hola! Acá te habla Alfredo Sánchez. ¿En qué puedo ayudarte hoy? 🤔",
        "💰 Quieres saber sobre el *precios* de los servicios?",
        "📅 Quieres que te cuente cuáles son los *planes* que tengo disponibles?",
        "💳 Prefieres tener información sobre *pagos*?",
        "📚 ¿Te gustaría conocer nuestra *metodología*?",
        "👨‍🏫 ¿Quieres información sobre mí, Alfredo Sánchez?"
      ],
      "responses": [
        {
          "keyword": "precios",
          "answers": [
            "💰 Quieres saber sobre el precio de los servicios?"
          ]
        },
        {
          "keyword": "planes",
          "answers": [
            "📅 Quieres que te cuente cuáles son los *planes* que tengo disponibles?",
          ]
        },
        {
          "keyword": "pagos",
          "answers": [
            "💳 Prefieres tener información sobre *pagos*?",
          ]
        },
        {
          "keyword": "metodologia",
          "answers": [
            "📚 ¿Te gustaría conocer nuestra *metodología*?",
          ]
        },
        {
          "keyword": "coach",
          "answers": [
            "👨‍🏫 ¿Quieres información sobre mí, Alfredo Sánchez?",
          ]
        },
        {
          "keyword": "ASESOR",
          "answers": [
            "👨‍🏫 ¿Te querés comunicar con un humano? En segundos te derivamos"
          ]
        }
      ]
    },
    {
      "name": "precios",
      "question": "📈 ¿Qué información sobre precios necesitas?\n\n💵 Saber el precio por sesión\n📦 Saber el precio de los paquetes",
      "responses": [
        {
          "keyword": "sesion",
          "answers": [
            "💵 El precio es $50 por sesión.",
            "Cada sesión cuesta $50.",
            {
              "text": "Aquí tienes una imagen con los precios:",
              "image": "https://online.fliphtml5.com/zszdc/pfvn/files/large/5f5468d54f2b86e7e60fac196581d7d0.jpg"
            }
          ]
        },
        {
          "keyword": "paquete",
          "answers": [
            "📦 El paquete de 10 sesiones cuesta $450.",
            "Tenemos un paquete especial de 10 sesiones por $450.",
            {
              "text": "Consulta esta imagen para más detalles:",
              "image": "https://online.fliphtml5.com/zszdc/pfvn/files/large/5f5468d54f2b86e7e60fac196581d7d0.jpg"
            }
          ]
        }
      ]
    },
    {
      "name": "planes",
      "question": "🗓️ ¿Qué información sobre los planes necesitas?\n\n👤 Plan individual\n👥 Plan grupal",
      "responses": [
        {
          "keyword": "individual",
          "answers": [
            "👤 El plan individual ofrece entrenamiento personalizado.",
            "Con el plan individual, recibirás sesiones personalizadas.",
            {
              "text": "Aquí tienes más información sobre el plan individual:",
              "image": "https://online.fliphtml5.com/zszdc/pfvn/files/large/5f5468d54f2b86e7e60fac196581d7d0.jpg"
            }
          ]
        },
        {
          "keyword": "grupo",
          "answers": [
            "👥 El plan grupal es ideal para entrenamientos en grupo.",
            "Con el plan grupal, entrenas junto con otros participantes.",
            {
              "text": "Consulta esta imagen para más detalles del plan grupal:",
              "image": "https://online.fliphtml5.com/zszdc/pfvn/files/large/5f5468d54f2b86e7e60fac196581d7d0.jpg"
            }
          ]
        }
      ]
    },
    {
      "name": "pagos",
      "question": "💳 ¿Cómo prefieres pagar?\n\n💳 Con tarjeta de crédito/débito\n🏦 Con transferencia bancaria",
      "responses": [
        {
          "keyword": "tarjeta",
          "answers": [
            "💳 Aceptamos tarjetas de crédito y débito.",
            "Puedes pagar con tarjeta de crédito o débito.",
            {
              "text": "Aquí tienes la información de pago con tarjeta:",
              "image": "https://online.fliphtml5.com/zszdc/pfvn/files/large/5f5468d54f2b86e7e60fac196581d7d0.jpg"
            }
          ]
        },
        {
          "keyword": "transferencia",
          "answers": [
            "🏦 También aceptamos transferencias bancarias.",
            "La transferencia bancaria es otra opción de pago.",
            {
              "text": "Consulta esta imagen para más información sobre transferencia:",
              "image": "https://online.fliphtml5.com/zszdc/pfvn/files/large/5f5468d54f2b86e7e60fac196581d7d0.jpg"
            }
          ]
        }
      ]
    },
    {
      "name": "metodologia",
      "question": "📚 ¿Qué te gustaría saber sobre la metodología?\n\n🎯 Información general\n🔍 Detalles específicos",
      "responses": [
        {
          "keyword": "general",
          "answers": [
            "🎯 Nos enfocamos en un entrenamiento personalizado.",
            "Ofrecemos un enfoque personalizado para cada cliente.",
            {
              "text": "Aquí tienes una imagen de nuestra metodología:",
              "image": "https://example.com/imagen_metodologia.png"
            }
          ]
        },
        {
          "keyword": "detalles",
          "answers": [
            "🔍 Te enviaremos un folleto con detalles sobre la metodología.",
            "Podemos enviarte información más detallada sobre nuestra metodología.",
            {
              "text": "Consulta esta imagen para más detalles:",
              "image": "https://example.com/imagen_detalles.png"
            }
          ]
        }
      ]
    },
    {
      "name": "coach",
      "question": "👨‍🏫 ¿Qué información necesitas sobre el entrenador?\n\n🌟 Sobre Alfredo Sánchez\n📚 Sobre su experiencia",
      "responses": [
        {
          "keyword": "alfredo",
          "answers": [
            "🌟 El Coach Alfredo Sánchez tiene más de 10 años de experiencia en entrenamiento.",
            "🏆 Alfredo Sánchez ha trabajado con atletas profesionales y aficionados.",
            {
              "text": "Aquí tienes una imagen del Coach Alfredo Sánchez:",
              "image": "https://example.com/imagen_coach_alfredo.png"
            }
          ]
        },
        {
          "keyword": "experiencia",
          "answers": [
            "📚 Alfredo Sánchez tiene una amplia formación en entrenamiento y nutrición.",
            "🎓 Ha asistido a varios cursos y talleres para mejorar sus habilidades.",
            {
              "text": "Consulta esta imagen para más detalles sobre la experiencia del coach:",
              "image": "https://example.com/imagen_experiencia_coach.png"
            }
          ]
        }
      ]
    }
  ]
};

export const ADMIN_NUMBER = '+502 5643 9950';