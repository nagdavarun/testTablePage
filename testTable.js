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
setTimeout(() => {
    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.getElementById("filter_search").style.display = "block";
        document.getElementById("filter").style.cssText = "padding-bottom:10px; display: block; width:100%"
        document.getElementById("search").style.cssText = "padding-bottom:10px; width:100%"
        document.getElementById("selectOption").style.cssText = "margin-top:10px; width:100% margin-left:0px"
        document.getElementById("filterheading").style.paddingBottom = "10px";
        document.getElementById("searchHeader").style.paddingBottom = "10px";
    }
}, 100);
// search table
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

    var matchesFilter, matches = [], count;
    matchesFilter = function (item) {
        count = 0
        for (var n = 0; n < info.length; n++) {
            if (info[n]["Values"].indexOf(item[info[n]["Field"]]) > -1) {
                count++;
            }
        }
        return count == info.length;
    }

    for (var i = 0; i < this.length; i++) {
        if (matchesFilter(this[i])) {
            matches.push(this[i]);
        }
    }

    return matches;
}
// filter ended

createTable()
jsonData()

// Table creation
function createTable(value) {
    jsonData()
    setTimeout(() => {
        if (value == undefined || !value) {
            value = airportJson.length
            // value = "10"
        }
        else if (value == "all") {
            value = airportJson.length
        }
        var colHeader = ["name", "icao", "iata", "altitude", "latitude", "longitude", "type"];
        var header = ["Name", "ICAO", "IATA", "Elev.", "Lat.", "Long.", "Type"]
        var table = document.createElement("table");
        table.setAttribute("id", "tableData")
        table.setAttribute("CELLSPACING", "0")
        table.setAttribute("class", "customers-list")

        var tblHead = document.createElement('thead');
        var rowHead = document.createElement('tr');
        table.appendChild(tblHead);
        tblHead.appendChild(rowHead)
        for (var i = 0; i < header.length; i++) {
            var th = document.createElement("th");
            th.innerHTML = header[i];
            rowHead.appendChild(th);
        }
        var tblBody = document.createElement("tbody");
        for (var i = 0; i < value; i++) {
            var row = document.createElement("tr");
            for (var j = 0; j < colHeader.length; j++) {
                var cell = document.createElement("td");
                if (colHeader[j] == 'altitude') {
                    airportJson[i]['altitude'] = (airportJson[i]['altitude'] * 3.281).toFixed(2) + 'ft'
                }
                if (colHeader[j] == 'latitude') {
                    airportJson[i]['latitude'] = (airportJson[i]['latitude']).toFixed(4)
                }
                if (colHeader[j] == 'longitude') {
                    airportJson[i]['longitude'] = (airportJson[i]['longitude']).toFixed(4)
                }
                var cellText = document.createTextNode(airportJson[i][colHeader[j]]);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }

        table.appendChild(tblBody);
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }, 1000);
}

function valueSelected() {
    setTimeout(() => {
        var e = document.getElementById("selectOption");
        var strUser = e.value;
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

