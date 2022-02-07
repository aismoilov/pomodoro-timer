const elementsDom = {
    element: 'div',
    classList: 'content',
    children: [
        {
            element: 'img',
            classList: 'logo',
            attributes: { 'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqHysLa6izyI9n68rYgVug3bWiPnZHpJ2dOw&usqp=CAU' },
        },
        {
            element: 'h2',
            classList: 'title',
            appendText: 'Pomodoro Timer'
        },
        {
            element: 'div',
            classList: 'pomodoro-app',
            children: [
                {
                    element: 'div',
                    classList: 'pomodoro-app__timer',
                    children: [
                        {
                            element: 'span',
                            attributes: { 'id': 'timerMinutes' },
                        },
                        {
                            element: 'span',
                            appendText: ' : '
                        },
                        {
                            element: 'span',
                            attributes: { 'id': 'timerSeconds' },
                        },
                    ]
                },
                {
                    element: 'div',
                    classList: 'pomodoro-app__actions',
                    children: [
                        {
                            element: 'button',
                            classList: 'pomodoro-app__start button',
                            attributes: { 'id': 'startTimer' },
                            appendText: 'Старт'
                        },
                        {
                            element: 'button',
                            classList: 'pomodoro-app__pause button',
                            attributes: { 'id': 'pauseTimer' },
                            appendText: 'Пауза'
                        },
                        {
                            element: 'button',
                            classList: 'pomodoro-app__stop button',
                            attributes: { 'id': 'stopTimer' },
                            appendText: 'Сбросить'
                        }
                    ]
                }
            ]
        }
    ]
};

export function createTimer() {
    const template = generateTemplate(elementsDom);
    return template;
}

function generateTemplate(domElement) {
    let element = createElement(domElement);
    if (domElement.children) {
        domElement.children.forEach((childElement) => {
            element.append(generateTemplate(childElement));
        });
    }

    return element;
}

function createElement(options) {
    const $el = document.createElement(options.element);

    if (options.classList) {
        $el.classList = options.classList;
    }

    if (options.attributes) {
        Object.entries(options.attributes).forEach(([key, value]) => {
            $el.setAttribute(key, value);
        });
    }

    if (options.appendText) {
        $el.append(options.appendText);
    }

    return $el;
}