
const container = document.createElement('div');
container.classList.add('container');
document.body.appendChild(container);

const header = document.createElement('header');
header.classList.add('header');

const mainTitle = document.createElement('h1');
mainTitle.classList.add('main-title');
mainTitle.textContent = 'Джон фон Нойман';

const subtitle = document.createElement('p');
subtitle.classList.add('subtitle');
subtitle.textContent = "1903-1957 | Математик, фізик, піонер комп'ютерних наук";

header.append(mainTitle, subtitle);
container.appendChild(header);


const introSection = document.createElement('section');
introSection.classList.add('intro-section', 'fade-in');

const photoBlock = document.createElement('div');
photoBlock.classList.add('photo-block');
photoBlock.textContent = '📐 Джон фон Нойман';

const introText = document.createElement('div');
introText.classList.add('intro-text');

const introHeading = document.createElement('h2');
introHeading.classList.add('section-title');
introHeading.textContent = 'Про Джона фон Ноймана';

const introParagraph = document.createElement('p');
introParagraph.textContent = "Джон фон Нойман був угорсько-американським математиком, фізиком та ученим у галузі комп'ютерних наук. Його ім'я назавжди пов'язане з архітектурою комп'ютерів.";

introText.append(introHeading, introParagraph);
introSection.append(photoBlock, introText);
container.appendChild(introSection);


const achievementsSection = document.createElement('section');
achievementsSection.classList.add('fade-in');

const achievementsTitle = document.createElement('h2');
achievementsTitle.classList.add('achievements-title');
achievementsTitle.textContent = 'Основні досягнення';
achievementsSection.appendChild(achievementsTitle);

const achievements = [
    { title: 'Архітектура фон Ноймана', desc: "Основа сучасних комп'ютерів." },
    { title: 'Теорія ігор', desc: 'Математична основа для економіки.' },
    { title: 'Квантова механіка', desc: 'Формалізація гільбертових просторів.' }
];

achievements.forEach((ach, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<h3>${index + 1}. ${ach.title}</h3><p>${ach.desc}</p>`;
    achievementsSection.appendChild(card);
});

container.appendChild(achievementsSection);

const quoteSection = document.createElement('section');
quoteSection.classList.add('quote-section', 'fade-in');
quoteSection.innerHTML = `
    <blockquote>"Якщо люди не вірять, що математика проста, це тільки тому, що вони не усвідомлюють, наскільки складне життя"</blockquote>
    <p class="quote-author">— Джон фон Нойман</p>
`;
container.appendChild(quoteSection);


const footer = document.createElement('footer');
footer.classList.add('footer');
footer.innerHTML = '<p>© 2024 | Рефакторинг: Стилі винесено в CSS</p>';
document.body.appendChild(footer);


const sections = document.querySelectorAll('.fade-in');
sections.forEach((section, index) => {
    setTimeout(() => {
        section.classList.add('visible');
    }, 200 * index);
});