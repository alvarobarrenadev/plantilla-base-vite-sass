# Manual Completo de Sass con Vite

## Índice

- [Manual Completo de Sass con Vite](#manual-completo-de-sass-con-vite)
  - [Índice](#índice)
  - [Introducción](#introducción)
  - [Configuración](#configuración)
    - [Instalación de Vite con Sass](#instalación-de-vite-con-sass)
    - [Estructura de directorios](#estructura-de-directorios)
    - [Configuración de Vite](#configuración-de-vite)
  - [Fundamentos de Sass](#fundamentos-de-sass)
    - [Sintaxis SCSS vs Sass](#sintaxis-scss-vs-sass)
    - [Variables](#variables)
    - [Scope de variables](#scope-de-variables)
    - [Anidamiento](#anidamiento)
    - [Selector padre (\&)](#selector-padre-)
    - [Operadores](#operadores)
    - [Sistema de módulos moderno](#sistema-de-módulos-moderno)
      - [@use](#use)
    - [@forward](#forward)
    - [Namespaces](#namespaces)
    - [Migración de @import a @use](#migración-de-import-a-use)
  - [Mixins y funciones](#mixins-y-funciones)
    - [Mixins](#mixins)
    - [Funciones](#funciones)
  - [Herencia y extensión](#herencia-y-extensión)
    - [@extend](#extend)
    - [Placeholder selectors](#placeholder-selectors)
  - [Control de flujo](#control-de-flujo)
    - [Condicionales](#condicionales)
    - [Bucles](#bucles)
      - [@for](#for)
      - [@each](#each)
      - [@while](#while)
  - [Arquitectura Sass](#arquitectura-sass)
    - [Organización de archivos](#organización-de-archivos)
      - [Archivo índice para cada carpeta](#archivo-índice-para-cada-carpeta)
      - [Archivo principal que importa todo](#archivo-principal-que-importa-todo)
        - [Convenciones de nombres](#convenciones-de-nombres)
  - [Técnicas avanzadas](#técnicas-avanzadas)
    - [Maps](#maps)
    - [Funciones de mapas](#funciones-de-mapas)
    - [Interpolación](#interpolación)
    - [Mixins avanzados](#mixins-avanzados)
      - [Mixins que aceptan contenido](#mixins-que-aceptan-contenido)
      - [Mixins con multiple argumentos:](#mixins-con-multiple-argumentos)
  - [Dynamic imports](#dynamic-imports)
  - [Personalización de módulos](#personalización-de-módulos)
  - [Integración con Vite](#integración-con-vite)
    - [Configuración de Vite para Sass](#configuración-de-vite-para-sass)
    - [Optimización de CSS](#optimización-de-css)
  - [Sourcemaps](#sourcemaps)
  - [Buenas prácticas](#buenas-prácticas)
    - [Rendimiento](#rendimiento)
    - [Mantenibilidad](#mantenibilidad)
    - [Depuración](#depuración)
  - [Recursos adicionales](#recursos-adicionales)

## Introducción

Sass (Syntactically Awesome Stylesheets) es un preprocesador CSS que extiende la funcionalidad del CSS estándar con características como variables, anidamiento, mixins y funciones. Cuando se combina con Vite, un build tool moderno y rápido, se crea un flujo de trabajo eficiente para el desarrollo frontend.

Este manual cubre la versión moderna de Sass, que utiliza el sistema de módulos con `@use` y `@forward` en lugar del anticuado `@import`.

## Configuración

### Instalación de Vite con Sass

Para comenzar un proyecto nuevo con Vite y Sass:

```bash
# Crear un proyecto Vite básico
npm create vite@latest mi-proyecto -- --template vanilla

# Navegar al directorio del proyecto
cd mi-proyecto

# Instalar dependencias
npm install

# Añadir Sass
npm add -D sass
```

### Estructura de directorios
Una estructura recomendada para proyectos con Sass siguiendo el patrón 7-1:
```
src/
├── assets/
├── js/
└── sass/
    ├── abstracts/
    │   ├── _index.scss     # Reexporta todo con @forward
    │   ├── _variables.scss
    │   ├── _functions.scss
    │   └── _mixins.scss
    ├── base/
    │   ├── _index.scss
    │   ├── _reset.scss
    │   └── _typography.scss
    ├── components/
    │   ├── _index.scss
    │   └── _buttons.scss
    ├── layout/
    │   ├── _index.scss
    │   ├── _header.scss
    │   └── _footer.scss
    ├── pages/
    │   ├── _index.scss
    │   └── _home.scss
    ├── themes/
    │   ├── _index.scss
    │   └── _default.scss
    ├── vendors/
    │   ├── _index.scss
    │   └── _normalize.scss
    └── main.scss           # Archivo principal que importa todo
```

### Configuración de Vite
Para configurar correctamente Vite con Sass, crea o modifica el archivo vite.config.js:

```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@sass': resolve(__dirname, './src/sass'),
      '@abstracts': resolve(__dirname, './src/sass/abstracts'),
      '@base': resolve(__dirname, './src/sass/base'),
      '@components': resolve(__dirname, './src/sass/components'),
      '@layout': resolve(__dirname, './src/sass/layout'),
      '@pages': resolve(__dirname, './src/sass/pages'),
      '@themes': resolve(__dirname, './src/sass/themes'),
      '@vendors': resolve(__dirname, './src/sass/vendors')
    }
  },
  css: {
    devSourcemap: true, // Habilita sourcemaps para desarrollo
    preprocessorOptions: {
      scss: {
        // Configuración adicional para Sass
        includePaths: [
          resolve(__dirname, './src/sass'),
          resolve(__dirname, './src/sass/abstracts'),
          resolve(__dirname, './src/sass/base'),
          resolve(__dirname, './src/sass/components'),
          resolve(__dirname, './src/sass/layout'),
          resolve(__dirname, './src/sass/pages'),
          resolve(__dirname, './src/sass/themes'),
          resolve(__dirname, './src/sass/vendors')
        ]
      }
    }
  }
});
```

## Fundamentos de Sass
### Sintaxis SCSS vs Sass
Sass ofrece dos sintaxis:
- SCSS (Sassy CSS): Es una extensión de CSS que permite el uso de características de Sass. Los archivos SCSS tienen la extensión `.scss`.
```scss
.container {
  width: 100%;
  
  .item {
    color: blue;
    
    &:hover {
      color: darkblue;
    }
  }
}
```

- Sass: Es la sintaxis original de Sass, que utiliza una indentación específica en lugar de llaves y punto y coma. Los archivos Sass tienen la extensión `.sass`.
```sass
.container
  width: 100%
  
  .item
    color: blue
    
    &:hover
      color: darkblue
```

Ambas sintaxis son compatibles y pueden coexistir en un mismo proyecto. Sin embargo, se recomienda utilizar SCSS por su similitud con CSS y su facilidad de uso.

En este manual usaremos principalmente SCSS por ser más cercana a CSS y la más utilizada.

### Variables
Las variables en Sass permiten almacenar valores que pueden ser reutilizados en todo el archivo. Se definen con el símbolo `$` seguido del nombre de la variable.

```scss
// Declaración
$primary-color: #3498db;
$font-stack: 'Helvetica', sans-serif;
$spacing-unit: 8px;

// Uso
body {
  font-family: $font-stack;
  color: $primary-color;
  padding: $spacing-unit * 2;
}
```

### Scope de variables
```scss
$global-color: blue;

.component {
  $local-color: red; // Local a .component
  color: $local-color;
  border: 1px solid $global-color;
  
  .nested {
    color: $local-color; // Accesible aquí
  }
}

.other-component {
  // color: $local-color; // Error: no disponible aquí
}
```

### Anidamiento
El anidamiento permite escribir CSS de manera jerárquica, lo que mejora la legibilidad y organización del código.

```scss
nav {
  background: #333;
  
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  li {
    display: inline-block;
    
    a {
      color: white;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
```

### Selector padre (&)
El selector padre `&` se utiliza para referirse al selector actual en un contexto anidado. Esto es útil para crear variaciones de un mismo estilo.

```scss
.btn {
  padding: 10px 15px;
  
  &:hover {
    background: darken(blue, 10%);
  }
  
  &--primary {
    background: blue;
  }
  
  &--secondary {
    background: gray;
  }
  
  &__icon {
    margin-right: 5px;
  }
}
```

Esto compilará a:
```css
.btn {
  padding: 10px 15px;
}
.btn:hover {
  background: #0000cc;
}
.btn--primary {
  background: blue;
}
.btn--secondary {
  background: gray;
}
.btn__icon {
  margin-right: 5px;
}
```

### Operadores
Los operadores en Sass permiten realizar cálculos matemáticos directamente en el código. Los operadores disponibles son `+`, `-`, `*`, `/` y `%`.

```scss
.container {
  width: 100% - 20px;
  margin: 10px * 2;
  padding: (20px / 2);
}

.box {
  // Operaciones de color
  color: lighten(#000, 30%);
  background: darken(#fff, 10%);
  border: 1px solid mix(#fff, #000, 50%);
}
```

### Sistema de módulos moderno
El sistema de módulos moderno de Sass utiliza `@use` y `@forward` para importar y exportar estilos entre archivos. Esto mejora la organización y evita conflictos de nombres.

#### @use
El comando `@use` importa un módulo y lo hace disponible en el archivo actual. Los módulos se pueden importar con un alias para evitar conflictos de nombres.

`@use` carga mixins, funciones y variables de otras hojas de estilo Sass y crea un namespace basado en el nombre del archivo:

```scss
// _colors.scss
$primary: blue;
$secondary: green;

@mixin theme($color) {
  background-color: $color;
  color: white;
}

// main.scss
@use 'colors';

.button {
  background-color: colors.$primary;
  
  &.themed {
    @include colors.theme(colors.$secondary);
  }
}
```

### @forward
`@forward` permite reexportar módulos para que otros archivos puedan acceder a ellos sin necesidad de importarlos directamente. Esto es útil para crear bibliotecas de estilos.

Permite hacer accesibles los miembros de un módulo a través de otro, sin tener que importarlos directamente

```scss
// _variables.scss
$primary-color: blue;
$secondary-color: green;

// _functions.scss
@function calculate-width($cols) {
  @return $cols * 100px;
}

// abstracts/_index.scss
@forward 'variables';
@forward 'functions';

// main.scss
@use 'abstracts';

.element {
  color: abstracts.$primary-color;
  width: abstracts.calculate-width(3);
}
```

### Namespaces
Los namespaces son una forma de organizar y evitar conflictos de nombres en Sass. Cuando se utiliza `@use`, Sass crea un namespace basado en el nombre del archivo, lo que permite acceder a variables, mixins y funciones de manera clara y estructurada.

```scss
// Usando el nombre de archivo predeterminado
@use 'colors';
// colors.$primary

// Con alias personalizado
@use 'colors' as c;
// c.$primary

// Sin namespace (no recomendado para proyectos grandes)
@use 'colors' as *;
// $primary (directamente)
```

### Migración de @import a @use
El comando `@import` ha sido descontinuado en Sass y se recomienda utilizar `@use` y `@forward` en su lugar. Aquí hay un ejemplo de cómo migrar de `@import` a `@use`.

```scss
// Antiguo método (deprecado)
@import 'variables';
@import 'mixins';

// Nuevo método (recomendado)
@use 'variables';
@use 'mixins';

// O para importaciones múltiples:
@use 'abstracts/index';
```

Beneficios del nuevo sistema de módulos:
- Evita colisiones de nombres con namespaces.
- Mejora el rendimiento (los módulos solo se importan una vez).
- Mayor claridad sobre el origen de las variables y mixins.


## Mixins y funciones
Los mixins y funciones son herramientas poderosas en Sass que permiten reutilizar código y realizar cálculos complejos.

### Mixins
Los mixins son bloques de código que pueden ser reutilizados en diferentes partes del archivo. Se definen con `@mixin` y se incluyen con `@include`.

**Mixins básicos:**
```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  @include flex-center;
  flex-direction: column;
}

.modal {
  @include flex-center;
}
```

**Mixins con parámetros**
```scss
@mixin border($color, $width: 1px, $style: solid) {
  border: $width $style $color;
}

.box {
  @include border(red);
}

.box-thick {
  @include border(blue, 3px, dashed);
}
```

**Argumentos variables:**
```scss
@mixin box-shadow($shadows...) {
  -webkit-box-shadow: $shadows;
  -moz-box-shadow: $shadows;
  box-shadow: $shadows;
}

.card {
  @include box-shadow(0 2px 2px rgba(0,0,0,.1), 0 5px 5px rgba(0,0,0,.05));
}
```

### Funciones
Las funciones en Sass permiten realizar cálculos y devolver valores. Se definen con `@function` y se utilizan como cualquier otra función.
```scss
@function calculate-rem($px, $base: 16) {
  @return $px / $base * 1rem;
}
@function darken($color, $amount) {
  @return mix(black, $color, $amount);
}
@function lighten($color, $amount) {
  @return mix(white, $color, $amount);
}
```

**Funciones personalizadas:**
Sirven para realizar cálculos complejos o manipular valores. Por ejemplo, una función para calcular el ancho de un contenedor basado en el número de columnas:
```scss
@function calculate-width($col-count, $col-width: 60px, $gap: 20px) {
  @return $col-width * $col-count + $gap * ($col-count - 1);
}

.container {
  width: calculate-width(3); // 180px
  max-width: calculate-width(12, 70px, 30px); // 1110px
}
```

**Funciones integradas:**
Sass también incluye funciones integradas para manipular colores, cadenas y números. Algunas de las más comunes son:
- `lighten($color, $amount)`: Aclara un color.
- `darken($color, $amount)`: Oscurece un color.
- `mix($color1, $color2, $weight)`: Mezcla dos colores.
- `rgba($color, $alpha)`: Devuelve un color RGBA.
- `length($list)`: Devuelve la longitud de una lista.
- `nth($list, $n)`: Devuelve el enésimo elemento de una lista.
- `join($list1, $list2)`: Une dos listas.
- `index($list, $value)`: Devuelve el índice de un valor en una lista.
- `str-length($string)`: Devuelve la longitud de una cadena.
- `str-slice($string, $start, $end)`: Devuelve una subcadena.
- `str-index($string, $substring)`: Devuelve el índice de una subcadena.
- `str-insert($string, $substring, $index)`: Inserta una subcadena en una cadena.
- `str-replace($string, $search, $replace)`: Reemplaza una subcadena en una cadena.
- `str-split($string, $delimiter)`: Divide una cadena en una lista.

```scss
.element {
  // Manipulación de colores
  color: lighten(#007bff, 20%);
  background-color: darken(#f8f9fa, 5%);
  border-color: rgba(#000, 0.2);
  
  // Funciones matemáticas
  width: percentage(0.8);  // 80%
  height: round(14.2px);   // 14px
  margin: min(10px, 5px);  // 5px
  padding: max(5px, 10px); // 10px
  
  // Funciones de strings
  content: quote(Esto es un texto);  // "Esto es un texto"
  font-family: unquote('Helvetica'); // Helvetica
}
```

## Herencia y extensión
La herencia y extensión en Sass permiten reutilizar estilos de manera eficiente, evitando la duplicación de código.

### @extend
El comando `@extend` permite que un selector herede los estilos de otro selector. Esto es útil para evitar la duplicación de código y mantener un CSS limpio y organizado.

```scss
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  @extend .message;
  border-color: green;
}

.error {
  @extend .message;
  border-color: red;
}
```

### Placeholder selectors
Los placeholder selectors son selectores especiales que no se generan en CSS a menos que se extiendan. Se definen con `%` y son útiles para crear estilos base que pueden ser reutilizados sin generar código innecesario.

```scss
// Define un placeholder
%button-base {
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.primary-button {
  @extend %button-base;
  background: blue;
}

.secondary-button {
  @extend %button-base;
  background: gray;
}
```

Esto generará el siguiente CSS:
```css
.primary-button, .secondary-button {
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.primary-button {
  background: blue;
}

.secondary-button {
  background: gray;
}
```

## Control de flujo
El control de flujo en Sass permite ejecutar bloques de código condicionalmente o repetirlos. Esto es útil para crear estilos dinámicos y adaptativos.

### Condicionales
Los condicionales en Sass permiten ejecutar bloques de código basados en condiciones. Se utilizan `@if`, `@else if` y `@else`.

```scss
@mixin text-contrast($bg-color) {
  @if (lightness($bg-color) > 50%) {
    color: #000;
  } @else {
    color: #fff;
  }
}

.dark-bg {
  background-color: #333;
  @include text-contrast(#333);  // color: #fff
}

.light-bg {
  background-color: #f8f9fa;
  @include text-contrast(#f8f9fa);  // color: #000
}
```

### Bucles
Los bucles en Sass permiten repetir bloques de código un número específico de veces o iterar sobre listas y mapas. Se utilizan `@for`, `@each` y `@while`.

#### @for
```scss
@for $i from 1 through 5 {
  .col-#{$i} {
    width: 20% * $i;
  }
}
```

#### @each
```scss
$colors: (
  'primary': blue,
  'secondary': green,
  'accent': orange
);

@each $name, $color in $colors {
  .btn-#{$name} {
    background-color: $color;
    border-color: darken($color, 10%);
  }
}
```

#### @while
```scss
$i: 1;
@while $i <= 5 {
  .mb-#{$i} {
    margin-bottom: $i * 0.25rem;
  }
  $i: $i + 1;
}
```

## Arquitectura Sass
La arquitectura Sass es un enfoque para organizar y estructurar el código Sass de manera eficiente. Existen varios patrones y metodologías, pero uno de los más populares es el patrón 7-1, que divide el código en siete carpetas principales:

- **abstracts**: Contiene variables, mixins y funciones.
- **base**: Contiene estilos base y resets.
- **components**: Contiene estilos para componentes individuales.
- **layout**: Contiene estilos para la estructura de la página.
- **pages**: Contiene estilos específicos para páginas.
- **themes**: Contiene estilos para diferentes temas.
- **vendors**: Contiene estilos de bibliotecas externas y plugins.
- **main.scss**: Archivo principal que importa todos los demás.

### Organización de archivos
La organización de archivos es crucial para mantener un código limpio y fácil de mantener. 

#### Archivo índice para cada carpeta
Cada carpeta debe tener un archivo índice (`_index.scss`) que reexporte todos los archivos de esa carpeta. Esto permite importar todos los estilos de una carpeta con una sola línea.

```scss
// abstracts/_index.scss
@forward 'variables';
@forward 'mixins';
@forward 'functions';
```

#### Archivo principal que importa todo
El archivo principal (`main.scss`) debe importar todos los archivos índice de las carpetas. Esto asegura que todos los estilos estén disponibles en un solo lugar.

```scss
// main.scss
@use 'vendors';
@use 'abstracts';
@use 'base';
@use 'layout';
@use 'components';
@use 'pages';
@use 'themes';
```

##### Convenciones de nombres
Es importante seguir convenciones de nombres consistentes para los archivos y carpetas. Algunas recomendaciones son:
- Archivos: nombres descriptivos prefijados con guion bajo para parciales: `_buttons.scss`
- Variables: descriptivas y específicas: `$primary-button-bg-color`	
- BEM (Block Element Modifier): `.block__element--modifier`
- Utilizar guiones bajos para separar palabras en nombres de archivos y variables: `$font_size` en lugar de `$fontSize`
- Utilizar guiones para separar palabras en nombres de clases: `.btn-primary` en lugar de `.btnPrimary`
- Utilizar nombres en inglés para mayor claridad y consistencia: `.header` en lugar de `.cabecera`
- Evitar abreviaciones innecesarias: `.btn--primary` en lugar de `.btn--prmry`
- Utilizar nombres descriptivos para mixins y funciones: `@mixin flex-center` en lugar de `@mixin fc`
- Utilizar nombres de variables y mixins que reflejen su propósito: `$primary-color` en lugar de `$color1`
- Utilizar nombres de mixins y funciones que sigan una convención de nomenclatura consistente: `@mixin flex-center` y `@function calculate-rem`

```scss
// Ejemplo de estructura BEM
.card { // Block
  width: 100%;
  
  &__header { // Element
    background: #f5f5f5;
  }
  
  &__title { // Element
    font-size: 1.2rem;
  }
  
  &--featured { // Modifier
    border: 2px solid gold;
  }
}
```

## Técnicas avanzadas
### Maps
Los maps son estructuras de datos en Sass que permiten almacenar pares clave-valor. Son útiles para organizar y agrupar datos relacionados.

```scss
$breakpoints: (
  'sm': 576px,
  'md': 768px,
  'lg': 992px,
  'xl': 1200px
);

@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  } @else {
    @error "Breakpoint '#{$breakpoint}' no encontrado en $breakpoints.";
  }
}

.container {
  width: 100%;
  
  @include respond-to('md') {
    width: 720px;
  }
  
  @include respond-to('lg') {
    width: 960px;
  }
}
```

### Funciones de mapas
Las funciones de mapas permiten acceder y manipular los valores de un mapa. Algunas funciones útiles son `map-get`, `map-keys`, `map-values` y `map-has-key`.

```scss
$colors: (
  'primary': blue,
  'secondary': green,
  'accent': orange
);
$primary-color: map-get($colors, 'primary'); // blue
$secondary-color: map-get($colors, 'secondary'); // green
$accent-color: map-get($colors, 'accent'); // orange
$color-keys: map-keys($colors); // ('primary', 'secondary', 'accent')
$color-values: map-values($colors); // (blue, green, orange)
$has-primary: map-has-key($colors, 'primary'); // true
$has-tertiary: map-has-key($colors, 'tertiary'); // false
```

### Interpolación
La interpolación en Sass permite insertar variables y expresiones dentro de cadenas y selectores. Se utiliza el símbolo `#` seguido de `{}` para indicar la interpolación.

```scss
$component: 'button';
$property: 'margin';
$direction: 'top';

.#{$component} {
  #{$property}-#{$direction}: 10px;
}

```

Compila a:
```scss
.button {
  margin-top: 10px;
}
```

### Mixins avanzados
#### Mixins que aceptan contenido
Los mixins que aceptan contenido permiten incluir bloques de código dentro de un mixin. Esto es útil para crear estilos reutilizables que pueden variar según el contexto.

```scss
@mixin media($width) {
  @media screen and (min-width: $width) {
    @content;
  }
}

.sidebar {
  width: 100%;
  
  @include media(768px) {
    width: 30%;
    float: left;
  }
}
```

#### Mixins con multiple argumentos:
Los mixins con múltiples argumentos permiten pasar varios valores a un mixin. Esto es útil para crear mixins flexibles y reutilizables.

```scss
@mixin position($position, $top: null, $right: null, $bottom: null, $left: null) {
  position: $position;
  top: $top;
  right: $right;
  bottom: $bottom;
  left: $left;
}

.modal {
  @include position(absolute, 50%, null, null, 50%);
  transform: translate(-50%, -50%);
}
```

## Dynamic imports
Los dynamic imports permiten cargar módulos de Sass de manera dinámica en tiempo de ejecución. Esto es útil para cargar estilos específicos según la necesidad.

```scss
$theme: 'dark';

@use 'themes/#{$theme}';
```
Esto cargará el módulo `dark.scss` de la carpeta `themes`. Si el valor de `$theme` cambia, se cargará un módulo diferente.

```scss
$theme: 'light';
@use 'themes/#{$theme}';
```
Esto cargará el módulo `light.scss` de la carpeta `themes`.

## Personalización de módulos
Los módulos de Sass se pueden personalizar para adaptarse a las necesidades del proyecto. Esto incluye la creación de mixins y funciones personalizadas, así como la configuración de variables y mapas.

```scss
// _theme.scss
$primary: blue !default;
$secondary: green !default;

body {
  color: $primary;
  background: lighten($secondary, 40%);
}

// main.scss
@use 'theme' with (
  $primary: purple,
  $secondary: orange
);
body {
  color: theme.$primary; // purple
  background: theme.lighten(theme.$secondary, 40%); // light orange
}
```

## Integración con Vite
Vite es un build tool moderno que permite una integración rápida y eficiente con Sass. Al utilizar Vite, se pueden aprovechar características como el hot module replacement (HMR) y la carga de módulos de manera eficiente.

### Configuración de Vite para Sass
Para configurar Vite para trabajar con Sass, es necesario instalar el paquete `sass` y configurar el archivo `vite.config.js` para incluir las rutas de los módulos de Sass.

```bash
npm install sass
```

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@sass': resolve(__dirname, 'src/sass'),
    }
  }
});
```

**Uso de alias en Sass:**
```scss
@use '@sass/abstracts/variables' as v;
```

### Optimización de CSS
Vite optimiza automáticamente el CSS durante la construcción del proyecto. Esto incluye la eliminación de código no utilizado y la minificación del CSS.

Para optimizar el CSS en producción:
```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    cssMinify: 'lightningcss',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/css/i.test(extType)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      }
    }
  }
});
```

## Sourcemaps
Los sourcemaps son archivos que permiten mapear el código CSS generado a su código fuente original en Sass. Esto facilita la depuración y el desarrollo, ya que permite ver el código original en lugar del código compilado.
Para habilitar los sourcemaps en Vite, se puede configurar la opción `devSourcemap` en el archivo `vite.config.js`.

```javascript
// vite.config.js
export default defineConfig({
  css: {
    devSourcemap: true,
  }
});
```
Esto generará sourcemaps para el CSS en modo desarrollo, lo que permitirá ver el código Sass original en las herramientas de desarrollo del navegador.

## Buenas prácticas
### Rendimiento
- Evita anidamientos excesivos: No anides más de 3 niveles.
- Modulariza tu código: Divide en archivos pequeños y enfocados.
- Usa placeholders para código compartido: Mejor que extender clases reales.
- Evita selectores muy específicos: Aumentan la especificidad y el tamaño del CSS.
- Usa mixins y funciones: Reutiliza código y evita duplicaciones.
- Usa variables para colores y tamaños: Mejora la mantenibilidad.
- Minimiza el uso de `@extend`: Puede generar CSS innecesario.
- Usa `@use` y `@forward`: Mejora la organización y evita colisiones de nombres.

### Mantenibilidad
- Documenta tus variables y mixins: Usa comentarios para explicar su uso.
```scss
/// Color primario de la aplicación
/// @type Color
$primary-color: #3498db;

/// Mixin para centrar elementos flexbox
/// @param {Boolean} $vertical [true] - Centrar verticalmente
/// @param {Boolean} $horizontal [true] - Centrar horizontalmente
@mixin flex-center($vertical: true, $horizontal: true) {
  display: flex;
  @if $vertical {
    align-items: center;
  }
  @if $horizontal {
    justify-content: center;
  }
}
```
- Usa variables para valores repetidos.
- Estructura clara de módulos con @forward y @use.
- Separa la lógica (mixins, funciones) de los estilos.

### Depuración
- **Usa @debug para imprimir valores:**
```scss
@debug "El valor de $width es #{$width}";
```

- **Lanza errores con @error:**
```scss
@mixin validate-params($value) {
  @if type-of($value) != 'number' {
    @error "El parámetro $value debe ser un número, recibido: #{type-of($value)}";
  }
}
```

- **Emite advertencias con @warn:**
```scss
@mixin check-params($value) {
  @if type-of($value) != 'number' {
    @warn "El parámetro $value debe ser un número, recibido: #{type-of($value)}";
  }
}
```
```scss
@mixin deprecated-mixin() {
  @warn "Este mixin está obsoleto y será removido en la próxima versión";
  // Código del mixin
}
```

## Recursos adicionales

Aquí tienes enlaces útiles para profundizar en Sass y Vite:

- [Documentación oficial de Sass](https://sass-lang.com/documentation/) - La referencia completa y actualizada para la sintaxis y características de Sass.
- [Guía de migración de @import a @use](https://sass-lang.com/documentation/at-rules/import/) - Guía detallada para actualizar código antiguo al nuevo sistema de módulos.
- [Documentación de Vite](https://vitejs.dev/guide/) - Referencia oficial para configurar y optimizar proyectos con Vite.
- [Sass Guidelines](https://sass-guidelin.es/) - Metodologías y buenas prácticas para mantener proyectos Sass escalables.
- [Awesome Sass](https://github.com/Famolus/awesome-sass) - Colección curada de recursos, bibliotecas y herramientas para Sass.
- [The Sass Way](https://thesassway.com/) - Blog con tutoriales y técnicas avanzadas para Sass.
- [CSS-Tricks: A Complete Guide to Sass](https://css-tricks.com/snippets/sass/) - Colección de snippets y trucos útiles.
- [Sassmeister](https://www.sassmeister.com/) - Playground online para probar código Sass.
- [Sass Maps Cheatsheet](https://dev.to/steelwolf180/sass-maps-cheatsheet-33n9) - Guía rápida sobre el uso de mapas en Sass.
- [Modern CSS with Sass & Vite](https://moderncss.dev/) - Técnicas modernas de CSS implementadas con Sass y Vite.