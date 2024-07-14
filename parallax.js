
const cards = [

    {

        title: 'Card 1',
        id: 'card1',
        el: null,

        show() {
            this.el.classList.remove('hide');
            this.el.classList.add('show');
        },

        progress(pct) {
            console.log('card pct', pct);
        },

        hide() {
            this.el.classList.remove('show');
            this.el.classList.add('hide');
        }

    },

    {
        title: 'Card 2',
        id: 'card2',
        el: null,

        show() {
            this.el.classList.remove('hide');
            this.el.classList.add('show');
        },

        progress(pct) {
            console.log('card pct', pct);
        },

        hide() {
            this.el.classList.remove('show');
            this.el.classList.add('hide');
        }
    },

    {
        title: 'Card 3',
        id: 'card3',
        el: null,

        show() {
            this.el.classList.remove('hide');
            this.el.classList.add('show');
        },

        progress(pct) {
            console.log('card pct', pct);
        },

        hide() {
            this.el.classList.remove('show');
            this.el.classList.add('hide');
        }
    }

];

for(let card of cards) {
    card.el = document.getElementById(card.id);
}

let cardIndex = 0;
const cardPctHeight = 100 / (cards.length * 2 - 1);



// Function to check if an element is in the viewport
// function isInViewport(element) {
//     const rect = element.getBoundingClientRect();
//     return (
//         rect.top >= 0 &&
//         rect.left >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );
// }


/**
 *
 * @param card
 * @param name
 * @param event
 */
function cardEvent(card, name, event) {
    if (typeof cards[card] !== 'undefined') {
        cards[card][name](event);
    }
}


function updateScroll() {

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 99.9;

    const newCardIndex = Math.floor( scrollPercentage / cardPctHeight );


    if ( newCardIndex % 2 == 1 ) {

        // whitespace

    } else {

        // console.log('new card', newCardIndex, scrollPercentage, scrollTop, scrollHeight);

        const boundTop = cardIndex * cardPctHeight;
        // const boundBottom = (cardIndex+1) * cardPctHeight;

        const cardProgress = (scrollPercentage - boundTop) / cardPctHeight * 100;

        const card = cards[newCardIndex];

        if (newCardIndex != cardIndex) {

            console.log('card index change', cardIndex, newCardIndex);

            cardEvent(cardIndex, 'hide');
            cardIndex = newCardIndex;

            cardEvent(cardIndex, 'show');

        } else {
            cardEvent(cardIndex, 'progress', cardProgress);
        }
    }



    setScrollStatus( scrollPercentage, cardIndex , cardProgress );

}

/**
 *
 * @param pct
 * @param card
 * @param progress
 */
function setScrollStatus(pct, card, progress) {

    const scrollIndicator = document.getElementById('scrollIndicator');
    scrollIndicator.innerHTML = `Scroll: ${pct.toFixed(2)}%<br>
Card: ${card} ${progress.toFixed(2)}<br>`;

}


window.addEventListener("scroll", updateScroll, false);

cards[0].show();

// Initial setup and event listener for scrolling
// window.addEventListener('scroll', onScroll);
// window.addEventListener('load', onScroll); // Check on load in case some elements are already in view