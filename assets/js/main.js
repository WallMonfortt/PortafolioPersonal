const grid = new Muuri('.grid', {
    layout: {
        rounding: false
    }
});

window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('images-loaded');

    //Add the listeners of links to filter by category
    const links = document.querySelectorAll('#categories a');
    links.forEach( (element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            links.forEach((link) => link.classList.remove('active'));
            event.target.classList.add('active');


            const category = event.target.innerHTML.toLowerCase();
            category === 'all' ? grid.filter('[data-category]') : grid.filter(`[data-category = "${category}"]`);
        })        
    });

    //Add listener for search bar
    document.querySelector('#search-bar').addEventListener('input', (event) => {
        const search = event.target.value;
        grid.filter((item) => item.getElement().dataset.labels.includes(search));
    })

    //Add listeter for images
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach ((element)=> {
              
       
        element.addEventListener('click', () => {
            const route = element.getAttribute('src');
            const description = element.parentNode.parentNode.dataset.description;
            const link = element.parentNode.parentNode.dataset.link;

            overlay.classList.add('active');
            document.querySelector('#overlay img').src = route;
            document.querySelector('#overlay .description').innerHTML = description;
            document.querySelector('#overlay a').href = link;
        })
    });

    //Add event listener close button
    document.querySelector('#btn-close-popup').addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    //Event listener overlay

    overlay.addEventListener('click', (event) => {
        event.target.id === 'overlay' ? overlay.classList.remove('active') : '';
    })
});

