const params = new URLSearchParams(window.location.search);
const mode = params.get('mode');

$(function() {
    $("td.messagelist").hide();
    $("td.attachment").hide();
    page_fname = window.location.pathname.split('/').slice(-1)[0]
    is_post = !isNaN(page_fname) && (page_fname != '');
    if (!is_post) {
        $("td.attachmentframe").hide();
        $("td.messageframe").hide();
    }

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
    //myscale = chroma.scale('Paired');

    $("table.listframe").find("tr").each(function() {
        if ($(this).find('td.list1').length > 1 || $(this).find('td.list2').length > 1) {
            index = categories.indexOf($(this).find("td:eq(3)").text());
            bgcolor = myscale(index/categories.length);
            console.log(bgcolor.luminance());
            if (bgcolor.luminance() < 0.5)
                fgcolor = 'white';
            else
                fgcolor = 'black';
            $(this).find('td').each(function() {
                $(this)[0].style.removeProperty('background-color');
                $(this)[0].style.setProperty('background-color', bgcolor, 'important');
            });
            $(this).find('a').each(function() {
                $(this)[0].style.setProperty('color', fgcolor, 'important');
            });
        }
    });

    // Styling of navigation section
    $("td.tabs").parent().addClass('tabrow');
    selelem = $("tr.tabrow:eq(0)").find("span.ltab a");
    $("table.frame").children("tbody").prepend('<tr class="tabbtn seltr"></tr>');
    $(".seltr").append(selelem);
    $("tr.tabrow:eq(0)").find("td:first").before('<div class="dropdown"><button class="tabbtn">Commissioning</button></div>');
    $("tr.tabrow:eq(1)").find("td:first").before('<div class="dropdown"><button class="tabbtn">Group Experiments</button></div>');

    $("tr.tabrow").each(function() {
        tdelem = $(this).find(".tabs");
        btnelem = $(this).find(".dropdown");
        btnelem.append(tdelem);
    });
});
