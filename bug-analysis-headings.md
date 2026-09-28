# Análisis del bug: Encabezados no visibles en la vista previa del PDF

## Archivo de evidencia

- `uploads/img-bug-1.png`

## Descripción del problema

En la vista previa del CV generado con `@react-pdf/renderer`, los textos que deberían mostrarse en **negrita** no se renderizan. En cambio, los textos en peso normal (párrafos, bullets, descripciones) sí aparecen correctamente.

### Elementos que NO se ven

- Nombre completo del candidato (panel principal y barra lateral).
- Título profesional / headline en el panel principal.
- Títulos de sección en la barra lateral: **CONTACTO**, **HABILIDADES**, **REDES SOCIALES**.
- Títulos de sección en el panel principal: **Perfil / Resumen**, **Experiencia**, **Educación**, etc.
- Puesto y empresa en cada bloque de experiencia.
- Institución en cada bloque de educación.
- Etiquetas de habilidades y redes sociales en negrita.

### Elementos que SÍ se ven

- Foto de perfil.
- Texto normal / párrafos del resumen profesional.
- Bullets de experiencia (los puntos descriptivos).
- Datos de contacto en texto normal.
- Detalles de habilidades y redes sociales en peso normal.
- El subtítulo `DESARROLLADOR FRONTEND` de la barra lateral (porque usaba peso normal).

## Causa raíz (actualizada)

La primera hipótesis fue un uso incorrecto de `fontWeight` con fuentes PDF estándar. Sin embargo, tras generar el mismo documento con `@react-pdf/renderer` en **Node**, se comprobó que el PDF resultante **sí contiene todos los textos en negrita** tanto con `fontFamily: 'Helvetica-Bold'` como con `fontWeight: 700`.

Por tanto, el problema no está en la generación del PDF, sino en su **visualización en el navegador**. `@react-pdf/renderer` en el entorno del browser no puede cargar/incrustar correctamente las fuentes estándar de PDF (`Helvetica-Bold`) en el documento que se muestra dentro del `<PDFViewer>`. El visor del navegador no encuentra la fuente bold y, como consecuencia, no dibuja esos textos.

La solución robusta es **registrar fuentes TTF propias e incrustarlas** en el PDF, de modo que el visor del navegador las tenga disponibles sin depender de las fuentes del sistema ni de las fuentes estándar de PDF.

## Archivos afectados

- `src/components/RightPanel/CVTemplate.tsx`
- `public/fonts/Arial.ttf`
- `public/fonts/Arial-Bold.ttf`

## Solución aplicada

1. Copiar fuentes TTF reales al directorio `public/fonts/` para que Vite las sirva tanto en desarrollo como en producción.
2. Registrar las fuentes en `@react-pdf/renderer` mediante `Font.register`:
   ```js
   Font.register({ family: 'Arial', src: '/fonts/Arial.ttf' });
   Font.register({ family: 'Arial-Bold', src: '/fonts/Arial-Bold.ttf' });
   ```
3. Reemplazar `fontFamily: 'Helvetica'` por `fontFamily: 'Arial'` en el estilo base `page`.
4. Reemplazar `fontFamily: 'Helvetica-Bold'` por `fontFamily: 'Arial-Bold'` en todos los estilos de encabezados y etiquetas en negrita.
5. Verificar con `grep` que no quede ninguna propiedad `fontWeight` ni referencia a `Helvetica` en `src/components/RightPanel/CVTemplate.tsx`.

### Estilos corregidos en `CVTemplate.tsx`

- `page` → `fontFamily: 'Arial'`
- `sidebarName` → `fontFamily: 'Arial-Bold'`
- `sidebarSectionTitle` → `fontFamily: 'Arial-Bold'`
- `skillLabel` → `fontFamily: 'Arial-Bold'`
- `socialNetwork` → `fontFamily: 'Arial-Bold'`
- `mainName` → `fontFamily: 'Arial-Bold'`
- `sectionTitle` → `fontFamily: 'Arial-Bold'`
- `expPosition` → `fontFamily: 'Arial-Bold'`
- `eduInstitution` → `fontFamily: 'Arial-Bold'`
- `activityName` → `fontFamily: 'Arial-Bold'`

## Verificación recomendada

1. Ejecutar `npm run dev` (se limpió la caché de Vite y se mataron procesos `node` previos).
2. Cargar o crear un CV con datos de ejemplo.
3. Revisar la vista previa del PDF y confirmar que ahora se ven:
   - El nombre y título principal.
   - Los títulos de sección (`CONTACTO`, `HABILIDADES`, `REDES SOCIALES`, `Perfil`, `Experiencia`, etc.).
   - Los nombres de empresa, puesto e institución.
4. Descargar el PDF y verificar que los encabezados también aparecen en el archivo descargado.

## Estado

- [x] Identificado el problema
- [x] Localizado el archivo afectado
- [x] Aplicada la corrección en el código
- [ ] Validado por el usuario ejecutando `npm run dev`
