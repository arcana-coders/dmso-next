export interface Product {
    id: string;
    title: string;
    slug: string;
    category: 'liquido' | 'gel' | 'crema';
    price: string;
    image: string; // Helper for main image
    images: string[]; // Full gallery
    description?: string;
}

export const products: Product[] = [
    {
        "id": "1308",
        "title": "DMSO Líquido - 99.9% Pureza",
        "slug": "dmso-lquido-999-pureza-1308",
        "category": "liquido",
        "price": "$1,199.00",
        "images": [
            "/images/products/dmso-ng-webp.webp",
            "/images/products/dmso-puro.webp"
        ],
        "image": "/images/products/dmso-ng-webp.webp",
        "description": "Dimetilsulfóxido de alta pureza para uso industrial y farmacéutico  Al adquirir disolventes químicos de alta calidad, necesita más que un simple producto: necesita confianza. Nuestro dimetilsulfóxido ofrece rendimiento y tranquilidad. Ya sea en el sector farmacéutico, agroquímico, cosmético o de f..."
    },
    {
        "id": "1347",
        "title": "Dmso Líquido 473ml Sin BPA",
        "slug": "dmso-lquido-473ml-sin-bpa-1347",
        "category": "liquido",
        "price": "$1,399.00",
        "images": [
            "/images/products/dmsostore16oz.webp",
            "/images/products/dmsostore16oz2.webp",
            "/images/products/dmsostore16oz1.webp"
        ],
        "image": "/images/products/dmsostore16oz.webp",
        "description": "    DMSO Liquid DMSO México utiliza un proceso especial en frío para purificar y quitar cualquier exceso de sulfuro de dimetilo, el componente que hace que el DMSO huela a ajo, lo que resulta en un producto premium de muy bajo olor.              ¿Por qué comprar en DMSO México? DMSOS..."
    },
    {
        "id": "1352",
        "title": "3 Botes de Dmso Líquido 237 ml",
        "slug": "3-botes-de-dmso-lquido-237-ml-1352",
        "category": "liquido",
        "price": "$1,599.00",
        "images": [
            "/images/products/dmsostore3pack.webp",
            "/images/products/dmsostore3pack1.webp"
        ],
        "image": "/images/products/dmsostore3pack.webp",
        "description": "Características principales:  Alta pureza: Con una pureza del 99,995 %, este DMSO líquido cumple con estrictos estándares de calidad. Nuestro avanzado método de purificación en frío reduce el exceso de sulfuro de dimetilo, manteniendo así la integridad del producto. Envase sin BPA: La seguridad e..."
    },
    {
        "id": "1357",
        "title": "2 Botes Dmso Líquido 473ml",
        "slug": "2-botes-dmso-lquido-473ml-1357",
        "category": "liquido",
        "price": "$1,999.00",
        "images": [
            "/images/products/dmsostore2pack.webp",
            "/images/products/dmsostore16oz1.webp",
            "/images/products/dmsostore16oz2.webp"
        ],
        "image": "/images/products/dmsostore2pack.webp",
        "description": "       Líquido DMSO DMSO México utiliza un proceso especial en frío para purificar y eliminar cualquier exceso de sulfuro de dimetilo, el componente que hace que el DMSO huela a ajo, lo que resulta en un producto premium de muy bajo olor.             ¿Por qué comprar en DMSO México?..."
    },
    {
        "id": "1383",
        "title": "Crema DMSO Dr. Robaina 114 gramos",
        "slug": "crema-dmso-dr-robaina-114-gramos-1383",
        "category": "crema",
        "price": "$1,199.00",
        "images": [
            "/images/products/cremarobaina.webp",
            "/images/products/cremarobainab.webp",
            "/images/products/cremarobaina3.webp",
            "/images/products/cremarobaina2.webp",
            "/images/products/cremarobaina1.webp"
        ],
        "image": "/images/products/cremarobaina.webp",
        "description": "                              Descripción del producto Aplica una cantidad moderada en el área deseada y gentilmente da un masaje hasta que se absorba completamente. Puedes usar 2 a 3 veces al día o como sientas que es necesario.  Esta crema esta formulada para todo ..."
    },
    {
        "id": "1390",
        "title": "2 Botellas DMSO 99.9% Heiltropfen",
        "slug": "2-botellas-dmso-999-heiltropfen-1390",
        "category": "liquido",
        "price": "$1,499.00",
        "images": [
            "/images/products/dmsoheiltropfen.webp",
            "/images/products/dmsoheiltropfen1.webp"
        ],
        "image": "/images/products/dmsoheiltropfen.webp",
        "description": "  Botella de vidrio ámbar con punta de goma compatible y bombilla  Especialmente diseñado para garantizar que DMSO solo esté en contacto con el vidrio, preservando su pureza y eficacia. El DMSO puro al 99,9% tiene un estado líquido o sólido/cristalino de la materia, ya que tiene un punto de con..."
    },
    {
        "id": "1394",
        "title": "DMSO Líquido al 99.995% Botella Vidrio",
        "slug": "dmso-lquido-al-99995-botella-vidrio-1394",
        "category": "liquido",
        "price": "$1,499.00",
        "images": [
            "/images/products/dmsostorevidrio.webp",
            "/images/products/dmsostorevidrio3.webp",
            "/images/products/dmsostorevidrio1.webp",
            "/images/products/dmsostorevidrio2.webp"
        ],
        "image": "/images/products/dmsostorevidrio.webp",
        "description": "   Dimetilsulfóxido Odor Less DMSO, de vidrio, 8 oz (236ml), producto farmacéutico al 99.995%  Descripción del producto   Pharma Grade DMSO es un disolvente orgánico dipolar altamente aprótico muy distintivo con un punto de congelación de 64 grados F. DMSO por sí mismo es realmente inodoro, ..."
    },
    {
        "id": "1428",
        "title": "DMSO",
        "slug": "dmso-1428",
        "category": "liquido",
        "price": "$690.00",
        "images": [
            "/images/products/41tj0PZNl8L._AC_SL1500_.jpg",
            "/images/products/41mF8zlhoaL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/41tj0PZNl8L._AC_SL1500_.jpg",
        "description": "DMSO 4 oz. Este artículo se puede utilizar tópicamente o como disolvente...."
    },
    {
        "id": "1431",
        "title": "Frasco de 3 oz de dimetilsulfóxido (DMSO) de grado farmacéutico, 99,9995 % no diluido, inodoro, sin BPA",
        "slug": "frasco-de-3-oz-de-dimetilsulfxido-dmso-de-grado-farmacutico-999995-no-diluido-inodoro-sin-bpa-1431",
        "category": "liquido",
        "price": "$756.00",
        "images": [
            "/images/products/31C9pL0QIrL._AC_SL1500_.jpg",
            "/images/products/31i3qQLHQxL._AC_SL1500_.jpg",
            "/images/products/41Ic0CP0VaL._AC_SL1500_.jpg",
            "/images/products/41yKVhWj-L._AC_SL1500_.jpg",
            "/images/products/41BaQPTX4iL._AC_SL1500_.jpg",
            "/images/products/31cwxE8FRVL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/31C9pL0QIrL._AC_SL1500_.jpg",
        "description": "Grado farmacéutico DMSO es un disolvente orgánico altamente aprótico dipolar muy distintivo con un punto de congelación de 64 grados F. DMSO por sí mismo es realmente inodoro, lo que hace que el sulfóxido de dimetilo huele y sepa como cebolla o ajo es DMS (sulfuro de dimetilo). Los grados industrial..."
    },
    {
        "id": "1438",
        "title": "DMSO - Dimetil sulfóxido líquido de 8 onzas. Empaquetado en una botella estéril sin BPA sin diluir, ultra alta pureza, 99.995% de bajo olor, grado farmacéutico fabricado por DMSO México.",
        "slug": "dmso-dimetil-sulfxido-lquido-de-8-onzas-empaquetado-en-una-botella-estril-sin-bpa-sin-diluir-ultra-alta-pureza-99995-de-bajo-olor-grado-farmacutico-fabricado-por-dmso-store-1438",
        "category": "liquido",
        "price": "$852.00",
        "images": [
            "/images/products/31QiqYcvN4L._AC_SL1500_.jpg",
            "/images/products/41mwMxUyuoL._AC_SL1500_.jpg",
            "/images/products/31a-KF-TgeL._AC_SL1500_.jpg",
            "/images/products/21Ymbexf2L._AC_SL1500_.jpg",
            "/images/products/21L0dQkoZML._AC_SL1500_.jpg",
            "/images/products/41TnKqQI4L._AC_SL1500_.jpg"
        ],
        "image": "/images/products/31QiqYcvN4L._AC_SL1500_.jpg",
        "description": "DMSO México Dimethyl Sulfoxide se purifica para tener muy poco olor eliminando el exceso de sulfato de dimetilo que huele similar al ajo. Si DMSO tiene mal olor, generalmente indica su grado industrial.\nDMSO México 99.995% Dimethyl Sulfoxide se fabrica utilizando la mejor tecnología disponible. Todos ..."
    },
    {
        "id": "1445",
        "title": "DMSO Gel con Aloe Vera, 4 onzas",
        "slug": "dmso-gel-con-aloe-vera-4-onzas-1445",
        "category": "gel",
        "price": "$906.00",
        "images": [
            "/images/products/511KHnbJIlL._AC_SL1500_.jpg",
            "/images/products/51c97Hza3dL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/511KHnbJIlL._AC_SL1500_.jpg",
        "description": "DMSO Gel con Aloe Vera, 4 onzas..."
    },
    {
        "id": "1448",
        "title": "DMSO CREMA, ROSA 70/30 ALOE, 4 OZ",
        "slug": "dmso-crema-rosa-7030-aloe-4-oz-1448",
        "category": "crema",
        "price": "$913.00",
        "images": [
            "/images/products/41LHxJUHy0L._AC_SL1500_.jpg",
            "/images/products/41VlrPgSzcL._AC_SL1500_.jpg",
            "/images/products/41ET71fzS2L._AC_SL1500_.jpg",
            "/images/products/315GsTGkJtL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/41LHxJUHy0L._AC_SL1500_.jpg",
        "description": "DMSO es un líquido algo de aceite que se parece al aceite mineral y tiene un olor ligeramente a ajo. Es una sustancia natural derivada de la pulpa de madera y es inofensiva cuando se usa con las precauciones adecuadas. Se vende como disolvente. DMSO es una sustancia increíble que tiene muchos usos e..."
    },
    {
        "id": "1453",
        "title": "Earth Harmony DMSO grado farmacéutico 99.9% (sulfóxido de dimetilo) pureza - DMSO líquido 99.9% puro con cuentagotas (2 onzas)",
        "slug": "earth-harmony-dmso-grado-farmacutico-999-sulfxido-de-dimetilo-pureza-dmso-lquido-999-puro-con-cuentagotas-2-onzas-1453",
        "category": "liquido",
        "price": "$915.00",
        "images": [
            "/images/products/31FBjORXUhL._AC_SL1500_.jpg",
            "/images/products/41bTUhHHATL._AC_SL1500_.jpg",
            "/images/products/41kBDSEVfKL._AC_SL1500_.jpg",
            "/images/products/41hmBWXU-1L._AC_SL1500_.jpg",
            "/images/products/41Q7QrpyfCL._AC_SL1500_.jpg",
            "/images/products/41t0PKfHJoL._AC_SL1500_.jpg",
            "/images/products/516qxX3nuFL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/31FBjORXUhL._AC_SL1500_.jpg",
        "description": "DMSO..."
    },
    {
        "id": "1461",
        "title": "DMSO Gel 70/30 - Sin fragancia - 4 oz - 99% DMSO Puro - DMSO México",
        "slug": "dmso-gel-7030-sin-fragancia-4-oz-99-dmso-puro-naturess-gift-1461",
        "category": "gel",
        "price": "$915.00",
        "images": [
            "/images/products/51QuWFUcDL._AC_SL1500_.jpg",
            "/images/products/51S6qUTTppL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/51QuWFUcDL._AC_SL1500_.jpg",
        "description": "DMSO México DMSO - Gel sin fragancia, 4 onzas DMSO se ha utilizado durante más de 100 años. Es una sustancia natural derivada de la pulpa de madera y es inofensiva cuando se usa con las precauciones adecuadas. Se vende como disolvente. DMSO es una sustancia increíble que tiene muchos usos en todo ..."
    },
    {
        "id": "1464",
        "title": "Dr. Robaina DMSO Roll-On - Cuidado de la piel de rápida absorción con árnica, magnesio, aloe vera y vitamina E | Fórmula no grasa para comodidad muscular y articular | Fabricado en los Estados Unidos",
        "slug": "dr-robaina-dmso-roll-on-cuidado-de-la-piel-de-rpida-absorcin-con-rnica-magnesio-aloe-vera-y-vitamina-e-frmula-no-grasa-para-comodidad-muscular-y-articular-fabricado-en-los-estados-unidos-1464",
        "category": "liquido",
        "price": "$955.00",
        "images": [
            "/images/products/41Woj6WJKL._AC_SL1500_.jpg",
            "/images/products/41rzsXkb7kL._AC_SL1500_.jpg",
            "/images/products/41z6Ogql1AL._AC_SL1500_.jpg",
            "/images/products/41WX7DGtocL._AC_SL1500_.jpg",
            "/images/products/41HuFfB7mkL._AC_SL1500_.jpg",
            "/images/products/41PDMCnxffL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/41Woj6WJKL._AC_SL1500_.jpg",
        "description": "Comodidad específica para músculos y articulaciones: diseñado para apoyar la comodidad muscular y articular, perfecto para el uso diario.\nIngredientes nutritivos: combina árnica, magnesio, aloe vera y vitamina E para ayudar a calmar e hidratar la piel.\nFácil aplicación: el práctico diseño enrollable..."
    },
    {
        "id": "1471",
        "title": "70% DMSO - Ingredientes de grado farmacéutico | Dimetilsulfóxido líquido 3.4 oz - 3.4 fl oz | Alta pureza | Bajo olor | Heiltropfen® DMSO Liquid 70/30",
        "slug": "70-dmso-ingredientes-de-grado-farmacutico-dimetilsulfxido-lquido-34-oz-34-fl-oz-alta-pureza-bajo-olor-heiltropfen-dmso-liquid-7030-1471",
        "category": "liquido",
        "price": "$958.00",
        "images": [
            "/images/products/31MNZdKdL._AC_SL1500_.jpg",
            "/images/products/31usFLtgLxL._AC_SL1500_.jpg",
            "/images/products/41JBNzbAzGL._AC_SL1500_.jpg",
            "/images/products/41X7o94fR6L._AC_SL1500_.jpg",
            "/images/products/41sagJGYvfL._AC_SL1500_.jpg",
            "/images/products/31eYr5aOBL._AC_SL1500_.jpg",
            "/images/products/41fZCOLdWIL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/31MNZdKdL._AC_SL1500_.jpg",
        "description": "Bajo olor, alta pureza. Ingredientes de grado farmacéutico. 70% DMSO líquido. El sulfóxido de dimetilo (DMSO) es un subproducto del procesamiento de la madera\nBotella de vidrio con pipeta.\nFabricado en la UE.\nEmbalado en tubo de cartón resistente y duro: protección ideal para viajes y viajes.\nDesplá..."
    },
    {
        "id": "1479",
        "title": "DMSO Roll On 70/30 Aloe Plast - 3 oz - Líquido",
        "slug": "dmso-roll-on-7030-aloe-plast-3-oz-lquido-1479",
        "category": "liquido",
        "price": "$964.00",
        "images": [
            "/images/products/31SK5LgxUSL._AC_SL1500_.jpg",
            "/images/products/314mHaIq9qL._AC_SL1500_.jpg",
            "/images/products/31bPDxUVeL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/31SK5LgxUSL._AC_SL1500_.jpg",
        "description": "DMSO Roll On 70/30 Aloe Plast - 3 oz - Líquido..."
    },
    {
        "id": "1483",
        "title": "DMSO 70% con agua desmineralizada 30% - Botella de vidrio 3.38oz con cuentagotas",
        "slug": "dmso-70-con-agua-desmineralizada-30-botella-de-vidrio-338oz-con-cuentagotas-1483",
        "category": "liquido",
        "price": "$980.00",
        "images": [
            "/images/products/51k1IzGTrkL._AC_SL1500_.jpg",
            "/images/products/51UIrLQVgCL._AC_SL1500_.jpg",
            "/images/products/416bY7kh97L._AC_SL1500_.jpg",
            "/images/products/414eh433FL._AC_SL1500_.jpg",
            "/images/products/51g6qqHLCyL._AC_SL1500_.jpg",
            "/images/products/41SHHMyFzSL._AC_SL1500_.jpg",
            "/images/products/51wXAmBmIL.SS125_PKplay-button-mb-image-grid-small_.jpg"
        ],
        "image": "/images/products/51k1IzGTrkL._AC_SL1500_.jpg",
        "description": "DMSO 70% con agua desmineralizada 30% en una mezcla de grado farmacéutico proporciona una calidad de alta pureza combinada con agua desmineralizada pura para un uso versátil.\nDisolvente universal multiusos y solución versátil con propiedades naturales. Disolvente natural y orgánico.\nAlmacenado en un..."
    },
    {
        "id": "1491",
        "title": "Solución DMSO Pharma Grade, 48 onzas, 99,99%. Absolutamente inodora",
        "slug": "solucin-dmso-pharma-grade-48-onzas-9999-absolutamente-inodora-1491",
        "category": "liquido",
        "price": "$1,005.00",
        "images": [
            "/images/products/41z6JHbpYXL._AC_SL1500_.jpg",
            "/images/products/41ZUiz9w9bL._AC_SL1500_.jpg",
            "/images/products/416FV0wAMTL._AC_SL1500_.jpg",
            "/images/products/41OQsJreDL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/41z6JHbpYXL._AC_SL1500_.jpg",
        "description": "16oz DMSO..."
    },
    {
        "id": "1496",
        "title": "DMSO Crema con aloe vera, aroma de rosa, 4 oz, 4, Un solo color",
        "slug": "dmso-crema-con-aloe-vera-aroma-de-rosa-4-oz-4-un-solo-color-1496",
        "category": "crema",
        "price": "$1,009.00",
        "images": [
            "/images/products/51-2rcRTIxL._AC_SL1500_.jpg",
            "/images/products/51M3GWSKNSL._AC_SL1500_.jpg",
            "/images/products/51lnJAvk-L._AC_SL1500_.jpg",
            "/images/products/514HuMpckLL._AC_SL1500_.jpg",
            "/images/products/410zSTROMaL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/51-2rcRTIxL._AC_SL1500_.jpg",
        "description": "Almendras tostadas enteras, anacardos y pistachos. Arándanos agrios y manzanas endulzadas. u00A0Lleva un poco en tu próxima aventura...."
    },
    {
        "id": "1502",
        "title": "Gotas líquidas DMSO con pipeta (1.7 fl oz) | sulfóxido de dimetilo | 99.9% DMSO puro grado farmacéutico | Actuación rápida tópica | NEW ROOTS HERBAL",
        "slug": "gotas-lquidas-dmso-con-pipeta-17-fl-oz-sulfxido-de-dimetilo-999-dmso-puro-grado-farmacutico-actuacin-rpida-tpica-new-roots-herbal-1502",
        "category": "liquido",
        "price": "$1,009.00",
        "images": [
            "/images/products/41okT37-XeL._AC_SL1500_.jpg",
            "/images/products/41RVDfa5YjL._AC_SL1500_.jpg",
            "/images/products/41Ke5WLuHYL._AC_SL1500_.jpg",
            "/images/products/41Hdwj1ptCL._AC_SL1500_.jpg",
            "/images/products/41vkcjfD-vL._AC_SL1500_.jpg",
            "/images/products/41n-k7wHnL._AC_SL1500_.jpg",
            "/images/products/41c6bNJ4DTL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/41okT37-XeL._AC_SL1500_.jpg",
        "description": "✅ Acción rápida y potente: DMSO entrega donde importa. Cuando se necesita una solución que funcione rápidamente, DMSO (sulfóxido de dimetilo) es un compuesto altamente potente diseñado para aplicaciones específicas. Conocido por su excepcional absorción, penetra sin esfuerzo en las membranas tisular..."
    },
    {
        "id": "1510",
        "title": "DMSO - Dimetilsulfóxido | Pipeta + Spray 3.4 oz - 3.4 fl oz | Ingredientes de grado farmacéutico | Alta pureza | Bajo olor | Heiltropfen®",
        "slug": "dmso-dimetilsulfxido-pipeta-spray-34-oz-34-fl-oz-ingredientes-de-grado-farmacutico-alta-pureza-bajo-olor-heiltropfen-1510",
        "category": "liquido",
        "price": "$1,009.00",
        "images": [
            "/images/products/31aSUyG1DKL._AC_SL1500_.jpg",
            "/images/products/41vXbOzpQ8L._AC_SL1500_.jpg",
            "/images/products/41d96tnKZsL._AC_SL1500_.jpg",
            "/images/products/41SlRWEL5OL._AC_SL1500_.jpg",
            "/images/products/41XAQABJmBL._AC_SL1500_.jpg",
            "/images/products/31zS3n1VBOL._AC_SL1500_.jpg",
            "/images/products/41OKrLJ8KFL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/31aSUyG1DKL._AC_SL1500_.jpg",
        "description": "Bajo olor, alta pureza. Ingredientes de grado farmacéutico. DMSO líquido puro. El sulfóxido de dimetilo (DMSO) es un subproducto del procesamiento de la madera\nBotella de vidrio con gotero y spray añadido.\nFabricado en la UE.\nEl DMSO puro al 99,9% tiene un estado líquido o sólido/cristalino de la ma..."
    },
    {
        "id": "1518",
        "title": "Mezcla de aceite DMSO y magnesio por el Dr. Hartmut Fischer (3.4 onzas), ingredientes de grado farmacéutico, alta pureza, bajo olor, Heiltropfen®",
        "slug": "mezcla-de-aceite-dmso-y-magnesio-por-el-dr-hartmut-fischer-34-onzas-ingredientes-de-grado-farmacutico-alta-pureza-bajo-olor-heiltropfen-1518",
        "category": "liquido",
        "price": "$1,035.00",
        "images": [
            "/images/products/31QS5Y01SkL._AC_SL1500_.jpg",
            "/images/products/313DzGwj4bL._AC_SL1500_.jpg",
            "/images/products/416UFbDXIDL._AC_SL1500_.jpg",
            "/images/products/41Ci8sepD4L._AC_SL1500_.jpg",
            "/images/products/31-GV4vfBOL._AC_SL1500_.jpg",
            "/images/products/414mEZCAHGL._AC_SL1500_.jpg",
            "/images/products/41U390r1DiL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/31QS5Y01SkL._AC_SL1500_.jpg",
        "description": "Receta original de DMSO y aceite de magnesio por el Dr. Hartmut Fischer\nBotella de vidrio con pipeta/gotero.\nIngredientes de grado farmacéutico. DMSO líquido puro y cloruro de magnesio\nUna mezcla pura sin conservantes ni productos químicos añadidos.\nEmbalado en tubo de cartón resistente y duro: prot..."
    },
    {
        "id": "1526",
        "title": "DMSO Suplemento puro, 8 onzas líquidas",
        "slug": "dmso-suplemento-puro-8-onzas-lquidas-1526",
        "category": "liquido",
        "price": "$1,045.00",
        "images": [
            "/images/products/411wABUyUsL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/411wABUyUsL._AC_SL1500_.jpg",
        "description": "DMSO DMSO puro. Descripción: Regalo de la naturaleza. 99.9% DMSO puro. El sulfóxido de dimetilo (DMSO) es un compuesto químico que es un subproducto del procesamiento de la madera. Es un líquido algo aceitoso que parece aceite mineral y tiene un olor ligeramente a ajo. Se ha utilizado durante mucho ..."
    },
    {
        "id": "1528",
        "title": "DMSO grado farmacéutico con 99.9% de pureza y bajo olor, botella de vidrio de 3.38 onzas (sulfóxido de dimetilo) con cuentagotas",
        "slug": "dmso-grado-farmacutico-con-999-de-pureza-y-bajo-olor-botella-de-vidrio-de-338-onzas-sulfxido-de-dimetilo-con-cuentagotas-1528",
        "category": "liquido",
        "price": "$1,076.00",
        "images": [
            "/images/products/51CvvwepADL._AC_SL1500_.jpg",
            "/images/products/518MJ6aSMHL._AC_SL1500_.jpg",
            "/images/products/41VdnunrnPL._AC_SL1500_.jpg",
            "/images/products/51OFLwuPn9L._AC_SL1500_.jpg",
            "/images/products/415kQzuHzL._AC_SL1500_.jpg",
            "/images/products/511z2pannL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/51CvvwepADL._AC_SL1500_.jpg",
        "description": "El DMSO (sulfóxido de dimetilo) es un líquido 99.9% puro y casi inodoro derivado del procesamiento de la madera, ofreciendo una calidad excepcional de grado farmacéutico.\nEl producto está empaquetado en una botella de vidrio con un gotero de precisión que garantiza un manejo seguro y una aplicación ..."
    },
    {
        "id": "1535",
        "title": "Dr. Robaina Crema DMSO de lavanda – 99.9% de grado farmacéutico puro | Fórmula nutritiva para la piel con magnesio Zechstein, árnica, aloe vera, vitamina E – 4 onzas | Fabricado en Estados Unidos",
        "slug": "dr-robaina-crema-dmso-de-lavanda-999-de-grado-farmacutico-puro-frmula-nutritiva-para-la-piel-con-magnesio-zechstein-rnica-aloe-vera-vitamina-e-4-onzas-fabricado-en-estados-unidos-1535",
        "category": "crema",
        "price": "$1,076.00",
        "images": [
            "/images/products/41HU67mWFsL._AC_SL1500_.jpg",
            "/images/products/41CTGhVcwwL._AC_SL1500_.jpg",
            "/images/products/41USlLMhVBL._AC_SL1500_.jpg",
            "/images/products/41jGMqor9L._AC_SL1500_.jpg",
            "/images/products/41Wkixe6w5L._AC_SL1500_.jpg",
            "/images/products/41UpQqsGkDL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/41HU67mWFsL._AC_SL1500_.jpg",
        "description": "DMSO de grado farmacéutico puro al 99.9%: experimente DMSO de la más alta calidad, cuidadosamente formulado para proporcionar alivio y apoyo efectivo para su piel, músculos y articulaciones.\nIngredientes nutritivos para la piel: Infundida con magnesio Zechstein, árnica, aloe vera y vitamina E, esta ..."
    },
    {
        "id": "1542",
        "title": "Dr. Robaina DMSO Gel - 99.9% de grado farmacéutico puro | Fórmula de alivio de la piel con magnesio Zechstein, árnica, aloe vera, vitamina E | Comodidad muscular y articular | 4 onzas | Fabricado en",
        "slug": "dr-robaina-dmso-gel-999-de-grado-farmacutico-puro-frmula-de-alivio-de-la-piel-con-magnesio-zechstein-rnica-aloe-vera-vitamina-e-comodidad-muscular-y-articular-4-onzas-fabricado-en-1542",
        "category": "gel",
        "price": "$1,076.00",
        "images": [
            "/images/products/41ebFhvFznL._AC_SL1500_.jpg",
            "/images/products/4158p0unhHL._AC_SL1500_.jpg",
            "/images/products/41JcidJQOnL._AC_SL1500_.jpg",
            "/images/products/41MbbNbVGVL._AC_SL1500_.jpg",
            "/images/products/41LLrYpfKYL._AC_SL1500_.jpg",
            "/images/products/41LLNIRRoxL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/41ebFhvFznL._AC_SL1500_.jpg",
        "description": "Principales beneficios: Experimenta un alivio de acción rápida y duradero del dolor muscular y articular, lo que te permite reanudar las actividades diarias con facilidad y comodidad.\nIngredientes premium: Formulado con potentes ingredientes naturales que incluyen DMSO para la penetración profunda d..."
    },
    {
        "id": "1549",
        "title": "Dr. Robaina DMSO Lavender Roll-On - Alivio definitivo del dolor y nutrición de la piel | 99.9% de grado farmacéutico puro con árnica, magnesio, aloe vera, vitamina E | Fabricado en los Estados Unidos",
        "slug": "dr-robaina-dmso-lavender-roll-on-alivio-definitivo-del-dolor-y-nutricin-de-la-piel-999-de-grado-farmacutico-puro-con-rnica-magnesio-aloe-vera-vitamina-e-fabricado-en-los-estados-unidos-1549",
        "category": "liquido",
        "price": "$1,076.00",
        "images": [
            "/images/products/41Jfq93t5CL._AC_SL1500_.jpg",
            "/images/products/41p-Ui0hj5L._AC_SL1500_.jpg",
            "/images/products/41J6aodw9-L._AC_SL1500_.jpg",
            "/images/products/41JYB212CpL._AC_SL1500_.jpg",
            "/images/products/41wkcSs0pIL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/41Jfq93t5CL._AC_SL1500_.jpg",
        "description": "Alivio del dolor de acción rápida: experimente un alivio inmediato de las molestias articulares y musculares con el Roll-On DMSO de lavanda del Dr. Robaina, diseñado para atacar el dolor en su origen.\nPotentes ingredientes naturales: infundida con magnesio Zechstein, árnica, aloe vera y vitamina E, ..."
    },
    {
        "id": "1555",
        "title": "DMSO Liquid 70/30 - 8 oz - 99.9% DMSO puro - Se cree que ayuda a estimular los procesos celulares",
        "slug": "dmso-liquid-7030-8-oz-999-dmso-puro-se-cree-que-ayuda-a-estimular-los-procesos-celulares-1555",
        "category": "liquido",
        "price": "$1,077.00",
        "images": [
            "/images/products/41uJbhLHu7L._AC_SL1500_.jpg",
            "/images/products/51GaWrlxI6L._AC_SL1500_.jpg"
        ],
        "image": "/images/products/41uJbhLHu7L._AC_SL1500_.jpg",
        "description": "DMSO México DMSO - Líquido sin fragancia - 4 oz. DMSO se ha utilizado durante más de 100 años en los Estados Unidos. Es una sustancia natural derivada de la pulpa de madera y es inofensiva cuando se usa con las precauciones adecuadas. Se vende como disolvente. DMSO es una sustancia increíble que t..."
    },
    {
        "id": "1558",
        "title": "DMSO 70/30 16 oz. Gel con agua destilada 99.995% puro DMSO de bajo olor grado farmacéutico dimetilsulfóxido",
        "slug": "dmso-7030-16-oz-gel-con-agua-destilada-99995-puro-dmso-de-bajo-olor-grado-farmacutico-dimetilsulfxido-1558",
        "category": "gel",
        "price": "$1,092.00",
        "images": [
            "/images/products/41J4tD3r1IL._AC_SL1500_.jpg",
            "/images/products/51pZwjWj6nL._AC_SL1500_.jpg",
            "/images/products/41juHWpqJ4L._AC_SL1500_.jpg",
            "/images/products/41AeU3-KRtL._AC_SL1500_.jpg",
            "/images/products/31uwupQpMbL._AC_SL1500_.jpg",
            "/images/products/411L7DFRpL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/41J4tD3r1IL._AC_SL1500_.jpg",
        "description": "El DMSO de grado farmacéutico (sulfóxido de dimetilo) es un disolvente orgánico dipolar altamente aprótico muy distintivo con un punto de congelación de 64 grados F. Si su DMSO llega con cristales o se ha solidificado, se puede convertir de nuevo en un líquido permitiendo que se descongele por encim..."
    },
    {
        "id": "1565",
        "title": "DMSO México DMSO líquido 99.9% puro, plástico, 8 onzas líquidas",
        "slug": "natures-gift-dmso-lquido-999-puro-plstico-8-onzas-lquidas-1565",
        "category": "liquido",
        "price": "$1,107.00",
        "images": [
            "/images/products/41Ma3jj6TIL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/41Ma3jj6TIL._AC_SL1500_.jpg",
        "description": "DMSO México 99.9% Pure DMSO Liquid, plástico, 8 onzas líquidas..."
    },
    {
        "id": "1567",
        "title": "DMSO Gel con aloe vera | Mezcla de dimetilsulfóxido de grado farmacéutico 70/30 | tarro de plástico sin BPA de 16 onzas (1 libra)",
        "slug": "dmso-gel-con-aloe-vera-mezcla-de-dimetilsulfxido-de-grado-farmacutico-7030-tarro-de-plstico-sin-bpa-de-16-onzas-1-libra-1567",
        "category": "gel",
        "price": "$1,108.00",
        "images": [
            "/images/products/41HYRzOrLSL._AC_SL1500_.jpg",
            "/images/products/31Fk8vSX7tL._AC_SL1500_.jpg",
            "/images/products/51mWcAkB0DL._AC_SL1500_.jpg",
            "/images/products/31-zih9-RcL._AC_SL1500_.jpg",
            "/images/products/410diosRA-L._AC_SL1500_.jpg"
        ],
        "image": "/images/products/41HYRzOrLSL._AC_SL1500_.jpg",
        "description": "70/30 DMSO-Aloe Vera Gel mezcla es una combinación perfecta para aquellos que buscan un DMSO diluido.\nAlta pureza y bajo olor: Aseguramos una experiencia de bajo olor con nuestro 99.995% puro grado farmacéutico DMSO, purificado para eliminar cualquier olor no deseado.\nAloe Vera purificado: Este gel ..."
    },
    {
        "id": "1573",
        "title": "DMSO 99.9% grado farmacéutico, dimetilsulfóxido líquido puro, 8 onzas líquidas en botella de vidrio, sin diluir, de bajo olor",
        "slug": "dmso-999-grado-farmacutico-dimetilsulfxido-lquido-puro-8-onzas-lquidas-en-botella-de-vidrio-sin-diluir-de-bajo-olor-1573",
        "category": "liquido",
        "price": "$1,140.00",
        "images": [
            "/images/products/51DUbdzjR1L._AC_SL1500_.jpg",
            "/images/products/51lp4G6q95L._AC_SL1500_.jpg",
            "/images/products/51pfNHkus9L._AC_SL1500_.jpg",
            "/images/products/51M9m1mA39L._AC_SL1500_.jpg",
            "/images/products/51wVt29UmkL._AC_SL1500_.jpg",
            "/images/products/519exo3Lp7L._AC_SL1500_.jpg"
        ],
        "image": "/images/products/51DUbdzjR1L._AC_SL1500_.jpg",
        "description": "99.9% de pureza más alta - El dimetilsulfóxido de grado farmacéutico con 99.9% de pureza se fabrica utilizando técnicas especiales disponibles. Diseñado para clientes que necesitan solventes premium de calidad excepcional.\nEmbalaje seguro y de calidad: todos nuestros productos están embotellados en ..."
    },
    {
        "id": "1580",
        "title": "Dimetil sulfóxido (DMSO) 99.95% líquido puro | 8 oz. DMSO grado farmacéutico sin diluir | Sin diluir e inodoro, contenido en botella de vidrio de alta calidad",
        "slug": "dimetil-sulfxido-dmso-9995-lquido-puro-8-oz-dmso-grado-farmacutico-sin-diluir-sin-diluir-e-inodoro-contenido-en-botella-de-vidrio-de-alta-calidad-1580",
        "category": "liquido",
        "price": "$1,172.00",
        "images": [
            "/images/products/41UAJlitvBL._AC_SL1500_.jpg",
            "/images/products/51n4EGYXw4L._AC_SL1500_.jpg",
            "/images/products/51ogNlWuFtL._AC_SL1500_.jpg",
            "/images/products/41Q4EkzvprL._AC_SL1500_.jpg",
            "/images/products/41kLxI5QhUL._AC_SL1500_.jpg",
            "/images/products/41iK83YjKVL._AC_SL1500_.jpg",
            "/images/products/51zmcYZENZL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/41UAJlitvBL._AC_SL1500_.jpg",
        "description": "Disulfóxido de dimetilo de ultra alta pureza (DMSO) para uso médico, de laboratorio e industrial. Empaquetado en botellas de vidrio sin BPA para garantizar la seguridad y la estabilidad.\nPurificado al 99.9% de pureza con un olor mínimo, ofreciendo una calidad excepcional de grado médico.\nUn disolven..."
    },
    {
        "id": "1588",
        "title": "DMSO 8 oz. Líquido en una botella de vidrio estéril, puro 99.995% grado farmacéutico, no diluido, bajo olor, dimetilsulfóxido fabricado por DMSO México",
        "slug": "dmso-8-oz-lquido-en-una-botella-de-vidrio-estril-puro-99995-grado-farmacutico-no-diluido-bajo-olor-dimetilsulfxido-fabricado-por-dmso-store-1588",
        "category": "liquido",
        "price": "$1,285.00",
        "images": [
            "/images/products/31vVhzRhcSL._AC_SL1500_.jpg",
            "/images/products/41xx826W2EL._AC_SL1500_.jpg",
            "/images/products/41NPvhqUbvL._AC_SL1500_.jpg",
            "/images/products/41vrq3wgpwL._AC_SL1500_.jpg",
            "/images/products/41a9lUA9vQL._AC_SL1500_.jpg",
            "/images/products/41eFGrJTJmL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/31vVhzRhcSL._AC_SL1500_.jpg",
        "description": "DMSO México Dimethyl Sulfoxide se purifica para ser muy bajo olor mediante el uso de un proceso frío especial que ayuda a eliminar cualquier exceso de sulfuro de dimetilo que es el compuesto que lo hace oler a ajo. Los grados inferiores de DMSO tendrán un olor ofensivo y generalmente indican su grado..."
    },
    {
        "id": "1595",
        "title": "DMSO Pharma Grade 99.9% Ph. EUR. 8.45 fl oz - 8.5 fl oz | DMSO líquido puro en botella de vidrio ámbar | Sin diluir e inodoro | Fabricado en Alemania",
        "slug": "dmso-pharma-grade-999-ph-eur-845-fl-oz-85-fl-oz-dmso-lquido-puro-en-botella-de-vidrio-mbar-sin-diluir-e-inodoro-fabricado-en-alemania-1595",
        "category": "liquido",
        "price": "$1,362.00",
        "images": [
            "/images/products/41Lr3tiwoL._AC_SL1500_.jpg",
            "/images/products/41pcFTg99IL._AC_SL1500_.jpg",
            "/images/products/41YYNKHijkL._AC_SL1500_.jpg",
            "/images/products/41ByvS9GprL._AC_SL1500_.jpg",
            "/images/products/41xJ9-IQtCL._AC_SL1500_.jpg",
            "/images/products/41WTvNoBBDL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/41Lr3tiwoL._AC_SL1500_.jpg",
        "description": "¿Qué es DMSO?\n\nDMSO es un disolvente bipolar orgánico con un tacto aceitoso que es inodoro e incoloro. Originalmente se obtuvo durante el procesamiento de madera natural.\n\nNuestro DMSO (C2H6OS) tiene una pureza certificada del 99.9% y se llena en botella de vidrio ámbar. Estas botellas de vidrio son..."
    },
    {
        "id": "1602",
        "title": "DMSO 3 oz. Rollo en 4 botellas Especial No diluido 99.995% Líquido de bajo olor grado farmacéutico en un recipiente sin BPA",
        "slug": "dmso-3-oz-rollo-en-4-botellas-especial-no-diluido-99995-lquido-de-bajo-olor-grado-farmacutico-en-un-recipiente-sin-bpa-1602",
        "category": "liquido",
        "price": "$1,493.00",
        "images": [
            "/images/products/41kbTndHWNL._AC_SL1500_.jpg",
            "/images/products/31TDMiHi-xL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/41kbTndHWNL._AC_SL1500_.jpg",
        "description": "Grado farmacéutico DMSO (sulfóxido de dimetilo) es un disolvente orgánico altamente aprótico dipolar muy distintivo con un punto de congelación de 64 grados F. DMSO por sí mismo es realmente inodoro, lo que hace que el sulfóxido de dimetilo huele y sepa como cebolla o ajo es DMS (sulfuro de dimetilo..."
    },
    {
        "id": "1605",
        "title": "DMSO puro en una botella de vidrio, dimetil sulfóxido líquido puro 16.9 onzas, no diluido, bajo olor",
        "slug": "dmso-puro-en-una-botella-de-vidrio-dimetil-sulfxido-lquido-puro-169-onzas-no-diluido-bajo-olor-1605",
        "category": "liquido",
        "price": "$1,525.00",
        "images": [
            "/images/products/31J-zLv6jL._AC_SL1500_.jpg",
            "/images/products/316y3aNpPL._AC_SL1500_.jpg",
            "/images/products/519caA0vmKL._AC_SL1500_.jpg",
            "/images/products/41xRLTUm67L._AC_SL1500_.jpg",
            "/images/products/41d3GhBlSWL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/31J-zLv6jL._AC_SL1500_.jpg",
        "description": "El DMSO se utiliza principalmente en química como disolvente aprótico. La elección del proceso utilizado en diversas aplicaciones es responsabilidad exclusiva del usuario..."
    },
    {
        "id": "1611",
        "title": "99.9% DMSO puro en una botella de vidrio, dimetilsulfóxido líquido puro de 16.9 onzas, no diluido, bajo olor",
        "slug": "999-dmso-puro-en-una-botella-de-vidrio-dimetilsulfxido-lquido-puro-de-169-onzas-no-diluido-bajo-olor-1611",
        "category": "liquido",
        "price": "$1,525.00",
        "images": [
            "/images/products/31M4hEXPaFL._AC_SL1500_.jpg",
            "/images/products/31gurpt5X-L._AC_SL1500_.jpg",
            "/images/products/41W8WMlxddL._AC_SL1500_.jpg",
            "/images/products/41Dy5ie7fzL._AC_SL1500_.jpg",
            "/images/products/41xN37BLPbL._AC_SL1500_.jpg",
            "/images/products/41kQPt4VweL._AC_SL1500_.jpg",
            "/images/products/41Ors7y67L._AC_SL1500_.jpg"
        ],
        "image": "/images/products/31M4hEXPaFL._AC_SL1500_.jpg",
        "description": "99.9% de pureza más alta: bajo olor, alta pureza. 99,9% Pure Liquid DMSO se fabrica utilizando la tecnología especial disponible para fabricar.\nEl DMSO se utiliza principalmente en química como disolvente aprótico. La elección del proceso utilizado en diversas aplicaciones es responsabilidad exclusi..."
    },
    {
        "id": "1619",
        "title": "Herbal Mana Incienso DMSO Gel con Ácido Hialurónico",
        "slug": "herbal-mana-incienso-dmso-gel-con-cido-hialurnico-1619",
        "category": "gel",
        "price": "$1,556.00",
        "images": [
            "/images/products/415YdtYtgBL._AC_SL1500_.jpg",
            "/images/products/51vw3we7T4L._AC_SL1500_.jpg",
            "/images/products/51XhJfQ9mSL._AC_SL1500_.jpg",
            "/images/products/51HuhbQ4-UL._AC_SL1500_.jpg",
            "/images/products/51BPT9PXNVL._AC_SL1500_.jpg",
            "/images/products/51PM2Hh0RoL._AC_SL1500_.jpg",
            "/images/products/51mZjXru3pL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/415YdtYtgBL._AC_SL1500_.jpg",
        "description": "DMSO de pureza #1 (99.995% puro de grado farmacéutico). Este potente ingrediente se utiliza en muchos de nuestros productos por sus propiedades naturales y eficaces de alivio.\nGel 100% natural para aliviar las articulaciones: el gel DMSO puro de grado farmacéutico alivia las articulaciones, las mano..."
    },
    {
        "id": "1627",
        "title": "Herbal Mana Crema DMSO de incienso para el dolor articular | Royal Warrior",
        "slug": "herbal-mana-crema-dmso-de-incienso-para-el-dolor-articular-royal-warrior-1627",
        "category": "crema",
        "price": "$1,556.00",
        "images": [
            "/images/products/41Ckt3eBF-L._AC_SL1500_.jpg",
            "/images/products/51VP-1x42jL._AC_SL1500_.jpg",
            "/images/products/518gJSbSiL._AC_SL1500_.jpg",
            "/images/products/51nqhC53PRL._AC_SL1500_.jpg",
            "/images/products/51AVOPW8N2L._AC_SL1500_.jpg",
            "/images/products/41zta1neI3L._AC_SL1500_.jpg",
            "/images/products/41tcbnGgqvL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/41Ckt3eBF-L._AC_SL1500_.jpg",
        "description": "Alivio instantáneo y duradero: esta crema está hecha con 99.995% DMSO de grado farmacéutico, un ingrediente de acción rápida que se absorbe en la piel rápidamente para ofrecer un alivio específico justo cuando lo necesitas. Llévalo contigo donde quiera que vayas, para un alivio superior en cualquier..."
    },
    {
        "id": "1635",
        "title": "DMSO Gel - Contenedor sin BPA de grado farmacéutico 99.995 % sin diluir, 99.995 % de bajo olor",
        "slug": "dmso-gel-contenedor-sin-bpa-de-grado-farmacutico-99995-sin-diluir-99995-de-bajo-olor-1635",
        "category": "gel",
        "price": "$1,557.00",
        "images": [
            "/images/products/41gG9rUENkL._AC_SL1500_.jpg",
            "/images/products/41rizcsAXrL._AC_SL1500_.jpg",
            "/images/products/41RZ6q07pvL._AC_SL1500_.jpg",
            "/images/products/41BTUTYPTL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/41gG9rUENkL._AC_SL1500_.jpg",
        "description": "Grado farmacéutico DMSO (sulfóxido de dimetilo) es un disolvente orgánico altamente aprótico dipolar muy distintivo con un punto de congelación de 64 grados F. DMSO por sí mismo es realmente inodoro, lo que hace que el sulfóxido de dimetilo huele y sepa como cebolla o ajo es DMS (sulfuro de dimetilo..."
    },
    {
        "id": "1640",
        "title": "DMSO (sulfóxido de dimetilo) 99.9% - Grado farmacéutico 8.45oz botella de vidrio",
        "slug": "dmso-sulfxido-de-dimetilo-999-grado-farmacutico-845oz-botella-de-vidrio-1640",
        "category": "liquido",
        "price": "$1,621.00",
        "images": [
            "/images/products/517qO6yNUrL._AC_SL1500_.jpg",
            "/images/products/51ic7RhaaYL._AC_SL1500_.jpg",
            "/images/products/4122NcnacjL._AC_SL1500_.jpg",
            "/images/products/51bsCfN2BeL._AC_SL1500_.jpg",
            "/images/products/41B8PRpqhRL._AC_SL1500_.jpg",
            "/images/products/51ftGetTiZL._AC_SL1500_.jpg",
            "/images/products/51o1b5tLHmL.SS125_PKplay-button-mb-image-grid-small_.jpg"
        ],
        "image": "/images/products/517qO6yNUrL._AC_SL1500_.jpg",
        "description": "El DMSO (sulfóxido de dimetilo) es un líquido 99.9% puro y casi inodoro derivado del procesamiento de la madera, ofreciendo una calidad excepcional de grado farmacéutico.\nEl producto está empaquetado en una botella de vidrio con un gotero de precisión que garantiza un manejo seguro y una aplicación ..."
    },
    {
        "id": "1648",
        "title": "DMSO 3 oz. Roll-on 5 botellas especiales 99.995% de bajo olor grado farmacéutico líquido sin BPA contenedor",
        "slug": "dmso-3-oz-roll-on-5-botellas-especiales-99995-de-bajo-olor-grado-farmacutico-lquido-sin-bpa-contenedor-1648",
        "category": "liquido",
        "price": "$1,685.00",
        "images": [
            "/images/products/51lVeGmsPyL._AC_SL1500_.jpg",
            "/images/products/41qE92EGMUL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/51lVeGmsPyL._AC_SL1500_.jpg",
        "description": "DMSO México Dimethyl Sulfoxide es un producto súper premium envasado bajo guías cGMP, que es el DMSO (sulfóxido de dimetilo) es un disolvente orgánico dipolar altamente aprótico muy distintivo con un punto de congelación de 64 grados F. Nuestro DMSO es de origen sostenible Pure Pharma Grade Dimethyl ..."
    },
    {
        "id": "1651",
        "title": "Stellar Chemical DMSO - Dimetilsulfóxido - 1 galón - 99.99% de alta pureza - Fabricado en Estados Unidos",
        "slug": "stellar-chemical-dmso-dimetilsulfxido-1-galn-9999-de-alta-pureza-fabricado-en-estados-unidos-1651",
        "category": "liquido",
        "price": "$3,481.00",
        "images": [
            "/images/products/41Mu0x4JAmL._AC_SL1500_.jpg",
            "/images/products/51DbFb48L._AC_SL1500_.jpg",
            "/images/products/5187ANtvCQL._AC_SL1500_.jpg",
            "/images/products/51PHpod1ZFL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/41Mu0x4JAmL._AC_SL1500_.jpg",
        "description": "Dimetilsulfóxido (DMSO): Su solución versátil para aplicaciones mejoradas El sulfóxido de dimetilo (DMSO) es un compuesto químico notable reconocido por sus propiedades versátiles y numerosas aplicaciones en diversas industrias. Con una combinación única de solvencia, mejora de penetración y capacid..."
    },
    {
        "id": "1656",
        "title": "DMSO Un galón (128 onzas) puro 99,995% líquido de grado farmacéutico, sin olor.",
        "slug": "dmso-un-galn-128-onzas-puro-99995-lquido-de-grado-farmacutico-sin-olor-1656",
        "category": "liquido",
        "price": "$4,122.00",
        "images": [
            "/images/products/41KTsuQhLXL._AC_SL1500_.jpg",
            "/images/products/418odfMmPqL._AC_SL1500_.jpg",
            "/images/products/217D-ThKqzL._AC_SL1500_.jpg",
            "/images/products/31kzpb94uvL._AC_SL1500_.jpg",
            "/images/products/21jCS3j1r9L._AC_SL1500_.jpg",
            "/images/products/41aua1wTaHL._AC_SL1500_.jpg",
            "/images/products/61IDP1IBK9L.SS125_PKplay-button-mb-image-grid-small_.jpg"
        ],
        "image": "/images/products/41KTsuQhLXL._AC_SL1500_.jpg",
        "description": "Purificado para ser inodoro sin diluir (sin agua añadida) 99.995% puro grado farmacéutico empaquetado en un recipiente certificado sin BPA fabricado en los Estados Unidos bajo GMP para higiene y manipulación\nEl DMSO se congela a unos 64 grados, esto es normal. Colócalo en agua tibia para descongelar..."
    },
    {
        "id": "1664",
        "title": "DMSO Liquid 1 - Jarra de vidrio, puro 99.995% grado farmacéutico, no diluida, bajo olor, dimetilsulfóxido",
        "slug": "dmso-liquid-1-jarra-de-vidrio-puro-99995-grado-farmacutico-no-diluida-bajo-olor-dimetilsulfxido-1664",
        "category": "liquido",
        "price": "$5,084.00",
        "images": [
            "/images/products/31PXelZH-L._AC_SL1500_.jpg",
            "/images/products/410MwjBu9fL._AC_SL1500_.jpg",
            "/images/products/41oi8ioD39L._AC_SL1500_.jpg",
            "/images/products/41SN1vulopL._AC_SL1500_.jpg",
            "/images/products/41x-eA9IoxL._AC_SL1500_.jpg",
            "/images/products/31OFKJLzVqL._AC_SL1500_.jpg",
            "/images/products/41MWBgmCpoL._AC_SL1500_.jpg"
        ],
        "image": "/images/products/31PXelZH-L._AC_SL1500_.jpg",
        "description": "DMSO México Dimethyl Sulfoxide se purifica para ser muy bajo olor mediante el uso de un proceso frío especial que ayuda a eliminar cualquier exceso de sulfuro de dimetilo que es el compuesto que lo hace oler a ajo. Los grados inferiores de DMSO tendrán un olor ofensivo y generalmente indican su grado..."
    }
];
