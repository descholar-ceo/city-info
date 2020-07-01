const searchBox = document.getElementById('search-box');
const resultModal = document.getElementById('result-modal');
const searchReasult = document.getElementById('search-result');

// this function will return the default text to searchResult div
const defaultSearchResultTxt = () => {
    // introduction span first part
    const containerSpan = document.createElement('span');
    const introductionSpan = document.createElement('span');
    introductionSpan.setAttribute('class', 'introduction-span');
    introductionSpan.appendChild(document.createTextNode(`Type a city name or a state name in the white field above,
    and then results will be shown in this format`));

    // app explanation
    const appExplainSpan = document.createElement('span');
    appExplainSpan.setAttribute('class', 'introduction-span');
    appExplainSpan.appendChild(document.createTextNode('This application, (CityInfo), is to help you search any US city, by typing city name, or state name, and when you click on one of many results you will get, you can find full details of the city.'));

    const br0 = document.createElement('br');
    const br1 = document.createElement('br');

    // city intro span
    const cityIntroSpan = document.createElement('div');
    cityIntroSpan.setAttribute('class', 'city-span');
    cityIntroSpan.appendChild(document.createTextNode('City'));

    // state intro span
    const stateIntroSpan = document.createElement('div');
    stateIntroSpan.setAttribute('class', 'state-span');
    stateIntroSpan.appendChild(document.createTextNode('State'));

    // population intro span
    const populationIntroSpan = document.createElement('div');
    populationIntroSpan.setAttribute('class', 'population-span');
    populationIntroSpan.appendChild(document.createTextNode('Population in numbers'));

    // growth intro span
    const growthIntroSpan = document.createElement('div');
    growthIntroSpan.setAttribute('class', 'growth-span');
    growthIntroSpan.appendChild(document.createTextNode(`Growth from 2000 to 2013 Colors red for less than 0, and green for
    greater than 0 `));

    // introduction span second part
    const introductionSpan2 = document.createElement('span');
    introductionSpan2.setAttribute('class', 'introduction-span');
    introductionSpan2.appendChild(document.createTextNode(`After you type the name, you can find the city, or state you are
    looking for with its summarized details, to see more details you can click inside the name`));

    // instruction header
    const instructionHeader = document.createElement('h1');
    instructionHeader.appendChild(document.createTextNode('The name you type must :'));

    // break
    const br = document.createElement('br');

    // ul
    const ul = document.createElement('ul');
    const l1 = document.createElement('li');
    l1.appendChild(document.createTextNode('not include numbers'));
    ul.appendChild(l1);

    const l2 = document.createElement('li');
    l2.appendChild(document.createTextNode('not start with white space (s)'));
    ul.appendChild(l2);

    const l3 = document.createElement('li');
    l3.appendChild(document.createTextNode('for compound names such as \'New York, New Hampshire,...\', make sure you don\'t click white space more than on time'));
    ul.appendChild(l3);

    const l4 = document.createElement('li');
    l4.appendChild(document.createTextNode('not include special characters such as [!@#$%^&*(),.?":{}|<>_+=/\\[-`~]'));
    ul.appendChild(l4);

    containerSpan.appendChild(appExplainSpan);
    containerSpan.appendChild(br0);
    containerSpan.appendChild(br1);
    containerSpan.appendChild(introductionSpan);
    containerSpan.appendChild(cityIntroSpan);
    containerSpan.appendChild(stateIntroSpan);
    containerSpan.appendChild(populationIntroSpan);
    containerSpan.appendChild(growthIntroSpan);
    containerSpan.appendChild(introductionSpan2);
    containerSpan.appendChild(br);
    containerSpan.appendChild(instructionHeader);
    containerSpan.appendChild(ul);

    return containerSpan;
};

/**
 * function to check the quality of searchQuery and giving feedback to the user,
 * this function returns false if searchQuery is invalid, and true if searchQuery is valid,
 *
 * THE SEARCHQUERY IS VALID IF IT DOESN'T INCLUDE : NUMBERS, MORE THAN ONE WHITE SPACE,
 * STARTS BY WHITE SPACE, SPECIAL CHARACTERS '[!@#$%^&*(),.?":{}|<>_+=/\\[-`~]',
 */
const isSearchStringValid = searchQuery => {
    const detectNumber = /(\d+)/;
    const detectSpecialChar = /[!@#$%^&*(),.?":{}|<>_+=/\\[-`~]/;
    const detectWhiteSpace = /\s\s/;
    const startWithWhiteSpaceDetected = /^\s/;

    if (searchQuery.match(detectNumber)) {
        searchReasult.classList.remove('hidden');
        searchReasult.innerHTML = '<span class="error-field">No numbers allowed to be included in a search keywords</span>';
        return false;
    } if (searchQuery.match(detectSpecialChar)) {
        searchReasult.classList.remove('hidden');
        searchReasult.innerHTML = '<span class="error-field">No special characters allowed to be included in a search keywords</span>';
        return false;
    } if (searchQuery.match(detectWhiteSpace)) {
        searchReasult.classList.remove('hidden');
        searchReasult.innerHTML = '<span class="error-field">No more than one white space allowed to be included in a search keywords</span>';
        return false;
    } if (searchQuery.match(startWithWhiteSpaceDetected)) {
        searchReasult.classList.remove('hidden');
        searchReasult.innerHTML = '<span class="error-field">Don\'t start with white space</span>';
        return false;
    } if (searchQuery.length === 0) {
        searchReasult.innerHTML = '';
        searchReasult.appendChild(defaultSearchResultTxt());
        return false;
    }
    return true;
};

/** function to check if a matching word does include either in current city
 * or state name inorder to know what to highlight */
const isFoundWordInCurrentName = (foundWord, currName) => {
    if (currName.includes(foundWord)) {
        return true;
    }
    return false;
};

/** function to handle closing of a single city or sate 
 * result if the red button clicked by the user */
const handleCloseBtnClicked = (event) => {
    const { id } = event.target;
    const currDiv = document.querySelector(`div[${id}]`);
    currDiv.classList.add('hidden');
};

/**
 * function to handle a single result clicked, this function will expand the result clicked,
 * and close all of other results which are not clicked
*/
const handleSingleResultClicked = (event) => {
    const clickedEltType = event.target.tagName;
    if (clickedEltType !== 'BUTTON') {
        const clickedEltId = event.target.id;
        const divToShow = document.querySelector(`div[${clickedEltId}]`);

        const allCurrentLabels = document.querySelectorAll(`label[${clickedEltId}]`);
        const rankAndLocationSpan = document.querySelectorAll(`span[${clickedEltId}]`);
        const allSingleResultDivs = document.querySelectorAll('div[single-result]');

        divToShow.classList.remove('single-result');
        divToShow.classList.add('main-result');

        allSingleResultDivs.forEach((currentDiv) => {
            if (currentDiv.id !== clickedEltId) {
                currentDiv.classList.add('hidden');
            }
        });

        allCurrentLabels.forEach((currentLabel) => {
            currentLabel.classList.remove('hidden');
        });

        rankAndLocationSpan.forEach((currentSpan) => {
            currentSpan.classList.remove('hidden');
        });
    }
};

/** function to implement a seaching of city or state, depending on what the user inputs */
const searchingFunction = async searchQuery => {
    /** if the search string is valid */
    if (isSearchStringValid(searchQuery)) {
        // if the search query is valid, show loding while waiting for result
        searchReasult.classList.remove('hidden');
        searchReasult.innerHTML = '<span class="success-field">Loading...</span>';

        const baseApi = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
        const res = await fetch(baseApi);
        const states = await res.json();
        let foundWords;
        const matches = states.filter(state => {
            const regex = new RegExp(`^${searchQuery}`, 'gi');
            if (state.city.match(regex) || state.state.match(regex)) {
                foundWords = state.city.match(regex) || state.state.match(regex);
            }
            return state.city.match(regex) || state.state.match(regex);
        });

        if (matches.length > 0) {
            const resultArr = matches.map(res => {
                const {
                    city: cityname,
                    state: statename,
                    population,
                    growth_from_2000_to_2013: growth,
                    rank,
                    latitude,
                    longitude,
                } = res;

                const location = `${latitude},${longitude}`;
                const id = `rank${rank}lat${latitude}long${longitude}`.replace('.', '')
                    .replace('.', '').replace('-', '');
                const growthNum = parseFloat(growth.split('%')[0]);


                return `
                <div class="single-result" single-result ${id} id=${id} onclick=handleSingleResultClicked(event)>
                    <span city-span class="city-span" id=${id}>
                        <label ${id} class="hidden" id=${id}>City : </label>
                        ${isFoundWordInCurrentName(foundWords[0], cityname)
                        ? `${cityname.split(foundWords[0])[0]}<span class="highlight-search">${foundWords[0]}</span>${cityname.split(foundWords[0])[1]}` : cityname} 
                    </span>,

                    <span state-span class="state-span" id=${id}>
                        <label ${id} class="hidden" id=${id}>State : </label>
                        ${isFoundWordInCurrentName(foundWords[0], statename)
                        ? `${statename.split(foundWords[0])[0]}<span class="highlight-search">${foundWords[0]}</span>${statename.split(foundWords[0])[1]}` : statename} 
                    </span>,

                    <span population-span class="population-span" id=${id}>
                        <label ${id} class="hidden" id=${id}>Population : </label>
                        ${Number(population).toLocaleString()} 
                    </span>,

                    <span growth-span class="growth-span" id=${id}>
                        <label ${id} class="hidden" id=${id}>Growth : </label>
                        ${growthNum < 0
                        ? `<span class="error-field" id=${id}>${growth}</span>` : `<span class="success-field">${growth}</span>`}
                    </span>

                    <span ${id} class="hidden rank-span">
                       , <label ${id} class="hidden">Rank : </label>
                        ${rank}
                    </span> 
                    <span ${id} class="hidden location-span">
                        ,<label ${id} class="hidden">Location : </label>
                        (${location})
                    </span>

                    <button type="button" id=${id} onclick="handleCloseBtnClicked(event)" class="modal-close-btn">&times;</button>

                </div >`;
            });
            resultModal.classList.remove('hidden');
            searchReasult.innerHTML = resultArr.join('');
        } else {
            searchReasult.innerHTML = "<span class='error-field'>Sorry! No result found, try other keyword!</span>";
        }
    }
};

const startApplication = () => {
    searchReasult.appendChild(defaultSearchResultTxt());
    searchBox.addEventListener('input', () => { searchingFunction(searchBox.value); });
};

startApplication();