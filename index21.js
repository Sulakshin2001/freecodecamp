function getNumbersModulatordBy(modulus, loggerCallback) {
    // Функция, которая возвращает функцию - это подход из функционального программирования
    // Называется замыканием (Closure)
    return function(start, end) {
        loggerCallback({ message: "Конфигурация", config: configuration });
        loggerCallback({ message: "Полученный модулятор", modulus: modulus });
        loggerCallback({
            message: "Полученный start и end",
            start: start,
            end: end
        });

        while (start <= end) {
            // Стоит обратить внимание:
            // 1. При нестрогом равенстве true == 1 и false == 0
            // 2. Здесь мы обращаемся к глобальному контексту configuration
            // p.s. поле isEntry может меняться
            if (start % modulus == configuration.isEntry) {
                // В данном случае мы используем loggerCallback как middleware
                // Это определит дальнейшую судьбу результата
                // Позволяет убрать side-effect
                loggerCallback(start);
            }
            start++;
        }
    };
}

// Глобальный контекст не имеет блочной видимости
// В данном случае переменная поднимается выше в самое начало кода
// Исполнитель JavaScript видит её в независимости от места инициализации
var configuration = {
    modulus: 10,
    isEntry: false,
    start: 45,
    end: 68
};

var loggerCallback = data => console.log(data);

let tenNumbersModulator = getNumbersModulatordBy(
    configuration.modulus,
    loggerCallback
);

// Переменные с глобальным контекстом доступны из:
// 1. globalThis (в Node.js)
// 2. window (в браузере)
window.configuration.modulus = 5;

let fiveNumbersModulator = getNumbersModulatordBy(
    configuration.modulus,
    loggerCallback
);

tenNumbersModulator(configuration.start, configuration.end); // 50, 60
tenNumbersModulator(10, 100); // 10, 20, 30, 40, 50, 60, 70, 80, 90, 100

// Так как мы изменили поле isEntry, то теперь:
// Функция вернёт те значения, которые не входят в модуляцию числа
window.configuration.isEntry = true;

fiveNumbersModulator(configuration.start, configuration.end); // 46, 51, 56, 61, 66
fiveNumbersModulator(10, 21); // 11, 16, 21