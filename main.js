const tooltip = document.getElementById('tooltip');
const infoPanel = document.getElementById('info-panel');
const closePanel = document.getElementById('close-panel');
const panelContent = document.getElementById('panel-content');
let lastHighlighted = null;

document.addEventListener('DOMContentLoaded', function() {
    const svg = document.getElementById('org-svg');
    if (!svg) return;
    const groups = svg.querySelectorAll('g[data-cell-id]');

    function getFullLabel(group) {
        const foreignObject = group.querySelector('foreignObject');
        if (foreignObject) {
            const fullText = foreignObject.textContent.replace(/\s+/g, ' ').trim();
            if (fullText) return fullText;
        }
        const textNode = group.querySelector('text');
        return textNode ? textNode.textContent.replace(/\s+/g, ' ').trim() : 'Recuadro';
    }

    function getTooltipLabel(group, data) {
        if (data) {
            if (data.cargo && data.cargo.trim() !== '') {
                return data.cargo.trim();
            }
        }
        return getFullLabel(group);
    }

    function positionTooltip(evt) {
        const offset = 12;
        const viewportPadding = 8;
        const tooltipRect = tooltip.getBoundingClientRect();
        const tooltipWidth = tooltipRect.width;
        const tooltipHeight = tooltipRect.height;
        const availableRight = window.innerWidth - evt.clientX - offset - viewportPadding;
        const availableLeft = evt.clientX - offset - viewportPadding;
        const placeOnLeft = availableRight < tooltipWidth && availableLeft > 0;

        let left = placeOnLeft
            ? evt.clientX - tooltipWidth - offset
            : evt.clientX + offset;

        if (left + tooltipWidth + viewportPadding > window.innerWidth) {
            left = Math.max(viewportPadding, window.innerWidth - tooltipWidth - viewportPadding);
        }
        if (left < viewportPadding) {
            left = viewportPadding;
        }

        let top = evt.clientY + offset;
        if (top + tooltipHeight + viewportPadding > window.innerHeight) {
            top = Math.max(viewportPadding, evt.clientY - tooltipHeight - offset);
        }
        if (top < viewportPadding) {
            top = viewportPadding;
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    }

    const legacyRoleData = {
        'Qik6YUHW1CqDeXKeddzL-51': {
            nombre: 'Rodrigo Wainraihgt Galilea',
            cargo: 'Alcalde',
            contacto: 'alcaldia@puertomontt.cl',
            descripcion: `
<p><b>Facultades, funciones y atribuciones del Alcalde:</b></p>
<p>El alcalde es la máxima autoridad de la Municipalidad y en tal calidad le corresponderá su dirección y administración superior y la supervigilancia de su funcionamiento.</p>
<ul>
<li>a) Representar judicial y extrajudicialmente a la municipalidad;</li>
<li>b) Proponer al concejo la organización interna de la municipalidad;</li>
<li>c) Nombrar y remover a los funcionarios de su dependencia de acuerdo con las normas estatuarias que los rijan;</li>
<li>d) Velar por la observancia del principio de la probidad administrativa dentro del municipio y aplicar medidas disciplinarias al personal de su dependencia, en conformidad con las normas estatuarias que lo rijan;</li>
<li>e) Administrar los recursos financieros de la municipalidad; de acuerdo con las normas sobre administración financiera del Estado;</li>
<li>f) Administrar los bienes municipales y nacionales de uso público de la comuna que correspondan en conformidad a esta ley;</li>
<li>g) Otorgar, renovar y poner término a permisos municipales;</li>
<li>h) Adquirir y enajenar bienes muebles;</li>
<li>i) Dictar resoluciones obligatorias de carácter general y particular;</li>
<li>j) Delegar el ejercicio de parte de sus atribuciones exclusivas en funcionarios de su dependencia o en los delegados que designe, salvo las contempladas en las letras c) y d). Igualmente podrá delegar la facultad para firmar, bajo la fórmula “por orden del alcalde”, sobre materias específicas.</li>
<li>k) Coordinar el funcionamiento de la municipalidad con los órganos de la Administración del Estado que corresponda;</li>
<li>l) Coordinar con los servicios públicos la acción de éstos, en el territorio de la comuna;</li>
<li>ll) Ejecutar los actos y celebrar los contratos necesarios para el adecuado cumplimiento de las funciones de la municipalidad y de lo dispuesto en el artículo 37 de la Ley Nº 18.575,</li>
<li>m) Convocar y presidir, con derecho a voto, el concejo, como asimismo convocar y presidir el consejo comunal de organizaciones de la sociedad civil;</li>
<li>n) Someter a plebiscito las materias de la administración local, de acuerdo a lo establecido en los artículos 99 y siguientes, y</li>
<li>ñ) Autorizar la circulación de vehículos municipales fuera de los días y horas de trabajo, para el cumplimiento de las funciones inherentes a la municipalidad.</li>
<li>o) Aprobar, observar o rechazar las solicitudes de materializar los aportes al espacio público que contempla la Ley General de Urbanismo y Construcciones a través de la ejecución de estudios, proyectos, obras y medidas de acuerdo a lo que dispone el mismo cuerpo legal.</li>
<li>p) Requerir de la Fiscalía del Ministerio Público y de las Fuerzas de Orden y Seguridad Pública, que ejerzan sus funciones en la comuna respectiva, los datos oficiales que éstas posean en sus sistemas de información, sobre los delitos que hubiesen afectado a la comuna durante el mes anterior, con el objetivo de dar cumplimiento a la función establecida en la letra j) del artículo 4 de la presente ley. (art. 56). (<a href="https://www.portaltransparencia.cl/PortalPdT/directorio-de-organismos-regulados/?org=MU233&pagina=57313071" target="_blank">ver más en enlace</a>)</li>
</ul>
<p><b>Funciones y Atribuciones que describen en los Art. 56, 63, 64, 65, 67, 68 Ley  N°18.695 Orgánica Constitucional de Municipalidades</b></p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
<li><a href="https://bcn.cl/2kzjh" target="_blank">L.G.U.C</a></li>
</ul>
<p>Ver detalle: <a href="https://www.portaltransparencia.cl/PortalPdT/directorio-de-organismos-regulados/?org=MU233&pagina=57313071" target="_blank">Portal de Transparencia</a></p>
`
        },
        'Qik6YUHW1CqDeXKeddzL-52': {
            nombre: 'Concejo Municipal',
            cargo: 'Concejo Municipal',
            contacto: '',
            descripcion: `
<p>En cada municipalidad habrá un concejo de carácter normativo, resolutivo y fiscalizador, encargado de hacer efectiva la participación de la comunidad local y de ejercer las atribuciones que señala esta ley. (art. 71). (<a href="https://www.puertomontt.cl/municipalidad/concejo-municipal/" target="_blank">ver más en enlace</a>)</p>
<p>Funciones y Atribuciones se describen en los Art. 71, 79, 80, 81, 87 Ley  N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
<li><a href="https://bcn.cl/2kzjh" target="_blank">L.G.U.C</a></li>
</ul>
<p>Ver detalle: <a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313070?estadoItem=Publicado" target="_blank">Portal de Transparencia</a></p>
            `
        },
        'Qik6YUHW1CqDeXKeddzL-56': {
            cargo: 'Consejo Comunal de Organizaciones de la Sociedad Civil',
            contacto: '',
            descripcion: `
<p>El Consejo Comunal de Organizaciones de la Sociedad Civil es un órgano asesor de la Municipalidad compuesto por representantes de la comunidad local, cuyo objeto es asegurar la participación de las organizaciones comunitarias de carácter territorial y funcional, y de actividades relevantes en el progreso económico, social y cultura de la comuna.</p>
<p>La Integración, organización, competencias y funcionamiento del Consejo se regirá por las normas contenidas en la Ley N° 18.695, Orgánica Constitucional de Municipalidades y por las disposiciones del Reglamento N° 8 (Texto Refundido) del 10 de septiembre de 2014. (<a href="https://www.puertomontt.cl/wp-content/uploads/2022/11/reglamento-N-0008-COSOC.pdf" target="_blank">ver más en enlace</a>)</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
</ul>
            `
        },
        'Qik6YUHW1CqDeXKeddzL-61': {
            nombre: '<strong>Primer Juzgado:</strong> Alejandro Ibañez, <strong> Segundo Juzgado:</strong> Karin Yunge, <strong>Tercer Juzgado:</strong> Tatiana Muga',
            cargo: 'Juzgados de Policía Local',
            contacto: '',
            descripcion: `
<p>Los objetivos y funciones están dados en el Decreto Nº 307/78 (Min Justicia) que fijó el texto refundido, coordinado y sistematizado de la Ley Nº 18.290 sobre competencia y atribuciones de los Juzgados de Policía Local.</p>
<p>Deben presentar a la Secplan, en el mes de Agosto, sus necesidades de presupuesto y el proyecto de compromisos de gestión, para el año siguiente. Cumplir los compromisos definitivos para el año siguiente, que le entregue el Alcalde en el mes de Diciembre, a través del Comité de Gestión. Semestralmente deben evaluar sus compromisos, realizando las correcciones que sean necesarias para cumplir con las metas fijadas. En el mes de Enero, enviar al Alcalde su Informe de cumplimiento compromisos de gestión del año anterior, señalando las razones en el caso de metas no alcanzadas. (<a href="https://www.portaltransparencia.cl/PortalPdT/documents/10179/62801/7-2008.pdf_estructura.pdf/da598e49-d04f-4409-970a-ade4f793f7a2" target="_blank">ver más en enlace</a>)</p>
<p>Más Información Ley N° 15.231 Sobre Organización y Atribuciones de los Juzgados de Policía Local.<br>
<a href="https://bcn.cl/3bd7b" target="_blank">https://bcn.cl/3bd7b</a></p>
            `
        },
        'Qik6YUHW1CqDeXKeddzL-59': {
            nombre: 'Fernando Orellana Pérez',
            cargo: 'Administrador Municipal ',
            contacto: '',
            descripcion: `
<p>El administrador municipal será el colaborador directo del alcalde en las tareas de coordinación y gestión permanente del municipio, y en la elaboración y seguimiento del plan anual de acción municipal y ejercerá las atribuciones que señale el reglamento municipal y las que le delegue el alcalde, siempre que estén vinculadas con la naturaleza de su cargo. (<a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">ver más en enlace</a>)</p>
<p>Funciones y Atribuciones se describen en los Art. 30 Ley  N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
</ul>
            `
        },
        '6WwWut21OLdbgOuvuQKQ-3': {
            nombre: 'Fabian Alvarez (s)',
            cargo: 'Depto. Abastecimiento y Licitaciones',
            contacto: '',
            descripcion: `
<p>Proveer en forma eficiente y eficaz los recursos materiales y contratación de servicios que requieren las distintas unidades municipales para el oportuno cumplimiento de sus funciones.<br>
Llevar a efecto de manera oportuna y transparente todos los procesos administrativos vinculados a licitaciones y compras municipales, velando por el estricto cumplimiento de la normativa vigente. (<a href="https://www.portaltransparencia.cl/PortalPdT/documents/10179/62801/7-2008.pdf_estructura.pdf/da598e49-d04f-4409-970a-ade4f793f7a2" target="_blank">ver más en enlace</a>)</p>
<p>Ver detalle: <a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">Portal de Transparencia</a></p>
            `
        },
        '6WwWut21OLdbgOuvuQKQ-1': {
            nombre: 'Marta Dietz',
            cargo: 'OIRS',
            contacto: '',
            descripcion: `
<p>Oficina de Informaciones, reclamos y sugerencias, es un espacio de atención en el cual las personas accedan e interactúen con la administración, que garantice su derecho a informarse, sugerir y reclamar, para contribuir a la conformación de un municipio moderno y al servicio permanente de las personas. Para ello esta institución se compromete a entregar una atención oportuna, de calidad y sin discriminación. (<a href="https://drive.google.com/drive/folders/1-RZTDfGkS0iOBMX9byLbtx__ln0PloGR" target="_blank">ver más en enlace</a>)</p>
<p>Ver detalle: <a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">Portal de Transparencia</a></p>
            `
        },
        '6WwWut21OLdbgOuvuQKQ-9': {
            nombre: 'Miguel Gómez Quijada',
            cargo: 'Secretaría Municipal',
            contacto: '',
            descripcion: `
<p>La Secretaría Municipal estará a cargo de un secretario municipal que tendrá las siguientes funciones: Dirigir las actividades de secretaria administrativa del Alcalde y del Concejo; Desempeñarse como ministro de fe en todas las actuaciones municipales, y Recibir, mantener y tramitar, cuando corresponda, la declaración de intereses establecida por la ley 18.575. Llevar el registro municipal a que se refiere el artículo 6° de la ley N° 19.418, sobre Juntas de Vecinos y demás Organizaciones Comunitarias. (<a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">ver más en enlace</a>)</p>
<p>Funciones y Atribuciones se describen en lo Art. 20 Ley N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
</ul>
            `
        },
        '6WwWut21OLdbgOuvuQKQ-28': {
            nombre: 'Osvaldo Emhart Vicencio',
            cargo: 'Dirección Jurídica',
            contacto: '',
            descripcion: `
<p>Corresponderá a la unidad encargada de la asesoría jurídica prestar apoyo en materias legales al Alcalde y al Concejo. Además, informará en derecho todos los asuntos legales que las distintas unidades municipales le planteen, las orientará periódicamente respecto de las disposiciones legales y reglamentarias, y mantendrá al día los títulos de los bienes municipales. Cuando lo ordene el Alcalde, deberá efectuar las investigaciones y sumarios administrativos, sin perjuicio que también puedan ser realizados por funcionarios de cualquier unidad municipal, bajo la supervigilancia que al respecto le corresponda a la asesoría jurídica. Podrá, asimismo, iniciar y asumir la defensa, a requerimiento del alcalde, en todos aquellos juicios en que la municipalidad sea parte o tenga interés, pudiendo comprenderse también la asesoría o defensa de la comunidad cuando sea procedente y el alcalde así lo determine. (<a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">ver más en enlace</a>)</p>
<p>Funciones y Atribuciones se describen en lo Art. 28 Ley N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
</ul>
            `
        },
        '6WwWut21OLdbgOuvuQKQ-32': {
            nombre: 'Francisco Barría Eltit',
            cargo: 'Secretaría Comunal de Planificación',
            contacto: '',
            descripcion: `
<p>Servir de secretaría técnica permanente del Alcalde y del Concejo en la formulación de la estrategia municipal, como asimismo de las políticas, planes, programas y proyectos de desarrollo de la comuna; Asesorar al Alcalde en la elaboración de los proyectos de plan comunal de desarrollo y de presupuesto municipal; Evaluar el cumplimiento de los planes, programas, proyectos, inversiones y el presupuesto municipal, e informar sobre estas materias al Concejo, a lo menos semestralmente; Efectuar análisis y evaluaciones permanentes de la situación de desarrollo de la comuna, con énfasis en los aspectos sociales y territoriales; Elaborar las bases generales y específicas, según corresponda, para los llamados a licitación, previo informe de la unidad competente, de conformidad con los criterios e instrucciones establecidas en el reglamento municipal respectivo; Fomentar vinculaciones de carácter técnico con los servicios públicos y con el sector privado de la comuna, (<a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">ver más enlace</a>)</p>
<p>Funciones y Atribuciones se describen en lo Art. 21 Ley N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
</ul>
            `
        },
        '6WwWut21OLdbgOuvuQKQ-40': {
            nombre: 'Saúl Cárdenas (s)',
            cargo: 'Dirección de Tránsito',
            contacto: '',
            descripcion: `
<p>A la unidad encargada de la función de tránsito y transporte públicos corresponderá: Otorgar y renovar licencias para conducir vehículos; Determinar el sentido de circulación de vehículos, en coordinación con los organismos de la Administración del Estado competentes; Señalizar adecuadamente las vías públicas; Aprobar, observar o rechazar los informes de mitigación de impacto vial o emitir opinión sobre ellos, a petición de la secretaría regional ministerial de Transportes y Telecomunicaciones, conforme a lo dispuesto en la Ley General de Urbanismo y Construcciones, y En general, aplicar las normas generales sobre tránsito y transporte públicos en la comuna. (<a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">ver más en enlace</a>)</p>
<p>Funciones y Atribuciones se describen en lo Art. 26 Ley  N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
</ul>
            `
        },
        '6WwWut21OLdbgOuvuQKQ-43': {
            nombre: 'Orlando Vera Oporto',
            cargo: 'Dirección de Administración y Finanzas',
            contacto: '',
            descripcion: `
<p>Asesorar al Alcalde en la administración del personal de la municipalidad. Además, deberá informar trimestralmente al concejo municipal sobre las contrataciones de personal realizadas en el trimestre anterior, individualizando al personal, su calidad jurídica, estamento, grado de remuneración y, respecto del personal a honorarios contratado con cargo al subtítulo 21, ítem 03, del presupuesto municipal, el detalle de los servicios prestados. También, en la primera sesión de cada año del concejo, deberá informar a éste sobre el escalafón de mérito del personal municipal y un reporte sobre el registro del personal enviado y tramitado en la Contraloría General de la República en el año inmediatamente anterior. (Ley N° 20.922 Modifica Disposiciones Aplicables a los Funcionarios Municipales y Entrega Nuevas Competencias a la Subsecretaria de Desarrollo Regional y Administrativo). (<a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">ver más en enlace</a>)</p>
<p>Funciones y Atribuciones se describen en lo Art. 27 Ley  N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
</ul>
            `
        },
        '6WwWut21OLdbgOuvuQKQ-44': {
            nombre: 'Javiera Torres Ávila',
            cargo: 'Dirección de Obras',
            contacto: '',
            descripcion: `
<p>Velar por el cumplimiento de las disposiciones de la Ley General de Urbanismo y Construcciones, del plan regulador comunal y de las ordenanzas correspondientes, para cuyo efecto gozará de las siguientes atribuciones específicas: - Dar aprobación a las fusiones, subdivisiones y modificaciones de deslinde de predio en las arreas urbanas, de extensión urbana o rurales en caso de aplicación del artículo 55 de la Ley General de Urbanismo y Construcciones; - Dar aprobación a los proyectos y anteproyectos de obras de urbanización y edificación y otorgar permisos correspondientes, previa verificación de que estos cumplen con los aspectos a revisar de acuerdo a la Ley General de Urbanismo y Construcciones - Fiscalizar la ejecución de dichas obras hasta el momento de su recepción - Recibirse de las obras y autorizar su uso, previa verificación de que estas cumplen con los aspectos a revisar de acuerdo a la Ley General de Urbanismo y Construcciones. (<a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">ver más en enlace</a>)</p>
<p>Funciones y Atribuciones se describen en Art. 24 Ley N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
<li><a href="https://bcn.cl/2kzjh" target="_blank">L.G.U.C</a></li>
</ul>
            `
        },
        '6WwWut21OLdbgOuvuQKQ-47': {
            nombre: 'Orietta Lamerain',
            cargo: 'Dirección de Control',
            contacto: '',
            descripcion: `
<p>A la unidad encargada del control le corresponderán las siguientes funciones: Realizar la auditoría operativa respectiva interna de la municipalidad, con el objeto de fiscalizar la legalidad de su actuación; Controlar la ejecución financiera y presupuestaria municipal; Representar al Alcalde los actos municipales que estime ilegales, informando de ello al Concejo, para cuyo objeto tendrá acceso a toda la información disponible. Dicha representación deberá efectuarse dentro de los diez días siguientes a aquel en que la unidad de control haya tomado conocimiento de los actos. Si el alcalde no tomare medidas administrativas con el objeto de enmendar el acto representado, la unidad de control deberá remitir dicha información a la Contraloría General de la República; Colaborar directamente con el Concejo para el ejercicio de sus funciones fiscalizadoras. Para estos efectos, emitirá un informe trimestral acerca del estado de avance del ejercicio programático presupuestario; asimismo, deberá informar, también trimestralmente, sobre el estado de cumplimiento de los pagos por concepto de cotizaciones previsionales de los funcionarios municipales y de los trabajadores que se desempeñan en servicios incorporados a la gestión municipal, administrados directamente por la municipalidad o a través de corporaciones municipales, de los aportes que la municipalidad debe efectuar al Fondo Común Municipal, y del estado de cumplimiento de los pagos por concepto de asignaciones de perfeccionamiento docente. En todo caso, deberá dar respuesta por escrito a las consultas o peticiones de informes que le formule un concejal. (<a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">ver más en enlace</a>)</p>
<p>Funciones y Atribuciones se describen en lo Art. 29 Ley  N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
</ul>
            `
        },
        '6WwWut21OLdbgOuvuQKQ-48': {
            nombre: 'Pablo Alarcón Gallardo',
            cargo: 'Dirección Medio Ambiente Aseo y Ornato',
            contacto: '',
            descripcion: `
<p>A la unidad encargada de la función de medio ambiente, aseo y ornato corresponderá velar por: El aseo de las vías públicas,  parques, plazas, jardines y, en general, de los bienes nacionales de uso público existentes en la comuna; El servicio de extracción de basura; La construcción, conservación y administración de las áreas verdes de la comuna; Proponer y ejecutar medidas tendientes a materializar acciones y programas relacionados con medio ambiente; Aplicar las normas ambientales a ejecutarse en la comuna que sean de su competencia, y Elaborar el anteproyecto de ordenanza ambiental. Para la aprobación de la misma, el concejo podrá solicitar siempre un informe técnico al Ministerio del Medio Ambiente. (<a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">ver más en enlace</a>)</p>
<p>Funciones y Atribuciones se describen en lo Art. 25 Ley  N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
</ul>
            `
        },
        '6WwWut21OLdbgOuvuQKQ-51': {
            nombre: 'Yerco Rodríguez Guichapani',
            cargo: 'Dirección Desarrollo Comunitario',
            contacto: '',
            descripcion: `
<p>La unidad encargada del desarrollo comunitario tendrá como funciones específicas: Asesorar al alcalde y, también, al concejo en la promoción del desarrollo comunitario; Prestar asesoría técnica a las organizaciones comunitarias, fomentar su desarrollo y legalización, y promover su efectiva participación en el municipio, y Proponer y ejecutar, dentro de su ámbito y cuando corresponda, medidas tendientes a materializar acciones relacionadas con salud pública, protección del medio ambiente, educación y cultura, capacitación laboral, deporte y recreación, promoción del empleo, fomento productivo local y turismo. (<a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">ver más en enlace</a>)</p>
<p>Funciones y Atribuciones se describen en lo Art. 22 Ley  N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
</ul>
            `
        },
        '6WwWut21OLdbgOuvuQKQ-52': {
            nombre: 'Dirección de Servicios Traspasados',
            cargo: 'Dirección de Servicios Traspasados',
            contacto: '',
            descripcion: `
<p>La unidad de servicios de salud, educación y demás incorporados a la gestión municipal tendrá la función de asesorar al alcalde y al concejo en la formulación de las políticas relativas a dichas áreas. Cuando la administración de dichos servicios sea ejercida directamente por la municipalidad, le corresponderá cumplir, además, las siguientes funciones: Proponer y ejecutar medidas tendientes a materializar acciones y programas relacionados con salud pública y educación, y demás servicios incorporados a su gestión, y Administrar los recursos humanos, materiales y financieros de tales servicios, en coordinación con la unidad de administración y finanzas. Cuando exista corporación municipal a cargo de la administración de servicios traspasados, y sin perjuicio de lo dispuesto en el inciso primero, a esta unidad municipal le corresponderá formular proposiciones con relación a los aportes o subvenciones a dichas corporaciones, con cargo al presupuesto municipal, y proponer mecanismos que permitan contribuir al mejoramiento de la gestión de la corporación en las áreas de su competencia. (<a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">ver más en enlace</a>)</p>
<p>Funciones y Atribuciones se describen en lo Art. 23 Ley  N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
</ul>
            `
        },
        '6WwWut21OLdbgOuvuQKQ-27': {
            nombre: 'Dirección de Operaciones',
            cargo: 'Dirección de Operaciones',
            contacto: '',
            descripcion: `
<p>Dar respuesta inmediata y efectiva a los requerimientos efectuados por la comunidad, por problemas atingentes a las vías públicas que afecten su cotidiano vivir. Prevenir y actuar en situaciones de emergencia. Procurar el buen mantenimiento de calles y caminos de la comuna, así como también de la maquinaria y vehículos municipales. (<a href="https://www.portaltransparencia.cl/PortalPdT/documents/10179/62801/7-2016.pdf_1552575280164/585723f6-a8fc-43ce-b242-703d2060ea39" target="_blank">ver más Regl. N° 7/2016</a>)</p>
<p>Ver detalle: <a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">Portal de Transparencia</a></p>
            `
        },
        '6WwWut21OLdbgOuvuQKQ-31': {
            nombre: 'Dirección de Turismo',
            cargo: 'Dirección de Turismo',
            contacto: '',
            descripcion: `
<p>Definir políticas y estrategias para impulsar el desarrollo del turismo, el patrimonio y la cultura como la actividad económica relevante para convertirlo en una actividad de desarrollo local, empleadora de recursos y con la participación importante en el producto interno bruto de la comuna. Planificar, organizar, dirigir y ejecutar la política de desarrollo comunal y todas aquellas acciones que tengan directa relación con los ejes del turismo, cultura y patrimonio definidos en los planes de desarrollo vigentes de la comuna. Integrar a la accione sectorial a todas las unidades municipales que tengan relación con el turismo estableciendo las coordinaciones necesarias para el cumplimiento de los objetivos definidos. Evaluar, controlar y corregir los resultados de la gestión llevada a cabo por las distintas unidades y aquellas que tengan relación con la misma, sistematizando y difundiendo, a quien corresponda, las distintas experiencias. Elaborar una cartera de proyecto y productos relacionados con la identidad y diversidad territorial, colaborando en la obtención de financiamiento y promocionando sus resultados. (<a href="https://www.portaltransparencia.cl/PortalPdT/documents/10179/62801/1_2021+Aprueba+Estructura+y+Funciones+de+Direcci%C3%B3n+de+Turismo+%281%29.pdf/7a4987ff-7f01-4d98-bac4-df192fb51a09" target="_blank">ver más Regl. N° 1/2021</a>)</p>
<p>Ver detalle: <a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">Portal de Transparencia</a></p>
            `
        },
        '6WwWut21OLdbgOuvuQKQ-39': {
            nombre: 'Sergio Barría Matus',
            cargo: 'Dirección de Concesiones Municipales',
            contacto: '',
            descripcion: `
<p>Planificar, dirigir, coordinar y fiscalizar las concesiones otorgadas sobre bienes inmuebles municipales o bienes nacionales de usos público de la comuna, velando por el resguardo de los intereses municipales. b) Estudiar y proponer nuevas fuentes de ingresos para el municipio que se puedan generar a partir del otorgamiento de futuras concesiones. c) supervisar, informar y someter a trámite el otorgamiento de las futuras concesiones. d)Participar en la confección de las bases para licitaciones públicas o privadas de su competencia. e) Controlar los ingresos y en general, todas las obligaciones que emanen de los respectivos contratos o acto administrativos referidos a concesiones. f) Velar por la oportuna y adecuada constitución, otorgamiento, vigencia y renovación de los instrumentos de garantías que caucionen las obligaciones derivadas de los contratos y permisos concedidos. g) Cautelar el cumplimiento de las obligaciones de responsabilidad municipal. h) Elaborar y presentar al alcalde un informe trimestral que de cuenta del estado de cada uno de los contratos y permisos vigentes. i) Para el cumplimiento de sus funciones, esta dependencia municipal podrá requerir la colaboración de todas las unidades municipales. (<a href="https://www.portaltransparencia.cl/PortalPdT/documents/10179/62801/3_2010+Modif%C3%ADquese+y+crease+Direcci%C3%B3n+de+Concesiones+Municipales.pdf/e72b08c2-8da7-42ec-a942-69861305fd9d" target="_blank">ver más Regl. N° 3/2010</a>)</p>
<p>Ver detalle: <a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">Portal de Transparencia</a></p>
            `
        },
        '6WwWut21OLdbgOuvuQKQ-8': {
            nombre: 'Andrés Canelo',
            cargo: 'Dirección de Seguridad Pública',
            contacto: '',
            descripcion: `
<p>Existirá un director de seguridad pública en todas aquellas comunas donde lo decida el concejo municipal, a proposición del alcalde. El director de seguridad pública será designado por el alcalde y podrá ser removido por éste, sin perjuicio que rijan a su respecto, además, las causales de cesación de funciones aplicables al personal municipal. Dicho director será el colaborador directo del alcalde en las tareas de coordinación y gestión de las funciones de la letra j) del artículo 4, en el seguimiento del plan comunal de seguridad pública, y ejercerá las funciones que le delegue el alcalde, siempre que estén vinculadas con la naturaleza de su función.</p>
<p>Funciones y Atribuciones se describen en lo Art. 16 BIS Ley  N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
</ul>
<p>Ver detalle: <a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">Portal de Transparencia</a></p>
            `
        },
        'dir_1': {
            nombre: 'Orietta Lamerain',
            cargo: 'Dirección de Control',
            contacto: '',
            descripcion: `
<p>A la unidad encargada del control le corresponderán las siguientes funciones: Realizar la auditoría operativa respectiva interna de la municipalidad, con el objeto de fiscalizar la legalidad de su actuación; Controlar la ejecución financiera y presupuestaria municipal; Representar al Alcalde los actos municipales que estime ilegales, informando de ello al Concejo, para cuyo objeto tendrá acceso a toda la información disponible. Dicha representación deberá efectuarse dentro de los diez días siguientes a aquel en que la unidad de control haya tomado conocimiento de los actos. Si el alcalde no tomare medidas administrativas con el objeto de enmendar el acto representado, la unidad de control deberá remitir dicha información a la Contraloría General de la República; Colaborar directamente con el Concejo para el ejercicio de sus funciones fiscalizadoras. Para estos efectos, emitirá un informe trimestral acerca del estado de avance del ejercicio programático presupuestario; asimismo, deberá informar, también trimestralmente, sobre el estado de cumplimiento de los pagos por concepto de cotizaciones previsionales de los funcionarios municipales y de los trabajadores que se desempeñan en servicios incorporados a la gestión municipal, administrados directamente por la municipalidad o a través de corporaciones municipales, de los aportes que la municipalidad debe efectuar al Fondo Común Municipal, y del estado de cumplimiento de los pagos por concepto de asignaciones de perfeccionamiento docente. En todo caso, deberá dar respuesta por escrito a las consultas o peticiones de informes que le formule un concejal. (<a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">ver más en enlace</a>)</p>
<p>Funciones y Atribuciones se describen en lo Art. 29 Ley  N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
</ul>
            `
        },
        'dir_4': {
            nombre: 'Javiera Torres Ávila',
            cargo: 'Dirección de Obras',
            contacto: '',
            descripcion: `
<p>Velar por el cumplimiento de las disposiciones de la Ley General de Urbanismo y Construcciones, del plan regulador comunal y de las ordenanzas correspondientes, para cuyo efecto gozará de las siguientes atribuciones específicas: - Dar aprobación a las fusiones, subdivisiones y modificaciones de deslinde de predio en las arreas urbanas, de extensión urbana o rurales en caso de aplicación del artículo 55 de la Ley General de Urbanismo y Construcciones; - Dar aprobación a los proyectos y anteproyectos de obras de urbanización y edificación y otorgar permisos correspondientes, previa verificación de que estos cumplen con los aspectos a revisar de acuerdo a la Ley General de Urbanismo y Construcciones - Fiscalizar la ejecución de dichas obras hasta el momento de su recepción - Recibirse de las obras y autorizar su uso, previa verificación de que estas cumplen con los aspectos a revisar de acuerdo a la Ley General de Urbanismo y Construcciones. (<a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">ver más en enlace</a>)</p>
<p>Funciones y Atribuciones se describen en Art. 24 Ley N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
<li><a href="https://bcn.cl/2kzjh" target="_blank">L.G.U.C</a></li>
</ul>
            `
        },
        'dir_5': {
            nombre: 'Saúl Cárdenas (s)',
            cargo: 'Dirección de Tránsito',
            contacto: '',
            descripcion: `
<p>A la unidad encargada de la función de tránsito y transporte públicos corresponderá: Otorgar y renovar licencias para conducir vehículos; Determinar el sentido de circulación de vehículos, en coordinación con los organismos de la Administración del Estado competentes; Señalizar adecuadamente las vías públicas; Aprobar, observar o rechazar los informes de mitigación de impacto vial o emitir opinión sobre ellos, a petición de la secretaría regional ministerial de Transportes y Telecomunicaciones, conforme a lo dispuesto en la Ley General de Urbanismo y Construcciones, y En general, aplicar las normas generales sobre tránsito y transporte públicos en la comuna. (<a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">ver más en enlace</a>)</p>
<p>Funciones y Atribuciones se describen en lo Art. 26 Ley  N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
</ul>
            `
        },
        'dir_6': {
            nombre: 'Pablo Alarcón Gallardo',
            cargo: 'Dirección Medio Ambiente Aseo y Ornato',
            contacto: '',
            descripcion: `
<p>A la unidad encargada de la función de medio ambiente, aseo y ornato corresponderá velar por: El aseo de las vías públicas,  parques, plazas, jardines y, en general, de los bienes nacionales de uso público existentes en la comuna; El servicio de extracción de basura; La construcción, conservación y administración de las áreas verdes de la comuna; Proponer y ejecutar medidas tendientes a materializar acciones y programas relacionados con medio ambiente; Aplicar las normas ambientales a ejecutarse en la comuna que sean de su competencia, y Elaborar el anteproyecto de ordenanza ambiental. Para la aprobación de la misma, el concejo podrá solicitar siempre un informe técnico al Ministerio del Medio Ambiente. (<a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">ver más en enlace</a>)</p>
<p>Funciones y Atribuciones se describen en lo Art. 25 Ley  N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
</ul>
            `
        },
        'dir_7': {
            nombre: 'Yerco Rodríguez Guichapani',
            cargo: 'Dirección Desarrollo Comunitario',
            contacto: '',
            descripcion: `
<p>La unidad encargada del desarrollo comunitario tendrá como funciones específicas: Asesorar al alcalde y, también, al concejo en la promoción del desarrollo comunitario; Prestar asesoría técnica a las organizaciones comunitarias, fomentar su desarrollo y legalización, y promover su efectiva participación en el municipio, y Proponer y ejecutar, dentro de su ámbito y cuando corresponda, medidas tendientes a materializar acciones relacionadas con salud pública, protección del medio ambiente, educación y cultura, capacitación laboral, deporte y recreación, promoción del empleo, fomento productivo local y turismo. (<a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">ver más en enlace</a>)</p>
<p>Funciones y Atribuciones se describen en lo Art. 22 Ley  N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
</ul>
            `
        },
        'dir_8': {
            nombre: 'Dirección de Servicios Traspasados',
            cargo: 'Dirección de Servicios Traspasados',
            contacto: '',
            descripcion: `
<p>La unidad de servicios de salud, educación y demás incorporados a la gestión municipal tendrá la función de asesorar al alcalde y al concejo en la formulación de las políticas relativas a dichas áreas. Cuando la administración de dichos servicios sea ejercida directamente por la municipalidad, le corresponderá cumplir, además, las siguientes funciones: Proponer y ejecutar medidas tendientes a materializar acciones y programas relacionados con salud pública y educación, y demás servicios incorporados a su gestión, y Administrar los recursos humanos, materiales y financieros de tales servicios, en coordinación con la unidad de administración y finanzas. Cuando exista corporación municipal a cargo de la administración de servicios traspasados, y sin perjuicio de lo dispuesto en el inciso primero, a esta unidad municipal le corresponderá formular proposiciones con relación a los aportes o subvenciones a dichas corporaciones, con cargo al presupuesto municipal, y proponer mecanismos que permitan contribuir al mejoramiento de la gestión de la corporación en las áreas de su competencia. (<a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">ver más en enlace</a>)</p>
<p>Funciones y Atribuciones se describen en lo Art. 23 Ley  N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
</ul>
            `
        },
        'dir_9': {
            nombre: 'Sergio Barría Matus',
            cargo: 'Dirección de Concesiones Municipales',
            contacto: '',
            descripcion: `
<p>Planificar, dirigir, coordinar y fiscalizar las concesiones otorgadas sobre bienes inmuebles municipales o bienes nacionales de usos público de la comuna, velando por el resguardo de los intereses municipales. b) Estudiar y proponer nuevas fuentes de ingresos para el municipio que se puedan generar a partir del otorgamiento de futuras concesiones. c) supervisar, informar y someter a trámite el otorgamiento de las futuras concesiones. d)Participar en la confección de las bases para licitaciones públicas o privadas de su competencia. e) Controlar los ingresos y en general, todas las obligaciones que emanen de los respectivos contratos o acto administrativos referidos a concesiones. f) Velar por la oportuna y adecuada constitución, otorgamiento, vigencia y renovación de los instrumentos de garantías que caucionen las obligaciones derivadas de los contratos y permisos concedidos. g) Cautelar el cumplimiento de las obligaciones de responsabilidad municipal. h) Elaborar y presentar al alcalde un informe trimestral que de cuenta del estado de cada uno de los contratos y permisos vigentes. i) Para el cumplimiento de sus funciones, esta dependencia municipal podrá requerir la colaboración de todas las unidades municipales. (<a href="https://www.portaltransparencia.cl/PortalPdT/documents/10179/62801/3_2010+Modif%C3%ADquese+y+crease+Direcci%C3%B3n+de+Concesiones+Municipales.pdf/e72b08c2-8da7-42ec-a942-69861305fd9d" target="_blank">ver más Regl. N° 3/2010</a>)</p>
<p>Ver detalle: <a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">Portal de Transparencia</a></p>
            `
        },
        'dir_11': {
            nombre: 'Dirección de Turismo',
            cargo: 'Dirección de Turismo',
            contacto: '',
            descripcion: `
<p>Definir políticas y estrategias para impulsar el desarrollo del turismo, el patrimonio y la cultura como la actividad económica relevante para convertirlo en una actividad de desarrollo local, empleadora de recursos y con la participación importante en el producto interno bruto de la comuna. Planificar, organizar, dirigir y ejecutar la política de desarrollo comunal y todas aquellas acciones que tengan directa relación con los ejes del turismo, cultura y patrimonio definidos en los planes de desarrollo vigentes de la comuna. Integrar a la accione sectorial a todas las unidades municipales que tengan relación con el turismo estableciendo las coordinaciones necesarias para el cumplimiento de los objetivos definidos. Evaluar, controlar y corregir los resultados de la gestión llevada a cabo por las distintas unidades y aquellas que tengan relación con la misma, sistematizando y difundiendo, a quien corresponda, las distintas experiencias. Elaborar una cartera de proyecto y productos relacionados con la identidad y diversidad territorial, colaborando en la obtención de financiamiento y promocionando sus resultados. (<a href="https://www.portaltransparencia.cl/PortalPdT/documents/10179/62801/1_2021+Aprueba+Estructura+y+Funciones+de+Direcci%C3%B3n+de+Turismo+%281%29.pdf/7a4987ff-7f01-4d98-bac4-df192fb51a09" target="_blank">ver más Regl. N° 1/2021</a>)</p>
<p>Ver detalle: <a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">Portal de Transparencia</a></p>
            `
        },
        'dir_12': {
            nombre: 'Andrés Canelo',
            cargo: 'Dirección de Seguridad Pública',
            contacto: '',
            descripcion: `
<p>Existirá un director de seguridad pública en todas aquellas comunas donde lo decida el concejo municipal, a proposición del alcalde. El director de seguridad pública será designado por el alcalde y podrá ser removido por éste, sin perjuicio que rijan a su respecto, además, las causales de cesación de funciones aplicables al personal municipal. Dicho director será el colaborador directo del alcalde en las tareas de coordinación y gestión de las funciones de la letra j) del artículo 4, en el seguimiento del plan comunal de seguridad pública, y ejercerá las funciones que le delegue el alcalde, siempre que estén vinculadas con la naturaleza de su función.</p>
<p>Funciones y Atribuciones se describen en lo Art. 16 BIS Ley  N°18.695 Orgánica Constitucional de Municipalidades.</p>
<ul>
<li><a href="https://bcn.cl/2f796" target="_blank">L.O.M</a></li>
</ul>
<p>Ver detalle: <a href="https://www.portaltransparencia.cl/PortalPdT/pdtta/-/ta/MU233/EO/FFA/57313073?estadoItem=Publicado" target="_blank">Portal de Transparencia</a></p>
            `
        }
    };

    const pendingDescription = '<p>Información pendiente de completar.</p>';
    const makeUnit = (cargo, descripcion = pendingDescription) => ({ cargo, contacto: '', descripcion });
    const makePerson = (nombre, cargo, descripcion, contacto = '') => ({ nombre, cargo, contacto, descripcion });

    const roleData = Object.fromEntries([
        ['root_alcalde', makePerson('Rodrigo Wainraihgt Galilea', 'ALCALDE', legacyRoleData['Qik6YUHW1CqDeXKeddzL-51'].descripcion, 'alcaldia@puertomontt.cl')],
        ['root_admin', makePerson('Fernando Orellana Pérez', 'ADMINISTRADOR MUNICIPAL', legacyRoleData['Qik6YUHW1CqDeXKeddzL-59'].descripcion)],
        ['staff_cm', makeUnit('CONCEJO MUNICIPAL', legacyRoleData['Qik6YUHW1CqDeXKeddzL-52'].descripcion)],
        ['XiQgEYW6WsKNx-ofsIEA-1', makeUnit('CONSEJO DE SEGURIDAD PUBLICA')],
        ['XiQgEYW6WsKNx-ofsIEA-2', makeUnit('CONSEJO DE ORG. DE LA SOCIEDAD CIVIL', legacyRoleData['Qik6YUHW1CqDeXKeddzL-56'].descripcion)],
        ['staff_sm', makeUnit('GABINETE ALCALDÍA')],
        ['0nDRxtt2L3dVYxmqKmci-7', makeUnit('DELEGADOS MUNICIPALES')],
        ['XiQgEYW6WsKNx-ofsIEA-3', makePerson('Marta Dietz', 'OIRS — TRANSPARENCIA', legacyRoleData['6WwWut21OLdbgOuvuQKQ-1'].descripcion)],
        ['XiQgEYW6WsKNx-ofsIEA-4', makePerson('Miguel Gómez Quijada', 'SECRETARÍA MUNICIPAL', legacyRoleData['6WwWut21OLdbgOuvuQKQ-9'].descripcion)],
        ['XiQgEYW6WsKNx-ofsIEA-5', makePerson('Orlando Vera Oporto', 'DIRECCIÓN DE ADMINISTRACIÓN Y FINANZAS', legacyRoleData['6WwWut21OLdbgOuvuQKQ-43'].descripcion)],
        ['XiQgEYW6WsKNx-ofsIEA-6', makePerson('Osvaldo Emhart Vicencio', 'DIRECCIÓN JURÍDICA', legacyRoleData['6WwWut21OLdbgOuvuQKQ-28'].descripcion)],
        ['L_tp1oRDe_MaAnAdxejM-2', makeUnit('JUZGADOS DE POLICÍA LOCAL', legacyRoleData['Qik6YUHW1CqDeXKeddzL-61'].descripcion)],
        ['L_tp1oRDe_MaAnAdxejM-1', makePerson('Fabian Alvarez (s)', 'DPTO. DE LICITACIONES Y GESTION DE ABASTECIMIENTO', legacyRoleData['6WwWut21OLdbgOuvuQKQ-3'].descripcion)],
        ['dir_0', makePerson('Francisco Barría Eltit', 'SECPLAN', legacyRoleData['6WwWut21OLdbgOuvuQKQ-32'].descripcion)],
        ['elem_0_0', makeUnit('Dpto. de Coordinación')],
        ['elem_0_1', makeUnit('Dpto. de Proyectos')],
        ['elem_0_2', makeUnit('Dpto. de Estudios y Presupuesto')],
        ['elem_0_3', makeUnit('Dpto. de Informática')],
        ['elem_0_4', makeUnit('Dpto. de Vivienda')],
        ['elem_0_5', makeUnit('Dpto. de Desarrollo Urbano')],
        ['elem_0_6', makeUnit('Dpto. de Gestión Información Territorial')],
        ['dir_1', makePerson('Orietta Lamerain', 'DIRECCIÓN DE CONTROL', legacyRoleData['6WwWut21OLdbgOuvuQKQ-47'].descripcion)],
        ['elem_1_0', makeUnit('Dpto. de Auditoria Operativa y Control de Gestión')],
        ['elem_1_1', makeUnit('Dpto. de Análisis y Revisión')],
        ['elem_2_0', makeUnit('Dpto. Judicial')],
        ['elem_2_1', makeUnit('Dpto. de Bienes')],
        ['elem_2_2', makeUnit('Dpto. Administrativo')],
        ['elem_3_0', makeUnit('Subdirección de Finanzas')],
        ['elem_3_1', makeUnit('Dpto. de Administración de Bienes')],
        ['elem_3_2', makeUnit('Dpto. de Contabilidad y Presupuesto')],
        ['elem_3_3', makeUnit('Dpto. de Tesoreria')],
        ['elem_3_4', makeUnit('Subdirección de Rentas Municipales')],
        ['elem_3_5', makeUnit('Dpto. de Rentas y Patentes')],
        ['elem_3_6', makeUnit('Dpto. de Fiscalización y Cobranza')],
        ['elem_3_7', makeUnit('Subdirección de Personal')],
        ['elem_3_8', makeUnit('Dpto. de Remuneraciones')],
        ['elem_3_9', makeUnit('Dpto. de Prevención de Riesgos')],
        ['elem_3_10', makeUnit('Dpto. de Bienestar')],
        ['dir_4', makePerson('Javiera Torres Ávila', 'DIRECCIÓN DE OBRAS MUNICIPALES', legacyRoleData['6WwWut21OLdbgOuvuQKQ-44'].descripcion)],
        ['elem_4_0', makeUnit('Subdirección Técnica')],
        ['elem_4_1', makeUnit('Dpto. de Permisos')],
        ['elem_4_2', makeUnit('Dpto. de Inspección')],
        ['elem_4_3', makeUnit('Subdirección de Inspección de Obras')],
        ['elem_4_4', makeUnit('Dpto. de Coordinación')],
        ['elem_4_5', makeUnit('Dpto. de Inspección Técnica de Obras')],
        ['dir_5', makePerson('Saúl Cárdenas (s)', 'DIRECCIÓN DE TRÁNSITO', legacyRoleData['6WwWut21OLdbgOuvuQKQ-40'].descripcion)],
        ['elem_5_0', makeUnit('Subdirección Administrativa de Transito')],
        ['elem_5_1', makeUnit('Dpto. de Permisos de Circulación')],
        ['elem_5_2', makeUnit('Dpto. de Licencias de Conducir')],
        ['elem_5_3', makeUnit('Dpto. Administrativo')],
        ['elem_5_4', makeUnit('Subdirección de Estudios e Ingenieria Transito')],
        ['elem_5_5', makeUnit('Dpto. de Señalización e Inspección')],
        ['elem_5_6', makeUnit('Dpto. Ingenieria del Tránsito y Proyectos')],
        ['dir_6', makePerson('Pablo Alarcón Gallardo', 'DIRECCIÓN DE MEDIO AMBIENTE, ASEO Y ORNATO', legacyRoleData['6WwWut21OLdbgOuvuQKQ-48'].descripcion)],
        ['elem_6_0', makeUnit('Dpto. de Aseo')],
        ['elem_6_1', makeUnit('Dpto. de Ornato')],
        ['elem_6_2', makeUnit('Dpto. de Estudios')],
        ['elem_6_3', makeUnit('Dpto. de Medio Ambiente')],
        ['dir_7', makePerson('Yerco Rodríguez Guichapani', 'DIRECCIÓN DE DESARROLLO COMUNITARIO', legacyRoleData['6WwWut21OLdbgOuvuQKQ-51'].descripcion)],
        ['elem_7_0', makeUnit('Dpto. de Difusión y Comunicaciones')],
        ['elem_7_1', makeUnit('Dpto. de Planificación y Gestión')],
        ['elem_7_2', makeUnit('Dpto. Administrativo')],
        ['elem_7_3', makeUnit('Subdirección de Protección Social')],
        ['fGtQ-9D5vMI7RdHVcQbm-41', makeUnit('Dpto. Registro Social de Hogares')],
        ['elem_7_4', makeUnit('Dpto. de Protección y Defensoría Ciudadana')],
        ['elem_7_5', makeUnit('Dpto. Social')],
        ['elem_7_6', makeUnit('Dpto. de Programas Protección Social')],
        ['elem_7_7', makeUnit('Dpto. Integral Personas Mayores')],
        ['elem_7_8', makeUnit('Subdirección de Organizaciones Comunitarias')],
        ['elem_7_9', makeUnit('Dpto. de Organizaciones Comunitarias')],
        ['elem_7_10', makeUnit('Dpto. de Deportes y Recreación')],
        ['elem_7_11', makeUnit('Dpto. de Inclusión Social')],
        ['elem_7_12', makeUnit('Subdirección de Desarrollo Económico Local')],
        ['elem_7_13', makeUnit('Dpto. de Fomento Productivo')],
        ['elem_7_14', makeUnit('Dpto. de la Mujer y Equidad de Género')],
        ['elem_7_15', makeUnit('Dpto. de Empleo, Innov. Fin. y Cap')],
        ['dir_8', makeUnit('DIRECCIÓN DE SERVICIOS TRASPASADOS', legacyRoleData['6WwWut21OLdbgOuvuQKQ-52'].descripcion)],
        ['elem_8_0', makeUnit('Dpto. de Salud Municipal')],
        ['elem_8_1', makeUnit('Dpto. de Administración de Educación Municipal')],
        ['elem_8_2', makeUnit('Cementerios Municipales')],
        ['dir_9', makePerson('Sergio Barría Matus', 'DIRECCIÓN DE CONCESIONES', legacyRoleData['6WwWut21OLdbgOuvuQKQ-39'].descripcion)],
        ['elem_9_0', makeUnit('Dpto. de Fiscalización de Concesiones')],
        ['dir_10', makeUnit('DIRECCION DE OPERACIONES', legacyRoleData['6WwWut21OLdbgOuvuQKQ-27'].descripcion)],
        ['elem_10_0', makeUnit('Dpto. de Administración y Control de Gestión')],
        ['elem_10_1', makeUnit('Dpto. Técnico')],
        ['elem_10_2', makeUnit('Dpto. de Operaciones')],
        ['elem_10_3', makeUnit('Dpto. de Calles y Caminos')],
        ['elem_10_4', makeUnit('Dpto. de Obras Menores')],
        ['elem_10_5', makeUnit('Dpto. de Mantenimiento')],
        ['elem_10_6', makeUnit('Dpto. Eléctrico')],
        ['dir_11', makeUnit('DIRECCIÓN DE TURISMO', legacyRoleData['6WwWut21OLdbgOuvuQKQ-31'].descripcion)],
        ['elem_11_0', makeUnit('Dpto. de Administración')],
        ['elem_11_1', makeUnit('Dpto. de Planificación')],
        ['elem_11_2', makeUnit('Dpto. de Fomento Turístico')],
        ['elem_11_3', makeUnit('Dpto. de Cultura')],
        ['elem_11_4', makeUnit('Dpto. de Innovación y Marketing Turístico')],
        ['dir_12', makePerson('Andrés Canelo', 'DIRECCIÓN DE SEGURIDAD PUBLICA', legacyRoleData['6WwWut21OLdbgOuvuQKQ-8'].descripcion)],
        ['elem_12_0', makeUnit('Dpto. de Planificación y Control de Gestión')],
        ['elem_12_1', makeUnit('Dpto. Administrativo')],
        ['elem_12_2', makeUnit('Dpto. de Seguridad Publica')],
        ['elem_12_3', makeUnit('Dpto. de Estudios y Prevención Social')],
        ['elem_12_4', makeUnit('Depto. de Difusión y Comunicaciones')],
        ['YslLIrpk6EAMrCeuJEwz-111', makeUnit('Oficina Concejo y Concejales')],
        ['YslLIrpk6EAMrCeuJEwz-112', makeUnit('Sección Servicios Generales')],
        ['YslLIrpk6EAMrCeuJEwz-113', makeUnit('Sección Partes y Archivos')]
    ]);
    groups.forEach(g => {
        const rect = g.querySelector('rect');
        // Solo agregar events pointer a los elementos con rect (cajas)
        if (rect) {
            g.setAttribute('style', 'pointer-events: all;');
        }
        g.addEventListener('mouseenter', function(evt) {
            if (rect) rect.classList.add('highlight');
            const cellId = g.getAttribute('data-cell-id');
            const data = roleData[cellId];
            tooltip.style.display = 'block';
            tooltip.textContent = getTooltipLabel(g, data);
            tooltip.style.visibility = 'hidden';
            tooltip.style.left = '0px';
            tooltip.style.top = '0px';
            void tooltip.offsetWidth;
            positionTooltip(evt);
            tooltip.style.visibility = 'visible';
        });
        g.addEventListener('mousemove', function(evt) {
            positionTooltip(evt);
        });
        g.addEventListener('mouseleave', function() {
            if (rect) rect.classList.remove('highlight');
            tooltip.style.display = 'none';
            tooltip.style.visibility = 'hidden';
        });
        g.addEventListener('click', function(evt) {
            evt.stopPropagation();
            const cellId = g.getAttribute('data-cell-id');
            const data = roleData[cellId];
                let texto = getTooltipLabel(g, data);
            if (data) {
    let html = `<b>Cargo:</b> ${data.cargo}<br>`;
    if (data.nombre && data.nombre.trim() !== '' && data.nombre.trim() !== data.cargo.trim()) {
        html += `<b>Nombre:</b> ${data.nombre}<br>`;
    }
    if (data.contacto && data.contacto.trim() !== '') {
        html += `<b>Contacto:</b> ${data.contacto}<br>`;
    }
    html += `<b>Descripción:</b> ${data.descripcion}`;
    panelContent.innerHTML = html;
} else {
    panelContent.innerHTML = `<b>Cargo:</b> ${texto}<br><b>Descripción:</b> Información no disponible en base de datos. Por favor, contáctese con la Administración Municipal.`;
}
            infoPanel.style.display = 'block';
            document.getElementById('info-overlay').style.display = 'block';
        });
    });
});
closePanel.onclick = function(e) {
    infoPanel.style.display = 'none';
    document.getElementById('info-overlay').style.display = 'none';
};
window.addEventListener('mousedown', function(e) {
    if (infoPanel.style.display === 'block' && !infoPanel.contains(e.target) && e.target.id !== 'info-overlay') {
        infoPanel.style.display = 'none';
        document.getElementById('info-overlay').style.display = 'none';
    }
});
