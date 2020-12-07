const params = new URLSearchParams(window.location.search);
const mode = params.get('mode');

$(function() {
    $("td.messagelist").hide();
    $("td.attachment").hide();
    $("td.attachmentframe").hide();
    $("td.messageframe").hide();

    $("table.listframe").click(function(event) {
        event.stopPropagation();

        var $target = $(event.target);
        var $td = $target.closest("td");
        if ($td.hasClass("list1") || $td.hasClass("list2")) {
            var $row = $target.closest("tr").next()
            $row.find("td.messagelist").slideToggle();
            var i = 0;
            while (true) {
                $row = $row.next();
                if (i > 10 || $row.find("td").hasClass("list1") || $row.find("td").hasClass("list2"))
                    break;
                $row.find("td").slideToggle();
				i += 1 ;
            }
        }
    });

    var categories = [];
    $("select[name='Category'] option").each(function() {
        categories.push($(this).text().trim());
    });
    //myscale = chroma.bezier(['#779ecb', '#fde0e0']).scale().gamma(2);
    myscale = chroma.scale('Pastel2');

    $("table.listframe").find("tr").each(function() {
        if ($(this).find('td.list1').length > 1 || $(this).find('td.list2').length > 1) {
            index = categories.indexOf($(this).find("td:eq(3)").text());
            $(this).find('td').each(function() {
                $(this)[0].style.removeProperty('background-color');
                $(this)[0].style.setProperty('background-color', myscale(index/categories.length), 'important');
            });
        }
    }) ;
});
