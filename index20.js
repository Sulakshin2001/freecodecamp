console.log(
    // Входной массив
    [1, 4, 3, 0, 4, 5, 4]
        // Оставляем только чётные числа
        .filter(element => !(element % 2))
        // Считаем квадратный корень и записываем в аккумулятор
        .reduceRight((accumulator, element) => accumulator + Math.sqrt(element), 0)
); // 6