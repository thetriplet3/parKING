﻿function connect(flag, table, div) {
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
            },
            error: function (data) {
            }
        });
    }
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
    $('#' + div).find("input ").each(function (index) {
        var val = $(this).val();
        console.log("Val :- " + val);
        if (val == null || val == "" || val == undefined) {
            //val = "-X0xd";
        }
        else {
            var col = $(this).attr('id');
        }
        
        attr = attr + col + '<>' + val + '|'
    });
    attr = attr.substring(0, attr.length - 1);
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