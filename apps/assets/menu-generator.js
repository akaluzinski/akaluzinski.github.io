const days = 7;
const defaultMealDays = 2;

const lunchMeals = [
    {
        name: "Rosół",
        isWeekendOnly: true
    },
    {
        name: "Leczo",
        isWeekendOnly: false
    },
    {
        name: "Pieczona dorada"
    },
    {
        name: "Lazania",
        isWeekendOnly: true
    },
    {
        name: "Łazanki"
    },
    {
        name: "Kurczak w szynce parmeńskiej"
    },
    {
        name: "Pieczone udka",
        isWeekendOnly: true
    },
    {
        name: "Kurczak w papirusie",
        days: 1
    },
    {
        name: "Papryka nadziewana ryżem i mięsem mielonym"
    },
    {
        name: "Chinczyk a'la Adi"
    },
    {
        name: "Łosoś teryiaki z mango",
        days: 1,
        isWeekendOnly: true
    },
    {
        name: "Fix Bolognese"
    },
    {
        name: "Carbonarra",
        days: 1,
        isWeekendOnly: true
    },
    {
        name: "Kurczak z ricottą",
        days: 2
    },
    {
        name: "Risotto"
    },
    {
        name: "Mielone"
    },
    {
        name: "Kotlet z fileta kurczaka",
        isWeekendOnly: true
    },
    {
        name: "Kotleciki warzywne"
    },
    {
        name: "Kurczak z salsą avocado"
    },
    {
        name: "Risotto z kurczakiem i grzybami"
    },
    {
        name: "Pizza",
        isWeekendOnly: true
    },
    {
        name: "Chilli con carne"
    },
    {
        name: "Kurczak teriyaki z ryżem brązowym"
    },
    {
        name: "Risotto z kurczakiem i dynią"
    },
    {
        name: "Kurczak po toskańsku z suszonymi pomidorami"
    },
    {
        name: "Butter Chicken"
    },
    {
        name: "Filety z kurczaka w sosie pieczarkowym"
    },
    {
        name: "Kurczak słodko-kwaśny a'la Ewa"
    },
    {
        name: "Polpette di parmigiano"
    },
    {
        name: "Kurczak po grecku z fetą"
    },
    {
        name: "Rolada, gumiklyjzy i modro",
        isWeekendOnly: true
    },
    {
        name: "Tagliatelle z krewetkami i pomidorkami w sosie śmietanowym",
        isWeekendOnly: true,
        days: 1
    },
    {
        name: "Grzanki z wiśniami i szynką parmeńską"
    },
    {
        name: "Nuggetsy z kurczaka i płatków śniadaniowych"
    },
    {
        name: "Curry z ciecierzycą, dynią i mlekiem kokosowym"
    }
];

const soups = ["Grzybowa", "Ogórkowa", "Barszcz", "Szczawiowa", "Żurek", "Pomidorowa", "Szparagowa"]
const dinners = ["Kiełbaska z grilla", "Kanapki", "Szakszuka", "Bruschetta"];

const feedMe = possibleMeals => possibleMeals[Math.floor(Math.random() * possibleMeals.length)];

const setDefaultDays = lunch => ({
    ...lunch,
    days: lunch.days ?? defaultMealDays
});

function generateLunchMenu(tillDays = days) {

    let lunches = [];
    let covered = 0;
    do {
        const allMeals = lunchMeals.filter(({name}) => !lunches.includes(name)).map(lunch => setDefaultDays(lunch));
        const weekdayMeals = allMeals.filter(lunches => !lunches.isWeekendOnly);
        const weekendMeals = allMeals.filter(({isWeekendOnly}) => isWeekendOnly);
        const isWeekend = covered > 5;
        const pickedMeal = feedMe(isWeekend ? weekendMeals : weekdayMeals);

        for (let i = 0; i < pickedMeal.days; i++) {
            lunches.push(pickedMeal.name);
        }

        covered += pickedMeal.days;
    } while (covered < tillDays);

    return lunches;
}

const lunchMenu = generateLunchMenu();

const body = document.getElementById("tableDiv");

const tbl = document.createElement("table");
const tblBody = document.createElement("tbody");

const daysOfWeek = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela", "Poniedziałek"];
const headers = ["Dzień", "Drugie danie", "Zupa", "Kolacja"]

const headersRow = document.createElement("tr");
headers.forEach(item => {
    const cell = document.createElement("td");
    cell.appendChild(document.createTextNode(item));
    cell.className = "bg-info";
    headersRow.appendChild(cell);
});

tblBody.appendChild(headersRow);

for (let i = 0; i < lunchMenu.length; i++) {
    let row = document.createElement("tr");

    const dayCell = document.createElement("td");
    const lunchCell = document.createElement("td");
    const soupCell = document.createElement("td");
    const dinnerCell = document.createElement("td");

    dayCell.appendChild(document.createTextNode(daysOfWeek[i]));
    lunchCell.appendChild(document.createTextNode(lunchMenu[i]));
    soupCell.appendChild(document.createTextNode(feedMe(soups)));
    dinnerCell.appendChild(document.createTextNode(feedMe(dinners)));

    row.appendChild(dayCell);
    row.appendChild(lunchCell);
    row.appendChild(soupCell);
    row.appendChild(dinnerCell);

    tblBody.appendChild(row);
}

tbl.appendChild(tblBody);
body.appendChild(tbl);
tbl.setAttribute("class", "table table-bordered table-striped table-responsive mx-auto");
