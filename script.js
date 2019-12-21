var d = {};
var d2 = {};
var dd = {};
var sta = [10,11,12,13,14,15,16,17,18,19,25,30]
var pt = [25,28,31,34,37,40,44,47,50,53,70,84]
var eve_emb = [75,90,120,150]
var eve_pt = [130,170,240,320]



window.onload = function() {
    d2 = text_download("d2.txt");
    dd = text_download("dd.txt");
    d = text_download("d.txt");
}

function text_download(fname){
    url = "https://kizokizokizokun.github.io/DeresutePointAdjustment/" + fname;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", url, false);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                tx = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);

    var tmp_d = {};
    tmp = tx
    tmp = tmp.split("\n")
    for(let i = 0; i < tmp.length-1; i++) {
        tmp2 = tmp[i].split(":")
        tmp_d[tmp2[0]] = tmp2[1].split(",")
      }
    return tmp_d
}


function calc(value) {
    var form = document.forms.form1;
    var target = Number(form.target.value);
    var nowemb = Number(form.emb.value);
    var now = Number(form.now.value);
    var adj = target - now;
    if(form.baisoku.checked){var baisokuFlag = 2;}else{var baisokuFlag = 1;}
    if(form.wGrand.checked){
        var adj_min = 93;
        var cycle = 84*4 + 320*4;
        var max_pt = 84;   
    }else{
        var adj_min = 130;
        var cycle = 53*6 + 320*4;
        var max_pt = 53;   
    }



    if(adj < adj_min){
        document.getElementById("adj_min").textContent = adj_min;
        document.getElementById("error").style.visibility ="visible";
        return false;
    }else{document.getElementById("error").style.visibility ="hidden";}


    var a = Math.floor(adj / cycle)
    var b = adj % (cycle)
    while(b < adj_min){b += cycle; a -= 1;}

    var tmp_min = 1000000;

    for(let i = 0; i < b; i++) {
        //i : イベントだけで稼げるb以下のpt
        //dd[i] : それを達成するためのプレイ回数
        //j : 通常楽曲で稼ぐ必要のあるpt (b-i)
        //adj = a * cycle + b               (min < b < cycle)
        //    = a * cycle + i + j           (b = i + j)
        //    = a * cycle + i + c * 84 + cc (cc > min)
        if(dd[i]){
            if(i>b-adj_min){break;}
            j = b - i;
            c = Math.floor(j/max_pt);
            cc = j % max_pt;
            while(cc<adj_min){cc += max_pt; c -= 1;}
            if(form.wGrand.checked){
                if(get_product_emb(d[cc]) * baisokuFlag + nowemb > get_consume_emb(dd[i])){
                    var times = c + get_sum_arr(dd[i]) + get_sum_arr(d[cc]);
                }
            }else{
                if(get_product_emb(d2[cc]) * baisokuFlag + nowemb > get_consume_emb(dd[i])){
                    var times = c + get_sum_arr(dd[i]) + get_sum_arr(d2[cc]);
                }
            }     
            if(tmp_min > times){
                tmp_min = times;
                var tmp = [a, i, c, cc, form.wGrand.checked];
            }
        }
      }
    display_table(tmp)
}

function get_consume_emb(arr){
    var s = 0
    for(let i=0; i<arr.length; i++){
        s += arr[i] * eve_emb[i];
    }
    return s
}

function get_product_emb(arr){
    var s = 0
    for(let i=0; i<arr.length; i++){
        s += arr[i] * pt[i];
    }
    return s
}

function get_sum_arr(arr) {
    var s = 0;
    for (let i=0; i<arr.length; i++) {
        s += Number(arr[i]);
    }
    return s
}

function display_table(arr){

    for(var i=0; i<sta.length; i++){
        if(arr[4] == true){
            if(sta[i]!=30){
                document.getElementById(sta[i]).textContent = d[arr[3]][i]
            }else{
                document.getElementById(sta[i]).textContent = Number(d[arr[3]][i]) + Number(arr[2]) + Number(arr[0]) * 4
            }
        }else{
            if(sta[i]!=19){
                document.getElementById(sta[i]).textContent = d2[arr[3]][i]
            }else{
                document.getElementById(sta[i]).textContent = Number(d2[arr[3]][i]) + Number(arr[2]) + Number(arr[0]) * 6
            }
        }
        document.getElementById(sta[i] + "_").textContent = Number(document.getElementById(sta[i]).textContent) * pt[i]

        if(Number(document.getElementById(sta[i]).textContent) == 0){
            document.getElementById("_"+sta[i]).style.display ="none";
        }else{document.getElementById("_"+sta[i]).style.display ="table-row";}
    }

    

    for(var i=0; i<eve_emb.length; i++){
        if(eve_emb[i] != 150){
        document.getElementById(eve_emb[i]).textContent = dd[arr[1]][i]
        document.getElementById(eve_emb[i] + "_").textContent = Number(dd[arr[1]][i]) * eve_pt[i]
        }else{
            document.getElementById(eve_emb[i]).textContent = Number(dd[arr[1]][i]) + Number(arr[0] * 4)
            document.getElementById(eve_emb[i] + "_").textContent = (Number(dd[arr[1]][i]) + Number(arr[0] * 4)) * eve_pt[i]
       }
    }

}