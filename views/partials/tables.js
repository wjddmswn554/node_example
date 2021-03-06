module.exports = {
  table: function (res) {
    var colgroup = ``;
    for(var i = 0; i<8; i++){
      colgroup += `<col style="width: 110px">`;
    }
    return `
        <table class="tg" style="table-layout: fixed; width: 636px">
    <colgroup>
      <col style="width: 63px">`
      +colgroup+
      `
    </colgroup>
    <thead>
      <tr>
        <th class="tg-7v7y" rowspan="5"><input id="line" name="line" type="text" size=2 value='A' readonly ></input></th> <!-- line -->
        <th class="tg-l5wk"></th>
        <th class="tg-8u09">A TIME</th>
        <th class="tg-8u09">B TIME</th>
        <th class="tg-8u09">C TIME</th>
        <th class="tg-8u09">D TIME</th>
        <th class="tg-8u09">E TIME</th>
        <th class="tg-l5wk" rowspan="2">합계<br></th>
        <th class="tg-l5wk" rowspan="2">달성률<br></th>
      </tr>
      <tr>
        <td class="tg-l5wk">생산모델</td>
        <td class="tg-mwl0"><input id="table[0][0][0]" name="table[0][0][0]" type="text" size=8 placeholder='amodel' value=${res.amodel}></td>
        <td class="tg-mwl0"><input id="table[0][0][1]" name="table[0][0][1]" type="text" size=8 placeholder='bmodel' value=${res.bmodel}></td>
        <td class="tg-mwl0"><input id="table[0][0][2]" name="table[0][0][2]" type="text" size=8 placeholder='cmodel' value=${res.cmodel}></td>
        <td class="tg-mwl0"><input id="table[0][0][3]" name="table[0][0][3]" type="text" size=8 placeholder='dmodel' value=${res.dmodel}></td>
        <td class="tg-mwl0"><input id="table[0][0][4]" name="table[0][0][4]" type="text" size=8 placeholder='emodel' value=${res.emodel}></td>
      </tr>
      <tr>
        <td class="tg-l5wk">목표수량</td>
        <td class="tg-mwl0"><input id="table[0][1][0]" name="table[0][1][0]" type="text" size=8 placeholder='atarget' onkeyup='call()' onfocus="this.select()" value=${res.atarget}></td> 
        <td class="tg-mwl0"><input id="table[0][1][1]" name="table[0][1][1]" type="text" size=8 placeholder='btarget' onkeyup='call()' onfocus="this.select()" value=${res.btarget}></td>
        <td class="tg-mwl0"><input id="table[0][1][2]" name="table[0][1][2]" type="text" size=8 placeholder='ctarget' onkeyup='call()' onfocus="this.select()" value=${res.ctarget}></td>
        <td class="tg-mwl0"><input id="table[0][1][3]" name="table[0][1][3]" type="text" size=8 placeholder='btarget' onkeyup='call()' onfocus="this.select()" value=${res.dtarget}></td>
        <td class="tg-mwl0"><input id="table[0][1][4]" name="table[0][1][4]" type="text" size=8 placeholder='ctarget' onkeyup='call()' onfocus="this.select()" value=${res.etarget}></td>
        <td class="tg-mwl0"><input id="table[0][3][0]" name="table[0][3][0]" type="text" size=8 placeholder='targettotal' readonly value=${res.targettotal}></td>
        <td class="tg-mwl0" rowspan="2"><input id="table[0][4]" name="table[0][4]" type="textarea" size=8 placeholder='achivementrate' readonly value=${res.achivementrate}></td>
      </tr>
      <tr>
        <td class="tg-l5wk">생산수량</td>
        <td class="tg-mwl0"><input id="table[0][2][0]" name="table[0][2][0]" type="text" size=8 placeholder='aproduction' onkeyup='call2()' onfocus="this.select()" value=${res.aproduction}></td>
        <td class="tg-mwl0"><input id="table[0][2][1]" name="table[0][2][1]" type="text" size=8 placeholder='bproduction' onkeyup='call2()' onfocus="this.select()" value=${res.bproduction}></td>
        <td class="tg-mwl0"><input id="table[0][2][2]" name="table[0][2][2]" type="text" size=8 placeholder='cproduction' onkeyup='call2()' onfocus="this.select()" value=${res.cproduction}></td>
        <td class="tg-mwl0"><input id="table[0][2][3]" name="table[0][2][3]" type="text" size=8 placeholder='dproduction' onkeyup='call2()' onfocus="this.select()" value=${res.dproduction}></td>
        <td class="tg-mwl0"><input id="table[0][2][4]" name="table[0][2][4]" type="text" size=8 placeholder='eproduction' onkeyup='call2()' onfocus="this.select()" value=${res.eproduction}></td>
        <td class="tg-mwl0"><input id="table[0][3][1]" name="table[0][3][1]" type="text" size=8 placeholder='resulttotal' readonly value=${res.resulttotal}></td>
      </tr>
      <tr>
        <td class="tg-l5wk">비고</td>
        <td class="tg-mwl0" colspan="7"><input id="table[0][5]" name="table[0][5]" type="textarea" size=100 placeholder='remarks' value=${res.remarks}></td>
      </tr>
    </thead>
  </table>
  <br>
        `;
  },
  about: function(res){
    return `
    <!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <div class="container mb-3">
      <h2 class="mb-3">About</h2>
      <P>입력 페이지입니다.<br>값이 0일 경우 반드시 0을 입력해주세요.</P>
      <link rel="stylesheet" href="/css/table.css">
        <div class="tg-wrap">
          <form action="/about_process" method="POST" name="frm">
          ${res}
            <input value="저장" type="submit" />
          </form>
      </div>
    </div>
    </body>
    <script type="text/javascript">
      function call() {// targettotal 목표수량 합계
        var targettotal = new Array(5);
        targettotal[0] = parseInt(document.getElementById('table[0][1][0]').value);
        targettotal[1] = parseInt(document.getElementById('table[0][1][1]').value);
        targettotal[2] = parseInt(document.getElementById('table[0][1][2]').value);
        targettotal[3] = parseInt(document.getElementById('table[0][1][3]').value);
        targettotal[4] = parseInt(document.getElementById('table[0][1][4]').value);
        var total = 0;
        for(var i = 0; i < targettotal.length; i++) {
          total += targettotal[i];
        }
        document.getElementById('table[0][3][0]').value = total;
        call3();
      }
      function call2() { // resulttotal 생산수량 합계
        var targettotal = new Array(5);
        targettotal[0] = parseInt(document.getElementById('table[0][2][0]').value);
        targettotal[1] = parseInt(document.getElementById('table[0][2][1]').value);
        targettotal[2] = parseInt(document.getElementById('table[0][2][2]').value);
        targettotal[3] = parseInt(document.getElementById('table[0][2][3]').value);
        targettotal[4] = parseInt(document.getElementById('table[0][2][4]').value);
        var total2 = 0;
        for(var i = 0; i < targettotal.length; i++) {
          total2 += targettotal[i];
        }
        document.getElementById('table[0][3][1]').value = total2;
        call3();
      }
      function call3() { // achivementrate
        var targettotal = new Array(5);
        targettotal[0] = parseInt(document.getElementById('table[0][3][0]').value);
        targettotal[1] = parseInt(document.getElementById('table[0][3][1]').value);
        var total3 = (targettotal[1]/targettotal[0])*100;
        document.getElementById('table[0][4]').value = total3.toFixed(2);
      }
      //B line
      function call4() {// targettotal 목표수량 합계
        var targettotal = new Array(5);
        targettotal[0] = parseInt(document.getElementById('table[1][1][0]').value);
        targettotal[1] = parseInt(document.getElementById('table[1][1][1]').value);
        targettotal[2] = parseInt(document.getElementById('table[1][1][2]').value);
        targettotal[3] = parseInt(document.getElementById('table[1][1][3]').value);
        targettotal[4] = parseInt(document.getElementById('table[1][1][4]').value);
        var total = 0;
        for(var i = 0; i < targettotal.length; i++) {
          total += targettotal[i];
        }
        document.getElementById('table[1][3][0]').value = total;
        call6();
      }
      function call5() { // resulttotal 생산수량 합계
        var targettotal = new Array(5);
        targettotal[0] = parseInt(document.getElementById('table[1][2][0]').value);
        targettotal[1] = parseInt(document.getElementById('table[1][2][1]').value);
        targettotal[2] = parseInt(document.getElementById('table[1][2][2]').value);
        targettotal[3] = parseInt(document.getElementById('table[1][2][3]').value);
        targettotal[4] = parseInt(document.getElementById('table[1][2][4]').value);
        var total2 = 0;
        for(var i = 0; i < targettotal.length; i++) {
          total2 += targettotal[i];
        }
        document.getElementById('table[1][3][1]').value = total2;
        call6(); 
      }
      function call6() { // achivementrate
        var targettotal = new Array(5);
        targettotal[0] = parseInt(document.getElementById('table[1][3][0]').value);
        targettotal[1] = parseInt(document.getElementById('table[1][3][1]').value);
        var total3 = (targettotal[1]/targettotal[0])*100;
        document.getElementById('table[1][4]').value = total3.toFixed(2);
      }
      //C line
      function call7() {// targettotal 목표수량 합계
        var targettotal = new Array(5);
        targettotal[0] = parseInt(document.getElementById('table[2][1][0]').value);
        targettotal[1] = parseInt(document.getElementById('table[2][1][1]').value);
        targettotal[2] = parseInt(document.getElementById('table[2][1][2]').value);
        targettotal[3] = parseInt(document.getElementById('table[2][1][3]').value);
        targettotal[4] = parseInt(document.getElementById('table[2][1][4]').value);
        var total = 0;
        for(var i = 0; i < targettotal.length; i++) {
          total += targettotal[i];
        }
        document.getElementById('table[2][3][0]').value = total;
        call9();
      }
      function call8() { // resulttotal 생산수량 합계
        var targettotal = new Array(5);
        targettotal[0] = parseInt(document.getElementById('table[2][2][0]').value);
        targettotal[1] = parseInt(document.getElementById('table[2][2][1]').value);
        targettotal[2] = parseInt(document.getElementById('table[2][2][2]').value);
        targettotal[3] = parseInt(document.getElementById('table[2][2][3]').value);
        targettotal[4] = parseInt(document.getElementById('table[2][2][4]').value);
        var total2 = 0;
        for(var i = 0; i < targettotal.length; i++) {
          total2 += targettotal[i];
        }
        document.getElementById('table[2][3][1]').value = total2;
        call9();
      }
      function call9() { // achivementrate
        var targettotal = new Array(5);
        targettotal[0] = parseInt(document.getElementById('table[2][3][0]').value);
        targettotal[1] = parseInt(document.getElementById('table[2][3][1]').value);
        var total3 = (targettotal[1]/targettotal[0])*100;
        document.getElementById('table[2][4]').value = total3.toFixed(2);
      }

  </script>
  </html>
    `
  }
}