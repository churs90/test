const input = document.getElementsByClassName("input")[0];
const button = document.getElementsByClassName("button")[0];
const inputWrapper = document.getElementsByClassName("input-wrapper")[0];
const modalWindow = document.getElementsByClassName("modalWindow")[0];
const message = modalWindow.getElementsByClassName("message")[0];
const close = modalWindow.getElementsByClassName("close")[0];

input.oninput = function () {
    inputWrapper.classList.remove("error")
}


// Данные для передачи на сервер допустим id товаров и его количество


// Создаём объект класса XMLHttpRequest
const request = new XMLHttpRequest();

/*  Составляем строку запроса и кладем данные, строка состоит из:
пути до файла обработчика ? имя в GET запросе где будет лежать значение запроса id_product и
через & мы передаем количество qty_product. */
const url = "https://reqres.in/api/users";
request.responseType = "json";
/* Здесь мы указываем параметры соединения с сервером, т.е. мы указываем метод соединения GET,
а после запятой мы указываем путь к файлу на сервере который будет обрабатывать наш запрос. */
request.open('POST', url, true);

// Указываем заголовки для сервера, говорим что тип данных, - контент который мы хотим получить должен быть не закодирован.
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

// Здесь мы получаем ответ от сервера на запрос, лучше сказать ждем ответ от сервера
request.addEventListener("readystatechange", () => {
    /*   request.readyState - возвращает текущее состояние объекта XHR(XMLHttpRequest) объекта,
    бывает 4 состояния 4-е состояние запроса - операция полностью завершена, пришел ответ от сервера,
    вот то что нам нужно request.status это статус ответа,
    нам нужен код 200 это нормальный ответ сервера, 401 файл не найден, 500 сервер дал ошибку и прочее...   */
    if (request.readyState === 4 && request.status === 201) {
        message.innerHTML = input.value;
        input.value="";
        modalWindow.classList.add("modalActive")
    }
});

button.onclick = function (e) {
    e.preventDefault();
    if(input.value) {
        request.send(JSON.stringify({"message": input.value}));
    }
}

close.onclick = function () {
    modalWindow.classList.remove("modalActive")
}
