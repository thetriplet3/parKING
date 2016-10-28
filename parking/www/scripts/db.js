function connect(flag, table, div) {
    var reply = {};
    var string;
    if (div != null) {
        var attr = setAttr(div);
        $.ajax({
            url: "http://abstellen.southeastasia.cloudapp.azure.com/abstellen/" + table + "/handle.php",
            type: "POST",
            data: {
                attr: attr,
                flag: flag
            },
            async: false,
            dataType: 'json',
            success: function (data) {
                string = JSON.stringify(data);
                console.log(data);
            },
            error: function (data) {
                string = JSON.stringify(data);
                console.log(data);
            }
        });
    }
    console.log(string);
    return string;
}

function handleData(data) {
    if (data == null) {
        console.log("Empty!");
    }
    else {
        console.log("NAANAN")
    }
}

function setAttr(div) {
    var attr = "";
    var col = "";
    $('#' + div).find("input, select").each(function (index) {
        var val = $(this).val();
        console.log("Val :- " + val);
        if (val == null || val == "" || val == undefined) {
            //val = "-X0xd";
        }
        else {
            if ($(this).attr('type') == "time") {
                val = val + ":00"
            }
            else if ($(this).attr('type') == "date") {
                val = val.replace(/-/g, "\/");
                val = val.split("\/");
                val = val[2] + "\/" + val[1] + "\/" + val[0];
            }
            col = $(this).attr('id');
            attr = attr + col + '<>' + val + '|';
        }
    });
    attr = attr.substring(0, attr.length - 1);
    console.log(attr);
    return attr;
}

function getColumnValue(data, col) {
    var columnVal = "";
    $.each($.parseJSON(data), function (key, val) {
        columnVal = (val[col]);
    });
    console.log(columnVal);
    return columnVal;
}

function getTimestamp() {
    var sysdate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + (1900 + d.getYear()) + " 00:00:00";
    return sysdate;
}

function saveToPhone(key, data) {
    window.localStorage.setItem(key, data);
}

function getFromPhone(key) {
    return window.localStorage.getItem(key);
}

function getCurrentUser(column) {
    var ustring = getFromPhone("currentUser");
    return getColumnValue(ustring, column);
}