# Portfolio — nicolenki7.github.io/Portfolio

Sitio estático del portfolio de Nicolás Zalazar, Data Engineer en Mallorca.
Se publica con GitHub Pages desde `main`: cada push a esa rama es un despliegue y tarda alrededor de un minuto.

- **En vivo:** https://nicolenki7.github.io/Portfolio/
- **CV:** https://nicolenki7.github.io/Portfolio/docs/cv.html
- **Sin build y sin dependencias:** HTML, CSS y JavaScript nativo. No hay `npm install`, ni bundler, ni framework. Los archivos se editan y se suben.

## Secciones

| # | Ancla | Qué contiene |
| :-- | :-- | :-- |
| — | `#top` | Portada: titular, rotador de roles, una terminal con el resumen del perfil y cuatro KPIs (22 repositorios públicos, 8 informes reproducibles, 3 pipelines con CI, 3 idiomas). |
| 01 | `#stack` | Stack en dos bloques: lo que uso en producción y lo que estoy adoptando del ecosistema abierto. |
| 02 | `#proyectos` | Doce tarjetas con filtros por categoría (ingeniería de datos, analítica, machine learning, finanzas, origen Fabric). Cada una enlaza al repo, al plan de ejecución y, cuando existe, al informe o al caso completo. Ocho incluyen además un botón **Colab**. |
| 03 | `#hospitalidad` | La parte del perfil que viene de la hotelería: auditoría nocturna, front office, operación de hotel. |
| 04 | `#abierto` | Tabla de equivalencias Fabric → stack abierto (OneLake por DuckDB, Dataflows Gen2 por dbt, etc.). |
| 05 | `#informes` | Los ocho informes reproducibles, con enlace directo a cada uno. |
| 06 | `#certificaciones` | Dieciséis credenciales en rejilla (la primera, Microsoft DP-600) y, debajo, la formación: UDDI, DP-600 y los dos diplomas del SEPE 2026 con su código de verificación. |
| 07 | `#idiomas` | Español nativo, inglés B2 y francés B1. |
| 08 | `#contacto` | Email, LinkedIn, GitHub, WhatsApp, Tableau Public y el acceso al CV. |

## Estructura

```
index.html            todo el contenido del sitio (el español va escrito en el HTML)
assets/
  base.css            variables, tipografía, layout
  components.css      tarjetas, navegación, botones, KPI
  hosp.css            bloque de hospitalidad y las reglas de orden de la sección 06
  i18n-es.js          diccionario español (151 claves)
  i18n-en.js          diccionario inglés (151 claves)
  i18n.js             aplica el idioma y recuerda la elección
  site.js             comportamiento: scroll, filtros, contadores, modal, Colab, tarjeta DP-600
proyectos/            cuatro casos largos, con caso.css compartido
  crypto-medallion.html
  datamesh-logistica.html
  globalstore.html
  online-retail-rfm.html
docs/
  cv.html + cv.css    CV en hoja A4, pensado para imprimir
  cv_ES_2026.pdf      PDF generado desde esa misma página
img/certs/            imágenes de los diplomas
img/projects/         capturas usadas en las páginas de caso
assets/data/repos.csv inventario congelado de los repositorios públicos
```

## Bilingüe

El HTML trae el español escrito y los diccionarios aportan las dos versiones. `assets/i18n.js` recorre los elementos con `data-i18n` (texto) y `data-i18n-html` (HTML), aplica el idioma, guarda la elección en `localStorage` y acepta `?lang=en` para compartir un enlace ya traducido.

Toda clave nueva tiene que existir en **los dos** diccionarios. Si falta en uno, ese texto se queda en el idioma anterior a mitad de la página.

## Informes y cuadernos

Los informes **no se generan en este repositorio**. Cada proyecto publica su propio `docs/report.html` a partir del CSV versionado en ese mismo repo, y este sitio solo enlaza:

| Proyecto | Informe |
| :-- | :-- |
| Crypto · Arquitectura medallion | `Crypto_Medallion_Analytics/docs/report.html` |
| Global Store · Retail | `Tech_GlobalStore_Retail_Analysis-Fabric/docs/report.html` |
| Egatur · INE | `ETL_Egatur_INE_Esp/docs/report.html` |
| Churn | `Customer-Churn-Project/docs/report.html` |
| Reseñas · Drivers de mejora | `Customer-Sentiment-Analysis-Product-Improvement-Drivers/docs/report.html` |
| ETFbook · Flujos | `ETFbook-data-analytics-case-study/docs/report.html` |
| Retail · Segmentación RFM | `Online-Retail-Business-Analysis/docs/report.html` |
| German Credit · Scoring | `German_Credit_Scoring_Data/docs/report.html` |

Cuatro proyectos no tienen informe y es deliberado: Data Mesh, AdTech y Olist se construyeron en Fabric y Snowflake sin dataset versionado, y ETF Market Terminal consulta una API en vivo. Publicar gráficos con datos que no están en el repo sería inventarlos.

Los cuadernos se abren en Colab desde el propio repositorio, sin instalar nada. La lista de qué proyecto tiene cuaderno vive en `assets/site.js`, en la constante `COLAB`: para sumar uno nuevo alcanza con agregar una entrada ahí y el botón aparece en la tarjeta. La constante `CASO` funciona igual para enlazar una página de caso nueva desde su tarjeta.

## Inventario de repositorios

`proyectos/repositorios.html` cuenta qué hay en los 22 repositorios públicos: lenguaje principal, altas por mes y topics, más el recorrido por capas de la arquitectura de datos. No tiene una sola cifra escrita a mano: lee `assets/data/repos.csv` (una fila por repositorio, con lenguaje, fechas, topics, tamaño y descripción) y calcula los gráficos y la tabla en el navegador. Para actualizarlo alcanza con corregir la fila del CSV. El enlace desde la home lo agrega `assets/site.js`, en el bloque `11c`.

## CV

`docs/cv.html` y `docs/cv.css` forman una hoja A4 con reglas de impresión: se lee en el navegador y se guarda como PDF con `Ctrl+P`. `docs/cv_ES_2026.pdf` es el PDF generado desde esa misma página, así que el HTML y el PDF no pueden divergir.

Los archivos `cv_Es_Ult.pdf`, `cv_ENG_Ult.pdf` y `cv_PT_Ult_Remote.pdf` son versiones antiguas que ya no se enlazan desde el sitio.

## Dónde se toca cada cosa

- **Textos en general:** los dos diccionarios. El HTML solo hace falta si cambia la estructura.
- **Cifras del hero y de los KPIs:** el texto de `hero.lead` en los diccionarios y los atributos `data-count` de los `.kpi`.
- **Certificados y diplomas:** sección `#certificaciones`, con las imágenes en `img/certs/`. El DP-600 se publica como `dp-600.webp` (640×341), convertido desde el PDF original `dp_600.pdf`.
- **CV:** `docs/cv.html`.

## Convenciones

- Sin frameworks ni dependencias: lo que hay en el repo es todo lo que se sirve.
- Ninguna métrica que no salga de un archivo versionado.
- Español e inglés siempre a la par.
