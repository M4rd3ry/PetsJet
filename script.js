document.addEventListener('DOMContentLoaded', () => {
    // Логика для кнопки "О нас"
    const aboutUsBtn = document.getElementById("about-us-btn");
    const modal = document.getElementById("about-modal");
    const closeModal = document.getElementById("close-modal");

    aboutUsBtn.addEventListener("click", function(event) {
        event.preventDefault();
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Меню для мобильных устройств
    const hamburger = document.getElementById("hamburger");
    if (hamburger) {
        hamburger.addEventListener("click", function() {
            const navbar = document.querySelector(".navbar");
            if (navbar) {
                navbar.classList.toggle("active"); // Переключаем класс для отображения/скрытия меню
            }
        });
    }

    // Логика для карусели
    $(document).ready(function(){
        $('.reviews-carousel').slick({
            dots: true,             // Показывать точки
            arrows: true,           // Показывать стрелки
            infinite: true,         // Бесконечная прокрутка
            speed: 300,             // Скорость анимации
            slidesToShow: 1,        // Показывать один слайд
            slidesToScroll: 1,      // Прокручивать один слайд
            autoplay: true,         // Автопрокрутка
            autoplaySpeed: 2000,    // Скорость автопрокрутки
            prevArrow: '<button type="button" class="slick-prev">←</button>',  // Левый стрелочник
            nextArrow: '<button type="button" class="slick-next">→</button>',  // Правый стрелочник
        });
    });

    // Функция для отображения купона через 10 секунд
    setTimeout(function() {
        document.getElementById('coupon').style.display = 'block';
    }, 10000);

    // Закрытие купона
    document.getElementById('closeCouponBtn').addEventListener('click', function() {
        document.getElementById('coupon').style.display = 'none';
    });

    // Обработчик для отправки формы
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Отключаем стандартную отправку формы

            const formData = new FormData(event.target);

            // Проверяем, что поля не пустые
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const messenger = formData.get('messenger');
            const route = formData.get('route');
            const comments = formData.get('comments');

            if (!name || !email || !phone) {
                alert('Пожалуйста, заполните обязательные поля.');
                return;
            }

            const data = {
                name: name,
                email: email,
                phone: phone,
                messenger: messenger,
                route: route,
                comments: comments || 'Нет'
            };

            // Отправляем данные в Telegram-бот
            const telegramBotToken = '7517099152:AAFrNoJT-BENa922VSLvHIB_gwmtveMXYuQ';
            const chatId = '793874940';
            const message = `
                📋 Новая заявка:
                🧑 Имя: ${data.name}
                ✉️ Email: ${data.email}
                📱 Телефон: ${data.phone}
                💬 Мессенджер: ${data.messenger}
                📍 Маршрут: ${data.route}
                📝 Комментарии: ${data.comments}
            `;

            fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: message })
            })
            .then((response) => {
                if (response.ok) {
                    alert('Заявка успешно отправлена!');
                    event.target.reset(); // Сбрасываем форму
                } else {
                    alert('Ошибка при отправке заявки. Попробуйте позже.');
                }
            })
            .catch((error) => {
                console.error('Ошибка при отправке заявки:', error);
                alert('Не удалось отправить заявку. Проверьте ваше интернет-соединение.');
            });
        });
    }

    // Fade-in элементы на прокрутке
    const fadeInElements = document.querySelectorAll('.fade-in');
    if (fadeInElements.length) {
        let debounceTimer;
        window.addEventListener('scroll', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                fadeInElements.forEach((element) => {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= window.innerHeight) {
                        element.classList.add('visible');
                    }
                });
            }, 100);
        });
    }
});
