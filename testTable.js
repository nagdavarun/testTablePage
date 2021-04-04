{/* <script> */ }
// json data
var airportJson
function jsonData() {
    fetch("data/airports.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            airportJson = data
        });
}


(function (document) {
    'use strict';

    var TableFilter = (function (myArray) {
        var search_input;

        function _onInputSearch(e) {
            search_input = e.target;
            var tables = document.getElementsByClassName(search_input.getAttribute('data-table'));
            myArray.forEach.call(tables, function (table) {
                myArray.forEach.call(table.tBodies, function (tbody) {
                    myArray.forEach.call(tbody.rows, function (row) {
                        var text_content = row.textContent.toLowerCase();
                        var search_val = search_input.value.toLowerCase();
                        row.style.display = text_content.indexOf(search_val) > -1 ? '' : 'none';
                    });
                });
            });
        }

        return {
            init: function () {
                var inputs = document.getElementsByClassName('search-input');
                myArray.forEach.call(inputs, function (input) {
                    input.oninput = _onInputSearch;
                });
            }
        };
    })(Array.prototype);

    document.addEventListener('readystatechange', function () {
        if (document.readyState === 'complete') {
            TableFilter.init();
        }
    });

})(document);




// filter for checkbox
"use strict";
Array.prototype.flexFilter = function (info) {

    // Set our variables
    var matchesFilter, matches = [], count;

    // Helper function to loop through the filter criteria to find matching values
    // Each filter criteria is treated as "AND". So each item must match all the filter criteria to be considered a match.
    // Multiple filter values in a filter field are treated as "OR" i.e. ["Blue", "Green"] will yield items matching a value of Blue OR Green.
    matchesFilter = function (item) {
        count = 0
        for (var n = 0; n < info.length; n++) {
            if (info[n]["Values"].indexOf(item[info[n]["Field"]]) > -1) {
                count++;
            }
        }
        // If TRUE, then the current item in the array meets all the filter criteria
        return count == info.length;
    }

    // Loop through each item in the array
    for (var i = 0; i < this.length; i++) {
        // Determine if the current item matches the filter criteria
        if (matchesFilter(this[i])) {
            matches.push(this[i]);
        }
    }

    // Give us a new array containing the objects matching the filter criteria
    return matches;
}
// filter ended

createTable()
jsonData()

// Table creation
function createTable(value) {
    setTimeout(() => {
        if (value == undefined || !value) {
            value = airportJson.length
        }
        else if (value == "all") {
            value = airportJson.length
        }
        var col = ["name", "icao", "iata", "altitude", "latitude", "longitude", "type"];
        var table = document.createElement("table");
        table.setAttribute("id", "tableData")
        table.setAttribute("CELLSPACING", "0")
        table.setAttribute("class", "customers-list")

        var tblHead = document.createElement('thead');
        var rowHead = document.createElement('tr');
        table.appendChild(tblHead);
        tblHead.appendChild(rowHead)
        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");
            th.innerHTML = col[i];
            rowHead.appendChild(th);
        }
        var tblBody = document.createElement("tbody");
        for (var i = 0; i < value; i++) {
            var row = document.createElement("tr");
            for (var j = 0; j < col.length; j++) {
                var cell = document.createElement("td");
                var cellText = document.createTextNode(airportJson[i][col[j]]);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }

        table.appendChild(tblBody);
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
        // }
    }, 1000);
}

function valueSelected() {
    setTimeout(() => {
        var e = document.getElementById("selectOption");
        var strUser = e.value;
        console.log(strUser, "strUser")
        if (document.getElementById("tableData") != null) {
            document.getElementById("tableData").remove()
        }
        createTable(strUser)
    }, 500);
}
var criteria = [
    {
        Field: "type",
        Values: []
    }
];
function filterArr(value) {
    jsonData()
    setTimeout(() => {
        if (criteria[0].Values.indexOf(value) == -1) {
            criteria[0].Values.push(value)
        }
        else {
            var index = criteria[0].Values.indexOf(value)
            criteria[0].Values.splice(index, 1)
            if (criteria[0].Values.length == 0) {
                jsonData()
            }
        }
        airportJson = airportJson.flexFilter(criteria);
        if (document.getElementById("tableData") != null) {
            document.getElementById("tableData").remove()
        }
        createTable()
    }, 500);
}

function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableData");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
setTimeout(() => {
    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        console.log("mobile view")
        document.getElementById("filter_search").style.display = "block";
        document.getElementById("filter").style.padding = "10px 0px";
        document.getElementById("filter").style.display = "flex";
        document.getElementById("search").style.paddingBlockEnd = "10px";
        document.getElementById("selectOption").style.width = "100%";
    } else {
        console.log("desktop view")
    }
}, 1000);

// </script>