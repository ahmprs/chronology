let ratio = 2;
let font = '18px Tahoma';

let cnv_chron = null;
let cnv_chron_jq = null;

let ctx = null;
let mrg = 40;
// pixcel/year
let org_start = -550;
let org_end = 2150;

let cnv_width = 0;
let cnv_height = 0;
let arr_events = [];
let arr_events_buttons = [];

let div_canvas = null;

let flg_mouse_down = 0;
let org_mouse_down_x = 0;
let org_mouse_down_y = 0;
let org_sc_pos_x = 0;
let org_sc_pos_y = 0;

$(document).ready(function () {
    init();
    assign_events();
});


function init() {

    div_canvas = $('#div_canvas');

    cnv_width = (org_end - org_start) * ratio + 2 * mrg;
    cnv_chron = document.getElementById("cnv_chron");
    cnv_chron_jq = $('#cnv_chron');
    cnv_chron.width = cnv_width;
    ctx = cnv_chron.getContext("2d");
    ctx.font = font;
    load_data();
    present();
    cnv_chron.height = cnv_height;
    ctx = cnv_chron.getContext("2d");
    ctx.font = font;

    div_canvas.css('height', window.innerHeight - 50);
    // $('#div_side').css('height', window.innerHeight - 50);

    present();
}

function load_data() {
    arr_events = [
        { start: -559, end: -330, rnk: 2, cap: 'هخامنشیان' },

        { start: -559, end: -530, rnk: 8, cap: 'کورش بزرگ' },
        { start: -530, end: -522, rnk: 8, cap: 'کمبوجیه' },
        { start: -522, end: -486, rnk: 8, cap: 'داریوش بزرگ' },
        { start: -518, end: -338, rnk: 8, cap: 'بنای تخت جمشید' },
        { start: -486, end: -466, rnk: 8, cap: 'خشایارشا' },
        { start: -466, end: -424, rnk: 8, cap: 'اردشیر' },
        { start: -330, end: -330, rnk: 6, cap: 'حمله اسکندر مقدونی به ایران' },
        { start: -336, end: -330, rnk: 8, cap: 'داریوش سوم' },


        { start: -305, end: -240, rnk: 2, cap: 'سلوکیان' },
        { start: -247, end: 224, rnk: 2, cap: 'اشکانیان' },
        { start: -247, end: -211, rnk: 8, cap: 'ارشک اول' },
        { start: -82, end: -52, rnk: 10, cap: 'سورنا' },
        { start: -55, end: -37, rnk: 8, cap: 'ارد دوم' },
        { start: -53, end: -53, rnk: 8, cap: 'نبرد حران حمله کراسوس به ایران' },
        { start: -37, end: -2, rnk: 8, cap: 'فرهاد چهارم' },
        { start: -2, end: 5, rnk: 8, cap: 'فرهاد پنجم' },
        { start: 0, end: 0, rnk: 8, cap: 'میلاد مسیح' },
        { start: 213, end: 226, rnk: 8, cap: 'اردوان پنجم' },
        { start: 216, end: 274, rnk: 10, cap: 'مانی' },
        { start: 224, end: 293, rnk: 10, cap: 'موبدان موبد کرتیر ساسانی' },
        { start: 224, end: 651, rnk: 2, cap: 'ساسانیان' },
        { start: 224, end: 241, rnk: 8, cap: 'اردشیر بابکان' },
        { start: 240, end: 270, rnk: 8, cap: 'شاپور اول ساسانی' },
        { start: 270, end: 271, rnk: 8, cap: 'هرمز یکم' },
        { start: 271, end: 274, rnk: 8, cap: 'بهرام یکم' },
        { start: 274, end: 293, rnk: 8, cap: 'بهرام دوم' },
        { start: 253, end: 260, rnk: 8, cap: 'والریانوس' },
        { start: 309, end: 379, rnk: 8, cap: 'شاپوردوم ساسانی' },
        { start: 379, end: 383, rnk: 8, cap: 'اردشیر دوم' },
        { start: 383, end: 388, rnk: 8, cap: 'شاپورسوم' },
        { start: 399, end: 420, rnk: 8, cap: 'یزدگرد یکم' },
        { start: 420, end: 438, rnk: 8, cap: 'بهرام گور' },
        { start: 438, end: 457, rnk: 8, cap: 'یزدگرد دوم' },
        { start: 459, end: 484, rnk: 8, cap: 'پیروز یکم' },
        { start: 484, end: 488, rnk: 8, cap: 'بلاش' },
        { start: 488, end: 531, rnk: 8, cap: 'قباد یکم' },
        { start: 488, end: 531, rnk: 10, cap: 'مزدک' },
        { start: 531, end: 579, rnk: 8, cap: 'خسرو انوشیروان' },
        { start: 590, end: 628, rnk: 8, cap: 'خسروپرویز' },
        { start: 632, end: 651, rnk: 8, cap: 'یزدگرد سوم' },

        { start: 570, end: 632, rnk: 10, cap: 'پیامبر اسلام' },
        { start: 661, end: 750, rnk: 2, cap: 'خلافت اموی' },
        { start: 598, end: 873, rnk: 2, cap: 'دوران یازده امام اول شیعه' },
        { start: 598, end: 660, rnk: 10, cap: 'امام علی' },

        { start: 621, end: 718, rnk: 0, cap: 'قرن اول هجری' },
        { start: 718, end: 815, rnk: 0, cap: 'قرن دوم هجری' },
        { start: 815, end: 912, rnk: 0, cap: 'قرن سوم هجری' },
        { start: 912, end: 1009, rnk: 0, cap: 'قرن چهارم هجری' },
        { start: 1009, end: 1106, rnk: 0, cap: 'قرن پنجم هجری' },
        { start: 1106, end: 1203, rnk: 0, cap: 'قرن ششم هجری' },
        { start: 1203, end: 1300, rnk: 0, cap: 'قرن هفتم هجری' },
        { start: 1300, end: 1397, rnk: 0, cap: 'قرن هشتم هجری' },
        { start: 1397, end: 1494, rnk: 0, cap: 'قرن نهم هجری' },
        { start: 1494, end: 1591, rnk: 0, cap: 'قرن دهم هجری' },
        { start: 1591, end: 1688, rnk: 0, cap: 'قرن یازدهم هجری' },
        { start: 1688, end: 1785, rnk: 0, cap: 'قرن دوازدهم هجری' },
        { start: 1785, end: 1882, rnk: 0, cap: 'قرن سیزدهم هجری' },
        { start: 1882, end: 1979, rnk: 0, cap: 'قرن چهاردهم هجری' },
        { start: 1979, end: 2076, rnk: 0, cap: 'قرن پانزدهم هجری' },

        { start: 624, end: 670, rnk: 10, cap: 'امام حسن' },
        { start: 625, end: 680, rnk: 10, cap: 'امام حسین' },
        { start: 651, end: 651, rnk: 10, cap: 'تصرف ایران توسط اعراب مسلمان' },
        { start: 658, end: 713, rnk: 10, cap: 'امام سجاد' },
        { start: 676, end: 732, rnk: 10, cap: 'امام محمد باقر' },
        { start: 685, end: 686, rnk: 10, cap: 'قیام مختار' },
        { start: 702, end: 765, rnk: 10, cap: 'امام جعفر صادق' },
        { start: 810, end: 835, rnk: 10, cap: 'امام جواد' },
        { start: 827, end: 868, rnk: 10, cap: 'امام هادی' },
        { start: 846, end: 873, rnk: 10, cap: 'امام حسن عسکری' },

        { start: 721, end: 815, rnk: 10, cap: 'جابربن حیان' },

        { start: 745, end: 799, rnk: 8, cap: 'امام موسی کاظم' },
        { start: 765, end: 818, rnk: 8, cap: 'امام رضا' },
        { start: 749, end: 1258, rnk: 2, cap: 'خلافت عباسی' },
        { start: 747, end: 749, rnk: 2, cap: 'قیام ابومسلم خراسانی' },
        { start: 780, end: 850, rnk: 10, cap: 'خوارزمی' },

        { start: 821, end: 873, rnk: 2, cap: 'طاهریان' },
        { start: 858, end: 921, rnk: 10, cap: 'حسین بن منصور حلاج' },
        { start: 867, end: 1002, rnk: 2, cap: 'صفاریان' },
        { start: 875, end: 999, rnk: 2, cap: 'سامانیان' },
        { start: 871, end: 940, rnk: 10, cap: 'شیخ کلینی' },
        { start: 872, end: 950, rnk: 10, cap: 'فارابی' },
        { start: 892, end: 907, rnk: 8, cap: 'امیر اسماعیل سامانی' },
        { start: 925, end: 1000, rnk: 10, cap: 'شیخ بهایی' },
        { start: 928, end: 1043, rnk: 2, cap: 'زیاریان' },
        { start: 934, end: 1055, rnk: 2, cap: 'آل بویه' },
        { start: 963, end: 1186, rnk: 2, cap: 'غزنویان' },
        { start: 998, end: 1002, rnk: 8, cap: 'سلطان محمود غزنوی' },

        { start: 1037, end: 1194, rnk: 2, cap: 'سلجوقیان' },
        { start: 1077, end: 1231, rnk: 2, cap: 'خوارزم شاهیان' },

        { start: 813, end: 833, rnk: 8, cap: 'خلیفه مامون' },
        { start: 833, end: 842, rnk: 8, cap: 'خلیفه معتصم' },
        { start: 838, end: 838, rnk: 6, cap: 'اعدام بابک خرمدین' },
        { start: 858, end: 940, rnk: 10, cap: 'رودکی' },
        { start: 940, end: 1025, rnk: 10, cap: 'فردوسی' },
        { start: 965, end: 1040, rnk: 10, cap: 'ابن هیثم' },
        { start: 973, end: 1048, rnk: 10, cap: 'ابوریحان بیرونی' },
        { start: 980, end: 1037, rnk: 10, cap: 'پورسینا' },
        { start: 980, end: 1047, rnk: 10, cap: 'جوزجانی' },
        { start: 1048, end: 1131, rnk: 10, cap: 'خیام' },
        { start: 1058, end: 1111, rnk: 10, cap: 'امام محمد غزالی' },
        { start: 1064, end: 1092, rnk: 10, cap: 'خواجه نظام الملک' },
        { start: 1072, end: 1092, rnk: 10, cap: 'ملکشاه سلجوقی' },
        { start: 1142, end: 1211, rnk: 10, cap: 'نظامی' },
        { start: 1200, end: 1273, rnk: 10, cap: 'خواجه نصیر الدین طوسی' },
        { start: 1210, end: 1292, rnk: 10, cap: 'سعدی شیرازی' },
        { start: 1217, end: 1217, rnk: 6, cap: 'حمله چنگیزخان' },
        { start: 1252, end: 1336, rnk: 2, cap: 'شیخ صفی الدین اردبیلی' },
        { start: 1256, end: 1349, rnk: 2, cap: 'ایلخانان مغول' },
        { start: 1267, end: 1318, rnk: 10, cap: 'کمالالدین فارسی ریاضی دان' },
        { start: 1314, end: 1393, rnk: 2, cap: 'آل مظفر' },
        { start: 1326, end: 1389, rnk: 10, cap: 'حافظ شیرازی' },
        { start: 1332, end: 1406, rnk: 10, cap: 'ابن خلدون' },
        { start: 1335, end: 1357, rnk: 2, cap: 'چوپانیان' },
        { start: 1337, end: 1381, rnk: 2, cap: 'سربداران' },
        { start: 1370, end: 1507, rnk: 2, cap: 'تیموریان' },
        { start: 1370, end: 1405, rnk: 8, cap: 'تیمور لنگ' },
        { start: 1378, end: 1469, rnk: 2, cap: 'قراقیونلوها' },
        { start: 1378, end: 1501, rnk: 2, cap: 'آق قیونلو ها' },
        { start: 1380, end: 1429, rnk: 10, cap: 'غیاث الدین جمشید کاشانی' },

        { start: 1452, end: 1519, rnk: 10, cap: 'Leonardo da Vinci' },
        { start: 1483, end: 1546, rnk: 10, cap: 'MARTIN-LUTHER' },
        { start: 1492, end: 1492, rnk: 6, cap: 'کشف قاره آمریکا' },

        { start: 1501, end: 1722, rnk: 2, cap: 'صفوی' },
        { start: 1501, end: 1524, rnk: 8, cap: 'شاه اسماعیل صفوی' },
        { start: 1524, end: 1576, rnk: 8, cap: 'شاه طهماسب' },
        { start: 1544, end: 1603, rnk: 10, cap: 'William Gilbert [Electricity]' },
        { start: 1564, end: 1616, rnk: 10, cap: 'William Shakespeare' },
        { start: 1587, end: 1629, rnk: 8, cap: 'شاه عباس صفوی' },
        { start: 1642, end: 1726, rnk: 8, cap: 'Newton' },
        { start: 1694, end: 1722, rnk: 8, cap: 'شاه سلطان حسین' },
        { start: 1722, end: 1722, rnk: 6, cap: 'حمله محمود افغان' },
        { start: 1736, end: 1747, rnk: 6, cap: 'نادر شاه افشار' },
        { start: 1736, end: 1796, rnk: 2, cap: 'افشاری' },
        { start: 1750, end: 1794, rnk: 2, cap: 'زندی' },
        { start: 1750, end: 1779, rnk: 8, cap: 'کریم خان زند' },
        { start: 1760, end: 1820, rnk: 6, cap: 'INDUSTRIAL-REVOLUTION' },
        { start: 1776, end: 1776, rnk: 6, cap: 'US-DECLARATION-OF-INDEPENDENCE' },
        { start: 1779, end: 1789, rnk: 6, cap: 'انقلاب کبیر فرانسه' },
        { start: 1782, end: 1797, rnk: 8, cap: 'آقامحمدخان قاجار' },
        { start: 1782, end: 1925, rnk: 2, cap: 'قاجاری' },
        { start: 1791, end: 1872, rnk: 8, cap: 'Samuel Morse' },
        { start: 1797, end: 1789, rnk: 8, cap: 'George Washington' },
        { start: 1797, end: 1834, rnk: 8, cap: 'فتحعلی شاه قاجار' },
        { start: 1804, end: 1815, rnk: 8, cap: 'ناپلئون بناپارت' },
        { start: 1822, end: 1895, rnk: 10, cap: 'Louis Pasteur' },
        { start: 1831, end: 1896, rnk: 8, cap: 'ناصرالدین شاه' },
        { start: 1847, end: 1931, rnk: 10, cap: 'EDITSON' },
        { start: 1847, end: 1922, rnk: 8, cap: 'Alexander Graham Bell' },
        { start: 1879, end: 1955, rnk: 10, cap: 'آلبرت آینشتاین' },
        { start: 1895, end: 1948, rnk: 10, cap: 'GRANDPA' },
        { start: 1896, end: 1906, rnk: 8, cap: 'مظفرالدین شاه' },
        { start: 1914, end: 1925, rnk: 8, cap: 'احمدشاه قاجار' },
        { start: 1903, end: 1903, rnk: 10, cap: 'اختراع هواپیما' },
        { start: 1917, end: 1919, rnk: 6, cap: 'قحطی بزرگ در ایران' },
        { start: 1918, end: 1993, rnk: 10, cap: 'GRANDMA' },
        { start: 1925, end: 1979, rnk: 2, cap: 'پهلوی' },
        { start: 1914, end: 1918, rnk: 6, cap: 'جنگ جهانی اول' },
        { start: 1926, end: 1941, rnk: 8, cap: 'رضا شاه' },
        { start: 1939, end: 1945, rnk: 6, cap: 'جنگ جهانی دوم' },
        { start: 1941, end: 1979, rnk: 8, cap: 'محمدرضا شاه' },
        { start: 1969, end: 1969, rnk: 6, cap: 'فرود انسان بر ماه' },

    ];

    let n = arr_events.length;
    for (let i = 0; i < n; i++) {
        arr_events[i].id = i;

        arr_events[i].left = 0;
        arr_events[i].top = 0;
        arr_events[i].right = 0;
        arr_events[i].bottom = 0;
    }

    let tree_outline = $('#tree_outline');
    tree_outline.html('');

    for (let i = 0; i < n; i++) {
        let btn = $('<button></button>');

        btn.attr('id', `btn_${i}`);
        btn.text(arr_events[i].cap);
        btn.attr('class', 'btn');
        btn.attr('tag', i);

        arr_events_buttons.push(btn);
        tree_outline.append(btn);

        btn.on('click', function () {
            let id = $(this).attr('tag');
            let s = arr_events[id].start;
            let e = arr_events[id].end;
            let btn = arr_events_buttons[id];


            clear_canvas();
            present();
            plot_band(s, e);
            let w = div_canvas.innerWidth();
            div_canvas.scrollLeft(year_to_pix(s) - w / 2);
        });
    }

}
function present() {
    ctx.strokeStyle = '#888';
    for (let year = 0; year > org_start; year -= 100) {
        let x = year_to_pix(year);
        let y = mrg;
        let yy = cnv_height - mrg;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, yy);
        ctx.stroke();

        plot_label(g(year), x, y);

    }

    ctx.strokeStyle = '#c2d9f0';
    for (let year = 0; year > org_start; year -= 10) {
        let x = year_to_pix(year);
        let y = mrg;
        let yy = cnv_height - mrg;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, yy);
        ctx.stroke();
    }


    ctx.strokeStyle = '#888';
    for (let year = 0; year < org_end; year += 100) {
        let x = year_to_pix(year);
        let y = mrg;
        let yy = cnv_height - mrg;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, yy);
        ctx.stroke();

        plot_label(g(year), x, y);
    }


    ctx.strokeStyle = '#c2d9f0';
    for (let year = 0; year < org_end; year += 10) {
        let x = year_to_pix(year);
        let y = mrg;
        let yy = cnv_height - mrg;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, yy);
        ctx.stroke();
    }


    plot_hr_arrow(year_to_pix(org_start), mrg + 10, year_to_pix(org_end));

    let n = arr_events.length;
    ctx.strokeStyle = '#000';
    for (let i = 0; i < n; i++) {
        plot_event(arr_events[i]);
    }

}


function plot_event(ev) {
    let s = ev.start;
    let e = ev.end;
    let start = g(s);
    let end = g(e);

    let arr_h = 30;

    let a = year_to_pix(ev.start);
    let b = year_to_pix(ev.end);
    let c = (a + b) / 2;

    let ws = ctx.measureText(start).width / 2;
    let we = ctx.measureText(end).width / 2;

    let w_cap = (ctx.measureText(ev.cap).width / 2) + 20;

    let w = b - a + ws + we;


    ev.top = 100 * (ev.rnk + 1);
    ev.bottom = ev.top + arr_h + 30;

    ev.left = Math.min(a - ws, c - w_cap);
    ev.right = Math.max(b + we, c + w_cap);

    while (has_overlap_any(ev)) {
        ev.top += 100;
        ev.bottom += 100;
        if (cnv_height < ev.bottom) cnv_height = ev.bottom;
    }

    plot_vt_arrow(a, ev.top, arr_h);
    plot_vt_arrow(b, ev.top, arr_h);

    plot_hr_arrow(a, ev.top + arr_h, b);

    if (a == b) {
        plot_label(start, a, ev.top - 5);
    }
    else if (a + ws < b - we) {
        plot_label(start, a, ev.top - 5);
        plot_label(end, b, ev.top - 5);
    }
    else {
        plot_label(start + '...' + end, (a + b) / 2, ev.top - 5);
    }



    let len = (ev.end - ev.start);
    if (len == 0) len = '';
    let cp = ev.cap + ' ' + len;
    plot_link(cp, (a + b) / 2, ev.top + arr_h + 20, ev.id);

    // >>>

    let arr_rank_clr=[
        '#2c68b6',
        '#ce5f5c',
        '#cea05c',
        '#93ce5c',
        '#5cce99',
        '#4b9fd8',
        '#878bbe',
        '#b580ce',
        '#4eac17',
        '#dd2342',
        '#1753ac',
    ];

    let fs = ctx.fillStyle;
    let h = arr_h/2;
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = arr_rank_clr[ev.rnk];
    ctx.fillRect(a, ev.top + h, b-a, h);
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = fs;

}


function has_overlap(e1, e2) {
    if (e1.left == 0) return false;
    if (e2.left == 0) return false;
    if (e1.id == e2.id) return false;

    let c1 = (e1.left <= e2.left && e2.left <= e1.right) && (e1.top <= e2.top && e2.top <= e1.bottom);
    let c2 = (e2.left <= e1.left && e1.left <= e2.right) && (e2.top <= e1.top && e1.top <= e2.bottom);
    return c1 || c2;
}


function has_overlap_any(ev) {
    let n = arr_events.length;
    for (let i = 0; i < n; i++) {
        if (has_overlap(ev, arr_events[i])) return true;
    }
    return false;
}


function g(a) {
    return a;
    // return a >= 0 ? '+G' + a : '-G' + (-a);
}

function year_to_pix(y) {
    return (y - org_start) * ratio + mrg;
}

function plot_vt_arrow(left, top, height) {
    ctx.beginPath();
    ctx.moveTo(left, top + height);
    ctx.lineTo(left, top);
    ctx.lineTo(left - 5, top + 5);
    ctx.moveTo(left, top);
    ctx.lineTo(left + 5, top + 5);
    ctx.stroke();
}

function plot_hr_arrow(left, top, right) {
    ctx.beginPath();

    ctx.moveTo(left, top);
    ctx.lineTo(right, top);

    ctx.moveTo(left, top);
    ctx.lineTo(left + 5, top + 5);
    ctx.moveTo(left, top);
    ctx.lineTo(left + 5, top - 5);

    ctx.moveTo(right, top);
    ctx.lineTo(right - 5, top + 5);
    ctx.moveTo(right, top);
    ctx.lineTo(right - 5, top - 5);


    // ctx.moveTo(left, top);
    // ctx.lineTo(left + width, top);
    // ctx.moveTo(left, top);
    // ctx.lineTo(left + 5, top - 5);
    // ctx.moveTo(left, top);
    // ctx.lineTo(left + 5, top + 5);
    // ctx.moveTo(left + width, top);
    // ctx.lineTo(left + width - 5, top + 5);
    // ctx.moveTo(left + width, top);
    // ctx.lineTo(left + width - 5, top - 5);

    ctx.stroke();
}

function plot_label(txt, center_x, top) {
    let w = ctx.measureText(txt).width;
    let left = center_x - w / 2;
    ctx.fillText(txt, left, top);
}


function plot_band(gys, gye) {


    s = year_to_pix(gys);
    e = year_to_pix(gye);


    //>>>
    if (s == e) {
        let ss = ctx.strokeStyle;
        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = '#8a2727';
        ctx.moveTo(s, 0);
        ctx.lineTo(s, cnv_height)
        ctx.stroke();
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = ss;

    }
    else {
        let fs = ctx.fillStyle;
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = '#8a2727';
        ctx.fillRect(s, 0, e - s, cnv_height);
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = fs;
    }
}


function assign_events() {
    let btn_refresh = $('#btn_refresh');
    btn_refresh.on('click', function () {

    });


    cnv_chron_jq.on('mousedown', function (ev) {
        flg_mouse_down = 1;
        org_mouse_down_x = ev.pageX;
        org_mouse_down_y = ev.pageY;
        org_sc_pos_x = div_canvas.scrollLeft();
        org_sc_pos_y = div_canvas.scrollTop();
    });

    cnv_chron_jq.on('mousemove', function (ev) {
        if (flg_mouse_down == 0) return;

        let dx = ev.pageX - org_mouse_down_x;
        let dy = ev.pageY - org_mouse_down_y;

        // console.log(org_sc_pos_x);
        div_canvas.scrollLeft(org_sc_pos_x - dx);
        div_canvas.scrollTop(org_sc_pos_y - dy);


    });

    cnv_chron_jq.on('mouseup', function () {
        flg_mouse_down = 0;
    });
}


//--------------------
var Links = new Array();        // Links information
var hoverLink = "";             // Href of the link which cursor points at

// Draw the link
function plot_link(title, x, y, ev_id) {

    let w = ctx.measureText(title).width;
    let left = x - w / 2;


    let href = ev_id;
    let canvas = cnv_chron;

    var linkTitle = title,
        linkX = left,
        linkY = y,
        linkWidth = ctx.measureText(linkTitle).width,
        linkHeight = parseInt(ctx.font); // Get lineheight out of fontsize

    // Draw the link
    ctx.fillText(linkTitle, linkX, linkY);

    // Underline the link (you can delete this block)
    // ctx.beginPath();
    // ctx.moveTo(linkX, linkY + linkHeight);
    // ctx.lineTo(linkX + linkWidth, linkY + linkHeight);
    // ctx.lineWidth = 1;
    // ctx.strokeStyle = "#0000ff";
    // ctx.stroke();

    // Add mouse listeners
    canvas.addEventListener("mousemove", on_mousemove, false);
    canvas.addEventListener("click", on_click, false);

    // Add link params to array
    Links.push(left + ";" + y + ";" + linkWidth + ";" + linkHeight + ";" + href);
}

// Link hover
function on_mousemove(ev) {
    var x, y;

    // Get the mouse position relative to the canvas element
    if (ev.layerX || ev.layerX == 0) { // For Firefox
        x = ev.layerX;
        y = ev.layerY;
    }

    // Link hover
    for (var i = Links.length - 1; i >= 0; i--) {
        var params = new Array();

        // Get link params back from array
        params = Links[i].split(";");

        var linkX = parseInt(params[0]),
            linkY = parseInt(params[1]),
            linkWidth = parseInt(params[2]),
            linkHeight = parseInt(params[3]),
            linkHref = params[4];

        // Check if cursor is in the link area
        if (
            (x >= linkX) &&
            (x <= (linkX + linkWidth)) &&

            (y >= linkY - 30) &&
            (y <= (linkY + linkHeight) + 20)) {
            document.body.style.cursor = "pointer";
            hoverLink = linkHref;
            break;
        }
        else {
            document.body.style.cursor = "";
            hoverLink = "";
        }
    };
}

// Link click
function on_click(e) {
    if (hoverLink) {
        // window.open(hoverLink); // Use this to open in new tab
        // window.location = hoverLink; // Use this to open in current window
        let ev_id = hoverLink;
        let ev = arr_events[ev_id];

        clear_canvas();
        present();
        plot_band(ev.start, ev.end);
    }
}
//--------------------

function clear_canvas() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cnv_chron.width, cnv_chron.height);
    ctx.fillStyle = "#000";
}


function plot_sub_events(ev_id) {

}