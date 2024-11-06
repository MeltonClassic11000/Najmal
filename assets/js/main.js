const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
});



document.getElementById('billing-toggle').addEventListener('change', function () {
    const prices = ['10', '20', '50'];  // Monthly prices for cards 1, 2, 3
    const yearlyMultipliers = [10, 10, 10]; // Multiplier for yearly (e.g., 10x monthly price)

    document.querySelectorAll('.price').forEach((price, index) => {
        price.textContent = this.checked
            ? `$${prices[index] * yearlyMultipliers[index]}`  // Yearly pricing
            : `$${prices[index]}`;  // Monthly pricing
    });

    document.querySelectorAll('.duration').forEach(duration => {
        duration.textContent = this.checked ? 'yr' : 'm';  // Toggle 'yr' or 'm'
    });

    document.querySelectorAll('.pricing-desc').forEach(desc => {
        desc.textContent = this.checked ? 'Billed yearly' : 'Free forever';  // Toggle description
    });
});

setTimeout(function () {
    AOS.init({ duration: 1000 });
}, 100);


$(document).ready(function () {
    $('.reviews-slider').slick({
        centerMode: true,
        arrows: false,
        centerPadding: '120px',
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '70px',
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 680,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '30px',
                    slidesToShow: 1
                }
            }
        ]
    });

    $('#custom-next-arrow').on('click', function () {
        $('.reviews-slider').slick('slickNext');
    });

    $('#custom-prev-arrow').on('click', function () {
        $('.reviews-slider').slick('slickPrev');
    });
});

document.querySelectorAll('.accordion .label').forEach(label => {
    label.addEventListener('click', () => {
        const item = label.parentElement;

        // Toggle the current accordion item
        if (item.classList.contains('active')) {
            item.classList.remove('active');
        } else {
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

            // Open the clicked accordion item
            item.classList.add('active');
        }
    });
});


