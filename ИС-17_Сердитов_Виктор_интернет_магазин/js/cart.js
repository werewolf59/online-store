var endlowprice = 0; // Сумма без скидки
var endhighprice = 0; // Сумма со скидкой
var endsubprice = 0; // Скидка
var tableempty = true; // Пустая ли таблица с заказами

// Открыть корзину
function opencart() {
    var x = document.getElementById('shadowz');

    x.classList.remove('setdisp0');
    setTimeout(() => { x.classList.remove('setvis0'); }, 10);
    document.body.style.overflow = "hidden";
};

// Закрыть корзину
function closecart() {
    var x = document.getElementById('shadowz');

    x.classList.add('setvis0');
    setTimeout(() => { x.classList.add('setdisp0'); }, 300);
    document.body.style.overflow = "auto";

    q = document.getElementById('order');
    setTimeout(() => { q.classList.add('setdisp0'); }, 300);
    setTimeout(() => { q.classList.add('setvis0'); }, 300);

    w = document.getElementById('store');
    setTimeout(() => { w.classList.remove('setdisp0'); }, 300);
    setTimeout(() => { w.classList.remove('setvis0'); }, 300);
};

// GET запрос на получение данных о продуктах для расчетов
var xhr = new XMLHttpRequest();
xhr.open('GET', 'price.php', false);
xhr.send();
presponse = xhr.responseText;
var items_json = JSON.parse(presponse);
let ii = 1;

var listitem = document.getElementById("store_item");
var countitem = document.getElementById("count_item");

// Заполняем список в корзине при загрузке страницы
window.onload = function() {
    for (let i = 0; i < this.items_json.count; i++) {
        listitem.options[listitem.options.length] = new Option(items_json[i].name, i);
    }
};

// Выбрать элемент в списке
function SelectItemStore1(name) {
    name = name.trim();
    for (let i = 0; i < listitem.length; i++) {
        if (listitem[i].textContent === name) listitem[i].selected = true;
    }
}

// Выбрать элемент в списке
function SelectItemStore2(i) {
    listitem[i].selected = true;
}

var table = document.getElementById('store_price');

// Добавить элемент в корзине
function AddItemStore() {

    tableempty = false;

    var tselectitem = listitem.options[listitem.selectedIndex].textContent;
    var tcountitem = countitem.value;
    var tpriceitem = 0;
    for (let i = 0; i < this.items_json.count; i++) {
        if(items_json[i].name == tselectitem){
            tpriceitem = items_json[i].price;
        }
    }
    tpriceitem = tpriceitem*tcountitem;

    var check = false;
    for (var i = 0; i < table.rows.length; i++) {
        var tempname = table.rows[i].cells[0].innerHTML;
        if(tempname == tselectitem){
            var getcount = getvalueintext(table.rows[i].cells[1].innerHTML);
            var getprice = getvalueintext(table.rows[i].cells[2].innerHTML);
            tpriceitem = parseInt(tpriceitem*tcountitem) + parseInt(getprice);
            tcountitem = parseInt(tcountitem) + parseInt(getcount);
            table.rows[i].cells[1].innerHTML = tcountitem + ' шт.';
            table.rows[i].cells[2].innerHTML = tpriceitem + ' руб.';
            check = true;
        }
    }
    if(check == false){
        var newRow = table.insertRow(table.rows.length);
        var newCellname = newRow.insertCell(0);
        var newCellcount = newRow.insertCell(1);
        var newCellprice = newRow.insertCell(2);
        var newCellclose = newRow.insertCell(3);
        var newTextname = document.createTextNode(tselectitem);
        var newTextcount = document.createTextNode(tcountitem + ' шт.');
        var newTextprice = document.createTextNode(tpriceitem + ' руб.');
        var newTextClose = document.createTextNode('✖');
        var newCloseProduct = document.createElement("a");
        newCloseProduct.setAttribute("onclick", "deleteproduct('" + tselectitem + "');");
        newCloseProduct.appendChild(newTextClose);
        newCellname.appendChild(newTextname);
        newCellcount.appendChild(newTextcount);
        newCellprice.appendChild(newTextprice);
        newCellclose.appendChild(newCloseProduct);
    }

    reloadprice();
}

// Регулярные выражения (получаем цифры из строки)
function getvalueintext (str) {
    const regex = /([0-9]*).*/gm;
    var myArray = regex.exec(str);   
    return myArray[1];
}

// Обновляем итоговую сумму и скидку
function reloadprice () {
    endlowprice = 0;
    endsubprice = 0;
    endhighprice = 0;
    for (var i = 0; i < table.rows.length; i++) {
        var getcount = parseInt(getvalueintext(table.rows[i].cells[1].innerHTML));
        var getprice = parseInt(getvalueintext(table.rows[i].cells[2].innerHTML));
        endlowprice += getprice;
        if(getcount > 2 && getcount <=4){
            endsubprice += (getprice / 100 * 3); 
        }
        else if(getcount > 4){
            endsubprice += (getprice / 100 * 5); 
        }
        else {}
    }
    endhighprice = endlowprice - endsubprice;
    endlowprice = endlowprice.toFixed(2);
    endsubprice = endsubprice.toFixed(2);
    endhighprice = endhighprice.toFixed(2);
    document.getElementById('vsego').value = endhighprice + " руб.";
    document.getElementById('skidka').value = endsubprice + " руб.";

}

// Очищаем наш заказ
function ClearStore () {
    table.innerHTML = "";
    tableempty = true;
    reloadprice();
}

// Удаляем объект из корзины
function deleteproduct(a) {
    for (var i = 0; i < table.rows.length; i++) {
        var tempname = table.rows[i].cells[0].innerHTML;
        if(tempname == a){
            ell = table.rows[i];
            ell.parentElement.removeChild(ell);
        }
    }
    reloadprice();
}

// Кнопка заказать в корзине
function startbuy() {
    if(table.rows.length > 0){
        x = document.getElementById('store');
        x.classList.add('setvis0');
        setTimeout(() => { x.classList.add('setdisp0'); }, 300);

        y = document.getElementById('order');
        setTimeout(() => { y.classList.remove('setdisp0'); }, 300);
        setTimeout(() => { y.classList.remove('setvis0'); }, 400);
    }
    else {
        myalert('Ваша корзина пуста');
    }
}

// Сообщение пользователю
function myalert(text){
    document.getElementById('alert').innerHTML = text;
    var x = document.getElementById('alert');

        x.classList.remove('setdisp0');
        setTimeout(() => { x.classList.remove('setvis0'); }, 10);

        x.classList.add('setvis0');
        setTimeout(() => { x.classList.add('setvis0'); }, 3000);
        setTimeout(() => { x.classList.add('setdisp0'); }, 3200);
}

// Последнее окно оформления заказа
function endbuy() {
    var q = document.getElementById('fio_order');
    var w = document.getElementById('phone_order');
    if(q.value == ""){
        myalert('Введите данные: ФИО');
    }
    else if(w.value == ""){
        myalert('Введите данные: Номер телефона');
    }
    else {
        let xhr = new XMLHttpRequest();
        var s = 0;
        var body = 'fio=' + encodeURIComponent(q.value) + "&number=" + encodeURIComponent(w.value);
        for (var i = 0; i < table.rows.length; i++) {
            var getcount = getvalueintext(table.rows[i].cells[1].innerHTML);
            var getname = table.rows[i].cells[0].innerHTML;
            body += "&a"+i+"_count=" + encodeURIComponent(getcount) + "&a"+i+"_name=" + encodeURIComponent(getname);
            s++;
        }
        body += "&count=" + encodeURIComponent(s);
        xhr.open("POST", '/buy.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(body);
        closecart();
        myalert('Заказ успешно оформлен');
    }
}