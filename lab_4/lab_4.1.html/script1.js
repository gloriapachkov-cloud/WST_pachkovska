// Допоміжна функція для створення елементів
function createNode(tag, props, ...children) {
    const element = document.createElement(tag);
    Object.assign(element, props);
    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    });
    return element;
}


const header = createNode('header', { className: 'header-block' },
    createNode('h1', {}, 'Микола Аркас'),
    createNode('a', { className: 'button-link', href: 'index.html' }, 'На головну сторінку')
);


const main = createNode('main', { className: 'main-content' });

// Секція INTRO
const intro = createNode('section', { className: 'intro' },
    createNode('h2', {}, 'Микола Миколайович Аркас (старший)'),
    createNode('div', { className: 'introcont' },
        createNode('div', { className: 'introbio' },
            createNode('p', {}, 'Микола Аркас (1853–1909) — видатний український культурно-освітній діяч, письменник, композитор та історик. Він був засновником і беззмінним головою товариства "Просвіта" в Миколаєві, а також автором першої популярної "Історії України-Русі", написаної українською мовою.')
        ),
        createNode('figure', { className: 'introportrait' },
            createNode('img', { 
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsBZkjAy6xWJn_t1mDzKdCcvqSEFRTnSsSn6_OCd1gtzgPfS_JI4KhVxRmDXV7kdfMCymsJsrAquLiJtw8-ltct_ppStyLY2CrR6eoxLwUsg&s=10', 
                alt: 'Микола Аркас' 
            }),
            createNode('figcaption', {}, 'Микола Миколайович Аркас')
        )
    )
);


const layout = createNode('section', { className: 'main-layout' },
    // Важливі дати
    createNode('section', { className: 'dates-section' },
        createNode('h3', {}, 'Важливі дати'),
        createNode('ul', {},
            createNode('li', {}, createNode('b', {}, '1853'), ' – народився в Миколаєві в родині адмірала.'),
            createNode('li', {}, createNode('b', {}, '1899'), ' – завершив роботу над оперою "Катерина".'),
            createNode('li', {}, createNode('b', {}, '1907'), ' – заснував товариство "Просвіта".'),
            createNode('li', {}, createNode('b', {}, '1908'), ' – видання "Історії України-Русі".'),
            createNode('li', {}, createNode('b', {}, '1909'), ' – пішов із життя, похований у Миколаєві.')
        )
    ),
   
    createNode('section', { className: 'video-section' },
        createNode('h3', {}, 'Життя та творчість'),
        createNode('div', { className: 'video-embed' },
            createNode('iframe', {
                src: 'https://youtu.be/yN1PMh6QtTo?si=z3SRBTvnXdFmvFya', 
                title: 'Микола Аркас',
                allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                allowFullscreen: true
            })
        ),
        createNode('div', { className: 'video-caption' },
            createNode('p', {}, 'Його опера "Катерина" за однойменною поемою Тараса Шевченка стала першою українською ліричною народно-побутовою оперою.'),
            createNode('p', {}, 'Книга "Історія України-Русі" Аркаса розійшлася величезними накладами, ставши настільною для багатьох українських родин на початку XX століття.')
        )
    )
);

// Секція MEMORIES
const memories = createNode('section', { className: 'memories' },
    createNode('h2', {}, 'Вшанування пам’яті'),
    createNode('p', {}, 'У Миколаєві встановлено пам’ятник діячеві, а його ім’я носить Перша українська гімназія. Його праці продовжують надихати дослідників української історії.'),
    createNode('div', { className: 'memoryimg' },
        createNode('img', { 
            src: 'data:image/jpeg;base64,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', 
            alt: 'Пам’ятник Аркасу' 
        })
    )
);

main.append(intro, layout, memories);


const footer = createNode('footer', { className: 'pagefooter' },
    createNode('div', { className: 'footercolumns' },
        createNode('div', { className: 'firstcol' },
            createNode('p', {}, 'Кафедра інформаційних систем та технологій'),
            createNode('p', {}, 'Київський національний університет імені Тараса Шевченка')
        ),
        createNode('div', { className: 'secondcol' },
            createNode('p', {}, 'вулиця Богдана Гаврилишина, 24, Київ, 02000'),
            createNode('p', {}, 'ауд. 402')
        )
    ),
    createNode('p', { className: 'student' }, 'Пачковська Глорія (c) 2026')
);

document.body.append(header, main, footer);