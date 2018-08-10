/**
 * Start: Adding field
 */
let countBox =0;
let boxName = 0;
let target = $("#response");

function addField() {
    var boxName="symptoms"+countBox; 
    let html = '<br/><input type="text" class="form-control" name="'+boxName+'" "/>'
    target.append(html);
    countBox ++;
    console.log(countBox);
}

/**
 * End: Adding field
 */


