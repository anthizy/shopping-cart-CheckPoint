// Global variable used for the items with 0 quantities , to be consider as deleted
var listItem = []


// Function manipulate the quantitie of each article selected for shooping
function count(operation, qtId, priceId, fullPriceId) {


    var subtotal; // Using to calculate the new subtotal of the Sopping
    let newprice; // Using to calculate the new total of the selected item
    var items; // If quatities when substract is 0 , than change the total numbers of items

    // Get the value  of the quantities for the seleceted item
    var qt = document.getElementById(qtId).innerHTML;
    var price = document.getElementById(priceId).innerHTML.split('€').join('');

    // Find the number of item on the Shopping list 
    const nb = Number(qtId.match(/[0-9]+/g));
    //console.log(nb);

    let idM = 'qt-minus' + nb;


    // Switch cases of add or minus item & calculate the total to pa for eache article
    switch (operation) {


        case '-':

            qt = parseInt(qt) - 1;

            // Special case when the quantitie is 0, number of total shopp items should modifie
            if (qt === 0) {

                // Remove item from the select shopping list
                let value = document.getElementById('itemName' + nb).innerText;
                listItem.push('itemName' + nb);
                removeFromList(value, 'select');

                document.getElementById(qtId).innerText = String(qt);

                // Can't have negative item -1,-2 ....
                document.getElementById(idM).onclick = function () { return false; };
                document.getElementById(idM).style.color = '#FF5726'; // Change the Color of the item


                // Modifie number of items selected on the cart
                items = parseInt(document.getElementById('items').innerText) - 1;
                document.getElementById('items').innerText = items;


                document.getElementById('itemName' + nb).style.color = '#FF5726';
                document.getElementById('full-price' + nb).style.backgroundColor = '#FF5726';

                let id = "myPopup" + nb;
                var popup = document.getElementById(id);

                // Display a popup to alert the user that the quantitie is zero and will consider as deleted item
                popup.classList.toggle("show");
                setTimeout(function () {
                    document.getElementById(id).style.display = 'none'
                }, 1000);


                // If items all deleted then set shopping to zero
                if (items === 0) {

                    // Set the subtotal and total to 0
                    document.getElementById('totalCart').innerText = 0;
                    document.getElementById('subTotal').innerText = 0;
                    break;
                }

            }

            if (qt => 0) {

                document.getElementById(qtId).innerText = String(qt);

                // Calculate the total to pay for eache article
                document.getElementById(fullPriceId).innerText = (parseFloat(price) * qt).toFixed(2) + " €";

                // Subtract the price from the price of all items
                subtotal = parseFloat(document.getElementById('subTotal').innerText);
                document.getElementById('subTotal').innerText = (subtotal - parseFloat(price)) + " €";

                // Arround the total .2 each time 
                newprice = parseFloat(document.getElementById('subTotal').innerText).toFixed(2);
                document.getElementById('subTotal').innerText = newprice + " €";


                // Set the new total by adding the shipping price into it
                document.getElementById('totalCart').innerText = Number(newprice) + 5;

                break;
            }

        case '+':

            // Special case when the quantitie is 0, and the user hit (+)
            document.getElementById(idM).onclick = document.getElementById(idM).onclick = function () { return count('-', qtId, priceId, fullPriceId); };

            if (parseInt(qt) === 0) {
                //change the style of the item 
                document.getElementById('itemName' + nb).style.color = '#318fb5';


                // Add the item name to the select shopping item
                let value = document.getElementById('itemName' + nb).innerText;
                addToList(value, 'select');



                document.getElementById('qt-minus' + nb).style.color = '#a6a6a6';
                document.getElementById('full-price' + nb).style.backgroundColor = '#005086';

                // Modifie number of items selected on the cart
                items = parseInt(document.getElementById('items').innerText) + 1;
                document.getElementById('items').innerText = items;

            }


            qt = parseInt(qt) + 1;
            //console.log(qt)


            // javascript: alert('event has been triggered ' + qt);
            document.getElementById(qtId).innerText = String(qt); // set the new value of quantitie


            // Calculate the total to pay for eache article
            document.getElementById(fullPriceId).innerText = (parseFloat(price) * qt).toFixed(2) + " €";

            // Addition the price of all items
            subtotal = parseFloat(document.getElementById('subTotal').innerText);
            document.getElementById('subTotal').innerText = subtotal + parseFloat(price);

            // Arround the total .2 each time 
            newprice = parseFloat(document.getElementById('subTotal').innerText).toFixed(2);
            document.getElementById('subTotal').innerText = newprice + " €";

            // Set the new total by adding the shipping price into it
            document.getElementById('totalCart').innerText = Number(newprice) + 5;

            break;
    }
}


// Function Add or remove from favorite 
function changeClass(id) {

    // Just alterne the font-awesome class
    if (id.classList.contains('fa-heart-o')) {

        id.classList.remove('fa-heart-o');
        id.classList.add('fa-heart');

    }
    else {

        id.classList.remove('fa-heart');
        id.classList.add('fa-heart-o');

    }
}

// Function remove article from the shopping cart
function remove(id) {


    // Find the number of item on the Shopping list 
    const nbItem = id.match(/[0-9]+/g);

    // Get the Id using the number of item
    const fullPriceId = 'full-price' + nbItem;

    // Get the full price of the item using the Id
    var fullPrice = document.getElementById(fullPriceId).innerHTML.split('€').join('');

    // Subtract the price from the price of all items
    if (parseInt(document.getElementById('qt' + nbItem).innerText) != 0) {
        var subtotal = parseFloat(document.getElementById('subTotal').innerText);
        document.getElementById('subTotal').innerText = (subtotal - parseFloat(fullPrice)) + " €";

        // Arround the total .2 each time 
        let newprice = parseFloat(document.getElementById('subTotal').innerText).toFixed(2);
        document.getElementById('subTotal').innerText = newprice + " €";


        // Set the new total by adding the shipping price into it
        document.getElementById('totalCart').innerText = Number(newprice) + 5;
    }



    // Remove item from the select shopping list before deleting the Div article from the page
    let value = document.getElementById('itemName' + nbItem).innerText;
    removeFromList(value, 'select');

    // Get the child div by its id
    var div = document.getElementById(id);
    // Search for parent node and remove it from the document
    div.parentNode.removeChild(div);




    // If it's already deleted don't change the value , else -1
    if (!listItem.includes('itemName' + nbItem)) {


        // Modifie number of items selected on the cart
        var items = parseInt(document.getElementById('items').innerText) - 1;
        document.getElementById('items').innerText = items;
    }

    if (items === 0)
        // Set the new total by adding the shipping price into it
        document.getElementById('totalCart').innerText = 0;

}


// Append selcted item to Shopping list
function addToList(value, id) {

    // Create new option element
    var option = document.createElement("option");

    // Set value of option
    option.text = value;

    // Add opt to end of select box (sel)
    document.getElementById(id).add(option);
}

// Remove from the selected item list
function removeFromList(value, id) {

    var removeItem = document.getElementById(id);
    for (var i = 0; i < removeItem.length; i++) {
        if (removeItem.options[i].value == value)
            removeItem.remove(i);
    }
}